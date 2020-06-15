import { AfterViewInit, ApplicationRef, ChangeDetectionStrategy, Component, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from "src/environments/environment";
import * as L from 'leaflet';
import { GestureHandling } from "leaflet-gesture-handling";
import '../../../../node_modules/leaflet.snogylop/src/leaflet.snogylop.js';
import '../../../../node_modules/leaflet.fullscreen/Control.FullScreen.js';
import '../../../../node_modules/leaflet-loading/src/Control.Loading.js';
import * as esri from 'esri-leaflet'
import { CustomCompileService } from '../../shared/services/custom-compile.service';
import { NeighborhoodService } from 'src/app/services/neighborhood/neighborhood.service';
import { StaticFeatureService } from 'src/app/services/static-feature/static-feature.service';
import { NominatimService } from '../../shared/services/nominatim.service';
import { WfsService } from '../../shared/services/wfs.service';
import { FeatureCollection } from 'geojson';
import { NeighborhoodMetricDto } from 'src/app/shared/models/neighborhood-metric-dto.js';
import { forkJoin } from 'rxjs';

declare var $: any;

@Component({
  selector: 'drooltool-neighborhood-explorer',
  templateUrl: './neighborhood-explorer.component.html',
  styleUrls: ['./neighborhood-explorer.component.scss']
})
export class NeighborhoodExplorerComponent implements OnInit {
  @ViewChild("mapDiv") mapElement: ElementRef;

  public defaultMapZoom = 12;
  public afterSetControl = new EventEmitter();
  public afterLoadMap = new EventEmitter();
  public onMapMoveEnd = new EventEmitter();
  public layerControlOpen: boolean = false;

  public component: any;

  public mapID = "NeighborhoodExplorerMap";
  public mapHeight = window.innerHeight + "px";
  public map: L.Map;
  public featureLayer: any;
  public layerControl: L.Control.Layers;
  public tileLayers: { [key: string]: any } = {};
  public overlayLayers: { [key: string]: any } = {};
  public maskLayer: any;
  public neighborhoodsWhereItIsOkayToClickIDs: number[];

  public wmsParams: any;
  public stormshedLayer: L.Layers;
  public backboneDetailLayer: L.Layers;
  public traceLayer: L.Layers;
  public currentSearchLayer: L.Layers;
  public currentMask: L.Layers;
  public clickMarker: L.Marker;
  public traceActive: boolean = false;
  public showInstructions: boolean = true;
  public searchActive: boolean = false;
  public searchAddress: string;
  public activeSearchNotFound: boolean = false;
  public currentlySearching: boolean = false;

  public selectedNeighborhoodProperties: any;
  public selectedNeighborhoodMetrics: NeighborhoodMetricDto;
  public selectedNeighborhoodID: number;
  public selectedNeighborhoodWatershed: string;
  public selectedNeighborhoodWatershedMask: L.Layers;
  public defaultSelectedMetricDate: Date;

  public areMetricsCollapsed: boolean = true;

  public months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  districtBoundaryLayer: any;

  constructor(
    private appRef: ApplicationRef,
    private compileService: CustomCompileService,
    private neighborhoodService: NeighborhoodService,
    private staticFeatureService: StaticFeatureService,
    private nominatimService: NominatimService,
    private wfsService: WfsService
  ) {
  }

  public ngOnInit(): void {

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
      layers: "DroolTool:Neighborhoods",
      transparent: true,
      format: "image/png",
      tiled: true,
      pane: "droolToolOverlayPane"
    } as L.WMSOptions);

    let backboneWMSOptions = ({
      layers: "DroolTool:Backbones",
      transparent: true,
      format: "image/png",
      tiled: true,
      pane: "droolToolOverlayPane"
    } as L.WMSOptions);

    let watershedsWMSOptions = ({
      layers: "DroolTool:Watersheds",
      transparent: true,
      format: "image/png",
      tiled: true,
      pane: "droolToolOverlayPane"
    } as L.WMSOptions);



    this.overlayLayers = Object.assign({}, {
      "<span><img src='../../assets/neighborhood-explorer/neighborhood.png' height='12px' style='margin-bottom:3px;' /> Neighborhoods</span>": L.tileLayer.wms(environment.geoserverMapServiceUrl + "/wms?", neighborhoodsWMSOptions),
      "<span><img src='../../assets/neighborhood-explorer/backbone.png' height='12px' style='margin-bottom:3px;' /> Streams</span>": L.tileLayer.wms(environment.geoserverMapServiceUrl + "/wms?", backboneWMSOptions),
      "<span><img src='../../assets/neighborhood-explorer/backbone.png' height='12px' style='margin-bottom:3px;' /> Watersheds</span>": L.tileLayer.wms(environment.geoserverMapServiceUrl + "/wms?", watershedsWMSOptions),
      "<span>Stormwater Network <br/> <img src='../../assets/neighborhood-explorer/stormwaterNetwork.png' height='50'/> </span>": esri.dynamicMapLayer({ url: "https://ocgis.com/arcpub/rest/services/Flood/Stormwater_Network/MapServer/" })
    })

    this.defaultSelectedMetricDate = this.neighborhoodService.getDefaultMetricDate();

    this.compileService.configure(this.appRef);
  }

  public ngAfterViewInit(): void {

    this.neighborhoodService.getServicedNeighborhoodIds().subscribe(result => {
      this.neighborhoodsWhereItIsOkayToClickIDs = result;
    })

    this.initializeMap();
  }

  public initializeMap(): void {
    
    const mapOptions: L.MapOptions = {
      minZoom: 6,
      maxZoom: 22,
      layers: [
        this.tileLayers["Street"],
        this.overlayLayers["<span><img src='../../assets/neighborhood-explorer/backbone.png' height='12px' style='margin-bottom:3px;' /> Streams</span>"],
        this.overlayLayers["<span><img src='../../assets/neighborhood-explorer/backbone.png' height='12px' style='margin-bottom:3px;' /> Watersheds</span>"]
      ],
      gestureHandling: true,
      loadingControl:true

    } as L.MapOptions;

    this.map = L.map(this.mapID, mapOptions);
    this.initializePanes();
    
    this.staticFeatureService.getDistrictBoundary().subscribe(districtBoundaryFeature =>{
      this.districtBoundaryLayer = L.geoJSON(districtBoundaryFeature,{
        invert:true,
        //pane:"droolToolOverlayPane",
        style: function (feature) {
          return {
            fillColor: "#323232",
            fill: true,
            fillOpacity: 0.25,
            color: "#6819ae",
            weight: 5,
            stroke: true
          };
        }
      })
      this.districtBoundaryLayer.addTo(this.map);
      this.setControl();
      this.initializeMapEvents();
      this.defaultFitBounds();

      //this.districtBoundaryLayer.bringToBack();

      this.layerControl.addOverlay(this.districtBoundaryLayer, "District Boundary");
    });

    this.staticFeatureService.getWatershedMask().subscribe(maskString => {
      this.maskLayer = L.geoJSON(maskString, {
        invert: true,
        style: function (feature) {
          return {
            fillColor: "#323232",
            fill: true,
            fillOpacity: 0.2,
            color: "#3388ff",
            weight: 5,
            stroke: true
          };
        }
      });

      L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

      this.maskLayer.addTo(this.map);

      if (window.innerWidth > 991) {
        this.mapElement.nativeElement.scrollIntoView();
      }
    });
  }

  public initializePanes(): void {
    let droolToolOverlayPane = this.map.createPane("droolToolOverlayPane");
    droolToolOverlayPane.style.zIndex = 10000;
    this.map.getPane("markerPane").style.zIndex = 10001;
    this.map.getPane("popupPane").style.zIndex = 10002;
  }

  public setControl(): void {
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'legend');
      div.innerHTML = "<img src='./assets/neighborhood-explorer/MapKey.png' style='height:100px; border-radius:25px'>"
      return div;
    }
    legend.addTo(this.map);
    var loadingControl = L.Control.loading({
      separate: true
    });
    this.map.addControl(loadingControl);
    this.layerControl = new L.Control.Layers(this.tileLayers, this.overlayLayers)
      .addTo(this.map);
    this.map.zoomControl.setPosition('topright');

    this.afterSetControl.emit(this.layerControl);
  }

  public initializeMapEvents(): void {
    this.map.on('load', (event: L.LeafletEvent) => {
      this.afterLoadMap.emit(event);
    });
    this.map.on("moveend", (event: L.LeafletEvent) => {
      this.onMapMoveEnd.emit(event);
    });

    let dblClickTimer = null;

    //to handle click for select area vs double click for zoom
    this.map.on("click", (event: L.LeafletEvent) => {
      this.layerControlOpen = false;
      if (dblClickTimer !== null) {
        return;
      }
      dblClickTimer = setTimeout(() => {
        this.getNeighborhoodFromLatLong(event.latlng, true);
        dblClickTimer = null;
      }, 200);
    }).on("dblclick", () => {
      clearTimeout(dblClickTimer);
      dblClickTimer = null;
      this.map.zoomIn();
    })

    $(".leaflet-control-layers").hover(
      () => {this.layerControlOpen = true;},
      () => {this.layerControlOpen = false;}
    );
  }

  public makeNominatimRequest(searchText: any): void {
    if (!this.currentlySearching) {
      this.setSearchingAndLoadScreen(true);
      this.clearSearchResults();
      this.searchAddress = searchText.value;
      this.nominatimService.makeNominatimRequest(this.searchAddress).subscribe(response => {
        if (response.length === 0) {
          this.searchAddressNotFoundOrNotServiced();
          return null;
        }

        let lat = +response[0].lat;
        let lng = +response[0].lon;
        let latlng = { 'lat': lat, 'lng': lng };

        this.getNeighborhoodFromLatLong(latlng, false);
      });
      searchText.value = '';
    }
  }

  public getNeighborhoodFromLatLong(latlng: Object, mapClick: boolean): void {
    if (!this.currentlySearching || !mapClick) {
      if (mapClick) {
        this.setSearchingAndLoadScreen(true);
        this.clearSearchResults();
      }
      this.wfsService.geoserverNeighborhoodLookup(latlng).subscribe(response => {
        if (response.features.length === 0) {
          this.searchAddressNotFoundOrNotServiced();
          return null;
        }

        this.selectedNeighborhoodProperties = response.features[0].properties;
        this.selectedNeighborhoodID = this.selectedNeighborhoodProperties.NeighborhoodID;
        if (this.neighborhoodsWhereItIsOkayToClickIDs.includes(this.selectedNeighborhoodID)) {
          this.neighborhoodService.getMetricsForYearAndMonth(this.selectedNeighborhoodProperties.OCSurveyNeighborhoodID, this.defaultSelectedMetricDate.getUTCFullYear(), this.defaultSelectedMetricDate.getUTCMonth()).subscribe(result => {
            this.selectedNeighborhoodMetrics = result;
            this.map.invalidateSize();
          });
          this.displaySearchResults(response, latlng);
          this.neighborhoodService.getStormshed(this.selectedNeighborhoodID).subscribe(
            response => this.displayStormshedAndBackboneDetail(response),
            null,
            () => this.setSearchingAndLoadScreen(false)
          );
          this.neighborhoodService.updateSearchedAddress(this.searchAddress);
        }
        else {
          this.searchAddressNotFoundOrNotServiced();
        }
      });
    }
  }

  public displaySearchResults(response: FeatureCollection, latlng: Object): void {
    this.hideDistrictBoundaryMask();

    this.currentSearchLayer = L.geoJSON(response, {
      style: function (feature) {
        return {
          fillColor: "#34FFCC",
          fill: true,
          fillOpacity: 0.3,
          stroke: false
        };
      }
    }).addTo(this.map);

    this.currentMask = L.geoJSON(response, {
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
    }).addTo(this.map);

    let icon = L.divIcon({
      html: '<i class="fas fa-map-marker-alt fa-2x" style="color:#105745"></i>',
      iconSize: [20, 20],
      className: "search-popup"
    });

    let popupContent = "Neighborhood area for <span id='search-popup-address' class='search-popup-address'>" + (this.searchAddress !== undefined && this.searchAddress !== null ? this.searchAddress : "my selected neighborhood") + "</span>";
    let popupOptions = {
      'className': 'search-popup'
    }
    this.clickMarker = L.marker({ lat: latlng["lat"], lon: latlng["lng"] }, { icon: icon });

    this.currentMask.bringToFront();
    this.currentSearchLayer.bringToFront();
    this.clickMarker.addTo(this.map)
      .bindPopup(popupContent, popupOptions)
      .openPopup();

    setTimeout(() => { this.clickMarker.closePopup(); }, 5000);
    this.selectedNeighborhoodWatershed = this.selectedNeighborhoodProperties.Watershed;
    this.staticFeatureService.getWatershedMask(this.selectedNeighborhoodWatershed).subscribe(maskString => {
      this.selectedNeighborhoodWatershedMask = this.getMaskGeoJsonLayer(maskString);
    })
    this.searchActive = true;
  }

  public displayStormshedAndBackboneDetail(response: string): void {
    let featureCollection = (response) as any as FeatureCollection;
    if (featureCollection.features.length === 0) {
      return null;
    }

    this.stormshedLayer = L.geoJson(featureCollection, {
      style: function (feature) {
        return {
          fillColor: "#C0FF6C",
          fill: true,
          fillOpacity: 0.3,
          color: "#EA842C",
          weight: 5,
          stroke: true
        };
      }
    })

    this.stormshedLayer.addTo(this.map);
    this.stormshedLayer.bringToBack();

    //if we get a stormshed, move the mask out
    this.clearLayer(this.currentMask);
    this.currentMask = L.geoJSON(featureCollection, {
      invert: true,
      style: function (feature) {
        return {
          fillColor: "#323232",
          fill: true,
          fillOpacity: 0.4,
          color: "#EA842C",
          weight: 5,
          stroke: true
        };
      }
    }).addTo(this.map);

    let neighborhoodIDs = featureCollection.features[0].properties["NeighborhoodIDs"];
    let cql_filter = "NeighborhoodID in (" + neighborhoodIDs.join(",") + ")";

    let backboneWMSOptions = ({
      layers: "DroolTool:Backbones",
      transparent: true,
      format: "image/png",
      tiled: true,
      styles: "backbone_narrow",
      wmsParameterThatDoesNotExist: new Date(),
      pane: "droolToolOverlayPane",
      cql_filter: cql_filter
    } as L.WMSOptions);

    this.backboneDetailLayer = L.tileLayer.wms(environment.geoserverMapServiceUrl + "/wms?", backboneWMSOptions);
    this.backboneDetailLayer.addTo(this.map);
    this.backboneDetailLayer.bringToFront();

    this.fitBoundsWithPaddingAndFeatureGroup(new L.featureGroup([this.clickMarker, this.stormshedLayer]));
  }

  public displayTraceOrZoomToNeighborhood(event: Event): void {
    //Button lies on top of map, so we don't to be selecting a new area
    event.stopPropagation();
    if (!this.traceActive) {
      this.clearLayer(this.traceLayer);
      this.neighborhoodService.getDownstreamBackboneTrace(this.selectedNeighborhoodID).subscribe(response => {
        this.clearLayer(this.currentMask);
        this.selectedNeighborhoodWatershedMask.addTo(this.map);
        this.traceLayer = L.geoJSON(response,
          {
            style: function (feature) {
              return {
                color: "#FF20F9",
                weight: 3,
                stroke: true
              }
            },
            pane: "droolToolOverlayPane"
          })
        this.traceLayer.addTo(this.map);

        this.traceActive = true;
        this.fitBoundsWithPaddingAndFeatureGroup(new L.featureGroup([this.traceLayer, this.clickMarker, this.stormshedLayer]));
      })
    }
    else {
      this.fitBoundsWithPaddingAndFeatureGroup(new L.featureGroup([this.clickMarker, this.stormshedLayer]));
      this.clearLayer(this.traceLayer);
      this.clearLayer(this.selectedNeighborhoodWatershedMask);
      this.currentMask.addTo(this.map);
      this.traceActive = false;
    }
  }

  public clearSearchResults(): void {
    this.searchAddress = null;
    this.searchActive = false;
    this.activeSearchNotFound = false;
    this.traceActive = false;
    this.selectedNeighborhoodMetrics = null;
    this.neighborhoodService.updateSearchedAddress(null);
    this.removeCurrentSearchLayer();
  }

  public returnToDefault(): void {
    this.clearSearchResults();
    this.defaultFitBounds();
    this.map.invalidateSize();
  }

  public searchAddressNotFoundOrNotServiced(): void {
    this.searchAddress = null;
    this.activeSearchNotFound = true;
    this.setSearchingAndLoadScreen(false);
  }

  public removeCurrentSearchLayer(): void {
    [this.clickMarker,
    this.currentSearchLayer,
    this.currentMask,
    this.selectedNeighborhoodWatershedMask,
    this.stormshedLayer,
    this.backboneDetailLayer,
    this.traceLayer].forEach((x) => {
      this.clearLayer(x);
    });

    this.showDistrictBoundaryMask();
  }

  public clearLayer(layer: L.Layer): void {
    if (layer) {
      this.map.removeLayer(layer);
      layer = null;
    }
  }

  //fitBounds will use it's default zoom level over what is sent in
  //if it determines that its max zoom is further away. This can make the 
  //map zoom out to inappropriate levels sometimes, and then setZoom 
  //won't be honored because it's in the middle of a zoom. So we'll manipulate
  //it a bit.
  public defaultFitBounds(): void {
    let target = this.map._getBoundsCenterZoom(this.districtBoundaryLayer.getBounds(), null);
    this.map.setView(target.center, this.defaultMapZoom, null);
  }

  public fitBoundsWithPaddingAndFeatureGroup(featureGroup: L.featureGroup): void {
    let paddingHeight = $("#buttonDiv").innerHeight();
    let popupContent = $(".search-popup");
    if (popupContent !== null && popupContent !== undefined && popupContent.length == 1) {
      paddingHeight += popupContent.innerHeight();
    }

    this.map.fitBounds(featureGroup.getBounds(), { padding: [paddingHeight, paddingHeight] });
  }

  public showMetrics(event: Event) {
    event.stopPropagation();
    this.areMetricsCollapsed = !this.areMetricsCollapsed;
  }

  public setSearchingAndLoadScreen(searching: boolean) {
    this.currentlySearching = searching;
    this.map.fireEvent(this.currentlySearching ? 'dataloading' : 'dataload');
  }

  public getMaskGeoJsonLayer(maskString: string): L.geoJSON {
    return L.geoJSON(maskString, {
      invert: true,
      style: function (feature) {
        return {
          fillColor: "#323232",
          fill: true,
          fillOpacity: 0.4,
          stroke: false
        };
      }
    });
  }
  
  public hideDistrictBoundaryMask(): void {
    this.districtBoundaryLayer.options.invert = false;
    this.districtBoundaryLayer.setStyle({fillOpacity: 0});
  }

  public showDistrictBoundaryMask(): void{
    this.districtBoundaryLayer.options.invert = true;
    this.districtBoundaryLayer.setStyle({fillOpacity: .4});
  }
}
