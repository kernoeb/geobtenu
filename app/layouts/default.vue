<script setup lang="ts">
import finished from '~/data/finished.json'

const TITLE = 'GÉOBTENU'

const externalDocs = [
  { href: 'https://docs.google.com/spreadsheets/d/1SUcuQkmDgVZMqNLe7XuNEhmJulonpnSQuSiJAOqfhtY', icon: 'mdi:camera', text: 'Générations de caméras' },
  { href: 'https://docs.google.com/spreadsheets/d/1x7SfoMvNILkkzT8feYqgku0qaiI-UcVvC2YfPIIvG-g', icon: 'mdi:google-spreadsheet', text: 'Geo-Astuces (Redneho)' },
  { href: 'https://docs.google.com/document/d/1mkof2V97hVqlDsG0NrJKOJLMC40-5BHvMVDQgj4Qvu8', icon: 'mdi:google-spreadsheet', text: 'La Méta (Armire)' },
  { href: 'https://docs.google.com/spreadsheets/d/1eN1X7fa-zjR2AR2CUbb_KCjGfSWS2PZZocIqn_wtnxs', icon: 'mdi:google-spreadsheet', text: 'Guess The Country (LeTakamari)' }
]

const navLinks = [
  { to: '/', icon: 'mdi:home', title: 'Accueil', color: undefined },
  { to: '/country', icon: 'mdi:map', title: 'Carte des pays', color: undefined },
  { to: '/continent', icon: 'mdi:earth', title: 'Carte des continents', color: undefined },
  { to: '/maps', icon: 'mdi:map-check-outline', title: 'Carte générale', color: undefined },
  { to: '/languages', icon: 'mdi:translate', title: 'Langues', color: '#2196f3' }
]

const drawer = ref(false)
const route = useRoute()

// Random "finished" country. Initialised to a stable value for SSR/hydration,
// then randomised on the client and on every route change.
const randomCountry = ref(finished[0])
function pickRandom() {
  let tmp = finished[Math.floor(Math.random() * finished.length)]
  while (tmp === randomCountry.value) tmp = finished[Math.floor(Math.random() * finished.length)]
  randomCountry.value = tmp
}
onMounted(pickRandom)
watch(() => route.path, () => {
  drawer.value = false
  pickRandom()
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- App bar -->
    <header
      class="fixed inset-x-0 top-0 z-50 flex h-12 items-center bg-[#272727] px-3 shadow"
      style="position: fixed; top: 0; left: 0; right: 0; z-index: 50; height: 3rem; background: #272727"
    >
      <button type="button" aria-label="Menu" class="inline-flex items-center justify-center rounded p-1 text-white transition hover:bg-white/10" @click.stop="drawer = !drawer">
        <Icon name="mdi:menu" size="24" />
      </button>
      <div class="flex-1" />
      <NuxtLink to="/" class="no-underline">
        <span class="geo-title text-2xl text-white hover:text-gray-300">{{ TITLE }}</span>
      </NuxtLink>
      <div class="flex-1" />
    </header>

    <!-- Drawer overlay -->
    <Transition name="fade">
      <div v-if="drawer" class="fixed inset-0 z-[1390] bg-black/50" @click="drawer = false" />
    </Transition>

    <!-- Navigation drawer -->
    <Transition name="slide">
      <nav
        v-if="drawer"
        class="fixed inset-y-0 left-0 z-[1400] w-[300px] overflow-y-auto bg-[#1e1e1e] py-2 text-sm"
      >
        <div class="flex items-center gap-2 px-2 py-1">
          <button type="button" aria-label="Fermer" class="inline-flex items-center justify-center rounded p-1 text-white transition hover:bg-white/10" @click.stop="drawer = false">
            <Icon name="mdi:window-close" size="24" />
          </button>
          <span class="geo-title text-2xl text-white">{{ TITLE }}</span>
        </div>
        <hr class="my-1 border-white/10">

        <NuxtLink
          v-for="item in navLinks"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-4 px-4 py-2 no-underline hover:bg-white/5"
          active-class="bg-white/10"
        >
          <Icon :name="item.icon" size="22" :style="item.color ? { color: item.color } : undefined" />
          <span>{{ item.title }}</span>
        </NuxtLink>

        <NuxtLink
          :to="`/flag/${randomCountry}`"
          class="flex items-center gap-4 px-4 py-2 no-underline hover:bg-white/5"
        >
          <Icon name="mdi:map-marker-circle" size="22" style="color: #c15260" />
          <span>Pays aléatoire</span>
        </NuxtLink>

        <hr class="my-1 border-white/10">
        <a
          href="https://fr.wikipedia.org/wiki/Sens_de_circulation_(route)"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-4 px-4 py-2 no-underline hover:bg-white/5"
        >
          <Icon name="mdi:road" size="22" />
          <span>Sens de circulation (W)</span>
        </a>

        <hr class="my-1 border-white/10">
        <a
          v-for="d in externalDocs"
          :key="d.href"
          :href="d.href"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-4 px-4 py-2 no-underline hover:bg-white/5"
        >
          <Icon :name="d.icon" size="22" style="color: #00a559" />
          <span>{{ d.text }}</span>
        </a>

        <hr class="my-1 border-white/10">
        <a
          href="https://discord.gg/sWYWyqZGAj"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-4 px-4 py-2 no-underline hover:bg-white/5"
        >
          <Icon name="mdi:discord" size="22" style="color: #7289da" />
          <span>Discord Géobtenu</span>
        </a>
        <NuxtLink to="/credits" class="flex items-center gap-4 px-4 py-2 no-underline hover:bg-white/5">
          <Icon name="mdi:information" size="22" />
          <span>Crédits</span>
        </NuxtLink>
      </nav>
    </Transition>

    <!-- Page content -->
    <main class="flex-1 px-3 pb-10 pt-16">
      <slot />
    </main>

    <!-- Footer -->
    <footer
      class="fixed inset-x-0 bottom-0 z-[1450] flex h-[25px] items-center bg-[#272727] px-3 text-[10px]"
      style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 1450; height: 25px; background: #272727; display: flex; align-items: center"
    >
      <span>Géobtenu | <a href="https://twitter.com/kernoeb" class="text-[#00ACEE]">@kernoeb</a></span>
      <span class="flex-1" />
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </footer>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
