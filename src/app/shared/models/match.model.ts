import { Place } from './place.model';
import { MatchTeam } from './match-team.model';
import { MatchBet } from './match-bet.model';
import { MatchDay } from './match-day.model';
import { MatchPlayer } from './match-player.model';

export class Match {
    id: number;
    label: String;
    status: number;
    place: Place;
    matchplayers: MatchPlayer[];
    matchday: MatchDay;
    matchteams: MatchTeam[];
    matchbets: MatchBet[];
    events: Event[];

    constructor(id: number = 0, label: string = "", status: number = 0, matchTeams: MatchTeam[] = [], matchBets: MatchBet[] = [], 
    place: Place = null, matchday: MatchDay = null, events: Event[] = []) {
        this.id = id;
        this.label = label;
        this.matchteams = matchTeams;
        this.status = status;
        this.matchbets = matchBets;
        this.place = place;
        this.matchday = matchday;
        this.events = events;
    }
}