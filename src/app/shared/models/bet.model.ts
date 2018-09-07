import { BetType } from "./bet-type.model";

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
    idUser:number;
    
    bets: BetType[];

    constructor(id:number = 0, label:string = "", betDate:string = "", 
                betAmount:number = 0, status:number = 0, idUser:number = 0, bets: BetType[] = [] ){
        this.id=id;
        this.label=label;
        this.betDate=betDate;
        this.betAmount=betAmount;
        this.status=status;
        this.idUser=idUser;
        this.bets = bets;
    }
}