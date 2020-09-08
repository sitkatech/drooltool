create table dbo.Feedback (
	FeedbackID int not null identity(1,1) constraint PK_Feedback_FeedbackID primary key,
	FeedbackDate datetime not null,
	FeedbackContent varchar(max) not null,
	FeedbackName varchar(100) null,
	FeedbackEmail varchar(100) null,
	FeedbackPhoneNumber varchar(20) null
)