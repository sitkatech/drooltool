import { AfterViewInit, ApplicationRef, ChangeDetectionStrategy, Component, EventEmitter, OnInit} from '@angular/core';
import * as L from 'leaflet';
import { BoundingBoxDto } from '../../shared/models/bounding-box-dto';
import { CustomCompileService } from '../../shared/services/custom-compile.service';

@Component({
  selector: 'drooltool-neighborhood-explorer',
  templateUrl: './neighborhood-explorer.component.html',
  styleUrls: ['./neighborhood-explorer.component.scss']
})
export class NeighborhoodExplorerComponent implements OnInit {

  public zoomMapToDefaultExtent = true;
    public defaultFitBoundsOptions?: L.FitBoundsOptions = null;
    public afterSetControl = new EventEmitter();
    public afterLoadMap = new EventEmitter();
    public onMapMoveEnd = new EventEmitter();

    public component: any;

    public mapID = "NeighborhoodExplorerMap";
    public mapHeight = window.innerHeight + "px";
    public map: L.Map;
    public featureLayer: any;
    public layerControl: L.Control.Layers;
    public tileLayers: { [key: string]: any } = {};
    public overlayLayers: { [key: string]: any } = {};
    
    boundingBox: BoundingBoxDto;

    constructor(
        private appRef: ApplicationRef,
        private compileService: CustomCompileService
    ) {
    }

    public ngOnInit(): void {
        // Default bounding box
        this.boundingBox = new BoundingBoxDto();
        this.boundingBox.Left = -119.075;
        this.boundingBox.Bottom = 35.442022035628575;
        this.boundingBox.Right = -119.425;
        this.boundingBox.Top = 35.27608156273151;

        this.tileLayers = Object.assign({}, {
            "Aerial": L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Aerial',
                maxNativeZoom: 16,
                maxZoom: 22
            }),
            "Street": L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Street',
                maxNativeZoom: 16,
                maxZoom: 22
            }),
            "Terrain": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Terrain',
                maxNativeZoom: 16,
                maxZoom: 22
            }),
            "Hillshade": L.tileLayer('https://wtb.maptiles.arcgis.com/arcgis/rest/services/World_Topo_Base/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Hillshade',
                maxNativeZoom: 15,
                maxZoom: 22
            })
        }, this.tileLayers);

        this.compileService.configure(this.appRef);
    }

    public ngAfterViewInit(): void {

        const mapOptions: L.MapOptions = {
            minZoom: 6,
            maxZoom: 22,
            layers: [
                this.tileLayers["Hillshade"],
            ],
            
        } as L.MapOptions;
        this.map = L.map(this.mapID, mapOptions);

        this.map.on('load', (event: L.LeafletEvent) => {
            this.afterLoadMap.emit(event);
        });
        this.map.on("moveend", (event: L.LeafletEvent) => {
            this.onMapMoveEnd.emit(event);
        });
        this.map.fitBounds([[this.boundingBox.Bottom, this.boundingBox.Left], [this.boundingBox.Top, this.boundingBox.Right]], this.defaultFitBoundsOptions);
        this.map.setZoom(10);
        
        this.setControl();
        
    }

    public setControl(): void {
        this.layerControl = new L.Control.Layers(this.tileLayers, this.overlayLayers)
            .addTo(this.map);
        this.afterSetControl.emit(this.layerControl);
    }
}
