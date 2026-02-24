#!/usr/bin/env pwsh

# AI公司化改造 - 每日清理脚本 (Windows版本)
# 用于实现记忆生命周期管理
# 执行时间: 每日凌晨

# 脚本功能:
# 1. 将7天前的P0任务标记为P1（任务归档）
# 2. 将30天前的P1任务归档到P2（进入档案室）
# 3. 更新.abstract索引文件（知识地图更新）
# 4. 清理临时文件和日志

# 定义常量
$BASE_DIR = Get-Location
$SHARED_MEMORY_DIR = Join-Path -Path $BASE_DIR -ChildPath "shared-memory"
$AGENTS_DIR = Join-Path -Path $BASE_DIR -ChildPath "agents"
$ABSTRACT_FILE = Join-Path -Path $BASE_DIR -ChildPath ".abstract"
$LOG_FILE = Join-Path -Path $BASE_DIR -ChildPath "cleanup.log"

# 定义时间阈值
$P0_TO_P1_DAYS = 7
$P1_TO_P2_DAYS = 30

# 日志函数
function Write-Log {
    param(
        [string]$Message
    )
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] $Message"
    Add-Content -Path $LOG_FILE -Value $LogEntry
    Write-Host $LogEntry
}

# 开始清理
Write-Log "开始执行每日清理任务..."

# 1. 清理临时文件
Write-Log "清理临时文件..."
try {
    $TempFiles = Get-ChildItem -Path $BASE_DIR -Recurse -Include "*.tmp", "*.log", "*.swp" | Where-Object { $_.Name -ne "cleanup.log" }
    foreach ($File in $TempFiles) {
        Remove-Item -Path $File.FullName -Force -ErrorAction SilentlyContinue
    }
} catch {
    Write-Log "清理临时文件时出错: $_"
}

# 2. 处理智能体的个人记忆
Write-Log "处理智能体个人记忆..."

try {
    # 获取所有智能体目录
    $AGENT_DIRS = Get-ChildItem -Path $AGENTS_DIR -Recurse -Directory -Name "memory" | ForEach-Object {
        Join-Path -Path $AGENTS_DIR -ChildPath $_
    }

    foreach ($MEMORY_DIR in $AGENT_DIRS) {
        Write-Log "处理智能体记忆: $MEMORY_DIR"
        
        # 处理P0目录（7天前的标记为P1）
        $P0_DIR = Join-Path -Path $MEMORY_DIR -ChildPath "P0"
        if (Test-Path -Path $P0_DIR -PathType Container) {
            Write-Log "  处理P0目录..."
            $P0Files = Get-ChildItem -Path $P0_DIR -File | Where-Object {
                $_.LastWriteTime -lt (Get-Date).AddDays(-$P0_TO_P1_DAYS)
            }
            foreach ($File in $P0Files) {
                $DEST_FILE = Join-Path -Path $MEMORY_DIR -ChildPath "P1\$($File.Name)"
                Write-Log "    将7天前的文件移至P1: $($File.Name)"
                Move-Item -Path $File.FullName -Destination $DEST_FILE -Force -ErrorAction SilentlyContinue
            }
        }
        
        # 处理P1目录（30天前的归档到P2）
        $P1_DIR = Join-Path -Path $MEMORY_DIR -ChildPath "P1"
        if (Test-Path -Path $P1_DIR -PathType Container) {
            Write-Log "  处理P1目录..."
            $P1Files = Get-ChildItem -Path $P1_DIR -File | Where-Object {
                $_.LastWriteTime -lt (Get-Date).AddDays(-$P1_TO_P2_DAYS)
            }
            foreach ($File in $P1Files) {
                $DEST_FILE = Join-Path -Path $MEMORY_DIR -ChildPath "P2\$($File.Name)"
                Write-Log "    将30天前的文件移至P2: $($File.Name)"
                Move-Item -Path $File.FullName -Destination $DEST_FILE -Force -ErrorAction SilentlyContinue
            }
        }
        
        # 清理空目录
        Get-ChildItem -Path $MEMORY_DIR -Recurse -Directory | Where-Object {
            $_.GetFiles().Count -eq 0 -and $_.GetDirectories().Count -eq 0
        } | Remove-Item -Force -ErrorAction SilentlyContinue
    }
} catch {
    Write-Log "处理智能体记忆时出错: $_"
}

