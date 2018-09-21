import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Place } from '../models/place.model';
import { Team } from '../models/team.model';
import { BaseService } from './base.service';

@Injectable()
export class PlaceService {

    places: Place[] = []

    constructor(private baseService: BaseService) { 
    }

    getPlaces(id: number) : Observable<Place[]> {
       return of(this.places);
       //return this.http.get<Match[]>(this.rootUrl+'/match');
    }

    getPlace(id: number) : Observable<Place> {
        return of(this.places.find(x => x.id == id));
        //return this.http.get<Match>(this.rootUrl+'/match/'+id);
    }

    getCountriesPlaces(country: string) : Observable<Place[]> {
        return of(this.places);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getCountryPlace(country: string) : Observable<Place> {
         return of(this.places.find(x => x.country == country));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }
     getCitiesPlaces(city: string) : Observable<Place[]> {
        return of(this.places);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getCityPlace(city: string) : Observable<Place> {
         return of(this.places.find(x => x.city == city));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }
     getStadiumsPlaces(stadium: string) : Observable<Place[]> {
        return of(this.places);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getStadiumPlace(stadium: string) : Observable<Place> {
         return of(this.places.find(x => x.stadium == stadium));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }
     getTeamsPlaces(teams: Team[]) : Observable<Place[]> {
        return of(this.places);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getTeamPlace(teams: Team[]) : Observable<Place> {
         return of(this.places.find(x => x.teams == teams));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }

     getPlayersPlaces(players: any[]) : Observable<Place[]> {
        return of(this.places);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getPlayerPlace(players: any[]) : Observable<Place> {
         return of(this.places.find(x => x.players == players));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }
     getCompetitionsPlaces(competitions: any[]) : Observable<Place[]> {
        return of(this.places);
        //return this.http.get<Match[]>(this.rootUrl+'/match');
     }
 
     getCompetitionPlace(competitions: any[]) : Observable<Place> {
         return of(this.places.find(x => x.competitions == competitions));
         //return this.http.get<Match>(this.rootUrl+'/match/'+id);
     }



}