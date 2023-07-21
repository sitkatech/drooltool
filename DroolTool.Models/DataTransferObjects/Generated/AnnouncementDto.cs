//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[Announcement]
using System;


namespace DroolTool.Models.DataTransferObjects
{
    public partial class AnnouncementDto
    {
        public int AnnouncementID { get; set; }
        public DateTime AnnouncementDate { get; set; }
        public string AnnouncementTitle { get; set; }
        public string AnnouncementLink { get; set; }
        public FileResourceDto FileResource { get; set; }
        public UserDto LastUpdatedByUser { get; set; }
        public DateTime LastUpdatedDate { get; set; }
    }

    public partial class AnnouncementSimpleDto
    {
        public int AnnouncementID { get; set; }
        public DateTime AnnouncementDate { get; set; }
        public string AnnouncementTitle { get; set; }
        public string AnnouncementLink { get; set; }
        public System.Int32 FileResourceID { get; set; }
        public System.Int32 LastUpdatedByUserID { get; set; }
        public DateTime LastUpdatedDate { get; set; }
    }

}