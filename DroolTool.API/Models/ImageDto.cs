using Microsoft.AspNetCore.Http;

namespace DroolTool.API.Models;

public class ImageDto
{
    public IFormFile ImageFile { get; set; }
}