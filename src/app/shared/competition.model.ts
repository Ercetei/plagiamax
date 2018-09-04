export class Competition{

    id: number;
    label: String;
    status: number;
    type:number;
    country:string;

    constructor(id: number = 0, label: string = "", status: number = 0, type:number = 0 , country:string = "") {
        this.id = id;
        this.label = label;
        this.status = status;
        this.type = type;
        this.country = country;
    }
}