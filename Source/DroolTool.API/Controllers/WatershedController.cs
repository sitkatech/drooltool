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
using Microsoft.Extensions.Localization.Internal;
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

        [HttpGet("watershed/get-watershed-names")]
        public ActionResult<List<string>> GetWatershedNames()
        {
            return Ok(_dbContext.Watershed.Select(x => x.WatershedName).ToList());
        }

        [HttpGet("watershed/{watershedName}/get-watershed-mask")]
        public ActionResult<string> GetWatershedMask([FromRoute] string watershedName)
        {
            var watersheds = watershedName == "All Watersheds"
                ? _dbContext.Watershed.Select(x => x.WatershedGeometry4326)
                : _dbContext.Watershed.Where(x => x.WatershedName == watershedName)
                    .Select(x => x.WatershedGeometry4326);
            var geometry = UnaryUnionOp.Union(watersheds);

            return Ok(GeoJsonWriterService.buildFeatureCollectionAndWriteGeoJson(new List<Feature> { new Feature() { Geometry = geometry } }));
        }

        [HttpGet("watershed/{OCSurveyNeighborhoodID}/get-metrics/")]
        public ActionResult<DroolWatershedMetricDto> GetWatershedExplorerMetrics([FromRoute] int OCSurveyNeighborhoodID)
        {
            var droolWatershedMetric = _dbContext.vDroolWatershedMetric
                .Where(x => x.OCSurveyCatchmentID == OCSurveyNeighborhoodID)
                .OrderByDescending(x => x.MetricDate)
                .FirstOrDefault()
                .AsDto();

            return Ok(droolWatershedMetric);
        }

        [HttpGet("watershed/get-most-recent-metric/")]
        public ActionResult<DroolWatershedMetricDto> GetMostRecentMetric()
        {
            return _dbContext.vDroolWatershedMetric
                .OrderByDescending(x => x.MetricDate)
                .FirstOrDefault()
                .AsDto();
        }
    }
}
