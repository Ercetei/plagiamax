import { Team } from './team.model';
import { BetType } from './bet-type.model';
import { Place } from './place.model';
import { Season } from './season.model';

export class Match {
    id: number;
    label: String;
    status: number;
    place: Place;
    season: Season;
    teams: Team[];
    bets: BetType[];

    constructor(id: number = 0, label: string = "", status: number = 0, place: Place = null, season: Season = null, teams: Team[] = []) {
        this.id = id;
        this.label = label;
        this.teams = teams;
    }
}