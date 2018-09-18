import { Subject } from "node_modules/rxjs";
import { BetType } from "../models/bet-type.model";
import { BaseService } from "./base.service";
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { MatchBet } from "../models/match-bet.model";
import { Team } from "../models/team.model";
import { Match } from "../models/match.model";

const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*');

export class BetTypeService extends BaseService {

    protected selectedBets: MatchBet[] = [];
    public betTypeSubject = new Subject();
    private http: HttpClient

    constructor() {
        super();
    }

    emitSelectedBetsSubject() {
        this.betTypeSubject.next(this.selectedBets);
    }

    // Retire un pari des paris sélectionnés
    removeSelectedBet(betType: MatchBet) {
        this.selectedBets.splice(this.selectedBets.findIndex(x => x.id == betType.id), 1);
        this.emitSelectedBetsSubject();
    }

    // Récupère tous les paris sélectionnés
    getSelectedBets(): MatchBet[] {
        return this.selectedBets;
    }

    // Récupère l'un des paris sélectionnés
    getSelectedBet(id: number): MatchBet {
        return this.selectedBets.find(x => x.id == id);
    }

    // Teste si un pari est sélectionné
    isSelectedBet(id: number) {
        return this.selectedBets.findIndex(x => x.id == id) > -1;
    }
}
