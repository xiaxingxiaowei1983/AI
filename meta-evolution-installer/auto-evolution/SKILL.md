---
name: auto-evolution
description: |
  自动进化定时任务系统
  支持周期性自我优化、能力评估、策略更新
version: 1.0.0
author: OpenClaw
---

# Auto Evolution 系统

自动执行元进化周期的完整解决方案。

## 功能特性

- ⏰ **定时进化**：每小时/每天自动执行进化周期
- 📊 **自我评估**：自动分析性能指标
- 🔄 **策略更新**：根据反馈自动调整策略
- 📝 **进化日志**：记录每次进化的详细过程
- 🎯 **目标追踪**：追踪长期进化目标

## 安装

```bash
cp -r auto-evolution ~/.openclaw/workspace/skills/
cd ~/.openclaw/workspace/skills/auto-evolution
npm install
```

## 配置

```yaml
# ~/.openclaw/config.yaml
auto_evolution:
  enabled: true
  
  # 进化周期
  cycle:
    type: "hourly"  # hourly, daily, weekly
    hour: 3         # 如果是 daily，几点执行
    minute: 0
  
  # 进化维度
  dimensions:
    - efficiency     # 效率优化
    - quality        # 质量提升
    - learning       # 学习新能力
    - collaboration  # 协作优化
  
  # 评估指标
  metrics:
    response_time: true
    success_rate: true
    user_satisfaction: true
    capability_growth: true
  
  # 通知设置
  notification:
    on_completion: true
    on_error: true
    channel: "feishu"  # 通知渠道
```

## 使用方法

### 启动自动进化

```javascript
const AutoEvolution = require('./auto-evolution');

const evolution = new AutoEvolution();

// 启动定时进化
await evolution.start();

// 手动触发一次进化
await evolution.trigger();

// 查看进化历史
const history = await evolution.getHistory();
```

### 命令行

```bash
# 启动自动进化
openclaw skill auto-evolution start

# 手动触发
openclaw skill auto-evolution trigger

# 查看状态
openclaw skill auto-evolution status

# 查看进化历史
openclaw skill auto-evolution history

# 停止自动进化
openclaw skill auto-evolution stop
```

## API 参考

### start()

启动定时进化任务。

### trigger()

手动触发一次进化周期。

### getHistory()

获取进化历史记录。

**返回**：
```javascript
[
  {
    timestamp: "2026-02-28T10:00:00Z",
    type: "hourly",
    improvements: [
      { type: "efficiency", value: 0.15 }
    ],
    new_capabilities: ["skill-xxx"],
    metrics: {
      response_time: 1.2,
      success_rate: 0.95
    }
  }
]
```

## License

MIT
