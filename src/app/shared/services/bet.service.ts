import { Injectable } from '@angular/core';
import { Bet } from '../models/bet.model';
import { BetType } from '../models/bet-type.model';
import { BaseService } from './base.service';
import { UserService } from './user.service';
import { BetLineService } from './bet-line.service';
import { when } from 'q';

@Injectable()
export class BetService {

    constructor(private baseService: BaseService, private userService: UserService, private betLineService: BetLineService) {
    }

    async createBet(betTypes: BetType[], amount: number, odds: number) {

        let body = {
            status: 1,
            betamount: amount,
            momentodds: odds,
            betdate: new Date().toJSON(),
            user: this.userService.getCurrentUser()
        }

        console.log(body);

        let bet: Bet;
        await this.baseService.http.post<Bet>(this.baseService.rootUrl + '/bet', body, {
            withCredentials: true,
            responseType: 'json'
        }).subscribe(async (data: Bet) => {
            console.log(data);
            bet = await data;
            for(let betType of betTypes){
                this.betLineService.createBetLine(betType, bet);
            }
        });
        this.userService.removeFromWallet(amount);
    }
}
