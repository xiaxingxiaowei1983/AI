# 创建PCEC系统的Windows任务计划程序任务

$taskName = "PCEC - Periodic Cognitive Expansion Cycle"
$taskDescription = "每小时执行一次PCEC系统，实现智能体的自我进化"
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 1) -RepetitionDuration ([System.TimeSpan]::MaxValue)
$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c c:\Users\10919\Desktop\AI\start-pcec.bat"
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -RunOnlyIfNetworkAvailable

# 注册任务
Register-ScheduledTask -TaskName $taskName -Trigger $trigger -Action $action -Settings $settings -Description $taskDescription -User "SYSTEM" -RunLevel Highest

# 启动任务
Start-ScheduledTask -TaskName $taskName

Write-Host "PCEC任务已创建并启动成功！"
Write-Host "任务名称: $taskName"
Write-Host "执行频率: 每1小时"
Write-Host "执行文件: c:\Users\10919\Desktop\AI\start-pcec.bat"
