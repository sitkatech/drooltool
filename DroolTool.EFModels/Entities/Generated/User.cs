using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DroolTool.EFModels.Entities
{
    [Table("User")]
    [Index("Email", Name = "AK_User_Email", IsUnique = true)]
    public partial class User
    {
        public User()
        {
            Announcements = new HashSet<Announcement>();
            FileResources = new HashSet<FileResource>();
        }

        [Key]
        public int UserID { get; set; }
        public Guid? UserGuid { get; set; }
        [Required]
        [StringLength(100)]
        [Unicode(false)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(100)]
        [Unicode(false)]
        public string LastName { get; set; }
        [Required]
        [StringLength(255)]
        [Unicode(false)]
        public string Email { get; set; }
        [StringLength(30)]
        [Unicode(false)]
        public string Phone { get; set; }
        public int RoleID { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime CreateDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdateDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? LastActivityDate { get; set; }
        public bool IsActive { get; set; }
        public bool ReceiveSupportEmails { get; set; }
        [StringLength(128)]
        [Unicode(false)]
        public string LoginName { get; set; }

        [InverseProperty("LastUpdatedByUser")]
        public virtual ICollection<Announcement> Announcements { get; set; }
        [InverseProperty("CreateUser")]
        public virtual ICollection<FileResource> FileResources { get; set; }
    }
}
