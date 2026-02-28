# OpenClaw 场景化智能切换模型使用指南

## 功能概述

OpenClaw 现在支持**场景化智能切换模型**功能，能够根据不同场景自动选择合适的 AI 模型：

- **外部集成场景**（飞书/微信机器人）→ 自动使用豆包 API
- **多智能体对话场景**（团队/智能体互聊）→ 自动使用豆包 API
- **单智能体本地场景** → 自动使用 Trae 内置模型
- **深度思考场景** → 自动使用 Trae 内置模型

## 核心文件

- **scene-detector.js** - 场景检测核心模块
- **start-auto.js** - 自动切换启动脚本
- **openclaw-doubao.json** - 豆包 API 配置
- **openclaw-trea.json** - Trae 内置模型配置

## 快速开始

### 1. 启动自动切换模式

```bash
# 启动 OpenClaw，系统会自动识别场景并切换模型
node start-auto.js
```

### 2. 手动指定模型（兜底机制）

```bash
# 强制使用 Trae 内置模型
node start-auto.js trea

# 强制使用豆包 API 模型
node start-auto.js doubao
```

## 场景识别规则

### 1. 外部集成场景

- **识别方式**：设置环境变量 `EXTERNAL_BOT`
- **示例**：
  ```bash
  # 飞书机器人场景
  set EXTERNAL_BOT=feishu && node start-auto.js
  
  # 微信机器人场景
  set EXTERNAL_BOT=wechat && node start-auto.js
  ```

### 2. 多智能体对话场景

- **识别方式**：检测 `agent.prompt` 文件中的关键词
- **触发关键词**：团队、对话、协作、多智能体、互相、沟通、讨论
- **示例**：在 `agent.prompt` 文件中包含 "这是一个团队协作场景"

### 3. 深度思考场景

- **识别方式**：检测 `agent.prompt` 文件中的关键词
- **触发关键词**：深度思考、分析、设计、重构、优化、详细、拆解、规划
- **示例**：在 `agent.prompt` 文件中包含 "请对这个问题进行深度思考"

### 4. 默认场景

- **识别方式**：无特殊触发条件
- **默认模型**：Trae 内置模型

## 配置文件说明

### 豆包 API 配置（openclaw-doubao.json）

- 使用环境变量 `DOUBAO_API_KEY` 作为 API 密钥
- 模型：doubao-pro
- 适合外部集成和多智能体对话场景

### Trae 内置模型配置（openclaw-trea.json）

- 使用 Trae 内置模型
- 适合单智能体本地调用和深度思考场景

## 环境变量

| 环境变量 | 说明 | 示例值 |
|---------|------|--------|
| DOUBAO_API_KEY | 豆包 API 密钥 | sk-xxxxxxxxxxxxxxxx |
| EXTERNAL_BOT | 外部机器人类型 | feishu / wechat |

## 测试验证

### 运行场景检测测试

```bash
node test-scene-detector.js
```

### 运行完整功能测试

```bash
node test-scene-switching.js
```

## 常见问题

### Q: 如何确认当前使用的是哪个模型？
A: 启动时控制台会显示当前使用的模型模式，例如：
```
🔍 识别到外部触发（飞书/微信机器人）→ 切换到豆包API模型
🚀 正在启动OpenClaw网关（doubao模式）...
```

### Q: 豆包 API 密钥如何设置？
A: 设置环境变量 `DOUBAO_API_KEY`，例如：
```bash
set DOUBAO_API_KEY=sk-xxxxxxxxxxxxxxxx
```

### Q: 场景识别失败怎么办？
A: 使用手动指定模式作为兜底机制，例如：
```bash
node start-auto.js trea  # 强制使用 Trae 内置模型
```

## 最佳实践

1. **外部集成**：设置 `EXTERNAL_BOT` 环境变量，自动使用豆包 API
2. **团队协作**：在 `agent.prompt` 中包含团队协作相关关键词
3. **深度分析**：在 `agent.prompt` 中包含深度思考相关关键词
4. **本地开发**：默认使用 Trae 内置模型，无需特殊配置

## 技术原理

1. **场景检测**：通过 `scene-detector.js` 分析环境变量和 prompt 内容
2. **配置切换**：根据检测结果复制对应配置文件到默认位置
3. **网关启动**：使用切换后的配置启动 OpenClaw 网关
4. **兜底机制**：保留手动指定模式的入口

## 未来扩展

- 支持更多场景类型的识别
- 增加模型性能评估和自动调优
- 支持自定义场景识别规则
- 集成更多 AI 模型选项

## 故障排查

1. **场景识别错误**：检查 `agent.prompt` 文件内容和环境变量设置
2. **配置文件问题**：确保 `openclaw-doubao.json` 和 `openclaw-trea.json` 存在且格式正确
3. **API 密钥问题**：确保 `DOUBAO_API_KEY` 环境变量已正确设置
4. **端口冲突**：使用 `npx openclaw gateway stop` 停止现有网关进程

---

**提示**：场景化智能切换模型功能让你无需手动指定模型参数，系统会根据实际场景自动选择最合适的模型，提供更智能、更便捷的使用体验。