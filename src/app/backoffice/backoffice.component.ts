import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event } from '@angular/router';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  model = {
    wallet: false,
    history: false,
    profile: false
  };

  constructor(private router: Router) {
   }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      console.log(event); // This will give you the required url
  });  }

  currentPage(val: String) {
    this.model.wallet = false;
    this.model.history = false;
    this.model.profile = false;

    if (val == "history") {
      this.model.history = true;
    } else if (val == "wallet") {
      this.model.wallet = true;
    } else {
      this.model.profile = true;
    }
  }
}
