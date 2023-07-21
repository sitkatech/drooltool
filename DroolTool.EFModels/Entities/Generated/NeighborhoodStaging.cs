using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace DroolTool.EFModels.Entities
{
    [Table("NeighborhoodStaging")]
    [Index("OCSurveyNeighborhoodStagingID", Name = "AK_NeighborhoodStaging_OCSurveyNeighborhoodStagingID", IsUnique = true)]
    public partial class NeighborhoodStaging
    {
        [Key]
        public int NeighborhoodStagingID { get; set; }
        [Required]
        [StringLength(100)]
        [Unicode(false)]
        public string Watershed { get; set; }
        [Required]
        [Column(TypeName = "geometry")]
        public Geometry NeighborhoodStagingGeometry { get; set; }
        public int OCSurveyNeighborhoodStagingID { get; set; }
        public int OCSurveyDownstreamNeighborhoodStagingID { get; set; }
        [Column(TypeName = "geometry")]
        public Geometry NeighborhoodStagingGeometry4326 { get; set; }
    }
}
