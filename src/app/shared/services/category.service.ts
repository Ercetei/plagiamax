import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, of } from 'rxjs';

import { Category } from '../models/category.model';
import { Competition } from '../models/competition.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    readonly rootUrl = 'http://localhost:1234';

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
    getCompetitionBDDTest() {
        
        return this.http.get('http://localhost:1234/competition/1');
    }

}