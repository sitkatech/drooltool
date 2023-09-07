using Microsoft.AspNetCore.Http;

namespace DroolTool.Models.DataTransferObjects.Announcement;

public class ImageDto
{
    public IFormFile ImageFile { get; set; }
}