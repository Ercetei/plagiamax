import { Subject } from "node_modules/rxjs";
import { BaseService } from "./base.service";
import { MatchBet } from "../models/match-bet.model";
import { Injectable } from "@angular/core";


@Injectable()
export class BetTypeService {

    protected selectedBets: MatchBet[] = [];
    public betTypeSubject = new Subject();

    constructor(public baseService: BaseService) {

    }

    emitSelectedBetsSubject() {
        this.betTypeSubject.next(this.selectedBets);
    }

    addSelectedBet(betType: MatchBet){
        this.selectedBets.push(betType);
        this.emitSelectedBetsSubject();
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
