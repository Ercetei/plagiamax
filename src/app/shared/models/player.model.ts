import { Place } from "./place.model";

export class Player {
    id: number;
    lastname: string;
    firstname: string;
    status: number;
    birthdate: Date;
    place: Place;

    constructor(id: number, lastname: string = "", firstname: string = "", status: number = 0, birthdate: Date = null, place: Place = null){
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.status = status;
        this.birthdate = birthdate;
        this.place = place;
    }
}