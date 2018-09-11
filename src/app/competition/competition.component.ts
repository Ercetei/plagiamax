import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../shared/models/category.model';
import { Competition } from '../shared/models/competition.model';
import { CategoryService } from '../shared/services/category.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

@Input() 	tabCategories:Category[];
// @Input() 	tabCompetBDD:any;

  tabCategoriesBis:any; 
  tabCategoriesBDD:any[]=[];
  constructor(private categoryService:CategoryService, private http: HttpClient) { }
  // constructor() { }

  ngOnInit(){
    //Je recupere le tableau du service
    // this.tabCategories=this.categoryService.getCategory() ;
    // this.tabCompetBDD = this.categoryService.getCompetitionBDD(1);
    this.tabCategoriesBDD = this.categoryService.getCompetitionBDDTestBis();
  }

  // tabCompet = this.categoryService.getCategory() ;

  // onCategoryBis(cy: Category, indexOfCategory:number){
  //   console.log(cy);
  //   console.log(indexOfCategory);
  //   console.log(this.categoryService.getCompetition(indexOfCategory));
  // }
  // football:String = "football";
  onCategory(){
    // console.log("Nouveau test")
    // this.categoryService.getCompetitionBDDTestBis();
    // this.http.get('http://localhost:8080/category/1' , {
    //                     withCredentials: true
    //                 }).subscribe( data => { 
    //                                         console.log(data);
    //                                         this.tabCategoriesBDD = data ;
    //                                         console.log(this.tabCategoriesBDD.id);
    //                                       }
    //                 ,
    //                 (err: HttpErrorResponse) => {
    //                     if (err.error instanceof Error) {
    //                     console.log('Client-side error occured.');
    //                     } else {
    //                     console.log('Server-side error occured.');
    //                     }
    //                 } 
    //             );
    console.log("Nouveau test BDD")
    this.tabCategoriesBDD = this.categoryService.getCompetitionBDDTestBis();
    // console.log(this.tabCategoriesBDD.label);
  }

}
