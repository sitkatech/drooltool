﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace DroolTool.EFModels.Entities
{
    public partial class NeighborhoodStaging
    {
        public NeighborhoodStaging()
        {
            InverseOCSurveyDownstreamNeighborhoodStaging = new HashSet<NeighborhoodStaging>();
        }

        [Key]
        public int NeighborhoodStagingID { get; set; }
        [Required]
        [StringLength(100)]
        public string Watershed { get; set; }
        [Required]
        [Column(TypeName = "geometry")]
        public Geometry NeighborhoodStagingGeometry { get; set; }
        public int OCSurveyNeighborhoodStagingID { get; set; }
        public int? OCSurveyDownstreamNeighborhoodStagingID { get; set; }
        [Column(TypeName = "geometry")]
        public Geometry NeighborhoodStagingGeometry4326 { get; set; }

        public virtual NeighborhoodStaging OCSurveyDownstreamNeighborhoodStaging { get; set; }
        public virtual ICollection<NeighborhoodStaging> InverseOCSurveyDownstreamNeighborhoodStaging { get; set; }
    }
}
