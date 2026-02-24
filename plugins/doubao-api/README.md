# 豆包API集成插件

## 概述

本插件将火山引擎豆包API集成到OpenClaw和EVO系统中，实现多团队协作的AI服务。

### 主要功能

- ✅ 火山引擎豆包API集成
- ✅ 多团队协作支持
- ✅ 多模态能力（文本+图片输入）
- ✅ OpenClaw智能体集成
- ✅ EVO节点集成
- ✅ 团队权限管理
- ✅ 请求缓存
- ✅ 系统状态监控

## 技术架构

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    OpenClaw     │────>│  Doubao API     │────>│  火山引擎豆包   │
│   智能体系统    │     │  集成模块       │     │   API服务       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
          ^                        ^
          │                        │
┌─────────────────┐     ┌─────────────────┐
│      EVO        │────>│  团队权限管理   │
│  进化系统       │     │  与请求处理     │
└─────────────────┘     └─────────────────┘
```

## 快速开始

### 1. 安装依赖

```bash
# 进入插件目录
cd plugins/doubao-api

# 本插件使用Node.js内置模块，无需额外安装依赖
```

### 2. 配置API密钥

编辑 `config.json` 文件，设置你的火山引擎API密钥：

```json
{
  "api": {
    "key": "你的API密钥",
    "endpoint": "https://ark.cn-beijing.volces.com/api/v3/responses",
    "defaultModel": "doubao-seed-2-0-lite-260215"
  }
}
```

### 3. 启动服务

```bash
# 在AI根目录运行
node plugins/doubao-api/start.js
```

### 4. 测试API连接

服务启动后，会自动测试API连接。你也可以手动测试：

```bash
# 测试文本请求
node plugins/doubao-api/test-text.js

# 测试图片请求
node plugins/doubao-api/test-image.js
```

## 团队配置

### 预配置团队

| 团队ID | 团队名称 | 权限 |
|--------|---------|------|
| frontend | 前端团队 | text_input, image_input |
| backend | 后端团队 | text_input |
| design | 设计团队 | text_input, image_input |
| product | 产品团队 | text_input, image_input |

### 添加新团队

编辑 `config.json` 文件，在 `teams` 数组中添加新团队：

```json
"teams": [
  {
    "id": "新团队ID",
    "name": "新团队名称",
    "permissions": ["text_input", "image_input"]
  }
]
```

## API使用

### 文本请求

```javascript
const DoubaoIntegration = require('./plugins/doubao-api/integration');
const integration = new DoubaoIntegration();

// 处理前端团队的文本请求
const response = await integration.handleTeamRequest('frontend', {
    type: 'text',
    content: '前端团队测试请求'
});

console.log(response.response);
```

### 图片请求

```javascript
// 处理设计团队的图片请求
const response = await integration.handleTeamRequest('design', {
    type: 'image',
    imageUrl: '图片URL',
    content: '设计团队测试图片分析'
});

console.log(response.response);
```

## OpenClaw集成

### 智能体配置

在 `config.json` 文件中，OpenClaw集成已默认启用：

```json
"openclaw": {
  "integration": {
    "enabled": true,
    "agentId": "doubao",
    "agentName": "豆包AI",
    "description": "基于火山引擎豆包的多模态AI助手"
  }
}
```

### 使用豆包智能体

```bash
# 通过CLI使用豆包智能体
openclaw agent --agent doubao --message "你好"
```

## EVO集成

### 节点配置

在 `config.json` 文件中，EVO集成已默认启用：

```json
"evo": {
  "integration": {
    "enabled": true,
    "nodeId": "node_doubao_api",
    "capabilities": [
      "multimodal_analysis",
      "image_analysis",
      "text_generation",
      "visual_question_answering"
    ]
  }
}
```

### EVO能力

- **multimodal_analysis**: 多模态分析
- **image_analysis**: 图片分析
- **text_generation**: 文本生成
- **visual_question_answering**: 视觉问答

## 系统状态

启动服务后，可以查看系统状态：

```javascript
const integration = new DoubaoIntegration();
console.log(integration.getStatus());
```

## 故障排除

### 常见问题

1. **API连接失败**
   - 检查API密钥是否正确
   - 检查网络连接
   - 确认火山引擎API服务是否正常

2. **团队权限错误**
   - 检查团队ID是否正确
   - 确认团队是否有相应的权限

3. **图片分析失败**
   - 检查图片URL是否可访问
   - 确认团队是否有图片输入权限

### 日志

服务启动后，所有操作都会在控制台输出日志，便于排查问题。

## 性能优化

- **缓存机制**: 启用请求缓存，减少重复API调用
- **团队权限**: 限制团队权限，避免不必要的API调用
- **错误处理**: 完善的错误处理机制，提高系统稳定性

## 安全注意事项

- **API密钥**: 不要将API密钥提交到版本控制系统
- **权限管理**: 严格控制团队权限，避免滥用API
- **请求限制**: 注意API调用频率限制，避免被限流

## 版本更新

### v1.0.0 (2026-02-24)

- ✅ 初始版本
- ✅ 火山引擎豆包API集成
- ✅ 多团队协作支持
- ✅ OpenClaw智能体集成
- ✅ EVO节点集成
- ✅ 多模态能力支持

## 许可证

MIT License
