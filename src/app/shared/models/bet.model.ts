import { User } from "./user.model";
import { BetLine } from "./bet-line.model";
import { getLocaleDateFormat } from "@angular/common";

export class Bet {
    id: number;
    label: string;
    betdate: Date;
    betamount: number;
    status: number;
    momentodds: number;
    user: User;
    betlines: BetLine[];

    constructor(id: number = 0, label: string = "", betdate: Date = new Date(),
        betamount: number = 0, status: number = 0, momentodds: number = 1, user: User = null, betlines: BetLine[] = []) {
        this.id = id;
        this.label = label;
        this.betdate = betdate;
        this.betamount = betamount;
        this.status = status;
        this.user = user;
        this.betlines = betlines;
        this.momentodds = momentodds;
    }
}
