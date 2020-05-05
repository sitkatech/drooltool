export class NeighborhoodMetricDto{
    public MetricYear?: number;
    public MetricMonth?: number;
    public TotalMonthlyDrool?: number;
    public OverallParticipation?: number;
    public PercentParticipation?: number;

    constructor(obj?: any){
        Object.assign(this, obj);
    }
}