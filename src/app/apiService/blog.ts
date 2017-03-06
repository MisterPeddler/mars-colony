import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BLOG_URL } from '../models/API';


@Injectable()
export class BlogAPIService {

    constructor(private http: Http) { }

    getBlogPosts(): Observable<Response> {
        return this.http.get(BLOG_URL)
            .map((res: Response) => res.json());
    }


}