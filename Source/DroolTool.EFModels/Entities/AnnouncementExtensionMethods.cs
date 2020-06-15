using System;
using System.Collections.Generic;
using System.Text;
using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities
{
    public static class AnnouncementExtensionMethods
    {
        public static AnnouncementDto AsDto(this Announcement announcement)
        {
            return new AnnouncementDto()
            {
                AnnouncementID = announcement.AnnouncementID,
                AnnouncementTitle = announcement.AnnouncementTitle,
                AnnouncementLink = announcement.AnnouncementLink,
                AnnouncementDate  = announcement.AnnouncementDate,
                LastUpdatedByUser = announcement.LastUpdatedByUser.AsSimpleDto(),
                LastUpdatedDate = announcement.LastUpdatedDate,
                FileResourceGUIDAsString = announcement.FileResource.FileResourceGUID.ToString()
            };
        }
    }
}
