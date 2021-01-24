<template>
  <v-container>
    <v-row class="justifyCenter">
      <v-col
        cols="12"
        lg="8"
        offset-lg="2"
      >
        <v-row>
          <v-text-field v-model="search" placeholder="Rechercher un pays ou une capitale" />
          <v-btn
            class="mt-4"
            icon
            @click="finishedCountries = !finishedCountries"
          >
            <v-icon>{{ finishedCountries ? 'mdi-filter-off' : 'mdi-filter' }}</v-icon>
          </v-btn>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <transition-group class="row justifyCenter" name="flip-list">
            <v-col
              v-for="value in countriesFiltered"
              :key="`flag_${value.id}`"
              cols="5"
              md="4"
              xl="3"
              class="flip-list-item"
            >
              <v-lazy
                v-model="value.isActive"
                height="170"
              >
                <nuxt-link :to="{name: 'flag-slug', params: {slug: value.id}}" class="noDecoration">
                  <FlagCard :lang="lang" :value="value" />
                </nuxt-link>
              </v-lazy>
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

export default {
  name: 'Index',
  components: { flagCard },
  transition: 'page',
  data () {
    return {
      lang: 'fr',
      countries,
      search: null,
      finishedCountries: false
    }
  },
  computed: {
    countriesFiltered () {
      if (!this.search) {
        const c = this.countries
        for (let i = 0; i < 16; i++) {
          c[i].isActive = true
        }
        return this.filterFinish(c)
      } else if (!this.search.length) {
        return this.filterFinish(this.countries)
      } else {
        const tmp = this.countries.filter(country =>
          country.country[this.lang].toUpperCase().includes(this.search.toUpperCase()) ||
          (country.capital[this.lang] && country.capital[this.lang].toUpperCase().includes(this.search.toUpperCase())))
        return this.filterFinish(tmp)
      }
    }
  },
  methods: {
    filterFinish (d) {
      if (this.finishedCountries) { return d.filter(c => finished.includes(c.id)) } else { return d }
    }
  }
}
</script>

<style scoped>
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
}

.flip-list-enter {
  opacity: 0;
}

.flip-list-leave-to {
  opacity: 0;
  transform: translateY(100vh);
}

.page-enter-active, .page-leave-active {
  transition: opacity .2s;
}

.page-enter, .page-leave-active {
  opacity: 0;
}
</style>
