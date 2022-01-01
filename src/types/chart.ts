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

    id?: number;

    isLocal?: boolean;
    b64Cover?: string;
}