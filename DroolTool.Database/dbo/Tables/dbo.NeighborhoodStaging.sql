
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NeighborhoodStaging](
	[NeighborhoodStagingID] [int] IDENTITY(1,1) NOT NULL,
	[Watershed] [varchar](100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[NeighborhoodStagingGeometry] [geometry] NOT NULL,
	[OCSurveyNeighborhoodStagingID] [int] NOT NULL,
	[OCSurveyDownstreamNeighborhoodStagingID] [int] NOT NULL,
	[NeighborhoodStagingGeometry4326] [geometry] NULL,
 CONSTRAINT [PK_NeighborhoodStaging_NeighborhoodStagingID] PRIMARY KEY CLUSTERED 
(
	[NeighborhoodStagingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [AK_NeighborhoodStaging_OCSurveyNeighborhoodStagingID] UNIQUE NONCLUSTERED 
(
	[OCSurveyNeighborhoodStagingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
