

"Restore DroolTool"
& "$PSScriptRoot\DatabaseRestore.ps1"  -iniFile "./build.ini"

"Build DroolTool"
& "$PSScriptRoot\DatabaseBuild.ps1" -iniFile "./build.ini"
