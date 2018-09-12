import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    isLoginError: boolean = false;
    csrf = '';

    constructor(private userService: UserService, private router: Router, private cookieService: CookieService, private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get('http://localhost:8080/login', {
            responseType: 'json',
            withCredentials: true
        }).subscribe(
            (data: any) => {
                this.csrf = data._csrf;
            },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log('Client-side error occured.');
                } else {
                    console.log('Server-side error occured.');
                }
            });
    }

    OnSubmit(username, password) {
        this.userService.userAuthentication(username, password, this.csrf)
            .subscribe(
                (data: any) => {
                    this.cookieService.set("user", data.username);
                    this.cookieService.set("user_id", data.id);
                    localStorage.setItem('userToken', this.csrf);
                    localStorage.setItem('user', JSON.stringify(data));
                    this.router.navigate(['/home']);
                },
                (err: HttpErrorResponse) => {
                    this.isLoginError = true;
                });
    }

}
