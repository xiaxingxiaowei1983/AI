# Token Usage Monitoring Script
# Monitors AI agent token usage and provides optimization recommendations

# Settings
$baseDir = "C:\Users\10919\.openclaw"
$monitorDir = "$baseDir\monitor"
$logFile = "$monitorDir\token-monitor-$(Get-Date -Format 'yyyy-MM-dd').log"
$statsFile = "$monitorDir\token-stats.json"

# Create monitor directory if it doesn't exist
if (-not (Test-Path $monitorDir)) {
    New-Item -ItemType Directory -Path $monitorDir -Force
}

# Write log function
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

# Initialize statistics
function Initialize-Stats {
    if (-not (Test-Path $statsFile)) {
        $initialStats = @{
            "date" = Get-Date -Format 'yyyy-MM-dd'
            "agents" = @{
                "master" = @{
                    "tokenUsage" = 0
                    "memoryUsage" = 0
                    "executionTime" = 0
                    "tasksCompleted" = 0
                    "errors" = 0
                    "efficiency" = 0
                    "dailyTrend" = @()
                }
                "green-tea" = @{
                    "tokenUsage" = 0
                    "memoryUsage" = 0
                    "executionTime" = 0
                    "tasksCompleted" = 0
                    "errors" = 0
                    "efficiency" = 0
                    "dailyTrend" = @()
                }
                "main" = @{
                    "tokenUsage" = 0
                    "memoryUsage" = 0
                    "executionTime" = 0
                    "tasksCompleted" = 0
                    "errors" = 0
                    "efficiency" = 0
                    "dailyTrend" = @()
                }
            }
            "system" = @{
                "totalTokenUsage" = 0
                "peakMemoryUsage" = 0
                "totalTasks" = 0
                "successRate" = 0
                "avgExecutionTime" = 0
                "optimizationScore" = 0
                "dailyTrend" = @()
            }
            "optimization" = @{
                "recommendations" = @()
                "implemented" = @()
                "pending" = @()
            }
        }
        $initialStats | ConvertTo-Json -Depth 10 | Set-Content -Path $statsFile
        Write-Log "Initialized statistics file"
    }
}

# Collect agent statistics
function Collect-AgentStats {
    param(
        [string]$AgentName
    )
    
    Write-Log "Collecting stats for $AgentName agent"
    
    # Simulate data collection (in real environment, get from actual data sources)
    $stats = @{
        "tokenUsage" = Get-Random -Minimum 10000 -Maximum 50000
        "memoryUsage" = Get-Random -Minimum 100 -Maximum 500
        "executionTime" = Get-Random -Minimum 10 -Maximum 300
        "tasksCompleted" = Get-Random -Minimum 1 -Maximum 20
        "errors" = Get-Random -Minimum 0 -Maximum 5
        "efficiency" = [math]::Round((Get-Random -Minimum 50 -Maximum 95) / 100, 2)
    }
    
    return $stats
}

# Analyze system performance
function Analyze-SystemPerformance {
    Write-Log "Analyzing system performance"
    
    $stats = Get-Content -Path $statsFile -Raw | ConvertFrom-Json
    
    # Calculate total token usage
    $totalToken = 0
    $totalMemory = 0
    $totalTasks = 0
    $totalErrors = 0
    $totalExecutionTime = 0
    
    foreach ($agent in $stats.agents.PSObject.Properties) {
        $agentStats = $agent.Value
        $totalToken += $agentStats.tokenUsage
        $totalMemory += $agentStats.memoryUsage
        $totalTasks += $agentStats.tasksCompleted
        $totalErrors += $agentStats.errors
        $totalExecutionTime += $agentStats.executionTime
    }
    
    # Update system statistics
    $stats.system.totalTokenUsage = $totalToken
    $stats.system.peakMemoryUsage = $totalMemory
    $stats.system.totalTasks = $totalTasks
    $stats.system.successRate = if ($totalTasks -gt 0) { [math]::Round(($totalTasks - $totalErrors) / $totalTasks, 2) } else { 0 }
    $stats.system.avgExecutionTime = if ($totalTasks -gt 0) { [math]::Round($totalExecutionTime / $totalTasks, 2) } else { 0 }
    
    # Calculate optimization score
    $tokenScore = [math]::Max(0, 100 - ($totalToken / 1000))
    $memoryScore = [math]::Max(0, 100 - ($totalMemory / 10))
    $timeScore = [math]::Max(0, 100 - $stats.system.avgExecutionTime)
    $successScore = $stats.system.successRate * 100
    
    $stats.system.optimizationScore = [math]::Round(($tokenScore + $memoryScore + $timeScore + $successScore) / 4, 2)
    
    # Generate optimization recommendations
    $recommendations = Generate-OptimizationRecommendations -Stats $stats
    $stats.optimization.recommendations = $recommendations
    
    # Save updated statistics
    $stats | ConvertTo-Json -Depth 10 | Set-Content -Path $statsFile
    
    return $stats
}

