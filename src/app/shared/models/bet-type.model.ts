import { BetLine } from "./bet-line.model";

// Ajouter objet equipe
export class BetType{

    id: number;
    label: string;
    initialOdds : number;
    currentOdds: number;
    status: number;
    type: number;
    betLines: BetLine[];

    constructor(id: number = 0, label: string = "", initialOdds: number = 0, currentOdds: number = 0, 
                status: number = 0, type: number = 0, betLines: BetLine[] = null){
        this.id = id;
        this.label = label;
        this.initialOdds = initialOdds;
        this.currentOdds = currentOdds;
        this.status = status;
        this.type = type;
        this.betLines = this.betLines;
    }
}