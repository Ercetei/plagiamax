import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, of } from 'rxjs';

import { Category } from '../shared/category.model';
import { Competition } from '../shared/competition.model';

@Injectable()
export class CategoryService {

    // TODO: A supprimer avec la BDD
    competFoot1: Competition = new Competition(0, 'Ligue 1 Conforama', 1, 1, 'FRANCE') ;
    competFoot2: Competition = new Competition(1, 'Coupe de France', 0, 2, 'FRANCE') ;

    competFoot: Competition[] = [
        this.competFoot1,
        this.competFoot2
    ];

    // competBasket1: Competition = new Competition(0, '', 0, 1, 'FRANCE') ;

    categories: Category[] = [ 
        new Category (0, 'Football', 1, this.competFoot ), 
        new Category (1, 'Basketball', 0, [] )
        ];

    constructor(){
    }


    getCompetition(id: number) : Observable<Competition[]> {
        return of(this.categories.find(x => x.id == id).competitions);
    }

}