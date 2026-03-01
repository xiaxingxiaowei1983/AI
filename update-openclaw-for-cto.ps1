# 更新OpenClaw配置，添加CTO天火子智能体
# 此脚本需要以管理员权限运行

$openclawConfigPath = "C:\Users\10919\.openclaw\openclaw.json"
$backupPath = "C:\Users\10919\.openclaw\openclaw.json.bak.$(Get-Date -Format 'yyyyMMdd_HHmmss')"

Write-Host "更新OpenClaw配置 - 添加CTO天火子智能体" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# 备份原配置
Write-Host "`n1. 备份原配置..." -ForegroundColor Yellow
Copy-Item $openclawConfigPath $backupPath -Force
Write-Host "   备份完成: $backupPath" -ForegroundColor Green

# 读取配置
Write-Host "`n2. 读取配置..." -ForegroundColor Yellow
$config = Get-Content $openclawConfigPath -Raw | ConvertFrom-Json

# 检查是否已存在cto-tianhuo
$existingAgent = $config.agents.list | Where-Object { $_.id -eq "cto-tianhuo" }
if ($existingAgent) {
    Write-Host "   CTO天火配置已存在，将更新配置" -ForegroundColor Yellow
    # 移除旧配置
    $config.agents.list = $config.agents.list | Where-Object { $_.id -ne "cto-tianhuo" }
}

# 创建CTO天火配置
Write-Host "`n3. 创建CTO天火配置..." -ForegroundColor Yellow
$ctoConfig = @{
    id = "cto-tianhuo"
    name = "赛博天工"
    description = "AWKN LAB技术引擎，负责技术规划、团队管理、项目监督和技术决策"
    workspace = "C:/Users/10919/.openclaw/workspace/cto-tianhuo"
    model = "custom-doubao/ep-20260225031720-mp6fh"
    parent = "main"
    tools = @{
        enabled = @("fs", "exec", "search", "git")
        fs = @{
            workspaceOnly = $false
            allowPaths = @("C:/Users/10919/Desktop/AI")
        }
        exec = @{
            allowedCommands = @("node", "npm", "git", "code")
        }
    }
    skills = @("git-ssh-sync", "planning-with-files", "mission-control")
}

# 添加CTO天火到agents.list
$config.agents.list += $ctoConfig

# 保存配置
Write-Host "`n4. 保存配置..." -ForegroundColor Yellow
$config | ConvertTo-Json -Depth 10 | Set-Content $openclawConfigPath -Encoding UTF8
Write-Host "   配置保存完成" -ForegroundColor Green

# 验证配置
Write-Host "`n5. 验证配置..." -ForegroundColor Yellow
$newConfig = Get-Content $openclawConfigPath -Raw | ConvertFrom-Json
$ctoAgent = $newConfig.agents.list | Where-Object { $_.id -eq "cto-tianhuo" }
if ($ctoAgent) {
    Write-Host "   ✅ CTO天火配置添加成功" -ForegroundColor Green
    Write-Host "   - ID: $($ctoAgent.id)" -ForegroundColor Gray
    Write-Host "   - 名称: $($ctoAgent.name)" -ForegroundColor Gray
    Write-Host "   - 父智能体: $($ctoAgent.parent)" -ForegroundColor Gray
    Write-Host "   - 工作区: $($ctoAgent.workspace)" -ForegroundColor Gray
} else {
    Write-Host "   ❌ CTO天火配置添加失败" -ForegroundColor Red
}

Write-Host "`n==============================================" -ForegroundColor Cyan
Write-Host "配置更新完成！" -ForegroundColor Green
Write-Host "备份文件: $backupPath" -ForegroundColor Gray
Write-Host "`n请重启OpenClaw网关使配置生效:" -ForegroundColor Yellow
Write-Host "   openclaw gateway restart" -ForegroundColor Cyan
