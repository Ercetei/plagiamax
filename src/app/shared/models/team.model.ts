export class Team {
    id: number;
    label: string;

    constructor(id: number, label: string = ""){
        this.id = id;
        this.label = label;
    }
}