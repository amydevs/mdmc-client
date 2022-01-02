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
                :src="chart.isLocal ? `data:image/png;base64, ${chart.b64Cover}` : `https://mdmc.moe/charts/${chart.id}/cover.png`" 
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
                <div v-if="!chart.isLocal">
                    <v-btn icon @click="download">
                        <v-icon>mdi-download-circle</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-play-circle</v-icon>
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn icon @click="deleteC">
                        <v-icon>mdi-delete-circle</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-play-circle</v-icon>
                    </v-btn>
                </div>
            </v-card-actions>
        </div>
    </div>
    </v-card>
    <!-- <v-card class="ma-3" width="500px">
        <div class="">
            <v-avatar
                class="ma-3 mx-auto"
                size="150"
                tile
            >
                <v-img :src="`https://mdmc.moe/charts/${chart.id}/cover.png`"/>
            </v-avatar>
            <div class="align-self-stretch">
                <v-card-actions class="py-0">
                    <v-btn icon>
                        <v-icon>mdi-timer</v-icon>
                    </v-btn>
                    {{chart.bpm}} BPM
                    <v-spacer></v-spacer>
                </v-card-actions>
                <v-card-title class="text-h5">
                    <div class="text-truncate">
                        {{chart.name}}
                    </div>
                </v-card-title>

                <v-card-subtitle v-text="chart.author"></v-card-subtitle>
                <v-card-actions>
                    <v-btn icon>
                    <v-icon>mdi-account-circle</v-icon>
                    </v-btn>
                    {{ chart.levelDesigner }}
                    <v-spacer></v-spacer>
                    <v-btn icon>
                    <v-icon>mdi-download-circle</v-icon>
                    </v-btn>
                    <v-btn icon>
                    <v-icon>mdi-play-circle</v-icon>
                    </v-btn>
                </v-card-actions>
            </div>
        </div>
    </v-card> -->
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  export default Vue.extend({
    name: 'Chart',
    props: ['chart'],
    methods: {
        download() {
            window.electron.ipc.send('download-add', this.chart)
        },
        deleteC() {
            window.electron.library.delete(this.chart.localPath)
        }
    }
  })
</script>
