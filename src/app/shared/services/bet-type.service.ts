import { Subject } from "node_modules/rxjs";
import { MatchBet } from "../models/match-bet.model";
import { Injectable } from "@angular/core";
import { BetType } from "../models/bet-type.model";


@Injectable()
export class BetTypeService {

    protected selectedBets: MatchBet[] = [];
    public betTypeSubject = new Subject();

    constructor() {

    }

    emitSelectedBetsSubject() {
        this.betTypeSubject.next(this.selectedBets);
    }

    addSelectedBet(betType: MatchBet) {
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
    isSelectedBet(bettype: BetType) {
        return this.selectedBets.findIndex(x => x.id == bettype.id) > -1;
    }

    getBetLabel(type: number, value: string) {
        let labelToDisplay: string;
        switch (type) {
            case 1:
                labelToDisplay = value;
                break;
            case 2:
                labelToDisplay = value;
                break;
            case 3:
                if (value.substring(0, 1) == "+") {
                    labelToDisplay = "Plus de ";
                } else if (value.substring(0, 1) == "-") {
                    labelToDisplay = "Moins de ";
                } else {
                    labelToDisplay = "ERROR ";
                }
                labelToDisplay += value.substring(1) + " buts";
                break;
            default:
                break;
        }
        return labelToDisplay;
    }

    removeSelectedBets(){
        this.selectedBets.splice(0, this.selectedBets.length);
    }
}
