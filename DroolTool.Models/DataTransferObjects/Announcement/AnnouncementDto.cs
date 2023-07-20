using System;
using System.Collections.Generic;
using System.Text;
using DroolTool.Models.DataTransferObjects.User;

namespace DroolTool.Models.DataTransferObjects
{
    public class AnnouncementDto
    {
        public int AnnouncementID { get; set; }
        public DateTime AnnouncementDate { get; set; }
        public string AnnouncementTitle { get; set; }
        public string AnnouncementLink { get; set; }
        public string FileResourceGUIDAsString { get; set; }
        public UserSimpleDto LastUpdatedByUser { get; set; }
        public DateTime LastUpdatedDate { get; set; }

    }
}
