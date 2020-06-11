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

    upsertNewsAndAnnouncements(file:any, model:NewsAndAnnouncementsUpsertDto): Observable<NewsAndAnnouncementsDto> {
        const apiHostName = environment.apiHostName
        console.log(file.type);
        const route = `https://${apiHostName}/news-and-announcements/upsert-news-and-announcements/${model}`;
        var result = this.httpClient.post<any>(
            route,
            file, // Send the File Blob as the POST body.
            {
              // NOTE: Because we are posting a Blob (File is a specialized Blob
              // object) as the POST body, we have to include the Content-Type
              // header. If we don't, the server will try to parse the body as
              // plain text.
              headers: {
                "Content-Type": file.type
              },
              params: {
                clientFilename: file.name,
                mimeType: file.type
              }
            }
          );
      
          return result;
    }
   
}
