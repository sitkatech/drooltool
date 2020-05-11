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
        public string WatershedName { get; set; }
        [Required]
        [StringLength(100)]
        public string WatershedAliasName { get; set; }
        public int? WatershedMaskID { get; set; }

        [ForeignKey(nameof(WatershedMaskID))]
        [InverseProperty("WatershedAlias")]
        public virtual WatershedMask WatershedMask { get; set; }
    }
}
