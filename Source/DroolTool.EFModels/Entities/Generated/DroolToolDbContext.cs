using System;
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

        public virtual DbSet<Announcement> Announcement { get; set; }
        public virtual DbSet<BackboneSegment> BackboneSegment { get; set; }
        public virtual DbSet<BackboneSegmentType> BackboneSegmentType { get; set; }
        public virtual DbSet<CustomRichText> CustomRichText { get; set; }
        public virtual DbSet<CustomRichTextType> CustomRichTextType { get; set; }
        public virtual DbSet<DatabaseMigration> DatabaseMigration { get; set; }
        public virtual DbSet<FileResource> FileResource { get; set; }
        public virtual DbSet<FileResourceMimeType> FileResourceMimeType { get; set; }
        public virtual DbSet<Neighborhood> Neighborhood { get; set; }
        public virtual DbSet<NeighborhoodStaging> NeighborhoodStaging { get; set; }
        public virtual DbSet<RawDroolMetric> RawDroolMetric { get; set; }
        public virtual DbSet<RawDroolMetricStaging> RawDroolMetricStaging { get; set; }
        public virtual DbSet<RegionalSubbasin> RegionalSubbasin { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<WatershedAlias> WatershedAlias { get; set; }
        public virtual DbSet<WatershedMask> WatershedMask { get; set; }
        public virtual DbSet<vGeoServerBackbone> vGeoServerBackbone { get; set; }
        public virtual DbSet<vGeoServerNeighborhood> vGeoServerNeighborhood { get; set; }
        public virtual DbSet<vGeoServerWatershedExplorerMapMetrics> vGeoServerWatershedExplorerMapMetrics { get; set; }
        public virtual DbSet<vGeoServerWatershedMask> vGeoServerWatershedMask { get; set; }
        public virtual DbSet<vNeighborhoodMetric> vNeighborhoodMetric { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
            {

                
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Announcement>(entity =>
            {
                entity.Property(e => e.AnnouncementLink).IsUnicode(false);

                entity.Property(e => e.AnnouncementTitle).IsUnicode(false);

                entity.HasOne(d => d.FileResource)
                    .WithMany(p => p.Announcement)
                    .HasForeignKey(d => d.FileResourceID)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.LastUpdatedByUser)
                    .WithMany(p => p.Announcement)
                    .HasForeignKey(d => d.LastUpdatedByUserID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Announcement_User_LastUpdatedByUserID_UserID");
            });

            modelBuilder.Entity<BackboneSegment>(entity =>
            {
                entity.HasOne(d => d.BackboneSegmentType)
                    .WithMany(p => p.BackboneSegment)
                    .HasForeignKey(d => d.BackboneSegmentTypeID)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.DownstreamBackboneSegment)
                    .WithMany(p => p.InverseDownstreamBackboneSegment)
                    .HasForeignKey(d => d.DownstreamBackboneSegmentID)
                    .HasConstraintName("FK_BackboneSegment_BackboneSegment_DownstreamBackboneSegmentID_BackboneSegmentID");
            });

            modelBuilder.Entity<BackboneSegmentType>(entity =>
            {
                entity.HasIndex(e => e.BackboneSegmentTypeDisplayName)
                    .HasName("AK_BackboneSegmentType_BackboneSegmentTypeDisplayName")
                    .IsUnique();

                entity.HasIndex(e => e.BackboneSegmentTypeName)
                    .HasName("AK_BackboneSegmentType_BackboneSegmentTypeName")
                    .IsUnique();

                entity.Property(e => e.BackboneSegmentTypeID).ValueGeneratedNever();

                entity.Property(e => e.BackboneSegmentTypeDisplayName).IsUnicode(false);

                entity.Property(e => e.BackboneSegmentTypeName).IsUnicode(false);
            });

            modelBuilder.Entity<CustomRichText>(entity =>
            {
                entity.Property(e => e.CustomRichTextContent).IsUnicode(false);

                entity.HasOne(d => d.CustomRichTextType)
                    .WithMany(p => p.CustomRichText)
                    .HasForeignKey(d => d.CustomRichTextTypeID)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<CustomRichTextType>(entity =>
            {
                entity.HasIndex(e => e.CustomRichTextTypeDisplayName)
                    .HasName("AK_CustomRichTextType_CustomRichTextTypeDisplayName")
                    .IsUnique();

                entity.HasIndex(e => e.CustomRichTextTypeName)
                    .HasName("AK_CustomRichTextType_CustomRichTextTypeName")
                    .IsUnique();

                entity.Property(e => e.CustomRichTextTypeID).ValueGeneratedNever();

                entity.Property(e => e.CustomRichTextTypeDisplayName).IsUnicode(false);

                entity.Property(e => e.CustomRichTextTypeName).IsUnicode(false);
            });

            modelBuilder.Entity<DatabaseMigration>(entity =>
            {
                entity.HasKey(e => e.DatabaseMigrationNumber)
                    .HasName("PK_DatabaseMigration_DatabaseMigrationNumber");

                entity.Property(e => e.DatabaseMigrationNumber).ValueGeneratedNever();
            });

            modelBuilder.Entity<FileResource>(entity =>
            {
                entity.HasIndex(e => e.FileResourceGUID)
                    .HasName("AK_FileResource_FileResourceGUID")
                    .IsUnique();

                entity.Property(e => e.OriginalBaseFilename).IsUnicode(false);

                entity.Property(e => e.OriginalFileExtension).IsUnicode(false);

                entity.HasOne(d => d.CreateUser)
                    .WithMany(p => p.FileResource)
                    .HasForeignKey(d => d.CreateUserID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FileResource_User_CreateUserID_UserID");

                entity.HasOne(d => d.FileResourceMimeType)
                    .WithMany(p => p.FileResource)
                    .HasForeignKey(d => d.FileResourceMimeTypeID)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<FileResourceMimeType>(entity =>
            {
                entity.HasIndex(e => e.FileResourceMimeTypeDisplayName)
                    .HasName("AK_FileResourceMimeType_FileResourceMimeTypeDisplayName")
                    .IsUnique();

                entity.HasIndex(e => e.FileResourceMimeTypeName)
                    .HasName("AK_FileResourceMimeType_FileResourceMimeTypeName")
                    .IsUnique();

                entity.Property(e => e.FileResourceMimeTypeID).ValueGeneratedNever();

                entity.Property(e => e.FileResourceMimeTypeContentTypeName).IsUnicode(false);

                entity.Property(e => e.FileResourceMimeTypeDisplayName).IsUnicode(false);

                entity.Property(e => e.FileResourceMimeTypeIconNormalFilename).IsUnicode(false);

                entity.Property(e => e.FileResourceMimeTypeIconSmallFilename).IsUnicode(false);

                entity.Property(e => e.FileResourceMimeTypeName).IsUnicode(false);
            });

            modelBuilder.Entity<Neighborhood>(entity =>
            {
                entity.HasIndex(e => e.OCSurveyNeighborhoodID)
                    .HasName("AK_Neighborhood_OCSurveyNeighborhoodID")
                    .IsUnique();

                entity.Property(e => e.Watershed).IsUnicode(false);

                entity.HasOne(d => d.OCSurveyDownstreamNeighborhood)
                    .WithMany(p => p.InverseOCSurveyDownstreamNeighborhood)
                    .HasPrincipalKey(p => p.OCSurveyNeighborhoodID)
                    .HasForeignKey(d => d.OCSurveyDownstreamNeighborhoodID)
                    .HasConstraintName("FK_Neighborhood_Neighborhood_OCSurveyDownstreamNeighborhoodID_OCSurveyNeighborhoodID");
            });

            modelBuilder.Entity<NeighborhoodStaging>(entity =>
            {
                entity.HasIndex(e => e.OCSurveyNeighborhoodStagingID)
                    .HasName("AK_NeighborhoodStaging_OCSurveyNeighborhoodStagingID")
                    .IsUnique();

                entity.Property(e => e.Watershed).IsUnicode(false);
            });

            modelBuilder.Entity<RawDroolMetric>(entity =>
            {
                entity.Property(e => e.RawDroolMetricID).ValueGeneratedNever();

                entity.HasOne(d => d.MetricCatchIDNNavigation)
                    .WithMany(p => p.RawDroolMetric)
                    .HasPrincipalKey(p => p.OCSurveyNeighborhoodID)
                    .HasForeignKey(d => d.MetricCatchIDN)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RawDroolMetric_Neighborhood_CatchIDN_OCSurveyNeighborhoodID");
            });

            modelBuilder.Entity<RawDroolMetricStaging>(entity =>
            {
                entity.Property(e => e.RawDroolMetricStagingID).ValueGeneratedNever();
            });

            modelBuilder.Entity<RegionalSubbasin>(entity =>
            {
                entity.HasIndex(e => e.OCSurveyCatchmentID)
                    .HasName("AK_RegionalSubbasin_OCSurveyCatchmentID")
                    .IsUnique();

                entity.Property(e => e.DrainID).IsUnicode(false);

                entity.Property(e => e.Watershed).IsUnicode(false);

                entity.HasOne(d => d.OCSurveyDownstreamCatchment)
                    .WithMany(p => p.InverseOCSurveyDownstreamCatchment)
                    .HasPrincipalKey(p => p.OCSurveyCatchmentID)
                    .HasForeignKey(d => d.OCSurveyDownstreamCatchmentID)
                    .HasConstraintName("FK_RegionalSubbasin_RegionalSubbasin_OCSurveyDownstreamCatchmentID_OCSurveyCatchmentID");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasIndex(e => e.RoleDisplayName)
                    .HasName("AK_Role_RoleDisplayName")
                    .IsUnique();

                entity.HasIndex(e => e.RoleName)
                    .HasName("AK_Role_RoleName")
                    .IsUnique();

                entity.Property(e => e.RoleID).ValueGeneratedNever();

                entity.Property(e => e.RoleDescription).IsUnicode(false);

                entity.Property(e => e.RoleDisplayName).IsUnicode(false);

                entity.Property(e => e.RoleName).IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("AK_User_Email")
                    .IsUnique();

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.FirstName).IsUnicode(false);

                entity.Property(e => e.LastName).IsUnicode(false);

                entity.Property(e => e.LoginName).IsUnicode(false);

                entity.Property(e => e.Phone).IsUnicode(false);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.RoleID)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<WatershedAlias>(entity =>
            {
                entity.HasIndex(e => e.WatershedAliasName)
                    .HasName("AK_WatershedAlias_WatershedAliasName")
                    .IsUnique();

                entity.HasIndex(e => e.WatershedName)
                    .HasName("AK_WatershedAlias_WatershedName")
                    .IsUnique();

                entity.Property(e => e.WatershedAliasName).IsUnicode(false);

                entity.Property(e => e.WatershedName).IsUnicode(false);
            });

            modelBuilder.Entity<WatershedMask>(entity =>
            {
                entity.Property(e => e.WatershedMaskName).IsUnicode(false);
            });

            modelBuilder.Entity<vGeoServerBackbone>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vGeoServerBackbone");

                entity.Property(e => e.BackboneSegmentType).IsUnicode(false);
            });

            modelBuilder.Entity<vGeoServerNeighborhood>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vGeoServerNeighborhood");

                entity.Property(e => e.Watershed).IsUnicode(false);
            });

            modelBuilder.Entity<vGeoServerWatershedExplorerMapMetrics>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vGeoServerWatershedExplorerMapMetrics");

                entity.Property(e => e.WatershedAliasName).IsUnicode(false);
            });

            modelBuilder.Entity<vGeoServerWatershedMask>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vGeoServerWatershedMask");

                entity.Property(e => e.WatershedMaskID).ValueGeneratedOnAdd();

                entity.Property(e => e.WatershedMaskName).IsUnicode(false);
            });

            modelBuilder.Entity<vNeighborhoodMetric>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vNeighborhoodMetric");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
