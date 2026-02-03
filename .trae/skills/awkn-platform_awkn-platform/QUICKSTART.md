# AWKN认知觉醒平台 - 快速开始指南

本指南帮助您在5分钟内快速启动AWKN平台。

## 🚀 一键启动（Docker Compose）

### 前置要求

- Docker 20.10+
- Docker Compose 2.0+

### 启动步骤

```bash
# 1. 克隆项目
git clone <repository-url>
cd awkn-platform

# 2. 配置环境变量
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# 3. 一键启动所有服务
docker-compose up -d

# 4. 查看服务状态
docker-compose ps

# 5. 查看日志
docker-compose logs -f
```

### 访问应用

- **前端**: http://localhost:3000
- **后端API**: http://localhost:4000
- **MongoDB**: localhost:27017

### 停止服务

```bash
docker-compose down
```

---

## 💻 本地开发环境

### 前置要求

- Node.js 18+
- MongoDB 5.0+
- npm 9+

### 启动步骤

```bash
# 1. 安装依赖
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# 2. 配置环境变量
cp frontend/.env.local.example frontend/.env.local
cp backend/.env.example backend/.env

# 3. 启动MongoDB
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# 从MongoDB官网下载安装后启动

# 4. 启动后端（新开一个终端）
cd backend
npm run dev

# 5. 启动前端（新开一个终端）
cd frontend
npm run dev
```

### 访问应用

- **前端**: http://localhost:3000
- **后端API**: http://localhost:4000

---

## 📦 部署到生产环境

详细的部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🔧 常用命令

### Docker Compose

```bash
# 启动所有服务
docker-compose up -d

# 停止所有服务
docker-compose down

# 重启服务
docker-compose restart

# 查看日志
docker-compose logs -f

# 重新构建镜像
docker-compose build --no-cache

# 查看服务状态
docker-compose ps

# 进入容器
docker-compose exec backend sh
docker-compose exec frontend sh
```

### PM2（生产环境）

```bash
# 启动服务
pm2 start backend/src/server.js --name awkn-backend
pm2 start npm --name awkn-frontend -- start --prefix frontend

# 查看状态
pm2 status

# 查看日志
pm2 logs

# 重启服务
pm2 restart awkn-backend
pm2 restart awkn-frontend

# 停止服务
pm2 stop awkn-backend awkn-frontend

# 删除服务
pm2 delete awkn-backend awkn-frontend
```

---

## 🐛 故障排除

### MongoDB连接失败

```bash
# 检查MongoDB状态
# macOS
brew services list

# Linux
sudo systemctl status mongod

# 重启MongoDB
# macOS
brew services restart mongodb-community

# Linux
sudo systemctl restart mongod
```

### 端口被占用

```bash
# 查找占用端口的进程
lsof -i :3000
lsof -i :4000

# 停止进程
kill -9 <PID>
```

### Docker容器无法启动

```bash
# 查看容器日志
docker logs awkn-backend
docker logs awkn-frontend

# 重新构建
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### 前端构建失败

```bash
# 清除缓存
cd frontend
rm -rf .next node_modules
npm install
npm run build
```

---

## 📚 更多文档

- [完整部署指南](./DEPLOYMENT.md)
- [项目说明](./README.md)
- [API文档](./backend/API.md)（如果存在）

---

## 🆘 获取帮助

如遇到问题，请：

1. 查看上述故障排除部分
2. 阅读 [DEPLOYMENT.md](./DEPLOYMENT.md) 详细文档
3. 提交GitHub Issue
4. 联系技术支持：support@awkn.com

---

**祝您使用愉快！** 🎉
