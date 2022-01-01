export class API {
    basePath: string;
    constructor() {
        this.basePath = "https://mdmc.moe/";
    }
    async getCharts() {
        return (await window.electron.axios.get(`${this.basePath}api/data/charts`)).data as Chart[];
    }
    async downloadChart(id: number) {
        // return (await got.get(`${this.basePath}api/download/${id}`)).body as string;
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