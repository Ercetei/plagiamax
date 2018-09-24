import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Match } from '../shared/models/match.model';
import { BetType } from '../shared/models/bet-type.model';
import { MatchDay } from '../shared/models/match-day.model';
import { Competition } from '../shared/models/competition.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFireLiteDatabase, AngularFireLiteAuth } from 'angularfire-lite';
import { BaseService } from '../shared/services/base.service';
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

  selectedDay: string = "3";
  matchdays: MatchDay[] = [];

  matchdayName: string;

  // 1 : All, 2 : Competition
  display: number;

  competition_id: number;
  competitions: Competition[];
  matchs: Observable<Match>;

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
    this.getCompetition();
    this.getMatchDays();

    // FIREBASE INITIALIZATION
    // Realtime Database
    this.db.read('plagiamax/matchs').subscribe((data) => {
      this.databaseData = data;
    });

    // Realtime Database list retrieval
    this.matchs = this.db.read('matchs');
  }

  public onSelectDay(): void {
    this.matchdayName = this.matchdays.find(x => x.id == parseInt(this.selectedDay)).label;
  }

  async getCompetition() {
    this.competitions = [];
    this.competition_id = +this.route.snapshot.paramMap.get('id');
    if (this.competition_id > 0) {
      this.display = 1;
      this.competitions.push(await this.baseService.get("/competition/" + this.competition_id));
      this.getMatchDays();
    } else {
      this.competitions = await this.baseService.get("/competition");
      this.display = 2;
    }
  }

  async getMatchDays() {
    if (this.display == 1) {
      this.matchdays = await this.baseService.get("/competition/" + this.competition_id + "/matchdays/active");
      if (this.matchdays.length > 0) {
        this.selectedDay = this.matchdays[0].id.toString();
        this.matchdayName = this.matchdays.find(x => x.id == parseInt(this.selectedDay)).label;
      }
    } else {
      this.matchdays = await this.baseService.get("/matchday");
    }
  }

  getFormattedTeams(match: Match) {
    if (match != null) {
      let result: string;
      result = match.matchteams.find(x => x.ishometeam).team.label;
      result += " - " + match.matchteams.find(x => !x.ishometeam).team.label;
      return result;
    }
  }

  // Sélectionne ou déselectionne un pari
  switchBet(betType: MatchBet) {
    if (this.isSelectedBet(betType)) {
      this.unselectBet(betType);
    } else {
      this.selectBet(betType);
    }
  }

  // Ajoute un pari dans le side panel
  selectBet(betType: MatchBet) {
    this.betTypeService.addSelectedBet(betType);
  }

  // Retire un pari du side panel
  unselectBet(betType: MatchBet) {
    this.betTypeService.removeSelectedBet(betType);
  }

  // Contrôle si un pari est dans le side panel
  isSelectedBet(betType: MatchBet) {
    return this.betTypeService.isSelectedBet(betType);
  }
}
