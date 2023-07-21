//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[Neighborhood]

using DroolTool.Models.DataTransferObjects;

namespace DroolTool.EFModels.Entities
{
    public static partial class NeighborhoodExtensionMethods
    {
        public static NeighborhoodDto AsDto(this Neighborhood neighborhood)
        {
            var neighborhoodDto = new NeighborhoodDto()
            {
                NeighborhoodID = neighborhood.NeighborhoodID,
                Watershed = neighborhood.Watershed,
                OCSurveyNeighborhoodID = neighborhood.OCSurveyNeighborhoodID,
                OCSurveyDownstreamNeighborhoodID = neighborhood.OCSurveyDownstreamNeighborhoodID
            };
            DoCustomMappings(neighborhood, neighborhoodDto);
            return neighborhoodDto;
        }

        static partial void DoCustomMappings(Neighborhood neighborhood, NeighborhoodDto neighborhoodDto);

        public static NeighborhoodSimpleDto AsSimpleDto(this Neighborhood neighborhood)
        {
            var neighborhoodSimpleDto = new NeighborhoodSimpleDto()
            {
                NeighborhoodID = neighborhood.NeighborhoodID,
                Watershed = neighborhood.Watershed,
                OCSurveyNeighborhoodID = neighborhood.OCSurveyNeighborhoodID,
                OCSurveyDownstreamNeighborhoodID = neighborhood.OCSurveyDownstreamNeighborhoodID
            };
            DoCustomSimpleDtoMappings(neighborhood, neighborhoodSimpleDto);
            return neighborhoodSimpleDto;
        }

        static partial void DoCustomSimpleDtoMappings(Neighborhood neighborhood, NeighborhoodSimpleDto neighborhoodSimpleDto);
    }
}