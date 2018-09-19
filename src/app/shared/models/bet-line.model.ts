import { BetType } from "./bet-type.model";

// Ajouter objet equipe
export class BetLine {

    id: number;
    idBet: number;
    momentodds: number;
    betType: BetType;

    constructor(id: number = 0, idBet: number = 0, betType: BetType = null, momentodds: number = 0) {
        this.id = id;
        this.idBet = idBet;
        this.betType = betType;
        this.momentodds = momentodds;
    }
}
