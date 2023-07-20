using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DroolTool.EFModels.Entities
{
    public partial class Announcement
    {
        [Key]
        public int AnnouncementID { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime AnnouncementDate { get; set; }
        [Required]
        [StringLength(500)]
        public string AnnouncementTitle { get; set; }
        [StringLength(100)]
        public string AnnouncementLink { get; set; }
        public int FileResourceID { get; set; }
        public int LastUpdatedByUserID { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime LastUpdatedDate { get; set; }

        [ForeignKey(nameof(FileResourceID))]
        [InverseProperty("Announcement")]
        public virtual FileResource FileResource { get; set; }
        [ForeignKey(nameof(LastUpdatedByUserID))]
        [InverseProperty(nameof(User.Announcement))]
        public virtual User LastUpdatedByUser { get; set; }
    }
}
