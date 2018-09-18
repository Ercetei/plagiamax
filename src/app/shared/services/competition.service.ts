import { Injectable } from '@angular/core';
import { Competition } from '../models/competition.model';
import { Subject } from '../../../../node_modules/rxjs';


@Injectable()
export class CompetitionService {

    protected selectedCompetition: Competition ;

    public competitionSubject = new Subject;

    emitSelectedCompetitionSubject() {
        this.competitionSubject.next(this.selectedCompetition);
    }

    
    setSelectedCompetition(selectedCompetition: Competition){
        this.selectedCompetition = selectedCompetition;
    }
    getSelectedCompetition(){
        return this.selectedCompetition;
    }

}
