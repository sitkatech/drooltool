export class DroolWatershedMetricDto{
    public MetricYear: number;
    public MetricMonth: number;
    public TotalMonthlyDrool: string;

    constructor(obj?: any){
        Object.assign(this, obj);
    }
}