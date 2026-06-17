import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// Build-time list of countries -> explicit prerender routes for every flag page
const countries: Array<{ id: string }> = JSON.parse(
  readFileSync(fileURLToPath(new URL('./public/content/countries.json', import.meta.url)), 'utf-8')
)
const flagRoutes = countries.map(c => `/flag/${c.id}`)

const SITE_URL = 'https://geobtenu.netlify.app'
const PLAUSIBLE_DOMAIN = 'geobtenu.netlify.app'
const PLAUSIBLE_API_HOST = 'https://plausible.noewen.com'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/leaflet',
    '@nuxtjs/plausible',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/eslint'
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  site: {
    url: SITE_URL,
    name: 'Géobtenu'
  },

  fonts: {
    families: [
      { name: 'Roboto', provider: 'google' },
      { name: 'Secular One', provider: 'google' }
    ]
  },

  plausible: {
    domain: PLAUSIBLE_DOMAIN,
    apiHost: PLAUSIBLE_API_HOST,
    autoPageviews: true,
    autoOutboundTracking: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Géobtenu | Outil de géographie',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { key: 'description', name: 'description', content: 'Un outil simple et efficace pour obtenir des informations sur un pays !' },
        { name: 'keywords', content: 'geobtenu,géobtenu,geography,géographie,geoguessr,geo,wiki,meta,méta,metas,métas,info,capital,circulation,sens,direction,pays,informations,tips,conseils,continent,domaine,domain,language,langues,langue,alphabet' },
        { name: 'author', content: 'kernoeb' },
        { name: 'language', content: 'French' },
        { name: 'robots', content: 'index,follow' },
        { name: 'category', content: 'internet' },
        { key: 'title', name: 'title', content: 'Géobtenu | Outil de géographie' },

        // Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: SITE_URL + '/' },
        { key: 'og:title', property: 'og:title', content: 'Géobtenu | Outil de géographie' },
        { key: 'og:description', property: 'og:description', content: 'Un outil simple et efficace pour obtenir des informations sur un pays !' },
        { property: 'og:image', content: SITE_URL + '/banner.png' },

        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: SITE_URL + '/' },
        { key: 'twitter:title', property: 'twitter:title', content: 'Géobtenu | Outil de géographie' },
        { key: 'twitter:description', property: 'twitter:description', content: 'Un outil simple et efficace pour obtenir des informations sur un pays !' },
        { property: 'twitter:image', content: SITE_URL + '/banner.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', ...flagRoutes]
    }
  },

  content: {
    build: {
      markdown: {
        remarkPlugins: {
          'remark-emoji': {}
        }
      }
    }
  },

  icon: {
    mode: 'css',
    clientBundle: {
      scan: true
    }
  }
})
