﻿using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Features;
using NetTopologySuite.Operation.Union;
using System;
using System.Collections.Generic;
using System.Linq;

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
            return Ok(_dbContext.Neighborhoods.Where(x => x.BackboneSegments.Any()).Select(x => x.NeighborhoodID).ToList());
        }

        [HttpGet("neighborhood/{neighborhoodID}/get-stormshed")]
        public ActionResult<string> GetStormshed([FromRoute]int neighborhoodID)
        {
            var backboneAccumulated = new List<vBackboneWithoutGeometry>();

            var allBackboneSegments = _dbContext.vBackboneWithoutGeometries
                .Where(x => x.BackboneSegmentTypeID != (int)BackboneSegmentTypeEnum.Channel)
                .ToList();

            var lookingAt = allBackboneSegments.Where(x => x.NeighborhoodID == neighborhoodID).ToList();

            while (lookingAt.Any())
            {
                backboneAccumulated.AddRange(lookingAt);

                var downFromHere =
                    GetDownstreamBackboneSegmentsBasedOnCriteria(allBackboneSegments, lookingAt);

                var upFromHere = GetInverseDownstreamBackboneSegmentsBasedOnCriteria(allBackboneSegments, lookingAt);

                /*
                 * NP 8/6/2020
                 * The .Except() is necessary here because the trace is bidirectional, so after we go
                 * from segment A to segment B, we can go back up from B to A if we're not careful.
                 * Thus: infinite loop, and we are sad.
                 * (Technically this is still making one redundant step from B back to A, but this won't
                 * reoccur after the next iteration, and the total number of steps across the graph is
                 * still bounded linearly by the diameter of the graph as it should be.
                 * Sharper bounds on the bounding factor are possible with refactoring but unnecessary,
                 * given current performance.)
                 */
                lookingAt = upFromHere.Union(downFromHere).Except(backboneAccumulated).ToList();
            }

            var neighborhoodIDs = backboneAccumulated.Select(x => x.NeighborhoodID).Distinct();
            var neighborhoods =
                _dbContext.Neighborhoods.Where(x => neighborhoodIDs.Contains(x.NeighborhoodID)).ToList();


            var wholeStormshedFeature = new Feature()
            {
                Geometry = UnaryUnionOp.Union(neighborhoods.Select(x => x.NeighborhoodGeometry4326).ToList()),
                Attributes = new AttributesTable() 
            };

            var stormshedMinusNeighborhoodFeature = new Feature()
            {
                Geometry = UnaryUnionOp.Union(neighborhoods.Where(x=>x.NeighborhoodID != neighborhoodID).Select(x=>x.NeighborhoodGeometry4326).ToList()),
                Attributes = new AttributesTable()
            };
            
            wholeStormshedFeature.Attributes.Add("NeighborhoodIDs", neighborhoods.Select(x => x.NeighborhoodID).ToList());
            wholeStormshedFeature.Attributes.Add("Name", "WholeStormshed");

            stormshedMinusNeighborhoodFeature.Attributes.Add("Name", "StormshedMinusNeighborhood");


            return Ok(GeoJsonWriterService.buildFeatureCollectionAndWriteGeoJson(new List<Feature> { wholeStormshedFeature, stormshedMinusNeighborhoodFeature}));
        }

        [HttpGet("neighborhood/{neighborhoodID}/get-downstream-backbone-trace")]
        public ActionResult<string> GetDownstreamBackboneTrace([FromRoute] int neighborhoodID)
        {
            var backboneAccumulated = new List<vBackboneWithoutGeometry>();

            var allBackboneSegments = _dbContext.vBackboneWithoutGeometries
                .ToList();

            var lookingAt = allBackboneSegments.Where(x => x.NeighborhoodID == neighborhoodID).ToList();

            while (lookingAt.Any())
            {
                backboneAccumulated.AddRange(lookingAt);

                lookingAt = GetDownstreamBackboneSegmentsBasedOnCriteria(allBackboneSegments, lookingAt);
            }
            
            var backboneSegmentIDs = backboneAccumulated.Select(y => y.BackboneSegmentID).ToList();
            var backboneSegments = _dbContext.BackboneSegments.Where(
                x => backboneSegmentIDs.Contains(x.BackboneSegmentID)
            );
            
            var featureList = backboneSegments.ToList().Select(x =>
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
            var backboneAccumulated = new List<vBackboneWithoutGeometry>();

            var allBackboneSegments = _dbContext.vBackboneWithoutGeometries
                .ToList();

            var lookingAt = allBackboneSegments.Where(x => x.NeighborhoodID == neighborhoodID).ToList();

            while (lookingAt.Any())
            {
                backboneAccumulated.AddRange(lookingAt);

                lookingAt = GetInverseDownstreamBackboneSegmentsBasedOnCriteria(allBackboneSegments, lookingAt);
            }
            
            var backboneSegmentIDs = backboneAccumulated.Select(y => y.BackboneSegmentID).ToList();
            var backboneSegments = _dbContext.BackboneSegments
                .Include(x => x.Neighborhood)
                .Where(x => backboneSegmentIDs.Contains(x.BackboneSegmentID)
            ).ToList();

            var featureList = backboneSegments.Select(x =>
            {
                var geometry = UnaryUnionOp.Union(x.BackboneSegmentGeometry4326);
                return new Feature { Geometry = geometry };
            }).ToList();

            var stormshed = backboneSegments.Select(x => x.Neighborhood)
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

        [HttpGet("neighborhood/get-serviced-neighborhoods-watershed-names")]
        public ActionResult<List<string>> GetServicedNeighborhoodWatershedNames()
        {
            var watershedsInMask = _dbContext.WatershedMasks;
            return _dbContext.WatershedAliases
                .Where(x => watershedsInMask.Any(y => x.WatershedAliasName.Contains(y.WatershedMaskName)))
                .Select(x => x.WatershedAliasName)
                .ToList();
        }

        private List<vBackboneWithoutGeometry> GetDownstreamBackboneSegmentsBasedOnCriteria(List<vBackboneWithoutGeometry> allBackboneSegments,
            List<vBackboneWithoutGeometry> accumulatedBackboneSegments)
        {
            var backboneIDsThatMeetCriteria = allBackboneSegments.Where(accumulatedBackboneSegments.Contains)
                .Where(x => x.DownstreamBackboneSegmentID.HasValue)
                .Select(x => x.DownstreamBackboneSegmentID.Value)
                .ToList();
            return allBackboneSegments.Where(x => backboneIDsThatMeetCriteria.Contains(x.BackboneSegmentID)).Except(accumulatedBackboneSegments).Distinct().ToList();
        }
        private List<vBackboneWithoutGeometry> GetInverseDownstreamBackboneSegmentsBasedOnCriteria(List<vBackboneWithoutGeometry> allBackboneSegments,
            List<vBackboneWithoutGeometry> accumulatedBackboneSegments)
        {
            var backboneIDsThatMeetCriteria =
                allBackboneSegments.Where(x => x.DownstreamBackboneSegmentID != null &&
                    accumulatedBackboneSegments.Select(y => y.BackboneSegmentID)
                        .Contains(x.DownstreamBackboneSegmentID.Value)).Select(x => x.BackboneSegmentID).Distinct().ToList();

            return allBackboneSegments.Where(x => backboneIDsThatMeetCriteria.Contains(x.BackboneSegmentID)).Except(accumulatedBackboneSegments).Distinct().ToList();
        }
    }

    // trying to return a date directly from GetDefaultMetricDisplayDate led to a weird off-by-one error related to timezone offsets,
    // so I just return the year and month which are all we need anyway.
    public class MetricDateDto
    {
        public int Year { get; set; }
        public int Month { get; set; }
    }
}
