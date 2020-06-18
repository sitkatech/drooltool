if exists (select * from dbo.sysobjects where id = object_id('dbo.vNeighborhoodMetric'))
	drop view dbo.vNeighborhoodMetric
go

Create view [dbo].[vNeighborhoodMetric]
as
Select 
	[RawDroolMetricID] as PrimaryKey,
	[RawDroolMetricID],
	[MetricCatchIDN] as OCSurveyCatchmentID, 
	[MetricYear] as MetricYear,
	[MetricMonth] as MetricMonth,
	MetricDate as MetricDate,
	round([overall_daily_est_outdoor_budget_overage_sum] * 748.052 * 30,0) as TotalDrool,
	[overall_is_in_rebate_program_sum] as OverallParticipation,
	round([overall_rebate_participation_fraction]  * 100, 2) as PercentParticipation,
	round([overall_daily_est_outdoor_budget_overage_per_irrig_area] * 748.052 * 43560 * 30,0) as DroolPerLandscapedAcre,
	[overall_MeterID_count] as TotalWaterAccounts,
	[res_MeterID_count] as ResidentialWaterAccounts,
	[hoa_MeterID_count] as HOAWaterAccounts,
	[com_MeterID_count] as CommercialWaterAccounts,
	[city_MeterID_count] as MunicipalWaterAccounts,
	round([overall_irrg_area_sqft_sum] / 43560, 2) as TotalIrrigatedArea,
	round([overall_daily_est_outdoor_usage_sum] * 748.052 * 30, 0) as TotalWaterUsedForIrrigation,
	round([reshoa_daily_est_outdoor_usage_sum] * 748.052 * 30, 0) as HoaWaterUsedForIrrigation
from dbo.RawDroolMetric