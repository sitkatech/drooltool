﻿using System.Collections.Generic;
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

        [HttpGet("watershed-mask/{watershedName}/get-watershed-mask")]
        public ActionResult<string> GetWatershedMask([FromRoute] string watershedName)
        {
            var geometry = watershedName != "All Watersheds" 
                ? _dbContext.WatershedAlias
                    .Include(x => x.WatershedMask)
                    .Single(x => x.WatershedAliasName == watershedName)
                    .WatershedMask?.WatershedMaskGeometry4326
                : UnaryUnionOp.Union(_dbContext.WatershedMask.Select(x => x.WatershedMaskGeometry4326));

            return Ok(GeoJsonWriterService.buildFeatureCollectionAndWriteGeoJson(new List<Feature> { new Feature() { Geometry = geometry } }));
        }
    }
}
