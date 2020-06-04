export class WaterAccountsChartDto {
    public MetricYear: number;
    public MetricMonth: number;
    public ResidentialWaterAccounts?: number;
    public HOAWaterAccounts?: number;
    public CommercialWaterAccounts?: number;
    public MunicipalWaterAccounts?: number;
    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}