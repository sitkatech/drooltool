import {Injectable} from '@angular/core';
import {
    HttpClientJsonpModule,
    HttpClient,
    HttpHeaders} from "@angular/common/http";
import {FeatureCollection} from "geojson";
import {Observable, Subject} from "rxjs";
import {map, takeUntil} from "rxjs/operators";
import {environment} from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NominatimService {

    private baseURL = environment.mapquestApiUrl;
    private mapquestApiKey = environment.mapquestApiKey;

    constructor(
        private http: HttpClient,
    ) {
    }

    public makeNominatimRequest(q:string): Observable<any> {
        const url: string = `${this.baseURL}?outFormat=json&location=${q}&boundingbox=-117.82019474260474,33.440338462792681,-117.61081200648763,33.670204787351004&bounded=1`;
        const headerDict = {
            "key": this.mapquestApiKey
          }
          
          const requestOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders(headerDict), 
          };
        return this.http.get<any>(url, requestOptions);
    }
}
