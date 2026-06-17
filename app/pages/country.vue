<script setup lang="ts">
import elements from '~/data/maps-countries.json'

const { entered, current, moving, panzoom, tooltip, reset, moveTooltip } = useWorldMap()

function onSelect(id: string) {
  if (!moving.value) navigateTo(`/flag/${id}`)
}

useHead({
  title: 'Géobtenu | Carte des pays',
  meta: [
    { key: 'title', name: 'title', content: 'Géobtenu | Carte des pays' },
    { key: 'og:title', property: 'og:title', content: 'Géobtenu | Carte des pays' },
    { key: 'twitter:title', property: 'twitter:title', content: 'Géobtenu | Carte des pays' }
  ]
})
</script>

<template>
  <div class="mx-auto w-full text-center">
    <div v-show="entered && current" ref="tooltip" class="tooltip">
      {{ current }}
    </div>
    <MapsInfo :elements="elements" :panzoom="panzoom" select="pays" title="Carte des pays" />
    <Transition name="fade">
      <div
        v-show="panzoom"
        class="map mx-auto overflow-hidden"
        style="border: 1px solid #6d6d6d; border-radius: 10px; min-height: calc(100vh - (7vh + 200px))"
      >
        <svg
          v-if="elements && elements.length"
          id="worldmap"
          height="calc(100vh - (7vh + 200px))"
          style="width: 100%"
          viewBox="0 0 1010 666"
          xmlns="http://www.w3.org/2000/svg"
          @mouseleave="entered = false"
          @mousemove="moveTooltip"
          @mouseover="entered = true"
        >
          <CountryPath
            v-for="path in elements"
            :key="`path_${path['@id']}`"
            :element="path"
            @click="onSelect(path['@id'])"
            @mouseover="current = `${path['@name']} (${path['@id']})`"
            @mouseleave="current = null"
          />
        </svg>
      </div>
    </Transition>
    <Transition name="fade">
      <span v-if="panzoom" style="position: absolute; margin-top: 13px; color: gray; font-size: 11px">
        Source : <a target="_blank" rel="noopener" href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/world">svg-maps</a>
      </span>
    </Transition>
    <MapsFab @click="reset" />
  </div>
</template>

<style scoped src="../assets/maps.css" />
