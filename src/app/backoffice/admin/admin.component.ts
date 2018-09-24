import { Component, OnInit } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {AngularFireLiteDatabase, AngularFireLiteAuth} from "angularfire-lite";
import {Match} from "../../shared/models/match.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  matchs: Observable<Match>;

  databaseData;

  constructor(private baseService: BaseService,
              public db: AngularFireLiteDatabase,
              public auth: AngularFireLiteAuth,) {
    // FIREBASE INITIALIZATION
    // Realtime Database
    this.db.read('plagiamax/matchs').subscribe((data) => {
      this.databaseData = data;
    });

    // Realtime Database list retrieval
    this.matchs = this.db.read('matchs');
  }

  ngOnInit() {

  }

  getFormattedTeams(match: Match) {
    if (match != null) {
      let result: string;
      result = match.matchteams.find(x => x.ishometeam).team.label;
      result += " - " + match.matchteams.find(x => !x.ishometeam).team.label;
      return result;
    }
  }


}
