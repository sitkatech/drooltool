using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet("watershed-mask/{watershedAliasName}/get-watershed-mask")]
        public ActionResult<string> GetWatershedMask([FromRoute] string watershedAliasName)
        {
            var geometry = watershedAliasName != "All Watersheds" 
                ? _dbContext.WatershedAlias
                    .SingleOrDefault(x => x.WatershedAliasName == watershedAliasName)
                    ?.WatershedAliasGeometry4326
                : UnaryUnionOp.Union(_dbContext.WatershedMask.Select(x => x.WatershedMaskGeometry4326));

            return Ok(GeoJsonWriterService.buildFeatureCollectionAndWriteGeoJson(new List<Feature> { new Feature() { Geometry = geometry } }));
        }
    }
}
