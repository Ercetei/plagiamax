import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';
import { BaseService } from './base.service';

@Injectable()
export class UserService {

    constructor(private baseService: BaseService) {
    }

  registerUser(user: User) {
    const body: User = {
      id:null,
      username: user.username,
      password: user.password,
      mail: user.mail,
      birthdate: new Date(user.birthdate),
      firstname: user.firstname,
      lastname: user.lastname,
      creditcard: user.creditcard,
      cryptogram: user.cryptogram,
      expirationdate: user.expirationdate,
      wallet: user.wallet,
      roles:null
    };

       return this.baseService.http.post(this.baseService.rootUrl + '/user/register', body, {
           withCredentials: true
       });
    }

    isAuthentified(): Boolean {
        return !!localStorage.getItem('user');
    }

    getCurrentUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }

    userAuthentication(username, password, csrf) {
        var user = {
            username: username,
            password: password,
            _csrf: csrf
        };

        const body = new URLSearchParams();
        body.set('username', user.username);
        body.set('password', user.password);
        body.set('_csrf', user._csrf);

        return this.baseService.http.post(this.baseService.rootUrl + '/login', body.toString(), {
            headers: this.baseService.textHeaders,
            responseType: 'json',
            withCredentials: true
        });
    }

    getUserClaims(idUser) {
        return this.baseService.http.get(this.baseService.rootUrl + '/user/' + idUser + '/claims');
    }

  getUserBDD(): Observable<User[]> {
    return this.baseService.http.get<User[]>(this.baseService.rootUrl + '/user', {
      withCredentials: true
    });
  }

  getSingleUserBDD(id: number): Observable<User> {
    return this.baseService.http.get<User>(this.baseService.rootUrl + '/user/' + id, {
      withCredentials: true
    });
  }

  uWallet(id, wallet){
    let body = {wallet}
    this.baseService.http.patch(this.baseService.rootUrl + '/user/' + id, body, {
      responseType: 'json',
      withCredentials: true
    }).subscribe();
  }

  uDateExp(id, expirationdate){
    let body = {expirationdate}
    this.baseService.http.patch(this.baseService.rootUrl + '/user/' + id, body, {
      responseType: 'json',
      withCredentials: true
    }).subscribe();
  }

  uCreditCard(id, creditcard){
    let body = {creditcard}
    this.baseService.http.patch(this.baseService.rootUrl + '/user/' + id, body, {
      responseType: 'json',
      withCredentials: true
    }).subscribe();
  }


    removeFromWallet(amount: number) {
      console.log("Amount : " + amount);
        let currentUser = this.getCurrentUser();
        let wallet = Math.round((+currentUser.wallet - +amount) * 100) / 100;
        console.log("WALLET : " + wallet);
        let body = {
            wallet
        };

        this.baseService.http.patch(this.baseService.rootUrl + '/user/' + currentUser.id, body, {
            responseType: 'json',
            withCredentials: true
        }).subscribe();

        localStorage.setItem("user", JSON.stringify(currentUser));
    }
}
