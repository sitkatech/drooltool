
CREATE TABLE [dbo].[FileResourceMimeType](
	[FileResourceMimeTypeID] [int] NOT NULL,
	[FileResourceMimeTypeName] [varchar](100) NOT NULL,
	[FileResourceMimeTypeDisplayName] [varchar](100) NOT NULL,
	[FileResourceMimeTypeContentTypeName] [varchar](100) NOT NULL,
	[FileResourceMimeTypeIconSmallFilename] [varchar](100) NULL,
	[FileResourceMimeTypeIconNormalFilename] [varchar](100) NULL,
 CONSTRAINT [PK_FileResourceMimeType_FileResourceMimeTypeID] PRIMARY KEY CLUSTERED 
(
	[FileResourceMimeTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (1, N'PDF', N'PDF', N'application/pdf', N'/Content/img/MimeTypeIcons/pdf_20x20.png', N'/Content/img/MimeTypeIcons/pdf_48x48.png')
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (2, N'Word (DOCX)', N'Word (DOCX)', N'application/vnd.openxmlformats-officedocument.wordprocessingml.document', N'/Content/img/MimeTypeIcons/word_20x20.png', N'/Content/img/MimeTypeIcons/word_48x48.png')
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (3, N'Excel (XLSX)', N'Excel (XLSX)', N'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', N'/Content/img/MimeTypeIcons/excel_20x20.png', N'/Content/img/MimeTypeIcons/excel_48x48.png')
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (4, N'X-PNG', N'X-PNG', N'image/x-png', NULL, NULL)
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (5, N'PNG', N'PNG', N'image/png', NULL, NULL)
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (6, N'TIFF', N'TIFF', N'image/tiff', NULL, NULL)
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (7, N'BMP', N'BMP', N'image/bmp', NULL, NULL)
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (8, N'GIF', N'GIF', N'image/gif', NULL, NULL)
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (9, N'JPEG', N'JPEG', N'image/jpeg', NULL, NULL)
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (10, N'PJPEG', N'PJPEG', N'image/pjpeg', NULL, NULL)
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (11, N'Powerpoint (PPTX)', N'Powerpoint (PPTX)', N'application/vnd.openxmlformats-officedocument.presentationml.presentation', N'/Content/img/MimeTypeIcons/powerpoint_20x20.png', N'/Content/img/MimeTypeIcons/powerpoint_48x48.png')
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (12, N'Powerpoint (PPT)', N'Powerpoint (PPT)', N'application/vnd.ms-powerpoint', N'/Content/img/MimeTypeIcons/powerpoint_20x20.png', N'/Content/img/MimeTypeIcons/powerpoint_48x48.png')
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (13, N'Excel (XLS)', N'Excel (XLS)', N'application/vnd.ms-excel', N'/Content/img/MimeTypeIcons/excel_20x20.png', N'/Content/img/MimeTypeIcons/excel_48x48.png')
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (14, N'Word (DOC)', N'Word (DOC)', N'application/msword', N'/Content/img/MimeTypeIcons/word_20x20.png', N'/Content/img/MimeTypeIcons/word_48x48.png')
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (15, N'x-Excel (XLSX)', N'x-Excel (XLSX)', N'application/x-excel', N'/Content/img/MimeTypeIcons/excel_20x20.png', N'/Content/img/MimeTypeIcons/excel_48x48.png')
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (16, N'CSS', N'CSS', N'text/css', NULL, NULL)
GO
INSERT [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID], [FileResourceMimeTypeName], [FileResourceMimeTypeDisplayName], [FileResourceMimeTypeContentTypeName], [FileResourceMimeTypeIconSmallFilename], [FileResourceMimeTypeIconNormalFilename]) VALUES (17, N'ZIP', N'ZIP', N'application/x-zip-compressed', NULL, NULL)
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [AK_FileResourceMimeType_FileResourceMimeTypeDisplayName]    Script Date: 4/28/2020 9:30:22 AM ******/
ALTER TABLE [dbo].[FileResourceMimeType] ADD  CONSTRAINT [AK_FileResourceMimeType_FileResourceMimeTypeDisplayName] UNIQUE NONCLUSTERED 
(
	[FileResourceMimeTypeDisplayName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [AK_FileResourceMimeType_FileResourceMimeTypeName]    Script Date: 4/28/2020 9:30:22 AM ******/
ALTER TABLE [dbo].[FileResourceMimeType] ADD  CONSTRAINT [AK_FileResourceMimeType_FileResourceMimeTypeName] UNIQUE NONCLUSTERED 
(
	[FileResourceMimeTypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

CREATE TABLE [dbo].[FileResource](
	[FileResourceID] [int] IDENTITY(1,1) NOT NULL,
	[FileResourceMimeTypeID] [int] NOT NULL,
	[OriginalBaseFilename] [varchar](255) NOT NULL,
	[OriginalFileExtension] [varchar](255) NOT NULL,
	[FileResourceGUID] [uniqueidentifier] NOT NULL,
	[FileResourceData] [varbinary](max) NOT NULL,
	[CreateUserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
 CONSTRAINT [PK_FileResource_FileResourceID] PRIMARY KEY CLUSTERED 
(
	[FileResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [AK_FileResource_FileResourceGUID] UNIQUE NONCLUSTERED 
(
	[FileResourceGUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[FileResource]  WITH CHECK ADD  CONSTRAINT [FK_FileResource_FileResourceMimeType_FileResourceMimeTypeID] FOREIGN KEY([FileResourceMimeTypeID])
REFERENCES [dbo].[FileResourceMimeType] ([FileResourceMimeTypeID])
GO

ALTER TABLE [dbo].[FileResource] CHECK CONSTRAINT [FK_FileResource_FileResourceMimeType_FileResourceMimeTypeID]
GO

ALTER TABLE [dbo].[FileResource]  WITH CHECK ADD  CONSTRAINT [FK_FileResource_User_CreateUserID_UserID] FOREIGN KEY([CreateUserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[FileResource] CHECK CONSTRAINT [FK_FileResource_User_CreateUserID_UserID]
GO

