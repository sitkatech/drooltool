CREATE TABLE [dbo].[DatabaseMigration](
	[DatabaseMigrationNumber] [int] NOT NULL,
 CONSTRAINT [PK_DatabaseMigration_DatabaseMigrationNumber] PRIMARY KEY CLUSTERED 
(
	[DatabaseMigrationNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
