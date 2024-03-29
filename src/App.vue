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
      ref="appbar"
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

    <v-main :style="`height: calc(100vh - ${appbarHeight}px);`" class="">
      <keep-alive include="Home">
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </v-main>

    <v-navigation-drawer
      v-model="downloadDrawer"
      right
      app
      clipped
    >
      <v-list dense nav>
        <v-list-item class="text-center" v-if="downloads.length == 0">
          <v-list-item-subtitle>
            No Charts in the Download Queue...
          </v-list-item-subtitle>
        </v-list-item>
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
              <v-list-item-action v-if="index !== 0">
                <v-btn icon @click="$electron.ipc.send('download-remove', item.QIndex)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>

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
import ResizeObserver from 'resize-observer-polyfill';
import Vue from 'vue';
import PathDialogue from '@/components/Misc/PathDialogue.vue'
import { Chart, QChart } from './types/chart';

export default Vue.extend({
  name: 'App',
  components: {
    PathDialogue
  },
  mounted() {
    // appbar observer
    const appbaro = new ResizeObserver((e) => {
      this.appbarHeight = e[0].contentRect.width;
    });
    if (this.$refs.appbar) {
      appbaro.observe((this.$refs.appbar as any).$el);
    }

    window.electron.ipc.receive('download-changed', (event:QChart[]) => {
      this.downloads = event;
    });
    window.electron.ipc.receive('download-prog', (len: number, perc: number) => {
      this.len = len;
      this.perc = perc;
    });
  },
  data: () => ({
    appbarHeight: 48,
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
    ] as QChart[],
    items: [
        {icon: 'mdi-home', title:'Home', route:'/'},
        {icon: 'mdi-tools', title:'Library', route:'/library'},
        {icon: 'mdi-cog', title:'Settings', route:'/settings'}
    ],
  }),
  watch: {
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }

});
</script>
<style lang="scss">
html{
  overflow-y: hidden !important;
  .v-main__wrap {
    overflow-y: auto !important;
  }
}
:root {
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-corner {
      background: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb {
      background-color: white;
      min-width: 32px;
      min-height: 32px;
  }
  ::-webkit-scrollbar-track {
      background-color: #272727;
  }
}


</style>
