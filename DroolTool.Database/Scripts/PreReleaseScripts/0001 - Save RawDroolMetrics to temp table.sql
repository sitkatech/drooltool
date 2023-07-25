DECLARE @MigrationName VARCHAR(200);
SET @MigrationName = '0001 - Save RawDroolMetrics to temp table'

--IF NOT EXISTS(SELECT * FROM dbo.DatabaseMigration DM WHERE DM.ReleaseScriptFileName = @MigrationName)
BEGIN
    

    if (OBJECT_ID('TempDB..#RawDroolMetrics') is null)
	begin
		PRINT 'Backing up historical data to a temp table';
		-- backup data to a temp table
		SELECT *
		INTO #RawDroolMetric
		FROM dbo.RawDroolMetric

        

		-- delete the data in your table
		DELETE dbo.RawDroolMetric
	end
   

    --INSERT INTO dbo.DatabaseMigration(MigrationAuthorName, ReleaseScriptFileName, MigrationReason)
    --SELECT 'LA/JQ', @MigrationName, '0001 - Save RawDroolMetrics to temp table'
	Insert into dbo.DatabaseMigration(DatabaseMigrationNumber)
	values (17)
END