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
        <div class="d-flex justify-space-between mx-1">
          <v-switch
            label="Show Easy"
            v-model="show.easy"
            hide-details
          ></v-switch>
          <v-switch
            label="Show Hard"
            v-model="show.hard"
            hide-details
          ></v-switch>
          <v-switch
            label="Show Master"
            v-model="show.master"
            hide-details
          ></v-switch>
        </div>
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
        show: {
          easy: true,
          hard: true,
          master: true
        }
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

          // Filter by difficulty
          return searchBool && (
            (this.$data.show.easy ?  (chart.difficulty1 != 0) : false) ||
            (this.$data.show.hard ?  (chart.difficulty2 != 0) : false) ||
            (this.$data.show.master ?  (chart.difficulty3 != 0) : false)
          )
        })
        console.log(returnVal)
        return returnVal
      }
    }
  })
</script>
