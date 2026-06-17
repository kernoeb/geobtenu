<script setup lang="ts">
import elements from '~/data/maps-continents.json'

const { entered, current, panzoom, tooltip, reset, moveTooltip } = useWorldMap()

useHead({
  title: 'Géobtenu | Carte des continents',
  meta: [
    { key: 'title', name: 'title', content: 'Géobtenu | Carte des continents' },
    { key: 'og:title', property: 'og:title', content: 'Géobtenu | Carte des continents' },
    { key: 'twitter:title', property: 'twitter:title', content: 'Géobtenu | Carte des continents' }
  ]
})
</script>

<template>
  <div class="mx-auto w-full text-center">
    <div v-show="entered && current" ref="tooltip" class="tooltip">
      {{ current }}
    </div>
    <MapsInfo :elements="elements" :panzoom="panzoom" select="continent" title="Carte des continents" />
    <Transition name="fade">
      <div
        v-show="panzoom"
        class="map mx-auto overflow-hidden"
        style="border: 1px solid #6d6d6d; border-radius: 10px"
      >
        <svg
          v-if="elements && elements.length"
          id="worldmap"
          height="calc(100vh - (7vh + 200px))"
          style="height: calc(100vh - (7vh + 200px)); width: 100%"
          viewBox="0 0 468 239"
          xmlns="http://www.w3.org/2000/svg"
          @mouseleave="entered = false"
          @mousemove="moveTooltip"
          @mouseover="entered = true"
        >
          <g
            v-for="(continent, index) in elements"
            :key="`continent_${index}`"
            :class="`continent_${index}`"
            :fill="continentColor(continent['@id'])"
            :transform="continent['@transform']"
            @mouseleave="current = null"
            @mouseover="current = `${continent['@name']} (${continent['@id']})`"
          >
            <path
              v-for="(c, cIndex) in continent.path"
              :key="`continent_path_${cIndex}`"
              :d="c['@d']"
            />
          </g>
        </svg>
      </div>
    </Transition>
    <Transition name="fade">
      <span v-if="panzoom" style="position: absolute; margin-top: 13px; color: gray; font-size: 11px">
        Source : <a target="_blank" rel="noopener" href="https://fr.wikipedia.org/wiki/Fichier:Continents.svg">wikipédia</a>
      </span>
    </Transition>
    <MapsFab @click="reset" />
  </div>
</template>

<style scoped src="../assets/maps.css" />
