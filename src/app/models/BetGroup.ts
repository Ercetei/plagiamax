import { Bet } from "./Bet";

export class BetGroup {
    public bets: Bet[];

    constructor(bets: Bet[] = []){
        this.bets = bets;
    }
}