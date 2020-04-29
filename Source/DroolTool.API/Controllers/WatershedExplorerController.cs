using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using DroolTool.Models.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Features;
using NetTopologySuite.Operation.Union;

namespace DroolTool.API.Controllers
{
    public class WatershedExplorerController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;

        public WatershedExplorerController(DroolToolDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("watershed-explorer/get-metrics/{OCSurveyNeighborhoodID}")]
        public ActionResult<DroolWatershedMetricDto> GetWatershedExplorerMetrics([FromRoute] int OCSurveyNeighborhoodID)
        {
            var DroolWatershedMetric = _dbContext.vDroolWatershedMetric
                .Where(x => x.OCSurveyCatchmentID == OCSurveyNeighborhoodID)
                .OrderByDescending(x => x.MetricDate)
                .FirstOrDefault()
                .AsDto();

            return Ok(DroolWatershedMetric);
        }

        [HttpGet("watershed-explorer/get-upstream-backbone-trace/{neighborhoodID}")]
        public ActionResult<string> GetUpstreamBackboneTrace([FromRoute] int neighborhoodID)
        {
            var backboneUpstream = new List<BackboneSegment>();

            var neighborhoods = _dbContext.Neighborhood
                .Include(x => x.BackboneSegment);

            var backboneSegments = _dbContext.BackboneSegment
                .Include(x => x.InverseDownstreamBackboneSegment)
                .Include(x => x.Neighborhood)
                .ToList();

            var lookingAt = neighborhoods.Single(x => x.NeighborhoodID == neighborhoodID).BackboneSegment;

            while (lookingAt.Any())
            {
                backboneUpstream.AddRange(lookingAt);

                lookingAt = backboneSegments.Where(x => lookingAt.Contains(x) && x.InverseDownstreamBackboneSegment != null)
                    .SelectMany(x => x.InverseDownstreamBackboneSegment)
                    .ToList()
                    .Distinct()
                    .ToList();
            }

            var featureList = backboneUpstream.Select(x =>
            {
                var geometry = UnaryUnionOp.Union(x.BackboneSegmentGeometry4326);
                var feature = new Feature() { Geometry = geometry, Attributes = new AttributesTable() };
                feature.Attributes.Add("dummy", "dummy");
                return feature;
            }).ToList();

            var stormshed = backboneUpstream.Select(x => x.Neighborhood)
                .ToList()
                .Distinct()
                .Where(x => x != null)
                .ToList();

            var feature = new Feature()
            {
                Geometry = UnaryUnionOp.Union(stormshed.Select(x => x.NeighborhoodGeometry4326).ToList()),
                Attributes = new AttributesTable()
            };

            featureList.Add(feature);

            return Ok(GeoJsonWriterService.buildFeatureCollectionAndWriteGeoJson(featureList));
        }
    }
}
