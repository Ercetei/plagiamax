import { Injectable } from '@angular/core';
import { Bet } from '../models/bet.model';
import { BetType } from '../models/bet-type.model';
import { BaseService } from './base.service';
import { getLocaleDateFormat } from '@angular/common';
import { UserService } from './user.service';
import { BetLine } from '../models/bet-line.model';

@Injectable()
export class BetService {

    constructor(private baseService: BaseService, private userService: UserService) {
    }

    createCombinedBet(betTypes: BetType[], amount: number, odds: number) {

        let body = {
            status: 1,
            betamount: amount,
            odds: odds,
            betdate: new Date().toJSON(),
            user: this.userService.getCurrentUser()
        }

        console.log(body);

        /*let betlines: BetLine[] = [];
        for(let betType of betTypes){
            let betLine: BetLine = new BetLine();
            betLine.betType = betType;
            betLine.status = 1;
            betlines.push(betLine);
        }

        bet.betlines = betlines;*/

        this.baseService.http.post<Bet>(this.baseService.rootUrl + '/bet', body, {
            withCredentials: true,
            responseType: 'json'
        }).subscribe(data => console.log(data));
    }

    createSingleBet(betType: BetType, amount) {

    }
}
