<template>
  <transition name="fade">
    <article v-if="article">
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
            min-height="140"
          >
            <template #placeholder>
              <v-skeleton-loader
                height="140"
                width="200"
                type="image"
              />
            </template>
          </v-img>
        </div>
      </div>

      <transition name="fade">
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
                    <v-card-title>Wikipédia</v-card-title>
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
      </transition>

      <v-container v-if="article">
        <v-row style="justify-content: center">
          <v-col
            cols="12"
            lg="8"
            offset-lg="2"
          >
            <v-card class="rounded-xl">
              <v-card-text>
                <nuxt-content :document="article" :style="$vuetify.theme.dark ? 'color: white' : 'color: black'" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </article>
  </transition>
</template>

<script>
export default {
  transition: 'page',
  data () {
    return {
      lang: 'fr',
      more: false,
      wiki: null,
      article: null,
      length: 450
    }
  },
  async fetch () {
    const lang = this.$cookies.get('lang') // Before nuxt-i18n
    if (lang) {
      this.lang = lang
    }

    this.article = await this.$content('countries', this.$route.params.slug).fetch()

    if (this.article['wikipediaId_' + this.lang]) {
      try {
        this.wiki = (await this.$axios.$get(`https://${this.lang}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${this.article['wikipediaId_' + this.lang]}&origin=*`))
          .query.pages[this.article['wikipediaId_' + this.lang]].extract
      } catch (e) {
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
    }
  }
}
</script>

<style scoped>
.nuxt-content h1 {
  margin-bottom: 7px;
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
