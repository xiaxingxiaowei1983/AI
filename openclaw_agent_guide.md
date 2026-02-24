# 在 OPENCLAW 中创建 AGENT 的详细指南

## 步骤 1：创建 AGENT 目录结构

1. **打开 PowerShell** 并进入 OPENCLAW 目录：
   ```powershell
   cd "C:\Users\10919\.openclaw\agents"
   ```

2. **创建新 AGENT 目录**（例如创建一个名为 `myagent` 的 AGENT）：
   ```powershell
   mkdir -p myagent\agent
   ```

## 步骤 2：创建配置文件

在 `myagent\agent\` 目录中创建以下配置文件：

### 1. models.json（模型配置）
```json
{
  "providers": {
    "qwen-portal": {
      "baseUrl": "https://portal.qwen.ai/v1",
      "api": "openai-completions",
      "models": [
        {
          "id": "coder-model",
          "name": "Qwen Coder",
          "reasoning": false,
          "input": ["text"],
          "cost": {
            "input": 0,
            "output": 0,
            "cacheRead": 0,
            "cacheWrite": 0
          },
          "contextWindow": 128000,
          "maxTokens": 8192
        }
      ],
      "apiKey": "qwen-oauth"
    }
  }
}
```

### 2. auth.json（认证配置）
```json
{
  "auth": {
    "mode": "oauth"
  }
}
```

### 3. auth-profiles.json（认证配置文件）
```json
{
  "profiles": {
    "qwen-portal": {
      "type": "oauth",
      "endpoint": "https://oauth.qwen.ai",
      "scopes": ["chat", "completions"]
    }
  }
}
```

## 步骤 3：配置主配置文件

编辑 `C:\Users\10919\.openclaw\openclaw.json` 文件，添加新 AGENT 的配置：

```json
{
  "meta": {
    "lastTouchedVersion": "2026.2.21-2",
    "lastTouchedAt": "2026-02-22T05:26:00.924Z"
  },
  "agents": {
    "defaults": {
      "workspace": "C:\Users\10919\.openclaw\workspace",
      "compaction": {
        "mode": "safeguard"
      }
    },
    "myagent": {
      "workspace": "C:\Users\10919\.openclaw\workspace",
      "compaction": {
        "mode": "safeguard"
      }
    }
  },
  "commands": {
    "native": "auto",
    "nativeSkills": "auto",
    "restart": true,
    "ownerDisplay": "raw"
  },
  "gateway": {
    "auth": {
      "mode": "token",
      "token": "debaac3ceddb92c9da39566182dd3760e11026fe55bf42c0"
    }
  }
}
```

## 步骤 4：为新 AGENT 创建工作区文件

可选：在 `C:\Users\10919\.openclaw\workspace\` 目录中为新 AGENT 创建特定的文件：

1. **SOUL.md** - 定义 AGENT 的性格和行为
2. **USER.md** - 定义用户信息和偏好
3. **TOOLS.md** - 定义 AGENT 可用的工具

## 步骤 5：重启 OPENCLAW 网关

1. **停止当前运行的网关**（如果正在运行）

2. **重新启动网关**：
   ```powershell
   cd "C:\Users\10919\Desktop\AI"
   npx openclaw gateway --allow-unconfigured
   ```

## 如何调用新 AGENT

### 方法 1：通过命令行
```powershell
npx openclaw agent myagent
```

### 方法 2：通过网关 API
使用 HTTP 请求调用 AGENT：
```bash
curl -X POST http://localhost:8080/v1/agents/myagent/chat \
  -H "Authorization: Bearer debaac3ceddb92c9da39566182dd3760e11026fe55bf42c0" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello, who are you?"}]}'
```

### 方法 3：通过 Trae IDE
在 Trae IDE 中，你可以通过以下方式调用新 AGENT：
1. 使用 `/agent myagent` 命令
2. 在对话中指定 AGENT 名称
3. 通过网关界面选择 AGENT

## 验证 AGENT 创建成功

检查 `~/.openclaw/logs/` 目录中的日志文件，确保没有错误信息。你也可以通过网关 API 测试 AGENT 是否正常响应。

## 重要提示

1. **保持配置文件格式正确** - JSON 格式必须严格正确
2. **使用有效的 API 密钥** - 如果需要连接外部模型服务
3. **重启网关** - 每次修改配置后都需要重启网关
4. **检查权限** - 确保目录和文件权限正确

现在你已经成功在 OPENCLAW 中创建了一个新的 AGENT！