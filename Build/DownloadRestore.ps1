
"Download DroolTool"
& "$PSScriptRoot\DatabaseDownload.ps1" -iniFile "./build.ini" -secretsIniFile "./secrets.ini"

"Restore DroolTool"
& "$PSScriptRoot\DatabaseRestore.ps1" -iniFile "./build.ini"
