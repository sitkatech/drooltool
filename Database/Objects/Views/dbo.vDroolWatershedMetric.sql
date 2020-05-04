if exists (select * from dbo.sysobjects where id = object_id('dbo.vDroolWatershedMetric'))
	drop view dbo.vDroolWatershedMetric
go

Create view [dbo].[vDroolWatershedMetric]
as
Select 
	[RawDroolMetricID] as PrimaryKey,
	[RawDroolMetricID],
	[MetricCatchIDN] as OCSurveyCatchmentID, 
	[MetricYear] as MetricYear,
	[MetricMonth] as MetricMonth,
	MetricDate as MetricDate,
	round([overall_daily_est_outdoor_budget_overage_sum] * 748.052 * 30,0) as TotalMonthlyDrool,
	[overall_is_in_rebate_program_sum] as OverallParticipation,
	round([overall_rebate_participation_fraction]  * 100, 2) as PercentParticipation
from dbo.RawDroolMetric



