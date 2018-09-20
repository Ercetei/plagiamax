import { BaseService } from "./base.service";
import { BetType } from "../models/bet-type.model";
import { BetLine } from "../models/bet-line.model";
import { Bet } from "../../shared/models/bet.model";
import { Injectable } from "@angular/core";

@Injectable()
export class BetLineService {

    constructor(private baseService: BaseService) {
    }

    async createBetLine(betType: BetType, bet: Bet) {

        let body = {
            status: 1,
            bet: bet,
            bettype: betType
        }

        console.log(body);

        await this.baseService.http.post<BetLine>(this.baseService.rootUrl + '/betline', body, {
            withCredentials: true,
            responseType: 'json'
        }).subscribe(data => console.log(data));
    }
}