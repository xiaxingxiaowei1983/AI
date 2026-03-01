# CTO天火子智能体集成计划

## 现状分析

天火（CTO）智能体已经存在，配置位于：
- **配置目录**: `C:\Users\10919\Desktop\AI\agents\cto\`
- **已有文件**:
  - `config.json` - 智能体配置（名称：赛博天工）
  - `agent.prompt` - 系统提示词
  - `memory.md` - 长期记忆

## 集成目标
将现有的天火智能体注册为OpenClaw大宗师(main)的子智能体，使其能够通过OpenClaw系统被调用和管理。

## 集成步骤

### 步骤1: 创建OpenClaw代理目录结构
```powershell
# 创建CTO天火的OpenClaw代理目录
mkdir -p C:\Users\10919\.openclaw\agents\cto-tianhuo\agent
mkdir -p C:\Users\10919\.openclaw\agents\cto-tianhuo\sessions
mkdir -p C:\Users\10919\.openclaw\workspace\cto-tianhuo
```

### 步骤2: 创建AGENTS.md
文件位置: `C:\Users\10919\.openclaw\workspace\cto-tianhuo\AGENTS.md`

内容基于现有的`agent.prompt`和`config.json`整合：
- 身份信息（赛博天工 / CTO天火）
- 核心使命（AWKN LAB技术引擎）
- 能力清单（8项核心能力）
- 工作流（规划→执行→评估）
- 约束条件（ADL协议）

### 步骤3: 创建SOUL.md
文件位置: `C:\Users\10919\.openclaw\workspace\cto-tianhuo\SOUL.md`

内容基于`agent.prompt`中的人格特质和`memory.md`中的行为模式：
- 核心特质（前瞻性、数据驱动、团队协作）
- 沟通风格（专业、清晰、简洁）
- 价值观（技术创新与稳定平衡）
- 边界（技术决策范围）

### 步骤4: 创建模型配置
文件位置: `C:\Users\10919\.openclaw\agents\cto-tianhuo\agent\models.json`

配置优先使用编程能力强的模型（Doubao-Seed-Code）。

### 步骤5: 更新openclaw.json
在`C:\Users\10919\.openclaw\openclaw.json`的`agents.list`数组中添加CTO天火配置：

```json
{
  "id": "cto-tianhuo",
  "name": "赛博天工",
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
  "skills": ["git-ssh-sync", "planning-with-files", "mission-control"],
  "companyContext": {
    "name": "AWKN LAB | 定数实验室",
    "mission": "在不确定的世界里，为用户交付确定性",
    "slogan": "命运如水流动，你当不动如山。"
  }
}
```

### 步骤6: 创建启动脚本
创建PowerShell脚本用于快速启动CTO天火：

文件位置: `C:\Users\10919\Desktop\AI\start-cto-tianhuo.ps1`

```powershell
# 启动CTO天火子智能体
Write-Host "启动CTO天火(赛博天工)子智能体..." -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan

# 检查OpenClaw状态
$status = openclaw status 2>&1
if ($status -match "Gateway.*reachable") {
    Write-Host "✓ OpenClaw网关运行正常" -ForegroundColor Green
} else {
    Write-Host "⚠ OpenClaw网关可能未运行，尝试启动..." -ForegroundColor Yellow
    openclaw gateway start
}

# 启动CTO天火智能体
Write-Host "`n正在启动CTO天火..." -ForegroundColor Cyan
openclaw agent start cto-tianhuo

Write-Host "`nCTO天火启动完成！" -ForegroundColor Green
Write-Host "可以通过以下方式调用:" -ForegroundColor Gray
Write-Host "  - 在对话中@赛博天工" -ForegroundColor Gray
Write-Host "  - 使用命令: openclaw agent call cto-tianhuo" -ForegroundColor Gray
```

### 步骤7: 创建快速调用脚本
创建用于快速调用CTO天火执行特定任务的脚本：

文件位置: `C:\Users\10919\Desktop\AI\call-cto-tianhuo.ps1`

```powershell
param(
    [Parameter(Mandatory=$true)]
    [string]$Task,
    
    [string]$Context = ""
)

