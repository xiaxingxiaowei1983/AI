# 微信机器人启动脚本
# 使用绿茶智能体进行微信操作

Write-Host "=== 微信机器人启动脚本 ==="
Write-Host "使用绿茶智能体进行微信操作"

# 进入项目目录
Write-Host "进入项目目录..."
cd "C:\Users\10919\Desktop\AI\chatgpt-on-wechat-master"

# 检查依赖是否安装
Write-Host "检查项目依赖..."
if (-not (Test-Path "venv")) {
    Write-Host "未找到虚拟环境，正在创建..."
    python -m venv venv
    Write-Host "虚拟环境已创建"
}

# 激活虚拟环境
Write-Host "激活虚拟环境..."
.\venv\Scripts\Activate.ps1

# 安装依赖
Write-Host "安装项目依赖..."
pip install -r requirements.txt
pip install -r requirements-optional.txt

Write-Host "依赖安装完成"

# 启动微信机器人
Write-Host "启动微信机器人..."
Write-Host "正在启动wechat通道..."
Write-Host "请扫描二维码登录微信账号"
python app.py

Write-Host "微信机器人已启动"