import { Component, OnInit, Input } from '@angular/core';

// import { Category } from '../shared/category.model';
// import { Competition } from '../shared/competition.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

@Input() 	indexOfCategory:number;

  constructor(private categoryService:CategoryService) { }
  // constructor() { }

  ngOnInit() {
  }

  // tabCompet:Competition[];

  onCategoryBis(){
    console.log("TEST BOUTON" + this.categoryService + " " + this.indexOfCategory);
    // console.log(this.categoryService.getCompetition(this.indexOfCategory));
    // for(let cy of this.category){

    // }
    // this.tabCompet = this.category[this.indexOfCategory].tabCompetition ;
  }

}
