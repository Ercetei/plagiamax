import {Component, OnInit, Input} from '@angular/core';
import {Bet} from "../../../shared/models/bet.model";

@Component({
  selector: 'app-betdetails',
  templateUrl: './betdetails.component.html',
  styleUrls: ['./betdetails.component.scss']
})
export class BetdetailsComponent implements OnInit {

  @Input() bd:any;
  display:boolean = false;
  tabStatus = [
    { id: 0, status: 'Tout' },
    { id: 1, status: 'En cours' },
    { id: 2, status: 'Terminé' }
  ];

  typeBet = [
    { label: "0" },
    { label: "Vainqueur" },
    { label: "Score exact" },
    { label: "But" }
  ];

  constructor() { }

  ngOnInit() {
  }

}
