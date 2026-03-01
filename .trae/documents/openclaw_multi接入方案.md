# OpenClaw 多方接入综合实施方案

## 一、方案目标

整合火山引擎（豆包）、飞书等多方接入需求，创建一套标准化配置方案，确保：

1. OpenClaw 能够正常启动和运行
2. 火山引擎（豆包）API 能够正常调用
3. 飞书通道能够正常连接
4. CSP 问题得到解决
5. 网关令牌问题得到解决

---

## 二、当前问题清单

### 2.1 OpenClaw 启动问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| Gateway token missing | 网关配置模式为 local 而非 gateway | 启动时使用 --token 参数指定令牌 |
| CSP 字体加载失败 | OpenClaw 前端 CSP 头不允许 Google 字体 | 使用代理服务器修改 CSP 头 |

### 2.2 火山引擎配置问题

根据 GitHub 官方配置预设，正确的火山引擎（豆包）配置如下：

| 配置项 | 正确值 | 说明 |
|--------|--------|------|
| API Key | c13b2982-0aab-4c75-9404-0deb12a219ec | 方舟大模型 API Key |
| Base URL | https://ark.cn-beijing.volces.com/api/v3 | API 服务器地址 |
| API 协议 | openai-completions | OpenAI 兼容协议 |
| 模型 ID | volcengine/doubao-seed-2-0-code-preview-latest | OpenClaw 识别的模型名 |
| 模型显示名 | DouBao Seed Code Preview | 模型显示名称 |
| 上下文窗口 | 128000 | 支持的上下文长度 |

### 2.3 飞书配置问题

| 配置项 | 正确值 | 说明 |
|--------|--------|------|
| App ID | cli_a91012cd0ab89bc9 | 飞书应用 ID |
| App Secret | W2dl8mRwy7ArghhqZSp9heG8i3I2FVP5 | 飞书应用密钥 |
| 事件订阅 | 长连接模式 | 必须选择 WebSocket 长连接 |
| 权限 | im:message, im:message:send_as_bot 等 | 必须开通核心权限 |

---

## 三、标准化配置方案

### 3.1 OpenClaw 配置文件模板

配置文件路径：`C:\Users\10919\.openclaw\openclaw.json`

```json
{
  "meta": {
    "lastTouchedVersion": "2026.2.24",
    "lastTouchedAt": "2026-02-26T09:03:29.380Z"
  },
  "wizard": {
    "lastRunAt": "2026-02-24T19:36:22.056Z",
    "lastRunVersion": "2026.2.21-2",
    "lastRunCommand": "configure",
    "lastRunMode": "local"
  },
  "auth": {
    "profiles": {
      "volcengine:manual": {
        "provider": "volcengine",
        "mode": "token"
      }
    }
  },
  "models": {
    "mode": "merge"
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "volcengine/doubao-seed-2-0-code-preview-latest",
        "fallbacks": []
      },
      "models": {
        "doubao-seed-2-0-code-preview-260215": {},
        "volcengine/doubao-seed-2-0-code-preview-latest": {},
        "doubao-seed-code": {}
      },
      "workspace": "C:\\Users\\10919\\.openclaw\\workspace",
      "compaction": {
        "mode": "safeguard"
      },
      "maxConcurrent": 4,
      "subagents": {
        "maxConcurrent": 8
      }
    },
    "list": [
      {
        "id": "main"
      },
      {
        "id": "master",
        "name": "master",
        "workspace": "C:\\Users\\10919\\.openclaw\\workspace-master",
        "agentDir": "C:\\Users\\10919\\.openclaw\\agents\\master\\agent",
        "identity": {
          "name": "大宗师"
        }
      },
      {
        "id": "coo",
        "name": "coo",
        "workspace": "C:\\Users\\10919\\Desktop\\AI\\agents\\coo",
        "agentDir": "C:\\Users\\10919\\.openclaw\\agents\\coo\\agent"
      },
      {
        "id": "business",
        "name": "business",
        "workspace": "C:\\Users\\10919\\Desktop\\AI\\agents\\business",
        "agentDir": "C:\\Users\\10919\\Desktop\\AI\\agents\\business"
      },
      {
        "id": "feishu-bot",
        "name": "feishu-bot",
        "workspace": "C:\\Users\\10919\\Desktop\\AI\\agents\\feishu-bot",
        "agentDir": "C:\\Users\\10919\\.openclaw\\agents\\feishu-bot\\agent",
        "model": "volcengine/doubao-seed-2-0-code-preview-latest"
      }
    ]
  },
  "messages": {
    "ackReactionScope": "group-mentions"
  },
  "commands": {
    "native": "auto",
    "nativeSkills": "auto",
    "restart": true,
    "ownerDisplay": "raw"
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "cli_a91012cd0ab89bc9",
      "appSecret": "W2dl8mRwy7ArghhqZSp9heG8i3I2FVP5",
      "domain": "feishu",
      "groupPolicy": "allowlist",
      "agent": "feishu-bot"
    }
  },
  "gateway": {
    "mode": "gateway",
    "auth": {
      "mode": "token",
      "token": "2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da"
    }
  },
  "plugins": {
    "entries": {
      "feishu": {
        "enabled": true
      }
    }
  }
}
```