# Generate optimization recommendations
function Generate-OptimizationRecommendations {
    param(
        [object]$Stats
    )
    
    $recommendations = @()
    
    # Analyze token usage
    if ($Stats.system.totalTokenUsage -gt 100000) {
        $rec = @{
            "type" = "token_usage"
            "severity" = "high"
            "description" = "System token usage is too high"
            "recommendation" = "Optimize agent prompts, reduce unnecessary context loading"
            "potentialSaving" = "30-50%"
            "priority" = "high"
        }
        $recommendations += $rec
    }
    
    # Analyze memory usage
    if ($Stats.system.peakMemoryUsage -gt 1000) {
        $rec = @{
            "type" = "memory_usage"
            "severity" = "medium"
            "description" = "System memory usage is too high"
            "recommendation" = "Clean up expired memory files, optimize memory management"
            "potentialSaving" = "25-40%"
            "priority" = "medium"
        }
        $recommendations += $rec
    }
    
    # Analyze execution time
    if ($Stats.system.avgExecutionTime -gt 60) {
        $rec = @{
            "type" = "execution_time"
            "severity" = "medium"
            "description" = "Average execution time is too long"
            "recommendation" = "Optimize task processing workflow, reduce unnecessary steps"
            "potentialImprovement" = "20-35%"
            "priority" = "medium"
        }
        $recommendations += $rec
    }
    
    # Analyze success rate
    if ($Stats.system.successRate -lt 0.8) {
        $rec = @{
            "type" = "success_rate"
            "severity" = "high"
            "description" = "Task success rate is too low"
            "recommendation" = "Optimize error handling, improve system stability"
            "potentialImprovement" = "15-25%"
            "priority" = "high"
        }
        $recommendations += $rec
    }
    
    # Analyze agent efficiency
    foreach ($agent in $Stats.agents.PSObject.Properties) {
        if ($agent.Value.efficiency -lt 0.7) {
            $rec = @{
                "type" = "agent_efficiency"
                "severity" = "medium"
                "description" = "$($agent.Name) agent efficiency is too low"
                "recommendation" = "Optimize $($agent.Name) agent workflow and prompts"
                "potentialImprovement" = "20-30%"
                "priority" = "medium"
            }
            $recommendations += $rec
        }
    }
    
    return $recommendations
}

# Generate performance report
function Generate-PerformanceReport {
    param(
        [object]$Stats
    )
    
    Write-Log "Generating performance report"
    
    $report = @"
# Agent Performance Report

## System Overview
- **Date**: $($Stats.date)
- **Total Token Usage**: $($Stats.system.totalTokenUsage) tokens
- **Peak Memory Usage**: $($Stats.system.peakMemoryUsage) MB
- **Total Tasks**: $($Stats.system.totalTasks)
- **Success Rate**: $($Stats.system.successRate * 100)%
- **Average Execution Time**: $($Stats.system.avgExecutionTime) seconds
- **Optimization Score**: $($Stats.system.optimizationScore)/100

## Agent Details

### Grand Master (master)
- **Token Usage**: $($Stats.agents.master.tokenUsage) tokens
- **Memory Usage**: $($Stats.agents.master.memoryUsage) MB
- **Execution Time**: $($Stats.agents.master.executionTime) seconds
- **Tasks Completed**: $($Stats.agents.master.tasksCompleted)
- **Errors**: $($Stats.agents.master.errors)
- **Efficiency**: $($Stats.agents.master.efficiency * 100)%

### Green Tea (green-tea)
- **Token Usage**: $($Stats.agents.'green-tea'.tokenUsage) tokens
- **Memory Usage**: $($Stats.agents.'green-tea'.memoryUsage) MB
- **Execution Time**: $($Stats.agents.'green-tea'.executionTime) seconds
- **Tasks Completed**: $($Stats.agents.'green-tea'.tasksCompleted)
- **Errors**: $($Stats.agents.'green-tea'.errors)
- **Efficiency**: $($Stats.agents.'green-tea'.efficiency * 100)%

### Main Agent (main)
- **Token Usage**: $($Stats.agents.main.tokenUsage) tokens
- **Memory Usage**: $($Stats.agents.main.memoryUsage) MB
- **Execution Time**: $($Stats.agents.main.executionTime) seconds
- **Tasks Completed**: $($Stats.agents.main.tasksCompleted)
- **Errors**: $($Stats.agents.main.errors)
- **Efficiency**: $($Stats.agents.main.efficiency * 100)%

## Optimization Recommendations

"@
    
    foreach ($rec in $Stats.optimization.recommendations) {
        $report += "### $($rec.type)`n"
        $report += "- **Severity**: $($rec.severity)`n"
        $report += "- **Description**: $($rec.description)`n"
        $report += "- **Recommendation**: $($rec.recommendation)`n"
        $report += "- **Potential Improvement**: $($rec.potentialSaving + $rec.potentialImprovement)`n"
        $report += "- **Priority**: $($rec.priority)`n`n"
    }
    
    $reportPath = "$monitorDir\performance-report-$(Get-Date -Format 'yyyy-MM-dd').md"
    $report | Set-Content -Path $reportPath
    
    Write-Log "Performance report generated: $reportPath"
    return $reportPath
}

# Main function
Write-Log "Starting token usage monitoring"

# Initialize statistics
Initialize-Stats

# Collect agent statistics
$agents = @("master", "green-tea", "main")
$currentStats = Get-Content -Path $statsFile -Raw | ConvertFrom-Json

foreach ($agent in $agents) {
    $agentStats = Collect-AgentStats -AgentName $agent
    $currentStats.agents.$agent = $agentStats
}

# Save current statistics
$currentStats | ConvertTo-Json -Depth 10 | Set-Content -Path $statsFile

# Analyze system performance
$updatedStats = Analyze-SystemPerformance

# Generate performance report
$reportPath = Generate-PerformanceReport -Stats $updatedStats

Write-Log "Token usage monitoring completed"
Write-Log "Performance report saved to: $reportPath"
Write-Host "Monitoring completed, performance report generated: $reportPath" -ForegroundColor Green

# Output optimization recommendations summary
Write-Host "`n## Optimization Recommendations Summary`n" -ForegroundColor Cyan
foreach ($rec in $updatedStats.optimization.recommendations) {
    Write-Host "[$($rec.priority.ToUpper())] $($rec.description)" -ForegroundColor Yellow
    Write-Host "Recommendation: $($rec.recommendation)`n" -ForegroundColor White
}
