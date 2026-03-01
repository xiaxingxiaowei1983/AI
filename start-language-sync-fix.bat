@echo off

REM OpenClaw 语言设置同步修复启动脚本
REM 解决语言设置不同步问题

echo 🚀 启动 OpenClaw 语言设置同步修复工具...
echo 🌐 请在浏览器中访问:
echo http://localhost:8887
echo 
echo 🔧 按照页面提示操作即可完成修复
echo 
echo 📖 修复完成后，重启 OpenClaw 即可看到中文界面

echo 正在启动修复服务器...
node "C:\Users\10919\Desktop\AI\fix-openclaw-language-sync.js"

pause
