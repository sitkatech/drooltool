using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DroolTool.EFModels.Entities
{
    [Table("Feedback")]
    public partial class Feedback
    {
        [Key]
        public int FeedbackID { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime FeedbackDate { get; set; }
        [Required]
        [Unicode(false)]
        public string FeedbackContent { get; set; }
        [StringLength(100)]
        [Unicode(false)]
        public string FeedbackName { get; set; }
        [StringLength(100)]
        [Unicode(false)]
        public string FeedbackEmail { get; set; }
        [StringLength(20)]
        [Unicode(false)]
        public string FeedbackPhoneNumber { get; set; }
    }
}
