CREATE TABLE [dbo].[BackboneSegmentType](
	[BackboneSegmentTypeID] [int] NOT NULL,
	[BackboneSegmentTypeName] [varchar](20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[BackboneSegmentTypeDisplayName] [varchar](20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
 CONSTRAINT [PK_BackboneSegmentType_BackboneSegmentTypeID] PRIMARY KEY CLUSTERED 
(
	[BackboneSegmentTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [AK_BackboneSegmentType_BackboneSegmentTypeDisplayName] UNIQUE NONCLUSTERED 
(
	[BackboneSegmentTypeDisplayName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [AK_BackboneSegmentType_BackboneSegmentTypeName] UNIQUE NONCLUSTERED 
(
	[BackboneSegmentTypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
