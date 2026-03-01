@echo off
echo === 重启OpenClaw服务 ===
echo.

REM 停止现有服务
echo 1. 停止现有服务...
taskkill /f /im node.exe 2>nul
taskkill /f /im openclaw.exe 2>nul
ping 127.0.0.1 -n 3 >nul

echo.
REM 重启服务
echo 2. 重启OpenClaw服务...
openclaw start
ping 127.0.0.1 -n 6 >nul

echo.
REM 验证服务状态
echo 3. 验证服务状态...
openclaw status

echo.
echo === 操作完成 ===
pause