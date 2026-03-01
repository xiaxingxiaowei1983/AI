# CTO天火子智能体配置手册

## 配置状态

### 已完成的步骤 ✅
1. ✅ 创建OpenClaw代理目录结构
2. ✅ 创建AGENTS.md文件
3. ✅ 创建SOUL.md文件
4. ✅ 创建模型配置models.json

### 需要手动完成的步骤
由于权限限制，以下步骤需要您手动完成：

---

## 步骤1: 更新 openclaw.json

### 1.1 打开配置文件
使用您喜欢的编辑器打开：
```
C:\Users\10919\.openclaw\openclaw.json
```

### 1.2 备份原配置（重要！）
在修改前，先备份原文件：
```powershell
Copy-Item "C:\Users\10919\.openclaw\openclaw.json" "C:\Users\10919\.openclaw\openclaw.json.bak.$(Get-Date -Format 'yyyyMMdd_HHmmss')"
```

### 1.3 添加CTO天火配置

找到 `agents.list` 数组（大约在第184行），在 `main` 智能体配置后添加CTO天火配置：

**找到这段代码：**
```json
    "list": [
      {
        "id": "main",
        "name": "大宗师",
        "workspace": "C:/Users/10919/Desktop/AI/agents/master"
      }
    ]
```

**修改为：**
```json
    "list": [
      {
        "id": "main",
        "name": "大宗师",
        "workspace": "C:/Users/10919/Desktop/AI/agents/master"
      },
      {
        "id": "cto-tianhuo",
        "name": "天火",
        "description": "AWKN LAB技术引擎，负责技术规划、团队管理、项目监督和技术决策",
        "workspace": "C:/Users/10919/.openclaw/workspace/cto-tianhuo",
        "model": "custom-doubao/ep-20260225031720-mp6fh",
        "parent": "main",
        "tools": {
          "enabled": ["fs", "exec", "search", "git"],
          "fs": {
            "workspaceOnly": false,
            "allowPaths": ["C:/Users/10919/Desktop/AI"]
          },
          "exec": {
            "allowedCommands": ["node", "npm", "git", "code"]
          }
        },
        "skills": ["git-ssh-sync", "planning-with-files", "mission-control"]
      }
    ]
```

### 1.4 保存文件
保存修改后的 `openclaw.json` 文件。

### 1.5 验证JSON格式
确保JSON格式正确，可以使用在线JSON验证工具检查。

---

## 步骤2: 重启OpenClaw网关

配置更新后，需要重启OpenClaw网关使配置生效：

```powershell
# 重启网关
openclaw gateway restart

# 或者先停止再启动
openclaw gateway stop
openclaw gateway start
```

---

## 步骤3: 验证配置

### 3.1 检查智能体列表
```powershell
openclaw status
```

应该能看到 `cto-tianhuo` 智能体在列表中。

### 3.2 启动CTO天火
```powershell
openclaw agent start cto-tianhuo
```

### 3.3 测试调用
```powershell
openclaw agent call cto-tianhuo --message "你好，请介绍一下自己"
```

---

## 步骤4: 使用启动脚本（可选）

我已经为您创建了启动脚本，位于：
```
C:\Users\10919\Desktop\AI\start-cto-tianhuo.ps1
```

使用方法：
```powershell
# 启动CTO天火
.\start-cto-tianhuo.ps1

# 调用CTO天火执行任务
.\call-cto-tianhuo.ps1 -Task "审查代码质量" -Context "当前项目使用Next.js"
```

---

## 配置说明

### CTO天火配置详情

| 配置项 | 值 | 说明 |
|--------|-----|------|
| id | cto-tianhuo | 唯一标识符 |
| name | 天火 | 显示名称 |
| parent | main | 父智能体（大宗师） |
| model | custom-doubao/ep-20260225031720-mp6fh | 使用Doubao编程模型 |
| workspace | C:/Users/10919/.openclaw/workspace/cto-tianhuo | 工作目录 |
| skills | git-ssh-sync, planning-with-files, mission-control | 技能列表 |

### 权限配置
- **文件系统**: 可以访问 `C:/Users/10919/Desktop/AI` 目录
- **执行命令**: 允许执行 `node`, `npm`, `git`, `code` 命令
- **工具**: 启用 `fs`, `exec`, `search`, `git` 工具

---

## 故障排除

### 问题1: JSON格式错误
**症状**: OpenClaw启动失败，提示配置错误
**解决**: 使用JSON验证工具检查格式，确保逗号、括号匹配正确

### 问题2: 智能体未显示
**症状**: `openclaw status` 看不到CTO天火
**解决**: 
1. 确认配置已保存
2. 重启OpenClaw网关
3. 检查配置中的 `id` 是否唯一

### 问题3: 启动失败
**症状**: `openclaw agent start cto-tianhuo` 失败
**解决**:
1. 检查工作目录是否存在：`C:\Users\10919\.openclaw\workspace\cto-tianhuo`
2. 检查AGENTS.md是否存在
3. 查看错误日志：`openclaw logs`

### 问题4: 权限不足
**症状**: 无法访问某些文件或执行命令
**解决**: 检查 `tools.fs.allowPaths` 和 `tools.exec.allowedCommands` 配置

---

## 文件清单

### 已创建的文件
1. ✅ `C:\Users\10919\.openclaw\agents\cto-tianhuo\agent\` (目录)
2. ✅ `C:\Users\10919\.openclaw\agents\cto-tianhuo\sessions\` (目录)
3. ✅ `C:\Users\10919\.openclaw\workspace\cto-tianhuo\` (目录)
4. ✅ `C:\Users\10919\.openclaw\workspace\cto-tianhuo\AGENTS.md`
5. ✅ `C:\Users\10919\.openclaw\workspace\cto-tianhuo\SOUL.md`
6. ✅ `C:\Users\10919\.openclaw\agents\cto-tianhuo\agent\models.json`
7. ✅ `C:\Users\10919\Desktop\AI\start-cto-tianhuo.ps1`
8. ✅ `C:\Users\10919\Desktop\AI\call-cto-tianhuo.ps1`

### 需要修改的文件
- 📝 `C:\Users\10919\.openclaw\openclaw.json` (手动添加CTO天火配置)

### 保留的现有文件
- 📁 `C:\Users\10919\Desktop\AI\agents\cto\config.json`
- 📁 `C:\Users\10919\Desktop\AI\agents\cto\agent.prompt`
- 📁 `C:\Users\10919\Desktop\AI\agents\cto\memory.md`

---

## 使用方式

### 方式1: 通过OpenClaw命令
```powershell
# 启动
openclaw agent start cto-tianhuo

# 调用
openclaw agent call cto-tianhuo --message "审查这段代码"
```

### 方式2: 通过PowerShell脚本
```powershell
# 启动
.\start-cto-tianhuo.ps1

# 调用
.\call-cto-tianhuo.ps1 -Task "优化系统架构"
```

### 方式3: 在对话中@提及
```
@天火 请帮我审查这个技术方案
```

### 方式4: 通过大宗师调用
```
@大宗师 请让CTO天火审查我们的技术架构
```

---

## 下一步

完成手动配置后，CTO天火将作为大宗师的子智能体，可以：
1. 接收大宗师分配的技术任务
2. 执行代码审查和架构设计
3. 提供技术决策建议
4. 与OpenClaw系统中的其他智能体协作

如有问题，请查看OpenClaw日志或联系管理员。
