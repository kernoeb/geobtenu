<template>
  <div class="maps-responsive">
    <div style="min-height: 300px">
      <client-only>
        <iframe
          :src="link"
          :width="width"
          :height="height"
          style="border:0;border-radius: 15px"
          :class="marginBottom ? 'mt-2' : null"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomIframe',
  props: {
    link: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 300
    },
    marginBottom: {
      type: Boolean,
      default: false
    }
  }
}
</script>

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
