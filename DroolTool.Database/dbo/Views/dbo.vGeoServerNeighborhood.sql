Create View dbo.vGeoServerNeighborhood As
Select
	n.NeighborhoodID,
	n.OCSurveyNeighborhoodID,
	n.OCSurveyDownstreamNeighborhoodID,
	wa.WatershedAliasName as 'Watershed',
	n.NeighborhoodGeometry4326.MakeValid() as NeighborhoodGeometry,
	n.NeighborhoodGeometry.MakeValid().STArea() * 2471054 as Area
from dbo.Neighborhood n
join dbo.WatershedAlias wa on n.Watershed = wa.WatershedName
GO