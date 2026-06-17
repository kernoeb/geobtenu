<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const title = computed(() =>
  props.error?.statusCode === 404 ? '404 Not Found' : 'An error occurred'
)

useHead({ title })
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg text-white">
    <h1 class="text-xl font-semibold">
      {{ title }}
    </h1>
    <NuxtLink to="/" class="text-sky-400 hover:underline" @click="clearError({ redirect: '/' })">
      Home page
    </NuxtLink>
  </div>
</template>
