using System.Collections.Generic;
using System.Linq;
using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using Microsoft.AspNetCore.Mvc;
using NetTopologySuite.Features;
using NetTopologySuite.Operation.Union;

namespace DroolTool.API.Controllers
{
    public class WatershedMaskController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;

        public WatershedMaskController(DroolToolDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("watershed-mask/get-watershed-mask")]
        public ActionResult<string> GetWatershedMask([FromRoute] string watershedName)
        {
            var watersheds = _dbContext.WatershedMask.Select(x => x.WatershedMaskGeometry4326);
            var geometry = UnaryUnionOp.Union(watersheds);

            return Ok(GeoJsonWriterService.buildFeatureCollectionAndWriteGeoJson(new List<Feature> { new Feature() { Geometry = geometry } }));
        }
    }
}
