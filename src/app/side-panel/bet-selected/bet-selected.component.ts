import { Component, OnInit, Input } from '@angular/core';
import { MatchBetService } from '../../shared/services/match-bet.service';
import { MatchBet } from '../../shared/models/match-bet.model';
import { Types } from '../../shared/enums/types.enum';
import { BetTypeService } from '../../shared/services/bet-type.service';

@Component({
  selector: 'app-bet-selected',
  templateUrl: './bet-selected.component.html',
  styleUrls: ['../side-panel.component.scss']
})
export class BetSelectedComponent {
  @Input() betType: MatchBet;
  @Input() combined: Boolean;
  @Input() amount: number;

  constructor
    (
    private betTypeService: BetTypeService
    ) {

  }

  // Retire le pari du side panel
  removeBet() {
    this.betTypeService.removeSelectedBet(this.betType);
  }

  // Récupère le type de pari
  getType() {
    let message;
    switch (this.betType.type) {
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

  // Calcule les gains potentiels par rapport à la cote
  getPotentialGains() {
    if (this.amount > 0) {
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(this.betType.currentodds * this.amount);
    } else {
      return "";
    }
  }

  getBetType(): MatchBet {
    if (this.betType != null) {
      return this.betType;
    }
  }

  getAmount(): number {
    if (this.amount > 0) {
      return this.amount;
    }
  }

  getBetLabel() {
    return this.betTypeService.getBetLabel(this.betType.type, this.betType.label);
  }

  getFormattedTeams() {
    if (this.betType.match.matchteams.length > 0) {
      let result: string = "";
      result += this.betType.match.matchteams.find(x => x.ishometeam).team.label;
      result += " - " + this.betType.match.matchteams.find(x => !x.ishometeam).team.label;
      return result;
    }
  }
}
