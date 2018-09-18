import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../shared/models/category.model';
import { GeneralService } from '../shared/services/general.service';

import { ActivatedRoute } from '@angular/router';
import { CompetitionService } from '../shared/services/competition.service';
import { Competition } from '../shared/models/competition.model';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  tabCategories: Category[]=[];
  afficher: String;
  competitions: Competition[]=[];

  constructor(private generalService: GeneralService, private route: ActivatedRoute, private competitionService:CompetitionService) {
   }

  ngOnInit(){
    this.getCategory();
  }

  async getCategory() {
    this.tabCategories = await this.generalService.get("/category");

  }

  getAfficher(){
    this.afficher = "" ;
    if (this.route.snapshot.children[0] != undefined){
        this.afficher = this.route.snapshot.children[0].component['name'] ;
    }
    return this.afficher;
  }

  // setCompetition(cn:Competition){
  //   this.competitionService.setSelectedCompetition(cn);
  // }

}
