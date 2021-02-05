<template>
  <article>
    <div class="mb-0">
      <div v-once style="text-align: center">
        <h1 v-if="title && title.length" class="slugTitle d-flex justify-center">
          {{ title && title[0] }}
        </h1>
        <h5 v-if="title && title.length > 1" class="d-flex mb-2 justify-center grey--text">
          {{ title.slice(1).join(', ') }}
        </h5>
        <h4 v-if="capital" class="d-flex justify-center mb-2">
          {{ capital }}
        </h4>
      </div>
      <div v-once class="d-flex justify-center">
        <div style="display: inline-block; max-width: 200px; max-height: 200px;">
          <img
            :src="require(`~/assets/flags/png/${$route.params.slug}.png`)"
            alt="flag"
            class="rounded"
            height="auto"
            style="max-width: 100%"
          >
        </div>
      </div>
    </div>

    <v-container v-once>
      <v-row :style="productionMode ? 'justify-content: center' : null">
        <v-col
          cols="12"
          lg="8"
          offset-lg="2"
        >
          <v-row
            :style="productionMode ? 'justify-content: center' : null"
            align="center"
            class="mb-0"
            justify="center"
          >
            <v-col>
              <v-card v-if="content" class="rounded-xl">
                <v-card-title>Informations sur le pays</v-card-title>
                <v-card-text style="text-align: justify; font-size: 15px">
                  <div v-if="content.domain">
                    <b>Domaine :</b> .{{ content.domain }}
                  </div>
                  <div v-if="content.continent">
                    <b>Continent :</b> {{ content.continent }} ({{ content.continentPrefix }})
                  </div>
                  <div v-if="content.hemisphere">
                    <b>Hémisphère :</b> {{ content.hemisphere }}
                  </div>
                  <div v-if="content.languages">
                    <b>Langues :</b> {{ content.languages }}
                  </div>
                  <div v-if="content.alphabet">
                    <b>Alphabet :</b> {{ content.alphabet }}
                  </div>
                  <div v-if="content.direction">
                    <b>Sens de circulation :</b> {{ content.direction }}
                  </div>
                  <div
                    v-if="!(content.domain || content.continent || content.hemisphere || content.languages || content.alphabet || content.direction)"
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

    <v-container v-if="wikipedia && wikipedia.content">
      <v-row :style="productionMode ? 'justify-content: center' : null">
        <v-col
          cols="12"
          lg="8"
          offset-lg="2"
        >
          <v-row
            :style="productionMode ? 'justify-content: center' : null"
            align="center"
            class="mb-0"
            justify="center"
          >
            <v-col>
              <v-card class="rounded-xl">
                <v-card-title>
                  <span>Wikipédia </span>
                  <v-btn v-if="wikipedia.link" :href="wikipedia.link" class="ml-1" icon target="_blank">
                    <v-icon color="#00bfff">
                      {{ mdiOpenInNew }}
                    </v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text style="text-align: justify">
                  {{ getWiki() }}<span v-if="!more && wikipedia.size">...</span>
                  <span
                    v-if="wikipedia.size"
                    style="color: #00bfff; cursor: pointer"
                    @click="more = !more"
                  > {{ more ? 'Voir moins' : 'Voir plus' }}</span>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="article && article.body && article.body.children && article.body.children.length" v-once>
      <v-row :style="productionMode ? 'justify-content: center' : null">
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
    <v-speed-dial
      v-model="fab"
      :open-on-hover="!$vuetify.breakpoint.xsOnly"
      absolute
      bottom
      direction="top"
      fixed
      right
      style="margin-bottom: 22px"
      transition="slide-y-reverse-transition"
    >
      <template #activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            {{ mdiClose }}
          </v-icon>
          <v-icon v-else>
            {{ mdiTools }}
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        color="green"
        dark
        fab
        small
        @click="copyUrl()"
      >
        <v-icon>{{ mdiContentCopy }}</v-icon>
      </v-btn>
      <v-btn
        v-if="maps"
        :href="maps"
        color="#4285f4"
        dark
        fab
        small
        target="_blank"
      >
        <v-icon>{{ mdiGoogleMaps }}</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-snackbar
      style="position: fixed"
      :value="copied"
      color="success"
      right
      text
      top
    >
      Copié dans le presse-papier avec succès !
    </v-snackbar>
  </article>
