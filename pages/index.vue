<template>
  <v-container>
    <transition name="fade">
      <v-btn
        v-if="showS2T"
        absolute
        bottom
        fab
        fixed
        right
        small
        style="margin-bottom: 58px"
        @click="scrollToTop()"
      >
        <v-icon>{{ mdiArrowUp }}</v-icon>
      </v-btn>
    </transition>
    <v-row :class="productionMode ? 'justifyCenter' : null">
      <v-col
        cols="12"
        lg="8"
        offset-lg="2"
      >
        <v-row>
          <v-col :style="`width: ${width}px`" style="position: fixed; z-index: 50;">
            <transition name="fade">
              <v-badge
                v-if="width && countries"
                :content="countriesFiltered.length"
                class="d-block"
                color="green"
                offset-x="18"
                overlap
              >
                <v-text-field
                  v-model="search"
                  background-color="#121212"
                  :clear-icon="mdiCloseCircle"
                  clearable
                  hide-details
                  outlined
                  placeholder="Rechercher un pays ou une capitale"
                  @click:click:clear="search = ''"
                />
              </v-badge>
            </transition>
          </v-col>
        </v-row>
        <v-row
          v-if="countries"
          v-resize="onResize"
          align="center"
          justify="center"
          style="margin-top: 100px;"
        >
          <transition-group ref="vRowFlags" class="row justifyCenter" name="flip-list">
            <v-col
              v-for="value in countriesFiltered"
              :key="`flag_${value.id}`"
              class="flip-list-item"
              cols="5"
              md="4"
              xl="3"
            >
              <v-lazy
                v-model="value.actived"
                height="181"
              >
                <FlagCard
                  :finished="value.finished"
                  :lang="lang"
                  :value="value"
                />
              </v-lazy>
            </v-col>
          </transition-group>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiArrowUp, mdiCloseCircle } from '@mdi/js'
import finished from '~/assets/finished.json'
import flagCard from '~/components/flag-card'

export default {
  name: 'Index',
  components: { flagCard },
  transition: 'page',
  async asyncData ({ $content }) {
    const limit = 20
    const countries = (await $content('countriesData').only(['country', 'capital', 'id']).limit(limit).fetch()).map(v => ({ ...v, finished: finished.includes(v.id) }))

    for (let i = 0; i < (limit < 16 ? limit : 16); i++) {
      countries[i].actived = true
    }

    return { countries }
  },
  data () {
    return {
      lang: 'fr',
      search: null,
      finishedCountries: false,
      width: null,
      showS2T: false,

      // ICONS
      mdiArrowUp,
      mdiCloseCircle
    }
  },
  head: {
    bodyAttrs: {
      class: 'bgColor'
    }
  },
  computed: {
    productionMode () {
      return process.env.NODE_ENV === 'production'
    },
    countriesFiltered () {
      if (this.search && this.search.length) {
        const sanitized = this.sanitize(this.search)
        return this.countries.filter(c => (this.sanitize(c.country[this.lang]).includes(sanitized)) ||
          (c.capital[this.lang] && this.sanitize(c.capital[this.lang]).includes(sanitized)))
      } else {
        return this.countries
      }
    }
  },
  watch: {
    search () {
      this.scrollToTop()
    }
  },
  mounted () {
    this.onResize()
    window.onscroll = () => {
      this.showS2T = document.documentElement.scrollTop > 240
    }
    setTimeout(() => {
      fetch('/content/countries.json').then(response => response.json()).then((data) => {
        for (let i = 0; i < 20; i++) {
          data[i].actived = true
        }
        this.countries = data
      })
    }, 500)
  },
  methods: {
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    onResize () {
      this.width = this.$refs.vRowFlags.$el.clientWidth - 30
    },
    isFinished (id) {
      return finished.includes(id)
    },
    removeAccents (text) {
      return text.replace(/[ÁÀÂÃ]/gi, 'a')
        .replace(/[ÉÈÊ]/gi, 'e')
        .replace(/[ÍÌÎ]/gi, 'i')
        .replace(/[ÓÒÔÕ]/gi, 'o')
        .replace(/[ÚÙÛ]/gi, 'u')
        .replace(/[Ç]/gi, 'c')
    },
    sanitize (text) {
      return this.removeAccents(text).replace(/[-‘’']/g, ' ').replace(/[.*?!]/g, '').toUpperCase().trim()
    }
  }
}
</script>

<style>
.bgColor {
  background-color: #121212;
}

.v-input__icon--append > .v-icon {
  color: purple;
}

.v-input__icon--append > .v-icon:hover {
  color: deeppink;
}
</style>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.justifyCenter {
  justify-content: center
}

.noDecoration {
  text-decoration: none
}

.flip-list-item {
  transition: all 1s;
}

.flip-list-leave-active {
  position: absolute;
  bottom: 140vh;
}

.flip-list-enter {
  opacity: 0;
}

.flip-list-leave-to {
  opacity: 0;
}

.page-enter-active, .page-leave-active {
  transition: opacity .2s;
}

.page-enter, .page-leave-active {
  opacity: 0;
}
</style>
