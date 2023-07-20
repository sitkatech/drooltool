using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DroolTool.API.Services.Authorization;
using DroolTool.EFModels.Entities;
using DroolTool.Models.DataTransferObjects;

namespace DroolTool.API.Controllers
{
    [ApiController]
    public class CustomRichTextController
        : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;
        private readonly ILogger<RoleController> _logger;

        public CustomRichTextController(DroolToolDbContext dbContext, ILogger<RoleController> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }



        [HttpGet("customRichText/{customRichTextTypeID}")]
        public ActionResult<CustomRichTextDto> GetCustomRichText([FromRoute] int customRichTextTypeID)
        {
            var customRichTextDto = CustomRichText.GetByCustomRichTextTypeID(_dbContext, customRichTextTypeID);
            if (customRichTextDto == null)
            {
                return NotFound();
            }

            return Ok(customRichTextDto);
        }

        [HttpPut("customRichText/{customRichTextTypeID}")]
        [ContentManageFeature]
        public ActionResult<CustomRichTextDto> UpdateCustomRichText([FromRoute] int customRichTextTypeID,
            [FromBody] CustomRichTextDto customRichTextUpdateDto)
        {
            var customRichTextDto = CustomRichText.GetByCustomRichTextTypeID(_dbContext, customRichTextTypeID);
            if (customRichTextDto == null)
            {
                return NotFound();
            }

            var updatedCustomRichTextDto = CustomRichText.UpdateCustomRichText(_dbContext, customRichTextTypeID, customRichTextUpdateDto);

            return Ok(updatedCustomRichTextDto);
        }
    }
}
