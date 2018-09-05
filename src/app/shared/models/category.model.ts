import { Competition } from './competition.model';

export class Category{

    id: number;
    label: String;
    status: number;
    competitions:Competition[];

	constructor(id: number = 0, label: string = "", status: number = 0, competitions: Competition[] = []){
        this.id = id;
        this.label = label;
        this.status = status;
        this.competitions = competitions;
    }
}
