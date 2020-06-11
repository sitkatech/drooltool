using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DroolTool.EFModels.Entities
{
    public partial class NewsAndAnnouncements
    {
        [Key]
        public int NewsAndAnnouncementsID { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime NewsAndAnnouncementsDate { get; set; }
        [Required]
        [StringLength(500)]
        public string NewsAndAnnouncementsTitle { get; set; }
        [StringLength(100)]
        public string NewsAndAnnouncementsLink { get; set; }
        public int FileResourceID { get; set; }
        public int NewsAndAnnouncementsLastUpdatedByUserID { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime NewsAndAnnouncementsLastUpdatedDate { get; set; }

        [ForeignKey(nameof(FileResourceID))]
        [InverseProperty("NewsAndAnnouncements")]
        public virtual FileResource FileResource { get; set; }
        [ForeignKey(nameof(NewsAndAnnouncementsLastUpdatedByUserID))]
        [InverseProperty(nameof(User.NewsAndAnnouncements))]
        public virtual User NewsAndAnnouncementsLastUpdatedByUser { get; set; }
    }
}
