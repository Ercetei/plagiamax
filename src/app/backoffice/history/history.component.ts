import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../shared/services/history.service';
import { Bet } from '../../shared/models/bet.model';
import { BaseService } from '../../shared/services/base.service';
import {User} from "../../shared/models/user.model";
import {UserService} from "../../shared/services/user.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  tabStatus = [
    { id: 0, status: 'Tout' },
    { id: 1, status: 'En cours' },
    { id: 2, status: 'Terminé' }
  ];

  betStatus = [
    { status: '0' },
    { status: 'En cours' },
    { status: 'Gagné' },
    { status: 'Perdu' }
  ];

  typeBet = [
    { label: "0" },
    { label: "Vainqueur" },
    { label: "Score exact" },
    { label: "But" }
  ];

  statusSelected;

  //allBetUser:[Bet];
  allBetUser: [
    {
      id: number,
      label?: string,
      betlines: [
        {
          id: number,
          label?: string,
          status: number,
          bettype: {
            id: number,
            label: string,
            initialodds: number,
            currentodds: number,
            status: number,
            type: number
          }
        }
      ],
      betdate: Date,
      betamount: number,
      status: number,
      momentodds: number
    }
  ]
  processingBetsUser: any[];
  oldBetsUser: any[];
  betDisplayer: any[any];

  gain: number = 0;
  newVal: number = 0;

  isAuthentified: Boolean = !!localStorage.getItem('userToken');
  currentUser:User;

  constructor(private userService: UserService, private baseService: BaseService, private modalService: NgbModal) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit() {
    const parent = this;
    let maskArrayProcessing = new Array;
    let maskArrayOld = new Array;

    this.baseService.get("/user/" + this.currentUser.id + "/bets").then(data => {
      parent.allBetUser = data;

      // Search for the teams name
      parent.allBetUser.forEach(element => {

        // if combinet bet
        if (element.betlines.length > 1) {
          element.label = "Paris combiné";
          element.betlines.forEach(bl => {
            this.baseService.get("/bettype/" + bl.bettype.id + "/teams").then(dataTeams => {
              let teams: string = "";

              dataTeams.forEach((labelTeam, index) => {
                if (index == 0) {
                  teams += labelTeam.label + " - ";
                } else {
                  teams += labelTeam.label;
                }   
              });

              bl.label = teams;
            });
          });

          // if simple bet
        } else {
          this.baseService.get("/bettype/" + element.betlines[0].bettype.id + "/teams").then(dataTeams => {
            let teams: string = "";

            dataTeams.forEach((labelTeam, index) => {
              if (index == 0) {
                teams += labelTeam.label + " - ";
              } else {
                teams += labelTeam.label;
              }
            });

            element.label = teams;
          });
        }
      });

      parent.betDisplayer = data;
      parent.allBetUser.forEach(element => {
        if (element.status == 1) {
          maskArrayProcessing.push(element);
        } else {
          maskArrayOld.push(element);
        }
      });
      parent.oldBetsUser = maskArrayOld;
      parent.processingBetsUser = maskArrayProcessing;

      this.statusSelected = this.tabStatus[0].id;
    });
  }

  public onChange(event): void {
    this.newVal = event.target.value;
    if (this.newVal == 0) {
      this.betDisplayer = this.allBetUser;
    } else if (this.newVal == 2) {
      this.betDisplayer = this.oldBetsUser;
    } else {
      this.betDisplayer = this.processingBetsUser;
    }
  }


  getHistoGain(bet: Bet) {
    let gainPotentiel: number = 0.00;
    let oddsTotal: number = 0.00;

    oddsTotal = bet.momentodds;


    gainPotentiel = bet.betamount * oddsTotal;

    return gainPotentiel;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:"lg"}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
