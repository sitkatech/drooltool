using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using DroolTool.Models.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Features;
using NetTopologySuite.Operation.Union;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;

namespace DroolTool.API.Controllers
{
    public class NeighborhoodController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;

        public NeighborhoodController(DroolToolDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("neighborhood/get-serviced-neighborhood-ids")]
        public ActionResult<List<int>> GetServicedNeighborhoodIds()
        {
            return Ok(_dbContext.Neighborhood.Where(x => x.BackboneSegment.Any()).Select(x => x.NeighborhoodID).ToList());
        }

        [HttpGet("neighborhood/get-neighborhoods-with-metrics-ids")]
        public ActionResult<List<int>> GetNeighborhoodsWithMetricsIds()
        {
            var OCSurveyNeighborhoodIds = _dbContext.vNeighborhoodMetric.Select(x => x.OCSurveyCatchmentID).Distinct();

            return Ok(_dbContext.Neighborhood.Where(x => OCSurveyNeighborhoodIds.Contains(x.OCSurveyNeighborhoodID)).Select(x => x.NeighborhoodID).ToList());
        }

        [HttpGet("neighborhood/{neighborhoodID}/get-stormshed")]
        public ActionResult<string> GetStormshed([FromRoute]int neighborhoodID)
        {
            var backboneAccumulated = new List<BackboneSegment>();

            var allBackboneSegments = _dbContext.BackboneSegment
                .Include(x => x.Neighborhood)
                .Include(x => x.DownstreamBackboneSegment)
                .Include(x => x.InverseDownstreamBackboneSegment)
                .Where(x => x.BackboneSegmentTypeID != (int)BackboneSegmentTypeEnum.Channel)
                .ToList();

            var lookingAt = allBackboneSegments.Where(x => x.NeighborhoodID == neighborhoodID).ToList();

            while (lookingAt.Any())
            {
                backboneAccumulated.AddRange(lookingAt);

                var downFromHere =
                    GetDownstreamBackboneSegmentsBasedOnCriteria(allBackboneSegments, backboneAccumulated);

                var upFromHere = GetInverseDownstreamBackboneSegmentsBasedOnCriteria(allBackboneSegments, backboneAccumulated);

                lookingAt = upFromHere.Union(downFromHere).ToList();
            }

            var listBackboneAccumulated = backboneAccumulated.Select(x => x.Neighborhood)
                .ToList()
                .Distinct()
                .Where(x => x != null)
                .ToList();

            var feature = new Feature()
            {
                Geometry = UnaryUnionOp.Union(listBackboneAccumulated.Select(x => x.NeighborhoodGeometry4326).ToList()),
                Attributes = new AttributesTable()
            };

            feature.Attributes.Add("NeighborhoodIDs", listBackboneAccumulated.Select(x => x.NeighborhoodID).ToList());

            return Ok(GeoJsonWriterService.buildFeatureCollectionAndWriteGeoJson(new List<Feature> { feature }));
        }

        [HttpGet("neighborhood/{neighborhoodID}/get-downstream-backbone-trace")]
        public ActionResult<string> GetDownstreamBackboneTrace([FromRoute] int neighborhoodID)
        {
            var backboneAccumulated = new List<BackboneSegment>();

            var allBackboneSegments = _dbContext.BackboneSegment
                .Include(x => x.DownstreamBackboneSegment)
                .ToList();

            var lookingAt = allBackboneSegments.Where(x => x.NeighborhoodID == neighborhoodID).ToList();

            while (lookingAt.Any())
            {
                backboneAccumulated.AddRange(lookingAt);

                lookingAt = GetDownstreamBackboneSegmentsBasedOnCriteria(allBackboneSegments, backboneAccumulated);
            }

            var featureList = backboneAccumulated.Select(x =>
            {
                var geometry = UnaryUnionOp.Union(x.BackboneSegmentGeometry4326);
                var feature = new Feature() { Geometry = geometry };
                return feature;
            }).ToList();

            return Ok(GeoJsonWriterService.buildFeatureCollectionAndWriteGeoJson(featureList));
        }

        [HttpGet("neighborhood/{neighborhoodID}/get-upstream-backbone-trace")]
        public ActionResult<string> GetUpstreamBackboneTrace([FromRoute] int neighborhoodID)
        {
            var backboneAccumulated = new List<BackboneSegment>();

            var allBackboneSegments = _dbContext.BackboneSegment
                .Include(x => x.InverseDownstreamBackboneSegment)
                .Include(x => x.Neighborhood)
                .ToList();

            var lookingAt = allBackboneSegments.Where(x => x.NeighborhoodID == neighborhoodID).ToList();

            while (lookingAt.Any())
            {
                backboneAccumulated.AddRange(lookingAt);

                lookingAt = GetInverseDownstreamBackboneSegmentsBasedOnCriteria(allBackboneSegments, backboneAccumulated);
            }

            var featureList = backboneAccumulated.Select(x =>
            {
                var geometry = UnaryUnionOp.Union(x.BackboneSegmentGeometry4326);
                var feature = new Feature() { Geometry = geometry };
                return feature;
            }).ToList();

            var stormshed = backboneAccumulated.Select(x => x.Neighborhood)
                .ToList()
                .Distinct()
                .Where(x => x != null)
                .ToList();

            var feature = new Feature()
            {
                Geometry = UnaryUnionOp.Union(stormshed.Select(x => x.NeighborhoodGeometry4326).ToList())
            };

            featureList.Add(feature);

            return Ok(GeoJsonWriterService.buildFeatureCollectionAndWriteGeoJson(featureList));
        }

