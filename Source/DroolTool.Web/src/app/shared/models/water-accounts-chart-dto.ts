export class WaterAccountsChartDto {
    public MetricYear: number;
    public MetricMonth: number;
    public PercentResidentialWaterAccounts?: number;
    public PercentHOAWaterAccounts?: number;
    public PercentCommercialWaterAccounts?: number;
    public PercentMunicipalWaterAccounts?: number;
    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}