import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../shared/models/category.model';

import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../shared/services/base.service';
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

  constructor(private baseService: BaseService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.getCategory();
  }

  async getCategory() {
    this.tabCategories = await this.baseService.get("/category");
  }

  onAfficher(){
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
