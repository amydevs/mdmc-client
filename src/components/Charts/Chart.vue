<template>
    <v-card
        width="500px"
        class="ma-3"
    >
    <div class="d-flex" style="height: 100%;">
        <v-avatar
                class="ma-3 my-auto"
                size="150"
                tile
            >
            <v-img 
                :src="chart.isLocal ? `data:image/png;base64, ${chart.b64Cover}` : getImgUrl()" 
                :alt="chart.name"
            />
        </v-avatar>
        <div class="flex-grow-1">
            <v-card-actions class="py-0">
                <v-btn icon>
                <v-icon>mdi-timer</v-icon>
                </v-btn>
                {{chart.bpm}} BPM
            </v-card-actions>
            <v-card-title v-text="chart.name"></v-card-title>
            <v-card-subtitle v-text="chart.author"></v-card-subtitle>
            <v-card-actions>
                <v-btn icon>
                    <v-icon>mdi-account-circle</v-icon>
                </v-btn>
                {{ chart.levelDesigner }}
                <v-spacer></v-spacer>
                <div>
                    <v-btn icon v-if="!chart.isLocal" @click="download">
                        <v-icon>mdi-download-circle</v-icon>
                    </v-btn>
                    <v-btn icon v-else @click="deleteC">
                        <v-icon>mdi-delete-circle</v-icon>
                    </v-btn>
                    <v-btn icon @click="togglePlay">
                        <v-icon>{{audioPaused ? 'mdi-play-circle' : 'mdi-pause-circle'}}</v-icon>
                    </v-btn>
                </div>
            </v-card-actions>
        </div>
    </div>
    </v-card>
</template>

<script lang="ts">
  import AppView from '@/App.vue';
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { API } from '@/modules/api'

  const api = new API()

  export default Vue.extend({
    name: 'Chart',
    props: ['chart'],
    data() {
      return {
        audio: null,
        audioPaused: true,
      }
    },
    methods: {
        download() {
            window.electron.ipc.send('download-add', this.chart)
        },
        deleteC() {
            window.electron.library.delete(this.chart.localPath)
        },
        togglePlay() {
            if (this.$data.audio == undefined) {
                this.$data.audio = new Audio(this.getDemoUrl())
            }
            const audio = this.$data.audio as HTMLAudioElement;
            
            if (audio.paused) {
                audio.play();
                this.$data.audioPaused = false;
            } else {
                audio.pause();
                this.$data.audioPaused = true;
            }
        },
        getImgUrl() {
            return api.getCoverForChart(this.chart.id);
        },
        getDemoUrl() {
            return api.getDemoForChart(this.chart.id);
        }
    },
    computed: {
    }
})
</script>
