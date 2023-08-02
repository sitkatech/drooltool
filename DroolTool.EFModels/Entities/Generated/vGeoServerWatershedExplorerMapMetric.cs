using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace DroolTool.EFModels.Entities
{
    [Keyless]
    public partial class vGeoServerWatershedExplorerMapMetric
    {
        public int PrimaryKey { get; set; }
        [Column(TypeName = "geometry")]
        public Geometry NeighborhoodGeometry { get; set; }
        public double? Area { get; set; }
        [Required]
        [StringLength(100)]
        [Unicode(false)]
        public string WatershedAliasName { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime MetricDate { get; set; }
        public int MetricYear { get; set; }
        public int MetricMonth { get; set; }
        public double? TotalDrool { get; set; }
        public double? OverallParticipation { get; set; }
        public double? PercentParticipation { get; set; }
        public double? DroolPerLandscapedAcre { get; set; }
    }
}
