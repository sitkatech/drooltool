using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace DroolTool.EFModels.Entities;

[Table("Neighborhood")]
[Index("OCSurveyNeighborhoodID", Name = "AK_Neighborhood_OCSurveyNeighborhoodID", IsUnique = true)]
public partial class Neighborhood
{
    [Key]
    public int NeighborhoodID { get; set; }

    [Required]
    [StringLength(100)]
    [Unicode(false)]
    public string Watershed { get; set; }

    [Required]
    [Column(TypeName = "geometry")]
    public Geometry NeighborhoodGeometry { get; set; }

    public int OCSurveyNeighborhoodID { get; set; }

    public int? OCSurveyDownstreamNeighborhoodID { get; set; }

    [Column(TypeName = "geometry")]
    public Geometry NeighborhoodGeometry4326 { get; set; }

    [InverseProperty("Neighborhood")]
    public virtual ICollection<BackboneSegment> BackboneSegments { get; set; } = new List<BackboneSegment>();

    [InverseProperty("OCSurveyDownstreamNeighborhood")]
    public virtual ICollection<Neighborhood> InverseOCSurveyDownstreamNeighborhood { get; set; } = new List<Neighborhood>();

    [ForeignKey("OCSurveyDownstreamNeighborhoodID")]
    [InverseProperty("InverseOCSurveyDownstreamNeighborhood")]
    public virtual Neighborhood OCSurveyDownstreamNeighborhood { get; set; }
}