</template>

<script>
import { mdiOpenInNew, mdiClose, mdiTools, mdiContentCopy, mdiGoogleMaps } from '@mdi/js'

export default {
  transition: 'page',
  async asyncData ({ $content, route, $axios }) {
    const [article, countries, content] = await Promise.all([
      await $content('countries', route.params.slug).fetch(),
      (await $content('countriesData').where({ id: route.params.slug }).fetch())[0],
      await $content('content', 'content').fetch()
    ])

    const lang = 'fr'

    let wikipedia
    if (countries?.wikipedia?.[lang]) {
      const url = `https://${lang}.wikipedia.org/w/api.php?format=json&action=query&prop=`
      const id = countries.wikipedia[lang]
      const pageId = `&pageids=${id}`

      try {
        wikipedia = await Promise.all([
          (await $axios.$get(url + 'extracts&exintro&explaintext&redirects=1' + pageId)).query?.pages?.[id]?.extract,
          (await $axios.$get(url + 'info&inprop=url' + pageId)).query?.pages?.[id]?.fullurl
        ])
      } catch (err) {}
    }

    const title = countries?.country?.[lang]?.split('|')

    return {
      article,
      wikipedia: {
        content: wikipedia?.[0],
        link: wikipedia?.[1],
        size: wikipedia?.[0].slice(0, 450).length < wikipedia?.[0].length
      },
      title,
      capital: countries?.capital?.[lang]?.split('|').join(', '),
      content: {
        domain: article.domain,
        continent: content?.continent?.[article.continent]?.[lang],
        continentPrefix: article?.continent?.toUpperCase(),
        hemisphere: article?.hemisphere?.split(',').map(v => content.hemisphere[v][lang]).join(', '),
        languages: article?.languages?.split(',').map(v => content.languages[v][lang]).join(', '),
        alphabet: article?.alphabet?.split(',').map(v => content.alphabet[v][lang]).join(', '),
        direction: article?.direction?.split(',').map(v => content.direction[v][lang]).join(', ')
      },
      maps: title && title.length ? `${content.urls.maps}${encodeURIComponent(title[0])}` : null
    }
  },
  data () {
    return {
      more: false,
      fab: false,
      copied: false,
      maps: null,

      // ICONS
      mdiOpenInNew,
      mdiClose,
      mdiTools,
      mdiContentCopy,
      mdiGoogleMaps
    }
  },
  head () {
    if (this.article) {
      return {
        title: `Géobtenu | ${this.article.title}`
      }
    }
  },
  computed: {
    productionMode () {
      return process.env.NODE_ENV === 'production'
    }
  },
  created () {
    if (this.$route.path.endsWith('/')) {
      const tmp = this.$route.params.slug
      this.$router.replace({
        path: `/flag/${tmp}#`
      })
    }
  },
  methods: {
    copyUrl () {
      const dummy = document.createElement('input')
      const text = window.location.href

      document.body.appendChild(dummy)
      dummy.value = text
      dummy.select()
      document.execCommand('copy')
      document.body.removeChild(dummy)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 2500)
    },
    getWiki () {
      if (this.more) {
        return this.wikipedia.content
      } else {
        return this.wikipedia.content.slice(0, 450)
      }
    }
  }
}
</script>

<style>
.video-responsive {
  max-width: 560px;
  margin-bottom: 5px;
}

.video-responsive div {
  position: relative;
  height: 0;
  padding-bottom: 56.25%;
}

.video-responsive iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: none !important;
}

.nuxt-content ol {
  padding: revert;
}

.nuxt-content a {
  color: #00bfff;
}

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
  max-width: 70%;
  margin-top: 5px;
}

@media only screen and (max-width: 600px) {
  .nuxt-content img {
    max-width: 85%;
  }
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

.nuxt-content pre > code {
  background-color: transparent !important;
  padding: unset;
}

.nuxt-content:not(pre) > code {
  color: #111010 !important;
  border-radius: 5px;
  padding: 2px;
  background-color: #eeeeee !important;
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
