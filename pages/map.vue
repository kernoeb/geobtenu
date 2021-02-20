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
          <maps-info :elements="elements" :panzoom="panzoom" :select="$vuetify.breakpoint.mobile ? 'pays (peut être lent sur mobile)' : 'pays'" title="Carte des pays" />
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
                viewBox="0 0 1010 666"
                xmlns="http://www.w3.org/2000/svg"
                @mouseleave="entered ? entered = false : null"
                @mousemove="moveTooltip"
                @mouseover="!entered ? entered = true : null"
              >
                <nuxt-link
                  v-for="path in elements"
                  :key="`path_${path['@id']}`"
                  :to="{name: 'flag-slug', params: {slug: path['@id']}}"
                  class="noDecoration"
                >
                  <country
                    v-once
                    :element="path"
                    @mouseleave.native="current = null"
                    @mouseover.native="current = `${path['@name']} (${path['@id']})`"
                  />
                </nuxt-link>
              </svg>
            </v-col>
          </transition>
        </v-row>
      </v-col>
    </v-row>
    <transition name="fade">
      <span v-if="panzoom" style="position: absolute; margin-top: 13px; color: gray; font-size: 11px;">Source : <a target="_blank" href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/world">svg-maps</a></span>
    </transition>
    <maps-fab @click="reset()" />
  </v-container>
</template>

<script>
import country from '~/components/country'
import mapsInfo from '~/components/maps/mapsInfo'
import mapsFab from '~/components/maps/fab'
import maps from '~/mixins/maps'

export default {
  name: 'Map',
  components: {
    country,
    mapsInfo,
    mapsFab
  },
  mixins: [maps],
  head () {
    return {
      title: 'Géobtenu | Carte des pays',
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/@panzoom/panzoom@4.3.2/dist/panzoom.min.js'
        }
      ],
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'Géobtenu | Carte des pays'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Géobtenu | Carte des pays'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Géobtenu | Carte des pays'
        }
      ]
    }
  },
  mounted () {
    this.fetchData('/maps/countries.json')
  }
}
</script>

<style scoped src="../assets/maps.css"/>
