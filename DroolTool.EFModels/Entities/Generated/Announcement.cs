using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DroolTool.EFModels.Entities
{
    [Table("Announcement")]
    public partial class Announcement
    {
        [Key]
        public int AnnouncementID { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime AnnouncementDate { get; set; }
        [Required]
        [StringLength(500)]
        [Unicode(false)]
        public string AnnouncementTitle { get; set; }
        [StringLength(100)]
        [Unicode(false)]
        public string AnnouncementLink { get; set; }
        public int FileResourceID { get; set; }
        public int LastUpdatedByUserID { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime LastUpdatedDate { get; set; }

        [ForeignKey("FileResourceID")]
        [InverseProperty("Announcements")]
        public virtual FileResource FileResource { get; set; }
        [ForeignKey("LastUpdatedByUserID")]
        [InverseProperty("Announcements")]
        public virtual User LastUpdatedByUser { get; set; }
    }
}
