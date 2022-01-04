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
            hide-details="auto"            
            :rules="[() => (length != 0 || 'No Charts Found...')]"
        ></v-text-field>
        <div class="d-flex justify-space-between mt-3">
          <v-btn
            v-for="(option, i) in options"
            :class="`
              flex-grow-1 
              ${i === 0 ? 'rounded-r-0' : (i === options.length - 1 ? 'rounded-l-0' : 'rounded-0')}
            `"
            depressed
            :key="i"
            :text="!option.value ? true : false"
            @click="option.value = !option.value"
            :color="`primary ${!option.value ? 'lighten-1' : ''}`"
          >
            {{ option.text }}
          </v-btn>
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
        length: 1,
        options: [
          { text: 'Show Easy', value: true, int: 1 },
          { text: 'Show Hard', value: true, int: 2 },
          { text: 'Show Master', value: true, int: 3 },
        ],
      }
    },
    components: {
      ChartComp
    },
    props: {
      charts: {
        type: Array as () => Chart[]
      }
    },
    computed: {
      searchFilter() {
        const len = this.search.length as number
        
        var returnVal = this.charts as Chart[]
        
        const lowercaseSearch = this.search.toLowerCase()
        returnVal = returnVal.filter(chart => {
          var searchBool = true
          if (len !== 0) {
            searchBool =  (
              chart.name.toLowerCase().includes(lowercaseSearch) ||
              chart.author.toLowerCase().includes(lowercaseSearch) ||
              chart.levelDesigner.toLowerCase().includes(lowercaseSearch)
            )
          }

          var tempBool = false
          for (const option of this.options) {
            tempBool = tempBool || (option.value ?  ((chart as any)[`difficulty${option.int}`] != 0) : false) 
          }
          // Filter by difficulty
          return searchBool && tempBool
          // && (
          //   (this.$data.show.easy ?  (chart.difficulty1 != 0) : false) ||
          //   (this.$data.show.hard ?  (chart.difficulty2 != 0) : false) ||
          //   (this.$data.show.master ?  (chart.difficulty3 != 0) : false)
          // )
        })
        this.length = returnVal.length
        return returnVal
      }
    }
  })
</script>
