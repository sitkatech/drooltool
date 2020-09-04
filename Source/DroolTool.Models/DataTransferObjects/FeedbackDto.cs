using System;
using System.Collections.Generic;
using System.Text;

namespace DroolTool.Models.DataTransferObjects
{
    public class FeedbackDto
    {
        public string FeedbackContent { get; set; }
        public string? FeedbackName { get; set; }
        public string? FeedbackEmail { get; set; }
        public string? FeedbackPhoneNumber { get; set; }
    }
}
