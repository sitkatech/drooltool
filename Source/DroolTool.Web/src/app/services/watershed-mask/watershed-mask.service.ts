import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WatershedMaskService {
    constructor(private apiService: ApiService) { }

    getWatershedMask(watershedName = "All Watersheds"): Observable<string> {
        let route = `/watershed-mask/${watershedName}/get-watershed-mask`;
        return this.apiService.getFromApi(route);
    }
}