### 3.2 火山引擎模型配置（关键）

在 OpenClaw 中配置火山引擎时，需要使用特定的模型 ID 格式：

```
volcengine/doubao-seed-2-0-code-preview-latest
```

这对应火山引擎的：
- 模型：doubao-seed-2-0-code-preview-latest
- Base URL：https://ark.cn-beijing.volces.com/api/v3

---

## 四、一键启动方案

### 4.1 一键启动脚本

创建文件 `C:\Users\10919\Desktop\AI\启动OpenClaw.bat`：

```batch
@echo off
chcp 65001 >nul
title OpenClaw 一键启动
mode con cols=80 lines=30
color 3f

echo ========================================
echo     OpenClaw 一键启动脚本
echo     版本: 2026.2.26
echo ========================================
echo.

cd /d C:\Users\10919\Desktop\AI\mission-control

echo [步骤 1/3] 启动 OpenClaw 网关服务...
echo    端口: 18790
echo    令牌: 2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da
echo.
start "OpenClaw-18790" cmd /k "openclaw gateway --port 18790 --token 2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da"

echo [步骤 2/3] 等待网关启动...
timeout /t 5 /nobreak >nul

echo [步骤 3/3] 启动 CSP 修复代理...
cd /d C:\Users\10919\Desktop\AI
start "CSP-Proxy-18800" cmd /k "node csp-proxy-server.js"

echo.
echo ========================================
echo     启动完成！
echo ========================================
echo.
echo 访问地址：http://localhost:18800
echo 控制面板：http://localhost:18792
echo.
echo 网关令牌：2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da
echo.
echo 请在浏览器中打开 http://localhost:18800
echo 如果需要输入令牌，请使用上面的令牌
echo.
echo 按任意键退出...
pause >nul
```

### 4.2 启动流程说明

1. **第一步**：启动 OpenClaw 网关（18790 端口）
   - 使用 --token 参数指定令牌
   - 自动连接飞书和火山引擎

2. **第二步**：等待 5 秒让网关完全启动

3. **第三步**：启动 CSP 修复代理（18800 端口）
   - 拦截 HTTP 响应
   - 修复 CSP 头，允许 Google 字体

---

## 五、飞书接入标准流程

### 5.1 飞书开放平台配置

1. **创建企业自建应用**
   - 访问 https://open.feishu.cn/app
   - 点击创建企业自建应用
   - 填写应用名称：OpenClaw AI 助手

2. **获取凭证**
   - 在凭证与基础信息页面
   - 复制 App ID 和 App Secret

3. **启用机器人能力**
   - 左侧导航：应用能力 → 添加应用能力
   - 选择机器人，点击添加

4. **开通核心权限**
   - 权限管理页面
   - 开通以下权限：
     - im:message（获取与发送消息）
     - im:message:send_as_bot（以机器人身份发送消息）
     - im:chat:readonly（获取群组基本信息）
     - contact:user.id:readonly（获取用户基本ID）

5. **配置事件订阅**
   - 事件与回调页面
   - 订阅方式选择：使用长连接接收回调
   - 添加事件：im.message.receive_v1

6. **发布应用**
   - 创建版本，填写更新说明
   - 申请发布

### 5.2 OpenClaw 端配置

飞书通道已在配置文件中正确配置，启动后自动连接。

---

## 六、关键配置参数汇总

### 6.1 火山引擎参数

