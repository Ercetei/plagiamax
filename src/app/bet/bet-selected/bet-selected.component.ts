import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BetService } from '../../shared/bet.service';
import { BetType } from '../../shared/bet-type.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Bet } from '../../shared/bet.model';
import { Match } from '../../shared/match.model';
import { MatchService } from '../../shared/match.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bet-selected',
  templateUrl: './bet-selected.component.html',
  styleUrls: ['./bet-selected.component.scss']
})
export class BetSelectedComponent implements OnInit {
  selectedBets: Bet;
  match: Match;
  @Input() money: number;

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
      totalOdds *= bet.odds;
    }
    return totalOdds;
  }

  getPotentialGains(){
    if(this.money > 0){
      return this.getTotalOdds() * this.money;
    } else {
      return 0;
    }
    
  }
}
