import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Match } from '../models/match.model';
import { BetTypeService } from './bet-type.service';
import { MatchBet } from '../models/match-bet.model';
import { BaseService } from './base.service';

@Injectable()
export class MatchBetService {

    constructor(private betTypeService: BetTypeService, private baseService: BaseService) {
    }

    getBetTypes(match: Match): Observable<MatchBet[]> {
        return of(match.matchbets);
    }

    // Ajoute un pari aux paris sélectionnés
    async addSelectedMatchBet(betType: MatchBet) {
        this.betTypeService.addSelectedBet(await this.baseService.get('/bettype/' + betType.id));
    }

    async getBetTypeInfos() {
        for (let betType of this.betTypeService.getSelectedBets()) {
            if (betType.match == null) {
                betType.match = await this.baseService.get('/match/bettype/' + betType.id);
            } else {
                betType.match = await this.baseService.get('/match/' + betType.match.id);
            }
        }
    }
}