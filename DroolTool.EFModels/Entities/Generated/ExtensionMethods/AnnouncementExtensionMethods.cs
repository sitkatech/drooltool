//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[Announcement]

using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities
{
    public static partial class AnnouncementExtensionMethods
    {
        public static AnnouncementDto AsDto(this Announcement announcement)
        {
            var announcementDto = new AnnouncementDto()
            {
                AnnouncementID = announcement.AnnouncementID,
                AnnouncementDate = announcement.AnnouncementDate,
                AnnouncementTitle = announcement.AnnouncementTitle,
                AnnouncementLink = announcement.AnnouncementLink,
                FileResource = announcement.FileResource.AsDto(),
                LastUpdatedByUser = announcement.LastUpdatedByUser.AsDto(),
                LastUpdatedDate = announcement.LastUpdatedDate
            };
            DoCustomMappings(announcement, announcementDto);
            return announcementDto;
        }

        static partial void DoCustomMappings(Announcement announcement, AnnouncementDto announcementDto);

        public static AnnouncementSimpleDto AsSimpleDto(this Announcement announcement)
        {
            var announcementSimpleDto = new AnnouncementSimpleDto()
            {
                AnnouncementID = announcement.AnnouncementID,
                AnnouncementDate = announcement.AnnouncementDate,
                AnnouncementTitle = announcement.AnnouncementTitle,
                AnnouncementLink = announcement.AnnouncementLink,
                FileResourceID = announcement.FileResourceID,
                LastUpdatedByUserID = announcement.LastUpdatedByUserID,
                LastUpdatedDate = announcement.LastUpdatedDate
            };
            DoCustomSimpleDtoMappings(announcement, announcementSimpleDto);
            return announcementSimpleDto;
        }

        static partial void DoCustomSimpleDtoMappings(Announcement announcement, AnnouncementSimpleDto announcementSimpleDto);
    }
}