@echo off

rem NotebookLM 自动化服务启动脚本
rem 适用于 Windows 系统

echo 🚀 启动 NotebookLM 自动化服务...
echo 📅 启动时间: %date% %time%
echo ========================================

rem 检查 Node.js 是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到 Node.js
    echo ℹ️  请先安装 Node.js 然后再运行此脚本
    pause
    exit /b 1
)

rem 检查依赖是否安装
if not exist "node_modules" (
    echo ⚠️  未找到依赖包，正在安装...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
)

rem 确保目录存在
if not exist "watch" mkdir watch
if not exist "downloads" mkdir downloads
if not exist "logs" mkdir logs

echo 📁 目录检查完成
echo 📦 依赖检查完成
echo ========================================
echo 📢 启动文件夹监控服务...
echo 💡 提示: 按 Ctrl+C 停止服务
echo ========================================

rem 启动监控服务
node watcher.js

rem 捕获退出信号
echo 🛑 服务已停止
echo 📅 停止时间: %date% %time%
pause
