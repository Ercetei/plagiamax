import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from '../shared/services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  csrf: any;
  userClaims: any;
  images = [
    "../../assets/img/banner-1.jpg",
    "../../assets/img/banner-2.jpg"
  ]
  afficher: String;

  constructor(private router: Router, private userService: UserService, config: NgbCarouselConfig, 
            private http: HttpClient, private generalService : GeneralService, private route: ActivatedRoute) {
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

  // Logout() {
  //   localStorage.removeItem('userToken');
  //   this.router.navigate(['/login']);
  // }

  onAfficher(){
    this.afficher = "" ;
    if (this.route.snapshot.children[0] != undefined){
        this.afficher = this.route.snapshot.children[0].component['name'] ;
    }
    return this.afficher ;
  }

}
