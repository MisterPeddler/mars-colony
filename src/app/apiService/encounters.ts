import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { NewEncounter, Encounter } from '../models';
import { ENCOUNTERS_URL } from '../models/API';

interface EncounterPostRequest {
    encounter: NewEncounter;
}

@Injectable()
export class EncountersAPIService {

    constructor(private http: Http) { }

    saveEncounter(newEncounter: EncounterPostRequest): Observable<Encounter> {
        const headers = new Headers();
        headers.append('Content-type', 'application/json')
        return this.http.post(ENCOUNTERS_URL, newEncounter, { headers })
            .map((res: Response) => res.json().encounter);
    }

    getEncounters(): Observable<Encounter[]> {
        return this.http.get(ENCOUNTERS_URL)
            .map((res: Response) => res.json().encounters);
    }

}