
/****** Object:  Table [dbo].[DroolToolRole]    Script Date: 3/18/2020 2:45:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DroolToolRole](
	[DroolToolRoleID] [int] NOT NULL,
	[DroolToolRoleName] [varchar](100) NOT NULL,
	[DroolToolRoleDisplayName] [varchar](100) NOT NULL,
	[DroolToolRoleDescription] [varchar](255) NULL,
 CONSTRAINT [PK_DroolToolRole_DroolToolRoleID] PRIMARY KEY CLUSTERED 
(
	[DroolToolRoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[DroolToolRole] ([DroolToolRoleID], [DroolToolRoleName], [DroolToolRoleDisplayName], [DroolToolRoleDescription]) VALUES (1, N'Admin', N'Administrator', N'')
INSERT [dbo].[DroolToolRole] ([DroolToolRoleID], [DroolToolRoleName], [DroolToolRoleDisplayName], [DroolToolRoleDescription]) VALUES (2, N'Editor', N'Editor', N'')
INSERT [dbo].[DroolToolRole] ([DroolToolRoleID], [DroolToolRoleName], [DroolToolRoleDisplayName], [DroolToolRoleDescription]) VALUES (3, N'Unassigned', N'Unassigned', N'')
SET ANSI_PADDING ON
GO
/****** Object:  Index [AK_DroolToolRole_DroolToolRoleDisplayName]    Script Date: 3/18/2020 2:46:27 PM ******/
ALTER TABLE [dbo].[DroolToolRole] ADD  CONSTRAINT [AK_DroolToolRole_DroolToolRoleDisplayName] UNIQUE NONCLUSTERED 
(
	[DroolToolRoleDisplayName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [AK_DroolToolRole_DroolToolRoleName]    Script Date: 3/18/2020 2:46:27 PM ******/
ALTER TABLE [dbo].[DroolToolRole] ADD  CONSTRAINT [AK_DroolToolRole_DroolToolRoleName] UNIQUE NONCLUSTERED 
(
	[DroolToolRoleName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
