import { Component } from '@angular/core';
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

@Injectable()
@Component({
  selector: 'app-showbet',
  templateUrl: './showbet.component.html',
  styleUrls: ['./showbet.component.scss']
})
export class ShowbetComponent {
  competitionName:String;
  competition_id: number;
  competition:Competition;
  daySelected:String;
  newVal:Number = 0; 
  calendar:Calendar[];
  team:Team[];

  // TODO: A supprimer avec la BDD
  match1: Match = new Match(0, "Ligue 1", 0, [ new Team(0, "Paris Saint-Germain"), new Team(1, "OM")]);
  match2: Match = new Match(1, "Ligue 1", 0, [ new Team(2, "SRFC"), new Team(3, "Dijon")]);
  match3: Match = new Match(2, "Ligue 1", 0, [ new Team(4, "OL"), new Team(5, "OGC Nice")]);
  match4: Match = new Match(3, "Ligue 1", 0, [ new Team(6, "Caen"), new Team(7, "Angers")]);
  match5: Match = new Match(4, "Ligue 1", 0, [ new Team(8, "Nimes"), new Team(9, "Strasbourg")]);
  
  betsT1: BetType[] = [
      new BetType(1, 'Paris Saint-Germain', 2.22, 1, this.match1),
      new BetType(2, 'Nul', 3.41, 1, this.match1),
      new BetType(3, 'OM', 3.15, 1, this.match1)
  ];

  betsT2: BetType[] = [
    new BetType(1, 'SRFC', 1.55, 1, this.match2),
    new BetType(2, 'Nul', 3.25, 1, this.match2),
    new BetType(3, 'Dijon', 3.65, 1, this.match2)
  ];

  betsT3: BetType[] = [
    new BetType(1, 'OL', 1.25, 1, this.match3),
    new BetType(2, 'Nul', 2.55, 1, this.match3),
    new BetType(3, 'OGC Nice', 3.15, 1, this.match3)
  ];

  betsT4: BetType[] = [
    new BetType(1, 'Caen', 1.75, 1, this.match4),
    new BetType(2, 'Nul', 2.55, 1, this.match4),
    new BetType(3, 'Angers', 1.95, 1, this.match4)
  ];
  
  betsT5: BetType[] = [
    new BetType(1, 'Nimes', 2.22, 1, this.match5),
    new BetType(2, 'Nul', 3.45, 1, this.match5),
    new BetType(3, 'Strasbourg', 3.15, 1, this.match5)
  ];

  constructor(private generalService: GeneralService, private route: ActivatedRoute) {
    route.params.subscribe(data => this.getCompetition());
   }

  ngOnInit() {
    this.getCompetition();
    this.getCalendar();
    // this.calendar = [
    //   {id:0,label:"Sélectionnez votre journée de championnat"},
    //   {id:1,label:"Journée 1 sur 38"},
    //   {id:2,label:"Journée 2 sur 38"},
    //   {id:3,label:"Journée 3 sur 38"}
    // ];
    this.daySelected="1";

    // this.team = [
    //   {id:1,label:"Amiens"},
    //   {id:2,label:"Marseille"},
    //   {id:3,label:"Paris SG"},
    //   {id:4,label:"Lyon"},
    //   {id:5,label:"As Monaco"},
    //   {id:6,label:"Nantes"},
    //   {id:7,label:"Rennes"},
    //   {id:8,label:"Caen"},
    //   {id:9,label:"Le Mans"},
    //   {id:10,label:"Strasbourg"},
    // ];

    this.newVal = 0;

  }

  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    console.log(this.newVal);
  }

  async getCompetition(){
    this.competition_id = +this.route.snapshot.paramMap.get('id');

    if (this.competition_id > 0){
      this.competition = await this.generalService.get("/competition/" + this.competition_id);  
      this.competitionName = this.competition.label ;
    }else{
      this.competition = await this.generalService.get("/competition/1");
      this.competitionName = "Ligue 1" ;
    }

  }

  async getCalendar() {
    this.calendar = await this.generalService.get("/competition/" + this.competition_id  + "/matchdays");
  }

}
