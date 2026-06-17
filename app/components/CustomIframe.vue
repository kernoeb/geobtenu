<script setup lang="ts">
withDefaults(defineProps<{
  link: string
  width?: number
  height?: number
  marginTopBottom?: boolean
}>(), {
  width: 400,
  height: 300,
  marginTopBottom: false
})
</script>

<template>
  <div class="maps-responsive">
    <div style="min-height: 300px" :style="marginTopBottom ? 'margin-bottom: 15px' : undefined">
      <ClientOnly>
        <iframe
          :src="link"
          :width="width"
          :height="height"
          style="border: 0; border-radius: 15px"
          :class="marginTopBottom ? 'mt-2' : undefined"
          allowfullscreen
          aria-hidden="false"
          tabindex="0"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
.maps-responsive {
  max-width: 700px;
  margin-bottom: 5px;
}
.maps-responsive div {
  position: relative;
  height: 0;
  padding-bottom: 70%;
}
.maps-responsive iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: none !important;
}
</style>
