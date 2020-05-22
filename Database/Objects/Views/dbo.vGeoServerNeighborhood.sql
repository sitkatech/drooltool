Drop view if exists dbo.vGeoServerNeighborhood
GO

Create View dbo.vGeoServerNeighborhood As
Select
	n.NeighborhoodID,
	n.OCSurveyNeighborhoodID,
	n.OCSurveyDownstreamNeighborhoodID,
	n.DrainID,
	wa.WatershedAliasName as 'Watershed',
	n.NeighborhoodGeometry4326 as NeighborhoodGeometry,
	n.NeighborhoodGeometry.STArea() * 2471054 as Area
from dbo.Neighborhood n
join dbo.WatershedAlias wa on n.Watershed = wa.WatershedName
GO