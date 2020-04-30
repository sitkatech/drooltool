using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using DroolTool.EFModels.Entities;
using DroolTool.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Features;
using NetTopologySuite.IO;
using NetTopologySuite.Operation.Union;
using Newtonsoft.Json;

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

        [HttpGet("neighborhood/{neighborhoodID}/get-stormshed")]
        public ActionResult<string> GetStormshed([FromRoute]int neighborhoodID)
        {
            var backboneAccumulated = new List<BackboneSegment>();

            var backboneSegments = _dbContext.BackboneSegment
                .Include(x => x.Neighborhood)
                .Include(x => x.DownstreamBackboneSegment)
                .Include(x => x.InverseDownstreamBackboneSegment)
                .ToList();

            var startingPoint = _dbContext.Neighborhood
                .Include(x => x.BackboneSegment)
                .Single(x => x.NeighborhoodID == neighborhoodID).BackboneSegment.ToList();

            var lookingAt = backboneSegments.Where(x => startingPoint.Contains(x) && x.BackboneSegmentTypeID != (int)BackboneSegmentTypeEnum.Channel).ToList();

            while (lookingAt.Any())
            {
                backboneAccumulated.AddRange(lookingAt);

                var newEntities = backboneSegments.Where(x => lookingAt.Contains(x));

                var downFromHere = newEntities.Where(x => x.DownstreamBackboneSegment != null)
                    .Select(x => x.DownstreamBackboneSegment)
                    .Where(x => x.BackboneSegmentTypeID != (int)BackboneSegmentTypeEnum.Channel)
                    .ToList()
                    .Distinct()
                    .Except(backboneAccumulated);

                var upFromHere = newEntities.SelectMany(x => x.InverseDownstreamBackboneSegment)
                    .Where(x => x.BackboneSegmentTypeID != (int)BackboneSegmentTypeEnum.Channel)
                    .ToList()
                    .Distinct()
                    .Except(backboneAccumulated);

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
            var backboneDownstream = new List<BackboneSegment>();

            var neighborhoods = _dbContext.Neighborhood
                .Include(x => x.BackboneSegment);

            var backboneSegments = _dbContext.BackboneSegment
                .Include(x => x.DownstreamBackboneSegment)
                .ToList();

            var lookingAt = neighborhoods.Single(x => x.NeighborhoodID == neighborhoodID).BackboneSegment;

            while (lookingAt.Any())
            {
                backboneDownstream.AddRange(lookingAt);

                lookingAt = backboneSegments.Where(x => lookingAt.Contains(x) && x.DownstreamBackboneSegment != null)
                    .Select(x => x.DownstreamBackboneSegment)
                    .ToList()
                    .Distinct()
                    .ToList();
            }

            var featureList = backboneDownstream.Select(x =>
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
                var feature = new Feature() { Geometry = geometry };
                return feature;
            }).ToList();

            var stormshed = backboneUpstream.Select(x => x.Neighborhood)
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
    }
}
