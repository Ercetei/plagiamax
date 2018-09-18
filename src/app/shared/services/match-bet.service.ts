import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Match } from '../models/match.model';
import { BetTypeService } from './bet-type.service';
import { MatchBet } from '../models/match-bet.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*');

@Injectable()
export class MatchBetService extends BetTypeService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    getBetTypes(match: Match): Observable<MatchBet[]> {
        return of(match.matchbets);
    }

    // Récupère les MatchBet dans la BDD pour un match défini
    getBetsByMatch(match: Match): Observable<MatchBet[]> {
        return this.httpClient.get<MatchBet[]>(this.rootUrl + '/matchbet/' + match.id);
    }


    // Ajoute un pari aux paris sélectionnés
    addSelectedMatchBet(betType: MatchBet) {
        let betToAdd: MatchBet;
        this.httpClient.get<MatchBet>(this.rootUrl + '/bettype/' + betType.id,{
            headers: headers,
            responseType: 'json',
            withCredentials: true
        }).subscribe(data => {
            betToAdd = data
            this.selectedBets.push(betToAdd);
            this.emitSelectedBetsSubject();
        });
    }

    getBetTypeInfos() {
        console.log(this.selectedBets);
        for (let betType of this.selectedBets) {
            this.httpClient.get<Match>(this.rootUrl + '/match/' + betType.match.id, {
                headers: headers,
                responseType: 'json',
                withCredentials: true
            }).subscribe(async data => {
                await (betType.match = data); 
            });
        }
    }
}