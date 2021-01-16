<template>
  <v-container>
    <v-row>
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
          style="justify-content: center"
        >
          <v-col v-for="value in countriesFiltered" :key="`flag_${value.id}`" cols="5" md="3" xl="3">
            <nuxt-link :to="{name: 'flag-slug', params: {slug: value.id}}" style="text-decoration: none;">
              <v-card>
                <v-img
                  :src="require(`../assets/flags/png/${value.id}.png`)"
                  class="flag"
                  gradient="to top left, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                  height="180"
                >
                  <template #placeholder>
                    <v-skeleton-loader />
                  </template>
                  <v-card-title style="color: white">
                    {{ value.country.split('|')[0] }}
                  </v-card-title>
                  <v-card-subtitle v-if="value.capital" style="color: white">
                    {{ value.capital }}
                  </v-card-subtitle>
                </v-img>
              </v-card>
            </nuxt-link>
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
      mounted: false,
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
  },
  mounted () {
    this.mounted = true
  }
}
</script>

<style>
.flag:hover {
  filter: brightness(110%);
}
</style>
