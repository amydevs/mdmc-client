<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list
        dense nav
      >
        <v-list-item-group color='primary' mandatory>
            <v-list-item
                v-for="item in items"
                :key="item.title"
                
                router :to="item.route"
            >
              <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
    
    <v-app-bar
      app
      dense
      fixed
      clipped-right
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>{{ currentRouteName }}</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="downloadDrawer = !downloadDrawer">
        <v-icon>mdi-tray-arrow-down</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-navigation-drawer
      v-model="downloadDrawer"
      right
      app
      clipped
    >
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <PathDialogue />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import PathDialogue from '@/components/Misc/PathDialogue.vue'

export default Vue.extend({
  name: 'App',
  components: {
    PathDialogue
  },
  data: () => ({
    drawer: false,
    downloadDrawer: false,
    items: [
        {icon: 'mdi-home', title:'Home', route:'/'},
        {icon: 'mdi-tools', title:'Library', route:'/library'}
    ],
  }),
  computed: {
      currentRouteName() {
          return this.$route.name;
      }
  }

});
</script>
