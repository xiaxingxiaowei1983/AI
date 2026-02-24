#!/usr/bin/env powershell

# 简化版自动执行脚本
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "🦞 简化版自动执行脚本" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# 步骤1: 验证当前状态
Write-Host "\n🔍 Gate 0: 验证当前状态" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

# 查看模型列表
Write-Host "\n查看模型列表:" -ForegroundColor Green
openclaw models list

# 步骤2: 安装飞书插件
Write-Host "\n📦 安装飞书插件" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

Write-Host "尝试安装飞书插件..."
openclaw plugins install feishu

# 步骤3: 查看插件列表
Write-Host "\n📋 查看已安装插件" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

openclaw plugins list

# 步骤4: 验证测试
Write-Host "\n🧪 验证测试" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

Write-Host "发送测试消息..."
openclaw agent --message "你好，请用一句话介绍你自己" --local

Write-Host "\n=====================================" -ForegroundColor Cyan
Write-Host "🦞 自动执行完成" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
