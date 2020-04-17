import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FeatureCollection} from "geojson";
import {Observable, Subject} from "rxjs";
import {map, takeUntil} from "rxjs/operators";
import {environment} from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class WfsService {

    private getparcelIDsIntersectingUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private http: HttpClient,
    ) {
    }

    public getParcelByCoordinate(longitude: number, latitude: number): Observable<FeatureCollection> {
        const url: string = `${environment.geoserverMapServiceUrl}/wms`;
        return this.http.get<FeatureCollection>(url, {
            params: {
                service: 'WFS',
                version: '2.0',
                request: 'GetFeature',
                outputFormat: 'application/json',
                SrsName: 'EPSG:4326',
                typeName: 'DroolTool:AllParcels',
                cql_filter: `intersects(ParcelGeometry, POINT(${latitude} ${longitude}))`
            }
        });
    }

    public geoserverNeighborhoodLookup(latlng: Object): Observable<FeatureCollection> {
        let x1 = latlng['lng'];
        let y1 = latlng['lat'];
        let x2 = x1 + 0.0001;
        let y2 = y1 + 0.0001;

        var bbox = [x1, y1, x2, y2].join(",");

        console.log(bbox);

        const url: string = `${environment.geoserverMapServiceUrl}/wms`;
        return this.http.get<FeatureCollection>(url, {
            params: {
                service: 'WMS',
                version: '1.1.1',
                request: "GetFeatureInfo",
                info_format: "application/json",
                QUERY_LAYERS: 'DroolTool:Neighborhoods',
                layers: 'DroolTool:Neighborhoods',
                x: '50',
                y: '50',
                SRS: 'EPSG:4326',
                width: '101',
                height: '101',
                bbox: bbox
            }
        })
    }

    public getParcelIdsIntersecting(lon1: number, lon2: number, lat1: number, lat2: number): Observable<number[]> {
        this.getparcelIDsIntersectingUnsubscribe.next();

        const url: string = `${environment.geoserverMapServiceUrl}/wms`;
        return this.http.get(url, {
            responseType: "text",
            params: {
                service: "wfs",
                version: "2.0",
                request: "GetPropertyValue",
                SrsName: "EPSG:4326",
                typeName: "DroolTool:AllParcels",
                valueReference: "ParcelID",
                cql_filter: `bbox(ParcelGeometry,${lat1},${lon1},${lat2},${lon2})`,
            },
        })
            .pipe(
                takeUntil(this.getparcelIDsIntersectingUnsubscribe),
                map((rawData: string) => {
                    // Parse XML to retrieve nodes
                    const parcelIDNodes: HTMLCollection = new DOMParser()
                        .parseFromString(rawData, "text/xml")
                        .getElementsByTagName("heartwood:parcelId");

                    const parcelIDs: number[] = [];
                    for (let i = 0; i < parcelIDNodes.length; i++) {
                        parcelIDs.push(parseInt(parcelIDNodes[i].innerHTML))
                    }
                    return parcelIDs;
                })
            );

    }
}
