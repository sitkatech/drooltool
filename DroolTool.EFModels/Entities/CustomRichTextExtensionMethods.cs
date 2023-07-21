using System;
using System.Collections.Generic;
using System.Text;
using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities
{
    public static partial class CustomRichTextExtensionMethods
    {
        static partial void DoCustomMappings(CustomRichText customRichText, CustomRichTextDto customRichTextDto){
            customRichTextDto.IsEmptyContent = string.IsNullOrWhiteSpace(customRichText.CustomRichTextContent);
        }
    }
}