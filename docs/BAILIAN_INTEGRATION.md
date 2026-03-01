# 阿里云百炼 API 集成指南

## 概述

本文档说明如何在谛听智能体系统中集成阿里云百炼 API，替换现有的 API 连接。

## 已完成的工作

### 1. 创建的文件

- ✅ `plugins/bailian-client.js` - 阿里云百炼 API 客户端
- ✅ `docs/BAILIAN_SETUP.md` - 配置说明文档
- ✅ `examples/bailian-examples.js` - 使用示例

### 2. 更新的配置

- ✅ `.env` - 添加阿里云 API Key 配置
- ✅ `configs/llm_config.json` - 更新 LLM 提供者为阿里云百炼

## 集成方式

### 方式 1: 直接使用客户端

```javascript
const BailianClient = require('./plugins/bailian-client');

const client = new BailianClient();

const result = await client.simpleChat(
  '你好',
  '你是一个有帮助的助手'
);

console.log(result.content);
```

### 方式 2: 集成到现有能力系统

参考 `evolver/capabilities/network-capability.js` 的模式，创建 LLM 调用能力：

```javascript
// evolver/capabilities/llm-capability.js
const BailianClient = require('../../plugins/bailian-client');

class LLMCapability {
  constructor() {
    this.client = new BailianClient();
    this.capabilities = this.loadCapabilities();
  }

  loadCapabilities() {
    return {
      version: '1.0',
      category: 'llm',
      description: '阿里云百炼 LLM 调用能力',
      capabilities: [
        {
          id: 'llm_chat',
          name: 'LLM Chat',
          type: 'ai_operation',
          description: '调用阿里云百炼大模型进行对话',
          inputs: [
            { name: 'messages', type: 'array', description: '对话消息列表', required: true },
            { name: 'model', type: 'string', description: '模型名称', required: false, default: 'qwen3.5-plus' },
            { name: 'systemPrompt', type: 'string', description: '系统提示词', required: false },
            { name: 'temperature', type: 'number', description: '温度参数', required: false, default: 0.7 }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: '是否成功' },
            { name: 'content', type: 'string', description: '模型回复内容' },
            { name: 'usage', type: 'object', description: 'Token 使用统计' }
          ]
        }
      ]
    };
  }

  async executeCapability(capabilityId, params) {
    if (capabilityId === 'llm_chat') {
      return this.chat(params);
    }
    throw new Error(`Unknown capability: ${capabilityId}`);
  }

  async chat(params) {
    const { messages, model, systemPrompt, temperature } = params;
    
    return this.client.chat(messages, {
      model,
      systemPrompt,
      temperature
    });
  }
}

module.exports = LLMCapability;
```

### 方式 3: 替换现有 API 调用

如果系统中有现有的 LLM 调用代码，可以直接替换：

**原代码：**
```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages
  })
});
```

**替换为：**
```javascript
const BailianClient = require('./plugins/bailian-client');
const client = new BailianClient();

const result = await client.chat(messages, {
  model: 'qwen3.5-plus'
});

if (result.success) {
  // 使用 result.content
}
```

## 配置切换

### 开发环境（使用阿里云百炼）

`.env.development`:
```bash
ALIBABA_CLOUD_API_KEY=sk-sp-你的 API Key
ALIBABA_CLOUD_REGION=cn-beijing
LLM_PROVIDER=alibaba-bailian
```

### 生产环境（可配置多个 Provider）

`.env.production`:
```bash
# 主 Provider
LLM_PROVIDER=alibaba-bailian
ALIBABA_CLOUD_API_KEY=sk-sp-生产 API Key

# 备用 Provider
BACKUP_LLM_PROVIDER=openai
OPENAI_API_KEY=sk-备用 Key
```

## 使用场景

### 1. 智能体对话

```javascript
const client = new BailianClient({ model: 'qwen3.5-plus' });

const agentResponse = await client.chat([
  { role: 'system', content: '你是一个专业的客服助手' },
  { role: 'user', content: '用户的问题...' }
]);
```

### 2. 内容生成

```javascript
const client = new BailianClient({ model: 'qwen-plus' });

const article = await client.simpleChat(
  '写一篇关于 AI 发展的文章',
  '你是一个资深科技作者'
);
```

### 3. 数据分析

```javascript
const client = new BailianClient({ model: 'qwen-max' });

const analysis = await client.simpleChat(
  '分析以下数据：[数据内容]',
  '你是一个数据分析师'
);
```

