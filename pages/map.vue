<template>
  <v-container>
    <v-row :style="productionMode ? 'justify-content: center' : null" class="justifyCenter" style="text-align: center">
      <v-col
        class="mt-5"
        cols="12"
        lg="8"
      >
        <v-row
          :style="productionMode ? 'justify-content: center' : null"
          align="center"
          justify="center"
        >
          <div v-show="entered && currentCountry" ref="tooltip" class="tooltip">
            {{ currentCountry }}
          </div>
          <v-progress-circular
            v-if="!countries"
            color="primary"
            indeterminate
          />
          <svg
            v-else
            class="map"
            viewBox="0 0 1010 666"
            xmlns="http://www.w3.org/2000/svg"
            @mousemove="moveTooltip"
            @mouseleave="entered ? entered = false : null"
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
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Map',
  transition: 'page',
  data () {
    return {
      countries: null,
      selectedLocation: null,
      entered: false,
      currentCountry: null
    }
  },
  head () {
    return {
      title: 'Géobtenu | Carte'
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
    })
  },
  methods: {
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
  width: 100%;
  height: auto;
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

.page-enter-active, .page-leave-active {
  transition: opacity .2s;
}

.page-enter, .page-leave-active {
  opacity: 0;
}
</style>
