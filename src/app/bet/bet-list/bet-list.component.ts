import { Component, OnInit } from '@angular/core';
import { BetType } from '../../shared/models/bet-type.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  constructor
    (
    private route: ActivatedRoute,
    private matchService: MatchService,
    private matchBetService: MatchBetService,
    private betTypeService: BetTypeService
    ) {
  }

  // A l'initialisation, fait en sorte de charger le match au changement d'URL et on s'abonne à la liste de paris du side panel.
  ngOnInit() {
    this.route.params.subscribe(data => this.reload());
    this.betTypeService.betTypeSubject.subscribe(
      (bts: BetType[]) => {
        this.selectedBets = bts;
      }
    );
  }

  // On charge les infos du match
  reload() {
    this.getMatch();
  }

  // Récupère le match en cours
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
  }

  // Récupère les paris sur l'équipe gagnante
  getWinnerBets() {
    if (this.match != null) return this.match.matchbets.filter(x => x.type == 1);
  }

  // Récupère les paris sur le score exact
  getScoreBets() {
    if (this.match != null) return this.match.matchbets.filter(x => x.type == 2);
  }

  // Récupère les paris sur le nombre de buts
  getGoalsBets() {
    if (this.match != null) return this.match.matchbets.filter(x => x.type == 3);
  }

  // Sélectionne ou déselectionne un pari
  switchBet(id: number) {
    if (this.isSelectedBet(id)) {
      this.unselectBet(id);
    } else {
      this.selectBet(id);
    }
  }

  // Ajoute un pari dans le side panel
  selectBet(id: number) {
    this.matchBetService.addSelectedMatchBet(this.match.matchbets.find(x => x.id == id));
  }

  // Retire un pari du side panel
  unselectBet(id: number) {
    this.betTypeService.removeSelectedBet(this.match.matchbets.find(x => x.id == id));
  }

  // Contrôle si un pari est dans le side panel
  isSelectedBet(id: number) {
    return this.betTypeService.isSelectedBet(id);
  }
}
