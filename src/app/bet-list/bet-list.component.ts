import { Component, OnInit } from '@angular/core';
import{ BetGroup} from '../models/BetGroup';
import { Subscription } from 'rxjs';
import { BetGroupService } from '../services/BetGroupService';
import { Bet } from '../models/Bet';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.scss']
})
export class BetListComponent implements OnInit {
  selectedBets: BetGroup;
  bets: Bet[] = [
    new Bet(1, 'Paris Saint Germain', 2.22, 1),
    new Bet(2, 'Nul', 3.40, 1),
    new Bet(3, 'SCO Angers', 3.15, 1),
    new Bet(4, '1-0', 2, 2),
    new Bet(5, '0-1', 5, 2),
    new Bet(6, '0-0', 3.5, 2),
    new Bet(7, '2-0', 2, 2),
    new Bet(8, '1-2', 5, 2),
    new Bet(9, '1-1', 3.5, 2),
    new Bet(10,'Plus de 0.5 buts', 1.2, 3),
    new Bet(11,'Moins de 0.5 buts', 5, 3),
    new Bet(12,'Plus de 1.5 buts', 2.5, 3),
    new Bet(13,'Moins de 1.5 buts',2.5, 3),
    new Bet(14,'Plus de 2.5 buts', 5, 3),
    new Bet(15,'Moins de 2.5 buts', 1.2, 3)
  ];

  betGroupSubscription = new Subscription;

  constructor(private betGroupService: BetGroupService) { 

  }

  ngOnInit() {
    this.betGroupSubscription = this.betGroupService.betGroupSubject.subscribe(
      (bg: BetGroup) => {
        this.selectedBets = bg;
      }
    );
  }

  getWinnerBets(){
    return this.bets.filter(x => x.type == 1);
  }

  getScoreBets(){
    return this.bets.filter(x => x.type == 2);
  }

  getGoalsBets(){
    return this.bets.filter(x => x.type == 3);
  }

  switchBet(id:number){
    if(this.isSelectedBet(id)){
      this.unselectBet(id);
    } else {
      this.selectBet(id);
    }
  }

  selectBet(id:number){
    this.betGroupService.addBet(this.bets.find(x => x.id == id));
  }

  unselectBet(id:number){
    this.betGroupService.removeBet(this.bets.find(x => x.id == id));
  }

  isSelectedBet(id:number){
    return this.betGroupService.containsBet(id);
  }
}
