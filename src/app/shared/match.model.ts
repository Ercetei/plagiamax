import { Team } from './team.model';
import { BetType } from './bet-type.model';

export class Match {
    id: number;
    label: String;
    teams: Team[];
    bets: BetType[];

    constructor(id: number = 0, teams: Team[] = [], label: string = "") {
        this.id = id;
        this.label = label;
        this.teams = teams;
    }
}