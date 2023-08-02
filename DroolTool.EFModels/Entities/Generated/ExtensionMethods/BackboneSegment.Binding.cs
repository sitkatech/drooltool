//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[BackboneSegment]
namespace DroolTool.EFModels.Entities
{
    public partial class BackboneSegment
    {
        public BackboneSegmentType BackboneSegmentType => BackboneSegmentType.AllLookupDictionary[BackboneSegmentTypeID];
    }
}