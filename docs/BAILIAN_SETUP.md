# 阿里云百炼 API 配置说明

## 快速开始

### 1. 获取 API Key

访问阿里云百炼控制台创建 API Key：
- 控制台地址：https://bailian.console.aliyun.com/
- API Key 管理：https://bailian.console.aliyun.com/cn-beijing/

**注意**：不同区域的 API Key 是独立的，请确保 API Key 与所选区域匹配。

### 2. 可用区域及 API 端点

| 区域 | 区域代码 | API 端点 |
|------|---------|---------|
| 华北 2（北京） | cn-beijing | https://dashscope.aliyuncs.com/compatible-mode/v1 |
| 新加坡 | ap-southeast-1 | https://dashscope.aliyuncs.com/compatible-mode/v1 |
| 美国（弗吉尼亚） | us-east-1 | https://dashscope.aliyuncs.com/compatible-mode/v1 |

### 3. 配置 .env 文件

在项目根目录的 `.env` 文件中添加：

```bash
# 阿里云百炼 API 配置
ALIBABA_CLOUD_API_KEY=sk-sp-你的 API Key
ALIBABA_CLOUD_REGION=cn-beijing
```

### 4. 配置 LLM 参数

编辑 `configs/llm_config.json`：

```json
{
  "provider": "alibaba-bailian",
  "model_name": "qwen3.5-plus",
  "api_key": "env:ALIBABA_CLOUD_API_KEY",
  "api_base": "https://dashscope.aliyuncs.com/compatible-mode/v1",
  "region": "cn-beijing",
  "require_api_key": true,
  "skip_auth": false,
  "parameters": {
    "temperature": 0.7,
    "top_p": 0.8,
    "max_tokens": 2048
  }
}
```

## 支持的模型

| 模型 | 说明 | 适用场景 |
|------|------|---------|
| qwen3.5-plus | 通义千问 3.5 增强版 | 复杂任务、高质量输出 |
| qwen-plus | 通义千问增强版 | 平衡性能与成本 |
| qwen-max | 通义千问最大版 | 最复杂任务 |
| qwen-turbo | 通义千问极速版 | 快速响应场景 |
| qwen-long | 通义千问长文本版 | 长文本处理 |

## 使用示例

### 基本使用

```javascript
const BailianClient = require('./plugins/bailian-client');

const client = new BailianClient({
  apiKey: 'sk-sp-你的 API Key',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  model: 'qwen3.5-plus',
  region: 'cn-beijing'
});

// 简单对话
const result = await client.simpleChat(
  '你好，请介绍一下自己',
  '你是一个有帮助的 AI 助手'
);

if (result.success) {
  console.log('回复：', result.content);
  console.log('Token 使用：', result.usage);
} else {
  console.error('错误：', result.error);
}
```

### 多轮对话

```javascript
const messages = [
  { role: 'user', content: '什么是人工智能？' },
  { role: 'assistant', content: '人工智能是...' },
  { role: 'user', content: '能举个例子吗？' }
];

const result = await client.chat(messages, {
  model: 'qwen3.5-plus',
  temperature: 0.7,
  top_p: 0.8,
  max_tokens: 2048
});
```

### 高级参数配置

```javascript
const result = await client.chat(messages, {
  model: 'qwen-plus',
  temperature: 0.5,    // 降低随机性，更稳定
  top_p: 0.9,         // 增加多样性
  max_tokens: 4096,   // 更长的输出
  systemPrompt: '你是一个专业的技术顾问，擅长解答技术问题。'
});
```

## 错误排查

### 401 Unauthorized

**错误信息**：Incorrect API key provided

**原因**：
1. API Key 无效或已过期
2. API Key 与区域不匹配
3. API Key 权限不足

**解决方案**：
1. 登录阿里云百炼控制台重新生成 API Key
2. 确认 API Key 所属区域与配置一致
3. 检查账户余额和配额

### 403 Forbidden

**错误信息**：Access denied

**原因**：
1. 账户欠费
2. 模型未开通
3. 区域限制

**解决方案**：
1. 检查账户余额
2. 在控制台开通对应模型
3. 确认区域可用性

### 429 Too Many Requests

**错误信息**：Rate limit exceeded

**原因**：请求频率超限

**解决方案**：
1. 降低请求频率
2. 申请提升配额
3. 使用多个 API Key 轮询

## 测试连接

运行测试脚本验证配置：

```bash
node test-bailian-api.js
```

成功时会显示：
```
✅ API 调用成功！

回复内容：
[模型回复的内容]

使用统计：
{
  "prompt_tokens": 20,
  "completion_tokens": 50,
  "total_tokens": 70
}

使用模型：qwen3.5-plus
```

## 最佳实践

### 1. API Key 安全

- ✅ 将 API Key 存放在 `.env` 文件中
- ✅ 使用环境变量引用，不要硬编码在代码中
- ✅ 将 `.env` 添加到 `.gitignore`
- ❌ 不要将 API Key 提交到版本控制

### 2. 成本控制

- 根据场景选择合适的模型
- 设置合理的 `max_tokens` 限制
- 监控 Token 使用情况
- 使用缓存减少重复调用

### 3. 性能优化

- 复用客户端实例
- 使用连接池
- 实现请求重试机制
- 设置合理的超时时间

## 参考文档

- [阿里云百炼官方文档](https://help.aliyun.com/zh/model-studio/)
- [API 参考](https://help.aliyun.com/zh/model-studio/developer-reference/)
- [错误码说明](https://help.aliyun.com/zh/model-studio/error-code/)
- [计费说明](https://help.aliyun.com/zh/model-studio/pricing/)

## 技术支持

如遇到问题，请查看：
1. 阿里云百炼控制台 - 工单系统
2. 官方文档 - 常见问题
3. 开发者社区 - 技术论坛
