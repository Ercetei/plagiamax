import { Component, OnInit, Input } from '@angular/core';
import { HistoricalService } from '../shared/services/historical.service';
import { Bet } from '../shared/models/bet.model';
import { BetLine } from '../shared/models/bet-line.model';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {

  readonly rootUrl = 'http://localhost:8080';

  idUser:number = 1;

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

  constructor(private historicalService:HistoricalService) { }

  ngOnInit(){
    this.getBetUser();
  }

  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    if (this.newVal == 0){
      this.tabBetUser=this.historicalService.getHistoBetUser(this.tabBet, this.idUser) ;
    }
    else {
      this.tabBetUser=this.historicalService.getHistoBetUserStatus(this.tabBet, this.idUser, this.newVal) ;
    }
  }
  
  async getBetUser() {
    this.tabBet = await this.historicalService.get("/bet");
    this.tabBetUser=this.historicalService.getHistoBetUser(this.tabBet, this.idUser) ;
  }

  getHistoGain(tabHistoBetBDD:Bet){
    let gainPotentiel: number = 0.00 ;
    gainPotentiel =  tabHistoBetBDD.betamount * tabHistoBetBDD.betlines[0].momentodds ;
    return gainPotentiel ;
}

}
