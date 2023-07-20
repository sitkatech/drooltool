import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { Observable } from 'rxjs';
import { AnnouncementDto } from 'src/app/shared/models/announcement/announcement-dto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AnnouncementUpsertDto } from 'src/app/shared/models/announcement/announcement-upsert-dto';

@Injectable({
    providedIn: 'root'
})
export class AnnouncementService {
    constructor(private apiService: ApiService, private httpClient: HttpClient) {
     } 

    getAnnouncements(): Observable<AnnouncementDto[]> {
        let route = `/announcement/get-announcements`;
        return this.apiService.getFromApi(route);
    }

    getAnnouncementsForHomePage(): Observable<AnnouncementDto[]> {
        let route = `/announcement/get-announcements-for-homepage`;
        return this.apiService.getFromApi(route);
    }

    upsertAnnouncement(file:any, model:AnnouncementUpsertDto): any {
        let formData = new FormData();
        formData.append('image', file);
        Object.keys(model).forEach(key => {
            if (model[key]) {
                formData.append(key, model[key]);
            }
        });
        const apiHostName = environment.apiHostName;
        const route = `https://${apiHostName}/announcement/upsert-announcement`;
        var result = this.httpClient.post<any>(
            route,
            formData
          );
      
          return result;
    }

    deleteAnnouncement(announcementID:number):any {
        let route = `/announcement/${announcementID}/delete`;
        return this.apiService.deleteToApi(route);
    }
   
}
