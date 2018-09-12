import {AppComponent} from '../app.component';
import {User} from '../shared/models/user.model';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {
  isAuthentified: Boolean = !!localStorage.getItem('userToken');
  currentUser: User;

  constructor(private cookie: CookieService, private router: Router) {
    if (this.isAuthentified) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
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
