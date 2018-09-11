import { Season } from "./season.model";
import { Match } from "./match.model";

export class MatchDay {
    id: number;
    label: string;
    season: Season;
    matchs: Match[];


    constructor(id: number = 0, label: string = "", season: Season = null, matchs: Match[] = []) {
        this.id = id;
        this.label = label;
        this.season = season;
        this.matchs = matchs;
    }
}