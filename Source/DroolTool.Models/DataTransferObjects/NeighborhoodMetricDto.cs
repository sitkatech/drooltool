using System;
using System.Collections.Generic;
using System.Text;

namespace DroolTool.Models.DataTransferObjects
{
    public class NeighborhoodMetricDto
    {
        public int MetricYear { get; set; }
        public int MetricMonth { get; set; }
        public double? TotalDrool { get; set; }
        public double? OverallParticipation { get; set; }
        public double? PercentParticipation { get; set; }
        public double? DroolPerLandscapedAcre { get; set; }
        public double? TotalWaterAccounts { get; set; }
        public double? TotalIrrigatedArea { get; set; }
        public double? TotalWaterUsedForIrrigation { get; set; }
    }
}
