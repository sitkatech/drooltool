using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DroolTool.EFModels.Entities
{
    public class FileResourceMimeTypes
    {
        public static FileResourceMimeType GetFileResourceMimeTypeByContentTypeName(DroolToolDbContext dbContext, string contentTypeName)
        {
            return FileResourceMimeType.All.Single(x => x.FileResourceMimeTypeContentTypeName == contentTypeName);
        }
    }
}