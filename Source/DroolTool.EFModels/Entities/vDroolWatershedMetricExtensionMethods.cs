using System;
using System.Collections.Generic;
using System.Text;
using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities
{
    public static class vDroolWatershedMetricExtensionMethods
    {
        public static DroolWatershedMetricDto AsDto(this vDroolWatershedMetric metric)
        {
            return new DroolWatershedMetricDto()
            {
                MetricYear = metric?.MetricYear,
                MetricMonth = metric?.MetricMonth,
                TotalMonthlyDrool = metric?.TotalMonthlyDrool == null
                    ? "Not Available"
                    : metric.TotalMonthlyDrool.Value + " gal/month"
            };
        }
    }
}
