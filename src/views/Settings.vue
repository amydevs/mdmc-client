<template>
  <v-container>
    <v-card>
      <v-list>
        <template v-for="(setting, i) in settings">
          <v-list-item :key="i">
              <v-list-item-content>
                <v-list-item-title>{{setting.title}}</v-list-item-title>
                <v-list-item-subtitle>{{setting.subtitle}}</v-list-item-subtitle>

                <v-text-field v-if="setting.type == 'directory'"
                    placeholder="C:\Program Files\Steam\steamapps\common\Muse Dash\"
                    class="mt-3"
                    outlined
                    append-icon="mdi-dots-horizontal-circle"
                    :rules="setting.rules"
                    v-model="setting.value"
                    hide-details="auto"
                    @click:append="openTDialog(setting)"
                ></v-text-field>

              </v-list-item-content>
              <v-switch
                v-if="setting.type == 'bool'"
                v-model="setting.value"
                @change="setting.cb"
                flat
              ></v-switch>
          </v-list-item>
          <v-divider v-if="settings.length-1 !== i" :key="`divfor-${i}`"/>
        </template>
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Settings',
    data() {
      return {
        settings: [
          {
            type: 'directory',
            title: "Set Game Path",
            subtitle: "Set Your Muse Dash Game Path Here",
            rules: [
              (v:string) => {
                const existsBool = window.electron.fs.existsSync(v)
                if (existsBool) {
                  console.log("Set Game Path")
                  window.electron.store.set("gamePath", v)
                }
                return existsBool || 'Game Path does not exist.'
              }
            ],
            value: window.electron.store.get('gamePath'),
          },
          {
            type: "bool",
            title: "Enable Light Mode",
            subtitle: "Switch the Toggle to Enable Light Mode",
            value: window.electron.store.get('lightMode'),
            cb: (v:boolean) => {
              this.$vuetify.theme.dark = !v;
              window.electron.store.set('lightMode', v)
            }
          }
        ]
      }
    },
    methods: {
      async openTDialog(e:any) {
        const folders = window.electron.dialog.openDialog()
        if (folders) {
          e.value = folders[0]
        }
      },
    },
    async mounted() {
    }
  })
</script>
