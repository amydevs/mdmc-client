<template>
<v-lazy
    width="500px"
    class="ma-3 text-left flex-grow-1"
>
    <v-card
        style="height: 100%"
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
            <v-card-actions class="pb-0">
                <v-btn rounded small depressed color="transparent">
                    <v-icon class="mr-1">mdi-timer</v-icon>
                    {{chart.bpm}} BPM
                </v-btn>
                <v-spacer />
                <v-btn
                    class="black--text"
                    rounded
                    color="green accent-3"
                    dark
                    small
                    v-if="chart.difficulty1 != 0"
                    v-text="chart.difficulty1"
                    @click="openDetails(1)"
                />
                <v-btn
                    class="black--text"
                    rounded
                    color="blue accent-2"
                    dark
                    small
                    v-if="chart.difficulty2 != 0"
                    v-text="chart.difficulty2"
                    @click="openDetails(2)"
                />
                <v-btn
                    class="black--text"
                    rounded
                    color="purple accent-3"
                    dark
                    small
                    v-if="chart.difficulty3 != 0"
                    v-text="chart.difficulty3"
                    @click="openDetails(3)"
                />
            </v-card-actions>
            <v-card-title v-text="chart.name"></v-card-title>
            <v-card-subtitle v-text="chart.author"></v-card-subtitle>
            <v-card-actions>
                <v-btn icon>
                    <v-icon>mdi-account-circle</v-icon>
                </v-btn>
                {{ chart.levelDesigner }}
                <v-spacer></v-spacer>
                <div class="d-flex">
                    <v-btn icon @click="download">
                        <v-icon>{{!chart.isLocal ? 'mdi-download-circle' : 'mdi-refresh-circle'}}</v-icon>
                    </v-btn>
                    <v-btn icon v-if="chart.isLocal" @click="deleteC">
                        <v-icon>mdi-delete-circle</v-icon>
                    </v-btn>
                    <v-btn icon v-else @click="togglePlay">
                        <v-icon>{{audioPaused ? 'mdi-play-circle' : 'mdi-pause-circle'}}</v-icon>
                    </v-btn>
                </div>
            </v-card-actions>
        </div>
    </div>
    <Detail v-if="displayDetails" v-model="displayDetails" :chart="addIdFromLocal(chart)" :inputDiff="inputDiff" />
    </v-card>
</v-lazy>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { API } from '@/modules/api'
  import { Chart } from '@/types/chart';

  import Detail from '@/components/Charts/Detail.vue';


  const api = new API()

  export default Vue.extend({
    name: 'Chart',
    props: ['chart', 'value'],
    components: {
      Detail
    },
    data() {
      return {
        inputDiff: this.value || 2,
        audio: null,
        audioPaused: true,
        displayDetails: false
      }
    },
    methods: {
        async addIdFromLocal(chart:Chart) {
            if (chart.isLocal) {
                const charts = await api.getCharts();
                const foundChart = charts.find(c => (c.name === chart.name))
                if (foundChart) {
                    chart.id = foundChart.id
                }
            }
            return chart
        },
        async download() {
            var chart = this.chart as Chart
            chart = await this.addIdFromLocal(chart)
            window.electron.ipc.send('download-add', chart)
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
        },
        openDetails(diff: number) {
            this.inputDiff = diff;
            if (isNaN(this.value)) {
                this.displayDetails = true
            }
            else {
                this.$emit('input', this.inputDiff)
            }
        }
    },
    computed: {
    }
})
</script>
