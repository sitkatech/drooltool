using System;
using System.Collections.Generic;
using System.Text;

namespace DroolTool.Models.DataTransferObjects.Announcement
{
    public class AnnouncementUpsertDto
    {
        public int? AnnouncementID { get; set; }
        public string AnnouncementTitle { get; set; }
        public DateTime AnnouncementDate { get; set; }
        public string? AnnouncementLink { get; set; } 
    }
}
