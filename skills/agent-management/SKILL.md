---
name: "agent-management"
description: "智能体管理 SKILL，用于启动和管理不同类型的智能体（如大宗师智能体）"
author: "OpenClaw Team"
version: "1.0.0"
category: "system"
platforms: ["windows", "linux"]
requires: []
config:
  - key: "AGENTS_DIRECTORY"
    value: "./agents"
    description: "智能体存储目录"
  - key: "DEFAULT_AGENT"
    value: "default"
    description: "默认智能体"

# 智能体管理 SKILL

## 功能
- 启动和管理不同类型的智能体（如大宗师智能体）
- 智能体配置和状态监控
- 多智能体协同工作流
- 智能体生命周期管理

## 使用场景
- 快速部署特定领域的智能体（如商业分析、技术支持）
- 智能体集群管理和负载均衡
- 基于场景自动切换智能体
- 智能体版本控制和升级

## 核心组件
### 1. 智能体生命周期管理
- 智能体启动、停止、重启
- 状态监控和健康检查
- 自动恢复和故障转移

### 2. 配置自动化
- 智能体配置模板管理
- 环境变量自动配置
- 配置版本控制

### 3. 状态监控和告警
- 智能体运行状态监控
- 资源使用情况统计
- 异常情况告警

## 配置
### 环境变量
- `AGENTS_DIRECTORY`: 智能体存储目录
- `DEFAULT_AGENT`: 默认智能体
- `AGENT_TIMEOUT`: 智能体超时时间

### 配置文件
```json
{
  "agents": {
    "directory": "./agents",
    "default": "default",
    "timeout": 30000
  },
  "monitoring": {
    "enabled": true,
    "interval": 60000
  },
  "security": {
    "enableAuth": true,
    "authMethod": "openid"
  }
}
```

## 使用示例
### 1. 启动智能体
```bash
# 启动默认智能体
agentctl start

# 启动特定智能体
agentctl start --agent master

# 停止智能体
agentctl stop --agent master

# 查看智能体状态
agentctl status
```

### 2. 智能体配置
```yaml
# agents/master/openclaw.json
{
  "model": {
    "provider": "local",
    "api_key": "none",
    "require_api_key": false
  },
  "evo": {
    "enable": true,
    "review": true,
    "autoImprove": true
  },
  "agent": {
    "name": "大宗师",
    "trigger": "@大宗师",
    "autoRun": true,
    "continuousMode": true
  },
  "workspace": {
    "autoClean": false,
    "backup": true
  }
}
```

### 3. 多智能体协同
```javascript
// agent-orchestrator.js
const { AgentManager } = require('./agent-manager');

async function orchestrateAgents(task) {
  const manager = new AgentManager();
  
  // 根据任务类型选择合适的智能体
  let agentName;
  if (task.type === 'business') {
    agentName = 'master'; // 大宗师智能体
  } else if (task.type === 'technical') {
    agentName = 'tech'; // 技术智能体
  } else {
    agentName = 'default'; // 默认智能体
  }
  
  // 启动智能体并执行任务
  await manager.startAgent(agentName);
  const result = await manager.executeTask(agentName, task);
  
  return result;
}

orchestrateAgents({ type: 'business', content: '分析电商行业竞争格局' }).then(console.log);
```

## 安全
- 智能体权限控制
- 访问认证和授权
- 敏感操作验证

## 监控
- 智能体运行状态
- 任务执行统计
- 性能指标监控

## 维护
- 智能体版本管理
- 配置备份和恢复
- 日志管理和分析