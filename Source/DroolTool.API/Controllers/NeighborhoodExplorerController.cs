using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using DroolTool.EFModels.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Features;
using NetTopologySuite.IO;
using NetTopologySuite.Operation.Union;
using Newtonsoft.Json;

namespace DroolTool.API.Controllers
{
    public class NeighborhoodExplorerController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;

        public NeighborhoodExplorerController(DroolToolDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("neighborhood-explorer/get-mask")]
        public ActionResult<string> GetNeighborhoodExplorerMask()
        {
            var watersheds = _dbContext.Watershed.Select(x => x.WatershedGeometry4326);
            var geometry = UnaryUnionOp.Union(watersheds);
            var feature = new Feature() { Geometry = geometry };
            var gjw = new GeoJsonWriter
            {
                SerializerSettings =
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    FloatParseHandling = FloatParseHandling.Decimal,
                    Formatting = Formatting.Indented
                }
            };
            var featureCollection = new FeatureCollection { feature };
            var write = gjw.Write(featureCollection);
            return Ok(write);
        }

        [HttpGet("neighborhood-explorer/get-serviced-neighborhood-ids")]
        public ActionResult<List<int>> GetServicedNeighborhoodIds()
        {
            return Ok(_dbContext.Neighborhood.Where(x => x.BackboneSegment.Any()).Select(x => x.NeighborhoodID).ToList());
        }

        [HttpGet("neighborhood-explorer/get-stormshed/{neighborhoodID}")]
        public ActionResult<string> GetStormshed([FromRoute]int neighborhoodID)
        {
            var backboneAccumulated = new List<int>();

            var startingPoint = _dbContext.Neighborhood
                .Include(x => x.BackboneSegment)
                .Single(x => x.NeighborhoodID == neighborhoodID).BackboneSegment;

            var lookingAt = startingPoint.Where(x => x.BackboneSegmentTypeID != (int) BackboneSegmentTypeEnum.Channel).Select(x => x.BackboneSegmentID).ToList();

            while (lookingAt.Any())
            {
                backboneAccumulated.AddRange(lookingAt);

                var newEntities = _dbContext.BackboneSegment
                    .Include(x => x.DownstreamBackboneSegment)
                    .Include(x => x.InverseDownstreamBackboneSegment)
                    .Where(x => lookingAt.Contains(x.BackboneSegmentID));

                var downFromHere = newEntities.Where(x => x.DownstreamBackboneSegment != null)
                    .Select(x => x.DownstreamBackboneSegment)
                    .Where(x => x.BackboneSegmentTypeID != (int) BackboneSegmentTypeEnum.Channel)
                    .Select(x => x.BackboneSegmentID)
                    .Distinct()
                    .ToList()
                    .Except(backboneAccumulated);

                var upFromHere = newEntities.SelectMany(x => x.InverseDownstreamBackboneSegment)
                    .Where(x => x.BackboneSegmentTypeID != (int) BackboneSegmentTypeEnum.Channel)
                    .Select(x => x.BackboneSegmentID)
                    .Distinct()
                    .ToList()
                    .Except(backboneAccumulated);

                lookingAt = upFromHere.Union(downFromHere).ToList();
            }

            var regionalSubbasinsInStormshedIds = _dbContext.BackboneSegment
                .Include(x => x.Neighborhood)
                .Where(x => backboneAccumulated.Contains(x.BackboneSegmentID))
                .Select(x => x.NeighborhoodID)
                .Distinct()
                .ToList();

            var regionalSubbasinsInStormshed = _dbContext.Neighborhood
                .Where(x => regionalSubbasinsInStormshedIds.Contains(x.NeighborhoodID))
                .ToList();

            var featureCollection = new FeatureCollection();
            var feature = new Feature()
            {
                Geometry = UnaryUnionOp.Union(regionalSubbasinsInStormshed.Select(x => x.NeighborhoodGeometry4326)),
                Attributes = new AttributesTable()
            };

            feature.Attributes.Add("NeighborhoodIDs",
                regionalSubbasinsInStormshed.Select(x => x.NeighborhoodID).ToList());
            
            featureCollection.Add(feature);

            var gjw = new GeoJsonWriter
            {
                SerializerSettings =
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    FloatParseHandling = FloatParseHandling.Decimal,
                    Formatting = Formatting.Indented
                }
            };

            var write = gjw.Write(featureCollection);

            return Ok(write);
        }

        [HttpGet("neighborhood-explorer/get-downstream-backbone-trace/{neighborhoodID}")]
        public ActionResult<string> GetDownstreamBackboneTrace([FromRoute] int neighborhoodID)
        {
            var backboneDownstream = new List<int>();

            var lookingAt = _dbContext.Neighborhood
                .Include(x => x.BackboneSegment)
                .Single(x => x.NeighborhoodID == neighborhoodID)
                .BackboneSegment
                .Select(x => x.BackboneSegmentID);

            while (lookingAt.Any())
            {
                backboneDownstream.AddRange(lookingAt);

                var newEntities = _dbContext.BackboneSegment
                    .Include(x => x.DownstreamBackboneSegment)
                    .Where(x => lookingAt.Contains(x.BackboneSegmentID));

                lookingAt = newEntities.Where(x => x.DownstreamBackboneSegment != null).Select(x => x.DownstreamBackboneSegment.BackboneSegmentID).Distinct().ToList();
            }

            var listOfBackboneFeatures =
                _dbContext.BackboneSegment.Where(x => backboneDownstream.Contains(x.BackboneSegmentID)).ToList();

            var featureCollection = new FeatureCollection();
            var featureList = listOfBackboneFeatures.Select(x =>
            {
                var geometry = UnaryUnionOp.Union(x.BackboneSegmentGeometry4326);
                var feature = new Feature() { Geometry = geometry, Attributes = new AttributesTable() };
                feature.Attributes.Add("dummy", "dummy");
                return feature;
            });

            foreach (var feature in featureList)
            {
                featureCollection.Add(feature);
            }

            var gjw = new GeoJsonWriter
            {
                SerializerSettings =
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    FloatParseHandling = FloatParseHandling.Decimal,
                    Formatting = Formatting.Indented
                }
            };

            var write = gjw.Write(featureCollection);

            return Ok(write);
        }
    }
}
