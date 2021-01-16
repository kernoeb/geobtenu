<template>
  <article>
    <div class="mb-3">
      <div>
        <h1 style="font-size: 3vw" class="d-flex justify-center">
          {{ article.title }}
        </h1>
      </div>
      <div class="d-flex justify-center">
        <v-img
          :src="require(`../../assets/flags/svg/${$route.params.slug}.svg`)"
          max-width="200"
        />
      </div>
    </div>
    <v-row justify="center" align="center">
      <v-col v-if="wiki">
        <v-card>
          <v-card-title>Wikipédia</v-card-title>
          <v-card-text style="text-align: justify">
            {{ getWiki() }}<span v-if="!more && wiki.slice(0, 600).length < wiki.length">...</span>
            <span v-if="wiki.slice(0, 600).length < wiki.length" style="color: blue; cursor: pointer" @click="more = !more"> {{ more ? 'Voir moins' : 'Voir plus' }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <nuxt-content :document="article" />
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
    const wiki = await $axios.$get(`https://${lang}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${id}`)

    return {
      article,
      wiki: wiki.query.pages[id].extract
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
