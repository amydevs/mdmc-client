<template>
    <v-dialog v-model="display">
        <template>
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Opening from the bottom</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="display = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { API } from '@/modules/api'
    import { Chart } from '@/types/chart';

    import Detail from '@/components/Charts/Detail.vue';


    const api = new API()

    export default Vue.extend({
        name: 'Detail',
        props: ['value', 'chart'],
        data() {
            return {
                display: this.value as boolean,
                finalizedChart: {} as Chart
            }
        },
        watch: {
            display: function (val:boolean) {
                this.$emit('input', val)
            }
        },
        async mounted() {
            this.$data.finalizedChart = (await this.chart) as Chart
            console.log(this.finalizedChart)
        },
    })
</script>