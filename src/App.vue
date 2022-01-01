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
      clipped-left
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <!-- <v-navigation-drawer
      absolute
      permanent
      right
      clipped
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

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
    items: [
        {icon: 'mdi-home', title:'Home', route:'/'},
        {icon: 'mdi-tools', title:'Library', route:'/library'}
    ],
  }),
});
</script>
