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
                    : metric.TotalMonthlyDrool.Value.ToString("N0") + " gal/month",
                OverallParticipation =  metric?.OverallParticipation == null 
                    ? "Not Available" 
                    : metric.OverallParticipation.Value.ToString("N0") + " active meters",
                PercentParticipation = metric?.PercentParticipation == null
                    ? "Not Available"
                    : metric.PercentParticipation.Value + "%"
            };
        }
    }
}
