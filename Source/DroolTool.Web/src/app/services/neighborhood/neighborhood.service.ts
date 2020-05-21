import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { Observable, Subject } from 'rxjs';
import { FeatureCollection } from 'geojson';
import { NeighborhoodMetricDto } from 'src/app/shared/models/neighborhood-metric-dto';
import { NeighborhoodMetricAvailableDatesDto } from 'src/app/shared/models/neighborhood-metric-available-dates-dto';

@Injectable({
    providedIn: 'root'
})
export class NeighborhoodService {
      
    constructor(private apiService: ApiService) { } 

    private searchedAddress = new Subject<string>();

    getSearchedAddress(): Observable<string> {
        return this.searchedAddress.asObservable();
    }

    updateSearchedAddress(address: string) {
        console.log("Updating");
        console.log(address);
        this.searchedAddress.next(address);
    }

    getNeighborhoodsWithMetricsIds(): Observable<number[]> {
        let route = `/neighborhood/get-neighborhoods-with-metrics-ids`;
        return this.apiService.getFromApi(route);
    }

    getMetricTimeline(): Observable<NeighborhoodMetricAvailableDatesDto[]> {
        let route = `/neighborhood/get-metric-timeline`;
        return this.apiService.getFromApi(route);
      }

    getMetricsForYearAndMonth(OCSurveyNeighborhoodID:number, metricYear:number, metricMonth:number): Observable<NeighborhoodMetricDto> {
        let route = `/neighborhood/${OCSurveyNeighborhoodID}/${metricYear}/${metricMonth}/get-metrics/`;
        return this.apiService.getFromApi(route);
    }

    getMostRecentMetric(): Observable<NeighborhoodMetricDto> {
        let route = `/neighborhood/get-most-recent-metric/`;
        return this.apiService.getFromApi(route);
    }

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

    getServicedNeighborhoodsWatershedNames(): Observable<string[]> {
        let route = `/neighborhood/get-serviced-neighborhoods-watershed-names/`;
        return this.apiService.getFromApi(route);
    }

    getUpstreamBackboneTrace(neighborhoodID:number): Observable<string> {
        let route = `/neighborhood/${neighborhoodID}/get-upstream-backbone-trace/`;
        return this.apiService.getFromApi(route);
    }

    getDefaultMetricDate(): Date {
        return new Date(2019, 4, 1);
    }
    
}
