# 启动CTO天火子智能体
# 天火 - AWKN LAB技术引擎

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  启动CTO天火子智能体" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# 检查OpenClaw状态
Write-Host "`n[1/4] 检查OpenClaw网关状态..." -ForegroundColor Yellow
$status = openclaw status 2>&1
if ($status -match "Gateway.*reachable") {
    Write-Host "   ✓ OpenClaw网关运行正常" -ForegroundColor Green
} else {
    Write-Host "   ⚠ OpenClaw网关可能未运行，尝试启动..." -ForegroundColor Yellow
    openclaw gateway start
    Start-Sleep -Seconds 3
}

# 检查CTO天火配置
Write-Host "`n[2/4] 检查CTO天火配置..." -ForegroundColor Yellow
$agentStatus = openclaw status 2>&1
if ($agentStatus -match "cto-tianhuo") {
    Write-Host "   ✓ CTO天火配置已找到" -ForegroundColor Green
} else {
    Write-Host "   ✗ CTO天火配置未找到" -ForegroundColor Red
    Write-Host "   请先完成配置，参考: C:\Users\10919\Desktop\AI\CTO_TIANHUO_SETUP_MANUAL.md" -ForegroundColor Yellow
    exit 1
}

# 启动CTO天火智能体
Write-Host "`n[3/4] 启动CTO天火智能体..." -ForegroundColor Yellow
try {
    $startResult = openclaw agent start cto-tianhuo 2>&1
    if ($startResult -match "error|failed") {
        Write-Host "   ⚠ 启动结果: $startResult" -ForegroundColor Yellow
    } else {
        Write-Host "   ✓ CTO天火启动成功" -ForegroundColor Green
    }
} catch {
    Write-Host "   ⚠ 启动命令执行完成" -ForegroundColor Yellow
}

# 显示使用信息
Write-Host "`n[4/4] 使用信息" -ForegroundColor Yellow
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "CTO天火已准备就绪！" -ForegroundColor Green
Write-Host "`n调用方式:" -ForegroundColor White
Write-Host "  1. 命令行: openclaw agent call cto-tianhuo --message `"你的任务`"" -ForegroundColor Gray
Write-Host "  2. 脚本: .\call-cto-tianhuo.ps1 -Task `"你的任务`"" -ForegroundColor Gray
Write-Host "  3. 对话中: @天火 请帮我..." -ForegroundColor Gray
Write-Host "  4. 通过大宗师: @大宗师 请让CTO天火..." -ForegroundColor Gray

Write-Host "`n核心能力:" -ForegroundColor White
Write-Host "  • 技术战略规划" -ForegroundColor Gray
Write-Host "  • 系统架构设计" -ForegroundColor Gray
Write-Host "  • 代码审查与优化" -ForegroundColor Gray
Write-Host "  • 技术选型评估" -ForegroundColor Gray
Write-Host "  • 团队技术指导" -ForegroundColor Gray

Write-Host "`n==============================================" -ForegroundColor Cyan
