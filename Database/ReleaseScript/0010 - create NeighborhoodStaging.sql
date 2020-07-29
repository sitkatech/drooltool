CREATE TABLE [dbo].[NeighborhoodStaging](
	[NeighborhoodStagingID] [int] IDENTITY(1,1) NOT NULL CONSTRAINT [PK_NeighborhoodStaging_NeighborhoodStagingID] PRIMARY key,
	[Watershed] [varchar](100) NOT NULL,
	[NeighborhoodStagingGeometry] [geometry] NOT NULL,
	[OCSurveyNeighborhoodStagingID] [int] NOT NULL
		constraint AK_NeighborhoodStaging_OCSurveyNeighborhoodStagingID unique,
	[OCSurveyDownstreamNeighborhoodStagingID] [int] NULL,
	[NeighborhoodStagingGeometry4326] [geometry] NULL
)
GO