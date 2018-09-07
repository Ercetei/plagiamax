// import { Bet } from "./bet.model";

// // Ajouter objet equipe
// export class BetType{

//     id: number;
//     momentodds: number;
//     bet: Bet;

// 	constructor(id: number = 0, momentodds: number = 0, bet: Bet = null){
//         this.id = id;
//         this.momentodds = momentodds;
//         this.bet = bet;
//     }
// }


export class BetLine{

    id: number;
    idBet:number;
    idBetType:number;
    momentodds: number;

	constructor(id: number = 0, idBet:number = 0, idBetType:number = 0, momentodds: number = 0){
        this.id = id;
        this.idBet = idBet;
        this.idBetType = idBetType;
        this.momentodds = momentodds;
    }
}