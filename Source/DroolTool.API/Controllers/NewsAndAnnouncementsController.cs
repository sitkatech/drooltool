using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using DroolTool.Models.DataTransferObjects;
using DroolTool.Models.DataTransferObjects.NewsAndAnnouncements;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Features;
using NetTopologySuite.Operation.Union;

namespace DroolTool.API.Controllers
{
    public class NewsAndAnnouncementsController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;

        public NewsAndAnnouncementsController(DroolToolDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("news-and-announcements/get-news-and-announcements")]
        public ActionResult<List<NewsAndAnnouncementsDto>> GetNewsAndAnnouncements()
        {
            return Ok(NewsAndAnnouncements.GetNewsAndAnnouncements(_dbContext));
        }

        [HttpPost("news-and-announcements/upsert-news-and-announcements/{upsertDto}")]
        public async Task<ActionResult> UpsertNewsAndAnnouncements([FromRoute] NewsAndAnnouncementsUpsertDto upsertDto)
        {
            if (upsertDto.NewsAndAnnouncementsID != null)
            {
                var fileResource = await HttpUtilities.MakeFileResourceFromHttpRequest(Request, _dbContext, HttpContext);
                _dbContext.FileResource.Add(fileResource);
                _dbContext.SaveChanges();

                NewsAndAnnouncements.CreateNewsAndAnnouncementsEntity(_dbContext, upsertDto.Title, upsertDto.Date, upsertDto.Link, UserContext.GetUserFromHttpContext(_dbContext, HttpContext).UserID, fileResource.FileResourceID);
            }
            else
            {
                
            }
            return Ok();
        }
    }
}