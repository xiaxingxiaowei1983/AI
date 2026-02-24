#!/usr/bin/env powershell

# OpenClaw 一键管理脚本 (clawctl)
# 功能：集成OpenClaw的核心操作，减少手动命令执行，提高效率

param(
    [Parameter(Mandatory=$true, Position=0)]
    [ValidateSet('start', 'stop', 'restart', 'status', 'logs', 'install', 'uninstall')]
    [string]$Command,
    
    [Parameter(Position=1)]
    [string]$Service = 'gateway',
    
    [switch]$Verbose
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

function Test-CommandExists {
    param(
        [string]$Command
    )
    
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = 'SilentlyContinue'
    try {
        if(Get-Command $Command -ErrorAction SilentlyContinue) {
            return $true
        }
        return $false
    } finally {
        $ErrorActionPreference = $oldPreference
    }
}

function Get-ServiceStatus {
    param(
        [string]$ServiceName = 'OpenClaw Gateway'
    )
    
    try {
        $task = schtasks /query /tn "$ServiceName" /fo LIST /v 2>$null
        if ($LASTEXITCODE -eq 0) {
            if ($task -match 'Status:\s+Running') {
                return 'Running'
            } else {
                return 'Stopped'
            }
        } else {
            return 'NotFound'
        }
    } catch {
        return 'Error'
    }
}

function Start-OpenClawService {
    param(
        [string]$ServiceType = 'gateway'
    )
    
    Write-Log "Starting OpenClaw $ServiceType service..."
    
    try {
        $result = & openclaw $ServiceType start
        if ($LASTEXITCODE -eq 0) {
            Write-Log "OpenClaw $ServiceType service started successfully" -Level Success
            
            # 验证服务状态
            Start-Sleep -Seconds 2
            $status = Get-ServiceStatus
            Write-Log "Service status: $status"
            
            return $true
        } else {
            Write-Log "Failed to start OpenClaw $ServiceType service" -Level Error
            return $false
        }
    } catch {
        Write-Log "Error starting service: $($_.Exception.Message)" -Level Error
        return $false
    }
}

function Stop-OpenClawService {
    param(
        [string]$ServiceType = 'gateway'
    )
    
    Write-Log "Stopping OpenClaw $ServiceType service..."
    
    try {
        $result = & openclaw $ServiceType stop
        if ($LASTEXITCODE -eq 0) {
            Write-Log "OpenClaw $ServiceType service stopped successfully" -Level Success
            
            # 验证服务状态
            Start-Sleep -Seconds 2
            $status = Get-ServiceStatus
            Write-Log "Service status: $status"
            
            return $true
        } else {
            Write-Log "Failed to stop OpenClaw $ServiceType service" -Level Error
            return $false
        }
    } catch {
        Write-Log "Error stopping service: $($_.Exception.Message)" -Level Error
        return $false
    }
}

function Restart-OpenClawService {
    param(
        [string]$ServiceType = 'gateway'
    )
    
    Write-Log "Restarting OpenClaw $ServiceType service..."
    
    $stopResult = Stop-OpenClawService -ServiceType $ServiceType
    if ($stopResult) {
        Start-Sleep -Seconds 1
        $startResult = Start-OpenClawService -ServiceType $ServiceType
        return $startResult
    } else {
        Write-Log "Failed to restart service: Stop operation failed" -Level Error
        return $false
    }
}

function Get-OpenClawStatus {
    param(
        [string]$ServiceType = 'gateway'
    )
    
    Write-Log "Checking OpenClaw $ServiceType service status..."
    
    $status = Get-ServiceStatus
    Write-Log "Service status: $status"
    
    # 检查端口是否开放
    if ($ServiceType -eq 'gateway') {
        try {
            $portTest = Test-NetConnection -ComputerName localhost -Port 18789 -ErrorAction SilentlyContinue
            if ($portTest.TcpTestSucceeded) {
                Write-Log "Gateway port 18789 is open" -Level Success
            } else {
                Write-Log "Gateway port 18789 is closed" -Level Warning
            }
        } catch {
            Write-Log "Error checking port: $($_.Exception.Message)" -Level Warning
        }
    }
    
    return $status
}

function Get-OpenClawLogs {
    param(
        [string]$ServiceType = 'gateway'
    )
    
    Write-Log "Getting OpenClaw $ServiceType logs..."
    
    # 尝试获取最近的日志
    try {
        if ($ServiceType -eq 'gateway') {
            # 检查Windows事件日志
            $logs = Get-WinEvent -LogName Application -FilterXPath "*[System[Provider[@Name='OpenClaw']]]" -MaxEvents 20 -ErrorAction SilentlyContinue
            if ($logs) {
                Write-Log "Recent OpenClaw events:" -Level Info
                $logs | ForEach-Object {
                    Write-Host "[$($_.TimeCreated)] $($_.Message)" -ForegroundColor Cyan
                }
            } else {
                Write-Log "No OpenClaw events found in Application log" -Level Warning
            }
        }
    } catch {
        Write-Log "Error getting logs: $($_.Exception.Message)" -Level Error
    }
}

function Install-OpenClaw {
    Write-Log "Installing OpenClaw..."
    
    try {
        # 检查npm是否安装
        if (-not (Test-CommandExists 'npm')) {
            Write-Log "npm is not installed. Please install Node.js first." -Level Error
            return $false
        }
        
        # 安装OpenClaw
        Write-Log "Installing OpenClaw globally..."
        $result = npm install -g openclaw
        if ($LASTEXITCODE -eq 0) {
            Write-Log "OpenClaw installed successfully" -Level Success
            
            # 显示版本信息
            $version = & openclaw --version 2>&1
            Write-Log "OpenClaw version: $version"
            
            return $true
        } else {
            Write-Log "Failed to install OpenClaw" -Level Error
            return $false
        }
    } catch {
        Write-Log "Error installing OpenClaw: $($_.Exception.Message)" -Level Error
        return $false
    }
}

function Uninstall-OpenClaw {
    Write-Log "Uninstalling OpenClaw..."
    
    try {
        # 停止所有服务
        Write-Log "Stopping OpenClaw services..."
        Stop-OpenClawService
        
        # 卸载OpenClaw
        Write-Log "Uninstalling OpenClaw globally..."
        $result = npm uninstall -g openclaw
        if ($LASTEXITCODE -eq 0) {
            Write-Log "OpenClaw uninstalled successfully" -Level Success
            return $true
        } else {
            Write-Log "Failed to uninstall OpenClaw" -Level Error
            return $false
        }
    } catch {
        Write-Log "Error uninstalling OpenClaw: $($_.Exception.Message)" -Level Error
        return $false
    }
}

# 主执行逻辑
Write-Log "OpenClaw Control Tool (clawctl)"
Write-Log "Command: $Command"
Write-Log "Service: $Service"

# 检查OpenClaw是否安装
if (-not (Test-CommandExists 'openclaw')) {
    Write-Log "OpenClaw is not installed. Please run 'clawctl install' first." -Level Error
    exit 1
}

switch ($Command) {
    'start' {
        Start-OpenClawService -ServiceType $Service
    }
    'stop' {
        Stop-OpenClawService -ServiceType $Service
    }
    'restart' {
        Restart-OpenClawService -ServiceType $Service
    }
    'status' {
        Get-OpenClawStatus -ServiceType $Service
    }
    'logs' {
        Get-OpenClawLogs -ServiceType $Service
    }
    'install' {
        Install-OpenClaw
    }
    'uninstall' {
        Uninstall-OpenClaw
    }
}

Write-Log "clawctl operation completed"