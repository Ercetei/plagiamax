import { BetLine } from "./bet-line.model";
import { BetType } from "../../showbet/models/bet-type";

// export class Bet {
//     bets: BetType[];
//     value: number;

//     constructor(bets: BetType[] = [], value = 0){
//         this.bets = bets;
//         this.value = value;
//     }
// }

export class Bet {
    id:number;
    label:string;
    betDate:string;
    betAmount:number;
    status:number;
    user:any;
    
    betlines: BetLine[];

    bets:BetType[];

    constructor(id:number = 0, label:string = "", betDate:string = "", 
                betAmount:number = 0, status:number = 0, user:any = null, betlines: BetLine[] = []
                , bets:BetType[] = [] ){
        this.id=id;
        this.label=label;
        this.betDate=betDate;
        this.betAmount=betAmount;
        this.status=status;
        this.user=user;
        this.betlines = betlines;
        this.bets = bets;
    }
}