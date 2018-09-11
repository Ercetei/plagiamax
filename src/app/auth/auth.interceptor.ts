
import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { UserService } from "../shared/services/user.service";

import 'rxjs/add/operator/do';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }


        // if (localStorage.getItem('userToken') != null) {
        //     const clonedreq = req.clone({
        //         headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
        //     });
        //     return next.handle(clonedreq)
        //         .do(
        //         succ => { },
        //         err => {
        //             if (err.status === 401)
        //                 this.router.navigateByUrl('/login');
        //         }
        //         );
        // }
        // else {
        //     return next.handle(req.clone());
        //     //this.router.navigateByUrl('/login');

    // if (localStorage.getItem('userToken') != null) {
    if (this.cookieService.check('JSESSIONID')) {
      const clonedreq = req.clone({
        // headers: req.headers.set('userToken', this.cookieService.ge('JSESSIONID'))
        // headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
        // headers: req.headers.set("JSESSIONID", this.cookieService.get('JSESSIONID'))
      });

      return next.handle(clonedreq)
        .do(az
        succ => {},
        err => {
          if (err.status === 401) {
            // this.router.navigateByUrl('/login');
          }

        }
        );
    } else {
      return next.handle(req.clone());
      //  this.router.navigateByUrl('/login');
    }
  }
}