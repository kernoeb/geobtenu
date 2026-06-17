// Build-time prefetch of Wikipedia summaries for every country.
// Writes app/data/wikipedia.json keyed by country id: { fr: { content, link } }.
// Run before `nuxt generate` so the summaries are baked into the static pages.
//
// Wikipedia's API accepts up to 20 page ids per request (exlimit=max with
// exintro/explaintext), so we batch to stay well within rate limits.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const LANG = 'fr'
const BATCH = 20
const HEADERS = { 'User-Agent': 'Geobtenu/2.0 (+https://geobtenu.netlify.app; country info tool)' }

const root = new URL('..', import.meta.url)
const countries = JSON.parse(
  readFileSync(fileURLToPath(new URL('./public/content/countries.json', root)), 'utf-8')
)

// pageId -> country id
const idByPage = new Map()
for (const c of countries) {
  const wid = c.wikipedia?.[LANG]
  if (wid) idByPage.set(String(wid), c.id)
}
const pageIds = [...idByPage.keys()]

const api = `https://${LANG}.wikipedia.org/w/api.php`
const result = {}

for (let i = 0; i < pageIds.length; i += BATCH) {
  const chunk = pageIds.slice(i, i + BATCH)
  const url = `${api}?format=json&action=query&prop=extracts%7Cinfo&inprop=url&exintro&explaintext&exlimit=max&redirects=1&pageids=${chunk.join('%7C')}`
  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    const pages = json?.query?.pages ?? {}
    for (const [pid, page] of Object.entries(pages)) {
      const cid = idByPage.get(String(pid))
      if (cid && page?.extract) {
        result[cid] = { content: page.extract, link: page.fullurl }
      }
    }
  } catch (e) {
    console.warn(`[wikipedia] batch ${i / BATCH} failed: ${e.message}`)
  }
}

const out = fileURLToPath(new URL('./app/data/wikipedia.json', root))
writeFileSync(out, JSON.stringify(result))
console.log(`[wikipedia] wrote ${Object.keys(result).length}/${pageIds.length} summaries -> app/data/wikipedia.json`)
