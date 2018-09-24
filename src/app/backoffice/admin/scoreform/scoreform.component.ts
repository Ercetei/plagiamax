import {Component, OnInit, Input} from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Match} from "../../../shared/models/match.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-scoreform',
  templateUrl: 'scoreform.component.html',
  styleUrls: ['scoreform.component.scss']
})
export class ScoreFormComponent implements OnInit {

  @Input() match:Match;
  scoreTeamOne:number;
  scoreTeamTwo:number;

  constructor(private baseService: BaseService) {

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

  OnSubmit(scoreForm:NgForm) {

    for(let i = 0; i < this.scoreTeamOne; i++) {
      const body = {
        match: {id:this.match.id},
        status:1,
        team:{id:this.match.matchteams[0].id},
        statustime:1.1
      };

      this.baseService.post("/event", body);
    }

    for(let i = 0; i < this.scoreTeamTwo; i++) {
      const body = {
        match: {id:this.match.id},
        status:1,
        team:{id:this.match.matchteams[1].id},
        statustime:1.1
      };

      this.baseService.post("/event", body);
    }

    this.baseService.patch("/match/" + this.match.id, {status:5});


  }

}
