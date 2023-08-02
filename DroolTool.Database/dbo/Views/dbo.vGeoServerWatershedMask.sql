Create View dbo.vGeoServerWatershedMask
as
Select
	WatershedMaskID,
	WatershedMaskName,
	WatershedMaskGeometry4326 as WatershedMaskGeometry
From
	dbo.WatershedMask