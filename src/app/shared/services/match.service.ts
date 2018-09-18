import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Match } from '../models/match.model';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

const headers = new HttpHeaders()
.set('Access-Control-Allow-Origin', '*');

@Injectable()
export class MatchService extends BaseService {

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



    constructor(private http: HttpClient) {
        super();
        //this.match1.bets = this.betsT1;
        //this.match2.bets = this.betsT2;
    }

    /*addMatch(match: Match) {
        const body: Match = {
            id: match.id,
            label: match.label,
            status: match.status,
            place: match.place,
            matchday: match.matchday,
            matchteams: match.matchteams,
            matchbets: match.matchbets,
            events: match.events,
            matchplayers: match.matchplayers
        }
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.post(this.rootUrl + '/match', body, { headers: reqHeader });
    }*/

    getMatchs(): Observable<Match[]> {
        //return of(this.matchs);

        return this.http.get<Match[]>(this.rootUrl + '/match', {
            headers: headers,
            responseType: 'json',
            withCredentials: true
        });
    }

    getMatch(id: number): Observable<Match> {
        //return of(this.matchs.find(x => x.id == id));
       

        /*this.http.get<Match>(this.rootUrl+'/match/'+id , {
            headers: headers,
            responseType: 'json',
            withCredentials: true
        }).subscribe(
            data => {
                console.log(data)
        },
        (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.log('Client-side error occured.');
            } else {
                console.log('Server-side error occured.');
            }
        }
        );*/
        return this.http.get<Match>(this.rootUrl + '/match/' + id, {
            headers: headers,
            responseType: 'json',
            withCredentials: true
        });
    }

    getLabelMatchs(label: String) : Observable<Match[]> {
        return of(this.matchs);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getLabelMatch(label: String) : Observable<Match> {
         return of(this.matchs.find(x => x.label == label));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }
     getStatusMatchs(status: number) : Observable<Match[]> {
        return of(this.matchs);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getStatusMatch(status: number) : Observable<Match> {
         return of(this.matchs.find(x => x.status == status));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }
     getPlaceMatchs(place: Place) : Observable<Match[]> {
        return of(this.matchs);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getPlaceMatch(place: Place) : Observable<Match> {
         return of(this.matchs.find(x => x.place == place));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }
     getTeamMatchs(teams: Team[]) : Observable<Match[]> {
        return of(this.matchs);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getTeamsMatch(teams: Team[]) : Observable<Match> {
         return of(this.matchs.find(x => x.teams == teams));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }
     getBetMatchs(bets: BetType[]) : Observable<Match[]> {
        return of(this.matchs);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getBetMatch(bets: BetType[]) : Observable<Match> {
         return of(this.matchs.find(x => x.bets == bets));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }
}
