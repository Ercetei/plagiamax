import { Component, OnInit, Input, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MatchBetService } from '../shared/services/match-bet.service';
import { MatchBet } from '../shared/models/match-bet.model';
import { Types } from '../shared/enums/types.enum';
import { BetTypeService } from '../shared/services/bet-type.service';
import { BetType } from '../shared/models/bet-type.model';
import { BetSelectedComponent } from './bet-selected/bet-selected.component';
import { BetService } from '../shared/services/bet.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  @ViewChildren(BetSelectedComponent) betSelectedComponents: QueryList<BetSelectedComponent>;
  selectedBets: BetType[] = [];
  combined: Boolean = false;
  @Input() amount: number;

  constructor
    (
    private betTypeService: BetTypeService,
    private matchBetService: MatchBetService,
    private betService: BetService
    ) {

  }

  // A l'initialisation, on s'abonne à la liste de paris dans le side panel
  // et on récupère l'ensemble des informations utiles pour les paris en question
  ngOnInit() {
    this.betTypeService.betTypeSubject.subscribe(
      (bts: BetType[]) => {
        this.selectedBets = bts;
        this.matchBetService.getBetTypeInfos();
      }
    );
  }

  // Retire un pari du side panel
  removeBet(betType: MatchBet) {
    this.betTypeService.removeSelectedBet(betType);
  }

  // Récupère la cote totale (Pour un pari combiné)
  getTotalOdds() {
    let totalOdds = 1;
    for (let betType of this.selectedBets) {
      totalOdds *= +betType.currentodds;
    }
    return totalOdds;
  }

  // Récupère le type de pari
  getType(type: number) {
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

  // Calcule les gains que fera la personne si elle clique sur valider
  getPotentialGains() {
    if (this.amount > 0) {
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(this.getTotalOdds() * this.amount);
    } else {
      return "";
    }
  }

  setSimple() {
    this.combined = false;
  }

  setCombined() {
    this.combined = true;
  }

  onValidate() {
    if (this.combined) {
      let betType: BetType[] = [];
      this.betSelectedComponents.forEach(BetSelectedComponent => {
        betType.push(BetSelectedComponent.getBetType());
      });
      this.betService.createCombinedBet(betType, this.amount, this.getTotalOdds());
    }else{
      this.betSelectedComponents.forEach(BetSelectedComponent => {
        BetSelectedComponent.getAmount();
      });
    }
   
  }
}
