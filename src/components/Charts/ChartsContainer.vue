<template>
  <v-container>
    <v-row>
      <Chart v-for="chart in charts" :chart="chart" />
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
