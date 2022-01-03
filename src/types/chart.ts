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
    localPath?: string;
    b64Cover?: string;
}

export interface QChart extends Chart {
    QIndex: string;
}

export abstract class DiffIndex {
    public static Difficulties = {
        1: "Easy",
        2: "Hard",
        3: "Master",
    }
}