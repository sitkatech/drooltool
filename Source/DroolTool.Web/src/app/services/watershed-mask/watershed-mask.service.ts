import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WatershedMaskService {
    constructor(private apiService: ApiService) { }

    getMask(): Observable<string> {
        let route = `/watershed-mask/get-mask`;
        return this.apiService.getFromApi(route);
    }
}
