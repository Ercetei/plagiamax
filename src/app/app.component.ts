import { Component } from '@angular/core';
import { Category } from './models/category';
import { Competition } from './models/competition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'plagiamax';

  // visibleCompet = 'false';
  tabCompetFoot = [new Competition(0, 'Ligue 1 Conforama', 1, 1, 'FRANCE'),
                    new Competition(1, 'Coupe de France', 0, 2, 'FRANCE')
                  ];
  tabCompetBasket = [];

  tabCategory=[new Category (0, 'Football', 1, []), 
              new Category (1, 'Basketball', 0,[])];
  
  onCategory(id:number){
    // this.visibleCompet = 'true';
    this.tabCategory[id].tabCompetition = this.tabCompetFoot;
  }
  
}