| 参数名 | 值 | 用途 |
|--------|-----|------|
| API Key | c13b2982-0aab-4c75-9404-0deb12a219ec | 调用豆包 API |
| Base URL | https://ark.cn-beijing.volces.com/api/v3 | API 服务器地址 |
| API 协议 | openai-completions | OpenAI 兼容协议 |
| 模型 ID | volcengine/doubao-seed-2-0-code-preview-latest | OpenClaw 模型名 |
| 模型版本 | doubao-seed-2-0-code-preview-latest | 豆包模型版本 |

### 6.2 飞书参数

| 参数名 | 值 | 用途 |
|--------|-----|------|
| App ID | cli_a91012cd0ab89bc9 | 飞书应用标识 |
| App Secret | W2dl8mRwy7ArghhqZSp9heG8i3I2FVP5 | 飞书应用密钥 |

### 6.3 网关参数

| 参数名 | 值 | 用途 |
|--------|-----|------|
| Token | 2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da | 网关认证令牌 |
| 原始端口 | 18790 | OpenClaw 原始端口 |
| 代理端口 | 18800 | CSP 修复代理端口 |

---

## 七、验证清单

### 7.1 启动验证

| 步骤 | 验证方法 | 预期结果 |
|------|----------|----------|
| 1 | 访问 http://localhost:18800 | 页面正常加载，无 CSP 错误 |
| 2 | 检查控制台 | 无 gateway token missing 错误 |
| 3 | 发送测试消息 | 收到 AI 回复 |

### 7.2 飞书验证

| 步骤 | 验证方法 | 预期结果 |
|------|----------|----------|
| 1 | 查看日志 | 显示 feishu 已连接 |
| 2 | 飞书发送消息 | 收到 AI 回复 |

### 7.3 模型验证

| 步骤 | 验证方法 | 预期结果 |
|------|----------|----------|
| 1 | 查看日志 | 显示 volcengine/doubao-seed-2-0-code-preview-latest |
| 2 | 发送消息 | 正常调用豆包 API |

---

## 八、故障排查

### 8.1 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| gateway token missing | 令牌未正确配置 | 使用 --token 参数启动 |
| CSP 字体错误 | CSP 头阻止 Google 字体 | 使用 18800 端口访问 |
| 飞书连接失败 | App ID/Secret 错误 | 检查配置文件 |
| 模型调用失败 | API Key 或 Endpoint 错误 | 检查火山引擎配置 |

### 8.2 日志查看

```powershell
# 查看 OpenClaw 日志
openclaw logs --follow

# 或直接查看日志文件
notepad C:\Users\10919\.openclaw\logs\openclaw-2026-02-26.log
```

---

## 九、文件清单

本方案涉及的文件：

| 文件路径 | 用途 |
|----------|------|
| C:\Users\10919\.openclaw\openclaw.json | OpenClaw 主配置文件 |
| C:\Users\10919\Desktop\AI\csp-proxy-server.js | CSP 修复代理服务器 |
| C:\Users\10919\Desktop\AI\启动OpenClaw.bat | 一键启动脚本 |

---

## 十、总结

本方案整合了：

1. **OpenClaw 基础配置**：正确的网关模式和认证
2. **火山引擎接入**：
   - Base URL：https://ark.cn-beijing.volces.com/api/v3
   - 模型：volcengine/doubao-seed-2-0-code-preview-latest
   - API 协议：openai-completions
3. **飞书通道配置**：App ID + App Secret + 长连接模式
4. **CSP 修复方案**：代理服务器修改 CSP 头

所有配置均已标准化，可以直接使用一键启动脚本启动服务。

---

## 附录：火山引擎模型列表

根据 OpenClaw 官方预设，支持的火山引擎模型包括：

| 模型 ID | 显示名称 | 上下文窗口 | 用途 |
|---------|----------|------------|------|
| volcengine/doubao-seed-2-0-code-preview-latest | DouBao Seed Code Preview | 128000 | 代码编写 |
| volcengine/doubao-seed-2-0-flash-latest | DouBao Seed Flash | 128000 | 快速响应 |
| volcengine/doubao-pro-32k-latest | DouBao Pro 32K | 32000 | 专业写作 |

推荐使用 `volcengine/doubao-seed-2-0-code-preview-latest` 进行代码编写任务。
