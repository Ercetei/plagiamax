import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { Bet } from '../models/bet.model';
import { BetType } from '../models/bet-type.model';
import { Match } from '../models/match.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable()
export class BetService {

    constructor(private baseService: BaseService){
    }

    createBet(betTypes: BetType[]){
      
    }
}
