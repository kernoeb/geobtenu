<script setup lang="ts">
defineEmits<{ click: [ev: MouseEvent] }>()
</script>

<template>
  <button
    type="button"
    aria-label="Réinitialiser la carte"
    class="fixed bottom-10 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#272727] shadow-lg transition hover:bg-[#3a3a3a]"
    @click="$emit('click', $event)"
  >
    <Icon name="mdi:restart" size="22" />
  </button>
</template>
