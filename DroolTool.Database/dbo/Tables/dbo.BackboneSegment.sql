CREATE TABLE [dbo].[BackboneSegment](
	[BackboneSegmentID] [int] IDENTITY(1,1) NOT NULL,
	[BackboneSegmentGeometry] [geometry] NOT NULL,
	[CatchIDN] [int] NOT NULL,
	[BackboneSegmentTypeID] [int] NOT NULL,
	[DownstreamBackboneSegmentID] [int] NULL,
	[BackboneSegmentGeometry4326] [geometry] NULL,
	[NeighborhoodID] [int] NULL,
	[InStream] [bit] NOT NULL,
 CONSTRAINT [PK_BackboneSegment_BackboneSegmentID] PRIMARY KEY CLUSTERED 
(
	[BackboneSegmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[BackboneSegment]  WITH CHECK ADD  CONSTRAINT [FK_BackboneSegment_BackboneSegment_DownstreamBackboneSegmentID_BackboneSegmentID] FOREIGN KEY([DownstreamBackboneSegmentID])
REFERENCES [dbo].[BackboneSegment] ([BackboneSegmentID])
GO
ALTER TABLE [dbo].[BackboneSegment] CHECK CONSTRAINT [FK_BackboneSegment_BackboneSegment_DownstreamBackboneSegmentID_BackboneSegmentID]
GO
ALTER TABLE [dbo].[BackboneSegment]  WITH CHECK ADD  CONSTRAINT [FK_BackboneSegment_BackboneSegmentType_BackboneSegmentTypeID] FOREIGN KEY([BackboneSegmentTypeID])
REFERENCES [dbo].[BackboneSegmentType] ([BackboneSegmentTypeID])
GO
ALTER TABLE [dbo].[BackboneSegment] CHECK CONSTRAINT [FK_BackboneSegment_BackboneSegmentType_BackboneSegmentTypeID]
GO
ALTER TABLE [dbo].[BackboneSegment]  WITH CHECK ADD  CONSTRAINT [FK_BackboneSegment_Neighborhood_NeighborhoodID] FOREIGN KEY([NeighborhoodID])
REFERENCES [dbo].[Neighborhood] ([NeighborhoodID])
GO
ALTER TABLE [dbo].[BackboneSegment] CHECK CONSTRAINT [FK_BackboneSegment_Neighborhood_NeighborhoodID]