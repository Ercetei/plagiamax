import { User } from '../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {

  isAuthentified: Boolean;
  currentUser: User;

  constructor(private cookie: CookieService, private router: Router, private userService: UserService) {
    this.isAuthentified = this.userService.isAuthentified();
    if (this.isAuthentified) {
      this.currentUser = this.userService.getCurrentUser();
    }
  }

  ngOnInit() {

  }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    this.cookie.deleteAll();
    this.router.navigate(['/home']);
  }

}
