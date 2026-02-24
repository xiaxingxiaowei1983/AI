# 微信朋友圈自动化发布服务

本服务实现微信朋友圈的自动化发布功能，包括内容生成、定时发布、图片处理和效果分析，使智能体能够作为用户的数字分身自主管理朋友圈内容。

## 功能特性

- 朋友圈内容自动生成
- 图片自动生成和处理
- 定时发布功能
- 发布历史记录
- 可配置的发布风格
- 发布效果分析

## 技术栈

- Node.js
- Express
- Wechaty
- PadLocal
- Redis
- OpenAI API (GPT-3.5-turbo, DALL-E 3)
- node-schedule
- sharp (图像处理)

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
- `OPENAI_API_KEY`: OpenAI API密钥，用于生成内容和图片
- `REDIS_URL`: Redis连接地址
- `PORT`: 服务器端口

### 3. 启动Redis

本服务依赖Redis存储发布任务和历史记录，请确保Redis服务已启动：

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

#### 启动朋友圈机器人

```bash
POST http://localhost:3003/api/moments/start
```

响应：
```json
{
  "message": "微信朋友圈机器人已启动"
}
```

#### 获取登录状态

```bash
GET http://localhost:3003/api/moments/status
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

#### 生成朋友圈内容

```bash
POST http://localhost:3003/api/moments/generate
Content-Type: application/json

{
  "topic": "周末旅行",
  "generateImage": true
}
```

响应：
```json
{
  "content": "周末去了趟郊外，空气特别好，心情也跟着明朗起来。沿途的风景美不胜收，真的很治愈。有时候慢下来，才能发现生活中的小确幸。",
  "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-xxx/user-xxx/img-xxx.png"
}
```

#### 发布朋友圈

```bash
POST http://localhost:3003/api/moments/publish
Content-Type: application/json

{
  "content": "周末去了趟郊外，空气特别好，心情也跟着明朗起来。沿途的风景美不胜收，真的很治愈。有时候慢下来，才能发现生活中的小确幸。",
  "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-xxx/user-xxx/img-xxx.png",
  "scheduleTime": "2026-02-24T09:00:00Z"
}
```

响应：
```json
{
  "message": "朋友圈发布任务已调度",
  "jobId": "job_1234567890"
}
```

#### 配置发布风格

```bash
POST http://localhost:3003/api/moments/style
Content-Type: application/json

{
  "style": {
    "tone": "friendly",
    "formality": "casual",
    "contentLength": "medium",
    "interests": ["旅行", "美食", "科技", "生活"]
  }
}
```

响应：
```json
{
  "message": "发布风格已配置"
}
```

#### 获取发布历史

```bash
GET http://localhost:3003/api/moments/history
```

响应：
```json
{
  "moments": [
    {
      "id": "moment_1234567890",
      "timestamp": "2026-02-23T12:00:00Z",
      "content": "周末去了趟郊外，空气特别好，心情也跟着明朗起来。",
      "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-xxx/user-xxx/img-xxx.png",
      "status": "published"
    }
  ]
}
```

#### 获取调度任务

```bash
GET http://localhost:3003/api/moments/scheduled
```

响应：
```json
{
  "jobs": [
    {
      "id": "job_1234567890",
      "scheduleTime": "2026-02-24T09:00:00Z",
      "content": "周末去了趟郊外，空气特别好，心情也跟着明朗起来。",
      "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-xxx/user-xxx/img-xxx.png"
    }
  ]
}
```

#### 取消调度任务

```bash
POST http://localhost:3003/api/moments/cancel
Content-Type: application/json

{
  "jobId": "job_1234567890"
}
```

响应：
```json
{
  "message": "发布任务已取消"
}
```

#### 健康检查

```bash
GET http://localhost:3003/health
```

响应：
```json
{
  "status": "ok"
}
```

## 工作原理

1. **内容生成**：使用OpenAI GPT-3.5-turbo生成符合用户风格的朋友圈内容
2. **图片生成**：使用OpenAI DALL-E 3生成相关图片
3. **图片处理**：使用sharp库处理图片尺寸和质量
4. **定时发布**：使用node-schedule调度发布任务
5. **历史记录**：将发布历史存储到Redis
6. **效果分析**：基于发布历史分析发布效果

## 注意事项

1. **微信账号安全**：使用此服务可能存在微信账号被限制的风险，请谨慎使用
2. **API费用**：使用OpenAI API会产生费用，特别是生成图片
3. **发布频率**：建议控制发布频率，避免被微信判定为异常行为
4. **内容质量**：生成的内容质量取决于训练数据和API模型的能力

## 故障排除

### 1. 无法启动服务

- 检查Node.js版本（推荐14+）
- 检查Redis服务是否启动
- 检查PadLocal令牌是否有效
- 检查OpenAI API密钥是否正确

### 2. 发布失败

- 检查网络连接
- 检查微信登录状态
- 检查图片URL是否有效
- 查看日志文件了解具体错误

### 3. 内容质量不佳

- 调整发布风格配置
- 提供更详细的主题描述
- 调整OpenAI提示词

## 许可证

MIT
