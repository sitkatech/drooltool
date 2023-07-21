using System;
using System.Collections.Generic;
using DroolTool.Models.DataTransferObjects;
using System.Linq;
using System.Net;
using DroolTool.Models.DataTransferObjects.Announcement;
using Microsoft.EntityFrameworkCore;

namespace DroolTool.EFModels.Entities
{
    public partial class Announcement
    {
        public static List<AnnouncementDto> GetAnnouncements(DroolToolDbContext dbContext)
        {
            return dbContext.Announcements
                .Include(x => x.LastUpdatedByUser)
                .Include(x => x.FileResource)
                .Select(x => x.AsDto()).ToList();
        }

        public static List<AnnouncementDto> GetAnnouncementsByDate(DroolToolDbContext dbContext, int? numToTake = null)
        {
            var query = dbContext.Announcements
                .Include(x => x.LastUpdatedByUser)
                .Include(x => x.FileResource)
                .OrderByDescending(x => x.AnnouncementDate);

            if (numToTake != null)
            {
                query = (IOrderedQueryable<Announcement>)query.Take((int)numToTake);
            }

            return query.Select(x => x.AsDto())
                .ToList();
        }

        public static void CreateAnnouncementEntity(DroolToolDbContext dbContext, AnnouncementUpsertDto upsertDto, int userID, int fileResourceID)
        {
            var announcement = new Announcement()
            {
                AnnouncementTitle = upsertDto.AnnouncementTitle,
                AnnouncementDate = Convert.ToDateTime(upsertDto.AnnouncementDate),
                AnnouncementLink = upsertDto.AnnouncementLink,
                LastUpdatedByUserID = userID,
                LastUpdatedDate = DateTime.Now,
                FileResourceID = fileResourceID
            };

            dbContext.Announcements.Add(announcement);
            dbContext.SaveChanges();
        }

        public static void UpdateAnnouncementEntity(DroolToolDbContext dbContext, AnnouncementUpsertDto upsertDto, int userID, int fileResourceID)
        {
            var announcementEntity = dbContext.Announcements
                .Single(x => x.AnnouncementID == upsertDto.AnnouncementID);

            announcementEntity.AnnouncementTitle = upsertDto.AnnouncementTitle;
            announcementEntity.AnnouncementDate = upsertDto.AnnouncementDate;
            announcementEntity.AnnouncementLink = upsertDto.AnnouncementLink;

            if (fileResourceID != -1)
            {
                //Get old image
                var oldFileResource =
                    dbContext.FileResources.Single(x => x.FileResourceID == announcementEntity.FileResourceID);
                //Change ref
                announcementEntity.FileResourceID = fileResourceID;
                //Delete image because now it's not referencing elsewhere
                dbContext.FileResources.Remove(oldFileResource);
            }

            announcementEntity.LastUpdatedByUserID = userID;
            announcementEntity.LastUpdatedDate = DateTime.Now;

            dbContext.SaveChanges();
        }

        public static void Delete(DroolToolDbContext dbContext, int announcementID)
        {
            var announcementEntity = dbContext.Announcements
                .Single(x => x.AnnouncementID == announcementID);
            var fileResourceEntity =
                dbContext.FileResources.Single(x => x.FileResourceID == announcementEntity.FileResourceID);
            dbContext.Announcements.Remove(announcementEntity);
            dbContext.FileResources.Remove(fileResourceEntity);
            dbContext.SaveChanges();
        }
    }
}