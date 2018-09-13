// import { Match } from './match.model';

// // Ajouter objet equipe
// export class BetType{

//     id: number;
//     label: string;
//     odds: number;
//     type: number;
//     match: Match;

// 	constructor(id: number = 0, label: string = "", odds: number = 0, type: number = 0, match: Match = null){
//         this.id = id;
//         this.label = label;
//         this.odds = odds;
//         this.type = type;
//         this.match = match;
//     }
// }
export class BetType{

    id: number;
    label: string;
    initialOdds : number;
    currentOdds: number;
    status: number;
    type: any;

    constructor(id: number = 0, label: string = "", initialOdds: number = 0, currentOdds: number = 0, 
                status: number = 0, type: any = null){
        this.id = id;
        this.label = label;
        this.initialOdds = initialOdds;
        this.currentOdds = currentOdds;
        this.status = status;
        this.type = type;
    }
}
