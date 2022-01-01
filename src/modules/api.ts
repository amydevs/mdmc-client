import { Chart } from '@/types/chart'
export class API {
    basePath: string;
    constructor() {
        this.basePath = "https://mdmc.moe/";
    }
    async getCharts() {
        return (await window.electron.axios.get(`${this.basePath}api/data/charts`)).data as Chart[];
    }
    getChartDownloadUrl(id: number) {
        return `${this.basePath}api/download/${id}`;
    }
    getCoverForChart(id: number) {
        return `${this.basePath}charts/${id}/cover.png`;
    }
}