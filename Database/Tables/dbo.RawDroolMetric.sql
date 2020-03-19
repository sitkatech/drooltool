SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RawDroolMetric](
	[RawDroolMetricID] [int] NOT NULL,
	[MetricCatchIDN] [int] NOT NULL,
	[MetricDate] [datetime] NOT NULL,
	[MetricYear] [int] NOT NULL,
	[MetricMonth] [int] NOT NULL,
	[overall_MeterID_count] [float] NULL,
	[overall_is_irrig_sum] [float] NULL,
	[overall_irrg_area_sqft_sum] [float] NULL,
	[overall_irrg_area_sqft_max] [float] NULL,
	[overall_irrg_area_sqft_min] [float] NULL,
	[overall_irrg_area_sqft_mean] [float] NULL,
	[overall_headcount_sum] [float] NULL,
	[overall_AMI_sum] [float] NULL,
	[overall_indoor_budget_sum] [float] NULL,
	[overall_daily_indoor_budget_sum] [float] NULL,
	[overall_outdoor_budget_sum] [float] NULL,
	[overall_daily_outdoor_budget_sum] [float] NULL,
	[overall_total_budget_sum] [float] NULL,
	[overall_total_budget_mean] [float] NULL,
	[overall_daily_total_budget_sum] [float] NULL,
	[overall_daily_total_budget_mean] [float] NULL,
	[overall_TotalUsage_sum] [float] NULL,
	[overall_TotalUsage_max] [float] NULL,
	[overall_TotalUsage_min] [float] NULL,
	[overall_TotalUsage_mean] [float] NULL,
	[overall_daily_TotalUsage_sum] [float] NULL,
	[overall_daily_TotalUsage_max] [float] NULL,
	[overall_daily_TotalUsage_min] [float] NULL,
	[overall_daily_TotalUsage_mean] [float] NULL,
	[overall_est_outdoor_usage_sum] [float] NULL,
	[overall_est_outdoor_usage_max] [float] NULL,
	[overall_est_outdoor_usage_min] [float] NULL,
	[overall_est_outdoor_usage_mean] [float] NULL,
	[overall_daily_est_outdoor_usage_sum] [float] NULL,
	[overall_daily_est_outdoor_usage_max] [float] NULL,
	[overall_daily_est_outdoor_usage_min] [float] NULL,
	[overall_daily_est_outdoor_usage_mean] [float] NULL,
	[overall_meter_is_over_total_budget_sum] [float] NULL,
	[overall_meter_is_over_est_outdoor_budget_sum] [float] NULL,
	[overall_meter_budget_overage_sum] [float] NULL,
	[overall_meter_budget_overage_max] [float] NULL,
	[overall_meter_budget_overage_mean] [float] NULL,
	[overall_daily_meter_budget_overage_sum] [float] NULL,
	[overall_daily_meter_budget_overage_max] [float] NULL,
	[overall_daily_meter_budget_overage_mean] [float] NULL,
	[overall_est_outdoor_budget_overage_sum] [float] NULL,
	[overall_est_outdoor_budget_overage_max] [float] NULL,
	[overall_est_outdoor_budget_overage_mean] [float] NULL,
	[overall_daily_est_outdoor_budget_overage_sum] [float] NULL,
	[overall_daily_est_outdoor_budget_overage_max] [float] NULL,
	[overall_daily_est_outdoor_budget_overage_mean] [float] NULL,
	[overall_meter_usage_per_capita_max] [float] NULL,
	[overall_meter_usage_per_capita_min] [float] NULL,
	[overall_meter_usage_per_capita_mean] [float] NULL,
	[overall_meter_usage_per_capita_median] [float] NULL,
	[overall_daily_meter_usage_per_capita_max] [float] NULL,
	[overall_daily_meter_usage_per_capita_min] [float] NULL,
	[overall_daily_meter_usage_per_capita_mean] [float] NULL,
	[overall_daily_meter_usage_per_capita_median] [float] NULL,
	[overall_daily_meter_est_outdoor_usage_per_capita_max] [float] NULL,
	[overall_daily_meter_est_outdoor_usage_per_capita_min] [float] NULL,
	[overall_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[overall_daily_meter_est_outdoor_usage_per_capita_median] [float] NULL,
	[overall_turf_removal_rebate_area_sqft_sum] [float] NULL,
	[overall_turf_removal_rebate_sum] [float] NULL,
	[overall_barrel_rebate_sum] [float] NULL,
	[overall_weather_based_irrig_rebate_sum] [float] NULL,
	[overall_soil_moisture_sensor_rebate_sum] [float] NULL,
	[overall_turf_to_native_rebate_sum] [float] NULL,
	[overall_turf_to_native_rebate_area_sqft_sum] [float] NULL,
	[overall_is_in_rebate_program_sum] [float] NULL,
	[overall_turf_rebate_area_sqft_sum] [float] NULL,
	[overall_is_in_AMI_and_rebate_program_sum] [float] NULL,
	[overall_meter_over_total_budget_fraction] [float] NULL,
	[overall_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[overall_AMI_fraction] [float] NULL,
	[overall_rebate_participation_fraction] [float] NULL,
	[overall_turf_rebate_area_fraction] [float] NULL,
	[overall_daily_total_usage_per_capita] [float] NULL,
	[overall_daily_total_usage_per_meter] [float] NULL,
	[overall_daily_meter_budget_overage_per_meter] [float] NULL,
	[overall_daily_meter_budget_overage_fraction_total] [float] NULL,
	[overall_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[overall_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[overall_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[overall_roll_mean_12mo_meter_over_total_budget_fraction] [float] NULL,
	[overall_roll_mean_12mo_daily_meter_budget_overage_per_meter] [float] NULL,
	[overall_roll_mean_12mo_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[overall_roll_mean_12mo_daily_meter_usage_per_capita_mean] [float] NULL,
	[overall_roll_mean_12mo_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[overall_roll_mean_12mo_daily_meter_budget_overage_fraction_total] [float] NULL,
	[overall_roll_mean_12mo_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[overall_roll_mean_12mo_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[overall_roll_mean_12mo_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[overall_roll_mean_12mo_rebate_participation_fraction] [float] NULL,
	[overall_roll_mean_12mo_turf_rebate_area_fraction] [float] NULL,
	[overall_slope_12mo_meter_over_total_budget_fraction] [float] NULL,
	[overall_slope_12mo_daily_meter_budget_overage_per_meter] [float] NULL,
	[overall_slope_12mo_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[overall_slope_12mo_daily_meter_usage_per_capita_mean] [float] NULL,
	[overall_slope_12mo_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[overall_slope_12mo_daily_meter_budget_overage_fraction_total] [float] NULL,
	[overall_slope_12mo_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[overall_slope_12mo_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[overall_slope_12mo_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[overall_slope_12mo_rebate_participation_fraction] [float] NULL,
	[overall_slope_12mo_turf_rebate_area_fraction] [float] NULL,
	[reshoa_MeterID_count] [float] NULL,
	[reshoa_is_irrig_sum] [float] NULL,
	[reshoa_irrg_area_sqft_sum] [float] NULL,
	[reshoa_irrg_area_sqft_max] [float] NULL,
	[reshoa_irrg_area_sqft_min] [float] NULL,
	[reshoa_irrg_area_sqft_mean] [float] NULL,
	[reshoa_headcount_sum] [float] NULL,
	[reshoa_AMI_sum] [float] NULL,
	[reshoa_indoor_budget_sum] [float] NULL,
	[reshoa_daily_indoor_budget_sum] [float] NULL,
	[reshoa_outdoor_budget_sum] [float] NULL,
	[reshoa_daily_outdoor_budget_sum] [float] NULL,
	[reshoa_total_budget_sum] [float] NULL,
	[reshoa_total_budget_mean] [float] NULL,
	[reshoa_daily_total_budget_sum] [float] NULL,
	[reshoa_daily_total_budget_mean] [float] NULL,
	[reshoa_TotalUsage_sum] [float] NULL,
	[reshoa_TotalUsage_max] [float] NULL,
	[reshoa_TotalUsage_min] [float] NULL,
	[reshoa_TotalUsage_mean] [float] NULL,
	[reshoa_daily_TotalUsage_sum] [float] NULL,
	[reshoa_daily_TotalUsage_max] [float] NULL,
	[reshoa_daily_TotalUsage_min] [float] NULL,
	[reshoa_daily_TotalUsage_mean] [float] NULL,
	[reshoa_est_outdoor_usage_sum] [float] NULL,
	[reshoa_est_outdoor_usage_max] [float] NULL,
	[reshoa_est_outdoor_usage_min] [float] NULL,
	[reshoa_est_outdoor_usage_mean] [float] NULL,
	[reshoa_daily_est_outdoor_usage_sum] [float] NULL,
	[reshoa_daily_est_outdoor_usage_max] [float] NULL,
	[reshoa_daily_est_outdoor_usage_min] [float] NULL,
	[reshoa_daily_est_outdoor_usage_mean] [float] NULL,
	[reshoa_meter_is_over_total_budget_sum] [float] NULL,
	[reshoa_meter_is_over_est_outdoor_budget_sum] [float] NULL,
	[reshoa_meter_budget_overage_sum] [float] NULL,
	[reshoa_meter_budget_overage_max] [float] NULL,
	[reshoa_meter_budget_overage_mean] [float] NULL,
	[reshoa_daily_meter_budget_overage_sum] [float] NULL,
	[reshoa_daily_meter_budget_overage_max] [float] NULL,
	[reshoa_daily_meter_budget_overage_mean] [float] NULL,
	[reshoa_est_outdoor_budget_overage_sum] [float] NULL,
	[reshoa_est_outdoor_budget_overage_max] [float] NULL,
	[reshoa_est_outdoor_budget_overage_mean] [float] NULL,
	[reshoa_daily_est_outdoor_budget_overage_sum] [float] NULL,
	[reshoa_daily_est_outdoor_budget_overage_max] [float] NULL,
	[reshoa_daily_est_outdoor_budget_overage_mean] [float] NULL,
	[reshoa_meter_usage_per_capita_max] [float] NULL,
	[reshoa_meter_usage_per_capita_min] [float] NULL,
	[reshoa_meter_usage_per_capita_mean] [float] NULL,
	[reshoa_meter_usage_per_capita_median] [float] NULL,
	[reshoa_daily_meter_usage_per_capita_max] [float] NULL,
	[reshoa_daily_meter_usage_per_capita_min] [float] NULL,
	[reshoa_daily_meter_usage_per_capita_mean] [float] NULL,
	[reshoa_daily_meter_usage_per_capita_median] [float] NULL,
	[reshoa_daily_meter_est_outdoor_usage_per_capita_max] [float] NULL,
	[reshoa_daily_meter_est_outdoor_usage_per_capita_min] [float] NULL,
	[reshoa_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[reshoa_daily_meter_est_outdoor_usage_per_capita_median] [float] NULL,
	[reshoa_turf_removal_rebate_area_sqft_sum] [float] NULL,
	[reshoa_turf_removal_rebate_sum] [float] NULL,
	[reshoa_barrel_rebate_sum] [float] NULL,
	[reshoa_weather_based_irrig_rebate_sum] [float] NULL,
	[reshoa_soil_moisture_sensor_rebate_sum] [float] NULL,
	[reshoa_turf_to_native_rebate_sum] [float] NULL,
	[reshoa_turf_to_native_rebate_area_sqft_sum] [float] NULL,
	[reshoa_is_in_rebate_program_sum] [float] NULL,
	[reshoa_turf_rebate_area_sqft_sum] [float] NULL,
	[reshoa_is_in_AMI_and_rebate_program_sum] [float] NULL,
	[reshoa_meter_over_total_budget_fraction] [float] NULL,
	[reshoa_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[reshoa_AMI_fraction] [float] NULL,
	[reshoa_rebate_participation_fraction] [float] NULL,
	[reshoa_turf_rebate_area_fraction] [float] NULL,
	[reshoa_daily_total_usage_per_capita] [float] NULL,
	[reshoa_daily_total_usage_per_meter] [float] NULL,
	[reshoa_daily_meter_budget_overage_per_meter] [float] NULL,
	[reshoa_daily_meter_budget_overage_fraction_total] [float] NULL,
	[reshoa_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[reshoa_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[reshoa_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[reshoa_roll_mean_12mo_meter_over_total_budget_fraction] [float] NULL,
	[reshoa_roll_mean_12mo_daily_meter_budget_overage_per_meter] [float] NULL,
	[reshoa_roll_mean_12mo_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[reshoa_roll_mean_12mo_daily_meter_usage_per_capita_mean] [float] NULL,
	[reshoa_roll_mean_12mo_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[reshoa_roll_mean_12mo_daily_meter_budget_overage_fraction_total] [float] NULL,
	[reshoa_roll_mean_12mo_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[reshoa_roll_mean_12mo_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[reshoa_roll_mean_12mo_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[reshoa_roll_mean_12mo_rebate_participation_fraction] [float] NULL,
	[reshoa_roll_mean_12mo_turf_rebate_area_fraction] [float] NULL,
	[reshoa_slope_12mo_meter_over_total_budget_fraction] [float] NULL,
	[reshoa_slope_12mo_daily_meter_budget_overage_per_meter] [float] NULL,
	[reshoa_slope_12mo_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[reshoa_slope_12mo_daily_meter_usage_per_capita_mean] [float] NULL,
	[reshoa_slope_12mo_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[reshoa_slope_12mo_daily_meter_budget_overage_fraction_total] [float] NULL,
	[reshoa_slope_12mo_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[reshoa_slope_12mo_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[reshoa_slope_12mo_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[reshoa_slope_12mo_rebate_participation_fraction] [float] NULL,
	[reshoa_slope_12mo_turf_rebate_area_fraction] [float] NULL,
	[res_MeterID_count] [float] NULL,
	[res_is_irrig_sum] [float] NULL,
	[res_irrg_area_sqft_sum] [float] NULL,
	[res_irrg_area_sqft_max] [float] NULL,
	[res_irrg_area_sqft_min] [float] NULL,
	[res_irrg_area_sqft_mean] [float] NULL,
	[res_headcount_sum] [float] NULL,
	[res_AMI_sum] [float] NULL,
	[res_indoor_budget_sum] [float] NULL,
	[res_daily_indoor_budget_sum] [float] NULL,
	[res_outdoor_budget_sum] [float] NULL,
	[res_daily_outdoor_budget_sum] [float] NULL,
	[res_total_budget_sum] [float] NULL,
	[res_total_budget_mean] [float] NULL,
	[res_daily_total_budget_sum] [float] NULL,
	[res_daily_total_budget_mean] [float] NULL,
	[res_TotalUsage_sum] [float] NULL,
	[res_TotalUsage_max] [float] NULL,
	[res_TotalUsage_min] [float] NULL,
	[res_TotalUsage_mean] [float] NULL,
	[res_daily_TotalUsage_sum] [float] NULL,
	[res_daily_TotalUsage_max] [float] NULL,
	[res_daily_TotalUsage_min] [float] NULL,
	[res_daily_TotalUsage_mean] [float] NULL,
	[res_est_outdoor_usage_sum] [float] NULL,
	[res_est_outdoor_usage_max] [float] NULL,
	[res_est_outdoor_usage_min] [float] NULL,
	[res_est_outdoor_usage_mean] [float] NULL,
	[res_daily_est_outdoor_usage_sum] [float] NULL,
	[res_daily_est_outdoor_usage_max] [float] NULL,
	[res_daily_est_outdoor_usage_min] [float] NULL,
	[res_daily_est_outdoor_usage_mean] [float] NULL,
	[res_meter_is_over_total_budget_sum] [float] NULL,
	[res_meter_is_over_est_outdoor_budget_sum] [float] NULL,
	[res_meter_budget_overage_sum] [float] NULL,
	[res_meter_budget_overage_max] [float] NULL,
	[res_meter_budget_overage_mean] [float] NULL,
	[res_daily_meter_budget_overage_sum] [float] NULL,
	[res_daily_meter_budget_overage_max] [float] NULL,
	[res_daily_meter_budget_overage_mean] [float] NULL,
	[res_est_outdoor_budget_overage_sum] [float] NULL,
	[res_est_outdoor_budget_overage_max] [float] NULL,
	[res_est_outdoor_budget_overage_mean] [float] NULL,
	[res_daily_est_outdoor_budget_overage_sum] [float] NULL,
	[res_daily_est_outdoor_budget_overage_max] [float] NULL,
	[res_daily_est_outdoor_budget_overage_mean] [float] NULL,
	[res_meter_usage_per_capita_max] [float] NULL,
	[res_meter_usage_per_capita_min] [float] NULL,
	[res_meter_usage_per_capita_mean] [float] NULL,
	[res_meter_usage_per_capita_median] [float] NULL,
	[res_daily_meter_usage_per_capita_max] [float] NULL,
	[res_daily_meter_usage_per_capita_min] [float] NULL,
	[res_daily_meter_usage_per_capita_mean] [float] NULL,
	[res_daily_meter_usage_per_capita_median] [float] NULL,
	[res_daily_meter_est_outdoor_usage_per_capita_max] [float] NULL,
	[res_daily_meter_est_outdoor_usage_per_capita_min] [float] NULL,
	[res_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[res_daily_meter_est_outdoor_usage_per_capita_median] [float] NULL,
	[res_turf_removal_rebate_area_sqft_sum] [float] NULL,
	[res_turf_removal_rebate_sum] [float] NULL,
	[res_barrel_rebate_sum] [float] NULL,
	[res_weather_based_irrig_rebate_sum] [float] NULL,
	[res_soil_moisture_sensor_rebate_sum] [float] NULL,
	[res_turf_to_native_rebate_sum] [float] NULL,
	[res_turf_to_native_rebate_area_sqft_sum] [float] NULL,
	[res_is_in_rebate_program_sum] [float] NULL,
	[res_turf_rebate_area_sqft_sum] [float] NULL,
	[res_is_in_AMI_and_rebate_program_sum] [float] NULL,
	[res_meter_over_total_budget_fraction] [float] NULL,
	[res_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[res_AMI_fraction] [float] NULL,
	[res_rebate_participation_fraction] [float] NULL,
	[res_turf_rebate_area_fraction] [float] NULL,
	[res_daily_total_usage_per_capita] [float] NULL,
	[res_daily_total_usage_per_meter] [float] NULL,
	[res_daily_meter_budget_overage_per_meter] [float] NULL,
	[res_daily_meter_budget_overage_fraction_total] [float] NULL,
	[res_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[res_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[res_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[res_roll_mean_12mo_meter_over_total_budget_fraction] [float] NULL,
	[res_roll_mean_12mo_daily_meter_budget_overage_per_meter] [float] NULL,
	[res_roll_mean_12mo_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[res_roll_mean_12mo_daily_meter_usage_per_capita_mean] [float] NULL,
	[res_roll_mean_12mo_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[res_roll_mean_12mo_daily_meter_budget_overage_fraction_total] [float] NULL,
	[res_roll_mean_12mo_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[res_roll_mean_12mo_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[res_roll_mean_12mo_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[res_roll_mean_12mo_rebate_participation_fraction] [float] NULL,
	[res_roll_mean_12mo_turf_rebate_area_fraction] [float] NULL,
	[res_slope_12mo_meter_over_total_budget_fraction] [float] NULL,
	[res_slope_12mo_daily_meter_budget_overage_per_meter] [float] NULL,
	[res_slope_12mo_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[res_slope_12mo_daily_meter_usage_per_capita_mean] [float] NULL,
	[res_slope_12mo_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[res_slope_12mo_daily_meter_budget_overage_fraction_total] [float] NULL,
	[res_slope_12mo_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[res_slope_12mo_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[res_slope_12mo_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[res_slope_12mo_rebate_participation_fraction] [float] NULL,
	[res_slope_12mo_turf_rebate_area_fraction] [float] NULL,
	[res_MeterID_count_fraction_overall] [float] NULL,
	[res_daily_total_usage_fraction_overall] [float] NULL,
	[res_daily_total_budget_fraction_overall] [float] NULL,
	[res_daily_meter_budget_overage_fraction_overall] [float] NULL,
	[com_MeterID_count] [float] NULL,
	[com_is_irrig_sum] [float] NULL,
	[com_irrg_area_sqft_sum] [float] NULL,
	[com_irrg_area_sqft_max] [float] NULL,
	[com_irrg_area_sqft_min] [float] NULL,
	[com_irrg_area_sqft_mean] [float] NULL,
	[com_headcount_sum] [float] NULL,
	[com_AMI_sum] [float] NULL,
	[com_indoor_budget_sum] [float] NULL,
	[com_daily_indoor_budget_sum] [float] NULL,
	[com_outdoor_budget_sum] [float] NULL,
	[com_daily_outdoor_budget_sum] [float] NULL,
	[com_total_budget_sum] [float] NULL,
	[com_total_budget_mean] [float] NULL,
	[com_daily_total_budget_sum] [float] NULL,
	[com_daily_total_budget_mean] [float] NULL,
	[com_TotalUsage_sum] [float] NULL,
	[com_TotalUsage_max] [float] NULL,
	[com_TotalUsage_min] [float] NULL,
	[com_TotalUsage_mean] [float] NULL,
	[com_daily_TotalUsage_sum] [float] NULL,
	[com_daily_TotalUsage_max] [float] NULL,
	[com_daily_TotalUsage_min] [float] NULL,
	[com_daily_TotalUsage_mean] [float] NULL,
	[com_est_outdoor_usage_sum] [float] NULL,
	[com_est_outdoor_usage_max] [float] NULL,
	[com_est_outdoor_usage_min] [float] NULL,
	[com_est_outdoor_usage_mean] [float] NULL,
	[com_daily_est_outdoor_usage_sum] [float] NULL,
	[com_daily_est_outdoor_usage_max] [float] NULL,
	[com_daily_est_outdoor_usage_min] [float] NULL,
	[com_daily_est_outdoor_usage_mean] [float] NULL,
	[com_meter_is_over_total_budget_sum] [float] NULL,
	[com_meter_is_over_est_outdoor_budget_sum] [float] NULL,
	[com_meter_budget_overage_sum] [float] NULL,
	[com_meter_budget_overage_max] [float] NULL,
	[com_meter_budget_overage_mean] [float] NULL,
	[com_daily_meter_budget_overage_sum] [float] NULL,
	[com_daily_meter_budget_overage_max] [float] NULL,
	[com_daily_meter_budget_overage_mean] [float] NULL,
	[com_est_outdoor_budget_overage_sum] [float] NULL,
	[com_est_outdoor_budget_overage_max] [float] NULL,
	[com_est_outdoor_budget_overage_mean] [float] NULL,
	[com_daily_est_outdoor_budget_overage_sum] [float] NULL,
	[com_daily_est_outdoor_budget_overage_max] [float] NULL,
	[com_daily_est_outdoor_budget_overage_mean] [float] NULL,
	[com_meter_usage_per_capita_max] [float] NULL,
	[com_meter_usage_per_capita_min] [float] NULL,
	[com_meter_usage_per_capita_mean] [float] NULL,
	[com_meter_usage_per_capita_median] [float] NULL,
	[com_daily_meter_usage_per_capita_max] [float] NULL,
	[com_daily_meter_usage_per_capita_min] [float] NULL,
	[com_daily_meter_usage_per_capita_mean] [float] NULL,
	[com_daily_meter_usage_per_capita_median] [float] NULL,
	[com_daily_meter_est_outdoor_usage_per_capita_max] [float] NULL,
	[com_daily_meter_est_outdoor_usage_per_capita_min] [float] NULL,
	[com_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[com_daily_meter_est_outdoor_usage_per_capita_median] [float] NULL,
	[com_turf_removal_rebate_area_sqft_sum] [float] NULL,
	[com_turf_removal_rebate_sum] [float] NULL,
	[com_barrel_rebate_sum] [float] NULL,
	[com_weather_based_irrig_rebate_sum] [float] NULL,
	[com_soil_moisture_sensor_rebate_sum] [float] NULL,
	[com_turf_to_native_rebate_sum] [float] NULL,
	[com_turf_to_native_rebate_area_sqft_sum] [float] NULL,
	[com_is_in_rebate_program_sum] [float] NULL,
	[com_turf_rebate_area_sqft_sum] [float] NULL,
	[com_is_in_AMI_and_rebate_program_sum] [float] NULL,
	[com_meter_over_total_budget_fraction] [float] NULL,
	[com_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[com_AMI_fraction] [float] NULL,
	[com_rebate_participation_fraction] [float] NULL,
	[com_turf_rebate_area_fraction] [float] NULL,
	[com_daily_total_usage_per_capita] [float] NULL,
	[com_daily_total_usage_per_meter] [float] NULL,
	[com_daily_meter_budget_overage_per_meter] [float] NULL,
	[com_daily_meter_budget_overage_fraction_total] [float] NULL,
	[com_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[com_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[com_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[com_roll_mean_12mo_meter_over_total_budget_fraction] [float] NULL,
	[com_roll_mean_12mo_daily_meter_budget_overage_per_meter] [float] NULL,
	[com_roll_mean_12mo_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[com_roll_mean_12mo_daily_meter_usage_per_capita_mean] [float] NULL,
	[com_roll_mean_12mo_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[com_roll_mean_12mo_daily_meter_budget_overage_fraction_total] [float] NULL,
	[com_roll_mean_12mo_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[com_roll_mean_12mo_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[com_roll_mean_12mo_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[com_roll_mean_12mo_rebate_participation_fraction] [float] NULL,
	[com_roll_mean_12mo_turf_rebate_area_fraction] [float] NULL,
	[com_slope_12mo_meter_over_total_budget_fraction] [float] NULL,
	[com_slope_12mo_daily_meter_budget_overage_per_meter] [float] NULL,
	[com_slope_12mo_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[com_slope_12mo_daily_meter_usage_per_capita_mean] [float] NULL,
	[com_slope_12mo_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[com_slope_12mo_daily_meter_budget_overage_fraction_total] [float] NULL,
	[com_slope_12mo_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[com_slope_12mo_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[com_slope_12mo_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[com_slope_12mo_rebate_participation_fraction] [float] NULL,
	[com_slope_12mo_turf_rebate_area_fraction] [float] NULL,
	[com_MeterID_count_fraction_overall] [float] NULL,
	[com_daily_total_usage_fraction_overall] [float] NULL,
	[com_daily_total_budget_fraction_overall] [float] NULL,
	[com_daily_meter_budget_overage_fraction_overall] [float] NULL,
	[city_MeterID_count] [float] NULL,
	[city_is_irrig_sum] [float] NULL,
	[city_irrg_area_sqft_sum] [float] NULL,
	[city_irrg_area_sqft_max] [float] NULL,
	[city_irrg_area_sqft_min] [float] NULL,
	[city_irrg_area_sqft_mean] [float] NULL,
	[city_headcount_sum] [float] NULL,
	[city_AMI_sum] [float] NULL,
	[city_indoor_budget_sum] [float] NULL,
	[city_daily_indoor_budget_sum] [float] NULL,
	[city_outdoor_budget_sum] [float] NULL,
	[city_daily_outdoor_budget_sum] [float] NULL,
	[city_total_budget_sum] [float] NULL,
	[city_total_budget_mean] [float] NULL,
	[city_daily_total_budget_sum] [float] NULL,
	[city_daily_total_budget_mean] [float] NULL,
	[city_TotalUsage_sum] [float] NULL,
	[city_TotalUsage_max] [float] NULL,
	[city_TotalUsage_min] [float] NULL,
	[city_TotalUsage_mean] [float] NULL,
	[city_daily_TotalUsage_sum] [float] NULL,
	[city_daily_TotalUsage_max] [float] NULL,
	[city_daily_TotalUsage_min] [float] NULL,
	[city_daily_TotalUsage_mean] [float] NULL,
	[city_est_outdoor_usage_sum] [float] NULL,
	[city_est_outdoor_usage_max] [float] NULL,
	[city_est_outdoor_usage_min] [float] NULL,
	[city_est_outdoor_usage_mean] [float] NULL,
	[city_daily_est_outdoor_usage_sum] [float] NULL,
	[city_daily_est_outdoor_usage_max] [float] NULL,
	[city_daily_est_outdoor_usage_min] [float] NULL,
	[city_daily_est_outdoor_usage_mean] [float] NULL,
	[city_meter_is_over_total_budget_sum] [float] NULL,
	[city_meter_is_over_est_outdoor_budget_sum] [float] NULL,
	[city_meter_budget_overage_sum] [float] NULL,
	[city_meter_budget_overage_max] [float] NULL,
	[city_meter_budget_overage_mean] [float] NULL,
	[city_daily_meter_budget_overage_sum] [float] NULL,
	[city_daily_meter_budget_overage_max] [float] NULL,
	[city_daily_meter_budget_overage_mean] [float] NULL,
	[city_est_outdoor_budget_overage_sum] [float] NULL,
	[city_est_outdoor_budget_overage_max] [float] NULL,
	[city_est_outdoor_budget_overage_mean] [float] NULL,
	[city_daily_est_outdoor_budget_overage_sum] [float] NULL,
	[city_daily_est_outdoor_budget_overage_max] [float] NULL,
	[city_daily_est_outdoor_budget_overage_mean] [float] NULL,
	[city_meter_usage_per_capita_max] [float] NULL,
	[city_meter_usage_per_capita_min] [float] NULL,
	[city_meter_usage_per_capita_mean] [float] NULL,
	[city_meter_usage_per_capita_median] [float] NULL,
	[city_daily_meter_usage_per_capita_max] [float] NULL,
	[city_daily_meter_usage_per_capita_min] [float] NULL,
	[city_daily_meter_usage_per_capita_mean] [float] NULL,
	[city_daily_meter_usage_per_capita_median] [float] NULL,
	[city_daily_meter_est_outdoor_usage_per_capita_max] [float] NULL,
	[city_daily_meter_est_outdoor_usage_per_capita_min] [float] NULL,
	[city_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[city_daily_meter_est_outdoor_usage_per_capita_median] [float] NULL,
	[city_turf_removal_rebate_area_sqft_sum] [float] NULL,
	[city_turf_removal_rebate_sum] [float] NULL,
	[city_barrel_rebate_sum] [float] NULL,
	[city_weather_based_irrig_rebate_sum] [float] NULL,
	[city_soil_moisture_sensor_rebate_sum] [float] NULL,
	[city_turf_to_native_rebate_sum] [float] NULL,
	[city_turf_to_native_rebate_area_sqft_sum] [float] NULL,
	[city_is_in_rebate_program_sum] [float] NULL,
	[city_turf_rebate_area_sqft_sum] [float] NULL,
	[city_is_in_AMI_and_rebate_program_sum] [float] NULL,
	[city_meter_over_total_budget_fraction] [float] NULL,
	[city_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[city_AMI_fraction] [float] NULL,
	[city_rebate_participation_fraction] [float] NULL,
	[city_turf_rebate_area_fraction] [float] NULL,
	[city_daily_total_usage_per_capita] [float] NULL,
	[city_daily_total_usage_per_meter] [float] NULL,
	[city_daily_meter_budget_overage_per_meter] [float] NULL,
	[city_daily_meter_budget_overage_fraction_total] [float] NULL,
	[city_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[city_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[city_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[city_roll_mean_12mo_meter_over_total_budget_fraction] [float] NULL,
	[city_roll_mean_12mo_daily_meter_budget_overage_per_meter] [float] NULL,
	[city_roll_mean_12mo_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[city_roll_mean_12mo_daily_meter_usage_per_capita_mean] [float] NULL,
	[city_roll_mean_12mo_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[city_roll_mean_12mo_daily_meter_budget_overage_fraction_total] [float] NULL,
	[city_roll_mean_12mo_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[city_roll_mean_12mo_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[city_roll_mean_12mo_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[city_roll_mean_12mo_rebate_participation_fraction] [float] NULL,
	[city_roll_mean_12mo_turf_rebate_area_fraction] [float] NULL,
	[city_slope_12mo_meter_over_total_budget_fraction] [float] NULL,
	[city_slope_12mo_daily_meter_budget_overage_per_meter] [float] NULL,
	[city_slope_12mo_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[city_slope_12mo_daily_meter_usage_per_capita_mean] [float] NULL,
	[city_slope_12mo_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[city_slope_12mo_daily_meter_budget_overage_fraction_total] [float] NULL,
	[city_slope_12mo_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[city_slope_12mo_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[city_slope_12mo_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[city_slope_12mo_rebate_participation_fraction] [float] NULL,
	[city_slope_12mo_turf_rebate_area_fraction] [float] NULL,
	[city_MeterID_count_fraction_overall] [float] NULL,
	[city_daily_total_usage_fraction_overall] [float] NULL,
	[city_daily_total_budget_fraction_overall] [float] NULL,
	[city_daily_meter_budget_overage_fraction_overall] [float] NULL,
	[hoa_MeterID_count] [float] NULL,
	[hoa_is_irrig_sum] [float] NULL,
	[hoa_irrg_area_sqft_sum] [float] NULL,
	[hoa_irrg_area_sqft_max] [float] NULL,
	[hoa_irrg_area_sqft_min] [float] NULL,
	[hoa_irrg_area_sqft_mean] [float] NULL,
	[hoa_headcount_sum] [float] NULL,
	[hoa_AMI_sum] [float] NULL,
	[hoa_indoor_budget_sum] [float] NULL,
	[hoa_daily_indoor_budget_sum] [float] NULL,
	[hoa_outdoor_budget_sum] [float] NULL,
	[hoa_daily_outdoor_budget_sum] [float] NULL,
	[hoa_total_budget_sum] [float] NULL,
	[hoa_total_budget_mean] [float] NULL,
	[hoa_daily_total_budget_sum] [float] NULL,
	[hoa_daily_total_budget_mean] [float] NULL,
	[hoa_TotalUsage_sum] [float] NULL,
	[hoa_TotalUsage_max] [float] NULL,
	[hoa_TotalUsage_min] [float] NULL,
	[hoa_TotalUsage_mean] [float] NULL,
	[hoa_daily_TotalUsage_sum] [float] NULL,
	[hoa_daily_TotalUsage_max] [float] NULL,
	[hoa_daily_TotalUsage_min] [float] NULL,
	[hoa_daily_TotalUsage_mean] [float] NULL,
	[hoa_est_outdoor_usage_sum] [float] NULL,
	[hoa_est_outdoor_usage_max] [float] NULL,
	[hoa_est_outdoor_usage_min] [float] NULL,
	[hoa_est_outdoor_usage_mean] [float] NULL,
	[hoa_daily_est_outdoor_usage_sum] [float] NULL,
	[hoa_daily_est_outdoor_usage_max] [float] NULL,
	[hoa_daily_est_outdoor_usage_min] [float] NULL,
	[hoa_daily_est_outdoor_usage_mean] [float] NULL,
	[hoa_meter_is_over_total_budget_sum] [float] NULL,
	[hoa_meter_is_over_est_outdoor_budget_sum] [float] NULL,
	[hoa_meter_budget_overage_sum] [float] NULL,
	[hoa_meter_budget_overage_max] [float] NULL,
	[hoa_meter_budget_overage_mean] [float] NULL,
	[hoa_daily_meter_budget_overage_sum] [float] NULL,
	[hoa_daily_meter_budget_overage_max] [float] NULL,
	[hoa_daily_meter_budget_overage_mean] [float] NULL,
	[hoa_est_outdoor_budget_overage_sum] [float] NULL,
	[hoa_est_outdoor_budget_overage_max] [float] NULL,
	[hoa_est_outdoor_budget_overage_mean] [float] NULL,
	[hoa_daily_est_outdoor_budget_overage_sum] [float] NULL,
	[hoa_daily_est_outdoor_budget_overage_max] [float] NULL,
	[hoa_daily_est_outdoor_budget_overage_mean] [float] NULL,
	[hoa_meter_usage_per_capita_max] [float] NULL,
	[hoa_meter_usage_per_capita_min] [float] NULL,
	[hoa_meter_usage_per_capita_mean] [float] NULL,
	[hoa_meter_usage_per_capita_median] [float] NULL,
	[hoa_daily_meter_usage_per_capita_max] [float] NULL,
	[hoa_daily_meter_usage_per_capita_min] [float] NULL,
	[hoa_daily_meter_usage_per_capita_mean] [float] NULL,
	[hoa_daily_meter_usage_per_capita_median] [float] NULL,
	[hoa_daily_meter_est_outdoor_usage_per_capita_max] [float] NULL,
	[hoa_daily_meter_est_outdoor_usage_per_capita_min] [float] NULL,
	[hoa_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[hoa_daily_meter_est_outdoor_usage_per_capita_median] [float] NULL,
	[hoa_turf_removal_rebate_area_sqft_sum] [float] NULL,
	[hoa_turf_removal_rebate_sum] [float] NULL,
	[hoa_barrel_rebate_sum] [float] NULL,
	[hoa_weather_based_irrig_rebate_sum] [float] NULL,
	[hoa_soil_moisture_sensor_rebate_sum] [float] NULL,
	[hoa_turf_to_native_rebate_sum] [float] NULL,
	[hoa_turf_to_native_rebate_area_sqft_sum] [float] NULL,
	[hoa_is_in_rebate_program_sum] [float] NULL,
	[hoa_turf_rebate_area_sqft_sum] [float] NULL,
	[hoa_is_in_AMI_and_rebate_program_sum] [float] NULL,
	[hoa_meter_over_total_budget_fraction] [float] NULL,
	[hoa_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[hoa_AMI_fraction] [float] NULL,
	[hoa_rebate_participation_fraction] [float] NULL,
	[hoa_turf_rebate_area_fraction] [float] NULL,
	[hoa_daily_total_usage_per_capita] [float] NULL,
	[hoa_daily_total_usage_per_meter] [float] NULL,
	[hoa_daily_meter_budget_overage_per_meter] [float] NULL,
	[hoa_daily_meter_budget_overage_fraction_total] [float] NULL,
	[hoa_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[hoa_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[hoa_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[hoa_roll_mean_12mo_meter_over_total_budget_fraction] [float] NULL,
	[hoa_roll_mean_12mo_daily_meter_budget_overage_per_meter] [float] NULL,
	[hoa_roll_mean_12mo_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[hoa_roll_mean_12mo_daily_meter_usage_per_capita_mean] [float] NULL,
	[hoa_roll_mean_12mo_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[hoa_roll_mean_12mo_daily_meter_budget_overage_fraction_total] [float] NULL,
	[hoa_roll_mean_12mo_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[hoa_roll_mean_12mo_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[hoa_roll_mean_12mo_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[hoa_roll_mean_12mo_rebate_participation_fraction] [float] NULL,
	[hoa_roll_mean_12mo_turf_rebate_area_fraction] [float] NULL,
	[hoa_slope_12mo_meter_over_total_budget_fraction] [float] NULL,
	[hoa_slope_12mo_daily_meter_budget_overage_per_meter] [float] NULL,
	[hoa_slope_12mo_meter_over_est_outdoor_budget_fraction] [float] NULL,
	[hoa_slope_12mo_daily_meter_usage_per_capita_mean] [float] NULL,
	[hoa_slope_12mo_daily_meter_est_outdoor_usage_per_capita_mean] [float] NULL,
	[hoa_slope_12mo_daily_meter_budget_overage_fraction_total] [float] NULL,
	[hoa_slope_12mo_daily_est_outdoor_usage_per_irrig_area] [float] NULL,
	[hoa_slope_12mo_daily_est_outdoor_budget_overage_per_irrig_area] [float] NULL,
	[hoa_slope_12mo_daily_est_outdoor_budget_overage_fraction_outdoor_budget] [float] NULL,
	[hoa_slope_12mo_rebate_participation_fraction] [float] NULL,
	[hoa_slope_12mo_turf_rebate_area_fraction] [float] NULL,
	[hoa_MeterID_count_fraction_overall] [float] NULL,
	[hoa_daily_total_usage_fraction_overall] [float] NULL,
	[hoa_daily_total_budget_fraction_overall] [float] NULL,
	[hoa_daily_meter_budget_overage_fraction_overall] [float] NULL,
 CONSTRAINT [PK_RawDroolMetric_RawDroolMetricID] PRIMARY KEY CLUSTERED 
(
	[RawDroolMetricID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[RawDroolMetric]  WITH CHECK ADD  CONSTRAINT [FK_RawDroolMetric_Neighborhood_CatchIDN_OCSurveyNeighborhoodID] FOREIGN KEY([MetricCatchIDN])
REFERENCES [dbo].[Neighborhood] ([OCSurveyNeighborhoodID])
GO
ALTER TABLE [dbo].[RawDroolMetric] CHECK CONSTRAINT [FK_RawDroolMetric_Neighborhood_CatchIDN_OCSurveyNeighborhoodID]