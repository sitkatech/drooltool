using System;
using System.Collections.Generic;
using System.Diagnostics;
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
using Newtonsoft.Json.Linq;

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

        [HttpGet("news-and-announcements/get-news-and-announcements-for-homepage")]
        public ActionResult<List<NewsAndAnnouncementsDto>> GetNewsAndAnnouncementsForHomepage()
        {
            return Ok(NewsAndAnnouncements.GetNewsAndAnnouncementsByDate(_dbContext, 2));
        }

        [HttpPost("news-and-announcements/upsert-news-and-announcements/{newsAndAnnouncementsID}/{title}/{date}/{link?}")]
        public async Task<ActionResult> UpsertNewsAndAnnouncements([FromRoute] int newsAndAnnouncementsID, [FromRoute] string title, [FromRoute] string date, [FromRoute] string link = null)
        {
            if (newsAndAnnouncementsID == -1)
            {
                var fileResource = await HttpUtilities.MakeFileResourceFromHttpRequest(Request, _dbContext, HttpContext);
                _dbContext.FileResource.Add(fileResource);
                _dbContext.SaveChanges();

                NewsAndAnnouncements.CreateNewsAndAnnouncementsEntity(_dbContext, title, Convert.ToDateTime(date), link, UserContext.GetUserFromHttpContext(_dbContext, HttpContext).UserID, fileResource.FileResourceID);
            }
            else
            {
                var fileResourceID = -1;
                if (Request.ContentLength != 0)
                {
                    var fileResource = await HttpUtilities.MakeFileResourceFromHttpRequest(Request, _dbContext, HttpContext);
                    _dbContext.FileResource.Add(fileResource);
                    _dbContext.SaveChanges();
                    fileResourceID = fileResource.FileResourceID;
                }

                NewsAndAnnouncements.UpdateNewsAndAnnouncementsEntity(_dbContext, newsAndAnnouncementsID, title, Convert.ToDateTime(date), link,
                    UserContext.GetUserFromHttpContext(_dbContext, HttpContext).UserID, fileResourceID);
            }
            return Ok();
        }

        [HttpDelete("news-and-announcements/{newsAndAnnouncementsID}/delete")]
        public ActionResult DeleteNewsAndAnnouncementsEntity([FromRoute] int newsAndAnnouncementsID)
        {
            var newsAndAnnouncementsDto =
                _dbContext.NewsAndAnnouncements.SingleOrDefault(x =>
                    x.NewsAndAnnouncementsID == newsAndAnnouncementsID);
            if (newsAndAnnouncementsDto == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            NewsAndAnnouncements.Delete(_dbContext, newsAndAnnouncementsID);
            return Ok();
        }
    }
}