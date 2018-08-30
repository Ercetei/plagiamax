import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BetGroup } from '../models/BetGroup';
import { Bet } from '../models/Bet';

@Injectable()
export class BetGroupService {

    private selectedBets = new BetGroup();
    public betGroupSubject = new Subject();

    constructor(){
		
    }
    
    emitBetGroupSubject(){
		  this.betGroupSubject.next(this.selectedBets);
    }
    
    // Ajoute un pari aux paris sélectionnés
    addBet(bet: Bet){
      this.selectedBets.bets.push(bet);
      this.emitBetGroupSubject();
    }

    // Retire un pari des paris sélectionnés
    removeBet(bet: Bet){
      this.selectedBets.bets.splice(this.selectedBets.bets.indexOf(bet), 1);
      this.emitBetGroupSubject();
    }
    
    // Récupère tous les paris sélectionnés
    getBets(): Bet[] {
      return this.selectedBets.bets;
    }

    // Récupère l'un des paris sélectionnés
    getBet(id: number){
      return this.selectedBets.bets.find(x => x.id == id);
    }

    // Teste si un pari est sélectionné
    containsBet(id: number){
      return this.selectedBets.bets.findIndex(x => x.id == id) > -1;
    }
}