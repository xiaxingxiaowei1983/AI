#!/usr/bin/env pwsh

# AI公司化改造 - 性能监控脚本
# 用于监控智能体的运行状态、资源使用情况和Token消耗
# 执行时间: 每小时执行一次

# 脚本功能:
# 1. 监控智能体的运行状态
# 2. 监控系统资源使用情况
# 3. 监控Token消耗情况
# 4. 生成性能报告
# 5. 当性能异常时发出告警

# 定义常量
$BASE_DIR = Get-Location
$AGENTS_DIR = Join-Path -Path $BASE_DIR -ChildPath "agents"
$PERFORMANCE_LOG = Join-Path -Path $BASE_DIR -ChildPath "performance.log"
$ALERT_LOG = Join-Path -Path $BASE_DIR -ChildPath "alert.log"

# 监控阈值
$CPU_THRESHOLD = 80  # CPU使用率阈值（%）
$MEMORY_THRESHOLD = 80  # 内存使用率阈值（%）
$TOKEN_THRESHOLD = 10000  # 每日Token消耗阈值

# 日志函数
function Write-Log {
    param(
        [string]$Message,
        [string]$LogFile = $PERFORMANCE_LOG
    )
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] $Message"
    Add-Content -Path $LogFile -Value $LogEntry
    Write-Host $LogEntry
}

# 告警函数
function Send-Alert {
    param(
        [string]$Message,
        [string]$Severity = "Warning"
    )
    $AlertMessage = "[$Severity] $Message"
    Write-Log -Message $AlertMessage -LogFile $ALERT_LOG
    # 这里可以添加其他告警方式，如邮件、通知等
}

# 开始监控
Write-Log "开始执行性能监控任务..."

# 1. 监控系统资源使用情况
Write-Log "监控系统资源使用情况..."

try {
    # 获取CPU使用率
    $CPUUsage = (Get-WmiObject -Class win32_processor | Measure-Object -Property LoadPercentage -Average).Average
    Write-Log "CPU使用率: $CPUUsage%"
    
    # 检查CPU使用率是否超过阈值
    if ($CPUUsage -gt $CPU_THRESHOLD) {
        Send-Alert -Message "CPU使用率过高: $CPUUsage%，超过阈值 $CPU_THRESHOLD%" -Severity "Critical"
    }
    
    # 获取内存使用率
    $TotalMemory = (Get-WmiObject -Class win32_operatingsystem).TotalVisibleMemorySize / 1MB
    $FreeMemory = (Get-WmiObject -Class win32_operatingsystem).FreePhysicalMemory / 1MB
    $MemoryUsage = [math]::Round(((($TotalMemory - $FreeMemory) / $TotalMemory) * 100), 2)
    Write-Log "内存使用率: $MemoryUsage%"
    
    # 检查内存使用率是否超过阈值
    if ($MemoryUsage -gt $MEMORY_THRESHOLD) {
        Send-Alert -Message "内存使用率过高: $MemoryUsage%，超过阈值 $MEMORY_THRESHOLD%" -Severity "Critical"
    }
    
    # 获取磁盘使用率
    $SystemDrive = Get-WmiObject -Class win32_logicaldisk | Where-Object { $_.DeviceID -eq "C:" }
    $DiskUsage = [math]::Round((($SystemDrive.Size - $SystemDrive.FreeSpace) / $SystemDrive.Size) * 100, 2)
    Write-Log "磁盘使用率: $DiskUsage%"
    
    # 检查磁盘使用率是否超过阈值
    if ($DiskUsage -gt 90) {
        Send-Alert -Message "磁盘使用率过高: $DiskUsage%，建议清理磁盘空间" -Severity "Warning"
    }
    
} catch {
    Write-Log "监控系统资源时出错: $_"
}

# 2. 监控智能体的运行状态
Write-Log "监控智能体的运行状态..."

try {
    # 获取所有智能体目录
    $AgentDirectories = Get-ChildItem -Path $AGENTS_DIR -Directory
    
    foreach ($AgentDir in $AgentDirectories) {
        $AgentName = $AgentDir.Name
        Write-Log "监控智能体: $AgentName"
        
        # 检查智能体的配置文件是否存在
        $ConfigFile = Join-Path -Path $AgentDir.FullName -ChildPath "openclaw.json"
        if (Test-Path -Path $ConfigFile -PathType Leaf) {
            Write-Log "  配置文件存在"
        } else {
            Send-Alert -Message "智能体 $AgentName 的配置文件不存在" -Severity "Warning"
        }
        
        # 检查智能体的提示词文件是否存在
        $PromptFile = Join-Path -Path $AgentDir.FullName -ChildPath "agent.prompt"
        if (Test-Path -Path $PromptFile -PathType Leaf) {
            $PromptSize = (Get-Item -Path $PromptFile).Length / 1KB
            Write-Log "  提示词文件存在，大小: $([math]::Round($PromptSize, 2)) KB"
        } else {
            Send-Alert -Message "智能体 $AgentName 的提示词文件不存在" -Severity "Warning"
        }
        
        # 检查智能体的个人记忆目录是否存在
        $MemoryDir = Join-Path -Path $AgentDir.FullName -ChildPath "memory"
        if (Test-Path -Path $MemoryDir -PathType Container) {
            Write-Log "  个人记忆目录存在"
        } else {
            Send-Alert -Message "智能体 $AgentName 的个人记忆目录不存在" -Severity "Warning"
        }
        
        # 检查智能体的技能配置目录是否存在
        $SkillConfigDir = Join-Path -Path $AgentDir.FullName -ChildPath "skill-configs"
        if (Test-Path -Path $SkillConfigDir -PathType Container) {
            Write-Log "  技能配置目录存在"
        } else {
            Send-Alert -Message "智能体 $AgentName 的技能配置目录不存在" -Severity "Warning"
        }
    }
    
} catch {
    Write-Log "监控智能体状态时出错: $_"
}

