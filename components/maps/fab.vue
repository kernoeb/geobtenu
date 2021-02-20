<template>
  <v-btn
    absolute
    bottom
    fab
    fixed
    right
    small
    style="margin-bottom: 58px"
    @click="ev => $emit('click', ev)"
  >
    <v-icon>{{ mdiRestart }}</v-icon>
  </v-btn>
</template>

<script>
import { mdiRestart } from '@mdi/js'

export default {
  data () {
    return {
      mdiRestart
    }
  }
}
</script>