        [HttpGet("neighborhood/{OCSurveyNeighborhoodID}/{metricYear}/{metricMonth}/get-metrics/")]
        public ActionResult<NeighborhoodMetricDto> GetMetricsForYearAndMonth([FromRoute] int OCSurveyNeighborhoodID, [FromRoute] int metricYear, [FromRoute] int metricMonth)
        {
            var neighborhoodMetric = _dbContext.vNeighborhoodMetric
                .SingleOrDefault(x =>
                    x.OCSurveyCatchmentID == OCSurveyNeighborhoodID && x.MetricYear == metricYear &&
                    x.MetricMonth == metricMonth)
                ?.AsDto();

            return Ok(neighborhoodMetric);
        }

        [HttpGet("neighborhood/{OCSurveyNeighborhoodID}/{metricEndYear}/{metricEndMonth}/get-metrics-for-year/")]
        public ActionResult<List<NeighborhoodMetricDto>> GetMetricsForYear([FromRoute] int OCSurveyNeighborhoodID, [FromRoute] int metricEndYear, [FromRoute] int metricEndMonth)
        {
            var desiredStartDate = new DateTime(metricEndYear - 1, metricEndMonth, 1);
            var neighborhoodMetricsForYear = _dbContext.vNeighborhoodMetric
                .Where(x => x.OCSurveyCatchmentID == OCSurveyNeighborhoodID &&
                            x.MetricDate >= desiredStartDate)
                .OrderByDescending(x => x.MetricDate)
                .Select(x => x.AsDto())
                .ToList();

            return Ok(neighborhoodMetricsForYear);
        }
        [HttpGet("neighborhood/get-most-recent-metric/")]
        public ActionResult<NeighborhoodMetricDto> GetMostRecentMetric()
        {
            return _dbContext.vNeighborhoodMetric
                .OrderByDescending(x => x.MetricDate)
                .FirstOrDefault()
                .AsDto();
        }
        
        [HttpGet("neighborhood/get-drool-per-landscaped-acre-chart/{neighborhoodID}")]
        public ActionResult<List<DroolPerLandscapedAcreChartDto>> GetDroolPerLandscapedAcreChart([FromRoute] int neighborhoodID)
        {
            var neighborhood = _dbContext.Neighborhood.SingleOrDefault(x=>x.NeighborhoodID == neighborhoodID);
            if (neighborhood == null)
            {
                return NotFound();
            }

            var droolPerLandscapedAcreChartDtos = _dbContext.vNeighborhoodMetric
                .Where(x => x.OCSurveyCatchmentID == neighborhood.OCSurveyNeighborhoodID)
                .OrderByDescending(x => x.MetricDate)
                .Take(24).Select(x => new DroolPerLandscapedAcreChartDto
                {
                    MetricMonth = x.MetricMonth, MetricYear = x.MetricYear,
                    DroolPerLandscapedAcre = x.DroolPerLandscapedAcre
                }).ToList();
            droolPerLandscapedAcreChartDtos.Reverse();
            return droolPerLandscapedAcreChartDtos;
        }

        [HttpGet("neighborhood/get-metric-timeline")]
        public ActionResult<List<NeighborhoodMetricAvailableDatesDto>> GetMetricTimeline()
        { 
            return _dbContext.vNeighborhoodMetric
                .ToList()
                .GroupBy(
                    x => x.MetricYear,
                    x => x.MetricMonth,
                    (year, months) => new NeighborhoodMetricAvailableDatesDto
                        { MetricYear = year, AvailableMonths = months.ToList() })
                .Distinct()
                .OrderByDescending(x => x.MetricYear)
                .ToList();
        }

        [HttpGet("neighborhood/get-serviced-neighborhoods-watershed-names")]
        public ActionResult<List<string>> GetServicedNeighborhoodWatershedNames()
        {
            return _dbContext.Neighborhood
                .Join(_dbContext.WatershedAlias,
                    x => x.Watershed,
                    y => y.WatershedName,
                    (x, y) => new
                        {OCSurveyNeighborhoodID = x.OCSurveyNeighborhoodID, WatershedAlias = y.WatershedAliasName})
                .Join(_dbContext.RawDroolMetric,
                    x => x.OCSurveyNeighborhoodID,
                    y => y.MetricCatchIDN,
                    (x, y) => new {WatershedAlias = x.WatershedAlias})
                .Select(x => x.WatershedAlias)
                .Distinct()
                .ToList();
        }

        private List<BackboneSegment> GetDownstreamBackboneSegmentsBasedOnCriteria(List<BackboneSegment> allBackboneSegments,
            List<BackboneSegment> accumulatedBackboneSegments)
        {
            var backboneIDsThatMeetCriteria = allBackboneSegments.Where(accumulatedBackboneSegments.Contains)
                .Where(x => x.DownstreamBackboneSegmentID.HasValue)
                .Select(x => x.DownstreamBackboneSegmentID.Value)
                .ToList();
            return allBackboneSegments.Where(x => backboneIDsThatMeetCriteria.Contains(x.BackboneSegmentID)).Except(accumulatedBackboneSegments).Distinct().ToList();
        }
        private List<BackboneSegment> GetInverseDownstreamBackboneSegmentsBasedOnCriteria(List<BackboneSegment> allBackboneSegments,
            List<BackboneSegment> accumulatedBackboneSegments)
        {
            var backboneIDsThatMeetCriteria = allBackboneSegments.Where(accumulatedBackboneSegments.Contains)
                .Where(x => x.InverseDownstreamBackboneSegment != null)
                .SelectMany(x => x.InverseDownstreamBackboneSegment.Select(y => y.BackboneSegmentID))
                .ToList();
            return allBackboneSegments.Where(x => backboneIDsThatMeetCriteria.Contains(x.BackboneSegmentID)).Except(accumulatedBackboneSegments).Distinct().ToList();
        }
    }
}
