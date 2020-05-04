export class DroolWatershedMetricDto{
    public MetricYear: number;
    public MetricMonth: number;
    public TotalMonthlyDrool: string;
    public OverallParticipation: string;
    public PercentParticipation: string;

    constructor(obj?: any){
        Object.assign(this, obj);
    }
}