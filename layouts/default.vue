<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      disable-resize-watcher
      style="z-index: 1400"
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
            >
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{name: 'flag-slug', params: {slug: randomCountryElement}}">
          <v-list-item-action>
            <v-icon color="#c15260">
              {{ mdiMapMarkerCircle }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px">
              Pays aléatoire
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{name: 'country'}">
          <v-list-item-action>
            <v-icon>{{ mdiMap }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px">
              Carte des pays
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{name: 'continent'}">
          <v-list-item-action>
            <v-icon>{{ mdiEarth }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px">
              Carte des continents
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{name: 'maps'}">
          <v-list-item-action>
            <v-icon>{{ mdiMapCheckOutline }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px">
              Carte générale
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{name: 'languages'}">
          <v-list-item-action>
            <v-icon color="blue">
              {{ mdiTranslate }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px">
              Langues
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item v-once href="https://fr.wikipedia.org/wiki/Sens_de_circulation_(route)" target="_blank">
          <v-list-item-action>
            <v-icon>{{ mdiRoad }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px">
              Sens de circulation (W)
            </v-list-item-title>
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
            <v-icon color="#00a559">
              {{ d.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px">
              {{ d.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item href="https://discord.gg/sWYWyqZGAj" target="_blank">
          <v-list-item-action>
            <v-icon color="#7289da">
              {{ mdiDiscord }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px">
              Discord Géobtenu
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/credits">
          <v-list-item-action>
            <v-icon>{{ mdiInformation }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 13px">
              Crédits
            </v-list-item-title>
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
        >
          {{ $options.title }}
        </v-toolbar-title>
      </nuxt-link>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      v-once
      app
      fixed
      height=" 25"
      style="font-size: 10px; z-index: 1450;"
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
  mdiMenu,
  mdiEarth,
  mdiTranslate,
  mdiDiscord,
  mdiMapCheckOutline
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
      mdiEarth,
      mdiTranslate,
      mdiDiscord,
      mdiMapCheckOutline,

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
