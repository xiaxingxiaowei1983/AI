@echo off

REM 启动公司大脑脚本

echo 🚀 启动公司大脑...

REM 检查 Node.js 是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装，请先安装 Node.js 14.0.0 或更高版本
    pause
    exit /b 1
)

REM 检查依赖是否已安装
if not exist "node_modules" (
    echo 🔧 安装依赖...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
)

REM 启动公司大脑
echo 🚀 启动公司大脑服务...
npm start

pause
