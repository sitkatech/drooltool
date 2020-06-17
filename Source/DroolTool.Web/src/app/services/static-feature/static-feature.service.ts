import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { Observable, of } from 'rxjs';
import { DistrictBoundary } from './DistrictBoundary'

@Injectable({
    providedIn: 'root'
})
export class StaticFeatureService {
    constructor(private apiService: ApiService) { }

    getWatershedMask(watershedName = "All Watersheds"): Observable<string> {
        let route = `/watershed-mask/${watershedName}/get-watershed-mask`;
        return this.apiService.getFromApi(route);
    }

    getDistrictBoundary(): Observable<object> {
        return of(DistrictBoundary);
    }
}
