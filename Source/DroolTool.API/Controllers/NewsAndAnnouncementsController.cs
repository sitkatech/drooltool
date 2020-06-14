using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using DroolTool.Models.DataTransferObjects;
using DroolTool.Models.DataTransferObjects.NewsAndAnnouncements;
using DroolTool.Models.DataTransferObjects.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Features;
using NetTopologySuite.Operation.Union;
using Newtonsoft.Json;
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

        [HttpPost("news-and-announcements/upsert-news-and-announcements")]
        public async Task<ActionResult> UpsertNewsAndAnnouncements()
        {
            var upsertDto = JsonConvert.DeserializeObject<NewsAndAnnouncementsUpsertDto>(Request.Form["model"]);
            var userDto = UserContext.GetUserFromHttpContext(_dbContext, HttpContext);
            if (upsertDto.NewsAndAnnouncementsID == -1)
            { 
                NewsAndAnnouncements.CreateNewsAndAnnouncementsEntity(_dbContext, upsertDto, userDto.UserID, await UploadImage(Request.Form.Files[0], userDto));
            }
            else
            {
                var fileResourceID = Request.Form.Files.Count > 0
                    ? await UploadImage(Request.Form.Files[0], userDto)
                    : -1;

                NewsAndAnnouncements.UpdateNewsAndAnnouncementsEntity(_dbContext, upsertDto,
                    userDto.UserID, fileResourceID);
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

        private async Task<int> UploadImage(IFormFile file, UserDto user)
        {
            byte[] bytes;

            await using (var ms = new MemoryStream(2048))
            {
                await file.CopyToAsync(ms);
                bytes = ms.ToArray();
            }

            var fileResourceMimeType = FileResourceMimeType.GetFileResourceMimeTypeByContentTypeName(_dbContext,
                file.ContentType);

            var clientFilename = file.FileName;
            var extension = clientFilename.Split('.').Last();
            var fileResourceGuid = Guid.NewGuid();
            var fileResource = new FileResource
            {
                CreateDate = DateTime.Now,
                CreateUserID = user.UserID,
                FileResourceData = bytes,
                FileResourceGUID = fileResourceGuid,
                FileResourceMimeTypeID = fileResourceMimeType.FileResourceMimeTypeID,
                OriginalBaseFilename = clientFilename,
                OriginalFileExtension = extension,
            };

            _dbContext.FileResource.Add(fileResource);
            _dbContext.SaveChanges();

            return fileResource.FileResourceID;
        }
    }
}