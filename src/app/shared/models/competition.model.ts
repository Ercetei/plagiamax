import { Place } from './place.model';
import { Category } from './category.model';

export class Competition{

    id: number;
    label: string;
    status: number;
    type:number;
    // category:Category;
    // place:Place;

    constructor(id: number = 0, label: string = "", status: number = 0, type:number = 0
                // , category:Category = null, place:Place = null 
                ) {
        this.id = id;
        this.label = label;
        this.status = status;
        this.type = type;
        // this.category = category;
        // this.place = place;
    }
    
}