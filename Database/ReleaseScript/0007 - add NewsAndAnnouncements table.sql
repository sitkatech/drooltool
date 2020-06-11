create table dbo.NewsAndAnnouncements (
	NewsAndAnnouncementsID int not null identity(1,1) constraint PK_NewsAndAnnouncements_NewsAndAnnouncementsID primary key,
	NewsAndAnnouncementsDate datetime not null,
	NewsAndAnnouncementsTitle varchar(500) not null,
	NewsAndAnnouncementsLink varchar(100) null,
	FileResourceID int not null constraint FK_NewsAndAnnouncements_FileResource_FileResourceID foreign key references dbo.FileResource (FileResourceID),
	NewsAndAnnouncementsLastUpdatedByUserID int not null constraint FK_NewsAndAnnoucements_User_NewsAndAnnouncementsLastUpdatedByUserID_UserID foreign key references dbo.[User] (UserID),
	NewsAndAnnouncementsLastUpdatedDate datetime not null
)