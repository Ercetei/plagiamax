import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user.model';
import { NgForm } from '@angular/forms';
import { BaseService } from '../../shared/services/base.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  user:User;

  constructor(private baseService: BaseService, private userService:UserService) { }

  ngOnInit() {
    //this.request.patch("/user/" + this.cookie.get("user_id"), {"wallet":newAmount});
   this.user = JSON.parse(localStorage.getItem('user'));   
   //localStorage.setItem("user", JSON.stringify(storageUser));
  }

  OnSubmit(form:NgForm) {
    this.baseService.patch("/user/" + this.user.id, form.value).then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.reload();
    });

  }

}
