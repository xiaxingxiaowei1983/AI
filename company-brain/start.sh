#!/bin/bash

# 启动公司大脑脚本

echo "🚀 启动公司大脑..."

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 14.0.0 或更高版本"
    exit 1
fi

# 检查依赖是否已安装
if [ ! -d "node_modules" ]; then
    echo "🔧 安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
fi

# 启动公司大脑
echo "🚀 启动公司大脑服务..."
npm start
