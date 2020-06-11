using System;
using System.Collections.Generic;
using DroolTool.Models.DataTransferObjects;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DroolTool.EFModels.Entities
{
    public partial class NewsAndAnnouncements
    {
        public static List<NewsAndAnnouncementsDto> GetNewsAndAnnouncements(DroolToolDbContext dbContext)
        {
            return dbContext.NewsAndAnnouncements.Select(x => x.AsDto()).ToList();
        }

        public static void CreateNewsAndAnnouncementsEntity(DroolToolDbContext dbContext, string title, DateTime date, string link, int userID, int fileResourceID)
        {
            var newsAndUpdatesEntity = new NewsAndAnnouncements()
            {
                NewsAndAnnouncementsTitle = title,
                NewsAndAnnouncementsDate = date,
                NewsAndAnnouncementsLink = link,
                NewsAndAnnouncementsLastUpdatedByUserID = userID,
                NewsAndAnnouncementsLastUpdatedDate = DateTime.Now,
                FileResourceID = fileResourceID
            };

            dbContext.NewsAndAnnouncements.Add(newsAndUpdatesEntity);
            dbContext.SaveChanges();
        }
    }
}