# 启动OpenClaw并自动加载Trea Model Proxy SKILL
Write-Host "🚀 启动OpenClaw并加载Trea Model Proxy SKILL..."

# 导航到工作目录
cd "C:\Users\10919\Desktop\AI"

# 初始化Trea Model Proxy SKILL
Write-Host "🧠 初始化Trea Model Proxy SKILL..."
cd "C:\Users\10919\Desktop\AI\skills\trea-model-proxy"
node index.js init

# 导航回工作目录
cd "C:\Users\10919\Desktop\AI"

# 启动OpenClaw网关，使用Trea内部模型
Write-Host "🌐 启动OpenClaw网关..."
openclaw gateway start --trea-internal

Write-Host "OpenClaw和Trea Model Proxy SKILL启动完成！"
Write-Host "服务现在可以通过 http://localhost:18789 访问"
