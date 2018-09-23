import { Component, OnInit } from '@angular/core';
import {User} from "../shared/models/user.model";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed=true;
  isAuthentified: Boolean;
  currentUser: User;

  constructor(private userService: UserService) {
    this.isAuthentified = this.userService.isAuthentified();
    if (this.isAuthentified) {
      this.currentUser = this.userService.getCurrentUser();
    }
  }

  ngOnInit() {
  }

}
