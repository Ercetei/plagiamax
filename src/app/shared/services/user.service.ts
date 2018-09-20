import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';
import { Body } from '@angular/http/src/body';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {

  }
  tabUser: User[] = [];

  registerUser(user: User) {
    const body: User = {
      username: user.username,
      password: user.password,
      mail: user.mail,
      birthdate: new Date(user.birthdate),
      firstname: user.firstname,
      lastname: user.lastname,
      creditcard: user.creditcard,
      cryptogram: user.cryptogram,
      expirationdate: user.expirationdate,
      wallet: user.wallet
    };

    return this.http.post(this.rootUrl + '/user/register', body, {
      withCredentials: true
    });
  }

  userAuthentication(username, password, csrf) {
    var user = {
      username: username,
      password: password,
      _csrf: csrf
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams();
    body.set('username', user.username);
    body.set('password', user.password);
    body.set('_csrf', user._csrf);

    return this.http.post(this.rootUrl + '/login', body.toString(), {
      headers: headers,
      responseType: 'json',
      withCredentials: true
    });
  }

  getUserClaims(idUser) {
    return this.http.get(this.rootUrl + '/user/' + idUser + '/claims');
  }

  getUserBDD(): Observable<User[]> {

    // console.log("user")
    return this.http.get<User[]>(this.rootUrl + '/user', {
      withCredentials: true
    });
  }

  getSingleUserBDD(id: number): Observable<User> {

    // console.log("user")
    return this.http.get<User>(this.rootUrl + '/user/' + id, {
      withCredentials: true
    });
  }
  uWallet(id, wallet){
    let body = {wallet}
    this.http.patch(this.rootUrl + '/user/' + id, body, {
      responseType: 'json',
      withCredentials: true
    }).subscribe();
  }
  uDateExp(id, expirationdate){
    let body = {expirationdate}
    this.http.patch(this.rootUrl + '/user/' + id, body, {
      responseType: 'json',
      withCredentials: true
    }).subscribe();
  }
  uCreditCard(id, creditcard){
    let body = {creditcard}
    this.http.patch(this.rootUrl + '/user/' + id, body, {
      responseType: 'json',
      withCredentials: true
    }).subscribe();
  }


}
