# 微信授权服务

本服务实现微信账号的授权管理，使用Wechaty和PadLocal实现微信登录和会话管理。

## 功能特性

- 微信扫码登录
- 会话状态管理
- JWT令牌生成
- Redis存储登录信息
- 完整的API接口

## 技术栈

- Node.js
- Express
- Wechaty
- PadLocal
- Redis
- JWT

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env` 文件并填写必要的配置：

```bash
cp .env .env.local
```

主要配置项：

- `PADLOCAL_TOKEN`: PadLocal令牌，需要从[PadLocal官网](https://padlocal.com/)申请
- `JWT_SECRET`: JWT密钥，用于生成令牌
- `REDIS_URL`: Redis连接地址
- `PORT`: 服务器端口

### 3. 启动Redis

本服务依赖Redis存储会话信息，请确保Redis服务已启动：

```bash
# Windows
redis-server.exe

# Linux/Mac
redis-server
```

### 4. 启动服务

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

### 5. 使用API

#### 获取登录二维码

```bash
GET http://localhost:3001/api/wechat/login
```

响应：
```json
{
  "message": "微信机器人已启动，请扫描终端中的二维码登录"
}
```

#### 获取登录状态

```bash
GET http://localhost:3001/api/wechat/status
```

响应：
```json
{
  "loggedIn": true,
  "user": {
    "userId": "wxid_xxxxxxxxxxxxxx",
    "name": "用户名",
    "loginTime": "2026-02-23T12:00:00Z"
  }
}
```

#### 登出

```bash
POST http://localhost:3001/api/wechat/logout
```

响应：
```json
{
  "message": "登出成功"
}
```

#### 健康检查

```bash
GET http://localhost:3001/health
```

响应：
```json
{
  "status": "ok"
}
```

## 注意事项

1. **PadLocal令牌**：需要从PadLocal官网申请，有免费额度和付费方案
2. **微信账号安全**：使用此服务可能存在微信账号被限制的风险，请谨慎使用
3. **会话管理**：登录状态存储在Redis中，有效期为7天
4. **错误处理**：服务会自动处理常见错误，但请确保网络连接稳定

## 故障排除

### 1. 无法启动服务

- 检查Node.js版本（推荐14+）
- 检查Redis服务是否启动
- 检查PadLocal令牌是否有效

### 2. 登录失败

- 检查网络连接
- 检查PadLocal令牌权限
- 尝试重新启动服务

### 3. 会话过期

- 检查Redis服务状态
- 检查登录信息是否正确存储
- 尝试重新登录

## 许可证

MIT
