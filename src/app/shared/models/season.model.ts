export class Season {
    id: number;
    start_date: Date;
    end_date: Date;
    status: number;
    competition: any;


    constructor(id: number = 0, start_date: Date, end_date: Date, status: number = 0, competition: any = null) {
        this.id = id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
        this.competition = competition;
    }
}