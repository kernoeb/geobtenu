<template>
  <v-container fluid>
    <v-row :style="productionMode ? 'justify-content: center' : null" class="justifyCenter" style="text-align: center">
      <v-col
        cols="12"
      >
        <v-row
          :style="productionMode ? 'justify-content: center' : null"
          align="center"
          justify="center"
          class="flex-column"
        >
          <div v-show="entered && currentCountry" ref="tooltip" class="tooltip">
            {{ currentCountry }}
          </div>
          <v-col class="d-flex justify-center align-content-center flex-column">
            <div class="mapTitle mb-0">
              Carte du monde
            </div>
            <div class="mb-3">
              <transition name="fade2" mode="out-in">
                <div v-if="countries === null && panzoom === null" key="1">
                  <small style="color: darkgrey">Chargement de la carte...</small>
                </div>
                <div v-else-if="countries && countries.length && panzoom !== null" key="2">
                  <small style="color: darkgrey">Sélectionnez un pays</small>
                </div>
                <div v-else key="3">
                  <small style="color: darkgrey">Erreur...</small>
                </div>
              </transition>
            </div>
          </v-col>
          <transition name="fade">
            <v-col
              v-show="panzoom"
              style="border: 1px solid #6d6d6d; border-radius: 10px"
              class="map"
            >
              <svg
                v-show="countries && countries.length"
                id="worldmap"
                height="calc(100vh - (7vh + 200px))"
                style="height: calc(100vh - (7vh + 200px)); width: 100%"
                viewBox="0 0 1010 666"
                xmlns="http://www.w3.org/2000/svg"
                @mouseleave="entered ? entered = false : null"
                @mousemove="moveTooltip"
                @mouseover="!entered ? entered = true : null"
              >
                <nuxt-link
                  v-for="path in countries"
                  :key="`path_${path['@id']}`"
                  :to="{name: 'flag-slug', params: {slug: path['@id']}}"
                  class="noDecoration"
                >
                  <path
                    :id="path['@id']"
                    :d="path['@d']"
                    :name="path['@name']"
                    :style="`fill: ${getColor(path['@continent'])}`"
                    class="path"
                    @mouseleave="currentCountry = null"
                    @mouseover="currentCountry = `${path['@name']} (${path['@id']})`"
                  />
                </nuxt-link>
              </svg>
            </v-col>
          </transition>
        </v-row>
      </v-col>
    </v-row>
    <v-btn
      absolute
      bottom
      fab
      fixed
      right
      small
      style="margin-bottom: 58px"
      @click="reset()"
    >
      <v-icon>{{ mdiRestart }}</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mdiRestart } from '@mdi/js'

export default {
  name: 'Map',
  scrollToTop: true,
  transition: 'page',
  data () {
    return {
      countries: null,
      selectedLocation: null,
      entered: false,
      currentCountry: null,
      mdiRestart,
      panzoom: null,
      show: false
    }
  },
  head () {
    return {
      title: 'Géobtenu | Carte du monde',
      script: [
        {
          src: 'https://timmywil.com/panzoom/demo/panzoom.js'
        }
      ],
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'Géobtenu | Carte du monde'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Géobtenu | Carte du monde'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Géobtenu | Carte du monde'
        }
      ]
    }
  },
  computed: {
    productionMode () {
      return process.env.NODE_ENV === 'production'
    }
  },
  mounted () {
    fetch('/maps/world.json').then(response => response.json()).then((data) => {
      this.countries = data

      const elem = document.getElementById('worldmap')
      const parent = elem.parentElement

      // eslint-disable-next-line no-undef
      this.panzoom = Panzoom(elem, { canvas: true, maxScale: 8, isSVG: true })
      parent.addEventListener('wheel', this.panzoom.zoomWithWheel)
    }).catch(() => {
      this.countries = []
    })
  },
  methods: {
    reset () {
      this.panzoom.reset()
    },
    moveTooltip (el) {
      if (this.$refs.tooltip) {
        this.$refs.tooltip.style.left = el.pageX + 'px'
        this.$refs.tooltip.style.top = `${el.pageY - 30}px`
      }
    },
    getColor (continent) {
      if (continent === 'EU') {
        return '#eaff00'
      } else if (continent === 'AN') {
        return '#29997f'
      } else if (continent === 'AF') {
        return '#ffc600'
      } else if (continent === 'NA') {
        return '#00ccff'
      } else if (continent === 'OC') {
        return '#ff0000'
      } else if (continent === 'SA') {
        return '#00ffee'
      } else if (continent === 'AS') {
        return '#1ff18f'
      }
    }
  }
}
</script>

<style scoped>
.tooltip {
  z-index: 1000;
  border-radius: 10px;
  border: 1px solid white;
  background-color: #111010;
  color: white;
  min-height: 50px;
  min-width: 110px;
  padding: 3px;
  position: absolute;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.justifyCenter {
  justify-content: center
}

.map {
  flex:1;
}

.path {
  stroke-width: 0.5;
  stroke: rgba(0, 0, 0, 0.5);
  fill: #a1d99b;
}

.noDecoration {
  text-decoration: none;
  color: inherit;
}

.map path:hover {
  fill: white !important;
}

.mapTitle {
  font-size: 2.4vw;
  font-weight: bold;
}

@media only screen and (min-width: 845px) and (max-width: 1015px) {
  .mapTitle {
    font-size: 5vw;
  }
}

@media only screen and (min-width: 717px) and (max-width: 844px) {
  .mapTitle {
    font-size: 6vw;
  }
}

@media only screen and (max-width: 716px) {
  .mapTitle {
    font-size: 7vw;
  }
}

.page-enter-active, .page-leave-active {
  transition: opacity .2s;
}

.page-enter, .page-leave-active {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade2-enter-active, .fade2-leave-active {
  transition: opacity 0.3s;
}

.fade2-enter, .fade2-leave-to {
  opacity: 0;
}
</style>
