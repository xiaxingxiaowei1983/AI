@echo off

echo Starting OpenClaw with Trea Model Proxy...

REM 直接使用绝对路径执行命令
node "C:\Users\10919\Desktop\AI\skills\trea-model-proxy\index.js" init

REM 启动OpenClaw网关，使用Trea内部模型
openclaw gateway start --trea-internal

echo Done!
