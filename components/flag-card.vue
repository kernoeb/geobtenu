<template>
  <nuxt-link :to="{name: 'flag-slug', params: {slug: value.id}}" class="noDecoration">
    <v-card v-if="value" v-once>
      <v-img
        :src="require(`~/assets/flags/png/${value.id}.png`)"
        :style="!finished ? 'opacity: 0.5' : null"
        class="flag"
        gradient="to top left, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        height="180"
      >
        <v-card-title v-once class="white--text" style="word-break: break-word;">
          {{ value.country[lang].split('|')[0] }}
        </v-card-title>
        <v-card-subtitle v-if="value.capital[lang]" v-once class="white--text">
          {{ value.capital[lang].split('|')[0] }}
        </v-card-subtitle>
      </v-img>
    </v-card>
  </nuxt-link>
</template>

<script>
export default {
  name: 'FlagCard',
  props: {
    value: {
      type: Object,
      default: null
    },
    lang: {
      type: String,
      default: 'fr'
    },
    finished: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.flag:hover {
  filter: brightness(110%);
}

.noDecoration {
  text-decoration: none
}
</style>
