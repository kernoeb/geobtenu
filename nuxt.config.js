import colors from 'vuetify/es5/util/colors'
const { NODE_ENV = 'production' } = process.env
const isDev = NODE_ENV === 'development'
// eslint-disable-next-line nuxt/no-cjs-in-config
const countries = require('./content/countriesData/countries.json')

const t = []
for (const i of countries) {
  t.push('/flag/' + i.id)
}

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  ssr: true,

  generate: {
    routes: t,
    fallback: true
  },

  plausible: {
    apiHost: 'https://plausible.noewen.com'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Géobtenu | Outil de géographie',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Un outil simple et efficace pour obtenir des informations sur un pays !' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    ['@nuxtjs/google-fonts', {
      families: {
        Roboto: true,
        'Secular+One': true
      }
    }]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/component-cache',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'vue-plausible'
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      remarkPlugins () {
        return ['remark-emoji']
      }
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    defaultAssets: false,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    postcss:
      {
        // disable postcss plugins in development
        plugins: isDev
          ? {}
          : {
              '@fullhuman/postcss-purgecss': {
                content: [
                  'components/**/*.vue',
                  'layouts/**/*.vue',
                  'pages/**/*.vue',
                  'plugins/**/*.js',
                  'node_modules/vuetify/src/**/*.ts'
                ],
                styleExtensions: ['.css'],
                safelist: {
                  standard: [
                    'body',
                    'html',
                    'nuxt-progress',
                    /col-*/, // enable if using v-col for layout,
                    /v-speed/
                  ],
                  deep: [
                    /page-enter/,
                    /page-leave/,
                    /transition/
                  ]
                }

              },
              'css-byebye': {
                rulesToRemove: [
                  /.*\.v-application--is-rtl.*/,
                  /.*light.*/
                ]
              }
            }
      }
  }
}
