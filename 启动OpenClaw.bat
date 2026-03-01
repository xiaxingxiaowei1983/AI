@echo off
chcp 65001 >nul
title OpenClaw 一键启动
mode con cols=80 lines=30
color 3f

echo ========================================
echo     OpenClaw 一键启动脚本
echo     版本: 2026.2.26
echo ========================================
echo.

cd /d C:\Users\10919\Desktop\AI\mission-control

echo [步骤 1/3] 启动 OpenClaw 网关服务...
echo    端口: 18790
echo    令牌: 2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da
echo.
start "OpenClaw-18790" cmd /k "openclaw gateway --port 18790 --token 2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da"

echo [步骤 2/3] 等待网关启动...
timeout /t 5 /nobreak >nul

echo [步骤 3/3] 启动 CSP 修复代理...
cd /d C:\Users\10919\Desktop\AI
start "CSP-Proxy-18800" cmd /k "node csp-proxy-server.js"

echo.
echo ========================================
echo     启动完成！
echo ========================================
echo.
echo 访问地址：http://localhost:18800
echo 控制面板：http://localhost:18792
echo.
echo 网关令牌：2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da
echo.
echo 请在浏览器中打开 http://localhost:18800
echo 如果需要输入令牌，请使用上面的令牌
echo.
echo 按任意键退出...
pause >nul
