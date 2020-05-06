﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using DroolTool.EFModels.Entities;
using DroolTool.API.Services;
using DroolTool.Models.DataTransferObjects;
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

        [HttpGet("neighborhood/{OCSurveyNeighborhoodID}/get-metrics/")]
        public ActionResult<NeighborhoodMetricDto> GetWatershedExplorerMetrics([FromRoute] int OCSurveyNeighborhoodID)
        {
            var neighborhoodMetric = _dbContext.vNeighborhoodMetric
                .Where(x => x.OCSurveyCatchmentID == OCSurveyNeighborhoodID)
                .OrderByDescending(x => x.MetricDate)
                .FirstOrDefault()
                .AsDto();

            return Ok(neighborhoodMetric);
        }

        [HttpGet("neighborhood/get-most-recent-metric/")]
        public ActionResult<NeighborhoodMetricDto> GetMostRecentMetric()
        {
            return _dbContext.vNeighborhoodMetric
                .OrderByDescending(x => x.MetricDate)
                .FirstOrDefault()
                .AsDto();
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
