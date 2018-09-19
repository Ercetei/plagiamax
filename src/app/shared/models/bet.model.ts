import { User } from "./user.model";
import { BetLine } from "./bet-line.model";

export class Bet {
    id: number;
    label: string;
    betdate: string;
    betamount: number;
    status: number;
    user: User;
    betlines: BetLine[];

    constructor(id: number = 0, label: string = "", betdate: string = "",
        betamount: number = 0, status: number = 0, user: User = null, betlines: BetLine[] = []) {
        this.id = id;
        this.label = label;
        this.betdate = betdate;
        this.betamount = betamount;
        this.status = status;
        this.user = user;
        this.betlines = betlines;
    }
}
