<script setup lang="ts">
import countriesData from '~~/public/content/countries.json'
import contentData from '~/data/content.json'
import wikipediaData from '~/data/wikipedia.json'

interface CountryData {
  id: string
  country?: Record<string, string>
  capital?: Record<string, string>
  wikipedia?: Record<string, string>
}

const lang = 'fr'
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data } = await useAsyncData(`flag-${slug.value}`, async () => {
  // Markdown article (frontmatter + body) for this country
  const article = await queryCollection('countries').path(`/countries/${slug.value}`).first()

  const country = (countriesData as CountryData[]).find(c => c.id === slug.value)
  if (!country) throw createError({ statusCode: 404, statusMessage: 'Country not found' })

  // Wikipedia summary, prefetched at build time (scripts/fetch-wikipedia.mjs)
  const wiki = (wikipediaData as Record<string, { content?: string, link?: string }>)[slug.value]
  const wikiContent = wiki?.content
  const wikiLink = wiki?.link

  const title = country.country?.[lang]?.split('|') ?? []

  type LabelDict = Record<string, Record<string, string>>
  const labels = contentData as Record<string, LabelDict> & { urls: { maps: string } }
  const mapLabel = (field: string | undefined, dict: LabelDict) =>
    field?.split(',').map(v => dict[v]?.[lang]).filter(Boolean).join(', ')

  const info = {
    domain: article?.domain?.split(',').map(v => '.' + v).join(', '),
    continent: mapLabel(article?.continent, labels.continent),
    continentPrefix: article?.continent?.toUpperCase().split(',').join(', '),
    hemisphere: mapLabel(article?.hemisphere, labels.hemisphere),
    languages: mapLabel(article?.languages, labels.languages),
    alphabet: mapLabel(article?.alphabet, labels.alphabet),
    direction: mapLabel(article?.direction, labels.direction)
  }

  return {
    article,
    title,
    capital: country.capital?.[lang]?.split('|').join(', '),
    wikipedia: {
      content: wikiContent,
      link: wikiLink,
      size: wikiContent ? wikiContent.slice(0, 450).length < wikiContent.length : false
    },
    info,
    maps: title.length ? labels.urls.maps + encodeURIComponent(title[0]) : null
  }
})

const article = computed(() => data.value?.article)
const title = computed(() => data.value?.title ?? [])
const capital = computed(() => data.value?.capital)
const wikipedia = computed(() => data.value?.wikipedia)
const info = computed(() => data.value?.info)
const maps = computed(() => data.value?.maps)

const hasInfo = computed(() => {
  const i = info.value
  return !!(i && (i.domain || i.continent || i.hemisphere || i.languages || i.alphabet || i.direction))
})

// "Voir plus / voir moins"
const more = ref(false)
const wikiText = computed(() => {
  const c = wikipedia.value?.content
  if (!c) return ''
  return more.value ? c : c.slice(0, 450)
})

// Speed dial + clipboard
const fab = ref(false)
const copied = ref(false)
async function copyUrl() {
  try {
    await navigator.clipboard.writeText(window.location.href)
  } catch {
    // ignore
  }
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2500)
}

useHead(() => {
  if (title.value.length && wikipedia.value?.content) {
    const t = `Géobtenu | ${title.value}`
    const desc = wikipedia.value.content.slice(0, 450) + '...'
    return {
      title: t,
      meta: [
        { key: 'title', name: 'title', content: t },
        { key: 'og:title', property: 'og:title', content: t },
        { key: 'twitter:title', property: 'twitter:title', content: t },
        { key: 'description', name: 'description', content: desc },
        { key: 'og:description', property: 'og:description', content: desc },
        { key: 'twitter:description', property: 'twitter:description', content: desc }
      ]
    }
  }
  return {}
})
</script>

