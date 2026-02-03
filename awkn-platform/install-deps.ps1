# 安装AWKN项目依赖的PowerShell脚本

Write-Host "=== 安装AWKN项目依赖 ===" -ForegroundColor Green

# 定义npm路径
$NPM_CMD = "C:\Program Files\nodejs\npm.cmd"

# 检查npm是否存在
if (!(Test-Path $NPM_CMD)) {
    Write-Host "错误: npm未找到" -ForegroundColor Red
    exit 1
}

Write-Host "✓ npm 已找到: $NPM_CMD" -ForegroundColor Green
Write-Host ""

# 安装根目录依赖
Write-Host "1. 正在安装根目录依赖..." -ForegroundColor Cyan
& $NPM_CMD install

if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 根目录依赖安装失败" -ForegroundColor Red
    exit 1
}

Write-Host "✓ 根目录依赖安装成功" -ForegroundColor Green
Write-Host ""

# 安装前端依赖
Write-Host "2. 正在安装前端依赖..." -ForegroundColor Cyan
Push-Location "frontend"
& $NPM_CMD install

if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 前端依赖安装失败" -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location
Write-Host "✓ 前端依赖安装成功" -ForegroundColor Green
Write-Host ""

# 安装后端依赖
Write-Host "3. 正在安装后端依赖..." -ForegroundColor Cyan
Push-Location "backend"
& $NPM_CMD install

if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 后端依赖安装失败" -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location
Write-Host "✓ 后端依赖安装成功" -ForegroundColor Green
Write-Host ""

# 配置环境变量
Write-Host "4. 配置环境变量..." -ForegroundColor Cyan

# 前端环境变量
if (!(Test-Path "frontend\.env.local")) {
    if (Test-Path "frontend\.env.local.example") {
        Copy-Item "frontend\.env.local.example" "frontend\.env.local"
        Write-Host "✓ 前端环境变量文件已创建" -ForegroundColor Green
    } else {
        Write-Host "警告: 前端环境变量示例文件未找到" -ForegroundColor Yellow
    }
}

# 后端环境变量
if (!(Test-Path "backend\.env")) {
    if (Test-Path "backend\.env.example") {
        Copy-Item "backend\.env.example" "backend\.env"
        Write-Host "✓ 后端环境变量文件已创建" -ForegroundColor Green
    } else {
        Write-Host "警告: 后端环境变量示例文件未找到" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== 依赖安装完成 ===" -ForegroundColor Green
Write-Host "现在可以启动开发服务器了:"
Write-Host "1. 启动前端: npm run dev (在frontend目录)"
Write-Host "2. 启动后端: npm run dev (在backend目录)"
