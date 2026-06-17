<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  select?: string
  elements?: unknown[] | null
  panzoom?: unknown | null
}>(), {
  title: 'Carte',
  select: 'élément',
  elements: null,
  panzoom: null
})
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center">
    <div class="map-title mb-0">
      {{ title }}
    </div>
    <div class="mb-3">
      <Transition name="fade" mode="out-in">
        <div v-if="elements === null || panzoom === null" key="1">
          <small style="color: darkgrey">Chargement de la carte...</small>
        </div>
        <div v-else-if="elements && elements.length" key="2">
          <small style="color: darkgrey">Sélectionnez un {{ select }}</small>
        </div>
        <div v-else key="3">
          <small style="color: darkgrey">Erreur...</small>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.map-title {
  font-size: 2.4vw;
  font-weight: bold;
}
@media only screen and (min-width: 845px) and (max-width: 1015px) {
  .map-title { font-size: 5vw; }
}
@media only screen and (min-width: 717px) and (max-width: 844px) {
  .map-title { font-size: 6vw; }
}
@media only screen and (max-width: 716px) {
  .map-title { font-size: 7vw; }
}
</style>
