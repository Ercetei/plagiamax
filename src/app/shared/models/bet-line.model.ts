import { BetType } from "./bet-type.model";
import { Bet } from "./bet.model";

// Ajouter objet equipe
export class BetLine {

    id: number;
    bet: Bet;
    betType: BetType;
    status: number;

    constructor(id: number = 0, bet: Bet = null, betType: BetType = null, status: number = 1) {
        this.id = id;
        this.bet = bet;
        this.betType = betType;
        this.status = status;
    }
}
