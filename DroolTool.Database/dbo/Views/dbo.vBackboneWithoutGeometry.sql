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