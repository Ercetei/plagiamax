import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { Category } from '../shared/category.model';
import { Competition } from '../shared/competition.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  userClaims: any;
  images = [1, 2, 3, 4].map(() => `https://picsum.photos/1900/500?random&t=${Math.random()}`);

  constructor(private router: Router, private userService: UserService, config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    /*this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;

    });*/
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }


  // tabCompetFoot = [ new Competition(0, 'Ligue 1 Conforama', 1, 1, 'FRANCE'),
  //                   new Competition(1, 'Coupe de France', 0, 2, 'FRANCE')
  //                 ];
  // tabCompetBasket = [];
  // tabCategory=[ new Category (0, 'Football', 1, []), 
  //               new Category (1, 'Basketball', 0,[])
  //             ];
  // tabCategory=[ new Category (0, 'Football', 1, this.tabCompetFoot), 
  //               new Category (1, 'Basketball', 0, this.tabCompetBasket)
  //             ];
  // onCategory(tabCompetition:Competition[]){
  //   tabCompetition = this.tabCompetFoot ;
  // }

}
