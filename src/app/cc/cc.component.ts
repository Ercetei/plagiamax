import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from '../../../node_modules/rxjs';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {CookieService} from 'ngx-cookie-service';
import { ValueTransformer } from '@angular/compiler/src/util';


@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss']
})
@Injectable()
export class CcComponent implements OnInit {
  tabUser: User[]=[];
  user: User;
  oldVal:Number = 0;
 

  constructor(private userService:UserService, private cookieService: CookieService) {}

  ngOnInit() {

    let id = this.cookieService.get("user_id");
    console.log(id);
    
    this.userService.getSingleUserBDD(id).subscribe(
      u => {
              this.user = u;
              
              console.log(this.user)
      } 
    );

  
  }


  onUpdateWallet(user, newWallet) {

      user.wallet = newWallet + 1;
      this.userService.registerUser(user);
  }

  saveBDD(){
    
  }

}
