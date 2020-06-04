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
      "data": {
        "values": [
          {"legendVal": ["Residential", this.droolChartData.ResidentialWaterAccounts], "value": this.droolChartData.ResidentialWaterAccounts},
          {"legendVal": ["HOA", this.droolChartData.HOAWaterAccounts], "value": this.droolChartData.HOAWaterAccounts},
          {"legendVal": ["Commercial",  this.droolChartData.CommercialWaterAccounts], "value": this.droolChartData.CommercialWaterAccounts},
          {"legendVal": ["Municipal", this.droolChartData.MunicipalWaterAccounts], "value": this.droolChartData.MunicipalWaterAccounts}
        ]
      },
      "mark": {"type":"arc","outerRadius":100},
      "encoding": {
        "theta": {"field": "value", "type": "quantitative", "stack":true},
        "color": {"field": "legendVal", 
                  "type": "nominal", 
                  "scale": {"range": ["#FBD177", "#F0A148", "#EA842C", "#B65C1F"]},
                  "legend": {
                    "labelFont": "Nunito",
                    "labelFontSize":17,
                    "title":null
                  }}
      },
      "view": {"stroke": null}
    }
  };

}
