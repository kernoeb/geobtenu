import colors from 'vuetify/es5/util/colors'
const { NODE_ENV = 'production' } = process.env
const isDev = NODE_ENV === 'development'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Géobtenu',
    title: 'Géobtenu',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Secular%20One'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    [
      '@aceforth/nuxt-netlify',
      {
        mergeSecurityHeaders: true
      }
    ]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
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
                    /col-*/ // enable if using v-col for layout
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
                  /.*\.v-application--is-rtl.*/
                ]
              }
            }
      }
  }
}
