<template>
  <ChartsContainer :charts="charts" />
</template>

<script lang="ts">
  import Vue from 'vue'
  import ChartsContainer from '../components/Charts/ChartsContainer.vue'
  import { API } from '@/modules/api'
  import { Chart } from '@/types/chart'

  const api = new API()

  export default Vue.extend({
    name: 'Library',

    components: {
      ChartsContainer,
    },
    data() {
      return {
        charts: [] as Chart[]
      }
    },
    async mounted() {
      window.electron.ipc.receive("library-update", (event:Chart[]) => {
        this.charts = event;
        console.log(event)
      });
      this.charts = window.electron.library.get();
    }
  })
</script>
