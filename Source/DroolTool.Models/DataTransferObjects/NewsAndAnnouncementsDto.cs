using System;
using System.Collections.Generic;
using System.Text;
using DroolTool.Models.DataTransferObjects.User;

namespace DroolTool.Models.DataTransferObjects
{
    public class NewsAndAnnouncementsDto
    {
        public int NewsAndAnnouncementsID { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public string FileResourceGUIDAsString { get; set; }
        public UserSimpleDto LastUpdatedByUser { get; set; }
        public DateTime LastUpdatedDate { get; set; }

    }
}
