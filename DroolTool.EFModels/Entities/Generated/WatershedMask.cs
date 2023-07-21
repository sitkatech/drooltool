using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace DroolTool.EFModels.Entities
{
    [Table("WatershedMask")]
    public partial class WatershedMask
    {
        [Key]
        public int WatershedMaskID { get; set; }
        [Column(TypeName = "geometry")]
        public Geometry WatershedMaskGeometry { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string WatershedMaskName { get; set; }
        [Column(TypeName = "geometry")]
        public Geometry WatershedMaskGeometry4326 { get; set; }
    }
}
