import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../models/category';
import { Competition } from '../models/competition';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

@Input()	category:any;
@Input() 	indexOfCategory:number;

  // constructor(private tabCompet:Competition[]) { }
  constructor() { }

  ngOnInit() {
  }

  tabCompet:Competition[];

  onCategoryBis(){
    this.tabCompet = this.category[this.indexOfCategory].tabCompetition ;
  }

}
