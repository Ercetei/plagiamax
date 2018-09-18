import {AppComponent} from '../app.component';
import {User} from '../shared/models/user.model';
import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {

  isAuthentified: Boolean;
  currentUser: User;

  constructor(private cookie: CookieService, private router: Router, private http: HttpClient, private userService: UserService) {
    this.isAuthentified = this.userService.isAuthentified();
    if (this.isAuthentified) {
      this.currentUser = this.userService.getCurrentUser();
    }
  }

  ngOnInit() {

  }

  /**
   * Disconnect the current user and destroy the localStorage
   */
  Logout() {
    this.http.get('http://localhost:8080/logout', {
      responseType: 'json',
      withCredentials: true
    }).subscribe(
      (data: any) => {
        this.cookie.deleteAll();
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        window.location.reload();

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      });
  }

}
