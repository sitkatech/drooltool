﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace DroolTool.EFModels.Entities
{
    public partial class WatershedMask
    {
        public WatershedMask()
        {
            WatershedAlias = new HashSet<WatershedAlias>();
        }

        [Key]
        public int WatershedMaskID { get; set; }
        [Column(TypeName = "geometry")]
        public Geometry WatershedMaskGeometry { get; set; }
        [StringLength(50)]
        public string WatershedMaskName { get; set; }
        [Column(TypeName = "geometry")]
        public Geometry WatershedMaskGeometry4326 { get; set; }

        [InverseProperty("WatershedMask")]
        public virtual ICollection<WatershedAlias> WatershedAlias { get; set; }
    }
}
