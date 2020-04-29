using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using DroolTool.EFModels.Entities;
using DroolTool.Models.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace DroolTool.API.Controllers
{
    public class WatershedExplorerController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;

        public WatershedExplorerController(DroolToolDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("watershed-explorer/get-metrics/{OCSurveyNeighborhoodID")]
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
