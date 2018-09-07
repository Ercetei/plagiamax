import { Component, OnInit, Input } from '@angular/core';
import { HistoricalService } from '../shared/services/historical.service';
import { Bet } from '../shared/models/bet.model';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {

  tabStatus = [
    {id: 0, status:'Tout'},
    {id: 1, status:'En cours'},
    {id: 2, status:'Terminé'}
  ];
  // @Input() indexOfStatus:number;

  tabBet:Bet[];
  gain:number;
  newVal:number;
  
  constructor(private historicalService:HistoricalService) { }

  ngOnInit(){
    this.tabBet=this.historicalService.getHistoBetUser(1) ;
    this.gain=this.historicalService.getHistoGain();
  }

  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    console.log(this.newVal);
  }

}
