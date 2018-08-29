import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.scss']
})
export class BetListComponent implements OnInit {

  btn1Active: boolean = false;  
  btn2Active: boolean = false;  
  btn3Active: boolean = false;  

  constructor() { }

  ngOnInit() {
  }

  // A remplacer par une véritable solution
  onAddBet(btn: number) {
    switch (btn) {
      case 1:
        if(this.btn1Active == true){
          this.btn1Active = false;
        } else {
          this.btn1Active = true;
        }
        break;

      case 2:
        if(this.btn2Active == true){
          this.btn2Active = false;
        } else {
          this.btn2Active = true;
        }
        break;
      case 3:
        if(this.btn3Active == true){
          this.btn3Active = false;
        } else {
          this.btn3Active = true;
        }
       break;
    
      default:
        break;
    }
    
  }

}
