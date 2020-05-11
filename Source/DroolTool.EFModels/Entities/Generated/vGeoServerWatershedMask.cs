using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace DroolTool.EFModels.Entities
{
    public partial class vGeoServerWatershedMask
    {
        public int WatershedMaskID { get; set; }
        [StringLength(50)]
        public string WatershedMaskName { get; set; }
        [Column(TypeName = "geometry")]
        public Geometry WatershedMaskGeometry { get; set; }
    }
}
