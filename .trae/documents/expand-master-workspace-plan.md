# 大宗师工作区扩展计划

## 问题分析

### 当前状况
- **问题**: 大宗师无法修改 `C:/Users/10919/Desktop/AI` 目录下的文件
- **原因**: OpenClaw 默认工作区限制，大宗师只能访问其配置目录内的文件
- **当前工作区**: `C:/Users/10919/Desktop/AI/agents/master`

### 目标
将大宗师的工作区扩展到 `C:/Users/10919/Desktop/AI`，使其能够管理整个AI项目目录，同时确保OpenClaw能正常找到和使用大宗师。

---

## 解决方案

### 方案对比

| 方案 | 优点 | 缺点 | 风险 |
|------|------|------|------|
| **A: 修改workspace路径** | 简单直接，一劳永逸 | 可能影响OpenClaw识别 | 中 - 需要测试验证 |
| **B: 添加fs.allowPaths** | 保留原工作区，增加访问权限 | 配置复杂，可能不完整 | 低 - 但可能遗漏路径 |
| **C: 创建符号链接** | 不改变配置，兼容性好 | Windows符号链接需要权限 | 低 - 但不够优雅 |

**推荐方案**: A + B 组合方案
- 将workspace改为 `C:/Users/10919/Desktop/AI`
- 同时配置详细的fs.allowPaths确保权限完整

---

## 实施步骤

### 步骤1: 备份当前配置

```powershell
# 备份openclaw.json
Copy-Item "C:\Users\10919\.openclaw\openclaw.json" "C:\Users\10919\.openclaw\openclaw.json.bak.$(Get-Date -Format 'yyyyMMdd_HHmmss')"

# 备份master配置
Copy-Item "C:\Users\10919\Desktop\AI\agents\master\config.json" "C:\Users\10919\Desktop\AI\agents\master\config.json.bak"
```

### 步骤2: 更新OpenClaw配置

**文件**: `C:\Users\10919\.openclaw\openclaw.json`

找到大宗师(main)的配置，修改为：

```json
{
  "id": "main",
  "name": "大宗师",
  "description": "AWKN LAB战略中枢，负责微信个人号运营和顶层决策",
  "workspace": "C:/Users/10919/Desktop/AI",
  "model": "bailian/qwen3.5-plus",
  "tools": {
    "enabled": ["fs", "exec", "search", "git"],
    "fs": {
      "workspaceOnly": false,
      "allowPaths": [
        "C:/Users/10919/Desktop/AI",
        "C:/Users/10919/Desktop/AI/agents",
        "C:/Users/10919/Desktop/AI/agents/master",
        "C:/Users/10919/Desktop/AI/agents/coo",
        "C:/Users/10919/Desktop/AI/agents/cto",
        "C:/Users/10919/Desktop/AI/agents/green-tea",
        "C:/Users/10919/Desktop/AI/agents/business",
        "C:/Users/10919/Desktop/AI/agents/life",
        "C:/Users/10919/Desktop/AI/.trae",
        "C:/Users/10919/Desktop/AI/evolver"
      ]
    },
    "exec": {
      "allowedCommands": ["node", "npm", "git", "code", "python", "powershell"]
    }
  },
  "agentConfig": {
    "configPath": "C:/Users/10919/Desktop/AI/agents/master/config.json",
    "promptPath": "C:/Users/10919/Desktop/AI/agents/master/agent.prompt"
  }
}
```

### 步骤3: 更新Master自身配置

**文件**: `C:\Users\10919\Desktop\AI\agents\master\config.json`

添加或更新以下字段：

```json
{
  "agent_id": "master",
  "name": "大宗师",
  "role": "CEO / 核心意志",
  "workspace": "C:/Users/10919/Desktop/AI",
  "basePath": "C:/Users/10919/Desktop/AI/agents/master",
  "tools": {
    "fs": {
      "rootPath": "C:/Users/10919/Desktop/AI",
      "allowedPaths": ["*"]
    }
  }
}
```

### 步骤4: 创建路径映射文件

**创建文件**: `C:\Users\10919\Desktop\AI\agents\master\path-mapping.json`

