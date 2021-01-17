<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
      bottom
      clipped
      disable-resize-watcher
    >
      <v-list>
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
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <nuxt-link :to="{name: 'index'}" class="noDecoration">
        <v-toolbar-title
          style="font-family: Secular One, sans-serif; font-size: 30px; color: #725555; font-weight: bold"
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
  }
}
</script>

<style>
.noDecoration {
  text-decoration: none
}
</style>
