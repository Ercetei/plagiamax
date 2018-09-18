import { Match } from './match';

// Ajouter objet equipe
export class BetType{

    id: number;
    label: string;
    odds: number;
    type: number;
    match: Match;

	constructor(id: number = 0, label: string = "", odds: number = 0, type: number = 0, match: Match = null){
        this.id = id;
        this.label = label;
        this.odds = odds;
        this.type = type;
        this.match = match;
    }
}