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
      <v-list dense nav>
      <template v-for="(item, index) in downloads">
        <v-list-item :key="index">
            <v-list-item-avatar>
              <v-img :src="`https://mdmc.moe/charts/${item.id}/cover.png`"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle v-if="index != 0">{{ item.author }}</v-list-item-subtitle>
              <v-list-item-subtitle v-else>Downloaded {{ len }}MB</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-progress-linear
          :value="perc"
          class="mb-2"
          rounded
          v-if="index == 0"
          :key="`${index}-divider`"
        ></v-progress-linear>
      </template>
      </v-list>

      <!-- <v-list dense nav>
          <v-list-item
            v-for="(item, i) in downloads"
            :key="i"
          >
            <v-list-item-avatar>
              <v-img :src="`https://mdmc.moe/charts/${item.id}/cover.png`"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.author }}</v-list-item-subtitle>
              <v-divider/>
            </v-list-item-content>
            
          </v-list-item>
      </v-list> -->
    </v-navigation-drawer>

    <PathDialogue />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import PathDialogue from '@/components/Misc/PathDialogue.vue'
import { Chart } from './types/chart';

export default Vue.extend({
  name: 'App',
  components: {
    PathDialogue
  },
  mounted() {
    window.electron.ipc.receive('download-changed', (event:Chart[]) => {
      this.$data.downloads = event;
    });
    window.electron.ipc.receive('download-prog', (len: number, perc: number) => {
      this.$data.len = len;
      this.$data.perc = perc;
    });
  },
  data: () => ({
    drawer: false,
    downloadDrawer: false,
    len: 0,
    perc: 0,
    downloads: [
      // {
      //   "name": "Cyaegha",
      //   "author": "USAO",
      //   "bpm": "200",
      //   "scene": "scene_01",
      //   "levelDesigner": "linaxia",
      //   "levelDesigner1": "linaxia",
      //   "levelDesigner2": "linaxia",
      //   "levelDesigner3": "linaxia",
      //   "levelDesigner4": "linaxia",
      //   "difficulty1": "0",
      //   "difficulty2": "11",
      //   "difficulty3": "0",
      //   "unlockLevel": "0",
      //   "id": "10"
      // },
      // {
      //   "name": "#1f1e33",
      //   "author": "かめりあ(EDP)",
      //   "bpm": "181",
      //   "scene": "scene_03",
      //   "levelDesigner": "000",
      //   "levelDesigner1": "000",
      //   "levelDesigner2": "000",
      //   "levelDesigner3": "000",
      //   "levelDesigner4": "000",
      //   "difficulty1": "0",
      //   "difficulty2": "11",
      //   "difficulty3": "0",
      //   "unlockLevel": "0",
      //   "id": "1"
      // },
      // {
      //   "name": "#1f1e33",
      //   "author": "かめりあ(EDP)",
      //   "bpm": "181",
      //   "scene": "scene_03",
      //   "levelDesigner": "000",
      //   "levelDesigner1": "000",
      //   "levelDesigner2": "000",
      //   "levelDesigner3": "000",
      //   "levelDesigner4": "000",
      //   "difficulty1": "0",
      //   "difficulty2": "11",
      //   "difficulty3": "0",
      //   "unlockLevel": "0",
      //   "id": "1"
      // }
    ],
    items: [
        {icon: 'mdi-home', title:'Home', route:'/'},
        {icon: 'mdi-tools', title:'Library', route:'/library'},
        {icon: 'mdi-cog', title:'Settings', route:'/settings'}
    ],
  }),
  watch: {
    ind: function(val:number) {
      this.$data.ind = 0;
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }

});
</script>
