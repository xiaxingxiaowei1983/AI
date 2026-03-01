# OpenClaw 配置专家

## 概述

本 SKILL 提供了 OpenClaw 配置 API 和飞书机器人配置的详细指南和最佳实践，帮助用户快速搭建和优化 OpenClaw 环境。

## 配置文件基础

### 配置文件路径
- **全局配置文件**：`~/.openclaw/openclaw.json`（唯一事实来源）
- **项目配置文件**：`项目根目录/openclaw.json`（通常被忽略）

### 配置文件结构

```json
{
  "gateway": {
    "mode": "local",
    "port": 18789,
    "auth": {
      "mode": "token",
      "token": "YOUR_TOKEN"
    }
  },
  "models": {
    "mode": "merge",
    "providers": {
      "custom-doubao": {
        "baseUrl": "https://ark.cn-beijing.volces.com/api/v3",
        "apiKey": "YOUR_API_KEY",
        "api": "openai-completions",
        "models": [
          {
            "id": "ep-xxxxxxxxxxxx",
            "name": "Doubao Model"
          }
        ]
      }
    }
  },
  "agents": {
    "list": [
      {
        "id": "main",
        "workspace": "YOUR_WORKSPACE_PATH"
      }
    ],
    "defaults": {
      "model": "custom-doubao/ep-xxxxxxxxxxxx"
    }
  },
  "plugins": {
    "feishu": {
      "enabled": true
    }
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "mode": "websocket",
      "dmPolicy": "open",
      "allowFrom": ["*"],
      "accounts": {
        "main": {
          "appId": "YOUR_APP_ID",
          "appSecret": "YOUR_APP_SECRET"
        }
      }
    }
  }
}
```

## API 配置指南

### 火山引擎 Doubao 配置

#### 配置步骤
1. **获取 API Key**：在火山引擎控制台创建应用并获取 API Key
2. **创建模型端点**：在火山引擎控制台创建 Doubao 模型端点
3. **配置 custom-doubao 提供商**：
   - `baseUrl`：`https://ark.cn-beijing.volces.com/api/v3`
   - `apiKey`：您的火山引擎 API Key
   - `api`：`openai-completions`（必须使用此 API 映射）
   - `models`：添加您创建的模型端点

#### 常见问题
- **AuthenticationError**：检查 API Key 是否正确，是否有足够的权限
- **模型不可用**：确保模型端点已创建并启用
- **请求超时**：检查网络连接，确保可以访问火山引擎 API

## 飞书机器人配置

### 配置步骤
1. **创建飞书应用**：在飞书开发者平台创建企业自建应用
2. **获取 App ID 和 App Secret**：在应用详情页获取
3. **配置权限**：
   - 消息权限：获取用户消息、发送消息等
   - 事件订阅：配置事件回调地址
4. **配置 channels.feishu**：
   - `enabled`：`true`
   - `mode`：`websocket`
   - `dmPolicy`：`open`（允许任何人发送消息）
   - `allowFrom`：`["*"]`（允许来自任何来源的消息）
   - `accounts`：添加 main 账户，配置 App ID 和 App Secret

### 飞书多账户结构
2026 版的飞书通道严格要求多账户结构，必须使用 `channels.feishu.accounts.main` 格式，不允许将配置拍扁到外层。

## 智能体配置

### 工作区设置
- **工作区路径**：建议指向您的项目目录，如 `C:/Users/用户名/Desktop/AI/agents/master`
- **默认模型**：使用字符串格式，如 `custom-doubao/ep-xxxxxxxxxxxx`，不要使用对象格式

### 智能体管理
- **默认智能体**：`main` 智能体通常作为默认智能体
- **智能体列表**：可以添加多个智能体，每个智能体可以有不同的工作区和配置

## 最佳实践

### 配置管理
1. **版本控制**：将配置文件纳入版本控制，方便回溯和恢复
2. **备份配置**：定期备份配置文件，避免配置丢失
3. **环境变量**：对于敏感信息（如 API Key），考虑使用环境变量

### 性能优化
1. **模型选择**：根据任务类型选择合适的模型
2. **缓存设置**：启用记忆缓存，提高响应速度
3. **资源分配**：合理设置 `maxConcurrent` 和 `subagents.maxConcurrent`

### 安全建议
1. **API Key 保护**：不要在配置文件中硬编码 API Key
2. **网络安全**：使用 `gateway.bind` 限制访问范围
3. **权限管理**：合理设置 `dmPolicy` 和 `allowFrom`，避免未授权访问

## 故障排查

### 常见错误
1. **Invalid config**：检查配置文件格式，确保所有字段正确
2. **Gateway not running**：检查端口是否被占用，尝试重启网关
3. **API 连接失败**：检查 API Key 和网络连接
4. **飞书机器人无响应**：检查 App ID 和 App Secret，确保权限配置正确

### 排查步骤
1. **检查配置**：使用 `openclaw config get` 查看当前配置
2. **诊断问题**：使用 `openclaw doctor` 诊断配置问题
3. **查看日志**：检查网关日志，了解详细错误信息
4. **测试连接**：使用 `openclaw status` 检查系统状态

## 高级配置

### 模型回退机制
可以配置多个模型作为回退，当主模型不可用时自动切换到备用模型：

```json
"agents": {
  "defaults": {
    "model": "custom-doubao/ep-xxxxxxxxxxxx",
    "fallback": [
      "custom-doubao/ep-yyyyyyyyyyyy"
    ]
  }
}
```

### 多通道配置
除了飞书，还可以配置其他通道，如 Slack、Discord 等：

```json
"channels": {
  "feishu": {
    "enabled": true,
    "mode": "websocket",
    "dmPolicy": "open",
    "allowFrom": ["*"],
    "accounts": {
      "main": {
        "appId": "YOUR_APP_ID",
        "appSecret": "YOUR_APP_SECRET"
      }
    }
  },
  "slack": {
    "enabled": true,
    "token": "YOUR_SLACK_TOKEN"
  }
}
```

## 总结

OpenClaw 配置是一个灵活而强大的系统，通过合理配置可以实现多种功能。本 SKILL 提供了配置 API 和飞书机器人的详细指南，帮助用户快速搭建和优化 OpenClaw 环境。

### 关键要点
- **唯一事实来源**：全局配置文件 `~/.openclaw/openclaw.json`
- **API 配置**：使用 `custom-doubao` 提供商和 `openai-completions` API 映射
- **飞书配置**：使用多账户结构 `channels.feishu.accounts.main`
- **智能体配置**：`agents.defaults.model` 使用字符串格式
- **工作区设置**：指向您的项目目录

通过遵循这些最佳实践，您可以搭建一个稳定、高效的 OpenClaw 环境，充分发挥其强大的功能。