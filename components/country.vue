<template>
  <path
    :id="element['@id']"
    :d="element['@d']"
    :name="element['@name']"
    :style="`fill: ${getColor(element['@continent'])}`"
    class="path"
  />
</template>
<script>

export default {
  name: 'Country',
  props: {
    element: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
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
.path {
  stroke-width: 0.5;
  stroke: rgba(0, 0, 0, 0.5);
  fill: #a1d99b;
}
</style>
