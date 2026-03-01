<#
.SYNOPSIS
设置大宗师系统的自动备份定时任务

.DESCRIPTION
此脚本会创建一个Windows任务计划，每天自动执行备份系统

.EXAMPLE
.etup-backup-schedule.ps1

.NOTES
运行此脚本需要管理员权限
#>

# 检查是否以管理员身份运行
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "错误: 此脚本需要以管理员身份运行" -ForegroundColor Red
    Exit 1
}

# 定义任务参数
$taskName = "大宗师系统自动备份"
$taskDescription = "每天自动备份大宗师系统的配置文件和记忆文件"
$scriptPath = "$PWD\backup-system.js"
$nodePath = Get-Command node | Select-Object -ExpandProperty Source

# 创建任务操作
$action = New-ScheduledTaskAction -Execute $nodePath -Argument "$scriptPath"

# 创建任务触发器 (每天执行)
$trigger = New-ScheduledTaskTrigger -Daily -At 2:00AM

# 创建任务设置
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

# 注册任务
Try {
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description $taskDescription -ErrorAction Stop
    Write-Host "成功: 定时备份任务已创建" -ForegroundColor Green
    Write-Host "任务名称: $taskName" -ForegroundColor Cyan
    Write-Host "执行时间: 每天凌晨2:00" -ForegroundColor Cyan
    Write-Host "执行脚本: $scriptPath" -ForegroundColor Cyan
} Catch {
    Write-Host "错误: 创建定时任务失败: $($_.Exception.Message)" -ForegroundColor Red
    Exit 1
}

# 验证任务是否创建成功
$task = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($task) {
    Write-Host "验证: 定时任务已成功创建" -ForegroundColor Green
} else {
    Write-Host "验证: 定时任务创建失败" -ForegroundColor Red
    Exit 1
}

Write-Host "\n备份系统设置完成！" -ForegroundColor Green
Write-Host "系统将每天自动执行备份，确保数据安全。" -ForegroundColor Yellow