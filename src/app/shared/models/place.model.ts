import { Match } from './match.model';
import { Team } from './team.model';

export class Place {
    id: number;
    country: string;
    city: string;
    stadium: string;
    teams: Team[];
    matchs: Match[];
    players: any[];
    competitions: any[];

    constructor(id: number = 0, country: string = "", city: string = "", stadium: string = "", teams: Team[] = [], matchs: Match[] = [], players: any[] = [], competitions: any[] = []) {
        this.id = id;
        this.country = country;
        this.city = city;
        this.stadium = stadium;
        this.teams = teams;
        this.matchs = matchs;
        this.players = players;
        this.competitions = competitions;
    }
}