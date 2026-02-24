<#
NotebookLM 自动化服务启动脚本
适用于 Windows PowerShell
功能：
1. 检查系统环境
2. 安装依赖
3. 启动监控服务
4. 支持系统自启动配置
#>

Write-Host "🚀 启动 NotebookLM 自动化服务..." -ForegroundColor Green
Write-Host "📅 启动时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Yellow

# 检查 Node.js 是否安装
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js 已安装: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ 错误: 未找到 Node.js" -ForegroundColor Red
    Write-Host "ℹ️  请先安装 Node.js 然后再运行此脚本" -ForegroundColor Yellow
    Read-Host "按 Enter 键退出..."
    exit 1
}

# 检查依赖是否安装
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  未找到依赖包，正在安装..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 依赖安装失败" -ForegroundColor Red
        Read-Host "按 Enter 键退出..."
        exit 1
    }
    Write-Host "✅ 依赖安装完成" -ForegroundColor Green
}

# 确保目录存在
$directories = @("watch", "downloads", "logs")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "📁 创建目录: $dir" -ForegroundColor Cyan
    }
}

Write-Host "📁 目录检查完成" -ForegroundColor Green
Write-Host "📦 依赖检查完成" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Yellow

# 系统自启动配置
function Set-AutoStart {
    param (
        [switch]$Enable
    )
    
    $scriptPath = Join-Path -Path (Get-Location).Path -ChildPath "start.bat"
    $shortcutPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\NotebookLM-Automation.lnk"
    
    if ($Enable) {
        # 创建快捷方式到启动文件夹
        try {
            $WScriptShell = New-Object -ComObject WScript.Shell
            $shortcut = $WScriptShell.CreateShortcut($shortcutPath)
            $shortcut.TargetPath = $scriptPath
            $shortcut.WorkingDirectory = (Get-Location).Path
            $shortcut.Save()
            Write-Host "✅ 已配置系统自启动" -ForegroundColor Green
        } catch {
            Write-Host "❌ 配置自启动失败: $_" -ForegroundColor Red
        }
    } else {
        # 移除快捷方式
        if (Test-Path $shortcutPath) {
            Remove-Item $shortcutPath -Force
            Write-Host "✅ 已禁用系统自启动" -ForegroundColor Green
        }
    }
}

# 询问是否配置自启动
$response = Read-Host "是否配置系统自启动？(y/n, 默认: n)"
if ($response -eq "y" -or $response -eq "Y") {
    Set-AutoStart -Enable
}

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "📢 启动文件夹监控服务..." -ForegroundColor Green
Write-Host "💡 提示: 按 Ctrl+C 停止服务" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

# 启动监控服务
try {
    node watcher.js
} catch {
    Write-Host "❌ 服务启动失败: $_" -ForegroundColor Red
    Read-Host "按 Enter 键退出..."
    exit 1
}

# 捕获退出信号
Write-Host "🛑 服务已停止" -ForegroundColor Red
Write-Host "📅 停止时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
Read-Host "按 Enter 键退出..."
