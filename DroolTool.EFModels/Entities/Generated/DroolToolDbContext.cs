using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DroolTool.EFModels.Entities;

public partial class DroolToolDbContext : DbContext
{
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

    public virtual DbSet<RegionalSubbasin> RegionalSubbasins { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WatershedAlias> WatershedAliases { get; set; }

    public virtual DbSet<WatershedMask> WatershedMasks { get; set; }

    public virtual DbSet<vBackboneWithoutGeometry> vBackboneWithoutGeometries { get; set; }

    public virtual DbSet<vGeoServerBackbone> vGeoServerBackbones { get; set; }

    public virtual DbSet<vGeoServerNeighborhood> vGeoServerNeighborhoods { get; set; }

    public virtual DbSet<vGeoServerWatershedMask> vGeoServerWatershedMasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Announcement>(entity =>
        {
            entity.HasKey(e => e.AnnouncementID).HasName("PK_Announcement_AnnouncementID");

            entity.HasOne(d => d.FileResource).WithMany(p => p.Announcements).OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.LastUpdatedByUser).WithMany(p => p.Announcements)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Announcement_User_LastUpdatedByUserID_UserID");
        });

        modelBuilder.Entity<BackboneSegment>(entity =>
        {
            entity.HasKey(e => e.BackboneSegmentID).HasName("PK_BackboneSegment_BackboneSegmentID");

            entity.HasOne(d => d.DownstreamBackboneSegment).WithMany(p => p.InverseDownstreamBackboneSegment).HasConstraintName("FK_BackboneSegment_BackboneSegment_DownstreamBackboneSegmentID_BackboneSegmentID");
        });

        modelBuilder.Entity<CustomRichText>(entity =>
        {
            entity.HasKey(e => e.CustomRichTextID).HasName("PK_CustomRichText_CustomRichTextID");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackID).HasName("PK_Feedback_FeedbackID");
        });

        modelBuilder.Entity<FileResource>(entity =>
        {
            entity.HasKey(e => e.FileResourceID).HasName("PK_FileResource_FileResourceID");

            entity.HasOne(d => d.CreateUser).WithMany(p => p.FileResources)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FileResource_User_CreateUserID_UserID");
        });

        modelBuilder.Entity<Neighborhood>(entity =>
        {
            entity.HasKey(e => e.NeighborhoodID).HasName("PK_Neighborhood_NeighborhoodID");

            entity.HasOne(d => d.OCSurveyDownstreamNeighborhood).WithMany(p => p.InverseOCSurveyDownstreamNeighborhood)
                .HasPrincipalKey(p => p.OCSurveyNeighborhoodID)
                .HasForeignKey(d => d.OCSurveyDownstreamNeighborhoodID)
                .HasConstraintName("FK_Neighborhood_Neighborhood_OCSurveyDownstreamNeighborhoodID_OCSurveyNeighborhoodID");
        });

        modelBuilder.Entity<RegionalSubbasin>(entity =>
        {
            entity.HasKey(e => e.RegionalSubbasinID).HasName("PK_RegionalSubbasin_RegionalSubbasinID");

            entity.HasOne(d => d.OCSurveyDownstreamCatchment).WithMany(p => p.InverseOCSurveyDownstreamCatchment)
                .HasPrincipalKey(p => p.OCSurveyCatchmentID)
                .HasForeignKey(d => d.OCSurveyDownstreamCatchmentID)
                .HasConstraintName("FK_RegionalSubbasin_RegionalSubbasin_OCSurveyDownstreamCatchmentID_OCSurveyCatchmentID");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserID).HasName("PK_User_UserID");
        });

        modelBuilder.Entity<WatershedAlias>(entity =>
        {
            entity.HasKey(e => e.WatershedAliasID).HasName("PK_WatershedAlias_WatershedAliasID");
        });

        modelBuilder.Entity<WatershedMask>(entity =>
        {
            entity.HasKey(e => e.WatershedMaskID).HasName("PK_Watershed_WatershedID");
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

        modelBuilder.Entity<vGeoServerWatershedMask>(entity =>
        {
            entity.ToView("vGeoServerWatershedMask");

            entity.Property(e => e.WatershedMaskID).ValueGeneratedOnAdd();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
