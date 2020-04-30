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
    public class WatershedController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;

        public WatershedController(DroolToolDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("watershed/get-mask")]
        public ActionResult<string> GetExplorerMask()
        {
            var watersheds = _dbContext.Watershed.Select(x => x.WatershedGeometry4326);
            var geometry = UnaryUnionOp.Union(watersheds);

            return Ok(GeoJsonWriterService.buildFeatureCollectionAndWriteGeoJson(new List<Feature> { new Feature() { Geometry = geometry } }));
        }

        [HttpGet("watershed/{OCSurveyNeighborhoodID}/get-metrics/")]
        public ActionResult<DroolWatershedMetricDto> GetWatershedExplorerMetrics([FromRoute] int OCSurveyNeighborhoodID)
        {
            var DroolWatershedMetric = _dbContext.vDroolWatershedMetric
                .Where(x => x.OCSurveyCatchmentID == OCSurveyNeighborhoodID)
                .OrderByDescending(x => x.MetricDate)
                .FirstOrDefault()
                .AsDto();

            return Ok(DroolWatershedMetric);
        }
    }
}
