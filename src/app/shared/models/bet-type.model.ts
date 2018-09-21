import { BetLine } from "./bet-line.model";

// Ajouter objet equipe
export class BetType{

    id: number;
    label: string;
    initialodds : number;
    currentodds: number;
    status: number;
    type: number;
    betlines: BetLine[];

    constructor(id: number = 0, label: string = "", initialodds: number = 0, currentodds: number = 0, 
                status: number = 0, type: number = 0, betlines: BetLine[] = null){
        this.id = id;
        this.label = label;
        this.initialodds = initialodds;
        this.currentodds = currentodds;
        this.status = status;
        this.type = type;
        this.betlines = betlines;
    }
}
