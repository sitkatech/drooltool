using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DroolTool.EFModels.Entities
{
    [Keyless]
    public partial class vNeighborhoodMetric
    {
        public int PrimaryKey { get; set; }
        public int RawDroolMetricID { get; set; }
        public int OCSurveyCatchmentID { get; set; }
        public int MetricYear { get; set; }
        public int MetricMonth { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime MetricDate { get; set; }
        public double? TotalDrool { get; set; }
        public double? OverallParticipation { get; set; }
        public double? PercentParticipation { get; set; }
        public double? DroolPerLandscapedAcre { get; set; }
        public double? TotalWaterAccounts { get; set; }
        public double? ResidentialWaterAccounts { get; set; }
        public double? HOAWaterAccounts { get; set; }
        public double? CommercialWaterAccounts { get; set; }
        public double? MunicipalWaterAccounts { get; set; }
        public double? TotalIrrigatedArea { get; set; }
        public double? TotalWaterUsedForIrrigation { get; set; }
        public double? HoaWaterUsedForIrrigation { get; set; }
        public double? DroolPerLandscapedAcreYearlyPercentDifference { get; set; }
    }
}
