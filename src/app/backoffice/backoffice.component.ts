import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event } from '@angular/router';
import {User} from "../shared/models/user.model";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {
  currentUser: User;
  userRole = 1;

  constructor(private router: Router, private userService: UserService) {
   }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    if(this.currentUser.roles[0].role == "ADMIN") {
      this.userRole = 2;
    }
  }

}
