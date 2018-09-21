import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { Match } from './models/match';
import { Team } from './models/team';
import { BetType } from './models/bet-type';
import { Bet } from './models/bet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Calendar } from './models/calendar';
import { GeneralService } from '../shared/services/general.service';
import { Competition } from '../shared/models/competition.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFireLiteDatabase, AngularFireLiteAuth } from 'angularfire-lite';

@Injectable()
@Component({
  selector: 'app-showbet',
  templateUrl: './showbet.component.html',
  styleUrls: ['./showbet.component.scss']
})
export class ShowbetComponent {

  daySelected:String;
  newVal: number = 0; 
  calendar:Calendar[];
  labelCalendar: any;
  team:Team[];

  competitionName:String;
  competition_id: number;
  competition:Competition;
  matchs:any;
  matchBets: BetType[] ;

  databaseData;
  databaseList;
  databaseQuery;

  constructor(private generalService: GeneralService, 
    private route: ActivatedRoute,
    public db: AngularFireLiteDatabase,
    public auth: AngularFireLiteAuth
  ) {
    route.params.subscribe(data => this.getCompetition());
  }

  ngOnInit() {
    this.newVal = 1 ;
    this.daySelected="1";

    this.getCompetition();
    this.getCalendar();
    this.getMatchBets();

    // FIREBASE INITIALIZATION

    // Realtime Database
    this.db.read('plagiamax/matchs').subscribe((data) => {
      this.databaseData = data;
    });


    // Realtime Database list retrieval
    this.matchs = this.db.read('matchs');
  }

  public onChange(event): void {  // event will give you full brief of action
    this.newVal = event.target.value;
    this.labelCalendar = this.calendar[this.newVal - 1].label ;
    this.getMatchBets();
  }

  async getCompetition(){
    this.competition_id = +this.route.snapshot.paramMap.get('id');
    if (this.competition_id > 0){
      this.competition = await this.generalService.get("/competition/" + this.competition_id);  
      this.competitionName = this.competition.label ;
      this.getCalendar();
      this.getMatchBets();
    }else{
      this.competition = await this.generalService.get("/competition");
      this.competitionName = "" ;
    }
  }

  async getCalendar() {
    this.labelCalendar = "" ;
    this.calendar = [] ;
    this.calendar = await this.generalService.get("/competition/" + this.competition_id  + "/matchdays");
    if (this.calendar.length == 0){
      this.labelCalendar = "" ;
    }else{
      this.labelCalendar = this.calendar[0].label ;
    }
  }

  async getMatchBets(){
    this.matchBets = [] ;
    this.matchBets = await this.generalService.get("/matchday/" + this.newVal + "/" + this.competition_id  + "/matchs");
  }

}
