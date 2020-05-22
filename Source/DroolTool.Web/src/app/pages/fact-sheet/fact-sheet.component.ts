import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { UserDto } from 'src/app/shared/models/user/user-dto';
import { NeighborhoodService } from 'src/app/services/neighborhood/neighborhood.service';
import { NeighborhoodMetricDto } from 'src/app/shared/models/neighborhood-metric-dto';
import { WfsService } from 'src/app/shared/services/wfs.service';
import * as L from 'leaflet';

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
  public searchedAddress:string = "My Selected Neighborhood";
  public metricsForYear:NeighborhoodMetricDto[];
  public metricEndDate:Date;

  public metricsForMostRecentMonth:NeighborhoodMetricDto;
  public metricsForMonthPriorToMostRecentMonth:NeighborhoodMetricDto;
  public metricsFurthestFromEndDate:NeighborhoodMetricDto;
  
  public totalIrrigationWaterUsed: any;
  public droolChangeOverLastTwoMonthsStatement: string;
  public droolChangeOverLastYearStatement: string;
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
    "Salt Creek": "../../../assets/main/watershed-images/Salt_Creek.png",
    "Laguna Canyon": "../../../assets/main/watershed-images/Laguna_Canyon.png",
    "Aliso Creek":"../../../assets/main/watershed-images/Aliso_Creek.png",
    "San Juan Creek": "../../../assets/main/watershed-images/San_Juan_Creek.png"
  }
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private neighborhoodService: NeighborhoodService,
    private wfsService: WfsService
  ) {
   }

  ngOnInit() {
    this.tileLayers = Object.assign({}, {
      "Street": L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Street',
        maxNativeZoom: 16,
        maxZoom: 22
      })
    }, this.tileLayers);
  }

  ngAfterViewInit() {
    this.searchedAddress = this.neighborhoodService.getSearchedAddress() ?? "My Selected Neighborhood";
    const id = parseInt(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.metricEndDate = this.neighborhoodService.getDefaultMetricDate();
      forkJoin(
        this.wfsService.geoserverNeighborhoodLookupWithID(id),
        this.neighborhoodService.getStormshed(id),
        this.neighborhoodService.getMetricsForYear(id, this.metricEndDate.getUTCFullYear(), this.metricEndDate.getUTCMonth())
        ).subscribe(([geoserverResponse, stormshedResponse, metricResult]) => {
          this.setupMetricsAndGetStatements(metricResult);
          this.getMapImageAndDrainsToText(geoserverResponse, stormshedResponse);
      })
    }
  }

  getMapImageAndDrainsToText(geoserverResponse: any, stormshedResponse: any) {
    this.drainsToText = geoserverResponse.features[0].properties.Watershed;
    let keyForWatershed = Object.keys(this.watershedImages).filter(x => this.drainsToText.includes(x))[0];
    this.watershedImage = this.watershedImages[keyForWatershed];
    let mapOptions = {
      zoomControl:false,
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
          fillColor: "#34FFCC",
          fill: true,
          fillOpacity: 0.3,
          stroke: false
        };
      }
    }).addTo(this.map);

    let stormshedLayer = L.geoJson(stormshedResponse, {
      style: function (feature) {
        return {
          fillColor: "#C0FF6C",
          fill: true,
          fillOpacity: 0.3,
          stroke: false
        };
      }
    }).addTo(this.map);

    stormshedLayer.bringToBack();

    let mask = L.geoJSON(stormshedResponse, {
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

    this.map.fitBounds([neighborhoodLayer.getBounds(), stormshedLayer.getBounds()]);
  }

  setupMetricsAndGetStatements(result:any) {
    this.metricsForYear = result;
    this.metricsForMostRecentMonth = this.metricsForYear[0];
    this.metricsForMonthPriorToMostRecentMonth = this.metricsForYear[1];
    this.metricsFurthestFromEndDate = this.metricsForYear[this.metricsForYear.length - 1];

    this.droolChangeOverLastTwoMonthsStatement = this.getLastTwoMonthsStatement(this.metricsForMostRecentMonth.TotalDrool, this.metricsForMonthPriorToMostRecentMonth.TotalDrool);
    this.droolChangeOverLastYearStatement = this.getDroolChangeOverLastYearStatement(this.metricsForMostRecentMonth.TotalDrool, this.metricsFurthestFromEndDate.TotalDrool, this.metricsForYear.length);

    this.neighborhoodsParticipatingChangeStatement = this.getNeighborhoodsParticipatingChangeStatement(this.metricsForMostRecentMonth.OverallParticipation, this.metricsFurthestFromEndDate.OverallParticipation, this.metricsForYear.length);
    this.totalIrrigationWaterUsed = this.metricsForYear.reduce((tiw, m) => tiw + m.TotalWaterUsedForIrrigation, 0);
  }

  getNeighborhoodsParticipatingChangeStatement(overallParticipationMostRecent: number, overallParticipationOldest: number, length: number): any {
    let difference = overallParticipationMostRecent - overallParticipationOldest;
    let lengthOfTime = length < 13 ? length  - 1 + "months ago" : "last year";
    let differenceStatement = difference == 0 ? "the same as" : `${difference > 0 ? "up" : "down"} ${Math.abs(difference)} from`;

    return `This is ${differenceStatement} ${lengthOfTime}${difference > 0 ? "!" : "."}`
  }

  getDroolChangeOverLastYearStatement(totalDroolMostRecent: number, totalDroolOldest: number, length: number): any {
    let difference = (totalDroolMostRecent/totalDroolOldest) - 1;
    let improvement = difference <= 0;
    let briefStatement = improvement ? "improvement" : "regression";
    let lengthOfTime = length < 13 ? length  - 1 + "months ago" : "last year";
    let lineOfEncouragement = improvement ? "keep up the good work?" : "get back on track?"

    return `This is a ${Math.abs(Math.round(difference * 100))}% ${briefStatement} from ${lengthOfTime}${improvement ? "!" : "."} <br/> What can you do right now to ${lineOfEncouragement}`; 
  } 

  getLastTwoMonthsStatement(mostRecent:number, monthPrior:number): string {
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
}
