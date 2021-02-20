<template>
  <v-container fluid>
    <v-row :style="productionMode ? 'justify-content: center' : null" class="justifyCenter" style="text-align: center">
      <v-col
        cols="12"
      >
        <v-row
          :style="productionMode ? 'justify-content: center' : null"
          align="center"
          class="flex-column"
          justify="center"
        >
          <div v-show="entered && current" ref="tooltip" class="tooltip">
            {{ current }}
          </div>
          <maps-info :elements="elements" :panzoom="panzoom" select="continent" title="Carte des continents" />
          <transition name="fade">
            <v-col
              v-show="panzoom"
              class="map"
              style="border: 1px solid #6d6d6d; border-radius: 10px"
            >
              <svg
                v-show="elements && elements.length"
                id="worldmap"
                height="calc(100vh - (7vh + 200px))"
                style="height: calc(100vh - (7vh + 200px)); width: 100%"
                viewBox="0 0 468 239"
                xmlns="http://www.w3.org/2000/svg"
                @mouseleave="entered ? entered = false : null"
                @mousemove="moveTooltip"
                @mouseover="!entered ? entered = true : null"
              >
                <nuxt-link
                  v-for="(continent, index) in elements"
                  :key="`continent_${index}`"
                  class="noDecoration"
                  to=""
                >
                  <g
                    :fill="getColor(continent['@id'])"
                    :transform="continent['@transform']"
                    @mouseleave="current = null"
                    @mouseover="current = `${continent['@name']} (${continent['@id']})`"
                  >
                    <path v-for="(c, cIndex) in continent.path" v-once :key="`continent_path_${cIndex}`" :d="c['@d']" />
                  </g>
                </nuxt-link>
              </svg>
            </v-col>
          </transition>
        </v-row>
      </v-col>
    </v-row>
    <maps-fab @click="reset()" />
  </v-container>
</template>

<script>
import maps from '~/mixins/maps.js'
import mapsInfo from '~/components/maps/mapsInfo'
import mapsFab from '~/components/maps/fab'

export default {
  name: 'Continent',
  components: {
    mapsInfo,
    mapsFab
  },
  mixins: [maps],
  head () {
    return {
      title: 'Géobtenu | Carte des continents',
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/@panzoom/panzoom@4.3.2/dist/panzoom.min.js'
        }
      ],
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'Géobtenu | Carte des continents'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Géobtenu | Carte des continents'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Géobtenu | Carte des continents'
        }
      ]
    }
  },
  mounted () {
    this.fetchData('/maps/continents.json')
  }
}
</script>

<style scoped src="../assets/maps.css"/>
