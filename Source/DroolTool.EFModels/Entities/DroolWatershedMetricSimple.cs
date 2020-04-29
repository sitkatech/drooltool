namespace DroolTool.EFModels.Entities
{
    public class DroolWatershedMetricSimple
    {
        public int? MetricYear { get; set; }
        public int? MetricMonth { get; set; }
        public string TotalMonthlyDrool { get; set; }

        public DroolWatershedMetricSimple(vDroolWatershedMetric metric)
        {
            MetricYear = metric?.MetricYear;
            MetricMonth = metric?.MetricMonth;
            TotalMonthlyDrool = metric?.TotalMonthlyDrool == null
                ? "Not available"
                : metric.TotalMonthlyDrool.Value + " gal/month";
        }
    }
}