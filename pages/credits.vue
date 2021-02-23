<template>
  <v-container>
    <v-row class="justifyCenter" style="text-align: center">
      <v-col
        class="mt-5"
        cols="12"
        lg="8"
        offset-lg="2"
      >
        <v-row
          align="center"
          justify="center"
          style="word-break: break-word;"
        >
          Merci à&nbsp;<a href="https://www.twitch.tv/armire37" target="_blank">Armire</a>,&nbsp;<a
            href="https://www.twitch.tv/letakamari"
            target="_blank"
          >Takamari</a>,&nbsp;<a href="https://www.twitch.tv/jussetain" target="_blank">Jussetain</a>&nbsp;pour les
          informations et métas !
        </v-row>
        <v-row
          align="center"
          justify="center"
          style="word-break: break-word;"
        >
          <div class="font-italic">
            Autres remerciements : Mlle la Marquise de Sade
          </div>
        </v-row>
        <v-row align="center" class="title mb-3" justify="center" style="color: #f693b4;">
          Réalisé par&nbsp;<a href="https://www.twitter.com/kernoeb" target="_blank">@kernoeb</a>
        </v-row>
        <v-row align="center" class="d-flex justify-center flex-column" justify="center">
          <div>
            Ce site est <i>open-source</i> ! Le projet est sur&nbsp;<a
              href="https://github.com/kernoeb/geobtenu"
              target="_blank"
            >GitHub</a>.
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
  transition: 'page',
  head () {
    return {
      title: 'Géobtenu | Crédits'
    }
  }
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
