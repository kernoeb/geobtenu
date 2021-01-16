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
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col v-for="value in countriesFiltered" :key="`flag_${value.id}`" cols="5" md="3" xl="3">
            <v-lazy
              v-model="value.isActive"
              height="180"
            >
              <nuxt-link :to="{name: 'flag-slug', params: {slug: value.id}}" class="noDecoration">
                <v-card>
                  <v-img
                    :src="require(`../assets/flags/png/${value.id}.png`)"
                    class="flag"
                    gradient="to top left, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                    height="180"
                  >
                    <v-card-title class="white--text">
                      {{ value.country.split('|')[0] }}
                    </v-card-title>
                    <v-card-subtitle v-if="value.capital" class="white--text">
                      {{ value.capital }}
                    </v-card-subtitle>
                  </v-img>
                </v-card>
              </nuxt-link>
            </v-lazy>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import countries from '~/assets/countries.json'

export default {
  name: 'Index',
  data () {
    return {
      countries,
      search: ''
    }
  },
  computed: {
    countriesFiltered () {
      if (!this.search.length) {
        return this.countries
      } else {
        return this.countries.filter(country =>
          country.country.toUpperCase().includes(this.search.toUpperCase()) ||
          (country.capital && country.capital.toUpperCase().includes(this.search.toUpperCase())))
      }
    }
  }
}
</script>

<style>
.flag:hover {
  filter: brightness(110%);
}

.justifyCenter {
  justify-content: center
}

.noDecoration {
  text-decoration: none
}
</style>
