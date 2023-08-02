using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities;

public static partial class UserExtensionMethods
{
    static partial void DoCustomMappings(User user, UserDto userDto)
    {
        userDto.FullName = $"{user.FirstName} {user.LastName}";
    }
}