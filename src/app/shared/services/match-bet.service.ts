import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Match } from '../models/match.model';
import { BetTypeService } from './bet-type.service';
import { MatchBet } from '../models/match-bet.model';
import { HttpClient } from '@angular/common/http';

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
        return this.httpClient.get<MatchBet[]>(this.rootUrl+'/matchbet/' + match.id);
    }
}