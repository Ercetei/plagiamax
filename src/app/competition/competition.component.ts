import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../shared/models/category.model';
import { Competition } from '../shared/models/competition.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

@Input() 	tabCategories:Category[];
@Input() 	tabCompetBDD:any;
// @Input() 	indexOfCategory:number;
  tabCategoriesBis:Category; 
  constructor(private categoryService:CategoryService) { }
  // constructor() { }

  ngOnInit(){
    //Je recupere le tableau du service
    this.tabCategories=this.categoryService.getCategory() ;
    this.tabCompetBDD = this.categoryService.getCompetitionBDD(1);
  }

  // tabCompet = this.categoryService.getCategory() ;

  // onCategoryBis(cy: Category, indexOfCategory:number){
  //   console.log(cy);
  //   console.log(indexOfCategory);
  //   console.log(this.categoryService.getCompetition(indexOfCategory));
  // }
  // football:String = "football";
  onCategory(){
    console.log("TEST");
    console.log(this.tabCompetBDD);
    console.log(this.tabCompetBDD.id);
    console.log("TEST BDD TEST");
    console.log(this.categoryService.getCompetitionBDDTest());
    this.categoryService.getCompetitionBDDTest()
    .subscribe(category => this.tabCategoriesBis = category);
    console.log(this.tabCategories);
  }

}
