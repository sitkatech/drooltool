﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using DroolTool.API.Services;
using DroolTool.API.Services.Authorization;
using DroolTool.EFModels.Entities;
using DroolTool.Models.DataTransferObjects.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using DroolTool.Models.DataTransferObjects;
using Microsoft.Extensions.DependencyInjection;

namespace DroolTool.API.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DroolToolDbContext _dbContext;
        private readonly ILogger<UserController> _logger;
        private readonly KeystoneService _keystoneService;
        private readonly SitkaSmtpClientService _sitkaSmtpClientService;
        private readonly DroolToolConfiguration _drooltoolConfiguration;

        public UserController(DroolToolDbContext dbContext, ILogger<UserController> logger, KeystoneService keystoneService, IOptions<DroolToolConfiguration> drooltoolConfigurationOptions,
            SitkaSmtpClientService sitkaSmtpClientService)
        {
            _dbContext = dbContext;
            _logger = logger;
            _keystoneService = keystoneService;
            _sitkaSmtpClientService = sitkaSmtpClientService;
            _drooltoolConfiguration = drooltoolConfigurationOptions.Value;
        }

        [HttpPost("/users/invite")]
        [UserManageFeature]
        public async Task<IActionResult> InviteUser([FromBody] UserInviteDto inviteDto)
        {
            if (inviteDto.RoleID.HasValue)
            {
                var role = Role.AllLookupDictionary[inviteDto.RoleID.Value];
                if (role == null)
                {
                    return NotFound($"Could not find a Role with the ID {inviteDto.RoleID}");
                }
            }
            else
            {
                return BadRequest("Role ID is required.");
            }

            const string applicationName = "Urban Drool Tool";
            var inviteModel = new KeystoneService.KeystoneInviteModel
            {
                FirstName = inviteDto.FirstName,
                LastName = inviteDto.LastName,
                Email = inviteDto.Email,
                Subject = $"Invitation to the {applicationName}",
                WelcomeText = $"You have been invited by an administrator to create an account in the <a href='{_drooltoolConfiguration.DROOLTOOL_WEB_URL}' target='_blank'>{applicationName}</a>. The Urban Drool Tool application is a collaborative effort of Moulton Niguel Water District, Orange County Public Works, and other organizations.",
                SiteName = applicationName,
                SignatureBlock = "The Urban Drool Tool team",
                RedirectURL = _drooltoolConfiguration.KEYSTONE_REDIRECT_URL,
                SupportBlock = "If you have any questions please drop us a line at support@sitkatech.com."
            };

            var response = await _keystoneService.Invite(inviteModel);
            if (response.StatusCode != HttpStatusCode.OK || response.Error != null)
            {
                ModelState.AddModelError("Email", $"There was a problem inviting the user to Keystone: {response.Error.Message}.");
                if (response.Error.ModelState != null)
                {
                    foreach (var modelStateKey in response.Error.ModelState.Keys)
                    {
                        foreach (var err in response.Error.ModelState[modelStateKey])
                        {
                            ModelState.AddModelError(modelStateKey, err);
                        }
                    }
                }
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var keystoneUser = response.Payload.Claims;
            var existingUser = EFModels.Entities.Users.GetByEmail(_dbContext, inviteDto.Email);
            if (existingUser != null)
            {
                existingUser = EFModels.Entities.Users.UpdateUserGuid(_dbContext, existingUser.UserID, keystoneUser.UserGuid);
                return Ok(existingUser);
            }

            var newUser = new UserUpsertDto
            {
                FirstName = keystoneUser.FirstName,
                LastName = keystoneUser.LastName,
                OrganizationName = keystoneUser.OrganizationName,
                Email = keystoneUser.Email,
                PhoneNumber = keystoneUser.PrimaryPhone,
                RoleID = inviteDto.RoleID.Value
            };

            var user = Users.CreateNewUser(_dbContext, newUser, keystoneUser.LoginName, keystoneUser.UserGuid);
            return Ok(user);
        }

        [HttpPost("users")]
        [LoggedInUnclassifiedFeature]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] UserCreateDto userCreateDto)
        {
            // Validate request body; all fields required in Dto except Org Name and Phone
            if (userCreateDto == null)
            {
                return BadRequest();
            }

            var validationMessages = EFModels.Entities.Users.ValidateCreateUnassignedUser(_dbContext, userCreateDto);
            validationMessages.ForEach(vm => { ModelState.AddModelError(vm.Type, vm.Message); });

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = Users.CreateUnassignedUser(_dbContext, userCreateDto);

            var messageBody = $@"A new user has signed up to the Urban Drool Tool: <br/><br/>
 {user.FullName} ({user.Email}) <br/><br/>
As an administrator of the Urban Drool Tool, you can assign them a role by following <a href='{_drooltoolConfiguration.DROOLTOOL_WEB_URL}/users/{user.UserID}'>this link</a>. <br/><br/>
{_sitkaSmtpClientService.GetSupportNotificationEmailSignature()}";

            var mailMessage = new MailMessage
            {
                Subject = $"New User in Urban Drool Tool",
                Body = $"Hello,<br /><br />{messageBody}",
            };
            mailMessage.To.Add(_sitkaSmtpClientService.GetDefaultEmailFrom());
            SitkaSmtpClientService.AddCcRecipientsToEmail(mailMessage,
                        Users.GetEmailAddressesForAdminsThatReceiveSupportEmails(_dbContext));
            await _sitkaSmtpClientService.Send(mailMessage);

            return Ok(user);
        }

        [HttpGet("users")]
        [UserManageFeature]
        public ActionResult<IEnumerable<UserDetailedDto>> List()
        {
            var userDtos = EFModels.Entities.Users.List(_dbContext);
            return Ok(userDtos);
        }

        [HttpGet("users/unassigned-report")]
        [UserManageFeature]
        public ActionResult<UnassignedUserReportDto> GetUnassignedUserReport()
        {
            var report = new UnassignedUserReportDto
                {Count = _dbContext.Users.Count(x => x.RoleID == (int) RoleEnum.Unassigned)};
            return Ok(report);
        }

        [HttpGet("users/{userID}")]
        [UserViewFeature]
        public ActionResult<UserDto> GetByUserID([FromRoute] int userID)
        {
            var userDto = EFModels.Entities.Users.GetByUserID(_dbContext, userID);
            if (userDto == null)
            {
                return NotFound();
            }

            return Ok(userDto);
        }

        [HttpGet("user-claims/{globalID}")]
        public ActionResult<UserDto> GetByGlobalID([FromRoute] string globalID)
        {
            var isValidGuid = Guid.TryParse(globalID, out var globalIDAsGuid);
            if (!isValidGuid)
            {
                return BadRequest();
            }

            var userDto = DroolTool.EFModels.Entities.Users.GetByUserGuid(_dbContext, globalIDAsGuid);
            if (userDto == null)
            {
                return NotFound();
            }

            return Ok(userDto);
        }

        [HttpPut("users/{userID}")]
        [UserManageFeature]
        public ActionResult<UserDto> UpdateUser([FromRoute] int userID, [FromBody] UserUpsertDto userUpsertDto)
        {
            var userDto = EFModels.Entities.Users.GetByUserID(_dbContext, userID);
            if (userDto == null)
            {
                return NotFound();
            }

            var validationMessages = Users.ValidateUpdate(_dbContext, userUpsertDto, userDto.UserID);
            validationMessages.ForEach(vm => {
                ModelState.AddModelError(vm.Type, vm.Message);
            });

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var role = Role.AllLookupDictionary[userUpsertDto.RoleID.GetValueOrDefault()];
            if (role == null)
            {
                return NotFound($"Could not find a System Role with the ID {userUpsertDto.RoleID}");
            }

            var updatedUserDto = DroolTool.EFModels.Entities.Users.UpdateUserEntity(_dbContext, userID, userUpsertDto);
            return Ok(updatedUserDto);
        }
    }
}
