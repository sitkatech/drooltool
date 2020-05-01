export class DroolWatershedMetricDto{
    public MetricYear: number;
    public MetricMonth: number;
    public TotalMonthlyDrool: string;
    public OverallParticipation: string;

    constructor(obj?: any){
        Object.assign(this, obj);
    }
}