<template>
  <v-container>
    <transition name="fade">
      <v-btn
        v-if="showS2T"
        absolute
        fixed
        small
        style="margin-bottom: 58px"
        bottom
        right
        fab
        @click="scrollToTop()"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </transition>
    <v-row :class="productionMode ? 'justifyCenter' : null">
      <v-col
        cols="12"
        lg="8"
        offset-lg="2"
      >
        <v-row>
          <v-col style="position: fixed; z-index: 50;" :style="width">
            <transition name="fade">
              <v-badge
                v-if="width"
                :content="countriesFiltered.length"
                class="d-block"
                color="green"
                overlap
                offset-x="18"
              >
                <v-text-field
                  v-model="search"
                  background-color="#121212"
                  clearable
                  clear-icon="mdi-close-circle"
                  hide-details
                  :append-icon="finishedCountries ? 'mdi-filter-off' : 'mdi-filter'"
                  outlined
                  placeholder="Rechercher un pays ou une capitale"
                  @click:click:clear="search = ''"
                  @click:append="finishedCountries = !finishedCountries; scrollToTop()"
                />
              </v-badge>
            </transition>
          </v-col>
        </v-row>
        <v-row
          v-resize="onResize"
          style="margin-top: 100px;"
          align="center"
          justify="center"
        >
          <transition-group id="vRowFlags" class="row justifyCenter" name="flip-list">
            <v-col
              v-for="value in countriesFiltered"
              :key="`flag_${value.id}`"
              cols="5"
              md="4"
              xl="3"
              class="flip-list-item"
            >
              <nuxt-link :to="{name: 'flag-slug', params: {slug: value.id}}" class="noDecoration">
                <FlagCard :lang="lang" :value="value" :finished="isFinished(value.id)" />
              </nuxt-link>
            </v-col>
          </transition-group>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import countries from '~/assets/countries.json'
import finished from '~/assets/finished.json'
import flagCard from '~/components/flag-card'

const removeAccents = require('remove-accents')

export default {
  name: 'Index',
  components: { flagCard },
  transition: 'page',
  data () {
    return {
      lang: 'fr',
      countries,
      search: null,
      finishedCountries: false,
      width: null,
      showS2T: false
    }
  },
  head: {
    bodyAttrs: {
      class: 'bgColor'
    }
  },
  computed: {
    countriesFiltered () {
      if (!this.search || (this.search && !this.search.length)) {
        return this.filterFinish(this.countries)
      } else {
        const tmp = this.countries.filter(country =>
          this.sanitize(country.country[this.lang]).includes(this.sanitize(this.search)) ||
          (country.capital[this.lang] && this.sanitize(country.capital[this.lang]).includes(this.sanitize(this.search))))
        return this.filterFinish(tmp)
      }
    },
    productionMode () {
      return process.env.NODE_ENV === 'production'
    }
  },
  watch: {
    search () {
      this.scrollToTop()
    }
  },
  mounted () {
    window.onscroll = () => {
      this.showS2T = document.documentElement.scrollTop > 240
    }
    this.onResize()
  },
  methods: {
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    onResize () {
      this.width = `width: ${document.getElementById('vRowFlags').offsetWidth - 30}px`
    },
    isFinished (id) {
      return finished.includes(id)
    },
    filterFinish (d) {
      return this.finishedCountries ? d.filter(c => finished.includes(c.id)) : d
    },
    sanitize (text) {
      return removeAccents(text).replace(/[-‘’']/g, ' ').replace(/[.*?!]/g, '').toUpperCase().trim()
    }
  }
}
</script>

<style>
.bgColor {
  background-color: #121212;
}

.v-input__icon--append > .v-icon {
  color: purple;
}
.v-input__icon--append > .v-icon:hover {
  color: deeppink;
}
</style>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.justifyCenter {
  justify-content: center
}

.noDecoration {
  text-decoration: none
}

.flip-list-item {
  transition: all 1s;
}

.flip-list-leave-active {
  position: absolute;
  bottom: 140vh;
}

.flip-list-enter {
  opacity: 0;
}

.flip-list-leave-to {
  opacity: 0;
}

.page-enter-active, .page-leave-active {
  transition: opacity .2s;
}

.page-enter, .page-leave-active {
  opacity: 0;
}
</style>
