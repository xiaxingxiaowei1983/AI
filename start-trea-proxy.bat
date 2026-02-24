@echo off

echo Starting OpenClaw with Trea Model Proxy...

REM 导航到工作目录
cd "C:\Users\10919\Desktop\AI"

REM 初始化Trea Model Proxy SKILL
echo Initializing Trea Model Proxy SKILL...
cd "C:\Users\10919\Desktop\AI\skills\trea-model-proxy"
node index.js init

REM 导航回工作目录
cd "C:\Users\10919\Desktop\AI"

REM 启动OpenClaw网关，使用Trea内部模型
echo Starting OpenClaw gateway...
openclaw gateway start --trea-internal

echo OpenClaw and Trea Model Proxy SKILL started successfully!
echo Service is available at http://localhost:18789
