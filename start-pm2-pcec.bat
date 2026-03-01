@echo off

rem 启动PM2和PCEC系统
cd /d "C:\Users\10919\Desktop\AI"

rem 检查PM2是否已安装
npm list -g pm2 > nul 2>&1
if %errorlevel% neq 0 (
    echo PM2 is not installed, installing...
    npm install -g pm2
)

rem 启动PM2和PCEC系统
npm run pm2-start

rem 保存进程列表
npm run pm2-save

echo PCEC system started successfully
pause