import { Component, OnInit, Input, Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap'; 
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreditCardService } from './services/creditCard-service';
import { CreditCard } from './models/creditCard';
import { BaseService } from '../../shared/services/base.service';


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
  cvc: Number;
  number: Number;
  cardDate = {
    year:Number,
    month:Number
  }

  calendarMonth = [
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
  
  calendarYear = [
    {id:0,label:"2018"},
    {id:1,label:"2019"},
    {id:2,label:"2020"},
    {id:3,label:"2021"},
    {id:4,label:"2022"},
    {id:5,label:"2023"},
    {id:6,label:"2024"}
  ];

  valMonth:Number; 
  monthSelected:Number;
  valYear:Number; 
  yearSelected = this.calendarYear[0];
  dateValidate = false;

  constructor(private creditCardService: CreditCardService,calendar: NgbCalendar, private userService:UserService, 
    private cookie: CookieService, private baseService: BaseService) {
    this.fromDate = calendar.getToday(); /// test pour voir le mois en cours

    if (this.isAuthentified) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }

  }


  ngOnInit() {
    
    this.monthSelected = 0;
    this.valMonth = 0;
    this.valYear = 0;

    this.userID = parseInt(this.cookie.get("user_id"));
    
    this.userService.getSingleUserBDD(this.userID).subscribe(
      u => {
        this.currentUser = u;
      } 
    );
  
  }

  OnSubmit(form: NgForm) {
   let wt = form.value;
   let newAmount = +this.currentUser.wallet +wt.wallet;
   this.baseService.patch("/user/" + this.cookie.get("user_id"), {"wallet":newAmount});
   let storageUser:any = JSON.parse(localStorage.getItem('user'));   
   storageUser.wallet = newAmount;
   localStorage.setItem("user", JSON.stringify(storageUser));
   /* if (this.ccForm.invalid) {
      this.isValidFormSubmitted = false;
        return;
     }
     this.isValidFormSubmitted = true;
     console.log("isValidate: " + this.isValidFormSubmitted)

     this.creditCard = this.ccForm.get('creditCardNumber').value;
     this.creditCardService.createCC(this.creditCard);
     this.onUpdateWallet();
     this.ccForm.reset();*/
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


selectThisMonth() { 
    /*this.year = now.getFullYear();
    this.month = now.getMonth()+1;*/
}

checkDate(){
 /* let yearChange = (+this.yearSelected)-(+(this.year = now.getFullYear()));
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
  }*/
  /*onChangeMonth(event){  // event will give you full breif of action
    this.monthSelected = event.target.value;
  }
  
  onChangeYear(event){  // event will give you full breif of action
    this.yearSelected = event.target.value;
   */
  }

}
