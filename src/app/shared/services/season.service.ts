import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Season } from '../models/season.model';
import { BaseService } from './base.service';

@Injectable()
export class SeasonService {

    seasons: Season[] = []

    constructor(private baseService: BaseService) { 
    }

    getSeasons(id: number) : Observable<Season[]> {
       return of(this.seasons);
       //return this.http.get<Match[]>(this.rootUrl+'/match');
    }

    getSeason(id: number) : Observable<Season> {
        return of(this.seasons.find(x => x.id == id));
        //return this.http.get<Match>(this.rootUrl+'/match/'+id);
    }
    getStartDateSeason(start_date: Date) : Observable<Season[]> {
        return of(this.seasons);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getStartDatesSeason(start_date: Date) : Observable<Season> {
         return of(this.seasons.find(x => x.start_date == start_date));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }

     getEndDateSeason(end_date: Date) : Observable<Season[]> {
        return of(this.seasons);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getEndDatessSeason(end_date: Date) : Observable<Season> {
         return of(this.seasons.find(x => x.end_date == end_date));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }
     getStatusSeason(status: number) : Observable<Season[]> {
        return of(this.seasons);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getStatuSeason(status: number) : Observable<Season> {
         return of(this.seasons.find(x => x.status == status));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }

    

}