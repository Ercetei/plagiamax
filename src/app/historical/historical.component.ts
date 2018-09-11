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


  testSubscribe = new Subscription;

  constructor(private historicalService:HistoricalService, private http: HttpClient) { }

  ngOnInit(){
    // this.tabBet=this.historicalService.getHistoBetUser(this.idUser) ;
    // this.gain=this.historicalService.getHistoGain(this.idUser);

    // this.tabHistoBetBDD = this.historicalService.getReq();
    // this.tabHistoBetLineBDD = this.historicalService.getReqBetLine();
    this.testSubscribe = this.http.get<Bet[]>(this.rootUrl + '/bet/' , {
                                                    withCredentials: true
                                                }).subscribe( data => { 
                                                                        console.log(data)
                                                                        this.tabHistoBetBDD = data ;
                                                                    }
                                                ,
                                                (err: HttpErrorResponse) => {
                                                    if (err.error instanceof Error) {
                                                    console.log('Client-side error occured.');
                                                    } else {
                                                    console.log('Server-side error occured.');
                                                    }
                                                } 
                                              );
    this.tabBet=this.historicalService.getHistoBetUser(this.tabHistoBetBDD, this.idUser) ;
    this.gain=this.historicalService.getHistoGain(this.tabBet, this.idUser);
  }

  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    console.log(this.newVal);
    if (this.newVal == 0){
      this.tabBet=this.historicalService.getHistoBetUser(this.tabBet, this.idUser) ;
    }
    else {
      this.tabBet=this.historicalService.getHistoBetUserStatus(this.tabBet, this.idUser, this.newVal) ;
    }
  }

  testGetReq(){
    console.log("Nouveau test BDD")
    this.tabHistoBetBDD = this.historicalService.getReq();
    // this.tabHistoBetLineBDD = this.historicalService.getReqBetLine();

    this.tabBet=this.historicalService.getHistoBetUser(this.tabHistoBetBDD, this.idUser) ;
    this.gain=this.historicalService.getHistoGain(this.tabBet, this.idUser);
  }

}
