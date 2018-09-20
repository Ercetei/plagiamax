import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';
import { BaseService } from './base.service';

@Injectable()
export class UserService {

    constructor(private baseService: BaseService) {
    }

    registerUser(user: User) {
        const body: any = {
            username: user.username,
            password: user.password,
            mail: user.mail,
            birthdate: new Date(user.birthdate),
            firstname: user.firstname,
            lastname: user.lastname
        };

        return this.baseService.http.post(this.baseService.rootUrl + '/user/register', body, {
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

    removeFromWallet(amount: number) {
        let wallet = this.getCurrentUser().wallet - amount;
        let body = {
            wallet
        }

        this.baseService.http.patch(this.baseService.rootUrl + '/user/' + this.getCurrentUser().id, body, {
            responseType: 'json',
            withCredentials: true
        }).subscribe();
    }
}
