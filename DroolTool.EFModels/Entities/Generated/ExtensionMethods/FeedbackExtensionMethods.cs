//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[Feedback]

using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities
{
    public static partial class FeedbackExtensionMethods
    {
        public static FeedbackDto AsDto(this Feedback feedback)
        {
            var feedbackDto = new FeedbackDto()
            {
                FeedbackID = feedback.FeedbackID,
                FeedbackDate = feedback.FeedbackDate,
                FeedbackContent = feedback.FeedbackContent,
                FeedbackName = feedback.FeedbackName,
                FeedbackEmail = feedback.FeedbackEmail,
                FeedbackPhoneNumber = feedback.FeedbackPhoneNumber
            };
            DoCustomMappings(feedback, feedbackDto);
            return feedbackDto;
        }

        static partial void DoCustomMappings(Feedback feedback, FeedbackDto feedbackDto);

        public static FeedbackSimpleDto AsSimpleDto(this Feedback feedback)
        {
            var feedbackSimpleDto = new FeedbackSimpleDto()
            {
                FeedbackID = feedback.FeedbackID,
                FeedbackDate = feedback.FeedbackDate,
                FeedbackContent = feedback.FeedbackContent,
                FeedbackName = feedback.FeedbackName,
                FeedbackEmail = feedback.FeedbackEmail,
                FeedbackPhoneNumber = feedback.FeedbackPhoneNumber
            };
            DoCustomSimpleDtoMappings(feedback, feedbackSimpleDto);
            return feedbackSimpleDto;
        }

        static partial void DoCustomSimpleDtoMappings(Feedback feedback, FeedbackSimpleDto feedbackSimpleDto);
    }
}