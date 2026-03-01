# 更新大宗师工作区配置脚本
# 将工作区从 C:/Users/10919/Desktop/AI/agents/master 扩展到 C:/Users/10919/Desktop/AI

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  更新大宗师工作区配置" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# 步骤1: 备份配置（如果可能）
Write-Host "`n[1/6] 备份配置..." -ForegroundColor Yellow
$backupDir = "C:\Users\10919\Desktop\AI\backups\config-backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

# 备份master配置
Copy-Item "C:\Users\10919\Desktop\AI\agents\master\config.json" "$backupDir\config.json" -Force
Write-Host "   ✓ Master配置已备份到: $backupDir\config.json" -ForegroundColor Green

# 步骤2: 更新Master配置
Write-Host "`n[2/6] 更新Master配置..." -ForegroundColor Yellow
$masterConfigPath = "C:\Users\10919\Desktop\AI\agents\master\config.json"
$masterConfig = Get-Content $masterConfigPath -Raw | ConvertFrom-Json

# 添加workspace和tools配置
$masterConfig | Add-Member -NotePropertyName "workspace" -NotePropertyValue "C:/Users/10919/Desktop/AI" -Force
$masterConfig | Add-Member -NotePropertyName "basePath" -NotePropertyValue "C:/Users/10919/Desktop/AI/agents/master" -Force

# 添加tools配置
$toolsConfig = @{
    fs = @{
        rootPath = "C:/Users/10919/Desktop/AI"
        allowedPaths = @("*")
    }
}
$masterConfig | Add-Member -NotePropertyName "tools" -NotePropertyValue $toolsConfig -Force

# 保存配置
$masterConfig | ConvertTo-Json -Depth 10 | Set-Content $masterConfigPath -Encoding UTF8
Write-Host "   ✓ Master配置已更新" -ForegroundColor Green

# 步骤3: 创建路径映射文件
Write-Host "`n[3/6] 创建路径映射文件..." -ForegroundColor Yellow
$pathMapping = @{
    workspace = "C:/Users/10919/Desktop/AI"
    agentBase = "C:/Users/10919/Desktop/AI/agents/master"
    subAgents = @{
        coo = "C:/Users/10919/Desktop/AI/agents/coo"
        cto = "C:/Users/10919/Desktop/AI/agents/cto"
        "green-tea" = "C:/Users/10919/Desktop/AI/agents/green-tea"
        business = "C:/Users/10919/Desktop/AI/agents/business"
        life = "C:/Users/10919/Desktop/AI/agents/life"
    }
    systemPaths = @{
        trae = "C:/Users/10919/Desktop/AI/.trae"
        evolver = "C:/Users/10919/Desktop/AI/evolver"
        backups = "C:/Users/10919/Desktop/AI/backups"
    }
}

$pathMappingPath = "C:\Users\10919\Desktop\AI\agents\master\path-mapping.json"
$pathMapping | ConvertTo-Json -Depth 10 | Set-Content $pathMappingPath -Encoding UTF8
Write-Host "   ✓ 路径映射文件已创建: $pathMappingPath" -ForegroundColor Green

# 步骤4: 生成OpenClaw配置更新指南
Write-Host "`n[4/6] 生成OpenClaw配置更新指南..." -ForegroundColor Yellow
$guideContent = @"
# OpenClaw配置手动更新指南

## 需要更新的文件
C:\Users\10919\.openclaw\openclaw.json

## 找到agents.list中的main配置，替换为以下内容：

```json
{
  "id": "main",
  "name": "大宗师",
  "description": "AWKN LAB战略中枢，负责微信个人号运营和顶层决策",
  "workspace": "C:/Users/10919/Desktop/AI",
  "model": "bailian/qwen3.5-plus",
  "tools": {
    "enabled": ["fs", "exec", "search", "git"],
    "fs": {
      "workspaceOnly": false,
      "allowPaths": [
        "C:/Users/10919/Desktop/AI",
        "C:/Users/10919/Desktop/AI/agents",
        "C:/Users/10919/Desktop/AI/agents/master",
        "C:/Users/10919/Desktop/AI/agents/coo",
        "C:/Users/10919/Desktop/AI/agents/cto",
        "C:/Users/10919/Desktop/AI/agents/green-tea",
        "C:/Users/10919/Desktop/AI/agents/business",
        "C:/Users/10919/Desktop/AI/agents/life",
        "C:/Users/10919/Desktop/AI/.trae",
        "C:/Users/10919/Desktop/AI/evolver"
      ]
    },
    "exec": {
      "allowedCommands": ["node", "npm", "git", "code", "python", "powershell"]
    }
  },
  "agentConfig": {
    "configPath": "C:/Users/10919/Desktop/AI/agents/master/config.json",
    "promptPath": "C:/Users/10919/Desktop/AI/agents/master/agent.prompt"
  }
}
```

## 更新步骤：
1. 打开 C:\Users\10919\.openclaw\openclaw.json
2. 找到 `"id": "main"` 的配置块
3. 替换为上面的配置内容
4. 保存文件
5. 重启OpenClaw网关: openclaw gateway restart

## 验证：
运行: openclaw status
确认大宗师(main)显示正常

"@

$guidePath = "C:\Users\10919\Desktop\AI\OPENCLAW_CONFIG_UPDATE_GUIDE.md"
$guideContent | Set-Content $guidePath -Encoding UTF8
Write-Host "   ✓ 配置指南已生成: $guidePath" -ForegroundColor Green

# 步骤5: 显示摘要
Write-Host "`n[5/6] 配置更新摘要" -ForegroundColor Yellow
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "✅ 已完成的操作:" -ForegroundColor Green
Write-Host "   • Master配置已备份到: $backupDir" -ForegroundColor Gray
Write-Host "   • Master配置已更新(workspace扩展到AI根目录)" -ForegroundColor Gray
Write-Host "   • 路径映射文件已创建" -ForegroundColor Gray
Write-Host "   • OpenClaw配置指南已生成" -ForegroundColor Gray

Write-Host "`n📝 待手动完成的操作:" -ForegroundColor Yellow
Write-Host "   1. 按照指南更新 C:\Users\10919\.openclaw\openclaw.json" -ForegroundColor White
Write-Host "   2. 重启OpenClaw网关: openclaw gateway restart" -ForegroundColor White
Write-Host "   3. 验证配置: openclaw status" -ForegroundColor White

Write-Host "`n📖 配置指南位置:" -ForegroundColor Cyan
Write-Host "   $guidePath" -ForegroundColor Gray

Write-Host "`n⚠️  重要提示:" -ForegroundColor Red
Write-Host "   • 修改openclaw.json前务必备份原文件" -ForegroundColor Yellow
Write-Host "   • 使用正斜杠(/)而非反斜杠(\\)作为路径分隔符" -ForegroundColor Yellow
Write-Host "   • 如果出现问题，可以恢复备份的配置文件" -ForegroundColor Yellow

Write-Host "`n==============================================" -ForegroundColor Cyan
Write-Host "配置更新脚本执行完成！" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Cyan
