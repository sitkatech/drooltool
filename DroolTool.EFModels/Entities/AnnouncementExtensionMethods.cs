using System;
using System.Collections.Generic;
using System.Text;
using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities
{
    public static partial class AnnouncementExtensionMethods
    {
        static partial void DoCustomMappings(Announcement announcement, AnnouncementDto announcementDto)
        {
            announcementDto.FileResourceGUIDAsString = announcement.FileResource.FileResourceGUID.ToString();
        }
    }
}
