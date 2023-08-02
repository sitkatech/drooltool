using System;
using System.Collections.Generic;
using System.Text;

namespace DroolTool.Models.DataTransferObjects
{
    public class NeighborhoodMetricAvailableDatesDto
    {
        public int MetricYear { get; set; }
        public List<int> AvailableMonths { get; set; }
    }
}
