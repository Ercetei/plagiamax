import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../shared/models/category.model';
import { GeneralService } from '../shared/services/general.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  tabCategories: Category[]=[];

  constructor(private generalService:GeneralService) { }

  ngOnInit(){
    //Je recupere le tableau du service
    this.getCategory();
  }

  async getCategory() {
    this.tabCategories = await this.generalService.get("/category");
  }


}
