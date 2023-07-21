//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[Feedback]
using System;


namespace DroolTool.Models.DataTransferObjects
{
    public partial class FeedbackDto
    {
        public int FeedbackID { get; set; }
        public DateTime FeedbackDate { get; set; }
        public string FeedbackContent { get; set; }
        public string FeedbackName { get; set; }
        public string FeedbackEmail { get; set; }
        public string FeedbackPhoneNumber { get; set; }
    }

    public partial class FeedbackSimpleDto
    {
        public int FeedbackID { get; set; }
        public DateTime FeedbackDate { get; set; }
        public string FeedbackContent { get; set; }
        public string FeedbackName { get; set; }
        public string FeedbackEmail { get; set; }
        public string FeedbackPhoneNumber { get; set; }
    }

}