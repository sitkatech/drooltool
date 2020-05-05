import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { Observable } from 'rxjs';
import { FeatureCollection } from 'geojson';
import { DroolWatershedMetricDto } from 'src/app/shared/models/drool-watershed-metric-dto';

@Injectable({
    providedIn: 'root'
})
export class WatershedService {
    constructor(private apiService: ApiService) { }

    getMetrics(OCSurveyNeighborhoodID:number): Observable<DroolWatershedMetricDto> {
        let route = `/watershed/${OCSurveyNeighborhoodID}/get-metrics/`;
        return this.apiService.getFromApi(route);
    }

    getMostRecentMetric(): Observable<DroolWatershedMetricDto> {
        let route = `/watershed/get-most-recent-metric/`;
        return this.apiService.getFromApi(route);
    }

    getWatershedNames(): Observable<Array<string>> {
        let route = `/watershed/get-watershed-names`;
        return this.apiService.getFromApi(route);
    }

    getWatershedMask(watershedName: string): Observable<string> {
        let route = `/watershed/${watershedName}/get-watershed-mask`;
        return this.apiService.getFromApi(route);
    }
}
