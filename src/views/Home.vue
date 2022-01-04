<template>
<div class="text-center">
  <ChartsContainer :charts="charts" />
  <v-progress-circular
    v-if="!loaded"
    :size="50"
    indeterminate
    color="primary"
  ></v-progress-circular>
</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ChartsContainer from '../components/Charts/ChartsContainer.vue'
  import { API } from '@/modules/api'
import { Chart } from '@/types/chart'

  const api = new API()

  export default Vue.extend({
    name: 'Home',

    components: {
      ChartsContainer,
    },
    data() {
      return {
        loaded: false,
        charts: [] as Chart[]
      }
    },
    async mounted() {
      this.charts = await api.getCharts();
      this.loaded = true;
    }
  })
</script>
