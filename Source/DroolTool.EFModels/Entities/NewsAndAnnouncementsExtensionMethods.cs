using System;
using System.Collections.Generic;
using System.Text;
using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities
{
    public static class NewsAndAnnouncementsExtensionMethods
    {
        public static NewsAndAnnouncementsDto AsDto(this NewsAndAnnouncements newsAndAnnouncements)
        {
            return new NewsAndAnnouncementsDto()
            {
                NewsAndAnnouncementsID = newsAndAnnouncements.NewsAndAnnouncementsID,
                Title = newsAndAnnouncements.NewsAndAnnouncementsTitle,
                Link = newsAndAnnouncements.NewsAndAnnouncementsLink,
                Date = newsAndAnnouncements.NewsAndAnnouncementsDate,
                LastUpdatedByUser = newsAndAnnouncements.NewsAndAnnouncementsLastUpdatedByUser.AsSimpleDto(),
                LastUpdatedDate = newsAndAnnouncements.NewsAndAnnouncementsLastUpdatedDate,
                FileResourceGUIDAsString = newsAndAnnouncements.FileResource.FileResourceGUID.ToString()
            };
        }
    }
}
