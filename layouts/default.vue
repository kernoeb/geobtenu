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
            <v-icon>{{ mdiWindowClose }}</v-icon>
          </v-btn>
          <v-list-item-title
            class="geoTitle geoTitleColorDark"
          >
            {{ $options.title }}
          </v-list-item-title>
        </v-list-item>

        <v-divider />
        <v-list-item
          v-for="(item, i) in $options.items"
          v-once
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
            <v-icon>{{ mdiMapMarkerCircle }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px" v-text="'Pays aléatoire'" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{name: 'map'}">
          <v-list-item-action>
            <v-icon>{{ mdiMap }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px" v-text="'Carte du monde'" />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item v-once href="https://fr.wikipedia.org/wiki/Sens_de_circulation_(route)" target="_blank">
          <v-list-item-action>
            <v-icon>{{ mdiRoad }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px" v-text="'Sens de circulation (W)'" />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-for="(d, index) in $options.itemsMenu"
          v-once
          :key="`itemsmenu_${index}`"
          :href="d.href"
          target="_blank"
        >
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
            <v-icon>{{ mdiInformation }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px" v-text="'Crédits'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      dense
    >
      <v-icon @click.stop="drawer = !drawer">
        {{ mdiMenu }}
      </v-icon>
      <v-spacer />
      <nuxt-link :to="{name: 'index'}" class="noDecoration">
        <v-toolbar-title
          class="geoTitle geoTitleColorDark"
          v-text="$options.title"
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
      v-once
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
import {
  mdiMap,
  mdiCamera,
  mdiGoogleSpreadsheet,
  mdiHome,
  mdiWindowClose,
  mdiMapMarkerCircle,
  mdiRoad,
  mdiInformation,
  mdiMenu
} from '@mdi/js'
import finished from '~/assets/finished.json'

export default {
  itemsMenu: [
    {
      href: 'https://docs.google.com/spreadsheets/d/1SUcuQkmDgVZMqNLe7XuNEhmJulonpnSQuSiJAOqfhtY',
      icon: mdiCamera,
      text: 'Générations de caméras'
    },
    {
      href: 'https://docs.google.com/spreadsheets/d/1x7SfoMvNILkkzT8feYqgku0qaiI-UcVvC2YfPIIvG-g',
      icon: mdiGoogleSpreadsheet,
      text: 'Geo-Astuces (Redneho)'
    },
    {
      href: 'https://docs.google.com/document/d/1mkof2V97hVqlDsG0NrJKOJLMC40-5BHvMVDQgj4Qvu8',
      icon: mdiGoogleSpreadsheet,
      text: 'La Méta (Armire)'
    },
    {
      href: 'https://docs.google.com/spreadsheets/d/1eN1X7fa-zjR2AR2CUbb_KCjGfSWS2PZZocIqn_wtnxs',
      icon: mdiGoogleSpreadsheet,
      text: 'Guess The Country (LeTakamari)'
    }
  ],
  items: [
    {
      icon: mdiHome,
      title: 'Accueil',
      to: '/'
    }
  ],
  title: 'GÉOBTENU',
  data () {
    return {
      // ICONS
      mdiWindowClose,
      mdiMapMarkerCircle,
      mdiRoad,
      mdiInformation,
      mdiMenu,
      mdiMap,

      // OTHERS
      drawer: false,
      randomCountryElement: this.randomCountry()
    }
  },
  watch: {
    '$route' () {
      this.randomCountryElement = this.randomCountry()
    }
  },
  methods: {
    randomCountry () {
      let tmp = finished[Math.floor(Math.random() * finished.length)]
      while (tmp === this.randomCountryElement) {
        tmp = finished[Math.floor(Math.random() * finished.length)]
      }
      return tmp
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

.geoTitleColorDark:hover {
  color: lightgray;
}
</style>
