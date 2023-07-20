Drop View If exists dbo.vBackboneWithoutGeometry
Go

Create View dbo.vBackboneWithoutGeometry
as
Select
BackboneSegmentID as PrimaryKey,
BackboneSegmentID,
CatchIDN,
NeighborhoodID,
BackboneSegmentTypeID,
DownstreamBackboneSegmentID
from dbo.BackboneSegment