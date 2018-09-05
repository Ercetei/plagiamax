import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { Bet } from '../models/bet.model';
import { BetType } from '../models/bet-type.model';
import { Match } from '../models/match.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BetService {

    private selectedBets = new Bet();
    public betGroupSubject = new Subject();
    
    constructor(){
		
    }
    
    emitBetGroupSubject(){
		  this.betGroupSubject.next(this.selectedBets);
    }
    
    // Ajoute un pari aux paris sélectionnés
    addBet(bet: BetType){
      this.selectedBets.bets.push(bet);
      this.emitBetGroupSubject();
    }

    // Retire un pari des paris sélectionnés
    removeBet(bet: BetType){
      this.selectedBets.bets.splice(this.selectedBets.bets.indexOf(bet), 1);
      this.emitBetGroupSubject();
    }
    
    // Récupère tous les paris sélectionnés
    getSelectedBets(): BetType[] {
      return this.selectedBets.bets;
    }

    // Récupère l'un des paris sélectionnés
    getSelectedBet(id: number){
      return this.selectedBets.bets.find(x => x.id == id);
    }

    // Teste si un pari est sélectionné
    containsBet(id: number){
      return this.selectedBets.bets.findIndex(x => x.id == id) > -1;
    }

    getBetTypes(match: Match): Observable<BetType[]> {
      return of(match.bets);
    }
}