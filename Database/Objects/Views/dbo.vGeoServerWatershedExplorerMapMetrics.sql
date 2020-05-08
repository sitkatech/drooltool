Drop view if exists dbo.vGeoServerWatershedExplorerMapMetrics
GO

Create View dbo.vGeoServerWatershedExplorerMapMetrics As
Select
	d.OCSurveyNeighborhoodID as PrimaryKey,
	d.NeighborhoodGeometry4326 as NeighborhoodGeometry,
	d.NeighborhoodGeometry.STArea() * 2471054 as Area,
	nm.MetricDate,
	nm.MetricYear,
	nm.MetricMonth,
	nm.TotalDrool,
	nm.OverallParticipation,
	nm.PercentParticipation,
	nm.DroolPerLandscapedAcre

from dbo.Neighborhood d
join dbo.vNeighborhoodMetric nm on d.OCSurveyNeighborhoodID = nm.OCSurveyCatchmentID
where d.NeighborhoodID in (select distinct n.neighborhoodID
						   from dbo.Neighborhood n
						   join dbo.BackboneSegment b
						   on n.NeighborhoodID = b.NeighborhoodID)
GO