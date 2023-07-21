using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using DroolTool.API.Util;
using DroolTool.Models.DataTransferObjects;
using DroolTool.Models.DataTransferObjects.User;

namespace DroolTool.EFModels.Entities
{
    public partial class User
    {
        public static UserDto CreateUnassignedUser(DroolToolDbContext dbContext, UserCreateDto userCreateDto)
        {
            var userUpsertDto = new UserUpsertDto()
            {
                FirstName = userCreateDto.FirstName,
                LastName = userCreateDto.LastName,
                OrganizationName = userCreateDto.OrganizationName,
                Email = userCreateDto.Email,
                PhoneNumber = userCreateDto.PhoneNumber,
                RoleID = (int)RoleEnum.Unassigned,  // don't allow non-admin user to set their role to something other than Unassigned
                ReceiveSupportEmails = false  // don't allow non-admin users to hijack support emails
            };
            return CreateNewUser(dbContext, userUpsertDto, userCreateDto.LoginName, userCreateDto.UserGuid);
        }

        public static List<ErrorMessage> ValidateCreateUnassignedUser(DroolToolDbContext dbContext, UserCreateDto userCreateDto)
        {
            var result = new List<ErrorMessage>();

            var userByGuidDto = GetByUserGuid(dbContext, userCreateDto.UserGuid);  // A duplicate Guid not only leads to 500s, it allows someone to hijack another user's account
            if (userByGuidDto != null)
            {
                result.Add(new ErrorMessage() { Type = "User Creation", Message = "Invalid user information." });  // purposely vague; we don't want a naughty person realizing they figured out someone else's Guid
            }

            var userByEmailDto = GetByEmail(dbContext, userCreateDto.Email);  // A duplicate email leads to 500s, so need to prevent duplicates
            if (userByEmailDto != null)
            {
                result.Add(new ErrorMessage() { Type = "User Creation", Message = "There is already a user account with this email address." });
            }

            return result;
        }
        public static UserDto CreateNewUser(DroolToolDbContext dbContext, UserUpsertDto userToCreate, string loginName, Guid userGuid)
        {
            if (!userToCreate.RoleID.HasValue)
            {
                return null;
            }

            var user = new User
            {
                UserGuid = userGuid,
                LoginName = loginName,
                Email = userToCreate.Email,
                FirstName = userToCreate.FirstName,
                LastName = userToCreate.LastName,
                IsActive = true,
                RoleID = userToCreate.RoleID.Value,
                CreateDate = DateTime.UtcNow,
            };

            dbContext.Users.Add(user);
            dbContext.SaveChanges();
            dbContext.Entry(user).Reload();

            return GetByUserID(dbContext, user.UserID);
        }

        public static IEnumerable<UserDetailedDto> List(DroolToolDbContext dbContext)
        {
            // right now we are assuming a parcel can only be associated to one user
            var parcels = dbContext.Users.OrderBy(x => x.LastName).ThenBy(x => x.FirstName).ToList()
                .Select(user =>
                {
                    var userDetailedDto = new UserDetailedDto()
                    {
                        UserID = user.UserID,
                        UserGuid = user.UserGuid,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        LoginName = user.LoginName,
                        RoleID = user.RoleID,
                        RoleDisplayName = user.Role.RoleDisplayName,
                        Phone = user.Phone,
                        HasActiveTrades = false,
                        AcreFeetOfWaterPurchased = 0,
                        AcreFeetOfWaterSold = 0,
                        ReceiveSupportEmails = user.ReceiveSupportEmails
                    };
                    return userDetailedDto;
                }).ToList();
            return parcels;
        }

        public static IEnumerable<UserDto> ListByRole(DroolToolDbContext dbContext, RoleEnum roleEnum)
        {
            var users = GetUserImpl(dbContext)
                .Where(x => x.IsActive && x.RoleID == (int) roleEnum)
                .OrderBy(x => x.FirstName).ThenBy(x => x.LastName)
                .Select(x => x.AsDto())
                .AsEnumerable();

            return users;
        }

        public static IEnumerable<string> GetEmailAddressesForAdminsThatReceiveSupportEmails(DroolToolDbContext dbContext)
        {
            var users = GetUserImpl(dbContext)
                .Where(x => x.IsActive && x.RoleID == (int) RoleEnum.Admin && x.ReceiveSupportEmails)
                .Select(x => x.Email)
                .AsEnumerable();

            return users;
        }

        public static UserDto GetByUserID(DroolToolDbContext dbContext, int userID)
        {
            var user = GetUserImpl(dbContext).SingleOrDefault(x => x.UserID == userID);
            return user?.AsDto();
        }

        public static List<UserDto> GetByUserID(DroolToolDbContext dbContext, List<int> userIDs)
        {
            return GetUserImpl(dbContext).Where(x => userIDs.Contains(x.UserID)).Select(x=>x.AsDto()).ToList();
            
        }

        public static UserDto GetByUserGuid(DroolToolDbContext dbContext, Guid userGuid)
        {
            var user = GetUserImpl(dbContext)
                .SingleOrDefault(x => x.UserGuid == userGuid);

            return user?.AsDto();
        }

        private static IQueryable<User> GetUserImpl(DroolToolDbContext dbContext)
        {
            return dbContext.Users
                .AsNoTracking();
        }

        public static UserDto GetByEmail(DroolToolDbContext dbContext, string email)
        {
            var user = GetUserImpl(dbContext).SingleOrDefault(x => x.Email == email);
            return user?.AsDto();
        }

        public static UserDto UpdateUserEntity(DroolToolDbContext dbContext, int userID, UserUpsertDto userEditDto)
        {
            if (!userEditDto.RoleID.HasValue)
            {
                return null;
            }

            var user = dbContext.Users
                .Single(x => x.UserID == userID);

            user.RoleID = userEditDto.RoleID.Value;
            user.ReceiveSupportEmails = userEditDto.RoleID.Value == 1 && userEditDto.ReceiveSupportEmails;
            user.UpdateDate = DateTime.UtcNow;

            dbContext.SaveChanges();
            dbContext.Entry(user).Reload();
            return GetByUserID(dbContext, userID);
        }

        public static UserDto UpdateUserGuid(DroolToolDbContext dbContext, int userID, Guid userGuid)
        {
            var user = dbContext.Users
                .Single(x => x.UserID == userID);

            user.UserGuid = userGuid;
            user.UpdateDate = DateTime.UtcNow;

            dbContext.SaveChanges();
            dbContext.Entry(user).Reload();
            return GetByUserID(dbContext, userID);
        }

        public static List<ErrorMessage> ValidateUpdate(DroolToolDbContext dbContext, UserUpsertDto userEditDto, int userID)
        {
            var result = new List<ErrorMessage>();
            if (!userEditDto.RoleID.HasValue)
            {
                result.Add(new ErrorMessage() { Type = "Role ID", Message = "Role ID is required." });
            }

            return result;
        }

        public static bool ValidateAllExist(DroolToolDbContext dbContext, List<int> userIDs)
        {
            return dbContext.Users.Count(x => userIDs.Contains(x.UserID)) == userIDs.Distinct().Count();
        }
    }
}