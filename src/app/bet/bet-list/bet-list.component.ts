import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BetService } from '../../shared/services/bet.service';
import { BetType } from '../../shared/models/bet-type.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Bet } from '../../shared/models/bet.model';
import { Match } from '../../shared/models/match.model';
import { MatchService } from '../../shared/services/match.service';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.scss']
})
export class BetListComponent implements OnInit {
  selectedBets: Bet;
  match: Match;
  betTypes: BetType[] = [];

  betGroupSubscription = new Subscription;

  constructor
  (
    private route: ActivatedRoute,
    private router: Router,
    private betService: BetService,
    private matchService: MatchService
  ) { 

  }

  ngOnInit() {
    this.betGroupSubscription = this.betService.betGroupSubject.subscribe(
      (bg: Bet) => {
        this.selectedBets = bg;
      }
    );
    this.getMatch();
    this.getBetTypes();
  }

  getMatch(){
    const match_id = +this.route.snapshot.paramMap.get('id');
    this.matchService.getMatch(match_id)
      .subscribe(match => this.match = match);
  }

  getBetTypes(){
    this.betService.getBetTypes(this.match)
      .subscribe(betTypes => this.betTypes = betTypes);
  }

  getWinnerBets(){
    return this.betTypes.filter(x => x.type == 1);
  }

  getScoreBets(){
    return this.betTypes.filter(x => x.type == 2);
  }

  getGoalsBets(){
    return this.betTypes.filter(x => x.type == 3);
  }

  switchBet(id:number){
    if(this.isSelectedBet(id)){
      this.unselectBet(id);
    } else {
      this.selectBet(id);
    }
  }

  selectBet(id:number){
    this.betService.addBet(this.betTypes.find(x => x.id == id));
  }

  unselectBet(id:number){
    this.betService.removeBet(this.betTypes.find(x => x.id == id));
  }

  isSelectedBet(id:number){
    return this.betService.containsBet(id);
  }
}
