<template>
  <div>
  <v-container>
    <v-row class="justify-center">
      <v-card width="100%" class="ma-3 pa-4">
        <v-text-field
            v-model="search"
            label="Search"
            outlined
            clearable
            hide-details
          ></v-text-field>
      </v-card>
      <ChartComp v-for="(chart, i) in searchFilter" :chart="chart" :key="i" />
    </v-row>
  </v-container>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ChartComp from './Chart.vue'
  import { Chart } from '@/types/chart'

  export default Vue.extend({
    name: 'ChartsContainer',    
    data() {
      return {
        search: '',
      }
    },
    components: {
      ChartComp
    },
    props: ['charts'],
    computed: {
      searchFilter() {
        const len = (this.$data as any).search.length as number
        
        var returnVal = this.charts as Chart[]
        
        const lowercaseSearch = this.$data.search.toLowerCase()
        returnVal = returnVal.filter(chart => {
          var searchBool = true
          if (len !== 0) {
            searchBool =  (
              chart.name.toLowerCase().includes(lowercaseSearch) ||
              chart.author.toLowerCase().includes(lowercaseSearch) ||
              chart.levelDesigner.toLowerCase().includes(lowercaseSearch)
            )
          }
          
          return searchBool
        })

        return returnVal
      }
    }
  })
</script>
