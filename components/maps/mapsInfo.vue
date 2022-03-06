<template>
  <v-col class="d-flex justify-center align-content-center flex-column">
    <div class="mapTitle mb-0">
      {{ title }}
    </div>
    <div class="mb-3">
      <transition mode="out-in" name="fade2">
        <div v-if="elements === null || panzoom === null" key="1">
          <small style="color: darkgrey">Chargement de la carte...</small>
        </div>
        <div v-else-if="elements && elements.length" key="2">
          <small style="color: darkgrey">Sélectionnez un {{ select }}</small>
        </div>
        <div v-else key="3">
          <small style="color: darkgrey">Erreur...</small>
        </div>
      </transition>
    </div>
  </v-col>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Carte'
    },
    select: {
      type: String,
      default: 'élément'
    },
    elements: {
      type: Array,
      default: null
    },
    panzoom: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.fade2-enter-active, .fade2-leave-active {
  transition: opacity 0.3s;
}

.fade2-enter, .fade2-leave-to {
  opacity: 0;
}

.mapTitle {
  font-size: 2.4vw;
  font-weight: bold;
}

@media only screen and (min-width: 845px) and (max-width: 1015px) {
  .mapTitle {
    font-size: 5vw;
  }
}

@media only screen and (min-width: 717px) and (max-width: 844px) {
  .mapTitle {
    font-size: 6vw;
  }
}

@media only screen and (max-width: 716px) {
  .mapTitle {
    font-size: 7vw;
  }
}
</style>
