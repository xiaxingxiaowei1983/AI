# 调用CTO天火执行特定任务
# 天火 - AWKN LAB技术引擎

param(
    [Parameter(Mandatory=$true, HelpMessage="要执行的任务描述")]
    [string]$Task,
    
    [Parameter(HelpMessage="任务上下文信息")]
    [string]$Context = "",
    
    [Parameter(HelpMessage="输出格式: text/json")]
    [string]$Format = "text"
)

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  调用CTO天火" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# 显示任务信息
Write-Host "`n任务信息:" -ForegroundColor White
Write-Host "  任务: $Task" -ForegroundColor Yellow
if ($Context) {
    Write-Host "  上下文: $Context" -ForegroundColor Gray
}
Write-Host "  格式: $Format" -ForegroundColor Gray

# 构建调用命令
Write-Host "`n正在调用CTO天火..." -ForegroundColor Yellow

$command = "openclaw agent call cto-tianhuo --message `"$Task`""

if ($Context) {
    $command += " --context `"$Context`""
}

if ($Format -eq "json") {
    $command += " --format json"
}

# 显示执行的命令（调试用）
Write-Host "  执行命令: $command" -ForegroundColor DarkGray

# 执行调用
Write-Host "`n----------------------------------------------" -ForegroundColor Cyan
Write-Host "CTO天火响应:" -ForegroundColor Green
Write-Host "----------------------------------------------" -ForegroundColor Cyan

try {
    Invoke-Expression $command
} catch {
    Write-Host "调用失败: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n请确保:" -ForegroundColor Yellow
    Write-Host "  1. OpenClaw网关已启动" -ForegroundColor Gray
    Write-Host "  2. CTO天火配置正确" -ForegroundColor Gray
    Write-Host "  3. 参考配置手册: .\CTO_TIANHUO_SETUP_MANUAL.md" -ForegroundColor Gray
}

Write-Host "----------------------------------------------" -ForegroundColor Cyan
Write-Host "调用完成" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Cyan
