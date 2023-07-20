export class NeighborhoodMetricAvailableDatesDto{
    public MetricYear: number;
    public AvailableMonths: Array<number>;

    constructor(obj?: any){
        Object.assign(this, obj);
    }
}