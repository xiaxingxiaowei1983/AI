# 多角色 AI 协作操作系统 - 部署指南

## 核心配置文件

已创建完整配置文件：`openclaw-multi-agent-config.json`

## 配置内容总结

### ✅ 已配置的功能

| 功能 | 状态 | 说明 |
|------|------|------|
| **双通道支持** | ✅ 完成 | 飞书 + Discord |
| **5 个智能体** | ✅ 完成 | 大宗师、大掌柜、绿茶、谛听、人生决策宗师 |
| **智能体间通信** | ✅ 完成 | agentCommunication 配置 |
| **路由绑定规则** | ✅ 完成 | 3 条 bindings 规则 |
| **插件启用** | ✅ 完成 | feishu + discord |
| **豆包模型** | ✅ 完成 | custom-doubao 已配置 |

## 智能体路由规则

| 消息来源 | 路由到 |
|---------|--------|
| 飞书群组 | 大宗师 (main) |
| Discord 运营频道 (1234567890) | 大掌柜 (coo) |
| Discord 技术频道 (0987654321) | 谛听 (business) |

## 智能体间通信权限

| 智能体 | 可指挥 | 可转发到 |
|--------|--------|----------|
| 大宗师 | coo, business, life | feishu:核心管理群 |
| 大掌柜 | business | discord:运营频道 |

## 部署步骤

### 步骤 1: 备份当前配置

```powershell
# 备份现有配置
Copy-Item "C:\Users\10919\.openclaw\openclaw.json" "C:\Users\10919\.openclaw\openclaw.json.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
```

### 步骤 2: 应用新配置

```powershell
# 复制新配置
Copy-Item "c:\Users\10919\Desktop\AI\openclaw-multi-agent-config.json" "C:\Users\10919\.openclaw\openclaw.json" -Force
```

### 步骤 3: 设置环境变量

设置 Discord 相关环境变量：

```powershell
# 设置 Discord Bot Token
$env:DISCORD_BOT_TOKEN = "your-discord-bot-token-here"

# 设置 Discord Guild ID
$env:DISCORD_GUILD_ID = "your-discord-guild-id-here"
```

### 步骤 4: 重启 OpenClaw 网关

```powershell
# 停止现有网关
npx openclaw gateway stop

# 启动新网关
npx openclaw gateway --port 18789
```

### 步骤 5: 验证部署

访问网关验证：
- Gateway: http://localhost:18789
- 检查智能体是否在线
- 测试双通道消息

## 频道 ID 配置说明

在配置文件中更新实际的 Discord 频道 ID：

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "botToken": "${DISCORD_BOT_TOKEN}",
      "guildId": "${DISCORD_GUILD_ID}",
      "channels": {
        "运营频道": "实际的运营频道ID",
        "技术频道": "实际的技术频道ID"
      }
    }
  }
}
```

同时更新路由绑定中的频道 ID：

```json
{
  "bindings": [
    {
      "match": {
        "channel": "discord",
        "channelId": "实际的运营频道ID"
      },
      "route": {
        "agent": "coo"
      }
    },
    {
      "match": {
        "channel": "discord",
        "channelId": "实际的技术频道ID"
      },
      "route": {
        "agent": "business"
      }
    }
  ]
}
```

## 验证清单

- [ ] 配置文件已备份
- [ ] 新配置已复制到位
- [ ] Discord 环境变量已设置
- [ ] 网关已成功重启
- [ ] 智能体都已加载
- [ ] 飞书通道正常
- [ ] Discord 通道正常
- [ ] 智能体间通信测试通过

## 故障排查

### 配置文件格式错误

运行验证脚本：
```powershell
node verify-config.js
```

### 网关启动失败

检查日志：
```powershell
# 查看 Gateway 日志
# 检查端口 18789 是否被占用
netstat -ano | findstr :18789
```

### 智能体未加载

检查工作区路径是否正确，确保：
- `C:/Users/10919/Desktop/AI/agents/master` 存在
- 每个智能体目录有正确的配置文件

### Discord 连接失败

确认：
- Bot Token 正确
- Guild ID 正确
- Bot 已加入服务器
- Bot 有必要的权限

## 下一步

1. 更新配置中的实际 Discord 频道 ID
2. 设置环境变量
3. 应用配置并重启网关
4. 进行端到端测试
