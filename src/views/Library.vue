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
        charts: [] as Chart[],
        delFunc: null as null | (() => void),
      }
    },
    mounted() {
      this.delFunc = window.electron.ipc.receive("library-update", (event:Chart[]) => {
        console.log(event)
        this.charts = event;
      });
      this.charts = window.electron.library.get();
    },
    beforeDestroy() {
      if (this.delFunc) {
        this.delFunc();
      }
    },
    methods: {
    }
  })
</script>
