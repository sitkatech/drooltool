using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DroolTool.API.Services.Authorization;
using DroolTool.EFModels.Entities;

namespace DroolTool.API.Controllers
{
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;
        private readonly ILogger<RoleController> _logger;

        public RoleController(DroolToolDbContext dbContext, ILogger<RoleController> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        [HttpGet("roles")]
        [UserManageFeature]
        public IActionResult Get()
        {
            var roleDtos = Role.List(_dbContext);
            return Ok(roleDtos);
        }
    }
}