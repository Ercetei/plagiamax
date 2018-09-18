import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatchBetService } from '../../shared/services/match-bet.service';
import { MatchBet } from '../../shared/models/match-bet.model';
import { Types } from '../../shared/enums/types.enum';

@Component({
  selector: 'app-bet-selected',
  templateUrl: './bet-selected.component.html',
  styleUrls: ['./bet-selected.component.scss']
})
export class BetSelectedComponent implements OnInit {
  selectedBets: any[] = [];
  @Input() amount: number;

  betGroupSubscription = new Subscription;

  constructor
    (
      private betTypeService: MatchBetService
    ) {

  }

  ngOnInit() {
    this.betTypeService.betTypeSubject.subscribe(
      (bts: any[]) => {
        this.selectedBets = bts;
        this.betTypeService.getBetTypeInfos();
      }
    ); 
  }

  do(bts){
    this.selectedBets = bts;
  }

  removeBet(betType: MatchBet) {
    this.betTypeService.removeSelectedBet(betType);
  }

  getTotalOdds() {
    let totalOdds = 1;
    for (let betType of this.selectedBets) {
      totalOdds += (+betType.currentodds - 1);
    }
    return totalOdds;
  }

  getType(type: number){
    let message;
    switch (type) {
      case Types.Vainqueur:
        message = 'Vainqueur';
      break;
      case Types.Résultat:
        message = 'Score exact'
      break;
      case Types.Buts:
        message = 'Nombre de buts'
      break;
      default:
        message = 'Autre'
      break;
    }
    return message;
  }

  getPotentialGains() {
    if (this.amount > 0) {
      return this.getTotalOdds() * this.amount;
    } else {
      return 0;
    }
  }
}
