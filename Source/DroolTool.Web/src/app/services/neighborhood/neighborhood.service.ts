import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { Observable } from 'rxjs';
import { FeatureCollection } from 'geojson';

@Injectable({
    providedIn: 'root'
})
export class NeighborhoodService {
    constructor(private apiService: ApiService) { }

    getServicedNeighborhoodIds(): Observable<number[]> {
        let route = `/neighborhood/get-serviced-neighborhood-ids`;
        return this.apiService.getFromApi(route);
    }

    getStormshed(neighborhoodID:number): Observable<string> {
        let route = `/neighborhood/${neighborhoodID}/get-stormshed/`;
        return this.apiService.getFromApi(route);
    }

    getDownstreamBackboneTrace(neighborhoodID:number): Observable<string> {
        let route = `/neighborhood/${neighborhoodID}/get-downstream-backbone-trace/`;
        return this.apiService.getFromApi(route);
    }

    getUpstreamBackboneTrace(neighborhoodID:number): Observable<string> {
        let route = `/neighborhood/${neighborhoodID}/get-upstream-backbone-trace/`;
        return this.apiService.getFromApi(route);
    }
    
}