<template>
  <article class="mx-auto max-w-4xl">
    <!-- Title / capital / flag -->
    <div class="mb-0 text-center">
      <h1 v-if="title.length" class="slug-title flex justify-center font-bold">
        {{ title[0] }}
      </h1>
      <h5 v-if="title.length > 1" class="mb-2 flex justify-center text-gray-400">
        {{ title.slice(1).join(', ') }}
      </h5>
      <h4 v-if="capital" class="mb-2 flex justify-center text-lg">
        {{ capital }}
      </h4>
    </div>
    <div class="flex justify-center">
      <div style="display: inline-block; max-width: 200px; max-height: 200px">
        <img
          :alt="`flag_${slug}`"
          :src="`/flags/png/${slug}.png`"
          class="rounded"
          style="max-width: 100%; height: auto"
        >
      </div>
    </div>

    <!-- Info card -->
    <div class="mt-4">
      <div class="geo-card p-5 text-[15px]" style="text-align: justify">
        <h2 class="mb-2 text-xl font-medium">
          Informations sur le pays
        </h2>
        <div v-if="info?.domain"><b>Domaine :</b> {{ info.domain }}</div>
        <div v-if="info?.continent"><b>Continent :</b> {{ info.continent }} ({{ info.continentPrefix }})</div>
        <div v-if="info?.hemisphere"><b>Hémisphère :</b> {{ info.hemisphere }}</div>
        <div v-if="info?.languages"><b>Langues :</b> {{ info.languages }}</div>
        <div v-if="info?.alphabet"><b>Alphabet :</b> {{ info.alphabet }}</div>
        <div v-if="info?.direction"><b>Sens de circulation :</b> {{ info.direction }}</div>
        <div v-if="!hasInfo">
          Aucune donnée n'a été saisie
        </div>
      </div>
    </div>

    <!-- Wikipedia -->
    <div v-if="wikipedia?.content" class="mt-4">
      <div class="geo-card p-5" style="text-align: justify">
        <h2 class="mb-2 flex items-center gap-1 text-xl font-medium">
          <span>Wikipédia</span>
          <a v-if="wikipedia.link" :href="wikipedia.link" target="_blank" rel="noopener" class="text-[#00bfff]">
            <Icon name="mdi:open-in-new" size="20" />
          </a>
        </h2>
        {{ wikiText }}<span v-if="!more && wikipedia.size">...</span>
        <span
          v-if="wikipedia.size"
          style="color: #00bfff; cursor: pointer"
          @click="more = !more"
        > {{ more ? 'Voir moins' : 'Voir plus' }}</span>
      </div>
    </div>

    <!-- Location -->
    <div v-if="title.length" class="mt-4">
      <div class="geo-card p-5">
        <h2 class="mb-2 text-xl font-medium">
          Emplacement
        </h2>
        <CustomIframe
          :link="`https://maps.google.com/maps?&output=embed&z=${(article && article.zoom) || 5}&q=${title[0]}`"
        />
      </div>
    </div>

    <!-- Markdown body -->
    <div v-if="article?.body" class="mt-4">
      <div class="geo-card p-5">
        <ContentRenderer :value="article" class="nuxt-content" />
      </div>
    </div>

    <!-- Speed dial -->
    <div class="fixed bottom-10 right-4 z-50 flex flex-col-reverse items-center gap-3">
      <button
        type="button"
        aria-label="Outils"
        class="flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-white shadow-lg transition hover:bg-blue-600"
        @click="fab = !fab"
      >
        <Icon :name="fab ? 'mdi:close' : 'mdi:tools'" size="24" />
      </button>
      <Transition name="fade">
        <div v-if="fab" class="flex flex-col gap-3">
          <button
            type="button"
            aria-label="Copier le lien"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow transition hover:bg-green-500"
            @click="copyUrl"
          >
            <Icon name="mdi:content-copy" size="20" />
          </button>
          <a
            v-if="maps"
            :href="maps"
            target="_blank"
            rel="noopener"
            aria-label="Google Maps"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-[#4285f4] text-white shadow transition hover:brightness-110"
          >
            <Icon name="mdi:google-maps" size="20" />
          </a>
        </div>
      </Transition>
    </div>

    <!-- Snackbar -->
    <Transition name="fade">
      <div
        v-if="copied"
        class="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded bg-green-700 px-4 py-2 text-sm text-white shadow-lg"
      >
        Copié dans le presse-papier avec succès !
      </div>
    </Transition>
  </article>
</template>

<style scoped>
.slug-title {
  font-size: 3vw;
}
@media only screen and (max-width: 1000px) {
  .slug-title {
    font-size: 7vw;
  }
}
</style>

<style>
/* Markdown body styling (ported from the old nuxt-content rules) */
.nuxt-content ol {
  padding: revert;
}
.nuxt-content a {
  color: #00bfff;
}
.nuxt-content h1,
.nuxt-content h2,
.nuxt-content h3 {
  margin-bottom: 7px;
}
.nuxt-content hr {
  margin-bottom: 9px;
}
.nuxt-content img {
  max-width: 70%;
  margin-top: 5px;
  border-radius: 10px;
}
@media only screen and (max-width: 600px) {
  .nuxt-content img {
    max-width: 85%;
  }
}
.nuxt-content pre {
  background: #333;
  color: #ddd;
  border-radius: 10px;
  text-shadow: none;
  white-space: pre-wrap;
  padding: 8px;
  margin-bottom: 7px;
}
.nuxt-content pre > code {
  background-color: transparent !important;
  padding: unset;
}
.nuxt-content :not(pre) > code {
  color: #111010 !important;
  border-radius: 5px;
  padding: 2px;
  background-color: #eeeeee !important;
}
</style>
