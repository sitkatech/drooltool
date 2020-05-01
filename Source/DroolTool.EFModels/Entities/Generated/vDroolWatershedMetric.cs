using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DroolTool.EFModels.Entities
{
    public partial class vDroolWatershedMetric
    {
        public int PrimaryKey { get; set; }
        public int RawDroolMetricID { get; set; }
        public int OCSurveyCatchmentID { get; set; }
        public int MetricYear { get; set; }
        public int MetricMonth { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime MetricDate { get; set; }
        public double? TotalMonthlyDrool { get; set; }
    }
}
