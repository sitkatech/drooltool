MERGE INTO dbo.BackboneSegmentType AS Target
USING (VALUES
(1, 'Dummy', 'Dummy'),
(2,'StormDrain', 'Storm Drain'),
(3, 'Channel', 'Channel')
)
AS Source (BackboneSegmentTypeID, BackboneSegmentTypeName, BackboneSegmentTypeDisplayName)
ON Target.BackboneSegmentTypeID = Source.BackboneSegmentTypeID
WHEN MATCHED THEN
UPDATE SET
	BackboneSegmentTypeName = Source.BackboneSegmentTypeName,
	BackboneSegmentTypeDisplayName = Source.BackboneSegmentTypeDisplayName
WHEN NOT MATCHED BY TARGET THEN
	INSERT (BackboneSegmentTypeID, BackboneSegmentTypeName, BackboneSegmentTypeDisplayName)
	VALUES (BackboneSegmentTypeID, BackboneSegmentTypeName, BackboneSegmentTypeDisplayName)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;
