import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { NewEncounter, Encounter } from '../models';
import { ENCOUNTERS_URL } from '../models/API';

interface EncounterPostRequest{
    encounter : NewEncounter;
}

@Injectable()
export class EncountersAPIService {

    constructor(private http: Http) {}

//newColonist:ColonistPostRequest
    saveEncounter(newEncounter:EncounterPostRequest): Observable<Encounter>{
        const headers = new Headers();
        headers.append('Content-type', 'application/json')
        return this.http.post(ENCOUNTERS_URL, newEncounter, { headers })
        .map( (res: Response) => res.json().encounter );
    }

     getEncounters(): Observable<Encounter[]> {
        return this.http.get(ENCOUNTERS_URL)
            .map((res: Response) => res.json().encounters);
    }


//SENT
//     {
//     "encounter" : {
//         "atype" : "Octospider",
//         "date" : "2015-10-01",
//         "action" : "Web developer.",
//         "colonist_id" : "4"
//     }
// }


//RECEIVED
// {
//   "encounter": {
//     "id": 584,
//     "date": "2015-10-01",
//     "colonist_id": 4,
//     "atype": "Octospider",
//     "action": "Web developer."
//   }
// }

//RECEIVED


    // saveColonist(newColonist:ColonistPostRequest): Observable<Colonist>{
    //     const headers = new Headers();
    //     headers.append('Content-type', 'application/json')
    //     return this.http.post(COLONISTS_URL, newColonist, { headers })
    //     .map( (res: Response) => res.json().colonist )
    //     .catch(this.handleError);
    // }

}