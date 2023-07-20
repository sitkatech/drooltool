namespace DroolTool.API.Controllers
{
    public class WaterAccountsChartDto
    {
        public int MetricMonth { get; set; }
        public int MetricYear { get; set; }
        public double? ResidentialWaterAccounts { get; set; }
        public double? HOAWaterAccounts { get; set; }
        public double? CommercialWaterAccounts { get; set; }
        public double? MunicipalWaterAccounts { get; set; }
    }
}