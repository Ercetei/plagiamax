import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from '../../../node_modules/rxjs';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {CookieService} from 'ngx-cookie-service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { GeneralService } from '../shared/services/general.service';


@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss']
})
@Injectable()
export class CcComponent implements OnInit {
  tabUser: User[]=[];
  user: User;
  userID: number;
  wallet:number;

  constructor(private userService:UserService, private cookieService: CookieService, private generalService: GeneralService) {}

  ngOnInit() {

    this.userID = parseInt(this.cookieService.get("user_id"));
    console.log(this.userID);
    
    this.userService.getSingleUserBDD(this.userID).subscribe(
      u => {
              this.user = u;
              
              console.log(this.user)
      } 
    );

    // this.getWallet(id);
  
  }
// async getWallet(id) {
//     this.user = await this.generalService.get("/user");
//     console.log(this.user);
//     this.wallet = this.user[id-1].wallet ;
//     console.log(this.wallet);
//   }
  onUpdateWallet() {
    this.user.wallet += (+this.wallet);
    this.userService.uw(this.userID, this.user.wallet);
    console.log("user")
    console.log(this.wallet)
    console.log(this.user.wallet)
    // this.wallet=''
  }

  


  // onUpdateWallet(user, newWallet) {
  //     newWallet 
  //     user.wallet = newWallet + 1;
  //     this.userService.registerUser(user);
  // }


}
