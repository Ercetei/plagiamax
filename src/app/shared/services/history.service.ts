import { Injectable } from '@angular/core';

import { Bet } from '../models/bet.model';
import { BaseService } from './base.service';

@Injectable()
export class HistoryService {


    tabHistoBet:Bet[] = [] ;
    histoBetUser:Bet[] = [];
    histoBetUserStatus:Bet[] = [];

    constructor(){
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