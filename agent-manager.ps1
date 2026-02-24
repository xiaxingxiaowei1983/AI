#!/usr/bin/env powershell

# OpenClaw 智能体管理脚本
# 功能：管理多个智能体的启动、停止、状态查看等操作

param(
    [Parameter(Mandatory=$true, Position=0)]
    [ValidateSet('start', 'stop', 'status', 'list')]
    [string]$Command,
    
    [Parameter(Position=1)]
    [string]$Agent = 'all'
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

function Get-AgentConfig {
    param(
        [string]$AgentName
    )
    
    $configPath = "./agents/$AgentName/openclaw.json"
    if (Test-Path $configPath) {
        try {
            $config = Get-Content $configPath -Raw | ConvertFrom-Json
            return $config
        } catch {
            Write-Log "Error reading config for agent ${AgentName}: $($_.Exception.Message)" -Level Error
            return $null
        }
    } else {
        Write-Log "Config file not found for agent $AgentName" -Level Error
        return $null
    }
}

function Start-Agent {
    param(
        [string]$AgentName
    )
    
    Write-Log "Starting agent: $AgentName"
    
    $agentPath = "./agents/$AgentName"
    if (Test-Path $agentPath) {
        try {
            # 切换到智能体目录
            Push-Location $agentPath
            
            # 停止可能存在的旧进程
            Write-Log "Stopping any existing gateway processes..."
            $stopResult = & openclaw gateway stop 2>$null
            
            # 启动OpenClaw网关
            Write-Log "Starting OpenClaw gateway..."
            $result = & openclaw gateway start
            if ($LASTEXITCODE -eq 0) {
                Write-Log "Agent $AgentName started successfully" -Level Success
                # 验证服务状态
                Start-Sleep -Seconds 2
                $status = Get-AgentStatus -AgentName $AgentName
                if ($status -eq 'Running') {
                    Write-Log "Agent $AgentName is running properly" -Level Success
                } else {
                    Write-Log "Agent $AgentName started but status is $status" -Level Warning
                }
                return $true
            } else {
                Write-Log "Failed to start agent $AgentName" -Level Error
                return $false
            }
        } catch {
            Write-Log "Error starting agent ${AgentName}: $($_.Exception.Message)" -Level Error
            return $false
        } finally {
            Pop-Location
        }
    } else {
        Write-Log "Agent directory not found: $AgentName" -Level Error
        return $false
    }
}

function Stop-Agent {
    param(
        [string]$AgentName
    )
    
    Write-Log "Stopping agent: $AgentName"
    
    $agentPath = "./agents/$AgentName"
    if (Test-Path $agentPath) {
        try {
            # 切换到智能体目录
            Push-Location $agentPath
            
            # 停止OpenClaw网关
            Write-Log "Stopping OpenClaw gateway..."
            $result = & openclaw gateway stop
            if ($LASTEXITCODE -eq 0) {
                Write-Log "Agent $AgentName stopped successfully" -Level Success
                # 验证服务状态
                Start-Sleep -Seconds 1
                $status = Get-AgentStatus -AgentName $AgentName
                if ($status -eq 'Stopped') {
                    Write-Log "Agent $AgentName is stopped properly" -Level Success
                } else {
                    Write-Log "Agent $AgentName stopped but status is $status" -Level Warning
                }
                return $true
            } else {
                Write-Log "Failed to stop agent $AgentName, trying again..." -Level Warning
                # 尝试再次停止
                $result = & openclaw gateway stop 2>$null
                if ($LASTEXITCODE -eq 0) {
                    Write-Log "Agent $AgentName stopped successfully on second attempt" -Level Success
                    return $true
                } else {
                    Write-Log "Failed to stop agent $AgentName after multiple attempts" -Level Error
                    return $false
                }
            }
        } catch {
            Write-Log "Error stopping agent ${AgentName}: $($_.Exception.Message)" -Level Error
            return $false
        } finally {
            Pop-Location
        }
    } else {
        Write-Log "Agent directory not found: $AgentName" -Level Error
        return $false
    }
}

function Get-AgentStatus {
    param(
        [string]$AgentName
    )
    
    Write-Log "Checking status of agent: $AgentName"
    
    $agentPath = "./agents/$AgentName"
    if (Test-Path $agentPath) {
        try {
            # 检查Windows计划任务状态
            $taskName = "OpenClaw Gateway"
            $task = schtasks /query /tn "$taskName" 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Log "Agent $AgentName is running" -Level Success
                return 'Running'
            } else {
                Write-Log "Agent $AgentName is stopped" -Level Warning
                return 'Stopped'
            }
        } catch {
            Write-Log "Error checking status of agent ${AgentName}: $($_.Exception.Message)" -Level Error
            return 'Error'
        }
    } else {
        Write-Log "Agent directory not found: $AgentName" -Level Error
        return 'NotFound'
    }
}

function List-Agents {
    Write-Log "Listing available agents..."
    
    $agentsDir = "./agents"
    if (Test-Path $agentsDir) {
        $agents = Get-ChildItem $agentsDir -Directory | Select-Object Name
        if ($agents.Count -gt 0) {
            Write-Log "Available agents:"
            foreach ($agent in $agents) {
                $status = Get-AgentStatus -AgentName $agent.Name
                Write-Log "- $($agent.Name): $status"
            }
        } else {
            Write-Log "No agents found in $agentsDir" -Level Warning
        }
    } else {
        Write-Log "Agents directory not found: $agentsDir" -Level Error
    }
}

# 主执行逻辑
Write-Log "OpenClaw Agent Manager"
Write-Log "Command: $Command"
Write-Log "Agent: $Agent"

# 检查OpenClaw是否安装
if (-not (Get-Command 'openclaw' -ErrorAction SilentlyContinue)) {
    Write-Log "OpenClaw is not installed. Please install it first." -Level Error
    exit 1
}

switch ($Command) {
    'start' {
        if ($Agent -eq 'all') {
            # 启动所有智能体
            $agentsDir = "./agents"
            if (Test-Path $agentsDir) {
                $agents = Get-ChildItem $agentsDir -Directory | Select-Object Name
                foreach ($agent in $agents) {
                    Start-Agent -AgentName $agent.Name
                }
            } else {
                Write-Log "Agents directory not found: $agentsDir" -Level Error
            }
        } else {
            # 启动指定智能体
            Start-Agent -AgentName $Agent
        }
    }
    'stop' {
        if ($Agent -eq 'all') {
            # 停止所有智能体
            $agentsDir = "./agents"
            if (Test-Path $agentsDir) {
                $agents = Get-ChildItem $agentsDir -Directory | Select-Object Name
                foreach ($agent in $agents) {
                    Stop-Agent -AgentName $agent.Name
                }
            } else {
                Write-Log "Agents directory not found: $agentsDir" -Level Error
            }
        } else {
            # 停止指定智能体
            Stop-Agent -AgentName $Agent
        }
    }
    'status' {
        if ($Agent -eq 'all') {
            # 查看所有智能体状态
            List-Agents
        } else {
            # 查看指定智能体状态
            Get-AgentStatus -AgentName $Agent
        }
    }
    'list' {
        # 列出所有智能体
        List-Agents
    }
}

Write-Log "Agent manager operation completed"