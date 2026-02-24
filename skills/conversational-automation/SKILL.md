---
name: "conversational-automation"
description: "对话式任务自动化 SKILL，用于将自然语言指令转换为自动化任务"
author: "OpenClaw Team"
version: "1.0.0"
category: "automation"
platforms: ["windows", "linux"]
requires: []
config:
  - key: "TASK_MAPPING_PATH"
    value: "./task-mappings"
    description: "任务映射配置路径"
  - key: "EXECUTION_TIMEOUT"
    value: "30000"
    description: "任务执行超时时间"

# 对话式任务自动化 SKILL

## 功能
- 将自然语言指令转换为自动化任务
- 任务流程编排和执行
- 结果反馈和验证
- 学习和优化执行流程

## 使用场景
- 日常运维任务自动化
- 复杂工作流的简化执行
- 跨系统操作的统一接口
- 非技术用户的自动化工具

## 核心组件
### 1. 指令解析和任务映射
- 自然语言处理和意图识别
- 任务模板匹配和生成
- 参数提取和验证

### 2. 流程编排引擎
- 任务依赖管理
- 并行和串行执行
- 错误处理和重试机制

### 3. 执行结果验证
- 执行状态监控
- 结果验证和反馈
- 异常处理和报告

## 配置
### 环境变量
- `TASK_MAPPING_PATH`: 任务映射配置路径
- `EXECUTION_TIMEOUT`: 任务执行超时时间
- `ENABLE_LEARNING`: 是否启用学习功能

### 配置文件
```json
{
  "taskMapping": {
    "path": "./task-mappings",
    "autoUpdate": true
  },
  "execution": {
    "timeout": 30000,
    "maxRetries": 3
  },
  "learning": {
    "enabled": true,
    "modelPath": "./models"
  }
}
```

## 使用示例
### 1. 自然语言指令执行
```bash
# 执行自然语言指令
run-task "重启系统服务"

# 执行带参数的指令
run-task "安装最新版本的 PowerShell"

# 执行复杂指令
run-task "备份数据库并发送到邮箱"
```

### 2. 任务模板管理
```javascript
// task-mappings.json
{
  "重启系统服务": {
    "tasks": [
      {
        "type": "service",
        "action": "restart",
        "service": "openclaw-gateway"
      }
    ]
  },
  "安装最新版本的 PowerShell": {
    "tasks": [
      {
        "type": "package",
        "action": "install",
        "package": "Microsoft.Powershell",
        "source": "winget"
      }
    ]
  },
  "备份数据库并发送到邮箱": {
    "tasks": [
      {
        "type": "database",
        "action": "backup",
        "database": "openclaw",
        "path": "./backups"
      },
      {
        "type": "email",
        "action": "send",
        "to": "admin@example.com",
        "subject": "数据库备份",
        "attachment": "./backups/latest.bak"
      }
    ]
  }
}
```

### 3. 执行结果反馈
```bash
# 执行任务并获取反馈
run-task "检查系统状态" --feedback

# 执行结果示例
{
  "status": "success",
  "message": "系统状态正常",
  "details": {
    "cpu": "45%",
    "memory": "60%",
    "disk": "35%",
    "services": ["running", "running", "running"]
  }
}
```

## 安全
- 指令安全检查
- 权限控制和验证
- 敏感操作审计

## 监控
- 任务执行统计
- 成功率分析
- 执行时间监控

## 维护
- 任务模板更新
- 执行引擎优化
- 错误模式分析和修复