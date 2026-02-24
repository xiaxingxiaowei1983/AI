# 智能体启动脚本

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "AWKN LAB | 定数实验室 - 智能体启动脚本" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# 端口分配
$agentPorts = @{
    "master" = 4000
    "coo" = 4001
    "cto" = 4002
    "green-tea" = 4003
    "business" = 4004
    "life" = 4005
}

$commonPorts = @{
    "gateway" = 18789
    "trea_proxy" = 4010
}

# 显示端口分配
Write-Host "\n端口分配方案:" -ForegroundColor Yellow
foreach ($agent in $agentPorts.GetEnumerator()) {
    Write-Host "✅ $($agent.Key): $($agent.Value)" -ForegroundColor Green
}

foreach ($service in $commonPorts.GetEnumerator()) {
    Write-Host "✅ $($service.Key): $($service.Value)" -ForegroundColor Green
}

# 启动顺序
$startOrder = @(
    "trea_proxy",
    "gateway",
    "master",
    "coo",
    "cto",
    "green-tea",
    "business",
    "life"
)

# 启动服务
Write-Host "\n开始启动服务..." -ForegroundColor Yellow

foreach ($service in $startOrder) {
    Write-Host "\n启动 $service..." -ForegroundColor Cyan
    
    switch ($service) {
        "trea_proxy" {
            Write-Host "启动 Trea Model Proxy Server (端口: $($commonPorts["trea_proxy"]))" -ForegroundColor Green
            Start-Process -FilePath "node" -ArgumentList "trea-proxy-server.js" -WorkingDirectory "c:\Users\10919\Desktop\AI" -NoNewWindow
        }
        "gateway" {
            Write-Host "启动 智能体网关服务 (端口: $($commonPorts["gateway"]))" -ForegroundColor Green
            Start-Process -FilePath "node" -ArgumentList "gateway.js" -WorkingDirectory "c:\Users\10919\Desktop\AI" -NoNewWindow
        }
        default {
            Write-Host "启动 $service 智能体 (端口: $($agentPorts[$service]))" -ForegroundColor Green
            # 这里可以根据需要启动具体的智能体服务
        }
    }
    
    # 等待服务启动
    Start-Sleep -Seconds 2
}

Write-Host "\n=====================================" -ForegroundColor Cyan
Write-Host "所有服务启动完成！" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "\n服务状态:" -ForegroundColor Yellow
Write-Host "✅ Trea Model Proxy Server: http://localhost:$($commonPorts["trea_proxy"]))"
Write-Host "✅ 智能体网关服务: http://localhost:$($commonPorts["gateway"]))"
Write-Host "✅ 大宗师智能体: http://localhost:$($agentPorts["master"]))"
Write-Host "✅ 大掌柜智能体: http://localhost:$($agentPorts["coo"]))"
Write-Host "✅ 赛博天工智能体: http://localhost:$($agentPorts["cto"]))"
Write-Host "✅ 绿茶智能体: http://localhost:$($agentPorts["green-tea"]))"
Write-Host "✅ 谛听智能体: http://localhost:$($agentPorts["business"]))"
Write-Host "✅ 人生决策宗师智能体: http://localhost:$($agentPorts["life"]))"
