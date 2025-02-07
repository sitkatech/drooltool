import {Injectable} from '@angular/core';
import {
    HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NominatimService {

    private baseURL = environment.openstreetmapApiUrl;

    constructor(
        private http: HttpClient,
    ) {
    }

    public makeNominatimRequest(q:string): Observable<any> {
        let splitQuery = q.split(' ');
        const url = `${this.baseURL}?q=${splitQuery.join('+')}&format=jsonv2`;
        return this.http.get<any>(url);
    }
}
