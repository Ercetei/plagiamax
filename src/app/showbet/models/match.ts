import { Team } from './team';
import { BetType } from './bet-type';



export class Match {
    id: number;
    label: String;
    status: number;
    place: any [];
    season: any[];
    teams: Team[];
    bets: BetType[];


    constructor(id: number = 0, label: string = "", status: number = 0, teams: Team[] = [], bets: BetType[] = [], 
    place: any = [], season: any = []) {
        this.id = id;
        this.label = label;
        this.teams = teams;
        this.status = status;
        this.bets = bets;
        this.place = place;
        this.season = season;
    }
}