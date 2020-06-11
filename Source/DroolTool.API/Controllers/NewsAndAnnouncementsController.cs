using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using DroolTool.Models.DataTransferObjects;
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
    }
}