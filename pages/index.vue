<template>
  <v-row justify="center" align="center" :style="$vuetify.breakpoint.xlOnly ? `margin-left: 150px; margin-right: 150px` : null" style="transition: margin 500ms; justify-content: center">
    <v-col v-for="(value) in countries" :key="`flag_${value.id}`" cols="5" md="3">
      <v-lazy
        v-model="value.isActive"
        min-height="180"
      >
        <nuxt-link :to="`/flag/${value.id}`" style="text-decoration: none;">
          <v-card>
            <v-img class="flag" height="180" :src="require('../assets/flags/svg/' + value.id + '.svg')" gradient="to top left, rgba(100,115,201,.33), rgba(25,32,72,.7)">
              <v-card-title style="color: white">
                {{ value.country.split('|')[0] }}
              </v-card-title>
              <v-card-subtitle v-if="value.capital" style="color: white">
                {{ value.capital }}
              </v-card-subtitle>
            </v-img>
          </v-card>
        </nuxt-link>
      </v-lazy>
    </v-col>
  </v-row>
</template>

<script>
import countries from '~/assets/countries.json'

export default {
  data () {
    return {
      countries
    }
  }
}
</script>

<style>
.flag:hover {
  filter: brightness(110%);
}
</style>
