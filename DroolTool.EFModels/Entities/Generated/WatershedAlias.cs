using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace DroolTool.EFModels.Entities
{
    [Table("WatershedAlias")]
    [Index("WatershedAliasName", Name = "AK_WatershedAlias_WatershedAliasName", IsUnique = true)]
    [Index("WatershedName", Name = "AK_WatershedAlias_WatershedName", IsUnique = true)]
    public partial class WatershedAlias
    {
        [Key]
        public int WatershedAliasID { get; set; }
        [Required]
        [StringLength(100)]
        [Unicode(false)]
        public string WatershedName { get; set; }
        [Required]
        [StringLength(100)]
        [Unicode(false)]
        public string WatershedAliasName { get; set; }
        [Required]
        [Column(TypeName = "geometry")]
        public Geometry WatershedAliasGeometry4326 { get; set; }
    }
}
