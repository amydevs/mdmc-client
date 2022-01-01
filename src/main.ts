import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { Chart } from '@/types/chart'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

declare global {
  interface Window {
    electron: {
      library: {
        get: () => Chart[]
      }
      dialog: {
        openDialog: () => string[] | null
      },
      fs: {
        existsSync: (path: string) => boolean;
      }
      axios: {
        get: (url: string) => { data: any; status: number; };
      }
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
    };
  }
}