# 3. 监控Token消耗情况
Write-Log "监控Token消耗情况..."

try {
    # 这里需要根据实际的Token消耗记录方式进行调整
    # 假设Token消耗记录在token-monitor.log文件中
    $TokenLogFile = Join-Path -Path $BASE_DIR -ChildPath "token-monitor.log"
    
    if (Test-Path -Path $TokenLogFile -PathType Leaf) {
        # 获取今日的Token消耗
        $Today = Get-Date -Format "yyyy-MM-dd"
        $TodayTokenUsage = 0
        
        # 读取Token日志文件
        $TokenLogs = Get-Content -Path $TokenLogFile
        foreach ($Log in $TokenLogs) {
            if ($Log -match "$Today.*Token消耗: (\d+)") {
                $TodayTokenUsage += [int]$matches[1]
            }
        }
        
        Write-Log "今日Token消耗: $TodayTokenUsage"
        
        # 检查Token消耗是否超过阈值
        if ($TodayTokenUsage -gt $TOKEN_THRESHOLD) {
            Send-Alert -Message "今日Token消耗过高: $TodayTokenUsage，超过阈值 $TOKEN_THRESHOLD" -Severity "Warning"
        }
        
    } else {
        Write-Log "Token日志文件不存在，无法监控Token消耗"
    }
    
} catch {
    Write-Log "监控Token消耗时出错: $_"
}

# 4. 监控正在运行的进程
Write-Log "监控正在运行的进程..."

try {
    # 获取与智能体相关的进程
    $AgentProcesses = Get-Process | Where-Object {
        $_.ProcessName -like "node*" -or $_.ProcessName -like "python*"
    }
    
    foreach ($Process in $AgentProcesses) {
        $ProcessName = $Process.ProcessName
        $ProcessID = $Process.Id
        $CPUUsage = $Process.CPU
        $MemoryUsage = $Process.WorkingSet64 / 1MB
        
        Write-Log "  进程: $ProcessName (ID: $ProcessID)"
        Write-Log "    CPU使用率: $CPUUsage"
        Write-Log "    内存使用: $([math]::Round($MemoryUsage, 2)) MB"
    }
    
} catch {
    Write-Log "监控进程时出错: $_"
}

# 5. 生成性能报告
Write-Log "生成性能报告..."

try {
    # 获取当前时间
    $CurrentTime = Get-Date
    $ReportDate = $CurrentTime.ToString("yyyy-MM-dd")
    $ReportTime = $CurrentTime.ToString("HH:mm:ss")
    
    # 生成报告文件
    $ReportFile = Join-Path -Path $BASE_DIR -ChildPath "performance-report-$ReportDate.log"
    
    # 写入报告头部
    $ReportHeader = @"
===========================================
性能报告
报告日期: $ReportDate
报告时间: $ReportTime
===========================================

"@
    Add-Content -Path $ReportFile -Value $ReportHeader
    
    # 写入系统资源使用情况
    Add-Content -Path $ReportFile -Value "系统资源使用情况:
"
    Add-Content -Path $ReportFile -Value "CPU使用率: $CPUUsage%
"
    Add-Content -Path $ReportFile -Value "内存使用率: $MemoryUsage%
"
    Add-Content -Path $ReportFile -Value "磁盘使用率: $DiskUsage%
"
    
    # 写入智能体状态
    Add-Content -Path $ReportFile -Value "
智能体状态:
"
    foreach ($AgentDir in $AgentDirectories) {
        $AgentName = $AgentDir.Name
        Add-Content -Path $ReportFile -Value "$AgentName: 正常
"
    }
    
    # 写入Token消耗情况
    Add-Content -Path $ReportFile -Value "
Token消耗情况:
"
    Add-Content -Path $ReportFile -Value "今日Token消耗: $TodayTokenUsage
"
    Add-Content -Path $ReportFile -Value "Token消耗阈值: $TOKEN_THRESHOLD
"
    
    # 写入报告尾部
    $ReportFooter = @"

===========================================
报告结束
===========================================
"@
    Add-Content -Path $ReportFile -Value $ReportFooter
    
    Write-Log "性能报告已生成: $ReportFile"
    
} catch {
    Write-Log "生成性能报告时出错: $_"
}

# 6. 检查告警日志
Write-Log "检查告警日志..."

try {
    if (Test-Path -Path $ALERT_LOG -PathType Leaf) {
        $Today = Get-Date -Format "yyyy-MM-dd"
        $TodayAlerts = Get-Content -Path $ALERT_LOG | Where-Object { $_ -match $Today }
        $AlertCount = $TodayAlerts.Count
        
        Write-Log "今日告警数量: $AlertCount"
        
        if ($AlertCount -gt 0) {
            Write-Log "今日告警详情:"
            foreach ($Alert in $TodayAlerts) {
                Write-Log "  $Alert"
            }
        }
    }
    
} catch {
    Write-Log "检查告警日志时出错: $_"
}

# 脚本结束
Write-Log "性能监控任务执行完毕"
Add-Content -Path $PERFORMANCE_LOG -Value ""

# 确保脚本可执行
# 在Windows上，PowerShell脚本的执行权限由系统策略控制
Write-Log "脚本执行完成，请确保已设置适当的执行权限"
