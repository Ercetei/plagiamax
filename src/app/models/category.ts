import { Competition } from './competition';

export class Category{

    // tabCompetition:Competition[];

	constructor( public idCategory:number,
                public label:string,
                public status:number, 
                public tabCompetition:Competition[] ){
        // this.tabCompetition = [];
	}

}