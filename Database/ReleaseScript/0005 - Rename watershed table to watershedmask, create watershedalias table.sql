EXEC sp_rename 'Watershed', 'WatershedMask';
EXEC sp_rename 'WatershedMask.WatershedID', 'WatershedMaskID', 'COLUMN';
EXEC sp_rename 'WatershedMask.WatershedGeometry', 'WatershedMaskGeometry','COLUMN';
EXEC sp_rename 'WatershedMask.WatershedGeometry4326', 'WatershedMaskGeometry4326','COLUMN';
EXEC sp_rename 'WatershedMask.WatershedName', 'WatershedMaskName','COLUMN';

Drop View If Exists dbo.vGeoServerWatershed

create table
dbo.WatershedAlias (
	WatershedAliasID int identity(1,1) not null constraint PK_WatershedAlias_WatershedAliasID primary key,
	Watershed varchar(100) not null,
	WatershedAlias varchar(100) not null,
	constraint AK_WatershedAlias_Watershed unique (Watershed),
	constraint AK_WatershedAlias_WatershedAlias unique (WatershedAlias)
)

insert into dbo.WatershedAlias (Watershed, WatershedAlias)
values ('San Mateo','San Mateo Creek'),
('Dana Point','Salt Creek to Salt Creek Beach Park'),
('Laguna Coast','Laguna Canyon to Main Beach (Laguna)'),
('San Clemente','San Clemente Coastal Streams'),
('Newport Bay','Newport Bay'),
('Santa Ana River','Santa Ana River'),
('Aliso','Aliso Creek to Aliso Beach Park'),
('San Juan Creek','San Juan Creek to Doheny Beach Park'),
('Anaheim Bay','Anaheim Bay'),
('Newport Coastal','Newport Coastal'),
('Coyote Creek','Coyote Creek')