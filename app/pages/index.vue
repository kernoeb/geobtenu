<script setup lang="ts">
import countriesData from '~~/public/content/countries.json'
import finished from '~/data/finished.json'

interface Country {
  id: string
  country: Record<string, string>
  capital: Record<string, string>
  finished: boolean
}

const lang = 'fr'
const finishedSet = new Set(finished)

// Fully static: the whole (small) list is baked in at build time.
const countries: Country[] = (countriesData as Country[]).map(c => ({
  ...c,
  finished: finishedSet.has(c.id)
}))

const search = ref('')
const debouncedSearch = ref('')
const updateDebounced = debounce((v: string) => {
  debouncedSearch.value = v
}, 200)
watch(search, v => updateDebounced(v ?? ''))

const countriesFiltered = computed(() => {
  const q = debouncedSearch.value
  if (!q || !q.length) return countries
  const needle = sanitize(q)
  return countries.filter(c =>
    sanitize(c.country[lang] ?? '').includes(needle) ||
    (c.capital[lang] && sanitize(c.capital[lang]!).includes(needle))
  )
})

// Scroll-to-top button
const showS2T = ref(false)
function onScroll() {
  showS2T.value = document.documentElement.scrollTop > 240
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
watch(debouncedSearch, scrollToTop)

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

useHead({ bodyAttrs: { class: 'bg-bg' } })
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <!-- Scroll to top -->
    <Transition name="fade">
      <button
        v-if="showS2T"
        type="button"
        aria-label="Haut de page"
        class="fixed bottom-10 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#272727] shadow-lg transition hover:bg-[#3a3a3a]"
        @click="scrollToTop"
      >
        <Icon name="mdi:arrow-up" size="22" />
      </button>
    </Transition>

    <!-- Search -->
    <div class="sticky top-14 z-40 mb-4">
      <div class="relative">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher un pays ou une capitale"
          class="w-full rounded-md border border-white/20 bg-[#121212] px-4 py-3 outline-none focus:border-blue-500"
        >
        <span
          class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-green-600 px-2 py-0.5 text-xs font-semibold"
        >{{ countriesFiltered.length }}</span>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
      <FlagCard
        v-for="value in countriesFiltered"
        :key="`flag_${value.id}`"
        :value="value"
        :finished="value.finished"
        :lang="lang"
      />
    </div>
  </div>
</template>
