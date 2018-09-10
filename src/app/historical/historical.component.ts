import { Component, OnInit, Input } from '@angular/core';
import { HistoricalService } from '../shared/services/historical.service';
import { Bet } from '../shared/models/bet.model';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {

  idUser:number = 1;

  tabStatus = [
    {id: 0, status:'Tout'},
    {id: 1, status:'En cours'},
    {id: 2, status:'Terminé'}
  ];
  // @Input() indexOfStatus:number;

  tabBet:Bet[];
  gain:number;
  newVal:number = 0;
  
  constructor(private historicalService:HistoricalService) { }

  ngOnInit(){
    this.tabBet=this.historicalService.getHistoBetUser(this.idUser) ;
    this.gain=this.historicalService.getHistoGain(this.idUser);
  }

  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    console.log(this.newVal);
    if (this.newVal == 0){
      this.tabBet=this.historicalService.getHistoBetUser(this.idUser) ;
    }
    else {
      this.tabBet=this.historicalService.getHistoBetUserStatus(this.idUser, this.newVal) ;
    }
  }

}
