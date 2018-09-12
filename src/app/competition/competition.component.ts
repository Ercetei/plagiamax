import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from '../../../node_modules/rxjs';

import { Category } from '../shared/models/category.model';
import { Competition } from '../shared/models/competition.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  tabCategories: Category[]=[];

  constructor(private categoryService:CategoryService) { }

  ngOnInit(){
    //Je recupere le tableau du service
    this.categoryService.getCategoryBDD().subscribe(cats => this.tabCategories = cats);

  }

  // tabCompet = this.categoryService.getCategory() ;

  // onCategoryBis(cy: Category, indexOfCategory:number){
  //   console.log(cy);
  //   console.log(indexOfCategory);
  //   console.log(this.categoryService.getCompetition(indexOfCategory));
  // }
  // football:String = "football";

  onCategory(){
    console.log("Nouveau test BDD")
    this.categoryService.getCategoryBDD().subscribe(cats => this.tabCategories = cats);
  }



}
