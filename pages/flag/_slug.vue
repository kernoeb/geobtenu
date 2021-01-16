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
          class="rounded"
          :src="require(`../../assets/flags/png/${$route.params.slug}.png`)"
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
          <v-row v-if="wiki" justify="center" align="center" class="mb-3" style="justify-content: center">
            <v-col>
              <v-card class="rounded-xl">
                <v-card-title>Wikipédia</v-card-title>
                <v-card-text style="text-align: justify">
                  {{ getWiki() }}<span v-if="!more && wiki.slice(0, 600).length < wiki.length">...</span>
                  <span v-if="wiki.slice(0, 600).length < wiki.length" style="color: blue; cursor: pointer" @click="more = !more"> {{ more ? 'Voir moins' : 'Voir plus' }}</span>
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
              <nuxt-content style="color: black" :document="article" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
const wikipedia = require('~/assets/wikipedia.json')

export default {
  async asyncData ({
    $content,
    params,
    $axios
  }) {
    const article = await $content('countries', params.slug).fetch()

    const lang = 'fr'
    const id = wikipedia[article.slug].fr
    let wiki
    try {
      wiki = await $axios.$get(`https://${lang}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${id}`)
    } catch (e) {}

    return {
      article,
      wiki: wiki && wiki.query && wiki.query.pages && wiki.query.pages[id] && wiki.query.pages[id].extract
    }
  },
  data () {
    return {
      more: false
    }
  },
  methods: {
    getWiki () {
      if (this.more) { return this.wiki } else { return this.wiki.slice(0, 600) }
    }
  }
}
</script>

<style>
.nuxt-content h1 {
  margin-bottom: 7px;
}
</style>
