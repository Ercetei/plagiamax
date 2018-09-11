import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {

  isAuthentified:Boolean = !!localStorage.getItem('userToken');

  constructor(private cookieService: CookieService) { }

  ngOnInit() {

  }

}
