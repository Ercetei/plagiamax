import { Bet } from "./bet.model";

// Ajouter objet equipe
export class BetType{

    id: number;
    momentodds: number;
    bet: Bet;

	constructor(id: number = 0, momentodds: number = 0, bet: Bet = null){
        this.id = id;
        this.momentodds = momentodds;
        this.bet = bet;
    }
}