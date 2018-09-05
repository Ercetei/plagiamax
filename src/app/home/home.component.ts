import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

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

}
