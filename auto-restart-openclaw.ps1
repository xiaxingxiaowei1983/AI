# 自动重启OpenClaw服务脚本
Write-Host "=== 自动重启OpenClaw服务 ==="

# 停止现有服务
Write-Host "1. 停止现有服务..."
taskkill /f /im node.exe 2>$null
taskkill /f /im openclaw.exe 2>$null
Start-Sleep -Seconds 2

# 重启服务
Write-Host "2. 重启OpenClaw服务..."
try {
    openclaw start
    Start-Sleep -Seconds 5
    
    # 验证服务状态
    Write-Host "3. 验证服务状态..."
    $status = openclaw status
    Write-Host $status
    
    # 检查是否包含错误信息
    if ($status -like "*error*" -or $status -like "*failed*") {
        Write-Host "❌ 服务启动失败，正在重试..."
        Start-Sleep -Seconds 2
        openclaw restart
        Start-Sleep -Seconds 5
        openclaw status
    } else {
        Write-Host "✅ 服务启动成功！"
    }
} catch {
    Write-Host "❌ 执行错误: $_"
}

Write-Host "=== 操作完成 ==="