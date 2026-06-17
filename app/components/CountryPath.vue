<script setup lang="ts">
interface PathElement {
  '@id': string
  '@d': string
  '@name': string
  '@continent'?: string
}

defineProps<{ element: PathElement }>()
defineEmits<{ click: [id: string] }>()
</script>

<template>
  <path
    :id="element['@id']"
    :d="element['@d']"
    :name="element['@name']"
    class="path"
    :style="{ fill: continentColor(element['@continent']) }"
    @click="$emit('click', element['@id'])"
  />
</template>

<style scoped>
.path {
  cursor: pointer;
  stroke-width: 0.5;
  stroke: rgba(0, 0, 0, 0.5);
  fill: #a1d99b;
}
</style>