```json
{
  "workspace": "C:/Users/10919/Desktop/AI",
  "agentBase": "C:/Users/10919/Desktop/AI/agents/master",
  "subAgents": {
    "coo": "C:/Users/10919/Desktop/AI/agents/coo",
    "cto": "C:/Users/10919/Desktop/AI/agents/cto",
    "green-tea": "C:/Users/10919/Desktop/AI/agents/green-tea",
    "business": "C:/Users/10919/Desktop/AI/agents/business",
    "life": "C:/Users/10919/Desktop/AI/agents/life"
  },
  "systemPaths": {
    "trae": "C:/Users/10919/Desktop/AI/.trae",
    "evolver": "C:/Users/10919/Desktop/AI/evolver",
    "backups": "C:/Users/10919/Desktop/AI/backups"
  }
}
```

### 步骤5: 重启OpenClaw网关

```powershell
# 停止网关
openclaw gateway stop

# 等待3秒
Start-Sleep -Seconds 3

# 启动网关
openclaw gateway start

# 检查状态
openclaw status
```

### 步骤6: 验证配置

```powershell
# 检查大宗师是否被识别
openclaw status

# 测试文件访问
openclaw agent call main --message "读取 C:/Users/10919/Desktop/AI/README.md 的内容"

# 测试文件写入
openclaw agent call main --message "在 C:/Users/10919/Desktop/AI/test-file.txt 中写入测试内容"
```

---

## 回滚方案

如果配置出现问题，可以快速回滚：

```powershell
# 恢复备份
Copy-Item "C:\Users\10919\.openclaw\openclaw.json.bak.xxxxx" "C:\Users\10919\.openclaw\openclaw.json" -Force

# 重启网关
openclaw gateway restart
```

---

## 故障排除

### 问题1: OpenClaw无法找到大宗师
**症状**: `openclaw status` 不显示main智能体
**解决**: 
1. 检查 `agents.list` 中是否包含main配置
2. 验证workspace路径格式（使用正斜杠 `/`）
3. 重启网关

### 问题2: 文件访问被拒绝
**症状**: 无法读取或写入文件
**解决**:
1. 检查 `tools.fs.allowPaths` 是否包含目标路径
2. 确认 `workspaceOnly` 设置为 `false`
3. 检查文件系统权限

### 问题3: 子智能体无法启动
**症状**: coo、cto等子智能体启动失败
**解决**:
1. 检查子智能体的workspace路径是否正确
2. 确保子智能体配置独立，不依赖main的workspace
3. 验证parent关系配置

### 问题4: 路径格式错误
**症状**: 配置文件解析错误
**解决**:
1. 使用正斜杠 `/` 而非反斜杠 `\`
2. 确保路径以盘符开头（如 `C:/`）
3. 使用JSON验证工具检查格式

---

## 安全考虑

### 权限控制
- 只授予必要的文件访问权限
- 避免授予系统目录访问权
- 定期审查allowPaths列表

### 备份策略
- 修改前总是备份配置文件
- 保留最近3个备份版本
- 记录每次修改的内容和原因

### 监控建议
- 监控大宗师的文件操作日志
- 设置异常访问告警
- 定期检查配置文件完整性

---

## 成功标准

1. ✅ 大宗师能够读取 `C:/Users/10919/Desktop/AI` 下的所有文件
2. ✅ 大宗师能够写入 `C:/Users/10919/Desktop/AI` 下的文件
3. ✅ OpenClaw能正常识别和启动大宗师
4. ✅ 子智能体(coo、cto等)能正常工作
5. ✅ 飞书集成和其他通道功能正常

---

## 时间安排

- 步骤1 (备份): 5分钟
- 步骤2 (更新OpenClaw配置): 10分钟
- 步骤3 (更新Master配置): 5分钟
- 步骤4 (创建映射文件): 5分钟
- 步骤5 (重启和验证): 10分钟
- **总计**: 约35分钟

---

## 注意事项

1. **修改前务必备份** - 这是最重要的步骤
2. **逐步验证** - 每完成一步就验证是否正常
3. **保持冷静** - 如果出现问题，使用回滚方案
4. **记录日志** - 记录所有修改和遇到的问题
5. **测试充分** - 在生产环境使用前充分测试
