import { Component, OnInit } from '@angular/core';
import { BetType } from '../../shared/models/bet-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from '../../shared/models/match.model';
import { BetTypeService } from '../../shared/services/bet-type.service';
import { MatchBetService } from '../../shared/services/match-bet.service';
import { BaseService } from '../../shared/services/base.service';

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
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private matchBetService: MatchBetService,
    private betTypeService: BetTypeService
    ) {
  }

  // A l'initialisation, fait en sorte de charger le match au changement d'URL et on s'abonne à la liste de paris du side panel.
  ngOnInit() {
    this.route.params.subscribe(async data => {
      await this.reload();
      if (this.match == null) {
        this.router.navigateByUrl('/home');
      } else {
        if (this.match.status == 5) {
          this.router.navigateByUrl('/home');
        }
      }
    });
    this.betTypeService.betTypeSubject.subscribe(
      (bts: BetType[]) => {
        this.selectedBets = bts;
      }
    );
  }

  // On charge les infos du match
  async reload() {
    await this.getMatch();
  }

  // Récupère le match en cours
  async getMatch() {
    const match_id = +this.route.snapshot.paramMap.get('id');
    if (match_id > Number.MAX_SAFE_INTEGER || !Number.isSafeInteger(match_id)) {
      this.router.navigateByUrl('/home');
    }
    this.match = await this.baseService.get("/match/" + match_id);
  }

  // Récupère les paris sur le type défini
  getBets(type: number) {
    if (this.match != null) return this.match.matchbets.filter(x => x.type == type);
  }

  // Sélectionne ou déselectionne un pari
  switchBet(bettype: BetType) {
    if (this.isSelectedBet(bettype)) {
      this.unselectBet(bettype.id);
    } else {
      this.selectBet(bettype.id);
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
  isSelectedBet(bettype: BetType) {
    return this.betTypeService.isSelectedBet(bettype);
  }

  // Retourne le libellé correspondant au pari
  getBetLabel(matchbet: BetType) {
    return this.betTypeService.getBetLabel(matchbet.type, matchbet.label);
  }

  // Retourne les équipes dans le bon ordre
  getFormattedTeams() {
    if (this.match.matchteams.length > 0) {
      let result: string = "";
      result += this.match.matchteams.find(x => x.ishometeam).team.label;
      result += " - " + this.match.matchteams.find(x => !x.ishometeam).team.label;
      return result;
    }
  }
}
