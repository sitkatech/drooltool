ALTER TABLE [dbo].[RawDroolMetric]  WITH CHECK ADD  CONSTRAINT [FK_RawDroolMetric_Neighborhood_CatchIDN_OCSurveyNeighborhoodID] FOREIGN KEY([MetricCatchIDN])
REFERENCES [dbo].[Neighborhood] ([OCSurveyNeighborhoodID])
GO
ALTER TABLE [dbo].[RawDroolMetric] CHECK CONSTRAINT [FK_RawDroolMetric_Neighborhood_CatchIDN_OCSurveyNeighborhoodID]
GO
