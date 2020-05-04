﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DroolTool.Models.DataTransferObjects
{
    public class DroolWatershedMetricDto
    {
        public int? MetricYear { get; set; }
        public int? MetricMonth { get; set; }
        public string TotalMonthlyDrool { get; set; }
        public string OverallParticipation { get; set; }
        public string PercentParticipation { get; set; }
    }
}
