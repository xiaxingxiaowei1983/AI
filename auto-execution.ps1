#!/usr/bin/env powershell

# 自动执行小龙虾执行方案5.txt
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "🦞 自动执行小龙虾执行方案5.txt" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# 步骤1: 验证当前状态
Write-Host "\n🔍 Gate 0: 验证当前状态" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

# Step 0.1: 查看当前配置
Write-Host "\nStep 0.1: 查看当前配置" -ForegroundColor Green
try {
    openclaw config get | Select-Object -First 20
} catch {
    Write-Host "❌ 查看配置失败: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 0.2: 查看模型列表
Write-Host "\nStep 0.2: 查看模型列表" -ForegroundColor Green
try {
    openclaw models list
} catch {
    Write-Host "❌ 查看模型列表失败: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 0.3: 查看agent命令帮助
Write-Host "\nStep 0.3: 查看agent命令帮助" -ForegroundColor Green
try {
    openclaw agent --help | Select-Object -First 30
} catch {
    Write-Host "❌ 查看agent命令帮助失败: $($_.Exception.Message)" -ForegroundColor Red
}

# 步骤2: 清理配置漂移
Write-Host "\n🧹 Gate 1: 清理配置漂移" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

# Step 1.1: 备份当前配置
Write-Host "\nStep 1.1: 备份当前配置" -ForegroundColor Green
Write-Host "⚠️  由于沙箱限制，跳过备份步骤" -ForegroundColor Yellow

# Step 1.2: 清理错误的provider配置
Write-Host "\nStep 1.2: 清理错误的provider配置" -ForegroundColor Green
try {
    Write-Host "尝试清理anthropic provider..."
    openclaw config unset models.providers.anthropic
} catch {
    Write-Host "❌ 清理anthropic provider失败: $($_.Exception.Message)" -ForegroundColor Red
}

# 步骤3: 安装飞书插件
Write-Host "\n📦 安装飞书插件" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

try {
    Write-Host "尝试安装飞书插件..."
    openclaw plugins install feishu
} catch {
    Write-Host "❌ 安装飞书插件失败: $($_.Exception.Message)" -ForegroundColor Red
}

# 步骤4: 查看插件列表
Write-Host "\n📋 查看已安装插件" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

try {
    openclaw plugins list
} catch {
    Write-Host "❌ 查看插件列表失败: $($_.Exception.Message)" -ForegroundColor Red
}

# 步骤5: 验证测试
Write-Host "\n🧪 验证测试" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

try {
    Write-Host "发送测试消息..."
    openclaw agent --message "你好，请用一句话介绍你自己" --local
} catch {
    Write-Host "❌ 发送测试消息失败: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "\n=====================================" -ForegroundColor Cyan
Write-Host "🦞 自动执行完成" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "\n请根据执行结果继续完成后续步骤。" -ForegroundColor Green
