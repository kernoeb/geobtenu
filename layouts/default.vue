<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      disable-resize-watcher
      style="z-index: 100"
      temporary
      width="300"
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
        <v-list-item :to="{name: 'flag-slug', params: {slug: randomCountryElement}}">
          <v-list-item-action>
            <v-icon>mdi-map-marker-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px" v-text="'Pays aléatoire'" />
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
        <v-list-item v-for="(d, index) in itemsMenu" :key="`itemsmenu_${index}`" :href="d.href" target="_blank">
          <v-list-item-action>
            <v-icon>{{ d.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px" v-text="d.text" />
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
      <!--      <template #append>
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
      </template>-->
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
        Géobtenu | <a href="https://twitter.com/kernoeb" style="color: #00ACEE">@kernoeb</a></span>
      <v-spacer />
      <span>&copy; {{ new Date().getFullYear() }}
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import finished from '~/assets/finished.json'

export default {
  data () {
    return {
      drawer: false,
      itemsMenu: [
        {
          href: 'https://docs.google.com/spreadsheets/d/1SUcuQkmDgVZMqNLe7XuNEhmJulonpnSQuSiJAOqfhtY',
          icon: 'mdi-camera',
          text: 'Générations de caméras'
        },
        {
          href: 'https://docs.google.com/spreadsheets/d/1x7SfoMvNILkkzT8feYqgku0qaiI-UcVvC2YfPIIvG-g',
          icon: 'mdi-google-spreadsheet',
          text: 'Geo-Astuces (Redneho)'
        },
        {
          href: 'https://docs.google.com/document/d/1mkof2V97hVqlDsG0NrJKOJLMC40-5BHvMVDQgj4Qvu8',
          icon: 'mdi-google-spreadsheet',
          text: 'La Méta (Armire)'
        },
        {
          href: 'https://docs.google.com/spreadsheets/d/1eN1X7fa-zjR2AR2CUbb_KCjGfSWS2PZZocIqn_wtnxs',
          icon: 'mdi-google-spreadsheet',
          text: 'Guess The Country (LeTakamari)'
        }
      ],
      items: [
        {
          icon: 'mdi-home',
          title: 'Accueil',
          to: '/'
        }
      ],
      title: 'GÉOBTENU',
      randomCountryElement: this.randomCountry()
    }
  },
  watch: {
    '$route' () {
      this.randomCountryElement = this.randomCountry()
    }
  },
  mounted () {
    /* if (this.$cookies.get('theme') !== undefined) {
      this.$vuetify.theme.dark = this.$cookies.get('theme')
    } */
    // this.$watch('$vuetify.theme.dark', this.watchTheme)
  },
  methods: {
    randomCountry () {
      let tmp = finished[Math.floor(Math.random() * finished.length)]
      while (tmp === this.randomCountryElement) {
        tmp = finished[Math.floor(Math.random() * finished.length)]
      }
      return tmp
    }
    /* watchTheme () {
      this.$cookies.set('theme', this.$vuetify.theme.dark)
    } */
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

.geoTitleColorDark:hover {
  color: lightgray;
}
</style>
