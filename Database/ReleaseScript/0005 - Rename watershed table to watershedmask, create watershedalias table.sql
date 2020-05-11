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
	WatershedMaskID int null constraint FK_WatershedAlias_WatershedMask_WatershedMaskID references dbo.WatershedMask (WatershedMaskID),
	constraint AK_WatershedAlias_WatershedName unique (WatershedName),
	constraint AK_WatershedAlias_WatershedAliasName unique (WatershedAliasName)
)

insert into dbo.WatershedAlias (WatershedName, WatershedAliasName, WatershedMaskID)
values ('San Mateo','San Mateo Creek', null),
('Dana Point','Salt Creek to Salt Creek Beach Park', 3),
('Laguna Coast','Laguna Canyon to Main Beach (Laguna)', 1),
('San Clemente','San Clemente Coastal Streams', null),
('Newport Bay','Newport Bay', null),
('Santa Ana River','Santa Ana River', null),
('Aliso','Aliso Creek to Aliso Beach Park', 2),
('San Juan Creek','San Juan Creek to Doheny Beach Park', 4),
('Anaheim Bay','Anaheim Bay', null),
('Newport Coastal','Newport Coastal', null),
('Coyote Creek','Coyote Creek', null)