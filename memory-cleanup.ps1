# 记忆生命周期管理脚本
# 手动执行，管理记忆文件的生命周期

# 设置参数
$baseDir = "C:\Users\10919\.openclaw"
$logFile = "$baseDir\logs\memory-cleanup-$(Get-Date -Format 'yyyy-MM-dd').log"

# 创建日志目录
if (-not (Test-Path "$baseDir\logs")) {
    New-Item -ItemType Directory -Path "$baseDir\logs" -Force
}

# 写入日志函数
function Write-Log {
    param(
        [string]$Message,
        [string]$Level = "INFO"
    )
    $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $logEntry = "[$timestamp] [$Level] $Message"
    Write-Host $logEntry
    Add-Content -Path $logFile -Value $logEntry
}

# 主函数
Write-Log "开始执行记忆生命周期管理"

# 1. 清理临时文件
$tempDirs = @(
    "$baseDir\tmp",
    "$baseDir\temp"
)

foreach ($tempDir in $tempDirs) {
    if (Test-Path $tempDir) {
        Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
        Write-Log "清理临时目录: $tempDir"
    }
}

# 2. 清理过期日志（保留30天）
$logDir = "$baseDir\logs"
if (Test-Path $logDir) {
    $logFiles = Get-ChildItem -Path $logDir -File | Where-Object {
        $_.Extension -eq ".log"
    }
    
    $now = Get-Date
    $retentionDays = 30
    
    foreach ($logFile in $logFiles) {
        $daysSinceCreated = ($now - $logFile.CreationTime).Days
        if ($daysSinceCreated -gt $retentionDays) {
            Remove-Item -Path $logFile.FullName -Force -ErrorAction SilentlyContinue
            Write-Log "清理过期日志: $($logFile.Name)"
        }
    }
}

Write-Log "记忆生命周期管理执行完成"
Write-Host "执行完成，请查看日志文件获取详细信息: $logFile" -ForegroundColor Green