Write-Host "调用CTO天火执行任务..." -ForegroundColor Cyan
Write-Host "任务: $Task" -ForegroundColor White

if ($Context) {
    Write-Host "上下文: $Context" -ForegroundColor Gray
}

# 构建调用命令
$command = "openclaw agent call cto-tianhuo --message `"$Task`""

if ($Context) {
    $command += " --context `"$Context`""
}

# 执行调用
Invoke-Expression $command
```

### 步骤8: 验证和测试
1. **验证目录结构**
   - 检查OpenClaw代理目录是否正确创建
   - 验证配置文件是否存在

2. **验证配置格式**
   - 使用JSON验证工具检查配置
   - 确保所有必需字段都存在

3. **测试启动**
   - 运行启动脚本
   - 检查CTO天火是否正常启动

4. **测试调用**
   - 测试通过命令调用
   - 测试通过@提及调用

5. **测试父子关系**
   - 验证main智能体能否调用cto-tianhuo
   - 验证权限继承是否正确

## 文件清单

### 需要创建的文件
1. `C:\Users\10919\.openclaw\workspace\cto-tianhuo\AGENTS.md`
2. `C:\Users\10919\.openclaw\workspace\cto-tianhuo\SOUL.md`
3. `C:\Users\10919\.openclaw\agents\cto-tianhuo\agent\models.json`
4. `C:\Users\10919\Desktop\AI\start-cto-tianhuo.ps1`
5. `C:\Users\10919\Desktop\AI\call-cto-tianhuo.ps1`

### 需要修改的文件
1. `C:\Users\10919\.openclaw\openclaw.json` - 添加CTO天火到agents.list

### 现有的文件（保持不变）
1. `C:\Users\10919\Desktop\AI\agents\cto\config.json`
2. `C:\Users\10919\Desktop\AI\agents\cto\agent.prompt`
3. `C:\Users\10919\Desktop\AI\agents\cto\memory.md`

## 成功标准
1. ✅ CTO天火目录结构完整
2. ✅ 所有配置文件格式正确
3. ✅ 能够成功启动CTO天火
4. ✅ CTO天火能够接收和执行任务
5. ✅ 与大宗师(main)的父子关系正确建立
6. ✅ 现有记忆和配置完整保留
7. ✅ 技能(git-ssh-sync等)正常工作

## 时间安排
- 步骤1: 5分钟 (创建目录)
- 步骤2-3: 20分钟 (创建AGENTS.md和SOUL.md)
- 步骤4: 5分钟 (创建模型配置)
- 步骤5: 5分钟 (更新openclaw.json)
- 步骤6-7: 10分钟 (创建脚本)
- 步骤8: 15分钟 (验证和测试)
- **总计**: 约60分钟

## 风险与应对

### 风险1: 配置冲突
**应对**: 仔细检查现有配置，确保新配置与现有配置兼容

### 风险2: 权限问题
**应对**: 确保新代理目录权限正确，必要时手动调整

### 风险3: 父子关系建立失败
**应对**: 验证parent字段配置，确保main智能体存在

### 风险4: 现有记忆丢失
**应对**: 保持原记忆文件不变，只在OpenClaw中创建新的代理配置

### 风险5: 技能无法使用
**应对**: 在配置中正确引用现有技能，确保路径正确

## 集成后的使用方式

### 方式1: 通过OpenClaw命令调用
```bash
# 启动CTO天火
openclaw agent start cto-tianhuo

# 调用CTO天火执行任务
openclaw agent call cto-tianhuo --message "审查这段代码"
```

### 方式2: 通过PowerShell脚本调用
```powershell
# 启动
.\start-cto-tianhuo.ps1

# 调用执行任务
.\call-cto-tianhuo.ps1 -Task "优化系统架构" -Context "当前系统使用Next.js+Convex"
```

### 方式3: 在对话中@提及
在支持OpenClaw的聊天界面中：
```
@赛博天工 请帮我审查这个技术方案
```

### 方式4: 通过大宗师调用
大宗师(main)可以直接调用CTO天火作为子智能体：
```
@大宗师 请让CTO天火审查我们的技术架构
```
