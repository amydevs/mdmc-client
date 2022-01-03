
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

export abstract class ConfigIndex {
    public static Characters = {
        0: "Bassist",
        1: "Bad Girl",
        3: "Bunny Girl",
        4: "Pilot",
        5: "Idol",
        6: "Zombie Girl",
        7: "Joker",
        8: "Violinist",
        9: "Maid",
        10: "Magical Girl",
        11: "Little Devil",
        12: "The Girl In Black",
        13: "Christmas Gift",
        14: "Sailor Suit",
        15: "Navigator",
        16: "Game Streamer",
        17: "Part-Time Warrior",
        18: "Red-White Miko"
    }
    public static Companions = {
        0: "Mio Sir",
        1: "Angela",
        2: "Thanatos",
        3: "Rabot-233",
        4: "Little Nurse",
        5: "Little Witch",
        6: "Dragon Girl",
        7: "Lilith",
        8: "Dr. Paige",
    }    
}
