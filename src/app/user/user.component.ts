import { AppComponent } from '../app.component';
import { User } from '../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../shared/services/user.service';
import { AngularFireLiteDatabase, AngularFireLiteAuth } from 'angularfire-lite';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {
  isAuthentified: Boolean;
  currentUser: User;
  firebaseUser: any;
  databaseData;
  databaseList;
  databaseQuery;

  constructor(private cookie: CookieService, private http: HttpClient, private router: Router,
    private userService: UserService,
    public db: AngularFireLiteDatabase,
    public auth: AngularFireLiteAuth) {
    this.isAuthentified = this.userService.isAuthentified();
    if (this.isAuthentified) {
      this.currentUser = this.userService.getCurrentUser();
    }
  }

  ngOnInit() {
    if (this.isAuthentified) {
      this.getWallet();
    }
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

  getWallet() {
    // Realtime Database
    this.db.read('users/' + this.cookie.get('user_id')).subscribe((data) => {
      this.firebaseUser = data;
    });
  }

}
