import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { NgForm, Form } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap'; /// test pour voir le mois en cours
import { CalendarMonth } from './models/calendarMonth';
import { CalendarYear } from './models/calendarYear';
import { FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { CreditCardService } from './services/creditCard-service';
import { CreditCard } from './models/creditCard';


const now = new Date();

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss']
})
@Injectable()

export class CcComponent implements OnInit {
  ccForm = new FormGroup({
    creditCardNumber: new FormControl('', [Validators.minLength(16)] ),
    cvcNumber: new FormControl('', [Validators.minLength(3)])	 
 });

  isValidFormSubmitted = null;
  creditCard = new CreditCard();
  
  isAuthentified: Boolean = !!localStorage.getItem('userToken');
  currentUser: User;

  fromDate: NgbDateStruct; /// test pour voir le mois en cours
  toDate: NgbDateStruct; /// test pour voir le mois en cours
  userID: number;
  wallet: Number;
  
  calendarMonth:CalendarMonth[];
  calendarYear:CalendarYear[];
  valMonth:Number; 
  monthSelected:Number;
  valYear:Number; 
  yearSelected:Number;
  year:Number;
  month:Number;
  dateValidate = false;


  constructor(private creditCardService: CreditCardService,calendar: NgbCalendar, private userService:UserService, 
    private cookieService: CookieService) {
    this.fromDate = calendar.getToday(); /// test pour voir le mois en cours

    if (this.isAuthentified) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }

  }


  ngOnInit() {
    this.calendarMonth = [
      {id:0,label:"Mois"},
      {id:1,label:"1-Janvier"},
      {id:2,label:"2-Février"},
      {id:3,label:"3-Mars"},
      {id:4,label:"4-Avril"},
      {id:5,label:"5-Mai"},
      {id:6,label:"6-Juin"},
      {id:7,label:"7-Juillet"},
      {id:8,label:"8-Aout"},
      {id:9,label:"9-Septembre"},
      {id:10,label:"10-Octobre"},
      {id:11,label:"11-Novembre"},
      {id:12,label:"12-Decembre"},
    ];
    this.monthSelected = 0;
    this.valMonth = 0;

    this.calendarYear = [
      {id:0,label:2018},
      {id:1,label:2019},
      {id:2,label:2020},
      {id:3,label:2021},
      {id:4,label:2022},
      {id:5,label:2023},
      {id:6,label:2024},
      {id:6,label:2017}
    ];
    this.yearSelected=0;
    this.valYear = 0;

    this.userID = parseInt(this.cookieService.get("user_id"));
    
    this.userService.getSingleUserBDD(this.userID).subscribe(
      u => {
              this.currentUser = u;
      } 
    );
  
  }

  onFormSubmit() {
     if (this.ccForm.invalid) {
      this.isValidFormSubmitted = false;
        return;
     }
     this.isValidFormSubmitted = true;
     console.log("isValidate: " + this.isValidFormSubmitted)

     this.creditCard = this.ccForm.get('creditCardNumber').value;
     this.creditCardService.createCC(this.creditCard);
     this.onUpdateWallet();
     this.ccForm.reset();
    }
    get creditCardNumber() {
      return this.ccForm.get('creditCardNumber');
    }
    get cvcNumber() {
      return this.ccForm.get('cvcNumber');
    }

  onUpdateWallet() {
    this.checkDate();
    this.currentUser.wallet = (+this.wallet) + (+this.currentUser.wallet);
    this.userService.uWallet(this.userID, this.currentUser.wallet);
    console.log('Wallet Enter : ' + this.wallet);
    console.log('Wallet User : ' + this.currentUser.wallet);
  }
  // onUpdateCreditCard() {
  //   this.userService.uCreditCard(this.userID, this.creditCard);
  //   console.log('CreditCardEnter : ' + this.creditCard)
  //   console.log('Credit Card : ' + this.user.creditcard);
  // }

selectThisMonth() { /// test pour voir le mois en cours
    this.year = now.getFullYear();
    this.month = now.getMonth()+1;
}

checkDate(){
  let yearChange = (+this.yearSelected)-(+(this.year = now.getFullYear()));
  let monthChange = (+this.monthSelected)-(+(this.month = now.getMonth()+1));
    if(yearChange > 0 && this.monthSelected > 0){ 
      this.dateValidate = true;
      console.log(yearChange);
      console.log(this.monthSelected);
      console.log(this.dateValidate);
    }
    else if(yearChange == 0) {
      if(monthChange > 0 || monthChange == 0){
        console.log(yearChange);
        console.log(monthChange);
        this.dateValidate = true;
      }
        else{
          console.log(this.dateValidate);
        }
    }
  }
  onChangeMonth(event){  // event will give you full breif of action
    this.monthSelected = event.target.value;
  }
  
  onChangeYear(event){  // event will give you full breif of action
    this.yearSelected = event.target.value;
   
  }

}