# 3. 处理共享记忆系统
Write-Log "处理共享记忆系统..."

try {
    # 清理共享记忆中的过时文件
    if (Test-Path -Path $SHARED_MEMORY_DIR -PathType Container) {
        $OldFiles = Get-ChildItem -Path $SHARED_MEMORY_DIR -Recurse -File | Where-Object {
            $_.LastWriteTime -lt (Get-Date).AddDays(-90)
        }
        foreach ($File in $OldFiles) {
            Remove-Item -Path $File.FullName -Force -ErrorAction SilentlyContinue
        }
    }
} catch {
    Write-Log "处理共享记忆系统时出错: $_"
}

# 4. 更新.abstract索引文件
Write-Log "更新知识地图索引..."

try {
    if (Test-Path -Path $ABSTRACT_FILE -PathType Leaf) {
        # 备份原索引文件
        $BACKUP_FILE = "$ABSTRACT_FILE.bak"
        Copy-Item -Path $ABSTRACT_FILE -Destination $BACKUP_FILE -Force -ErrorAction SilentlyContinue
        
        # 更新索引文件中的时间戳
        $Content = Get-Content -Path $ABSTRACT_FILE -Raw
        $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $NewContent = $Content -replace '(版本:.*)', "$1 (更新于: $Timestamp)"
        Set-Content -Path $ABSTRACT_FILE -Value $NewContent -Force -ErrorAction SilentlyContinue
        
        Write-Log "知识地图索引已更新"
    } else {
        Write-Log "警告: 知识地图索引文件不存在"
    }
} catch {
    Write-Log "更新知识地图索引时出错: $_"
}

# 5. 清理过大的日志文件
Write-Log "清理过大的日志文件..."

try {
    $LargeLogs = Get-ChildItem -Path $BASE_DIR -Recurse -File -Name "*.log" | Where-Object {
        $_.Length -gt 10MB
    }
    foreach ($LogFile in $LargeLogs) {
        if ($LogFile.Name -ne "cleanup.log") {
            # 截断日志文件
            Set-Content -Path $LogFile.FullName -Value "[日志已清理] $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -Force -ErrorAction SilentlyContinue
        }
    }
} catch {
    Write-Log "清理过大的日志文件时出错: $_"
}

# 6. 生成清理报告
Write-Log "生成清理报告..."

try {
    # 统计清理结果
    $TOTAL_FILES_MOVED = 0
    $TOTAL_FILES_DELETED = 0

    # 计算移动的文件数
    foreach ($MEMORY_DIR in $AGENT_DIRS) {
        $P1_DIR = Join-Path -Path $MEMORY_DIR -ChildPath "P1"
        if (Test-Path -Path $P1_DIR -PathType Container) {
            $FILES_MOVED = (Get-ChildItem -Path $P1_DIR -File).Count
            $TOTAL_FILES_MOVED += $FILES_MOVED
        }
    }

    # 计算删除的文件数
    $TOTAL_FILES_DELETED = $TempFiles.Count

    Write-Log "清理完成!"
    Write-Log "总计移动文件: $TOTAL_FILES_MOVED"
    Write-Log "总计删除文件: $TOTAL_FILES_DELETED"
    Write-Log "下次清理时间: $(Get-Date).AddDays(1)"
} catch {
    Write-Log "生成清理报告时出错: $_"
}

# 脚本结束
Write-Log "每日清理任务执行完毕"
Add-Content -Path $LOG_FILE -Value ""

# 确保脚本可执行
# 在Windows上，PowerShell脚本的执行权限由系统策略控制
Write-Log "脚本执行完成，请确保已设置适当的执行权限"
