# OpenClaw 场景化智能切换模型

## 功能介绍

OpenClaw 场景化智能切换模型是一个智能系统，能够根据当前使用场景自动切换不同的AI模型：

- **外部集成场景**（飞书/微信机器人）：自动使用豆包 API 模型
- **多智能体对话场景**：自动使用豆包 API 模型
- **单智能体深度思考场景**：自动使用 Trae 内置模型
- **默认场景**：自动使用 Trae 内置模型

同时保留手动切换能力，确保系统的灵活性和可靠性。

## 快速开始

### 1. 安装依赖

```bash
# 确保已安装 Node.js
# 安装 OpenClaw（如果尚未安装）
npm install -g openclaw
```

### 2. 配置文件

系统包含两个配置文件：

- `openclaw-trea.json`：用于 Trae 内置模型
- `openclaw-doubao.json`：用于豆包 API 模型

#### 配置豆包 API Key

推荐使用环境变量管理豆包 API Key：

**Windows（命令提示符）：**
```cmd
setx DOUBAO_API_KEY "你的豆包API密钥"
```

**Windows（PowerShell）：**
```powershell
[Environment]::SetEnvironmentVariable("DOUBAO_API_KEY", "你的豆包API密钥", "User")
```

**macOS/Linux：**
```bash
echo 'export DOUBAO_API_KEY="你的豆包API密钥"' >> ~/.bashrc
source ~/.bashrc
```

### 3. 启动系统

**一键启动（自动识别场景）：**
```bash
node start-auto.js
```

**手动切换模式：**
```bash
# 强制使用 Trae 内置模型
node start-auto.js trea

# 强制使用豆包 API 模型
node start-auto.js doubao
```

**飞书/微信机器人场景：**
```bash
# Windows
set EXTERNAL_BOT=feishu && node start-auto.js

# macOS/Linux
export EXTERNAL_BOT=wechat && node start-auto.js
```

## 场景识别规则

### 1. 外部集成场景

识别方式：
- 检测 `EXTERNAL_BOT` 环境变量（值为 `feishu` 或 `wechat`）
- 检测 `.external-trigger` 临时文件是否存在

### 2. 多智能体对话场景

识别方式：检测 `agent.prompt` 文件中是否包含以下关键词：
- 团队、对话、协作、多智能体、互相、沟通、讨论

### 3. 深度思考场景

识别方式：检测 `agent.prompt` 文件中是否包含以下关键词：
- 深度思考、分析、设计、重构、优化、详细、拆解、规划

### 4. 默认场景

如果以上场景都不匹配，默认使用 Trae 内置模型。

## 扩展识别规则

### 修改场景识别规则

编辑 `scene-detector.js` 文件，可以：

1. **新增场景**：添加新的场景识别函数
2. **调整关键词**：修改现有关键词列表
3. **自定义触发条件**：添加新的触发方式

### 示例：新增批量处理场景

```javascript
// 在 scene-detector.js 中添加
function checkBatchTask() {
  if (!fs.existsSync("./agent.prompt")) return false;
  const promptContent = fs.readFileSync("./agent.prompt", "utf8");
  const batchKeywords = ["批量", "批量处理", "批量生成", "批量执行"];
  return batchKeywords.some(keyword => promptContent.includes(keyword));
}

// 在 detectScene 函数中添加
function detectScene() {
  // 现有规则...
  
  // 新增批量处理场景
  const isBatchTask = checkBatchTask();
  if (isBatchTask) {
    console.log("🔍 识别到批量处理场景 → 切换到豆包API模型");
    return "doubao";
  }
  
  // 默认场景...
}
```

## 访问地址

系统启动后，可以通过以下地址访问：

- **Web 界面**：http://localhost:18789/chat?session=main
- **WebSocket 接口**：ws://localhost:18789

## 故障排除

### 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 豆包 API 调用失败 | 未设置 DOUBAO_API_KEY 环境变量 | 设置环境变量或在配置文件中直接填写 API Key |
| 场景识别错误 | 关键词匹配不准确 | 修改 scene-detector.js 中的关键词列表 |
| 网关启动失败 | 端口被占用 | 检查端口 18789 是否被其他进程占用 |
| 配置文件不存在 | 文件路径错误 | 确保 openclaw-trea.json 和 openclaw-doubao.json 文件存在 |

### 查看日志

```bash
# 查看 OpenClaw 日志
npx openclaw logs --follow

# 查看启动脚本日志
node start-auto.js > start.log 2>&1
```

## 系统架构

### 核心模块

1. **scene-detector.js**：场景识别核心模块，负责识别当前使用场景
2. **start-auto.js**：自动切换启动脚本，整合场景识别、配置加载和网关启动
3. **配置文件**：管理不同模型的配置信息

### 工作流程

1. 启动 `start-auto.js` 脚本
2. 脚本调用 `scene-detector.js` 识别当前场景
3. 根据识别结果加载对应配置文件
4. 启动 OpenClaw 网关服务
5. 提供 Web 界面和 WebSocket 接口

## 性能优化

- **快速识别**：场景识别过程在毫秒级完成，不影响系统启动速度
- **资源节省**：根据场景选择合适的模型，避免不必要的 API 调用
- **稳定性**：保留手动切换能力，确保系统在特殊情况下仍能正常工作

## 版本信息

- **OpenClaw 版本**：2026.2.21-2 或更高
- **Node.js 版本**：16.0.0 或更高

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个系统！

## 许可证

MIT License
