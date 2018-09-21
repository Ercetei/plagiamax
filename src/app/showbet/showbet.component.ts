import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Match } from '../shared/models/match.model';
import { Team } from './models/team';
import { BetType } from './models/bet-type';
import { Calendar } from './models/calendar';
import { Competition } from '../shared/models/competition.model';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../shared/services/base.service';
import { MatchBetService } from '../shared/services/match-bet.service';

@Injectable()
@Component({
  selector: 'app-showbet',
  templateUrl: './showbet.component.html',
  styleUrls: ['./showbet.component.scss']
})
export class ShowbetComponent {

  daySelected: String;
  selectedDay: number = 0;
  calendar: Calendar[];
  labelCalendar: any;
  team: Team[];

  competitionName: String;
  competition_id: number;
  competition: Competition;
  matchs: Match[] = [];
  matchBets: BetType[] = [];

  // TODO: A supprimer avec la BDD
  /*match1: Match = new Match(0, "Ligue 1", 0, [new Team(0, "Paris Saint-Germain"), new Team(1, "OM")]);
  match2: Match = new Match(1, "Ligue 1", 0, [new Team(2, "SRFC"), new Team(3, "Dijon")]);
  match3: Match = new Match(2, "Ligue 1", 0, [new Team(4, "OL"), new Team(5, "OGC Nice")]);
  match4: Match = new Match(3, "Ligue 1", 0, [new Team(6, "Caen"), new Team(7, "Angers")]);
  match5: Match = new Match(4, "Ligue 1", 0, [new Team(8, "Nimes"), new Team(9, "Strasbourg")]);*/

  /*betsT1: BetType[] = [
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
  ];*/

  constructor(private baseService: BaseService, private route: ActivatedRoute, private matchBetService: MatchBetService) {
    route.params.subscribe(data => this.getCompetition());
  }

  ngOnInit() {
    this.selectedDay = 1;
    this.daySelected = "1";

    this.getCompetition();
    this.getCalendar();
    this.getMatchs();
    this.getMatchsByDay();
  }

  public onChange(event): void {  // event will give you full breif of action
    this.selectedDay = event.target.value;
    this.labelCalendar = this.calendar[this.selectedDay - 1].label;
    this.getMatchsByDay();
  }

  async getCompetition() {
    this.competition_id = +this.route.snapshot.paramMap.get('id');
    if (this.competition_id > 0) {
      this.competition = await this.baseService.get("/competition/" + this.competition_id);
      this.competitionName = this.competition.label;
      this.getCalendar();
      this.getMatchs();
      this.getMatchsByDay();
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

  async getMatchs() {
    this.matchs = await this.baseService.get("/match/");
  }

  async getMatchsByDay() {
    this.matchBets = await this.baseService.get("/matchday/" + this.selectedDay + "/matchsToCome");
  }

  getFormattedTeams(match: Match){
    if (match != null) {
      let result: string = "";
      result += match.matchteams.find(x => x.ishometeam).team.label;
      result += " - " + match.matchteams.find(x => !x.ishometeam).team.label;
      return result;
    }
  }

  // Sélectionne ou déselectionne un pari
  switchBet(id: number) {
    if (this.isSelectedBet(id)) {
      this.unselectBet(id);
    } else {
      this.selectBet(id);
    }
  }

  // Ajoute un pari dans le side panel
  selectBet(id: number) {
    this.matchBetService.addSelectedMatchBet(this.match.matchbets.find(x => x.id == id));
  }

  // Retire un pari du side panel
  unselectBet(id: number) {
    this.matchBetService.removeSelectedBet(this.match.matchbets.find(x => x.id == id));
  }

  // Contrôle si un pari est dans le side panel
  isSelectedBet(id: number) {
    return this.matchBetService.isSelectedBet(id);
  }
}
