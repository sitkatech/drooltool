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
using IdentityModel.Client;
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
            return Ok(Announcements.GetAnnouncementsByDate(_dbContext));
        }

        [HttpGet("announcement/get-announcements-for-homepage")]
        public ActionResult<List<AnnouncementDto>> GetAnnouncementsForHomepage()
        {
            return Ok(Announcements.GetAnnouncementsByDate(_dbContext, 2));
        }

        [HttpPost("announcement/upsert-announcement")]
        public async Task<ActionResult> UpsertAnnouncement([FromForm]AnnouncementUpsertDto upsertDto, [FromForm] IFormFile image)
        {
            var userDto = UserContext.GetUserFromHttpContext(_dbContext, HttpContext);
            if (upsertDto.AnnouncementID == -1)
            {
                Announcements.CreateAnnouncementEntity(_dbContext, upsertDto, userDto.UserID, await UploadImage(image, userDto));
            }
            else
            {
                var fileResourceID = image != null
                    ? await UploadImage(image, userDto)
                    : -1;

                Announcements.UpdateAnnouncementEntity(_dbContext, upsertDto,
                    userDto.UserID, fileResourceID);
            }
            return Ok();
        }

        [HttpDelete("announcement/{announcementID}/delete")]
        public ActionResult DeleteAnnouncementEntity([FromRoute] int announcementID)
        {
            var announcementDto =
                _dbContext.Announcements.SingleOrDefault(x =>
                    x.AnnouncementID == announcementID);
            if (announcementDto == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Announcements.Delete(_dbContext, announcementID);
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

            var fileResourceMimeType = FileResourceMimeTypes.GetFileResourceMimeTypeByContentTypeName(_dbContext,
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

            _dbContext.FileResources.Add(fileResource);
            _dbContext.SaveChanges();

            return fileResource.FileResourceID;
        }
    }
}