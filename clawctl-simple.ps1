#!/usr/bin/env powershell

# OpenClaw 一键管理脚本 (clawctl-simple)
# 简化版：测试基本功能

param(
    [Parameter(Mandatory=$true, Position=0)]
    [ValidateSet('status', 'start', 'stop')]
    [string]$Command
)

function Write-Log {
    param(
        [string]$Message,
        [string]$Level = 'Info'
    )
    
    $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $logMessage = "[$timestamp] [$Level] $Message"
    
    if ($Level -eq 'Error') {
        Write-Host $logMessage -ForegroundColor Red
    } elseif ($Level -eq 'Warning') {
        Write-Host $logMessage -ForegroundColor Yellow
    } elseif ($Level -eq 'Success') {
        Write-Host $logMessage -ForegroundColor Green
    } else {
        Write-Host $logMessage
    }
}

function Get-ServiceStatus {
    try {
        $task = schtasks /query /tn "OpenClaw Gateway" 2>$null
        if ($LASTEXITCODE -eq 0) {
            return 'Running'
        } else {
            return 'Stopped'
        }
    } catch {
        return 'Error'
    }
}

function Start-OpenClawService {
    Write-Log "Starting OpenClaw gateway service..."
    
    try {
        $result = & openclaw gateway start
        if ($LASTEXITCODE -eq 0) {
            Write-Log "OpenClaw gateway service started successfully" -Level Success
            return $true
        } else {
            Write-Log "Failed to start OpenClaw gateway service" -Level Error
            return $false
        }
    } catch {
        Write-Log "Error starting service: $($_.Exception.Message)" -Level Error
        return $false
    }
}

function Stop-OpenClawService {
    Write-Log "Stopping OpenClaw gateway service..."
    
    try {
        $result = & openclaw gateway stop
        if ($LASTEXITCODE -eq 0) {
            Write-Log "OpenClaw gateway service stopped successfully" -Level Success
            return $true
        } else {
            Write-Log "Failed to stop OpenClaw gateway service" -Level Error
            return $false
        }
    } catch {
        Write-Log "Error stopping service: $($_.Exception.Message)" -Level Error
        return $false
    }
}

# 主执行逻辑
Write-Log "OpenClaw Control Tool (clawctl-simple)"
Write-Log "Command: $Command"

# 检查OpenClaw是否安装
try {
    $version = & openclaw --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Log "OpenClaw is not installed." -Level Error
        exit 1
    }
    Write-Log "OpenClaw version: $version"
} catch {
    Write-Log "OpenClaw is not installed." -Level Error
    exit 1
}

switch ($Command) {
    'status' {
        $status = Get-ServiceStatus
        Write-Log "Service status: $status"
    }
    'start' {
        Start-OpenClawService
    }
    'stop' {
        Stop-OpenClawService
    }
}

Write-Log "clawctl-simple operation completed"