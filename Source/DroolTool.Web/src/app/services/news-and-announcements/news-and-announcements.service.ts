import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { Observable, BehaviorSubject } from 'rxjs';
import { FeatureCollection } from 'geojson';
import { NeighborhoodMetricDto } from 'src/app/shared/models/neighborhood-metric-dto';
import { NeighborhoodMetricAvailableDatesDto } from 'src/app/shared/models/neighborhood-metric-available-dates-dto';
import { isNullOrUndefined } from 'util';
import { DroolPerLandscapedAcreChartDto } from 'src/app/shared/models/drool-per-landscaped-acre-chart-dto';
import { NewsAndAnnouncementsDto } from 'src/app/shared/models/news-and-announcements/news-and-announcements-dto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NewsAndAnnouncementsUpsertDto } from 'src/app/shared/models/news-and-announcements/news-and-announcements-upsert-dto';

@Injectable({
    providedIn: 'root'
})
export class NewsAndAnnouncementsService {
    constructor(private apiService: ApiService, private httpClient: HttpClient) {
     } 

    getNewsAndAnnouncements(): Observable<NewsAndAnnouncementsDto[]> {
        let route = `/news-and-announcements/get-news-and-announcements`;
        return this.apiService.getFromApi(route);
    }

    getNewsAndAnnouncementsForHomePage(): Observable<NewsAndAnnouncementsDto[]> {
        let route = `/news-and-announcements/get-news-and-announcements-for-homepage`;
        return this.apiService.getFromApi(route);
    }

    upsertNewsAndAnnouncements(file:any, model:NewsAndAnnouncementsUpsertDto): any {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('model', JSON.stringify(model));
        const apiHostName = environment.apiHostName;
        const route = `https://${apiHostName}/news-and-announcements/upsert-news-and-announcements`;
        var result = this.httpClient.post<any>(
            route,
            formData
          );
      
          return result;
    }

    deleteNewsAndAnnouncements(newsAndAnnouncementsID:number):any {
        let route = `/news-and-announcements/${newsAndAnnouncementsID}/delete`;
        return this.apiService.deleteToApi(route);
    }
   
}
