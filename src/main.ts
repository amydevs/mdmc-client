import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { Chart } from '@/types/chart'

Vue.prototype.$electron = window.electron
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
      shell: {
        openExternalPlayer: (id: string) => void
      },
      ipc: {
        invoke: (channel: string, data?: any) => Promise<any>;
        send: (channel: string, data?: any) => void;
        receive: (channel: string, ...args: any[]) => (() => void);
        removeAll: (channel: string) => void;
      },
      downloads: {
        getAll: () => Chart[]
      },
      library: {
        get: () => Chart[]
        delete: (fileName: string) => void
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