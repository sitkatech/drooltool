using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DroolTool.EFModels.Entities
{
    public partial class DroolToolDbContext : DbContext
    {
        public DroolToolDbContext()
        {
        }

        public DroolToolDbContext(DbContextOptions<DroolToolDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Announcement> Announcements { get; set; }
        public virtual DbSet<BackboneSegment> BackboneSegments { get; set; }
        public virtual DbSet<CustomRichText> CustomRichTexts { get; set; }
        public virtual DbSet<Feedback> Feedbacks { get; set; }
        public virtual DbSet<FileResource> FileResources { get; set; }
        public virtual DbSet<Neighborhood> Neighborhoods { get; set; }
        public virtual DbSet<NeighborhoodStaging> NeighborhoodStagings { get; set; }
        public virtual DbSet<RawDroolMetric> RawDroolMetrics { get; set; }
        public virtual DbSet<RawDroolMetricStaging> RawDroolMetricStagings { get; set; }
        public virtual DbSet<RegionalSubbasin> RegionalSubbasins { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<WatershedAlias> WatershedAliases { get; set; }
        public virtual DbSet<WatershedMask> WatershedMasks { get; set; }
        public virtual DbSet<vBackboneWithoutGeometry> vBackboneWithoutGeometries { get; set; }
        public virtual DbSet<vGeoServerBackbone> vGeoServerBackbones { get; set; }
        public virtual DbSet<vGeoServerNeighborhood> vGeoServerNeighborhoods { get; set; }
        public virtual DbSet<vGeoServerWatershedExplorerMapMetric> vGeoServerWatershedExplorerMapMetrics { get; set; }
        public virtual DbSet<vGeoServerWatershedMask> vGeoServerWatershedMasks { get; set; }
        public virtual DbSet<vNeighborhoodMetric> vNeighborhoodMetrics { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Announcement>(entity =>
            {
                entity.HasOne(d => d.FileResource)
                    .WithMany(p => p.Announcements)
                    .HasForeignKey(d => d.FileResourceID)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.LastUpdatedByUser)
                    .WithMany(p => p.Announcements)
                    .HasForeignKey(d => d.LastUpdatedByUserID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Announcement_User_LastUpdatedByUserID_UserID");
            });

            modelBuilder.Entity<BackboneSegment>(entity =>
            {
                entity.HasOne(d => d.DownstreamBackboneSegment)
                    .WithMany(p => p.InverseDownstreamBackboneSegment)
                    .HasForeignKey(d => d.DownstreamBackboneSegmentID)
                    .HasConstraintName("FK_BackboneSegment_BackboneSegment_DownstreamBackboneSegmentID_BackboneSegmentID");
            });

            modelBuilder.Entity<FileResource>(entity =>
            {
                entity.HasOne(d => d.CreateUser)
                    .WithMany(p => p.FileResources)
                    .HasForeignKey(d => d.CreateUserID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FileResource_User_CreateUserID_UserID");
            });

            modelBuilder.Entity<Neighborhood>(entity =>
            {
                entity.HasOne(d => d.OCSurveyDownstreamNeighborhood)
                    .WithMany(p => p.InverseOCSurveyDownstreamNeighborhood)
                    .HasPrincipalKey(p => p.OCSurveyNeighborhoodID)
                    .HasForeignKey(d => d.OCSurveyDownstreamNeighborhoodID)
                    .HasConstraintName("FK_Neighborhood_Neighborhood_OCSurveyDownstreamNeighborhoodID_OCSurveyNeighborhoodID");
            });

            modelBuilder.Entity<RawDroolMetric>(entity =>
            {
                entity.Property(e => e.RawDroolMetricID).ValueGeneratedNever();

                entity.HasOne(d => d.OCSurveyNeighborhood)
                    .WithMany(p => p.RawDroolMetrics)
                    .HasPrincipalKey(p => p.OCSurveyNeighborhoodID)
                    .HasForeignKey(d => d.OCSurveyNeighborhoodID)
                    .HasConstraintName("FK_RawDroolMetric_Neighborhood_OCSurveyNeighborhoodID_OCSurveyNeighborhoodID");
            });

            modelBuilder.Entity<RawDroolMetricStaging>(entity =>
            {
                entity.Property(e => e.RawDroolMetricStagingID).ValueGeneratedNever();
            });

            modelBuilder.Entity<RegionalSubbasin>(entity =>
            {
                entity.HasOne(d => d.OCSurveyDownstreamCatchment)
                    .WithMany(p => p.InverseOCSurveyDownstreamCatchment)
                    .HasPrincipalKey(p => p.OCSurveyCatchmentID)
                    .HasForeignKey(d => d.OCSurveyDownstreamCatchmentID)
                    .HasConstraintName("FK_RegionalSubbasin_RegionalSubbasin_OCSurveyDownstreamCatchmentID_OCSurveyCatchmentID");
            });

            modelBuilder.Entity<vBackboneWithoutGeometry>(entity =>
            {
                entity.ToView("vBackboneWithoutGeometry");
            });

            modelBuilder.Entity<vGeoServerBackbone>(entity =>
            {
                entity.ToView("vGeoServerBackbone");
            });

            modelBuilder.Entity<vGeoServerNeighborhood>(entity =>
            {
                entity.ToView("vGeoServerNeighborhood");
            });

            modelBuilder.Entity<vGeoServerWatershedExplorerMapMetric>(entity =>
            {
                entity.ToView("vGeoServerWatershedExplorerMapMetrics");
            });

            modelBuilder.Entity<vGeoServerWatershedMask>(entity =>
            {
                entity.ToView("vGeoServerWatershedMask");

                entity.Property(e => e.WatershedMaskID).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<vNeighborhoodMetric>(entity =>
            {
                entity.ToView("vNeighborhoodMetric");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
