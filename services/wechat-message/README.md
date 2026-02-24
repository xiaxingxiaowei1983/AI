# 微信消息监听与自动回复服务

本服务实现微信消息的实时监听、意图识别和自动回复功能，使智能体能够作为用户的数字分身与朋友进行自然的聊天。

## 功能特性

- 微信消息实时监听
- 消息情感分析和意图识别
- 基于用户风格的自动回复生成
- 模拟真实用户的回复延迟
- 对话历史存储和管理
- 可配置的回复风格

## 技术栈

- Node.js
- Express
- Wechaty
- PadLocal
- Redis
- OpenAI API
- Google Cloud Language API (可选)

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
- `OPENAI_API_KEY`: OpenAI API密钥，用于生成回复
- `GOOGLE_APPLICATION_CREDENTIALS`: Google Cloud凭证文件路径（可选，用于情感分析）
- `REDIS_URL`: Redis连接地址
- `PORT`: 服务器端口

### 3. 启动Redis

本服务依赖Redis存储对话历史和用户风格信息，请确保Redis服务已启动：

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

#### 启动消息机器人

```bash
POST http://localhost:3002/api/message/start
```

响应：
```json
{
  "message": "微信消息机器人已启动"
}
```

#### 获取登录状态

```bash
GET http://localhost:3002/api/message/status
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

#### 配置回复风格

```bash
POST http://localhost:3002/api/message/style
Content-Type: application/json

{
  "senderName": "朋友名称",
  "style": {
    "tone": "friendly",
    "formality": "casual",
    "responseLength": "medium",
    "interests": ["科技", "旅行", "美食"]
  }
}
```

响应：
```json
{
  "message": "回复风格已配置"
}
```

#### 获取对话历史

```bash
GET http://localhost:3002/api/message/history
```

响应：
```json
{
  "conversations": [
    {
      "timestamp": "2026-02-23T12:00:00Z",
      "sender": {
        "id": "wxid_xxxxxxxxxxxxxx",
        "name": "朋友名称"
      },
      "message": "你好！最近怎么样？",
      "reply": "我很好，谢谢关心！最近在忙一个新项目，很有意思。"
    }
  ]
}
```

#### 健康检查

```bash
GET http://localhost:3002/health
```

响应：
```json
{
  "status": "ok"
}
```

## 工作原理

1. **消息监听**：使用Wechaty和PadLocal实时监听微信消息
2. **消息分析**：使用Google Cloud Language API分析消息情感和提取关键词
3. **意图识别**：基于关键词和消息内容识别用户意图
4. **回复生成**：使用OpenAI API生成符合用户风格的回复
5. **延迟发送**：模拟真实用户的回复延迟，使回复更加自然
6. **历史存储**：将对话历史存储到Redis，用于后续分析和优化

## 注意事项

1. **微信账号安全**：使用此服务可能存在微信账号被限制的风险，请谨慎使用
2. **API费用**：使用OpenAI API和Google Cloud Language API会产生费用
3. **回复质量**：回复质量取决于训练数据和API模型的能力
4. **延迟设置**：默认回复延迟为1-5秒，可根据需要调整

## 故障排除

### 1. 无法启动服务

- 检查Node.js版本（推荐14+）
- 检查Redis服务是否启动
- 检查PadLocal令牌是否有效
- 检查OpenAI API密钥是否正确

### 2. 消息处理失败

- 检查网络连接
- 检查API密钥权限
- 查看日志文件了解具体错误

### 3. 回复质量不佳

- 调整OpenAI提示词
- 配置更详细的用户风格
- 提供更多的训练数据

## 许可证

MIT
