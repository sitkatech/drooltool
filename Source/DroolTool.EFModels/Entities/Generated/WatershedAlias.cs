using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace DroolTool.EFModels.Entities
{
    public partial class WatershedAlias
    {
        [Key]
        public int WatershedAliasID { get; set; }
        [Required]
        [StringLength(100)]
        public string WatershedName { get; set; }
        [Required]
        [StringLength(100)]
        public string WatershedAliasName { get; set; }
        [Required]
        [Column(TypeName = "geometry")]
        public Geometry WatershedAliasGeometry4326 { get; set; }
    }
}
