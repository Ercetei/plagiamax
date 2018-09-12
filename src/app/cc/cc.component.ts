import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from '../../../node_modules/rxjs';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss']
})
export class CcComponent implements OnInit {
  number:String;
  expMonth:String;
  expYear:String;
  cvc:String;
  tabUser: User[]=[];


  constructor(private userService:UserService) {
   }

  ngOnInit() {
    this.userService.getUserBDD().subscribe(users => this.tabUser = users);


  }
  // OnSubmit(number, expmonth, expyear, cvc) {
  //   this.userService.userAuthentication(number, expmonth, expyear, cvc, this.csrf).subscribe((data: any) => {
  //     localStorage.setItem('userToken', this.cookieService.get('JSESSIONID'));
  //     this.router.navigate(['/home']);
  //   },
  //     (err: HttpErrorResponse) => {
  //       this.isLoginError = true;
  //     });
  // }

}
