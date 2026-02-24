# 启动所有智能体的PowerShell脚本

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "AWKN LAB | 定数实验室 - 智能体启动脚本" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# 智能体列表
$agents = @(
    @{name="大宗师"; path="master"; status=""},
    @{name="大掌柜"; path="coo"; status=""},
    @{name="赛博天工"; path="cto"; status=""},
    @{name="绿茶"; path="green-tea"; status=""},
    @{name="谛听"; path="business"; status=""},
    @{name="人生决策宗师"; path="life"; status=""},
    @{name="Content"; path="content"; status=""}
)

# 检查每个智能体
foreach ($agent in $agents) {
    Write-Host "\n检查 $($agent.name) 智能体..." -ForegroundColor Yellow
    
    # 检查配置文件是否存在
    $configPath = "c:\Users\10919\Desktop\AI\agents\$($agent.path)\config.json"
    if (Test-Path $configPath) {
        Write-Host "✅ 配置文件存在: $configPath" -ForegroundColor Green
        
        # 读取配置文件
        try {
            $config = Get-Content $configPath -Raw | ConvertFrom-Json
            Write-Host "✅ 配置文件格式正确" -ForegroundColor Green
            
            # 检查公司背景信息
            if ($config.company_context) {
                Write-Host "✅ 公司背景信息已添加" -ForegroundColor Green
            } else {
                Write-Host "❌ 缺少公司背景信息" -ForegroundColor Red
            }
            
            # 检查启动方案
            if ($config.startup -and $config.startup.enabled) {
                Write-Host "✅ 启动方案已配置" -ForegroundColor Green
                $agent.status = "就绪"
            } else {
                Write-Host "❌ 缺少启动方案或未启用" -ForegroundColor Red
                $agent.status = "需要修复"
            }
            
        } catch {
            Write-Host "❌ 配置文件格式错误: $($_.Exception.Message)" -ForegroundColor Red
            $agent.status = "配置错误"
        }
    } else {
        Write-Host "❌ 配置文件不存在: $configPath" -ForegroundColor Red
        $agent.status = "缺少配置"
    }
}

# 显示启动状态摘要
Write-Host "\n=====================================" -ForegroundColor Cyan
Write-Host "智能体启动状态摘要" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

foreach ($agent in $agents) {
    if ($agent.status -eq "就绪") {
        Write-Host "✅ $($agent.name): $($agent.status)" -ForegroundColor Green
    } else {
        Write-Host "❌ $($agent.name): $($agent.status)" -ForegroundColor Red
    }
}

Write-Host "\n=====================================" -ForegroundColor Cyan
Write-Host "启动脚本执行完成" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan