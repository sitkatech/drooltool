SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NewsAndAnnouncements](
	[NewsAndAnnouncementsID] [int] IDENTITY(1,1) NOT NULL,
	[NewsAndAnnouncementsDate] [datetime] NOT NULL,
	[NewsAndAnnouncementsTitle] [varchar](500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[NewsAndAnnouncementsLink] [varchar](100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[FileResourceID] [int] NOT NULL,
	[NewsAndAnnouncementsLastUpdatedByUserID] [int] NOT NULL,
	[NewsAndAnnouncementsLastUpdatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_NewsAndAnnouncements_NewsAndAnnouncementsID] PRIMARY KEY CLUSTERED 
(
	[NewsAndAnnouncementsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[NewsAndAnnouncements]  WITH CHECK ADD  CONSTRAINT [FK_NewsAndAnnoucements_User_NewsAndAnnouncementsLastUpdatedByUserID_UserID] FOREIGN KEY([NewsAndAnnouncementsLastUpdatedByUserID])
REFERENCES [dbo].[User] ([UserID])
GO
ALTER TABLE [dbo].[NewsAndAnnouncements] CHECK CONSTRAINT [FK_NewsAndAnnoucements_User_NewsAndAnnouncementsLastUpdatedByUserID_UserID]
GO
ALTER TABLE [dbo].[NewsAndAnnouncements]  WITH CHECK ADD  CONSTRAINT [FK_NewsAndAnnouncements_FileResource_FileResourceID] FOREIGN KEY([FileResourceID])
REFERENCES [dbo].[FileResource] ([FileResourceID])
GO
ALTER TABLE [dbo].[NewsAndAnnouncements] CHECK CONSTRAINT [FK_NewsAndAnnouncements_FileResource_FileResourceID]