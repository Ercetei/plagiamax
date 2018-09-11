import { Subject } from "node_modules/rxjs";
import { BetType } from "../models/bet-type.model";
import { BaseService } from "./base.service";
import { HttpClient } from '@angular/common/http';

export class BetTypeService extends BaseService {

    protected selectedBets: BetType[] = [];
    public betTypeSubject = new Subject();
    private http: HttpClient

    constructor() {
        super();
    }

    emitSelectedBetsSubject() {
        this.betTypeSubject.next(this.selectedBets);
    }

    // Ajoute un pari aux paris sélectionnés
    addSelectedBet(bet: BetType) {
        this.selectedBets.push(bet);
        this.emitSelectedBetsSubject();
    }

    // Retire un pari des paris sélectionnés
    removeSelectedBet(bet: BetType) {
        this.selectedBets.splice(this.selectedBets.indexOf(bet), 1);
        this.emitSelectedBetsSubject();
    }

    // Récupère tous les paris sélectionnés
    getSelectedBets(): BetType[] {
        return this.selectedBets;
    }

    // Récupère l'un des paris sélectionnés
    getSelectedBet(id: number) {
        return this.selectedBets.find(x => x.id == id);
    }

    // Teste si un pari est sélectionné
    isSelectedBet(id: number) {
        return this.selectedBets.findIndex(x => x.id == id) > -1;
    }
}