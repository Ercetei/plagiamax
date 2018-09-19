import { Component, OnInit } from '@angular/core';

import { HistoryService } from '../shared/services/history.service';

import { Bet } from '../shared/models/bet.model';
import { BaseService } from '../shared/services/base.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  tabStatus = [
    { id: 0, status: 'Tout' },
    { id: 1, status: 'En cours' },
    { id: 2, status: 'Terminé' }
  ];

  tabBetUser: Bet[];
  tabBetStatus: Bet[];

  gain: number = 0;
  newVal: number = 0;

  isAuthentified: Boolean = !!localStorage.getItem('userToken');
  currentIdUser: number = 0;

  constructor(private historyService: HistoryService, private baseService: BaseService) {
    if (this.isAuthentified) {
      this.currentIdUser = JSON.parse(localStorage.getItem('user')).id;
    }
  }

  ngOnInit() {
    this.getBetUser();
  }

  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    if (this.newVal == 0) {
      this.tabBetStatus = this.tabBetUser;
    }
    else {
      this.tabBetStatus = this.historyService.getHistoBetUserStatus(this.tabBetUser, this.currentIdUser, this.newVal);
    }
  }

  async getBetUser() {
    this.tabBetUser = await this.baseService.get("/user/" + this.currentIdUser + "/bets");
    this.tabBetStatus = this.tabBetUser;
  }

  getHistoGain(bet: Bet) {
    let gainPotentiel: number = 0.00;
    let oddsTotal = bet.momentodds;

    gainPotentiel = bet.betamount * oddsTotal;

    return gainPotentiel;
  }

}
