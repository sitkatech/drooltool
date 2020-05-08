using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DroolTool.EFModels.Entities
{
    public partial class WatershedAlias
    {
        [Key]
        public int WatershedAliasID { get; set; }
        [Required]
        [StringLength(100)]
        public string Watershed { get; set; }
        [Required]
        [Column("WatershedAlias")]
        [StringLength(100)]
        public string WatershedAlias1 { get; set; }
    }
}
