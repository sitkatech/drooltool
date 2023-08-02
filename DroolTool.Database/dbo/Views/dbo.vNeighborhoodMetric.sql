Create view [dbo].[vNeighborhoodMetric]
as
Select 
	[RawDroolMetricID] as PrimaryKey,
	[RawDroolMetricID],
	[OCSurveyNeighborhoodID] as OCSurveyCatchmentID, 
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
	round([hoa_daily_est_outdoor_usage_sum] * 748.052 * 30, 0) as HoaWaterUsedForIrrigation,
	round([overall_pct_diff_12mo_daily_est_outdoor_budget_overage_per_irrig_area], 2) as DroolPerLandscapedAcreYearlyPercentDifference
from dbo.RawDroolMetric
--We update files on the 12th, and won't typically have a full set for a month until
--the next month's pull. 
--So: get last month if we've passed the 11th of this month, otherwise get 2 months back
where [MetricDate] <= CASE
						when day(getdate()) > 11 then DATEFROMPARTS(YEAR(dateadd(m, -1, getdate())),MONTH(dateadd(m, -1, getdate())),1)
						else DATEFROMPARTS(YEAR(dateadd(m, -2, getdate())),MONTH(dateadd(m, -2, getdate())),1)
				   END