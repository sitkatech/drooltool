import { Component, OnInit, Input } from '@angular/core';
import { WaterAccountsChartDto } from 'src/app/shared/models/water-accounts-chart-dto';

declare var vegaEmbed: any;

@Component({
  selector: 'drooltool-water-accounts-chart',
  templateUrl: './water-accounts-chart.component.html',
  styleUrls: ['./water-accounts-chart.component.scss']
})
export class WaterAccountsChartComponent implements OnInit {
  @Input() droolChartData: WaterAccountsChartDto

  constructor() { }

  ngOnInit(): void {
    vegaEmbed("#waterAccountsChartContainer", this.waterAccountsChartSpec(), { actions: false, tooltip: {
      theme: "custom"
    } });
  }

  public waterAccountsChartSpec() {
    return {
      "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      "description": "A simple pie chart with labels.",
      "data": {
        "values": [
          {"category": ["Residential", `${(this.droolChartData.PercentResidentialWaterAccounts * 100).toFixed(2)}%`], "value": this.droolChartData.PercentResidentialWaterAccounts},
          {"category": ["HOA", `${(this.droolChartData.PercentHOAWaterAccounts * 100).toFixed(2)}%`], "value": this.droolChartData.PercentHOAWaterAccounts},
          {"category": ["Commercial", `${(this.droolChartData.PercentCommercialWaterAccounts * 100).toFixed(2)}%`], "value": this.droolChartData.PercentCommercialWaterAccounts},
          {"category": ["Municipal", `${(this.droolChartData.PercentMunicipalWaterAccounts * 100).toFixed(2)}%`], "value": this.droolChartData.PercentMunicipalWaterAccounts}
        ]
      },
      "encoding": {
        "theta": {"field": "value", "type": "quantitative", "stack": true},
        "color": {"field": "category", "type": "nominal", "legend": null, "scale": {"range": ["#FBD177", "#F0A148", "#EA842C", "#B65C1F"]}}
      },
      "layer": [{
        "mark": {"type": "arc", "outerRadius": 80}
      }, {
        "mark": {"type": "text", "radius": 120, "font":"Nunito", "fontSize":17, "dy":-10},
        "encoding": {
          "text": {"field": "category", "type": "nominal"}
        }
      }],
      "view": {"stroke": null}
    }
  };

}
