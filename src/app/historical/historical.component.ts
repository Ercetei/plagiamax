import { Component, OnInit, Input } from '@angular/core';
import { HistoricalService } from '../shared/services/historical.service';
import { Bet } from '../shared/models/bet.model';
import { BetLine } from '../shared/models/bet-line.model';
import { Subscription} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

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
  // @Input() indexOfStatus:number;

  tabBet:Bet[];
  gain:number;
  newVal:number = 0;
  tabHistoBetBDD:Bet[]=[];
  tabHistoBetLineBDD:BetLine[]=[];

  tabBetTest: Bet[]=[];
  tabTest: Bet[]=[];

  testSubscribe = new Subscription;

  constructor(private historicalService:HistoricalService, private http: HttpClient) { }

  ngOnInit(){
    // this.tabBet=this.historicalService.histoBet;
    // this.tabBet=this.historicalService.getHistoBetUser(this.historicalService.histoBet, this.idUser) ;
    // this.gain=this.historicalService.getHistoGain(this.tabBet, this.idUser);

    // this.getUserInfos();

    this.historicalService.getBetBDD().subscribe(bets => this.tabBetTest = bets);
    this.tabTest=this.historicalService.getReq();
    this.tabBetTest=this.historicalService.getHistoBetUser(this.tabBetTest, this.idUser) ;
    this.gain=this.historicalService.getHistoGain(this.tabBetTest, this.idUser);
    
  }

  public onChange(event): void {  // event will give you full breif of action
    this.tabTest=this.historicalService.getReq();
    this.newVal = event.target.value;
    if (this.newVal == 0){
      this.tabBetTest=this.historicalService.getHistoBetUser(this.tabTest, this.idUser) ;
    }
    else {
      this.tabBetTest=this.historicalService.getHistoBetUserStatus(this.tabTest, this.idUser, this.newVal) ;
    }
  }
  
  // async getUserInfos() {
  //   this.tabTest = await this.historicalService.get("/bet");
  // }


}
