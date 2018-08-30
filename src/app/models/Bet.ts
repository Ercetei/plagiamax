export class Bet{

    public id: number;
    public label: string;
    public odds: number;
    public type: number;

	constructor(id: number = 0, label: string = "", odds: number = 0, type: number = 0){
        this.id = id;
        this.label = label;
        this.odds = odds;
        this.type = type;
    }
}