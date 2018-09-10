import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
// import { Observable, of } from 'rxjs';

import { Category } from '../models/category.model';
import { Competition } from '../models/competition.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';  // Angular 5/RxJS 5.5 syntax
import {forkJoin} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {

    // TODO: A supprimer avec la BDD
    competFoot1: Competition = new Competition(0, 'Ligue 1 Conforama', 1, 1, null, null) ;
    competFoot2: Competition = new Competition(1, 'Coupe de France', 0, 2, null, null) ;

    competFoot: Competition[] = [
        this.competFoot1,
        this.competFoot2
    ];

    // competBasket1: Competition = new Competition(0, '', 0, 1, 'FRANCE') ;

    categories: Category[] = [ 
        new Category (0, 'football', 1, this.competFoot ), 
        new Category (1, 'Basketball', 0, [] )
        ];

    readonly rootUrl = 'http://localhost:8080';

    constructor(private http: HttpClient){
    }

    getCategory(){
        return this.categories;
    }
    getCompetition(id: number) : Observable<Competition[]> {
        return of(this.categories.find(x => x.id == id).competitions);
    }

    getCompetitionBDD(id: number) : Observable<Competition> {
        return this.http.get<Competition>(this.rootUrl+'/competition/'+id);
    }
    getCompetitionBDDTest() : Observable<Category>  {

        // return forkJoin(
        //     this.http.get('http://localhost:8080/category/1')
        // );

        // this.http.get<any>('http://localhost:8080/category/1')
        // .subscribe(
        //     (response) => {
        //         console.log("test response")
        //         console.log(response);
        //     },(error)=>{
        //         console.log('error');
        //     }
        // );
        return  this.http.get<Category>(this.rootUrl+'/api/category/1');
        // return this.http.get<any>('http://localhost:8080/category/1');
    }
    // getCompetitionBDDTest(id: number) : Observable<Category>  {

    //     return this.http.get<Category>('http://localhost:8080/category/1');
    // }

}