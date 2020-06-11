import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { Observable, BehaviorSubject } from 'rxjs';
import { FeatureCollection } from 'geojson';
import { NeighborhoodMetricDto } from 'src/app/shared/models/neighborhood-metric-dto';
import { NeighborhoodMetricAvailableDatesDto } from 'src/app/shared/models/neighborhood-metric-available-dates-dto';
import { isNullOrUndefined } from 'util';
import { DroolPerLandscapedAcreChartDto } from 'src/app/shared/models/drool-per-landscaped-acre-chart-dto';
import { NewsAndAnnouncementsDto } from 'src/app/shared/models/news-and-announcements-dto';

@Injectable({
    providedIn: 'root'
})
export class NewsAndAnnouncementsService {
    constructor(private apiService: ApiService) {
     } 

    getNewsAndAnnouncements(): Observable<NewsAndAnnouncementsDto[]> {
        let route = `/news-and-announcements/get-news-and-announcements`;
        return this.apiService.getFromApi(route);
    }
   
}
