# 公司文档索引

## 一、核心架构文档

### 1. 组织架构与规则
| 文档 | 路径 | 说明 |
|------|------|------|
| 组织架构文档 | [organization_structure.md](shared-memory/coordination/organization_structure.md) | 公司组织架构、智能体职责、决策机制、协作机制 |
| 公司规则分析报告 | [company-rules-analysis-report.md](company-rules-analysis-report.md) | 核心规则体系、决策机制、协作机制、资源管理 |
| 团队协作分析报告 | [team-collaboration-analysis-report.md](team-collaboration-analysis-report.md) | 团队结构、分工逻辑、协作流程、沟通机制 |
| 系统文档 | [system-documentation.md](system-documentation.md) | 系统概述、架构设计、核心功能 |

### 2. 公司大脑架构
| 文档 | 路径 | 说明 |
|------|------|------|
| 架构设计 | [company-brain/docs/architecture-design.md](company-brain/docs/architecture-design.md) | 公司大脑系统架构、核心模块设计 |

---

## 二、智能体配置文件

### 1. 大宗师 (CEO) - `agents/master/`
| 文件 | 说明 |
|------|------|
| [SOUL.md](agents/master/SOUL.md) | 智能体灵魂/人格定义 |
| [USER.md](agents/master/USER.md) | 用户交互模式 |
| [AGENTS.md](agents/master/AGENTS.md) | 与其他智能体的协作关系 |
| [MEMORY.md](agents/master/MEMORY.md) | 记忆系统配置 |
| [TOOLS.md](agents/master/TOOLS.md) | 可用工具列表 |
| [IDENTITY.md](agents/master/IDENTITY.md) | 身份标识 |
| [HEARTBEAT.md](agents/master/HEARTBEAT.md) | 心跳/状态监控 |
| [config.json](agents/master/config.json) | 运行配置 |
| [agent.prompt](agents/master/agent.prompt) | 系统提示词 |

### 2. 绿茶 (内容总监) - `agents/content/`
| 文件 | 说明 |
|------|------|
| [SOUL.md](agents/content/SOUL.md) | 智能体灵魂/人格定义 |
| [USER.md](agents/content/USER.md) | 用户交互模式 |
| [MEMORY.md](agents/content/MEMORY.md) | 记忆系统配置 |

### 3. 大掌柜 (COO) - `agents/coo/`
| 文件 | 说明 |
|------|------|
| [SOUL.md](agents/coo/SOUL.md) | 智能体灵魂/人格定义 |
| [USER.md](agents/coo/USER.md) | 用户交互模式 |
| [AGENTS.md](agents/coo/AGENTS.md) | 与其他智能体的协作关系 |
| [MEMORY.md](agents/coo/MEMORY.md) | 记忆系统配置 |
| [TOOLS.md](agents/coo/TOOLS.md) | 可用工具列表 |
| [IDENTITY.md](agents/coo/IDENTITY.md) | 身份标识 |
| [HEARTBEAT.md](agents/coo/HEARTBEAT.md) | 心跳/状态监控 |
| [agent_registry.json](agents/coo/agent_registry.json) | 智能体注册表 |

### 4. 天火 (CTO) - `agents/cto/`
| 文件 | 说明 |
|------|------|
| [memory.md](agents/cto/memory.md) | 记忆系统 |
| [agent.prompt](agents/cto/agent.prompt) | 系统提示词 |
| [config.json](agents/cto/config.json) | 运行配置 |

### 5. 谛听 (风险哨兵) - `agents/diting/`
| 文件 | 说明 |
|------|------|
| 待补充 | 风险监控、安全审计相关配置 |

### 6. 碧莲 (业务智能体) - `agents/bilian/`
| 文件 | 说明 |
|------|------|
| [SOUL.md](agents/bilian/SOUL.md) | 智能体灵魂/人格定义 |
| [USER.md](agents/bilian/USER.md) | 用户交互模式 |
| [AGENTS.md](agents/bilian/AGENTS.md) | 与其他智能体的协作关系 |
| [MEMORY.md](agents/bilian/memory.md) | 记忆系统配置 |
| [TOOLS.md](agents/bilian/TOOLS.md) | 可用工具列表 |
| [IDENTITY.md](agents/bilian/IDENTITY.md) | 身份标识 |
| [CAPABILITY_LIBRARY.md](agents/bilian/CAPABILITY_LIBRARY.md) | 能力库 |
| [brand/](agents/bilian/brand/) | 品牌相关文档 |
| [operations/](agents/bilian/operations/) | 运营标准文档 |

### 7. 生活智能体 - `agents/life/`
| 文件 | 说明 |
|------|------|
| [SOUL.md](agents/life/SOUL.md) | 智能体灵魂/人格定义 |
| [USER.md](agents/life/USER.md) | 用户交互模式 |
| [AGENTS.md](agents/life/AGENTS.md) | 与其他智能体的协作关系 |
| [MEMORY.md](agents/life/MEMORY.md) | 记忆系统配置 |
| [TOOLS.md](agents/life/TOOLS.md) | 可用工具列表 |
| [IDENTITY.md](agents/life/IDENTITY.md) | 身份标识 |
| [HEARTBEAT.md](agents/life/HEARTBEAT.md) | 心跳/状态监控 |

