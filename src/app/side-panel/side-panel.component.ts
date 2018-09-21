import { Component, OnInit, Input, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MatchBetService } from '../shared/services/match-bet.service';
import { MatchBet } from '../shared/models/match-bet.model';
import { Types } from '../shared/enums/types.enum';
import { BetTypeService } from '../shared/services/bet-type.service';
import { BetType } from '../shared/models/bet-type.model';
import { BetSelectedComponent } from './bet-selected/bet-selected.component';
import { BetService } from '../shared/services/bet.service';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  @ViewChildren(BetSelectedComponent) betSelectedComponents: QueryList<BetSelectedComponent>;
  selectedBets: BetType[] = [];
  combined: Boolean = false;
  auth: Boolean = true;
  errNotEnoughMoney: boolean = false;
  @Input() amount: number;

  constructor
    (
    private route: ActivatedRoute,
    private betTypeService: BetTypeService,
    private matchBetService: MatchBetService,
    private betService: BetService,
    private userService: UserService
    ) {

  }

  // A l'initialisation, on s'abonne à la liste de paris dans le side panel
  // et on récupère l'ensemble des informations utiles pour les paris en question
  ngOnInit() {
    this.route.params.subscribe(data => this.reset());
    this.betTypeService.betTypeSubject.subscribe(
      (bts: BetType[]) => {
        this.selectedBets = bts;
        this.matchBetService.getBetTypeInfos();
        if (bts.length < 2) this.combined = false;
      }
    );
  }

  reset() {
    this.auth = true;
    this.errNotEnoughMoney = false;
  }

  // Retire un pari du side panel
  removeBet(betType: MatchBet) {
    this.betTypeService.removeSelectedBet(betType);
  }

  // Récupère la cote totale (Pour un pari combiné)
  getTotalOdds(): number {
    let totalOdds = 1;
    for (let betType of this.selectedBets) {
      totalOdds *= +betType.currentodds;
    }
    return totalOdds;
  }

  //Formate un nombre en 00,00
  formatToNumeric(num: number): string {
    return new Intl.NumberFormat('fr-FR', { maximumSignificantDigits: 2 }).format(num);
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

  // Au clic sur valider, on vérifie que l'utilisateur est connecté, que la somme sur la cagnotte est suffisante, 
  // on enregistre les paris en fonction de la nature (Simple / Combiné), on redirige et on vide les paris sélectionnés
  onValidate() {
    // Vérification authentification
    if (this.auth = this.userService.isAuthentified()) {
      // Si pari combiné
      if (this.combined) {
        // L'utilisateur a-t-il assez d'argent ?
        if (this.userService.getCurrentUser().wallet >= this.amount) {
          let betTypes: BetType[] = [];
          this.betSelectedComponents.forEach(BetSelectedComponent => {
            betTypes.push(BetSelectedComponent.getBetType());
          });
          this.betService.createBet(betTypes, this.amount, this.getTotalOdds());
        } else {
          this.errNotEnoughMoney = true;
          return;
        }
      } else {
        let totalAmount: number = 0;
        this.betSelectedComponents.forEach(BetSelectedComponent => totalAmount += +BetSelectedComponent.getAmount());
        if (this.userService.getCurrentUser().wallet >= totalAmount) {
          this.betSelectedComponents.forEach(BetSelectedComponent => {
            this.betService.createBet([BetSelectedComponent.betType], BetSelectedComponent.getAmount(), BetSelectedComponent.betType.currentodds);
          });
        } else {
          this.errNotEnoughMoney = true;
          return;
        }
      }
      this.betTypeService.removeSelectedBets();
    }
  }
}
