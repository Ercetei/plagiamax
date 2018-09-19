import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Bet } from '../models/bet.model';
import { BaseService } from './base.service';
// import { BetLine } from '../models/bet-line.model';
// import { BetType } from '../models/bet-type.model';

@Injectable()
export class HistoryService {

    // readonly rootUrl = 'http://localhost:8080';

    tabHistoBet:Bet[] = [] ;
    histoBetUser:Bet[] = [];
    histoBetUserStatus:Bet[] = [];
    
    // histoBet:Bet[] = [  new Bet(1, "Pari sportif", "25/08/2018", 5, 2, 1, null),
    //                     new Bet(2, "Pari sportif", "25/08/2018", 15, 1, 1, null),
    //                     new Bet(3, "Pari sportif", "25/08/2018", 5, 1, 2, null),
    //                     new Bet(4, "Pari sportif", "26/08/2018", 10, 1, 1, null)
    //                 ];

    // histoBetLine = new BetLine(1, 1, 1, 3.15);

    // histoBetType = new BetType(1, "Match", 1, 3.75, 1, 1);

    constructor(private baseService: BaseService){
    }

    getHistoBetUserStatus(histoBetUser:Bet[], userId:number, idStatus : number){
        this.histoBetUserStatus = [];
        for (let lineHistoBetUser of histoBetUser){
            if ( lineHistoBetUser.status == idStatus){
                this.histoBetUserStatus.push(lineHistoBetUser) ;
            }
        }
        return this.histoBetUserStatus ;
    }

}