import { BetType } from "./bet-type.model";

export class Bet {
    bets: BetType[];
    value: number;

    constructor(bets: BetType[] = [], value = 0){
        this.bets = bets;
        this.value = value;
    }
}