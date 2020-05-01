import { WatershedExplorerComponent } from 'src/app/pages/watershed-explorer/watershed-explorer.component';

export class WatershedExplorerMetric {

    static readonly TotalMonthlyDrool = new WatershedExplorerMetric(
        "Total Monthly Drool",
        WatershedExplorerMetric.getColorPallette("orange"),
        ["0 - 1000", "1000 - 5000", "5000 - 10000", "10000 - 25000", "25000 - 50000",  "50000 - 75000", "75000 - 100000", "Greater than 100000"],
        "gallons",
        "watershed_explorer_map_metric_total_monthly_drool"
    )

    static readonly OverallParticipation = new WatershedExplorerMetric(
        "Overall Participation",
        WatershedExplorerMetric.getColorPallette("teal"),
        ["0 - 5", "5 - 15", "15  - 30", "30 - 45", "45 - 60", "60 - 75", "75 - 90", "Greater than 90"],
        "number of active meters enrolled in a rebate program",
        "watershed_explorer_map_metric_overall_participation"
    )

    static readonly NoMetric = new WatershedExplorerMetric(
        "No Metric, Map Only",
        null,
        null,
        null,
        null
    )   

    private constructor(private readonly key:string, 
        public readonly legendColors:Array<string>, 
        public readonly legendValues:Array<string>,
        public readonly metricUnits:string,
        public readonly geoserverStyle:string) {}

    toString() {
        return this.key;
    }

    private static getColorPallette(color: string): Array<string> {
        if (color == "orange")
        {
            return ["#FDDA81", "#FBD177", "#F7BE64", "#F2A948", "#F0A148", "#EE973F", "#EC8E35", "#EA842C"];
        }
        else {
            return ["#E9F6F9","#BCE5EC","#90D4E0","#63C3D4","#36B2C7","#1D98AE","#167687","#105561"];
        }
    }

}

