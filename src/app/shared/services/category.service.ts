import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject,  Observable, of } from 'rxjs';

import { Category } from '../models/category.model';
import { Competition } from '../models/competition.model';

// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

@Injectable()
export class CategoryService {

    // TODO: A supprimer avec la BDD
    // competFoot1: Competition = new Competition(0, 'Ligue 1 Conforama', 1, 1, null, null) ;
    // competFoot2: Competition = new Competition(1, 'Coupe de France', 0, 2, null, null) ;

    // competFoot: Competition[] = [
    //     this.competFoot1,
    //     this.competFoot2
    // ];

    // competBasket1: Competition = new Competition(0, '', 0, 1, 'FRANCE') ;
    tabCategoriesBDD:Category[]=[];
    // categories: Category[] = [ 
    //     new Category (0, 'football', 1, this.competFoot ), 
    //     new Category (1, 'Basketball', 0, [] )
    //     ];

    readonly rootUrl = 'http://localhost:8080';

    constructor(private http: HttpClient){
    }

    // getCategory(){
    //     return this.categories;
    // }
    // getCompetition(id: number) : Observable<Competition[]> {
    //     return of(this.categories.find(x => x.id == id).competitions);
    // }

    // getCompetitionBDD(id: number) : Observable<Category> {
    //     return this.http.get<Category>(this.rootUrl+'/category/'+id);
    // }

    // getCompetitionBDDTest(id: number) : Observable<Category>  {
    //     return this.http.get<Category>('http://localhost:8080/category/1');
    // }

    getCompetitionBDDTestBis() : Category[] {
        this.http.get<Category[]>(this.rootUrl + '/category/' , {
                        withCredentials: true
                    }).subscribe( data => { 
                                            console.log(data);
                                            this.tabCategoriesBDD = data ;
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
        return this.tabCategoriesBDD ;
    }


}