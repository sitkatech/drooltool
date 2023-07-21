//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[Neighborhood]
using System;


namespace DroolTool.Models.DataTransferObjects
{
    public partial class NeighborhoodDto
    {
        public int NeighborhoodID { get; set; }
        public string Watershed { get; set; }
        public int OCSurveyNeighborhoodID { get; set; }
        public int? OCSurveyDownstreamNeighborhoodID { get; set; }
    }

    public partial class NeighborhoodSimpleDto
    {
        public int NeighborhoodID { get; set; }
        public string Watershed { get; set; }
        public int OCSurveyNeighborhoodID { get; set; }
        public int? OCSurveyDownstreamNeighborhoodID { get; set; }
    }

}