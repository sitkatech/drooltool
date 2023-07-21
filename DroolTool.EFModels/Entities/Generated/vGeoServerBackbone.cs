using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace DroolTool.EFModels.Entities
{
    [Keyless]
    public partial class vGeoServerBackbone
    {
        public int BackboneSegmentID { get; set; }
        public int CatchIDN { get; set; }
        public int? NeighborhoodID { get; set; }
        public int BackboneSegmentTypeID { get; set; }
        public int? DownstreamBackboneSegmentID { get; set; }
        [Column(TypeName = "geometry")]
        public Geometry BackboneSegmentGeometry { get; set; }
        [Required]
        [StringLength(20)]
        [Unicode(false)]
        public string BackboneSegmentType { get; set; }
        [Required]
        [StringLength(5)]
        [Unicode(false)]
        public string InStream { get; set; }
    }
}
