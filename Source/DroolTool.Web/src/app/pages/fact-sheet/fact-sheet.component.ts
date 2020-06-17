import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, HostListener, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { UserDto } from 'src/app/shared/models/user/user-dto';
import { NeighborhoodService } from 'src/app/services/neighborhood/neighborhood.service';
import { NeighborhoodMetricDto } from 'src/app/shared/models/neighborhood-metric-dto';
import { WfsService } from 'src/app/shared/services/wfs.service';
import * as L from 'leaflet';
import { DroolPerLandscapedAcreChartDto } from 'src/app/shared/models/drool-per-landscaped-acre-chart-dto';
import { WaterAccountsChartDto } from 'src/app/shared/models/water-accounts-chart-dto';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';


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
  public metricsForYear: NeighborhoodMetricDto[];
  public metricEndDate: Date;

  public metricsForMostRecentMonth: NeighborhoodMetricDto;
  public metricsForMonthPriorToMostRecentMonth: NeighborhoodMetricDto;
  public metricsFurthestFromEndDate: NeighborhoodMetricDto;

  public totalIrrigationWaterUsed: any;
  public droolChangeOverLastTwoMonthsStatement: string;
  public droolPerLandscapedAcreChangeOverLastYearStatement: string;
  public neighborhoodsParticipatingChangeStatement: string;
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
    "Laguna Canyon": "./assets/main/watershed-images/Laguna_Canyon.png",
    "Aliso Creek": "./assets/main/watershed-images/Aliso_Creek.png",
    "San Juan Creek": "./assets/main/watershed-images/San_Juan_Creek.png"
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
    private neighborhoodService: NeighborhoodService,
    private wfsService: WfsService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private meta: Meta
  ) {
  }

  ngOnInit() {
    this.neighborhoodSearchedSubscription = this.neighborhoodService.getSearchedAddress().subscribe(address => {
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
      this.metricEndDate = this.neighborhoodService.getDefaultMetricDate();
      forkJoin(
        this.wfsService.geoserverNeighborhoodLookupWithID(id),
        this.neighborhoodService.getStormshed(id),
        this.neighborhoodService.getDroolPerLandscapedAcreChart(id)
      ).subscribe(([geoserverResponse, stormshedResponse, droolChartResponse]) => {
        const OCSurveyNeighborhoodID = geoserverResponse.features[0].properties.OCSurveyNeighborhoodID;
        this.neighborhoodService.getMetricsForYear(OCSurveyNeighborhoodID, this.metricEndDate.getUTCFullYear(), this.metricEndDate.getUTCMonth()).subscribe(metricResult => {
          this.metricsForYear = metricResult;
          if (this.metricsForYear.length > 0) {
            this.setupMetricsAndGetStatements();
          }
        });
        this.getMapImageAndDrainsToText(geoserverResponse, stormshedResponse);


        this.droolChartData = droolChartResponse;

      })
    }
  }

  getMapImageAndDrainsToText(geoserverResponse: any, stormshedResponse: any) {
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
          color: "#65b300"
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

  setupMetricsAndGetStatements() {
    this.metricsForMostRecentMonth = this.metricsForYear[0];
    this.waterAccountsChartData = new WaterAccountsChartDto(this.metricsForMostRecentMonth);
    this.metricsForMonthPriorToMostRecentMonth = this.metricsForYear[1];
    this.metricsFurthestFromEndDate = this.metricsForYear[this.metricsForYear.length - 1];

    this.droolChangeOverLastTwoMonthsStatement = this.getLastTwoMonthsStatement(this.metricsForMostRecentMonth.TotalDrool, this.metricsForMonthPriorToMostRecentMonth.TotalDrool);
    this.droolPerLandscapedAcreChangeOverLastYearStatement = this.getDroolPerLandscapedAcreChangeOverLastYearStatement(this.metricsForMostRecentMonth.DroolPerLandscapedAcre, this.metricsFurthestFromEndDate.DroolPerLandscapedAcre, this.metricsForYear.length);

    this.neighborhoodsParticipatingChangeStatement = this.getNeighborhoodsParticipatingChangeStatement(this.metricsForMostRecentMonth?.OverallParticipation, this.metricsFurthestFromEndDate?.OverallParticipation, this.metricsForYear.length);
    this.totalIrrigationWaterUsed = this.getTotalIrrigationWater();
  }

  getTotalIrrigationWater(): number {
    if (this.metricsForYear.length < 13) {
      return this.metricsForYear.reduce((tiw, m) => tiw + m.TotalWaterUsedForIrrigation, 0);
    }
    else {
      let temp = this.metricsForYear;
      temp.shift();
      return temp.reduce((tiw, m) => tiw + m.TotalWaterUsedForIrrigation, 0);
    }
  }

  getNeighborhoodsParticipatingChangeStatement(overallParticipationMostRecent: number, overallParticipationOldest: number, length: number): any {
    let difference = overallParticipationMostRecent - overallParticipationOldest;
    let lengthOfTime = length < 13 ? length - 1 + "months ago" : "last year";
    let differenceStatement = difference == 0 ? "the same as" : `${difference > 0 ? "up" : "down"} ${Math.abs(difference)} from`;

    return `This is ${differenceStatement} ${lengthOfTime}${difference > 0 ? "!" : "."}`
  }

  getDroolPerLandscapedAcreChangeOverLastYearStatement(totalDroolMostRecent: number, totalDroolOldest: number, length: number): any {
    let briefStatement;
    let lengthOfTime = length < 13 ? length - 1 + " months ago" : "this month last year";
    let improvement =  false;
    
    if (totalDroolOldest != 0)
    {
      let difference = totalDroolMostRecent - totalDroolOldest;
      improvement = difference <= 0;
      let percentChange = Math.abs(Math.round((difference/totalDroolOldest) * 100));
      let improvementStatement = improvement ? "improvement" : "regression";
      briefStatement = `a ${percentChange}% ${improvementStatement}`
    }
    else
    {
      improvement = totalDroolMostRecent == 0;
      briefStatement = `an increase of ${totalDroolMostRecent} gal/acre`
    }
    let lineOfEncouragement = improvement ? "keep up the good work?" : "get back on track?"

    return `This is ${briefStatement} from ${lengthOfTime}${improvement ? "!" : "."} <br/> What can you do right now to ${lineOfEncouragement}`;
  }

  getLastTwoMonthsStatement(mostRecent: number, monthPrior: number): string {
    if (mostRecent > monthPrior) {
      return "increasing";
    }
    else if (mostRecent < monthPrior) {
      return "decreasing";
    }
    else {
      return "remaining steady";
    }
  }

  showDroughtTolerantIrrigationEquivalent(): boolean {
    // only show "This would be enough to irrigate [x] drought tolerant etc" if [x] is better than they're currently doing.
    return (this.totalIrrigationWaterUsed / 350000) > (1.1 * this.metricsForMostRecentMonth.TotalIrrigatedArea);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.smallScreen = window.innerWidth < 400;
    setTimeout(() => this.refresh = true);
    setTimeout(() => this.refresh = false);
  }
}
