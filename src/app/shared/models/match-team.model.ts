import { Team } from './team.model';
import { Match } from './match.model';

export class MatchTeam {
    id: number;
    ishometeam: boolean;
    match: Match;
    team: Team;

    constructor(id: number = 0, ishometeam: boolean = false, match: Match = null, team: Team = null) {
        this.id = id;
        this.ishometeam = ishometeam;
        this.match = match;
        this.team = team;
    }
}