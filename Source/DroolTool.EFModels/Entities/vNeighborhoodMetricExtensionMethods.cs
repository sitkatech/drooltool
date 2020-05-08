using System;
using System.Collections.Generic;
using System.Text;
using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities
{
    public static class vNeighborhoodMetricExtensionMethods
    {
        public static NeighborhoodMetricDto AsDto(this vNeighborhoodMetric metric)
        {
            return new NeighborhoodMetricDto()
            {
                MetricYear = metric.MetricYear,
                MetricMonth = metric.MetricMonth,
                TotalDrool = metric.TotalDrool,
                OverallParticipation = metric.OverallParticipation,
                PercentParticipation = metric.PercentParticipation,
                DroolPerLandscapedAcre = metric.DroolPerLandscapedAcre
            };
        }
    }
}
