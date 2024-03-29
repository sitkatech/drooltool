CREATE TABLE [dbo].[RegionalSubbasin](
	[RegionalSubbasinID] [int] IDENTITY(1,1) NOT NULL,
	[DrainID] [varchar](10) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Watershed] [varchar](100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[CatchmentGeometry] [geometry] NOT NULL,
	[OCSurveyCatchmentID] [int] NOT NULL,
	[OCSurveyDownstreamCatchmentID] [int] NULL,
	[CatchmentGeometry4326] [geometry] NULL,
	[LastUpdate] [datetime] NULL,
 CONSTRAINT [PK_RegionalSubbasin_RegionalSubbasinID] PRIMARY KEY CLUSTERED 
(
	[RegionalSubbasinID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [AK_RegionalSubbasin_OCSurveyCatchmentID] UNIQUE NONCLUSTERED 
(
	[OCSurveyCatchmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[RegionalSubbasin]  WITH CHECK ADD  CONSTRAINT [FK_RegionalSubbasin_RegionalSubbasin_OCSurveyDownstreamCatchmentID_OCSurveyCatchmentID] FOREIGN KEY([OCSurveyDownstreamCatchmentID])
REFERENCES [dbo].[RegionalSubbasin] ([OCSurveyCatchmentID])
GO
ALTER TABLE [dbo].[RegionalSubbasin] CHECK CONSTRAINT [FK_RegionalSubbasin_RegionalSubbasin_OCSurveyDownstreamCatchmentID_OCSurveyCatchmentID]