import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Colonist, NewColonist } from '../models';
import { COLONISTS_URL } from '../models/API';

interface ColonistPostRequest{
    colonist : NewColonist;
}

@Injectable()
export class ColonistAPIService{
        
    constructor(private http: Http){

    }

    saveColonist(newColonist:ColonistPostRequest): Observable<Colonist>{
        const headers = new Headers();
        headers.append('Content-type', 'application/json')
        return this.http.post(COLONISTS_URL, newColonist, { headers })
        .map( (res: Response) => res.json().colonist )
        .catch(this.handleError);
    }

   
    private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  //console.log('the error got hit');
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  
  return Observable.throw(errMsg);
}

}