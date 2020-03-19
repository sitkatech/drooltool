
/****** Object:  Table [dbo].[BackboneSegmentType]    Script Date: 3/18/2020 2:45:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BackboneSegmentType](
	[BackboneSegmentTypeID] [int] NOT NULL,
	[BackboneSegmentTypeName] [varchar](20) NOT NULL,
	[BackboneSegmentTypeDisplayName] [varchar](20) NOT NULL,
 CONSTRAINT [PK_BackboneSegmentType_BackboneSegmentTypeID] PRIMARY KEY CLUSTERED 
(
	[BackboneSegmentTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[BackboneSegmentType] ([BackboneSegmentTypeID], [BackboneSegmentTypeName], [BackboneSegmentTypeDisplayName]) VALUES (1, N'Dummy', N'Dummy')
INSERT [dbo].[BackboneSegmentType] ([BackboneSegmentTypeID], [BackboneSegmentTypeName], [BackboneSegmentTypeDisplayName]) VALUES (2, N'StormDrain', N'Storm Drain')
INSERT [dbo].[BackboneSegmentType] ([BackboneSegmentTypeID], [BackboneSegmentTypeName], [BackboneSegmentTypeDisplayName]) VALUES (3, N'Channel', N'Channel')
SET ANSI_PADDING ON
GO
/****** Object:  Index [AK_BackboneSegmentType_BackboneSegmentTypeDisplayName]    Script Date: 3/18/2020 2:46:27 PM ******/
ALTER TABLE [dbo].[BackboneSegmentType] ADD  CONSTRAINT [AK_BackboneSegmentType_BackboneSegmentTypeDisplayName] UNIQUE NONCLUSTERED 
(
	[BackboneSegmentTypeDisplayName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [AK_BackboneSegmentType_BackboneSegmentTypeName]    Script Date: 3/18/2020 2:46:27 PM ******/
ALTER TABLE [dbo].[BackboneSegmentType] ADD  CONSTRAINT [AK_BackboneSegmentType_BackboneSegmentTypeName] UNIQUE NONCLUSTERED 
(
	[BackboneSegmentTypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
