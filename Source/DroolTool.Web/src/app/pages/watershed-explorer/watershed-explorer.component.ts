import { Component, OnInit, ViewChild, ElementRef, EventEmitter, ApplicationRef, ViewChildren, QueryList } from '@angular/core';
import { CustomCompileService } from 'src/app/shared/services/custom-compile.service';
import { NeighborhoodService } from 'src/app/services/neighborhood/neighborhood.service';
import { WatershedMaskService } from 'src/app/services/watershed-mask/watershed-mask.service';
import { WfsService } from 'src/app/shared/services/wfs.service';
import { environment } from 'src/environments/environment';
import * as L from 'leaflet';
import { GestureHandling } from "leaflet-gesture-handling";
import '../../../../node_modules/leaflet.snogylop/src/leaflet.snogylop.js';
import '../../../../node_modules/leaflet-loading/src/Control.Loading.js';
import * as esri from 'esri-leaflet'
import { FeatureCollection } from 'geojson';
import { NeighborhoodMetricDto } from 'src/app/shared/models/neighborhood-metric-dto.js';
import { WatershedExplorerMetric } from 'src/app/shared/models/watershed-explorer-metric.js';
import { forkJoin } from 'rxjs';
import { NeighborhoodMetricAvailableDatesDto } from 'src/app/shared/models/neighborhood-metric-available-dates-dto.js';
import { Options } from 'ng5-slider'

declare var $: any;

@Component({
  selector: 'drooltool-watershed-explorer',
  templateUrl: './watershed-explorer.component.html',
  styleUrls: ['./watershed-explorer.component.scss']
})
export class WatershedExplorerComponent implements OnInit {
  @ViewChild("mapDiv", { static: false }) mapElement: ElementRef;
  @ViewChild("largePanel", { static: false }) largeDisplayMetricsPanel: ElementRef;

  public defaultMapZoom = 12;
  public afterSetControl = new EventEmitter();
  public afterLoadMap = new EventEmitter();
  public onMapMoveEnd = new EventEmitter();

  public watershedNames: Array<string> = ["All Watersheds"];
  public selectedWatershed: string = "All Watersheds";

  //this is needed to allow binding to the static class
  public WatershedExplorerMetric = WatershedExplorerMetric;

  public metrics = Object.values(WatershedExplorerMetric);
  public selectedMetric = WatershedExplorerMetric.DroolPerLandscapedAcre;
  public metricsForCurrentSelection: NeighborhoodMetricDto;
  public metricOverlayLayer: L.Layers;

  public component: any;

  public mapID = "WatershedExplorerMap";
  public mapHeight = window.innerHeight + "px";
  public map: L.Map;
  public featureLayer: any;
  public layerControl: L.Control.Layers;
  public tileLayers: { [key: string]: any } = {};
  public overlayLayers: { [key: string]: any } = {};
  public maskLayer: any;
  public neighborhoodsWhereItIsOkayToClickIDs: number[];
  public watershedStyle = "drooltoolwatershed-dark";

  public wmsParams: any;
  public stormshedLayer: L.Layers;
  public downstreamTraceLayer: L.Layers;
  public upstreamTraceLayer: L.Layers;
  public clickMarker: L.Marker;
  public traceActive: boolean = false;
  public showInstructions: boolean = true;
  public searchActive: boolean = false;
  public currentlySearching: boolean = false;

  public errorActive: boolean = false;
  public errorMessage: string = "";
  public errorSpecificIcon: string = "";
  public errorCallToAction: string = "";

  public searchOutsideServiceAreaErrorMessage = "Sorry, the area you selected is not within the Urban Drool Tool service area.";
  public searchOutsideServiceAreaErrorCallToAction = "Select an area within the highlighted service boundary to view results."
  public searchOutsideServiceAreaErrorSpecificIcon = "<span><i class='fas fa-map-marker-alt fa-3x'></i></span>"
  public noDataForTimeSelectedErrorMessage = "Sorry, it appears we don't have Urban Drool data for ";
  public noDataForTimeSelectedErrorCallToAction = "Select a different month, or select a different year and view months in that range."
  public noDataForTimeSelectedErrorSpecificIcon = "<span><i class='far fa-calendar-alt fa-3x'></i></span>";
  
  public selectedNeighborhoodID: number;
  public selectedMetricMonth: number;
  public selectedMetricYear: number;
  public selectedYearMinMonth: number;
  public selectedYearMaxMonth: number;
  public allYearsWithAvailableMetricMonths: NeighborhoodMetricAvailableDatesDto[];

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

