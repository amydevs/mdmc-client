<template>
  <v-dialog v-model="display" scrollable>
      <template>
        <v-card>
          <v-toolbar
            color="primary"
            dark
            dense
          >{{ loaded ? finalizedChart.name : 'Loading' }}</v-toolbar>

          <v-card-text class="" v-if="loaded">
              <div class="d-flex">
                <ChartComp :chart="finalizedChart" v-model="difficulty" />
              </div>


              <v-card v-if="leaderboard.length !== 0" class="mx-3">
                <v-toolbar dense flat>
                  <v-toolbar-title>{{ DiffIndex.Difficulties[difficulty] }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="refreshLeaderboard()">
                    <v-icon>mdi-refresh-circle</v-icon>
                  </v-btn>
                  <v-text-field
                    dense
                    outlined
                    hide-details
                    label="Search Username"
                    rounded
                    filled
                    style="max-width: 190px;"
                    class="pagenum"
                    v-model="search"
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
                       <tr v-for="(score, i) in filteredLeaderboard" :key="i">
                        <td>{{score[ScoreEnum.Index]+1}}</td>
                        <td><a @click="$electron.shell.openExternalPlayer(score[ScoreEnum.UserID])">{{score[ScoreEnum.Username]}}</a></td>
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
    import { Chart, DiffIndex } from '@/types/chart';
    import { Score, ScoreEnum, ConfigIndex } from '@/types/score';
    import { electron } from 'process';

    const api = new API()
    const leaderboardsApi = new LeaderboardsAPI()

    export default Vue.extend({
        name: 'Detail',
        // props: ['value', 'chart', 'inputDiff'],
        props: {
          value: Boolean,
          chart: (Promise as unknown) as () => Promise<Chart>,
          inputDiff: Number || null,
        },
        components: {
            ChartComp: () => import('@/components/Charts/Chart.vue') as any
        },
        data() {
          return {
            DiffIndex: DiffIndex,
            ConfigIndex: ConfigIndex,
            ScoreEnum: ScoreEnum,

            difficulty: this.inputDiff || 2,
            display: this.value as boolean,
            finalizedChart: {} as Chart,
            loaded: false,
            leaderboard: [] as Score[],
            search: '',
          }
        },
        watch: {
            display: function (val:boolean) {
                this.$emit('input', val)
            },
            difficulty: async function (val:number) {
              await this.refreshLeaderboard();
            }
        },
        computed: {
          filteredLeaderboard() {
            var leaderboard = this.leaderboard as Score[];
            if (this.search.length !== 0) {
              leaderboard = leaderboard.filter(score => score[ScoreEnum.Username].toLowerCase().includes(this.search.toLowerCase()))
            }
            return leaderboard
          }
        },
        async mounted() {
          this.finalizedChart = (await this.chart)
          this.loaded = true
          await this.refreshLeaderboard();
        },
        methods: {
          async refreshLeaderboard() {
            if (this.finalizedChart.id !== undefined) {
              this.leaderboard = (await leaderboardsApi.getScoresForChart(this.finalizedChart.id, this.difficulty - 1)).sort((a, b) => a[ScoreEnum.Index] - b[ScoreEnum.Index])
            } 
          }
        }
    })
</script>