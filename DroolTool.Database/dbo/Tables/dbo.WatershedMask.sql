CREATE TABLE [dbo].[WatershedMask](
	[WatershedMaskID] [int] IDENTITY(1,1) NOT NULL,
	[WatershedMaskGeometry] [geometry] NULL,
	[WatershedMaskName] [varchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[WatershedMaskGeometry4326] [geometry] NULL,
 CONSTRAINT [PK_Watershed_WatershedID] PRIMARY KEY CLUSTERED 
(
	[WatershedMaskID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
