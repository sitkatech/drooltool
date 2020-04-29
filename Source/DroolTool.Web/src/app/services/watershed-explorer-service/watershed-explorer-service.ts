import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { Observable } from 'rxjs';
import { FeatureCollection } from 'geojson';
import { DroolWatershedMetricDto } from 'src/app/shared/models/drool-watershed-metric-dto';

@Injectable({
    providedIn: 'root'
})
export class WatershedExplorerService {
    constructor(private apiService: ApiService) { }

    getMetrics(OCSurveyNeighborhoodID:number): Observable<DroolWatershedMetricDto> {
        let route = `/watershed-explorer/get-metrics/${OCSurveyNeighborhoodID}`;
        return this.apiService.getFromApi(route);
    }
}
