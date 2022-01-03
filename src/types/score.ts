
export enum ScoreEnum {
    Acc = 0,
    Score = 1,
    Index = 2,
    Username = 3,
    UserID = 4,
    Character = 5,
    Companion = 6,
}
export interface Score {
    0: number;
    1: number;
    2: number;
    3: string;
    4: string;
    5: string;
    6: string;
}

const Characters = {
    0: "Bassist",
    3: "Bunny Girl",
    5: "Idol",
    7: "Joker",
    9: "Maid",
    11: "Little Devil",
    12: "The Girl In Black",
    13: "Christmas Gift",
    15: "Navigator",
    16: "Game Streamer",
    17: "Part-Time Warrior",
    18: "Red-White Miko"
}

const Companions = {
    0: "Mio Sir",
}
