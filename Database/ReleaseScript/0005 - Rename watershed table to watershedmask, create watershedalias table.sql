EXEC sp_rename 'Watershed', 'WatershedMask';
EXEC sp_rename 'WatershedMask.WatershedID', 'WatershedMaskID', 'COLUMN';
EXEC sp_rename 'WatershedMask.WatershedGeometry', 'WatershedMaskGeometry','COLUMN';
EXEC sp_rename 'WatershedMask.WatershedGeometry4326', 'WatershedMaskGeometry4326','COLUMN';
EXEC sp_rename 'WatershedMask.WatershedName', 'WatershedMaskName','COLUMN';

Drop View If Exists dbo.vGeoServerWatershed

create table
dbo.WatershedAlias (
	WatershedAliasID int identity(1,1) not null constraint PK_WatershedAlias_WatershedAliasID primary key,
	WatershedName varchar(100) not null,
	WatershedAliasName varchar(100) not null,
	WatershedAliasGeometry4326 geometry not null,
	constraint AK_WatershedAlias_WatershedName unique (WatershedName),
	constraint AK_WatershedAlias_WatershedAliasName unique (WatershedAliasName)
)

insert into dbo.WatershedAlias 
select 'San Mateo' as WatershedName, 'San Mateo Creek' as WatershedAliasName, geometry::UnionAggregate(NeighborhoodGeometry4326) as WatershedAliasGeometry4326
from dbo.Neighborhood
where Watershed='San Mateo'

insert into dbo.WatershedAlias 
select 'Dana Point' as WatershedName, 'Salt Creek to Salt Creek Beach Park' as WatershedAliasName, geometry::UnionAggregate(NeighborhoodGeometry4326) as WatershedAliasGeometry4326
from dbo.Neighborhood
where Watershed='Dana Point'

insert into dbo.WatershedAlias 
select 'Laguna Coast' as WatershedName, 'Laguna Canyon to Main Beach (Laguna)' as WatershedAliasName, geometry::UnionAggregate(NeighborhoodGeometry4326) as WatershedAliasGeometry4326
from dbo.Neighborhood
where Watershed='Laguna Coast'

insert into dbo.WatershedAlias 
select 'San Clemente' as WatershedName, 'San Clemente Coastal Streams' as WatershedAliasName, geometry::UnionAggregate(NeighborhoodGeometry4326) as WatershedAliasGeometry4326
from dbo.Neighborhood
where Watershed='San Clemente'

insert into dbo.WatershedAlias 
select 'Newport Bay' as WatershedName, 'Newport Bay' as WatershedAliasName, geometry::UnionAggregate(NeighborhoodGeometry4326) as WatershedAliasGeometry4326
from dbo.Neighborhood
where Watershed='Newport Bay'

insert into dbo.WatershedAlias 
select 'Santa Ana River' as WatershedName, 'Santa Ana River' as WatershedAliasName, geometry::UnionAggregate(NeighborhoodGeometry4326) as WatershedAliasGeometry4326
from dbo.Neighborhood
where Watershed='Santa Ana River'

insert into dbo.WatershedAlias 
select 'Aliso' as WatershedName, 'Aliso Creek to Aliso Beach Park' as WatershedAliasName, geometry::UnionAggregate(NeighborhoodGeometry4326) as WatershedAliasGeometry4326
from dbo.Neighborhood
where Watershed='Aliso'

insert into dbo.WatershedAlias 
select 'San Juan Creek' as WatershedName, 'San Juan Creek to Doheny Beach Park' as WatershedAliasName, geometry::UnionAggregate(NeighborhoodGeometry4326) as WatershedAliasGeometry4326
from dbo.Neighborhood
where Watershed='San Juan Creek'

insert into dbo.WatershedAlias 
select 'Anaheim Bay' as WatershedName, 'Anaheim Bay' as WatershedAliasName, geometry::UnionAggregate(NeighborhoodGeometry4326) as WatershedAliasGeometry4326
from dbo.Neighborhood
where Watershed='Anaheim Bay'

insert into dbo.WatershedAlias 
select 'Newport Coastal' as WatershedName, 'Newport Coastal' as WatershedAliasName, geometry::UnionAggregate(NeighborhoodGeometry4326) as WatershedAliasGeometry4326
from dbo.Neighborhood
where Watershed='Newport Coastal'

insert into dbo.WatershedAlias 
select 'Coyote Creek' as WatershedName, 'Coyote Creek' as WatershedAliasName, geometry::UnionAggregate(NeighborhoodGeometry4326) as WatershedAliasGeometry4326
from dbo.Neighborhood
where Watershed='Coyote Creek'