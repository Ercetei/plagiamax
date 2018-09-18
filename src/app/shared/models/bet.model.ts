import { User } from "./user.model";
import { BetLine } from "./bet-line.model";

export class Bet {
    id: number;
    label: string;
    betDate: string;
    betAmount: number;
    status: number;
    user: User;
    betLines: BetLine[];

    constructor(id: number = 0, label: string = "", betDate: string = "",
        betAmount: number = 0, status: number = 0, user: User = null, betLines: BetLine[] = []) {
        this.id = id;
        this.label = label;
        this.betDate = betDate;
        this.betAmount = betAmount;
        this.status = status;
        this.user = user;
        this.betLines = betLines;
    }
}
