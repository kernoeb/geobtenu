<script setup lang="ts">
interface CountryValue {
  id: string
  country: Record<string, string>
  capital: Record<string, string>
}

const props = withDefaults(defineProps<{
  value: CountryValue
  lang?: string
  finished?: boolean
  /** Above-the-fold cards load eagerly with high priority (avoids pop-in / better LCP). */
  priority?: boolean
}>(), {
  lang: 'fr',
  finished: true,
  priority: false
})

const countryName = computed(() => props.value.country[props.lang]?.split('|')[0] ?? '')
const capitalName = computed(() => props.value.capital[props.lang]?.split('|')[0] ?? '')
</script>

<template>
  <NuxtLink :to="`/flag/${value.id}`" class="flag-card">
    <div class="flag-card__inner">
      <!-- width/height give the img an intrinsic box matching the card aspect, and
           decoding="sync" makes the decoded bitmap commit in the same paint as the
           object-fit:cover layout. Without both, the img paints one frame at the
           flag's natural aspect (letterboxed "contain") before snapping to cover. -->
      <img
        :src="`/flags/png/${value.id}.png`"
        :alt="`flag_${value.id}`"
        width="247"
        height="180"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : undefined"
        decoding="sync"
        class="flag"
        :style="finished ? undefined : 'opacity:0.5'"
      >
      <div class="flag-card__gradient" />
      <div class="flag-card__text">
        <span class="flag-card__country">{{ countryName }}</span>
        <span v-if="capitalName" class="flag-card__capital">{{ capitalName }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.flag-card {
  display: block;
  text-decoration: none;
}

.flag-card__inner {
  position: relative;
  height: 180px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.flag {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.15s ease;
}

.flag-card:hover .flag {
  filter: brightness(110%);
}

.flag-card__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top left, rgba(100, 115, 201, 0.33), rgba(25, 32, 72, 0.7));
}

.flag-card__text {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.flag-card__country {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: #fff;
  word-break: break-word;
}

.flag-card__capital {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #fff;
}
</style>
