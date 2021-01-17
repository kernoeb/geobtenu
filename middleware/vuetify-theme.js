export default function ({ app, req }) {
  if (process.server) {
    const theme = app.$cookies.get('theme')
    if (theme) {
      app.vuetify.framework.theme.dark = theme
    }
  }
}
