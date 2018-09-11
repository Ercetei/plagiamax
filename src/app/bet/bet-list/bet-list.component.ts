import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    private matchBetService: MatchBetService,
    private betTypeService: BetTypeService
    ) {
  }

  ngOnInit() {
    this.betGroupSubscription = this.betTypeService.betTypeSubject.subscribe(
      (bts: BetType[]) => {
        this.selectedBets = bts;
      }
    );
    this.getMatch();
    this.getBetTypes();
  }

  getMatch() {
    console.log('Récupération du match');
    const match_id = +this.route.snapshot.paramMap.get('id');
    this.matchService.getMatch(match_id).subscribe(
      match => {
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
    this.matchBetService.getBetsByMatch(this.match)
      .subscribe(betTypes => this.betTypes = betTypes);
  }

  getWinnerBets() {
    return this.betTypes.filter(x => x.type == 1);
  }

  getScoreBets() {
    return this.betTypes.filter(x => x.type == 2);
  }

  getGoalsBets() {
    return this.betTypes.filter(x => x.type == 3);
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