### 4. 代码辅助

```javascript
const client = new BailianClient({ model: 'qwen3.5-plus' });

const code = await client.simpleChat(
  '实现一个快速排序',
  '你是一个资深软件工程师'
);
```

## 性能优化

### 1. 客户端复用

```javascript
// ❌ 不推荐：每次创建新实例
async function chat(message) {
  const client = new BailianClient();
  return client.simpleChat(message);
}

// ✅ 推荐：单例模式
const llmClient = new BailianClient();
async function chat(message) {
  return llmClient.simpleChat(message);
}
```

### 2. 连接池

```javascript
const clients = [
  new BailianClient({ apiKey: 'key1' }),
  new BailianClient({ apiKey: 'key2' }),
  new BailianClient({ apiKey: 'key3' })
];

let currentIndex = 0;

async function loadBalancedChat(message) {
  const client = clients[currentIndex];
  currentIndex = (currentIndex + 1) % clients.length;
  return client.simpleChat(message);
}
```

### 3. 缓存机制

```javascript
const cache = new Map();

async function cachedChat(prompt) {
  const cacheKey = prompt;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const result = await client.simpleChat(prompt);
  cache.set(cacheKey, result);
  
  return result;
}
```

## 监控与日志

### 1. Token 使用监控

```javascript
const result = await client.chat(messages);

if (result.success) {
  console.log('Token 使用统计:', {
    prompt: result.usage.prompt_tokens,
    completion: result.usage.completion_tokens,
    total: result.usage.total_tokens
  });
}
```

### 2. 错误监控

```javascript
const result = await client.chat(messages);

if (!result.success) {
  // 记录错误
  console.error('LLM 调用失败:', {
    error: result.error,
    statusCode: result.statusCode,
    timestamp: new Date().toISOString()
  });
  
  // 发送告警
  await sendAlert('LLM API Error', result.error);
}
```

## 安全建议

### 1. API Key 管理

- 使用环境变量存储 API Key
- 定期轮换 API Key
- 为不同环境使用不同的 API Key
- 限制 API Key 的权限范围

### 2. 输入验证

```javascript
async function safeChat(messages) {
  // 验证消息格式
  if (!Array.isArray(messages)) {
    throw new Error('Messages must be an array');
  }
  
  // 验证消息内容
  for (const msg of messages) {
    if (!msg.role || !msg.content) {
      throw new Error('Invalid message format');
    }
    
    // 检查敏感内容
    if (containsSensitiveInfo(msg.content)) {
      throw new Error('Message contains sensitive information');
    }
  }
  
  return client.chat(messages);
}
```

### 3. 输出过滤

```javascript
const result = await client.chat(messages);

if (result.success) {
  // 过滤敏感内容
  const filteredContent = filterSensitiveContent(result.content);
  return filteredContent;
}
```

## 测试

### 单元测试

```javascript
const assert = require('assert');
const BailianClient = require('./plugins/bailian-client');

describe('BailianClient', () => {
  it('should initialize with API key', () => {
    const client = new BailianClient({ apiKey: 'test-key' });
    assert.strictEqual(client.apiKey, 'test-key');
  });
  
  it('should throw error without API key', () => {
    assert.throws(() => new BailianClient());
  });
});
```

### 集成测试

```javascript
const client = new BailianClient();

async function testConnection() {
  const result = await client.simpleChat('你好', '助手');
  assert.strictEqual(result.success, true);
  assert.ok(result.content);
}
```

## 故障排查

### 常见问题

1. **401 错误**：检查 API Key 是否正确
2. **403 错误**：检查账户余额和权限
3. **429 错误**：降低请求频率
4. **500 错误**：稍后重试或联系技术支持

### 调试技巧

```javascript
// 启用详细日志
const client = new BailianClient({ debug: true });

// 捕获原始响应
const result = await client.chat(messages, { rawResponse: true });
console.log('原始响应:', result.raw);
```

## 下一步

1. 获取有效的 API Key（当前 API Key 返回 401 错误）
2. 运行测试：`node test-bailian-api.js`
3. 根据业务需求调整参数
4. 集成到现有系统
5. 部署并监控

## 参考资源

- [配置说明](../docs/BAILIAN_SETUP.md)
- [使用示例](../examples/bailian-examples.js)
- [官方文档](https://help.aliyun.com/zh/model-studio/)
