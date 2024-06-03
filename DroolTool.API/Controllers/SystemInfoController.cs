using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using DroolTool.Models.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Features;
using NetTopologySuite.Operation.Union;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;

namespace DroolTool.API.Controllers
{
    public class SystemInfoController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;
        private readonly DroolToolConfiguration _droolToolConfiguration;

        public SystemInfoController(DroolToolDbContext dbContext,
            IOptions<DroolToolConfiguration> drooltoolConfigurationOptions)
        {
            _dbContext = dbContext;
            _droolToolConfiguration = drooltoolConfigurationOptions.Value;
        }

        [HttpGet("/", Name = "GetSystemInfo")]
        [AllowAnonymous]
        public ActionResult<SystemInfoDto> GetSystemInfo([FromServices] IWebHostEnvironment environment)
        {
            SystemInfoDto systemInfo = new SystemInfoDto
            {
                Environment = environment.EnvironmentName,
                CurrentTimeUTC = DateTime.UtcNow.ToString("o"),
                PodName = _droolToolConfiguration.HostName
            };
            return Ok(systemInfo);
        }

    }
}
