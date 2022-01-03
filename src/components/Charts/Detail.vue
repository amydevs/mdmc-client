<template>
  <v-dialog v-model="display">
      <template>
        <v-card>
          <v-toolbar
            color="primary"
            dark
          >{{ loaded ? finalizedChart.name : 'Loading' }}</v-toolbar>

          <v-card-text class="" v-if="loaded">
              <div class="d-flex">
                <ChartComp :chart="finalizedChart" v-model="difficulty" />
              </div>


              <v-card v-if="leaderboard.length !== 0">
                <v-toolbar dense flat>
                  <v-toolbar-title>{{ finalizedChart.name }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                  <v-text-field
                    dense
                    solo
                    hide-details
                    label="Page"
                    placeholder="1"
                    rounded
                    filled
                    style="max-width: 150px;"
                    class="pagenum"
                  />

                </v-toolbar>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Username</th>
                        <th>Accuracy</th>
                        <th>Score</th>
                        <th>Configuration</th>
                      </tr>
                    </thead>
                    <tbody>
                       <tr v-for="(score, i) in leaderboard" :key="i">
                        <td>{{score[ScoreEnum.Index]+1}}</td>
                        <td><a :href="`https://musedash.moe/mdmc/player/${score[ScoreEnum.Username]}`">{{score[ScoreEnum.Username]}}</a></td>
                        <td>{{score[ScoreEnum.Acc]}}%</td>
                        <td>{{score[ScoreEnum.Score]}}</td>
                        <td>{{ ConfigIndex.Characters[Number(score[ScoreEnum.Character])] }} / {{ ConfigIndex.Characters[Number(score[ScoreEnum.Companion])] }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>

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
    import { API, LeaderboardsAPI } from '@/modules/api'
    import { Chart } from '@/types/chart';
    import { Score, ScoreEnum, ConfigIndex } from '@/types/score';

    const api = new API()
    const leaderboardsApi = new LeaderboardsAPI()

    export default Vue.extend({
        name: 'Detail',
        props: ['value', 'chart', 'inputDiff'],
        components: {
            ChartComp: () => import('@/components/Charts/Chart.vue') as any
        },
        data() {
          return {
            ConfigIndex: ConfigIndex,
            ScoreEnum: ScoreEnum,
            difficulty: this.inputDiff || 2,
            display: this.value as boolean,
            finalizedChart: {} as Chart,
            loaded: false,
            leaderboard: [] as Score[],
          }
        },
        watch: {
            display: function (val:boolean) {
                this.$emit('input', val)
            }
        },
        async mounted() {
          this.finalizedChart = (await this.chart) as Chart
          this.loaded = true
          if (this.finalizedChart.id !== undefined) {
            this.leaderboard = (await leaderboardsApi.getScoresForChart(this.finalizedChart.id, this.difficulty - 1))
          } 
        },
    })
</script>