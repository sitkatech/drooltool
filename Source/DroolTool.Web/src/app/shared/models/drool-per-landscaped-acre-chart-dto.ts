export class DroolPerLandscapedAcreChartDto {
    public MetricYear: number;
    public MetricMonth: number;
    public DroolPerLandscapedAcre?: number;
    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
