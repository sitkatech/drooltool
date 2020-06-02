import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { Observable, BehaviorSubject } from 'rxjs';
import { FeatureCollection } from 'geojson';
import { NeighborhoodMetricDto } from 'src/app/shared/models/neighborhood-metric-dto';
import { NeighborhoodMetricAvailableDatesDto } from 'src/app/shared/models/neighborhood-metric-available-dates-dto';
import { isNullOrUndefined } from 'util';
import { DroolPerLandscapedAcreChartDto } from 'src/app/shared/models/drool-per-landscaped-acre-chart-dto';

@Injectable({
    providedIn: 'root'
})
export class NeighborhoodService {

    private _searchedAddressSubject: BehaviorSubject<string>;
      
    constructor(private apiService: ApiService) {
        let searchedAddressAsJson = window.localStorage.getItem('searchedAddress');
        let initialSearchedAddress = "My Selected Neighborhood";

        if (!isNullOrUndefined(searchedAddressAsJson) && searchedAddressAsJson !== "undefined") {
            // if the saved account is valid for this user, make it the current active account. Otherwise clear it from local storage.
            initialSearchedAddress = JSON.parse(searchedAddressAsJson);
        }

        this._searchedAddressSubject = new BehaviorSubject<string>(initialSearchedAddress);
     } 

    getSearchedAddress(): Observable<string> {
        return this._searchedAddressSubject.asObservable();
    }

    updateSearchedAddress(address: string) {
        window.localStorage.setItem('searchedAddress', JSON.stringify(address));
        this._searchedAddressSubject.next(address);
    }

    getNeighborhoodsWithMetricsIds(): Observable<number[]> {
        let route = `/neighborhood/get-neighborhoods-with-metrics-ids`;
        return this.apiService.getFromApi(route);
    }

    getMetricTimeline(): Observable<NeighborhoodMetricAvailableDatesDto[]> {
        let route = `/neighborhood/get-metric-timeline`;
        return this.apiService.getFromApi(route);
      }

    getMetricsForYear(OCSurveyNeighborhoodID:number, metricEndYear: number, metricEndMonth:number): Observable<NeighborhoodMetricDto[]> {
        let route = `/neighborhood/${OCSurveyNeighborhoodID}/${metricEndYear}/${metricEndMonth}/get-metrics-for-year/`;
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

    getDroolPerLandscapedAcreChart(neighborhoodID: number): Observable<DroolPerLandscapedAcreChartDto[]>{
        let route = `neighborhood/get-drool-per-landscaped-acre-chart/${neighborhoodID}`;
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
