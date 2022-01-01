import { Chart } from '@/types/chart'
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
    getCoverForChart(id: number) {
        return `${this.basePath}charts/${id}/cover.png`;
    }
}