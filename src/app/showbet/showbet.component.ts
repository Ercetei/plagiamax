import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Match } from './models/match';
import { Team } from './models/team';
import { BetType } from './models/bet-type';
import { Calendar } from './models/calendar';
import { Competition } from '../shared/models/competition.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFireLiteDatabase, AngularFireLiteAuth } from 'angularfire-lite';
import { BaseService } from '../shared/services/base.service';
import { MatchBetService } from '../shared/services/match-bet.service';
import { Observable } from 'rxjs';
import { MatchBet } from '../shared/models/match-bet.model';
import { BetTypeService } from '../shared/services/bet-type.service';

@Injectable()
@Component({
  selector: 'app-showbet',
  templateUrl: './showbet.component.html',
  styleUrls: ['./showbet.component.scss']
})
export class ShowbetComponent {

  daySelected: String;
  newVal: number = 0;
  calendar: Calendar[];
  labelCalendar: any;
  team: Team[];

  competitionName: String;
  competition_id: number;
  competition: Competition;
  matchs: Observable<Match>;
  matchBets: BetType[];

  databaseData;
  databaseList;
  databaseQuery;

  constructor(private baseService: BaseService,
    private route: ActivatedRoute,
    public db: AngularFireLiteDatabase,
    public auth: AngularFireLiteAuth,
    private betTypeService: BetTypeService
  ) {
    route.params.subscribe(data => this.getCompetition());
  }

  ngOnInit() {
    this.newVal = 1;
    this.daySelected = "1";

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
    this.labelCalendar = this.calendar[this.newVal - 1].label;
    this.getMatchBets();
  }

  async getCompetition() {
    this.competition_id = +this.route.snapshot.paramMap.get('id');
    if (this.competition_id > 0) {
      this.competition = await this.baseService.get("/competition/" + this.competition_id);
      this.competitionName = this.competition.label;
      this.getCalendar();
      this.getMatchBets();
    } else {
      this.competition = await this.baseService.get("/competition");
      this.competitionName = "";
    }
  }

  async getCalendar() {
    this.labelCalendar = "";
    this.calendar = [];
    this.calendar = await this.baseService.get("/competition/" + this.competition_id + "/matchdays");
    if (this.calendar.length == 0) {
      this.labelCalendar = "";
    } else {
      this.labelCalendar = this.calendar[0].label;
    }
  }

  async getMatchBets() {
    this.matchBets = [];
    this.matchBets = await this.baseService.get("/matchday/" + this.newVal + "/matchs");
  }


  /*getFormattedTeams(match: Match){
      if (match != null) {
        let result: string = "";
        result += this.matchs. .matchteams.find(x => x.ishometeam).team.label;
        result += " - " + match.matchteams.find(x => !x.ishometeam).team.label;
        return result;
      }
    }*/

  // Sélectionne ou déselectionne un pari
  switchBet(id: number, betType: MatchBet) {
    if (this.isSelectedBet(id)) {
      this.unselectBet(id, betType);
    } else {
      this.selectBet(id, betType);
    }
  }

  // Ajoute un pari dans le side panel
  selectBet(id: number, betType: MatchBet) {
    this.betTypeService.addSelectedBet(betType);
  }

  // Retire un pari du side panel
  unselectBet(id: number, betType: MatchBet) {
    this.betTypeService.removeSelectedBet(betType);
  }

  // Contrôle si un pari est dans le side panel
  isSelectedBet(id: number) {
    return this.betTypeService.isSelectedBet(id);
  }
}