  public ng5SliderOptions: Options = {
    floor:1,
    ceil:12,
    //Can't find an option to turn values off entirely while keeping ticks,
    //so we'll just make the values nothing
    translate: (value: number): string => {
      return '';
    },
    showTicks: true,
    getLegend: (value: number): string => {
      return this.months[value-1];
    }
  }
  

  constructor(
    private appRef: ApplicationRef,
    private compileService: CustomCompileService,
    private neighborhoodService: NeighborhoodService,
    private wfsService: WfsService,
    private watershedMaskService: WatershedMaskService
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

    let watershedOptions = Object.assign({ styles: this.watershedStyle }, watershedsWMSOptions);

    this.overlayLayers = Object.assign({}, {
      "<span><img src='../../assets/neighborhood-explorer/neighborhood.png' height='12px' style='margin-bottom:3px;' /> Neighborhoods</span>": L.tileLayer.wms(environment.geoserverMapServiceUrl + "/wms?", neighborhoodsWMSOptions),
      "<span><img src='../../assets/neighborhood-explorer/backbone.png' height='12px' style='margin-bottom:3px;' /> Streams</span>": L.tileLayer.wms(environment.geoserverMapServiceUrl + "/wms?", backboneWMSOptions),
      "<span><img src='../../assets/neighborhood-explorer/backbone.png' height='12px' style='margin-bottom:3px;' /> Watersheds</span>": L.tileLayer.wms(environment.geoserverMapServiceUrl + "/wms?", watershedOptions),
      "<span>Stormwater Network <br/> <img src='../../assets/neighborhood-explorer/stormwaterNetwork.png' height='50'/> </span>": esri.dynamicMapLayer({ url: "https://ocgis.com/arcpub/rest/services/Flood/Stormwater_Network/MapServer/" }),
    })

    this.compileService.configure(this.appRef);

    forkJoin(
      this.neighborhoodService.getMetricTimeline(),
      this.neighborhoodService.getMostRecentMetric()
    ).subscribe(([metricTimeline, mostRecentMetric]) => {
      this.allYearsWithAvailableMetricMonths = metricTimeline;

      this.metricsForCurrentSelection = mostRecentMetric;
      this.selectedMetricMonth = mostRecentMetric.MetricMonth;
      this.selectedMetricYear = mostRecentMetric.MetricYear;

      this.addDisabledToAppropriateSliderMonths();
      this.applyMetricOverlay(false);
    });

    this.neighborhoodService.getServicedNeighborhoodsWatershedNames().subscribe(result => {
      this.watershedNames = this.watershedNames.concat(result);
    })
  }

  public ngAfterViewInit(): void {

    this.neighborhoodService.getServicedNeighborhoodIds().subscribe(result => {
      this.neighborhoodsWhereItIsOkayToClickIDs = result;
    });

    this.initializeMap();
  }

  public initializeMap(): void {
    this.watershedMaskService.getWatershedMask().subscribe(maskString => {
      this.maskLayer = this.getMaskGeoJsonLayer(maskString);
      L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

      const mapOptions: L.MapOptions = {
        minZoom: 6,
        maxZoom: 22,
        layers: [
          this.tileLayers["Hillshade"],
          this.overlayLayers["<span><img src='../../assets/neighborhood-explorer/backbone.png' height='12px' style='margin-bottom:3px;' /> Streams</span>"],
          this.overlayLayers["<span><img src='../../assets/neighborhood-explorer/backbone.png' height='12px' style='margin-bottom:3px;' /> Watersheds</span>"]
        ],
        gestureHandling: true,
        loadingControl:true
      } as L.MapOptions;

      this.map = L.map(this.mapID, mapOptions);

      this.initializePanes();
      this.initializeMapEvents();
      this.setControl();

      this.maskLayer.addTo(this.map);
      this.defaultFitBounds();

      if (window.innerWidth > 991) {
        this.mapElement.nativeElement.scrollIntoView();
      }

      this.applyMetricOverlay(false);
    });
  }

  public initializePanes(): void {
    let droolToolOverlayPane = this.map.createPane("droolToolOverlayPane");
    droolToolOverlayPane.style.zIndex = 10000;
    let droolToolChoroplethPane = this.map.createPane("droolToolChoroplethPane");
    droolToolChoroplethPane.style.zIndex = 9999;
    this.map.getPane("markerPane").style.zIndex = 10001;
    this.map.getPane("popupPane").style.zIndex = 10002;
  }

