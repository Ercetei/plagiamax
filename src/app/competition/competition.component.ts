import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

@Input() 	tabCategories:Category[];
// @Input() 	indexOfCategory:number;

  constructor(private categoryService:CategoryService) { }
  // constructor() { }

  ngOnInit(){
    //Je recupere le tableau du service
    this.tabCategories=this.categoryService.getCategory() ;
  }

  // tabCompet = this.categoryService.getCategory() ;

  // onCategoryBis(cy: Category, indexOfCategory:number){
  //   console.log(cy);
  //   console.log(indexOfCategory);
  //   console.log(this.categoryService.getCompetition(indexOfCategory));
  // }
  
  // onCategory(){
  //   console.log("TEST")
  // }

}
