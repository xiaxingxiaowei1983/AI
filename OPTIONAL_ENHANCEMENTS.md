# 可选增强功能配置

## 沙箱权限配置（可选 P2）

为每个智能体配置工具权限边界，防止越权操作。

### 配置模板

在每个智能体的独立配置中添加：

```json
{
  "sandbox": {
    "enabled": true,
    "mode": "standard",
    "tools": {
      "allow": [
        "read_file",
        "write_file",
        "search_web",
        "send_message"
      ],
      "deny": [
        "system_config",
        "modify_gateway",
        "execute_command",
        "delete_file"
      ]
    },
    "fileSystem": {
      "readOnly": false,
      "allowedPaths": [
        "C:/Users/10919/Desktop/AI/data",
        "C:/Users/10919/Desktop/AI/agents"
      ],
      "blockedPaths": [
        "C:/Users/10919/.openclaw",
        "C:/Windows"
      ]
    }
  }
}
```

### 权限级别

| 模式 | 说明 |
|------|------|
| `standard` | 标准模式，有基本限制 |
| `restricted` | 受限模式，只读权限 |
| `isolated` | 完全隔离，Docker 容器 |

### 智能体权限建议

| 智能体 | 推荐模式 | 允许工具 | 禁止工具 |
|--------|---------|---------|---------|
| 大宗师 | standard | 全部工具 | - |
| 大掌柜 | standard | 业务工具 | 系统工具 |
| 绿茶 | restricted | 内容工具 | 执行工具 |
| 谛听 | standard | 数据工具 | 修改工具 |
| 人生决策宗师 | restricted | 分析工具 | 执行工具 |

---

## 会话修剪配置（可选 P3）

配置历史消息修剪策略，防止内存溢出和 Token 爆仓。

### 配置模板

在全局配置中添加：

```json
{
  "session": {
    "pruning": {
      "enabled": true,
      "maxMessages": 50,
      "maxAgeDays": 7,
      "maxTokens": 8000,
      "compression": {
        "enabled": true,
        "threshold": 30,
        "strategy": "summary"
      }
    },
    "memory": {
      "enabled": true,
      "persistence": "file",
      "backupFrequency": "daily"
    }
  }
}
```

### 修剪策略说明

| 参数 | 说明 | 推荐值 |
|------|------|--------|
| `maxMessages` | 最大消息数保留 | 50-100 |
| `maxAgeDays` | 消息最大保留天数 | 7-30 |
| `maxTokens` | 最大 Token 数 | 8000-16000 |
| `compression.enabled` | 是否启用压缩 | true |
| `compression.threshold` | 触发压缩的消息数 | 30-50 |
| `compression.strategy` | 压缩策略 | summary/extract |

### 压缩策略

| 策略 | 说明 |
|------|------|
| `summary` | 用 AI 生成消息摘要 |
| `extract` | 提取关键信息保留 |
| `truncate` | 简单截断旧消息 |

---

## 应用可选配置

### 步骤 1: 备份配置

```powershell
Copy-Item "C:\Users\10919\.openclaw\openclaw.json" "C:\Users\10919\.openclaw\openclaw.json.before-enhancements"
```

### 步骤 2: 编辑配置文件

在 `openclaw.json` 中添加：
- 全局 session 配置（会话修剪）
- 各智能体 sandbox 配置（沙箱权限）

### 步骤 3: 验证并重启

```powershell
node verify-config.js
npx openclaw gateway stop
npx openclaw gateway --port 18789
```

---

## 推荐部署顺序

1. **第一阶段**（必需）：应用基础配置
   - 双通道配置
   - 智能体列表
   - 路由绑定规则
   - 智能体间通信

2. **第二阶段**（可选 P2）：应用沙箱权限
   - 为每个智能体配置工具权限
   - 配置文件系统访问边界
   - 测试权限拦截

3. **第三阶段**（可选 P3）：应用会话修剪
   - 配置修剪策略
   - 监控内存使用
   - 长期稳定性测试
