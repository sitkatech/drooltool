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

    let values = [];
    let sort = []
    let scale = []

    // as soon as you figure out a better way to do this, let me know.
    if (this.droolChartData.ResidentialWaterAccounts){
      values.push({"legendVal": `Residential - ${this.droolChartData.ResidentialWaterAccounts}`, "color": "#008080", "Account Type": "Residential", "Number of Accounts": this.droolChartData.ResidentialWaterAccounts});
      sort.push( `Residential - ${this.droolChartData.ResidentialWaterAccounts}`);
      scale.push("#008080");
    }
    if (this.droolChartData.HOAWaterAccounts){
      values.push({"legendVal": `HOA - ${this.droolChartData.HOAWaterAccounts}`, "color": "#F0A148", "Account Type": "HOA", "Number of Accounts": this.droolChartData.HOAWaterAccounts});
      sort.push( `HOA - ${this.droolChartData.HOAWaterAccounts}`);
      scale.push("#F0A148");
    }
    if (this.droolChartData.CommercialWaterAccounts){
      values.push({"legendVal": `Commercial - ${this.droolChartData.CommercialWaterAccounts}`, "color": "#323232", "Account Type": "Commercial", "Number of Accounts": this.droolChartData.CommercialWaterAccounts});
      sort.push( `Commercial - ${this.droolChartData.CommercialWaterAccounts}`);
      scale.push("#656565");
    }
    if (this.droolChartData.MunicipalWaterAccounts){
      values.push({"legendVal": `Municipal - ${this.droolChartData.MunicipalWaterAccounts}`, "color": "#00FFFF", "Account Type": "Municipal", "Number of Accounts": this.droolChartData.MunicipalWaterAccounts});
      sort.push( `Municipal - ${this.droolChartData.MunicipalWaterAccounts}`);
      scale.push("#2AC2DF");
    }

    return {
      "data": {
        "values": values
      },
      "mark": {"type":"arc", tooltip: true, "outerRadius":100},
      "encoding": {
        "theta": {"field": "Number of Accounts", "type": "quantitative", "stack":true},
        "color": {"field": "legendVal", 
                  "type": "nominal", 
                  "sort": sort,
                  "scale": {"range": scale},
                  "legend": {
                    "labelFont": "Nunito",
                    "labelFontSize":17,
                    "title":null,
                    "orient": this.smallScreen ? "top" : "right",
                    "direction":"vertical"
                  }
                },
                  "tooltip": [
                    { field: "Account Type", type: "ordinal"},
                    { field: "Number of Accounts", type: "ordinal"}
                  ]
      },
      "view": {"stroke": null}
    }
  };

}
