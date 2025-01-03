using System;
using System.Net.Mail;
using System.Threading.Tasks;
using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using DroolTool.Models.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DroolTool.API.Controllers
{
    public class FeedbackController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;
        private readonly SitkaSmtpClientService _sitkaSmtpClientService;
        private readonly DroolToolConfiguration _drooltoolConfiguration;

        public FeedbackController(DroolToolDbContext dbContext,
            IOptions<DroolToolConfiguration> drooltoolConfigurationOptions,
            SitkaSmtpClientService sitkaSmtpClientService)
        {
            _dbContext = dbContext;
            _sitkaSmtpClientService = sitkaSmtpClientService;
            _drooltoolConfiguration = drooltoolConfigurationOptions.Value;
        }

        [HttpPost("feedback/provide-feedback")]
        public async Task<ActionResult> ProvideFeedback([FromForm] FeedbackDto feedbackDto, [FromForm] string token)
        {
            if (await RecaptchaValidator.IsValidResponseAsync(token, _drooltoolConfiguration.RECAPTCHA_SECRET_KEY,
                    _drooltoolConfiguration.RECAPTCHA_VERIFY_URL, _drooltoolConfiguration.RECAPTCHA_SCORE_THRESHOLD) ==
                false)
            {
                return BadRequest("Recaptcha validation failed. Please try again.");
            }

            var feedback = new Feedback()
            {
                FeedbackContent = feedbackDto.FeedbackContent,
                FeedbackDate = DateTime.Now,
                FeedbackEmail = feedbackDto.FeedbackEmail,
                FeedbackName = feedbackDto.FeedbackName,
                FeedbackPhoneNumber = feedbackDto.FeedbackPhoneNumber
            };

            _dbContext.Feedbacks.Add(feedback);
            await _dbContext.SaveChangesAsync();

            var messageBody = $@"Feedback has been submitted for the Urban Drool Tool! <br/><br/>
  Name: {feedback.FeedbackName ?? "Not Provided"}<br/>
  Phone Number: {feedback.FeedbackPhoneNumber ?? "Not Provided"}<br/>
  Email : {feedback.FeedbackEmail ?? "Not Provided"}<br/>
  Date : {feedback.FeedbackDate:hh:mm tt MM/dd/yyyy}<br/>
  Content : {feedback.FeedbackContent}
 <br/>
{_sitkaSmtpClientService.GetSupportNotificationEmailSignature()}";

            var mailMessage = new MailMessage
            {
                Subject = $"Feedback Submitted For Urban Drool Tool",
                Body = $"Hello,<br /><br />{messageBody}",
            };

            mailMessage.To.Add(_sitkaSmtpClientService.GetDefaultEmailFrom());
            SitkaSmtpClientService.AddCcRecipientsToEmail(mailMessage,
                EFModels.Entities.Users.GetEmailAddressesForAdminsThatReceiveSupportEmails(_dbContext));
            await _sitkaSmtpClientService.Send(mailMessage);

            return Ok();
        }
    }
}
