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

export interface Chart {
    name: string;
    author: string;
    bpm: number | string;
    scene: string;
    levelDesigner: string;
    levelDesigner1: string;
    levelDesigner2: string;
    levelDesigner3: string;
    levelDesigner4: string;
    difficulty1: number;
    difficulty2: number;
    difficulty3: number;
    unlockLevel: number;
    id: number;
}