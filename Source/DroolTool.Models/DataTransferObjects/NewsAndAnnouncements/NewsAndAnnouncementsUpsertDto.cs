using System;
using System.Collections.Generic;
using System.Text;

namespace DroolTool.Models.DataTransferObjects.NewsAndAnnouncements
{
    public class NewsAndAnnouncementsUpsertDto
    {
        public int? NewsAndAnnouncementsID { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string? Link { get; set; } 
    }
}
