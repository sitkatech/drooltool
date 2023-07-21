using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace DroolTool.EFModels.Entities
{
    [Table("BackboneSegment")]
    public partial class BackboneSegment
    {
        public BackboneSegment()
        {
            InverseDownstreamBackboneSegment = new HashSet<BackboneSegment>();
        }

        [Key]
        public int BackboneSegmentID { get; set; }
        [Required]
        [Column(TypeName = "geometry")]
        public Geometry BackboneSegmentGeometry { get; set; }
        public int CatchIDN { get; set; }
        public int BackboneSegmentTypeID { get; set; }
        public int? DownstreamBackboneSegmentID { get; set; }
        [Column(TypeName = "geometry")]
        public Geometry BackboneSegmentGeometry4326 { get; set; }
        public int? NeighborhoodID { get; set; }
        public bool InStream { get; set; }

        [ForeignKey("DownstreamBackboneSegmentID")]
        [InverseProperty("InverseDownstreamBackboneSegment")]
        public virtual BackboneSegment DownstreamBackboneSegment { get; set; }
        [ForeignKey("NeighborhoodID")]
        [InverseProperty("BackboneSegments")]
        public virtual Neighborhood Neighborhood { get; set; }
        [InverseProperty("DownstreamBackboneSegment")]
        public virtual ICollection<BackboneSegment> InverseDownstreamBackboneSegment { get; set; }
    }
}
