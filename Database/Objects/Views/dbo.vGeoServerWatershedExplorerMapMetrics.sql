Drop view if exists dbo.vGeoServerWatershedExplorerMapMetrics
GO

Create View dbo.vGeoServerWatershedExplorerMapMetrics As
Select
	d.OCSurveyNeighborhoodID as PrimaryKey,
	d.NeighborhoodGeometry4326 as NeighborhoodGeometry,
	d.NeighborhoodGeometry.STArea() * 2471054 as Area,
	rm.MetricDate,
	rm.MetricYear,
	rm.MetricMonth,
	round(rm.[overall_daily_est_outdoor_budget_overage_sum] * 748.052 * 30, 0) as TotalMonthlyDrool

from dbo.Neighborhood d
join dbo.RawDroolMetric rm on d.OCSurveyNeighborhoodID = rm.MetricCatchIDN
GO