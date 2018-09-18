import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, URLSearchParams } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';
import { GeneralService } from '../services/general.service';

@Injectable()
export class UserService {
    readonly rootUrl = 'http://localhost:8080';

    constructor(private http: HttpClient, private generalService:GeneralService) {
    }

    registerUser(user: User) {
        const body: User = {
            username: user.username,
            password: user.password,
            mail: user.mail,
            birthdate: new Date(user.birthdate),
            firstname: user.firstname,
            lastname: user.lastname
        };

        return this.http.post(this.rootUrl + '/user/register', body, {
            withCredentials: true
        });
    }

    isAuthentified(): Boolean {
        return !!localStorage.getItem('userToken');
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

}