  public setControl(): void {
    this.layerControl = new L.Control.Layers(this.tileLayers, this.overlayLayers)
      .addTo(this.map);
    this.map.zoomControl.setPosition('topright');
    var loadingControl = L.Control.loading({
      separate: true
    });
    this.map.addControl(loadingControl);
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
      if (dblClickTimer !== null) {
        return;
      }
      dblClickTimer = setTimeout(() => {
        this.getNeighborhoodFromLatLong(event.latlng);
        dblClickTimer = null;
      }, 200);
    }).on("dblclick", () => {
      clearTimeout(dblClickTimer);
      dblClickTimer = null;
      this.map.zoomIn();
    })
  }

  public getNeighborhoodFromLatLong(latlng: Object): void {
    if (!this.currentlySearching) {
      this.currentlySearching = true;
      this.clearSearchResults();
      this.wfsService.geoserverNeighborhoodLookup(latlng).subscribe(response => {
        if (response.features.length === 0) {
          this.searchAddressNotFoundOrNotServiced();
          return null;
        }

        this.selectedNeighborhoodID = response.features[0].properties.NeighborhoodID;
        if (this.neighborhoodsWhereItIsOkayToClickIDs.includes(this.selectedNeighborhoodID)) {
          this.displaySearchResults(response.features[0].properties.OCSurveyNeighborhoodID, latlng);
        }
        else {
          this.searchAddressNotFoundOrNotServiced();
        }
      });
    }
  }

  public displaySearchResults(OCSurveyNeighborhoodID: number, latlng: Object): void {
    this.neighborhoodService.getMetricsForYearAndMonth(OCSurveyNeighborhoodID, this.selectedMetricYear, this.selectedMetricMonth).subscribe(response => {
      this.metricsForCurrentSelection = response;

      let icon = L.divIcon({
        html: '<i class="fas fa-map-marker-alt fa-2x" style="color:#105745"></i>',
        iconSize: [20, 20],
        className: "search-popup"
      });

      let popupContent = this.getMetricPopupContent();
      let popupOptions = {
        'className': 'search-popup'
      }
      this.clickMarker = L.marker({ lat: latlng["lat"], lon: latlng["lng"] }, { icon: icon });

      this.clickMarker.addTo(this.map)
        .bindPopup(popupContent, popupOptions)
        .openPopup();

      this.searchActive = true;
      this.currentlySearching = false;
    });
  }

  public displayTrace(event: Event, upstream: boolean): void {
    //Button lies on top of map, so we don't to be selecting a new area
    event.stopPropagation();
    this.clearLayer(this.downstreamTraceLayer);
    this.clearLayer(this.upstreamTraceLayer);
    this.clearLayer(this.stormshedLayer);
    if (!upstream) {
      this.clearLayer(this.downstreamTraceLayer);
      this.neighborhoodService.getDownstreamBackboneTrace(this.selectedNeighborhoodID).subscribe(response => {
        this.downstreamTraceLayer = L.geoJSON(response,
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
        this.downstreamTraceLayer.addTo(this.map);

        this.traceActive = true;
        console.log(this.map.getZoom());
        this.fitBoundsWithPaddingAndFeatureGroup(new L.featureGroup([this.downstreamTraceLayer, this.clickMarker]));
        console.log(this.map.getZoom());
      })
    }
    else {
      this.clearLayer(this.upstreamTraceLayer);
      this.clearLayer(this.stormshedLayer);
      this.neighborhoodService.getUpstreamBackboneTrace(this.selectedNeighborhoodID).subscribe(response => {
        let featureCollection = (response) as any as FeatureCollection;
        console.log(featureCollection);
        if (featureCollection.features.length === 0) {
          return null;
        }

        let backboneTraces = featureCollection.features.slice(0, featureCollection.features.length - 2);
        let stormshed = featureCollection.features[featureCollection.features.length - 1];
        this.upstreamTraceLayer = L.geoJSON(backboneTraces,
          {
            style: function (feature) {
              return {
                color: "#000000",
                weight: 3,
                stroke: true
              }
            },
            pane: "droolToolOverlayPane"
          })
        this.upstreamTraceLayer.addTo(this.map);

        this.stormshedLayer = L.geoJson(stormshed, {
          style: function (feature) {
            return {
              fill: false,
              color: "#89bf40",
              weight: 5,
              stroke: true
            }
          },
          pane: "droolToolOverlayPane"
        })

        this.stormshedLayer.addTo(this.map);
        this.stormshedLayer.bringToBack();
        this.traceActive = true;
        this.fitBoundsWithPaddingAndFeatureGroup(new L.featureGroup([this.upstreamTraceLayer, this.clickMarker, this.stormshedLayer]));
        console.log(this.map.getZoom());
      });
    }
  }

  public clearSearchResults(): void {
    this.searchActive = false;
    this.traceActive = false;
    [this.clickMarker,
      this.stormshedLayer,
      this.upstreamTraceLayer,
      this.downstreamTraceLayer].forEach((x) => {
        this.clearLayer(x);
      });
  }

  public clearErrors() {
    this.errorActive = false;
    this.errorMessage = "";
    this.errorSpecificIcon = "";
    this.errorCallToAction = "";
  }

  public returnToDefault(): void {
    this.clearErrors();
    this.defaultFitBounds();
    this.map.invalidateSize();
    
    if (this.metricOverlayLayer == null) {
      this.neighborhoodService.getMetricsForYearAndMonth(this.selectedNeighborhoodID, this.selectedMetricYear, this.selectedMetricMonth).subscribe(result => {
        this.metricsForCurrentSelection = result;
        this.displayNewMetric(false);
        this.addDisabledToAppropriateSliderMonths();
      });
    }
  }

  public searchAddressNotFoundOrNotServiced(): void {
    this.errorActive = true;
    this.errorMessage = this.searchOutsideServiceAreaErrorMessage;
    this.errorSpecificIcon = this.searchOutsideServiceAreaErrorSpecificIcon;
    this.errorCallToAction = this.searchOutsideServiceAreaErrorCallToAction;
    this.currentlySearching = false;
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
    let target = this.map._getBoundsCenterZoom(this.maskLayer.getBounds(), null);
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

  public applyMetricOverlay(clearAsResultOfError: boolean): void {
    if (!this.map) {
      return null;
    }

    if (this.metricOverlayLayer) {
      this.map.removeLayer(this.metricOverlayLayer);
      this.metricOverlayLayer = null;
    }

    if (this.selectedMetric == WatershedExplorerMetric.NoMetric || clearAsResultOfError) {
      return null;
    }

    let cql_filter = "MetricYear = " + this.selectedMetricYear
      + " and MetricMonth = " + this.selectedMetricMonth;

    if (this.selectedWatershed != "All Watersheds") {
      cql_filter += " and WatershedAliasName = '" + this.selectedWatershed + "'";
    }

    let watershedExplorerMapMetricsWMSOptions = ({
      layers: "DroolTool:WatershedExplorerMapMetrics",
      transparent: true,
      format: "image/png",
      tiled: true,
      styles: this.selectedMetric.geoserverStyle,
      pane: "droolToolChoroplethPane",
      cql_filter: cql_filter
    } as L.WMSOptions);

    this.metricOverlayLayer = L.tileLayer.wms(environment.geoserverMapServiceUrl + "/wms?", watershedExplorerMapMetricsWMSOptions);
    this.metricOverlayLayer.addTo(this.map);
    this.metricOverlayLayer.bringToFront();
  }

  public getMetricPopupContent(): string {
    let metricContent = "";
    if (!this.metricsForCurrentSelection) {
      metricContent = "No metrics found for " + this.months[this.selectedMetricMonth - 1] + " " + this.selectedMetricYear + " at this location";
    }
    else {
      switch (this.selectedMetric) {
        case WatershedExplorerMetric.TotalDrool: {
          metricContent = this.selectedMetric + ": " +
            (this.metricsForCurrentSelection.TotalDrool == null
              ? "Not available"
              : this.metricsForCurrentSelection.TotalDrool.toLocaleString() + " gal/month");
          break;
        }
        case WatershedExplorerMetric.OverallParticipation: {
          metricContent = this.selectedMetric + ": " +
            (this.metricsForCurrentSelection.OverallParticipation == null
              ? "Not available"
              : this.metricsForCurrentSelection.OverallParticipation.toLocaleString() + " active meters");
          break;
        }
        case WatershedExplorerMetric.PercentParticipation: {
          metricContent = this.selectedMetric + ": " +
            (this.metricsForCurrentSelection.PercentParticipation == null
              ? "Not available"
              : Math.round(this.metricsForCurrentSelection.PercentParticipation).toString() + "%");
          break;
        }
        case WatershedExplorerMetric.DroolPerLandscapedAcre: {
          metricContent = this.selectedMetric + ": " +
            (this.metricsForCurrentSelection.DroolPerLandscapedAcre == null
              ? "Not available"
              : "<br/>" + this.metricsForCurrentSelection.DroolPerLandscapedAcre.toLocaleString() + " gal/acre");
          break;
        }
        default: {
          metricContent = "Select a metric from the dropdown to get started!";
        }
      }
    }

    return "<span>" + metricContent + "</span>"
  }

  public displayNewMetric(clearAsResultOfError: boolean): void {
    this.applyMetricOverlay(clearAsResultOfError);
    this.map.invalidateSize();
    if (!this.clickMarker) {
      return null;
    }
    let content = this.getMetricPopupContent();
    this.clickMarker.setPopupContent(content);
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

  public getNewWatershedMask() {
    this.clearSearchResults();
    this.clearErrors();
    this.map.removeLayer(this.maskLayer);
    this.maskLayer = null;
    this.map.fireEvent('dataloading');
    this.watershedMaskService.getWatershedMask(this.selectedWatershed).subscribe(maskString => {
      this.maskLayer = this.getMaskGeoJsonLayer(maskString);
      this.maskLayer.addTo(this.map);
      this.defaultFitBounds();     
      this.displayNewMetric(false);
      this.map.fireEvent('dataload');
    });
  }

  public showMetrics(event: Event) {
    event.stopPropagation();
    this.areMetricsCollapsed = !this.areMetricsCollapsed;
  }

  public clearErrorsAndDisplayNewMetric() {
    this.clearErrors();
    this.displayNewMetric(false);
  }

  public experiment() {
    if (!this.map) {
      return null;
    }

    this.errorActive = true;
    this.errorMessage = this.noDataForTimeSelectedErrorMessage + this.months[this.selectedMetricMonth - 1] + " " + this.selectedMetricYear;
    this.errorSpecificIcon = this.noDataForTimeSelectedErrorSpecificIcon;
    this.errorCallToAction = this.noDataForTimeSelectedErrorCallToAction;
    this.metricsForCurrentSelection = null;
    this.displayNewMetric(true);

    if (this.selectedYearMinMonth > this.selectedMetricMonth) {
      this.selectedMetricMonth = this.selectedYearMinMonth;
    }
    else if (this.selectedYearMaxMonth < this.selectedMetricMonth) {
      this.selectedMetricMonth = this.selectedYearMaxMonth;
    }

    let sliderImage = $(".ng5-slider .ng5-slider-pointer");
    sliderImage.addClass("shake");
    setTimeout(() => {
      sliderImage.removeClass("shake");
    }, 1000);
    
  }

  public getSelectedMetricYearAvailableMonthsThenDisplayMetric() {
    this.addDisabledToAppropriateSliderMonths();
    this.getAppropriateMetricsForDateChange();
  }

  public getAppropriateMetricsForDateChange() {
    if (!this.map)
    {
      return null;
    }

    this.clearErrors();

    if (this.selectedMetricMonth < this.selectedYearMinMonth || this.selectedMetricMonth > this.selectedYearMaxMonth) {
      setTimeout(() => {this.experiment()}, 300);
    }
    else {
      this.neighborhoodService.getMetricsForYearAndMonth(this.selectedNeighborhoodID, this.selectedMetricYear, this.selectedMetricMonth).subscribe(result => {
        this.metricsForCurrentSelection = result;
        this.displayNewMetric(false);
        this.addDisabledToAppropriateSliderMonths();
      });
    }
  }

  public addDisabledToAppropriateSliderMonths() {
    this.selectedYearMinMonth = this.allYearsWithAvailableMetricMonths
      .filter(x => x.MetricYear == this.selectedMetricYear)[0]
      .AvailableMonths
      .reduce((lowest, x) => Math.min(lowest, x), Number.MAX_VALUE);

    this.selectedYearMaxMonth = this.allYearsWithAvailableMetricMonths
    .filter(x => x.MetricYear == this.selectedMetricYear)[0]
    .AvailableMonths
    .reduce((highest, x) => Math.max(highest, x), 0);

    var sliderLegendValues = $(".ng5-slider-tick-legend");
    sliderLegendValues.removeClass("ng5-slider-disabled-legend");

    let x = 1;
    while (x < 13) {
      $(sliderLegendValues[x-1]).addClass(x < this.selectedYearMinMonth || x > this.selectedYearMaxMonth ? "ng5-slider-disabled-legend" : "");
      x = x + 1;
    }
  }
}
