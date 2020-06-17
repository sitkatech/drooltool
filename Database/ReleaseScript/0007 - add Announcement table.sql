create table dbo.Announcement (
	AnnouncementID int not null identity(1,1) constraint PK_Announcement_AnnouncementID primary key,
	AnnouncementDate datetime not null,
	AnnouncementTitle varchar(500) not null,
	AnnouncementLink varchar(100) null,
	FileResourceID int not null constraint FK_Announcement_FileResource_FileResourceID foreign key references dbo.FileResource (FileResourceID),
	LastUpdatedByUserID int not null constraint FK_Announcement_User_LastUpdatedByUserID_UserID foreign key references dbo.[User] (UserID),
	LastUpdatedDate datetime not null
)