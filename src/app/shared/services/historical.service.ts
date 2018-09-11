import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Bet } from '../models/bet.model';
import { BetLine } from '../models/bet-line.model';
import { BetType } from '../models/bet-type.model';

@Injectable()
export class HistoricalService {

    readonly rootUrl = 'http://localhost:8080';

    tabHistoBet:Bet[] = [] ;

    histoBetUser:Bet[] = [];
    histoBetUserStatus:Bet[] = [];
    // histoBet:Bet[] = [  new Bet(1, "Pari sportif", "25/08/2018", 5.00, 2, 1, null),
    //                     new Bet(2, "Pari sportif", "25/08/2018", 15.00, 1, 1, null),
    //                     new Bet(3, "Pari sportif", "25/08/2018", 5.00, 1, 2, null),
    //                     new Bet(4, "Pari sportif", "26/08/2018", 10.00, 1, 1, null)
    //                 ];

    // histoBetLine = new BetLine(1, 1, 1, 3.15);

    // histoBetType = new BetType(1, "Match", 1, 3.75, 1, 1);

    constructor(private http: HttpClient){
    }

    getHistoBetUser(tabHistoBetBDD:Bet[], userId:number){
        this.histoBetUser = [];
        for (let lineHistoBet of tabHistoBetBDD){
            if ( lineHistoBet.user.id == userId){
                this.histoBetUser.push(lineHistoBet) ;
            }
        }

        return this.histoBetUser ;
    }
    getHistoBetUserStatus(tabHistoBetBDD:Bet[], userId:number, idStatus : number){
        this.histoBetUserStatus = [];
        let histoBetUser = this.getHistoBetUser(tabHistoBetBDD, userId) ;
        for (let lineHistoBetUser of histoBetUser){
            if ( lineHistoBetUser.status == idStatus){
                this.histoBetUserStatus.push(lineHistoBetUser) ;
            }
        }
        return this.histoBetUserStatus ;
    }
    getHistoGain(tabHistoBetBDD:Bet[], userId:number){
        let histoBetUser = this.getHistoBetUser(tabHistoBetBDD, userId) ;
        let gainPotentiel: number = 0.00 ;
        for (let lineHistoBetUser of histoBetUser){
            gainPotentiel +=  lineHistoBetUser.betAmount ;
        }
        return gainPotentiel ;
    }

    getReq() : Bet[] {
        this.http.get<Bet[]>(this.rootUrl + '/bet/' , {
                        withCredentials: true
                    }).subscribe( data => { 
                                            console.log(data);
                                            this.tabHistoBet = data ;
                                        }
                    ,
                    (err: HttpErrorResponse) => {
                        if (err.error instanceof Error) {
                        console.log('Client-side error occured.');
                        } else {
                        console.log('Server-side error occured.');
                        }
                    } 
                );
        return this.tabHistoBet ;
    }
}