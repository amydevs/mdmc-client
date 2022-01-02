import { Chart } from '@/types/chart'
import { Score } from '@/types/score';

export class API {
    basePath: string;
    constructor() {
        this.basePath = "https://mdmc.moe/";
    }
    async getCharts() {
        return (await window.electron.axios.get(`${this.basePath}api/data/charts`)).data as Chart[];
    }
    getChartDownloadBaseUrl() {
        return `${this.basePath}api/download/`;
    }
    getChartDownloadUrl(id: number) {
        return `${this.getChartDownloadBaseUrl()}${id}`;
    }
    getDemoForChart(id: number) {
        return `${this.basePath}charts/${id}/demo.mp3`;
    }
    getCoverForChart(id: number) {
        return `${this.basePath}charts/${id}/cover.png`;
    }
}

export class LeaderboardsAPI {
    basePath: string;
    constructor() {
        this.basePath = "https://api.musedash.moe/";
    }
    async getScoresForChart(chardID: number, difficulty: number) {
        return (await window.electron.axios.get(`${this.basePath}mdmc/chart/${chardID}/${difficulty}`)).data as Score[];
    }
}
