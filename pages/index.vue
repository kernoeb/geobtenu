<template>
  <v-row justify="center" align="center" :style="$vuetify.breakpoint.xlOnly ? `margin-left: 150px; margin-right: 150px` : null" style="transition: margin 500ms">
    <v-col v-for="(value, key) in countries" :key="`flag_${key}`" cols="5" md="3">
      <nuxt-link :to="`/flag/${key}`" style="text-decoration: none;">
        <v-card>
          <v-img class="flag" height="180" :lazy-src="'/flags/png/' + key + '.png'" :src="'/flags/svg/' + key + '.svg'" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
            <v-card-title style="color: white">
              {{ value }}
            </v-card-title>
          </v-img>
        </v-card>
      </nuxt-link>
    </v-col>
  </v-row>
</template>

<script>
import countries from '@/static/flags/countries.json'

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
  filter: brightness(120%);
}
</style>
