# 启动AWKN项目的PowerShell脚本

Write-Host "=== AWKN认知觉醒平台启动脚本 ===" -ForegroundColor Green
Write-Host ""

# 定义Node.js和npm路径
$NODE_EXE = "C:\Program Files\nodejs\node.exe"
$NPM_CMD = "C:\Program Files\nodejs\npm.cmd"

# 检查Node.js和npm是否存在
if (!(Test-Path $NODE_EXE)) {
    Write-Host "错误: Node.js未找到" -ForegroundColor Red
    exit 1
}

if (!(Test-Path $NPM_CMD)) {
    Write-Host "错误: npm未找到" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Node.js 已找到: $NODE_EXE" -ForegroundColor Green
Write-Host "✓ npm 已找到: $NPM_CMD" -ForegroundColor Green
Write-Host ""

# 显示版本信息
Write-Host "=== 版本信息 ===" -ForegroundColor Cyan
& $NODE_EXE --version
& $NPM_CMD --version
Write-Host ""

# 安装依赖
Write-Host "=== 安装项目依赖 ===" -ForegroundColor Yellow
Write-Host "正在安装根目录依赖..."
& $NPM_CMD install

if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 根目录依赖安装失败" -ForegroundColor Red
    exit 1
}

Write-Host "正在安装前端依赖..."
Push-Location "frontend"
& $NPM_CMD install

if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 前端依赖安装失败" -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location

Write-Host "正在安装后端依赖..."
Push-Location "backend"
& $NPM_CMD install

if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 后端依赖安装失败" -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location

Write-Host "✓ 所有依赖安装成功" -ForegroundColor Green
Write-Host ""

# 配置环境变量
Write-Host "=== 配置环境变量 ===" -ForegroundColor Yellow

if (!(Test-Path "frontend\.env.local")) {
    Write-Host "正在创建前端环境变量文件..."
    if (Test-Path "frontend\.env.local.example") {
        Copy-Item "frontend\.env.local.example" "frontend\.env.local"
        Write-Host "✓ 前端环境变量文件已创建" -ForegroundColor Green
    } else {
        Write-Host "警告: 前端环境变量示例文件未找到" -ForegroundColor Yellow
    }
}

if (!(Test-Path "backend\.env")) {
    Write-Host "正在创建后端环境变量文件..."
    if (Test-Path "backend\.env.example") {
        Copy-Item "backend\.env.example" "backend\.env"
        Write-Host "✓ 后端环境变量文件已创建" -ForegroundColor Green
    } else {
        Write-Host "警告: 后端环境变量示例文件未找到" -ForegroundColor Yellow
    }
}

Write-Host ""

# 启动项目
Write-Host "=== 启动项目 ===" -ForegroundColor Green
Write-Host "请选择启动方式:"
Write-Host "1. 启动前端开发服务器"
Write-Host "2. 启动后端开发服务器"
Write-Host "3. 退出"

$choice = Read-Host "请输入选项 (1-3)"

switch ($choice) {
    "1" {
        Write-Host "正在启动前端开发服务器..." -ForegroundColor Cyan
        Push-Location "frontend"
        & $NPM_CMD run dev
        Pop-Location
    }
    "2" {
        Write-Host "正在启动后端开发服务器..." -ForegroundColor Cyan
        Push-Location "backend"
        & $NPM_CMD run dev
        Pop-Location
    }
    "3" {
        Write-Host "退出脚本" -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "无效选项" -ForegroundColor Red
        exit 1
    }
}
