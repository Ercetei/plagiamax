import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { BetType } from '../../shared/models/bet-type.model';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../../shared/models/match.model';
import { MatchService } from '../../shared/services/match.service';
import { BetTypeService } from '../../shared/services/bet-type.service';
import { MatchBetService } from '../../shared/services/match-bet.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.scss']
})
export class BetListComponent implements OnInit {
  selectedBets: BetType[] = [];
  match: Match;
  betTypes: BetType[] = [];

  betGroupSubscription = new Subscription;

  constructor
    (
    private route: ActivatedRoute,
    private matchService: MatchService,
    private matchBetService: MatchBetService
    ) {
  }

  ngOnInit() {
    this.getMatch();
    //this.getBetTypes();
    /*this.betGroupSubscription = this.betTypeService.betTypeSubject.subscribe(
      (bts: BetType[]) => {
        this.selectedBets = bts;
      }
    );*/
  }

  getMatch() {
    console.log('Récupération du match');
    const match_id = +this.route.snapshot.paramMap.get('id');
    this.matchService.getMatch(match_id).subscribe(
      (match: Match) => {
        this.match = match;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }
    );

    //  .subscribe(match => this.match = match);
    //console.log(this.match);
    console.log(this.match);
  }

  getBetTypes() {
    this.betTypes = this.match.matchbets;
  }

  getWinnerBets() {
    if(this.betTypes != null) return this.betTypes.filter(x => x.type == 1);
  }

  getScoreBets() {
    if(this.betTypes != null) return this.betTypes.filter(x => x.type == 2);
  }

  getGoalsBets() {
    if(this.betTypes != null) return this.betTypes.filter(x => x.type == 3);
  }

  switchBet(id: number) {
    if (this.isSelectedBet(id)) {
      this.unselectBet(id);
    } else {
      this.selectBet(id);
    }
  }

  selectBet(id: number) {
    this.matchBetService.addSelectedBet(this.betTypes.find(x => x.id == id));
  }

  unselectBet(id: number) {
    this.matchBetService.removeSelectedBet(this.betTypes.find(x => x.id == id));
  }

  isSelectedBet(id: number) {
    return this.matchBetService.isSelectedBet(id);
  }
}
