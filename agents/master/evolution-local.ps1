# Auto Evolution System Full Cycle Execution Script (Local Execution)
# Current Time: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

Write-Host "=== Starting Auto Evolution System Full Cycle (Local Execution) ===" -ForegroundColor Green
Write-Host "Current Time: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")" -ForegroundColor Cyan
Write-Host "==================================================================" -ForegroundColor Green

# Step 1: Execute capability evaluation directly in current agent
Write-Host "`nStep 1: Performing Agent Capability Evaluation" -ForegroundColor Yellow
try {
    Write-Host "Evaluating agent capabilities..." -ForegroundColor Cyan
    
    # Read and execute the agent-optimizer skill directly
    $optimizerPath = "C:\Users\10919\.openclaw\skills\custom-skills\agent-optimizer"
    $evalResult = node "$optimizerPath\index.js" evaluate --agent "main" --metrics "all" --depth "full" 2>&1
    Write-Host $evalResult
} catch {
    Write-Host "Error during evaluation: $_" -ForegroundColor Red
}

# Step 2: Execute capability optimization
Write-Host "`nStep 2: Performing Capability Optimization" -ForegroundColor Yellow
try {
    Write-Host "Optimizing capability usage..." -ForegroundColor Cyan
    
    $capOptPath = "C:\Users\10919\.openclaw\skills\custom-skills\capability-optimizer"
    $capOptResult = node "$capOptPath\index.js" optimize --agent "main" --focus "all" --tokenReduction --efficiencyBoost 2>&1
    Write-Host $capOptResult
} catch {
    Write-Host "Error during optimization: $_" -ForegroundColor Red
}

# Step 3: Apply night evolution strategy
Write-Host "`nStep 3: Applying Night Evolution Strategy" -ForegroundColor Yellow
try {
    Write-Host "Applying night evolution strategy..." -ForegroundColor Cyan
    
    $nightPath = "C:\Users\10919\.openclaw\skills\custom-skills\night-evolution"
    $nightResult = node "$nightPath\index.js" execute --mode "continuous" --duration "auto" --strategy "balanced" 2>&1
    Write-Host $nightResult
} catch {
    Write-Host "Error during night evolution: $_" -ForegroundColor Red
}

# Step 4: Generate evolution report
Write-Host "`nStep 4: Generating Evolution Report" -ForegroundColor Yellow
try {
    Write-Host "Generating comprehensive evolution report..." -ForegroundColor Cyan
    
    $monitorPath = "C:\Users\10919\.openclaw\skills\custom-skills\evolution-monitor-plus"
    $reportResult = node "$monitorPath\index.js" generateReport --agent "main" --period "full_cycle" --format "text" --includeRecommendations 2>&1
    Write-Host $reportResult
} catch {
    Write-Host "Error during report generation: $_" -ForegroundColor Red
}

Write-Host "`n=== Auto Evolution System Full Cycle Completed ===" -ForegroundColor Green
Write-Host "Completion Time: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Green

# Save results to log file
$logPath = "C:\Users\10919\Desktop\AI\agents\master\evolution-logs\$(Get-Date -Format "yyyyMMdd-HHmmss")-evolution-local.log"
New-Item -ItemType Directory -Path (Split-Path $logPath) -Force | Out-Null
"=== Auto Evolution System Full Cycle Log (Local Execution) ===" | Out-File -FilePath $logPath -Encoding utf8
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