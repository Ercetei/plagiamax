import { Team } from './team.model';
import { Match } from './match.model';

export class MatchTeam {
    id: number;
    isHomeTeam: boolean;
    match: Match;
    team: Team;

    constructor(id: number = 0, isHomeTeam: boolean = false, match: Match = null, team: Team = null) {
        this.id = id;
        this.isHomeTeam = isHomeTeam;
        this.match = match;
        this.team = team;
    }
}