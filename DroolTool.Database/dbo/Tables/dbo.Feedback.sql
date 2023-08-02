CREATE TABLE [dbo].[Feedback](
	[FeedbackID] [int] IDENTITY(1,1) NOT NULL,
	[FeedbackDate] [datetime] NOT NULL,
	[FeedbackContent] [varchar](max) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[FeedbackName] [varchar](100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[FeedbackEmail] [varchar](100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[FeedbackPhoneNumber] [varchar](20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
 CONSTRAINT [PK_Feedback_FeedbackID] PRIMARY KEY CLUSTERED 
(
	[FeedbackID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
