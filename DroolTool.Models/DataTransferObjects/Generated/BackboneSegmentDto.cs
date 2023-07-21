//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[BackboneSegment]
using System;


namespace DroolTool.Models.DataTransferObjects
{
    public partial class BackboneSegmentDto
    {
        public int BackboneSegmentID { get; set; }
        public int CatchIDN { get; set; }
        public BackboneSegmentTypeDto BackboneSegmentType { get; set; }
        public int? DownstreamBackboneSegmentID { get; set; }
        public NeighborhoodDto Neighborhood { get; set; }
        public bool InStream { get; set; }
    }

    public partial class BackboneSegmentSimpleDto
    {
        public int BackboneSegmentID { get; set; }
        public int CatchIDN { get; set; }
        public System.Int32 BackboneSegmentTypeID { get; set; }
        public int? DownstreamBackboneSegmentID { get; set; }
        public System.Int32? NeighborhoodID { get; set; }
        public bool InStream { get; set; }
    }

}