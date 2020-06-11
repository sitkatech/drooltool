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
    }
}