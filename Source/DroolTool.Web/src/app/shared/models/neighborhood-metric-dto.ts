export class NeighborhoodMetricDto{
    public MetricYear: number;
    public MetricMonth: number;
    public TotalDrool?: number;
    public OverallParticipation?: number;
    public PercentParticipation?: number;
    public DroolPerLandscapedAcre?: number;
    public TotalWaterAccounts?: number;
    public TotalIrrigatedArea?: number;
    public TotalWaterUsedForIrrigation?: number;

    constructor(obj?: any){
        Object.assign(this, obj);
    }
}