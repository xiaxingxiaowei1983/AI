# 修复 OpenClaw 配置文件
$configContent = @'
{
  "meta": {
    "last_touched_version": "2026.2.26",
    "last_touched_at": "2026-02-28T08:00:00.000Z"
  },
  "wizard": {
    "last_run_at": "2026-02-28T08:00:00.000Z",
    "last_run_version": "2026.2.26",
    "last_run_command": "setup",
    "last_run_mode": "local"
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "auth": {
      "mode": "token",
      "token": "default_token"
    }
  },
  "agents": {
    "defaults": {
      "model": "openai/gpt-3.5-turbo"
    }
  },
  "commands": {
    "native": "auto",
    "native_skills": "auto",
    "restart": true,
    "owner_display": "raw"
  }
}
'@

# 写入配置文件
$configPath = "$env:USERPROFILE\.openclaw\openclaw.json"
Write-Host "正在写入配置文件: $configPath"

# 确保目录存在
$configDir = Split-Path -Parent $configPath
if (-not (Test-Path $configDir)) {
    New-Item -ItemType Directory -Path $configDir -Force | Out-Null
    Write-Host "创建目录: $configDir"
}

# 写入文件
$configContent | Out-File -FilePath $configPath -Force -Encoding UTF8
Write-Host "配置文件写入完成"

# 验证文件内容
Write-Host "验证配置文件内容:"
Get-Content $configPath

# 测试 OpenClaw 命令
Write-Host "\n测试 OpenClaw 版本:"
openclaw --version