# Check all agents startup status

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "AWKN LAB | 定数实验室 - Agent Startup Check" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Agent list
$agents = @(
    @{cnName="大宗师"; enName="Master"; path="master"},
    @{cnName="大掌柜"; enName="COO"; path="coo"},
    @{cnName="赛博天工"; enName="CTO"; path="cto"},
    @{cnName="绿茶"; enName="Green Tea"; path="green-tea"},
    @{cnName="谛听"; enName="CCO"; path="business"},
    @{cnName="人生决策宗师"; enName="CLO"; path="life"},
    @{cnName="Content"; enName="Content"; path="content"}
)

# Check each agent
foreach ($agent in $agents) {
    Write-Host "`nChecking $($agent.cnName) ($($agent.enName)) agent..." -ForegroundColor Yellow
    
    # Check if config file exists
    $configPath = "c:\Users\10919\Desktop\AI\agents\$($agent.path)\config.json"
    if (Test-Path $configPath) {
        Write-Host "✅ Config file exists: $configPath" -ForegroundColor Green
        
        # Read config file
        try {
            $config = Get-Content $configPath -Raw | ConvertFrom-Json
            Write-Host "✅ Config file format is correct" -ForegroundColor Green
            
            # Check company context
            if ($config.company_context) {
                Write-Host "✅ Company context is added" -ForegroundColor Green
            } else {
                Write-Host "❌ Missing company context" -ForegroundColor Red
            }
            
            # Check startup configuration
            if ($config.startup -and $config.startup.enabled) {
                Write-Host "✅ Startup plan is configured" -ForegroundColor Green
                Write-Host "   Status: Ready to start" -ForegroundColor Green
            } else {
                Write-Host "❌ Missing startup plan or not enabled" -ForegroundColor Red
            }
            
        } catch {
            Write-Host "❌ Config file format error: $($_.Exception.Message)" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Config file does not exist: $configPath" -ForegroundColor Red
    }
}

Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host "Agent startup check completed" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan