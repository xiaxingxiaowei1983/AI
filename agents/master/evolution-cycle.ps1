# 自动进化系统完整周期执行脚本
# 当前时间：$(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

Write-Host "=== 启动自动进化系统完整周期 ===" -ForegroundColor Green
Write-Host "当前时间: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Green

# 步骤1：执行智能体能力评估
Write-Host "`n步骤1: 执行智能体能力评估" -ForegroundColor Yellow
$evalResult = openclaw agent --execute "
const agentOptimizer = require('agent-optimizer');
return agentOptimizer.evaluate({
  agent: 'master',
  metrics: ['all'],
  depth: 'full'
});
" 2>&1
Write-Host $evalResult

# 步骤2：执行能力调用优化
Write-Host "`n步骤2: 执行能力调用优化" -ForegroundColor Yellow
$capOptResult = openclaw agent --execute "
const capabilityOptimizer = require('capability-optimizer');
return capabilityOptimizer.optimize({
  agent: 'master',
  focus: ['all'],
  tokenReduction: true,
  efficiencyBoost: true
});
" 2>&1
Write-Host $capOptResult

# 步骤3：应用晚上进化策略
Write-Host "`n步骤3: 应用晚上进化策略" -ForegroundColor Yellow
$nightResult = openclaw agent --execute "
const nightEvolution = require('night-evolution');
return nightEvolution.execute({
  mode: 'continuous',
  duration: 'auto',
  strategy: 'balanced'
});
" 2>&1
Write-Host $nightResult

# 步骤4：生成进化报告
Write-Host "`n步骤4: 生成进化报告" -ForegroundColor Yellow
$reportResult = openclaw agent --execute "
const evolutionMonitor = require('evolution-monitor-plus');
return evolutionMonitor.generateReport({
  agent: 'master',
  period: 'full_cycle',
  format: 'text',
  includeRecommendations: true
});
" 2>&1
Write-Host $reportResult

Write-Host "`n=== 自动进化系统完整周期执行完成 ===" -ForegroundColor Green
Write-Host "完成时间: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Green

# 将结果保存到日志文件
$logPath = "C:\Users\10919\Desktop\AI\agents\master\evolution-logs\$(Get-Date -Format "yyyyMMdd-HHmmss")-evolution.log"
New-Item -ItemType Directory -Path (Split-Path $logPath) -Force | Out-Null
"=== 自动进化系统完整周期日志 ===" | Out-File -FilePath $logPath -Encoding utf8
"执行时间: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")" | Out-File -FilePath $logPath -Encoding utf8 -Append
"" | Out-File -FilePath $logPath -Encoding utf8 -Append
"1. 智能体能力评估结果:" | Out-File -FilePath $logPath -Encoding utf8 -Append
$evalResult | Out-File -FilePath $logPath -Encoding utf8 -Append
"" | Out-File -FilePath $logPath -Encoding utf8 -Append
"2. 能力调用优化结果:" | Out-File -FilePath $logPath -Encoding utf8 -Append
$capOptResult | Out-File -FilePath $logPath -Encoding utf8 -Append
"" | Out-File -FilePath $logPath -Encoding utf8 -Append
"3. 晚上进化策略应用结果:" | Out-File -FilePath $logPath -Encoding utf8 -Append
$nightResult | Out-File -FilePath $logPath -Encoding utf8 -Append
"" | Out-File -FilePath $logPath -Encoding utf8 -Append
"4. 进化报告:" | Out-File -FilePath $logPath -Encoding utf8 -Append
$reportResult | Out-File -FilePath $logPath -Encoding utf8 -Append
"" | Out-File -FilePath $logPath -Encoding utf8 -Append
"执行完成时间: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")" | Out-File -FilePath $logPath -Encoding utf8 -Append

Write-Host "`n日志已保存到: $logPath" -ForegroundColor Cyan