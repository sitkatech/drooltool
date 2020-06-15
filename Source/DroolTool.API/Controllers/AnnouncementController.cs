using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using DroolTool.Models.DataTransferObjects;
using DroolTool.Models.DataTransferObjects.Announcement;
using DroolTool.Models.DataTransferObjects.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DroolTool.API.Controllers
{
    public class AnnouncementController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;

        public AnnouncementController(DroolToolDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("announcement/get-announcements")]
        public ActionResult<List<AnnouncementDto>> GetAnnouncements()
        {
            return Ok(Announcement.GetAnnouncements(_dbContext));
        }

        [HttpGet("announcement/get-announcements-for-homepage")]
        public ActionResult<List<AnnouncementDto>> GetAnnouncementsForHomepage()
        {
            return Ok(Announcement.GetAnnouncementsByDate(_dbContext, 2));
        }

        [HttpPost("announcement/upsert-announcement")]
        public async Task<ActionResult> UpsertAnnouncement()
        {
            var upsertDto = JsonConvert.DeserializeObject<AnnouncementUpsertDto>(Request.Form["model"]);
            var userDto = UserContext.GetUserFromHttpContext(_dbContext, HttpContext);
            if (upsertDto.AnnouncementID == -1)
            {
                Announcement.CreateAnnouncementEntity(_dbContext, upsertDto, userDto.UserID, await UploadImage(Request.Form.Files[0], userDto));
            }
            else
            {
                var fileResourceID = Request.Form.Files.Count > 0
                    ? await UploadImage(Request.Form.Files[0], userDto)
                    : -1;

                Announcement.UpdateAnnouncementEntity(_dbContext, upsertDto,
                    userDto.UserID, fileResourceID);
            }
            return Ok();
        }

        [HttpDelete("announcement/{announcementID}/delete")]
        public ActionResult DeleteAnnouncementEntity([FromRoute] int announcementID)
        {
            var announcementDto =
                _dbContext.Announcement.SingleOrDefault(x =>
                    x.AnnouncementID == announcementID);
            if (announcementDto == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Announcement.Delete(_dbContext, announcementID);
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