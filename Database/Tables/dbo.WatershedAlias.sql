SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WatershedAlias](
	[WatershedAliasID] [int] IDENTITY(1,1) NOT NULL,
	[WatershedName] [varchar](100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[WatershedAliasName] [varchar](100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[WatershedMaskID] [int] NULL,
 CONSTRAINT [PK_WatershedAlias_WatershedAliasID] PRIMARY KEY CLUSTERED 
(
	[WatershedAliasID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [AK_WatershedAlias_WatershedAliasName] UNIQUE NONCLUSTERED 
(
	[WatershedAliasName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [AK_WatershedAlias_WatershedName] UNIQUE NONCLUSTERED 
(
	[WatershedName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[WatershedAlias]  WITH CHECK ADD  CONSTRAINT [FK_WatershedAlias_WatershedMask_WatershedMaskID] FOREIGN KEY([WatershedMaskID])
REFERENCES [dbo].[WatershedMask] ([WatershedMaskID])
GO
ALTER TABLE [dbo].[WatershedAlias] CHECK CONSTRAINT [FK_WatershedAlias_WatershedMask_WatershedMaskID]