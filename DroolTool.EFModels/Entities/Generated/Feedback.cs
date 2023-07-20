using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DroolTool.EFModels.Entities
{
    public partial class Feedback
    {
        [Key]
        public int FeedbackID { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime FeedbackDate { get; set; }
        [Required]
        public string FeedbackContent { get; set; }
        [StringLength(100)]
        public string FeedbackName { get; set; }
        [StringLength(100)]
        public string FeedbackEmail { get; set; }
        [StringLength(20)]
        public string FeedbackPhoneNumber { get; set; }
    }
}
