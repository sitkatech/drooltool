Drop View If Exists dbo.vGeoServerBackbone
Go

Create View dbo.vGeoServerBackbone
as
Select	BackboneSegmentID,
		CatchIDN,
		NeighborhoodID,
		b.BackboneSegmentTypeID,
		DownstreamBackboneSegmentID,
		BackboneSegmentGeometry4326 as BackboneSegmentGeometry,
		t.BackboneSegmentTypeName as BackboneSegmentType,
		case when InStream = 1 then 'True' else 'False' end as InStream
From	dbo.BackboneSegment b 
join	dbo.BackboneSegmentType t on b.BackboneSegmentTypeID = t.BackboneSegmentTypeID

