<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      width="300"
      app
      clipped
      disable-resize-watcher
      temporary
    >
      <v-list>
        <v-list-item class="px-2">
          <v-btn
            icon
            @click.stop="drawer = !drawer"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
          <v-list-item-title
            :class="!$vuetify.theme.dark ? 'geoTitleColor' : 'geoTitleColorDark'"
            class="geoTitle"
          >
            {{ title }}
          </v-list-item-title>
        </v-list-item>

        <v-divider />
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          exact
          router
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              style="font-size: 13px"
              v-text="item.title"
            />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item href="https://fr.wikipedia.org/wiki/Sens_de_circulation_(route)" target="_blank">
          <v-list-item-action>
            <v-icon>mdi-road</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px" v-text="'Sens de circulation (W)'" />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item href="https://docs.google.com/spreadsheets/d/1SUcuQkmDgVZMqNLe7XuNEhmJulonpnSQuSiJAOqfhtY" target="_blank">
          <v-list-item-action>
            <v-icon>mdi-camera</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px" v-text="'Générations de caméras'" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="https://docs.google.com/spreadsheets/d/1x7SfoMvNILkkzT8feYqgku0qaiI-UcVvC2YfPIIvG-g" target="_blank">
          <v-list-item-action>
            <v-icon>mdi-google-spreadsheet</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px" v-text="'Geo-Astuces par Redneho'" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="https://docs.google.com/document/d/1mkof2V97hVqlDsG0NrJKOJLMC40-5BHvMVDQgj4Qvu8" target="_blank">
          <v-list-item-action>
            <v-icon>mdi-google-spreadsheet</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px" v-text="'\'La Méta\' par Armire'" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="https://docs.google.com/spreadsheets/d/1eN1X7fa-zjR2AR2CUbb_KCjGfSWS2PZZocIqn_wtnxs" target="_blank">
          <v-list-item-action>
            <v-icon>mdi-google-spreadsheet</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px" v-text="'Guess the country par Takamari'" />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item to="/credits">
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px" v-text="'Crédits'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="pa-2 d-flex align-center justify-center">
          <v-btn
            :dark="!$vuetify.theme.dark"
            :light="$vuetify.theme.dark"
            @click="$vuetify.theme.dark = !$vuetify.theme.dark"
          >
            <v-icon left>
              mdi-theme-light-dark
            </v-icon>
            {{ $vuetify.theme.dark ? 'Thème blanc' : 'Thème noir' }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <nuxt-link :to="{name: 'index'}" class="noDecoration">
        <v-toolbar-title
          :class="!$vuetify.theme.dark ? 'geoTitleColor' : 'geoTitleColorDark'"
          class="geoTitle"
          v-text="title"
        />
      </nuxt-link>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
      fixed
      height=" 25"
      style="font-size: 10px"
    >
      <span>
        Géobtenu par <a href="https://t.me/kernoeb">kernoeb</a></span>
      <v-spacer />
      <span>&copy; {{ new Date().getFullYear() }}
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import countries from '~/assets/countries.json'

export default {
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Accueil',
          to: '/'
        },
        {
          icon: 'mdi-map-marker-circle',
          title: 'Pays aléatoire',
          to: {
            name: 'flag-slug',
            params: { slug: this.randomCountry() }
          }
        }
      ],
      title: 'GÉOBTENU'
    }
  },
  watch: {
    '$route' () {
      this.items[1].to.params.slug = this.randomCountry()
    }
  },
  mounted () {
    this.checkUpdate()
    if (this.$cookies.get('theme') !== undefined) {
      this.$vuetify.theme.dark = this.$cookies.get('theme')
    }
    this.$watch('$vuetify.theme.dark', this.watchTheme)
  },
  methods: {
    async checkUpdate () {
      const workbox = await window.$workbox
      if (workbox) {
        workbox.addEventListener('installed', (event) => {
          if (event.isUpdate) {
            window.location.reload(true)
          }
        })
      }
    },
    randomCountry () {
      return countries[Math.floor(Math.random() * countries.length)].id
    },
    watchTheme () {
      this.$cookies.set('theme', this.$vuetify.theme.dark)
    }
  }
}
</script>

<style scoped>
.noDecoration {
  text-decoration: none
}

.geoTitle {
  font-family: Secular One, sans-serif;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.geoTitleColor {
  color: #725555;
}

.geoTitleColorDark {
  color: white;
}
</style>
