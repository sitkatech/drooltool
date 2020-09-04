using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using DroolTool.Models.DataTransferObjects;
using DroolTool.Models.DataTransferObjects.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DroolTool.API.Controllers
{
    public class FeedbackController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;
        private readonly DroolToolConfiguration _drooltoolConfiguration;

        public FeedbackController(DroolToolDbContext dbContext, IOptions<DroolToolConfiguration> drooltoolConfigurationOptions)
        {
            _dbContext = dbContext;
            _drooltoolConfiguration = drooltoolConfigurationOptions.Value;
        }

        [HttpPost("feedback/provide-feedback")]
        public async Task<ActionResult> ProvideFeedback([FromForm] FeedbackDto feedbackDto, [FromForm] string token)
        {
            if (await RecaptchaValidator.IsValidResponseAsync(token, _drooltoolConfiguration.RECAPTCHA_SECRET_KEY) == false)
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

            _dbContext.Feedback.Add(feedback);
            _dbContext.SaveChanges();

            var smtpClient = HttpContext.RequestServices.GetRequiredService<SitkaSmtpClientService>();
            var mailMessage = GenerateFeedbackProvidedEmail(_drooltoolConfiguration.DROOLTOOL_WEB_URL, feedback, _dbContext);
            SitkaSmtpClientService.AddCcRecipientsToEmail(mailMessage,
                EFModels.Entities.User.GetEmailAddressesForAdminsThatReceiveSupportEmails(_dbContext));
            SendEmailMessage(smtpClient, mailMessage);

            return Ok();
        }

        private static MailMessage GenerateFeedbackProvidedEmail(string drooltoolUrl, Feedback feedback, DroolToolDbContext dbContext)
        {
            var messageBody = $@"Feedback has been submitted for the Urban Drool Tool! <br/><br/>
  Name: {feedback.FeedbackName ?? "Not Provided"}<br/>
  Phone Number: {feedback.FeedbackPhoneNumber ?? "Not Provided"}<br/>
  Email : {feedback.FeedbackEmail ?? "Not Provided"}<br/>
  Date : {feedback.FeedbackDate:hh:mm tt MM/dd/yyyy}<br/>
  Content : {feedback.FeedbackContent}
 <br/>
{SitkaSmtpClientService.GetSupportNotificationEmailSignature()}";

            var mailMessage = new MailMessage
            {
                Subject = $"Feedback Submitted For Urban Drool Tool",
                Body = $"Hello,<br /><br />{messageBody}",
            };

            mailMessage.To.Add(SitkaSmtpClientService.GetDefaultEmailFrom());
            return mailMessage;
        }

        private void SendEmailMessage(SitkaSmtpClientService smtpClient, MailMessage mailMessage)
        {
            mailMessage.IsBodyHtml = true;
            mailMessage.From = SitkaSmtpClientService.GetDefaultEmailFrom();
            SitkaSmtpClientService.AddReplyToEmail(mailMessage);
            smtpClient.Send(mailMessage);
        }
    }
}
