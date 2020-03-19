using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace DroolTool.EFModels.Entities
{
    public partial class DroolToolWatershed
    {
        [Key]
        public int DroolToolWatershedID { get; set; }
        [Column(TypeName = "geometry")]
        public Geometry DroolToolWatershedGeometry { get; set; }
        [StringLength(50)]
        public string DroolToolWatershedName { get; set; }
        [Column(TypeName = "geometry")]
        public Geometry DroolToolWatershedGeometry4326 { get; set; }
    }
}
