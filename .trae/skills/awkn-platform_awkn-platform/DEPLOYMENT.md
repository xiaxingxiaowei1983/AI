# AWKN认知觉醒平台 - 部署指南

本文档提供了AWKN平台的完整部署指南，包括开发环境搭建、生产部署、Docker容器化部署等多种方式。

## 目录

- [系统要求](#系统要求)
- [快速开始](#快速开始)
- [开发环境搭建](#开发环境搭建)
- [生产环境部署](#生产环境部署)
- [Docker部署](#docker部署)
- [环境变量配置](#环境变量配置)
- [常见问题](#常见问题)
- [维护指南](#维护指南)

---

## 系统要求

### 最低配置

- **操作系统**: Linux / macOS / Windows (WSL2)
- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **MongoDB**: >= 5.0
- **内存**: 最低 4GB RAM（推荐 8GB+）
- **磁盘**: 最低 20GB 可用空间

### 推荐配置

- **操作系统**: Ubuntu 22.04 LTS 或 macOS Ventura+
- **Node.js**: 20.x LTS
- **npm**: 10.x
- **MongoDB**: 6.0+
- **内存**: 8GB RAM
- **磁盘**: 50GB SSD
- **CPU**: 4核心+

---

## 快速开始

### 使用Docker Compose（推荐）

最简单的部署方式是使用Docker Compose，它会自动配置所有服务。

```bash
# 1. 克隆项目
git clone <repository-url>
cd awkn-platform

# 2. 创建环境变量文件
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# 3. 启动所有服务
docker-compose up -d

# 4. 访问应用
# 前端: http://localhost:3000
# 后端: http://localhost:4000
```

### 查看服务状态

```bash
docker-compose ps
```

### 停止服务

```bash
docker-compose down
```

---

## 开发环境搭建

### 1. 安装依赖

#### 安装Node.js

推荐使用nvm安装Node.js：

```bash
# 安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重启终端或运行
source ~/.bashrc

# 安装Node.js 20
nvm install 20
nvm use 20
```

#### 安装MongoDB

**Ubuntu/Debian:**

```bash
# 导入MongoDB公钥
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# 添加MongoDB仓库
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# 更新包列表并安装
sudo apt-get update
sudo apt-get install -y mongodb-org

# 启动MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

**macOS:**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**

从 [MongoDB官网](https://www.mongodb.com/try/download/community) 下载并安装。

### 2. 配置项目

```bash
# 克隆项目
git clone <repository-url>
cd awkn-platform

# 安装根依赖
npm install

# 安装前端依赖
cd frontend
npm install
cd ..

# 安装后端依赖
cd backend
npm install
cd ..
```

### 3. 配置环境变量

#### 前端环境变量

```bash
cd frontend
cp .env.local.example .env.local
```

编辑 `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=AWKN
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 后端环境变量

```bash
cd backend
cp .env.example .env
```

编辑 `backend/.env`:

```env
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/awkn
JWT_SECRET=your-secret-key-change-in-production
```

### 4. 启动开发服务器

#### 启动MongoDB

确保MongoDB正在运行：

```bash
# Linux/macOS
sudo systemctl status mongod

# 或使用brew
brew services list
```

#### 启动后端服务

```bash
cd backend
npm run dev
```

后端服务将在 http://localhost:4000 启动。

#### 启动前端服务

新开一个终端窗口：

```bash
cd frontend
npm run dev
```

前端服务将在 http://localhost:3000 启动。

---

## 生产环境部署

### 使用PM2部署（推荐）

#### 1. 安装PM2

```bash
npm install -g pm2
```

#### 2. 配置环境变量

编辑 `backend/.env` 设置生产环境变量：

```env
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://your-domain.com
MONGODB_URI=mongodb://user:password@localhost:27017/awkn
JWT_SECRET=your-strong-secret-key
```

#### 3. 构建前端

```bash
cd frontend
npm run build
```

#### 4. 启动服务

**启动后端:**

```bash
cd backend
pm2 start src/server.js --name awkn-backend
```

**启动前端:**

```bash
cd frontend
pm2 start npm --name awkn-frontend -- start
```

#### 5. 设置开机自启动

```bash
pm2 startup
pm2 save
```

#### 6. 使用Nginx反向代理

创建Nginx配置文件 `/etc/nginx/sites-available/awkn`:

```nginx
# 前端服务
upstream frontend {
    server 127.0.0.1:3000;
}

# 后端服务
upstream backend {
    server 127.0.0.1:4000;
}

# 前端配置
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 后端API代理
    location /api/ {
        proxy_pass http://backend/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/awkn /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 7. 配置SSL证书（使用Let's Encrypt）

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Docker部署

### 单独部署后端

```bash
cd backend

# 构建镜像
docker build -t awkn-backend .

# 运行容器
docker run -d \
  --name awkn-backend \
  -p 4000:4000 \
  --env-file .env \
  awkn-backend
```

### 单独部署前端

```bash
cd frontend

# 构建镜像
docker build -t awkn-frontend .

# 运行容器
docker run -d \
  --name awkn-frontend \
  -p 3000:3000 \
  --env-file .env.local \
  awkn-frontend
```

### 使用Docker Compose部署完整系统

已在上文 [快速开始](#快速开始) 中说明。

### Docker Compose环境变量

创建 `.env` 文件在项目根目录：

```env
# 应用配置
NODE_ENV=production
JWT_SECRET=your-jwt-secret-key
FRONTEND_URL=https://your-domain.com
API_URL=https://your-domain.com/api

# MongoDB配置
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=strong-password-here
MONGO_INITDB_DATABASE=awkn
```

---

## 环境变量配置

### 前端环境变量 (frontend/.env.local)

```env
# API配置
NEXT_PUBLIC_API_URL=https://your-domain.com/api

# 应用配置
NEXT_PUBLIC_APP_NAME=AWKN
NEXT_PUBLIC_APP_URL=https://your-domain.com

# 功能配置
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_SENTRY=false
```

### 后端环境变量 (backend/.env)

```env
# 服务器配置
NODE_ENV=production
PORT=4000

# 前端URL
FRONTEND_URL=https://your-domain.com

# 数据库配置
MONGODB_URI=mongodb://admin:password@localhost:27017/awkn?authSource=admin

# JWT密钥（必须修改！）
JWT_SECRET=your-super-secret-jwt-key-change-this

# AI服务配置（可选）
OPENAI_API_KEY=sk-...
STABLE_DIFFUSION_API_KEY=your-key

# 文件存储（可选）
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=awkn-uploads

# 速率限制
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 常见问题

### 1. MongoDB连接失败

**问题**: `MongoServerError: Authentication failed`

**解决方案**:
- 检查MongoDB连接字符串是否正确
- 确认用户名和密码正确
- 检查数据库是否已创建

### 2. 前端无法连接后端

**问题**: `Network Error` 或 `ECONNREFUSED`

**解决方案**:
- 检查后端服务是否正在运行
- 确认 `NEXT_PUBLIC_API_URL` 配置正确
- 检查防火墙设置
- 确认Nginx配置正确（如果使用Nginx）

### 3. Docker容器启动失败

**问题**: 容器无法启动或立即退出

**解决方案**:
```bash
# 查看容器日志
docker logs awkn-backend
docker logs awkn-frontend

# 检查环境变量
docker exec awkn-backend env

# 重新构建镜像
docker-compose build --no-cache
docker-compose up -d
```

### 4. 端口被占用

**问题**: `Error: listen EADDRINUSE: address already in use`

**解决方案**:
```bash
# 查找占用端口的进程
lsof -i :3000
lsof -i :4000

# 停止进程
kill -9 <PID>

# 或修改端口配置
```

### 5. 内存不足

**问题**: `JavaScript heap out of memory`

**解决方案**:
```bash
# 增加Node.js内存限制
export NODE_OPTIONS="--max-old-space-size=4096"

# 在package.json中配置
"scripts": {
  "start": "node --max-old-space-size=4096 src/server.js"
}
```

---

## 维护指南

### 日志管理

```bash
# 使用PM2查看日志
pm2 logs awkn-backend
pm2 logs awkn-frontend

# Docker查看日志
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 数据库备份

```bash
# 备份MongoDB
mongodump --host localhost --port 27017 --username admin --password --out /backup/mongodb

# 恢复MongoDB
mongorestore --host localhost --port 27017 --username admin --password /backup/mongodb
```

### 监控服务状态

```bash
# PM2状态
pm2 status
pm2 monit

# Docker状态
docker-compose ps
docker stats
```

### 更新部署

```bash
# 拉取最新代码
git pull origin main

# 重新构建
docker-compose build

# 重启服务
docker-compose down
docker-compose up -d
```

### 性能优化

1. **启用Gzip压缩**
2. **配置CDN**（使用阿里云CDN、CloudFlare等）
3. **数据库索引优化**
4. **启用Redis缓存**（可选）
5. **负载均衡**（多实例部署）

---

## 安全建议

1. **修改默认密码**
   - 修改JWT_SECRET
   - 修改MongoDB密码
   - 修改所有API密钥

2. **启用HTTPS**
   - 使用Let's Encrypt免费SSL证书
   - 强制HTTPS重定向

3. **防火墙配置**
   - 只开放必要端口（80, 443, 22）
   - 限制数据库访问

4. **定期备份**
   - 数据库每日备份
   - 代码版本控制

5. **监控告警**
   - 配置服务监控
   - 设置异常告警

---

## 联系支持

如有部署问题，请联系：
- 技术支持邮箱: support@awkn.com
- GitHub Issues: <repository-url>/issues

---

**祝您部署顺利！**
