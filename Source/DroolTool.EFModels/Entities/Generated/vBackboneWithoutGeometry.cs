using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DroolTool.EFModels.Entities
{
    public partial class vBackboneWithoutGeometry
    {
        public int PrimaryKey { get; set; }
        public int BackboneSegmentID { get; set; }
        public int CatchIDN { get; set; }
        public int? NeighborhoodID { get; set; }
        public int BackboneSegmentTypeID { get; set; }
        public int? DownstreamBackboneSegmentID { get; set; }
    }
}
