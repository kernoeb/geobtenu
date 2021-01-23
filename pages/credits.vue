<template>
  <v-container>
    <v-row class="justifyCenter">
      <v-col
        cols="12"
        lg="8"
        offset-lg="2"
      >
        <v-row
          align="center"
          justify="center"
        >
          Merci à&nbsp;<a href="https://www.twitch.tv/armire37">Armire</a>,&nbsp;<a href="https://www.twitch.tv/letakamari">Takamari</a>,&nbsp;<a href="https://www.twitch.tv/jussetain">Jussetain</a>, Google et Wikipédia
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Credits',
  transition: 'page'
}
</script>

<style scoped>
.justifyCenter {
  justify-content: center
}

.page-enter-active, .page-leave-active {
  transition: opacity .2s;
}

.page-enter, .page-leave-active {
  opacity: 0;
}
</style>
