import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { Match } from '../models/match.model';
import { Team } from '../models/team.model';
import { BetType } from '../models/bet-type.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MatchService {

    // TODO: A supprimer avec la BDD
    /*match1: Match = new Match(0, "Trophée des champions", 0, [ new Team(0, "Paris Saint-Germain"), new Team(1, "Monaco")]);
    
    match2: Match = new Match(1, "", 0, [ new Team(2, "SCO Angers"), new Team(3, "Stade Rennais FC")]);
    
    betsT1: BetType[] = [
        new BetType(1, 'Paris Saint Germain', 2.22, 1, this.match1),
        new BetType(2, 'Nul', 3.40, 1, this.match1),
        new BetType(3, 'Monaco', 3.15, 1, this.match1),
        new BetType(4, '1-0', 2, 2, this.match1),
        new BetType(5, '0-1', 5, 2, this.match1),
        new BetType(6, '0-0', 3.5, 2, this.match1),
        new BetType(7, '2-0', 2, 2, this.match1),
        new BetType(8, '1-2', 5, 2, this.match1),
        new BetType(9, '1-1', 3.5, 2, this.match1),
        new BetType(10,'Plus de 0.5 buts', 1.2, 3, this.match1),
        new BetType(11,'Moins de 0.5 buts', 5, 3, this.match1),
        new BetType(12,'Plus de 1.5 buts', 2.5, 3, this.match1),
        new BetType(13,'Moins de 1.5 buts',2.5, 3, this.match1),
        new BetType(14,'Plus de 2.5 buts', 5, 3, this.match1),
        new BetType(15,'Moins de 2.5 buts', 1.2, 3, this.match1)
    ];

    betsT2: BetType[] = [
        new BetType(1, 'Stade Rennais FC', 2.22, 1, this.match2),
        new BetType(2, 'Nul', 3.40, 1, this.match2),
        new BetType(3, 'SCO Angers', 3.15, 1, this.match2),
        new BetType(4, '1-0', 2, 2, this.match2),
        new BetType(5, '0-1', 5, 2, this.match2),
        new BetType(6, '0-0', 3.5, 2, this.match2),
        new BetType(7, '2-0', 2, 2, this.match2),
        new BetType(8, '1-2', 5, 2, this.match2),
        new BetType(9, '1-1', 3.5, 2, this.match2),
        new BetType(10,'Plus de 0.5 buts', 1.2, 3, this.match2),
        new BetType(11,'Moins de 0.5 buts', 5, 3, this.match2),
        new BetType(12,'Plus de 1.5 buts', 2.5, 3, this.match2),
        new BetType(13,'Moins de 1.5 buts',2.5, 3, this.match2),
        new BetType(14,'Plus de 2.5 buts', 5, 3, this.match2),
        new BetType(15,'Moins de 2.5 buts', 1.2, 3, this.match2)
    ];

    matchs: Match[] = [
        this.match1,
        this.match2
    ]*/
    
    readonly rootUrl = 'http://localhost:1234';

    constructor(private http: HttpClient) { 
        //this.match1.bets = this.betsT1;
        //47this.match2.bets = this.betsT2;
    }

    addMatch(match: Match) {
        const body: Match = {
            id: match.id,
            label: match.label,
            status: match.status,
            place: match.place,
            season: match.season,
            teams: match.teams,
            bets: match.bets
        }
        var reqHeader = new HttpHeaders({'No-Auth':'True'});
        return this.http.post(this.rootUrl + '/match', body,{headers : reqHeader});
    }

    getMatchs(id: number) : Observable<Match[]> {
       // return of(this.matchs);
       return this.http.get<Match[]>(this.rootUrl+'/match');
    }

    getMatch(id: number) : Observable<Match> {
        //return of(this.matchs.find(x => x.id == id));
        return this.http.get<Match>(this.rootUrl+'/match/'+id);
    }
}