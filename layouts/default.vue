<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      disable-resize-watcher
      absolute
      temporary
    >
      <v-list>
        <v-list-item class="px-2">
          <v-btn
            icon
            @click.stop="drawer = !drawer"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
          <v-list-item-title
            class="geoTitle"
            :class="!$vuetify.theme.dark ? 'geoTitleColor' : 'geoTitleColorDark'"
          >
            GÉOBTENU
          </v-list-item-title>
        </v-list-item>

        <v-divider />
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          exact
          router
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="pa-2">
          <v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark">
            <v-icon left>
              mdi-theme-light-dark
            </v-icon>
            Changer le thème
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <nuxt-link :to="{name: 'index'}" class="noDecoration">
        <v-toolbar-title
          class="geoTitle"
          :class="!$vuetify.theme.dark ? 'geoTitleColor' : 'geoTitleColorDark'"
          v-text="title"
        />
      </nuxt-link>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
      fixed
      height=" 25"
      style="font-size: 10px"
    >
      <span>
        Géobtenu par <a href="https://t.me/kernoeb">kernoeb</a></span>
      <v-spacer />
      <span>&copy; {{ new Date().getFullYear() }}
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: 'vuetify-theme',
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Accueil',
          to: '/'
        }
      ],
      title: 'GÉOBTENU'
    }
  },
  watch: {
    '$vuetify.theme.dark' () {
      this.$cookies.set('theme', this.$vuetify.theme.dark ? 'true' : 'false', { maxAge: 2147483646 })
    }
  },
  mounted () {
    try {
      this.$vuetify.theme.dark = JSON.parse(this.$cookies.get('theme'))
    } catch (e) {
      this.$vuetify.theme.dark = true
    }
  }
}
</script>

<style scoped>
.noDecoration {
  text-decoration: none
}

.geoTitle {
  font-family: Secular One, sans-serif;
  font-size: 30px;
  font-weight: bold
}

.geoTitleColor {
  color: #725555;
}

.geoTitleColorDark {
  color: white;
}
</style>
