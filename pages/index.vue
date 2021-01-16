<template>
  <v-row
    align="center"
    justify="center"
    style="justify-content: center"
  >
    <v-col v-for="value in countries" :key="`flag_${value.id}`" cols="5" md="3">
      <nuxt-link :to="`/flag/${value.id}`" style="text-decoration: none;">
        <v-card>
          <v-img
            :src="require('../assets/flags/svg/' + value.id + '.svg')"
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
</template>

<script>
import countries from '~/assets/countries.json'

export default {
  data () {
    return {
      countries,
      mounted: false
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
