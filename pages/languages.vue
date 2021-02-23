<template>
  <article>
    <div class="mb-0">
      <div v-once style="text-align: center">
        <h1 class="slugTitle d-flex justify-center">
          Langues
        </h1>
        <h5 class="d-flex mb-2 justify-center grey--text">
          Merci à Mlle la Marquise de Sade !
        </h5>
      </div>
    </div>

    <v-container>
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
                  <span>Pays Nordiques</span>
                </v-card-title>
                <v-card-text>
                  <div class="tg-wrap">
                    <table class="tg">
                      <thead>
                        <tr>
                          <th class="tg-0pky" />
                          <th class="tg-0pky">
                            Æ æ
                          </th>
                          <th class="tg-0pky">
                            Øø
                          </th>
                          <th class="tg-0pky">
                            Þþ
                          </th>
                          <th class="tg-0pky">
                            Ðð
                          </th>
                          <th class="tg-0pky">
                            Å å
                          </th>
                          <th class="tg-0pky">
                            ä ö
                          </th>
                          <th class="tg-0pky">
                            á í ó ú ý
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="tg-0pky">
                            Danois
                          </td>
                          <td class="colored">
                            væk
                          </td>
                          <td class="colored">
                            højre
                          </td>
                          <td />
                          <td />
                          <td class="colored">
                            hvornår
                          </td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Norvégien
                          </td>
                          <td class="colored">
                            vær
                          </td>
                          <td class="colored">
                            høyre
                          </td>
                          <td />
                          <td />
                          <td class="colored">
                            forstår
                          </td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Féroïen
                          </td>
                          <td class="colored">
                            tær
                          </td>
                          <td class="colored">
                            kjøt
                          </td>
                          <td />
                          <td class="colored">
                            blað
                          </td>
                          <td />
                          <td />
                          <td class="colored">
                            skóg
                          </td>
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Islandais
                          </td>
                          <td class="colored">
                            ofnæmi
                          </td>
                          <td />
                          <td class="colored">
                            Það
                          </td>
                          <td class="colored">
                            Það
                          </td>
                          <td />
                          <td />
                          <td class="colored">
                            dýrt
                          </td>
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Suédois
                          </td>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td class="colored">
                            någon
                          </td>
                          <td class="colored">
                            är
                          </td>
                          <td />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Finnois
                          </td>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td class="colored" />
                          <td class="colored">
                            hyvää
                          </td>
                          <td />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="rounded-xl mt-3">
                <v-card-title>
                  <span>Allemand / Néerlandais</span>
                </v-card-title>
                <v-card-text>
                  <div class="tg-wrap">
                    <table class="tg">
                      <thead>
                        <tr>
                          <th class="tg-0pky" />
                          <th class="tg-0pky">
                            ß
                          </th>
                          <th class="tg-0pky">
                            ä ö ü
                          </th>
                          <th class="tg-0pky">
                            ë ï
                          </th>
                          <th class="tg-0pky">
                            éè
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="tg-0pky">
                            Allemand
                          </td>
                          <td class="colored">
                            heiße
                          </td>
                          <td class="colored">
                            möchte
                          </td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Néerlandais
                          </td>
                          <td />
                          <td class="colored" />
                          <td class="colored" />
                          <td class="colored" />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="rounded-xl mt-3">
                <v-card-title>
                  <span>Europe de l'Est</span>
                </v-card-title>
                <v-card-text>
                  <div class="tg-wrap">
                    <table class="tg">
                      <thead>
                        <tr>
                          <th class="tg-0pky" />
                          <th class="tg-0pky">
                            š ž č
                          </th>
                          <th class="tg-0pky">
                            Đ đ
                          </th>
                          <th class="tg-0pky">
                            ć
                          </th>
                          <th class="tg-0pky">
                            á é í ó ú ý
                          </th>
                          <th class="tg-0pky">
                            ä ö ü
                          </th>
                          <th class="tg-0pky">
                            ň ď ť (Ď Ť)
                          </th>
                          <th class="tg-0pky">
                            ů ě ř
                          </th>
                          <th class="tg-0pky">
                            ô ľ ŕ ĺ
                          </th>
                          <th class="tg-0pky">
                            ő ű
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="tg-0pky">
                            Croate
                          </td>
                          <td class="colored" />
                          <td class="colored" />
                          <td class="colored" />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Serbe*
                          </td>
                          <td class="colored" />
                          <td class="colored" />
                          <td class="colored" />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Slovène
                          </td>
                          <td class="colored" />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Monténégrin*
                          </td>
                          <td class="colored" />
                          <td class="colored" />
                          <td class="colored" />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Tchèque
                          </td>
                          <td class="colored" />
                          <td />
                          <td />
                          <td class="colored" />
                          <td />
                          <td class="colored" />
                          <td class="colored" />
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Slovaque
                          </td>
                          <td class="colored" />
                          <td />
                          <td />
                          <td class="colored" />
                          <td class="colored" />
                          <td class="colored" />
                          <td />
                          <td class="colored" />
                          <td />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Hongrois
                          </td>
                          <td />
                          <td />
                          <td />
                          <td class="colored" />
                          <td class="colored" />
                          <td />
                          <td />
                          <td />
                          <td class="colored" />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  * : aussi en cyrillique

                  <div class="tg-wrap mt-2">
                    <table class="tg">
                      <thead>
                        <tr>
                          <th class="tg-0pky" />
                          <th class="tg-0pky">
                            ć ś ź
                          </th>
                          <th class="tg-0pky">
                            ą ę
                          </th>
                          <th class="tg-0pky">
                            į ų
                          </th>
                          <th class="tg-0pky">
                            ł ż ƶ ń
                          </th>
                          <th class="tg-0pky">
                            ā ē ī
                          </th>
                          <th class="tg-0pky">
                            ū
                          </th>
                          <th class="tg-0pky">
                            ė
                          </th>
                          <th class="tg-0pky">
                            š ž č
                          </th>
                          <th class="tg-0pky">
                            ļ ņ ŗ ķ ģ (Ģ)
                          </th>
                          <th class="tg-0pky">
                            ä ö ü
                          </th>
                          <th class="tg-0pky">
                            õ
                          </th>
                          <th class="tg-0pky">
                            ó
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="tg-0pky">
                            Polonais
                          </td>
                          <td class="colored" />
                          <td class="colored" />
                          <td />
                          <td class="colored" />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td class="colored" />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Lituanien
                          </td>
                          <td />
                          <td class="colored" />
                          <td class="colored" />
                          <td />
                          <td />
                          <td class="colored" />
                          <td class="colored" />
                          <td class="colored" />
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Letton
                          </td>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td class="colored" />
                          <td class="colored" />
                          <td />
                          <td class="colored" />
                          <td class="colored" />
                          <td />
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td class="tg-0pky">
                            Estonien
                          </td>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td class="colored" />
                          <td />
                          <td class="colored" />
                          <td class="colored" />
                          <td />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
