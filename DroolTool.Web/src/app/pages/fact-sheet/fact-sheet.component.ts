import { Component, AfterViewInit, ChangeDetectorRef, HostListener, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { WfsService } from 'src/app/shared/services/wfs.service';
import * as L from 'leaflet';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { DroolPerLandscapedAcreChartDto, MetricDateDto, NeighborhoodMetricDto, NeighborhoodService } from 'src/app/shared/generated';
import { AddressService } from 'src/app/services/address.service';
import { WaterAccountsChartDto } from 'src/app/shared/models/water-accounts-chart-dto';


@Component({
  selector: 'drooltool-fact-sheet',
  templateUrl: './fact-sheet.component.html',
  styleUrls: ['./fact-sheet.component.scss']
})
export class FactSheetComponent implements AfterViewInit {
  public mapHeight = "234px"
  public mapID = "FactSheetMap";
  public map: L.Map;
  public tileLayers: any;
  public searchedAddress: string = "My Selected Neighborhood";

  public totalIrrigationWaterUsed: any;
  public droolChangeOverLastTwoMonthsStatement: string;
  public lineOfEncouragement: string;
  public drainsToText: string;
  public watershedImage: string;

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

  public watershedImages = {
    "Salt Creek": "./assets/main/watershed-images/Salt_Creek.png",
    "Laguna Canyon": "./assets/main/watershed-images/Laguna_Canyon.jpg",
    "Aliso Creek": "./assets/main/watershed-images/Aliso_Creek.jpg",
    "San Juan Creek": "./assets/main/watershed-images/San_Juan_Creek.jpg"
  }
  neighborhoodSearchedSubscription: Subscription;

  droolChartData: DroolPerLandscapedAcreChartDto[];
  waterAccountsChartData: WaterAccountsChartDto;
  innerWidth: number;
  smallScreen: boolean;
  refresh: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wfsService: WfsService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private meta: Meta,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.neighborhoodSearchedSubscription = this.addressService.getSearchedAddress().subscribe(address => {
      this.searchedAddress = address ?? "My Selected Neighborhood";
    })

    this.tileLayers = Object.assign({}, {
      "Street": L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Street',
        maxNativeZoom: 14,
        maxZoom: 22
      })
    }, this.tileLayers);
  }

  ngOnDestroy() {
    this.neighborhoodSearchedSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.smallScreen = window.innerWidth < 400;
    const id = parseInt(this.route.snapshot.paramMap.get("id"));
    if (id) {
        this.wfsService.geoserverNeighborhoodLookupWithID(id)
            .subscribe((geoserverResponse) => this.getMapImageAndDrainsToText(geoserverResponse));
    }
  }

  getMapImageAndDrainsToText(geoserverResponse: any) {
    this.drainsToText = geoserverResponse.features[0].properties.Watershed;
    let keyForWatershed = Object.keys(this.watershedImages).filter(x => this.drainsToText.includes(x))[0];
    this.watershedImage = this.watershedImages[keyForWatershed];
    let mapOptions = {
      zoomControl: false,
      layers: [
        this.tileLayers["Street"]
      ],
    } as L.MapOptions;

    this.map = L.map(this.mapID, mapOptions);

    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();

    let neighborhoodLayer = L.geoJSON(geoserverResponse, {
      style: function (feature) {
        return {
          fillColor: "#C0FF6C",
          fill: true,
          fillOpacity: 0.3,
          stroke: true,
          weight: 5,
          color: "#76C83B"
        };
      }
    }).addTo(this.map);

    // let stormshedLayer = L.geoJson(stormshedResponse, {
    //   style: function (feature) {
    //     return {
    //       fillColor: "#C0FF6C",
    //       fill: true,
    //       fillOpacity: 0.3,
    //       stroke: false
    //     };
    //   }
    // }).addTo(this.map);

    // stormshedLayer.bringToBack();

    let mask = L.geoJSON(geoserverResponse, {
      invert: true,
      style: function (feature) {
        return {
          fillColor: "#323232",
          fill: true,
          fillOpacity: 0.4,
          stroke: false
        };
      }
    }).addTo(this.map);

    this.map.fitBounds([neighborhoodLayer.getBounds()]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.smallScreen = window.innerWidth < 400;
    setTimeout(() => this.refresh = true);
    setTimeout(() => this.refresh = false);
  }
}
