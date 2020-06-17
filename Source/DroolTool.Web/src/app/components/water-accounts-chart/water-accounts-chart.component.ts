import { Component, OnInit, Input } from '@angular/core';
import { WaterAccountsChartDto } from 'src/app/shared/models/water-accounts-chart-dto';

declare var vegaEmbed: any;

@Component({
  selector: 'drooltool-water-accounts-chart',
  templateUrl: './water-accounts-chart.component.html',
  styleUrls: ['./water-accounts-chart.component.scss']
})
export class WaterAccountsChartComponent implements OnInit {
  @Input() droolChartData: WaterAccountsChartDto;
  @Input() smallScreen: boolean = false;;

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
          {"legendVal": `Residential - ${this.droolChartData.ResidentialWaterAccounts}`, "Account Type": "Residential", "Number of Accounts": this.droolChartData.ResidentialWaterAccounts},
          {"legendVal": `HOA - ${this.droolChartData.HOAWaterAccounts}`, "Account Type": "HOA", "Number of Accounts": this.droolChartData.HOAWaterAccounts},
          {"legendVal": `Commercial - ${this.droolChartData.CommercialWaterAccounts}`, "Account Type": "Commercial", "Number of Accounts": this.droolChartData.CommercialWaterAccounts},
          {"legendVal": `Municipal - ${this.droolChartData.MunicipalWaterAccounts}`, "Account Type": "Municipal", "Number of Accounts": this.droolChartData.MunicipalWaterAccounts}
        ]
      },
      "mark": {"type":"arc", tooltip: true, "outerRadius":100},
      "encoding": {
        "theta": {"field": "Number of Accounts", "type": "quantitative", "stack":true},
        "color": {"field": "legendVal", 
                  "type": "nominal", 
                  "scale": {"range": ["#FBD177", "#F0A148", "#EA842C", "#B65C1F"]},
                  "legend": {
                    "labelFont": "Nunito",
                    "labelFontSize":17,
                    "title":null,
                    "orient": this.smallScreen ? "top" : "right",
                    "direction":"vertical"
                  }},
                  "tooltip": [
                    { field: "Account Type", type: "ordinal"},
                    { field: "Number of Accounts", type: "ordinal"}
                  ]
      },
      "view": {"stroke": null}
    }
  };

}
