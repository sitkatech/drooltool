//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[NeighborhoodStaging]

using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities
{
    public static partial class NeighborhoodStagingExtensionMethods
    {
        public static NeighborhoodStagingDto AsDto(this NeighborhoodStaging neighborhoodStaging)
        {
            var neighborhoodStagingDto = new NeighborhoodStagingDto()
            {
                NeighborhoodStagingID = neighborhoodStaging.NeighborhoodStagingID,
                Watershed = neighborhoodStaging.Watershed,
                OCSurveyNeighborhoodStagingID = neighborhoodStaging.OCSurveyNeighborhoodStagingID,
                OCSurveyDownstreamNeighborhoodStagingID = neighborhoodStaging.OCSurveyDownstreamNeighborhoodStagingID
            };
            DoCustomMappings(neighborhoodStaging, neighborhoodStagingDto);
            return neighborhoodStagingDto;
        }

        static partial void DoCustomMappings(NeighborhoodStaging neighborhoodStaging, NeighborhoodStagingDto neighborhoodStagingDto);

        public static NeighborhoodStagingSimpleDto AsSimpleDto(this NeighborhoodStaging neighborhoodStaging)
        {
            var neighborhoodStagingSimpleDto = new NeighborhoodStagingSimpleDto()
            {
                NeighborhoodStagingID = neighborhoodStaging.NeighborhoodStagingID,
                Watershed = neighborhoodStaging.Watershed,
                OCSurveyNeighborhoodStagingID = neighborhoodStaging.OCSurveyNeighborhoodStagingID,
                OCSurveyDownstreamNeighborhoodStagingID = neighborhoodStaging.OCSurveyDownstreamNeighborhoodStagingID
            };
            DoCustomSimpleDtoMappings(neighborhoodStaging, neighborhoodStagingSimpleDto);
            return neighborhoodStagingSimpleDto;
        }

        static partial void DoCustomSimpleDtoMappings(NeighborhoodStaging neighborhoodStaging, NeighborhoodStagingSimpleDto neighborhoodStagingSimpleDto);
    }
}