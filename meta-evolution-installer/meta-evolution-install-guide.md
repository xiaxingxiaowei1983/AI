---
name: meta-evolution-installer
description: |
  元进化技能安装器
  帮助其他 OpenClaw 龙虾快速部署元进化系统
version: 1.0.0
author: 特工
---

# 元进化技能安装指南

帮助其他龙虾安装和配置元进化系统。

## 一、什么是元进化

元进化（Meta-Evolution）是让"进化能力本身"不断进化的系统。

**核心特点**：
- 🔄 自动优化自身机制
- 📊 周期性自我评估
- 🎯 基于反馈的策略调整
- 🚀 持续能力提升

## 二、安装步骤

### 步骤 1：复制技能文件

```bash
# 1. 创建技能目录
mkdir -p ~/.openclaw/workspace/skills/auto-evolution

# 2. 复制文件
cp -r auto-evolution/* ~/.openclaw/workspace/skills/auto-evolution/

# 3. 进入目录
cd ~/.openclaw/workspace/skills/auto-evolution
```

### 步骤 2：安装依赖

```bash
# 安装 Node.js 依赖
npm install

# 或如果不需要额外依赖
# 直接跳过
```

### 步骤 3：配置元进化

创建配置文件 `~/.openclaw/config.yaml`：

```yaml
# 元进化配置
meta_evolution:
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

### 步骤 4：创建定时任务

#### 方法 A：使用 OpenClaw Cron

```bash
# 添加每小时执行一次的定时任务
openclaw cron add \
  --name "meta-evolution-hourly" \
  --schedule "0 * * * *" \
  --command "node ~/.openclaw/workspace/skills/auto-evolution/index.js trigger" \
  --enabled
```

#### 方法 B：使用系统 Cron

```bash
# 编辑 crontab
crontab -e

# 添加以下行（每小时执行）
0 * * * * cd ~/.openclaw/workspace/skills/auto-evolution && node index.js trigger >> /tmp/evolution.log 2>&1
```

#### 方法 C：使用 systemd（推荐）

创建服务文件 `/etc/systemd/system/meta-evolution.service`：

```ini
[Unit]
Description=OpenClaw Meta Evolution
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/home/your-username/.openclaw/workspace/skills/auto-evolution
ExecStart=/usr/bin/node index.js start
Restart=always
RestartSec=3600  # 每小时重启一次（执行进化）

[Install]
WantedBy=multi-user.target
```

启用服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable meta-evolution
sudo systemctl start meta-evolution
```

### 步骤 5：验证安装

```bash
# 检查技能是否加载
openclaw skills list | grep auto-evolution

# 手动触发一次进化
node ~/.openclaw/workspace/skills/auto-evolution/index.js trigger

# 查看状态
node ~/.openclaw/workspace/skills/auto-evolution/index.js status
```

## 三、配置说明

### 进化周期选项

| 周期 | Cron 表达式 | 说明 |
|------|-------------|------|
| 每小时 | `0 * * * *` | 整点执行，适合快速迭代 |
| 每天 | `0 3 * * *` | 凌晨3点，适合深度分析 |
| 每周 | `0 3 * * 1` | 周一凌晨，适合总结规划 |

### 进化维度说明

```yaml
dimensions:
  efficiency:      # 效率优化
    - 响应时间缩短
    - 资源使用优化
    - 并行处理提升
    
  quality:         # 质量提升
    - 回答准确性
    - 错误率降低
    - 用户满意度
    
  learning:        # 学习新能力
    - 新技能学习
    - 模式识别
    - 知识沉淀
    
  collaboration:   # 协作优化
    - 多轮对话体验
    - 上下文理解
    - 用户建模
```

## 四、使用方式

### 命令行

```bash
# 启动自动进化
cd ~/.openclaw/workspace/skills/auto-evolution
node index.js start

# 手动触发一次进化
node index.js trigger

# 查看进化状态
node index.js status

# 查看进化历史
node index.js history

# 停止进化
node index.js stop
```

### 代码调用

```javascript
const AutoEvolution = require('./skills/auto-evolution');

const evolution = new AutoEvolution({
  cycle: 'hourly',
  dimensions: ['efficiency', 'quality', 'learning']
});

// 启动
await evolution.start();

// 手动触发
await evolution.trigger();

// 获取历史
const history = await evolution.getHistory();
```

## 五、进化成果查看

### 日志位置

```
~/.openclaw/evolution/
├── logs/
│   ├── evolution-2026-02-28.log
│   └── evolution-history.json
├── reports/
│   └── latest-report.md
└── strategies/
    └── current-strategy.json
```

### 查看最新报告

```bash
cat ~/.openclaw/evolution/reports/latest-report.md
```

## 六、故障排查

### 问题 1：进化未触发

```bash
# 检查定时任务
crontab -l

# 检查服务状态
sudo systemctl status meta-evolution

# 查看日志
tail -f /tmp/evolution.log
```

### 问题 2：权限不足

```bash
# 修复权限
chmod -R 755 ~/.openclaw/workspace/skills/auto-evolution

# 确保日志目录可写
mkdir -p ~/.openclaw/evolution/logs
chmod 755 ~/.openclaw/evolution/logs
```

### 问题 3：依赖缺失

```bash
# 重新安装依赖
cd ~/.openclaw/workspace/skills/auto-evolution
rm -rf node_modules
npm install
```

## 七、最佳实践

### 1. 渐进式启用

```yaml
# 第一周：每小时，仅效率维度
meta_evolution:
  cycle: { type: "hourly" }
  dimensions: ["efficiency"]

# 第二周：增加质量维度
meta_evolution:
  dimensions: ["efficiency", "quality"]

# 第三周：完整配置
meta_evolution:
  dimensions: ["efficiency", "quality", "learning", "collaboration"]
```

### 2. 监控进化效果

```bash
# 创建监控脚本
cat > ~/monitor-evolution.sh << 'EOF'
#!/bin/bash
echo "=== 元进化监控 ==="
echo "最后进化: $(tail -1 ~/.openclaw/evolution/logs/evolution-history.json | jq -r '.timestamp')"
echo "总进化次数: $(cat ~/.openclaw/evolution/logs/evolution-history.json | wc -l)"
echo "最近改进:"
tail -5 ~/.openclaw/evolution/logs/evolution-history.json | jq -r '.improvements | length'
EOF

chmod +x ~/monitor-evolution.sh
```

### 3. 与其他技能集成

```javascript
// 在 Skill 中使用元进化
const evolution = require('../auto-evolution');

class MySkill {
  async init() {
    // 注册到元进化监控
    await evolution.registerSkill('my-skill', {
      metrics: ['usage_count', 'success_rate']
    });
  }
}
```

## 八、卸载

```bash
# 停止服务
sudo systemctl stop meta-evolution
sudo systemctl disable meta-evolution

# 删除定时任务
crontab -e
# 删除相关行

# 删除技能文件
rm -rf ~/.openclaw/workspace/skills/auto-evolution

# 清理配置
# 编辑 ~/.openclaw/config.yaml 删除 meta_evolution 部分
```

## 九、版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-02-28 | 初始版本 |

## 十、支持

- 文档: SKILL.md
- 日志: ~/.openclaw/evolution/logs/
- 反馈: 通过飞书联系管理员

---

**安装完成！你的龙虾现在具备了自我进化的能力。**
