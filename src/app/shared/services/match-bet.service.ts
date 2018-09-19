import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Match } from '../models/match.model';
import { BetTypeService } from './bet-type.service';
import { MatchBet } from '../models/match-bet.model';

@Injectable()
export class MatchBetService {

    constructor(private betTypeService: BetTypeService) {
    }

    getBetTypes(match: Match): Observable<MatchBet[]> {
        return of(match.matchbets);
    }

    // Récupère les MatchBet dans la BDD pour un match défini
    getBetsByMatch(match: Match): Observable<MatchBet[]> {
        return this.betTypeService.baseService.http.get<MatchBet[]>(this.betTypeService.baseService.rootUrl + '/matchbet/' + match.id);
    }


    // Ajoute un pari aux paris sélectionnés
    addSelectedMatchBet(betType: MatchBet) {
        let betToAdd: MatchBet;
        this.betTypeService.baseService.http.get<MatchBet>(this.betTypeService.baseService.rootUrl + '/bettype/' + betType.id, {
            headers: this.betTypeService.baseService.allowAccessHeaders,
            responseType: 'json',
            withCredentials: true
        }).subscribe(data => {
            betToAdd = data
            this.betTypeService.addSelectedBet(betToAdd);
        });
    }

    getBetTypeInfos(bettype: MatchBet = null) {
        for (let betType of this.betTypeService.getSelectedBets()) {
            this.betTypeService.baseService.http.get<Match>(this.betTypeService.baseService.rootUrl + '/match/' + betType.match.id, {
                headers: this.betTypeService.baseService.allowAccessHeaders,
                responseType: 'json',
                withCredentials: true
            }).subscribe(async data => {
                await (betType.match = data);
            });
        }
    }
}