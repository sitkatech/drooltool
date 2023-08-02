//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[NeighborhoodStaging]
using System;


namespace DroolTool.Models.DataTransferObjects
{
    public partial class NeighborhoodStagingDto
    {
        public int NeighborhoodStagingID { get; set; }
        public string Watershed { get; set; }
        public int OCSurveyNeighborhoodStagingID { get; set; }
        public int OCSurveyDownstreamNeighborhoodStagingID { get; set; }
    }

    public partial class NeighborhoodStagingSimpleDto
    {
        public int NeighborhoodStagingID { get; set; }
        public string Watershed { get; set; }
        public int OCSurveyNeighborhoodStagingID { get; set; }
        public int OCSurveyDownstreamNeighborhoodStagingID { get; set; }
    }

}