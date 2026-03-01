# Auto Evolution System Full Cycle Execution Script (Direct CLI)
# Current Time: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

Write-Host "=== Starting Auto Evolution System Full Cycle (Direct CLI) ===" -ForegroundColor Green
Write-Host "Current Time: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")" -ForegroundColor Cyan
Write-Host "==============================================================" -ForegroundColor Green

# Step 1: Perform Agent Capability Evaluation
Write-Host "`nStep 1: Performing Agent Capability Evaluation" -ForegroundColor Yellow
try {
    $evalResult = agent-optimizer evaluate --agent "main" --metrics "all" --depth "full" 2>&1
    Write-Host $evalResult
} catch {
    Write-Host "Error during evaluation: $_" -ForegroundColor Red
}

# Step 2: Perform Capability Optimization
Write-Host "`nStep 2: Performing Capability Optimization" -ForegroundColor Yellow
try {
    $capOptResult = capability-optimizer optimize --agent "main" --focus "all" --tokenReduction --efficiencyBoost 2>&1
    Write-Host $capOptResult
} catch {
    Write-Host "Error during optimization: $_" -ForegroundColor Red
}

# Step 3: Apply Night Evolution Strategy
Write-Host "`nStep 3: Applying Night Evolution Strategy" -ForegroundColor Yellow
try {
    $nightResult = night-evolution execute --mode "continuous" --duration "auto" --strategy "balanced" 2>&1
    Write-Host $nightResult
} catch {
    Write-Host "Error during night evolution: $_" -ForegroundColor Red
}

# Step 4: Generate Evolution Report
Write-Host "`nStep 4: Generating Evolution Report" -ForegroundColor Yellow
try {
    $reportResult = evolution-monitor-plus generateReport --agent "main" --period "full_cycle" --format "text" --includeRecommendations 2>&1
    Write-Host $reportResult
} catch {
    Write-Host "Error during report generation: $_" -ForegroundColor Red
}

Write-Host "`n=== Auto Evolution System Full Cycle Completed ===" -ForegroundColor Green
Write-Host "Completion Time: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Green

# Save results to log file
$logPath = "C:\Users\10919\Desktop\AI\agents\master\evolution-logs\$(Get-Date -Format "yyyyMMdd-HHmmss")-evolution-direct.log"
New-Item -ItemType Directory -Path (Split-Path $logPath) -Force | Out-Null
"=== Auto Evolution System Full Cycle Log (Direct CLI) ===" | Out-File -FilePath $logPath -Encoding utf8
"Execution Time: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")" | Out-File -FilePath $logPath -Encoding utf8 -Append
"" | Out-File -FilePath $logPath -Encoding utf8 -Append
"1. Agent Capability Evaluation Results:" | Out-File -FilePath $logPath -Encoding utf8 -Append
$evalResult | Out-File -FilePath $logPath -Encoding utf8 -Append
"" | Out-File -FilePath $logPath -Encoding utf8 -Append
"2. Capability Optimization Results:" | Out-File -FilePath $logPath -Encoding utf8 -Append
$capOptResult | Out-File -FilePath $logPath -Encoding utf8 -Append
"" | Out-File -FilePath $logPath -Encoding utf8 -Append
"3. Night Evolution Strategy Results:" | Out-File -FilePath $logPath -Encoding utf8 -Append
$nightResult | Out-File -FilePath $logPath -Encoding utf8 -Append
"" | Out-File -FilePath $logPath -Encoding utf8 -Append
"4. Evolution Report:" | Out-File -FilePath $logPath -Encoding utf8 -Append
$reportResult | Out-File -FilePath $logPath -Encoding utf8 -Append
"" | Out-File -FilePath $logPath -Encoding utf8 -Append
"Completion Time: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")" | Out-File -FilePath $logPath -Encoding utf8 -Append

Write-Host "`nLog saved to: $logPath" -ForegroundColor Cyan