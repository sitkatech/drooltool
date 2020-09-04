import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services';
import { Observable } from 'rxjs';
import { FeedbackDto } from 'src/app/shared/models/feedback-dto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    constructor(private apiService: ApiService, private httpClient: HttpClient) {
     }

    provideFeedback(model:FeedbackDto, token:string): any {
        let formData = new FormData();
        formData.append('token', token);
        Object.keys(model).forEach(key => {
            if (model[key]) {
                formData.append(key, model[key]);
            }
        });

        const apiHostName = environment.apiHostName;
        const route = `https://${apiHostName}/feedback/provide-feedback`;
        var result = this.httpClient.post<any>(
            route,
            formData
          );
      
          return result;
    }
}
