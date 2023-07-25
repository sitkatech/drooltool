/*
Post-Deployment Script
--------------------------------------------------------------------------------------
This file is generated on every build, DO NOT modify.
--------------------------------------------------------------------------------------
*/

PRINT N'DroolTool.Database - Script.PostDeployment.ReleaseScripts.sql';
GO

:r ".\0001 - Move data back into RawDroolMetrics.sql"
GO

