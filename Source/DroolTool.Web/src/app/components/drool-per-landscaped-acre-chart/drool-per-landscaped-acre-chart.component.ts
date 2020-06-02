import { Component, OnInit, Input } from '@angular/core';
import { DroolPerLandscapedAcreChartDto } from 'src/app/shared/models/drool-per-landscaped-acre-chart-dto';

declare var vegaEmbed: any;

@Component({
  selector: 'drooltool-drool-per-landscaped-acre-chart',
  templateUrl: './drool-per-landscaped-acre-chart.component.html',
  styleUrls: ['./drool-per-landscaped-acre-chart.component.scss']
})
export class DroolPerLandscapedAcreChartComponent implements OnInit {

  @Input() droolChartData: DroolPerLandscapedAcreChartDto[]
  constructor() { }

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

  ngOnInit(): void {
    //droolChartContainer
    vegaEmbed("#droolChartContainer", this.droolPerLandscapedAcreChartSpec(), { actions: false });
  }

  public droolPerLandscapedAcreChartSpec() {
    return {
      $schema: 'https://vega.github.io/schema/vega-lite/v2.0.json',
      description: 'A simple bar chart with embedded data.',
      width:"container",
      data: {
        values: this.makeVegaData(this.droolChartData)
      },
      transform: [
        { "calculate": "datum.y + ' gal/acre'", "as": "Drool per Landscaped Acre" },
      ],
      mark: { type: 'line', tooltip: true, point: { shape: "circle", size: 100 }, strokeWidth: 3 },
      encoding: {
        x: {
          field: 'Month', type: 'ordinal',
          axis: {
            title: false, labelFont: "Nunito", labelFontSize:14,
          },
          sort: null
        },
        y: {
          field: 'y', type: 'quantitative',
          axis: {
            title: "Drool (gal/acre)", titleFont: "Nunito", labelFont:"Nunito", titleFontSize: 18, titleColor: "#00728d", labelFontSize: 14, titlePadding: 20
          }
        },
        tooltip: [
          { field: "Month", type: "ordinal" },
          { field: "Drool per Landscaped Acre", type: "ordinal" }
        ]
      }
    };
  };

  makeVegaData(rawData: DroolPerLandscapedAcreChartDto[]): any {
    debugger;
    const out = rawData.map(datum => {
      return {
        Month: `${this.months[datum.MetricMonth - 1]} ${datum.MetricYear}`,
        y: datum.DroolPerLandscapedAcre
      };
    });
    return out;
  }

}
