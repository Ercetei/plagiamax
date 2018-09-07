import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BetService } from '../../shared/services/bet.service';
import { BetType } from '../../shared/models/bet-type.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Bet } from '../../shared/models/bet.model';
import { Match } from '../../shared/models/match.model';
import { MatchService } from '../../shared/services/match.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bet-selected',
  templateUrl: './bet-selected.component.html',
  styleUrls: ['./bet-selected.component.scss']
})
export class BetSelectedComponent implements OnInit {
  selectedBets: Bet = new Bet();
  match: Match;
  @Input() amount: number;

  betGroupSubscription = new Subscription;

  constructor
  (
    private betService: BetService
  ) { 

  }

  ngOnInit() {
    this.betGroupSubscription = this.betService.betGroupSubject.subscribe(
      (bg: Bet) => {
        this.selectedBets = bg;
      }
    );
  }

  removeBet(betType: BetType){
    this.betService.removeBet(betType);
  }

  getTotalOdds(){
    let totalOdds = 1;
    for(let bet of this.selectedBets.bets){
      totalOdds *= bet.currentOdds;
    }
    return totalOdds;
  }

  getPotentialGains(){
    if(this.amount > 0){
      return this.getTotalOdds() * this.amount;
    } else {
      return 0;
    }
    
  }
}
