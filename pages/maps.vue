<template>
  <div>
    <div id="map-wrap" style="height: calc(100vh - (25px + 48px + 24px))">
      <client-only>
        <l-map :zoom="4" :center="[47, -1]" :style="darkTheme ? 'filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);' : null">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-geo-json
            v-if="geojson && showBorders"
            :geojson="geojson"
          />
          <l-control position="bottomleft">
            <v-btn v-if="showBorders" class="hoverButton" @click="showBorders = false">
              Cacher les contours
            </v-btn>
            <v-btn v-else class="hoverButton" @click="showBorders = true">
              Afficher les contours
            </v-btn>
          </l-control>
          <l-control position="bottomright">
            <v-btn
              absolute
              bottom
              fab
              right
              small
              style="margin-bottom: 20px; margin-right: -15px;"
              @click="darkTheme = !darkTheme"
            >
              <v-icon>{{ mdiThemeLightDark }}</v-icon>
            </v-btn>
          </l-control>
        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mdiThemeLightDark } from '@mdi/js'

export default {
  name: 'Maps',
  data () {
    return {
      geojson: null,
      showBorders: false,
      darkTheme: false,
      mdiThemeLightDark
    }
  },
  head: {
    title: 'Géobtenu | Carte générale',
    meta: [
      {
        hid: 'title',
        name: 'title',
        content: 'Géobtenu | Carte générale'
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Géobtenu | Carte générale'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Géobtenu | Carte générale'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: '/css/leaflet.css'
      }
    ]
  },
  async mounted () {
    const response = await fetch('/content/countries-land-5km.geo.json')
    const data = await response.json()
    this.geojson = data
  },
  methods: {

  }
}
</script>

<style scoped>
.hoverButton {
  opacity: 0.5;
}

.hoverButton:hover {
  opacity: 1;
}

.disableDarkTheme {
  z-index: -1;
}
</style>
