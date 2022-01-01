<template>
  <v-container>
    <v-row class="justify-center">
      <Chart v-for="(chart, i) in charts" :chart="chart" :key="i" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Chart from './Chart.vue'

  export default Vue.extend({
    name: 'ChartsContainer',      
    components: {
      Chart
    },
    props: ['charts'],

  })
</script>
