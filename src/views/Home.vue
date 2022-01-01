<template>
  <ChartsContainer :charts="charts" />
</template>

<script lang="ts">
  import Vue from 'vue'
  import ChartsContainer from '../components/Charts/ChartsContainer.vue'
  import { API } from '@/modules/api'

  const api = new API()

  export default Vue.extend({
    name: 'Home',

    components: {
      ChartsContainer,
    },
    data() {
      return {
        charts: []
      }
    },
    async mounted() {
      this.$data.charts = await api.getCharts();
    }
  })
</script>
