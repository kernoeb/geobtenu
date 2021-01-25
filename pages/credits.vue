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
          Merci à&nbsp;<a target="_blank" href="https://www.twitch.tv/armire37">Armire</a>,&nbsp;<a target="_blank" href="https://www.twitch.tv/letakamari">Takamari</a>,&nbsp;<a target="_blank" href="https://www.twitch.tv/jussetain">Jussetain</a>, Google et Wikipédia
        </v-row>
        <v-row align="center" justify="center" class="title mb-3">
          Réalisé par&nbsp;<a target="_blank" href="https://www.twitter.com/kernoeb">@kernoeb</a>
        </v-row>
        <v-row align="center" justify="center" class="d-flex justify-center flex-column">
          <div>
            Ce site est <i>open-source</i> ! Le projet est sur&nbsp;<a target="_blank" href="https://github.com/kernoeb/geobtenu">GitHub</a>.
          </div>
          <div>
            N'hésitez pas à faire une petite <i>pull request</i> pour participer au projet :)
          </div>
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
