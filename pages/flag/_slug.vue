<template>
  <article>
    <div class="mb-3">
      <div>
        <h1 :style="$vuetify.breakpoint.mobile ? 'font-size: 7vw' : 'font-size: 3vw'" class="d-flex justify-center">
          {{ article.title }}
        </h1>
      </div>
      <div class="d-flex justify-center">
        <v-img
          :src="require(`../../assets/flags/png/${$route.params.slug}.png`)"
          class="rounded"
          max-width="200"
        />
      </div>
    </div>

    <v-container>
      <v-row style="justify-content: center">
        <v-col
          cols="12"
          lg="8"
          offset-lg="2"
        >
          <v-row v-if="wiki" align="center" class="mb-3" justify="center" style="justify-content: center">
            <v-col>
              <v-card class="rounded-xl">
                <v-card-title>Wikipédia</v-card-title>
                <v-card-text style="text-align: justify">
                  {{ getWiki() }}<span v-if="!more && wiki.slice(0, 600).length < wiki.length">...</span>
                  <span
                    v-if="wiki.slice(0, 600).length < wiki.length"
                    style="color: blue; cursor: pointer"
                    @click="more = !more"
                  > {{ more ? 'Voir moins' : 'Voir plus' }}</span>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row style="justify-content: center">
        <v-col
          cols="12"
          lg="8"
          offset-lg="2"
        >
          <v-card class="rounded-xl">
            <v-card-text>
              <nuxt-content :document="article" style="color: black" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
const wikipedia = require('~/assets/countries.json')

export default {
  transition: 'page',
  async asyncData ({
    $content,
    params,
    $axios
  }) {
    const article = await $content('countries', params.slug).fetch()

    const lang = 'fr'
    const id = wikipedia.find(el => el.id === article.slug).wikipedia[lang]
    let wiki
    try {
      if (id) {
        wiki = await $axios.$get(`https://${lang}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${id}&origin=*`)
      }
    } catch (e) {
    }

    return {
      article,
      wiki: id && wiki && wiki.query && wiki.query.pages && wiki.query.pages[id] && wiki.query.pages[id].extract
    }
  },
  data () {
    return {
      lang: 'fr',
      more: false
    }
  },
  methods: {
    getWiki () {
      if (this.more) {
        return this.wiki
      } else {
        return this.wiki.slice(0, 600)
      }
    }
  }
}
</script>

<style>
.nuxt-content h1 {
  margin-bottom: 7px;
}

.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}

.page-enter, .page-leave-active {
  opacity: 0;
}
</style>
