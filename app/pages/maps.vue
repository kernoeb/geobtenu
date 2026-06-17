<script setup lang="ts">
interface GeoJson { type: string, features: unknown[] }

const geojson = ref<GeoJson | null>(null)
const showBorders = ref(false)
const darkTheme = ref(false)

const darkFilter = 'filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);'

// Keep the LGeoJson layer always mounted and swap its data instead of using v-if:
// toggling v-if on a layer that sits among Leaflet-managed siblings (controls)
// breaks Vue's DOM reconciliation in vue-leaflet ("insertBefore" error).
const EMPTY_GEO: GeoJson = { type: 'FeatureCollection', features: [] }
const displayedGeojson = computed<GeoJson>(() => (showBorders.value && geojson.value) ? geojson.value : EMPTY_GEO)

onMounted(async () => {
  geojson.value = await $fetch<GeoJson>('/content/countries-land-5km.geo.json')
})

useHead({
  title: 'Géobtenu | Carte générale',
  meta: [
    { key: 'title', name: 'title', content: 'Géobtenu | Carte générale' },
    { key: 'og:title', property: 'og:title', content: 'Géobtenu | Carte générale' },
    { key: 'twitter:title', property: 'twitter:title', content: 'Géobtenu | Carte générale' }
  ],
  link: [{ rel: 'stylesheet', href: '/css/leaflet.css' }]
})
</script>

<template>
  <div>
    <div id="map-wrap" class="map-wrap" :style="darkTheme ? darkFilter : undefined">
      <ClientOnly>
        <LMap :zoom="4" :center="[47, -1]" :use-global-leaflet="false">
          <LTileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <LGeoJson :geojson="displayedGeojson" />
          <LControl position="bottomleft">
            <button
              type="button"
              class="hover-button rounded bg-[#272727] px-3 py-2 text-sm shadow"
              @click="showBorders = !showBorders"
            >
              {{ showBorders ? 'Cacher les contours' : 'Afficher les contours' }}
            </button>
          </LControl>
          <LControl position="bottomright">
            <button
              type="button"
              aria-label="Thème"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[#272727] shadow transition hover:bg-[#3a3a3a]"
              @click="darkTheme = !darkTheme"
            >
              <Icon name="mdi:theme-light-dark" size="22" />
            </button>
          </LControl>
        </LMap>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
.map-wrap {
  height: calc(100vh - (25px + 48px + 24px));
}
.hover-button {
  opacity: 0.5;
}
.hover-button:hover {
  opacity: 1;
}
</style>
