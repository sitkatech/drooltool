import {Injectable} from '@angular/core';
import {
    HttpClientJsonpModule,
    HttpClient} from "@angular/common/http";
import {FeatureCollection} from "geojson";
import {Observable, Subject} from "rxjs";
import {map, takeUntil} from "rxjs/operators";
import {environment} from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NominatimService {

    //move to environment variable
    private nominatimKey = "mSMCuGwTHIiqgLeT7ODwVM1udF9RaL2H";
    private baseURL = "https://open.mapquestapi.com/nominatim/v1/search.php?key=" + this.nominatimKey;

    constructor(
        private http: HttpClient,
    ) {
    }

    public makeNominatimRequest(q:string): Observable<any> {
        const url: string = `${this.baseURL}&format=json&q=${q}&viewbox=-117.82019474260474,33.440338462792681,-117.61081200648763,33.670204787351004&bounded=1`;
        console.log(url);
        return this.http.get<any>(url);
    }
}
