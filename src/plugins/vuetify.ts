import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: { 
        dark: !window.electron.store.get('lightMode'),
        themes: {
            dark: {
                primary: '#ff55c3',
            },
            light: {
                primary: '#ff55c3',
            }
        }
    }
});
