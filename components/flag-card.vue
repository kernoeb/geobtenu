<template>
  <v-card v-if="value">
    <v-img
      :src="require(`../assets/flags/png/${value.id}.png`)"
      class="flag"
      gradient="to top left, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      height="180"
    >
      <v-card-title class="white--text">
        {{ value.country[lang].split('|')[0] }}
      </v-card-title>
      <v-card-subtitle v-if="value.capital[lang]" class="white--text">
        {{ value.capital[lang] }}
      </v-card-subtitle>
    </v-img>
  </v-card>
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
    }
  }
}
</script>

<style scoped>
.flag:hover {
  filter: brightness(110%);
}
</style>
