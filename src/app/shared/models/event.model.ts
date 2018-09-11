import { Team } from "./team.model";
import { Match } from "./match.model";
import { Player } from "./player.model";

export class Event{
    id: number;
    status: number;
    statustime: number;
    player: Player;
    match: Match;
    team: Team;

    constructor(id: number = 0, status: number = 1, statustime: number = 0, player: Player = null, match: Match = null,
        team: Team = null){
        this.id = id;
        this.status = status;
        this.statustime = statustime;
        this.player = player;
        this.match = match;
        this.team = team;
    }
}