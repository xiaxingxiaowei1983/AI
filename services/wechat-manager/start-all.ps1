Write-Host "🔄 启动所有微信服务..." -ForegroundColor Cyan

# 确保所有服务目录存在
$services = @(
    "wechat-auth",
    "wechat-profile",
    "wechat-moments",
    "wechat-message",
    "wechat-manager"
)

foreach ($service in $services) {
    $servicePath = Join-Path "C:\Users\10919\Desktop\AI\services" $service
    if (Test-Path $servicePath) {
        Write-Host "✅ 服务目录存在: $service" -ForegroundColor Green
    } else {
        Write-Host "❌ 服务目录不存在: $service" -ForegroundColor Red
    }
}

# 启动认证服务
Write-Host "\n🚀 启动认证服务..." -ForegroundColor Yellow
$authPath = "C:\Users\10919\Desktop\AI\services\wechat-auth"
if (Test-Path $authPath) {
    Set-Location $authPath
    Start-Process "npm" -ArgumentList "start" -WindowStyle Minimized
    Write-Host "✅ 认证服务已启动" -ForegroundColor Green
} else {
    Write-Host "❌ 认证服务目录不存在" -ForegroundColor Red
}

# 启动形象管理服务
Write-Host "\n🚀 启动形象管理服务..." -ForegroundColor Yellow
$profilePath = "C:\Users\10919\Desktop\AI\services\wechat-profile"
if (Test-Path $profilePath) {
    Set-Location $profilePath
    Start-Process "npm" -ArgumentList "start" -WindowStyle Minimized
    Write-Host "✅ 形象管理服务已启动" -ForegroundColor Green
} else {
    Write-Host "❌ 形象管理服务目录不存在" -ForegroundColor Red
}

# 启动朋友圈服务
Write-Host "\n🚀 启动朋友圈服务..." -ForegroundColor Yellow
$momentsPath = "C:\Users\10919\Desktop\AI\services\wechat-moments"
if (Test-Path $momentsPath) {
    Set-Location $momentsPath
    Start-Process "npm" -ArgumentList "start" -WindowStyle Minimized
    Write-Host "✅ 朋友圈服务已启动" -ForegroundColor Green
} else {
    Write-Host "❌ 朋友圈服务目录不存在" -ForegroundColor Red
}

# 启动消息服务
Write-Host "\n🚀 启动消息服务..." -ForegroundColor Yellow
$messagePath = "C:\Users\10919\Desktop\AI\services\wechat-message"
if (Test-Path $messagePath) {
    Set-Location $messagePath
    Start-Process "npm" -ArgumentList "start" -WindowStyle Minimized
    Write-Host "✅ 消息服务已启动" -ForegroundColor Green
} else {
    Write-Host "❌ 消息服务目录不存在" -ForegroundColor Red
}

# 启动微信管理器
Write-Host "\n🚀 启动微信管理器..." -ForegroundColor Yellow
$managerPath = "C:\Users\10919\Desktop\AI\services\wechat-manager"
if (Test-Path $managerPath) {
    Set-Location $managerPath
    Start-Process "npm" -ArgumentList "start" -WindowStyle Normal
    Write-Host "✅ 微信管理器已启动" -ForegroundColor Green
    Write-Host "🌐 访问 http://localhost:4000 查看管理界面" -ForegroundColor Cyan
} else {
    Write-Host "❌ 微信管理器目录不存在" -ForegroundColor Red
}

# 等待服务启动
Write-Host "\n⏳ 等待服务启动..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# 显示服务状态
Write-Host "\n📊 服务启动状态:" -ForegroundColor Cyan
Write-Host "- 认证服务: http://localhost:4001" -ForegroundColor White
Write-Host "- 形象管理: http://localhost:4004" -ForegroundColor White
Write-Host "- 朋友圈服务: http://localhost:4003" -ForegroundColor White
Write-Host "- 消息服务: http://localhost:4002" -ForegroundColor White
Write-Host "- 微信管理器: http://localhost:4000" -ForegroundColor White

Write-Host "\n✅ 所有服务启动完成！" -ForegroundColor Green
Write-Host "💡 请访问 http://localhost:4000 使用微信管理器" -ForegroundColor Cyan

# 保持窗口打开
Write-Host "\n按任意键退出..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
