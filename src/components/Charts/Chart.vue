<template>
    <v-card
        width="400px"
        class="ma-3"
    >
    <v-img
        :src="`https://mdmc.moe/charts/${chart.id}/cover.png`"
        max-height="150px"
        max-width="150px"
        class="mx-auto my-3"
    >
    </v-img>
    <v-card-actions class="py-0">
        <v-btn icon>
        <v-icon>mdi-timer</v-icon>
        </v-btn>
        {{chart.bpm}} BPM
        <v-spacer></v-spacer>
    </v-card-actions>
    <v-card-title style="word-break: break-word" v-text="chart.name"></v-card-title>
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
    </v-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Chart } from '@/modules/api'

  export default Vue.extend({
    name: 'Chart',
    props: ['chart']
  })
</script>
