using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DroolTool.EFModels.Entities
{
    public partial class vNeighborhoodMetric
    {
        public int PrimaryKey { get; set; }
        public int RawDroolMetricID { get; set; }
        public int OCSurveyCatchmentID { get; set; }
        public int MetricYear { get; set; }
        public int MetricMonth { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime MetricDate { get; set; }
        public double? TotalMonthlyDrool { get; set; }
        public double? OverallParticipation { get; set; }
        public double? PercentParticipation { get; set; }
        public double? MonthlyDroolPerLandscapedAcre { get; set; }
    }
}
