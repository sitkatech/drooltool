//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[WatershedAlias]

using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities
{
    public static partial class WatershedAliasExtensionMethods
    {
        public static WatershedAliasDto AsDto(this WatershedAlias watershedAlias)
        {
            var watershedAliasDto = new WatershedAliasDto()
            {
                WatershedAliasID = watershedAlias.WatershedAliasID,
                WatershedName = watershedAlias.WatershedName,
                WatershedAliasName = watershedAlias.WatershedAliasName
            };
            DoCustomMappings(watershedAlias, watershedAliasDto);
            return watershedAliasDto;
        }

        static partial void DoCustomMappings(WatershedAlias watershedAlias, WatershedAliasDto watershedAliasDto);

        public static WatershedAliasSimpleDto AsSimpleDto(this WatershedAlias watershedAlias)
        {
            var watershedAliasSimpleDto = new WatershedAliasSimpleDto()
            {
                WatershedAliasID = watershedAlias.WatershedAliasID,
                WatershedName = watershedAlias.WatershedName,
                WatershedAliasName = watershedAlias.WatershedAliasName
            };
            DoCustomSimpleDtoMappings(watershedAlias, watershedAliasSimpleDto);
            return watershedAliasSimpleDto;
        }

        static partial void DoCustomSimpleDtoMappings(WatershedAlias watershedAlias, WatershedAliasSimpleDto watershedAliasSimpleDto);
    }
}