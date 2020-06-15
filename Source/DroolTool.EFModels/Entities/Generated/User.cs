﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DroolTool.EFModels.Entities
{
    public partial class User
    {
        public User()
        {
            Announcement = new HashSet<Announcement>();
            FileResource = new HashSet<FileResource>();
        }

        [Key]
        public int UserID { get; set; }
        public Guid? UserGuid { get; set; }
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(100)]
        public string LastName { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [StringLength(30)]
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
        public string LoginName { get; set; }

        [ForeignKey(nameof(RoleID))]
        [InverseProperty("User")]
        public virtual Role Role { get; set; }
        [InverseProperty("LastUpdatedByUser")]
        public virtual ICollection<Announcement> Announcement { get; set; }
        [InverseProperty("CreateUser")]
        public virtual ICollection<FileResource> FileResource { get; set; }
    }
}
