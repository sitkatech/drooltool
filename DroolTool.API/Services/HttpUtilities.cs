using Microsoft.AspNetCore.Http;
using DroolTool.EFModels.Entities;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DroolTool.API.Services
{
    public static class HttpUtilities
    {
        public static async Task<FileResource> MakeFileResourceFromHttpRequest(HttpRequest httpRequest, DroolToolDbContext droolToolDbContext, HttpContext httpContext)
        {
            var bytes = await httpRequest.GetData();

            var userDto = UserContext.GetUserFromHttpContext(droolToolDbContext, httpContext);
            var queryCollection = httpRequest.Query;

            var fileResourceMimeType = FileResourceMimeTypes.GetFileResourceMimeTypeByContentTypeName(droolToolDbContext,
                queryCollection["mimeType"].ToString());

            var clientFilename = queryCollection["clientFilename"].ToString();
            var extension = clientFilename.Split('.').Last();
            var fileResourceGuid = Guid.NewGuid();

            return new FileResource
            {
                CreateDate = DateTime.Now,
                CreateUserID = userDto.UserID,
                FileResourceData = bytes,
                FileResourceGUID = fileResourceGuid,
                FileResourceMimeTypeID = fileResourceMimeType.FileResourceMimeTypeID,
                OriginalBaseFilename = clientFilename,
                OriginalFileExtension = extension,
            };
        }

        public static async Task<byte[]> GetData(this HttpRequest httpRequest)
        {
            byte[] bytes;


            using (var ms = new MemoryStream(2048))
            {
                await httpRequest.Body.CopyToAsync(ms);
                bytes = ms.ToArray();
            }

            return bytes;
        }
    }
}