---

## 三、共享记忆系统

### 目录结构
```
shared-memory/
├── coordination/           # 协调中心
│   ├── organization_structure.md   # 组织架构文档
│   └── task-board.md              # 任务看板
├── system-config/          # 系统配置
│   └── openviking-config.md
└── user-preferences/       # 用户偏好
    └── guoma-style.md
```

---

## 四、能力与进化系统

### 1. 能力树
| 文档 | 路径 | 说明 |
|------|------|------|
| 能力树文档 | [docs/capability-tree.md](docs/capability-tree.md) | 智能体能力结构化定义 |
| 反退化锁定 | [docs/anti-degeneration-lock.md](docs/anti-degeneration-lock.md) | 防止能力退化机制 |

### 2. 进化系统
| 文档 | 路径 | 说明 |
|------|------|------|
| PCEC系统 | [pcec-system.js](pcec-system.js) | 周期性认知扩展循环 |
| PCEC历史 | [pcec-history.json](pcec-history.json) | 进化历史记录 |
| 进化管理器 | [evolution-manager.js](evolution-manager.js) | 进化流程管理 |

---

## 五、技能库

### 目录结构
```
skills/
├── adl-core/               # 反退化锁定核心
├── capability-evolver/     # 能力进化器
├── evomap_*/               # 从EvoMap学习的技能 (11个)
├── canvas/                 # 画布技能
├── github/                 # GitHub集成
├── notion/                 # Notion集成
├── oracle/                 # Oracle技能
├── slack/                  # Slack集成
├── trello/                 # Trello集成
└── ...                     # 更多技能
```

---

## 六、GEP资产库

### 基因与胶囊库
| 文件 | 路径 | 说明 |
|------|------|------|
| GEP资产库 | [evolver/assets/fetched_assets.json](evolver/assets/fetched_assets.json) | 基因(Gene)、胶囊(Capsule)、进化事件存储 |
| 学习日志 | [evolver/learn-logs/](evolver/learn-logs/) | EvoMap学习记录 |

---

## 七、通信协议

### 智能体通信
| 文档 | 路径 | 说明 |
|------|------|------|
| 通信协议 | [agents/common/communication_protocol.md](agents/common/communication_protocol.md) | 智能体间通信规范 |
| 公司上下文 | [agents/common/company_context.md](agents/common/company_context.md) | 公司背景信息 |

---

## 八、任务管理

### 任务队列
| 文件 | 路径 | 说明 |
|------|------|------|
| 任务队列 | [tasks/task-queue.json](tasks/task-queue.json) | 待处理任务队列 |
| 任务历史 | [tasks/task-history.json](tasks/task-history.json) | 任务执行历史 |

---

## 九、配置文件

### 系统配置
| 文件 | 路径 | 说明 |
|------|------|------|
| OpenClaw配置 | [openclaw.json](openclaw.json) | OpenClaw系统配置 |
| 模型配置 | [configs/llm_config.json](configs/llm_config.json) | LLM模型配置 |
| 设置 | [configs/settings.json](configs/settings.json) | 全局设置 |

### 脚本工具
| 文件 | 路径 | 说明 |
|------|------|------|
| 文档索引 | [scripts/doc-indexer.js](scripts/doc-indexer.js) | 自动扫描和索引文档 |
| 文档搜索 | [scripts/doc-search.js](scripts/doc-search.js) | 搜索文档内容 |
| 文档版本 | [scripts/doc-version.js](scripts/doc-version.js) | 文档版本管理 |
| 技能发现 | [scripts/skill-discovery.js](scripts/skill-discovery.js) | 自动发现技能模块 |
| 健康检查 | [scripts/system-health-check.js](scripts/system-health-check.js) | 系统健康监控 |
| 能力评估 | [agents/registry/capability-assessment.js](agents/registry/capability-assessment.js) | 智能体能力评估 |

---

## 十、组织架构概览

```
AI公司
┌─────────────────────────────────────────────────────────────┐
│                     公司大脑 (Company Brain)                 │
│                   智能体调度中心 / 中枢神经系统               │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │   大宗师      │  │    绿茶       │  │   大掌柜      │   │
│  │   (CEO)       │  │   (Content)   │  │   (COO)       │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │   天火        │  │    谛听       │  │    碧莲       │   │
│  │   (CTO)       │  │   (风险哨兵)  │  │   (业务)      │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 核心智能体职责

| 智能体 | 角色 | 核心职责 | 工作区 |
|--------|------|----------|--------|
| 公司大脑 | 调度中心 | 管理规则、协调智能体、监控系统 | 全局 |
| 大宗师 | CEO | 战略决策、重大项目、对外沟通 | agents/master/ |
| 绿茶 | 内容总监 | 心理测试、内容创作、用户服务 | agents/content/ |
| 大掌柜 | COO | 运营管理、任务调度、资源协调 | agents/coo/ |
| 天火 | CTO | 技术架构、系统开发、技术决策 | agents/cto/ |
| 谛听 | 风险哨兵 | 风险监控、安全审计、预警 | agents/diting/ |
| 碧莲 | 业务专家 | 业务执行、客户服务、运营支持 | agents/bilian/ |

---

**版本**: 1.0  
**更新日期**: 2026-02-28  
**维护者**: 公司大脑
