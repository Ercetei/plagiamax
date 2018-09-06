import { Component } from '@angular/core';
import{ Calendar } from '../models/calendar';
import{ Team } from '../models/team';

@Component({
  selector: 'app-showbet',
  templateUrl: './showbet.component.html',
  styleUrls: ['./showbet.component.scss']
})
export class ShowbetComponent {
  calendar:Calendar[];
  team:Team[];
  daySelected:String;
  newVal:Number = 0; 

  

  constructor() { }

  ngOnInit() {
    
    this.calendar = [
      {Id:0,Name:"Sélectionnez votre journée de championnat"},
      {Id:1,Name:"Journée 1 sur 38"},
      {Id:2,Name:"Journée 2 sur 38"},
      {Id:3,Name:"Journée 3 sur 38"},
      {Id:4,Name:"Journée 4 sur 38"},
      {Id:5,Name:"Journée 5 sur 38"},
      {Id:6,Name:"Journée 6 sur 38"},
      {Id:7,Name:"Journée 7 sur 38"},
      {Id:8,Name:"Journée 8 sur 38"},
      {Id:9,Name:"Journée 9 sur 38"},
      {Id:10,Name:"Journée 10 sur 38"},
    ];
    this.daySelected="0";

    this.team = [
      {Id:1,Name:"Amiens"},
      {Id:2,Name:"Marseille"},
      {Id:3,Name:"Paris SG"},
      {Id:4,Name:"Lyon"},
      {Id:5,Name:"As Monaco"},
      {Id:6,Name:"Nantes"},
      {Id:7,Name:"Rennes"},
      {Id:8,Name:"Caen"},
      {Id:9,Name:"Le Mans"},
      {Id:10,Name:"Strasbourg"},
    ];

    this.newVal = 0;

  }
  onAction(){
    console.log("aaaaaa");
  }
  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    console.log(this.newVal);
  }

}
