import { BetType } from "./bet-type.model";
import { Match } from "./match.model";
import { Team } from "./team.model";
import { BetLine } from "./bet-line.model";

export class MatchBet extends BetType{

    match: Match;
    team: Team;

    constructor(id: number = 0, label: string = "", initialOdds: number = 0, currentOdds: number = 0, 
    status: number = 0, type: number = 0, betLines: BetLine[] = null, match: Match = null, team: Team = null){
        super(id, label, initialOdds, currentOdds, status, type, betLines);
        this.match = match;
        this.team = team;
    }
}