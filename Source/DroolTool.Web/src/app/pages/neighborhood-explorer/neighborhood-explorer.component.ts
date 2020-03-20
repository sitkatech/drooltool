import { AfterViewInit, ApplicationRef, ChangeDetectionStrategy, Component, EventEmitter, OnInit} from '@angular/core';
import { environment } from "src/environments/environment";
import * as L from 'leaflet';
import '../../../../node_modules/leaflet.snogylop/src/leaflet.snogylop.js';
import * as esri from 'esri-leaflet'
import { BoundingBoxDto } from '../../shared/models/bounding-box-dto';
import { CustomCompileService } from '../../shared/services/custom-compile.service';
import { NeighborhoodExplorerService } from 'src/app/services/neighborhood-explorer/neighborhood-explorer.service'

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
    public maskLayer: any;
    
    boundingBox: BoundingBoxDto;

    constructor(
        private appRef: ApplicationRef,
        private compileService: CustomCompileService,
        private neighborhoodExplorerService : NeighborhoodExplorerService
    ) {
    }

    public ngOnInit(): void {

        // Default bounding box
        this.boundingBox = new BoundingBoxDto();
        this.boundingBox.Left = -117.36883651141554;
        this.boundingBox.Bottom = 33.45695062823788;
        this.boundingBox.Right = -117.82471349197476;
        this.boundingBox.Top = 33.71689407051289;

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

        let neighborhoodsWMSOptions = ({
          layers: "OCStormwater:Neighborhoods",
          transparent: true,
          format: "image/png",
          tiled: true
        } as L.WMSOptions);

        let backboneWMSOptions = ({
          layers: "OCStormwater:Backbone",
          transparent: true,
          format: "image/png",
          tiled: true
        } as L.WMSOptions);

        let watershedsWMSOptions = ({
          layers: "OCStormwater:DroolToolWatersheds",
          transparent: true,
          format: "image/png",
          tiled: true
        } as L.WMSOptions);



        this.overlayLayers = Object.assign({}, {
          "Neighborhoods": L.tileLayer.wms(environment.geoserverMapServiceUrl + "/wms?", neighborhoodsWMSOptions),
          "Streams": L.tileLayer.wms(environment.geoserverMapServiceUrl + "/wms?", backboneWMSOptions),
          "Watersheds": L.tileLayer.wms(environment.geoserverMapServiceUrl + "/wms?", watershedsWMSOptions),
          "Stormwater Network": esri.dynamicMapLayer({url:"https://ocgis.com/arcpub/rest/services/Flood/Stormwater_Network/MapServer/"})
        })

        this.compileService.configure(this.appRef);
    }

    public ngAfterViewInit(): void {

      this.neighborhoodExplorerService.getMask().subscribe(maskString => {
        this.maskLayer = L.geoJSON(maskString, {
                                        invert: true,
                                        style: function (feature) {
                                            return {
                                                fillColor: "#323232",
                                                fill: true,
                                                fillOpacity: 0.4,
                                                color: "#3388ff",
                                                weight: 5,
                                                stroke: true
                                            };
                                        }
                                    });

          const mapOptions: L.MapOptions = {
            minZoom: 6,
            maxZoom: 22,
            layers: [
                this.tileLayers["Hillshade"],
                this.overlayLayers["Streams"],
                this.overlayLayers["Watersheds"]
            ],
            
        } as L.MapOptions;

        this.map = L.map(this.mapID, mapOptions);

        this.map.on('load', (event: L.LeafletEvent) => {
            this.afterLoadMap.emit(event);
        });
        this.map.on("moveend", (event: L.LeafletEvent) => {
            this.onMapMoveEnd.emit(event);
        });
        this.map.fitBounds(this.maskLayer.getBounds(), this.defaultFitBoundsOptions);
        this.map.setZoom(12);
        
        this.setControl();
        this.maskLayer.addTo(this.map);
      });              
    }

    public setControl(): void {
        this.layerControl = new L.Control.Layers(this.tileLayers, this.overlayLayers)
            .addTo(this.map);
        this.afterSetControl.emit(this.layerControl);
    }
}
