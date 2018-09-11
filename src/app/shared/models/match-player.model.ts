import { Match } from "./match.model";
import { Player } from "./player.model";

export class MatchPlayer {
    id: number;
    enteringtime: number;
    exittime: number;
    player: Player;
    match: Match;


    constructor(id: number = 0, enteringtime: number = 0, exittime: number = 0, player: Player = null, match: Match = null) {
        this.id = id;
        this.enteringtime = enteringtime;
        this.exittime = exittime;
        this.player = player;
        this.match = match;
    }
}