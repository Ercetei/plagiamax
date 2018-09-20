import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { User } from '../../shared/models/user.model';
import {Router} from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }

    this.user = {
      id: null,
      username: '',
      password: '',
      mail: '',
      birthdate: new Date(),
      firstname: '',
      lastname: '', 
      wallet: 0
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe(
      res => {
        this.toastr.success('User registration successful');
        this.router.navigateByUrl('/home');
      },
      err => {
        //this.toastr.error(data.Errors[0]);
        //console.log(err.Errors[0]); 
        console.log('error occured');
      }
      );
  }

}
