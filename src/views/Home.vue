<template>
<div class="text-center">
  <ChartsContainer :charts="charts" />
  <v-progress-circular
    v-if="!loaded"
    :size="50"
    indeterminate
  ></v-progress-circular>
</div>
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
        loaded: false,
        charts: []
      }
    },
    async mounted() {
      this.$data.charts = await api.getCharts();
      this.$data.loaded = true;
    }
  })
</script>
