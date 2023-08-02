//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[WatershedMask]

using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities
{
    public static partial class WatershedMaskExtensionMethods
    {
        public static WatershedMaskDto AsDto(this WatershedMask watershedMask)
        {
            var watershedMaskDto = new WatershedMaskDto()
            {
                WatershedMaskID = watershedMask.WatershedMaskID,
                WatershedMaskName = watershedMask.WatershedMaskName
            };
            DoCustomMappings(watershedMask, watershedMaskDto);
            return watershedMaskDto;
        }

        static partial void DoCustomMappings(WatershedMask watershedMask, WatershedMaskDto watershedMaskDto);

        public static WatershedMaskSimpleDto AsSimpleDto(this WatershedMask watershedMask)
        {
            var watershedMaskSimpleDto = new WatershedMaskSimpleDto()
            {
                WatershedMaskID = watershedMask.WatershedMaskID,
                WatershedMaskName = watershedMask.WatershedMaskName
            };
            DoCustomSimpleDtoMappings(watershedMask, watershedMaskSimpleDto);
            return watershedMaskSimpleDto;
        }

        static partial void DoCustomSimpleDtoMappings(WatershedMask watershedMask, WatershedMaskSimpleDto watershedMaskSimpleDto);
    }
}