Drop view if exists dbo.vGeoServerWatershedExplorerMapMetrics
GO

Create View dbo.vGeoServerWatershedExplorerMapMetrics As
Select
	d.OCSurveyNeighborhoodID as PrimaryKey,
	d.NeighborhoodGeometry4326 as NeighborhoodGeometry,
	d.NeighborhoodGeometry.STArea() * 2471054 as Area,
	dwm.MetricDate,
	dwm.MetricYear,
	dwm.MetricMonth,
	dwm.TotalMonthlyDrool

from dbo.Neighborhood d
join dbo.vDroolWatershedMetric dwm on d.OCSurveyNeighborhoodID = dwm.OCSurveyCatchmentID
where d.NeighborhoodID in (select distinct n.neighborhoodID
						   from dbo.Neighborhood n
						   join dbo.BackboneSegment b
						   on n.NeighborhoodID = b.NeighborhoodID)
GO