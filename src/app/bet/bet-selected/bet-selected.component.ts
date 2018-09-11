import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BetType } from '../../shared/models/bet-type.model';
import { Match } from '../../shared/models/match.model';
import { MatchBetService } from '../../shared/services/match-bet.service';
import { BetTypeService } from '../../shared/services/bet-type.service';

@Component({
  selector: 'app-bet-selected',
  templateUrl: './bet-selected.component.html',
  styleUrls: ['./bet-selected.component.scss']
})
export class BetSelectedComponent implements OnInit {
  selectedBets: BetType[] = [];
  match: Match;
  @Input() amount: number;

  betGroupSubscription = new Subscription;

  constructor
    (
    private matchBetService: MatchBetService
    ) {

  }

  ngOnInit() {
    this.betGroupSubscription = this.matchBetService.betTypeSubject.subscribe(
      (bts: BetType[]) => {
        this.selectedBets = bts;
      }
    );
  }

  removeBet(betType: BetType) {
    this.matchBetService.removeSelectedBet(betType);
  }

  getTotalOdds() {
    let totalOdds = 1;
    for (let betType of this.selectedBets) {
      totalOdds += betType.currentOdds - 1;
    }
    return totalOdds;
  }

  getPotentialGains() {
    if (this.amount > 0) {
      return this.getTotalOdds() * this.amount;
    } else {
      return 0;
    }
  }
}
