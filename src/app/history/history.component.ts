import { Component, OnInit } from '@angular/core';

import { HistoryService } from '../shared/services/history.service';
import { GeneralService } from '../shared/services/general.service';

import { Bet } from '../shared/models/bet.model';
import { BetLine } from '../shared/models/bet-line.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  tabStatus = [
    {id: 0, status:'Tout'},
    {id: 1, status:'En cours'},
    {id: 2, status:'Terminé'}
  ];

  tabBet:Bet[];
  tabBetUser:Bet[];

  tabBetLine:BetLine[]=[];

  gain:number = 0;
  newVal:number = 0;

  isAuthentified: Boolean = !!localStorage.getItem('userToken');
  currentIdUser:number = 0;

  constructor(private historyService:HistoryService, private generalService:GeneralService) {
      if (this.isAuthentified) {
        this.currentIdUser = JSON.parse(localStorage.getItem('user')).id ;
      }
  }

  ngOnInit(){
    this.getBetUser();
  }

  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    if (this.newVal == 0){
      this.tabBetUser=this.historyService.getHistoBetUser(this.tabBet, this.currentIdUser) ;
    }
    else {
      this.tabBetUser=this.historyService.getHistoBetUserStatus(this.tabBet, this.currentIdUser, this.newVal) ;
    }
  }
  
  async getBetUser() {
    this.tabBet = await this.generalService.get("/bet");
    this.tabBetUser = this.historyService.getHistoBetUser(this.tabBet, this.currentIdUser) ;
  }

  getHistoGain(bet:Bet){
    let gainPotentiel: number = 0.00 ;
    let oddsTotal: number = 0.00 ;
    for(let betlinetest of bet.betlines){
      oddsTotal += betlinetest.momentodds ;
    }
    // gainPotentiel =  tabHistoBetBDD.betamount * tabHistoBetBDD.betlines[0].momentodds ;
    gainPotentiel =  bet.betamount * oddsTotal ;
    
    return gainPotentiel ;
  }

}
