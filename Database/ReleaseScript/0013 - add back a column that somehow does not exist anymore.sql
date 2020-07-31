If Not Exists (
	select *
	from sys.columns
	where object_id = Object_Id(N'dbo.RawDroolMetric')
	and name = 'overall_pct_diff_12mo_daily_est_outdoor_budget_overage_per_irrig_area'
)
Alter table dbo.RawDroolMetric
	add [overall_pct_diff_12mo_daily_est_outdoor_budget_overage_per_irrig_area] float null

