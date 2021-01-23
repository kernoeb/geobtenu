<template>
  <transition name="fade">
    <article v-if="article">
      <div class="mb-3">
        <div style="text-align: center">
          <h1 class="slugTitle d-flex justify-center">
            {{ article.title.split('|')[0] }}
          </h1>
          <h5 v-if="article.title.split('|').length > 1" class="d-flex mb-2 justify-center grey--text">
            {{ article.title.split('|').slice(1).join(', ') }}
          </h5>
          <h4 class="d-flex justify-center mb-2">
            {{ getCapital() }}
          </h4>
        </div>
        <div class="d-flex justify-center">
          <v-img
            :src="require(`../../assets/flags/png/${$route.params.slug}.png`)"
            class="rounded"
            max-width="200"
            min-height="140"
          >
            <template #placeholder>
              <v-skeleton-loader
                height="140"
                type="image"
                width="200"
              />
            </template>
          </v-img>
        </div>
      </div>

      <v-container v-if="article">
        <v-row style="justify-content: center">
          <v-col
            cols="12"
            lg="8"
            offset-lg="2"
          >
            <v-row align="center" class="mb-3" justify="center" style="justify-content: center">
              <v-col>
                <v-card class="rounded-xl">
                  <v-card-title>Informations sur le pays</v-card-title>
                  <v-card-text style="text-align: justify; font-size: 15px">
                    <div v-if="article.domain">
                      <b>Domaine :</b> .{{ article.domain }}
                    </div>
                    <div v-if="article.continent">
                      <b>Continent :</b> {{ getContinent(article.continent) }}
                    </div>
                    <div v-if="article.hemisphere">
                      <b>Hémisphère :</b> {{ getHemisphere(article.hemisphere) }}
                    </div>
                    <div v-if="article.languages">
                      <b>Langues :</b> {{ getLanguage(article.languages) }}
                    </div>
                    <div v-if="article.alphabet">
                      <b>Alphabet :</b> {{ getAlphabet(article.alphabet) }}
                    </div>
                    <div v-if="article.traffic">
                      <b>Sens de circulation :</b> {{ getTraffic(article.traffic) }}
                    </div>
                    <div
                      v-if="!(article.domain || article.continent || article.hemisphere || article.languages || article.alphabet || article.traffic)"
                    >
                      Aucune donnée n'a été saisie
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <v-container v-if="wiki">
        <v-row style="justify-content: center">
          <v-col
            cols="12"
            lg="8"
            offset-lg="2"
          >
            <v-row align="center" class="mb-3" justify="center" style="justify-content: center">
              <v-col>
                <v-card class="rounded-xl">
                  <v-card-title>
                    <span>Wikipédia </span>
                    <v-btn v-if="link" target="_blank" icon :href="link" class="ml-1">
                      <v-icon color="blue">
                        mdi-open-in-new
                      </v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text style="text-align: justify">
                    {{ getWiki() }}<span v-if="!more && wiki.slice(0, length).length < wiki.length">...</span>
                    <span
                      v-if="wiki.slice(0, length).length < wiki.length"
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

      <v-container v-if="article && article.body && article.body.children && article.body.children.length">
        <v-row style="justify-content: center">
          <v-col
            cols="12"
            lg="8"
            offset-lg="2"
          >
            <v-card class="rounded-xl">
              <v-card-text>
                <nuxt-content
                  :class="$vuetify.theme.dark ? 'blockquoteDark' : 'blockquoteLight'"
                  :document="article"
                  :style="$vuetify.theme.dark ? 'color: white' : 'color: black'"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </article>
  </transition>
</template>

<script>
const countries = require('~/assets/countries.json')
const content = require('~/assets/content.json')

export default {
  transition: 'page',
  data () {
    return {
      lang: 'fr',
      more: false,
      wiki: null,
      link: null,
      article: null,
      length: 450
    }
  },
  async fetch () {
    this.article = await this.$content('countries', this.$route.params.slug).fetch()

    const c = countries.find(c => c.id === this.$route.params.slug)
    if (c) {
      const id = c.wikipedia && c.wikipedia[this.lang]

      if (id) {
        this.wiki = (await this.$axios.$get(`https://${this.lang}.wikipedia.org/w/api.php?format=json` +
          `&prop=extracts&action=query&exintro&explaintext&redirects=1&pageids=${id}&origin=*`))
          .query.pages[id].extract
        this.link = (await this.$axios.$get(`https://${this.lang}.wikipedia.org/w/api.php?action=query&prop=info&pageids=${id}&inprop=url&format=json`)).query.pages[id].fullurl
      }
    }
  },
  methods: {
    getWiki () {
      if (this.more) {
        return this.wiki
      } else {
        return this.wiki.slice(0, this.length)
      }
    },
    getContinent (continent) {
      return content.continent[continent][this.lang] + ' (' + continent + ')'
    },
    getHemisphere (hemisphere) {
      return content.hemisphere[hemisphere][this.lang]
    },
    getTraffic (traffic) {
      return content.traffic[traffic][this.lang]
    },
    getLanguage (language) {
      const tmp = []
      for (const i of language.split(',')) {
        tmp.push(content.languages[i.trim()][this.lang])
      }
      return tmp.join(', ')
    },
    getAlphabet (alphabet) {
      const tmp = []
      for (const i of alphabet.split(',')) {
        tmp.push(content.alphabet[i.trim()][this.lang])
      }
      return tmp.join(', ')
    },
    getCapital () {
      const tmp = countries.find(c => c.id === this.$route.params.slug).capital[this.lang]
      if (tmp) {
        return tmp.split('|').join(', ')
      } else {
        return 'Aucune capitale'
      }
    }
  }
}
</script>

<style>
.nuxt-content h1 {
  margin-bottom: 7px;
}

.nuxt-content h2 {
  margin-bottom: 7px;
}

.nuxt-content h3 {
  margin-bottom: 7px;
}

.nuxt-content hr {
  margin-bottom: 9px;
}

.nuxt-content img {
  max-width: 60%;
}

.blockquoteDark pre {
  background: #333;
  color: #ddd;
}

.blockquoteLight pre {
  background: #ddd;
  color: #333;
}

.nuxt-content pre {
  border-radius: 10px;
  text-shadow: none;
  white-space: pre-wrap;
  padding: 8px;
  margin-bottom: 7px;
}

.nuxt-content code {
  background-color: transparent !important;
  padding: unset;
}
</style>

<style scoped>
.slugTitle {
  font-size: 3vw;
}

@media only screen and (max-width: 1000px) {
  .slugTitle {
    font-size: 7vw;
  }
}

.page-enter-active, .page-leave-active {
  transition: opacity .2s;
}

.page-enter, .page-leave-active {
  opacity: 0;
}

.fade-enter-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fade-enter, .fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}
</style>