import { mdiOpenInNew, mdiClose, mdiTools, mdiContentCopy, mdiGoogleMaps } from '@mdi/js'

export default {
  scrollToTop: true,
  transition: 'page',
  data () {
    return {
      // ICONS
      mdiOpenInNew,
      mdiClose,
      mdiTools,
      mdiContentCopy,
      mdiGoogleMaps
    }
  },
  head () {
    return {
      title: 'Géobtenu | Langues',
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'Géobtenu | Langues'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Géobtenu | Langues'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Géobtenu | Langues'
        }
      ]
    }
  },
  computed: {
    productionMode () {
      return process.env.NODE_ENV === 'production'
    }
  }
}
</script>

<style scoped>
.colored {
  background-color: #636a5f;
  color: white;
  font-size: 15px !important;
}

.tg-wrap {
  overflow: auto;
  border-radius: 10px;
  border: 1px solid #4b4c50;
}

.tg {
  text-align: center;
  vertical-align: middle;

  border-collapse: collapse;
  border-spacing: 0;
  border-style: hidden;

  width: 100%;
  max-width: 100%;
}

.tg td {
  font-size: 14px;
  border: 1px solid #4b4c50;
  padding: 10px 5px;
  word-break: normal;
}

.tg th {
  border: 1px solid #4b4c50;
  font-weight: normal;
  padding: 10px 5px;
  word-break: normal;
}

.tg thead tr th:first-child, .tg tbody tr td:first-child {
  max-width: 140px !important;
  width: 140px !important;
}

.tg .tg-0pky {
  color: #dedbdb;
  font-size: 17px;
  background-color: #171819;
}

@media screen and (max-width: 767px) {
  .tg-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}

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
</style>
