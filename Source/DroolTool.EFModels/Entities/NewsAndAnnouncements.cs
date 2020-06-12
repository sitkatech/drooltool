using System;
using System.Collections.Generic;
using DroolTool.Models.DataTransferObjects;
using System.Linq;
using System.Net;
using Microsoft.EntityFrameworkCore;

namespace DroolTool.EFModels.Entities
{
    public partial class NewsAndAnnouncements
    {
        public static List<NewsAndAnnouncementsDto> GetNewsAndAnnouncements(DroolToolDbContext dbContext)
        {
            return dbContext.NewsAndAnnouncements
                .Include(x => x.NewsAndAnnouncementsLastUpdatedByUser)
                .Include(x => x.FileResource)
                .Select(x => x.AsDto()).ToList();
        }

        public static List<NewsAndAnnouncementsDto> GetNewsAndAnnouncementsByDate(DroolToolDbContext dbContext, int? numToTake = null)
        {
            var query = dbContext.NewsAndAnnouncements
                .Include(x => x.NewsAndAnnouncementsLastUpdatedByUser)
                .Include(x => x.FileResource)
                .OrderByDescending(x => x.NewsAndAnnouncementsDate);

            if (numToTake != null)
            {
                query = (IOrderedQueryable<NewsAndAnnouncements>) query.Take((int)numToTake);
            }

            return query.Select(x => x.AsDto())
                .ToList();
        }

        public static void CreateNewsAndAnnouncementsEntity(DroolToolDbContext dbContext, string title, DateTime date, string link, int userID, int fileResourceID)
        {
            var newsAndUpdatesEntity = new NewsAndAnnouncements()
            {
                NewsAndAnnouncementsTitle = title,
                NewsAndAnnouncementsDate = date,
                NewsAndAnnouncementsLink = WebUtility.UrlDecode(link),
                NewsAndAnnouncementsLastUpdatedByUserID = userID,
                NewsAndAnnouncementsLastUpdatedDate = DateTime.Now,
                FileResourceID = fileResourceID
            };

            dbContext.NewsAndAnnouncements.Add(newsAndUpdatesEntity);
            dbContext.SaveChanges();
        }

        public static void UpdateNewsAndAnnouncementsEntity(DroolToolDbContext dbContext, int newsAndAnnouncementsID, string title, DateTime date, string link, int userID, int fileResourceID)
        {
            var newsAndAnnouncementsEntity = dbContext.NewsAndAnnouncements
                .Single(x => x.NewsAndAnnouncementsID == newsAndAnnouncementsID);

            newsAndAnnouncementsEntity.NewsAndAnnouncementsTitle = title;
            newsAndAnnouncementsEntity.NewsAndAnnouncementsDate = date;
            newsAndAnnouncementsEntity.NewsAndAnnouncementsLink = WebUtility.UrlDecode(link);
            
            if (fileResourceID != -1)
            {
                //Get old image
                var oldFileResource =
                    dbContext.FileResource.Single(x => x.FileResourceID == newsAndAnnouncementsEntity.FileResourceID);
                //Change ref
                newsAndAnnouncementsEntity.FileResourceID = fileResourceID;
                //Delete image because now it's not referencing elsewhere
                dbContext.FileResource.Remove(oldFileResource);
            }

            newsAndAnnouncementsEntity.NewsAndAnnouncementsLastUpdatedByUserID = userID;
            newsAndAnnouncementsEntity.NewsAndAnnouncementsLastUpdatedDate = DateTime.Now;

            dbContext.SaveChanges();
        }

        public static void Delete(DroolToolDbContext dbContext, int newsAndAnnouncementsID)
        {
            var newsAndAnnouncementsEntity = dbContext.NewsAndAnnouncements
                .Single(x => x.NewsAndAnnouncementsID == newsAndAnnouncementsID);
            var fileResourceEntity =
                dbContext.FileResource.Single(x => x.FileResourceID == newsAndAnnouncementsEntity.FileResourceID);
            dbContext.NewsAndAnnouncements.Remove(newsAndAnnouncementsEntity);
            dbContext.FileResource.Remove(fileResourceEntity);
            dbContext.SaveChanges();
        }
    }
}