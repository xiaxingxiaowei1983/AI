#!/bin/bash

# AWKN平台启动脚本

set -e

echo "🚀 AWKN认知觉醒平台启动脚本"
echo "================================"

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装，请先安装Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

# 检查环境变量文件
if [ ! -f "backend/.env" ]; then
    echo "📝 创建后端环境变量文件..."
    cp backend/.env.example backend/.env
    echo "✅ 后端环境变量文件已创建: backend/.env"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "📝 创建前端环境变量文件..."
    cp frontend/.env.local.example frontend/.env.local
    echo "✅ 前端环境变量文件已创建: frontend/.env.local"
fi

# 启动服务
echo "🐳 启动Docker容器..."
docker-compose up -d

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo ""
echo "📊 服务状态："
docker-compose ps

echo ""
echo "✅ 启动完成！"
echo ""
echo "📍 访问地址："
echo "   - 前端: http://localhost:3000"
echo "   - 后端: http://localhost:4000"
echo ""
echo "📋 查看日志: docker-compose logs -f"
echo "🛑 停止服务: docker-compose down"
echo ""
