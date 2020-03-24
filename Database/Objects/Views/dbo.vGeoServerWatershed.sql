Drop View If Exists dbo.vGeoServerWatershed
Go

Create View dbo.vGeoServerWatershed
as
Select
	WatershedID,
	WatershedName,
	WatershedGeometry4326 as WatershedGeometry
From
	dbo.Watershed