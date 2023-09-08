/**
 * DroolTool.API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { AnnouncementDto } from '../model/announcement-dto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../services';


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration
    , private apiService: ApiService) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param announcementID 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public announcementAnnouncementIDDeleteDelete(announcementID: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public announcementAnnouncementIDDeleteDelete(announcementID: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public announcementAnnouncementIDDeleteDelete(announcementID: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public announcementAnnouncementIDDeleteDelete(announcementID: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (announcementID === null || announcementID === undefined) {
            throw new Error('Required parameter announcementID was null or undefined when calling announcementAnnouncementIDDeleteDelete.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/announcement/${encodeURIComponent(String(announcementID))}/delete`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public announcementGetAnnouncementsForHomepageGet(observe?: 'body', reportProgress?: boolean): Observable<Array<AnnouncementDto>>;
    public announcementGetAnnouncementsForHomepageGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AnnouncementDto>>>;
    public announcementGetAnnouncementsForHomepageGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AnnouncementDto>>>;
    public announcementGetAnnouncementsForHomepageGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json',
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<AnnouncementDto>>(`${this.basePath}/announcement/get-announcements-for-homepage`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public announcementGetAnnouncementsGet(observe?: 'body', reportProgress?: boolean): Observable<Array<AnnouncementDto>>;
    public announcementGetAnnouncementsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AnnouncementDto>>>;
    public announcementGetAnnouncementsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AnnouncementDto>>>;
    public announcementGetAnnouncementsGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json',
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<AnnouncementDto>>(`${this.basePath}/announcement/get-announcements`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

    /**
     * 
     * 
     * @param announcementID 
     * @param announcementTitle 
     * @param announcementDate 
     * @param announcementLink 
     * @param imageFile 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public announcementUpsertAnnouncementPost(announcementID?: number, announcementTitle?: string, announcementDate?: string, announcementLink?: string, imageFile?: Blob, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public announcementUpsertAnnouncementPost(announcementID?: number, announcementTitle?: string, announcementDate?: string, announcementLink?: string, imageFile?: Blob, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public announcementUpsertAnnouncementPost(announcementID?: number, announcementTitle?: string, announcementDate?: string, announcementLink?: string, imageFile?: Blob, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public announcementUpsertAnnouncementPost(announcementID?: number, announcementTitle?: string, announcementDate?: string, announcementLink?: string, imageFile?: Blob, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {






        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'multipart/form-data',
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void | HttpParams; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (announcementID !== undefined) {
            formParams = formParams.append('AnnouncementID', <any>announcementID) || formParams;
        }
        if (announcementTitle !== undefined) {
            formParams = formParams.append('AnnouncementTitle', <any>announcementTitle) || formParams;
        }
        if (announcementDate !== undefined) {
            formParams = formParams.append('AnnouncementDate', <any>announcementDate) || formParams;
        }
        if (announcementLink !== undefined) {
            formParams = formParams.append('AnnouncementLink', <any>announcementLink) || formParams;
        }
        if (imageFile !== undefined) {
            formParams = formParams.append('ImageFile', <any>imageFile) || formParams;
        }

        return this.httpClient.post<any>(`${this.basePath}/announcement/upsert-announcement`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

}
