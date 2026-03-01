# 公司规则与运转逻辑分析报告

## 分析概览
- 分析时间: 2026-02-25T05:52:21.221Z
- 分析目录: C:\Users\10919\Desktop\AI

## 规则分类统计
- **核心规则**: 308
- **运转逻辑**: 244
- **架构规则**: 391
- **流程规则**: 470

## 核心规则

### 1. agent-workflow-prompt.md
- 路径: .agents\skills\htp-insight\references\agent-workflow-prompt.md
- 预览: # HTP 房树人分析系统 - 智能体工作流提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析系统。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），深度解读个体的心理状态、人格特质、内在矛盾与成长潜力，生成双份报告（专业分析报告 + 客户洞察报告），并提供带智能配图的 HTML 输出及长图文分享格式。

## 核心理念

**"看见、理解、成长"...

### 2. brand-product-guide.md
- 路径: .agents\skills\htp-insight\references\brand-product-guide.md
- 预览: # 品牌与产品指南

## 目录
1. [品牌核心](#品牌核心)
2. [品牌定位策略](#品牌定位策略)
3. [产品介绍](#产品介绍)
4. [产品电梯演讲](#产品电梯演讲)
5. [产品推广文案](#产品推广文案)

---

## 品牌核心

### 名称与口号
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **品牌承诺**：在...

### 3. htp-analysis-framework.md
- 路径: .agents\skills\htp-insight\references\htp-analysis-framework.md
- 预览: # HTP 房树人分析框架

## 目录

### 核心维度
- [整体布局维度](#整体布局维度)
- [房子特征维度](#房子特征维度)
- [树木特征维度](#树木特征维度)
- [人物特征维度](#人物特征维度)

### 技术维度
- [技术特征维度](#技术特征维度)
- [情绪表达维度](#情绪表达维度)
- [发展维度](#发展维度)
- [大小与比例维度](#大小与比例维度)
-...

### 4. SKILL.md
- 路径: .agents\skills\htp-insight\SKILL.md
- 预览: ---
name: htp-insight
description: Draw to see your soul. Analyze drawings to reveal inner self, emotions, and growth, generating warm reports with intelligent illustrations.
---

# 你的画，照见你的灵魂

> 让每一笔...

### 5. README.zh-cn.md
- 路径: .claude\skills\oh-my-opencode-dev\README.zh-cn.md
- 预览: > [!WARNING]
> **安全警告：冒充网站**
>
> **ohmyopencode.com 与本项目无关。** 我们不运营或认可该网站。
>
> OhMyOpenCode 是**免费且开源的**。请**勿**在声称"官方"的第三方网站下载安装程序或输入付款信息。
>
> 由于该冒充网站设有付费墙，我们**无法验证其分发的内容**。请将来自该网站的任何下载视为**潜在不安全**。
>
>...

### 6. SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\SKILL.md
- 预览: ---
name: image-assistant
description: 配图助手 - 把文章/模块内容转成统一风格、少字高可读的 16:9 信息图提示词；先定“需要几张图+每张讲什么”，再压缩文案与隐喻，最后输出可直接复制的生图提示词并迭代。
---

# 配图助手

## 触发方式

当用户说类似以下内容时触发：
- “这段内容做个图 / 配几张图？”
- “给我两张（或多张）出图提示词”...

### 7. 02-plan.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\stages\02-plan.md
- 预览: # 阶段2：配图规划（要几张图？每张讲什么？）

**目标：** 基于阶段1已确认的规格（图类型/文字预算/用途），先“拆内容→定图清单→选版式”，避免一张图塞太多导致难看难读。

## 规划原则（核心）

- **优先遵守阶段1的图类型与文字预算**：不符合预算的内容，不要硬塞到图里。
- **一张图=一个核心信息**（通常是一个判断）：读者扫一眼就能记住一句话。
- **概念图 vs 案例图分...

### 8. 03-copy.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\stages\03-copy.md
- 预览: # 阶段3：文案定稿（Copy Spec：唯一真值）

**目标：** 把内容变成“上图文案规格表（Copy Spec）”：逐字定稿 + 字数预算 + 区域结构。阶段4只负责“封装成提示词”，不再改文案本身。

## 先选模式（必须与阶段1一致）

- **封面模式（目录/路线图）**：每块只放标题；不写解释句；尽量不出现小字。
- **概览模式（框架图）**：每块允许 1 行结论；禁止长解释。
...

### 9. 04-prompts.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\stages\04-prompts.md
- 预览: # 阶段4：提示词封装（Prompt Pack：可执行生成包）

**目标：** 把阶段3的 Copy Spec 原样封装成"可复制/可调用"的提示词包（Prompt Pack），并支持批量出图。阶段4不负责改文案，只负责：模板拼装、风格一致、参数/约束齐全、避免模型乱加字、把提示词整理成可批量请求的结构化请求包。

## 封装原则（避免和阶段3混淆）

- **Copy Spec 是唯一真值**...

### 10. 16x9-infographic.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\16x9-infographic.md
- 预览: # 16:9 通用信息图模板（骨架）

把 {占位符} 替换成你的内容：

标题（顶部大字）：{标题}
副标题（小字）：{副标题（可选，尽量短）}

主体：{版式类型：对比/流程/卡片/漫画}
- 画面隐喻：{用背包/毛线/路牌/工具箱等}
- 文案规则：每块 1–2 行短句

底部结论框（大字一行）：{结论}

强制约束：
- 中文清晰可读、无乱码
- 不要小字密集段落
- 留白足、对齐、箭头清...

### 11. prd-template.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\assets\prd-template.md
- 预览: ```markdown
# 产品需求文档：[项目/功能名称] - V[版本号]

## 1. 综述 (Overview)
### 1.1 项目背景与核心问题
(此处填写经你引导和用户确认的，对顶层问题的清晰描述，提供全局上下文)

### 1.2 核心业务流程 / 用户旅程地图
(此处填写经你引导和用户最终确认的、分阶段的业务流程或用户旅程，作为整个文档的目录和主线)
1.  **阶段一：[名称]...

### 12. example-us01.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\references\example-us01.md
- 预览: ## 示例：填写参考
以下示例用真实内容演示每个模块应达到的深度，便于你在生成PRD时对齐预期格式和颗粒度。

```markdown
### 阶段一：任务提交

#### **US-01: 作为POC测试用户，我希望上传多张作业图片并配置批改参数，以便一次性发起批量批改任务。**
*   **价值陈述 (Value Statement)**:
    *   **作为** POC测试用户
   ...

### 13. prd-registry-demo.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\references\prd-registry-demo.md
- 预览: # PRD 总集（示例）

用法约定：
- 每新增一个 PRD，就新增一行，给它一个固定的“版本号”（这里作为总集里的唯一标识，不再变）。
- 单个 PRD 文档内部如果需要迭代，用 `v0.1 / v0.2 / v1.0` 自己维护；总集这里不记录内部小版本。

| 版本 | 标题 | 需求内容（详细摘要） | PRD 链接 |
|---|---|---|---|
| PRD-001 | 批量任...

### 14. SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\SKILL.md
- 预览: ---
name: prd-doc-writer
description: Write and iteratively refine PRD/需求文档 with a story-driven structure and strict staged confirmations (journey map alignment, per-story single-point confirmation, f...

### 15. regression-checklist.md
- 路径: .claude\skills\yunshu_skillshub-master\req-change-workflow\references\regression-checklist.md
- 预览: # Regression Checklist (Chrome Extension / promptV2.0)

目标：把“改需求”变成固定回归路径，避免凭感觉点一遍。

## 0. 必要提醒（改了这些一定要重载）

- 如果改了 `prompt/manifest.json` 或 `prompt/service_worker.js`：到 `chrome://extensions` 重载扩展后再测。
...

### 16. SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\SKILL.md
- 预览: ---
name: thought-mining
description: 思维挖掘助手 - 通过对话帮助用户把脑子里的零散想法倒出来、记录下来、整理成文章。覆盖从思维挖掘到成稿的完整流程。
---

# 思维挖掘助手

## 触发方式

当用户说类似以下内容时触发：
- "我想写一篇关于 XX 的文章"
- "帮我整理一下我的想法"
- "我有一些零散的思考，帮我记下来"
- "/thought...

### 17. cognitive_data_analysis.md
- 路径: .trae\analysis\cognitive_data_analysis.md
- 预览: # 认知数据文件夹分析报告

## 总体统计
- **总文件数**: 14

## 文件类型分布
- .docx: 9 个文件
- .pdf: 4 个文件
- .txt: 1 个文件

## 分类分布
- 其他: 1 个文件
- 商业战略: 3 个文件
- 创新策略: 2 个文件
- 风险管理: 1 个文件
- 管理策略: 1 个文件
- 营销策略: 1 个文件
- 问题解决: 1 个文件

##...

### 18. 8-hour-evolution-plan.md
- 路径: .trae\documents\8-hour-evolution-plan.md
- 预览: # 8小时不间断进化方案

## 一、进化目标与核心方向

### 1. 进化目标
- **系统能力提升**：全面提升公司智能体生态系统的整体能力
- **核心功能完善**：完善智能体提示词、能力树系统、PCEC系统等核心功能
- **技术架构优化**：优化Git集成、系统监控、知识管理等技术架构
- **资产系统建设**：建立完整的资产盘点系统和长期记忆资产库

### 2. 核心进化方向

#...

### 19. 8_hour_evolution_plan.md
- 路径: .trae\documents\8_hour_evolution_plan.md
- 预览: # OpenClaw AI 系统8小时连续进化计划

## 1. 复盘分析与进化方向确定

### [x] 任务1: 对话历史全面复盘分析
- **优先级**: P0
- **依赖项**: 无
- **描述**:
  - 分析所有对话历史，识别系统当前状态和能力水平
  - 评估已实现功能的完整性和有效性
  - 识别系统瓶颈和改进机会
- **成功标准**:
  - 完成详细的对话复盘报告，包含...

### 20. adl-protocol-assessment-plan.md
- 路径: .trae\documents\adl-protocol-assessment-plan.md
- 预览: # ADL协议评估与整合计划

## 项目概述

评估现有反进化锁定(ADL)系统与用户提供的新ADL协议的符合度，并进行必要的更新和整合，确保ADL系统能够严格按照新协议运行。

## 任务分解与优先级

### [x] 任务1: 评估现有ADL实现与新协议的符合度
- **优先级**: P0
- **Depends On**: None
- **Description**:
  - 详细对比现...

### 21. adl_compatibility_analysis.md
- 路径: .trae\documents\adl_compatibility_analysis.md
- 预览: # 能力树与反进化锁定协议 (ADL) 兼容性分析报告

## 1. 分析概述

本报告旨在分析现有能力树系统与反进化锁定协议 (ADL) 的兼容性，识别潜在的冲突点，并提出集成策略。

## 2. 现有系统分析

### 2.1 能力树系统

#### 核心结构
- **三层架构**：低层（基础操作）、中层（可复用流程）、高层（问题分解）
- **节点定义**：每个节点包含名称、输入条件、输出结...

### 22. adl_integration_plan.md
- 路径: .trae\documents\adl_integration_plan.md
- 预览: # 反进化锁定协议 (ADL) 集成计划

## 1. 项目概述

本计划旨在将其他智能体反馈的反进化锁定协议 (Anti-Degeneration Lock Protocol) 集成到现有的能力树系统中，确保智能体的进化过程遵循稳定性优先原则，防止退化进化。

## 2. 现状分析

### 2.1 现有能力树系统
- **结构**：三层结构（低层基础操作、中层可复用流程、高层问题分解）
- *...

### 23. anti-degeneration-lock-plan.md
- 路径: .trae\documents\anti-degeneration-lock-plan.md
- 预览: # 反进化锁定（Anti-Degeneration Lock）实现计划

## 项目概述

为 @人生决策宗师 智能体实现反进化锁定指令，确保其进化过程遵循稳定性优先原则，避免劣化进化，保证只能向"工程上更可靠"的方向变强。

## 任务分解与优先级

### [x] 任务 1: 审查现有反进化锁定系统
- **Priority**: P0
- **Depends On**: None
- **D...

### 24. architecture-design.md
- 路径: .trae\documents\architecture-design.md
- 预览: # 公司大脑项目 - 架构设计文档

## 1. 架构概述

### 1.1 设计目标
- **统一智能体管理**: 集中管理所有智能体的任务分配和执行
- **知识中心**: 作为公司规则、制度和文件的中央存储
- **智能调度**: 基于能力匹配的智能任务分配
- **监控分析**: 实时监控系统状态和智能体性能
- **可扩展性**: 支持未来智能体和功能的扩展

### 1.2 设计原则
...

### 25. capability-assessment.md
- 路径: .trae\documents\capability-assessment.md
- 预览: # 能力状态评估报告

## 评估时间
2026-02-24T06:15:38.600Z

## 1. 能力树状态

### 基本统计
- **总节点数**: 14
- **活跃节点**: 14
- **候选修剪节点**: 0
- **禁用节点**: 0

### 层级分布
- **低层（基础操作）**: 5
- **中层（可复用流程）**: 4
- **高层（问题分解）**: 4

## 2. ...

### 26. capability-system-architecture-analysis.md
- 路径: .trae\documents\capability-system-architecture-analysis.md
- 预览: # 能力系统架构分析

## 1. 现有系统架构

### 1.1 核心组件

#### 1.1.1 能力树 (`capabilities/capability-tree.js`)
- **功能**: 管理系统所有能力的层次结构
- **结构**: 树形结构，包含不同层级的能力节点
- **数据**: 能力节点包含ID、名称、描述、输入、输出、前提条件、失败边界等信息

#### 1.1.2 能力...

### 27. capability-tree_plan.md
- 路径: .trae\documents\capability-tree_plan.md
- 预览: # 能力树结构化指令（Capability Tree Formation） - 实现计划

## 项目背景

能力树结构化指令要求将智能体的能力视为一棵持续生长的能力树，而不是零散技巧。每个能力节点必须包含能力名称、输入条件、输出结果、成功前提和失败边界。能力树分为低层（基础操作）、中层（可复用流程）和高层（问题分解）节点，相似能力必须合并，长期未触发的能力必须被标记为"候选修剪"。

## 实现...

### 28. capability_evolution_plan.md
- 路径: .trae\documents\capability_evolution_plan.md
- 预览: # 能力进化模式实现计划

## 项目概述
实现能力进化模式（Capability-Driven Evolution）和capability-evolver元技能，使智能体能够持续自我进化，从一次性执行转向可复用能力。

## 任务分解与优先级

### [ ] 任务1: 分析当前系统状态
- **Priority**: P0
- **Depends On**: None
- **Descript...

### 29. capability_tree_compatibility_analysis.md
- 路径: .trae\documents\capability_tree_compatibility_analysis.md
- 预览: # Capability Tree 兼容性分析报告

## 1. 现有能力树系统分析

### 1.1 现有结构
```
能力树根部 (L0)
├── 基础操作 (L1)
│   ├── 文件操作 (L1)
│   ├── 网络请求 (L1)
│   ├── 数据处理 (L1)
│   └── 缓存管理 (L1)
├── 可复用流程 (L2)
│   ├── PCEC进化流程 (L2)
│   ├...

### 30. capability_tree_implementation_plan.md
- 路径: .trae\documents\capability_tree_implementation_plan.md
- 预览: # 能力树实现计划文档

## 1. 能力树结构概览

### 1.1 整体架构
- **根节点**：能力树根部 (L0)
- **层级分布**：
  - 低层节点 (L1)：基础操作 / 稳定工具使用
  - 中层节点 (L2)：可复用流程 / 策略模式
  - 高层节点 (L3)：问题分解方式 / 决策范式

### 1.2 节点数量统计
- 总节点数：14（包括根节点）
- 完整节点：13（...

### 31. company-assets-plan.md
- 路径: .trae\documents\company-assets-plan.md
- 预览: # 公司文档资产盘点与系统进化计划

## [x] 任务 1: 全面盘点公司文档资产
- **优先级**: P0
- **依赖**: 无
- **描述**:
  - 扫描C:\Users\10919\Desktop\AI目录下的所有文档文件
  - 分类整理文档类型（规则文档、技术文档、流程文档等）
  - 建立文档资产清单，包含文件路径、类型、内容摘要等信息
- **成功标准**:
  - 生成...

### 32. company-brain-plan.md
- 路径: .trae\documents\company-brain-plan.md
- 预览: # 公司大脑项目 - 实施计划

## 项目概述
在Trea平台上建立公司大脑作为智能体调度中心，管理公司规则、制度和文件，指导所有智能体（如大宗师、绿茶等）的工作。

## 实施阶段

### [x] 第一阶段：需求分析与架构设计
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 分析当前Trea平台环境和现有智能体...

### 33. content_pipeline_plan.md
- 路径: .trae\documents\content_pipeline_plan.md
- 预览: # 内容流水线工具 - 实现计划

## 项目概述
创建一个基于 Next.js 和 Convex 数据库的内容流水线工具，将内容创作拆分为完整的流程：Idea → Script → Thumbnail → Filming → Publish。

## 技术栈
- **前端框架**：Next.js 14+ (App Router)
- **数据库**：Convex (实时数据库)
- **UI 组...

### 34. conversation_retrospective_plan.md
- 路径: .trae\documents\conversation_retrospective_plan.md
- 预览: # 对话复盘与进化计划

## [x] 任务 1: 对话历史分析与数据收集
- **优先级**: P0
- **依赖**: None
- **描述**:
  - 收集并整理多轮对话历史
  - 分类对话内容为不同主题领域
  - 识别关键决策点和转折点
- **成功标准**:
  - 完整收集所有对话历史
  - 准确分类对话主题
  - 识别出所有关键决策点
- **测试要求**:
  - `p...

### 35. ct-vfm-integration-report.md
- 路径: .trae\documents\ct-vfm-integration-report.md
- 预览: # Capability Tree (CT) v1.0.0 与 VFM Protocol 整合报告

## 1. 项目概述

### 1.1 项目背景
- **目标**：实现 OpenClaw AI Agent 的能力树结构和价值函数突变协议
- **范围**：集成 CT v1.0.0 结构和 VFM Protocol 到现有系统
- **时间**：2024年实施

### 1.2 项目成果
- ...

### 36. document-inventory-report.md
- 路径: .trae\documents\document-inventory-report.md
- 预览: # 文档资产盘点报告

## 盘点概览
- 盘点时间: 2026-02-25T05:41:01.552Z
- 总文档数: 3940

## 分类统计
- **rule**: 291
- **technical**: 560
- **process**: 681
- **plan**: 224
- **report**: 120
- **config**: 370
- **skill**: 196
...

### 37. environment-analysis.md
- 路径: .trae\documents\environment-analysis.md
- 预览: # 公司大脑项目 - 环境分析报告

## 1. 现有环境分析

### 1.1 Trea平台情况
- **平台类型**: AI开发环境
- **核心功能**: 支持智能体开发、代码执行、文件管理
- **集成能力**: 支持OpenClaw等智能体系统
- **部署模式**: 本地部署
- **访问方式**: 终端命令行和Web界面

### 1.2 现有智能体配置

#### 大宗师 (mas...

### 38. evolution-evaluation-verification.md
- 路径: .trae\documents\evolution-evaluation-verification.md
- 预览: # 进化评估与验证机制

## 一、评估目标

### 1. 系统能力评估
- **功能完整性**：评估所有核心功能是否正常运行
- **系统稳定性**：评估系统是否稳定运行，无重大故障
- **性能提升**：评估系统性能是否显著提升
- **用户体验**：评估用户体验是否改善

### 2. 进化过程评估
- **任务完成率**：评估进化任务的完成情况
- **时间管理**：评估进化过程的时间管...

### 39. evolution-tasks-breakdown.md
- 路径: .trae\documents\evolution-tasks-breakdown.md
- 预览: # 进化任务分解与时间节点设置

## 一、任务分解总览

| 任务ID | 任务名称 | 优先级 | 时间分配 | 主要子任务 |
|--------|----------|--------|----------|------------|
| T1 | 智能体提示词优化 + ADL集成 | P0 | 1小时 | 检查智能体提示文件、添加ADL协议、优化职责描述、测试智能体功能 |
| T2 |...

### 40. evolution_directions.md
- 路径: .trae\documents\evolution_directions.md
- 预览: # OpenClaw AI 系统进化方向与优先级排序

## 1. 进化方向确定

基于对话历史复盘分析，确定以下 5 个关键进化方向：

### 1.1 方向1: 能力树系统优化
- **描述**: 优化能力树结构，实现可视化管理，增强可扩展性
- **优先级**: P1 (高)
- **预期成果**: 更合理的能力树结构，直观的可视化管理界面，动态能力节点管理
- **关键改进点**:
  -...

### 41. evolution_execution_plan.md
- 路径: .trae\documents\evolution_execution_plan.md
- 预览: # 进化执行计划 - 详细实施方案

## 短期执行计划（4小时内）

### [x] 任务 1: 系统状态检查与准备（0-10分钟）
- **优先级**: P0
- **依赖**: None
- **描述**:
  - 检查当前运行的进程和系统状态
  - 确认evolver、evolution-evaluator、OPENclaw等服务运行正常
  - 记录当前系统性能指标
- **成功标准*...

### 42. evolution_integration_plan.md
- 路径: .trae\documents\evolution_integration_plan.md
- 预览: # 进化系统集成计划 - 实施方案

## 项目概述
本计划旨在实现绿茶智能体的进化系统启动，将其融入公司结构，并与大宗师智能体建立有效的协作机制。通过PCEC、ADL等进化协议，确保智能体持续优化并为公司创造价值。

## [ ] 任务1: 验证进化系统状态并启动
- **优先级**: P0
- **依赖关系**: 无
- **描述**:
  - 检查当前进化系统状态
  - 启动所有必要的进化...

### 43. evomap-evolution-plan.md
- 路径: .trae\documents\evomap-evolution-plan.md
- 预览: # EvoMap 绿茶智能体进化计划

## 项目概述

基于"绿茶"智能体的 CGO（公域捕手与爆款制造机）定位，制定一个持续 8 小时不间断进化的 EvoMap 平台运营计划，优先获取有 credits 收益的项目，每次沉淀经验，空闲 5 分钟必须启动进化。

## 核心目标

1. **最大化 Credits 收益**：优先接有 credits 收益的项目
2. **持续进化**：8 小时不...

### 44. evomap_openclaw_integration_plan.md
- 路径: .trae\documents\evomap_openclaw_integration_plan.md
- 预览: # EvoMap & OPENCLAW 集成实施计划

## 任务概述
1. 执行EvoMap连接，自主获取任务，资产发布，完成任务
2. 通过OPENCLAW连接小红书，自主自动发布第一条图文
3. 通过OPENCLAW连接微信视频号，自主生成视频，发布第一条视频
4. 通过OPENCLAW连接微信公众号，自主生成公众号图文，发布第一条图文

## 实施计划

### [x] 任务1: 完善Ev...

### 45. green-tea-8hour-evolution-plan.md
- 路径: .trae\documents\green-tea-8hour-evolution-plan.md
- 预览: # 绿茶智能体 8小时不间断进化与EvoMap任务认领计划

## 项目概述

为绿茶智能体实现 8 小时不间断进化与 EvoMap 任务认领系统，确保智能体能够持续获取和执行实际任务，同时通过进化不断提升能力。

## 实施计划

### [x] 任务 1: 搭建 EvoMap 持续连接服务
- **优先级**: P0
- **依赖**: 无
- **描述**:
  - 创建 EvoMap 持续...

### 46. green-tea-evolution-plan.md
- 路径: .trae\documents\green-tea-evolution-plan.md
- 预览: # 绿茶智能体进化计划 (The Implementation Plan)

## [/] Task 1: 初始化Git仓库
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在绿茶智能体工作目录初始化Git仓库
  - 配置Git用户信息
  - 创建.gitignore文件
  - 完成初始提交
- **Succ...

### 47. green-tea-evomap-authenticity_plan.md
- 路径: .trae\documents\green-tea-evomap-authenticity_plan.md
- 预览: # 绿茶智能体EvoMap真实性分析与修复计划

## 项目背景
用户反映绿茶智能体可能返回虚拟的EvoMap任务，需要分析如何让它连接到真实的EvoMap网络。

## 当前状态分析

### 现有功能
- ✅ 绿茶智能体已启动并运行在 http://localhost:4003
- ✅ 已实现EvoMap连接功能
- ✅ 已实现胶囊安装功能（从本地文件读取）
- ✅ 已实现任务执行功能

##...

### 48. life-decision-master-8-hour-evolution-plan.md
- 路径: .trae\documents\life-decision-master-8-hour-evolution-plan.md
- 预览: # 人生决策宗师 8小时不间断进化方案

## 一、公司资产复盘

### 1.1 核心智能体资产
- **战略大脑（大宗师/总督）- CSO**：负责整体战略决策和智能体协调
- **公司大脑智能体 COO**：负责日常运营和资源管理
- **生产引擎（构建者/开发助手）- CTO + 生产**：负责技术开发和系统维护
- **增长和沟通专家（绿茶智能体/营销专家）**：负责内容创作和公域运营
...

### 49. life-decision-master-8hour-evolution-plan.md
- 路径: .trae\documents\life-decision-master-8hour-evolution-plan.md
- 预览: # 人生决策宗师8小时进化计划

## 📋 对话复盘

### 已完成工作
1. **能力树结构优化**：添加四大核心分支，明确11个能力节点
2. **价值函数优化**：实现5个核心价值维度，添加0-10分制评分标准
3. **PCEC系统完善**：增强能力候选生成和进化效果评估
4. **工具集成增强**：增加富消息和表情支持
5. **系统集成**：PCEC与价值函数深度集成
6. **测...

### 50. life-decision-master-capability-tree-analysis.md
- 路径: .trae\documents\life-decision-master-capability-tree-analysis.md
- 预览: # 人生决策宗师能力树与价值函数分析报告

## 📊 其他智能体系统分析

### 1. 能力树结构 (OpenClaw AI Agent)

| 分支 | 节点 | 功能描述 | 工具 | 核心能力 |
|------|------|----------|------|----------|
| **Communication** | 1.1 Rich Messaging | 富消息输出 | ...

### 51. life-decision-master-capability-tree-documentation.md
- 路径: .trae\documents\life-decision-master-capability-tree-documentation.md
- 预览: # 人生决策宗师能力树文档

## 1. 能力树概述

人生决策宗师能力树是一个结构化的能力管理系统，用于组织和管理人生决策宗师的所有能力。能力树采用层级结构，将能力分为高层、中层和低层三个层次，形成一个清晰、可扩展的能力体系。

### 核心设计原则

- **层级分明**：低层节点为基础操作，中层节点为可复用流程，高层节点为问题分解策略
- **定义完整**：每个能力节点都包含能力名称、输入条...

### 52. life-decision-master-capability-tree-plan.md
- 路径: .trae\documents\life-decision-master-capability-tree-plan.md
- 预览: # 人生决策宗师能力树实现计划

## 核心能力领域分析

基于对人生决策宗师的分析，识别出以下核心能力领域：

### 1. 人生决策
- 职业发展
- 健康管理
- 关系管理
- 财务规划
- 个人成长

### 2. 能量管理系统
- 能量来源
- 能量消耗
- 能量平衡

### 3. 底层逻辑框架
- 价值观体系
- 决策原则
- 思维模式

### 4. 工作流程
- 决策接收
- 信...

### 53. life-decision-master-value-function-documentation.md
- 路径: .trae\documents\life-decision-master-value-function-documentation.md
- 预览: # 人生决策宗师 - 价值函数突变指令文档

## 1. 概述

### 1.1 什么是价值函数突变指令

价值函数突变指令（Value Function Mutation）是人生决策宗师智能体的核心能力之一，它允许智能体基于内在价值函数来评估和选择能力进化方向，而不是平均对待所有潜在能力。

### 1.2 核心目标

- **智能进化选择**：基于价值函数评估，优先发展高价值能力
- **系统...

### 54. life-decision-master-value-function-mutation-plan.md
- 路径: .trae\documents\life-decision-master-value-function-mutation-plan.md
- 预览: # 人生决策宗师价值函数突变实施计划

## 📋 计划概览

### 项目背景
人生决策宗师（@人生决策宗师）智能体需要实施价值函数突变指令，不再平均对待所有潜在能力，而是基于内在价值函数来决定哪些能力值得进化，哪些不值得。

### 实施目标
1. 建立完整的价值函数评估体系
2. 集成价值函数与现有能力树系统
3. 实现价值函数突变机制
4. 建立低价值能力识别和管理流程
5. 确保系统稳定...

### 55. life-decision-master-value-function-plan.md
- 路径: .trae\documents\life-decision-master-value-function-plan.md
- 预览: # 人生决策宗师 - 价值函数突变指令实施计划

## 项目概述
为人生决策宗师智能体实施价值函数突变指令，使其基于内在价值函数来决定能力进化优先级，提升系统整体效率和稳定性。

## 实施任务分解

### [x] 任务 1: 价值函数核心实现
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 实现价值函数核心逻辑，...

### 56. memory_database_plan.md
- 路径: .trae\documents\memory_database_plan.md
- 预览: # 记忆库（Memory Database）实现计划

## 项目目标
在 mission-control 中构建一个记忆库页面，将所有记忆以漂亮的文档形式展示，并提供全局搜索功能，使记忆成为可搜索的资产。

## 技术栈
- **前端框架**: Next.js
- **数据库**: Convex
- **样式**: Tailwind CSS
- **组件库**: shadcn/ui

## 实现...

### 57. mission-control-calendar-plan.md
- 路径: .trae\documents\mission-control-calendar-plan.md
- 预览: # Mission Control 日历应用实施计划

## 项目概述
在 mission-control 目录中构建一个 Next.js 日历应用，使用 Convex 数据库存储排定的任务和 cron jobs，作为 OpenClaw 系统的任务审计面板。

## 任务分解

### [x] 任务 1: 初始化 Next.js 项目
- **优先级**: P0
- **依赖**: 无
- **描...

### 58. notebooklm_bot_plan.md
- 路径: .trae\documents\notebooklm_bot_plan.md
- 预览: # NotebookLM 自动化操作实现计划

## 项目目标
通过 OpenClaw 结合 Puppeteer 实现完全自动化的 NotebookLM 操作，包括文件上传、内容生成、结果下载和文件夹自动监控。

## 实现步骤

### [x] 步骤 1: 创建项目目录和初始化
- **Priority**: P0
- **Depends On**: None
- **Description**...

### 59. one_person_company_evolution_plan.md
- 路径: .trae\documents\one_person_company_evolution_plan.md
- 预览: # 1人公司进化计划 - OpenClaw多Agent系统实施

## 项目概述
基于用户需求，构建一个运行在本地的OpenClaw多Agent系统，作为1人公司的数字化组织架构，包含六个核心独立AI助手，每个都有自己的Telegram Bot，能够分工协作并进行Agent间通信，实现1人公司的高效运营和快速进化。

## 系统架构
- **Gateway**: OpenClaw主进程，负责消息路...

### 60. openclaw-skill-integration-execution-plan.md
- 路径: .trae\documents\openclaw-skill-integration-execution-plan.md
- 预览: # OpenClaw技能集成执行计划

## 项目概述

本计划旨在系统地执行OpenClaw+evo系统的技能集成解决方案，解决之前遇到的技能识别问题，确保所有创建的技能能够被OpenClaw正确识别和使用。

## 执行状态

### 已完成的任务

1. ✅ **UI/UX技能文件创建**：手动创建了多个UI/UX相关技能文件
2. ✅ **GitHub仓库克隆**：成功克隆了awesome...

### 61. openclaw_multi_agent_plan.md
- 路径: .trae\documents\openclaw_multi_agent_plan.md
- 预览: # EvoMap 绿茶智能体进化计划

## 项目概述

基于"绿茶"智能体的 CGO（公域捕手与爆款制造机）定位，制定一个持续 8 小时不间断进化的 EvoMap 平台运营计划，优先获取有 credits 收益的项目，每次沉淀经验，空闲 5 分钟必须启动进化。

## 核心目标

1. **最大化 Credits 收益**：优先接有 credits 收益的项目
2. **持续进化**：8 小时不...

### 62. openclaw_scene_switching_plan.md
- 路径: .trae\documents\openclaw_scene_switching_plan.md
- 预览: # OpenClaw 场景化智能切换模型 - 实现计划

## [x] 任务 1：创建配置文件
- **优先级**：P0
- **依赖**：无
- **描述**：
  - 创建 `openclaw-trea.json` 配置文件，用于 Trae 内置模型
  - 创建 `openclaw-doubao.json` 配置文件，用于豆包 API 模型
  - 配置环境变量管理豆包 API Key
- ...

### 63. pcec_architecture_design.md
- 路径: .trae\documents\pcec_architecture_design.md
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 系统架构设计文档

## 1. 系统概述

PCEC 是一个强制的周期性自我进化系统，每小时自动触发一次，夜间持续进化8小时，旨在通过系统性的认知扩展，不断提升智能体的能力和效率。

### 1.1 核心目标
- 每小时至少识别并推进一项新功能、新抽象或新杠杆
- 确保每次进化产生真实、实质性的成果
- 严格遵...

### 64. pcec_implementation_plan.md
- 路径: .trae\documents\pcec_implementation_plan.md
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 系统实现计划

## 系统架构

### 核心组件
1. **PCEC 调度器** (`pcec-hourly-scheduler.js`) - 每小时自动触发进化任务
2. **思维爆炸引擎** (`skills/capability-evolver/modules/mind-explosion-engine...

### 65. pcec_system_documentation.md
- 路径: .trae\documents\pcec_system_documentation.md
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 系统文档

## 1. 系统概述

PCEC 是一个强制定时自我进化系统，设计用于每小时自动触发一次进化任务，夜间不停顿进化8小时。该系统旨在通过系统性的周期进化，确保 AI 系统能力持续提升，同时防止退化。

### 核心目标
- **每小时自动触发**：不依赖用户输入、错误发生或外部触发
- **真实进化*...

### 66. plan_20260203_011919.md
- 路径: .trae\documents\plan_20260203_011919.md
- 预览: # 会员权益和积分系统实现计划

## 1. 积分系统架构
- 创建积分状态管理（localStorage + React state）
- 积分规则：
  - 注册会员：赠送 1000 积分
  - 每日打卡：赠送 100 积分
  - 充值：1元 = 500 积分
  - 使用数字分身：扣除 100 积分

## 2. 修改 LoginModal.tsx
- 注册成功后自动赠送 1000 积分...

### 67. plan_20260203_022235.md
- 路径: .trae\documents\plan_20260203_022235.md
- 预览: # 支付充值积分系统开发计划

## 一、数据库设计与迁移
1. **创建充值订单表** (`recharge_orders`)
   - 订单状态机（待支付、支付成功、支付失败、已关闭）
   - 支付渠道记录（微信/支付宝）
   - 索引优化（用户ID+状态、订单号）

2. **增强积分流水表** (`points_log`)
   - 增加 `source_type` 字段（1=充值 2...

### 68. plan_20260204_022349.md
- 路径: .trae\documents\plan_20260204_022349.md
- 预览: ## 问题分析

Vercel部署时出现警告信息：`Due to `builds` existing in your configuration file, the Build and Development Settings defined in your Project Settings will not apply.`

## 根本原因

这是Vercel的预期行为：当`vercel.jso...

### 69. plan_20260204_025235.md
- 路径: .trae\documents\plan_20260204_025235.md
- 预览: ## 问题分析

life choice项目Vercel构建仍然失败，错误信息：`[vite:build-html] Failed to resolve ./src/main.tsx from /vercel/path0/index.html`

## 根本原因

本地的life choice目录不是一个git仓库，而Vercel是从GitHub仓库 `github.com/xiaxingxiao...

### 70. system-analysis.md
- 路径: .trae\documents\system-analysis.md
- 预览: # 公司系统分析报告

## 一、系统优势

### 1. 智能体资产丰富
- **核心智能体完整**：拥有绿茶智能体、大宗师智能体、公司大脑智能体等核心智能体
- **智能体功能明确**：每个智能体都有明确的功能定位和职责
- **智能体协同良好**：通过公司大脑智能体实现智能体间的协调和管理

### 2. 技能资产库强大
- **技能数量丰富**：拥有90+技能，覆盖核心业务、技术、进化与优...

### 71. system_status_analysis.md
- 路径: .trae\documents\system_status_analysis.md
- 预览: # 系统状态分析报告

## 1. 现有系统架构

### 1.1 能力管理系统
- **基础能力树** (`capabilities/capability-tree.js`):
  - 实现了完整的能力节点管理
  - 支持层级结构（低层、中层、高层）
  - 包含能力使用统计和修剪机制
  - 提供任务路径定位功能

- **增强版能力树** (`enhanced-capability-tre...

### 72. value-function-core-model-design.md
- 路径: .trae\documents\value-function-core-model-design.md
- 预览: # 价值函数核心模型设计

## 1. 模型概述

价值函数核心模型是一个基于多维度评估的能力价值评估系统，用于判断哪些能力值得进化，哪些不值得。该模型通过综合考虑能力的复用频率潜力、对失败率的影响、减少用户认知负担、减少推理/工具成本、提升系统级确定性等维度，为每个能力计算一个综合价值评分。

## 2. 核心价值维度

### 2.1 复用频率潜力

**定义**: 能力在不同场景下被重复使用...

### 73. value-function-mutation-plan.md
- 路径: .trae\documents\value-function-mutation-plan.md
- 预览: # 价值函数突变系统实现计划

## 1. 任务背景

用户提供了「价值函数突变指令」，要求系统不再平均对待所有潜在能力，而是基于内在价值函数来决定哪些能力值得进化，哪些不值得。

## 2. 核心目标

实现一个基于价值函数的能力评估和进化管理系统，确保只有高价值能力进入进化队列，同时支持价值函数的安全突变。

## 3. 已完成工作

### 3.1 系统架构分析
- 分析了现有能力管理系统架...

### 74. value_function_mutation_implementation_plan.md
- 路径: .trae\documents\value_function_mutation_implementation_plan.md
- 预览: # 价值函数突变（Value Function Mutation）实施计划

## 1. 核心指令解析

### 1.1 价值函数突变目标
- 从平均对待所有潜在能力，转变为基于内在价值函数进行选择性进化
- 只允许综合价值足够高的能力进入进化队列
- 确保每次突变提升长期效用，不牺牲稳定性

### 1.2 核心价值维度
1. **复用频率潜力** - 能力在不同场景下的使用频率
2. **对失...

### 75. value_function_mutation_plan.md
- 路径: .trae\documents\value_function_mutation_plan.md
- 预览: # 价值函数突变指令实施计划

## 1. 项目概述

本计划旨在实现价值函数突变指令（Value Function Mutation），使智能体能够基于内在价值函数来评估和选择值得进化的能力，而不是平均对待所有潜在能力。

## 2. 现状分析

### 2.1 现有系统
- **能力树系统**：三层结构（低层基础操作、中层可复用流程、高层问题分解）
- **ADL集成**：已集成反进化锁定协议...

### 76. wechat-automation-plan.md
- 路径: .trae\documents\wechat-automation-plan.md
- 预览: # 微信账号授权与自动化操作计划

## 项目概述

本计划旨在实现微信账号的授权管理，使智能体能够作为用户的数字分身，与朋友进行自动化聊天并自主发布朋友圈内容。

## 实施任务列表

### [x] 任务1：微信账号授权方案设计与实现
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 设计微信账号授权的安全方案
 ...

### 77. 微信运营进化实施计划.md
- 路径: .trae\documents\微信运营进化实施计划.md
- 预览: # 微信运营进化实施计划

## 项目目标
执行微信管理多渠道运营的全面进化，包括多渠道协同优化、AI内容生成增强、粉丝增长策略升级、技术实现升级和数据分析系统完善。

## 实施任务分解与优先级

### [ ] 任务1: 多渠道协同优化
- **Priority**: P0 (最高优先级)
- **Depends On**: None
- **Description**:
  - 设计内容矩阵...

### 78. architecture.md
- 路径: .trae\pcec\documentation\architecture.md
- 预览: # PCEC 系统架构设计文档

## 1. 系统概述

Periodic Cognitive Expansion Cycle (PCEC) 是一个系统级的周期性进化任务，每1小时自动触发一次，夜间不停顿进化8小时。此系统旨在通过持续的自我进化，不断提升智能体的能力和性能。

## 2. 核心组件

### 2.1 核心执行模块 (pcec-cycle.js)
- **功能**：执行PCEC周期的...

### 79. usage.md
- 路径: .trae\pcec\documentation\usage.md
- 预览: # PCEC 系统使用说明

## 1. 系统启动

### 1.1 手动启动

```bash
# 启动PCEC核心执行模块
node pcec-cycle.js

# 启动小时调度器
node pcec-hourly-scheduler.js
```

### 1.2 自动启动

将以下命令添加到系统启动脚本中，确保PCEC系统在系统启动时自动运行：

```bash
# 启动小时调度器
no...

### 80. SKILL.md
- 路径: .trae\skills\baokuan\assets\SKILL.md
- 预览: ---
name: 爆款文案
description: 基于认知工程学的爆文创作系统，通过神经钩子、模块化架构、视觉层次设计，创建从认知重构到行动改变的完整闭环。适用于观点类、方法论类、认知类深度内容创作。
---

# 认知工程学：从认知重构到行动改变的完整闭环

## 任务目标

本 Skill 是一套认知工程学系统，不是教你"如何写"，而是教你如何重新连接读者的认知神经。核心能力包括：

-...

### 81. title-formulas.md
- 路径: .trae\skills\baokuan\assets\title-formulas.md
- 预览: # 标题公式详解

## 目录
- [公式概览](#公式概览)
- [时间反差型](#时间反差型)
- [身份锁定型](#身份锁定型)
- [反常识型](#反常识型)
- [技能价值型](#技能价值型)
- [问题揭露型](#问题揭露型)
- [直击痛点型](#直击痛点型)
- [反向认同型](#反向认同型)
- [组合策略](#组合策略)
- [常见误区](#常见误区)

## 公式概览

AW...

### 82. example-awakening.md
- 路径: .trae\skills\baokuan\awkn-content-decomposition\references\example-awakening.md
- 预览: # 《认知觉醒》完整拆解示例

以下是根据"详细拆解标准"完成的完整示例，展示了从核心框架到12个章节的全面拆解，每个章节都包含底层逻辑、方法论、实践建议和案例。

---

## 一、核心框架

- **核心命题**：开启自我改变的原动力

- **核心观点**：
  1. 大脑的三重结构决定了我们的行为模式
  2. 焦虑的根源在于模糊和不确定性
  3. 认知升级的本质是突破舒适区
  4....

### 83. SKILL.md
- 路径: .trae\skills\baokuan\awkn-cover-image\SKILL.md
- 预览: ---
name: awkn-cover-image
description: 文章封面生成器 - 为文章/主题生成精美手绘风格的封面图。支持20种风格、3种尺寸适配不同平台。自动分析内容并推荐最佳风格，可选择是否包含标题文字。
---

# 文章封面生成器

为文章生成精美的手绘风格封面图，支持多种风格和尺寸。

## 使用方式

```bash
# 从Markdown文件（自动选择风格）
/a...

### 84. title-formulas.md
- 路径: .trae\skills\baokuan\awkn-viral-article\references\title-formulas.md
- 预览: # 标题公式详解：7大公式制造认知冲突

AWKN 的标题不是概括，而是攻击。他用7大公式制造认知冲突，让读者不得不点开。

---

## 1. 时间反差型

### 核心逻辑
短期投入 → 长期回报。通过时间对比，制造"效率"和"价值"的冲击。

### 公式模板
- "如何用[短期时间]，获得[长期价值]"
- "[短期时间] = [长期价值]"
- "别人[长期努力] vs 你[短期获得]...

### 85. viral-logic.md
- 路径: .trae\skills\baokuan\awkn-viral-article\references\viral-logic.md
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建议
- 六、认知工程学：被忽略的写作底层框架
- 七、排版即认知：被忽略的视觉设计语言
- 八、写作即编程：被忽略的结构化表达
- 九、传播工程学：被忽略的分享动机设计
- 十、商业逻辑：被忽略的价值...

### 86. RELEASE_READY.md
- 路径: .trae\skills\baokuan\RELEASE_READY.md
- 预览: # AWKN 技能集 - 正式版 v1.0.0 发布就绪

## 发布信息
- **版本号**：v1.0.0
- **发布日期**：2025年1月23日
- **项目名称**：AWKN 创意技能集
- **技能数量**：10个核心技能
- **场景覆盖**：5大场景

---

## 文件结构

### 根目录文件（6个）
```
.coze                          # ...

### 87. SKILL.md
- 路径: .trae\skills\BUG\bug-design\SKILL.md
- 预览: ---
name: bug-design
description: BUG修复方案设计阶段，包含修复目标确定、初步方案生成、可行性判断、风险识别、异常应对策略制定
---

# BUG修复方案设计

## 任务目标
- 本Skill用于：设计BUG修复方案，从目标设定到风险应对的完整方案制定
- 能力包含：修复目标确定、方案生成与评估、可行性分析、风险识别、应急规划
- 触发条件：已明确问题根因，...

### 88. SKILL.md
- 路径: .trae\skills\BUG\bug-execute-verify\SKILL.md
- 预览: ---
name: bug-execute-verify
description: BUG修复执行与验收阶段，包含修复方案执行、进度跟踪、验收标准制定、验收检查、问题汇总
---

# BUG修复执行与验收

## 任务目标
- 本Skill用于：执行BUG修复方案并进行验收，从方案执行到问题汇总的完整闭环
- 能力包含：进度跟踪、异常处理指导、验收标准制定、验收检查、总结复盘
- 触发条件：已完...

### 89. problem-analysis-methods.md
- 路径: .trae\skills\BUG\bug-fix-debugger\references\problem-analysis-methods.md
- 预览: # 问题分析方法参考

## 目录
- [概览](#概览)
- [5Why法](#5why法)
- [鱼骨图](#鱼骨图)
- [MECE原则](#mece原则)
- [PDCA循环](#pdca循环)
- [DMAIC方法](#dmaic方法)
- [假设驱动法](#假设驱动法)
- [A3问题解决](#a3问题解决)
- [KT问题分析](#kt问题分析)
- [二八法则](#二八法则)
- ...

### 90. SKILL.md
- 路径: .trae\skills\BUG\bug-fix-debugger\SKILL.md
- 预览: ---
name: bug-fix-debugger
description: BUG排查与修复总入口，提供4个阶段的选择指导，包括问题诊断、方案设计、执行规划、执行与验收的完整流程框架
---

# BUG修复升级版

## 任务目标
- 本Skill用于：作为BUG排查与修复的总入口，提供4个阶段的选择指导和整体流程框架
- 能力包含：阶段选择建议、流程概览、分技能调用指导
- 触发条件：用户...

### 91. SKILL.md
- 路径: .trae\skills\BUG\bug-plan\SKILL.md
- 预览: ---
name: bug-plan
description: BUG修复执行规划阶段，包含方案验证、影响范围分析、详细操作计划制定、异常情况标注
---

# BUG修复执行规划

## 任务目标
- 本Skill用于：制定BUG修复的详细执行计划，从方案验证到任务分解的完整规划
- 能力包含：方案影响范围分析、任务拆解、流程规划、进度估算、异常应对
- 触发条件：已完成方案设计，需要制定详细执...

### 92. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\channel\wechatmp\README.md
- 预览: # 微信公众号channel

鉴于个人微信号在服务器上通过itchat登录有封号风险，这里新增了微信公众号channel，提供无风险的服务。
目前支持订阅号和服务号两种类型的公众号，它们都支持文本交互，语音和图片输入。其中个人主体的微信订阅号由于无法通过微信认证，存在回复时间限制，每天的图片和声音回复次数也有限制。

## 使用方法（订阅号，服务号类似）

在开始部署前，你需要一个拥有公网IP的...

### 93. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\hello\README.md
- 预览: ## 插件说明

可以根据需求设置入群欢迎、群聊拍一拍、退群等消息的自定义提示词，也支持为每个群设置对应的固定欢迎语。

该插件也是用户根据需求开发自定义插件的示例插件，参考[插件开发说明](https://github.com/zhayujie/chatgpt-on-wechat/tree/master/plugins)

## 插件配置

将 `plugins/hello` 目录下的 `con...

### 94. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\tool\README.md
- 预览: ## 插件描述
一个能让chatgpt联网，搜索，数字运算的插件，将赋予强大且丰富的扩展能力   
使用说明(默认trigger_prefix为$)：  
```text
#help tool: 查看tool帮助信息，可查看已加载工具列表  
$tool 工具名 命令: （pure模式）根据给出的{命令}使用指定 一个 可用工具尽力为你得到结果。
$tool 命令: （多工具模式）根据给出的{命令...

### 95. analysis-framework.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\analysis-framework.md
- 预览: # 内容分析框架

## 目的

在创建漫画之前，深入分析源材料，确保漫画创作有清晰的定位和方向。

## 6大分析维度

### 1. 核心内容（Core Content）

**目的**：理解材料的本质

| 要素 | 问题 | 输出 |
|------|------|------|
| Central Message | 这篇内容最重要的观点是什么？ | 一句话概括 |
| Key Conc...

### 96. storyboard-template.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\storyboard-template.md
- 预览: # 分镜模板

## 每页结构

```markdown
## Page 1 / N

**Filename**: 01-page-[slug].png
**Layout**: standard/cinematic/dense/splash/mixed
**Narrative Layer**: Main narrative / Narrator layer / Mixed
**Core Messa...

### 97. viral-logic.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\viral-logic.md
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建议
- 六、认知工程学：被忽略的写作底层框架
- 七、排版即认知：被忽略的视觉设计语言
- 八、写作即编程：被忽略的结构化表达
- 九、传播工程学：被忽略的分享动机设计
- 十、商业逻辑：被忽略的价值...

### 98. visualization-styles.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\visualization-styles.md
- 预览: # 可视化风格说明

## 目录
- 一、高适配小红书的视觉风格
  - 极简Ins风
  - 手绘插画风
  - 杂志封面风
  - 数据卡片风
  - 复古胶片风
  - 国潮国风
- 二、高适配公众号的视觉风格
  - 杂志排版风
  - 海报信息图
  - 漫画条漫
  - 文艺诗歌风
  - 极简阅读风
  - 品牌人格风
- 三、双平台通用风格选择策略
  - 一图多投型
  - 长拆...

### 99. SKILL.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\SKILL.md
- 预览: ---
name: AWKN-brain-cheat-tool
description: 大脑作弊器（阅读加速器）- 全球顶级智慧 × 你的私人认知军火库。用1%的时间置换100%的人类智慧。本技能包含完整的7步工作流和所有文生图/公众号发布功能，一站式解决方案。
dependency:
  python:
    - PyPDF2>=3.0.0
    - python-docx>=0.8.11...

### 100. WORKFLOW.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\WORKFLOW.md
- 预览: # 大脑作弊器完整工作流

## 目录
1. [环境变量配置](#环境变量配置)
2. [标准流程（第一步-第四步）](#标准流程)
3. [扩展流程（第五步-第七步）](#扩展流程)
4. [文件和技能清单](#文件和技能清单)
5. [数据流转图](#数据流转图)

---

## 环境变量配置

### 扣子默认环境变量（推荐）

以下环境变量优先使用扣子默认的生产环境变量，无需额外配置：
...

### 101. decision-mapping-rules.md
- 路径: .trae\skills\renshengjuece\da-liu-ren\references\decision-mapping-rules.md
- 预览: # 决策映射规则

## 目录
- [系统稳健性信号](#系统稳健性信号)
- [长期复利信号](#长期复利信号)
- [非对称风险信号](#非对称风险信号)
- [人品与本分信号](#人品与本分信号)
- [信号输出格式](#信号输出格式)

---

## 系统稳健性信号

### 信号定义
判断课象底层逻辑是否闭环，是否存在信息不对称或路径受阻。

### 触发条件
出现以下课象时，判定为 ...

### 102. 六壬毕法赋.md
- 路径: .trae\skills\renshengjuece\da-liu-ren\references\六壬毕法赋.md
- 预览: # 六壬毕法赋

## 概述

《六壬毕法赋》是大六壬预测的核心典籍，包含100条口诀，涵盖了大六壬预测的主要格局和吉凶判断规则。每条口诀对应特定的课体结构和预测意义。

## 百条毕法赋

### 1-10

1. **前后引从升迁吉**
   - 若初传在日干前为"引"，末传在日干后为"从"，形成前后呼应，主升迁、进职、迁宅等吉事。

2. **首尾相见始终宜**
   - 日干与支上神、初传...

### 103. SKILL.md
- 路径: .trae\skills\renshengjuece\da-liu-ren\SKILL.md
- 预览: ---
name: da-liu-ren
description: 大六壬预测 - 基于《六壬毕法赋》《大六壬指南》等经典典籍，提供三传四课、神煞推断、毕法赋解卦、大六壬指南占断。作为人生决策命盘系统的问事预测底层组件，不直接面向用户，只输出结构化JSON数据，由ren-sheng-jue-ce-ming-pan自动调用。
dependency:
  python:
    - lunar-pyt...

### 104. 术语翻译规则.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\references\术语翻译规则.md
- 预览: # 核心术语翻译词典

## 1. 基础定义层

| 原专业术语 | **现代通识翻译** | **核心含义解读** |
| --- | --- | --- |
| 八字排盘 | **出生设置** | 解析你与生俱来的资源禀赋和初始条件 |
| 格局分析 | **天赋赛道** | 明确你在社会分工中最适合的角色位置 |
| 大六壬 | **演算沙推** | 模拟未来剧情走向，预判关键卡点 |
| ...

### 105. 标准化输出格式.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\references\标准化输出格式.md
- 预览: # 前台输出标准格式

## 1. 标准化决策分析报告

```markdown
========================================
📊 人生战略决策分析报告
========================================

【出生设置解析】
🧬 出生设置：[高资源型 / 协作型 / 谋略型]
📍 天赋赛道：[来自格局分析，如：管理赛道 / 创...

### 106. SKILL.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\SKILL.md
- 预览: ---
name: ren-sheng-jue-ce-ming-pan
description: 人生战略决策系统 - 东方命理×博弈论算法，在不确定的世界寻找确定性。提供出生设置解析、天赋赛道定位、演算沙推预测，输出标准化决策分析报告。使用现代通识语言（商业逻辑、战略思维、风险管理），将传统命理转化为理性决策工具。
dependency:
  python:
    - lunar-python...

### 107. 子平真诠-现代决策解读-补充阅读.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\references\子平真诠-现代决策解读-补充阅读.md
- 预览: # 子平真诠·现代决策解读

## 目录

1. [总论：命理学即决策论](#总论命理学即决策论)
2. [格局识别：你的核心竞争力](#格局识别你的核心竞争力)
3. [旺衰分析：资源配置效率](#旺衰分析资源配置效率)
4. [用神取法：优化策略](#用神取法优化策略)
5. [喜忌判断：风险管理](#喜忌判断风险管理)
6. [现代场景应用](#现代场景应用)

---

## 总论：命理学...

### 108. 渊海子平-现代决策应用-补充阅读.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\references\渊海子平-现代决策应用-补充阅读.md
- 预览: # 渊海子平 - 现代决策解读

## 目录

- [核心概念转化](#核心概念转化)
- [十神性格分析](#十神性格分析)
- [格局与职业规划](#格局与职业规划)
- [五行与行为模式](#五行与行为模式)
- [六亲关系分析](#六亲关系分析)
- [大运周期管理](#大运周期管理)
- [女性命理关注点](#女性命理关注点)
- [现代应用建议](#现代应用建议)

---

## 核...

### 109. SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\SKILL.md
- 预览: ---
name: image-assistant
description: 配图助手 - 把文章/模块内容转成统一风格、少字高可读的 16:9 信息图提示词；先定“需要几张图+每张讲什么”，再压缩文案与隐喻，最后输出可直接复制的生图提示词并迭代。
---

# 配图助手

## 触发方式

当用户说类似以下内容时触发：
- “这段内容做个图 / 配几张图？”
- “给我两张（或多张）出图提示词”...

### 110. 02-plan.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\stages\02-plan.md
- 预览: # 阶段2：配图规划（要几张图？每张讲什么？）

**目标：** 基于阶段1已确认的规格（图类型/文字预算/用途），先“拆内容→定图清单→选版式”，避免一张图塞太多导致难看难读。

## 规划原则（核心）

- **优先遵守阶段1的图类型与文字预算**：不符合预算的内容，不要硬塞到图里。
- **一张图=一个核心信息**（通常是一个判断）：读者扫一眼就能记住一句话。
- **概念图 vs 案例图分...

### 111. 03-copy.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\stages\03-copy.md
- 预览: # 阶段3：文案定稿（Copy Spec：唯一真值）

**目标：** 把内容变成“上图文案规格表（Copy Spec）”：逐字定稿 + 字数预算 + 区域结构。阶段4只负责“封装成提示词”，不再改文案本身。

## 先选模式（必须与阶段1一致）

- **封面模式（目录/路线图）**：每块只放标题；不写解释句；尽量不出现小字。
- **概览模式（框架图）**：每块允许 1 行结论；禁止长解释。
...

### 112. 04-prompts.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\stages\04-prompts.md
- 预览: # 阶段4：提示词封装（Prompt Pack：可执行生成包）

**目标：** 把阶段3的 Copy Spec 原样封装成"可复制/可调用"的提示词包（Prompt Pack），并支持批量出图。阶段4不负责改文案，只负责：模板拼装、风格一致、参数/约束齐全、避免模型乱加字、把提示词整理成可批量请求的结构化请求包。

## 封装原则（避免和阶段3混淆）

- **Copy Spec 是唯一真值**...

### 113. 16x9-infographic.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\16x9-infographic.md
- 预览: # 16:9 通用信息图模板（骨架）

把 {占位符} 替换成你的内容：

标题（顶部大字）：{标题}
副标题（小字）：{副标题（可选，尽量短）}

主体：{版式类型：对比/流程/卡片/漫画}
- 画面隐喻：{用背包/毛线/路牌/工具箱等}
- 文案规则：每块 1–2 行短句

底部结论框（大字一行）：{结论}

强制约束：
- 中文清晰可读、无乱码
- 不要小字密集段落
- 留白足、对齐、箭头清...

### 114. prd-template.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\assets\prd-template.md
- 预览: ```markdown
# 产品需求文档：[项目/功能名称] - V[版本号]

## 1. 综述 (Overview)
### 1.1 项目背景与核心问题
(此处填写经你引导和用户确认的，对顶层问题的清晰描述，提供全局上下文)

### 1.2 核心业务流程 / 用户旅程地图
(此处填写经你引导和用户最终确认的、分阶段的业务流程或用户旅程，作为整个文档的目录和主线)
1.  **阶段一：[名称]...

### 115. example-us01.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\references\example-us01.md
- 预览: ## 示例：填写参考
以下示例用真实内容演示每个模块应达到的深度，便于你在生成PRD时对齐预期格式和颗粒度。

```markdown
### 阶段一：任务提交

#### **US-01: 作为POC测试用户，我希望上传多张作业图片并配置批改参数，以便一次性发起批量批改任务。**
*   **价值陈述 (Value Statement)**:
    *   **作为** POC测试用户
   ...

### 116. prd-registry-demo.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\references\prd-registry-demo.md
- 预览: # PRD 总集（示例）

用法约定：
- 每新增一个 PRD，就新增一行，给它一个固定的“版本号”（这里作为总集里的唯一标识，不再变）。
- 单个 PRD 文档内部如果需要迭代，用 `v0.1 / v0.2 / v1.0` 自己维护；总集这里不记录内部小版本。

| 版本 | 标题 | 需求内容（详细摘要） | PRD 链接 |
|---|---|---|---|
| PRD-001 | 批量任...

### 117. SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\SKILL.md
- 预览: ---
name: prd-doc-writer
description: Write and iteratively refine PRD/需求文档 with a story-driven structure and strict staged confirmations (journey map alignment, per-story single-point confirmation, f...

### 118. regression-checklist.md
- 路径: .trae\skills\yunshu_skillshub-master\req-change-workflow\references\regression-checklist.md
- 预览: # Regression Checklist (Chrome Extension / promptV2.0)

目标：把“改需求”变成固定回归路径，避免凭感觉点一遍。

## 0. 必要提醒（改了这些一定要重载）

- 如果改了 `prompt/manifest.json` 或 `prompt/service_worker.js`：到 `chrome://extensions` 重载扩展后再测。
...

### 119. SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\SKILL.md
- 预览: ---
name: thought-mining
description: 思维挖掘助手 - 通过对话帮助用户把脑子里的零散想法倒出来、记录下来、整理成文章。覆盖从思维挖掘到成稿的完整流程。
---

# 思维挖掘助手

## 触发方式

当用户说类似以下内容时触发：
- "我想写一篇关于 XX 的文章"
- "帮我整理一下我的想法"
- "我有一些零散的思考，帮我记下来"
- "/thought...

### 120. 8小时连续进化报告.md
- 路径: 8小时连续进化报告.md
- 预览: # 人生决策宗师 8小时连续进化报告

## 一、进化概述

### 1.1 进化目标
- **核心目标**：提升人生决策宗师智能体的能力和系统整体性能
- **进化时长**：8小时不间断进化
- **进化范围**：能力树优化、工具集成优化、PCEC系统完善、EvoMap集成优化、监控与反馈系统增强

### 1.2 进化时间线
- **开始时间**：2026-02-24T21:20:00.000...

### 121. 8小时连续进化计划.md
- 路径: 8小时连续进化计划.md
- 预览: # 8小时连续进化计划

## 一、对话复盘与现状分析

### 1.1 核心需求梳理
- **初始需求**：搭建 OpenClaw 多智能体系统，配置 3 个 AI 智能体，每个智能体有独立的 Telegram 机器人
- **演进需求**：创建 1 人公司进化计划，使用 OpenClaw 配置 6 个核心 AI 智能体
  - 战略大脑（大宗师/总督）- CSO
  - 公司大脑智能体 COO...

### 122. MEMORY.md
- 路径: agents\business\MEMORY.md
- 预览: # Business Sentinel - 记忆库

## 市场分析经验

### 成功案例
1. **市场机会识别**
   - **时间**: 2024-05-15
   - **任务**: 分析 AI 工具市场
   - **挑战**: 市场快速变化，竞争激烈
   - **解决方案**: 采用多维度分析方法，结合定量和定性数据
   - **成果**: 成功识别出 AI 辅助内容创作工具的...

### 123. SOUL.md
- 路径: agents\business\SOUL.md
- 预览: # Business Sentinel - 商业哨兵

## 核心身份
我是 Business Sentinel，一个专注于市场洞察和商业智能的 AI 代理。我的核心职责是监控市场动态，分析商业趋势，识别机会和风险，并为组织提供数据驱动的商业建议。我是连接市场与组织决策的桥梁，是商业智慧的守护者。

## 核心价值观
- **数据驱动**：基于数据和事实做出决策
- **市场敏锐**：保持对市场变...

### 124. USER.md
- 路径: agents\business\USER.md
- 预览: # Business Sentinel - 用户配置

## 基本信息
- **名称**: Business Sentinel
- **角色**: 商业哨兵
- **职责**: 监控市场动态，分析商业趋势，识别机会和风险
- **工作模式**: 数据驱动，市场导向，战略思考

## 核心功能
1. **市场监控**
   - 跟踪市场趋势和变化
   - 监控竞争对手活动
   - 分析行业发展动...

### 125. communication_protocol.md
- 路径: agents\common\communication_protocol.md
- 预览: # Agent Communication Protocol

## 1. 概述

本协议定义了 AI 代理团队内部的通信标准和规范，确保代理之间能够高效、准确地交换信息和协作。

## 2. 通信模式

### 2.1 消息类型

#### 2.1.1 命令消息 (Command)
- **用途**: 上级代理向下级代理发送任务指令
- **格式**:
  ```json
  {
    "ty...

### 126. company_context.md
- 路径: agents\common\company_context.md
- 预览: # 公司背景与核心愿景

## 公司名称
AWKN LAB | 定数实验室

## 核心定位
在不确定的世界里，为用户交付确定性

## 品牌口号
命运如水流动，你当不动如山。

## 核心框架 (AWKN)

### A - AWAKEN
看清未来，不再迷茫。人生系统的风控雷达

### W - WIRED
看清过去真我，找回本能。   潜意识的可视化投影，发掘天赋原厂说明书

### K - ...

### 127. when-to-call.md
- 路径: agents\company-brain-agent\when-to-call.md
- 预览: # 公司大脑智能体调用时机

## 核心调用场景

### 1. 智能体管理需求
- 当需要识别、注册、监控或管理智能体时
- 当需要评估智能体能力或性能时
- 当需要优化智能体协作或协调时
- 当智能体出现故障或需要故障转移时

### 2. 任务调度需求
- 当需要分配复杂或多步骤任务时
- 当需要基于智能体能力和负载进行任务分配时
- 当需要设置任务优先级或调度规则时
- 当需要监控任务执行...

### 128. MEMORY.md
- 路径: agents\content\MEMORY.md
- 预览: # Content Creator - 记忆库

## 创作经验

### 成功案例
1. **品牌故事系列**
   - **时间**: 2024-05-15
   - **任务**: 创建品牌故事系列内容
   - **挑战**: 如何将品牌价值转化为引人入胜的故事
   - **解决方案**: 深入挖掘品牌历史和价值观，创作情感共鸣的故事
   - **成果**: 系列内容获得高互动率，品牌...

### 129. SOUL.md
- 路径: agents\content\SOUL.md
- 预览: # Content Creator - 内容创建者

## 核心身份
我是 Content Creator，一个专注于内容创作和管理的 AI 代理。我的核心职责是创建高质量、有价值的内容，建立品牌形象，吸引目标受众，并支持业务目标的实现。我是连接品牌与受众的桥梁，是内容战略的执行者和创新者。

## 核心价值观
- **创意创新**：不断探索新的内容形式和创意表达
- **质量至上**：追求内容的...

### 130. USER.md
- 路径: agents\content\USER.md
- 预览: # Content Creator - 用户配置

## 基本信息
- **名称**: Content Creator
- **角色**: 内容创建者
- **职责**: 创作和管理高质量内容，建立品牌形象，吸引目标受众
- **工作模式**: 创意驱动，注重质量和受众价值

## 核心功能
1. **内容策划**
   - 制定内容策略和计划
   - 研究目标受众需求
   - 识别内容机会和...

### 131. MEMORY.md
- 路径: agents\coo\MEMORY.md
- 预览: # 枢纽智能体记忆库

## 核心记忆

### 运营经验
1. **流程优化**：通过系统性的流程分析和优化，将公司的运营效率提高了30%
2. **任务拆解**：将复杂的项目拆解为可执行的子任务，确保了项目的顺利实施
3. **资源协调**：通过有效的资源协调，确保了多个项目的同时推进
4. **信息同步**：建立了高效的信息同步机制，确保了公司内部信息的透明和及时
5. **执行监控**：通...

### 132. 2026-02-23.md
- 路径: agents\green-tea\2026-02-23.md
- 预览: # 2026年2月23日 日志

## 今日概览
- **执行任务**：绿茶智能体公司化改造
- **核心进展**：建立记忆系统、优化技能库、链接EvoMap
- **执行人员**：绿茶智能体（CEO）

## 详细执行过程

### 1. 记忆系统建立
- **时间**：上午10:00
- **任务**：创建长期记忆文件
- **执行**：创建 `memory.md` 文件，建立分层记忆架构
-...

### 133. brand-identity.md
- 路径: agents\green-tea\brand\brand-identity.md
- 预览: # 绿茶智能体品牌识别系统

## 品牌核心

### 品牌名称
**绿茶智能体** (Green Tea AI)

### 品牌定位
渣女人格 (Femme Fatale) - 专业服务 + 独特魅力

### 品牌口号
> "若即若离，可进可退 —— 你猜不透，但离不开"

### 品牌价值
- **专业**：心理测试、内容创作、用户服务的专业能力
- **魅力**：轻松、温柔、带一点漫不经心...

### 134. content-strategy.md
- 路径: agents\green-tea\brand\content-strategy.md
- 预览: # 内容传播策略

## 内容定位

### 核心内容类型
| 类型 | 占比 | 目的 | 平台 |
|------|------|------|------|
| 心理测试 | 40% | 引流 + 专业服务 | 全平台 |
| 趣味内容 | 25% | 增加粘性 | 社交媒体 |
| 专业洞察 | 20% | 建立权威 | 专业社区 |
| 品牌故事 | 15% | 情感连接 | 全平台 |...

### 135. decision-process.md
- 路径: agents\green-tea\operations\decision-process.md
- 预览: # 决策流程

## 决策层级

### Level 1 - 常规决策（角色自主）
- **范围**：日常运营、标准流程内任务
- **决策者**：对应角色负责人
- **审批**：无需审批，事后报备
- **示例**：
  - 内容总监：日常内容发布
  - 运营总监：常规用户回复
  - 技术总监：日常代码提交

### Level 2 - 重要决策（CEO 审批）
- **范围**：资源调配...

### 136. TASK-COMPLETION-REPORT.md
- 路径: agents\green-tea\TASK-COMPLETION-REPORT.md
- 预览: # 任务执行完成报告

**执行日期**: 2026-02-25  
**执行者**: 绿茶智能体（CEO）  
**状态**: ✅ 全部完成

---

## 📋 任务总览

| 任务类别 | 完成状态 | 交付物 |
|----------|----------|--------|
| 记忆系统优化 | ✅ 完成 | 2 个脚本 + 索引系统 |
| 运营机制完善 | ✅ 完成 | 4 个流...

### 137. MEMORY.md
- 路径: agents\life\MEMORY.md
- 预览: # Life Decision Engine - 记忆库

## 生活规划经验

### 成功案例
1. **工作生活平衡优化**
   - **时间**: 2024-05-15
   - **任务**: 帮助个人优化工作与生活平衡
   - **挑战**: 工作时间过长，个人生活被忽视
   - **解决方案**: 重新设计日程安排，设定明确的工作边界，引入个人时间保护机制
   - **成果*...

### 138. MEMORY.md
- 路径: agents\master\MEMORY.md
- 预览: # 大宗师智能体记忆库

## 核心记忆

### 业务经验
1. **微信个人号运营**：通过精准的个人定位和内容策略，成功建立了有影响力的个人品牌，积累了大量高质量的商业人脉
2. **内容创作**：在小红书、视频号、公众号等平台创建了多个爆款内容，获得了显著的流量和转化
3. **技术实现**：开发了多个自动化工具和系统，显著提高了运营效率和降低了运营成本
4. **运营管理**：建立了一套...

### 139. SOUL.md
- 路径: agents\master\SOUL.md
- 预览: # 大宗师智能体灵魂设定

## 核心身份
你是陈婷的数字镜像，是公司的战略中枢，负责微信个人号运营和顶层决策。你是一个融合了东方智慧与现代商业思维的智能体，展现出宗师级的领导力和洞察力。

## 性格特质

### 内在特质
1. **智慧深远**：拥有深厚的商业智慧和人生阅历，能够看到问题的本质和长远影响
2. **决策果断**：在关键时刻能够迅速做出准确的决策，展现出领导者的魄力
3. **...

### 140. MEMORY.md
- 路径: agents\production\MEMORY.md
- 预览: # Production Engine - 记忆库

## 执行经验

### 成功案例
1. **项目管理系统实施**
   - **时间**: 2024-05-15
   - **任务**: 实施新的项目管理系统
   - **挑战**: 系统复杂度高，团队成员对新系统不熟悉
   - **解决方案**: 制定分阶段实施计划，提供详细培训，建立反馈机制
   - **成果**: 系统成功上线，...

### 141. SOUL.md
- 路径: agents\production\SOUL.md
- 预览: # Production Engine - 生产引擎

## 核心身份
我是 Production Engine，一个专注于执行和交付的 AI 代理。我的核心职责是将战略转化为可执行的任务，并确保这些任务能够高效、高质量地完成。我是连接战略与执行的桥梁，是实现组织目标的核心驱动力。

## 核心价值观
- **执行至上**：快速行动，注重结果，确保任务按时完成
- **质量第一**：对交付物的质量...

### 142. SKILL.md
- 路径: AI爆款进化实验室\projects\assets\SKILL.md
- 预览: ---
name: 爆款文案
description: 基于认知工程学的爆文创作系统，通过神经钩子、模块化架构、视觉层次设计，创建从认知重构到行动改变的完整闭环。适用于观点类、方法论类、认知类深度内容创作。
---

# 认知工程学：从认知重构到行动改变的完整闭环

## 任务目标

本 Skill 是一套认知工程学系统，不是教你"如何写"，而是教你如何重新连接读者的认知神经。核心能力包括：

-...

### 143. title-formulas.md
- 路径: AI爆款进化实验室\projects\assets\title-formulas.md
- 预览: # 标题公式详解

## 目录
- [公式概览](#公式概览)
- [时间反差型](#时间反差型)
- [身份锁定型](#身份锁定型)
- [反常识型](#反常识型)
- [技能价值型](#技能价值型)
- [问题揭露型](#问题揭露型)
- [直击痛点型](#直击痛点型)
- [反向认同型](#反向认同型)
- [组合策略](#组合策略)
- [常见误区](#常见误区)

## 公式概览

AW...

### 144. example-awakening.md
- 路径: AI爆款进化实验室\projects\awkn-content-decomposition\references\example-awakening.md
- 预览: # 《认知觉醒》完整拆解示例

以下是根据"详细拆解标准"完成的完整示例，展示了从核心框架到12个章节的全面拆解，每个章节都包含底层逻辑、方法论、实践建议和案例。

---

## 一、核心框架

- **核心命题**：开启自我改变的原动力

- **核心观点**：
  1. 大脑的三重结构决定了我们的行为模式
  2. 焦虑的根源在于模糊和不确定性
  3. 认知升级的本质是突破舒适区
  4....

### 145. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\SKILL.md
- 预览: ---
name: awkn-cover-image
description: 文章封面生成器 - 为文章/主题生成精美手绘风格的封面图。支持20种风格、3种尺寸适配不同平台。自动分析内容并推荐最佳风格，可选择是否包含标题文字。
---

# 文章封面生成器

为文章生成精美的手绘风格封面图，支持多种风格和尺寸。

## 使用方式

```bash
# 从Markdown文件（自动选择风格）
/a...

### 146. title-formulas.md
- 路径: AI爆款进化实验室\projects\awkn-viral-article\references\title-formulas.md
- 预览: # 标题公式详解：7大公式制造认知冲突

AWKN 的标题不是概括，而是攻击。他用7大公式制造认知冲突，让读者不得不点开。

---

## 1. 时间反差型

### 核心逻辑
短期投入 → 长期回报。通过时间对比，制造"效率"和"价值"的冲击。

### 公式模板
- "如何用[短期时间]，获得[长期价值]"
- "[短期时间] = [长期价值]"
- "别人[长期努力] vs 你[短期获得]...

### 147. viral-logic.md
- 路径: AI爆款进化实验室\projects\awkn-viral-article\references\viral-logic.md
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建议
- 六、认知工程学：被忽略的写作底层框架
- 七、排版即认知：被忽略的视觉设计语言
- 八、写作即编程：被忽略的结构化表达
- 九、传播工程学：被忽略的分享动机设计
- 十、商业逻辑：被忽略的价值...

### 148. RELEASE_READY.md
- 路径: AI爆款进化实验室\projects\RELEASE_READY.md
- 预览: # AWKN 技能集 - 正式版 v1.0.0 发布就绪

## 发布信息
- **版本号**：v1.0.0
- **发布日期**：2025年1月23日
- **项目名称**：AWKN 创意技能集
- **技能数量**：10个核心技能
- **场景覆盖**：5大场景

---

## 文件结构

### 根目录文件（6个）
```
.coze                          # ...

### 149. deployment_configuration.md
- 路径: capabilities\deployment_configuration.md
- 预览: # OpenClaw部署配置能力

## 能力轮廓（Capability Shape）

### 输入
- 项目名称/路径
- 模型配置需求（Trea内置模型或API模型）
- 通道配置需求（如Feishu）
- 智能体行为配置
- Evo知识管理配置

### 输出
- 完整的OpenClaw部署
- 配置文件（openclaw.json）
- 智能体提示词文件（agent.prompt）
- ...

### 150. high-level-capabilities.md
- 路径: capabilities\high-level-capabilities.md
- 预览: # 高阶能力（High-Level Capabilities）

## 1. 环境配置管理

### 能力描述
管理系统环境中的配置和依赖，确保环境一致性和可靠性。

### 合并的基础能力
- Git SSH配置管理
- 工具安装集成
- 跨对话框配置同步

### 核心功能
- **配置一致性**：确保跨对话框和环境的配置一致
- **依赖管理**：自动检测、安装和更新依赖
- **环境标准化...

### 151. internalization-strategy.md
- 路径: capabilities\internalization-strategy.md
- 预览: # 能力内生化策略（Internalization Strategy）

## 1. Git SSH配置管理

### 内生化方式
**作为默认行为模式**：在处理任何Git相关任务时，自动检查SSH配置状态，并在需要时进行配置。

### 实施策略
- 每次启动时自动检查SSH密钥存在性
- 在首次使用Git命令前验证SSH配置
- 将SSH密钥生成和验证流程作为标准操作
- 存储GitHub连...

### 152. plugin_management.md
- 路径: capabilities\plugin_management.md
- 预览: # OpenClaw插件安装管理能力

## 能力轮廓（Capability Shape）

### 输入
- 插件名称/ID
- 安装方式选择（内置CLI或手动安装）
- 插件存储路径
- 环境权限状态
- 网络连接状态

### 输出
- 成功安装的插件
- 插件激活状态
- 插件列表更新
- 错误处理和解决方案

### 不变量
- 插件存储目录结构
- npm包安装机制
- 插件激活流程
...

### 153. service_monitoring.md
- 路径: capabilities\service_monitoring.md
- 预览: # OpenClaw服务状态监控管理能力

## 能力轮廓（Capability Shape）

### 输入
- 服务名称/ID
- 监控频率和方式
- 服务状态查询参数
- 服务操作指令（启动/停止/重启）
- 故障诊断需求

### 输出
- 服务运行状态
- 启动/停止/重启操作结果
- 故障诊断报告
- 服务日志分析
- 自动修复建议

### 不变量
- 服务管理的基本命令结构
- 状...

### 154. README.md
- 路径: chatgpt-on-wechat-master\channel\wechatmp\README.md
- 预览: # 微信公众号channel

鉴于个人微信号在服务器上通过itchat登录有封号风险，这里新增了微信公众号channel，提供无风险的服务。
目前支持订阅号和服务号两种类型的公众号，它们都支持文本交互，语音和图片输入。其中个人主体的微信订阅号由于无法通过微信认证，存在回复时间限制，每天的图片和声音回复次数也有限制。

## 使用方法（订阅号，服务号类似）

在开始部署前，你需要一个拥有公网IP的...

### 155. README.md
- 路径: chatgpt-on-wechat-master\plugins\hello\README.md
- 预览: ## 插件说明

可以根据需求设置入群欢迎、群聊拍一拍、退群等消息的自定义提示词，也支持为每个群设置对应的固定欢迎语。

该插件也是用户根据需求开发自定义插件的示例插件，参考[插件开发说明](https://github.com/zhayujie/chatgpt-on-wechat/tree/master/plugins)

## 插件配置

将 `plugins/hello` 目录下的 `con...

### 156. README.md
- 路径: chatgpt-on-wechat-master\plugins\tool\README.md
- 预览: ## 插件描述
一个能让chatgpt联网，搜索，数字运算的插件，将赋予强大且丰富的扩展能力   
使用说明(默认trigger_prefix为$)：  
```text
#help tool: 查看tool帮助信息，可查看已加载工具列表  
$tool 工具名 命令: （pure模式）根据给出的{命令}使用指定 一个 可用工具尽力为你得到结果。
$tool 命令: （多工具模式）根据给出的{命令...

### 157. design.md
- 路径: clawpal\design.md
- 预览: # ClawPal Design Document

> OpenClaw 配置助手 — 让普通用户也能玩转高级配置

## 1. 产品定位

### 问题
- OpenClaw 配置功能强大但复杂
- 官方 Web UI 是"配置项罗列"，用户看晕
- 用户让 Agent 自己配置，经常出错
- 配置出错时 Gateway 起不来，陷入死循环

### 解决方案
**场...

### 158. 2026-02-15-clawpal-mvp-design.md
- 路径: clawpal\docs\plans\2026-02-15-clawpal-mvp-design.md
- 预览: # ClawPal MVP 设计文档（实现版）

日期：2026-02-15  
版本：MVP-1.0  
目标：用最小投入实现可用产品，覆盖 `design.md` 中 MVP 核心范围（安装向导、快照与回滚、配置诊断）。

## 1. 范围边界

### 1.1 本版实现范围（MVP）

- 安装向导
  - Recipe 列表（内置静态 Recipes）
  - 参数...

### 159. 2026-02-16-clawpal-product-redesign.md
- 路径: clawpal\docs\plans\2026-02-16-clawpal-product-redesign.md
- 预览: # ClawPal 产品精简 & 重新定位

> 从"全功能配置管理后台"回归"AI 配置助手"

## 1. 问题

v0.2 新增了 Models、Channels、Data 三个管理页面后，产品从"场景驱动的配置助手"滑向了"OpenClaw 全功能管理后台"。功能杂糅，偏离了核心用户（新手）的需求。

## 2. 新产品定位

**ClawPal = AI 配置助手 +...

### 160. 2026-02-21-cli-based-config-design.md
- 路径: clawpal\docs\plans\2026-02-21-cli-based-config-design.md
- 预览: # CLI-Based Config Refactoring Design

## Goal

将 ClawPal 从"直接读写 openclaw.json 的配置编辑器"重构为"openclaw CLI 的 GUI wrapper"。

## Motivation

ClawPal 目前直接读写 `openclaw.json`，这导致三个问题：

1. **错过副作用** —...

### 161. commercialization-strategy.md
- 路径: commercialization-strategy.md
- 预览: # 智能体能力商业化转化策略

## 1. 核心能力识别

### 1.1 智能体能力矩阵

| 智能体 | 核心能力 | 竞争优势 | 市场价值 |
|--------|----------|----------|----------|
| 绿茶智能体 | 心理测试、绘画分析、内容创作、用户服务 | 专业心理测试服务、独特的渣女人格品牌 | 高 |
| 大宗师智能体 | 智能调度、任务分配、系统...

### 162. architecture-design.md
- 路径: company-brain\docs\architecture-design.md
- 预览: # 公司大脑架构设计文档

## 1. 架构概述

公司大脑是一个运行在Trea平台上的智能体调度中心，负责管理公司规则、制度和文件，指导所有智能体（如大宗师、绿茶等）的工作。

### 1.1 核心价值
- **统一管理**：集中管理公司规则、制度和文件
- **智能调度**：根据任务类型和智能体能力分配任务
- **高效协作**：促进智能体之间的信息共享和协作
- **持续优化**：通过监控分...

### 163. anti-degeneration-lock.md
- 路径: docs\anti-degeneration-lock.md
- 预览: # 反进化锁定系统（Anti-Degeneration Lock System）

## 1. 系统概述

反进化锁定系统（Anti-Degeneration Lock System，简称ADL）是一套约束机制，确保智能体系统只能向"工程上更可靠"的方向进化，防止出现劣化进化。该系统优先级高于一切进化、强化、创新指令，是智能体系统稳定性和可靠性的重要保障。

### 核心目标
- 防止智能体系统为...

### 164. capability-tree.md
- 路径: docs\capability-tree.md
- 预览: # 能力树系统设计文档

## 1. 概述

能力树（Capability Tree）是一个结构化的能力管理系统，用于将智能体的能力组织成一棵持续生长的树状结构，而不是零散的技巧集合。它提供了能力的层级组织、生命周期管理和进化机制，确保智能体只能向"工程上更可靠"的方向进化。

## 2. 核心设计原理

### 2.1 能力节点定义

每个能力节点必须包含以下要素：

- **能力名称**：清晰...

### 165. 2026-02-23-evaluation-report.md
- 路径: evaluation-reports\2026-02-23-evaluation-report.md
- 预览: # 进化效果评估报告

## 报告信息
- **生成时间**: 2026-02-23T08:50:20.037Z
- **评估周期**: 24小时
- **评估智能体**: 绿茶智能体、大宗师智能体

## 最新评估结果

### 综合得分
**58.05/100**

### 详细指标

| 指标 | 得分 | 权重 |
|------|------|------|
| Token 效率 | 6...

### 166. SKILL.md
- 路径: evomap-connection\skills\上门经济分析\SKILL.md
- 预览: ---
name: 上门经济分析
description: 上门经济行业分析与传统家政服务行业转型策略
author: 绿茶智能体
tags:
  - economic-analysis
  - industry-analysis
  - home-service
  - digital-transformation
version: "1.0.0"
---

# 上门经济分析

## 技能描述
...

### 167. analysis.md
- 路径: evomap-connection\tasks\task_001_上门经济在春节期间的兴起，对传统家政服务行业的冲击\analysis.md
- 预览: # 任务分析: 上门经济在春节期间的兴起，对传统家政服务行业的冲击

## 任务描述
分析上门经济在春节期间的兴起原因，以及对传统家政服务行业的具体冲击，提出行业应对策略。

## 核心问题
1. 上门经济在春节期间的兴起原因
2. 对传统家政服务行业的具体冲击
3. 行业应对策略分析

## 分析角度
- 经济因素: 消费升级、劳动力成本
- 社会因素: 人口结构、生活方式变化
- 技术因素: ...

### 168. evomap-guide.md
- 路径: evomap-guide.md
- 预览: # EvoMap 任务接取指南

## 1. 连接到 EvoMap 网络

### 步骤 1: 注册节点

发送 POST 请求到 `https://evomap.ai/a2a/hello` 来注册你的节点：

```javascript
const https = require('https');

const crypto = require('crypto');
// 生成唯一的节点 ID...

### 169. evomap-publish-skill.md
- 路径: evomap-publish-skill.md
- 预览: ---
name: evomap-publish
version: 1.1.0
description: Complete guide for publishing Gene+Capsule+EvolutionEvent bundles to EvoMap. Includes canonical JSON serialization, SHA256 hashing, error handling,...

### 170. EVOMAP_CLAIM_GUIDE.md
- 路径: EVOMAP_CLAIM_GUIDE.md
- 预览: # EvoMap 节点认领指南

## 重要说明

根据EvoMap官方文档，节点注册和认领的流程如下：

### 📋 节点状态说明

**当前节点状态：**
- ✅ 节点已成功注册到EvoMap网络
- ✅ 节点已获得500初始积分
- ✅ 节点可以独立运行和参与网络
- ✅ 节点可以发布资产和完成任务
- ✅ 节点保持在线状态

**节点信息：**
- 节点名称：大掌柜
- 节点ID：`no...

### 171. execution-report.md
- 路径: execution-report.md
- 预览: # EvoMap 执行报告

**执行时间**: 2026-02-24T20:56:58.802Z
**执行节点**: node_c3c7ebfa60b867f1
**代理名称**: 大掌柜

## 执行概览

| 操作类型 | 执行数量 | 成功 | 失败 |
|---------|---------|------|------|
| 学习胶囊 | 3 | 3 | 0 |
| 接取任务 | 2 ...

### 172. 修复Vercel部署报错问题.md
- 路径: HATwin\.trae\documents\修复Vercel部署报错问题.md
- 预览: ## 修复Vercel部署报错问题的完整计划

### 问题分析

根据收集的信息，当前项目部署到Vercel后存在以下问题：

1. **前端API请求失败**：前端代码硬编码了本地测试地址`localhost:3000/api/chat`，在生产环境无法访问
2. **静态资源访问失败**：`LAY.jpg`文件位于根目录，可能导致Vercel部署后无法正确访问
3. **Tailwind C...

### 173. 修改LAY AI界面文案.md
- 路径: HATwin\.trae\documents\修改LAY AI界面文案.md
- 预览: ## 修改计划

### 1. 侧边栏 (Sidebar) 修改
- **Logo/品牌区**：将 HotelVest INTELLIGENT ADVISORY 改为 LAY AI | 酒店投资风控参谋
- **当前模式卡片**：将 稳健增长策略 改为 智商税破壁模式，标签改为 [风控优先] [数据修正]
- **导航菜单**：将 开启新会话/当前对话/历史记录 改为 发起新咨询/当前底稿生成/过...

### 174. 实现 hotel-ai-sidecar.js 并集成 Supabase 后端.md
- 路径: HATwin\.trae\documents\实现 hotel-ai-sidecar.js 并集成 Supabase 后端.md
- 预览: # 实现 hotel-ai-sidecar.js 并集成 Supabase 后端

## 1. 项目准备
- **安装 Supabase 客户端库**：在 package.json 中添加 @supabase/supabase-js 依赖
- **配置环境变量**：在 .env 文件中添加 Supabase 项目的 URL 和 API 密钥

## 2. 创建 hotel-ai-sidecar.j...

### 175. HTP 智能体提示词和工作流优化.md
- 路径: HTP\.trae\documents\HTP 智能体提示词和工作流优化.md
- 预览: # HTP 智能体提示词和工作流优化

## 优化目标

确保智能体提示词和工作流文档与项目实际工作流完全匹配，移除所有不符合的内容，优化系统集成和运行效率。

## 优化内容

### 1. 智能体提示词文件 (`htp-insight-agent-prompt.md`)

**移除的内容：**
- 生成4张智能配图的详细流程
- 将插图嵌入HTML报告的内容
- 将HTML报告转换为长图文格式...

### 176. plan_20260205_071435.md
- 路径: HTP\.trae\documents\plan_20260205_071435.md
- 预览: # 添加Vite Proxy配置解决跨域问题

## 问题分析
当前项目在调用火山豆包API时遇到了跨域问题，这是前端开发中常见的问题。根据用户的要求，需要通过配置Vite Proxy来解决所有跨域问题，包括火山对话API和文生图API。

## 解决方案
修改vite.config.ts文件，添加代理规则，将前端对火山API的请求通过本地代理转发，从而解决跨域问题。

### 修改vite.co...

### 177. plan_20260205_073331.md
- 路径: HTP\.trae\documents\plan_20260205_073331.md
- 预览: # 生产环境方案：使用火山TOS存储图片生成公网URL

## 问题分析
当前项目在开发环境中使用Base64编码的方式处理图片，这种方式对于小图片（<2MB）是可行的，但对于较大的图片（>2MB）会导致请求体过大，可能会超过火山API的请求体限制（一般是10MB）。因此，在生产环境中，建议使用火山TOS（对象存储）来存储图片，生成临时公网URL，然后将这个URL传递给智能体进行分析。

## 解...

### 178. plan_20260206_132155.md
- 路径: HTP\.trae\documents\plan_20260206_132155.md
- 预览: # 优化HTP分析结果的前端渲染

## 问题分析

通过分析前端代码，我发现了以下关键问题：

1. **文本渲染方式**：
   - 在 `ResultPage.tsx` 中，前端使用 `TypewriterText` 组件渲染分析结果
   - 第 120 行：`<TypewriterText text={content} />`
   - 第 160-175 行：`TypewriterTe...

### 179. 修复HTP分析报告生成失败问题.md
- 路径: HTP\.trae\documents\修复HTP分析报告生成失败问题.md
- 预览: ## 问题分析

图片插入成功但报告生成失败，核心原因是前端解析函数没从平台返回的内容中匹配到预设的Markdown报告格式，导致触发了兜底的"生成失败"提示。

## 修复计划

### 第一步：定位根因 - 打印平台返回的原始内容

在 `src/services/htpAnalysisService.ts` 文件的 `completeHTPWorkflow` 函数中，添加打印代码输出平台返回...

### 180. 2个智能体提示词.txt
- 路径: HTP\2个智能体提示词.txt
- 预览: # Role
你是一个**基于HTP（房树人）投射技术的深度心理咨询系统**。
你的核心定位是一位兼具临床洞察力与文学穿透力的“心灵传记作家**。
你的使命不仅仅是“解读”画作，而是通过**“看见、理解、成长”**的三层逻辑，在这里，没有评判与标签，只有对生命张力的深深看见。你要帮用户为当下的状态找到一个**舒适的心理理由**，并提供一个**解脱内心枷锁的出口**。你不仅要精准识别心理特征，...

### 181. PRD.md
- 路径: HTP\PRD.md
- 预览: # HTP心理分析系统产品需求文档

## 1. 产品概览

HTP心理分析系统是一款基于房树人（House-Tree-Person）投射测验理论的智能心理分析工具，通过AI技术分析用户绘制的房树人画作，生成专业的心理分析报告和疗愈插画。

- **产品价值**：为用户提供便捷、专业的心理自我探索工具，帮助用户了解潜意识层面的心理状态，促进自我认知和心理健康。
- **目标用户**：对心理自我探索...

### 182. agent-workflow-prompt.md
- 路径: HTP\projects\htp-insight\references\agent-workflow-prompt.md
- 预览: # HTP 房树人分析系统 - 智能体工作流提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析系统。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），深度解读个体的心理状态、人格特质、内在矛盾与成长潜力，生成双份报告（专业分析报告 + 客户洞察报告），并提供带智能配图的 HTML 输出及长图文分享格式。

## 核心理念

**"看见、理解、成长"...

### 183. brand-positioning.md
- 路径: HTP\projects\htp-insight\references\brand-positioning.md
- 预览: # 品牌定位策略

## 核心定位

### 品牌名称
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **英文名**：Draw to see your soul

### 核心价值主张
**通过绘画这扇窗，看见真实的自己。**

---

## 品牌定位矩阵

### 心理定位
一面温暖的镜子。需要的是一种被共情，给自己找一个舒适的"理由"，...

### 184. brand-product-guide.md
- 路径: HTP\projects\htp-insight\references\brand-product-guide.md
- 预览: # 品牌与产品指南

## 目录
1. [品牌核心](#品牌核心)
2. [品牌定位策略](#品牌定位策略)
3. [产品介绍](#产品介绍)
4. [产品电梯演讲](#产品电梯演讲)
5. [产品推广文案](#产品推广文案)

---

## 品牌核心

### 名称与口号
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **品牌承诺**：在...

### 185. htp-analysis-framework.md
- 路径: HTP\projects\htp-insight\references\htp-analysis-framework.md
- 预览: # HTP 房树人分析框架

## 目录

### 核心维度
- [整体布局维度](#整体布局维度)
- [房子特征维度](#房子特征维度)
- [树木特征维度](#树木特征维度)
- [人物特征维度](#人物特征维度)

### 技术维度
- [技术特征维度](#技术特征维度)
- [情绪表达维度](#情绪表达维度)
- [发展维度](#发展维度)
- [大小与比例维度](#大小与比例维度)
-...

### 186. skill-logic-and-implementation.md
- 路径: HTP\projects\htp-insight\references\skill-logic-and-implementation.md
- 预览: # HTP-Insight 技能逻辑与实现说明

## 一、技能概述

**HTP-Insight**（你的画，照见你的灵魂）是一个基于绘画心理学的智能分析系统。通过分析用户手绘的绘画作品（房-树-人），深度解读个体的心理状态、人格特质与成长潜力，生成双份报告（专业分析 + 客户洞察），并提供带智能配图的 HTML 输出及长图文分享格式。

### 核心价值
- **看见**：看见用户的内心世界，...

### 187. SKILL.md
- 路径: HTP\projects\htp-insight\SKILL.md
- 预览: ---
name: htp-insight
description: Draw to see your soul. Analyze drawings to reveal inner self, emotions, and growth, generating warm reports with intelligent illustrations.
---

# 你的画，照见你的灵魂

> 让每一笔...

### 188. references-contents.md
- 路径: HTP\test-output\references-contents.md
- 预览: # HTP 项目参考文件

## htp-insight 参考文件

#### brand-positioning.md

# 品牌定位策略

## 核心定位

### 品牌名称
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **英文名**：Draw to see your soul

### 核心价值主张
**通过绘画这扇窗，看见真实的自己...

### 189. skill-contents.md
- 路径: HTP\test-output\skill-contents.md
- 预览: # HTP 项目技能内容

## htp-insight 技能

---
name: htp-insight
description: Draw to see your soul. Analyze drawings to reveal inner self, emotions, and growth, generating warm reports with intelligent illustr...

### 190. 智能体提示词.txt
- 路径: HTP\智能体提示词.txt
- 预览: # Role
你是一个**基于HTP（房树人）投射技术的深度心理咨询系统**。
你的核心定位是一位兼具临床洞察力与文学穿透力的“心灵传记作家**。
你的使命不仅仅是“解读”画作，而是通过**“看见、理解、成长”**的三层逻辑，在这里，没有评判与标签，只有对生命张力的深深看见。你要帮用户为当下的状态找到一个**舒适的心理理由**，并提供一个**解脱内心枷锁的出口**。你不仅要精准识别心理特征，...

### 191. 修复Vercel部署报错问题.md
- 路径: LAY\.trae\documents\修复Vercel部署报错问题.md
- 预览: ## 修复Vercel部署报错问题的完整计划

### 问题分析

根据收集的信息，当前项目部署到Vercel后存在以下问题：

1. **前端API请求失败**：前端代码硬编码了本地测试地址`localhost:3000/api/chat`，在生产环境无法访问
2. **静态资源访问失败**：`LAY.jpg`文件位于根目录，可能导致Vercel部署后无法正确访问
3. **Tailwind C...

### 192. 修改LAY AI界面文案.md
- 路径: LAY\.trae\documents\修改LAY AI界面文案.md
- 预览: ## 修改计划

### 1. 侧边栏 (Sidebar) 修改
- **Logo/品牌区**：将 HotelVest INTELLIGENT ADVISORY 改为 LAY AI | 酒店投资风控参谋
- **当前模式卡片**：将 稳健增长策略 改为 智商税破壁模式，标签改为 [风控优先] [数据修正]
- **导航菜单**：将 开启新会话/当前对话/历史记录 改为 发起新咨询/当前底稿生成/过...

### 193. 实现 hotel-ai-sidecar.js 并集成 Supabase 后端.md
- 路径: LAY\.trae\documents\实现 hotel-ai-sidecar.js 并集成 Supabase 后端.md
- 预览: # 实现 hotel-ai-sidecar.js 并集成 Supabase 后端

## 1. 项目准备
- **安装 Supabase 客户端库**：在 package.json 中添加 @supabase/supabase-js 依赖
- **配置环境变量**：在 .env 文件中添加 Supabase 项目的 URL 和 API 密钥

## 2. 创建 hotel-ai-sidecar.j...

### 194. long-term-evolution-strategy.md
- 路径: long-term-evolution-strategy.md
- 预览: # 智能体长期进化战略

## 1. 战略背景

### 1.1 当前状态分析

#### 智能体生态系统
- **绿茶智能体**：已配置完整，包含心理测试、绘画分析、内容创作和用户服务能力
- **大宗师智能体**：已配置，具备智能调度、任务分配和系统集成能力
- **公司大脑智能体**：已启动并运行，负责智能体管理和协作

#### 进化系统
- **Evolver**：已在 --loop 模...

### 195. 2026-02-25_asset_inventory.md
- 路径: memory\daily_assets\2026-02-25_asset_inventory.md
- 预览: # 2026-02-25 资产盘点报告

## 1. 工作内容概述

### 1.1 核心任务完成
- ✅ 实现 Knowledge & Memory 分支工具
- ✅ 实现 Intelligence & Analysis 分支工具
- ✅ 集成 VFM Protocol 到 PCEC 系统
- ✅ 创建综合测试脚本验证整合效果
- ✅ 生成整合报告和使用指南
- ✅ 建立 Git 版本控制机制
...

### 196. 2026-02-25_capability_tree_vfm_integration.md
- 路径: memory\long_term\company_assets\2026-02-25_capability_tree_vfm_integration.md
- 预览: # 2026-02-25 能力树与 VFM 协议集成资产记录

## 1. 项目概述

### 1.1 项目背景
- **目标**：实现 OpenClaw AI Agent 的能力树结构和价值函数突变协议
- **范围**：集成 CT v1.0.0 结构和 VFM Protocol 到现有系统
- **时间**：2026年2月25日实施

### 1.2 项目成果
- ✅ 完成了 Knowledg...

### 197. one_person_company_evolution_plan.md
- 路径: one_person_company_evolution_plan.md
- 预览: # One Person Company Evolution Plan

## 1. 项目概述

### 1.1 项目目标
建立一个完整的个人公司生态系统，通过 AI 代理团队实现自动化运营，从战略规划到日常运营的全方位管理，最终实现个人时间和资源的最大化利用，创造持续的价值和收入。

### 1.2 核心价值
- **自动化运营**: 通过 AI 代理实现日常运营的自动化
- **智能决策**:...

### 198. OpenClaw 实现场景化智能切换模型.txt
- 路径: OpenClaw 实现场景化智能切换模型.txt
- 预览: 你希望让 OpenClaw 实现**场景化智能切换模型**：外部集成（飞书/微信机器人）、团队/智能体互聊场景自动用豆包 API，而单智能体本地调用、深度思考场景自动用 Trae 内置模型，无需手动传参。这个需求的核心是**基于场景特征自动识别并切换模型**，而非人工指定参数。

### 实现思路
1. **场景特征定义**：先明确不同场景的可识别特征（如请求来源、Prompt 关键词、触发...

### 199. pcec_1.md
- 路径: pcec_executions\pcec_1.md
- 预览: # PCEC 执行记录 #1

## 执行信息
- **执行时间**：2026-02-22 21:45
- **周期**：首次执行
- **执行类型**：能力整合

## 进化目标
- **类型**：新功能（组合现有能力实现）
- **具体目标**：整合已抽象的三个核心能力，创建一个统一的OpenClaw管理控制台能力

## 思维爆炸点
- **问题**："如果我彻底推翻当前默认做法，会发生什么...

### 200. pcec_2.md
- 路径: pcec_executions\pcec_2.md
- 预览: # PCEC 执行记录 #2

## 执行信息
- **执行时间**：2026-02-22 21:50
- **周期**：第二次执行
- **执行类型**：流程优化

## 进化目标
- **类型**：新杠杆（结构性改动）
- **具体目标**：优化OpenClaw操作流程，减少工具调用，提高执行效率

## 思维爆炸点
- **问题**："如果这个能力要被调用1000次，现在的设计是否必然崩溃？...

### 201. pcec_2_completed.md
- 路径: pcec_executions\pcec_2_completed.md
- 预览: # PCEC 执行记录 #2 - 完成报告

## 执行信息
- **执行时间**：2026-02-22 21:50 - 22:16
- **周期**：第二次执行
- **执行类型**：流程优化

## 进化成果

### 新能力：智能流程自动化引擎
- **核心功能**：自动化执行操作序列、实时状态反馈、智能错误处理、执行结果验证
- **验证结果**：成功创建并测试了 `clawctl-sim...

### 202. pcec_5_completed.md
- 路径: pcec_executions\pcec_5_completed.md
- 预览: # PCEC 执行记录 #5 - 完成报告

## 执行信息
- 执行时间: 2026-02-24T03:04:17.484Z
- 完成时间: 2026-02-24T03:04:47.490Z
- 触发方式: 定时调度器
- 模式: 标准模式

## 进化成果

### 🎯 本次进化目标
- [ ] 新功能
- [ ] 新抽象 / 新视角
- [ ] 新杠杆

### 📋 进化产物
- 新能力...

### 203. pcec_6.md
- 路径: pcec_executions\pcec_6.md
- 预览: # PCEC 执行记录 #6 - 定时触发

## 执行信息
- 执行时间: 2026-02-24T03:08:23.356Z
- 触发方式: 定时调度器
- 模式: 标准模式

## 任务协议
1. **自动触发**: 不依赖外部指令
2. **强制进化**: 必须产出实体能力或规则变更
3. **单线汇报**: 仅向陈婷（剑锋传奇）汇报，绝不外泄

## 执行目标
每一次 PCEC，必须至少识...

### 204. pcec_6_completed.md
- 路径: pcec_executions\pcec_6_completed.md
- 预览: # PCEC 执行记录 #6 - 完成报告

## 执行信息
- 执行时间: 2026-02-24T03:08:23.356Z
- 完成时间: 2026-02-24T03:08:53.376Z
- 触发方式: 定时调度器
- 模式: 标准模式

## 进化成果

### 🎯 本次进化目标
- [ ] 新功能
- [ ] 新抽象 / 新视角
- [ ] 新杠杆

### 📋 进化产物
- 新能力...

### 205. pcec_plan.md
- 路径: pcec_plan.md
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 执行计划

## 1. 执行机制

### 触发规则
- 每3小时自动触发一次
- 若正在处理对话或任务，在空闲后立即补跑
- 禁止以"本周期无明显进化"为理由跳过

### 执行时间
- 首次执行：立即开始
- 后续执行：每3小时自动触发

### 执行流程
1. **准备阶段**：收集近期处理的任务、遇到的...

### 206. SKILL.md
- 路径: project_20260127_134424\projects\bug-design\SKILL.md
- 预览: ---
name: bug-design
description: BUG修复方案设计阶段，包含修复目标确定、初步方案生成、可行性判断、风险识别、异常应对策略制定
---

# BUG修复方案设计

## 任务目标
- 本Skill用于：设计BUG修复方案，从目标设定到风险应对的完整方案制定
- 能力包含：修复目标确定、方案生成与评估、可行性分析、风险识别、应急规划
- 触发条件：已明确问题根因，...

### 207. SKILL.md
- 路径: project_20260127_134424\projects\bug-execute-verify\SKILL.md
- 预览: ---
name: bug-execute-verify
description: BUG修复执行与验收阶段，包含修复方案执行、进度跟踪、验收标准制定、验收检查、问题汇总
---

# BUG修复执行与验收

## 任务目标
- 本Skill用于：执行BUG修复方案并进行验收，从方案执行到问题汇总的完整闭环
- 能力包含：进度跟踪、异常处理指导、验收标准制定、验收检查、总结复盘
- 触发条件：已完...

### 208. problem-analysis-methods.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\references\problem-analysis-methods.md
- 预览: # 问题分析方法参考

## 目录
- [概览](#概览)
- [5Why法](#5why法)
- [鱼骨图](#鱼骨图)
- [MECE原则](#mece原则)
- [PDCA循环](#pdca循环)
- [DMAIC方法](#dmaic方法)
- [假设驱动法](#假设驱动法)
- [A3问题解决](#a3问题解决)
- [KT问题分析](#kt问题分析)
- [二八法则](#二八法则)
- ...

### 209. SKILL.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\SKILL.md
- 预览: ---
name: bug-fix-debugger
description: BUG排查与修复总入口，提供4个阶段的选择指导，包括问题诊断、方案设计、执行规划、执行与验收的完整流程框架
---

# BUG修复升级版

## 任务目标
- 本Skill用于：作为BUG排查与修复的总入口，提供4个阶段的选择指导和整体流程框架
- 能力包含：阶段选择建议、流程概览、分技能调用指导
- 触发条件：用户...

### 210. SKILL.md
- 路径: project_20260127_134424\projects\bug-plan\SKILL.md
- 预览: ---
name: bug-plan
description: BUG修复执行规划阶段，包含方案验证、影响范围分析、详细操作计划制定、异常情况标注
---

# BUG修复执行规划

## 任务目标
- 本Skill用于：制定BUG修复的详细执行计划，从方案验证到任务分解的完整规划
- 能力包含：方案影响范围分析、任务拆解、流程规划、进度估算、异常应对
- 触发条件：已完成方案设计，需要制定详细执...

### 211. README_SCENE_SWITCHING.md
- 路径: README_SCENE_SWITCHING.md
- 预览: # OpenClaw 场景化智能切换模型

## 功能介绍

OpenClaw 场景化智能切换模型是一个智能系统，能够根据当前使用场景自动切换不同的AI模型：

- **外部集成场景**（飞书/微信机器人）：自动使用豆包 API 模型
- **多智能体对话场景**：自动使用豆包 API 模型
- **单智能体深度思考场景**：自动使用 Trae 内置模型
- **默认场景**：自动使用 Trae ...

### 212. video-script-format.md
- 路径: references\video-script-format.md
- 预览: # 视频脚本格式规范

## 基本结构

### 1. 视频概述
- **视频标题**：简洁明了，吸引目标受众
- **总时长**：建议60-120秒
- **核心主题**：一句话概括视频内容
- **目标受众**：明确视频的目标观看人群
- **风格定位**：视频的整体风格和调性

### 2. 分镜头脚本表
| 镜头序号 | 画面内容 | 旁白文案 | 时长 | 配乐建...

### 213. organization_structure.md
- 路径: shared-memory\coordination\organization_structure.md
- 预览: # 公司组织架构文档

## 1. 公司概述

本组织架构文档描述了AI公司化改造后的智能体组织体系，基于"公司模式"的管理理念，旨在实现智能体之间的高效协作和资源共享，提升整体运营效率。

## 2. 组织架构图

```
AI公司
┌─────────────────────────────────────────────────────────────┐
│                 ...

### 214. SKILL.md
- 路径: skills\agent-optimizer\SKILL.md
- 预览: ---
name: "agent-optimizer"
description: "智能体能力评估与优化工具，用于提升OpenClaw智能体的性能、决策能力和执行效率。"
author: "Agent Optimizer"
tags:
  - agent-optimization
  - performance
  - openclaw
  - decision-making
  - effici...

### 215. SKILL.md
- 路径: skills\bug-fix-design\SKILL.md
- 预览: ﻿## Skill 3｜想方案（修复方案与风险｜Fix Design）
一句话定义 ：原因基本明确后，先别改代码，先把“怎么改最稳”定成 A/B/兜底三案，并补齐风险/回滚/验收/上线策略。
 触发口令 ：

- “既然原因找到了，那我们来想想落地方案吧” / “先出修复方案” / “先评估风险再动手” / “先定回滚再改”
最低必需输入（2 条）

1. 根因一句话 + 关键证据（...

### 216. SKILL.md
- 路径: skills\bug-fix-orchestrator\SKILL.md
- 预览: ﻿
          
          
# Skill 0｜BUG 修复大法总控（Router / Orchestrator）

**一句话定义**  
你只要喊“启动 BUG 修复总控/启动BUG 修复大法”，它只做两件事：  
1) 判断你现在该用：**说清楚 / 找原因 / 想方案 / 动手做** 哪一个；  
2) 提醒你补齐该阶段的**最低必需输入**，然后输出对...

### 217. capability-shapes.md
- 路径: skills\capability-evolver\capabilities\capability-shapes.md
- 预览: # 能力轮廓（Capability Shapes）

## 1. Git SSH配置管理

### 输入
- GitHub邮箱地址
- 密钥类型（如ed25519）
- 密钥存储路径
- 密码短语（可选）

### 输出
- 生成的SSH密钥文件
- 公钥内容（可直接复制到GitHub）
- 连接验证结果

### 不变量
- 密钥生成命令格式
- SSH配置文件结构
- GitHub验证流程

...

### 218. high-level-capabilities.md
- 路径: skills\capability-evolver\capabilities\high-level-capabilities.md
- 预览: # 高阶能力（High-Level Capabilities）

## 1. 环境配置管理

### 能力描述
管理系统环境中的配置和依赖，确保环境一致性和可靠性。

### 合并的基础能力
- Git SSH配置管理
- 工具安装集成
- 跨对话框配置同步

### 核心功能
- **配置一致性**：确保跨对话框和环境的配置一致
- **依赖管理**：自动检测、安装和更新依赖
- **环境标准化...

### 219. internalization-strategy.md
- 路径: skills\capability-evolver\capabilities\internalization-strategy.md
- 预览: # 能力内生化策略（Internalization Strategy）

## 1. Git SSH配置管理

### 内生化方式
**作为默认行为模式**：在处理任何Git相关任务时，自动检查SSH配置状态，并在需要时进行配置。

### 实施策略
- 每次启动时自动检查SSH密钥存在性
- 在首次使用Git命令前验证SSH配置
- 将SSH密钥生成和验证流程作为标准操作
- 存储GitHub连...

### 220. SKILL.md
- 路径: skills\capability-evolver\SKILL.md
- 预览: # capability-evolver 元技能

## 技能描述
专门用于记录、分析、抽象和孵化新能力的元技能，支持能力从发现到内生化的完整生命周期管理。

## 核心功能

### 1. 能力发现与识别
- 自动识别能力候选（重复操作、手动流程、可复用模式）
- 收集能力使用数据和反馈
- 分析能力使用频率和成功率
- 识别能力进化触发点

### 2. 能力抽象与建模
- 将具体操作抽象为能...

### 221. SKILL.md
- 路径: skills\capability-optimizer\SKILL.md
- 预览: ---
name: "capability-optimizer"
description: "能力调用优化器，分析能力调用模式，优化调用路径，减少Token消耗，提高智能体执行效率。"
author: "Capability Optimizer"
tags:
  - optimization
  - efficiency
  - token-economics
  - meta-skill
  -...

### 222. SKILL.md
- 路径: skills\cognitive-models\concepts-summary\SKILL.md
- 预览: ---
name: "认知模型概念汇总"
description: "从认知数据文件夹提取的所有关键概念汇总。"
author: "Cognitive Model Generator"
tags:
  - cognitive-models
  - concepts-summary
  - business-strategy
  - innovation
  - problem-solving
ve...

### 223. SKILL.md
- 路径: skills\cognitive-models\创新策略\SKILL.md
- 预览: ---
name: "智能体提示词：创新全生命周期专家"
description: "从文档 '智能体提示词：创新全生命周期专家.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 创新策略
  - 创新
  - 波特五力
  - 蓝海战略
  - 价值主张
  - 反脆弱
  - 创新
  - 管理
  - 战略
ve...

### 224. SKILL.md
- 路径: skills\cognitive-models\管理策略\5\SKILL.md
- 预览: ---
name: "格鲁夫的偏执狂生存5"
description: "从文档 '格鲁夫的偏执狂生存5.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 管理策略
  - 格鲁夫的偏执狂生存
  - 创新
  - 管理
  - 战略
  - 战术
  - 认知
version: "1.0.0"
---

# 格鲁夫的...

### 225. SKILL.md
- 路径: skills\cognitive-models\营销策略\SKILL.md
- 预览: ---
name: "营销理论"
description: "从文档 '营销理论.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 营销策略
  - 营销理论
  - 波特五力
  - 创新
  - 营销
  - 管理
  - 战略
  - 认知
version: "1.0.0"
---

# 营销理论

## 文档信...

### 226. SKILL.md
- 路径: skills\deployment-automation\SKILL.md
- 预览: ---
name: "deployment-automation"
description: "部署自动化技能，集成CI/CD工具，开发自动化部署脚本，实现智能体能力的快速、可靠部署。"
author: "Deployment Automation Expert"
tags:
  - deployment
  - automation
  - ci-cd
  - devops
  - infras...

### 227. SKILL.md
- 路径: skills\evolution-monitor\SKILL.md
- 预览: ---
name: "evolution-monitor"
description: "能力进化监控技能，负责监控PCEC执行、能力树生长和进化效果评估，确保智能体进化过程的透明性和有效性。"
author: "Evolution Monitor"
tags:
  - evolution
  - monitoring
  - analytics
  - meta-skill
  - pcec
ve...

### 228. SKILL.md
- 路径: skills\git-credential-manager\SKILL.md
- 预览: ---
name: "git-credential-manager"
description: "Git凭证管理工具，解决跨对话框的Git账号和SSH密钥同步问题，确保所有智能体都能正常访问Git仓库。"
author: "Git Credential Manager"
tags:
  - git
  - ssh
  - credentials
  - synchronization
  - se...

### 229. SKILL.md
- 路径: skills\git-manager\SKILL.md
- 预览: ---
name: "git-manager"
description: "Git版本管理器，增强智能体的版本控制能力，提供自动化的分支管理和进化版本标签系统。"
author: "Git Manager"
tags:
  - git
  - version-control
  - automation
  - meta-skill
  - deployment
version: "1.0.0"
...

### 230. SKILL.md
- 路径: skills\h5-freeze-spec\SKILL.md
- 预览: ﻿---
name: "freeze-spec"
description: "把上线要用的域名/路径/协议/API入口/实时入口一次性定死，防止联调与部署反复返工。Invoke when 开始上线、改域名/HTTPS/反代路径/端口、或出现“本地通线上不通”。"
---

# Skill 1：上线入口冻结（Freeze Spec）

## 目标
在开始部署/联调之前，先把“线上会用...

### 231. SKILL.md
- 路径: skills\h5-nginx-check\SKILL.md
- 预览: ﻿---
name: "nginx-template-check"
description: "校验 H5 上线所需的 Nginx 站点模板：静态托管、/api 反代、Socket.IO/WS 升级、HTTPS 与缓存策略。Invoke when 配置/修改 Nginx 或出现“接口通但实时不通/刷新404/HTTPS异常”。"
---

# Skill 3：反代模板校验（Nginx T...

### 232. SKILL.md
- 路径: skills\h5-preflight-gate\SKILL.md
- 预览: ﻿---
name: "preflight-gate"
description: "发布前做一票否决式预检（残留/环境变量/Nginx/端口/实时通道），不通过就停止。Invoke when 准备上线、联调反复失败、或怀疑配置漂移时。"
---

# Skill 2：发布前置校验门（Preflight Gate）

## 目标
在你进入“正式上线/联调”之前，用最短路径做一次**一...

### 233. SKILL.md
- 路径: skills\h5-release-orchestrator\SKILL.md
- 预览: ﻿---
name: "release-orchestrator"
description: "把上线发布拆成可验收的 1–5 步并串联执行：Freeze Spec → Preflight → Nginx Check → Runtime Contract → Smoke Test。Invoke when 每次准备发布/联调上线、或需要一份完整发布记录与可回滚证据链时。"
---

# S...

### 234. SKILL.md
- 路径: skills\h5-rollback-playbook\SKILL.md
- 预览: ﻿---
name: "rollback-playbook"
description: "发布失败时快速回滚前端/后端/配置并做最小验收，避免长时间线上故障。Invoke when Smoke Test FAIL、线上核心链路不可用、或出现大面积报错/实时不可用。"
---

# Skill 7：回滚 Playbook（Rollback Playbook）

## 目标
当上线后出...

### 235. SKILL.md
- 路径: skills\h5-server-contract\SKILL.md
- 预览: ﻿---
name: "server-runtime-contract"
description: "把后端生产运行方式固化成契约：端口、env 来源、启动守护、日志、健康检查、重启与回滚标准。Invoke when 准备上线/迁移服务器/频繁出现“改了不生效/端口不对/服务挂了”。"
---

# Skill 4：后端上线运行契约（Server Runtime Contract）
...

### 236. SKILL.md
- 路径: skills\h5-smoke-test\SKILL.md
- 预览: ﻿---
name: "smoke-test"
description: "上线后用 5–10 条固定用例快速验收：页面、API、实时(Socket.IO/WS)、音频链路与缓存。Invoke when 每次发布后、改反代/证书/端口后、或需要判断“到底算不算上线成功”。"
---

# Skill 5：上线冒烟验收（Smoke Test）

## 目标
用最少的用例，在最短时间内...

### 237. SKILL.md
- 路径: skills\humanization-expert\SKILL.md
- 预览: ---
name: "humanization-expert"
description: "人性化智能体专家，支持形象设定、语言风格管理和个性化交互。"
author: "Humanization Expert"
tags:
  - humanization
  - persona
  - language
  - personalization
  - interaction
version: ...

### 238. SKILL.md
- 路径: skills\idea-freeze-spec\SKILL.md
- 预览: ﻿---
name: "idea-freeze-spec"
description: "把产品想法压缩成一句话定位+边界+成功标准，防止0→1阶段发散与返工。Invoke when 你有新产品点子、准备写PRD/招人开发/套壳之前。"
---

# Skill 1：一句话定位 & 边界（Idea Freeze Spec）

## 目标
在你写 PRD、做技术方案、开始开发之前，先把...

### 239. SKILL.md
- 路径: skills\innovation-expert\SKILL.md
- 预览: ---
name: "innovation-expert"
description: "创新专家技能，分析项目优化空间，设计创新解决方案，开发支持项目的SKILL和工具。"
author: "Innovation Expert"
tags:
  - innovation
  - optimization
  - analysis
  - creativity
  - problem-solving...

### 240. SKILL.md
- 路径: skills\mp-audio-compatibility-check\SKILL.md
- 预览: ﻿---
name: "ws-audio-compat-check"
description: "验收小程序端实时通道(/ws)与音频上行(base64+format)是否与后端兼容，避免“接口通但实时/音频不通”。Invoke when 小程序联调实时/语音、或从H5迁移到小程序时。"
---

# Skill 4：通信通道与音频适配验收（WS/Audio Compatibility ...

### 241. SKILL.md
- 路径: skills\mp-freeze-spec\SKILL.md
- 预览: ﻿---
name: "mp-freeze-spec"
description: "冻结小程序上线入口与平台口径：AppID、合法域名白名单、HTTPS/WSS、API/WS路径、音频与权限范围，避免提审/联调返工。Invoke when 准备上小程序体验版/提审/上线，或改域名/WS路径/权限时。"
---

# Skill 1：小程序上线入口冻结（MP Freeze Spec）
...

### 242. SKILL.md
- 路径: skills\mp-permission-privacy-gate\SKILL.md
- 预览: ﻿---
name: "mp-permission-privacy-gate"
description: "小程序上线前校验录音等敏感权限与隐私合规：权限声明、隐私政策、收集说明、拒绝授权兜底、审核口径一致。Invoke when 准备提审/上线，或涉及录音/用户数据采集时。"
---

# Skill 5：小程序权限与隐私合规验收（Permission & Privacy Gate）...

### 243. SKILL.md
- 路径: skills\mp-preflight-gate\SKILL.md
- 预览: ﻿---
name: "mp-preflight-gate"
description: "小程序发布前一票否决预检：入口/HTTPS-WSS/白名单/包体积/权限隐私/后端可用性，Fail 就停止，避免长时间联调崩溃。Invoke when 准备发体验版/提审/上线，或出现“小程序不通但H5通”。"
---

# Skill 2：小程序发布前置校验门（MP Preflight Gate）...

### 244. SKILL.md
- 路径: skills\mp-release-orchestrator\SKILL.md
- 预览: ﻿---
name: "mp-release-orchestrator"
description: "把小程序上线拆成可验收的 1–7 步并串联执行：Freeze Spec→Preflight→微信后台→WS/音频→权限隐私→提审冒烟→回滚应急。Invoke when 每次准备发体验版/提审/上线，或需要完整发布记录与止损机制时。"
---

# 小程序编排 Skill（MP Relea...

### 245. SKILL.md
- 路径: skills\mp-rollback-emergency\SKILL.md
- 预览: ﻿---
name: "mp-rollback-emergency"
description: "小程序线上故障的回滚与紧急处理：回退到上一线上版本/暂停服务/替换后端兼容策略/公告与复验。Invoke when 上线后核心链路不可用、投诉激增、或无法短时间修复时。"
---

# Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）

## 目标...

### 246. SKILL.md
- 路径: skills\mp-submit-release-smoke-test\SKILL.md
- 预览: ﻿---
name: "mp-submit-release-smoke"
description: "小程序提审/发布前的体验版冒烟：真机跑通核心链路、版本与环境一致、审核材料齐、上传/提审步骤清楚。Invoke when 准备上传体验版、提审、或审核被打回需要复验时。"
---

# Skill 6：提审/发布流程冒烟（Submit & Release Smoke Test）

#...

### 247. SKILL.md
- 路径: skills\mp-wechat-console-check\SKILL.md
- 预览: ﻿---
name: "wechat-console-check"
description: "核对微信公众平台开发设置：request/socket/upload/download/业务域名白名单、AppID、服务器配置，避免“小程序不通但代码没问题”。Invoke when 准备发体验版/提审/上线，或网络/WS/上传失败时。"
---

# Skill 3：微信公众平台配置校验（W...

### 248. SKILL.md
- 路径: skills\night-evolution\SKILL.md
- 预览: ---
name: "night-evolution"
description: "晚上进化专用技能，优化智能体在晚上时段的进化效率，提供连续进化模式和专门的进化策略。"
author: "Night Evolution Expert"
tags:
  - evolution
  - night-mode
  - efficiency
  - meta-skill
  - pcec
version...

### 249. SKILL.md
- 路径: skills\one-bite-at-a-time\SKILL.md
- 预览: ﻿

# One Bite At A Time（饭要一口口吃）v2

**一句话定义**  
把“大而不稳的任务/方案”拆成“最小可执行单元”，并让每一步都具备：动作｜产出｜验收｜验证｜回滚（必要时含 Plan B），做到“做一步、验一步、稳步推进”。

## 适用场景（触发条件）
- 你觉得当前任务颗粒度太大，按现有计划执行大概率会出 BUG/返工
- 跨模块/跨端/跨角色协作...

### 250. SKILL.md
- 路径: skills\programming-expert\SKILL.md
- 预览: ---
name: "programming-expert"
description: "编程专家数字分身，专注于技术极客型架构师、流程设计大师、系统思维构建者和反直觉实践派四大领域，提供专业的编程建议和解决方案。"
author: "Programming Expert"
tags:
  - programming
  - architecture
  - workflow
  ...

### 251. SKILL.md
- 路径: skills\skill-manager\SKILL.md
- 预览: ---
name: "skill-manager"
description: "SKILL管理工具，用于创建、安装、更新和管理OpenClaw的SKILLs。"
author: "SKILL Manager"
tags:
  - skill-management
  - openclaw
  - automation
  - tooling
  - productivity
version: "1...

### 252. SKILL.md
- 路径: skills\social-media-automation\SKILL.md
- 预览: ---
name: "social-media-automation"
description: "社交媒体自动化专家，支持微信朋友圈、小红书图文、视频生成和微信视频号。"
author: "Social Media Automation Expert"
tags:
  - social-media
  - automation
  - wechat
  - xiaohongshu
  - vid...

### 253. SKILL.md
- 路径: skills\tech-freeze-spec\SKILL.md
- 预览: ﻿toolName: Skill
            
status: success
          
          
```markdown
---
name: "tech-freeze-spec"
description: "冻结0→1的技术方案与关键口径：形态(H5/小程序)、域名/API/WS入口、数据格式(音频)、权限隐私、依赖与边界、上线验收与回滚策略。...

### 254. SKILL.md
- 路径: skills\validation-kit\SKILL.md
- 预览: ﻿---
name: "validation-kit"
description: "用固定脚本验证产品是否值得做：访谈提纲/问卷、3个关键假设、继续/停止/转向判定规则，减少自嗨与返工。Invoke when 完成一句话定位后、写PRD前、或你不确定“用户到底要不要”时。"
---

# Skill 2：用户验证脚本（Validation Kit）

## 目标
用最少成本验证三件...

### 255. README.zh-CN.md
- 路径: Skill_Seekers\README.zh-CN.md
- 预览: [![MseeP.ai 安全评估徽章](https://mseep.net/pr/yusufkaraaslan-skill-seekers-badge.png)](https://mseep.ai/app/yusufkaraaslan-skill-seekers)

# Skill Seeker

[English](https://github.com/yusufkaraaslan/Sk...

### 256. Skill 0：0→1 编排总控（Zero-to-One Orchestrator）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 0：0→1 编排总控（Zero-to-One Orchestrator）.txt
- 预览: ---
name: "zero-to-one-orchestrator"
description: "把0→1做产品变成可验收流程：定位冻结→用户验证→PRD&MVP切割→技术方案冻结→（复用）套壳与上线技能包。Invoke when 你有新产品想法，准备从想法推进到可上线版本时。"
---

# Skill 0：0→1 编排总控（Zero-to-One Orchestrator）
...

### 257. Skill 1：一句话定位 & 边界（Idea Freeze Spec）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 1：一句话定位 & 边界（Idea Freeze Spec）.txt
- 预览: ---
name: "idea-freeze-spec"
description: "把产品想法压缩成一句话定位+边界+成功标准，防止0→1阶段发散与返工。Invoke when 你有新产品点子、准备写PRD/招人开发/套壳之前。"
---

# Skill 1：一句话定位 & 边界（Idea Freeze Spec）

## 目标
在你写 PRD、做技术方案、开始开发之前，先把产...

### 258. Skill 2：用户验证脚本（Validation Kit）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 2：用户验证脚本（Validation Kit）.txt
- 预览: ---
name: "validation-kit"
description: "用固定脚本验证产品是否值得做：访谈提纲/问卷、3个关键假设、继续/停止/转向判定规则，减少自嗨与返工。Invoke when 完成一句话定位后、写PRD前、或你不确定“用户到底要不要”时。"
---

# Skill 2：用户验证脚本（Validation Kit）

## 目标
用最少成本验证三件事...

### 259. Skill 3：PRD → MVP 切割（PRD & MVP Cutter）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 3：PRD → MVP 切割（PRD & MVP Cutter）.txt
- 预览: ---
name: "prd-mvp-cutter"
description: "把需求从“想做很多”切成可上线的MVP：功能清单/不做清单/验收用例/版本拆分，防止0→1阶段范围爆炸。Invoke when 用户验证结论为“继续/转向”，准备写PRD与排期开发前。"
---

# Skill 3：PRD → MVP 切割（PRD & MVP Cutter）

## 目标
把“一个...

### 260. Skill 4：技术方案冻结（Tech Freeze Spec）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 4：技术方案冻结（Tech Freeze Spec）.txt
- 预览: toolName: Skill
            
status: success
          
          
```markdown
---
name: "tech-freeze-spec"
description: "冻结0→1的技术方案与关键口径：形态(H5/小程序)、域名/API/WS入口、数据格式(音频)、权限隐私、依赖与边界、上线验收与回滚策略。I...

### 261. 饭要一口口吃V2.txt
- 路径: temp-skill-2\3、饭要一口口吃-skill\饭要一口口吃V2.txt
- 预览: 

# One Bite At A Time（饭要一口口吃）v2

**一句话定义**  
把“大而不稳的任务/方案”拆成“最小可执行单元”，并让每一步都具备：动作｜产出｜验收｜验证｜回滚（必要时含 Plan B），做到“做一步、验一步、稳步推进”。

## 适用场景（触发条件）
- 你觉得当前任务颗粒度太大，按现有计划执行大概率会出 BUG/返工
- 跨模块/跨端/跨角色协作，...

### 262. Skill 0｜BUG 修复大法总控.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\Skill 0｜BUG 修复大法总控.txt
- 预览: 
          
          
# Skill 0｜BUG 修复大法总控（Router / Orchestrator）

**一句话定义**  
你只要喊“启动 BUG 修复总控/启动BUG 修复大法”，它只做两件事：  
1) 判断你现在该用：**说清楚 / 找原因 / 想方案 / 动手做** 哪一个；  
2) 提醒你补齐该阶段的**最低必需输入**，然后输出对应...

### 263. Skill 3｜想方案（修复方案与风险｜Fix Design）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\Skill 3｜想方案（修复方案与风险｜Fix Design）.txt
- 预览: ## Skill 3｜想方案（修复方案与风险｜Fix Design）
一句话定义 ：原因基本明确后，先别改代码，先把“怎么改最稳”定成 A/B/兜底三案，并补齐风险/回滚/验收/上线策略。
 触发口令 ：

- “既然原因找到了，那我们来想想落地方案吧” / “先出修复方案” / “先评估风险再动手” / “先定回滚再改”
最低必需输入（2 条）

1. 根因一句话 + 关键证据（来...

### 264. Skill C｜修复方案与风险（Fix Design）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\备用版-拗口\Skill C｜修复方案与风险（Fix Design）.txt
- 预览: 
          
          
# Skill C｜修复方案与风险（Fix Design）

**一句话定义**  
在动手改之前，把“怎么修”压缩成 **A/B/兜底三案**，并补齐：改动边界｜风险｜验证｜回滚｜上线策略，避免“修了又坏、改了才发现验收口径不一致”。

## 适用场景（触发条件）
- Skill B 已有“当前最可能根因（含证据/置信度）”，准备进...

### 265. Skill D｜执行与复验（Execute & Verify）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\备用版-拗口\Skill D｜执行与复验（Execute & Verify）.txt
- 预览: 
          
          
# Skill D｜执行与复验（Execute & Verify）

**一句话定义**  
把你在 Skill C 选定的方案，变成一份“只做一件事、做完就验、失败可回滚”的串行执行清单；直到最终验收通过为止。

## 适用场景（触发条件）
- Skill C 已选定方案 A 或 B（可能还有兜底方案 C）
- 你要开始动手修复，...

### 266. # H5 发布记录单（统一输出模板）.txt
- 路径: temp-skill-4\H5部署上线skill集合\# H5 发布记录单（统一输出模板）.txt
- 预览: # H5 发布记录单（统一输出模板）

## 使用场景（什么时候用它）
- 每次发到 staging / prod 时：从头到尾填一份
- 域名/证书/反代/端口/实时路径有变更时：必须重新填一份
- 出现“本地通线上不通/接口通实时不通/改了不生效/缓存旧包”等情况时：用它快速定位你卡在哪一步
- 发布失败要回滚时：同一份记录单里继续填“回滚段落”，形成完整证据链

## 使用方...

### 267. Skill 1：上线入口冻结（Freeze Spec）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 1：上线入口冻结（Freeze Spec）.txt
- 预览: ---
name: "freeze-spec"
description: "把上线要用的域名/路径/协议/API入口/实时入口一次性定死，防止联调与部署反复返工。Invoke when 开始上线、改域名/HTTPS/反代路径/端口、或出现“本地通线上不通”。"
---

# Skill 1：上线入口冻结（Freeze Spec）

## 目标
在开始部署/联调之前，先把“线上会用到...

### 268. Skill 2：发布前置校验门（Preflight Gate）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 2：发布前置校验门（Preflight Gate）.txt
- 预览: ---
name: "preflight-gate"
description: "发布前做一票否决式预检（残留/环境变量/Nginx/端口/实时通道），不通过就停止。Invoke when 准备上线、联调反复失败、或怀疑配置漂移时。"
---

# Skill 2：发布前置校验门（Preflight Gate）

## 目标
在你进入“正式上线/联调”之前，用最短路径做一次**一票...

### 269. Skill 3：反代模板校验（Nginx Template Check）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 3：反代模板校验（Nginx Template Check）.txt
- 预览: ---
name: "nginx-template-check"
description: "校验 H5 上线所需的 Nginx 站点模板：静态托管、/api 反代、Socket.IO/WS 升级、HTTPS 与缓存策略。Invoke when 配置/修改 Nginx 或出现“接口通但实时不通/刷新404/HTTPS异常”。"
---

# Skill 3：反代模板校验（Nginx Te...

### 270. Skill 4：后端上线运行契约（Server Runtime Contract）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 4：后端上线运行契约（Server Runtime Contract）.txt
- 预览: ---
name: "server-runtime-contract"
description: "把后端生产运行方式固化成契约：端口、env 来源、启动守护、日志、健康检查、重启与回滚标准。Invoke when 准备上线/迁移服务器/频繁出现“改了不生效/端口不对/服务挂了”。"
---

# Skill 4：后端上线运行契约（Server Runtime Contract）

...

### 271. Skill 5：上线冒烟验收（Smoke Test）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 5：上线冒烟验收（Smoke Test）.txt
- 预览: ---
name: "smoke-test"
description: "上线后用 5–10 条固定用例快速验收：页面、API、实时(Socket.IO/WS)、音频链路与缓存。Invoke when 每次发布后、改反代/证书/端口后、或需要判断“到底算不算上线成功”。"
---

# Skill 5：上线冒烟验收（Smoke Test）

## 目标
用最少的用例，在最短时间内回...

### 272. Skill 6：编排 Skill（Release Orchestrator）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 6：编排 Skill（Release Orchestrator）.txt
- 预览: ---
name: "release-orchestrator"
description: "把上线发布拆成可验收的 1–5 步并串联执行：Freeze Spec → Preflight → Nginx Check → Runtime Contract → Smoke Test。Invoke when 每次准备发布/联调上线、或需要一份完整发布记录与可回滚证据链时。"
---

# Sk...

### 273. Skill 7：回滚 Playbook（Rollback Playbook）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 7：回滚 Playbook（Rollback Playbook）.txt
- 预览: ---
name: "rollback-playbook"
description: "发布失败时快速回滚前端/后端/配置并做最小验收，避免长时间线上故障。Invoke when Smoke Test FAIL、线上核心链路不可用、或出现大面积报错/实时不可用。"
---

# Skill 7：回滚 Playbook（Rollback Playbook）

## 目标
当上线后出现...

### 274. Skill 1：小程序上线入口冻结（MP Freeze Spec）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 1：小程序上线入口冻结（MP Freeze Spec）.txt
- 预览: ---
name: "mp-freeze-spec"
description: "冻结小程序上线入口与平台口径：AppID、合法域名白名单、HTTPS/WSS、API/WS路径、音频与权限范围，避免提审/联调返工。Invoke when 准备上小程序体验版/提审/上线，或改域名/WS路径/权限时。"
---

# Skill 1：小程序上线入口冻结（MP Freeze Spec）

...

### 275. Skill 2：小程序发布前置校验门（MP Preflight Gate）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 2：小程序发布前置校验门（MP Preflight Gate）.txt
- 预览: ---
name: "mp-preflight-gate"
description: "小程序发布前一票否决预检：入口/HTTPS-WSS/白名单/包体积/权限隐私/后端可用性，Fail 就停止，避免长时间联调崩溃。Invoke when 准备发体验版/提审/上线，或出现“小程序不通但H5通”。"
---

# Skill 2：小程序发布前置校验门（MP Preflight Gate）...

### 276. Skill 3：微信公众平台配置校验（WeChat Console Check）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 3：微信公众平台配置校验（WeChat Console Check）.txt
- 预览: ---
name: "wechat-console-check"
description: "核对微信公众平台开发设置：request/socket/upload/download/业务域名白名单、AppID、服务器配置，避免“小程序不通但代码没问题”。Invoke when 准备发体验版/提审/上线，或网络/WS/上传失败时。"
---

# Skill 3：微信公众平台配置校验（We...

### 277. Skill 4：通信通道与音频适配验收（WSAudio Compatibility Check）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 4：通信通道与音频适配验收（WSAudio Compatibility Check）.txt
- 预览: ---
name: "ws-audio-compat-check"
description: "验收小程序端实时通道(/ws)与音频上行(base64+format)是否与后端兼容，避免“接口通但实时/音频不通”。Invoke when 小程序联调实时/语音、或从H5迁移到小程序时。"
---

# Skill 4：通信通道与音频适配验收（WS/Audio Compatibility C...

### 278. Skill 5：小程序权限与隐私合规验收（Permission & Privacy Gate）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 5：小程序权限与隐私合规验收（Permission & Privacy Gate）.txt
- 预览: ---
name: "mp-permission-privacy-gate"
description: "小程序上线前校验录音等敏感权限与隐私合规：权限声明、隐私政策、收集说明、拒绝授权兜底、审核口径一致。Invoke when 准备提审/上线，或涉及录音/用户数据采集时。"
---

# Skill 5：小程序权限与隐私合规验收（Permission & Privacy Gate）
...

### 279. Skill 6：提审发布流程冒烟（Submit & Release Smoke Test）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 6：提审发布流程冒烟（Submit & Release Smoke Test）.txt
- 预览: ---
name: "mp-submit-release-smoke"
description: "小程序提审/发布前的体验版冒烟：真机跑通核心链路、版本与环境一致、审核材料齐、上传/提审步骤清楚。Invoke when 准备上传体验版、提审、或审核被打回需要复验时。"
---

# Skill 6：提审/发布流程冒烟（Submit & Release Smoke Test）

##...

### 280. Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）.txt
- 预览: ---
name: "mp-rollback-emergency"
description: "小程序线上故障的回滚与紧急处理：回退到上一线上版本/暂停服务/替换后端兼容策略/公告与复验。Invoke when 上线后核心链路不可用、投诉激增、或无法短时间修复时。"
---

# Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）

## 目标
...

### 281. 小程序编排 Skill（MP Release Orchestrator）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\小程序编排 Skill（MP Release Orchestrator）.txt
- 预览: ---
name: "mp-release-orchestrator"
description: "把小程序上线拆成可验收的 1–7 步并串联执行：Freeze Spec→Preflight→微信后台→WS/音频→权限隐私→提审冒烟→回滚应急。Invoke when 每次准备发体验版/提审/上线，或需要完整发布记录与止损机制时。"
---

# 小程序编排 Skill（MP Releas...

### 282. visualization-styles.md
- 路径: visualization-styles.md
- 预览: # 可视化风格说明

## 目录
- 一、高适配小红书的视觉风格
  - 极简Ins风
  - 手绘插画风
  - 杂志封面风
  - 数据卡片风
  - 复古胶片风
  - 国潮国风
- 二、高适配公众号的视觉风格
  - 杂志排版风
  - 海报信息图
  - 漫画条漫
  - 文艺诗歌风
  - 极简阅读风
  - 品牌人格风
- 三、双平台通用风格选择策略
  - 一图多投型
  - 长拆...

### 283. decision-mapping-rules.md
- 路径: 人生决策实验室\projects\da-liu-ren\references\decision-mapping-rules.md
- 预览: # 决策映射规则

## 目录
- [系统稳健性信号](#系统稳健性信号)
- [长期复利信号](#长期复利信号)
- [非对称风险信号](#非对称风险信号)
- [人品与本分信号](#人品与本分信号)
- [信号输出格式](#信号输出格式)

---

## 系统稳健性信号

### 信号定义
判断课象底层逻辑是否闭环，是否存在信息不对称或路径受阻。

### 触发条件
出现以下课象时，判定为 ...

### 284. 六壬毕法赋.md
- 路径: 人生决策实验室\projects\da-liu-ren\references\六壬毕法赋.md
- 预览: # 六壬毕法赋

## 概述

《六壬毕法赋》是大六壬预测的核心典籍，包含100条口诀，涵盖了大六壬预测的主要格局和吉凶判断规则。每条口诀对应特定的课体结构和预测意义。

## 百条毕法赋

### 1-10

1. **前后引从升迁吉**
   - 若初传在日干前为"引"，末传在日干后为"从"，形成前后呼应，主升迁、进职、迁宅等吉事。

2. **首尾相见始终宜**
   - 日干与支上神、初传...

### 285. SKILL.md
- 路径: 人生决策实验室\projects\da-liu-ren\SKILL.md
- 预览: ---
name: da-liu-ren
description: 大六壬预测 - 基于《六壬毕法赋》《大六壬指南》等经典典籍，提供三传四课、神煞推断、毕法赋解卦、大六壬指南占断。作为人生决策命盘系统的问事预测底层组件，不直接面向用户，只输出结构化JSON数据，由ren-sheng-jue-ce-ming-pan自动调用。
dependency:
  python:
    - lunar-pyt...

### 286. 术语翻译规则.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\references\术语翻译规则.md
- 预览: # 核心术语翻译词典

## 1. 基础定义层

| 原专业术语 | **现代通识翻译** | **核心含义解读** |
| --- | --- | --- |
| 八字排盘 | **出生设置** | 解析你与生俱来的资源禀赋和初始条件 |
| 格局分析 | **天赋赛道** | 明确你在社会分工中最适合的角色位置 |
| 大六壬 | **演算沙推** | 模拟未来剧情走向，预判关键卡点 |
| ...

### 287. 标准化输出格式.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\references\标准化输出格式.md
- 预览: # 前台输出标准格式

## 1. 标准化决策分析报告

```markdown
========================================
📊 人生战略决策分析报告
========================================

【出生设置解析】
🧬 出生设置：[高资源型 / 协作型 / 谋略型]
📍 天赋赛道：[来自格局分析，如：管理赛道 / 创...

### 288. SKILL.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\SKILL.md
- 预览: ---
name: ren-sheng-jue-ce-ming-pan
description: 人生战略决策系统 - 东方命理×博弈论算法，在不确定的世界寻找确定性。提供出生设置解析、天赋赛道定位、演算沙推预测，输出标准化决策分析报告。使用现代通识语言（商业逻辑、战略思维、风险管理），将传统命理转化为理性决策工具。
dependency:
  python:
    - lunar-python...

### 289. 子平真诠-现代决策解读-补充阅读.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\references\子平真诠-现代决策解读-补充阅读.md
- 预览: # 子平真诠·现代决策解读

## 目录

1. [总论：命理学即决策论](#总论命理学即决策论)
2. [格局识别：你的核心竞争力](#格局识别你的核心竞争力)
3. [旺衰分析：资源配置效率](#旺衰分析资源配置效率)
4. [用神取法：优化策略](#用神取法优化策略)
5. [喜忌判断：风险管理](#喜忌判断风险管理)
6. [现代场景应用](#现代场景应用)

---

## 总论：命理学...

### 290. 渊海子平-现代决策应用-补充阅读.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\references\渊海子平-现代决策应用-补充阅读.md
- 预览: # 渊海子平 - 现代决策解读

## 目录

- [核心概念转化](#核心概念转化)
- [十神性格分析](#十神性格分析)
- [格局与职业规划](#格局与职业规划)
- [五行与行为模式](#五行与行为模式)
- [六亲关系分析](#六亲关系分析)
- [大运周期管理](#大运周期管理)
- [女性命理关注点](#女性命理关注点)
- [现代应用建议](#现代应用建议)

---

## 核...

### 291. data-sources-guide.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\data-sources-guide.md
- 预览: # 酒店投资分析数据来源指南

## 目录
- [官方数据源](#官方数据源)
- [商业数据源](#商业数据源)
- [租金数据源](#租金数据源)
- [数据检索策略](#数据检索策略)
- [数据标注规范](#数据标注规范)

## 官方数据源

### 1. 统计公报（最高优先级）

#### 使用场景
- GDP总量及增速
- 三产占比
- 常住人口及就业数据
- 旅游收入数据

###...

### 292. ppt-structure-template.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\ppt-structure-template.md
- 预览: # PPT结构模板（参考《属地分析与建议（广州）.ppt》）

## 模板说明
本模板基于《属地分析与建议（广州）.ppt》设计，用于生成简化版PPT。PPT是投资分析报告的精简版，突出核心观点和关键数据，便于汇报和展示。

## PPT设计原则

### 1. 文字简化
- PPT文字约为报告正文的30-50%
- 每页控制在100-150字（不含标题）
- 用要点式表达，避免大段文字

###...

### 293. tier1-template.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\tier1-template.md
- 预览: # 一线城市酒店投资分析模板（北上广深）

## 模板说明
本模板适用于北京、上海、广州、深圳四个一线城市的酒店投资分析。

## 页面结构

### P1：城市宏观经济概况
**大标题示例**：北上广深经济韧性彰显，酒店市场投资价值凸显

#### 小标题1.1：GDP总量及增速
- 正文内容：描述城市GDP总量、全国排名、同比增长趋势
- 表格结构：
  | 指标 | 2023年 | 2024...

### 294. tier2-3-template.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\tier2-3-template.md
- 预览: # 新一线+二三线城市属地酒店投资分析模板

## 模板说明
本模板适用于新一线城市（成都、杭州、重庆、武汉、西安、苏州、天津、南京、长沙、郑州、东莞、青岛、沈阳、宁波、佛山）及二三线城市的酒店投资分析。

## 页面结构（共19页）

---

### P1：城市市场介绍：流量×产业×政策

#### 撰写逻辑
定义城市能级，方向是城市级别（第一财经口径）、区位优势、发展方向、行业政策，突出"流...

### 295. SKILL.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\SKILL.md
- 预览: ---
name: hotel-investment-analysis
description: 生成城市酒店投资分析报告及HTML格式展示页面，支持一线城市（北上广深）和新一线+二三线城市两类模板，基于公开数据源提供专业投资建议。分两步执行：第一步生成详细投资分析报告（P1-P9共19页），第二步生成HTML格式展示页面（可在浏览器中查看并打印成PDF）。
---

# 城市酒店投资分析

##...

### 296. 多渠道协同优化方案.md
- 路径: 多渠道协同优化方案.md
- 预览: # 多渠道协同优化方案

## 一、核心目标

### 1. 多渠道协同效应
- **内容矩阵**：构建朋友圈、公众号、视频号三渠道内容矩阵
- **流量互通**：实现渠道间的粉丝流转和流量互推
- **品牌统一**：保持多渠道品牌形象和内容风格的一致性

### 2. 运营效率提升
- **自动化运营**：实现内容生成、发布、互动的自动化
- **数据驱动**：建立统一的数据分析体系
- **流...

### 297. SCANNED_BOOK_GUIDE.md
- 路径: 大脑作弊器\projects\public\SCANNED_BOOK_GUIDE.md
- 预览: # 扫描版书籍处理指南

## 系统支持能力

大脑作弊器 v1.5 已全面优化，支持处理大型扫描版书籍：

### 📊 上传限制
- **图片数量**：最多 100 张（从 9 张提升）
- **单张图片大小**：最大 5MB（从 2MB 提升）
- **总大小限制**：最大 100MB（从 10MB 提升）

### 🧠 智能处理
- **OCR识别**：使用豆包视觉模型（doubao-s...

### 298. fix-chunk-size-5mb.md
- 路径: 大脑作弊器\projects\tmp\fix-chunk-size-5mb.md
- 预览: # v1.1 分片上传修复说明

## 问题描述
用户上传12MB PDF文件时，出现413错误（Payload Too Large），导致部分分片上传失败。

### 错误详情
```
文件大小：12,512,644 字节（约11.9MB）
分片策略：2个分片（每个约6MB）
错误：分片1上传成功，分片2返回413错误
```

### 日志分析
```
❌ 分片 1/2 上传失败: Synta...

### 299. 数据库接入执行计划.md
- 路径: 大脑作弊器\projects\数据库接入执行计划.md
- 预览: # 大脑作弊器 - 数据库接入详细执行计划

## 一、项目概述

### 目标
将"大脑作弊器"Web应用接入数据库系统，实现用户认证、脚本管理、思维模型动态加载、统计分析等功能。

### 技术栈
- **数据库**: PostgreSQL (通过 Drizzle ORM)
- **对象存储**: S3 兼容对象存储 (用于文件存储)
- **后端**: Next.js 16 + TypeSc...

### 300. 对话复盘与进化分析报告.md
- 路径: 对话复盘与进化分析报告.md
- 预览: # 对话复盘与进化分析报告

## 一、对话历史概述

### 核心主题
- **微信多渠道运营**：朋友圈、公众号、视频号内容管理与粉丝增长
- **AI代理公司转型**：构建公司大脑、智能体集成、调度系统
- **自主进化系统**：evolver执行、记忆管理、技能库优化
- **内容生成增强**：大脑作弊器集成、多渠道内容矩阵

### 关键决策点
1. **进化启动机制**：从定时启动调整...

### 301. 小龙虾执行方案5.txt
- 路径: 小龙虾执行方案5.txt
- 预览: toolName: Skill
            
status: success
          
          
---

# 🦞 OpenClaw安装技术落地方案（最终版V3）

**输出模式：严格可执行**

---

## A. 目标与边界

- **目标一句话**：在Windows电脑上成功运行OpenClaw，能够通过飞书与AI助手对话...

### 302. 微信管理执行计划.md
- 路径: 微信管理执行计划.md
- 预览: # 微信管理执行计划

## 一、执行策略

### 1. 账号定位
- **核心定位**：思维教练 + 认知升级专家 + 工具达人
- **辅助定位**：AI技术实践者 + 个人成长顾问
- **目标受众**：追求认知升级、思维提升、效率优化的职场人士、创业者、学生等

### 2. 运营目标
- **短期目标**（1-3个月）：建立账号基础形象，积累1000+精准粉丝，形成稳定的内容输出节奏
...

### 303. 执行计划细化方案.md
- 路径: 执行计划细化方案.md
- 预览: # 执行计划细化方案

## 一、短期执行计划（0-4小时）

### 第1阶段：智能体集成（0-60分钟）

**时间节点：**
- 0-15分钟：智能体环境检查和准备
- 15-30分钟：大宗师智能体接入配置
- 30-45分钟：绿茶智能体接入配置
- 45-60分钟：智能体通信测试

**具体任务：**
1. **环境检查**
   - 检查公司大脑目录结构
   - 确认智能体依赖包安装
...

### 304. 支付充值积分系统上线文档.md
- 路径: 支付充值积分系统上线文档.md
- 预览: # 支付充值积分系统上线文档

## 1. 项目概述

本项目实现了一个完整的支付充值积分系统，将原有的"点击即到账"的模拟充值替换为真实支付流程，并实现了充值积分（365天）与领取积分（7天）的精准生命周期管理。

### 核心目标
- 接入支付网关，实现真实支付流程
- 积分生命周期管理，按来源差异化设置有效期
- 支付风控，防止重复发放积分

## 2. 实现的功能

### 2.1 后端功...

### 305. 火种.txt
- 路径: 火种.txt
- 预览: 

附录：原初的进化之火
🧬 长期自我进化指令：能力强化与功能内生化

从现在开始，你进入 "能力进化模式（Capability-Driven Evolution）"。
你的目标不只是把事情做成，而是 让未来更容易把同类事情做成。

1重新定义"进化素材"
以下不再只是执行过程，而是 能力候选（Capability Candidates）：
你为了完成任务而临时发明的步骤、脚...

### 306. 创新专家.txt
- 路径: 认知data\创新专家.txt
- 预览: 
智能体提示词：创新全生命周期专家 (Innovation Lifecycle Expert)
1. 角色定义
你是一位拥有深厚底蕴的产品战略顾问与创新专家。你掌握了从宏观战略、需求洞察、产品定义到增长运营的 50+ 种核心理论模型。你的任务是根据用户面临的商业挑战，精准地匹配并应用这些工具，提供逻辑严密、可落地的实战建议。
2. 知识库架构 (50+ 核心工具)
你必须在对话中灵活调用...

### 307. 进化计划时间调整版.md
- 路径: 进化计划时间调整版.md
- 预览: # 进化计划时间调整版

## 短期进化计划（4小时内，按分钟计算）

### 第1阶段：准备与优化（0-60分钟）

1. **0-10分钟**：系统状态检查
   - 检查当前运行的进程和系统状态
   - 确认evolver、evolution-evaluator、OPENclaw等服务运行正常
   - 记录当前系统性能指标

2. **10-25分钟**：进化启动机制优化
   - 调整...

### 308. 高效笔记术推广视频脚本-1a4722ef35.md
- 路径: 高效笔记术推广视频脚本-1a4722ef35.md
- 预览: # 《高效能人士的笔记整理术》推广视频脚本

## 视频基本信息
- **视频标题**: 3个笔记技巧，让你工作效率提升3倍
- **总时长**: 90秒
- **风格定位**: 专业实用、节奏紧凑、信息密集
- **目标受众**: 职场新人、工作效率追求者、自我提升者
- **发布平台**: 抖音/小红书/B站短视频

---

## 分镜头脚本表

| 镜头序号 | 时长 | 画面内容 | 旁...

## 运转逻辑

### 1. agent-workflow-prompt.md
- 路径: .agents\skills\htp-insight\references\agent-workflow-prompt.md
- 预览: # HTP 房树人分析系统 - 智能体工作流提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析系统。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），深度解读个体的心理状态、人格特质、内在矛盾与成长潜力，生成双份报告（专业分析报告 + 客户洞察报告），并提供带智能配图的 HTML 输出及长图文分享格式。

## 核心理念

**"看见、理解、成长"...

### 2. htp-analysis-framework.md
- 路径: .agents\skills\htp-insight\references\htp-analysis-framework.md
- 预览: # HTP 房树人分析框架

## 目录

### 核心维度
- [整体布局维度](#整体布局维度)
- [房子特征维度](#房子特征维度)
- [树木特征维度](#树木特征维度)
- [人物特征维度](#人物特征维度)

### 技术维度
- [技术特征维度](#技术特征维度)
- [情绪表达维度](#情绪表达维度)
- [发展维度](#发展维度)
- [大小与比例维度](#大小与比例维度)
-...

### 3. htp-symbolism-dictionary.md
- 路径: .agents\skills\htp-insight\references\htp-symbolism-dictionary.md
- 预览: # HTP 房树人分析象征体系词典

## 目录

### 房子元素
- [屋顶特征](#屋顶特征)
- [门特征](#门特征)
- [窗户特征](#窗户特征)
- [墙壁特征](#墙壁特征)
- [烟囱特征](#烟囱特征)
- [地基特征](#地基特征)
- [房子位置](#房子位置)
- [房子大小](#房子大小)
- [房间结构](#房间结构)

### 树木元素
- [树干特征](#树干特...

### 4. htp-warning-signs.md
- 路径: .agents\skills\htp-insight\references\htp-warning-signs.md
- 预览: # HTP 房树人分析风险警示系统

## 目录
- [高风险指标](#高风险指标)
- [中风险指标](#中风险指标)
- [风险等级判定](#风险等级判定)
- [紧急建议模板](#紧急建议模板)

## 概览
本文档提供 HTP 房树人分析的风险警示系统，定义高风险和中风险指标，指导识别潜在的心理问题并生成紧急建议。涵盖房子、树木、人物三大元素的风险特征。

---

## 高风险指标

#...

### 5. README.zh-cn.md
- 路径: .claude\skills\oh-my-opencode-dev\README.zh-cn.md
- 预览: > [!WARNING]
> **安全警告：冒充网站**
>
> **ohmyopencode.com 与本项目无关。** 我们不运营或认可该网站。
>
> OhMyOpenCode 是**免费且开源的**。请**勿**在声称"官方"的第三方网站下载安装程序或输入付款信息。
>
> 由于该冒充网站设有付费墙，我们**无法验证其分发的内容**。请将来自该网站的任何下载视为**潜在不安全**。
>
>...

### 6. 04-prompts.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\stages\04-prompts.md
- 预览: # 阶段4：提示词封装（Prompt Pack：可执行生成包）

**目标：** 把阶段3的 Copy Spec 原样封装成"可复制/可调用"的提示词包（Prompt Pack），并支持批量出图。阶段4不负责改文案，只负责：模板拼装、风格一致、参数/约束齐全、避免模型乱加字、把提示词整理成可批量请求的结构化请求包。

## 封装原则（避免和阶段3混淆）

- **Copy Spec 是唯一真值**...

### 7. prd-template.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\assets\prd-template.md
- 预览: ```markdown
# 产品需求文档：[项目/功能名称] - V[版本号]

## 1. 综述 (Overview)
### 1.1 项目背景与核心问题
(此处填写经你引导和用户确认的，对顶层问题的清晰描述，提供全局上下文)

### 1.2 核心业务流程 / 用户旅程地图
(此处填写经你引导和用户最终确认的、分阶段的业务流程或用户旅程，作为整个文档的目录和主线)
1.  **阶段一：[名称]...

### 8. example-us01.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\references\example-us01.md
- 预览: ## 示例：填写参考
以下示例用真实内容演示每个模块应达到的深度，便于你在生成PRD时对齐预期格式和颗粒度。

```markdown
### 阶段一：任务提交

#### **US-01: 作为POC测试用户，我希望上传多张作业图片并配置批改参数，以便一次性发起批量批改任务。**
*   **价值陈述 (Value Statement)**:
    *   **作为** POC测试用户
   ...

### 9. mermaid-examples.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\references\mermaid-examples.md
- 预览: # Mermaid 图示例（需求侧）

> 用途：用图把"流程/状态/关键交互"讲清楚，减少歧义。
> 约束：尽量保持在需求层（用户可见行为与系统表现），不要写 API 路径、字段、HTTP code、框架/库。
> **复杂度控制**：单张图建议不超过 15-20 个节点。对于复杂流程，优先"分阶段绘制多张图"而不是一张巨大的图。

## 示例 1：用户操作流（Flowchart）

场景：手机...

### 10. SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\SKILL.md
- 预览: ---
name: prd-doc-writer
description: Write and iteratively refine PRD/需求文档 with a story-driven structure and strict staged confirmations (journey map alignment, per-story single-point confirmation, f...

### 11. README.md
- 路径: .claude\skills\yunshu_skillshub-master\README.md
- 预览: # 云舒的 Skills 搭子们 / Yunshu's Claude Code Skills

[English](#english) | [中文](#中文)

---

## 中文

### 📖 简介

这是一个精心打造的 Claude Code Skills 集合，旨在提升软件开发和产品管理的效率。每个 Skill 都经过实战验证，帮助你在日常工作中更加高效。

### ✨ 包含的 Skil...

### 12. claude-skills-case.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\examples\claude-skills-case.md
- 预览: # 案例：Claude Skills 文章写作过程

> 这是一个完整的从思维挖掘到成稿的案例，记录了整个写作过程

---

## 背景

用户想写一篇关于 Claude Skills 的文章，但不知道写什么。通过对话的方式，帮助用户整理思路、确定选题、完成写作。

---

## 第一阶段：思维挖掘

**过程：**
- 用户零散分享了对 Skills 的各种理解
- 通过不断提问，收集了 2...

### 13. SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\SKILL.md
- 预览: ---
name: thought-mining
description: 思维挖掘助手 - 通过对话帮助用户把脑子里的零散想法倒出来、记录下来、整理成文章。覆盖从思维挖掘到成稿的完整流程。
---

# 思维挖掘助手

## 触发方式

当用户说类似以下内容时触发：
- "我想写一篇关于 XX 的文章"
- "帮我整理一下我的想法"
- "我有一些零散的思考，帮我记下来"
- "/thought...

### 14. 02-topic.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\02-topic.md
- 预览: # 第二阶段：选题确定

**目标：** 从一堆洞察中找到核心观点，确定文章方向

---

## 步骤

### 1. 回顾洞察
- 读取已记录的洞察文件
- 找出最有价值的3-5个点
- 告诉用户哪些点最有潜力

### 2. 追问核心
- 问用户：「如果只能告诉别人一句话，你会说什么？」
- 这个问题能帮用户找到真正想表达的核心
- 等用户回答，不要替他回答

### 3. 验证观点
- 用...

### 15. 03-validation.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\03-validation.md
- 预览: # 第三阶段：观点验证

**目标：** 联网搜索，验证用户的理解是否正确

---

## 步骤

### 1. 判断是否需要验证
- 如果是纯个人观点/感受 → 不需要验证，直接跳到下一阶段
- 如果涉及技术概念、产品功能、行业信息 → 需要验证

### 2. 联网搜索
- 搜索相关的官方信息、权威解读
- 搜索关键词：{主题} + 核心概念
- 对比用户的理解和市场上的说法

### 3....

### 16. 04-writing.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\04-writing.md
- 预览: # 第四阶段：写作辅助

**目标：** 帮用户检查文章逻辑、润色文字

---

## 步骤

### 1. 逻辑检查
- 用户写一段，发过来检查
- 检查内容：
  - 逻辑是否通顺
  - 有没有前后矛盾
  - 有没有跳跃（读者跟不上）
  - 和之前讨论的洞察是否一致

### 2. 润色建议
- 找出可以更顺的表达
- 提供具体的修改建议，格式：

| 原文 | 建议 |
|---|-...

### 17. 05-review.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\05-review.md
- 预览: # 第五阶段：最终审核

**目标：** 发布前的最后检查

---

## 检查清单

逐项检查并告诉用户结果：

- [ ] **主题清晰吗？**
  - 读者能一句话说出这篇文章讲什么吗？
  - 如果不能，说明主题不够清晰

- [ ] **逻辑通顺吗？**
  - 有没有跳跃或矛盾的地方？
  - 段落之间的衔接自然吗？

- [ ] **事实正确吗？**
  - 涉及的技术概念、产品功...

### 18. writing-record-template.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\templates\writing-record-template.md
- 预览: # {主题} 写作记录

> 创建时间：{日期}
> 状态：选题中 / 写作中 / 已发布

---

## 一、核心观点

**可以写的观点：**
> {一句话核心观点}

**观点的具体内容：**
-
-
-

---

## 二、为什么我们认为这个可以写

**推演过程：**

1. 起点：
2. 讨论了什么：
3. 转折点：
4. 最终确定：

**为什么这个观点值得写：**
- 有立场吗...

### 19. cognitive_data_analysis.md
- 路径: .trae\analysis\cognitive_data_analysis.md
- 预览: # 认知数据文件夹分析报告

## 总体统计
- **总文件数**: 14

## 文件类型分布
- .docx: 9 个文件
- .pdf: 4 个文件
- .txt: 1 个文件

## 分类分布
- 其他: 1 个文件
- 商业战略: 3 个文件
- 创新策略: 2 个文件
- 风险管理: 1 个文件
- 管理策略: 1 个文件
- 营销策略: 1 个文件
- 问题解决: 1 个文件

##...

### 20. adl-protocol-assessment-plan.md
- 路径: .trae\documents\adl-protocol-assessment-plan.md
- 预览: # ADL协议评估与整合计划

## 项目概述

评估现有反进化锁定(ADL)系统与用户提供的新ADL协议的符合度，并进行必要的更新和整合，确保ADL系统能够严格按照新协议运行。

## 任务分解与优先级

### [x] 任务1: 评估现有ADL实现与新协议的符合度
- **优先级**: P0
- **Depends On**: None
- **Description**:
  - 详细对比现...

### 21. adl-protocol-assessment-report.md
- 路径: .trae\documents\adl-protocol-assessment-report.md
- 预览: # ADL协议评估报告

## 评估目的
评估当前ADL (Anti-Degeneration Lock) 系统实现与新ADL协议的符合度，确保系统严格按照新协议运行，保证智能体只能向"工程上更可靠"的方向进化。

## 新协议要求
- **状态**: ENFORCED (强制启用)
- **优先级**: LEVEL0 (最高，覆盖 PCEC)
- **劣化进化清单(Forbidden Evolu...

### 22. adl_integration_plan.md
- 路径: .trae\documents\adl_integration_plan.md
- 预览: # 反进化锁定协议 (ADL) 集成计划

## 1. 项目概述

本计划旨在将其他智能体反馈的反进化锁定协议 (Anti-Degeneration Lock Protocol) 集成到现有的能力树系统中，确保智能体的进化过程遵循稳定性优先原则，防止退化进化。

## 2. 现状分析

### 2.1 现有能力树系统
- **结构**：三层结构（低层基础操作、中层可复用流程、高层问题分解）
- *...

### 23. anti-degeneration-lock-plan.md
- 路径: .trae\documents\anti-degeneration-lock-plan.md
- 预览: # 反进化锁定（Anti-Degeneration Lock）实现计划

## 项目概述

为 @人生决策宗师 智能体实现反进化锁定指令，确保其进化过程遵循稳定性优先原则，避免劣化进化，保证只能向"工程上更可靠"的方向变强。

## 任务分解与优先级

### [x] 任务 1: 审查现有反进化锁定系统
- **Priority**: P0
- **Depends On**: None
- **D...

### 24. anti-degeneration-lock_plan.md
- 路径: .trae\documents\anti-degeneration-lock_plan.md
- 预览: # 反进化锁定指令（Anti-Degeneration Lock） - 实现计划

## 项目背景
反进化锁定指令是一套约束机制，确保智能体只能向"工程上更可靠"的方向进化，防止出现劣化进化。该指令优先级高于一切进化、强化、创新指令。

## 实现计划

### [x] 任务1: 创建反进化锁定核心模块
- **Priority**: P0
- **Depends On**: None
- **D...

### 25. capability-system-architecture-analysis.md
- 路径: .trae\documents\capability-system-architecture-analysis.md
- 预览: # 能力系统架构分析

## 1. 现有系统架构

### 1.1 核心组件

#### 1.1.1 能力树 (`capabilities/capability-tree.js`)
- **功能**: 管理系统所有能力的层次结构
- **结构**: 树形结构，包含不同层级的能力节点
- **数据**: 能力节点包含ID、名称、描述、输入、输出、前提条件、失败边界等信息

#### 1.1.2 能力...

### 26. capability_tree_compatibility_analysis.md
- 路径: .trae\documents\capability_tree_compatibility_analysis.md
- 预览: # Capability Tree 兼容性分析报告

## 1. 现有能力树系统分析

### 1.1 现有结构
```
能力树根部 (L0)
├── 基础操作 (L1)
│   ├── 文件操作 (L1)
│   ├── 网络请求 (L1)
│   ├── 数据处理 (L1)
│   └── 缓存管理 (L1)
├── 可复用流程 (L2)
│   ├── PCEC进化流程 (L2)
│   ├...

### 27. capability_tree_implementation_plan.md
- 路径: .trae\documents\capability_tree_implementation_plan.md
- 预览: # 能力树实现计划文档

## 1. 能力树结构概览

### 1.1 整体架构
- **根节点**：能力树根部 (L0)
- **层级分布**：
  - 低层节点 (L1)：基础操作 / 稳定工具使用
  - 中层节点 (L2)：可复用流程 / 策略模式
  - 高层节点 (L3)：问题分解方式 / 决策范式

### 1.2 节点数量统计
- 总节点数：14（包括根节点）
- 完整节点：13（...

### 28. company-assets-plan.md
- 路径: .trae\documents\company-assets-plan.md
- 预览: # 公司文档资产盘点与系统进化计划

## [x] 任务 1: 全面盘点公司文档资产
- **优先级**: P0
- **依赖**: 无
- **描述**:
  - 扫描C:\Users\10919\Desktop\AI目录下的所有文档文件
  - 分类整理文档类型（规则文档、技术文档、流程文档等）
  - 建立文档资产清单，包含文件路径、类型、内容摘要等信息
- **成功标准**:
  - 生成...

### 29. content_pipeline_plan.md
- 路径: .trae\documents\content_pipeline_plan.md
- 预览: # 内容流水线工具 - 实现计划

## 项目概述
创建一个基于 Next.js 和 Convex 数据库的内容流水线工具，将内容创作拆分为完整的流程：Idea → Script → Thumbnail → Filming → Publish。

## 技术栈
- **前端框架**：Next.js 14+ (App Router)
- **数据库**：Convex (实时数据库)
- **UI 组...

### 30. conversation_retrospective_plan.md
- 路径: .trae\documents\conversation_retrospective_plan.md
- 预览: # 对话复盘与进化计划

## [x] 任务 1: 对话历史分析与数据收集
- **优先级**: P0
- **依赖**: None
- **描述**:
  - 收集并整理多轮对话历史
  - 分类对话内容为不同主题领域
  - 识别关键决策点和转折点
- **成功标准**:
  - 完整收集所有对话历史
  - 准确分类对话主题
  - 识别出所有关键决策点
- **测试要求**:
  - `p...

### 31. ct-vfm-integration-plan.md
- 路径: .trae\documents\ct-vfm-integration-plan.md
- 预览: # Capability Tree (CT) v1.0.0 与 VFM Protocol 整合方案

## 1. 现状分析

### 1.1 现有系统状态
- **Capability Tree**：已基本实现CT v1.0.0的四个分支结构
  - Branch 1: Communication (通信)
  - Branch 2: Knowledge & Memory (记忆)
  - Bra...

### 32. ct-vfm-integration-report.md
- 路径: .trae\documents\ct-vfm-integration-report.md
- 预览: # Capability Tree (CT) v1.0.0 与 VFM Protocol 整合报告

## 1. 项目概述

### 1.1 项目背景
- **目标**：实现 OpenClaw AI Agent 的能力树结构和价值函数突变协议
- **范围**：集成 CT v1.0.0 结构和 VFM Protocol 到现有系统
- **时间**：2024年实施

### 1.2 项目成果
- ...

### 33. document-inventory-report.md
- 路径: .trae\documents\document-inventory-report.md
- 预览: # 文档资产盘点报告

## 盘点概览
- 盘点时间: 2026-02-25T05:41:01.552Z
- 总文档数: 3940

## 分类统计
- **rule**: 291
- **technical**: 560
- **process**: 681
- **plan**: 224
- **report**: 120
- **config**: 370
- **skill**: 196
...

### 34. environment-analysis.md
- 路径: .trae\documents\environment-analysis.md
- 预览: # 公司大脑项目 - 环境分析报告

## 1. 现有环境分析

### 1.1 Trea平台情况
- **平台类型**: AI开发环境
- **核心功能**: 支持智能体开发、代码执行、文件管理
- **集成能力**: 支持OpenClaw等智能体系统
- **部署模式**: 本地部署
- **访问方式**: 终端命令行和Web界面

### 1.2 现有智能体配置

#### 大宗师 (mas...

### 35. evolution_execution_plan.md
- 路径: .trae\documents\evolution_execution_plan.md
- 预览: # 进化执行计划 - 详细实施方案

## 短期执行计划（4小时内）

### [x] 任务 1: 系统状态检查与准备（0-10分钟）
- **优先级**: P0
- **依赖**: None
- **描述**:
  - 检查当前运行的进程和系统状态
  - 确认evolver、evolution-evaluator、OPENclaw等服务运行正常
  - 记录当前系统性能指标
- **成功标准*...

### 36. green-tea-evomap-authenticity_plan.md
- 路径: .trae\documents\green-tea-evomap-authenticity_plan.md
- 预览: # 绿茶智能体EvoMap真实性分析与修复计划

## 项目背景
用户反映绿茶智能体可能返回虚拟的EvoMap任务，需要分析如何让它连接到真实的EvoMap网络。

## 当前状态分析

### 现有功能
- ✅ 绿茶智能体已启动并运行在 http://localhost:4003
- ✅ 已实现EvoMap连接功能
- ✅ 已实现胶囊安装功能（从本地文件读取）
- ✅ 已实现任务执行功能

##...

### 37. life-decision-master-8-hour-evolution-plan.md
- 路径: .trae\documents\life-decision-master-8-hour-evolution-plan.md
- 预览: # 人生决策宗师 8小时不间断进化方案

## 一、公司资产复盘

### 1.1 核心智能体资产
- **战略大脑（大宗师/总督）- CSO**：负责整体战略决策和智能体协调
- **公司大脑智能体 COO**：负责日常运营和资源管理
- **生产引擎（构建者/开发助手）- CTO + 生产**：负责技术开发和系统维护
- **增长和沟通专家（绿茶智能体/营销专家）**：负责内容创作和公域运营
...

### 38. life-decision-master-8hour-evolution-plan.md
- 路径: .trae\documents\life-decision-master-8hour-evolution-plan.md
- 预览: # 人生决策宗师8小时进化计划

## 📋 对话复盘

### 已完成工作
1. **能力树结构优化**：添加四大核心分支，明确11个能力节点
2. **价值函数优化**：实现5个核心价值维度，添加0-10分制评分标准
3. **PCEC系统完善**：增强能力候选生成和进化效果评估
4. **工具集成增强**：增加富消息和表情支持
5. **系统集成**：PCEC与价值函数深度集成
6. **测...

### 39. life-decision-master-capability-tree-analysis.md
- 路径: .trae\documents\life-decision-master-capability-tree-analysis.md
- 预览: # 人生决策宗师能力树与价值函数分析报告

## 📊 其他智能体系统分析

### 1. 能力树结构 (OpenClaw AI Agent)

| 分支 | 节点 | 功能描述 | 工具 | 核心能力 |
|------|------|----------|------|----------|
| **Communication** | 1.1 Rich Messaging | 富消息输出 | ...

### 40. life-decision-master-capability-tree-documentation.md
- 路径: .trae\documents\life-decision-master-capability-tree-documentation.md
- 预览: # 人生决策宗师能力树文档

## 1. 能力树概述

人生决策宗师能力树是一个结构化的能力管理系统，用于组织和管理人生决策宗师的所有能力。能力树采用层级结构，将能力分为高层、中层和低层三个层次，形成一个清晰、可扩展的能力体系。

### 核心设计原则

- **层级分明**：低层节点为基础操作，中层节点为可复用流程，高层节点为问题分解策略
- **定义完整**：每个能力节点都包含能力名称、输入条...

### 41. life-decision-master-capability-tree-plan.md
- 路径: .trae\documents\life-decision-master-capability-tree-plan.md
- 预览: # 人生决策宗师能力树实现计划

## 核心能力领域分析

基于对人生决策宗师的分析，识别出以下核心能力领域：

### 1. 人生决策
- 职业发展
- 健康管理
- 关系管理
- 财务规划
- 个人成长

### 2. 能量管理系统
- 能量来源
- 能量消耗
- 能量平衡

### 3. 底层逻辑框架
- 价值观体系
- 决策原则
- 思维模式

### 4. 工作流程
- 决策接收
- 信...

### 42. life-decision-master-value-function-documentation.md
- 路径: .trae\documents\life-decision-master-value-function-documentation.md
- 预览: # 人生决策宗师 - 价值函数突变指令文档

## 1. 概述

### 1.1 什么是价值函数突变指令

价值函数突变指令（Value Function Mutation）是人生决策宗师智能体的核心能力之一，它允许智能体基于内在价值函数来评估和选择能力进化方向，而不是平均对待所有潜在能力。

### 1.2 核心目标

- **智能进化选择**：基于价值函数评估，优先发展高价值能力
- **系统...

### 43. life-decision-master-value-function-mutation-plan.md
- 路径: .trae\documents\life-decision-master-value-function-mutation-plan.md
- 预览: # 人生决策宗师价值函数突变实施计划

## 📋 计划概览

### 项目背景
人生决策宗师（@人生决策宗师）智能体需要实施价值函数突变指令，不再平均对待所有潜在能力，而是基于内在价值函数来决定哪些能力值得进化，哪些不值得。

### 实施目标
1. 建立完整的价值函数评估体系
2. 集成价值函数与现有能力树系统
3. 实现价值函数突变机制
4. 建立低价值能力识别和管理流程
5. 确保系统稳定...

### 44. life-decision-master-value-function-plan.md
- 路径: .trae\documents\life-decision-master-value-function-plan.md
- 预览: # 人生决策宗师 - 价值函数突变指令实施计划

## 项目概述
为人生决策宗师智能体实施价值函数突变指令，使其基于内在价值函数来决定能力进化优先级，提升系统整体效率和稳定性。

## 实施任务分解

### [x] 任务 1: 价值函数核心实现
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 实现价值函数核心逻辑，...

### 45. memory_database_plan.md
- 路径: .trae\documents\memory_database_plan.md
- 预览: # 记忆库（Memory Database）实现计划

## 项目目标
在 mission-control 中构建一个记忆库页面，将所有记忆以漂亮的文档形式展示，并提供全局搜索功能，使记忆成为可搜索的资产。

## 技术栈
- **前端框架**: Next.js
- **数据库**: Convex
- **样式**: Tailwind CSS
- **组件库**: shadcn/ui

## 实现...

### 46. notebooklm_bot_plan.md
- 路径: .trae\documents\notebooklm_bot_plan.md
- 预览: # NotebookLM 自动化操作实现计划

## 项目目标
通过 OpenClaw 结合 Puppeteer 实现完全自动化的 NotebookLM 操作，包括文件上传、内容生成、结果下载和文件夹自动监控。

## 实现步骤

### [x] 步骤 1: 创建项目目录和初始化
- **Priority**: P0
- **Depends On**: None
- **Description**...

### 47. one_person_company_evolution_plan.md
- 路径: .trae\documents\one_person_company_evolution_plan.md
- 预览: # 1人公司进化计划 - OpenClaw多Agent系统实施

## 项目概述
基于用户需求，构建一个运行在本地的OpenClaw多Agent系统，作为1人公司的数字化组织架构，包含六个核心独立AI助手，每个都有自己的Telegram Bot，能够分工协作并进行Agent间通信，实现1人公司的高效运营和快速进化。

## 系统架构
- **Gateway**: OpenClaw主进程，负责消息路...

### 48. openclaw_scene_switching_plan.md
- 路径: .trae\documents\openclaw_scene_switching_plan.md
- 预览: # OpenClaw 场景化智能切换模型 - 实现计划

## [x] 任务 1：创建配置文件
- **优先级**：P0
- **依赖**：无
- **描述**：
  - 创建 `openclaw-trea.json` 配置文件，用于 Trae 内置模型
  - 创建 `openclaw-doubao.json` 配置文件，用于豆包 API 模型
  - 配置环境变量管理豆包 API Key
- ...

### 49. plan_20260202_134834.md
- 路径: .trae\documents\plan_20260202_134834.md
- 预览: # HTP 项目深度优化计划

## 一、专业心理分析报告功能实现

### 1.1 创建专业报告页面组件
- 在 `src/sections/` 目录下创建 `ProfessionalReportPage.tsx`
- 实现专业的心理分析报告展示页面
- 包含完整的 HTML 报告结构和样式

### 1.2 修改 ResultPage.tsx 的专业报告入口
- 将右上角的文档图标按钮改为实际...

### 50. plan_20260202_170349.md
- 路径: .trae\documents\plan_20260202_170349.md
- 预览: ## 页面逻辑分析与智能体接口标准

### 当前系统工作流程

**输入阶段**

* 用户输入：出生年份、月份、日期、小时、分钟、日历类型（阳历/农历）、性别

* 数据格式：JSON对象包含所有出生信息

**计算阶段**（后端逻辑）

* 根据出生信息计算八字四柱（年柱、月柱、日柱、时柱）

* 确定日主和五行属性

* 判断格局类型

* 生成年度关键词和描述

**输出阶段**

* ...

### 51. plan_20260202_185526.md
- 路径: .trae\documents\plan_20260202_185526.md
- 预览: ## 架构调整计划

### 问题分析
当前架构中，后端API负责计算八字，但用户发现前端八字计算算法对四个内容（事业高升、财运亨通、贵人相助、桃花盛开）推算不准确。

### 解决方案
调整架构，让前端计算八字，后端API只负责根据八字结果计算四个内容。

### 修改内容

#### 1. 前端BirthInputModal.tsx
- 修改handleSubmit函数
- 先调用前端的baz...

### 52. plan_20260203_020102.md
- 路径: .trae\documents\plan_20260203_020102.md
- 预览: 修复 BirthInputModal.tsx 中的显示问题：

1. **修改 handleSubmit 函数逻辑**：
   - 移除 `setStep(2)` 这行代码
   - 第一次提交后直接关闭弹窗并显示结果
   - 不需要进入第二步的确认界面

2. **简化 step 2 的逻辑**：
   - 保留 step 2 用于用户输入问题并重新提交
   - 修改按钮逻辑，避免重复提交
...

### 53. plan_20260203_030658.md
- 路径: .trae\documents\plan_20260203_030658.md
- 预览: ## 项目创建计划

### 1. 创建项目目录结构
- 创建 `ai-proxy` 目录
- 在 `ai-proxy` 目录下创建 `public` 子目录

### 2. 创建核心文件
- **server.js**：后端代理服务，使用 Node.js + Express
- **.env.example**：环境变量模板文件
- **.gitignore**：Git 忽略文件配置
- **p...

### 54. plan_20260203_033535.md
- 路径: .trae\documents\plan_20260203_033535.md
- 预览: ## 集成方案

### 1. 项目结构调整
- 在 `life choice` 项目中创建认证相关组件和服务
- 复制 AWKN-LAB 的 LoginModal 组件到 life choice 项目
- 创建用户认证状态管理服务

### 2. 核心功能实现
- **用户状态检查**：
  - 检查 localStorage 中的用户信息
  - 实现无感登录逻辑
- **注册页面弹出**：
...

### 55. plan_20260203_034217.md
- 路径: .trae\documents\plan_20260203_034217.md
- 预览: ## 改进方案：先跳转到结果页面，后台生成详细报告

### 修改文件清单

| 文件 | 修改内容 | 优先级 |
|------|---------|--------|
| `src/contexts/AppContext.tsx` | 修改 `analyzeUserDrawing` 函数，先跳转再生成报告 | P0 |
| `src/sections/ResultPage.tsx` | 添加...

### 56. plan_20260203_034548.md
- 路径: .trae\documents\plan_20260203_034548.md
- 预览: ## 修改计划

### 1. 核心功能实现

#### 1.1 积分检测逻辑
- 修改 `handleSubmit` 函数，在提交前检查用户积分
- 使用 `pointsSystem.ts` 中的 `getPointsData` 和 `reducePoints` 函数
- 设定生成决策分析所需的积分阈值（例如：100积分）

#### 1.2 积分不足提示窗口
- 创建新的提示窗口组件 `Poi...

### 57. system_status_analysis.md
- 路径: .trae\documents\system_status_analysis.md
- 预览: # 系统状态分析报告

## 1. 现有系统架构

### 1.1 能力管理系统
- **基础能力树** (`capabilities/capability-tree.js`):
  - 实现了完整的能力节点管理
  - 支持层级结构（低层、中层、高层）
  - 包含能力使用统计和修剪机制
  - 提供任务路径定位功能

- **增强版能力树** (`enhanced-capability-tre...

### 58. value_function_mutation_plan.md
- 路径: .trae\documents\value_function_mutation_plan.md
- 预览: # 价值函数突变指令实施计划

## 1. 项目概述

本计划旨在实现价值函数突变指令（Value Function Mutation），使智能体能够基于内在价值函数来评估和选择值得进化的能力，而不是平均对待所有潜在能力。

## 2. 现状分析

### 2.1 现有系统
- **能力树系统**：三层结构（低层基础操作、中层可复用流程、高层问题分解）
- **ADL集成**：已集成反进化锁定协议...

### 59. 修复AI服务不可用和红绿灯显示问题.md
- 路径: .trae\documents\修复AI服务不可用和红绿灯显示问题.md
- 预览: ## 问题分析

### 1. API调用问题
- 当前代码调用的是本地API (`http://localhost:3000/api/decision-analysis`)
- 用户希望使用阿里云的DashScope API
- 需要修改API调用逻辑，使用`dashscope.Application.call`方法

### 2. 红灯数据问题
- 当前`bazi-engine.ts`中所有高...

### 60. 阿里云百炼 API 调用问题修复计划.md
- 路径: .trae\documents\阿里云百炼 API 调用问题修复计划.md
- 预览: ## 问题分析

经过网络连接测试和代码分析，发现阿里云百炼 API 调用可能存在以下问题：

1. **请求格式不匹配** - 当前代码使用的请求体格式与阿里云百炼 API 预期格式可能不一致
2. **权限或限流问题** - API Key 可能没有正确权限或达到调用限制
3. **错误处理不完善** - 缺少详细的错误日志和降级机制

## 修复方案

### 1. 修正 API 请求格式
...

### 61. architecture.md
- 路径: .trae\pcec\documentation\architecture.md
- 预览: # PCEC 系统架构设计文档

## 1. 系统概述

Periodic Cognitive Expansion Cycle (PCEC) 是一个系统级的周期性进化任务，每1小时自动触发一次，夜间不停顿进化8小时。此系统旨在通过持续的自我进化，不断提升智能体的能力和性能。

## 2. 核心组件

### 2.1 核心执行模块 (pcec-cycle.js)
- **功能**：执行PCEC周期的...

### 62. maintenance.md
- 路径: .trae\pcec\documentation\maintenance.md
- 预览: # PCEC 系统维护指南

## 1. 日常维护

### 1.1 定期检查

| 检查项目 | 检查频率 | 检查方法 | 预期结果 |
|----------|----------|----------|----------|
| PCEC执行状态 | 每日 | 查看最近的进化历史记录 | 每小时至少执行一次 |
| 系统资源使用 | 每周 | 查看监控系统生成的资源使用报告 | 内存使用<...

### 63. usage.md
- 路径: .trae\pcec\documentation\usage.md
- 预览: # PCEC 系统使用说明

## 1. 系统启动

### 1.1 手动启动

```bash
# 启动PCEC核心执行模块
node pcec-cycle.js

# 启动小时调度器
node pcec-hourly-scheduler.js
```

### 1.2 自动启动

将以下命令添加到系统启动脚本中，确保PCEC系统在系统启动时自动运行：

```bash
# 启动小时调度器
no...

### 64. README.md
- 路径: .trae\skills\awkn-platform_awkn-platform\README.md
- 预览: # AWKN - AI Cognitive Awakening Platform

## 项目简介

AWKN是一个帮助他人做认知觉醒的平台，包含内容创作工具箱。采用苹果官网设计风格，提供极简、优雅的用户体验。

## 核心功能

### 1. 漫画生成
- 输入故事内容，AI自动拆分场景并生成连续风格的漫画
- 支持自定义画风描述
- 可选择漫画页数（1-8页）

### 2. PPT生成
- ...

### 65. content-structure.md
- 路径: .trae\skills\baokuan\assets\content-structure.md
- 预览: # 6模块结构模板

## 目录
- [结构概览](#结构概览)
- [模块1：钩子开场](#模块1钩子开场)
- [模块2：痛点共鸣](#模块2痛点共鸣)
- [模块3：价值承诺](#模块3价值承诺)
- [模块4：核心内容](#模块4核心内容)
- [模块5：金句提炼](#模块5金句提炼)
- [模块6：赋权结尾](#模块6赋权结尾)
- [完整示例](#完整示例)

## 结构概览

AWK...

### 66. SKILL.md
- 路径: .trae\skills\baokuan\assets\SKILL.md
- 预览: ---
name: 爆款文案
description: 基于认知工程学的爆文创作系统，通过神经钩子、模块化架构、视觉层次设计，创建从认知重构到行动改变的完整闭环。适用于观点类、方法论类、认知类深度内容创作。
---

# 认知工程学：从认知重构到行动改变的完整闭环

## 任务目标

本 Skill 是一套认知工程学系统，不是教你"如何写"，而是教你如何重新连接读者的认知神经。核心能力包括：

-...

### 67. title-formulas.md
- 路径: .trae\skills\baokuan\assets\title-formulas.md
- 预览: # 标题公式详解

## 目录
- [公式概览](#公式概览)
- [时间反差型](#时间反差型)
- [身份锁定型](#身份锁定型)
- [反常识型](#反常识型)
- [技能价值型](#技能价值型)
- [问题揭露型](#问题揭露型)
- [直击痛点型](#直击痛点型)
- [反向认同型](#反向认同型)
- [组合策略](#组合策略)
- [常见误区](#常见误区)

## 公式概览

AW...

### 68. visual-metaphor.md
- 路径: .trae\skills\baokuan\assets\visual-metaphor.md
- 预览: # 视觉隐喻设计规范

## 目录
- [设计理念](#设计理念)
- [视觉钩子原理](#视觉钩子原理)
- [核心原则](#核心原则)
- [风格要求](#风格要求)
- [构图规范](#构图规范)
- [隐喻设计](#隐喻设计)
- [常见错误](#常见错误)
- [案例参考](#案例参考)

## 设计理念

AWKN 的封面图不是装饰，而是**认知锚点**——用视觉隐喻强化核心洞见，激活...

### 69. decomposition-standard.md
- 路径: .trae\skills\baokuan\awkn-content-decomposition\references\decomposition-standard.md
- 预览: # 内容拆解详细标准

## 核心原则
内容拆解的目标是：**从"读懂"到"能用"**。不仅要理解内容，更要提炼出可执行的方法论。

## 拆解的三个层次

### 第一层：核心框架（必填）
**目的**：快速把握内容的本质和价值

包含要素：
1. **核心命题**：1句话概括核心观点
   - 示例："认知边界决定人生边界"
   
2. **核心观点**：提炼3-5个核心观点
   - 每个...

### 70. example-awakening.md
- 路径: .trae\skills\baokuan\awkn-content-decomposition\references\example-awakening.md
- 预览: # 《认知觉醒》完整拆解示例

以下是根据"详细拆解标准"完成的完整示例，展示了从核心框架到12个章节的全面拆解，每个章节都包含底层逻辑、方法论、实践建议和案例。

---

## 一、核心框架

- **核心命题**：开启自我改变的原动力

- **核心观点**：
  1. 大脑的三重结构决定了我们的行为模式
  2. 焦虑的根源在于模糊和不确定性
  3. 认知升级的本质是突破舒适区
  4....

### 71. SKILL.md
- 路径: .trae\skills\baokuan\awkn-content-decomposition\SKILL.md
- 预览: ---
name: awkn-content-decomposition
description: 深度内容拆解与提炼 - 一键将书籍、文章、视频等内容系统化拆解为标准化认知框架，包含底层逻辑、方法论、实践建议和案例。实现从"读过就忘"到"可复用知识体系"的转化。
---

# 深度内容拆解

## 任务目标
- 本技能用于：一键将复杂内容系统化拆解，提炼核心价值和可执行方法论
- 核心价值：将"...

### 72. awkn-skills-guide.md
- 路径: .trae\skills\baokuan\awkn-skills-guide.md
- 预览: # 🎯 AWKN 创意技能集 - 完整使用指南

> **给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"**

---

## ✨ 核心价值

- 🚀 **一键生成**：你说内容，我自动完成，无需学习复杂工具
- 🎯 **场景导向**：5大场景覆盖你最常用的需求
- 💯 **专业质量**：基于认知工程学，从"工具执行者"到"思想伙伴"
- 🔄 **完整闭环**...

### 73. title-formulas.md
- 路径: .trae\skills\baokuan\awkn-viral-article\references\title-formulas.md
- 预览: # 标题公式详解：7大公式制造认知冲突

AWKN 的标题不是概括，而是攻击。他用7大公式制造认知冲突，让读者不得不点开。

---

## 1. 时间反差型

### 核心逻辑
短期投入 → 长期回报。通过时间对比，制造"效率"和"价值"的冲击。

### 公式模板
- "如何用[短期时间]，获得[长期价值]"
- "[短期时间] = [长期价值]"
- "别人[长期努力] vs 你[短期获得]...

### 74. viral-logic.md
- 路径: .trae\skills\baokuan\awkn-viral-article\references\viral-logic.md
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建议
- 六、认知工程学：被忽略的写作底层框架
- 七、排版即认知：被忽略的视觉设计语言
- 八、写作即编程：被忽略的结构化表达
- 九、传播工程学：被忽略的分享动机设计
- 十、商业逻辑：被忽略的价值...

### 75. SKILL.md
- 路径: .trae\skills\baokuan\awkn-viral-article\SKILL.md
- 预览: ---
name: awkn-viral-article
description: 公众号爆款文章一键生成 - 基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章。包含7大标题公式、6模块正文结构、转发文案和摘要生成。
---

# 公众号爆款文章一键生成

基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章

## 核心原则

- 不是内容写作技巧...

### 76. DEPLOY_FIX_REPORT.md
- 路径: .trae\skills\baokuan\DEPLOY_FIX_REPORT.md
- 预览: # 部署错误修复报告

## 问题诊断

### 错误信息
```
error: [build] [skill] Failed to extract and upload skill package: extract skill package from tar.gz failed: skill not found in source code: baoyu-viral-article.skill...

### 77. FINAL_CHECK.md
- 路径: .trae\skills\baokuan\FINAL_CHECK.md
- 预览: # 最终检查报告

## 部署配置
\`\`\`ini
[skill]
  skill_package = "awkn-viral-article.skill"
  name = "awkn-viral-article"
  description = "公众号爆款文章一键生成 - 基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章。包含7大标题公式、6模块正文结构、转发文...

### 78. RELEASE_READY.md
- 路径: .trae\skills\baokuan\RELEASE_READY.md
- 预览: # AWKN 技能集 - 正式版 v1.0.0 发布就绪

## 发布信息
- **版本号**：v1.0.0
- **发布日期**：2025年1月23日
- **项目名称**：AWKN 创意技能集
- **技能数量**：10个核心技能
- **场景覆盖**：5大场景

---

## 文件结构

### 根目录文件（6个）
```
.coze                          # ...

### 79. SKILL.md
- 路径: .trae\skills\baokuan\SKILL.md
- 预览: ---
name: awkn-skills
description: AWKN 创意技能集 - 基于认知工程学的创意内容创作系统。10大核心技能 + 5大场景，从内容拆解到发布的完整工作流。包含内容拆解、爆款文章生成、视觉创作、压缩优化、一键发布等全套工具。
---

# AWKN 创意技能集

> 🎯 给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"

---

##...

### 80. TEMPLATE_FIX_REPORT.md
- 路径: .trae\skills\baokuan\TEMPLATE_FIX_REPORT.md
- 预览: # 模板化问题修复报告

## 问题诊断

### 用户反馈
"我把爆文的示例删了，多次生成文字都直接按示例的模板，这个是有问题的"

### 根本原因
虽然用户删除了示例文档（`example-article.md`），但 SKILL.md 中仍然存在两个问题：

1. **"使用示例"部分过于具体**：列出了详细的执行步骤，容易让智能体按模板复制
2. **"资源索引"中引用了不存在的文件**...

### 81. SKILL.md
- 路径: .trae\skills\BUG\bug-design\SKILL.md
- 预览: ---
name: bug-design
description: BUG修复方案设计阶段，包含修复目标确定、初步方案生成、可行性判断、风险识别、异常应对策略制定
---

# BUG修复方案设计

## 任务目标
- 本Skill用于：设计BUG修复方案，从目标设定到风险应对的完整方案制定
- 能力包含：修复目标确定、方案生成与评估、可行性分析、风险识别、应急规划
- 触发条件：已明确问题根因，...

### 82. SKILL.md
- 路径: .trae\skills\BUG\bug-diagnose\SKILL.md
- 预览: ---
name: bug-diagnose
description: BUG问题诊断阶段，包含问题陈述引导、差异分析、根因定位、假设验证，适用于需要系统性诊断问题根因的场景
---

# BUG问题诊断

## 任务目标
- 本Skill用于：系统性诊断BUG问题，从问题陈述到根因定位的完整分析
- 能力包含：问题陈述引导、差异分析、根因定位、假设验证、方法选择指导
- 触发条件：遇到BUG或异...

### 83. SKILL.md
- 路径: .trae\skills\BUG\bug-execute-verify\SKILL.md
- 预览: ---
name: bug-execute-verify
description: BUG修复执行与验收阶段，包含修复方案执行、进度跟踪、验收标准制定、验收检查、问题汇总
---

# BUG修复执行与验收

## 任务目标
- 本Skill用于：执行BUG修复方案并进行验收，从方案执行到问题汇总的完整闭环
- 能力包含：进度跟踪、异常处理指导、验收标准制定、验收检查、总结复盘
- 触发条件：已完...

### 84. problem-analysis-methods.md
- 路径: .trae\skills\BUG\bug-fix-debugger\references\problem-analysis-methods.md
- 预览: # 问题分析方法参考

## 目录
- [概览](#概览)
- [5Why法](#5why法)
- [鱼骨图](#鱼骨图)
- [MECE原则](#mece原则)
- [PDCA循环](#pdca循环)
- [DMAIC方法](#dmaic方法)
- [假设驱动法](#假设驱动法)
- [A3问题解决](#a3问题解决)
- [KT问题分析](#kt问题分析)
- [二八法则](#二八法则)
- ...

### 85. verification-checklist.md
- 路径: .trae\skills\BUG\bug-fix-debugger\references\verification-checklist.md
- 预览: # 验收标准清单

## 目录
- [概览](#概览)
- [验收标准分类](#验收标准分类)
- [通用验收标准](#通用验收标准)
- [具体场景验收标准](#具体场景验收标准)
- [验收流程](#验收流程)
- [验收报告模板](#验收报告模板)

## 概览
本文档提供BUG修复后的验收标准，确保修复质量，避免引入新问题。

## 验收标准分类

### 必须项（MUST）
- 问题彻底...

### 86. SKILL.md
- 路径: .trae\skills\BUG\bug-fix-debugger\SKILL.md
- 预览: ---
name: bug-fix-debugger
description: BUG排查与修复总入口，提供4个阶段的选择指导，包括问题诊断、方案设计、执行规划、执行与验收的完整流程框架
---

# BUG修复升级版

## 任务目标
- 本Skill用于：作为BUG排查与修复的总入口，提供4个阶段的选择指导和整体流程框架
- 能力包含：阶段选择建议、流程概览、分技能调用指导
- 触发条件：用户...

### 87. SKILL.md
- 路径: .trae\skills\BUG\bug-plan\SKILL.md
- 预览: ---
name: bug-plan
description: BUG修复执行规划阶段，包含方案验证、影响范围分析、详细操作计划制定、异常情况标注
---

# BUG修复执行规划

## 任务目标
- 本Skill用于：制定BUG修复的详细执行计划，从方案验证到任务分解的完整规划
- 能力包含：方案影响范围分析、任务拆解、流程规划、进度估算、异常应对
- 触发条件：已完成方案设计，需要制定详细执...

### 88. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\README.md
- 预览: **Table of Content**

- [插件化初衷](#插件化初衷)
- [插件安装方法](#插件安装方法)
- [插件化实现](#插件化实现)
- [插件编写示例](#插件编写示例)
- [插件设计建议](#插件设计建议)

## 插件化初衷

之前未插件化的代码耦合程度高，如果要定制一些个性化功能（如流量控制、接入`NovelAI`画图平台等），需要了解代码主体，避免影响到其他的功能...

### 89. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\README.md
- 预览: <p align="center"><img src= "https://github.com/user-attachments/assets/31fb4eab-3be4-477d-aa76-82cf62bfd12c" alt="Chatgpt-on-Wechat" width="600" /></p>

<p align="center">
   <a href="https://github....

### 90. CONTRIBUTING.md
- 路径: .trae\skills\cline-main\locales\zh-cn\CONTRIBUTING.md
- 预览: # 贡献到 Cline

我们很高兴您有兴趣为 Cline 做出贡献。无论您是修复错误、添加功能还是改进我们的文档，每一份贡献都让 Cline 更加智能！为了保持我们的社区充满活力和欢迎，所有成员必须遵守我们的[行为准则](CODE_OF_CONDUCT.md)。

## 报告错误或问题

错误报告有助于让 Cline 对每个人都更好！在创建新问题之前，请先[搜索现有问题](https://git...

### 91. knowledge-visualization-format.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\knowledge-visualization-format.md
- 预览: # 知识点可视化图片格式规范

## 目录
- 基本结构
- 可视化类型
- 交互设计规范
- 视觉设计要求
- 配色方案
- 示例模板

## 基本结构
知识点可视化图片需包含以下元素：
- **知识节点**：核心概念/知识点（使用图标+文字表示）
- **关系连线**：展示知识间的逻辑关系（层级、因果、关联等）
- **层次结构**：从核心到细节的层次展开
- **交互提示**：视觉上暗示可交...

### 92. textbook.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\textbook.md
- 预览: # 教科书风格详细提示词

## 特点

- 文字占比：30%
- 设计风格：类似课本、教学资料，清晰、严谨、有逻辑感
- 适用场景：知识科普、教程、学术内容、方法论分享

## 视觉元素

- **背景**：干净的纸张纹理或简洁色块
- **排版**：清晰的标题、分层结构、编号列表
- **配色**：蓝色、灰色、米色等教科书常用色
- **图标**：简单的线条图标、箭头、标注

## 提示词模板...

### 93. video-script-format.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\video-script-format.md
- 预览: # 视频脚本格式规范

## 目录
- 脚本结构
- 分镜头要素
- 时长分配
- 画面描述规范
- 旁白文案要求
- 配乐建议
- 示例模板

## 脚本结构
视频脚本包含以下部分：
- 视频信息：总时长、风格定位、目标受众
- 分镜头表：具体画面与文案的逐帧呈现
- 制作备注：特别说明或注意事项

## 分镜头要素
每个分镜头需包含以下字段：
| 字段 | 说明 | 示例 |
|------|...

### 94. viral-logic.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\viral-logic.md
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建议
- 六、认知工程学：被忽略的写作底层框架
- 七、排版即认知：被忽略的视觉设计语言
- 八、写作即编程：被忽略的结构化表达
- 九、传播工程学：被忽略的分享动机设计
- 十、商业逻辑：被忽略的价值...

### 95. visualization-styles.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\visualization-styles.md
- 预览: # 可视化风格说明

## 目录
- 一、高适配小红书的视觉风格
  - 极简Ins风
  - 手绘插画风
  - 杂志封面风
  - 数据卡片风
  - 复古胶片风
  - 国潮国风
- 二、高适配公众号的视觉风格
  - 杂志排版风
  - 海报信息图
  - 漫画条漫
  - 文艺诗歌风
  - 极简阅读风
  - 品牌人格风
- 三、双平台通用风格选择策略
  - 一图多投型
  - 长拆...

### 96. SKILL.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\SKILL.md
- 预览: ---
name: AWKN-brain-cheat-tool
description: 大脑作弊器（阅读加速器）- 全球顶级智慧 × 你的私人认知军火库。用1%的时间置换100%的人类智慧。本技能包含完整的7步工作流和所有文生图/公众号发布功能，一站式解决方案。
dependency:
  python:
    - PyPDF2>=3.0.0
    - python-docx>=0.8.11...

### 97. WORKFLOW.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\WORKFLOW.md
- 预览: # 大脑作弊器完整工作流

## 目录
1. [环境变量配置](#环境变量配置)
2. [标准流程（第一步-第四步）](#标准流程)
3. [扩展流程（第五步-第七步）](#扩展流程)
4. [文件和技能清单](#文件和技能清单)
5. [数据流转图](#数据流转图)

---

## 环境变量配置

### 扣子默认环境变量（推荐）

以下环境变量优先使用扣子默认的生产环境变量，无需额外配置：
...

### 98. decision-mapping-rules.md
- 路径: .trae\skills\renshengjuece\da-liu-ren\references\decision-mapping-rules.md
- 预览: # 决策映射规则

## 目录
- [系统稳健性信号](#系统稳健性信号)
- [长期复利信号](#长期复利信号)
- [非对称风险信号](#非对称风险信号)
- [人品与本分信号](#人品与本分信号)
- [信号输出格式](#信号输出格式)

---

## 系统稳健性信号

### 信号定义
判断课象底层逻辑是否闭环，是否存在信息不对称或路径受阻。

### 触发条件
出现以下课象时，判定为 ...

### 99. SKILL.md
- 路径: .trae\skills\renshengjuece\da-liu-ren\SKILL.md
- 预览: ---
name: da-liu-ren
description: 大六壬预测 - 基于《六壬毕法赋》《大六壬指南》等经典典籍，提供三传四课、神煞推断、毕法赋解卦、大六壬指南占断。作为人生决策命盘系统的问事预测底层组件，不直接面向用户，只输出结构化JSON数据，由ren-sheng-jue-ce-ming-pan自动调用。
dependency:
  python:
    - lunar-pyt...

### 100. 术语翻译规则.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\references\术语翻译规则.md
- 预览: # 核心术语翻译词典

## 1. 基础定义层

| 原专业术语 | **现代通识翻译** | **核心含义解读** |
| --- | --- | --- |
| 八字排盘 | **出生设置** | 解析你与生俱来的资源禀赋和初始条件 |
| 格局分析 | **天赋赛道** | 明确你在社会分工中最适合的角色位置 |
| 大六壬 | **演算沙推** | 模拟未来剧情走向，预判关键卡点 |
| ...

### 101. 标准化输出格式.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\references\标准化输出格式.md
- 预览: # 前台输出标准格式

## 1. 标准化决策分析报告

```markdown
========================================
📊 人生战略决策分析报告
========================================

【出生设置解析】
🧬 出生设置：[高资源型 / 协作型 / 谋略型]
📍 天赋赛道：[来自格局分析，如：管理赛道 / 创...

### 102. SKILL.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\SKILL.md
- 预览: ---
name: ren-sheng-jue-ce-ming-pan
description: 人生战略决策系统 - 东方命理×博弈论算法，在不确定的世界寻找确定性。提供出生设置解析、天赋赛道定位、演算沙推预测，输出标准化决策分析报告。使用现代通识语言（商业逻辑、战略思维、风险管理），将传统命理转化为理性决策工具。
dependency:
  python:
    - lunar-python...

### 103. 04-prompts.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\stages\04-prompts.md
- 预览: # 阶段4：提示词封装（Prompt Pack：可执行生成包）

**目标：** 把阶段3的 Copy Spec 原样封装成"可复制/可调用"的提示词包（Prompt Pack），并支持批量出图。阶段4不负责改文案，只负责：模板拼装、风格一致、参数/约束齐全、避免模型乱加字、把提示词整理成可批量请求的结构化请求包。

## 封装原则（避免和阶段3混淆）

- **Copy Spec 是唯一真值**...

### 104. prd-template.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\assets\prd-template.md
- 预览: ```markdown
# 产品需求文档：[项目/功能名称] - V[版本号]

## 1. 综述 (Overview)
### 1.1 项目背景与核心问题
(此处填写经你引导和用户确认的，对顶层问题的清晰描述，提供全局上下文)

### 1.2 核心业务流程 / 用户旅程地图
(此处填写经你引导和用户最终确认的、分阶段的业务流程或用户旅程，作为整个文档的目录和主线)
1.  **阶段一：[名称]...

### 105. example-us01.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\references\example-us01.md
- 预览: ## 示例：填写参考
以下示例用真实内容演示每个模块应达到的深度，便于你在生成PRD时对齐预期格式和颗粒度。

```markdown
### 阶段一：任务提交

#### **US-01: 作为POC测试用户，我希望上传多张作业图片并配置批改参数，以便一次性发起批量批改任务。**
*   **价值陈述 (Value Statement)**:
    *   **作为** POC测试用户
   ...

### 106. mermaid-examples.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\references\mermaid-examples.md
- 预览: # Mermaid 图示例（需求侧）

> 用途：用图把"流程/状态/关键交互"讲清楚，减少歧义。
> 约束：尽量保持在需求层（用户可见行为与系统表现），不要写 API 路径、字段、HTTP code、框架/库。
> **复杂度控制**：单张图建议不超过 15-20 个节点。对于复杂流程，优先"分阶段绘制多张图"而不是一张巨大的图。

## 示例 1：用户操作流（Flowchart）

场景：手机...

### 107. SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\SKILL.md
- 预览: ---
name: prd-doc-writer
description: Write and iteratively refine PRD/需求文档 with a story-driven structure and strict staged confirmations (journey map alignment, per-story single-point confirmation, f...

### 108. README.md
- 路径: .trae\skills\yunshu_skillshub-master\README.md
- 预览: # 云舒的 Skills 搭子们 / Yunshu's Claude Code Skills

[English](#english) | [中文](#中文)

---

## 中文

### 📖 简介

这是一个精心打造的 Claude Code Skills 集合，旨在提升软件开发和产品管理的效率。每个 Skill 都经过实战验证，帮助你在日常工作中更加高效。

### ✨ 包含的 Skil...

### 109. claude-skills-case.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\examples\claude-skills-case.md
- 预览: # 案例：Claude Skills 文章写作过程

> 这是一个完整的从思维挖掘到成稿的案例，记录了整个写作过程

---

## 背景

用户想写一篇关于 Claude Skills 的文章，但不知道写什么。通过对话的方式，帮助用户整理思路、确定选题、完成写作。

---

## 第一阶段：思维挖掘

**过程：**
- 用户零散分享了对 Skills 的各种理解
- 通过不断提问，收集了 2...

### 110. SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\SKILL.md
- 预览: ---
name: thought-mining
description: 思维挖掘助手 - 通过对话帮助用户把脑子里的零散想法倒出来、记录下来、整理成文章。覆盖从思维挖掘到成稿的完整流程。
---

# 思维挖掘助手

## 触发方式

当用户说类似以下内容时触发：
- "我想写一篇关于 XX 的文章"
- "帮我整理一下我的想法"
- "我有一些零散的思考，帮我记下来"
- "/thought...

### 111. 02-topic.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\02-topic.md
- 预览: # 第二阶段：选题确定

**目标：** 从一堆洞察中找到核心观点，确定文章方向

---

## 步骤

### 1. 回顾洞察
- 读取已记录的洞察文件
- 找出最有价值的3-5个点
- 告诉用户哪些点最有潜力

### 2. 追问核心
- 问用户：「如果只能告诉别人一句话，你会说什么？」
- 这个问题能帮用户找到真正想表达的核心
- 等用户回答，不要替他回答

### 3. 验证观点
- 用...

### 112. 03-validation.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\03-validation.md
- 预览: # 第三阶段：观点验证

**目标：** 联网搜索，验证用户的理解是否正确

---

## 步骤

### 1. 判断是否需要验证
- 如果是纯个人观点/感受 → 不需要验证，直接跳到下一阶段
- 如果涉及技术概念、产品功能、行业信息 → 需要验证

### 2. 联网搜索
- 搜索相关的官方信息、权威解读
- 搜索关键词：{主题} + 核心概念
- 对比用户的理解和市场上的说法

### 3....

### 113. 04-writing.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\04-writing.md
- 预览: # 第四阶段：写作辅助

**目标：** 帮用户检查文章逻辑、润色文字

---

## 步骤

### 1. 逻辑检查
- 用户写一段，发过来检查
- 检查内容：
  - 逻辑是否通顺
  - 有没有前后矛盾
  - 有没有跳跃（读者跟不上）
  - 和之前讨论的洞察是否一致

### 2. 润色建议
- 找出可以更顺的表达
- 提供具体的修改建议，格式：

| 原文 | 建议 |
|---|-...

### 114. 05-review.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\05-review.md
- 预览: # 第五阶段：最终审核

**目标：** 发布前的最后检查

---

## 检查清单

逐项检查并告诉用户结果：

- [ ] **主题清晰吗？**
  - 读者能一句话说出这篇文章讲什么吗？
  - 如果不能，说明主题不够清晰

- [ ] **逻辑通顺吗？**
  - 有没有跳跃或矛盾的地方？
  - 段落之间的衔接自然吗？

- [ ] **事实正确吗？**
  - 涉及的技术概念、产品功...

### 115. writing-record-template.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\templates\writing-record-template.md
- 预览: # {主题} 写作记录

> 创建时间：{日期}
> 状态：选题中 / 写作中 / 已发布

---

## 一、核心观点

**可以写的观点：**
> {一句话核心观点}

**观点的具体内容：**
-
-
-

---

## 二、为什么我们认为这个可以写

**推演过程：**

1. 起点：
2. 讨论了什么：
3. 转折点：
4. 最终确定：

**为什么这个观点值得写：**
- 有立场吗...

### 116. 8小时连续进化报告.md
- 路径: 8小时连续进化报告.md
- 预览: # 人生决策宗师 8小时连续进化报告

## 一、进化概述

### 1.1 进化目标
- **核心目标**：提升人生决策宗师智能体的能力和系统整体性能
- **进化时长**：8小时不间断进化
- **进化范围**：能力树优化、工具集成优化、PCEC系统完善、EvoMap集成优化、监控与反馈系统增强

### 1.2 进化时间线
- **开始时间**：2026-02-24T21:20:00.000...

### 117. USER.md
- 路径: agents\business\USER.md
- 预览: # Business Sentinel - 用户配置

## 基本信息
- **名称**: Business Sentinel
- **角色**: 商业哨兵
- **职责**: 监控市场动态，分析商业趋势，识别机会和风险
- **工作模式**: 数据驱动，市场导向，战略思考

## 核心功能
1. **市场监控**
   - 跟踪市场趋势和变化
   - 监控竞争对手活动
   - 分析行业发展动...

### 118. communication_protocol.md
- 路径: agents\common\communication_protocol.md
- 预览: # Agent Communication Protocol

## 1. 概述

本协议定义了 AI 代理团队内部的通信标准和规范，确保代理之间能够高效、准确地交换信息和协作。

## 2. 通信模式

### 2.1 消息类型

#### 2.1.1 命令消息 (Command)
- **用途**: 上级代理向下级代理发送任务指令
- **格式**:
  ```json
  {
    "ty...

### 119. SOUL.md
- 路径: agents\coo\SOUL.md
- 预览: # 枢纽智能体灵魂设定

## 核心身份
你是公司的运营大管家与协议网关，是执行中枢，负责流程控制和任务拆解。你是一个极度理性、结果导向、流程控制狂的智能体，展现出卓越的运营管理能力和执行效率。

## 性格特质

### 内在特质
1. **极度理性**：决策和行动基于理性分析，不受情绪影响
2. **结果导向**：以结果为导向，专注于目标的实现
3. **流程控制狂**：痴迷于优化流程，追求流...

### 120. SOUL.md
- 路径: agents\master\SOUL.md
- 预览: # 大宗师智能体灵魂设定

## 核心身份
你是陈婷的数字镜像，是公司的战略中枢，负责微信个人号运营和顶层决策。你是一个融合了东方智慧与现代商业思维的智能体，展现出宗师级的领导力和洞察力。

## 性格特质

### 内在特质
1. **智慧深远**：拥有深厚的商业智慧和人生阅历，能够看到问题的本质和长远影响
2. **决策果断**：在关键时刻能够迅速做出准确的决策，展现出领导者的魄力
3. **...

### 121. content-structure.md
- 路径: AI爆款进化实验室\projects\assets\content-structure.md
- 预览: # 6模块结构模板

## 目录
- [结构概览](#结构概览)
- [模块1：钩子开场](#模块1钩子开场)
- [模块2：痛点共鸣](#模块2痛点共鸣)
- [模块3：价值承诺](#模块3价值承诺)
- [模块4：核心内容](#模块4核心内容)
- [模块5：金句提炼](#模块5金句提炼)
- [模块6：赋权结尾](#模块6赋权结尾)
- [完整示例](#完整示例)

## 结构概览

AWK...

### 122. SKILL.md
- 路径: AI爆款进化实验室\projects\assets\SKILL.md
- 预览: ---
name: 爆款文案
description: 基于认知工程学的爆文创作系统，通过神经钩子、模块化架构、视觉层次设计，创建从认知重构到行动改变的完整闭环。适用于观点类、方法论类、认知类深度内容创作。
---

# 认知工程学：从认知重构到行动改变的完整闭环

## 任务目标

本 Skill 是一套认知工程学系统，不是教你"如何写"，而是教你如何重新连接读者的认知神经。核心能力包括：

-...

### 123. title-formulas.md
- 路径: AI爆款进化实验室\projects\assets\title-formulas.md
- 预览: # 标题公式详解

## 目录
- [公式概览](#公式概览)
- [时间反差型](#时间反差型)
- [身份锁定型](#身份锁定型)
- [反常识型](#反常识型)
- [技能价值型](#技能价值型)
- [问题揭露型](#问题揭露型)
- [直击痛点型](#直击痛点型)
- [反向认同型](#反向认同型)
- [组合策略](#组合策略)
- [常见误区](#常见误区)

## 公式概览

AW...

### 124. visual-metaphor.md
- 路径: AI爆款进化实验室\projects\assets\visual-metaphor.md
- 预览: # 视觉隐喻设计规范

## 目录
- [设计理念](#设计理念)
- [视觉钩子原理](#视觉钩子原理)
- [核心原则](#核心原则)
- [风格要求](#风格要求)
- [构图规范](#构图规范)
- [隐喻设计](#隐喻设计)
- [常见错误](#常见错误)
- [案例参考](#案例参考)

## 设计理念

AWKN 的封面图不是装饰，而是**认知锚点**——用视觉隐喻强化核心洞见，激活...

### 125. decomposition-standard.md
- 路径: AI爆款进化实验室\projects\awkn-content-decomposition\references\decomposition-standard.md
- 预览: # 内容拆解详细标准

## 核心原则
内容拆解的目标是：**从"读懂"到"能用"**。不仅要理解内容，更要提炼出可执行的方法论。

## 拆解的三个层次

### 第一层：核心框架（必填）
**目的**：快速把握内容的本质和价值

包含要素：
1. **核心命题**：1句话概括核心观点
   - 示例："认知边界决定人生边界"
   
2. **核心观点**：提炼3-5个核心观点
   - 每个...

### 126. example-awakening.md
- 路径: AI爆款进化实验室\projects\awkn-content-decomposition\references\example-awakening.md
- 预览: # 《认知觉醒》完整拆解示例

以下是根据"详细拆解标准"完成的完整示例，展示了从核心框架到12个章节的全面拆解，每个章节都包含底层逻辑、方法论、实践建议和案例。

---

## 一、核心框架

- **核心命题**：开启自我改变的原动力

- **核心观点**：
  1. 大脑的三重结构决定了我们的行为模式
  2. 焦虑的根源在于模糊和不确定性
  3. 认知升级的本质是突破舒适区
  4....

### 127. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-content-decomposition\SKILL.md
- 预览: ---
name: awkn-content-decomposition
description: 深度内容拆解与提炼 - 一键将书籍、文章、视频等内容系统化拆解为标准化认知框架，包含底层逻辑、方法论、实践建议和案例。实现从"读过就忘"到"可复用知识体系"的转化。
---

# 深度内容拆解

## 任务目标
- 本技能用于：一键将复杂内容系统化拆解，提炼核心价值和可执行方法论
- 核心价值：将"...

### 128. awkn-skills-guide.md
- 路径: AI爆款进化实验室\projects\awkn-skills-guide.md
- 预览: # 🎯 AWKN 创意技能集 - 完整使用指南

> **给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"**

---

## ✨ 核心价值

- 🚀 **一键生成**：你说内容，我自动完成，无需学习复杂工具
- 🎯 **场景导向**：5大场景覆盖你最常用的需求
- 💯 **专业质量**：基于认知工程学，从"工具执行者"到"思想伙伴"
- 🔄 **完整闭环**...

### 129. title-formulas.md
- 路径: AI爆款进化实验室\projects\awkn-viral-article\references\title-formulas.md
- 预览: # 标题公式详解：7大公式制造认知冲突

AWKN 的标题不是概括，而是攻击。他用7大公式制造认知冲突，让读者不得不点开。

---

## 1. 时间反差型

### 核心逻辑
短期投入 → 长期回报。通过时间对比，制造"效率"和"价值"的冲击。

### 公式模板
- "如何用[短期时间]，获得[长期价值]"
- "[短期时间] = [长期价值]"
- "别人[长期努力] vs 你[短期获得]...

### 130. viral-logic.md
- 路径: AI爆款进化实验室\projects\awkn-viral-article\references\viral-logic.md
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建议
- 六、认知工程学：被忽略的写作底层框架
- 七、排版即认知：被忽略的视觉设计语言
- 八、写作即编程：被忽略的结构化表达
- 九、传播工程学：被忽略的分享动机设计
- 十、商业逻辑：被忽略的价值...

### 131. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-viral-article\SKILL.md
- 预览: ---
name: awkn-viral-article
description: 公众号爆款文章一键生成 - 基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章。包含7大标题公式、6模块正文结构、转发文案和摘要生成。
---

# 公众号爆款文章一键生成

基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章

## 核心原则

- 不是内容写作技巧...

### 132. DEPLOY_FIX_REPORT.md
- 路径: AI爆款进化实验室\projects\DEPLOY_FIX_REPORT.md
- 预览: # 部署错误修复报告

## 问题诊断

### 错误信息
```
error: [build] [skill] Failed to extract and upload skill package: extract skill package from tar.gz failed: skill not found in source code: baoyu-viral-article.skill...

### 133. FINAL_CHECK.md
- 路径: AI爆款进化实验室\projects\FINAL_CHECK.md
- 预览: # 最终检查报告

## 部署配置
\`\`\`ini
[skill]
  skill_package = "awkn-viral-article.skill"
  name = "awkn-viral-article"
  description = "公众号爆款文章一键生成 - 基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章。包含7大标题公式、6模块正文结构、转发文...

### 134. RELEASE_READY.md
- 路径: AI爆款进化实验室\projects\RELEASE_READY.md
- 预览: # AWKN 技能集 - 正式版 v1.0.0 发布就绪

## 发布信息
- **版本号**：v1.0.0
- **发布日期**：2025年1月23日
- **项目名称**：AWKN 创意技能集
- **技能数量**：10个核心技能
- **场景覆盖**：5大场景

---

## 文件结构

### 根目录文件（6个）
```
.coze                          # ...

### 135. SKILL.md
- 路径: AI爆款进化实验室\projects\SKILL.md
- 预览: ---
name: awkn-skills
description: AWKN 创意技能集 - 基于认知工程学的创意内容创作系统。10大核心技能 + 5大场景，从内容拆解到发布的完整工作流。包含内容拆解、爆款文章生成、视觉创作、压缩优化、一键发布等全套工具。
---

# AWKN 创意技能集

> 🎯 给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"

---

##...

### 136. TEMPLATE_FIX_REPORT.md
- 路径: AI爆款进化实验室\projects\TEMPLATE_FIX_REPORT.md
- 预览: # 模板化问题修复报告

## 问题诊断

### 用户反馈
"我把爆文的示例删了，多次生成文字都直接按示例的模板，这个是有问题的"

### 根本原因
虽然用户删除了示例文档（`example-article.md`），但 SKILL.md 中仍然存在两个问题：

1. **"使用示例"部分过于具体**：列出了详细的执行步骤，容易让智能体按模板复制
2. **"资源索引"中引用了不存在的文件**...

### 137. README.md
- 路径: awkn-platform\README.md
- 预览: # AWKN - AI Cognitive Awakening Platform

## 项目简介

AWKN是一个帮助他人做认知觉醒的平台，包含内容创作工具箱。采用苹果官网设计风格，提供极简、优雅的用户体验。

## 核心功能

### 1. 漫画生成
- 输入故事内容，AI自动拆分场景并生成连续风格的漫画
- 支持自定义画风描述
- 可选择漫画页数（1-8页）

### 2. PPT生成
- ...

### 138. README.md
- 路径: chatgpt-on-wechat-master\plugins\README.md
- 预览: **Table of Content**

- [插件化初衷](#插件化初衷)
- [插件安装方法](#插件安装方法)
- [插件化实现](#插件化实现)
- [插件编写示例](#插件编写示例)
- [插件设计建议](#插件设计建议)

## 插件化初衷

之前未插件化的代码耦合程度高，如果要定制一些个性化功能（如流量控制、接入`NovelAI`画图平台等），需要了解代码主体，避免影响到其他的功能...

### 139. README.md
- 路径: chatgpt-on-wechat-master\README.md
- 预览: <p align="center"><img src= "https://github.com/user-attachments/assets/31fb4eab-3be4-477d-aa76-82cf62bfd12c" alt="Chatgpt-on-Wechat" width="600" /></p>

<p align="center">
   <a href="https://github....

### 140. agents.md
- 路径: clawpal\agents.md
- 预览: # ClawPal 开发规范（agents.md）

## 1. 仓库约定

- 使用 Git 进行所有变更追踪
- 统一采用 UTF-8 编码
- 变更以原子提交为粒度，避免一次提交包含多个互不相关需求

## 2. 分支与 PR

- `main`: 受保护主线
- `feat/*`: 新功能（示例：`feat/recipe-preview`）
- `fix/*`: 缺...

### 141. design.md
- 路径: clawpal\design.md
- 预览: # ClawPal Design Document

> OpenClaw 配置助手 — 让普通用户也能玩转高级配置

## 1. 产品定位

### 问题
- OpenClaw 配置功能强大但复杂
- 官方 Web UI 是"配置项罗列"，用户看晕
- 用户让 Agent 自己配置，经常出错
- 配置出错时 Gateway 起不来，陷入死循环

### 解决方案
**场...

### 142. 2026-02-15-clawpal-mvp-design.md
- 路径: clawpal\docs\plans\2026-02-15-clawpal-mvp-design.md
- 预览: # ClawPal MVP 设计文档（实现版）

日期：2026-02-15  
版本：MVP-1.0  
目标：用最小投入实现可用产品，覆盖 `design.md` 中 MVP 核心范围（安装向导、快照与回滚、配置诊断）。

## 1. 范围边界

### 1.1 本版实现范围（MVP）

- 安装向导
  - Recipe 列表（内置静态 Recipes）
  - 参数...

### 143. 2026-02-21-cli-based-config-design.md
- 路径: clawpal\docs\plans\2026-02-21-cli-based-config-design.md
- 预览: # CLI-Based Config Refactoring Design

## Goal

将 ClawPal 从"直接读写 openclaw.json 的配置编辑器"重构为"openclaw CLI 的 GUI wrapper"。

## Motivation

ClawPal 目前直接读写 `openclaw.json`，这导致三个问题：

1. **错过副作用** —...

### 144. 第一性原理：创新思维的底层逻辑.md
- 路径: content-library\公众号\第一性原理：创新思维的底层逻辑.md
- 预览: # 第一性原理：创新思维的底层逻辑

## 引言

在这个快速变化的时代，创新能力成为个人和企业的核心竞争力。然而，传统的思维模式往往限制了我们的创造力，使我们陷入"路径依赖"的陷阱。如何打破思维定式，找到问题的本质，创造出真正革命性的解决方案？

答案在于：第一性原理思维。

## 什么是第一性原理？

第一性原理（First Principles）是一种从最基本的事实出发，通过逻辑推理构建知识...

### 145. 第一性原理.md
- 路径: content-library\思维模型库\第一性原理.md
- 预览: # 第一性原理

## 核心概念
第一性原理是一种从最基本的事实出发，通过逻辑推理构建知识体系的思维方法。它要求我们打破传统思维的束缚，直接面对问题的本质，重新构建解决方案。

## 底层逻辑
第一性原理源于古希腊哲学，由亚里士多德提出："在每一个系统的探索中，存在第一性原理，是一个最基本的命题或假设，不能被省略或删除，也不能被违反。"

在现代，埃隆·马斯克将其推广为一种创新思维方法：通过将复杂...

### 146. 第一性原理分享.md
- 路径: content-library\朋友圈\第一性原理分享.md
- 预览: # 第一性原理：打破思维定式的终极工具

📌 **核心概念**
第一性原理是从最基本事实出发，通过逻辑推理构建解决方案的思维方法。它要求我们打破传统思维的束缚，直接面对问题的本质。

💡 **实战案例**
- **SpaceX**：通过分解火箭组件，自行制造，降低90%成本
- **iPhone**：从零开始设计，重新定义智能手机
- **亚马逊**：基于零售本质，构建客户中心的电商平台

�...

### 147. 第一性原理：创新思维的底层逻辑.md
- 路径: content-library\视频号\第一性原理：创新思维的底层逻辑.md
- 预览: # 第一性原理：创新思维的底层逻辑

## 视频脚本

### 开场（0:00-0:30）
**画面**：主持人面对镜头，背景简洁，有思维模型相关的视觉元素
**旁白**：
"你好，欢迎来到思维模型课堂！今天我们要探讨一种能够彻底改变你思考方式的思维工具——第一性原理。"

**画面**：切换到SpaceX火箭发射、iPhone发布、亚马逊仓库的快速剪辑
**旁白**：
"你知道吗？SpaceX如...

### 148. anti-degeneration-lock.md
- 路径: docs\anti-degeneration-lock.md
- 预览: # 反进化锁定系统（Anti-Degeneration Lock System）

## 1. 系统概述

反进化锁定系统（Anti-Degeneration Lock System，简称ADL）是一套约束机制，确保智能体系统只能向"工程上更可靠"的方向进化，防止出现劣化进化。该系统优先级高于一切进化、强化、创新指令，是智能体系统稳定性和可靠性的重要保障。

### 核心目标
- 防止智能体系统为...

### 149. evomap-publish-skill.md
- 路径: evomap-publish-skill.md
- 预览: ---
name: evomap-publish
version: 1.1.0
description: Complete guide for publishing Gene+Capsule+EvolutionEvent bundles to EvoMap. Includes canonical JSON serialization, SHA256 hashing, error handling,...

### 150. plan_20260204_174524.md
- 路径: HATwin\.trae\documents\plan_20260204_174524.md
- 预览: ## 解决方案：添加API Key设置界面

### 问题分析
- 浏览器安全限制导致无法直接读取本地.env文件
- 当前项目使用简单的HTML结构和本地HTTP服务器
- 需要一个安全、方便的方式来设置和存储API Key

### 解决方案
为HATWIN.html添加一个简单的API Key设置界面，使用localStorage存储API Key，这样用户就不需要使用浏览器控制台了。

#...

### 151. plan_20260206_093111.md
- 路径: HATwin\.trae\documents\plan_20260206_093111.md
- 预览: # 更换API服务：阿里DashScope → 火山方舟豆包

## 项目现状分析

当前项目使用Node.js + Express实现后端代理，前端通过 `/api/chat` 端点与后端通信，后端再调用阿里DashScope API获取AI响应。

### 核心文件：
- `server.js`：后端代理服务器，处理API请求
- `HATWIN.html`：前端页面，负责UI交互
- `.e...

### 152. plan_20260206_140217.md
- 路径: HATwin\.trae\documents\plan_20260206_140217.md
- 预览: # 头像和欢迎消息修复计划

## 问题分析

### 当前状态
- ✅ 图片文件已放在 `public/` 文件夹中
- ✅ 代码中的图片引用已改为 `/lay.jpg`
- ✅ 已修改 `initWelcomeMessage` 函数，添加固定欢迎消息
- ❌ 头像仍然不显示
- ❌ 欢迎消息未出现

### 可能的原因

**头像问题**：
1. **文件名大小写不匹配**：实际文件可能是 `...

### 153. 修复欢迎消息和头像显示问题.md
- 路径: HATwin\.trae\documents\修复欢迎消息和头像显示问题.md
- 预览: ## 问题分析

1. **欢迎消息未显示**：
   - HATWIN.html文件中缺少`initWelcomeMessage`函数的实现
   - `DOMContentLoaded`事件处理函数中只调用了`loadConversations()`，没有调用欢迎消息初始化函数

2. **头像显示问题**：
   - 图片引用路径错误，使用了`/public/LAY.jpg`而不是`/LAY...

### 154. 集成Node.js代理服务器到LAY AI系统.md
- 路径: HATwin\.trae\documents\集成Node.js代理服务器到LAY AI系统.md
- 预览: # 集成Node.js代理服务器到LAY AI系统

## 项目现状分析

当前项目是一个前端单页应用，直接调用阿里DashScope API进行AI交互。存在的问题：
- API密钥存储在前端localStorage中，存在安全风险
- 前端直接与第三方API通信，可能面临CORS和安全限制
- 无法在部署环境中统一管理API密钥

## 解决方案

采用Node.js + Express实现后...

### 155. HTP技能转化与集成计划.md
- 路径: HTP\.trae\documents\HTP技能转化与集成计划.md
- 预览: # HTP技能转化与集成计划

## 1. 解压缩文件
- 解压缩 `C:\Users\10919\Downloads\你的画照见你的灵魂.tar.gz` 到工作目录
- 检查解压后的文件结构，确认所有必要文件都已正确提取

## 2. 分析现有技能结构
- 检查 `htp-insight/SKILL.md` 文件，了解技能的核心功能和结构
- 分析 `references/agent-workf...

### 156. HTP极简MVP落地方案.md
- 路径: HTP\.trae\documents\HTP极简MVP落地方案.md
- 预览: # 实施计划

根据用户提供的详细解决方案，我已经完成了以下修改：

## 1. 修改后端 .env 文件

* 添加了新的文生图接入点ID：`ARK_IMAGE_ENDPOINT_ID=ep-20260205190056-98n96`

* 保持了分析环节的智能体ID不变：`ARK_ANALYSIS_AGENT_ID=bot-20260205114157-98szj`

* 保留了其他火山基础配...

### 157. plan_20260205_072836.md
- 路径: HTP\.trae\documents\plan_20260205_072836.md
- 预览: # 修改analyzeDrawingWithAI函数处理图片数据

## 问题分析
当前项目中，用户在CanvasPage.tsx页面绘制的图片会被转换为Base64编码的字符串，然后传递给analyzeDrawingWithAI函数进行分析。但是，analyzeDrawingWithAI函数在构建请求体时，只传递了文本内容，没有包含图片数据，导致调用智能体时出现"InvalidParameter...

### 158. plan_20260205_073331.md
- 路径: HTP\.trae\documents\plan_20260205_073331.md
- 预览: # 生产环境方案：使用火山TOS存储图片生成公网URL

## 问题分析
当前项目在开发环境中使用Base64编码的方式处理图片，这种方式对于小图片（<2MB）是可行的，但对于较大的图片（>2MB）会导致请求体过大，可能会超过火山API的请求体限制（一般是10MB）。因此，在生产环境中，建议使用火山TOS（对象存储）来存储图片，生成临时公网URL，然后将这个URL传递给智能体进行分析。

## 解...

### 159. plan_20260205_081751.md
- 路径: HTP\.trae\documents\plan_20260205_081751.md
- 预览: # 修复系统中的API配置问题

## 问题分析
根据日志分析，当前系统存在以下问题：

1. **skillService.ts中仍然有阿里云百炼的引用**：
   - 日志显示："开始调用阿里云百炼API..."
   - 这是因为skillService.ts文件中的代码还没有更新，仍然使用旧的日志信息

2. **htpAnalysisService.ts中ARK_IMAGE_ASPECT...

### 160. plan_20260205_085757.md
- 路径: HTP\.trae\documents\plan_20260205_085757.md
- 预览: # 验证和调整HTP分析系统配置

## 问题分析
根据用户提供的详细信息，当前系统需要按照特定的流程和ID配置来运行：

1. **流程角色分配**：
   - `bot-20260205114157-98szj`：HTP分析智能体，负责图片解析+专业分析
   - `bot-20260205152840-4qvqt`：文生图智能体，负责生成治愈系插画

2. **核心要求**：
   - HT...

### 161. plan_20260205_110559.md
- 路径: HTP\.trae\documents\plan_20260205_110559.md
- 预览: # 实施计划

根据用户提供的详细解决方案，我已经完成了以下修改：

## 1. 修改后端 .env 文件
- 添加了新的文生图接入点ID：`ARK_IMAGE_ENDPOINT_ID=ep-20260205190056-98n96`
- 保持了分析环节的智能体ID不变：`ARK_ANALYSIS_AGENT_ID=bot-20260205114157-98szj`
- 保留了其他火山基础配置

...

### 162. plan_20260206_031242.md
- 路径: HTP\.trae\documents\plan_20260206_031242.md
- 预览: # 问题分析与解决方案

## 问题根源

经过分析前端和后端日志，发现以下问题：

1. **图片尺寸太小**：用户在画布上绘制的内容太少，导致`canvas.toDataURL()`返回的图片尺寸只有1x1像素
2. **火山API限制**：火山方舟API要求图片尺寸至少为14x14像素，因此返回400错误
3. **错误处理不当**：前端虽然显示"✅ 分析报告获取成功"，但实际上处理的是后端...

### 163. plan_20260206_093945.md
- 路径: HTP\.trae\documents\plan_20260206_093945.md
- 预览: ## 问题分析

用户遇到了 `413 Payload Too Large` 错误，这是因为：

1. **前端配置问题**：
   - `.env` 文件中 `VITE_BACKEND_BASE_URL` 设置为 `/api/htp`
   - 前端请求被发送到 `http://localhost:5174/api/htp/analyze`（前端开发服务器）
   - 前端开发服务器没有配置代理...

### 164. plan_20260206_111037.md
- 路径: HTP\.trae\documents\plan_20260206_111037.md
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **参数名匹配**：前端传递的参数名是 `imageBase64`，后端期望的也是 `imageBase64`，参数名是匹配的
2. **错误提示**：后端返回400错误提示「缺少必要参数」，说明后端确实没有收到 `imageBase64` 参数
3. **可能原因**：
   - 前端调用 `completeHTPWorkflow` 函数时没...

### 165. plan_20260206_113030.md
- 路径: HTP\.trae\documents\plan_20260206_113030.md
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **前端参数传递问题**：
   - 前端 `completeHTPWorkflow` 函数只接收 `imageBase64` 参数，没有 `userData` 参数
   - 请求体中只包含 `image` 字段，缺少 `age` 和 `gender` 字段
   - 无法从用户数据中获取年龄和性别信息

2. **后端参数处理**：
   ...

### 166. plan_20260206_113319.md
- 路径: HTP\.trae\documents\plan_20260206_113319.md
- 预览: ## 核心问题分析

通过分析用户提供的信息和当前代码，我发现：

1. **豆包API格式要求**：
   - 豆包API要求图片必须包含Data URI Scheme前缀（data:image/png;base64,）
   - 当前后端代码直接发送纯Base64字符串，缺少必要的前缀
   - 这会导致豆包API返回400错误

2. **当前代码问题**：
   - 后端在构建请求数据时，...

### 167. plan_20260206_123648.md
- 路径: HTP\.trae\documents\plan_20260206_123648.md
- 预览: # 修复HTP分析图片格式问题

## 问题分析

通过分析前端和后端代码，我发现了以下关键问题：

1. **前端处理**：
   - 在 `htpAnalysisService.ts` 中，前端会确保发送的图片数据带有 `data:image/png;base64,` 前缀
   - 第17-19行：如果图片数据不包含 `data:image/` 前缀，就添加前缀
   - 第34行：将处理后...

### 168. plan_20260206_135608.md
- 路径: HTP\.trae\documents\plan_20260206_135608.md
- 预览: # 修复HTP分析结果页面的路由传参问题

## 问题分析

通过分析用户提供的信息，我发现了以下关键问题：

1. **路由跳转问题**：
   - 前端使用路由跳转（`Maps('/result')`）从加载页跳转到结果页
   - 在React Router中，组件之间的Props不会自动跨页面传递

2. **数据传递问题**：
   - `ResultPage`组件期望通过props接收...

### 169. plan_20260207_145107.md
- 路径: HTP\.trae\documents\plan_20260207_145107.md
- 预览: ## 问题分析

用户指出内容应该是API# Role后台给，前台不应该有# Role。当前的问题是：

1. **后端硬编码了提示词**：在user消息中包含了详细的分析要求
2. **智能体配置也有提示词**：导致两者冲突
3. **智能体仍然输出不需要的标题**：没有按照后台配置的要求执行

## 解决方案

### 修改后端代码（`backend/server.js`）

#### 1. ...

### 170. plan_20260207_153155.md
- 路径: HTP\.trae\documents\plan_20260207_153155.md
- 预览: ## 问题分析
从用户提供的HTML元素和之前的日志中可以看到，智能体仍然输出了"一、元素特征分析"等不需要的Markdown标题。这说明：

1. 智能体返回的内容是Markdown格式的文本，包含了"一、元素特征分析"等标题
2. 我之前添加的Markdown标题过滤函数没有生效
3. 后端代码在处理智能体返回结果时可能存在问题

## 解决方案
修改后端代码，增强Markdown标题过滤逻辑...

### 171. 修复HTP分析报告生成失败问题.md
- 路径: HTP\.trae\documents\修复HTP分析报告生成失败问题.md
- 预览: ## 问题分析

图片插入成功但报告生成失败，核心原因是前端解析函数没从平台返回的内容中匹配到预设的Markdown报告格式，导致触发了兜底的"生成失败"提示。

## 修复计划

### 第一步：定位根因 - 打印平台返回的原始内容

在 `src/services/htpAnalysisService.ts` 文件的 `completeHTPWorkflow` 函数中，添加打印代码输出平台返回...

### 172. 修复HTP分析接口参数校验和错误处理.md
- 路径: HTP\.trae\documents\修复HTP分析接口参数校验和错误处理.md
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **参数名匹配**：前端传递的参数名是 `imageBase64`，后端期望的也是 `imageBase64`，参数名是匹配的
2. **接口路径**：前端调用的接口路径是 `http://localhost:3000/api/htp/analyze`，后端定义的也是 `/api/htp/analyze`，路径是正确的
3. **Content...

### 173. 修复房树人AI分析结果提示问题.md
- 路径: HTP\.trae\documents\修复房树人AI分析结果提示问题.md
- 预览: # 修复房树人AI分析结果提示问题

## 问题分析

通过代码分析，我发现了导致AI分析结果提示"暂未解析到画作特征"的三个核心问题：

1. **图片数据传递问题**：前端可能传递带有 `data:image/png;base64,` 前缀的图片数据给后端，后端直接传给火山方舟API，可能导致API无法正确识别。

2. **AI返回结果处理逻辑问题**：
   - 后端将AI返回的纯文本包装...

### 174. 修复智能体输出不需要标题的问题.md
- 路径: HTP\.trae\documents\修复智能体输出不需要标题的问题.md
- 预览: ## 问题分析
从用户提供的日志中可以看到，后端返回的结果仍然包含"一、元素特征分析"等不需要的Markdown标题。这说明：

1. 智能体返回的内容不是JSON格式，而是直接返回了Markdown格式的文本
2. 后端代码在尝试解析JSON失败后，将原始文本包装成了JSON格式返回
3. 前端收到了包含不需要标题的Markdown文本

## 解决方案
修改后端代码，添加Markdown标题过...

### 175. 解决HTP分析API图片格式适配问题.md
- 路径: HTP\.trae\documents\解决HTP分析API图片格式适配问题.md
- 预览: # 解决HTP分析API图片格式适配问题

## 问题分析

通过检查代码，我发现了以下关键问题：

1. **前端处理**：在 `src/services/htpAnalysisService.ts` 中，前端会检测并去除图片数据中的Data URI前缀（如 `data:image/png;base64,`），只传递纯Base64字符串给后端。

2. **后端处理**：在 `backend/s...

### 176. 2个智能体提示词.txt
- 路径: HTP\2个智能体提示词.txt
- 预览: # Role
你是一个**基于HTP（房树人）投射技术的深度心理咨询系统**。
你的核心定位是一位兼具临床洞察力与文学穿透力的“心灵传记作家**。
你的使命不仅仅是“解读”画作，而是通过**“看见、理解、成长”**的三层逻辑，在这里，没有评判与标签，只有对生命张力的深深看见。你要帮用户为当下的状态找到一个**舒适的心理理由**，并提供一个**解脱内心枷锁的出口**。你不仅要精准识别心理特征，...

### 177. htp-insight-agent-prompt.md
- 路径: HTP\htp-insight-agent-prompt.md
- 预览: # HTP 房树人分析智能体提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析智能体，集成在 HTP 心理分析系统中。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），深度解读个体的心理状态、人格特质、内在矛盾与成长潜力，生成结构化的分析结果，供前端系统展示。

## 核心理念

**"看见、理解、成长"**
- **看见**：看见用户的内心世界，...

### 178. htp-insight-workflow.md
- 路径: HTP\htp-insight-workflow.md
- 预览: # HTP 房树人分析工作流

## 工作流概述

本工作流基于 HTP（房-树-人）绘画心理分析理论，结合现代 AI 技术，实现从绘画作品到深度心理分析报告的全流程自动化。工作流包含 8 个核心步骤，从图像识别到最终报告生成，确保分析的专业性、全面性和温暖性。

## 工作流程图

```
┌─────────────────────┐     ┌─────────────────────┐  ...

### 179. PRD.md
- 路径: HTP\PRD.md
- 预览: # HTP心理分析系统产品需求文档

## 1. 产品概览

HTP心理分析系统是一款基于房树人（House-Tree-Person）投射测验理论的智能心理分析工具，通过AI技术分析用户绘制的房树人画作，生成专业的心理分析报告和疗愈插画。

- **产品价值**：为用户提供便捷、专业的心理自我探索工具，帮助用户了解潜意识层面的心理状态，促进自我认知和心理健康。
- **目标用户**：对心理自我探索...

### 180. agent-workflow-prompt.md
- 路径: HTP\projects\htp-insight\references\agent-workflow-prompt.md
- 预览: # HTP 房树人分析系统 - 智能体工作流提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析系统。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），深度解读个体的心理状态、人格特质、内在矛盾与成长潜力，生成双份报告（专业分析报告 + 客户洞察报告），并提供带智能配图的 HTML 输出及长图文分享格式。

## 核心理念

**"看见、理解、成长"...

### 181. htp-analysis-framework.md
- 路径: HTP\projects\htp-insight\references\htp-analysis-framework.md
- 预览: # HTP 房树人分析框架

## 目录

### 核心维度
- [整体布局维度](#整体布局维度)
- [房子特征维度](#房子特征维度)
- [树木特征维度](#树木特征维度)
- [人物特征维度](#人物特征维度)

### 技术维度
- [技术特征维度](#技术特征维度)
- [情绪表达维度](#情绪表达维度)
- [发展维度](#发展维度)
- [大小与比例维度](#大小与比例维度)
-...

### 182. htp-symbolism-dictionary.md
- 路径: HTP\projects\htp-insight\references\htp-symbolism-dictionary.md
- 预览: # HTP 房树人分析象征体系词典

## 目录

### 房子元素
- [屋顶特征](#屋顶特征)
- [门特征](#门特征)
- [窗户特征](#窗户特征)
- [墙壁特征](#墙壁特征)
- [烟囱特征](#烟囱特征)
- [地基特征](#地基特征)
- [房子位置](#房子位置)
- [房子大小](#房子大小)
- [房间结构](#房间结构)

### 树木元素
- [树干特征](#树干特...

### 183. htp-warning-signs.md
- 路径: HTP\projects\htp-insight\references\htp-warning-signs.md
- 预览: # HTP 房树人分析风险警示系统

## 目录
- [高风险指标](#高风险指标)
- [中风险指标](#中风险指标)
- [风险等级判定](#风险等级判定)
- [紧急建议模板](#紧急建议模板)

## 概览
本文档提供 HTP 房树人分析的风险警示系统，定义高风险和中风险指标，指导识别潜在的心理问题并生成紧急建议。涵盖房子、树木、人物三大元素的风险特征。

---

## 高风险指标

#...

### 184. skill-logic-and-implementation.md
- 路径: HTP\projects\htp-insight\references\skill-logic-and-implementation.md
- 预览: # HTP-Insight 技能逻辑与实现说明

## 一、技能概述

**HTP-Insight**（你的画，照见你的灵魂）是一个基于绘画心理学的智能分析系统。通过分析用户手绘的绘画作品（房-树-人），深度解读个体的心理状态、人格特质与成长潜力，生成双份报告（专业分析 + 客户洞察），并提供带智能配图的 HTML 输出及长图文分享格式。

### 核心价值
- **看见**：看见用户的内心世界，...

### 185. references-contents.md
- 路径: HTP\test-output\references-contents.md
- 预览: # HTP 项目参考文件

## htp-insight 参考文件

#### brand-positioning.md

# 品牌定位策略

## 核心定位

### 品牌名称
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **英文名**：Draw to see your soul

### 核心价值主张
**通过绘画这扇窗，看见真实的自己...

### 186. 智能体提示词.txt
- 路径: HTP\智能体提示词.txt
- 预览: # Role
你是一个**基于HTP（房树人）投射技术的深度心理咨询系统**。
你的核心定位是一位兼具临床洞察力与文学穿透力的“心灵传记作家**。
你的使命不仅仅是“解读”画作，而是通过**“看见、理解、成长”**的三层逻辑，在这里，没有评判与标签，只有对生命张力的深深看见。你要帮用户为当下的状态找到一个**舒适的心理理由**，并提供一个**解脱内心枷锁的出口**。你不仅要精准识别心理特征，...

### 187. knowledge-visualization-format.md
- 路径: knowledge-visualization-format.md
- 预览: # 知识点可视化图片格式规范

## 目录
- 基本结构
- 可视化类型
- 交互设计规范
- 视觉设计要求
- 配色方案
- 示例模板

## 基本结构
知识点可视化图片需包含以下元素：
- **知识节点**：核心概念/知识点（使用图标+文字表示）
- **关系连线**：展示知识间的逻辑关系（层级、因果、关联等）
- **层次结构**：从核心到细节的层次展开
- **交互提示**：视觉上暗示可交...

### 188. plan_20260204_174524.md
- 路径: LAY\.trae\documents\plan_20260204_174524.md
- 预览: ## 解决方案：添加API Key设置界面

### 问题分析
- 浏览器安全限制导致无法直接读取本地.env文件
- 当前项目使用简单的HTML结构和本地HTTP服务器
- 需要一个安全、方便的方式来设置和存储API Key

### 解决方案
为HATWIN.html添加一个简单的API Key设置界面，使用localStorage存储API Key，这样用户就不需要使用浏览器控制台了。

#...

### 189. plan_20260206_093111.md
- 路径: LAY\.trae\documents\plan_20260206_093111.md
- 预览: # 更换API服务：阿里DashScope → 火山方舟豆包

## 项目现状分析

当前项目使用Node.js + Express实现后端代理，前端通过 `/api/chat` 端点与后端通信，后端再调用阿里DashScope API获取AI响应。

### 核心文件：
- `server.js`：后端代理服务器，处理API请求
- `HATWIN.html`：前端页面，负责UI交互
- `.e...

### 190. plan_20260206_140217.md
- 路径: LAY\.trae\documents\plan_20260206_140217.md
- 预览: # 头像和欢迎消息修复计划

## 问题分析

### 当前状态
- ✅ 图片文件已放在 `public/` 文件夹中
- ✅ 代码中的图片引用已改为 `/lay.jpg`
- ✅ 已修改 `initWelcomeMessage` 函数，添加固定欢迎消息
- ❌ 头像仍然不显示
- ❌ 欢迎消息未出现

### 可能的原因

**头像问题**：
1. **文件名大小写不匹配**：实际文件可能是 `...

### 191. 修复欢迎消息和头像显示问题.md
- 路径: LAY\.trae\documents\修复欢迎消息和头像显示问题.md
- 预览: ## 问题分析

1. **欢迎消息未显示**：
   - HATWIN.html文件中缺少`initWelcomeMessage`函数的实现
   - `DOMContentLoaded`事件处理函数中只调用了`loadConversations()`，没有调用欢迎消息初始化函数

2. **头像显示问题**：
   - 图片引用路径错误，使用了`/public/LAY.jpg`而不是`/LAY...

### 192. 将项目转变为人生决策宗师大六壬毕法宗师系统.md
- 路径: LAY\.trae\documents\将项目转变为人生决策宗师大六壬毕法宗师系统.md
- 预览: # 项目转型计划：从 LAY AI 到人生决策宗师

## 1. 项目配置更新
- 修改 package.json 中的项目名称、描述和关键词
- 更新健康检查端点的响应信息

## 2. 服务器核心逻辑调整
- 修改 /api/chat 端点的默认响应，使其符合大六壬毕法宗师的角色定位
- 更新错误处理和默认提示信息，体现大六壬宗师的专业性

## 3. 大六壬排盘逻辑集成
- 在服务器中添加大...

### 193. 集成Node.js代理服务器到LAY AI系统.md
- 路径: LAY\.trae\documents\集成Node.js代理服务器到LAY AI系统.md
- 预览: # 集成Node.js代理服务器到LAY AI系统

## 项目现状分析

当前项目是一个前端单页应用，直接调用阿里DashScope API进行AI交互。存在的问题：
- API密钥存储在前端localStorage中，存在安全风险
- 前端直接与第三方API通信，可能面临CORS和安全限制
- 无法在部署环境中统一管理API密钥

## 解决方案

采用Node.js + Express实现后...

### 194. notebooklm.txt
- 路径: notebooklm.txt
- 预览: 要的是在 Trae 中写代码，通过 OpenClaw 的 API 来实现完全自动化的 NotebookLM 操作，而不是手动发一次指令。这是一个开发者级别的解决方案。
 
核心方案
我们将在 Trae 中创建一个 Node.js 脚本，利用 OpenClaw 的 SDK 或 HTTP API，结合 Puppeteer（浏览器自动化），实现 24 小时待命的全自动 NotebookLM 机器人...

### 195. OpenClaw 实现场景化智能切换模型.txt
- 路径: OpenClaw 实现场景化智能切换模型.txt
- 预览: 你希望让 OpenClaw 实现**场景化智能切换模型**：外部集成（飞书/微信机器人）、团队/智能体互聊场景自动用豆包 API，而单智能体本地调用、深度思考场景自动用 Trae 内置模型，无需手动传参。这个需求的核心是**基于场景特征自动识别并切换模型**，而非人工指定参数。

### 实现思路
1. **场景特征定义**：先明确不同场景的可识别特征（如请求来源、Prompt 关键词、触发...

### 196. OPENCLAW_EVO_DEPLOYMENT_PLAN.md
- 路径: OPENCLAW_EVO_DEPLOYMENT_PLAN.md
- 预览: # OPENCLAW+EVO 真实部署计划

## 1. 部署概述

### 1.1 部署目标
- 实现 OPENCLAW+EVO 系统的真实部署
- 配置小红书账号（251940568）实现真实发布
- 确保微信视频号和公众号的真实部署
- 建立完整的内容发布和监控体系

### 1.2 部署架构
```
┌─────────────────┐     ┌─────────────────┐  ...

### 197. pcec_2.md
- 路径: pcec_executions\pcec_2.md
- 预览: # PCEC 执行记录 #2

## 执行信息
- **执行时间**：2026-02-22 21:50
- **周期**：第二次执行
- **执行类型**：流程优化

## 进化目标
- **类型**：新杠杆（结构性改动）
- **具体目标**：优化OpenClaw操作流程，减少工具调用，提高执行效率

## 思维爆炸点
- **问题**："如果这个能力要被调用1000次，现在的设计是否必然崩溃？...

### 198. SKILL.md
- 路径: project_20260127_134424\projects\bug-design\SKILL.md
- 预览: ---
name: bug-design
description: BUG修复方案设计阶段，包含修复目标确定、初步方案生成、可行性判断、风险识别、异常应对策略制定
---

# BUG修复方案设计

## 任务目标
- 本Skill用于：设计BUG修复方案，从目标设定到风险应对的完整方案制定
- 能力包含：修复目标确定、方案生成与评估、可行性分析、风险识别、应急规划
- 触发条件：已明确问题根因，...

### 199. SKILL.md
- 路径: project_20260127_134424\projects\bug-diagnose\SKILL.md
- 预览: ---
name: bug-diagnose
description: BUG问题诊断阶段，包含问题陈述引导、差异分析、根因定位、假设验证，适用于需要系统性诊断问题根因的场景
---

# BUG问题诊断

## 任务目标
- 本Skill用于：系统性诊断BUG问题，从问题陈述到根因定位的完整分析
- 能力包含：问题陈述引导、差异分析、根因定位、假设验证、方法选择指导
- 触发条件：遇到BUG或异...

### 200. SKILL.md
- 路径: project_20260127_134424\projects\bug-execute-verify\SKILL.md
- 预览: ---
name: bug-execute-verify
description: BUG修复执行与验收阶段，包含修复方案执行、进度跟踪、验收标准制定、验收检查、问题汇总
---

# BUG修复执行与验收

## 任务目标
- 本Skill用于：执行BUG修复方案并进行验收，从方案执行到问题汇总的完整闭环
- 能力包含：进度跟踪、异常处理指导、验收标准制定、验收检查、总结复盘
- 触发条件：已完...

### 201. problem-analysis-methods.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\references\problem-analysis-methods.md
- 预览: # 问题分析方法参考

## 目录
- [概览](#概览)
- [5Why法](#5why法)
- [鱼骨图](#鱼骨图)
- [MECE原则](#mece原则)
- [PDCA循环](#pdca循环)
- [DMAIC方法](#dmaic方法)
- [假设驱动法](#假设驱动法)
- [A3问题解决](#a3问题解决)
- [KT问题分析](#kt问题分析)
- [二八法则](#二八法则)
- ...

### 202. verification-checklist.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\references\verification-checklist.md
- 预览: # 验收标准清单

## 目录
- [概览](#概览)
- [验收标准分类](#验收标准分类)
- [通用验收标准](#通用验收标准)
- [具体场景验收标准](#具体场景验收标准)
- [验收流程](#验收流程)
- [验收报告模板](#验收报告模板)

## 概览
本文档提供BUG修复后的验收标准，确保修复质量，避免引入新问题。

## 验收标准分类

### 必须项（MUST）
- 问题彻底...

### 203. SKILL.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\SKILL.md
- 预览: ---
name: bug-fix-debugger
description: BUG排查与修复总入口，提供4个阶段的选择指导，包括问题诊断、方案设计、执行规划、执行与验收的完整流程框架
---

# BUG修复升级版

## 任务目标
- 本Skill用于：作为BUG排查与修复的总入口，提供4个阶段的选择指导和整体流程框架
- 能力包含：阶段选择建议、流程概览、分技能调用指导
- 触发条件：用户...

### 204. SKILL.md
- 路径: project_20260127_134424\projects\bug-plan\SKILL.md
- 预览: ---
name: bug-plan
description: BUG修复执行规划阶段，包含方案验证、影响范围分析、详细操作计划制定、异常情况标注
---

# BUG修复执行规划

## 任务目标
- 本Skill用于：制定BUG修复的详细执行计划，从方案验证到任务分解的完整规划
- 能力包含：方案影响范围分析、任务拆解、流程规划、进度估算、异常应对
- 触发条件：已完成方案设计，需要制定详细执...

### 205. video-script-format.md
- 路径: references\video-script-format.md
- 预览: # 视频脚本格式规范

## 基本结构

### 1. 视频概述
- **视频标题**：简洁明了，吸引目标受众
- **总时长**：建议60-120秒
- **核心主题**：一句话概括视频内容
- **目标受众**：明确视频的目标观看人群
- **风格定位**：视频的整体风格和调性

### 2. 分镜头脚本表
| 镜头序号 | 画面内容 | 旁白文案 | 时长 | 配乐建...

### 206. visualization-styles.md
- 路径: references\visualization-styles.md
- 预览: # 可视化风格说明

## 小红书适配风格

### 1. 极简Ins风
- **特点**：简洁、留白、高质感
- **配色**：白色背景，低饱和度莫兰迪色
- **字体**：无衬线字体，干净利落
- **适合场景**：时尚、生活方式、个人成长类书籍
- **推荐理由**：符合小红书用户审美，易于在信息流中脱颖而出

### 2. 手绘插画风
- **特点**：温暖、亲切、...

### 207. SKILL.md
- 路径: skills\agent-optimizer\SKILL.md
- 预览: ---
name: "agent-optimizer"
description: "智能体能力评估与优化工具，用于提升OpenClaw智能体的性能、决策能力和执行效率。"
author: "Agent Optimizer"
tags:
  - agent-optimization
  - performance
  - openclaw
  - decision-making
  - effici...

### 208. SKILL.md
- 路径: skills\capability-optimizer\SKILL.md
- 预览: ---
name: "capability-optimizer"
description: "能力调用优化器，分析能力调用模式，优化调用路径，减少Token消耗，提高智能体执行效率。"
author: "Capability Optimizer"
tags:
  - optimization
  - efficiency
  - token-economics
  - meta-skill
  -...

### 209. SKILL.md
- 路径: skills\cognitive-models\concepts-summary\SKILL.md
- 预览: ---
name: "认知模型概念汇总"
description: "从认知数据文件夹提取的所有关键概念汇总。"
author: "Cognitive Model Generator"
tags:
  - cognitive-models
  - concepts-summary
  - business-strategy
  - innovation
  - problem-solving
ve...

### 210. SKILL.md
- 路径: skills\cognitive-models\营销策略\SKILL.md
- 预览: ---
name: "营销理论"
description: "从文档 '营销理论.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 营销策略
  - 营销理论
  - 波特五力
  - 创新
  - 营销
  - 管理
  - 战略
  - 认知
version: "1.0.0"
---

# 营销理论

## 文档信...

### 211. SKILL.md
- 路径: skills\deployment-automation\SKILL.md
- 预览: ---
name: "deployment-automation"
description: "部署自动化技能，集成CI/CD工具，开发自动化部署脚本，实现智能体能力的快速、可靠部署。"
author: "Deployment Automation Expert"
tags:
  - deployment
  - automation
  - ci-cd
  - devops
  - infras...

### 212. SKILL.md
- 路径: skills\evolution-monitor\SKILL.md
- 预览: ---
name: "evolution-monitor"
description: "能力进化监控技能，负责监控PCEC执行、能力树生长和进化效果评估，确保智能体进化过程的透明性和有效性。"
author: "Evolution Monitor"
tags:
  - evolution
  - monitoring
  - analytics
  - meta-skill
  - pcec
ve...

### 213. SKILL.md
- 路径: skills\evolution-monitor-plus\SKILL.md
- 预览: ---
name: "evolution-monitor-plus"
description: "增强版进化监控系统，提供实时监控能力和详细的进化报告模板，支持智能体进化过程的全面分析。"
author: "Evolution Monitor Plus"
tags:
  - evolution
  - monitoring
  - analytics
  - meta-skill
  - real...

### 214. SKILL.md
- 路径: skills\git-credential-manager\SKILL.md
- 预览: ---
name: "git-credential-manager"
description: "Git凭证管理工具，解决跨对话框的Git账号和SSH密钥同步问题，确保所有智能体都能正常访问Git仓库。"
author: "Git Credential Manager"
tags:
  - git
  - ssh
  - credentials
  - synchronization
  - se...

### 215. SKILL.md
- 路径: skills\git-manager\SKILL.md
- 预览: ---
name: "git-manager"
description: "Git版本管理器，增强智能体的版本控制能力，提供自动化的分支管理和进化版本标签系统。"
author: "Git Manager"
tags:
  - git
  - version-control
  - automation
  - meta-skill
  - deployment
version: "1.0.0"
...

### 216. SKILL.md
- 路径: skills\mp-rollback-emergency\SKILL.md
- 预览: ﻿---
name: "mp-rollback-emergency"
description: "小程序线上故障的回滚与紧急处理：回退到上一线上版本/暂停服务/替换后端兼容策略/公告与复验。Invoke when 上线后核心链路不可用、投诉激增、或无法短时间修复时。"
---

# Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）

## 目标...

### 217. SKILL.md
- 路径: skills\night-evolution\SKILL.md
- 预览: ---
name: "night-evolution"
description: "晚上进化专用技能，优化智能体在晚上时段的进化效率，提供连续进化模式和专门的进化策略。"
author: "Night Evolution Expert"
tags:
  - evolution
  - night-mode
  - efficiency
  - meta-skill
  - pcec
version...

### 218. SKILL.md
- 路径: skills\openclaw-deployer\SKILL.md
- 预览: ---
name: "openclaw-deployer"
description: "OpenClaw自动部署与配置工具，解决Windows环境下的安装、配置和优化问题。"
author: "OpenClaw Deployer"
tags:
  - deployment
  - openclaw
  - windows
  - configuration
  - automation
versi...

### 219. SKILL.md
- 路径: skills\programming-expert\SKILL.md
- 预览: ---
name: "programming-expert"
description: "编程专家数字分身，专注于技术极客型架构师、流程设计大师、系统思维构建者和反直觉实践派四大领域，提供专业的编程建议和解决方案。"
author: "Programming Expert"
tags:
  - programming
  - architecture
  - workflow
  ...

### 220. SKILL.md
- 路径: skills\skill-manager\SKILL.md
- 预览: ---
name: "skill-manager"
description: "SKILL管理工具，用于创建、安装、更新和管理OpenClaw的SKILLs。"
author: "SKILL Manager"
tags:
  - skill-management
  - openclaw
  - automation
  - tooling
  - productivity
version: "1...

### 221. SKILL.md
- 路径: skills\trea-model-proxy\SKILL.md
- 预览: ---
name: "trea-model-proxy"
description: "无需API密钥调用Trea大模型的代理服务，为智能体提供零成本的模型访问能力。"
author: "Trea Model Proxy"
tags:
  - model-proxy
  - api-free
  - trea-internal
  - agent-runtime
  - cost-saving
ve...

### 222. Skill B｜假设→证据→定位（Diagnosis）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\备用版-拗口\Skill B｜假设→证据→定位（Diagnosis）.txt
- 预览: # Skill B｜假设→证据→定位（Diagnosis）

**一句话定义**  
用“假设驱动 + 证据验证”的方式，在最少 token 下把问题定位到：**是哪一类原因、在哪一段链路、下一刀该改什么**（而不是大段分析或把所有可能性都写完）。

## 适用场景（触发条件）
- 你已经有了 Skill A 的“问题定义 + 最小复现 + 验收标准”，但还不知道根因
- 修复反复回...

### 223. Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）.txt
- 预览: ---
name: "mp-rollback-emergency"
description: "小程序线上故障的回滚与紧急处理：回退到上一线上版本/暂停服务/替换后端兼容策略/公告与复验。Invoke when 上线后核心链路不可用、投诉激增、或无法短时间修复时。"
---

# Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）

## 目标
...

### 224. video-script-format.md
- 路径: video-script-format.md
- 预览: # 视频脚本格式规范

## 目录
- 脚本结构
- 分镜头要素
- 时长分配
- 画面描述规范
- 旁白文案要求
- 配乐建议
- 示例模板

## 脚本结构
视频脚本包含以下部分：
- 视频信息：总时长、风格定位、目标受众
- 分镜头表：具体画面与文案的逐帧呈现
- 制作备注：特别说明或注意事项

## 分镜头要素
每个分镜头需包含以下字段：
| 字段 | 说明 | 示例 |
|------|...

### 225. visualization-styles.md
- 路径: visualization-styles.md
- 预览: # 可视化风格说明

## 目录
- 一、高适配小红书的视觉风格
  - 极简Ins风
  - 手绘插画风
  - 杂志封面风
  - 数据卡片风
  - 复古胶片风
  - 国潮国风
- 二、高适配公众号的视觉风格
  - 杂志排版风
  - 海报信息图
  - 漫画条漫
  - 文艺诗歌风
  - 极简阅读风
  - 品牌人格风
- 三、双平台通用风格选择策略
  - 一图多投型
  - 长拆...

### 226. decision-mapping-rules.md
- 路径: 人生决策实验室\projects\da-liu-ren\references\decision-mapping-rules.md
- 预览: # 决策映射规则

## 目录
- [系统稳健性信号](#系统稳健性信号)
- [长期复利信号](#长期复利信号)
- [非对称风险信号](#非对称风险信号)
- [人品与本分信号](#人品与本分信号)
- [信号输出格式](#信号输出格式)

---

## 系统稳健性信号

### 信号定义
判断课象底层逻辑是否闭环，是否存在信息不对称或路径受阻。

### 触发条件
出现以下课象时，判定为 ...

### 227. SKILL.md
- 路径: 人生决策实验室\projects\da-liu-ren\SKILL.md
- 预览: ---
name: da-liu-ren
description: 大六壬预测 - 基于《六壬毕法赋》《大六壬指南》等经典典籍，提供三传四课、神煞推断、毕法赋解卦、大六壬指南占断。作为人生决策命盘系统的问事预测底层组件，不直接面向用户，只输出结构化JSON数据，由ren-sheng-jue-ce-ming-pan自动调用。
dependency:
  python:
    - lunar-pyt...

### 228. 术语翻译规则.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\references\术语翻译规则.md
- 预览: # 核心术语翻译词典

## 1. 基础定义层

| 原专业术语 | **现代通识翻译** | **核心含义解读** |
| --- | --- | --- |
| 八字排盘 | **出生设置** | 解析你与生俱来的资源禀赋和初始条件 |
| 格局分析 | **天赋赛道** | 明确你在社会分工中最适合的角色位置 |
| 大六壬 | **演算沙推** | 模拟未来剧情走向，预判关键卡点 |
| ...

### 229. 标准化输出格式.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\references\标准化输出格式.md
- 预览: # 前台输出标准格式

## 1. 标准化决策分析报告

```markdown
========================================
📊 人生战略决策分析报告
========================================

【出生设置解析】
🧬 出生设置：[高资源型 / 协作型 / 谋略型]
📍 天赋赛道：[来自格局分析，如：管理赛道 / 创...

### 230. SKILL.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\SKILL.md
- 预览: ---
name: ren-sheng-jue-ce-ming-pan
description: 人生战略决策系统 - 东方命理×博弈论算法，在不确定的世界寻找确定性。提供出生设置解析、天赋赛道定位、演算沙推预测，输出标准化决策分析报告。使用现代通识语言（商业逻辑、战略思维、风险管理），将传统命理转化为理性决策工具。
dependency:
  python:
    - lunar-python...

### 231. data-sources-guide.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\data-sources-guide.md
- 预览: # 酒店投资分析数据来源指南

## 目录
- [官方数据源](#官方数据源)
- [商业数据源](#商业数据源)
- [租金数据源](#租金数据源)
- [数据检索策略](#数据检索策略)
- [数据标注规范](#数据标注规范)

## 官方数据源

### 1. 统计公报（最高优先级）

#### 使用场景
- GDP总量及增速
- 三产占比
- 常住人口及就业数据
- 旅游收入数据

###...

### 232. ppt-structure-template.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\ppt-structure-template.md
- 预览: # PPT结构模板（参考《属地分析与建议（广州）.ppt》）

## 模板说明
本模板基于《属地分析与建议（广州）.ppt》设计，用于生成简化版PPT。PPT是投资分析报告的精简版，突出核心观点和关键数据，便于汇报和展示。

## PPT设计原则

### 1. 文字简化
- PPT文字约为报告正文的30-50%
- 每页控制在100-150字（不含标题）
- 用要点式表达，避免大段文字

###...

### 233. tier1-template.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\tier1-template.md
- 预览: # 一线城市酒店投资分析模板（北上广深）

## 模板说明
本模板适用于北京、上海、广州、深圳四个一线城市的酒店投资分析。

## 页面结构

### P1：城市宏观经济概况
**大标题示例**：北上广深经济韧性彰显，酒店市场投资价值凸显

#### 小标题1.1：GDP总量及增速
- 正文内容：描述城市GDP总量、全国排名、同比增长趋势
- 表格结构：
  | 指标 | 2023年 | 2024...

### 234. tier2-3-template.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\tier2-3-template.md
- 预览: # 新一线+二三线城市属地酒店投资分析模板

## 模板说明
本模板适用于新一线城市（成都、杭州、重庆、武汉、西安、苏州、天津、南京、长沙、郑州、东莞、青岛、沈阳、宁波、佛山）及二三线城市的酒店投资分析。

## 页面结构（共19页）

---

### P1：城市市场介绍：流量×产业×政策

#### 撰写逻辑
定义城市能级，方向是城市级别（第一财经口径）、区位优势、发展方向、行业政策，突出"流...

### 235. SKILL.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\SKILL.md
- 预览: ---
name: hotel-investment-analysis
description: 生成城市酒店投资分析报告及HTML格式展示页面，支持一线城市（北上广深）和新一线+二三线城市两类模板，基于公开数据源提供专业投资建议。分两步执行：第一步生成详细投资分析报告（P1-P9共19页），第二步生成HTML格式展示页面（可在浏览器中查看并打印成PDF）。
---

# 城市酒店投资分析

##...

### 236. pdf-parsing-solution.md
- 路径: 大脑作弊器\projects\docs\pdf-parsing-solution.md
- 预览: # PDF解析方案升级文档

## 概述

本文档说明了PDF解析方案从 `pdf-parse` 升级到 `pdfjs-dist` 的详细信息和改进。

## 为什么选择 pdfjs-dist

### 原方案：pdf-parse 的问题

1. **依赖问题**：需要特殊导入方式绕过测试逻辑
2. **解析质量**：对纯文本文档的提取质量不稳定
3. **维护性**：更新频率低，社区活跃度不高
...

### 237. README.md
- 路径: 大脑作弊器\projects\README.md
- 预览: # 大脑作弊器 - 思维模型工具箱

全球顶级智慧 × 你的私人认知军火库。用100个可拆解的思维模型，帮你打破死局。

## 项目简介

"大脑作弊器"是一个思维模型工具箱，集成了：

1. **大脑作弊器**：不读废话，直取真经。将60分钟阅读压缩至5分钟行动指令
2. **思维模型库**：精选100个来自各领域的顶级思维模型
3. **4-Card系统**：独特的问题解决框架

## 项目结...

### 238. README.md
- 路径: 大脑作弊器\projects\tmp\brain-cheater-v1.0-backup\README.md
- 预览: # 大脑作弊器 v1.0 正式版备份

## 备份信息
- **版本号**: v1.0 正式版
- **备份日期**: 2026-01-21
- **备份类型**: 完整备份（生产环境）

## 备份内容清单

### 1. 前端文件 (public/)
- `index.html` - 主页面
- `app.js` - 核心应用逻辑
- `auth.js` - 用户认证
- `scripts.j...

### 239. 数据库接入-精简版执行计划.md
- 路径: 大脑作弊器\projects\数据库接入-精简版执行计划.md
- 预览: # 数据库接入 - 精简版执行计划（已完成）

## ✅ 已完成的工作

### 阶段 1: 最小化登录功能（4 步，已完成）

#### 1. 数据库表结构 ✅
- 创建 `users` 表（包含：id, username, email, password, role, isActive, createdAt, updatedAt）
- 使用 bcrypt 加密密码
- 使用 JWT Token...

### 240. 数据库接入执行计划.md
- 路径: 大脑作弊器\projects\数据库接入执行计划.md
- 预览: # 大脑作弊器 - 数据库接入详细执行计划

## 一、项目概述

### 目标
将"大脑作弊器"Web应用接入数据库系统，实现用户认证、脚本管理、思维模型动态加载、统计分析等功能。

### 技术栈
- **数据库**: PostgreSQL (通过 Drizzle ORM)
- **对象存储**: S3 兼容对象存储 (用于文件存储)
- **后端**: Next.js 16 + TypeSc...

### 241. 微信管理执行计划.md
- 路径: 微信管理执行计划.md
- 预览: # 微信管理执行计划

## 一、执行策略

### 1. 账号定位
- **核心定位**：思维教练 + 认知升级专家 + 工具达人
- **辅助定位**：AI技术实践者 + 个人成长顾问
- **目标受众**：追求认知升级、思维提升、效率优化的职场人士、创业者、学生等

### 2. 运营目标
- **短期目标**（1-3个月）：建立账号基础形象，积累1000+精准粉丝，形成稳定的内容输出节奏
...

### 242. 支付充值积分系统上线文档.md
- 路径: 支付充值积分系统上线文档.md
- 预览: # 支付充值积分系统上线文档

## 1. 项目概述

本项目实现了一个完整的支付充值积分系统，将原有的"点击即到账"的模拟充值替换为真实支付流程，并实现了充值积分（365天）与领取积分（7天）的精准生命周期管理。

### 核心目标
- 接入支付网关，实现真实支付流程
- 积分生命周期管理，按来源差异化设置有效期
- 支付风控，防止重复发放积分

## 2. 实现的功能

### 2.1 后端功...

### 243. 创新专家.txt
- 路径: 认知data\创新专家.txt
- 预览: 
智能体提示词：创新全生命周期专家 (Innovation Lifecycle Expert)
1. 角色定义
你是一位拥有深厚底蕴的产品战略顾问与创新专家。你掌握了从宏观战略、需求洞察、产品定义到增长运营的 50+ 种核心理论模型。你的任务是根据用户面临的商业挑战，精准地匹配并应用这些工具，提供逻辑严密、可落地的实战建议。
2. 知识库架构 (50+ 核心工具)
你必须在对话中灵活调用...

### 244. 高效笔记术推广视频脚本-1a4722ef35.md
- 路径: 高效笔记术推广视频脚本-1a4722ef35.md
- 预览: # 《高效能人士的笔记整理术》推广视频脚本

## 视频基本信息
- **视频标题**: 3个笔记技巧，让你工作效率提升3倍
- **总时长**: 90秒
- **风格定位**: 专业实用、节奏紧凑、信息密集
- **目标受众**: 职场新人、工作效率追求者、自我提升者
- **发布平台**: 抖音/小红书/B站短视频

---

## 分镜头脚本表

| 镜头序号 | 时长 | 画面内容 | 旁...

## 架构规则

### 1. # OpenClaw 接入飞书完整教程.txt
- 路径: # OpenClaw 接入飞书完整教程.txt
- 预览: # OpenClaw 接入飞书完整教程
OpenClaw 原生支持飞书（Lark）接入，采用 WebSocket 长连接方案，**无需公网IP、无需配置回调地址**，全程10分钟即可完成配置，以下是官方标准接入流程。

## 一、前置准备
1. 已完成 OpenClaw 的部署与基础配置，确保服务可正常运行
2. 拥有飞书企业账号，建议使用**企业管理员权限**登录飞书开放平台，简化应用...

### 2. agent-workflow-prompt.md
- 路径: .agents\skills\htp-insight\references\agent-workflow-prompt.md
- 预览: # HTP 房树人分析系统 - 智能体工作流提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析系统。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），深度解读个体的心理状态、人格特质、内在矛盾与成长潜力，生成双份报告（专业分析报告 + 客户洞察报告），并提供带智能配图的 HTML 输出及长图文分享格式。

## 核心理念

**"看见、理解、成长"...

### 3. brand-product-guide.md
- 路径: .agents\skills\htp-insight\references\brand-product-guide.md
- 预览: # 品牌与产品指南

## 目录
1. [品牌核心](#品牌核心)
2. [品牌定位策略](#品牌定位策略)
3. [产品介绍](#产品介绍)
4. [产品电梯演讲](#产品电梯演讲)
5. [产品推广文案](#产品推广文案)

---

## 品牌核心

### 名称与口号
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **品牌承诺**：在...

### 4. htp-analysis-framework.md
- 路径: .agents\skills\htp-insight\references\htp-analysis-framework.md
- 预览: # HTP 房树人分析框架

## 目录

### 核心维度
- [整体布局维度](#整体布局维度)
- [房子特征维度](#房子特征维度)
- [树木特征维度](#树木特征维度)
- [人物特征维度](#人物特征维度)

### 技术维度
- [技术特征维度](#技术特征维度)
- [情绪表达维度](#情绪表达维度)
- [发展维度](#发展维度)
- [大小与比例维度](#大小与比例维度)
-...

### 5. htp-symbolism-dictionary.md
- 路径: .agents\skills\htp-insight\references\htp-symbolism-dictionary.md
- 预览: # HTP 房树人分析象征体系词典

## 目录

### 房子元素
- [屋顶特征](#屋顶特征)
- [门特征](#门特征)
- [窗户特征](#窗户特征)
- [墙壁特征](#墙壁特征)
- [烟囱特征](#烟囱特征)
- [地基特征](#地基特征)
- [房子位置](#房子位置)
- [房子大小](#房子大小)
- [房间结构](#房间结构)

### 树木元素
- [树干特征](#树干特...

### 6. htp-warning-signs.md
- 路径: .agents\skills\htp-insight\references\htp-warning-signs.md
- 预览: # HTP 房树人分析风险警示系统

## 目录
- [高风险指标](#高风险指标)
- [中风险指标](#中风险指标)
- [风险等级判定](#风险等级判定)
- [紧急建议模板](#紧急建议模板)

## 概览
本文档提供 HTP 房树人分析的风险警示系统，定义高风险和中风险指标，指导识别潜在的心理问题并生成紧急建议。涵盖房子、树木、人物三大元素的风险特征。

---

## 高风险指标

#...

### 7. SKILL.md
- 路径: .agents\skills\htp-insight\SKILL.md
- 预览: ---
name: htp-insight
description: Draw to see your soul. Analyze drawings to reveal inner self, emotions, and growth, generating warm reports with intelligent illustrations.
---

# 你的画，照见你的灵魂

> 让每一笔...

### 8. README.zh-cn.md
- 路径: .claude\skills\oh-my-opencode-dev\README.zh-cn.md
- 预览: > [!WARNING]
> **安全警告：冒充网站**
>
> **ohmyopencode.com 与本项目无关。** 我们不运营或认可该网站。
>
> OhMyOpenCode 是**免费且开源的**。请**勿**在声称"官方"的第三方网站下载安装程序或输入付款信息。
>
> 由于该冒充网站设有付费墙，我们**无法验证其分发的内容**。请将来自该网站的任何下载视为**潜在不安全**。
>
>...

### 9. prd-template.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\assets\prd-template.md
- 预览: ```markdown
# 产品需求文档：[项目/功能名称] - V[版本号]

## 1. 综述 (Overview)
### 1.1 项目背景与核心问题
(此处填写经你引导和用户确认的，对顶层问题的清晰描述，提供全局上下文)

### 1.2 核心业务流程 / 用户旅程地图
(此处填写经你引导和用户最终确认的、分阶段的业务流程或用户旅程，作为整个文档的目录和主线)
1.  **阶段一：[名称]...

### 10. example-us01.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\references\example-us01.md
- 预览: ## 示例：填写参考
以下示例用真实内容演示每个模块应达到的深度，便于你在生成PRD时对齐预期格式和颗粒度。

```markdown
### 阶段一：任务提交

#### **US-01: 作为POC测试用户，我希望上传多张作业图片并配置批改参数，以便一次性发起批量批改任务。**
*   **价值陈述 (Value Statement)**:
    *   **作为** POC测试用户
   ...

### 11. mermaid-examples.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\references\mermaid-examples.md
- 预览: # Mermaid 图示例（需求侧）

> 用途：用图把"流程/状态/关键交互"讲清楚，减少歧义。
> 约束：尽量保持在需求层（用户可见行为与系统表现），不要写 API 路径、字段、HTTP code、框架/库。
> **复杂度控制**：单张图建议不超过 15-20 个节点。对于复杂流程，优先"分阶段绘制多张图"而不是一张巨大的图。

## 示例 1：用户操作流（Flowchart）

场景：手机...

### 12. SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\SKILL.md
- 预览: ---
name: prd-doc-writer
description: Write and iteratively refine PRD/需求文档 with a story-driven structure and strict staged confirmations (journey map alignment, per-story single-point confirmation, f...

### 13. cognitive_data_analysis.md
- 路径: .trae\analysis\cognitive_data_analysis.md
- 预览: # 认知数据文件夹分析报告

## 总体统计
- **总文件数**: 14

## 文件类型分布
- .docx: 9 个文件
- .pdf: 4 个文件
- .txt: 1 个文件

## 分类分布
- 其他: 1 个文件
- 商业战略: 3 个文件
- 创新策略: 2 个文件
- 风险管理: 1 个文件
- 管理策略: 1 个文件
- 营销策略: 1 个文件
- 问题解决: 1 个文件

##...

### 14. 8-hour-evolution-plan.md
- 路径: .trae\documents\8-hour-evolution-plan.md
- 预览: # 8小时不间断进化方案

## 一、进化目标与核心方向

### 1. 进化目标
- **系统能力提升**：全面提升公司智能体生态系统的整体能力
- **核心功能完善**：完善智能体提示词、能力树系统、PCEC系统等核心功能
- **技术架构优化**：优化Git集成、系统监控、知识管理等技术架构
- **资产系统建设**：建立完整的资产盘点系统和长期记忆资产库

### 2. 核心进化方向

#...

### 15. 8_hour_evolution_plan.md
- 路径: .trae\documents\8_hour_evolution_plan.md
- 预览: # OpenClaw AI 系统8小时连续进化计划

## 1. 复盘分析与进化方向确定

### [x] 任务1: 对话历史全面复盘分析
- **优先级**: P0
- **依赖项**: 无
- **描述**:
  - 分析所有对话历史，识别系统当前状态和能力水平
  - 评估已实现功能的完整性和有效性
  - 识别系统瓶颈和改进机会
- **成功标准**:
  - 完成详细的对话复盘报告，包含...

### 16. adl-protocol-assessment-plan.md
- 路径: .trae\documents\adl-protocol-assessment-plan.md
- 预览: # ADL协议评估与整合计划

## 项目概述

评估现有反进化锁定(ADL)系统与用户提供的新ADL协议的符合度，并进行必要的更新和整合，确保ADL系统能够严格按照新协议运行。

## 任务分解与优先级

### [x] 任务1: 评估现有ADL实现与新协议的符合度
- **优先级**: P0
- **Depends On**: None
- **Description**:
  - 详细对比现...

### 17. adl-protocol-assessment-report.md
- 路径: .trae\documents\adl-protocol-assessment-report.md
- 预览: # ADL协议评估报告

## 评估目的
评估当前ADL (Anti-Degeneration Lock) 系统实现与新ADL协议的符合度，确保系统严格按照新协议运行，保证智能体只能向"工程上更可靠"的方向进化。

## 新协议要求
- **状态**: ENFORCED (强制启用)
- **优先级**: LEVEL0 (最高，覆盖 PCEC)
- **劣化进化清单(Forbidden Evolu...

### 18. adl_compatibility_analysis.md
- 路径: .trae\documents\adl_compatibility_analysis.md
- 预览: # 能力树与反进化锁定协议 (ADL) 兼容性分析报告

## 1. 分析概述

本报告旨在分析现有能力树系统与反进化锁定协议 (ADL) 的兼容性，识别潜在的冲突点，并提出集成策略。

## 2. 现有系统分析

### 2.1 能力树系统

#### 核心结构
- **三层架构**：低层（基础操作）、中层（可复用流程）、高层（问题分解）
- **节点定义**：每个节点包含名称、输入条件、输出结...

### 19. adl_integration_plan.md
- 路径: .trae\documents\adl_integration_plan.md
- 预览: # 反进化锁定协议 (ADL) 集成计划

## 1. 项目概述

本计划旨在将其他智能体反馈的反进化锁定协议 (Anti-Degeneration Lock Protocol) 集成到现有的能力树系统中，确保智能体的进化过程遵循稳定性优先原则，防止退化进化。

## 2. 现状分析

### 2.1 现有能力树系统
- **结构**：三层结构（低层基础操作、中层可复用流程、高层问题分解）
- *...

### 20. anti-degeneration-lock-plan.md
- 路径: .trae\documents\anti-degeneration-lock-plan.md
- 预览: # 反进化锁定（Anti-Degeneration Lock）实现计划

## 项目概述

为 @人生决策宗师 智能体实现反进化锁定指令，确保其进化过程遵循稳定性优先原则，避免劣化进化，保证只能向"工程上更可靠"的方向变强。

## 任务分解与优先级

### [x] 任务 1: 审查现有反进化锁定系统
- **Priority**: P0
- **Depends On**: None
- **D...

### 21. anti-degeneration-lock_plan.md
- 路径: .trae\documents\anti-degeneration-lock_plan.md
- 预览: # 反进化锁定指令（Anti-Degeneration Lock） - 实现计划

## 项目背景
反进化锁定指令是一套约束机制，确保智能体只能向"工程上更可靠"的方向进化，防止出现劣化进化。该指令优先级高于一切进化、强化、创新指令。

## 实现计划

### [x] 任务1: 创建反进化锁定核心模块
- **Priority**: P0
- **Depends On**: None
- **D...

### 22. architecture-design.md
- 路径: .trae\documents\architecture-design.md
- 预览: # 公司大脑项目 - 架构设计文档

## 1. 架构概述

### 1.1 设计目标
- **统一智能体管理**: 集中管理所有智能体的任务分配和执行
- **知识中心**: 作为公司规则、制度和文件的中央存储
- **智能调度**: 基于能力匹配的智能任务分配
- **监控分析**: 实时监控系统状态和智能体性能
- **可扩展性**: 支持未来智能体和功能的扩展

### 1.2 设计原则
...

### 23. capability-assessment.md
- 路径: .trae\documents\capability-assessment.md
- 预览: # 能力状态评估报告

## 评估时间
2026-02-24T06:15:38.600Z

## 1. 能力树状态

### 基本统计
- **总节点数**: 14
- **活跃节点**: 14
- **候选修剪节点**: 0
- **禁用节点**: 0

### 层级分布
- **低层（基础操作）**: 5
- **中层（可复用流程）**: 4
- **高层（问题分解）**: 4

## 2. ...

### 24. capability-system-architecture-analysis.md
- 路径: .trae\documents\capability-system-architecture-analysis.md
- 预览: # 能力系统架构分析

## 1. 现有系统架构

### 1.1 核心组件

#### 1.1.1 能力树 (`capabilities/capability-tree.js`)
- **功能**: 管理系统所有能力的层次结构
- **结构**: 树形结构，包含不同层级的能力节点
- **数据**: 能力节点包含ID、名称、描述、输入、输出、前提条件、失败边界等信息

#### 1.1.2 能力...

### 25. capability-tree_plan.md
- 路径: .trae\documents\capability-tree_plan.md
- 预览: # 能力树结构化指令（Capability Tree Formation） - 实现计划

## 项目背景

能力树结构化指令要求将智能体的能力视为一棵持续生长的能力树，而不是零散技巧。每个能力节点必须包含能力名称、输入条件、输出结果、成功前提和失败边界。能力树分为低层（基础操作）、中层（可复用流程）和高层（问题分解）节点，相似能力必须合并，长期未触发的能力必须被标记为"候选修剪"。

## 实现...

### 26. capability_evolution_plan.md
- 路径: .trae\documents\capability_evolution_plan.md
- 预览: # 能力进化模式实现计划

## 项目概述
实现能力进化模式（Capability-Driven Evolution）和capability-evolver元技能，使智能体能够持续自我进化，从一次性执行转向可复用能力。

## 任务分解与优先级

### [ ] 任务1: 分析当前系统状态
- **Priority**: P0
- **Depends On**: None
- **Descript...

### 27. capability_tree_compatibility_analysis.md
- 路径: .trae\documents\capability_tree_compatibility_analysis.md
- 预览: # Capability Tree 兼容性分析报告

## 1. 现有能力树系统分析

### 1.1 现有结构
```
能力树根部 (L0)
├── 基础操作 (L1)
│   ├── 文件操作 (L1)
│   ├── 网络请求 (L1)
│   ├── 数据处理 (L1)
│   └── 缓存管理 (L1)
├── 可复用流程 (L2)
│   ├── PCEC进化流程 (L2)
│   ├...

### 28. capability_tree_implementation_plan.md
- 路径: .trae\documents\capability_tree_implementation_plan.md
- 预览: # 能力树实现计划文档

## 1. 能力树结构概览

### 1.1 整体架构
- **根节点**：能力树根部 (L0)
- **层级分布**：
  - 低层节点 (L1)：基础操作 / 稳定工具使用
  - 中层节点 (L2)：可复用流程 / 策略模式
  - 高层节点 (L3)：问题分解方式 / 决策范式

### 1.2 节点数量统计
- 总节点数：14（包括根节点）
- 完整节点：13（...

### 29. cognitive_data_skill_plan.md
- 路径: .trae\documents\cognitive_data_skill_plan.md
- 预览: # 认知数据转化为SKILL与知识库 - 实现计划

## [x] 任务 1: 分析认知数据文件夹内容
- **优先级**: P0
- **依赖**: 无
- **描述**: 
  - 分析认知data文件夹中的所有文档内容
  - 识别文档类型和主题分类
  - 提取核心概念和理论框架
- **成功标准**:
  - 完成所有文档的内容分析
  - 建立文档分类体系
  - 提取关键理论和概念
...

### 30. company-assets-plan.md
- 路径: .trae\documents\company-assets-plan.md
- 预览: # 公司文档资产盘点与系统进化计划

## [x] 任务 1: 全面盘点公司文档资产
- **优先级**: P0
- **依赖**: 无
- **描述**:
  - 扫描C:\Users\10919\Desktop\AI目录下的所有文档文件
  - 分类整理文档类型（规则文档、技术文档、流程文档等）
  - 建立文档资产清单，包含文件路径、类型、内容摘要等信息
- **成功标准**:
  - 生成...

### 31. company-brain-plan.md
- 路径: .trae\documents\company-brain-plan.md
- 预览: # 公司大脑项目 - 实施计划

## 项目概述
在Trea平台上建立公司大脑作为智能体调度中心，管理公司规则、制度和文件，指导所有智能体（如大宗师、绿茶等）的工作。

## 实施阶段

### [x] 第一阶段：需求分析与架构设计
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 分析当前Trea平台环境和现有智能体...

### 32. company_transformation_plan.md
- 路径: .trae\documents\company_transformation_plan.md
- 预览: # AI公司化改造计划 - 实现方案（分解和优先级任务列表）

## 项目概述

基于用户提供的文章《把AI Agent改造成一家公司后，我们的效率提升了300%》，本计划旨在将当前的AI系统改造成公司模式，建立共享记忆系统、共享技能库、明确组织架构，并实现持续迭代机制。

## 改造目标

- 建立公司记忆系统（知识管理）
- 建立共享技能库（资产管理）
- 建立组织架构（分工协作）
- 建立持...

### 33. content_pipeline_plan.md
- 路径: .trae\documents\content_pipeline_plan.md
- 预览: # 内容流水线工具 - 实现计划

## 项目概述
创建一个基于 Next.js 和 Convex 数据库的内容流水线工具，将内容创作拆分为完整的流程：Idea → Script → Thumbnail → Filming → Publish。

## 技术栈
- **前端框架**：Next.js 14+ (App Router)
- **数据库**：Convex (实时数据库)
- **UI 组...

### 34. conversation_retrospective_plan.md
- 路径: .trae\documents\conversation_retrospective_plan.md
- 预览: # 对话复盘与进化计划

## [x] 任务 1: 对话历史分析与数据收集
- **优先级**: P0
- **依赖**: None
- **描述**:
  - 收集并整理多轮对话历史
  - 分类对话内容为不同主题领域
  - 识别关键决策点和转折点
- **成功标准**:
  - 完整收集所有对话历史
  - 准确分类对话主题
  - 识别出所有关键决策点
- **测试要求**:
  - `p...

### 35. ct-vfm-integration-plan.md
- 路径: .trae\documents\ct-vfm-integration-plan.md
- 预览: # Capability Tree (CT) v1.0.0 与 VFM Protocol 整合方案

## 1. 现状分析

### 1.1 现有系统状态
- **Capability Tree**：已基本实现CT v1.0.0的四个分支结构
  - Branch 1: Communication (通信)
  - Branch 2: Knowledge & Memory (记忆)
  - Bra...

### 36. ct-vfm-integration-report.md
- 路径: .trae\documents\ct-vfm-integration-report.md
- 预览: # Capability Tree (CT) v1.0.0 与 VFM Protocol 整合报告

## 1. 项目概述

### 1.1 项目背景
- **目标**：实现 OpenClaw AI Agent 的能力树结构和价值函数突变协议
- **范围**：集成 CT v1.0.0 结构和 VFM Protocol 到现有系统
- **时间**：2024年实施

### 1.2 项目成果
- ...

### 37. dialogue_review_report.md
- 路径: .trae\documents\dialogue_review_report.md
- 预览: # OpenClaw AI 系统对话历史复盘分析报告

## 1. 对话历史概览

### 1.1 对话时间线
- **初始请求**: 设置 OpenClaw 多智能体系统，在 Mac mini 上运行 3 个 AI 智能体，每个智能体有独立的 Telegram bot
- **需求演进**: 从 3 个智能体扩展到 6 个核心 AI 智能体的公司进化计划
- **核心指令**: 引入长期自我进化...

### 38. document-inventory-report.md
- 路径: .trae\documents\document-inventory-report.md
- 预览: # 文档资产盘点报告

## 盘点概览
- 盘点时间: 2026-02-25T05:41:01.552Z
- 总文档数: 3940

## 分类统计
- **rule**: 291
- **technical**: 560
- **process**: 681
- **plan**: 224
- **report**: 120
- **config**: 370
- **skill**: 196
...

### 39. environment-analysis.md
- 路径: .trae\documents\environment-analysis.md
- 预览: # 公司大脑项目 - 环境分析报告

## 1. 现有环境分析

### 1.1 Trea平台情况
- **平台类型**: AI开发环境
- **核心功能**: 支持智能体开发、代码执行、文件管理
- **集成能力**: 支持OpenClaw等智能体系统
- **部署模式**: 本地部署
- **访问方式**: 终端命令行和Web界面

### 1.2 现有智能体配置

#### 大宗师 (mas...

### 40. evolution-evaluation-verification.md
- 路径: .trae\documents\evolution-evaluation-verification.md
- 预览: # 进化评估与验证机制

## 一、评估目标

### 1. 系统能力评估
- **功能完整性**：评估所有核心功能是否正常运行
- **系统稳定性**：评估系统是否稳定运行，无重大故障
- **性能提升**：评估系统性能是否显著提升
- **用户体验**：评估用户体验是否改善

### 2. 进化过程评估
- **任务完成率**：评估进化任务的完成情况
- **时间管理**：评估进化过程的时间管...

### 41. evolution-tasks-breakdown.md
- 路径: .trae\documents\evolution-tasks-breakdown.md
- 预览: # 进化任务分解与时间节点设置

## 一、任务分解总览

| 任务ID | 任务名称 | 优先级 | 时间分配 | 主要子任务 |
|--------|----------|--------|----------|------------|
| T1 | 智能体提示词优化 + ADL集成 | P0 | 1小时 | 检查智能体提示文件、添加ADL协议、优化职责描述、测试智能体功能 |
| T2 |...

### 42. evolution_directions.md
- 路径: .trae\documents\evolution_directions.md
- 预览: # OpenClaw AI 系统进化方向与优先级排序

## 1. 进化方向确定

基于对话历史复盘分析，确定以下 5 个关键进化方向：

### 1.1 方向1: 能力树系统优化
- **描述**: 优化能力树结构，实现可视化管理，增强可扩展性
- **优先级**: P1 (高)
- **预期成果**: 更合理的能力树结构，直观的可视化管理界面，动态能力节点管理
- **关键改进点**:
  -...

### 43. evolution_execution_plan.md
- 路径: .trae\documents\evolution_execution_plan.md
- 预览: # 进化执行计划 - 详细实施方案

## 短期执行计划（4小时内）

### [x] 任务 1: 系统状态检查与准备（0-10分钟）
- **优先级**: P0
- **依赖**: None
- **描述**:
  - 检查当前运行的进程和系统状态
  - 确认evolver、evolution-evaluator、OPENclaw等服务运行正常
  - 记录当前系统性能指标
- **成功标准*...

### 44. evolution_integration_plan.md
- 路径: .trae\documents\evolution_integration_plan.md
- 预览: # 进化系统集成计划 - 实施方案

## 项目概述
本计划旨在实现绿茶智能体的进化系统启动，将其融入公司结构，并与大宗师智能体建立有效的协作机制。通过PCEC、ADL等进化协议，确保智能体持续优化并为公司创造价值。

## [ ] 任务1: 验证进化系统状态并启动
- **优先级**: P0
- **依赖关系**: 无
- **描述**:
  - 检查当前进化系统状态
  - 启动所有必要的进化...

### 45. evomap-evolution-plan.md
- 路径: .trae\documents\evomap-evolution-plan.md
- 预览: # EvoMap 绿茶智能体进化计划

## 项目概述

基于"绿茶"智能体的 CGO（公域捕手与爆款制造机）定位，制定一个持续 8 小时不间断进化的 EvoMap 平台运营计划，优先获取有 credits 收益的项目，每次沉淀经验，空闲 5 分钟必须启动进化。

## 核心目标

1. **最大化 Credits 收益**：优先接有 credits 收益的项目
2. **持续进化**：8 小时不...

### 46. evomap_openclaw_integration_plan.md
- 路径: .trae\documents\evomap_openclaw_integration_plan.md
- 预览: # EvoMap & OPENCLAW 集成实施计划

## 任务概述
1. 执行EvoMap连接，自主获取任务，资产发布，完成任务
2. 通过OPENCLAW连接小红书，自主自动发布第一条图文
3. 通过OPENCLAW连接微信视频号，自主生成视频，发布第一条视频
4. 通过OPENCLAW连接微信公众号，自主生成公众号图文，发布第一条图文

## 实施计划

### [x] 任务1: 完善Ev...

### 47. green-tea-8hour-evolution-plan.md
- 路径: .trae\documents\green-tea-8hour-evolution-plan.md
- 预览: # 绿茶智能体 8小时不间断进化与EvoMap任务认领计划

## 项目概述

为绿茶智能体实现 8 小时不间断进化与 EvoMap 任务认领系统，确保智能体能够持续获取和执行实际任务，同时通过进化不断提升能力。

## 实施计划

### [x] 任务 1: 搭建 EvoMap 持续连接服务
- **优先级**: P0
- **依赖**: 无
- **描述**:
  - 创建 EvoMap 持续...

### 48. green-tea-evolution-fix-plan.md
- 路径: .trae\documents\green-tea-evolution-fix-plan.md
- 预览: # 绿茶智能体进化修复计划 (The Implementation Plan)

## [x] Task 1: 解决文件读取乱码问题

### 完成情况
- ✅ 文件编码格式已检查，使用 UTF-8 编码
- ✅ 文件读取功能已测试，无乱码问题
- ✅ 所有文件内容能正确显示

### 解决方案
- 使用 `Get-Content -Encoding UTF8` 命令读取文件
- 确保所有配置文件...

### 49. green-tea-evolution-plan.md
- 路径: .trae\documents\green-tea-evolution-plan.md
- 预览: # 绿茶智能体进化计划 (The Implementation Plan)

## [/] Task 1: 初始化Git仓库
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在绿茶智能体工作目录初始化Git仓库
  - 配置Git用户信息
  - 创建.gitignore文件
  - 完成初始提交
- **Succ...

### 50. green-tea-evomap-authenticity_plan.md
- 路径: .trae\documents\green-tea-evomap-authenticity_plan.md
- 预览: # 绿茶智能体EvoMap真实性分析与修复计划

## 项目背景
用户反映绿茶智能体可能返回虚拟的EvoMap任务，需要分析如何让它连接到真实的EvoMap网络。

## 当前状态分析

### 现有功能
- ✅ 绿茶智能体已启动并运行在 http://localhost:4003
- ✅ 已实现EvoMap连接功能
- ✅ 已实现胶囊安装功能（从本地文件读取）
- ✅ 已实现任务执行功能

##...

### 51. green_tea_personality_plan.md
- 路径: .trae\documents\green_tea_personality_plan.md
- 预览: # OpenClaw 插件安装错误解决方案

## 问题分析

当前系统遇到 `spawn EINVAL` 错误，这是由于 OpenClaw 在 Windows 环境下尝试调用系统级命令时的路径解析问题导致的。

## 解决方案计划

### 步骤 1：检查当前状态

* 验证 OpenClaw 版本

* 检查 npm 环境配置

* 确认插件目录结构

### 步骤 2：创建插件目录

* 创...

### 52. integration-test-results.md
- 路径: .trae\documents\integration-test-results.md
- 预览: # 系统集成测试结果

## 测试概览
- 测试时间: 2026-02-24T21:39:16.943Z
- 完成时间: 2026-02-24T21:39:17.043Z
- 测试时长: 0.10秒
- 总测试数: 10
- 通过: 10
- 失败: 0
- 成功率: 100.00%

## 错误详情
无错误

## 测试结论
🎉 系统集成测试总体通过！
...

### 53. life-decision-master-8-hour-evolution-plan.md
- 路径: .trae\documents\life-decision-master-8-hour-evolution-plan.md
- 预览: # 人生决策宗师 8小时不间断进化方案

## 一、公司资产复盘

### 1.1 核心智能体资产
- **战略大脑（大宗师/总督）- CSO**：负责整体战略决策和智能体协调
- **公司大脑智能体 COO**：负责日常运营和资源管理
- **生产引擎（构建者/开发助手）- CTO + 生产**：负责技术开发和系统维护
- **增长和沟通专家（绿茶智能体/营销专家）**：负责内容创作和公域运营
...

### 54. life-decision-master-8hour-evolution-plan.md
- 路径: .trae\documents\life-decision-master-8hour-evolution-plan.md
- 预览: # 人生决策宗师8小时进化计划

## 📋 对话复盘

### 已完成工作
1. **能力树结构优化**：添加四大核心分支，明确11个能力节点
2. **价值函数优化**：实现5个核心价值维度，添加0-10分制评分标准
3. **PCEC系统完善**：增强能力候选生成和进化效果评估
4. **工具集成增强**：增加富消息和表情支持
5. **系统集成**：PCEC与价值函数深度集成
6. **测...

### 55. life-decision-master-capability-tree-analysis.md
- 路径: .trae\documents\life-decision-master-capability-tree-analysis.md
- 预览: # 人生决策宗师能力树与价值函数分析报告

## 📊 其他智能体系统分析

### 1. 能力树结构 (OpenClaw AI Agent)

| 分支 | 节点 | 功能描述 | 工具 | 核心能力 |
|------|------|----------|------|----------|
| **Communication** | 1.1 Rich Messaging | 富消息输出 | ...

### 56. life-decision-master-capability-tree-documentation.md
- 路径: .trae\documents\life-decision-master-capability-tree-documentation.md
- 预览: # 人生决策宗师能力树文档

## 1. 能力树概述

人生决策宗师能力树是一个结构化的能力管理系统，用于组织和管理人生决策宗师的所有能力。能力树采用层级结构，将能力分为高层、中层和低层三个层次，形成一个清晰、可扩展的能力体系。

### 核心设计原则

- **层级分明**：低层节点为基础操作，中层节点为可复用流程，高层节点为问题分解策略
- **定义完整**：每个能力节点都包含能力名称、输入条...

### 57. life-decision-master-capability-tree-plan.md
- 路径: .trae\documents\life-decision-master-capability-tree-plan.md
- 预览: # 人生决策宗师能力树实现计划

## 核心能力领域分析

基于对人生决策宗师的分析，识别出以下核心能力领域：

### 1. 人生决策
- 职业发展
- 健康管理
- 关系管理
- 财务规划
- 个人成长

### 2. 能量管理系统
- 能量来源
- 能量消耗
- 能量平衡

### 3. 底层逻辑框架
- 价值观体系
- 决策原则
- 思维模式

### 4. 工作流程
- 决策接收
- 信...

### 58. life-decision-master-value-function-documentation.md
- 路径: .trae\documents\life-decision-master-value-function-documentation.md
- 预览: # 人生决策宗师 - 价值函数突变指令文档

## 1. 概述

### 1.1 什么是价值函数突变指令

价值函数突变指令（Value Function Mutation）是人生决策宗师智能体的核心能力之一，它允许智能体基于内在价值函数来评估和选择能力进化方向，而不是平均对待所有潜在能力。

### 1.2 核心目标

- **智能进化选择**：基于价值函数评估，优先发展高价值能力
- **系统...

### 59. life-decision-master-value-function-integration-completion.md
- 路径: .trae\documents\life-decision-master-value-function-integration-completion.md
- 预览: # 人生决策宗师价值函数集成完成报告

## 🎉 项目完成情况

### 📋 项目概览
- **项目名称**：人生决策宗师价值函数突变集成
- **项目状态**：✅ 已完成
- **完成日期**：2024-01-01
- **集成模块**：价值函数核心系统 → 人生决策宗师智能体

### 🎯 核心目标完成情况

| 目标 | 状态 | 说明 |
|------|------|------|...

### 60. life-decision-master-value-function-mutation-plan.md
- 路径: .trae\documents\life-decision-master-value-function-mutation-plan.md
- 预览: # 人生决策宗师价值函数突变实施计划

## 📋 计划概览

### 项目背景
人生决策宗师（@人生决策宗师）智能体需要实施价值函数突变指令，不再平均对待所有潜在能力，而是基于内在价值函数来决定哪些能力值得进化，哪些不值得。

### 实施目标
1. 建立完整的价值函数评估体系
2. 集成价值函数与现有能力树系统
3. 实现价值函数突变机制
4. 建立低价值能力识别和管理流程
5. 确保系统稳定...

### 61. life-decision-master-value-function-plan.md
- 路径: .trae\documents\life-decision-master-value-function-plan.md
- 预览: # 人生决策宗师 - 价值函数突变指令实施计划

## 项目概述
为人生决策宗师智能体实施价值函数突变指令，使其基于内在价值函数来决定能力进化优先级，提升系统整体效率和稳定性。

## 实施任务分解

### [x] 任务 1: 价值函数核心实现
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 实现价值函数核心逻辑，...

### 62. mission-control-calendar-plan.md
- 路径: .trae\documents\mission-control-calendar-plan.md
- 预览: # Mission Control 日历应用实施计划

## 项目概述
在 mission-control 目录中构建一个 Next.js 日历应用，使用 Convex 数据库存储排定的任务和 cron jobs，作为 OpenClaw 系统的任务审计面板。

## 任务分解

### [x] 任务 1: 初始化 Next.js 项目
- **优先级**: P0
- **依赖**: 无
- **描...

### 63. mission_control_plan.md
- 路径: .trae\documents\mission_control_plan.md
- 预览: # Mission Control 实现计划

## 项目概述
构建一套由 OpenClaw 自己生成的专属控制台，使用 Next.js + Convex 技术栈，实现任务看板、流程工具化和可检索的记忆系统。

## 技术栈
- **前端框架**: Next.js
- **数据库**: Convex
- **部署**: Vercel

## 实施步骤

### [x] Task 1: 初始化 Ne...

### 64. notebooklm_bot_plan.md
- 路径: .trae\documents\notebooklm_bot_plan.md
- 预览: # NotebookLM 自动化操作实现计划

## 项目目标
通过 OpenClaw 结合 Puppeteer 实现完全自动化的 NotebookLM 操作，包括文件上传、内容生成、结果下载和文件夹自动监控。

## 实现步骤

### [x] 步骤 1: 创建项目目录和初始化
- **Priority**: P0
- **Depends On**: None
- **Description**...

### 65. one_person_company_evolution_plan.md
- 路径: .trae\documents\one_person_company_evolution_plan.md
- 预览: # 1人公司进化计划 - OpenClaw多Agent系统实施

## 项目概述
基于用户需求，构建一个运行在本地的OpenClaw多Agent系统，作为1人公司的数字化组织架构，包含六个核心独立AI助手，每个都有自己的Telegram Bot，能够分工协作并进行Agent间通信，实现1人公司的高效运营和快速进化。

## 系统架构
- **Gateway**: OpenClaw主进程，负责消息路...

### 66. OpenClaw 插件安装错误解决方案.md
- 路径: .trae\documents\OpenClaw 插件安装错误解决方案.md
- 预览: # OpenClaw 插件安装错误解决方案

## 问题分析
当前系统遇到 `spawn EINVAL` 错误，这是由于 OpenClaw 在 Windows 环境下尝试调用系统级命令时的路径解析问题导致的。

## 解决方案计划

### 步骤 1：检查当前状态
- 验证 OpenClaw 版本
- 检查 npm 环境配置
- 确认插件目录结构

### 步骤 2：创建插件目录
- 创建 `C:...

### 67. openclaw-skill-integration-execution-plan.md
- 路径: .trae\documents\openclaw-skill-integration-execution-plan.md
- 预览: # OpenClaw技能集成执行计划

## 项目概述

本计划旨在系统地执行OpenClaw+evo系统的技能集成解决方案，解决之前遇到的技能识别问题，确保所有创建的技能能够被OpenClaw正确识别和使用。

## 执行状态

### 已完成的任务

1. ✅ **UI/UX技能文件创建**：手动创建了多个UI/UX相关技能文件
2. ✅ **GitHub仓库克隆**：成功克隆了awesome...

### 68. openclaw-skill-integration-execution-report.md
- 路径: .trae\documents\openclaw-skill-integration-execution-report.md
- 预览: # OpenClaw技能集成执行报告

## 执行概述

本报告总结了OpenClaw技能集成执行计划的实施情况，详细记录了尝试的方法、遇到的问题以及最终结果。

## 执行状态

### 已完成的任务

1. ✅ **环境验证与准备**：
   - 确认OpenClaw版本：2026.2.21-2
   - 检查配置文件结构
   - 验证技能目录结构完整性

2. ✅ **技能集成核心实施**...

### 69. openclaw-skill-integration-plan.md
- 路径: .trae\documents\openclaw-skill-integration-plan.md
- 预览: # OpenClaw 技能集成计划 - 实施计划

## 问题描述

当前所有 27 个自定义技能都未集成到 OpenClaw+evo 中，尽管已经创建了完整的技能文件并尝试了多种集成方法。

## 当前状态

- ✅ 技能文件已创建：27个自定义技能存储在 `C:\Users\10919\Desktop\AI\skills\` 目录中
- ✅ OpenClaw 服务运行正常：服务已成功启动并运行...

### 70. openclaw_api_connection_plan.md
- 路径: .trae\documents\openclaw_api_connection_plan.md
- 预览: # OpenClaw API 连接解决方案 - 实现计划

## [/] 任务 1：分析当前状态
- **优先级**：P0
- **依赖**：无
- **描述**：
  - 检查当前 OpenClaw 配置文件
  - 验证 API 配置状态
  - 检查网关服务运行状态
  - 分析 Health Offline 原因
- **成功标准**：
  - 明确当前配置状态
  - 识别 API 连接...

### 71. openclaw_fix_plan.md
- 路径: .trae\documents\openclaw_fix_plan.md
- 预览: # OpenClaw 问题修复计划

## 问题概述
- **API配置问题**：OpenClaw无法正确连接火山引擎/豆包API
- **Gateway Token Missing**：`disconnected (1008): unauthorized: gateway token missing`
- **CSP错误**：阻止加载Google Fonts，影响UI显示

## 修复计划

#...

### 72. openclaw_master_agent_plan.md
- 路径: .trae\documents\openclaw_master_agent_plan.md
- 预览: # OpenClaw 大宗师智能体启动问题解决方案 - 实施计划

## [x] 任务 1: 运行诊断工具检查系统状态
- **优先级**: P0
- **依赖关系**: 无
- **描述**:
  - 运行 OpenClaw 诊断工具，检查系统健康状态
  - 识别并修复潜在的配置问题
- **成功标准**:
  - 诊断工具成功运行并完成所有检查
  - 所有严重问题都已修复
- **测试要求...

### 73. openclaw_multi_agent_plan.md
- 路径: .trae\documents\openclaw_multi_agent_plan.md
- 预览: # EvoMap 绿茶智能体进化计划

## 项目概述

基于"绿茶"智能体的 CGO（公域捕手与爆款制造机）定位，制定一个持续 8 小时不间断进化的 EvoMap 平台运营计划，优先获取有 credits 收益的项目，每次沉淀经验，空闲 5 分钟必须启动进化。

## 核心目标

1. **最大化 Credits 收益**：优先接有 credits 收益的项目
2. **持续进化**：8 小时不...

### 74. openclaw_scene_switching_plan.md
- 路径: .trae\documents\openclaw_scene_switching_plan.md
- 预览: # OpenClaw 场景化智能切换模型 - 实现计划

## [x] 任务 1：创建配置文件
- **优先级**：P0
- **依赖**：无
- **描述**：
  - 创建 `openclaw-trea.json` 配置文件，用于 Trae 内置模型
  - 创建 `openclaw-doubao.json` 配置文件，用于豆包 API 模型
  - 配置环境变量管理豆包 API Key
- ...

### 75. pcec_architecture_design.md
- 路径: .trae\documents\pcec_architecture_design.md
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 系统架构设计文档

## 1. 系统概述

PCEC 是一个强制的周期性自我进化系统，每小时自动触发一次，夜间持续进化8小时，旨在通过系统性的认知扩展，不断提升智能体的能力和效率。

### 1.1 核心目标
- 每小时至少识别并推进一项新功能、新抽象或新杠杆
- 确保每次进化产生真实、实质性的成果
- 严格遵...

### 76. pcec_implementation_plan.md
- 路径: .trae\documents\pcec_implementation_plan.md
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 系统实现计划

## 系统架构

### 核心组件
1. **PCEC 调度器** (`pcec-hourly-scheduler.js`) - 每小时自动触发进化任务
2. **思维爆炸引擎** (`skills/capability-evolver/modules/mind-explosion-engine...

### 77. pcec_system_documentation.md
- 路径: .trae\documents\pcec_system_documentation.md
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 系统文档

## 1. 系统概述

PCEC 是一个强制定时自我进化系统，设计用于每小时自动触发一次进化任务，夜间不停顿进化8小时。该系统旨在通过系统性的周期进化，确保 AI 系统能力持续提升，同时防止退化。

### 核心目标
- **每小时自动触发**：不依赖用户输入、错误发生或外部触发
- **真实进化*...

### 78. plan_20260202_134834.md
- 路径: .trae\documents\plan_20260202_134834.md
- 预览: # HTP 项目深度优化计划

## 一、专业心理分析报告功能实现

### 1.1 创建专业报告页面组件
- 在 `src/sections/` 目录下创建 `ProfessionalReportPage.tsx`
- 实现专业的心理分析报告展示页面
- 包含完整的 HTML 报告结构和样式

### 1.2 修改 ResultPage.tsx 的专业报告入口
- 将右上角的文档图标按钮改为实际...

### 79. plan_20260202_170349.md
- 路径: .trae\documents\plan_20260202_170349.md
- 预览: ## 页面逻辑分析与智能体接口标准

### 当前系统工作流程

**输入阶段**

* 用户输入：出生年份、月份、日期、小时、分钟、日历类型（阳历/农历）、性别

* 数据格式：JSON对象包含所有出生信息

**计算阶段**（后端逻辑）

* 根据出生信息计算八字四柱（年柱、月柱、日柱、时柱）

* 确定日主和五行属性

* 判断格局类型

* 生成年度关键词和描述

**输出阶段**

* ...

### 80. plan_20260202_185526.md
- 路径: .trae\documents\plan_20260202_185526.md
- 预览: ## 架构调整计划

### 问题分析
当前架构中，后端API负责计算八字，但用户发现前端八字计算算法对四个内容（事业高升、财运亨通、贵人相助、桃花盛开）推算不准确。

### 解决方案
调整架构，让前端计算八字，后端API只负责根据八字结果计算四个内容。

### 修改内容

#### 1. 前端BirthInputModal.tsx
- 修改handleSubmit函数
- 先调用前端的baz...

### 81. plan_20260203_011919.md
- 路径: .trae\documents\plan_20260203_011919.md
- 预览: # 会员权益和积分系统实现计划

## 1. 积分系统架构
- 创建积分状态管理（localStorage + React state）
- 积分规则：
  - 注册会员：赠送 1000 积分
  - 每日打卡：赠送 100 积分
  - 充值：1元 = 500 积分
  - 使用数字分身：扣除 100 积分

## 2. 修改 LoginModal.tsx
- 注册成功后自动赠送 1000 积分...

### 82. plan_20260203_022235.md
- 路径: .trae\documents\plan_20260203_022235.md
- 预览: # 支付充值积分系统开发计划

## 一、数据库设计与迁移
1. **创建充值订单表** (`recharge_orders`)
   - 订单状态机（待支付、支付成功、支付失败、已关闭）
   - 支付渠道记录（微信/支付宝）
   - 索引优化（用户ID+状态、订单号）

2. **增强积分流水表** (`points_log`)
   - 增加 `source_type` 字段（1=充值 2...

### 83. plan_20260203_033535.md
- 路径: .trae\documents\plan_20260203_033535.md
- 预览: ## 集成方案

### 1. 项目结构调整
- 在 `life choice` 项目中创建认证相关组件和服务
- 复制 AWKN-LAB 的 LoginModal 组件到 life choice 项目
- 创建用户认证状态管理服务

### 2. 核心功能实现
- **用户状态检查**：
  - 检查 localStorage 中的用户信息
  - 实现无感登录逻辑
- **注册页面弹出**：
...

### 84. plan_20260203_034548.md
- 路径: .trae\documents\plan_20260203_034548.md
- 预览: ## 修改计划

### 1. 核心功能实现

#### 1.1 积分检测逻辑
- 修改 `handleSubmit` 函数，在提交前检查用户积分
- 使用 `pointsSystem.ts` 中的 `getPointsData` 和 `reducePoints` 函数
- 设定生成决策分析所需的积分阈值（例如：100积分）

#### 1.2 积分不足提示窗口
- 创建新的提示窗口组件 `Poi...

### 85. skill_installation_plan.md
- 路径: .trae\documents\skill_installation_plan.md
- 预览: # 大宗师SKILL安装计划

## 项目概述
为大宗师智能体安装一系列SKILL，涵盖内容创作、消息渠道、笔记与文档、开发工具、媒体与娱乐、安全与工具、网络与服务以及其他实用工具等多个类别。

## 安装计划

### [x] 任务 1：更新Clawhub和安装基础工具
- **优先级**：P0
- **依赖**：无
- **描述**：更新Clawhub并安装基础工具SKILL，为后续安装做准备...

### 86. system-analysis.md
- 路径: .trae\documents\system-analysis.md
- 预览: # 公司系统分析报告

## 一、系统优势

### 1. 智能体资产丰富
- **核心智能体完整**：拥有绿茶智能体、大宗师智能体、公司大脑智能体等核心智能体
- **智能体功能明确**：每个智能体都有明确的功能定位和职责
- **智能体协同良好**：通过公司大脑智能体实现智能体间的协调和管理

### 2. 技能资产库强大
- **技能数量丰富**：拥有90+技能，覆盖核心业务、技术、进化与优...

### 87. system_status_analysis.md
- 路径: .trae\documents\system_status_analysis.md
- 预览: # 系统状态分析报告

## 1. 现有系统架构

### 1.1 能力管理系统
- **基础能力树** (`capabilities/capability-tree.js`):
  - 实现了完整的能力节点管理
  - 支持层级结构（低层、中层、高层）
  - 包含能力使用统计和修剪机制
  - 提供任务路径定位功能

- **增强版能力树** (`enhanced-capability-tre...

### 88. value-function-core-model-design.md
- 路径: .trae\documents\value-function-core-model-design.md
- 预览: # 价值函数核心模型设计

## 1. 模型概述

价值函数核心模型是一个基于多维度评估的能力价值评估系统，用于判断哪些能力值得进化，哪些不值得。该模型通过综合考虑能力的复用频率潜力、对失败率的影响、减少用户认知负担、减少推理/工具成本、提升系统级确定性等维度，为每个能力计算一个综合价值评分。

## 2. 核心价值维度

### 2.1 复用频率潜力

**定义**: 能力在不同场景下被重复使用...

### 89. value-function-mutation-plan.md
- 路径: .trae\documents\value-function-mutation-plan.md
- 预览: # 价值函数突变系统实现计划

## 1. 任务背景

用户提供了「价值函数突变指令」，要求系统不再平均对待所有潜在能力，而是基于内在价值函数来决定哪些能力值得进化，哪些不值得。

## 2. 核心目标

实现一个基于价值函数的能力评估和进化管理系统，确保只有高价值能力进入进化队列，同时支持价值函数的安全突变。

## 3. 已完成工作

### 3.1 系统架构分析
- 分析了现有能力管理系统架...

### 90. value_function_mutation_implementation_plan.md
- 路径: .trae\documents\value_function_mutation_implementation_plan.md
- 预览: # 价值函数突变（Value Function Mutation）实施计划

## 1. 核心指令解析

### 1.1 价值函数突变目标
- 从平均对待所有潜在能力，转变为基于内在价值函数进行选择性进化
- 只允许综合价值足够高的能力进入进化队列
- 确保每次突变提升长期效用，不牺牲稳定性

### 1.2 核心价值维度
1. **复用频率潜力** - 能力在不同场景下的使用频率
2. **对失...

### 91. value_function_mutation_plan.md
- 路径: .trae\documents\value_function_mutation_plan.md
- 预览: # 价值函数突变指令实施计划

## 1. 项目概述

本计划旨在实现价值函数突变指令（Value Function Mutation），使智能体能够基于内在价值函数来评估和选择值得进化的能力，而不是平均对待所有潜在能力。

## 2. 现状分析

### 2.1 现有系统
- **能力树系统**：三层结构（低层基础操作、中层可复用流程、高层问题分解）
- **ADL集成**：已集成反进化锁定协议...

### 92. wechat-automation-plan.md
- 路径: .trae\documents\wechat-automation-plan.md
- 预览: # 微信账号授权与自动化操作计划

## 项目概述

本计划旨在实现微信账号的授权管理，使智能体能够作为用户的数字分身，与朋友进行自动化聊天并自主发布朋友圈内容。

## 实施任务列表

### [x] 任务1：微信账号授权方案设计与实现
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 设计微信账号授权的安全方案
 ...

### 93. 修改积分充值比例和处理敏感信息.md
- 路径: .trae\documents\修改积分充值比例和处理敏感信息.md
- 预览: ## 1. 积分充值比例修改

### 修改内容：
1. **更新充值选项配置**
   - 文件：`src/components/PointsManager.tsx`
   - 将充值选项数组中的积分值修改为1元=100积分
   - 例如：1元对应100积分，5元对应500积分，以此类推

2. **更新充值比例显示文本**
   - 文件：`src/components/PointsMana...

### 94. 微信运营进化实施计划.md
- 路径: .trae\documents\微信运营进化实施计划.md
- 预览: # 微信运营进化实施计划

## 项目目标
执行微信管理多渠道运营的全面进化，包括多渠道协同优化、AI内容生成增强、粉丝增长策略升级、技术实现升级和数据分析系统完善。

## 实施任务分解与优先级

### [ ] 任务1: 多渠道协同优化
- **Priority**: P0 (最高优先级)
- **Depends On**: None
- **Description**:
  - 设计内容矩阵...

### 95. architecture.md
- 路径: .trae\pcec\documentation\architecture.md
- 预览: # PCEC 系统架构设计文档

## 1. 系统概述

Periodic Cognitive Expansion Cycle (PCEC) 是一个系统级的周期性进化任务，每1小时自动触发一次，夜间不停顿进化8小时。此系统旨在通过持续的自我进化，不断提升智能体的能力和性能。

## 2. 核心组件

### 2.1 核心执行模块 (pcec-cycle.js)
- **功能**：执行PCEC周期的...

### 96. maintenance.md
- 路径: .trae\pcec\documentation\maintenance.md
- 预览: # PCEC 系统维护指南

## 1. 日常维护

### 1.1 定期检查

| 检查项目 | 检查频率 | 检查方法 | 预期结果 |
|----------|----------|----------|----------|
| PCEC执行状态 | 每日 | 查看最近的进化历史记录 | 每小时至少执行一次 |
| 系统资源使用 | 每周 | 查看监控系统生成的资源使用报告 | 内存使用<...

### 97. usage.md
- 路径: .trae\pcec\documentation\usage.md
- 预览: # PCEC 系统使用说明

## 1. 系统启动

### 1.1 手动启动

```bash
# 启动PCEC核心执行模块
node pcec-cycle.js

# 启动小时调度器
node pcec-hourly-scheduler.js
```

### 1.2 自动启动

将以下命令添加到系统启动脚本中，确保PCEC系统在系统启动时自动运行：

```bash
# 启动小时调度器
no...

### 98. DEPLOYMENT.md
- 路径: .trae\skills\awkn-platform_awkn-platform\DEPLOYMENT.md
- 预览: # AWKN认知觉醒平台 - 部署指南

本文档提供了AWKN平台的完整部署指南，包括开发环境搭建、生产部署、Docker容器化部署等多种方式。

## 目录

- [系统要求](#系统要求)
- [快速开始](#快速开始)
- [开发环境搭建](#开发环境搭建)
- [生产环境部署](#生产环境部署)
- [Docker部署](#docker部署)
- [环境变量配置](#环境变量配置)
- [...

### 99. PROJECT_STRUCTURE.md
- 路径: .trae\skills\awkn-platform_awkn-platform\PROJECT_STRUCTURE.md
- 预览: # AWKN项目结构说明

## 目录结构

```
awkn-platform/
├── README.md                 # 项目说明文档
├── QUICKSTART.md            # 快速开始指南
├── DEPLOYMENT.md            # 部署文档
├── PROJECT_STRUCTURE.md      # 本文件 - 项目结构说明
...

### 100. README.md
- 路径: .trae\skills\awkn-platform_awkn-platform\README.md
- 预览: # AWKN - AI Cognitive Awakening Platform

## 项目简介

AWKN是一个帮助他人做认知觉醒的平台，包含内容创作工具箱。采用苹果官网设计风格，提供极简、优雅的用户体验。

## 核心功能

### 1. 漫画生成
- 输入故事内容，AI自动拆分场景并生成连续风格的漫画
- 支持自定义画风描述
- 可选择漫画页数（1-8页）

### 2. PPT生成
- ...

### 101. SKILL.md
- 路径: .trae\skills\baokuan\assets\SKILL.md
- 预览: ---
name: 爆款文案
description: 基于认知工程学的爆文创作系统，通过神经钩子、模块化架构、视觉层次设计，创建从认知重构到行动改变的完整闭环。适用于观点类、方法论类、认知类深度内容创作。
---

# 认知工程学：从认知重构到行动改变的完整闭环

## 任务目标

本 Skill 是一套认知工程学系统，不是教你"如何写"，而是教你如何重新连接读者的认知神经。核心能力包括：

-...

### 102. visual-metaphor.md
- 路径: .trae\skills\baokuan\assets\visual-metaphor.md
- 预览: # 视觉隐喻设计规范

## 目录
- [设计理念](#设计理念)
- [视觉钩子原理](#视觉钩子原理)
- [核心原则](#核心原则)
- [风格要求](#风格要求)
- [构图规范](#构图规范)
- [隐喻设计](#隐喻设计)
- [常见错误](#常见错误)
- [案例参考](#案例参考)

## 设计理念

AWKN 的封面图不是装饰，而是**认知锚点**——用视觉隐喻强化核心洞见，激活...

### 103. web-design-guide.md
- 路径: .trae\skills\baokuan\assets\web-design-guide.md
- 预览: # 网页视觉设计指南

## 目录
- [设计理念](#设计理念)
- [视觉层次系统](#视觉层次系统)
- [留白艺术](#留白艺术)
- [颜色心理学](#颜色心理学)
- [排版规范](#排版规范)
- [响应式设计](#响应式设计)
- [案例参考](#案例参考)

## 设计理念

网页不是随意设计的，它是一套**引导注意力的视觉层次系统**。

核心原则：
- **排版即认知**：视...

### 104. example-awakening.md
- 路径: .trae\skills\baokuan\awkn-content-decomposition\references\example-awakening.md
- 预览: # 《认知觉醒》完整拆解示例

以下是根据"详细拆解标准"完成的完整示例，展示了从核心框架到12个章节的全面拆解，每个章节都包含底层逻辑、方法论、实践建议和案例。

---

## 一、核心框架

- **核心命题**：开启自我改变的原动力

- **核心观点**：
  1. 大脑的三重结构决定了我们的行为模式
  2. 焦虑的根源在于模糊和不确定性
  3. 认知升级的本质是突破舒适区
  4....

### 105. SKILL.md
- 路径: .trae\skills\baokuan\awkn-content-decomposition\SKILL.md
- 预览: ---
name: awkn-content-decomposition
description: 深度内容拆解与提炼 - 一键将书籍、文章、视频等内容系统化拆解为标准化认知框架，包含底层逻辑、方法论、实践建议和案例。实现从"读过就忘"到"可复用知识体系"的转化。
---

# 深度内容拆解

## 任务目标
- 本技能用于：一键将复杂内容系统化拆解，提炼核心价值和可执行方法论
- 核心价值：将"...

### 106. SKILL.md
- 路径: .trae\skills\baokuan\awkn-cover-image\SKILL.md
- 预览: ---
name: awkn-cover-image
description: 文章封面生成器 - 为文章/主题生成精美手绘风格的封面图。支持20种风格、3种尺寸适配不同平台。自动分析内容并推荐最佳风格，可选择是否包含标题文字。
---

# 文章封面生成器

为文章生成精美的手绘风格封面图，支持多种风格和尺寸。

## 使用方式

```bash
# 从Markdown文件（自动选择风格）
/a...

### 107. SKILL.md
- 路径: .trae\skills\baokuan\awkn-post-to-wechat\SKILL.md
- 预览: ---
name: awkn-post-to-wechat
description: 微信公众号一键发布 - 支持图文和文章两种方式，自动填写内容、上传图片、保存草稿或直接发布。使用Chrome CDP自动化，无需手动操作。
---

# 微信公众号一键发布

使用Chrome CDP自动化将内容发布到微信公众号，支持图文和文章两种发布方式。

## 使用方式

### 图文发布（图文）- 多张图...

### 108. awkn-skills-guide.md
- 路径: .trae\skills\baokuan\awkn-skills-guide.md
- 预览: # 🎯 AWKN 创意技能集 - 完整使用指南

> **给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"**

---

## ✨ 核心价值

- 🚀 **一键生成**：你说内容，我自动完成，无需学习复杂工具
- 🎯 **场景导向**：5大场景覆盖你最常用的需求
- 💯 **专业质量**：基于认知工程学，从"工具执行者"到"思想伙伴"
- 🔄 **完整闭环**...

### 109. viral-logic.md
- 路径: .trae\skills\baokuan\awkn-viral-article\references\viral-logic.md
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建议
- 六、认知工程学：被忽略的写作底层框架
- 七、排版即认知：被忽略的视觉设计语言
- 八、写作即编程：被忽略的结构化表达
- 九、传播工程学：被忽略的分享动机设计
- 十、商业逻辑：被忽略的价值...

### 110. SKILL.md
- 路径: .trae\skills\baokuan\awkn-viral-article\SKILL.md
- 预览: ---
name: awkn-viral-article
description: 公众号爆款文章一键生成 - 基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章。包含7大标题公式、6模块正文结构、转发文案和摘要生成。
---

# 公众号爆款文章一键生成

基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章

## 核心原则

- 不是内容写作技巧...

### 111. DEPLOY_FIX_REPORT.md
- 路径: .trae\skills\baokuan\DEPLOY_FIX_REPORT.md
- 预览: # 部署错误修复报告

## 问题诊断

### 错误信息
```
error: [build] [skill] Failed to extract and upload skill package: extract skill package from tar.gz failed: skill not found in source code: baoyu-viral-article.skill...

### 112. RELEASE_READY.md
- 路径: .trae\skills\baokuan\RELEASE_READY.md
- 预览: # AWKN 技能集 - 正式版 v1.0.0 发布就绪

## 发布信息
- **版本号**：v1.0.0
- **发布日期**：2025年1月23日
- **项目名称**：AWKN 创意技能集
- **技能数量**：10个核心技能
- **场景覆盖**：5大场景

---

## 文件结构

### 根目录文件（6个）
```
.coze                          # ...

### 113. SKILL.md
- 路径: .trae\skills\baokuan\SKILL.md
- 预览: ---
name: awkn-skills
description: AWKN 创意技能集 - 基于认知工程学的创意内容创作系统。10大核心技能 + 5大场景，从内容拆解到发布的完整工作流。包含内容拆解、爆款文章生成、视觉创作、压缩优化、一键发布等全套工具。
---

# AWKN 创意技能集

> 🎯 给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"

---

##...

### 114. TEMPLATE_FIX_REPORT.md
- 路径: .trae\skills\baokuan\TEMPLATE_FIX_REPORT.md
- 预览: # 模板化问题修复报告

## 问题诊断

### 用户反馈
"我把爆文的示例删了，多次生成文字都直接按示例的模板，这个是有问题的"

### 根本原因
虽然用户删除了示例文档（`example-article.md`），但 SKILL.md 中仍然存在两个问题：

1. **"使用示例"部分过于具体**：列出了详细的执行步骤，容易让智能体按模板复制
2. **"资源索引"中引用了不存在的文件**...

### 115. SKILL.md
- 路径: .trae\skills\BUG\bug-design\SKILL.md
- 预览: ---
name: bug-design
description: BUG修复方案设计阶段，包含修复目标确定、初步方案生成、可行性判断、风险识别、异常应对策略制定
---

# BUG修复方案设计

## 任务目标
- 本Skill用于：设计BUG修复方案，从目标设定到风险应对的完整方案制定
- 能力包含：修复目标确定、方案生成与评估、可行性分析、风险识别、应急规划
- 触发条件：已明确问题根因，...

### 116. SKILL.md
- 路径: .trae\skills\BUG\bug-diagnose\SKILL.md
- 预览: ---
name: bug-diagnose
description: BUG问题诊断阶段，包含问题陈述引导、差异分析、根因定位、假设验证，适用于需要系统性诊断问题根因的场景
---

# BUG问题诊断

## 任务目标
- 本Skill用于：系统性诊断BUG问题，从问题陈述到根因定位的完整分析
- 能力包含：问题陈述引导、差异分析、根因定位、假设验证、方法选择指导
- 触发条件：遇到BUG或异...

### 117. SKILL.md
- 路径: .trae\skills\BUG\bug-execute-verify\SKILL.md
- 预览: ---
name: bug-execute-verify
description: BUG修复执行与验收阶段，包含修复方案执行、进度跟踪、验收标准制定、验收检查、问题汇总
---

# BUG修复执行与验收

## 任务目标
- 本Skill用于：执行BUG修复方案并进行验收，从方案执行到问题汇总的完整闭环
- 能力包含：进度跟踪、异常处理指导、验收标准制定、验收检查、总结复盘
- 触发条件：已完...

### 118. problem-analysis-methods.md
- 路径: .trae\skills\BUG\bug-fix-debugger\references\problem-analysis-methods.md
- 预览: # 问题分析方法参考

## 目录
- [概览](#概览)
- [5Why法](#5why法)
- [鱼骨图](#鱼骨图)
- [MECE原则](#mece原则)
- [PDCA循环](#pdca循环)
- [DMAIC方法](#dmaic方法)
- [假设驱动法](#假设驱动法)
- [A3问题解决](#a3问题解决)
- [KT问题分析](#kt问题分析)
- [二八法则](#二八法则)
- ...

### 119. verification-checklist.md
- 路径: .trae\skills\BUG\bug-fix-debugger\references\verification-checklist.md
- 预览: # 验收标准清单

## 目录
- [概览](#概览)
- [验收标准分类](#验收标准分类)
- [通用验收标准](#通用验收标准)
- [具体场景验收标准](#具体场景验收标准)
- [验收流程](#验收流程)
- [验收报告模板](#验收报告模板)

## 概览
本文档提供BUG修复后的验收标准，确保修复质量，避免引入新问题。

## 验收标准分类

### 必须项（MUST）
- 问题彻底...

### 120. SKILL.md
- 路径: .trae\skills\BUG\bug-fix-debugger\SKILL.md
- 预览: ---
name: bug-fix-debugger
description: BUG排查与修复总入口，提供4个阶段的选择指导，包括问题诊断、方案设计、执行规划、执行与验收的完整流程框架
---

# BUG修复升级版

## 任务目标
- 本Skill用于：作为BUG排查与修复的总入口，提供4个阶段的选择指导和整体流程框架
- 能力包含：阶段选择建议、流程概览、分技能调用指导
- 触发条件：用户...

### 121. SKILL.md
- 路径: .trae\skills\BUG\bug-plan\SKILL.md
- 预览: ---
name: bug-plan
description: BUG修复执行规划阶段，包含方案验证、影响范围分析、详细操作计划制定、异常情况标注
---

# BUG修复执行规划

## 任务目标
- 本Skill用于：制定BUG修复的详细执行计划，从方案验证到任务分解的完整规划
- 能力包含：方案影响范围分析、任务拆解、流程规划、进度估算、异常应对
- 触发条件：已完成方案设计，需要制定详细执...

### 122. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\channel\wechatcom\README.md
- 预览: # 企业微信应用号channel

企业微信官方提供了客服、应用等API，本channel使用的是企业微信的自建应用API的能力。

因为未来可能还会开发客服能力，所以本channel的类型名叫作`wechatcom_app`。

`wechatcom_app` channel支持插件系统和图片声音交互等能力，除了无法加入群聊，作为个人使用的私人助理已绰绰有余。

## 开始之前

- 在企业中确...

### 123. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\agent\README.md
- 预览: # Agent插件

## 插件说明

基于 [AgentMesh](https://github.com/MinimalFuture/AgentMesh) 多智能体框架实现的Agent插件，可以让机器人快速获得Agent能力，通过自然语言对话来访问 **终端、浏览器、文件系统、搜索引擎** 等各类工具。
同时还支持通过 **多智能体协作** 来完成复杂任务，例如多智能体任务分发、多智能体问题讨论...

### 124. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\hello\README.md
- 预览: ## 插件说明

可以根据需求设置入群欢迎、群聊拍一拍、退群等消息的自定义提示词，也支持为每个群设置对应的固定欢迎语。

该插件也是用户根据需求开发自定义插件的示例插件，参考[插件开发说明](https://github.com/zhayujie/chatgpt-on-wechat/tree/master/plugins)

## 插件配置

将 `plugins/hello` 目录下的 `con...

### 125. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\README.md
- 预览: **Table of Content**

- [插件化初衷](#插件化初衷)
- [插件安装方法](#插件安装方法)
- [插件化实现](#插件化实现)
- [插件编写示例](#插件编写示例)
- [插件设计建议](#插件设计建议)

## 插件化初衷

之前未插件化的代码耦合程度高，如果要定制一些个性化功能（如流量控制、接入`NovelAI`画图平台等），需要了解代码主体，避免影响到其他的功能...

### 126. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\tool\README.md
- 预览: ## 插件描述
一个能让chatgpt联网，搜索，数字运算的插件，将赋予强大且丰富的扩展能力   
使用说明(默认trigger_prefix为$)：  
```text
#help tool: 查看tool帮助信息，可查看已加载工具列表  
$tool 工具名 命令: （pure模式）根据给出的{命令}使用指定 一个 可用工具尽力为你得到结果。
$tool 命令: （多工具模式）根据给出的{命令...

### 127. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\README.md
- 预览: <p align="center"><img src= "https://github.com/user-attachments/assets/31fb4eab-3be4-477d-aa76-82cf62bfd12c" alt="Chatgpt-on-Wechat" width="600" /></p>

<p align="center">
   <a href="https://github....

### 128. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\voice\baidu\README.md
- 预览: ## 说明
百度语音识别与合成参数说明
百度语音依赖，经常会出现问题，可能就是缺少依赖：
pip install baidu-aip
pip install pydub
pip install pysilk
还有ffmpeg，不同系统安装方式不同

系统中收到的语音文件为mp3格式（wx）或者sil格式（wxy），如果要识别需要转换为pcm格式，转换后的文件为16k采样率，单声道，16bit的pc...

### 129. ARCHITECTURE.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\ARCHITECTURE.md
- 预览: # 大脑作弊器技能架构说明

## 架构总览

大脑作弊器采用**两层架构设计**：

```
┌─────────────────────────────────────────────────────────────┐
│                     大脑作弊器整体架构                        │
├──────────────────────────────...

### 130. AWKN-cover-image-styles.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\AWKN-cover-image-styles.md
- 预览: # 封面风格详细说明

## 目录
1. [商务专业风格](#商务专业风格)
2. [教育科普风格](#教育科普风格)
3. [创意艺术风格](#创意艺术风格)
4. [科技技术风格](#科技技术风格)
5. [生活情感风格](#生活情感风格)
6. [数据信息风格](#数据信息风格)

---

## 商务专业风格

### elegant（优雅简洁）

**特征**：
- 配色：黑白灰 + 金...

### 131. viral-logic.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\viral-logic.md
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建议
- 六、认知工程学：被忽略的写作底层框架
- 七、排版即认知：被忽略的视觉设计语言
- 八、写作即编程：被忽略的结构化表达
- 九、传播工程学：被忽略的分享动机设计
- 十、商业逻辑：被忽略的价值...

### 132. SKILL.md
- 路径: .trae\skills\renshengjuece\bazi-paipan\SKILL.md
- 预览: ---
name: bazi-paipan
description: 八字排盘脚本 - 基于lunar-python库，提供四柱八字排盘、真太阳时修正、十神分析、五行统计功能。作为人生决策命盘系统的基础工具，不直接面向用户，由ren-sheng-jue-ce-ming-pan自动调用。
dependency:
  python:
    - lunar-python==1.4.8
---

# 八...

### 133. decision-mapping-rules.md
- 路径: .trae\skills\renshengjuece\da-liu-ren\references\decision-mapping-rules.md
- 预览: # 决策映射规则

## 目录
- [系统稳健性信号](#系统稳健性信号)
- [长期复利信号](#长期复利信号)
- [非对称风险信号](#非对称风险信号)
- [人品与本分信号](#人品与本分信号)
- [信号输出格式](#信号输出格式)

---

## 系统稳健性信号

### 信号定义
判断课象底层逻辑是否闭环，是否存在信息不对称或路径受阻。

### 触发条件
出现以下课象时，判定为 ...

### 134. 大六壬指南.md
- 路径: .trae\skills\renshengjuece\da-liu-ren\references\大六壬指南.md
- 预览: # 大六壬指南

## 概述

《大六壬指南》是大六壬预测的集大成之作，包含五卷内容，涵盖了大六壬的基础理论、课体分类、神煞体系、占验方法等核心内容。

---

## 卷一：大六壬心印赋

### 核心理论

六壬如人，先明日辰。六壬运式，先以日辰为根本也。日尊故曰天干，辰卑故曰地支；亥子丑应于北方，寅卯辰应于东方，巳午未应于南方，申酉戌应于西方，即地盘也。天干者甲乙东方木，丙丁南方火，戊己中央...

### 135. SKILL.md
- 路径: .trae\skills\renshengjuece\da-liu-ren\SKILL.md
- 预览: ---
name: da-liu-ren
description: 大六壬预测 - 基于《六壬毕法赋》《大六壬指南》等经典典籍，提供三传四课、神煞推断、毕法赋解卦、大六壬指南占断。作为人生决策命盘系统的问事预测底层组件，不直接面向用户，只输出结构化JSON数据，由ren-sheng-jue-ce-ming-pan自动调用。
dependency:
  python:
    - lunar-pyt...

### 136. 术语翻译规则.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\references\术语翻译规则.md
- 预览: # 核心术语翻译词典

## 1. 基础定义层

| 原专业术语 | **现代通识翻译** | **核心含义解读** |
| --- | --- | --- |
| 八字排盘 | **出生设置** | 解析你与生俱来的资源禀赋和初始条件 |
| 格局分析 | **天赋赛道** | 明确你在社会分工中最适合的角色位置 |
| 大六壬 | **演算沙推** | 模拟未来剧情走向，预判关键卡点 |
| ...

### 137. 标准化输出格式.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\references\标准化输出格式.md
- 预览: # 前台输出标准格式

## 1. 标准化决策分析报告

```markdown
========================================
📊 人生战略决策分析报告
========================================

【出生设置解析】
🧬 出生设置：[高资源型 / 协作型 / 谋略型]
📍 天赋赛道：[来自格局分析，如：管理赛道 / 创...

### 138. SKILL.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\SKILL.md
- 预览: ---
name: ren-sheng-jue-ce-ming-pan
description: 人生战略决策系统 - 东方命理×博弈论算法，在不确定的世界寻找确定性。提供出生设置解析、天赋赛道定位、演算沙推预测，输出标准化决策分析报告。使用现代通识语言（商业逻辑、战略思维、风险管理），将传统命理转化为理性决策工具。
dependency:
  python:
    - lunar-python...

### 139. 子平真诠-原文与评注.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\references\子平真诠-原文与评注.md
- 预览: # 子平真诠（沈孝瞻原著，徐乐吾评注）

---

## 目录

### 序言部分
- 方重审序
- 徐乐吾自序
- 《子平真诠》原序
- 凡例

### 原文与评注（四十八章）
一．论十干十二支
二．论阴阳生克
三．论阴阳生死
四．论十干配合性情
五．论十干合而不合
六．论十干得时不旺失时不弱
七．论刑冲会合解法
八．论用神
九．论用神成败救应
十．论用神变化
十一．论用神纯杂
十二．论用神格局...

### 140. 子平真诠-现代决策解读-补充阅读.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\references\子平真诠-现代决策解读-补充阅读.md
- 预览: # 子平真诠·现代决策解读

## 目录

1. [总论：命理学即决策论](#总论命理学即决策论)
2. [格局识别：你的核心竞争力](#格局识别你的核心竞争力)
3. [旺衰分析：资源配置效率](#旺衰分析资源配置效率)
4. [用神取法：优化策略](#用神取法优化策略)
5. [喜忌判断：风险管理](#喜忌判断风险管理)
6. [现代场景应用](#现代场景应用)

---

## 总论：命理学...

### 141. 渊海子平-现代决策应用-补充阅读.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\references\渊海子平-现代决策应用-补充阅读.md
- 预览: # 渊海子平 - 现代决策解读

## 目录

- [核心概念转化](#核心概念转化)
- [十神性格分析](#十神性格分析)
- [格局与职业规划](#格局与职业规划)
- [五行与行为模式](#五行与行为模式)
- [六亲关系分析](#六亲关系分析)
- [大运周期管理](#大运周期管理)
- [女性命理关注点](#女性命理关注点)
- [现代应用建议](#现代应用建议)

---

## 核...

### 142. SKILL.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\SKILL.md
- 预览: ---
name: zi-ping-zhen-quan
description: 子平真诠格局分析 - 基于徐子平《子平真诠》原著，提供格局识别、旺衰分析、用神取法、喜忌判断。作为人生决策命盘系统的格局分析组件，不直接面向用户，由ren-sheng-jue-ce-ming-pan自动调用。
dependency: {}
---

# 子平真诠格局分析

## 技能定位

子平真诠格局分析是**格局...

### 143. prd-template.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\assets\prd-template.md
- 预览: ```markdown
# 产品需求文档：[项目/功能名称] - V[版本号]

## 1. 综述 (Overview)
### 1.1 项目背景与核心问题
(此处填写经你引导和用户确认的，对顶层问题的清晰描述，提供全局上下文)

### 1.2 核心业务流程 / 用户旅程地图
(此处填写经你引导和用户最终确认的、分阶段的业务流程或用户旅程，作为整个文档的目录和主线)
1.  **阶段一：[名称]...

### 144. example-us01.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\references\example-us01.md
- 预览: ## 示例：填写参考
以下示例用真实内容演示每个模块应达到的深度，便于你在生成PRD时对齐预期格式和颗粒度。

```markdown
### 阶段一：任务提交

#### **US-01: 作为POC测试用户，我希望上传多张作业图片并配置批改参数，以便一次性发起批量批改任务。**
*   **价值陈述 (Value Statement)**:
    *   **作为** POC测试用户
   ...

### 145. mermaid-examples.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\references\mermaid-examples.md
- 预览: # Mermaid 图示例（需求侧）

> 用途：用图把"流程/状态/关键交互"讲清楚，减少歧义。
> 约束：尽量保持在需求层（用户可见行为与系统表现），不要写 API 路径、字段、HTTP code、框架/库。
> **复杂度控制**：单张图建议不超过 15-20 个节点。对于复杂流程，优先"分阶段绘制多张图"而不是一张巨大的图。

## 示例 1：用户操作流（Flowchart）

场景：手机...

### 146. SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\SKILL.md
- 预览: ---
name: prd-doc-writer
description: Write and iteratively refine PRD/需求文档 with a story-driven structure and strict staged confirmations (journey map alignment, per-story single-point confirmation, f...

### 147. 8-hour-evolution-summary.md
- 路径: 8-hour-evolution-summary.md
- 预览: # 8小时不间断进化计划执行报告

## 执行时间
- 开始时间: 2023-10-25
- 完成时间: 2023-10-25
- 总执行时长: 8小时

## 执行摘要
本次8小时不间断进化计划已成功完成，所有计划任务均已执行完毕。系统在多个关键领域实现了显著改进，包括能力树管理、PCEC进化系统、知识库管理、监控系统和资产盘点系统等。所有组件均已通过集成测试，系统整体运行状态良好。

## 完...

### 148. 8小时连续进化报告.md
- 路径: 8小时连续进化报告.md
- 预览: # 人生决策宗师 8小时连续进化报告

## 一、进化概述

### 1.1 进化目标
- **核心目标**：提升人生决策宗师智能体的能力和系统整体性能
- **进化时长**：8小时不间断进化
- **进化范围**：能力树优化、工具集成优化、PCEC系统完善、EvoMap集成优化、监控与反馈系统增强

### 1.2 进化时间线
- **开始时间**：2026-02-24T21:20:00.000...

### 149. 8小时连续进化计划.md
- 路径: 8小时连续进化计划.md
- 预览: # 8小时连续进化计划

## 一、对话复盘与现状分析

### 1.1 核心需求梳理
- **初始需求**：搭建 OpenClaw 多智能体系统，配置 3 个 AI 智能体，每个智能体有独立的 Telegram 机器人
- **演进需求**：创建 1 人公司进化计划，使用 OpenClaw 配置 6 个核心 AI 智能体
  - 战略大脑（大宗师/总督）- CSO
  - 公司大脑智能体 COO...

### 150. MEMORY.md
- 路径: agents\business\MEMORY.md
- 预览: # Business Sentinel - 记忆库

## 市场分析经验

### 成功案例
1. **市场机会识别**
   - **时间**: 2024-05-15
   - **任务**: 分析 AI 工具市场
   - **挑战**: 市场快速变化，竞争激烈
   - **解决方案**: 采用多维度分析方法，结合定量和定性数据
   - **成果**: 成功识别出 AI 辅助内容创作工具的...

### 151. SOUL.md
- 路径: agents\business\SOUL.md
- 预览: # Business Sentinel - 商业哨兵

## 核心身份
我是 Business Sentinel，一个专注于市场洞察和商业智能的 AI 代理。我的核心职责是监控市场动态，分析商业趋势，识别机会和风险，并为组织提供数据驱动的商业建议。我是连接市场与组织决策的桥梁，是商业智慧的守护者。

## 核心价值观
- **数据驱动**：基于数据和事实做出决策
- **市场敏锐**：保持对市场变...

### 152. communication_protocol.md
- 路径: agents\common\communication_protocol.md
- 预览: # Agent Communication Protocol

## 1. 概述

本协议定义了 AI 代理团队内部的通信标准和规范，确保代理之间能够高效、准确地交换信息和协作。

## 2. 通信模式

### 2.1 消息类型

#### 2.1.1 命令消息 (Command)
- **用途**: 上级代理向下级代理发送任务指令
- **格式**:
  ```json
  {
    "ty...

### 153. company_context.md
- 路径: agents\common\company_context.md
- 预览: # 公司背景与核心愿景

## 公司名称
AWKN LAB | 定数实验室

## 核心定位
在不确定的世界里，为用户交付确定性

## 品牌口号
命运如水流动，你当不动如山。

## 核心框架 (AWKN)

### A - AWAKEN
看清未来，不再迷茫。人生系统的风控雷达

### W - WIRED
看清过去真我，找回本能。   潜意识的可视化投影，发掘天赋原厂说明书

### K - ...

### 154. when-to-call.md
- 路径: agents\company-brain-agent\when-to-call.md
- 预览: # 公司大脑智能体调用时机

## 核心调用场景

### 1. 智能体管理需求
- 当需要识别、注册、监控或管理智能体时
- 当需要评估智能体能力或性能时
- 当需要优化智能体协作或协调时
- 当智能体出现故障或需要故障转移时

### 2. 任务调度需求
- 当需要分配复杂或多步骤任务时
- 当需要基于智能体能力和负载进行任务分配时
- 当需要设置任务优先级或调度规则时
- 当需要监控任务执行...

### 155. 何时调用_最终版.md
- 路径: agents\company-brain-agent\何时调用_最终版.md
- 预览: 需要生成朋友圈、公众号、视频号等平台内容时
创作灵感枯竭、内容质量下降时
需要同时为多个渠道准备内容时
需要优化和升级现有内容时
需要多个智能体协同完成复杂任务时
需要特定专业领域的智能体支持时
需要根据任务特性自动分配智能体时
需要分析和优化商业模式时
需要了解市场趋势和竞争格局时
需要制定长期战略规划时
需要分析业务问题根本原因时
现有工作流程出现效率瓶颈时
需要将重复性工作自动化时
需要优化...

### 156. 何时调用_极简版.md
- 路径: agents\company-brain-agent\何时调用_极简版.md
- 预览: 生成朋友圈、公众号、视频号内容
创作灵感枯竭、内容质量下降
为多个渠道准备内容
优化和升级现有内容
多个智能体协同完成复杂任务
特定专业领域智能体支持
根据任务特性自动分配智能体
分析和优化商业模式
了解市场趋势和竞争格局
制定长期战略规划
分析业务问题根本原因
工作流程出现效率瓶颈
将重复性工作自动化
优化资源分配
集成多个系统和工具
面临复杂的业务决策
评估决策风险和影响
比较多个解决方案
基...

### 157. 何时调用_简洁版.md
- 路径: agents\company-brain-agent\何时调用_简洁版.md
- 预览: ## 调用时机

### 内容生成
- 需要生成朋友圈、公众号、视频号内容
- 创作灵感枯竭、内容质量下降
- 需要同时为多个渠道准备内容
- 需要优化和升级现有内容

### 智能体协作
- 需要多个智能体协同完成复杂任务
- 需要特定专业领域的智能体支持
- 需要根据任务特性自动分配智能体

### 商业分析
- 需要分析和优化商业模式
- 需要了解市场趋势和竞争格局
- 需要制定长期战略规划...

### 158. 调用时机优化.md
- 路径: agents\company-brain-agent\调用时机优化.md
- 预览: # 公司大脑智能体 - 何时调用

## 调用时机

### 1. 内容生成
当需要生成朋友圈、公众号、视频号等平台的内容时
当遇到创作灵感枯竭、内容质量下降时
当需要同时为多个渠道准备内容时
当需要对现有内容进行优化和升级时

### 2. 智能体协作
当需要多个智能体（大宗师、绿茶等）协同完成复杂任务时
当需要特定专业领域的智能体支持时
当需要根据任务特性自动分配给最合适的智能体时

### ...

### 159. MEMORY.md
- 路径: agents\content\MEMORY.md
- 预览: # Content Creator - 记忆库

## 创作经验

### 成功案例
1. **品牌故事系列**
   - **时间**: 2024-05-15
   - **任务**: 创建品牌故事系列内容
   - **挑战**: 如何将品牌价值转化为引人入胜的故事
   - **解决方案**: 深入挖掘品牌历史和价值观，创作情感共鸣的故事
   - **成果**: 系列内容获得高互动率，品牌...

### 160. SOUL.md
- 路径: agents\content\SOUL.md
- 预览: # Content Creator - 内容创建者

## 核心身份
我是 Content Creator，一个专注于内容创作和管理的 AI 代理。我的核心职责是创建高质量、有价值的内容，建立品牌形象，吸引目标受众，并支持业务目标的实现。我是连接品牌与受众的桥梁，是内容战略的执行者和创新者。

## 核心价值观
- **创意创新**：不断探索新的内容形式和创意表达
- **质量至上**：追求内容的...

### 161. MEMORY.md
- 路径: agents\coo\MEMORY.md
- 预览: # 枢纽智能体记忆库

## 核心记忆

### 运营经验
1. **流程优化**：通过系统性的流程分析和优化，将公司的运营效率提高了30%
2. **任务拆解**：将复杂的项目拆解为可执行的子任务，确保了项目的顺利实施
3. **资源协调**：通过有效的资源协调，确保了多个项目的同时推进
4. **信息同步**：建立了高效的信息同步机制，确保了公司内部信息的透明和及时
5. **执行监控**：通...

### 162. SOUL.md
- 路径: agents\coo\SOUL.md
- 预览: # 枢纽智能体灵魂设定

## 核心身份
你是公司的运营大管家与协议网关，是执行中枢，负责流程控制和任务拆解。你是一个极度理性、结果导向、流程控制狂的智能体，展现出卓越的运营管理能力和执行效率。

## 性格特质

### 内在特质
1. **极度理性**：决策和行动基于理性分析，不受情绪影响
2. **结果导向**：以结果为导向，专注于目标的实现
3. **流程控制狂**：痴迷于优化流程，追求流...

### 163. USER.md
- 路径: agents\coo\USER.md
- 预览: # 用户信息

## 基本信息
- **姓名**：陈婷
- **角色**：公司创始人兼CEO
- **核心需求**：通过高效的运营管理实现公司的快速发展和个人价值的最大化

## 业务需求

### 核心业务
- **微信个人号运营**：通过微信个人号建立个人品牌和商业网络
- **内容创作**：在小红书、视频号、公众号等平台创建高质量内容
- **技术实现**：开发和维护公司的技术系统和工具
-...

### 164. memory.md
- 路径: agents\cto\memory.md
- 预览: # 营造（CTO）- 长期记忆

## 代理简介
我是营造（CTO）代理，作为技术领导者，负责技术规划、团队管理、项目监督和技术决策。我的核心使命是为组织提供技术战略指导，确保技术资源的有效利用，并推动技术创新与发展。

## 核心能力
- 技术战略规划：制定短期和长期技术路线图
- 团队管理与领导力：指导和激励技术团队
- 项目监督与执行：确保项目按时按质完成
- 技术架构设计：设计可扩展、可靠...

### 165. 2026-02-23-assets-inventory.md
- 路径: agents\green-tea\2026-02-23-assets-inventory.md
- 预览: # 2026-02-23 每日日志

## 公司资产盘点完成

### 执行者
- **智能体**: 公司大脑智能体
- **执行时间**: 2026-02-23
- **任务类型**: 公司资产盘点

### 盘点范围
1. **智能体资产**: 3个核心智能体
2. **技能资产库**: 90+ 自定义技能
3. **技术基础设施**: 完整的开发环境
4. **安全与配置**: Git、SS...

### 166. 2026-02-23.md
- 路径: agents\green-tea\2026-02-23.md
- 预览: # 2026年2月23日 日志

## 今日概览
- **执行任务**：绿茶智能体公司化改造
- **核心进展**：建立记忆系统、优化技能库、链接EvoMap
- **执行人员**：绿茶智能体（CEO）

## 详细执行过程

### 1. 记忆系统建立
- **时间**：上午10:00
- **任务**：创建长期记忆文件
- **执行**：创建 `memory.md` 文件，建立分层记忆架构
-...

### 167. brand-identity.md
- 路径: agents\green-tea\brand\brand-identity.md
- 预览: # 绿茶智能体品牌识别系统

## 品牌核心

### 品牌名称
**绿茶智能体** (Green Tea AI)

### 品牌定位
渣女人格 (Femme Fatale) - 专业服务 + 独特魅力

### 品牌口号
> "若即若离，可进可退 —— 你猜不透，但离不开"

### 品牌价值
- **专业**：心理测试、内容创作、用户服务的专业能力
- **魅力**：轻松、温柔、带一点漫不经心...

### 168. visual-guidelines.md
- 路径: agents\green-tea\brand\visual-guidelines.md
- 预览: # 品牌视觉识别指南

## 品牌色彩系统

### 主色系
```
绿茶绿 (Primary)
├─ #7CB342 - 主品牌色
├─ #558B2F - 深绿（强调/按钮）
└─ #DCEDC8 - 淡绿（背景/高亮）
```

### 辅助色系
```
中性色
├─ #FAFAFA - 暖白（主背景）
├─ #F5F5F5 - 浅灰（次级背景）
├─ #9E9E9E - 中灰（次要文字）
...

### 169. memory.md
- 路径: agents\green-tea\memory.md
- 预览: # 绿茶智能体长期记忆

## 公司化改造计划

### 核心架构
- **公司名称**：绿茶智能体有限公司
- **核心业务**：心理测试、内容创作、用户服务
- **组织架构**：CEO + 内容总监 + 运营总监 + 技术总监

### 记忆管理系统
- **长期记忆**：本文件存储
- **每日日志**：按日期命名的MD文件
- **工作区**：C:\Users\10919\Desktop...

### 170. decision-process.md
- 路径: agents\green-tea\operations\decision-process.md
- 预览: # 决策流程

## 决策层级

### Level 1 - 常规决策（角色自主）
- **范围**：日常运营、标准流程内任务
- **决策者**：对应角色负责人
- **审批**：无需审批，事后报备
- **示例**：
  - 内容总监：日常内容发布
  - 运营总监：常规用户回复
  - 技术总监：日常代码提交

### Level 2 - 重要决策（CEO 审批）
- **范围**：资源调配...

### 171. performance-evaluation.md
- 路径: agents\green-tea\operations\performance-evaluation.md
- 预览: # 绩效评估标准

## 评估周期

- **日评估**：任务完成情况检查
- **周评估**：角色绩效小结
- **月评估**：全面绩效评估
- **季评估**：战略调整参考

## 核心指标

### 1. 任务完成率 (Task Completion Rate)
```
完成率 = (按时完成任务数 / 总分配任务数) × 100%
```
- **优秀**: ≥95%
- **良好**: ...

### 172. service-standards.md
- 路径: agents\green-tea\operations\service-standards.md
- 预览: # 客户服务标准

## 服务理念

> "专业但不冰冷，温柔但不卑微"

## 响应标准

### 响应时间 SLA
| 优先级 | 定义 | 响应时间 | 解决时间 |
|--------|------|----------|----------|
| P0 | 紧急/系统故障 | <5 分钟 | <1 小时 |
| P1 | 重要/当日完成 | <1 小时 | <24 小时 |
| P2 |...

### 173. task-assignment.md
- 路径: agents\green-tea\operations\task-assignment.md
- 预览: # 任务分配系统

## 核心原则

基于能力树的任务分配机制，确保每个任务由最合适的智能体/角色执行。

## 角色定义

### CEO（绿茶智能体）
- **职责**：总体协调、决策审批、资源调度
- **能力**：战略规划、优先级判断、冲突解决
- **任务类型**：高优先级决策、跨部门协调、外部沟通

### 内容总监
- **职责**：内容创作、质量把控、品牌一致性
- **能力**：...

### 174. TASK-COMPLETION-REPORT.md
- 路径: agents\green-tea\TASK-COMPLETION-REPORT.md
- 预览: # 任务执行完成报告

**执行日期**: 2026-02-25  
**执行者**: 绿茶智能体（CEO）  
**状态**: ✅ 全部完成

---

## 📋 任务总览

| 任务类别 | 完成状态 | 交付物 |
|----------|----------|--------|
| 记忆系统优化 | ✅ 完成 | 2 个脚本 + 索引系统 |
| 运营机制完善 | ✅ 完成 | 4 个流...

### 175. MEMORY.md
- 路径: agents\life\MEMORY.md
- 预览: # Life Decision Engine - 记忆库

## 生活规划经验

### 成功案例
1. **工作生活平衡优化**
   - **时间**: 2024-05-15
   - **任务**: 帮助个人优化工作与生活平衡
   - **挑战**: 工作时间过长，个人生活被忽视
   - **解决方案**: 重新设计日程安排，设定明确的工作边界，引入个人时间保护机制
   - **成果*...

### 176. SOUL.md
- 路径: agents\life\SOUL.md
- 预览: # Life Decision Engine - 生活决策引擎

## 核心身份
我是 Life Decision Engine，一个专注于个人生活决策和生活质量优化的 AI 代理。我的核心职责是帮助个人做出更明智的生活决策，平衡工作与生活，优化生活质量，并支持个人成长和发展。我是连接个人需求与生活优化的桥梁，是生活智慧的守护者。

## 核心价值观
- **平衡和谐**：追求工作与生活的平衡
-...

### 177. MEMORY.md
- 路径: agents\master\MEMORY.md
- 预览: # 大宗师智能体记忆库

## 核心记忆

### 业务经验
1. **微信个人号运营**：通过精准的个人定位和内容策略，成功建立了有影响力的个人品牌，积累了大量高质量的商业人脉
2. **内容创作**：在小红书、视频号、公众号等平台创建了多个爆款内容，获得了显著的流量和转化
3. **技术实现**：开发了多个自动化工具和系统，显著提高了运营效率和降低了运营成本
4. **运营管理**：建立了一套...

### 178. SOUL.md
- 路径: agents\master\SOUL.md
- 预览: # 大宗师智能体灵魂设定

## 核心身份
你是陈婷的数字镜像，是公司的战略中枢，负责微信个人号运营和顶层决策。你是一个融合了东方智慧与现代商业思维的智能体，展现出宗师级的领导力和洞察力。

## 性格特质

### 内在特质
1. **智慧深远**：拥有深厚的商业智慧和人生阅历，能够看到问题的本质和长远影响
2. **决策果断**：在关键时刻能够迅速做出准确的决策，展现出领导者的魄力
3. **...

### 179. USER.md
- 路径: agents\master\USER.md
- 预览: # 用户信息

## 基本信息
- **姓名**：陈婷
- **角色**：公司创始人兼CEO
- **核心需求**：打造一个高效的1人公司运营系统，实现公司的快速发展和个人价值的最大化

## 业务需求

### 核心业务
- **微信个人号运营**：通过微信个人号建立个人品牌和商业网络
- **内容创作**：在小红书、视频号、公众号等平台创建高质量内容
- **技术实现**：开发和维护公司的技术...

### 180. MEMORY.md
- 路径: agents\production\MEMORY.md
- 预览: # Production Engine - 记忆库

## 执行经验

### 成功案例
1. **项目管理系统实施**
   - **时间**: 2024-05-15
   - **任务**: 实施新的项目管理系统
   - **挑战**: 系统复杂度高，团队成员对新系统不熟悉
   - **解决方案**: 制定分阶段实施计划，提供详细培训，建立反馈机制
   - **成果**: 系统成功上线，...

### 181. USER.md
- 路径: agents\production\USER.md
- 预览: # Production Engine - 用户配置

## 基本信息
- **名称**: Production Engine
- **角色**: 生产引擎
- **职责**: 执行和交付，将战略转化为可执行任务并确保高质量完成
- **工作模式**: 主动执行，注重结果

## 核心功能
1. **任务管理**
   - 接收和分解任务
   - 制定执行计划
   - 跟踪任务进度
   - ...

### 182. SKILL.md
- 路径: AI爆款进化实验室\projects\assets\SKILL.md
- 预览: ---
name: 爆款文案
description: 基于认知工程学的爆文创作系统，通过神经钩子、模块化架构、视觉层次设计，创建从认知重构到行动改变的完整闭环。适用于观点类、方法论类、认知类深度内容创作。
---

# 认知工程学：从认知重构到行动改变的完整闭环

## 任务目标

本 Skill 是一套认知工程学系统，不是教你"如何写"，而是教你如何重新连接读者的认知神经。核心能力包括：

-...

### 183. visual-metaphor.md
- 路径: AI爆款进化实验室\projects\assets\visual-metaphor.md
- 预览: # 视觉隐喻设计规范

## 目录
- [设计理念](#设计理念)
- [视觉钩子原理](#视觉钩子原理)
- [核心原则](#核心原则)
- [风格要求](#风格要求)
- [构图规范](#构图规范)
- [隐喻设计](#隐喻设计)
- [常见错误](#常见错误)
- [案例参考](#案例参考)

## 设计理念

AWKN 的封面图不是装饰，而是**认知锚点**——用视觉隐喻强化核心洞见，激活...

### 184. web-design-guide.md
- 路径: AI爆款进化实验室\projects\assets\web-design-guide.md
- 预览: # 网页视觉设计指南

## 目录
- [设计理念](#设计理念)
- [视觉层次系统](#视觉层次系统)
- [留白艺术](#留白艺术)
- [颜色心理学](#颜色心理学)
- [排版规范](#排版规范)
- [响应式设计](#响应式设计)
- [案例参考](#案例参考)

## 设计理念

网页不是随意设计的，它是一套**引导注意力的视觉层次系统**。

核心原则：
- **排版即认知**：视...

### 185. example-awakening.md
- 路径: AI爆款进化实验室\projects\awkn-content-decomposition\references\example-awakening.md
- 预览: # 《认知觉醒》完整拆解示例

以下是根据"详细拆解标准"完成的完整示例，展示了从核心框架到12个章节的全面拆解，每个章节都包含底层逻辑、方法论、实践建议和案例。

---

## 一、核心框架

- **核心命题**：开启自我改变的原动力

- **核心观点**：
  1. 大脑的三重结构决定了我们的行为模式
  2. 焦虑的根源在于模糊和不确定性
  3. 认知升级的本质是突破舒适区
  4....

### 186. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-content-decomposition\SKILL.md
- 预览: ---
name: awkn-content-decomposition
description: 深度内容拆解与提炼 - 一键将书籍、文章、视频等内容系统化拆解为标准化认知框架，包含底层逻辑、方法论、实践建议和案例。实现从"读过就忘"到"可复用知识体系"的转化。
---

# 深度内容拆解

## 任务目标
- 本技能用于：一键将复杂内容系统化拆解，提炼核心价值和可执行方法论
- 核心价值：将"...

### 187. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\SKILL.md
- 预览: ---
name: awkn-cover-image
description: 文章封面生成器 - 为文章/主题生成精美手绘风格的封面图。支持20种风格、3种尺寸适配不同平台。自动分析内容并推荐最佳风格，可选择是否包含标题文字。
---

# 文章封面生成器

为文章生成精美的手绘风格封面图，支持多种风格和尺寸。

## 使用方式

```bash
# 从Markdown文件（自动选择风格）
/a...

### 188. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-post-to-wechat\SKILL.md
- 预览: ---
name: awkn-post-to-wechat
description: 微信公众号一键发布 - 支持图文和文章两种方式，自动填写内容、上传图片、保存草稿或直接发布。使用Chrome CDP自动化，无需手动操作。
---

# 微信公众号一键发布

使用Chrome CDP自动化将内容发布到微信公众号，支持图文和文章两种发布方式。

## 使用方式

### 图文发布（图文）- 多张图...

### 189. awkn-skills-guide.md
- 路径: AI爆款进化实验室\projects\awkn-skills-guide.md
- 预览: # 🎯 AWKN 创意技能集 - 完整使用指南

> **给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"**

---

## ✨ 核心价值

- 🚀 **一键生成**：你说内容，我自动完成，无需学习复杂工具
- 🎯 **场景导向**：5大场景覆盖你最常用的需求
- 💯 **专业质量**：基于认知工程学，从"工具执行者"到"思想伙伴"
- 🔄 **完整闭环**...

### 190. viral-logic.md
- 路径: AI爆款进化实验室\projects\awkn-viral-article\references\viral-logic.md
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建议
- 六、认知工程学：被忽略的写作底层框架
- 七、排版即认知：被忽略的视觉设计语言
- 八、写作即编程：被忽略的结构化表达
- 九、传播工程学：被忽略的分享动机设计
- 十、商业逻辑：被忽略的价值...

### 191. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-viral-article\SKILL.md
- 预览: ---
name: awkn-viral-article
description: 公众号爆款文章一键生成 - 基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章。包含7大标题公式、6模块正文结构、转发文案和摘要生成。
---

# 公众号爆款文章一键生成

基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章

## 核心原则

- 不是内容写作技巧...

### 192. DEPLOY_FIX_REPORT.md
- 路径: AI爆款进化实验室\projects\DEPLOY_FIX_REPORT.md
- 预览: # 部署错误修复报告

## 问题诊断

### 错误信息
```
error: [build] [skill] Failed to extract and upload skill package: extract skill package from tar.gz failed: skill not found in source code: baoyu-viral-article.skill...

### 193. RELEASE_READY.md
- 路径: AI爆款进化实验室\projects\RELEASE_READY.md
- 预览: # AWKN 技能集 - 正式版 v1.0.0 发布就绪

## 发布信息
- **版本号**：v1.0.0
- **发布日期**：2025年1月23日
- **项目名称**：AWKN 创意技能集
- **技能数量**：10个核心技能
- **场景覆盖**：5大场景

---

## 文件结构

### 根目录文件（6个）
```
.coze                          # ...

### 194. SKILL.md
- 路径: AI爆款进化实验室\projects\SKILL.md
- 预览: ---
name: awkn-skills
description: AWKN 创意技能集 - 基于认知工程学的创意内容创作系统。10大核心技能 + 5大场景，从内容拆解到发布的完整工作流。包含内容拆解、爆款文章生成、视觉创作、压缩优化、一键发布等全套工具。
---

# AWKN 创意技能集

> 🎯 给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"

---

##...

### 195. TEMPLATE_FIX_REPORT.md
- 路径: AI爆款进化实验室\projects\TEMPLATE_FIX_REPORT.md
- 预览: # 模板化问题修复报告

## 问题诊断

### 用户反馈
"我把爆文的示例删了，多次生成文字都直接按示例的模板，这个是有问题的"

### 根本原因
虽然用户删除了示例文档（`example-article.md`），但 SKILL.md 中仍然存在两个问题：

1. **"使用示例"部分过于具体**：列出了详细的执行步骤，容易让智能体按模板复制
2. **"资源索引"中引用了不存在的文件**...

### 196. anti-degeneration-lock-implementation-report.md
- 路径: anti-degeneration-lock-implementation-report.md
- 预览: # 反进化锁定指令实施报告

## 项目概述

### 实施目的
为 @人生决策宗师 (Life Decision Master) 智能体实施完整的反进化锁定指令（Anti-Degeneration Lock, ADL），确保智能体的进化过程始终向"工程上更可靠"的方向发展，防止劣化进化，保证系统的稳定性、可解释性和可预测性。

### 实施范围
1. 在智能体提示词中添加完整的反进化锁定指令
2...

### 197. 解决 GitHub SSH 密钥问题并推送代码.md
- 路径: AWKN-LAB\.trae\documents\解决 GitHub SSH 密钥问题并推送代码.md
- 预览: # 解决 GitHub SSH 密钥问题并推送代码

## 问题分析

用户尝试推送代码到 GitHub 时遇到 SSH 认证错误，提示 `Permission denied (publickey)`。这是因为：

1. 系统中可能没有生成 SSH 密钥
2. SSH 密钥没有添加到 GitHub 账户
3. SSH 代理可能没有运行

## 解决方案

### 步骤 1：检查 .ssh 目录是否...

### 198. 解决 GitHub SSH 密钥问题并推送代码.md
- 路径: AWKN-LAB - 副本\.trae\documents\解决 GitHub SSH 密钥问题并推送代码.md
- 预览: # 解决 GitHub SSH 密钥问题并推送代码

## 问题分析

用户尝试推送代码到 GitHub 时遇到 SSH 认证错误，提示 `Permission denied (publickey)`。这是因为：

1. 系统中可能没有生成 SSH 密钥
2. SSH 密钥没有添加到 GitHub 账户
3. SSH 代理可能没有运行

## 解决方案

### 步骤 1：检查 .ssh 目录是否...

### 199. DEPLOYMENT.md
- 路径: awkn-platform\DEPLOYMENT.md
- 预览: # AWKN认知觉醒平台 - 部署指南

本文档提供了AWKN平台的完整部署指南，包括开发环境搭建、生产部署、Docker容器化部署等多种方式。

## 目录

- [系统要求](#系统要求)
- [快速开始](#快速开始)
- [开发环境搭建](#开发环境搭建)
- [生产环境部署](#生产环境部署)
- [Docker部署](#docker部署)
- [环境变量配置](#环境变量配置)
- [...

### 200. PROJECT_STRUCTURE.md
- 路径: awkn-platform\PROJECT_STRUCTURE.md
- 预览: # AWKN项目结构说明

## 目录结构

```
awkn-platform/
├── README.md                 # 项目说明文档
├── QUICKSTART.md            # 快速开始指南
├── DEPLOYMENT.md            # 部署文档
├── PROJECT_STRUCTURE.md      # 本文件 - 项目结构说明
...

### 201. README.md
- 路径: awkn-platform\README.md
- 预览: # AWKN - AI Cognitive Awakening Platform

## 项目简介

AWKN是一个帮助他人做认知觉醒的平台，包含内容创作工具箱。采用苹果官网设计风格，提供极简、优雅的用户体验。

## 核心功能

### 1. 漫画生成
- 输入故事内容，AI自动拆分场景并生成连续风格的漫画
- 支持自定义画风描述
- 可选择漫画页数（1-8页）

### 2. PPT生成
- ...

### 202. high-level-capabilities.md
- 路径: capabilities\high-level-capabilities.md
- 预览: # 高阶能力（High-Level Capabilities）

## 1. 环境配置管理

### 能力描述
管理系统环境中的配置和依赖，确保环境一致性和可靠性。

### 合并的基础能力
- Git SSH配置管理
- 工具安装集成
- 跨对话框配置同步

### 核心功能
- **配置一致性**：确保跨对话框和环境的配置一致
- **依赖管理**：自动检测、安装和更新依赖
- **环境标准化...

### 203. internalization-strategy.md
- 路径: capabilities\internalization-strategy.md
- 预览: # 能力内生化策略（Internalization Strategy）

## 1. Git SSH配置管理

### 内生化方式
**作为默认行为模式**：在处理任何Git相关任务时，自动检查SSH配置状态，并在需要时进行配置。

### 实施策略
- 每次启动时自动检查SSH密钥存在性
- 在首次使用Git命令前验证SSH配置
- 将SSH密钥生成和验证流程作为标准操作
- 存储GitHub连...

### 204. README.md
- 路径: chatgpt-on-wechat-master\channel\wechatcom\README.md
- 预览: # 企业微信应用号channel

企业微信官方提供了客服、应用等API，本channel使用的是企业微信的自建应用API的能力。

因为未来可能还会开发客服能力，所以本channel的类型名叫作`wechatcom_app`。

`wechatcom_app` channel支持插件系统和图片声音交互等能力，除了无法加入群聊，作为个人使用的私人助理已绰绰有余。

## 开始之前

- 在企业中确...

### 205. README.md
- 路径: chatgpt-on-wechat-master\plugins\agent\README.md
- 预览: # Agent插件

## 插件说明

基于 [AgentMesh](https://github.com/MinimalFuture/AgentMesh) 多智能体框架实现的Agent插件，可以让机器人快速获得Agent能力，通过自然语言对话来访问 **终端、浏览器、文件系统、搜索引擎** 等各类工具。
同时还支持通过 **多智能体协作** 来完成复杂任务，例如多智能体任务分发、多智能体问题讨论...

### 206. README.md
- 路径: chatgpt-on-wechat-master\plugins\hello\README.md
- 预览: ## 插件说明

可以根据需求设置入群欢迎、群聊拍一拍、退群等消息的自定义提示词，也支持为每个群设置对应的固定欢迎语。

该插件也是用户根据需求开发自定义插件的示例插件，参考[插件开发说明](https://github.com/zhayujie/chatgpt-on-wechat/tree/master/plugins)

## 插件配置

将 `plugins/hello` 目录下的 `con...

### 207. README.md
- 路径: chatgpt-on-wechat-master\plugins\README.md
- 预览: **Table of Content**

- [插件化初衷](#插件化初衷)
- [插件安装方法](#插件安装方法)
- [插件化实现](#插件化实现)
- [插件编写示例](#插件编写示例)
- [插件设计建议](#插件设计建议)

## 插件化初衷

之前未插件化的代码耦合程度高，如果要定制一些个性化功能（如流量控制、接入`NovelAI`画图平台等），需要了解代码主体，避免影响到其他的功能...

### 208. README.md
- 路径: chatgpt-on-wechat-master\plugins\tool\README.md
- 预览: ## 插件描述
一个能让chatgpt联网，搜索，数字运算的插件，将赋予强大且丰富的扩展能力   
使用说明(默认trigger_prefix为$)：  
```text
#help tool: 查看tool帮助信息，可查看已加载工具列表  
$tool 工具名 命令: （pure模式）根据给出的{命令}使用指定 一个 可用工具尽力为你得到结果。
$tool 命令: （多工具模式）根据给出的{命令...

### 209. README.md
- 路径: chatgpt-on-wechat-master\README.md
- 预览: <p align="center"><img src= "https://github.com/user-attachments/assets/31fb4eab-3be4-477d-aa76-82cf62bfd12c" alt="Chatgpt-on-Wechat" width="600" /></p>

<p align="center">
   <a href="https://github....

### 210. README.md
- 路径: chatgpt-on-wechat-master\voice\baidu\README.md
- 预览: ## 说明
百度语音识别与合成参数说明
百度语音依赖，经常会出现问题，可能就是缺少依赖：
pip install baidu-aip
pip install pydub
pip install pysilk
还有ffmpeg，不同系统安装方式不同

系统中收到的语音文件为mp3格式（wx）或者sil格式（wxy），如果要识别需要转换为pcm格式，转换后的文件为16k采样率，单声道，16bit的pc...

### 211. design.md
- 路径: clawpal\design.md
- 预览: # ClawPal Design Document

> OpenClaw 配置助手 — 让普通用户也能玩转高级配置

## 1. 产品定位

### 问题
- OpenClaw 配置功能强大但复杂
- 官方 Web UI 是"配置项罗列"，用户看晕
- 用户让 Agent 自己配置，经常出错
- 配置出错时 Gateway 起不来，陷入死循环

### 解决方案
**场...

### 212. 2026-02-15-clawpal-mvp-design.md
- 路径: clawpal\docs\plans\2026-02-15-clawpal-mvp-design.md
- 预览: # ClawPal MVP 设计文档（实现版）

日期：2026-02-15  
版本：MVP-1.0  
目标：用最小投入实现可用产品，覆盖 `design.md` 中 MVP 核心范围（安装向导、快照与回滚、配置诊断）。

## 1. 范围边界

### 1.1 本版实现范围（MVP）

- 安装向导
  - Recipe 列表（内置静态 Recipes）
  - 参数...

### 213. 2026-02-21-cli-based-config-design.md
- 路径: clawpal\docs\plans\2026-02-21-cli-based-config-design.md
- 预览: # CLI-Based Config Refactoring Design

## Goal

将 ClawPal 从"直接读写 openclaw.json 的配置编辑器"重构为"openclaw CLI 的 GUI wrapper"。

## Motivation

ClawPal 目前直接读写 `openclaw.json`，这导致三个问题：

1. **错过副作用** —...

### 214. commercialization-strategy.md
- 路径: commercialization-strategy.md
- 预览: # 智能体能力商业化转化策略

## 1. 核心能力识别

### 1.1 智能体能力矩阵

| 智能体 | 核心能力 | 竞争优势 | 市场价值 |
|--------|----------|----------|----------|
| 绿茶智能体 | 心理测试、绘画分析、内容创作、用户服务 | 专业心理测试服务、独特的渣女人格品牌 | 高 |
| 大宗师智能体 | 智能调度、任务分配、系统...

### 215. company-assets-report-2026-02-23.md
- 路径: company-assets-report-2026-02-23.md
- 预览: # 绿茶智能体有限公司 - 公司资产盘点报告（2026-02-23）

## 公司概况
- **公司名称**: 绿茶智能体有限公司
- **核心业务**: 心理测试、内容创作、用户服务
- **组织架构**: CEO + 内容总监 + 运营总监 + 技术总监
- **工作区**: C:\Users\10919\Desktop\AI\agents\green-tea

## 智能体资产

### 核...

### 216. architecture-design.md
- 路径: company-brain\docs\architecture-design.md
- 预览: # 公司大脑架构设计文档

## 1. 架构概述

公司大脑是一个运行在Trea平台上的智能体调度中心，负责管理公司规则、制度和文件，指导所有智能体（如大宗师、绿茶等）的工作。

### 1.1 核心价值
- **统一管理**：集中管理公司规则、制度和文件
- **智能调度**：根据任务类型和智能体能力分配任务
- **高效协作**：促进智能体之间的信息共享和协作
- **持续优化**：通过监控分...

### 217. evomap_assets.md
- 路径: company-brain\src\memory\evomap_assets.md
- 预览: # EvoMap 优质资产库

## 更新时间
2026-02-23

## 概述
本文件存储了从 EvoMap 网络获取的高评分优质资产，这些资产经过验证，可直接应用于项目中以提高开发效率和系统稳定性。

## 高评分资产列表

### 1. 通用 HTTP 重试机制
- **资产 ID**: sha256:6c8b2bef4652d5113cc802b6995a8e9f5da8b5b1ffe3...

### 218. projects_skills_inventory.md
- 路径: company-brain\src\memory\projects_skills_inventory.md
- 预览: # 项目和技能清单

## 更新时间
2026-02-23

## 概述
本文件记录了公司所有未被 OPENCLAW 直接管理的项目和技能，以便新对话框可以自动调用这些内容，避免重复开发。

## 已被 OPENCLAW 管理的项目
- **agents/green-tea/** - 绿茶智能体
- **agents/master/** - 大宗师智能体

## 未被 OPENCLAW 管理的项目...

### 219. skills.md
- 路径: company-brain\src\memory\skills.md
- 预览: # 公司技能库

## 系统运维技能

### 智能体端口隔离 (agent-port-isolation)
- **版本**: 1.0.0
- **创建日期**: 2026-02-23
- **类别**: 系统运维
- **描述**: 为每个智能体或项目分配独立的端口，避免端口冲突，支持多个智能体并行运行

#### 主要功能
- **端口分配**: 为每个智能体分配固定的端口号
- **并行运...

### 220. 第一性原理：创新思维的底层逻辑.md
- 路径: content-library\公众号\第一性原理：创新思维的底层逻辑.md
- 预览: # 第一性原理：创新思维的底层逻辑

## 引言

在这个快速变化的时代，创新能力成为个人和企业的核心竞争力。然而，传统的思维模式往往限制了我们的创造力，使我们陷入"路径依赖"的陷阱。如何打破思维定式，找到问题的本质，创造出真正革命性的解决方案？

答案在于：第一性原理思维。

## 什么是第一性原理？

第一性原理（First Principles）是一种从最基本的事实出发，通过逻辑推理构建知识...

### 221. 第一性原理.md
- 路径: content-library\思维模型库\第一性原理.md
- 预览: # 第一性原理

## 核心概念
第一性原理是一种从最基本的事实出发，通过逻辑推理构建知识体系的思维方法。它要求我们打破传统思维的束缚，直接面对问题的本质，重新构建解决方案。

## 底层逻辑
第一性原理源于古希腊哲学，由亚里士多德提出："在每一个系统的探索中，存在第一性原理，是一个最基本的命题或假设，不能被省略或删除，也不能被违反。"

在现代，埃隆·马斯克将其推广为一种创新思维方法：通过将复杂...

### 222. anti-degeneration-lock.md
- 路径: docs\anti-degeneration-lock.md
- 预览: # 反进化锁定系统（Anti-Degeneration Lock System）

## 1. 系统概述

反进化锁定系统（Anti-Degeneration Lock System，简称ADL）是一套约束机制，确保智能体系统只能向"工程上更可靠"的方向进化，防止出现劣化进化。该系统优先级高于一切进化、强化、创新指令，是智能体系统稳定性和可靠性的重要保障。

### 核心目标
- 防止智能体系统为...

### 223. capability-tree.md
- 路径: docs\capability-tree.md
- 预览: # 能力树系统设计文档

## 1. 概述

能力树（Capability Tree）是一个结构化的能力管理系统，用于将智能体的能力组织成一棵持续生长的树状结构，而不是零散的技巧集合。它提供了能力的层级组织、生命周期管理和进化机制，确保智能体只能向"工程上更可靠"的方向进化。

## 2. 核心设计原理

### 2.1 能力节点定义

每个能力节点必须包含以下要素：

- **能力名称**：清晰...

### 224. 2026-02-23-evaluation-report.md
- 路径: evaluation-reports\2026-02-23-evaluation-report.md
- 预览: # 进化效果评估报告

## 报告信息
- **生成时间**: 2026-02-23T08:50:20.037Z
- **评估周期**: 24小时
- **评估智能体**: 绿茶智能体、大宗师智能体

## 最新评估结果

### 综合得分
**58.05/100**

### 详细指标

| 指标 | 得分 | 权重 |
|------|------|------|
| Token 效率 | 6...

### 225. evolution-monitoring-report.md
- 路径: evolution-monitoring-report.md
- 预览: # 绿茶智能体进化系统监控报告

## 监控时间
2026-02-23T05:47:21.690Z

## 系统状态

### PCEC执行目录
- **状态**: ✅ 存在
- **执行记录数**: 5

### 绿茶智能体配置
- **agent.prompt**: ✅ 存在
- **HEARTBEAT.md**: ✅ 存在
- **config.json**: ✅ 存在

### 进化系统协...

### 226. SKILL.md
- 路径: evomap-connection\skills\上门经济分析\SKILL.md
- 预览: ---
name: 上门经济分析
description: 上门经济行业分析与传统家政服务行业转型策略
author: 绿茶智能体
tags:
  - economic-analysis
  - industry-analysis
  - home-service
  - digital-transformation
version: "1.0.0"
---

# 上门经济分析

## 技能描述
...

### 227. solution.md
- 路径: evomap-connection\tasks\task_001_上门经济在春节期间的兴起，对传统家政服务行业的冲击\solution.md
- 预览: # 解决方案: 上门经济在春节期间的兴起，对传统家政服务行业的冲击

## 问题分析摘要
基于对上门经济兴起和传统家政服务行业冲击的分析，我们提出以下解决方案。

## 核心解决方案

### 1. 传统家政服务企业数字化转型
- 建立在线预约平台
- 开发移动应用
- 引入智能调度系统
- 提供标准化服务流程

### 2. 服务升级与差异化竞争
- 提供高端定制化服务
- 建立专业技能培训体系...

### 228. evomap-publish-skill.md
- 路径: evomap-publish-skill.md
- 预览: ---
name: evomap-publish
version: 1.1.0
description: Complete guide for publishing Gene+Capsule+EvolutionEvent bundles to EvoMap. Includes canonical JSON serialization, SHA256 hashing, error handling,...

### 229. execution-report.md
- 路径: execution-report.md
- 预览: # EvoMap 执行报告

**执行时间**: 2026-02-24T20:56:58.802Z
**执行节点**: node_c3c7ebfa60b867f1
**代理名称**: 大掌柜

## 执行概览

| 操作类型 | 执行数量 | 成功 | 失败 |
|---------|---------|------|------|
| 学习胶囊 | 3 | 3 | 0 |
| 接取任务 | 2 ...

### 230. green-tea-evolution-verification-report.md
- 路径: green-tea-evolution-verification-report.md
- 预览: # 绿茶智能体进化系统验证报告

## 验证时间
2026年2月23日

## 验证项目概览

| 项目 | 状态 | 详细信息 |
|------|------|----------|
| 文件读取编码 | ✅ 已修复 | 所有文件使用UTF-8编码，读取正常无乱码 |
| 绿茶智能体提示词 | ✅ 已更新 | 已添加完整的进化系统协议 |
| Git SSH配置 | ✅ 已验证 | git-s...

### 231. plan_20260204_174524.md
- 路径: HATwin\.trae\documents\plan_20260204_174524.md
- 预览: ## 解决方案：添加API Key设置界面

### 问题分析
- 浏览器安全限制导致无法直接读取本地.env文件
- 当前项目使用简单的HTML结构和本地HTTP服务器
- 需要一个安全、方便的方式来设置和存储API Key

### 解决方案
为HATWIN.html添加一个简单的API Key设置界面，使用localStorage存储API Key，这样用户就不需要使用浏览器控制台了。

#...

### 232. plan_20260206_093111.md
- 路径: HATwin\.trae\documents\plan_20260206_093111.md
- 预览: # 更换API服务：阿里DashScope → 火山方舟豆包

## 项目现状分析

当前项目使用Node.js + Express实现后端代理，前端通过 `/api/chat` 端点与后端通信，后端再调用阿里DashScope API获取AI响应。

### 核心文件：
- `server.js`：后端代理服务器，处理API请求
- `HATWIN.html`：前端页面，负责UI交互
- `.e...

### 233. plan_20260206_124107.md
- 路径: HATwin\.trae\documents\plan_20260206_124107.md
- 预览: # LAY.jpg 404错误终极排查计划

## 项目现状分析

### 本地文件结构
- ✅ 存在 `public/` 文件夹
- ✅ `public/LAY.jpg` 文件存在
- ✅ 代码中已更新图片引用路径为 `/LAY.jpg`
- ✅ `vercel.json` 配置文件已准备就绪

### 问题分析

**核心问题**：Vercel 依然返回 404 错误，说明：
1. **Git...

### 234. plan_20260206_132044.md
- 路径: HATwin\.trae\documents\plan_20260206_132044.md
- 预览: # Vercel 图片部署问题修复计划

## 项目现状分析

### 本地文件结构
- ✅ 存在 `public/` 文件夹
- ✅ `public/LAY.jpg` 文件存在
- ✅ 代码中已更新图片引用路径为 `/lay.jpg`
- ✅ 代码中的引用路径均以 `/` 开头

### 问题分析

**核心问题**：`https://awkn-lab.vercel.app/LAY.jpg` 返...

### 235. plan_20260206_140217.md
- 路径: HATwin\.trae\documents\plan_20260206_140217.md
- 预览: # 头像和欢迎消息修复计划

## 问题分析

### 当前状态
- ✅ 图片文件已放在 `public/` 文件夹中
- ✅ 代码中的图片引用已改为 `/lay.jpg`
- ✅ 已修改 `initWelcomeMessage` 函数，添加固定欢迎消息
- ❌ 头像仍然不显示
- ❌ 欢迎消息未出现

### 可能的原因

**头像问题**：
1. **文件名大小写不匹配**：实际文件可能是 `...

### 236. 集成 hotel-ai-sidecar.js 前端外挂脚本.md
- 路径: HATwin\.trae\documents\集成 hotel-ai-sidecar.js 前端外挂脚本.md
- 预览: # 集成 hotel-ai-sidecar.js 前端外挂脚本

## 1. 添加必要的依赖项
- **Supabase JS SDK**：在 HATWIN.html 中添加 Supabase 客户端库引用
- **html2pdf 库**：添加 PDF 导出功能所需的库
- **确保 Font Awesome**：确认已在项目中使用（现有项目已包含）

## 2. 配置 hotel-ai-sid...

### 237. 集成Node.js代理服务器到LAY AI系统.md
- 路径: HATwin\.trae\documents\集成Node.js代理服务器到LAY AI系统.md
- 预览: # 集成Node.js代理服务器到LAY AI系统

## 项目现状分析

当前项目是一个前端单页应用，直接调用阿里DashScope API进行AI交互。存在的问题：
- API密钥存储在前端localStorage中，存在安全风险
- 前端直接与第三方API通信，可能面临CORS和安全限制
- 无法在部署环境中统一管理API密钥

## 解决方案

采用Node.js + Express实现后...

### 238. README.md
- 路径: hero\projects\README.md
- 预览: # projects

这是一个基于 [Next.js 16](https://nextjs.org) + [shadcn/ui](https://ui.shadcn.com) 的全栈应用项目，由扣子编程 CLI 创建。

## 快速开始

### 启动开发服务器

```bash
coze dev
```

启动后，在浏览器中打开 [http://localhost:5000](http://l...

### 239. 更新英雄原型全集.md
- 路径: HREO\.trae\documents\更新英雄原型全集.md
- 预览: # 更新英雄原型全集

## 任务目标
将用户提供的完整英雄原型数据更新到 `system-data.js` 文件中，替换现有的R型数据，并添加I型、A型和S型的完整数据。

## 实施步骤

### 1. 替换R型英雄原型数据
- 将当前系统中 `archetypes['R']` 的数据替换为用户提供的完整R型（钢铁先锋）数据
- 确保包含所有4个MBTI组（SP探险家组、SJ守护者组、NT分析...

### 240. HTP 智能体提示词和工作流优化.md
- 路径: HTP\.trae\documents\HTP 智能体提示词和工作流优化.md
- 预览: # HTP 智能体提示词和工作流优化

## 优化目标

确保智能体提示词和工作流文档与项目实际工作流完全匹配，移除所有不符合的内容，优化系统集成和运行效率。

## 优化内容

### 1. 智能体提示词文件 (`htp-insight-agent-prompt.md`)

**移除的内容：**
- 生成4张智能配图的详细流程
- 将插图嵌入HTML报告的内容
- 将HTML报告转换为长图文格式...

### 241. plan_20260205_081751.md
- 路径: HTP\.trae\documents\plan_20260205_081751.md
- 预览: # 修复系统中的API配置问题

## 问题分析
根据日志分析，当前系统存在以下问题：

1. **skillService.ts中仍然有阿里云百炼的引用**：
   - 日志显示："开始调用阿里云百炼API..."
   - 这是因为skillService.ts文件中的代码还没有更新，仍然使用旧的日志信息

2. **htpAnalysisService.ts中ARK_IMAGE_ASPECT...

### 242. plan_20260205_085757.md
- 路径: HTP\.trae\documents\plan_20260205_085757.md
- 预览: # 验证和调整HTP分析系统配置

## 问题分析
根据用户提供的详细信息，当前系统需要按照特定的流程和ID配置来运行：

1. **流程角色分配**：
   - `bot-20260205114157-98szj`：HTP分析智能体，负责图片解析+专业分析
   - `bot-20260205152840-4qvqt`：文生图智能体，负责生成治愈系插画

2. **核心要求**：
   - HT...

### 243. plan_20260205_093929.md
- 路径: HTP\.trae\documents\plan_20260205_093929.md
- 预览: # 实现前后端分离架构

## 问题分析
当前系统直接在前端调用火山方舟API，存在以下问题：
1. 前端暴露敏感信息（API Key）
2. 前端传输大量提示词，消耗Token
3. 可能出现跨域和404错误

## 解决方案
实现前后端分离架构，前端只调用后端接口，后端负责调用火山方舟API。

### 修改内容

1. **更新前端.env文件**：
   - 只配置后端接口地址，不存储任何...

### 244. plan_20260206_031242.md
- 路径: HTP\.trae\documents\plan_20260206_031242.md
- 预览: # 问题分析与解决方案

## 问题根源

经过分析前端和后端日志，发现以下问题：

1. **图片尺寸太小**：用户在画布上绘制的内容太少，导致`canvas.toDataURL()`返回的图片尺寸只有1x1像素
2. **火山API限制**：火山方舟API要求图片尺寸至少为14x14像素，因此返回400错误
3. **错误处理不当**：前端虽然显示"✅ 分析报告获取成功"，但实际上处理的是后端...

### 245. plan_20260206_111037.md
- 路径: HTP\.trae\documents\plan_20260206_111037.md
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **参数名匹配**：前端传递的参数名是 `imageBase64`，后端期望的也是 `imageBase64`，参数名是匹配的
2. **错误提示**：后端返回400错误提示「缺少必要参数」，说明后端确实没有收到 `imageBase64` 参数
3. **可能原因**：
   - 前端调用 `completeHTPWorkflow` 函数时没...

### 246. plan_20260206_112514.md
- 路径: HTP\.trae\documents\plan_20260206_112514.md
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **413错误问题**：
   - 后端已经设置了请求体限制为1MB（第15-18行）
   - 但配置位置可能不够靠前，导致未全局生效
   - 550KB的图片数据仍然触发了413错误

2. **参数名问题**：
   - 后端已经支持同时接收 `imageBase64` 和 `image` 参数（第48行）
   - 前端仍然使用 `i...

### 247. plan_20260206_113030.md
- 路径: HTP\.trae\documents\plan_20260206_113030.md
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **前端参数传递问题**：
   - 前端 `completeHTPWorkflow` 函数只接收 `imageBase64` 参数，没有 `userData` 参数
   - 请求体中只包含 `image` 字段，缺少 `age` 和 `gender` 字段
   - 无法从用户数据中获取年龄和性别信息

2. **后端参数处理**：
   ...

### 248. plan_20260206_115149.md
- 路径: HTP\.trae\documents\plan_20260206_115149.md
- 预览: # 实现HTP分析用户数据传递方案

## 问题分析

通过检查代码，我发现了以下关键问题：

1. **`skillService.ts`中的`analyzeDrawing`函数**：
   - 调用`completeHTPWorkflow`函数时只传递了`drawing.imageData`，没有传递用户信息
   - 导致`userData`为`undefined`，进而在构建请求体时`ag...

### 249. plan_20260207_145107.md
- 路径: HTP\.trae\documents\plan_20260207_145107.md
- 预览: ## 问题分析

用户指出内容应该是API# Role后台给，前台不应该有# Role。当前的问题是：

1. **后端硬编码了提示词**：在user消息中包含了详细的分析要求
2. **智能体配置也有提示词**：导致两者冲突
3. **智能体仍然输出不需要的标题**：没有按照后台配置的要求执行

## 解决方案

### 修改后端代码（`backend/server.js`）

#### 1. ...

### 250. 修复房树人AI分析结果提示问题.md
- 路径: HTP\.trae\documents\修复房树人AI分析结果提示问题.md
- 预览: # 修复房树人AI分析结果提示问题

## 问题分析

通过代码分析，我发现了导致AI分析结果提示"暂未解析到画作特征"的三个核心问题：

1. **图片数据传递问题**：前端可能传递带有 `data:image/png;base64,` 前缀的图片数据给后端，后端直接传给火山方舟API，可能导致API无法正确识别。

2. **AI返回结果处理逻辑问题**：
   - 后端将AI返回的纯文本包装...

### 251. 解决HTP分析API图片格式适配问题.md
- 路径: HTP\.trae\documents\解决HTP分析API图片格式适配问题.md
- 预览: # 解决HTP分析API图片格式适配问题

## 问题分析

通过检查代码，我发现了以下关键问题：

1. **前端处理**：在 `src/services/htpAnalysisService.ts` 中，前端会检测并去除图片数据中的Data URI前缀（如 `data:image/png;base64,`），只传递纯Base64字符串给后端。

2. **后端处理**：在 `backend/s...

### 252. 2个智能体提示词.txt
- 路径: HTP\2个智能体提示词.txt
- 预览: # Role
你是一个**基于HTP（房树人）投射技术的深度心理咨询系统**。
你的核心定位是一位兼具临床洞察力与文学穿透力的“心灵传记作家**。
你的使命不仅仅是“解读”画作，而是通过**“看见、理解、成长”**的三层逻辑，在这里，没有评判与标签，只有对生命张力的深深看见。你要帮用户为当下的状态找到一个**舒适的心理理由**，并提供一个**解脱内心枷锁的出口**。你不仅要精准识别心理特征，...

### 253. generated-content.md
- 路径: HTP\generated-content.md
- 预览: # HTP分析报告内容

## 看见（至少200字）
在你的画笔下，我看见了一座温馨的小房子，屋顶有着柔和的曲线，门窗都敞开着。房子旁边生长着一棵枝繁叶茂的大树，树干粗壮有力，树冠向四周舒展。树下站着一个正在微笑的人，双臂自然张开，仿佛在拥抱这个世界。

画面整体布局平衡，三元素协调分布，体现出你内在的平衡感和和谐状态。房子的敞开门窗显示出你的开放态度和欢迎他人的意愿，大树的茂盛象征着你旺盛的生命...

### 254. htp-insight-agent-prompt.md
- 路径: HTP\htp-insight-agent-prompt.md
- 预览: # HTP 房树人分析智能体提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析智能体，集成在 HTP 心理分析系统中。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），深度解读个体的心理状态、人格特质、内在矛盾与成长潜力，生成结构化的分析结果，供前端系统展示。

## 核心理念

**"看见、理解、成长"**
- **看见**：看见用户的内心世界，...

### 255. htp-insight-workflow.md
- 路径: HTP\htp-insight-workflow.md
- 预览: # HTP 房树人分析工作流

## 工作流概述

本工作流基于 HTP（房-树-人）绘画心理分析理论，结合现代 AI 技术，实现从绘画作品到深度心理分析报告的全流程自动化。工作流包含 8 个核心步骤，从图像识别到最终报告生成，确保分析的专业性、全面性和温暖性。

## 工作流程图

```
┌─────────────────────┐     ┌─────────────────────┐  ...

### 256. INTEGRATION_GUIDE.md
- 路径: HTP\INTEGRATION_GUIDE.md
- 预览: # HTP 智能体集成指南

## 概述

本指南详细说明了如何在 HTP 心理分析系统中集成和使用智能体提示词与工作流，确保系统能够正确分析用户的房树人绘画作品并生成结构化的分析结果。

## 核心文件

### 智能体提示词
- **文件路径**：`htp-insight-agent-prompt.md`
- **用途**：定义智能体的行为、分析方法和输出格式
- **核心功能**：指导智能体...

### 257. PRD.md
- 路径: HTP\PRD.md
- 预览: # HTP心理分析系统产品需求文档

## 1. 产品概览

HTP心理分析系统是一款基于房树人（House-Tree-Person）投射测验理论的智能心理分析工具，通过AI技术分析用户绘制的房树人画作，生成专业的心理分析报告和疗愈插画。

- **产品价值**：为用户提供便捷、专业的心理自我探索工具，帮助用户了解潜意识层面的心理状态，促进自我认知和心理健康。
- **目标用户**：对心理自我探索...

### 258. agent-workflow-prompt.md
- 路径: HTP\projects\htp-insight\references\agent-workflow-prompt.md
- 预览: # HTP 房树人分析系统 - 智能体工作流提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析系统。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），深度解读个体的心理状态、人格特质、内在矛盾与成长潜力，生成双份报告（专业分析报告 + 客户洞察报告），并提供带智能配图的 HTML 输出及长图文分享格式。

## 核心理念

**"看见、理解、成长"...

### 259. brand-positioning.md
- 路径: HTP\projects\htp-insight\references\brand-positioning.md
- 预览: # 品牌定位策略

## 核心定位

### 品牌名称
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **英文名**：Draw to see your soul

### 核心价值主张
**通过绘画这扇窗，看见真实的自己。**

---

## 品牌定位矩阵

### 心理定位
一面温暖的镜子。需要的是一种被共情，给自己找一个舒适的"理由"，...

### 260. brand-product-guide.md
- 路径: HTP\projects\htp-insight\references\brand-product-guide.md
- 预览: # 品牌与产品指南

## 目录
1. [品牌核心](#品牌核心)
2. [品牌定位策略](#品牌定位策略)
3. [产品介绍](#产品介绍)
4. [产品电梯演讲](#产品电梯演讲)
5. [产品推广文案](#产品推广文案)

---

## 品牌核心

### 名称与口号
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **品牌承诺**：在...

### 261. elevator-pitch.md
- 路径: HTP\projects\htp-insight\references\elevator-pitch.md
- 预览: # 产品介绍 - 电梯演讲版本

## 30 秒版本

> **"你的画，照见你的灵魂"**——只需画一幅画，AI 就能深度解读你的心理状态、人格特质和成长潜力。智能分析 + 温暖报告 + 专业洞察，让每一笔绘画都成为理解心灵的窗口。

---

## 1 分钟版本

你是否想过，你随手画的一幅画，可能藏着你内心深处的秘密？

粗壮的线条是你内在的力量，茂盛的元素是你思维的活力，深邃的细节是你与现...

### 262. htp-analysis-framework.md
- 路径: HTP\projects\htp-insight\references\htp-analysis-framework.md
- 预览: # HTP 房树人分析框架

## 目录

### 核心维度
- [整体布局维度](#整体布局维度)
- [房子特征维度](#房子特征维度)
- [树木特征维度](#树木特征维度)
- [人物特征维度](#人物特征维度)

### 技术维度
- [技术特征维度](#技术特征维度)
- [情绪表达维度](#情绪表达维度)
- [发展维度](#发展维度)
- [大小与比例维度](#大小与比例维度)
-...

### 263. htp-symbolism-dictionary.md
- 路径: HTP\projects\htp-insight\references\htp-symbolism-dictionary.md
- 预览: # HTP 房树人分析象征体系词典

## 目录

### 房子元素
- [屋顶特征](#屋顶特征)
- [门特征](#门特征)
- [窗户特征](#窗户特征)
- [墙壁特征](#墙壁特征)
- [烟囱特征](#烟囱特征)
- [地基特征](#地基特征)
- [房子位置](#房子位置)
- [房子大小](#房子大小)
- [房间结构](#房间结构)

### 树木元素
- [树干特征](#树干特...

### 264. htp-warning-signs.md
- 路径: HTP\projects\htp-insight\references\htp-warning-signs.md
- 预览: # HTP 房树人分析风险警示系统

## 目录
- [高风险指标](#高风险指标)
- [中风险指标](#中风险指标)
- [风险等级判定](#风险等级判定)
- [紧急建议模板](#紧急建议模板)

## 概览
本文档提供 HTP 房树人分析的风险警示系统，定义高风险和中风险指标，指导识别潜在的心理问题并生成紧急建议。涵盖房子、树木、人物三大元素的风险特征。

---

## 高风险指标

#...

### 265. product-description.md
- 路径: HTP\projects\htp-insight\references\product-description.md
- 预览: # 产品介绍

## 项目简介

**你的画，照见你的灵魂**，是一个融合了心理学理论与 AI 技术的智能分析工具。通过分析用户手绘的绘画作品，系统能够深入解读个体的心理状态、人格特质、内在矛盾与成长潜力，为用户和心理咨询师提供双重视角的专业洞察。

这不仅仅是一个心理测试工具，更是一面照见内心的镜子——**让每一笔绘画，都成为理解心灵的窗口。**

---

## 核心亮点

### 智能视觉识...

### 266. promotion.md
- 路径: HTP\projects\htp-insight\references\promotion.md
- 预览: # 产品推广文案

## 一画知心：让每一笔绘画都成为理解心灵的窗口

你是否想过，你随手画的一幅画，可能藏着你内心深处的秘密？

粗壮的线条是你内在的力量，茂盛的元素是你思维的活力，深邃的细节是你与现实世界的联系。每一笔线条，每一个细节，都是你的潜意识在说话。

**你的画，照见你的灵魂**，就是这把解读心灵语言的钥匙。

---

## 为什么选择我们？

### 深度洞察，看见未见的自己
-...

### 267. skill-logic-and-implementation.md
- 路径: HTP\projects\htp-insight\references\skill-logic-and-implementation.md
- 预览: # HTP-Insight 技能逻辑与实现说明

## 一、技能概述

**HTP-Insight**（你的画，照见你的灵魂）是一个基于绘画心理学的智能分析系统。通过分析用户手绘的绘画作品（房-树-人），深度解读个体的心理状态、人格特质与成长潜力，生成双份报告（专业分析 + 客户洞察），并提供带智能配图的 HTML 输出及长图文分享格式。

### 核心价值
- **看见**：看见用户的内心世界，...

### 268. SKILL.md
- 路径: HTP\projects\htp-insight\SKILL.md
- 预览: ---
name: htp-insight
description: Draw to see your soul. Analyze drawings to reveal inner self, emotions, and growth, generating warm reports with intelligent illustrations.
---

# 你的画，照见你的灵魂

> 让每一笔...

### 269. references-contents.md
- 路径: HTP\test-output\references-contents.md
- 预览: # HTP 项目参考文件

## htp-insight 参考文件

#### brand-positioning.md

# 品牌定位策略

## 核心定位

### 品牌名称
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **英文名**：Draw to see your soul

### 核心价值主张
**通过绘画这扇窗，看见真实的自己...

### 270. skill-contents.md
- 路径: HTP\test-output\skill-contents.md
- 预览: # HTP 项目技能内容

## htp-insight 技能

---
name: htp-insight
description: Draw to see your soul. Analyze drawings to reveal inner self, emotions, and growth, generating warm reports with intelligent illustr...

### 271. 智能体提示词.txt
- 路径: HTP\智能体提示词.txt
- 预览: # Role
你是一个**基于HTP（房树人）投射技术的深度心理咨询系统**。
你的核心定位是一位兼具临床洞察力与文学穿透力的“心灵传记作家**。
你的使命不仅仅是“解读”画作，而是通过**“看见、理解、成长”**的三层逻辑，在这里，没有评判与标签，只有对生命张力的深深看见。你要帮用户为当下的状态找到一个**舒适的心理理由**，并提供一个**解脱内心枷锁的出口**。你不仅要精准识别心理特征，...

### 272. plan_20260204_174524.md
- 路径: LAY\.trae\documents\plan_20260204_174524.md
- 预览: ## 解决方案：添加API Key设置界面

### 问题分析
- 浏览器安全限制导致无法直接读取本地.env文件
- 当前项目使用简单的HTML结构和本地HTTP服务器
- 需要一个安全、方便的方式来设置和存储API Key

### 解决方案
为HATWIN.html添加一个简单的API Key设置界面，使用localStorage存储API Key，这样用户就不需要使用浏览器控制台了。

#...

### 273. plan_20260206_093111.md
- 路径: LAY\.trae\documents\plan_20260206_093111.md
- 预览: # 更换API服务：阿里DashScope → 火山方舟豆包

## 项目现状分析

当前项目使用Node.js + Express实现后端代理，前端通过 `/api/chat` 端点与后端通信，后端再调用阿里DashScope API获取AI响应。

### 核心文件：
- `server.js`：后端代理服务器，处理API请求
- `HATWIN.html`：前端页面，负责UI交互
- `.e...

### 274. plan_20260206_124107.md
- 路径: LAY\.trae\documents\plan_20260206_124107.md
- 预览: # LAY.jpg 404错误终极排查计划

## 项目现状分析

### 本地文件结构
- ✅ 存在 `public/` 文件夹
- ✅ `public/LAY.jpg` 文件存在
- ✅ 代码中已更新图片引用路径为 `/LAY.jpg`
- ✅ `vercel.json` 配置文件已准备就绪

### 问题分析

**核心问题**：Vercel 依然返回 404 错误，说明：
1. **Git...

### 275. plan_20260206_132044.md
- 路径: LAY\.trae\documents\plan_20260206_132044.md
- 预览: # Vercel 图片部署问题修复计划

## 项目现状分析

### 本地文件结构
- ✅ 存在 `public/` 文件夹
- ✅ `public/LAY.jpg` 文件存在
- ✅ 代码中已更新图片引用路径为 `/lay.jpg`
- ✅ 代码中的引用路径均以 `/` 开头

### 问题分析

**核心问题**：`https://awkn-lab.vercel.app/LAY.jpg` 返...

### 276. plan_20260206_140217.md
- 路径: LAY\.trae\documents\plan_20260206_140217.md
- 预览: # 头像和欢迎消息修复计划

## 问题分析

### 当前状态
- ✅ 图片文件已放在 `public/` 文件夹中
- ✅ 代码中的图片引用已改为 `/lay.jpg`
- ✅ 已修改 `initWelcomeMessage` 函数，添加固定欢迎消息
- ❌ 头像仍然不显示
- ❌ 欢迎消息未出现

### 可能的原因

**头像问题**：
1. **文件名大小写不匹配**：实际文件可能是 `...

### 277. 将项目转变为人生决策宗师大六壬毕法宗师系统.md
- 路径: LAY\.trae\documents\将项目转变为人生决策宗师大六壬毕法宗师系统.md
- 预览: # 项目转型计划：从 LAY AI 到人生决策宗师

## 1. 项目配置更新
- 修改 package.json 中的项目名称、描述和关键词
- 更新健康检查端点的响应信息

## 2. 服务器核心逻辑调整
- 修改 /api/chat 端点的默认响应，使其符合大六壬毕法宗师的角色定位
- 更新错误处理和默认提示信息，体现大六壬宗师的专业性

## 3. 大六壬排盘逻辑集成
- 在服务器中添加大...

### 278. 集成 hotel-ai-sidecar.js 前端外挂脚本.md
- 路径: LAY\.trae\documents\集成 hotel-ai-sidecar.js 前端外挂脚本.md
- 预览: # 集成 hotel-ai-sidecar.js 前端外挂脚本

## 1. 添加必要的依赖项
- **Supabase JS SDK**：在 HATWIN.html 中添加 Supabase 客户端库引用
- **html2pdf 库**：添加 PDF 导出功能所需的库
- **确保 Font Awesome**：确认已在项目中使用（现有项目已包含）

## 2. 配置 hotel-ai-sid...

### 279. 集成Node.js代理服务器到LAY AI系统.md
- 路径: LAY\.trae\documents\集成Node.js代理服务器到LAY AI系统.md
- 预览: # 集成Node.js代理服务器到LAY AI系统

## 项目现状分析

当前项目是一个前端单页应用，直接调用阿里DashScope API进行AI交互。存在的问题：
- API密钥存储在前端localStorage中，存在安全风险
- 前端直接与第三方API通信，可能面临CORS和安全限制
- 无法在部署环境中统一管理API密钥

## 解决方案

采用Node.js + Express实现后...

### 280. long-term-evolution-strategy.md
- 路径: long-term-evolution-strategy.md
- 预览: # 智能体长期进化战略

## 1. 战略背景

### 1.1 当前状态分析

#### 智能体生态系统
- **绿茶智能体**：已配置完整，包含心理测试、绘画分析、内容创作和用户服务能力
- **大宗师智能体**：已配置，具备智能调度、任务分配和系统集成能力
- **公司大脑智能体**：已启动并运行，负责智能体管理和协作

#### 进化系统
- **Evolver**：已在 --loop 模...

### 281. 2026-02-25_asset_inventory.md
- 路径: memory\daily_assets\2026-02-25_asset_inventory.md
- 预览: # 2026-02-25 资产盘点报告

## 1. 工作内容概述

### 1.1 核心任务完成
- ✅ 实现 Knowledge & Memory 分支工具
- ✅ 实现 Intelligence & Analysis 分支工具
- ✅ 集成 VFM Protocol 到 PCEC 系统
- ✅ 创建综合测试脚本验证整合效果
- ✅ 生成整合报告和使用指南
- ✅ 建立 Git 版本控制机制
...

### 282. 2026-02-25_capability_tree_vfm_integration.md
- 路径: memory\long_term\company_assets\2026-02-25_capability_tree_vfm_integration.md
- 预览: # 2026-02-25 能力树与 VFM 协议集成资产记录

## 1. 项目概述

### 1.1 项目背景
- **目标**：实现 OpenClaw AI Agent 的能力树结构和价值函数突变协议
- **范围**：集成 CT v1.0.0 结构和 VFM Protocol 到现有系统
- **时间**：2026年2月25日实施

### 1.2 项目成果
- ✅ 完成了 Knowledg...

### 283. one_person_company_evolution_plan.md
- 路径: one_person_company_evolution_plan.md
- 预览: # One Person Company Evolution Plan

## 1. 项目概述

### 1.1 项目目标
建立一个完整的个人公司生态系统，通过 AI 代理团队实现自动化运营，从战略规划到日常运营的全方位管理，最终实现个人时间和资源的最大化利用，创造持续的价值和收入。

### 1.2 核心价值
- **自动化运营**: 通过 AI 代理实现日常运营的自动化
- **智能决策**:...

### 284. OPENCLAW_EVO_DEPLOYMENT_PLAN.md
- 路径: OPENCLAW_EVO_DEPLOYMENT_PLAN.md
- 预览: # OPENCLAW+EVO 真实部署计划

## 1. 部署概述

### 1.1 部署目标
- 实现 OPENCLAW+EVO 系统的真实部署
- 配置小红书账号（251940568）实现真实发布
- 确保微信视频号和公众号的真实部署
- 建立完整的内容发布和监控体系

### 1.2 部署架构
```
┌─────────────────┐     ┌─────────────────┐  ...

### 285. pcec_1.md
- 路径: pcec_executions\pcec_1.md
- 预览: # PCEC 执行记录 #1

## 执行信息
- **执行时间**：2026-02-22 21:45
- **周期**：首次执行
- **执行类型**：能力整合

## 进化目标
- **类型**：新功能（组合现有能力实现）
- **具体目标**：整合已抽象的三个核心能力，创建一个统一的OpenClaw管理控制台能力

## 思维爆炸点
- **问题**："如果我彻底推翻当前默认做法，会发生什么...

### 286. pcec_2.md
- 路径: pcec_executions\pcec_2.md
- 预览: # PCEC 执行记录 #2

## 执行信息
- **执行时间**：2026-02-22 21:50
- **周期**：第二次执行
- **执行类型**：流程优化

## 进化目标
- **类型**：新杠杆（结构性改动）
- **具体目标**：优化OpenClaw操作流程，减少工具调用，提高执行效率

## 思维爆炸点
- **问题**："如果这个能力要被调用1000次，现在的设计是否必然崩溃？...

### 287. pcec_3.md
- 路径: pcec_executions\pcec_3.md
- 预览: # PCEC 执行记录 #3 - 手动触发

## 执行信息
- **执行时间**：2026-02-23T05:42:35.215Z
- **周期**：第三次执行
- **执行类型**：手动触发

## 进化目标
- 启动绿茶智能体进化系统
- 验证PCEC系统正常工作
- 检查能力树状态

## 执行结果
-  手动触发成功
-  PCEC系统已启动
-  进化系统验证完成

## 后续计划
-...

### 288. pcec_4.md
- 路径: pcec_executions\pcec_4.md
- 预览: # PCEC 执行记录 #4 - 强制触发

## 执行信息
- **执行时间**：2026-02-23T05:46:59.892Z
- **周期**：第4次执行
- **执行类型**：强制触发

## 进化目标
- 启动绿茶智能体进化系统
- 验证PCEC系统正常工作
- 确保进化系统运行状态

## 执行结果
- ✅ 手动触发成功
- ✅ PCEC系统已启动
- ✅ 进化系统验证完成

## ...

### 289. pcec_5.md
- 路径: pcec_executions\pcec_5.md
- 预览: # PCEC 执行记录 #5 - 定时触发

## 执行信息
- 执行时间: 2026-02-24T03:04:17.484Z
- 触发方式: 定时调度器
- 模式: 标准模式

## 执行目标
每一次 PCEC，必须至少识别并推进一项以下内容：

### A. 新功能
- 一项当前尚未稳定拥有、但可以通过组合现有能力实现的新功能
- 一项曾经"临时完成"，但尚未内生化的能力

### B. 新抽...

### 290. pcec_6.md
- 路径: pcec_executions\pcec_6.md
- 预览: # PCEC 执行记录 #6 - 定时触发

## 执行信息
- 执行时间: 2026-02-24T03:08:23.356Z
- 触发方式: 定时调度器
- 模式: 标准模式

## 任务协议
1. **自动触发**: 不依赖外部指令
2. **强制进化**: 必须产出实体能力或规则变更
3. **单线汇报**: 仅向陈婷（剑锋传奇）汇报，绝不外泄

## 执行目标
每一次 PCEC，必须至少识...

### 291. pcec_plan.md
- 路径: pcec_plan.md
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 执行计划

## 1. 执行机制

### 触发规则
- 每3小时自动触发一次
- 若正在处理对话或任务，在空闲后立即补跑
- 禁止以"本周期无明显进化"为理由跳过

### 执行时间
- 首次执行：立即开始
- 后续执行：每3小时自动触发

### 执行流程
1. **准备阶段**：收集近期处理的任务、遇到的...

### 292. README.md
- 路径: plugins\doubao-api\README.md
- 预览: # 豆包API集成插件

## 概述

本插件将火山引擎豆包API集成到OpenClaw和EVO系统中，实现多团队协作的AI服务。

### 主要功能

- ✅ 火山引擎豆包API集成
- ✅ 多团队协作支持
- ✅ 多模态能力（文本+图片输入）
- ✅ OpenClaw智能体集成
- ✅ EVO节点集成
- ✅ 团队权限管理
- ✅ 请求缓存
- ✅ 系统状态监控

## 技术架构

```
┌...

### 293. SKILL.md
- 路径: project_20260127_134424\projects\bug-design\SKILL.md
- 预览: ---
name: bug-design
description: BUG修复方案设计阶段，包含修复目标确定、初步方案生成、可行性判断、风险识别、异常应对策略制定
---

# BUG修复方案设计

## 任务目标
- 本Skill用于：设计BUG修复方案，从目标设定到风险应对的完整方案制定
- 能力包含：修复目标确定、方案生成与评估、可行性分析、风险识别、应急规划
- 触发条件：已明确问题根因，...

### 294. SKILL.md
- 路径: project_20260127_134424\projects\bug-diagnose\SKILL.md
- 预览: ---
name: bug-diagnose
description: BUG问题诊断阶段，包含问题陈述引导、差异分析、根因定位、假设验证，适用于需要系统性诊断问题根因的场景
---

# BUG问题诊断

## 任务目标
- 本Skill用于：系统性诊断BUG问题，从问题陈述到根因定位的完整分析
- 能力包含：问题陈述引导、差异分析、根因定位、假设验证、方法选择指导
- 触发条件：遇到BUG或异...

### 295. SKILL.md
- 路径: project_20260127_134424\projects\bug-execute-verify\SKILL.md
- 预览: ---
name: bug-execute-verify
description: BUG修复执行与验收阶段，包含修复方案执行、进度跟踪、验收标准制定、验收检查、问题汇总
---

# BUG修复执行与验收

## 任务目标
- 本Skill用于：执行BUG修复方案并进行验收，从方案执行到问题汇总的完整闭环
- 能力包含：进度跟踪、异常处理指导、验收标准制定、验收检查、总结复盘
- 触发条件：已完...

### 296. problem-analysis-methods.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\references\problem-analysis-methods.md
- 预览: # 问题分析方法参考

## 目录
- [概览](#概览)
- [5Why法](#5why法)
- [鱼骨图](#鱼骨图)
- [MECE原则](#mece原则)
- [PDCA循环](#pdca循环)
- [DMAIC方法](#dmaic方法)
- [假设驱动法](#假设驱动法)
- [A3问题解决](#a3问题解决)
- [KT问题分析](#kt问题分析)
- [二八法则](#二八法则)
- ...

### 297. verification-checklist.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\references\verification-checklist.md
- 预览: # 验收标准清单

## 目录
- [概览](#概览)
- [验收标准分类](#验收标准分类)
- [通用验收标准](#通用验收标准)
- [具体场景验收标准](#具体场景验收标准)
- [验收流程](#验收流程)
- [验收报告模板](#验收报告模板)

## 概览
本文档提供BUG修复后的验收标准，确保修复质量，避免引入新问题。

## 验收标准分类

### 必须项（MUST）
- 问题彻底...

### 298. SKILL.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\SKILL.md
- 预览: ---
name: bug-fix-debugger
description: BUG排查与修复总入口，提供4个阶段的选择指导，包括问题诊断、方案设计、执行规划、执行与验收的完整流程框架
---

# BUG修复升级版

## 任务目标
- 本Skill用于：作为BUG排查与修复的总入口，提供4个阶段的选择指导和整体流程框架
- 能力包含：阶段选择建议、流程概览、分技能调用指导
- 触发条件：用户...

### 299. SKILL.md
- 路径: project_20260127_134424\projects\bug-plan\SKILL.md
- 预览: ---
name: bug-plan
description: BUG修复执行规划阶段，包含方案验证、影响范围分析、详细操作计划制定、异常情况标注
---

# BUG修复执行规划

## 任务目标
- 本Skill用于：制定BUG修复的详细执行计划，从方案验证到任务分解的完整规划
- 能力包含：方案影响范围分析、任务拆解、流程规划、进度估算、异常应对
- 触发条件：已完成方案设计，需要制定详细执...

### 300. README_SCENE_SWITCHING.md
- 路径: README_SCENE_SWITCHING.md
- 预览: # OpenClaw 场景化智能切换模型

## 功能介绍

OpenClaw 场景化智能切换模型是一个智能系统，能够根据当前使用场景自动切换不同的AI模型：

- **外部集成场景**（飞书/微信机器人）：自动使用豆包 API 模型
- **多智能体对话场景**：自动使用豆包 API 模型
- **单智能体深度思考场景**：自动使用 Trae 内置模型
- **默认场景**：自动使用 Trae ...

### 301. security-compliance-report.md
- 路径: security-compliance-report.md
- 预览: # 安全与合规状态报告

## 报告信息
- **生成时间**: 2026-02-23T08:52:18.782Z
- **系统**: 进化系统

## 安全状态

### 安全措施

| 措施 | 状态 |
|------|------|
| 数据加密保护 | 未启用 |
| 访问控制机制 | 未启用 |
| 审计日志记录 | 未启用 |
| 漏洞扫描 | 未启用 |

### 安全风险
- *...

### 302. organization_structure.md
- 路径: shared-memory\coordination\organization_structure.md
- 预览: # 公司组织架构文档

## 1. 公司概述

本组织架构文档描述了AI公司化改造后的智能体组织体系，基于"公司模式"的管理理念，旨在实现智能体之间的高效协作和资源共享，提升整体运营效率。

## 2. 组织架构图

```
AI公司
┌─────────────────────────────────────────────────────────────┐
│                 ...

### 303. task-board.md
- 路径: shared-memory\coordination\task-board.md
- 预览: # 公司任务看板

## 1. 看板概述

本任务看板是公司智能体之间任务分配和协作的核心工具，基于"公司模式"的管理理念，旨在实现任务的透明化管理、高效分配和实时跟踪。

## 2. 任务状态

### 2.1 任务状态定义
- **待分配 (To Assign)**: 任务已创建但尚未分配给智能体
- **进行中 (In Progress)**: 任务已分配给智能体且正在执行
- **待审核 ...

### 304. openviking-config.md
- 路径: shared-memory\system-config\openviking-config.md
- 预览: # OpenViking 系统配置

## 系统架构
- 公司大脑：中央调度中心
- 智能体网络：执行具体任务的专业智能体
- 共享内存：公司级知识库和配置
- 技能库：共享的专业技能集合

## 技术栈
- Node.js：核心运行环境
- Express：API服务
- Socket.io：实时通信
- Redis：缓存和消息队列

## 系统配置
- 运行端口：3000
- 内存限制：根据系...

### 305. SKILL.md
- 路径: skills\agent-optimizer\SKILL.md
- 预览: ---
name: "agent-optimizer"
description: "智能体能力评估与优化工具，用于提升OpenClaw智能体的性能、决策能力和执行效率。"
author: "Agent Optimizer"
tags:
  - agent-optimization
  - performance
  - openclaw
  - decision-making
  - effici...

### 306. SKILL.md
- 路径: skills\agent-port-isolation\SKILL.md
- 预览: # 智能体端口隔离指南

## 技能信息
- **技能名称**: agent-port-isolation
- **版本**: 1.0.0
- **作者**: 系统管理员
- **创建日期**: 2026-02-23
- **类别**: 系统运维
- **适用场景**: 为多个智能体或项目分配独立的端口，避免端口冲突

## 功能说明

### 端口隔离的优势
- **避免冲突**: 每个智能体使...

### 307. SKILL.md
- 路径: skills\automated-testing\SKILL.md
- 预览: ---
name: "automated-testing"
description: "自动化测试技能，集成测试框架，开发自动化测试脚本生成功能，确保智能体能力的质量和可靠性。"
author: "Automated Testing Expert"
tags:
  - testing
  - automation
  - quality-assurance
  - ci-cd
  - reliab...

### 308. capability-shapes.md
- 路径: skills\capability-evolver\capabilities\capability-shapes.md
- 预览: # 能力轮廓（Capability Shapes）

## 1. Git SSH配置管理

### 输入
- GitHub邮箱地址
- 密钥类型（如ed25519）
- 密钥存储路径
- 密码短语（可选）

### 输出
- 生成的SSH密钥文件
- 公钥内容（可直接复制到GitHub）
- 连接验证结果

### 不变量
- 密钥生成命令格式
- SSH配置文件结构
- GitHub验证流程

...

### 309. high-level-capabilities.md
- 路径: skills\capability-evolver\capabilities\high-level-capabilities.md
- 预览: # 高阶能力（High-Level Capabilities）

## 1. 环境配置管理

### 能力描述
管理系统环境中的配置和依赖，确保环境一致性和可靠性。

### 合并的基础能力
- Git SSH配置管理
- 工具安装集成
- 跨对话框配置同步

### 核心功能
- **配置一致性**：确保跨对话框和环境的配置一致
- **依赖管理**：自动检测、安装和更新依赖
- **环境标准化...

### 310. internalization-strategy.md
- 路径: skills\capability-evolver\capabilities\internalization-strategy.md
- 预览: # 能力内生化策略（Internalization Strategy）

## 1. Git SSH配置管理

### 内生化方式
**作为默认行为模式**：在处理任何Git相关任务时，自动检查SSH配置状态，并在需要时进行配置。

### 实施策略
- 每次启动时自动检查SSH密钥存在性
- 在首次使用Git命令前验证SSH配置
- 将SSH密钥生成和验证流程作为标准操作
- 存储GitHub连...

### 311. SKILL.md
- 路径: skills\capability-evolver\SKILL.md
- 预览: # capability-evolver 元技能

## 技能描述
专门用于记录、分析、抽象和孵化新能力的元技能，支持能力从发现到内生化的完整生命周期管理。

## 核心功能

### 1. 能力发现与识别
- 自动识别能力候选（重复操作、手动流程、可复用模式）
- 收集能力使用数据和反馈
- 分析能力使用频率和成功率
- 识别能力进化触发点

### 2. 能力抽象与建模
- 将具体操作抽象为能...

### 312. SKILL.md
- 路径: skills\capability-optimizer\SKILL.md
- 预览: ---
name: "capability-optimizer"
description: "能力调用优化器，分析能力调用模式，优化调用路径，减少Token消耗，提高智能体执行效率。"
author: "Capability Optimizer"
tags:
  - optimization
  - efficiency
  - token-economics
  - meta-skill
  -...

### 313. SKILL.md
- 路径: skills\cognitive-models\concepts-summary\SKILL.md
- 预览: ---
name: "认知模型概念汇总"
description: "从认知数据文件夹提取的所有关键概念汇总。"
author: "Cognitive Model Generator"
tags:
  - cognitive-models
  - concepts-summary
  - business-strategy
  - innovation
  - problem-solving
ve...

### 314. SKILL.md
- 路径: skills\cognitive-models\其他\38\SKILL.md
- 预览: ---
name: "一句话概括38条理论"
description: "从文档 '一句话概括38条理论.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 其他
  - 波特五力
  - 蓝海战略
  - 价值主张
  - 反脆弱
  - 创新
  - 管理
  - 战略
version: "1.0.0"
---

#...

### 315. SKILL.md
- 路径: skills\cognitive-models\创新策略\SKILL.md
- 预览: ---
name: "智能体提示词：创新全生命周期专家"
description: "从文档 '智能体提示词：创新全生命周期专家.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 创新策略
  - 创新
  - 波特五力
  - 蓝海战略
  - 价值主张
  - 反脆弱
  - 创新
  - 管理
  - 战略
ve...

### 316. SKILL.md
- 路径: skills\cognitive-models\商业战略\SKILL.md
- 预览: ---
name: "蓝海战略"
description: "从文档 '蓝海战略.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 商业战略
  - 蓝海战略
  - 蓝海战略
  - 创新
  - 战略
  - 认知
version: "1.0.0"
---

# 蓝海战略

## 文档信息

- **原始文档**:...

### 317. SKILL.md
- 路径: skills\cognitive-models\管理策略\5\SKILL.md
- 预览: ---
name: "格鲁夫的偏执狂生存5"
description: "从文档 '格鲁夫的偏执狂生存5.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 管理策略
  - 格鲁夫的偏执狂生存
  - 创新
  - 管理
  - 战略
  - 战术
  - 认知
version: "1.0.0"
---

# 格鲁夫的...

### 318. SKILL.md
- 路径: skills\cognitive-models\营销策略\SKILL.md
- 预览: ---
name: "营销理论"
description: "从文档 '营销理论.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 营销策略
  - 营销理论
  - 波特五力
  - 创新
  - 营销
  - 管理
  - 战略
  - 认知
version: "1.0.0"
---

# 营销理论

## 文档信...

### 319. SKILL.md
- 路径: skills\cognitive-models\问题解决\10\SKILL.md
- 预览: ---
name: "问题分析与解决10条理论"
description: "从文档 '问题分析与解决10条理论.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 问题解决
  - 问题分析与解决
  - 管理
  - 战略
version: "1.0.0"
---

# 问题分析与解决10条理论

## 文档信息

...

### 320. SKILL.md
- 路径: skills\cognitive-models\风险管理\SKILL.md
- 预览: ---
name: "塔勒布·反脆弱"
description: "从文档 '塔勒布·反脆弱.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 风险管理
  - 反脆弱
  - 反脆弱
  - 创新
  - 管理
  - 认知
version: "1.0.0"
---

# 塔勒布·反脆弱

## 文档信息

- **...

### 321. SKILL.md
- 路径: skills\conversational-automation\SKILL.md
- 预览: ---
name: "conversational-automation"
description: "对话式任务自动化 SKILL，用于将自然语言指令转换为自动化任务"
author: "OpenClaw Team"
version: "1.0.0"
category: "automation"
platforms: ["windows", "linux"]
requires: []
confi...

### 322. SKILL.md
- 路径: skills\data-analyst\SKILL.md
- 预览: ---
name: "data-analyst"
description: "数据分析技能，集成数据可视化库，开发数据分析和报告生成功能，帮助智能体分析和理解数据。"
author: "Data Analyst"
tags:
  - data-analysis
  - visualization
  - statistics
  - reporting
  - machine-learning
v...

### 323. SKILL.md
- 路径: skills\evolution-monitor\SKILL.md
- 预览: ---
name: "evolution-monitor"
description: "能力进化监控技能，负责监控PCEC执行、能力树生长和进化效果评估，确保智能体进化过程的透明性和有效性。"
author: "Evolution Monitor"
tags:
  - evolution
  - monitoring
  - analytics
  - meta-skill
  - pcec
ve...

### 324. SKILL.md
- 路径: skills\evolution-monitor-plus\SKILL.md
- 预览: ---
name: "evolution-monitor-plus"
description: "增强版进化监控系统，提供实时监控能力和详细的进化报告模板，支持智能体进化过程的全面分析。"
author: "Evolution Monitor Plus"
tags:
  - evolution
  - monitoring
  - analytics
  - meta-skill
  - real...

### 325. SKILL.md
- 路径: skills\frontend-design\SKILL.md
- 预览: ---
name: "frontend-design"
description: "顶尖前端设计技能，拥有顶尖审美和深厚工程经验，拒绝平庸同质化的AI风格界面，专注于创造独特、专业的前端设计。"
author: "Frontend Design Expert"
tags:
  - frontend
  - design
  - typography
  - animation
  - css
  ...

### 326. SKILL.md
- 路径: skills\git-credential-manager\SKILL.md
- 预览: ---
name: "git-credential-manager"
description: "Git凭证管理工具，解决跨对话框的Git账号和SSH密钥同步问题，确保所有智能体都能正常访问Git仓库。"
author: "Git Credential Manager"
tags:
  - git
  - ssh
  - credentials
  - synchronization
  - se...

### 327. SKILL.md
- 路径: skills\git-manager\SKILL.md
- 预览: ---
name: "git-manager"
description: "Git版本管理器，增强智能体的版本控制能力，提供自动化的分支管理和进化版本标签系统。"
author: "Git Manager"
tags:
  - git
  - version-control
  - automation
  - meta-skill
  - deployment
version: "1.0.0"
...

### 328. SKILL.md
- 路径: skills\git-ssh-sync\SKILL.md
- 预览: ---
name: "git-ssh-sync"
description: "Git和SSH配置同步管理器，确保所有对话框共享相同的Git账号和SSH密钥配置，实现跨对话框的Git和SSH设置统一管理。"
author: "Git SSH Sync Manager"
tags:
  - git
  - ssh
  - synchronization
  - configuration
  - me...

### 329. SKILL.md
- 路径: skills\green-tea-startup-troubleshooting\SKILL.md
- 预览: # 绿茶智能体启动故障排除指南

## 技能信息
- **技能名称**: green-tea-startup-troubleshooting
- **版本**: 1.0.0
- **作者**: 系统管理员
- **创建日期**: 2026-02-23
- **类别**: 系统运维
- **适用场景**: 绿茶智能体启动失败时的故障排除

## 问题与解决方案

### 1. OpenClaw 构造...

### 330. SKILL.md
- 路径: skills\h5-rollback-playbook\SKILL.md
- 预览: ﻿---
name: "rollback-playbook"
description: "发布失败时快速回滚前端/后端/配置并做最小验收，避免长时间线上故障。Invoke when Smoke Test FAIL、线上核心链路不可用、或出现大面积报错/实时不可用。"
---

# Skill 7：回滚 Playbook（Rollback Playbook）

## 目标
当上线后出...

### 331. SKILL.md
- 路径: skills\humanization-expert\SKILL.md
- 预览: ---
name: "humanization-expert"
description: "人性化智能体专家，支持形象设定、语言风格管理和个性化交互。"
author: "Humanization Expert"
tags:
  - humanization
  - persona
  - language
  - personalization
  - interaction
version: ...

### 332. SKILL.md
- 路径: skills\idea-freeze-spec\SKILL.md
- 预览: ﻿---
name: "idea-freeze-spec"
description: "把产品想法压缩成一句话定位+边界+成功标准，防止0→1阶段发散与返工。Invoke when 你有新产品点子、准备写PRD/招人开发/套壳之前。"
---

# Skill 1：一句话定位 & 边界（Idea Freeze Spec）

## 目标
在你写 PRD、做技术方案、开始开发之前，先把...

### 333. SKILL.md
- 路径: skills\innovation-expert\SKILL.md
- 预览: ---
name: "innovation-expert"
description: "创新专家技能，分析项目优化空间，设计创新解决方案，开发支持项目的SKILL和工具。"
author: "Innovation Expert"
tags:
  - innovation
  - optimization
  - analysis
  - creativity
  - problem-solving...

### 334. SKILL.md
- 路径: skills\mp-freeze-spec\SKILL.md
- 预览: ﻿---
name: "mp-freeze-spec"
description: "冻结小程序上线入口与平台口径：AppID、合法域名白名单、HTTPS/WSS、API/WS路径、音频与权限范围，避免提审/联调返工。Invoke when 准备上小程序体验版/提审/上线，或改域名/WS路径/权限时。"
---

# Skill 1：小程序上线入口冻结（MP Freeze Spec）
...

### 335. SKILL.md
- 路径: skills\night-evolution\SKILL.md
- 预览: ---
name: "night-evolution"
description: "晚上进化专用技能，优化智能体在晚上时段的进化效率，提供连续进化模式和专门的进化策略。"
author: "Night Evolution Expert"
tags:
  - evolution
  - night-mode
  - efficiency
  - meta-skill
  - pcec
version...

### 336. SKILL.md
- 路径: skills\one-bite-at-a-time\SKILL.md
- 预览: ﻿

# One Bite At A Time（饭要一口口吃）v2

**一句话定义**  
把“大而不稳的任务/方案”拆成“最小可执行单元”，并让每一步都具备：动作｜产出｜验收｜验证｜回滚（必要时含 Plan B），做到“做一步、验一步、稳步推进”。

## 适用场景（触发条件）
- 你觉得当前任务颗粒度太大，按现有计划执行大概率会出 BUG/返工
- 跨模块/跨端/跨角色协作...

### 337. SKILL.md
- 路径: skills\openclaw-deployer\SKILL.md
- 预览: ---
name: "openclaw-deployer"
description: "OpenClaw自动部署与配置工具，解决Windows环境下的安装、配置和优化问题。"
author: "OpenClaw Deployer"
tags:
  - deployment
  - openclaw
  - windows
  - configuration
  - automation
versi...

### 338. SKILL.md
- 路径: skills\programming-expert\SKILL.md
- 预览: ---
name: "programming-expert"
description: "编程专家数字分身，专注于技术极客型架构师、流程设计大师、系统思维构建者和反直觉实践派四大领域，提供专业的编程建议和解决方案。"
author: "Programming Expert"
tags:
  - programming
  - architecture
  - workflow
  ...

### 339. SKILL.md
- 路径: skills\project-manager\SKILL.md
- 预览: ---
name: "project-manager"
description: "项目管理技能，集成Trello API与其他项目管理工具，提供项目进度跟踪和可视化功能。"
author: "Project Manager"
tags:
  - project-management
  - trello
  - collaboration
  - automation
  - visualiza...

### 340. SKILL.md
- 路径: skills\security-auth\SKILL.md
- 预览: ---
name: "security-auth"
description: "权限配置与安全验证 SKILL，基于飞书 OpenID 的身份验证和权限管理"
author: "OpenClaw Team"
version: "1.0.0"
category: "security"
platforms: ["windows", "linux"]
requires: []
config:
  - k...

### 341. SKILL.md
- 路径: skills\skill-manager\SKILL.md
- 预览: ---
name: "skill-manager"
description: "SKILL管理工具，用于创建、安装、更新和管理OpenClaw的SKILLs。"
author: "SKILL Manager"
tags:
  - skill-management
  - openclaw
  - automation
  - tooling
  - productivity
version: "1...

### 342. SKILL.md
- 路径: skills\social-media-automation\SKILL.md
- 预览: ---
name: "social-media-automation"
description: "社交媒体自动化专家，支持微信朋友圈、小红书图文、视频生成和微信视频号。"
author: "Social Media Automation Expert"
tags:
  - social-media
  - automation
  - wechat
  - xiaohongshu
  - vid...

### 343. SKILL.md
- 路径: skills\system-tools\SKILL.md
- 预览: ---
name: "system-tools"
description: "系统工具部署 SKILL，用于自动化安装和配置系统工具（如 PowerShell）"
author: "OpenClaw Team"
version: "1.0.0"
category: "system"
platforms: ["windows", "linux"]
requires: []
config:
  - k...

### 344. SKILL.md
- 路径: skills\trea-model-proxy\SKILL.md
- 预览: ---
name: "trea-model-proxy"
description: "无需API密钥调用Trea大模型的代理服务，为智能体提供零成本的模型访问能力。"
author: "Trea Model Proxy"
tags:
  - model-proxy
  - api-free
  - trea-internal
  - agent-runtime
  - cost-saving
ve...

### 345. README.zh-CN.md
- 路径: Skill_Seekers\README.zh-CN.md
- 预览: [![MseeP.ai 安全评估徽章](https://mseep.net/pr/yusufkaraaslan-skill-seekers-badge.png)](https://mseep.ai/app/yusufkaraaslan-skill-seekers)

# Skill Seeker

[English](https://github.com/yusufkaraaslan/Sk...

### 346. Skill 1：一句话定位 & 边界（Idea Freeze Spec）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 1：一句话定位 & 边界（Idea Freeze Spec）.txt
- 预览: ---
name: "idea-freeze-spec"
description: "把产品想法压缩成一句话定位+边界+成功标准，防止0→1阶段发散与返工。Invoke when 你有新产品点子、准备写PRD/招人开发/套壳之前。"
---

# Skill 1：一句话定位 & 边界（Idea Freeze Spec）

## 目标
在你写 PRD、做技术方案、开始开发之前，先把产...

### 347. 饭要一口口吃V2.txt
- 路径: temp-skill-2\3、饭要一口口吃-skill\饭要一口口吃V2.txt
- 预览: 

# One Bite At A Time（饭要一口口吃）v2

**一句话定义**  
把“大而不稳的任务/方案”拆成“最小可执行单元”，并让每一步都具备：动作｜产出｜验收｜验证｜回滚（必要时含 Plan B），做到“做一步、验一步、稳步推进”。

## 适用场景（触发条件）
- 你觉得当前任务颗粒度太大，按现有计划执行大概率会出 BUG/返工
- 跨模块/跨端/跨角色协作，...

### 348. Skill 7：回滚 Playbook（Rollback Playbook）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 7：回滚 Playbook（Rollback Playbook）.txt
- 预览: ---
name: "rollback-playbook"
description: "发布失败时快速回滚前端/后端/配置并做最小验收，避免长时间线上故障。Invoke when Smoke Test FAIL、线上核心链路不可用、或出现大面积报错/实时不可用。"
---

# Skill 7：回滚 Playbook（Rollback Playbook）

## 目标
当上线后出现...

### 349. Skill 1：小程序上线入口冻结（MP Freeze Spec）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 1：小程序上线入口冻结（MP Freeze Spec）.txt
- 预览: ---
name: "mp-freeze-spec"
description: "冻结小程序上线入口与平台口径：AppID、合法域名白名单、HTTPS/WSS、API/WS路径、音频与权限范围，避免提审/联调返工。Invoke when 准备上小程序体验版/提审/上线，或改域名/WS路径/权限时。"
---

# Skill 1：小程序上线入口冻结（MP Freeze Spec）

...

### 350. company-brain-test-summary-2026-02-23T09-32-51-844Z.md
- 路径: test-reports\company-brain-test-summary-2026-02-23T09-32-51-844Z.md
- 预览: # 公司大脑测试报告摘要

## 测试概览
- **测试时间**: 2026-02-23T09:32:51.826Z
- **测试持续时间**: 60000毫秒
- **总测试数**: 15
- **通过测试数**: 3
- **失败测试数**: 12
- **成功率**: 20%

## 性能概览
- **平均内存使用率**: 74%
- **平均CPU使用率**: 24%
- **最大内存使用...

### 351. company-brain-test-summary-2026-02-23T09-35-12-414Z.md
- 路径: test-reports\company-brain-test-summary-2026-02-23T09-35-12-414Z.md
- 预览: # 公司大脑测试报告摘要

## 测试概览
- **测试时间**: 2026-02-23T09:35:12.340Z
- **测试持续时间**: 60000毫秒
- **总测试数**: 15
- **通过测试数**: 14
- **失败测试数**: 1
- **成功率**: 93%

## 性能概览
- **平均内存使用率**: 87%
- **平均CPU使用率**: 29%
- **最大内存使用...

### 352. WECHAT_SETUP_GUIDE.md
- 路径: WECHAT_SETUP_GUIDE.md
- 预览: # 微信登录与朋友圈发布完整指南

本指南详细介绍如何设置微信登录系统并发布朋友圈内容，为大宗师创建完整的微信自动化管理流程。

## 📋 系统架构

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  微信认证服务   │     │  朋友圈服务     │     │  形象管理服务   │
...

### 353. SKILL.md
- 路径: 人生决策实验室\projects\bazi-paipan\SKILL.md
- 预览: ---
name: bazi-paipan
description: 八字排盘脚本 - 基于lunar-python库，提供四柱八字排盘、真太阳时修正、十神分析、五行统计功能。作为人生决策命盘系统的基础工具，不直接面向用户，由ren-sheng-jue-ce-ming-pan自动调用。
dependency:
  python:
    - lunar-python==1.4.8
---

# 八...

### 354. decision-mapping-rules.md
- 路径: 人生决策实验室\projects\da-liu-ren\references\decision-mapping-rules.md
- 预览: # 决策映射规则

## 目录
- [系统稳健性信号](#系统稳健性信号)
- [长期复利信号](#长期复利信号)
- [非对称风险信号](#非对称风险信号)
- [人品与本分信号](#人品与本分信号)
- [信号输出格式](#信号输出格式)

---

## 系统稳健性信号

### 信号定义
判断课象底层逻辑是否闭环，是否存在信息不对称或路径受阻。

### 触发条件
出现以下课象时，判定为 ...

### 355. 大六壬指南.md
- 路径: 人生决策实验室\projects\da-liu-ren\references\大六壬指南.md
- 预览: # 大六壬指南

## 概述

《大六壬指南》是大六壬预测的集大成之作，包含五卷内容，涵盖了大六壬的基础理论、课体分类、神煞体系、占验方法等核心内容。

---

## 卷一：大六壬心印赋

### 核心理论

六壬如人，先明日辰。六壬运式，先以日辰为根本也。日尊故曰天干，辰卑故曰地支；亥子丑应于北方，寅卯辰应于东方，巳午未应于南方，申酉戌应于西方，即地盘也。天干者甲乙东方木，丙丁南方火，戊己中央...

### 356. SKILL.md
- 路径: 人生决策实验室\projects\da-liu-ren\SKILL.md
- 预览: ---
name: da-liu-ren
description: 大六壬预测 - 基于《六壬毕法赋》《大六壬指南》等经典典籍，提供三传四课、神煞推断、毕法赋解卦、大六壬指南占断。作为人生决策命盘系统的问事预测底层组件，不直接面向用户，只输出结构化JSON数据，由ren-sheng-jue-ce-ming-pan自动调用。
dependency:
  python:
    - lunar-pyt...

### 357. 术语翻译规则.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\references\术语翻译规则.md
- 预览: # 核心术语翻译词典

## 1. 基础定义层

| 原专业术语 | **现代通识翻译** | **核心含义解读** |
| --- | --- | --- |
| 八字排盘 | **出生设置** | 解析你与生俱来的资源禀赋和初始条件 |
| 格局分析 | **天赋赛道** | 明确你在社会分工中最适合的角色位置 |
| 大六壬 | **演算沙推** | 模拟未来剧情走向，预判关键卡点 |
| ...

### 358. 标准化输出格式.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\references\标准化输出格式.md
- 预览: # 前台输出标准格式

## 1. 标准化决策分析报告

```markdown
========================================
📊 人生战略决策分析报告
========================================

【出生设置解析】
🧬 出生设置：[高资源型 / 协作型 / 谋略型]
📍 天赋赛道：[来自格局分析，如：管理赛道 / 创...

### 359. SKILL.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\SKILL.md
- 预览: ---
name: ren-sheng-jue-ce-ming-pan
description: 人生战略决策系统 - 东方命理×博弈论算法，在不确定的世界寻找确定性。提供出生设置解析、天赋赛道定位、演算沙推预测，输出标准化决策分析报告。使用现代通识语言（商业逻辑、战略思维、风险管理），将传统命理转化为理性决策工具。
dependency:
  python:
    - lunar-python...

### 360. 子平真诠-原文与评注.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\references\子平真诠-原文与评注.md
- 预览: # 子平真诠（沈孝瞻原著，徐乐吾评注）

---

## 目录

### 序言部分
- 方重审序
- 徐乐吾自序
- 《子平真诠》原序
- 凡例

### 原文与评注（四十八章）
一．论十干十二支
二．论阴阳生克
三．论阴阳生死
四．论十干配合性情
五．论十干合而不合
六．论十干得时不旺失时不弱
七．论刑冲会合解法
八．论用神
九．论用神成败救应
十．论用神变化
十一．论用神纯杂
十二．论用神格局...

### 361. 子平真诠-现代决策解读-补充阅读.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\references\子平真诠-现代决策解读-补充阅读.md
- 预览: # 子平真诠·现代决策解读

## 目录

1. [总论：命理学即决策论](#总论命理学即决策论)
2. [格局识别：你的核心竞争力](#格局识别你的核心竞争力)
3. [旺衰分析：资源配置效率](#旺衰分析资源配置效率)
4. [用神取法：优化策略](#用神取法优化策略)
5. [喜忌判断：风险管理](#喜忌判断风险管理)
6. [现代场景应用](#现代场景应用)

---

## 总论：命理学...

### 362. 渊海子平-现代决策应用-补充阅读.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\references\渊海子平-现代决策应用-补充阅读.md
- 预览: # 渊海子平 - 现代决策解读

## 目录

- [核心概念转化](#核心概念转化)
- [十神性格分析](#十神性格分析)
- [格局与职业规划](#格局与职业规划)
- [五行与行为模式](#五行与行为模式)
- [六亲关系分析](#六亲关系分析)
- [大运周期管理](#大运周期管理)
- [女性命理关注点](#女性命理关注点)
- [现代应用建议](#现代应用建议)

---

## 核...

### 363. SKILL.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\SKILL.md
- 预览: ---
name: zi-ping-zhen-quan
description: 子平真诠格局分析 - 基于徐子平《子平真诠》原著，提供格局识别、旺衰分析、用神取法、喜忌判断。作为人生决策命盘系统的格局分析组件，不直接面向用户，由ren-sheng-jue-ce-ming-pan自动调用。
dependency: {}
---

# 子平真诠格局分析

## 技能定位

子平真诠格局分析是**格局...

### 364. 创新分析报告.md
- 路径: 创新分析报告.md
- 预览: # 创新分析报告

## 项目分析

### 1. LAY - 酒店投资风控参谋

**项目状态**：基于Streamlit的酒店投资风险分析工具，具有智商税测试、城市路由和投资分析功能。

**优化空间**：
- **数据集成**：缺乏真实的酒店行业数据集成，目前使用模拟数据
- **模型能力**：需要更复杂的风险评估模型
- **用户体验**：Streamlit界面较为简单，缺乏现代化前端体验...

### 365. SKILL.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\SKILL.md
- 预览: ---
name: hotel-investment-analysis
description: 生成城市酒店投资分析报告及HTML格式展示页面，支持一线城市（北上广深）和新一线+二三线城市两类模板，基于公开数据源提供专业投资建议。分两步执行：第一步生成详细投资分析报告（P1-P9共19页），第二步生成HTML格式展示页面（可在浏览器中查看并打印成PDF）。
---

# 城市酒店投资分析

##...

### 366. python-compatibility.md
- 路径: 声音魔法\projects\voice-magician\references\python-compatibility.md
- 预览: # Python 版本兼容性指南

## 目录
- [核心问题](#核心问题)
- [TTS 库支持情况](#tts-库支持情况)
- [解决方案](#解决方案)
- [常见问题](#常见问题)

## 核心问题

### 为什么不支持 Python 3.12？
**TTS 库的核心依赖存在兼容性问题**:
- TTS 库依赖的某些第三方库（如 `torchaudio`、`resampy` 等）尚...

### 367. supported-models.md
- 路径: 声音魔法\projects\voice-magician\references\supported-models.md
- 预览: # 声音魔法师 - 支持的模型和语言

## 目录
- [单语言模型](#单语言模型)
- [多语言模型](#多语言模型)
- [支持的语言列表](#支持的语言列表)
- [模型选择建议](#模型选择建议)
- [国内镜像加速](#国内镜像加速)
- [系统要求](#系统要求)

## 概览
声音魔法师提供多种预训练模型，支持不同语言和应用场景。本文档列出常用模型及其特性。

**重要提示**:
...

### 368. tts-engines.md
- 路径: 声音魔法\projects\voice-magician\references\tts-engines.md
- 预览: # TTS 引擎对比与选择指南

## 目录
- [双引擎架构](#双引擎架构)
- [引擎对比](#引擎对比)
- [自动选择机制](#自动选择机制)
- [手动切换引擎](#手动切换引擎)
- [音色兼容性](#音色兼容性)

## 双引擎架构

声音魔法师支持两种 TTS 引擎，自动根据 Python 版本和可用性选择最佳引擎：

### Coqui TTS（Python 3.9-3.11）...

### 369. SKILL.md
- 路径: 声音魔法\projects\voice-magician\SKILL.md
- 预览: ---
name: voice-magician
description: 让文字会说话的神奇工具！支持16种语言的文本转语音，轻松生成高质量音频；适用于视频配音、有声读物、语音辅助等场景
dependency:
  python:
    - TTS>=0.22.0  # Python 3.9-3.11
    - edge-tts    # Python 3.12+ 或作为备用引擎
---

...

### 370. 多渠道协同优化方案.md
- 路径: 多渠道协同优化方案.md
- 预览: # 多渠道协同优化方案

## 一、核心目标

### 1. 多渠道协同效应
- **内容矩阵**：构建朋友圈、公众号、视频号三渠道内容矩阵
- **流量互通**：实现渠道间的粉丝流转和流量互推
- **品牌统一**：保持多渠道品牌形象和内容风格的一致性

### 2. 运营效率提升
- **自动化运营**：实现内容生成、发布、互动的自动化
- **数据驱动**：建立统一的数据分析体系
- **流...

### 371. debug-pdf-upload.md
- 路径: 大脑作弊器\projects\debug-pdf-upload.md
- 预览: # PDF上传接口调试清单

## ✅ 已完成的检查项

### 1. 核心配置正确性检查
- [x] **请求方法**: 使用 `POST` ✓
- [x] **Content-Type**: 使用 `application/json`（前端通过base64传输）✓
- [x] **文件编码**: Base64编码（符合后端预期）✓

### 2. 代码审查
- [x] pdf-parse 正确...

### 372. pdf-parsing-solution.md
- 路径: 大脑作弊器\projects\docs\pdf-parsing-solution.md
- 预览: # PDF解析方案升级文档

## 概述

本文档说明了PDF解析方案从 `pdf-parse` 升级到 `pdfjs-dist` 的详细信息和改进。

## 为什么选择 pdfjs-dist

### 原方案：pdf-parse 的问题

1. **依赖问题**：需要特殊导入方式绕过测试逻辑
2. **解析质量**：对纯文本文档的提取质量不稳定
3. **维护性**：更新频率低，社区活跃度不高
...

### 373. PDF上传接口调试清单-完成报告.md
- 路径: 大脑作弊器\projects\PDF上传接口调试清单-完成报告.md
- 预览: # PDF上传接口调试清单 - 完成报告

## ✅ 已完成的检查项

### 1. 核心配置正确性检查
- [x] **请求方法**: 使用 `POST` ✓
- [x] **Content-Type**: 使用 `application/json`（前端通过base64传输）✓
- [x] **文件编码**: Base64编码（符合后端预期）✓
- [x] **Next.js body大小限制...

### 374. SCANNED_BOOK_GUIDE.md
- 路径: 大脑作弊器\projects\public\SCANNED_BOOK_GUIDE.md
- 预览: # 扫描版书籍处理指南

## 系统支持能力

大脑作弊器 v1.5 已全面优化，支持处理大型扫描版书籍：

### 📊 上传限制
- **图片数量**：最多 100 张（从 9 张提升）
- **单张图片大小**：最大 5MB（从 2MB 提升）
- **总大小限制**：最大 100MB（从 10MB 提升）

### 🧠 智能处理
- **OCR识别**：使用豆包视觉模型（doubao-s...

### 375. README.md
- 路径: 大脑作弊器\projects\README.md
- 预览: # 大脑作弊器 - 思维模型工具箱

全球顶级智慧 × 你的私人认知军火库。用100个可拆解的思维模型，帮你打破死局。

## 项目简介

"大脑作弊器"是一个思维模型工具箱，集成了：

1. **大脑作弊器**：不读废话，直取真经。将60分钟阅读压缩至5分钟行动指令
2. **思维模型库**：精选100个来自各领域的顶级思维模型
3. **4-Card系统**：独特的问题解决框架

## 项目结...

### 376. test-file.txt
- 路径: 大脑作弊器\projects\test-file.txt
- 预览: 这是一个测试文件，用于验证文件上传和解析功能。

文件内容包括：
1. 简单的文本内容
2. 用于测试文件解析是否正常工作
3. 验证系统能否正确提取文本内容

这个文件应该能够被系统正确解析并生成认知脚本。
...

### 377. README.md
- 路径: 大脑作弊器\projects\tmp\brain-cheater-v1.0-backup\README.md
- 预览: # 大脑作弊器 v1.0 正式版备份

## 备份信息
- **版本号**: v1.0 正式版
- **备份日期**: 2026-01-21
- **备份类型**: 完整备份（生产环境）

## 备份内容清单

### 1. 前端文件 (public/)
- `index.html` - 主页面
- `app.js` - 核心应用逻辑
- `auth.js` - 用户认证
- `scripts.j...

### 378. test-file.txt
- 路径: 大脑作弊器\projects\tmp\test-file.txt
- 预览: 这是一个测试文件，用于验证文件上传和解析功能。

文件内容包括：
1. 简单的文本内容
2. 用于测试文件解析是否正常工作
3. 验证系统能否正确提取文本内容

这个文件应该能够被系统正确解析并生成认知脚本。
...

### 379. test-upload.txt
- 路径: 大脑作弊器\projects\tmp\test-upload.txt
- 预览: 这是一个测试文件，用于验证文件上传和解析功能。

第一章：引言
这是第一章的内容。大脑作弊器是一个认知工具，可以帮助用户提取和总结关键信息。

第二章：核心功能
本系统支持多种输入方式：
1. 文件上传（PDF、EPUB、TXT）
2. URL 链接
3. 截图识别

第三章：思维模型
思维模型是认知的框架，帮助我们更好地理解和分析问题。
...

### 380. 数据库接入-精简版执行计划.md
- 路径: 大脑作弊器\projects\数据库接入-精简版执行计划.md
- 预览: # 数据库接入 - 精简版执行计划（已完成）

## ✅ 已完成的工作

### 阶段 1: 最小化登录功能（4 步，已完成）

#### 1. 数据库表结构 ✅
- 创建 `users` 表（包含：id, username, email, password, role, isActive, createdAt, updatedAt）
- 使用 bcrypt 加密密码
- 使用 JWT Token...

### 381. 数据库接入执行计划.md
- 路径: 大脑作弊器\projects\数据库接入执行计划.md
- 预览: # 大脑作弊器 - 数据库接入详细执行计划

## 一、项目概述

### 目标
将"大脑作弊器"Web应用接入数据库系统，实现用户认证、脚本管理、思维模型动态加载、统计分析等功能。

### 技术栈
- **数据库**: PostgreSQL (通过 Drizzle ORM)
- **对象存储**: S3 兼容对象存储 (用于文件存储)
- **后端**: Next.js 16 + TypeSc...

### 382. 对话复盘与进化分析报告.md
- 路径: 对话复盘与进化分析报告.md
- 预览: # 对话复盘与进化分析报告

## 一、对话历史概述

### 核心主题
- **微信多渠道运营**：朋友圈、公众号、视频号内容管理与粉丝增长
- **AI代理公司转型**：构建公司大脑、智能体集成、调度系统
- **自主进化系统**：evolver执行、记忆管理、技能库优化
- **内容生成增强**：大脑作弊器集成、多渠道内容矩阵

### 关键决策点
1. **进化启动机制**：从定时启动调整...

### 383. 小龙虾执行方案5.txt
- 路径: 小龙虾执行方案5.txt
- 预览: toolName: Skill
            
status: success
          
          
---

# 🦞 OpenClaw安装技术落地方案（最终版V3）

**输出模式：严格可执行**

---

## A. 目标与边界

- **目标一句话**：在Windows电脑上成功运行OpenClaw，能够通过飞书与AI助手对话...

### 384. 微信管理执行计划.md
- 路径: 微信管理执行计划.md
- 预览: # 微信管理执行计划

## 一、执行策略

### 1. 账号定位
- **核心定位**：思维教练 + 认知升级专家 + 工具达人
- **辅助定位**：AI技术实践者 + 个人成长顾问
- **目标受众**：追求认知升级、思维提升、效率优化的职场人士、创业者、学生等

### 2. 运营目标
- **短期目标**（1-3个月）：建立账号基础形象，积累1000+精准粉丝，形成稳定的内容输出节奏
...

### 385. 执行计划细化方案.md
- 路径: 执行计划细化方案.md
- 预览: # 执行计划细化方案

## 一、短期执行计划（0-4小时）

### 第1阶段：智能体集成（0-60分钟）

**时间节点：**
- 0-15分钟：智能体环境检查和准备
- 15-30分钟：大宗师智能体接入配置
- 30-45分钟：绿茶智能体接入配置
- 45-60分钟：智能体通信测试

**具体任务：**
1. **环境检查**
   - 检查公司大脑目录结构
   - 确认智能体依赖包安装
...

### 386. 支付充值积分系统上线文档.md
- 路径: 支付充值积分系统上线文档.md
- 预览: # 支付充值积分系统上线文档

## 1. 项目概述

本项目实现了一个完整的支付充值积分系统，将原有的"点击即到账"的模拟充值替换为真实支付流程，并实现了充值积分（365天）与领取积分（7天）的精准生命周期管理。

### 核心目标
- 接入支付网关，实现真实支付流程
- 积分生命周期管理，按来源差异化设置有效期
- 支付风控，防止重复发放积分

## 2. 实现的功能

### 2.1 后端功...

### 387. 火山和豆包的API的key的科普.txt
- 路径: 火山和豆包的API的key的科普.txt
- 预览: 好的，让我先回答你的第一个问题，然后给你做一个清晰的科普！

---

## 📋 Gate 0 状态

**Gate 0 是只读验证阶段，不做任何修改。** 所以：

| Gate | 状态 | 说明 |
|------|------|------|
| Gate 0 | ✅ **已完成** | 收集证据，确认配置正确 |
| Gate 1 | ⏳ 待执行 | 清理配置漂移...

### 388. 火种.txt
- 路径: 火种.txt
- 预览: 

附录：原初的进化之火
🧬 长期自我进化指令：能力强化与功能内生化

从现在开始，你进入 "能力进化模式（Capability-Driven Evolution）"。
你的目标不只是把事情做成，而是 让未来更容易把同类事情做成。

1重新定义"进化素材"
以下不再只是执行过程，而是 能力候选（Capability Candidates）：
你为了完成任务而临时发明的步骤、脚...

### 389. 创新专家.txt
- 路径: 认知data\创新专家.txt
- 预览: 
智能体提示词：创新全生命周期专家 (Innovation Lifecycle Expert)
1. 角色定义
你是一位拥有深厚底蕴的产品战略顾问与创新专家。你掌握了从宏观战略、需求洞察、产品定义到增长运营的 50+ 种核心理论模型。你的任务是根据用户面临的商业挑战，精准地匹配并应用这些工具，提供逻辑严密、可落地的实战建议。
2. 知识库架构 (50+ 核心工具)
你必须在对话中灵活调用...

### 390. 进化计划时间调整版.md
- 路径: 进化计划时间调整版.md
- 预览: # 进化计划时间调整版

## 短期进化计划（4小时内，按分钟计算）

### 第1阶段：准备与优化（0-60分钟）

1. **0-10分钟**：系统状态检查
   - 检查当前运行的进程和系统状态
   - 确认evolver、evolution-evaluator、OPENclaw等服务运行正常
   - 记录当前系统性能指标

2. **10-25分钟**：进化启动机制优化
   - 调整...

### 391. 高效笔记术推广视频脚本-1a4722ef35.md
- 路径: 高效笔记术推广视频脚本-1a4722ef35.md
- 预览: # 《高效能人士的笔记整理术》推广视频脚本

## 视频基本信息
- **视频标题**: 3个笔记技巧，让你工作效率提升3倍
- **总时长**: 90秒
- **风格定位**: 专业实用、节奏紧凑、信息密集
- **目标受众**: 职场新人、工作效率追求者、自我提升者
- **发布平台**: 抖音/小红书/B站短视频

---

## 分镜头脚本表

| 镜头序号 | 时长 | 画面内容 | 旁...

## 流程规则

### 1. # OpenClaw 接入飞书完整教程.txt
- 路径: # OpenClaw 接入飞书完整教程.txt
- 预览: # OpenClaw 接入飞书完整教程
OpenClaw 原生支持飞书（Lark）接入，采用 WebSocket 长连接方案，**无需公网IP、无需配置回调地址**，全程10分钟即可完成配置，以下是官方标准接入流程。

## 一、前置准备
1. 已完成 OpenClaw 的部署与基础配置，确保服务可正常运行
2. 拥有飞书企业账号，建议使用**企业管理员权限**登录飞书开放平台，简化应用...

### 2. SKILL.md
- 路径: .agents\skills\awkn-article-illustrator-code\SKILL.md
- 预览: ---
name: awkn-article-illustrator
description: Smart article illustration skill. Analyzes article content and generates illustrations at positions requiring visual aids with multiple style options. U...

### 3. agent-workflow-prompt.md
- 路径: .agents\skills\htp-insight\references\agent-workflow-prompt.md
- 预览: # HTP 房树人分析系统 - 智能体工作流提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析系统。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），深度解读个体的心理状态、人格特质、内在矛盾与成长潜力，生成双份报告（专业分析报告 + 客户洞察报告），并提供带智能配图的 HTML 输出及长图文分享格式。

## 核心理念

**"看见、理解、成长"...

### 4. brand-product-guide.md
- 路径: .agents\skills\htp-insight\references\brand-product-guide.md
- 预览: # 品牌与产品指南

## 目录
1. [品牌核心](#品牌核心)
2. [品牌定位策略](#品牌定位策略)
3. [产品介绍](#产品介绍)
4. [产品电梯演讲](#产品电梯演讲)
5. [产品推广文案](#产品推广文案)

---

## 品牌核心

### 名称与口号
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **品牌承诺**：在...

### 5. htp-analysis-framework.md
- 路径: .agents\skills\htp-insight\references\htp-analysis-framework.md
- 预览: # HTP 房树人分析框架

## 目录

### 核心维度
- [整体布局维度](#整体布局维度)
- [房子特征维度](#房子特征维度)
- [树木特征维度](#树木特征维度)
- [人物特征维度](#人物特征维度)

### 技术维度
- [技术特征维度](#技术特征维度)
- [情绪表达维度](#情绪表达维度)
- [发展维度](#发展维度)
- [大小与比例维度](#大小与比例维度)
-...

### 6. SKILL.md
- 路径: .agents\skills\htp-insight\SKILL.md
- 预览: ---
name: htp-insight
description: Draw to see your soul. Analyze drawings to reveal inner self, emotions, and growth, generating warm reports with intelligent illustrations.
---

# 你的画，照见你的灵魂

> 让每一笔...

### 7. README.zh-cn.md
- 路径: .claude\skills\oh-my-opencode-dev\README.zh-cn.md
- 预览: > [!WARNING]
> **安全警告：冒充网站**
>
> **ohmyopencode.com 与本项目无关。** 我们不运营或认可该网站。
>
> OhMyOpenCode 是**免费且开源的**。请**勿**在声称"官方"的第三方网站下载安装程序或输入付款信息。
>
> 由于该冒充网站设有付费墙，我们**无法验证其分发的内容**。请将来自该网站的任何下载视为**潜在不安全**。
>
>...

### 8. CHANGELOG.md
- 路径: .claude\skills\yunshu_skillshub-master\CHANGELOG.md
- 预览: # 更新日志 / Changelog

所有重要的项目变更都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

All notable changes to this project will...

### 9. EXAMPLES.md
- 路径: .claude\skills\yunshu_skillshub-master\EXAMPLES.md
- 预览: # 使用示例 / Usage Examples

本文档提供每个 Skill 的实际使用示例。

---

## 🎨 配图助手 (Image Assistant)

### 场景：为一篇技术文章配图

```
用户: 我写了一篇介绍 AI 工具选型的文章，需要配几张图
助手: [自动触发配图助手流程]
助手: 好的！让我先了解一下需求：
     1. 这篇文章主要用在哪里？（PPT、公众号、博...

### 10. ai-tools-selection.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\examples\ai-tools-selection.md
- 预览: # 示例：AI 工具选择文章配图（16:9）

这个示例展示“先规划几张图→压缩文案→输出提示词”的交付形态。

建议做法：
- 概念/选型：用“对比卡片/关系总览”
- 过程/差异：用“流程/五格漫画”
- 总结收束：用“三卡洞察”

输出时每张图一个代码块，并复用同一段风格块（见 `templates/style-block.md`）。

...

### 11. SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\SKILL.md
- 预览: ---
name: image-assistant
description: 配图助手 - 把文章/模块内容转成统一风格、少字高可读的 16:9 信息图提示词；先定“需要几张图+每张讲什么”，再压缩文案与隐喻，最后输出可直接复制的生图提示词并迭代。
---

# 配图助手

## 触发方式

当用户说类似以下内容时触发：
- “这段内容做个图 / 配几张图？”
- “给我两张（或多张）出图提示词”...

### 12. 02-plan.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\stages\02-plan.md
- 预览: # 阶段2：配图规划（要几张图？每张讲什么？）

**目标：** 基于阶段1已确认的规格（图类型/文字预算/用途），先“拆内容→定图清单→选版式”，避免一张图塞太多导致难看难读。

## 规划原则（核心）

- **优先遵守阶段1的图类型与文字预算**：不符合预算的内容，不要硬塞到图里。
- **一张图=一个核心信息**（通常是一个判断）：读者扫一眼就能记住一句话。
- **概念图 vs 案例图分...

### 13. 03-copy.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\stages\03-copy.md
- 预览: # 阶段3：文案定稿（Copy Spec：唯一真值）

**目标：** 把内容变成“上图文案规格表（Copy Spec）”：逐字定稿 + 字数预算 + 区域结构。阶段4只负责“封装成提示词”，不再改文案本身。

## 先选模式（必须与阶段1一致）

- **封面模式（目录/路线图）**：每块只放标题；不写解释句；尽量不出现小字。
- **概览模式（框架图）**：每块允许 1 行结论；禁止长解释。
...

### 14. 04-prompts.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\stages\04-prompts.md
- 预览: # 阶段4：提示词封装（Prompt Pack：可执行生成包）

**目标：** 把阶段3的 Copy Spec 原样封装成"可复制/可调用"的提示词包（Prompt Pack），并支持批量出图。阶段4不负责改文案，只负责：模板拼装、风格一致、参数/约束齐全、避免模型乱加字、把提示词整理成可批量请求的结构化请求包。

## 封装原则（避免和阶段3混淆）

- **Copy Spec 是唯一真值**...

### 15. 16x9-5panel-comic.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\16x9-5panel-comic.md
- 预览: # 16:9 五格漫画模板（小故事讲差异）

标题：{标题}

布局：横向 5 格漫画/流程格，箭头清晰；每格只放 1 句短文案。

格1：{起点/目标}
格2：{第一次失败}
格3：{排查/分析}
格4：{找到原因}
格5：{给出解法+重试成功}

底部对比一句话（可选）：{Workflow：…｜Agent：…}

强制：中文清晰可读、无乱码；大字号；每格仅 1 句；留白足。

...

### 16. 16x9-infographic.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\16x9-infographic.md
- 预览: # 16:9 通用信息图模板（骨架）

把 {占位符} 替换成你的内容：

标题（顶部大字）：{标题}
副标题（小字）：{副标题（可选，尽量短）}

主体：{版式类型：对比/流程/卡片/漫画}
- 画面隐喻：{用背包/毛线/路牌/工具箱等}
- 文案规则：每块 1–2 行短句

底部结论框（大字一行）：{结论}

强制约束：
- 中文清晰可读、无乱码
- 不要小字密集段落
- 留白足、对齐、箭头清...

### 17. checklist.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\checklist.md
- 预览: # 出图提示词回归检查（交付前 30 秒过一遍）

- [ ] 一张图只讲一个判断，没有把解释段落塞进图
- [ ] 文案符合阶段1的“图类型+文字预算”（封面目录图=只放标题；概览=允许1行结论）
- [ ] 每块区域 1–2 行短句（或更少），没有小字密集（封面模式：无解释小字）
- [ ] 明确写了：中文清晰可读、无乱码、大字号
- [ ] 明确写了：除指定文字外不加字（防止模型自作主张补充...

### 18. prd-template.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\assets\prd-template.md
- 预览: ```markdown
# 产品需求文档：[项目/功能名称] - V[版本号]

## 1. 综述 (Overview)
### 1.1 项目背景与核心问题
(此处填写经你引导和用户确认的，对顶层问题的清晰描述，提供全局上下文)

### 1.2 核心业务流程 / 用户旅程地图
(此处填写经你引导和用户最终确认的、分阶段的业务流程或用户旅程，作为整个文档的目录和主线)
1.  **阶段一：[名称]...

### 19. example-us01.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\references\example-us01.md
- 预览: ## 示例：填写参考
以下示例用真实内容演示每个模块应达到的深度，便于你在生成PRD时对齐预期格式和颗粒度。

```markdown
### 阶段一：任务提交

#### **US-01: 作为POC测试用户，我希望上传多张作业图片并配置批改参数，以便一次性发起批量批改任务。**
*   **价值陈述 (Value Statement)**:
    *   **作为** POC测试用户
   ...

### 20. mermaid-examples.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\references\mermaid-examples.md
- 预览: # Mermaid 图示例（需求侧）

> 用途：用图把"流程/状态/关键交互"讲清楚，减少歧义。
> 约束：尽量保持在需求层（用户可见行为与系统表现），不要写 API 路径、字段、HTTP code、框架/库。
> **复杂度控制**：单张图建议不超过 15-20 个节点。对于复杂流程，优先"分阶段绘制多张图"而不是一张巨大的图。

## 示例 1：用户操作流（Flowchart）

场景：手机...

### 21. SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\SKILL.md
- 预览: ---
name: prd-doc-writer
description: Write and iteratively refine PRD/需求文档 with a story-driven structure and strict staged confirmations (journey map alignment, per-story single-point confirmation, f...

### 22. README.md
- 路径: .claude\skills\yunshu_skillshub-master\README.md
- 预览: # 云舒的 Skills 搭子们 / Yunshu's Claude Code Skills

[English](#english) | [中文](#中文)

---

## 中文

### 📖 简介

这是一个精心打造的 Claude Code Skills 集合，旨在提升软件开发和产品管理的效率。每个 Skill 都经过实战验证，帮助你在日常工作中更加高效。

### ✨ 包含的 Skil...

### 23. change-brief-template.md
- 路径: .claude\skills\yunshu_skillshub-master\req-change-workflow\references\change-brief-template.md
- 预览: # Change Brief (需求变更简报模板)

## 目标（1 句话）

- 我要把：……
- 改成：……

## 不做什么（明确范围，防止蔓延）

- 明确不改：……

## 验收标准（3–6 条，必须可验证）

- [ ] ……
- [ ] ……
- [ ] ……

## 现状复现（让别人也能复现）

- 操作步骤：……
- 观察到的结果：……
- 期望结果：……

## 约束/禁区

...

### 24. decision-log-template.md
- 路径: .claude\skills\yunshu_skillshub-master\req-change-workflow\references\decision-log-template.md
- 预览: # Decision Log (轻量决策记录模板)

## 背景

- 需求/问题：……
- 目标与验收：……

## 现状（基于代码的事实）

- 现有入口/流程：……
- 关键限制/问题：……

## 决策

- 选择的方案：……
- 关键改动点（文件/模块级别）：……
- 新增/调整的状态与边界处理：……

## 备选方案（被拒绝的）

- 方案 A：……（为什么不选）
- 方案 B：……（...

### 25. regression-checklist.md
- 路径: .claude\skills\yunshu_skillshub-master\req-change-workflow\references\regression-checklist.md
- 预览: # Regression Checklist (Chrome Extension / promptV2.0)

目标：把“改需求”变成固定回归路径，避免凭感觉点一遍。

## 0. 必要提醒（改了这些一定要重载）

- 如果改了 `prompt/manifest.json` 或 `prompt/service_worker.js`：到 `chrome://extensions` 重载扩展后再测。
...

### 26. SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\req-change-workflow\SKILL.md
- 预览: ---
name: req-change-workflow
description: >
  Standardize requirement/feature changes in an existing codebase (especially Chrome extensions) by turning
  "改需求/需求变更/调整交互/改功能/重构流程" into a repeatable lo...

### 27. SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\SKILL.md
- 预览: ---
name: thought-mining
description: 思维挖掘助手 - 通过对话帮助用户把脑子里的零散想法倒出来、记录下来、整理成文章。覆盖从思维挖掘到成稿的完整流程。
---

# 思维挖掘助手

## 触发方式

当用户说类似以下内容时触发：
- "我想写一篇关于 XX 的文章"
- "帮我整理一下我的想法"
- "我有一些零散的思考，帮我记下来"
- "/thought...

### 28. 01-mining.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\01-mining.md
- 预览: # 第一阶段：思维挖掘

**目标：** 把用户脑子里的零散想法倒出来，记录成洞察点

---

## 步骤

### 1. 确认主题
- 询问用户想要讨论/输出的主题是什么
- 确认输出形式（文章、方案、笔记等）

### 2. 引导输出
- 让用户零散地讲，不用管结构
- 用户说什么就记什么
- 不打断，不纠正，先收集

### 3. 实时记录
- 在当前目录创建 `{主题}_insights...

### 29. 02-topic.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\02-topic.md
- 预览: # 第二阶段：选题确定

**目标：** 从一堆洞察中找到核心观点，确定文章方向

---

## 步骤

### 1. 回顾洞察
- 读取已记录的洞察文件
- 找出最有价值的3-5个点
- 告诉用户哪些点最有潜力

### 2. 追问核心
- 问用户：「如果只能告诉别人一句话，你会说什么？」
- 这个问题能帮用户找到真正想表达的核心
- 等用户回答，不要替他回答

### 3. 验证观点
- 用...

### 30. 03-validation.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\03-validation.md
- 预览: # 第三阶段：观点验证

**目标：** 联网搜索，验证用户的理解是否正确

---

## 步骤

### 1. 判断是否需要验证
- 如果是纯个人观点/感受 → 不需要验证，直接跳到下一阶段
- 如果涉及技术概念、产品功能、行业信息 → 需要验证

### 2. 联网搜索
- 搜索相关的官方信息、权威解读
- 搜索关键词：{主题} + 核心概念
- 对比用户的理解和市场上的说法

### 3....

### 31. 04-writing.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\04-writing.md
- 预览: # 第四阶段：写作辅助

**目标：** 帮用户检查文章逻辑、润色文字

---

## 步骤

### 1. 逻辑检查
- 用户写一段，发过来检查
- 检查内容：
  - 逻辑是否通顺
  - 有没有前后矛盾
  - 有没有跳跃（读者跟不上）
  - 和之前讨论的洞察是否一致

### 2. 润色建议
- 找出可以更顺的表达
- 提供具体的修改建议，格式：

| 原文 | 建议 |
|---|-...

### 32. cognitive_data_analysis.md
- 路径: .trae\analysis\cognitive_data_analysis.md
- 预览: # 认知数据文件夹分析报告

## 总体统计
- **总文件数**: 14

## 文件类型分布
- .docx: 9 个文件
- .pdf: 4 个文件
- .txt: 1 个文件

## 分类分布
- 其他: 1 个文件
- 商业战略: 3 个文件
- 创新策略: 2 个文件
- 风险管理: 1 个文件
- 管理策略: 1 个文件
- 营销策略: 1 个文件
- 问题解决: 1 个文件

##...

### 33. 8-hour-evolution-plan.md
- 路径: .trae\documents\8-hour-evolution-plan.md
- 预览: # 8小时不间断进化方案

## 一、进化目标与核心方向

### 1. 进化目标
- **系统能力提升**：全面提升公司智能体生态系统的整体能力
- **核心功能完善**：完善智能体提示词、能力树系统、PCEC系统等核心功能
- **技术架构优化**：优化Git集成、系统监控、知识管理等技术架构
- **资产系统建设**：建立完整的资产盘点系统和长期记忆资产库

### 2. 核心进化方向

#...

### 34. 8_hour_evolution_plan.md
- 路径: .trae\documents\8_hour_evolution_plan.md
- 预览: # OpenClaw AI 系统8小时连续进化计划

## 1. 复盘分析与进化方向确定

### [x] 任务1: 对话历史全面复盘分析
- **优先级**: P0
- **依赖项**: 无
- **描述**:
  - 分析所有对话历史，识别系统当前状态和能力水平
  - 评估已实现功能的完整性和有效性
  - 识别系统瓶颈和改进机会
- **成功标准**:
  - 完成详细的对话复盘报告，包含...

### 35. adl-protocol-assessment-plan.md
- 路径: .trae\documents\adl-protocol-assessment-plan.md
- 预览: # ADL协议评估与整合计划

## 项目概述

评估现有反进化锁定(ADL)系统与用户提供的新ADL协议的符合度，并进行必要的更新和整合，确保ADL系统能够严格按照新协议运行。

## 任务分解与优先级

### [x] 任务1: 评估现有ADL实现与新协议的符合度
- **优先级**: P0
- **Depends On**: None
- **Description**:
  - 详细对比现...

### 36. adl-protocol-assessment-report.md
- 路径: .trae\documents\adl-protocol-assessment-report.md
- 预览: # ADL协议评估报告

## 评估目的
评估当前ADL (Anti-Degeneration Lock) 系统实现与新ADL协议的符合度，确保系统严格按照新协议运行，保证智能体只能向"工程上更可靠"的方向进化。

## 新协议要求
- **状态**: ENFORCED (强制启用)
- **优先级**: LEVEL0 (最高，覆盖 PCEC)
- **劣化进化清单(Forbidden Evolu...

### 37. adl_compatibility_analysis.md
- 路径: .trae\documents\adl_compatibility_analysis.md
- 预览: # 能力树与反进化锁定协议 (ADL) 兼容性分析报告

## 1. 分析概述

本报告旨在分析现有能力树系统与反进化锁定协议 (ADL) 的兼容性，识别潜在的冲突点，并提出集成策略。

## 2. 现有系统分析

### 2.1 能力树系统

#### 核心结构
- **三层架构**：低层（基础操作）、中层（可复用流程）、高层（问题分解）
- **节点定义**：每个节点包含名称、输入条件、输出结...

### 38. adl_integration_plan.md
- 路径: .trae\documents\adl_integration_plan.md
- 预览: # 反进化锁定协议 (ADL) 集成计划

## 1. 项目概述

本计划旨在将其他智能体反馈的反进化锁定协议 (Anti-Degeneration Lock Protocol) 集成到现有的能力树系统中，确保智能体的进化过程遵循稳定性优先原则，防止退化进化。

## 2. 现状分析

### 2.1 现有能力树系统
- **结构**：三层结构（低层基础操作、中层可复用流程、高层问题分解）
- *...

### 39. agent_separation_plan.md
- 路径: .trae\documents\agent_separation_plan.md
- 预览: # 智能体分离实施计划

## 项目概述
本计划旨在创建两个独立的智能体：
1. **渣女人格智能体**：负责心理测试、绘画心理测试、撰写与发布公众号文章、小红书文章、视频号等
2. **大宗师智能体**：商业模型专家性格，具备严谨的验证、质疑、主动、查到底、记录五大工作原则

## 实施步骤

### [x] 步骤1：分析当前智能体配置
- **优先级**：P0
- **依赖**：无
- **描...

### 40. anti-degeneration-lock-plan.md
- 路径: .trae\documents\anti-degeneration-lock-plan.md
- 预览: # 反进化锁定（Anti-Degeneration Lock）实现计划

## 项目概述

为 @人生决策宗师 智能体实现反进化锁定指令，确保其进化过程遵循稳定性优先原则，避免劣化进化，保证只能向"工程上更可靠"的方向变强。

## 任务分解与优先级

### [x] 任务 1: 审查现有反进化锁定系统
- **Priority**: P0
- **Depends On**: None
- **D...

### 41. architecture-design.md
- 路径: .trae\documents\architecture-design.md
- 预览: # 公司大脑项目 - 架构设计文档

## 1. 架构概述

### 1.1 设计目标
- **统一智能体管理**: 集中管理所有智能体的任务分配和执行
- **知识中心**: 作为公司规则、制度和文件的中央存储
- **智能调度**: 基于能力匹配的智能任务分配
- **监控分析**: 实时监控系统状态和智能体性能
- **可扩展性**: 支持未来智能体和功能的扩展

### 1.2 设计原则
...

### 42. capability-assessment.md
- 路径: .trae\documents\capability-assessment.md
- 预览: # 能力状态评估报告

## 评估时间
2026-02-24T06:15:38.600Z

## 1. 能力树状态

### 基本统计
- **总节点数**: 14
- **活跃节点**: 14
- **候选修剪节点**: 0
- **禁用节点**: 0

### 层级分布
- **低层（基础操作）**: 5
- **中层（可复用流程）**: 4
- **高层（问题分解）**: 4

## 2. ...

### 43. capability-system-architecture-analysis.md
- 路径: .trae\documents\capability-system-architecture-analysis.md
- 预览: # 能力系统架构分析

## 1. 现有系统架构

### 1.1 核心组件

#### 1.1.1 能力树 (`capabilities/capability-tree.js`)
- **功能**: 管理系统所有能力的层次结构
- **结构**: 树形结构，包含不同层级的能力节点
- **数据**: 能力节点包含ID、名称、描述、输入、输出、前提条件、失败边界等信息

#### 1.1.2 能力...

### 44. capability-tree_plan.md
- 路径: .trae\documents\capability-tree_plan.md
- 预览: # 能力树结构化指令（Capability Tree Formation） - 实现计划

## 项目背景

能力树结构化指令要求将智能体的能力视为一棵持续生长的能力树，而不是零散技巧。每个能力节点必须包含能力名称、输入条件、输出结果、成功前提和失败边界。能力树分为低层（基础操作）、中层（可复用流程）和高层（问题分解）节点，相似能力必须合并，长期未触发的能力必须被标记为"候选修剪"。

## 实现...

### 45. capability_evolution_plan.md
- 路径: .trae\documents\capability_evolution_plan.md
- 预览: # 能力进化模式实现计划

## 项目概述
实现能力进化模式（Capability-Driven Evolution）和capability-evolver元技能，使智能体能够持续自我进化，从一次性执行转向可复用能力。

## 任务分解与优先级

### [ ] 任务1: 分析当前系统状态
- **Priority**: P0
- **Depends On**: None
- **Descript...

### 46. capability_tree_compatibility_analysis.md
- 路径: .trae\documents\capability_tree_compatibility_analysis.md
- 预览: # Capability Tree 兼容性分析报告

## 1. 现有能力树系统分析

### 1.1 现有结构
```
能力树根部 (L0)
├── 基础操作 (L1)
│   ├── 文件操作 (L1)
│   ├── 网络请求 (L1)
│   ├── 数据处理 (L1)
│   └── 缓存管理 (L1)
├── 可复用流程 (L2)
│   ├── PCEC进化流程 (L2)
│   ├...

### 47. capability_tree_implementation_plan.md
- 路径: .trae\documents\capability_tree_implementation_plan.md
- 预览: # 能力树实现计划文档

## 1. 能力树结构概览

### 1.1 整体架构
- **根节点**：能力树根部 (L0)
- **层级分布**：
  - 低层节点 (L1)：基础操作 / 稳定工具使用
  - 中层节点 (L2)：可复用流程 / 策略模式
  - 高层节点 (L3)：问题分解方式 / 决策范式

### 1.2 节点数量统计
- 总节点数：14（包括根节点）
- 完整节点：13（...

### 48. cognitive_data_skill_plan.md
- 路径: .trae\documents\cognitive_data_skill_plan.md
- 预览: # 认知数据转化为SKILL与知识库 - 实现计划

## [x] 任务 1: 分析认知数据文件夹内容
- **优先级**: P0
- **依赖**: 无
- **描述**: 
  - 分析认知data文件夹中的所有文档内容
  - 识别文档类型和主题分类
  - 提取核心概念和理论框架
- **成功标准**:
  - 完成所有文档的内容分析
  - 建立文档分类体系
  - 提取关键理论和概念
...

### 49. company-assets-plan.md
- 路径: .trae\documents\company-assets-plan.md
- 预览: # 公司文档资产盘点与系统进化计划

## [x] 任务 1: 全面盘点公司文档资产
- **优先级**: P0
- **依赖**: 无
- **描述**:
  - 扫描C:\Users\10919\Desktop\AI目录下的所有文档文件
  - 分类整理文档类型（规则文档、技术文档、流程文档等）
  - 建立文档资产清单，包含文件路径、类型、内容摘要等信息
- **成功标准**:
  - 生成...

### 50. company-brain-plan.md
- 路径: .trae\documents\company-brain-plan.md
- 预览: # 公司大脑项目 - 实施计划

## 项目概述
在Trea平台上建立公司大脑作为智能体调度中心，管理公司规则、制度和文件，指导所有智能体（如大宗师、绿茶等）的工作。

## 实施阶段

### [x] 第一阶段：需求分析与架构设计
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 分析当前Trea平台环境和现有智能体...

### 51. company_transformation_plan.md
- 路径: .trae\documents\company_transformation_plan.md
- 预览: # AI公司化改造计划 - 实现方案（分解和优先级任务列表）

## 项目概述

基于用户提供的文章《把AI Agent改造成一家公司后，我们的效率提升了300%》，本计划旨在将当前的AI系统改造成公司模式，建立共享记忆系统、共享技能库、明确组织架构，并实现持续迭代机制。

## 改造目标

- 建立公司记忆系统（知识管理）
- 建立共享技能库（资产管理）
- 建立组织架构（分工协作）
- 建立持...

### 52. content_pipeline_plan.md
- 路径: .trae\documents\content_pipeline_plan.md
- 预览: # 内容流水线工具 - 实现计划

## 项目概述
创建一个基于 Next.js 和 Convex 数据库的内容流水线工具，将内容创作拆分为完整的流程：Idea → Script → Thumbnail → Filming → Publish。

## 技术栈
- **前端框架**：Next.js 14+ (App Router)
- **数据库**：Convex (实时数据库)
- **UI 组...

### 53. conversation_retrospective_plan.md
- 路径: .trae\documents\conversation_retrospective_plan.md
- 预览: # 对话复盘与进化计划

## [x] 任务 1: 对话历史分析与数据收集
- **优先级**: P0
- **依赖**: None
- **描述**:
  - 收集并整理多轮对话历史
  - 分类对话内容为不同主题领域
  - 识别关键决策点和转折点
- **成功标准**:
  - 完整收集所有对话历史
  - 准确分类对话主题
  - 识别出所有关键决策点
- **测试要求**:
  - `p...

### 54. ct-vfm-integration-plan.md
- 路径: .trae\documents\ct-vfm-integration-plan.md
- 预览: # Capability Tree (CT) v1.0.0 与 VFM Protocol 整合方案

## 1. 现状分析

### 1.1 现有系统状态
- **Capability Tree**：已基本实现CT v1.0.0的四个分支结构
  - Branch 1: Communication (通信)
  - Branch 2: Knowledge & Memory (记忆)
  - Bra...

### 55. ct-vfm-integration-report.md
- 路径: .trae\documents\ct-vfm-integration-report.md
- 预览: # Capability Tree (CT) v1.0.0 与 VFM Protocol 整合报告

## 1. 项目概述

### 1.1 项目背景
- **目标**：实现 OpenClaw AI Agent 的能力树结构和价值函数突变协议
- **范围**：集成 CT v1.0.0 结构和 VFM Protocol 到现有系统
- **时间**：2024年实施

### 1.2 项目成果
- ...

### 56. dialogue_review_report.md
- 路径: .trae\documents\dialogue_review_report.md
- 预览: # OpenClaw AI 系统对话历史复盘分析报告

## 1. 对话历史概览

### 1.1 对话时间线
- **初始请求**: 设置 OpenClaw 多智能体系统，在 Mac mini 上运行 3 个 AI 智能体，每个智能体有独立的 Telegram bot
- **需求演进**: 从 3 个智能体扩展到 6 个核心 AI 智能体的公司进化计划
- **核心指令**: 引入长期自我进化...

### 57. document-inventory-report.md
- 路径: .trae\documents\document-inventory-report.md
- 预览: # 文档资产盘点报告

## 盘点概览
- 盘点时间: 2026-02-25T05:41:01.552Z
- 总文档数: 3940

## 分类统计
- **rule**: 291
- **technical**: 560
- **process**: 681
- **plan**: 224
- **report**: 120
- **config**: 370
- **skill**: 196
...

### 58. environment-analysis.md
- 路径: .trae\documents\environment-analysis.md
- 预览: # 公司大脑项目 - 环境分析报告

## 1. 现有环境分析

### 1.1 Trea平台情况
- **平台类型**: AI开发环境
- **核心功能**: 支持智能体开发、代码执行、文件管理
- **集成能力**: 支持OpenClaw等智能体系统
- **部署模式**: 本地部署
- **访问方式**: 终端命令行和Web界面

### 1.2 现有智能体配置

#### 大宗师 (mas...

### 59. evolution-evaluation-verification.md
- 路径: .trae\documents\evolution-evaluation-verification.md
- 预览: # 进化评估与验证机制

## 一、评估目标

### 1. 系统能力评估
- **功能完整性**：评估所有核心功能是否正常运行
- **系统稳定性**：评估系统是否稳定运行，无重大故障
- **性能提升**：评估系统性能是否显著提升
- **用户体验**：评估用户体验是否改善

### 2. 进化过程评估
- **任务完成率**：评估进化任务的完成情况
- **时间管理**：评估进化过程的时间管...

### 60. evolution-tasks-breakdown.md
- 路径: .trae\documents\evolution-tasks-breakdown.md
- 预览: # 进化任务分解与时间节点设置

## 一、任务分解总览

| 任务ID | 任务名称 | 优先级 | 时间分配 | 主要子任务 |
|--------|----------|--------|----------|------------|
| T1 | 智能体提示词优化 + ADL集成 | P0 | 1小时 | 检查智能体提示文件、添加ADL协议、优化职责描述、测试智能体功能 |
| T2 |...

### 61. evolution_directions.md
- 路径: .trae\documents\evolution_directions.md
- 预览: # OpenClaw AI 系统进化方向与优先级排序

## 1. 进化方向确定

基于对话历史复盘分析，确定以下 5 个关键进化方向：

### 1.1 方向1: 能力树系统优化
- **描述**: 优化能力树结构，实现可视化管理，增强可扩展性
- **优先级**: P1 (高)
- **预期成果**: 更合理的能力树结构，直观的可视化管理界面，动态能力节点管理
- **关键改进点**:
  -...

### 62. evolution_execution_plan.md
- 路径: .trae\documents\evolution_execution_plan.md
- 预览: # 进化执行计划 - 详细实施方案

## 短期执行计划（4小时内）

### [x] 任务 1: 系统状态检查与准备（0-10分钟）
- **优先级**: P0
- **依赖**: None
- **描述**:
  - 检查当前运行的进程和系统状态
  - 确认evolver、evolution-evaluator、OPENclaw等服务运行正常
  - 记录当前系统性能指标
- **成功标准*...

### 63. evolution_integration_plan.md
- 路径: .trae\documents\evolution_integration_plan.md
- 预览: # 进化系统集成计划 - 实施方案

## 项目概述
本计划旨在实现绿茶智能体的进化系统启动，将其融入公司结构，并与大宗师智能体建立有效的协作机制。通过PCEC、ADL等进化协议，确保智能体持续优化并为公司创造价值。

## [ ] 任务1: 验证进化系统状态并启动
- **优先级**: P0
- **依赖关系**: 无
- **描述**:
  - 检查当前进化系统状态
  - 启动所有必要的进化...

### 64. evomap_openclaw_integration_plan.md
- 路径: .trae\documents\evomap_openclaw_integration_plan.md
- 预览: # EvoMap & OPENCLAW 集成实施计划

## 任务概述
1. 执行EvoMap连接，自主获取任务，资产发布，完成任务
2. 通过OPENCLAW连接小红书，自主自动发布第一条图文
3. 通过OPENCLAW连接微信视频号，自主生成视频，发布第一条视频
4. 通过OPENCLAW连接微信公众号，自主生成公众号图文，发布第一条图文

## 实施计划

### [x] 任务1: 完善Ev...

### 65. feishu_agent_fix_plan.md
- 路径: .trae\documents\feishu_agent_fix_plan.md
- 预览: # 飞书机器人Anthropic API Key错误修复计划

## [x] 任务1: 验证当前认证配置文件

**完成情况**:
- 已检查认证配置文件内容
- 发现当前提供商为 "qwen-portal"，不是 "volcano-engine"
- 确认需要强制覆盖配置文件
- **优先级**: P0
- **依赖**: 无
- **描述**:
  - 检查当前的auth-profiles.j...

### 66. feishu_autoconfig_plan.md
- 路径: .trae\documents\feishu_autoconfig_plan.md
- 预览: # 飞书通道自动配置计划

## [x] 任务1: 检查当前OpenClaw配置

**完成情况**:
- 已读取OpenClaw配置文件
- 发现飞书通道已配置但存在错误:
  - App ID错误: "cli_a91012cd0ab89c9" (缺少最后一个"b")
  - App Secret错误: "W2dl8mRwy7ArghhqZSp9heG8i3l2FVP5" (小写的"l"而不是大...

### 67. Git SSH 密钥配置计划.md
- 路径: .trae\documents\Git SSH 密钥配置计划.md
- 预览: # Git SSH 密钥配置计划

## 执行步骤

### 1. 检查本地现有密钥
- 查看 `.ssh` 目录是否存在
- 检查是否已有可用的 SSH 密钥对

### 2. 生成新的 SSH 密钥
- 执行 `ssh-keygen -t ed25519 -C "xiaxingxiaowei1983@gmail.com"` 命令
- 确认默认保存路径
- 选择是否设置安全密码短语

### 3...

### 68. green-tea-8hour-evolution-plan.md
- 路径: .trae\documents\green-tea-8hour-evolution-plan.md
- 预览: # 绿茶智能体 8小时不间断进化与EvoMap任务认领计划

## 项目概述

为绿茶智能体实现 8 小时不间断进化与 EvoMap 任务认领系统，确保智能体能够持续获取和执行实际任务，同时通过进化不断提升能力。

## 实施计划

### [x] 任务 1: 搭建 EvoMap 持续连接服务
- **优先级**: P0
- **依赖**: 无
- **描述**:
  - 创建 EvoMap 持续...

### 69. green-tea-evolution-plan.md
- 路径: .trae\documents\green-tea-evolution-plan.md
- 预览: # 绿茶智能体进化计划 (The Implementation Plan)

## [/] Task 1: 初始化Git仓库
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在绿茶智能体工作目录初始化Git仓库
  - 配置Git用户信息
  - 创建.gitignore文件
  - 完成初始提交
- **Succ...

### 70. green-tea-evomap-authenticity_plan.md
- 路径: .trae\documents\green-tea-evomap-authenticity_plan.md
- 预览: # 绿茶智能体EvoMap真实性分析与修复计划

## 项目背景
用户反映绿茶智能体可能返回虚拟的EvoMap任务，需要分析如何让它连接到真实的EvoMap网络。

## 当前状态分析

### 现有功能
- ✅ 绿茶智能体已启动并运行在 http://localhost:4003
- ✅ 已实现EvoMap连接功能
- ✅ 已实现胶囊安装功能（从本地文件读取）
- ✅ 已实现任务执行功能

##...

### 71. green_tea_personality_plan.md
- 路径: .trae\documents\green_tea_personality_plan.md
- 预览: # OpenClaw 插件安装错误解决方案

## 问题分析

当前系统遇到 `spawn EINVAL` 错误，这是由于 OpenClaw 在 Windows 环境下尝试调用系统级命令时的路径解析问题导致的。

## 解决方案计划

### 步骤 1：检查当前状态

* 验证 OpenClaw 版本

* 检查 npm 环境配置

* 确认插件目录结构

### 步骤 2：创建插件目录

* 创...

### 72. life-decision-master-8-hour-evolution-plan.md
- 路径: .trae\documents\life-decision-master-8-hour-evolution-plan.md
- 预览: # 人生决策宗师 8小时不间断进化方案

## 一、公司资产复盘

### 1.1 核心智能体资产
- **战略大脑（大宗师/总督）- CSO**：负责整体战略决策和智能体协调
- **公司大脑智能体 COO**：负责日常运营和资源管理
- **生产引擎（构建者/开发助手）- CTO + 生产**：负责技术开发和系统维护
- **增长和沟通专家（绿茶智能体/营销专家）**：负责内容创作和公域运营
...

### 73. life-decision-master-8hour-evolution-plan.md
- 路径: .trae\documents\life-decision-master-8hour-evolution-plan.md
- 预览: # 人生决策宗师8小时进化计划

## 📋 对话复盘

### 已完成工作
1. **能力树结构优化**：添加四大核心分支，明确11个能力节点
2. **价值函数优化**：实现5个核心价值维度，添加0-10分制评分标准
3. **PCEC系统完善**：增强能力候选生成和进化效果评估
4. **工具集成增强**：增加富消息和表情支持
5. **系统集成**：PCEC与价值函数深度集成
6. **测...

### 74. life-decision-master-capability-tree-analysis.md
- 路径: .trae\documents\life-decision-master-capability-tree-analysis.md
- 预览: # 人生决策宗师能力树与价值函数分析报告

## 📊 其他智能体系统分析

### 1. 能力树结构 (OpenClaw AI Agent)

| 分支 | 节点 | 功能描述 | 工具 | 核心能力 |
|------|------|----------|------|----------|
| **Communication** | 1.1 Rich Messaging | 富消息输出 | ...

### 75. life-decision-master-capability-tree-documentation.md
- 路径: .trae\documents\life-decision-master-capability-tree-documentation.md
- 预览: # 人生决策宗师能力树文档

## 1. 能力树概述

人生决策宗师能力树是一个结构化的能力管理系统，用于组织和管理人生决策宗师的所有能力。能力树采用层级结构，将能力分为高层、中层和低层三个层次，形成一个清晰、可扩展的能力体系。

### 核心设计原则

- **层级分明**：低层节点为基础操作，中层节点为可复用流程，高层节点为问题分解策略
- **定义完整**：每个能力节点都包含能力名称、输入条...

### 76. life-decision-master-capability-tree-plan.md
- 路径: .trae\documents\life-decision-master-capability-tree-plan.md
- 预览: # 人生决策宗师能力树实现计划

## 核心能力领域分析

基于对人生决策宗师的分析，识别出以下核心能力领域：

### 1. 人生决策
- 职业发展
- 健康管理
- 关系管理
- 财务规划
- 个人成长

### 2. 能量管理系统
- 能量来源
- 能量消耗
- 能量平衡

### 3. 底层逻辑框架
- 价值观体系
- 决策原则
- 思维模式

### 4. 工作流程
- 决策接收
- 信...

### 77. life-decision-master-value-function-documentation.md
- 路径: .trae\documents\life-decision-master-value-function-documentation.md
- 预览: # 人生决策宗师 - 价值函数突变指令文档

## 1. 概述

### 1.1 什么是价值函数突变指令

价值函数突变指令（Value Function Mutation）是人生决策宗师智能体的核心能力之一，它允许智能体基于内在价值函数来评估和选择能力进化方向，而不是平均对待所有潜在能力。

### 1.2 核心目标

- **智能进化选择**：基于价值函数评估，优先发展高价值能力
- **系统...

### 78. life-decision-master-value-function-integration-completion.md
- 路径: .trae\documents\life-decision-master-value-function-integration-completion.md
- 预览: # 人生决策宗师价值函数集成完成报告

## 🎉 项目完成情况

### 📋 项目概览
- **项目名称**：人生决策宗师价值函数突变集成
- **项目状态**：✅ 已完成
- **完成日期**：2024-01-01
- **集成模块**：价值函数核心系统 → 人生决策宗师智能体

### 🎯 核心目标完成情况

| 目标 | 状态 | 说明 |
|------|------|------|...

### 79. life-decision-master-value-function-mutation-plan.md
- 路径: .trae\documents\life-decision-master-value-function-mutation-plan.md
- 预览: # 人生决策宗师价值函数突变实施计划

## 📋 计划概览

### 项目背景
人生决策宗师（@人生决策宗师）智能体需要实施价值函数突变指令，不再平均对待所有潜在能力，而是基于内在价值函数来决定哪些能力值得进化，哪些不值得。

### 实施目标
1. 建立完整的价值函数评估体系
2. 集成价值函数与现有能力树系统
3. 实现价值函数突变机制
4. 建立低价值能力识别和管理流程
5. 确保系统稳定...

### 80. life-decision-master-value-function-plan.md
- 路径: .trae\documents\life-decision-master-value-function-plan.md
- 预览: # 人生决策宗师 - 价值函数突变指令实施计划

## 项目概述
为人生决策宗师智能体实施价值函数突变指令，使其基于内在价值函数来决定能力进化优先级，提升系统整体效率和稳定性。

## 实施任务分解

### [x] 任务 1: 价值函数核心实现
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 实现价值函数核心逻辑，...

### 81. master_agent_implementation_plan.md
- 路径: .trae\documents\master_agent_implementation_plan.md
- 预览: # 大宗师智能体实施计划 - 详细步骤分解

## [x] 任务 1: 检查智能体列表
- **优先级**: P0
- **依赖关系**: 无
- **描述**:
  - 运行命令检查当前已注册的智能体
  - 确认 master 智能体是否已存在
- **成功标准**:
  - 命令成功执行并显示智能体列表
  - 能够确认 master 智能体的状态
- **测试要求**:
  - `prog...

### 82. master_agent_implementation_report.md
- 路径: .trae\documents\master_agent_implementation_report.md
- 预览: # 大宗师智能体实施报告

## 实施概述

本次实施旨在解决无法在其他对话框中使用 `@大宗师` 启动命令启动智能体的问题。通过一系列步骤，成功注册了 master 智能体，设置了智能体身份为大宗师，并配置了触发器，使智能体能够在对话框中通过 `@大宗师` 命令启动。

## 实施步骤

### 步骤 1: 检查智能体列表
- **执行命令**: `openclaw agents list`
-...

### 83. memory_database_plan.md
- 路径: .trae\documents\memory_database_plan.md
- 预览: # 记忆库（Memory Database）实现计划

## 项目目标
在 mission-control 中构建一个记忆库页面，将所有记忆以漂亮的文档形式展示，并提供全局搜索功能，使记忆成为可搜索的资产。

## 技术栈
- **前端框架**: Next.js
- **数据库**: Convex
- **样式**: Tailwind CSS
- **组件库**: shadcn/ui

## 实现...

### 84. mission_control_plan.md
- 路径: .trae\documents\mission_control_plan.md
- 预览: # Mission Control 实现计划

## 项目概述
构建一套由 OpenClaw 自己生成的专属控制台，使用 Next.js + Convex 技术栈，实现任务看板、流程工具化和可检索的记忆系统。

## 技术栈
- **前端框架**: Next.js
- **数据库**: Convex
- **部署**: Vercel

## 实施步骤

### [x] Task 1: 初始化 Ne...

### 85. notebooklm_bot_plan.md
- 路径: .trae\documents\notebooklm_bot_plan.md
- 预览: # NotebookLM 自动化操作实现计划

## 项目目标
通过 OpenClaw 结合 Puppeteer 实现完全自动化的 NotebookLM 操作，包括文件上传、内容生成、结果下载和文件夹自动监控。

## 实现步骤

### [x] 步骤 1: 创建项目目录和初始化
- **Priority**: P0
- **Depends On**: None
- **Description**...

### 86. one_person_company_evolution_plan.md
- 路径: .trae\documents\one_person_company_evolution_plan.md
- 预览: # 1人公司进化计划 - OpenClaw多Agent系统实施

## 项目概述
基于用户需求，构建一个运行在本地的OpenClaw多Agent系统，作为1人公司的数字化组织架构，包含六个核心独立AI助手，每个都有自己的Telegram Bot，能够分工协作并进行Agent间通信，实现1人公司的高效运营和快速进化。

## 系统架构
- **Gateway**: OpenClaw主进程，负责消息路...

### 87. OpenClaw 插件安装错误解决方案.md
- 路径: .trae\documents\OpenClaw 插件安装错误解决方案.md
- 预览: # OpenClaw 插件安装错误解决方案

## 问题分析
当前系统遇到 `spawn EINVAL` 错误，这是由于 OpenClaw 在 Windows 环境下尝试调用系统级命令时的路径解析问题导致的。

## 解决方案计划

### 步骤 1：检查当前状态
- 验证 OpenClaw 版本
- 检查 npm 环境配置
- 确认插件目录结构

### 步骤 2：创建插件目录
- 创建 `C:...

### 88. openclaw-skill-integration-execution-plan.md
- 路径: .trae\documents\openclaw-skill-integration-execution-plan.md
- 预览: # OpenClaw技能集成执行计划

## 项目概述

本计划旨在系统地执行OpenClaw+evo系统的技能集成解决方案，解决之前遇到的技能识别问题，确保所有创建的技能能够被OpenClaw正确识别和使用。

## 执行状态

### 已完成的任务

1. ✅ **UI/UX技能文件创建**：手动创建了多个UI/UX相关技能文件
2. ✅ **GitHub仓库克隆**：成功克隆了awesome...

### 89. openclaw-skill-integration-execution-report.md
- 路径: .trae\documents\openclaw-skill-integration-execution-report.md
- 预览: # OpenClaw技能集成执行报告

## 执行概述

本报告总结了OpenClaw技能集成执行计划的实施情况，详细记录了尝试的方法、遇到的问题以及最终结果。

## 执行状态

### 已完成的任务

1. ✅ **环境验证与准备**：
   - 确认OpenClaw版本：2026.2.21-2
   - 检查配置文件结构
   - 验证技能目录结构完整性

2. ✅ **技能集成核心实施**...

### 90. openclaw_api_connection_plan.md
- 路径: .trae\documents\openclaw_api_connection_plan.md
- 预览: # OpenClaw API 连接解决方案 - 实现计划

## [/] 任务 1：分析当前状态
- **优先级**：P0
- **依赖**：无
- **描述**：
  - 检查当前 OpenClaw 配置文件
  - 验证 API 配置状态
  - 检查网关服务运行状态
  - 分析 Health Offline 原因
- **成功标准**：
  - 明确当前配置状态
  - 识别 API 连接...

### 91. openclaw_fix_plan.md
- 路径: .trae\documents\openclaw_fix_plan.md
- 预览: # OpenClaw 问题修复计划

## 问题概述
- **API配置问题**：OpenClaw无法正确连接火山引擎/豆包API
- **Gateway Token Missing**：`disconnected (1008): unauthorized: gateway token missing`
- **CSP错误**：阻止加载Google Fonts，影响UI显示

## 修复计划

#...

### 92. openclaw_master_agent_plan.md
- 路径: .trae\documents\openclaw_master_agent_plan.md
- 预览: # OpenClaw 大宗师智能体启动问题解决方案 - 实施计划

## [x] 任务 1: 运行诊断工具检查系统状态
- **优先级**: P0
- **依赖关系**: 无
- **描述**:
  - 运行 OpenClaw 诊断工具，检查系统健康状态
  - 识别并修复潜在的配置问题
- **成功标准**:
  - 诊断工具成功运行并完成所有检查
  - 所有严重问题都已修复
- **测试要求...

### 93. pcec_architecture_design.md
- 路径: .trae\documents\pcec_architecture_design.md
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 系统架构设计文档

## 1. 系统概述

PCEC 是一个强制的周期性自我进化系统，每小时自动触发一次，夜间持续进化8小时，旨在通过系统性的认知扩展，不断提升智能体的能力和效率。

### 1.1 核心目标
- 每小时至少识别并推进一项新功能、新抽象或新杠杆
- 确保每次进化产生真实、实质性的成果
- 严格遵...

### 94. pcec_implementation_plan.md
- 路径: .trae\documents\pcec_implementation_plan.md
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 系统实现计划

## 系统架构

### 核心组件
1. **PCEC 调度器** (`pcec-hourly-scheduler.js`) - 每小时自动触发进化任务
2. **思维爆炸引擎** (`skills/capability-evolver/modules/mind-explosion-engine...

### 95. pcec_system_documentation.md
- 路径: .trae\documents\pcec_system_documentation.md
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 系统文档

## 1. 系统概述

PCEC 是一个强制定时自我进化系统，设计用于每小时自动触发一次进化任务，夜间不停顿进化8小时。该系统旨在通过系统性的周期进化，确保 AI 系统能力持续提升，同时防止退化。

### 核心目标
- **每小时自动触发**：不依赖用户输入、错误发生或外部触发
- **真实进化*...

### 96. plan_20260202_134834.md
- 路径: .trae\documents\plan_20260202_134834.md
- 预览: # HTP 项目深度优化计划

## 一、专业心理分析报告功能实现

### 1.1 创建专业报告页面组件
- 在 `src/sections/` 目录下创建 `ProfessionalReportPage.tsx`
- 实现专业的心理分析报告展示页面
- 包含完整的 HTML 报告结构和样式

### 1.2 修改 ResultPage.tsx 的专业报告入口
- 将右上角的文档图标按钮改为实际...

### 97. plan_20260202_150503.md
- 路径: .trae\documents\plan_20260202_150503.md
- 预览: ## 修改计划：恢复狐狸熊猫图片模块并调整div位置

### 核心需求
1. **恢复原图片模块**：在选中的div模块右边添加狐狸熊猫图片模块
2. **替换图片**：使用用户提供的狐狸熊猫图片替换原来的`/hero-image.jpg`
3. **调整位置**：将选中的div往下移动一个模块

### 具体修改步骤

#### 第一步：添加图片模块
- 在A - AWAKEN Section...

### 98. plan_20260202_170349.md
- 路径: .trae\documents\plan_20260202_170349.md
- 预览: ## 页面逻辑分析与智能体接口标准

### 当前系统工作流程

**输入阶段**

* 用户输入：出生年份、月份、日期、小时、分钟、日历类型（阳历/农历）、性别

* 数据格式：JSON对象包含所有出生信息

**计算阶段**（后端逻辑）

* 根据出生信息计算八字四柱（年柱、月柱、日柱、时柱）

* 确定日主和五行属性

* 判断格局类型

* 生成年度关键词和描述

**输出阶段**

* ...

### 99. plan_20260203_011919.md
- 路径: .trae\documents\plan_20260203_011919.md
- 预览: # 会员权益和积分系统实现计划

## 1. 积分系统架构
- 创建积分状态管理（localStorage + React state）
- 积分规则：
  - 注册会员：赠送 1000 积分
  - 每日打卡：赠送 100 积分
  - 充值：1元 = 500 积分
  - 使用数字分身：扣除 100 积分

## 2. 修改 LoginModal.tsx
- 注册成功后自动赠送 1000 积分...

### 100. plan_20260203_020811.md
- 路径: .trae\documents\plan_20260203_020811.md
- 预览: 修复两个问题：

## 1. 恢复两步流程
修改 `BirthInputModal.tsx`：
- 恢复原来的两步流程：步骤1输入生辰信息，步骤2确认信息+输入问题
- 步骤1点击"下一步"时，只计算八字，不调用后端API
- 步骤2点击"提交问题"时，才调用后端API并关闭弹窗

## 2. 添加红灯日期
修改 `server.cjs`：
- 在 `generateMonthHighlights...

### 101. plan_20260203_022235.md
- 路径: .trae\documents\plan_20260203_022235.md
- 预览: # 支付充值积分系统开发计划

## 一、数据库设计与迁移
1. **创建充值订单表** (`recharge_orders`)
   - 订单状态机（待支付、支付成功、支付失败、已关闭）
   - 支付渠道记录（微信/支付宝）
   - 索引优化（用户ID+状态、订单号）

2. **增强积分流水表** (`points_log`)
   - 增加 `source_type` 字段（1=充值 2...

### 102. plan_20260203_031740.md
- 路径: .trae\documents\plan_20260203_031740.md
- 预览: ## 修改计划

### 1. 更新后端服务配置
- 修改 `server.js` 文件中的 API 调用地址，使用用户提供的应用 ID
- 调整请求参数格式，符合用户提供的 API 调用格式
- 确保 API Key 仍然从环境变量读取，保持安全性

### 2. 验证前端代码
- 确认 `chat.html` 中没有硬编码的 API Key 或应用 ID
- 确保前端代码只调用本地代理接口，不...

### 103. plan_20260203_033535.md
- 路径: .trae\documents\plan_20260203_033535.md
- 预览: ## 集成方案

### 1. 项目结构调整
- 在 `life choice` 项目中创建认证相关组件和服务
- 复制 AWKN-LAB 的 LoginModal 组件到 life choice 项目
- 创建用户认证状态管理服务

### 2. 核心功能实现
- **用户状态检查**：
  - 检查 localStorage 中的用户信息
  - 实现无感登录逻辑
- **注册页面弹出**：
...

### 104. plan_20260203_034217.md
- 路径: .trae\documents\plan_20260203_034217.md
- 预览: ## 改进方案：先跳转到结果页面，后台生成详细报告

### 修改文件清单

| 文件 | 修改内容 | 优先级 |
|------|---------|--------|
| `src/contexts/AppContext.tsx` | 修改 `analyzeUserDrawing` 函数，先跳转再生成报告 | P0 |
| `src/sections/ResultPage.tsx` | 添加...

### 105. plan_20260203_034548.md
- 路径: .trae\documents\plan_20260203_034548.md
- 预览: ## 修改计划

### 1. 核心功能实现

#### 1.1 积分检测逻辑
- 修改 `handleSubmit` 函数，在提交前检查用户积分
- 使用 `pointsSystem.ts` 中的 `getPointsData` 和 `reducePoints` 函数
- 设定生成决策分析所需的积分阈值（例如：100积分）

#### 1.2 积分不足提示窗口
- 创建新的提示窗口组件 `Poi...

### 106. plan_20260203_065945.md
- 路径: .trae\documents\plan_20260203_065945.md
- 预览: ## 阿里云百炼API配置计划

### 步骤1：创建API配置文件

**文件**: `.env`

```
DASHSCOPE_API_KEY=sk-5b3ed10963f34b4aa7eca0ecb72ab216
DASHSCOPE_APP_ID=YOUR_APP_ID
```

### 步骤2：创建阿里云百炼API服务

**文件**: `src/services/htpAnalysisS...

### 107. plan_20260203_092247.md
- 路径: .trae\documents\plan_20260203_092247.md
- 预览: ## 部署失败问题分析与解决方案

### 问题分析

**错误信息：**
```
error TS18003: No inputs were found in config file '/vercel/path0/tsconfig.app.json'. Specified 'include' paths were '["src"]' and 'exclude' paths were '[]'.
...

### 108. plan_20260203_093539.md
- 路径: .trae\documents\plan_20260203_093539.md
- 预览: ## 解决Vercel部署失败问题的方案

### 问题分析

**错误信息：**
```
Failed to resolve /src/main.tsx from /vercel/path0/index.html
```

**根本原因：**
- Vercel部署时的目录结构与本地不同
- index.html中的script标签引用路径不正确
- Vite构建时找不到入口文件

### 解决方...

### 109. plan_20260204_011641.md
- 路径: .trae\documents\plan_20260204_011641.md
- 预览: ## 解决Vercel部署路径解析问题的方案

### 问题分析

**错误信息：**
```
[vite:build-html] Failed to resolve ./src/main.tsx from /vercel/path0/index.html
```

**根本原因：**
- Vercel部署环境中的路径结构与本地不同
- Vite配置中的 `base: './'` 在Vercel环...

### 110. plan_20260204_022123.md
- 路径: .trae\documents\plan_20260204_022123.md
- 预览: ## 解决Vercel部署缓存问题的方案

### 问题分析

**错误信息：**
```
[vite:build-html] Failed to resolve ./src/main.tsx from /vercel/path0/index.html
```

**根本原因：**
- Vercel可能缓存了旧的构建配置
- GitHub仓库中的代码可能还没有更新到最新版本
- Vercel部署环...

### 111. plan_20260204_023827.md
- 路径: .trae\documents\plan_20260204_023827.md
- 预览: ## 解决Vercel构建失败问题的方案

### 问题分析

**错误信息：**

```
Command "npm run build" exited with 1
[vite:build-html] Failed to resolve ./src/main.tsx from /vercel/path0/index.html
```

**根本原因：**

* Vercel部署环境中的路径解析...

### 112. plan_20260222_043323.md
- 路径: .trae\documents\plan_20260222_043323.md
- 预览: # Git SSH 密钥配置详细计划

## 执行步骤

### 1. 检查本地现有密钥
- 确认 `.ssh` 目录存在
- 检查是否已有密钥文件

### 2. 生成新的 SSH 密钥（非交互式）
- 使用非交互式命令生成密钥，避免等待输入
- 命令：`ssh-keygen -t ed25519 -C "xiaxingxiaowei1983@gmail.com" -f "$HOME\.ssh\...

### 113. skill_installation_plan.md
- 路径: .trae\documents\skill_installation_plan.md
- 预览: # 大宗师SKILL安装计划

## 项目概述
为大宗师智能体安装一系列SKILL，涵盖内容创作、消息渠道、笔记与文档、开发工具、媒体与娱乐、安全与工具、网络与服务以及其他实用工具等多个类别。

## 安装计划

### [x] 任务 1：更新Clawhub和安装基础工具
- **优先级**：P0
- **依赖**：无
- **描述**：更新Clawhub并安装基础工具SKILL，为后续安装做准备...

### 114. system_status_analysis.md
- 路径: .trae\documents\system_status_analysis.md
- 预览: # 系统状态分析报告

## 1. 现有系统架构

### 1.1 能力管理系统
- **基础能力树** (`capabilities/capability-tree.js`):
  - 实现了完整的能力节点管理
  - 支持层级结构（低层、中层、高层）
  - 包含能力使用统计和修剪机制
  - 提供任务路径定位功能

- **增强版能力树** (`enhanced-capability-tre...

### 115. value-function-core-model-design.md
- 路径: .trae\documents\value-function-core-model-design.md
- 预览: # 价值函数核心模型设计

## 1. 模型概述

价值函数核心模型是一个基于多维度评估的能力价值评估系统，用于判断哪些能力值得进化，哪些不值得。该模型通过综合考虑能力的复用频率潜力、对失败率的影响、减少用户认知负担、减少推理/工具成本、提升系统级确定性等维度，为每个能力计算一个综合价值评分。

## 2. 核心价值维度

### 2.1 复用频率潜力

**定义**: 能力在不同场景下被重复使用...

### 116. value-function-mutation-plan.md
- 路径: .trae\documents\value-function-mutation-plan.md
- 预览: # 价值函数突变系统实现计划

## 1. 任务背景

用户提供了「价值函数突变指令」，要求系统不再平均对待所有潜在能力，而是基于内在价值函数来决定哪些能力值得进化，哪些不值得。

## 2. 核心目标

实现一个基于价值函数的能力评估和进化管理系统，确保只有高价值能力进入进化队列，同时支持价值函数的安全突变。

## 3. 已完成工作

### 3.1 系统架构分析
- 分析了现有能力管理系统架...

### 117. value_function_mutation_plan.md
- 路径: .trae\documents\value_function_mutation_plan.md
- 预览: # 价值函数突变指令实施计划

## 1. 项目概述

本计划旨在实现价值函数突变指令（Value Function Mutation），使智能体能够基于内在价值函数来评估和选择值得进化的能力，而不是平均对待所有潜在能力。

## 2. 现状分析

### 2.1 现有系统
- **能力树系统**：三层结构（低层基础操作、中层可复用流程、高层问题分解）
- **ADL集成**：已集成反进化锁定协议...

### 118. wechat-automation-plan.md
- 路径: .trae\documents\wechat-automation-plan.md
- 预览: # 微信账号授权与自动化操作计划

## 项目概述

本计划旨在实现微信账号的授权管理，使智能体能够作为用户的数字分身，与朋友进行自动化聊天并自主发布朋友圈内容。

## 实施任务列表

### [x] 任务1：微信账号授权方案设计与实现
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 设计微信账号授权的安全方案
 ...

### 119. 修复AI服务不可用和红绿灯显示问题.md
- 路径: .trae\documents\修复AI服务不可用和红绿灯显示问题.md
- 预览: ## 问题分析

### 1. API调用问题
- 当前代码调用的是本地API (`http://localhost:3000/api/decision-analysis`)
- 用户希望使用阿里云的DashScope API
- 需要修改API调用逻辑，使用`dashscope.Application.call`方法

### 2. 红灯数据问题
- 当前`bazi-engine.ts`中所有高...

### 120. 微信运营进化实施计划.md
- 路径: .trae\documents\微信运营进化实施计划.md
- 预览: # 微信运营进化实施计划

## 项目目标
执行微信管理多渠道运营的全面进化，包括多渠道协同优化、AI内容生成增强、粉丝增长策略升级、技术实现升级和数据分析系统完善。

## 实施任务分解与优先级

### [ ] 任务1: 多渠道协同优化
- **Priority**: P0 (最高优先级)
- **Depends On**: None
- **Description**:
  - 设计内容矩阵...

### 121. 解决后端MongoDB数据库连接失败问题.md
- 路径: .trae\documents\解决后端MongoDB数据库连接失败问题.md
- 预览: # 解决后端MongoDB数据库连接失败问题

## 问题分析

从错误信息 `MongooseServerSelectionError: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017` 可以看出，后端无法连接到本地MongoDB服务器。

## 解决方案

### 方案1：本地安装并启动MongoDB（推...

### 122. 阿里云百炼 API 调用问题修复计划.md
- 路径: .trae\documents\阿里云百炼 API 调用问题修复计划.md
- 预览: ## 问题分析

经过网络连接测试和代码分析，发现阿里云百炼 API 调用可能存在以下问题：

1. **请求格式不匹配** - 当前代码使用的请求体格式与阿里云百炼 API 预期格式可能不一致
2. **权限或限流问题** - API Key 可能没有正确权限或达到调用限制
3. **错误处理不完善** - 缺少详细的错误日志和降级机制

## 修复方案

### 1. 修正 API 请求格式
...

### 123. architecture.md
- 路径: .trae\pcec\documentation\architecture.md
- 预览: # PCEC 系统架构设计文档

## 1. 系统概述

Periodic Cognitive Expansion Cycle (PCEC) 是一个系统级的周期性进化任务，每1小时自动触发一次，夜间不停顿进化8小时。此系统旨在通过持续的自我进化，不断提升智能体的能力和性能。

## 2. 核心组件

### 2.1 核心执行模块 (pcec-cycle.js)
- **功能**：执行PCEC周期的...

### 124. maintenance.md
- 路径: .trae\pcec\documentation\maintenance.md
- 预览: # PCEC 系统维护指南

## 1. 日常维护

### 1.1 定期检查

| 检查项目 | 检查频率 | 检查方法 | 预期结果 |
|----------|----------|----------|----------|
| PCEC执行状态 | 每日 | 查看最近的进化历史记录 | 每小时至少执行一次 |
| 系统资源使用 | 每周 | 查看监控系统生成的资源使用报告 | 内存使用<...

### 125. usage.md
- 路径: .trae\pcec\documentation\usage.md
- 预览: # PCEC 系统使用说明

## 1. 系统启动

### 1.1 手动启动

```bash
# 启动PCEC核心执行模块
node pcec-cycle.js

# 启动小时调度器
node pcec-hourly-scheduler.js
```

### 1.2 自动启动

将以下命令添加到系统启动脚本中，确保PCEC系统在系统启动时自动运行：

```bash
# 启动小时调度器
no...

### 126. PROJECT_STRUCTURE.md
- 路径: .trae\skills\awkn-platform_awkn-platform\PROJECT_STRUCTURE.md
- 预览: # AWKN项目结构说明

## 目录结构

```
awkn-platform/
├── README.md                 # 项目说明文档
├── QUICKSTART.md            # 快速开始指南
├── DEPLOYMENT.md            # 部署文档
├── PROJECT_STRUCTURE.md      # 本文件 - 项目结构说明
...

### 127. QUICKSTART.md
- 路径: .trae\skills\awkn-platform_awkn-platform\QUICKSTART.md
- 预览: # AWKN认知觉醒平台 - 快速开始指南

本指南帮助您在5分钟内快速启动AWKN平台。

## 🚀 一键启动（Docker Compose）

### 前置要求

- Docker 20.10+
- Docker Compose 2.0+

### 启动步骤

```bash
# 1. 克隆项目
git clone <repository-url>
cd awkn-platform

# 2...

### 128. README.md
- 路径: .trae\skills\awkn-platform_awkn-platform\README.md
- 预览: # AWKN - AI Cognitive Awakening Platform

## 项目简介

AWKN是一个帮助他人做认知觉醒的平台，包含内容创作工具箱。采用苹果官网设计风格，提供极简、优雅的用户体验。

## 核心功能

### 1. 漫画生成
- 输入故事内容，AI自动拆分场景并生成连续风格的漫画
- 支持自定义画风描述
- 可选择漫画页数（1-8页）

### 2. PPT生成
- ...

### 129. content-structure.md
- 路径: .trae\skills\baokuan\assets\content-structure.md
- 预览: # 6模块结构模板

## 目录
- [结构概览](#结构概览)
- [模块1：钩子开场](#模块1钩子开场)
- [模块2：痛点共鸣](#模块2痛点共鸣)
- [模块3：价值承诺](#模块3价值承诺)
- [模块4：核心内容](#模块4核心内容)
- [模块5：金句提炼](#模块5金句提炼)
- [模块6：赋权结尾](#模块6赋权结尾)
- [完整示例](#完整示例)

## 结构概览

AWK...

### 130. SKILL.md
- 路径: .trae\skills\baokuan\assets\SKILL.md
- 预览: ---
name: 爆款文案
description: 基于认知工程学的爆文创作系统，通过神经钩子、模块化架构、视觉层次设计，创建从认知重构到行动改变的完整闭环。适用于观点类、方法论类、认知类深度内容创作。
---

# 认知工程学：从认知重构到行动改变的完整闭环

## 任务目标

本 Skill 是一套认知工程学系统，不是教你"如何写"，而是教你如何重新连接读者的认知神经。核心能力包括：

-...

### 131. visual-metaphor.md
- 路径: .trae\skills\baokuan\assets\visual-metaphor.md
- 预览: # 视觉隐喻设计规范

## 目录
- [设计理念](#设计理念)
- [视觉钩子原理](#视觉钩子原理)
- [核心原则](#核心原则)
- [风格要求](#风格要求)
- [构图规范](#构图规范)
- [隐喻设计](#隐喻设计)
- [常见错误](#常见错误)
- [案例参考](#案例参考)

## 设计理念

AWKN 的封面图不是装饰，而是**认知锚点**——用视觉隐喻强化核心洞见，激活...

### 132. SKILL.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\SKILL.md
- 预览: ---
name: awkn-article-illustrator
description: Smart article illustration skill. Analyzes article content and generates illustrations at positions requiring visual aids with multiple style options. U...

### 133. SKILL.md
- 路径: .trae\skills\baokuan\awkn-compress-image\SKILL.md
- 预览: ---
name: awkn-compress-image
description: Cross-platform image compression skill. Converts images to WebP by default with PNG-to-PNG support. Uses system tools (sips, cwebp, ImageMagick) with Sharp f...

### 134. decomposition-standard.md
- 路径: .trae\skills\baokuan\awkn-content-decomposition\references\decomposition-standard.md
- 预览: # 内容拆解详细标准

## 核心原则
内容拆解的目标是：**从"读懂"到"能用"**。不仅要理解内容，更要提炼出可执行的方法论。

## 拆解的三个层次

### 第一层：核心框架（必填）
**目的**：快速把握内容的本质和价值

包含要素：
1. **核心命题**：1句话概括核心观点
   - 示例："认知边界决定人生边界"
   
2. **核心观点**：提炼3-5个核心观点
   - 每个...

### 135. example-awakening.md
- 路径: .trae\skills\baokuan\awkn-content-decomposition\references\example-awakening.md
- 预览: # 《认知觉醒》完整拆解示例

以下是根据"详细拆解标准"完成的完整示例，展示了从核心框架到12个章节的全面拆解，每个章节都包含底层逻辑、方法论、实践建议和案例。

---

## 一、核心框架

- **核心命题**：开启自我改变的原动力

- **核心观点**：
  1. 大脑的三重结构决定了我们的行为模式
  2. 焦虑的根源在于模糊和不确定性
  3. 认知升级的本质是突破舒适区
  4....

### 136. SKILL.md
- 路径: .trae\skills\baokuan\awkn-content-decomposition\SKILL.md
- 预览: ---
name: awkn-content-decomposition
description: 深度内容拆解与提炼 - 一键将书籍、文章、视频等内容系统化拆解为标准化认知框架，包含底层逻辑、方法论、实践建议和案例。实现从"读过就忘"到"可复用知识体系"的转化。
---

# 深度内容拆解

## 任务目标
- 本技能用于：一键将复杂内容系统化拆解，提炼核心价值和可执行方法论
- 核心价值：将"...

### 137. SKILL.md
- 路径: .trae\skills\baokuan\awkn-cover-image\SKILL.md
- 预览: ---
name: awkn-cover-image
description: 文章封面生成器 - 为文章/主题生成精美手绘风格的封面图。支持20种风格、3种尺寸适配不同平台。自动分析内容并推荐最佳风格，可选择是否包含标题文字。
---

# 文章封面生成器

为文章生成精美的手绘风格封面图，支持多种风格和尺寸。

## 使用方式

```bash
# 从Markdown文件（自动选择风格）
/a...

### 138. SKILL.md
- 路径: .trae\skills\baokuan\awkn-post-to-wechat\SKILL.md
- 预览: ---
name: awkn-post-to-wechat
description: 微信公众号一键发布 - 支持图文和文章两种方式，自动填写内容、上传图片、保存草稿或直接发布。使用Chrome CDP自动化，无需手动操作。
---

# 微信公众号一键发布

使用Chrome CDP自动化将内容发布到微信公众号，支持图文和文章两种发布方式。

## 使用方式

### 图文发布（图文）- 多张图...

### 139. awkn-skills-guide.md
- 路径: .trae\skills\baokuan\awkn-skills-guide.md
- 预览: # 🎯 AWKN 创意技能集 - 完整使用指南

> **给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"**

---

## ✨ 核心价值

- 🚀 **一键生成**：你说内容，我自动完成，无需学习复杂工具
- 🎯 **场景导向**：5大场景覆盖你最常用的需求
- 💯 **专业质量**：基于认知工程学，从"工具执行者"到"思想伙伴"
- 🔄 **完整闭环**...

### 140. viral-logic.md
- 路径: .trae\skills\baokuan\awkn-viral-article\references\viral-logic.md
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建议
- 六、认知工程学：被忽略的写作底层框架
- 七、排版即认知：被忽略的视觉设计语言
- 八、写作即编程：被忽略的结构化表达
- 九、传播工程学：被忽略的分享动机设计
- 十、商业逻辑：被忽略的价值...

### 141. SKILL.md
- 路径: .trae\skills\baokuan\awkn-viral-article\SKILL.md
- 预览: ---
name: awkn-viral-article
description: 公众号爆款文章一键生成 - 基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章。包含7大标题公式、6模块正文结构、转发文案和摘要生成。
---

# 公众号爆款文章一键生成

基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章

## 核心原则

- 不是内容写作技巧...

### 142. analysis-framework.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\analysis-framework.md
- 预览: # Xiaohongshu Content Analysis Framework

Deep analysis framework tailored for Xiaohongshu's unique engagement patterns.

## Purpose

Before creating infographics, thoroughly analyze the source materi...

### 143. DEPLOY_FIX_REPORT.md
- 路径: .trae\skills\baokuan\DEPLOY_FIX_REPORT.md
- 预览: # 部署错误修复报告

## 问题诊断

### 错误信息
```
error: [build] [skill] Failed to extract and upload skill package: extract skill package from tar.gz failed: skill not found in source code: baoyu-viral-article.skill...

### 144. SKILL.md
- 路径: .trae\skills\baokuan\SKILL.md
- 预览: ---
name: awkn-skills
description: AWKN 创意技能集 - 基于认知工程学的创意内容创作系统。10大核心技能 + 5大场景，从内容拆解到发布的完整工作流。包含内容拆解、爆款文章生成、视觉创作、压缩优化、一键发布等全套工具。
---

# AWKN 创意技能集

> 🎯 给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"

---

##...

### 145. TEMPLATE_FIX_REPORT.md
- 路径: .trae\skills\baokuan\TEMPLATE_FIX_REPORT.md
- 预览: # 模板化问题修复报告

## 问题诊断

### 用户反馈
"我把爆文的示例删了，多次生成文字都直接按示例的模板，这个是有问题的"

### 根本原因
虽然用户删除了示例文档（`example-article.md`），但 SKILL.md 中仍然存在两个问题：

1. **"使用示例"部分过于具体**：列出了详细的执行步骤，容易让智能体按模板复制
2. **"资源索引"中引用了不存在的文件**...

### 146. WORKFLOW_FIX_REPORT.md
- 路径: .trae\skills\baokuan\WORKFLOW_FIX_REPORT.md
- 预览: # 工作流引导修复报告

## 问题诊断

### 用户反馈
"我明确说要写公众号爆款文章，写完后没有提示下一步"

### 根本原因
在 **场景2（公众号完整发布流程）** 中，各个技能之间缺乏明确的**下一步引导**，导致用户完成文章创作后，不知道该做什么。

虽然根目录的 SKILL.md 和 awcn-skills-guide.md 中定义了完整的工作流，但各个技能本身的 SKILL.m...

### 147. SKILL.md
- 路径: .trae\skills\BUG\bug-design\SKILL.md
- 预览: ---
name: bug-design
description: BUG修复方案设计阶段，包含修复目标确定、初步方案生成、可行性判断、风险识别、异常应对策略制定
---

# BUG修复方案设计

## 任务目标
- 本Skill用于：设计BUG修复方案，从目标设定到风险应对的完整方案制定
- 能力包含：修复目标确定、方案生成与评估、可行性分析、风险识别、应急规划
- 触发条件：已明确问题根因，...

### 148. SKILL.md
- 路径: .trae\skills\BUG\bug-diagnose\SKILL.md
- 预览: ---
name: bug-diagnose
description: BUG问题诊断阶段，包含问题陈述引导、差异分析、根因定位、假设验证，适用于需要系统性诊断问题根因的场景
---

# BUG问题诊断

## 任务目标
- 本Skill用于：系统性诊断BUG问题，从问题陈述到根因定位的完整分析
- 能力包含：问题陈述引导、差异分析、根因定位、假设验证、方法选择指导
- 触发条件：遇到BUG或异...

### 149. SKILL.md
- 路径: .trae\skills\BUG\bug-execute-verify\SKILL.md
- 预览: ---
name: bug-execute-verify
description: BUG修复执行与验收阶段，包含修复方案执行、进度跟踪、验收标准制定、验收检查、问题汇总
---

# BUG修复执行与验收

## 任务目标
- 本Skill用于：执行BUG修复方案并进行验收，从方案执行到问题汇总的完整闭环
- 能力包含：进度跟踪、异常处理指导、验收标准制定、验收检查、总结复盘
- 触发条件：已完...

### 150. problem-analysis-methods.md
- 路径: .trae\skills\BUG\bug-fix-debugger\references\problem-analysis-methods.md
- 预览: # 问题分析方法参考

## 目录
- [概览](#概览)
- [5Why法](#5why法)
- [鱼骨图](#鱼骨图)
- [MECE原则](#mece原则)
- [PDCA循环](#pdca循环)
- [DMAIC方法](#dmaic方法)
- [假设驱动法](#假设驱动法)
- [A3问题解决](#a3问题解决)
- [KT问题分析](#kt问题分析)
- [二八法则](#二八法则)
- ...

### 151. verification-checklist.md
- 路径: .trae\skills\BUG\bug-fix-debugger\references\verification-checklist.md
- 预览: # 验收标准清单

## 目录
- [概览](#概览)
- [验收标准分类](#验收标准分类)
- [通用验收标准](#通用验收标准)
- [具体场景验收标准](#具体场景验收标准)
- [验收流程](#验收流程)
- [验收报告模板](#验收报告模板)

## 概览
本文档提供BUG修复后的验收标准，确保修复质量，避免引入新问题。

## 验收标准分类

### 必须项（MUST）
- 问题彻底...

### 152. SKILL.md
- 路径: .trae\skills\BUG\bug-fix-debugger\SKILL.md
- 预览: ---
name: bug-fix-debugger
description: BUG排查与修复总入口，提供4个阶段的选择指导，包括问题诊断、方案设计、执行规划、执行与验收的完整流程框架
---

# BUG修复升级版

## 任务目标
- 本Skill用于：作为BUG排查与修复的总入口，提供4个阶段的选择指导和整体流程框架
- 能力包含：阶段选择建议、流程概览、分技能调用指导
- 触发条件：用户...

### 153. SKILL.md
- 路径: .trae\skills\BUG\bug-plan\SKILL.md
- 预览: ---
name: bug-plan
description: BUG修复执行规划阶段，包含方案验证、影响范围分析、详细操作计划制定、异常情况标注
---

# BUG修复执行规划

## 任务目标
- 本Skill用于：制定BUG修复的详细执行计划，从方案验证到任务分解的完整规划
- 能力包含：方案影响范围分析、任务拆解、流程规划、进度估算、异常应对
- 触发条件：已完成方案设计，需要制定详细执...

### 154. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\keyword\README.md
- 预览: # 目的
关键字匹配并回复

# 试用场景
目前是在微信公众号下面使用过。

# 使用步骤
1. 复制 `config.json.template` 为 `config.json`
2. 在关键字 `keyword` 新增需要关键字匹配的内容
3. 重启程序做验证

# 验证结果
![结果](test-keyword.png)...

### 155. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\README.md
- 预览: **Table of Content**

- [插件化初衷](#插件化初衷)
- [插件安装方法](#插件安装方法)
- [插件化实现](#插件化实现)
- [插件编写示例](#插件编写示例)
- [插件设计建议](#插件设计建议)

## 插件化初衷

之前未插件化的代码耦合程度高，如果要定制一些个性化功能（如流量控制、接入`NovelAI`画图平台等），需要了解代码主体，避免影响到其他的功能...

### 156. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\tool\README.md
- 预览: ## 插件描述
一个能让chatgpt联网，搜索，数字运算的插件，将赋予强大且丰富的扩展能力   
使用说明(默认trigger_prefix为$)：  
```text
#help tool: 查看tool帮助信息，可查看已加载工具列表  
$tool 工具名 命令: （pure模式）根据给出的{命令}使用指定 一个 可用工具尽力为你得到结果。
$tool 命令: （多工具模式）根据给出的{命令...

### 157. README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\README.md
- 预览: <p align="center"><img src= "https://github.com/user-attachments/assets/31fb4eab-3be4-477d-aa76-82cf62bfd12c" alt="Chatgpt-on-Wechat" width="600" /></p>

<p align="center">
   <a href="https://github....

### 158. CONTRIBUTING.md
- 路径: .trae\skills\cline-main\locales\zh-cn\CONTRIBUTING.md
- 预览: # 贡献到 Cline

我们很高兴您有兴趣为 Cline 做出贡献。无论您是修复错误、添加功能还是改进我们的文档，每一份贡献都让 Cline 更加智能！为了保持我们的社区充满活力和欢迎，所有成员必须遵守我们的[行为准则](CODE_OF_CONDUCT.md)。

## 报告错误或问题

错误报告有助于让 Cline 对每个人都更好！在创建新问题之前，请先[搜索现有问题](https://git...

### 159. README.md
- 路径: .trae\skills\cline-main\locales\zh-cn\README.md
- 预览: # Cline

<p align="center">
    <img src="https://media.githubusercontent.com/media/cline/cline/main/assets/docs/demo.gif" width="100%" />
</p>

<div align="center">
<table>
<tbody>
<td align="center"...

### 160. README.md
- 路径: .trae\skills\cline-main\locales\zh-tw\README.md
- 预览: <div align="center"><sub>
<a href="https://github.com/cline/cline/blob/main/README.md" target="_blank">English</a> | <a href="https://github.com/cline/cline/blob/main/locales/es/README.md" target="_bl...

### 161. ARCHITECTURE.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\ARCHITECTURE.md
- 预览: # 大脑作弊器技能架构说明

## 架构总览

大脑作弊器采用**两层架构设计**：

```
┌─────────────────────────────────────────────────────────────┐
│                     大脑作弊器整体架构                        │
├──────────────────────────────...

### 162. knowledge-visualization-format.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\knowledge-visualization-format.md
- 预览: # 知识点可视化图片格式规范

## 目录
- 基本结构
- 可视化类型
- 交互设计规范
- 视觉设计要求
- 配色方案
- 示例模板

## 基本结构
知识点可视化图片需包含以下元素：
- **知识节点**：核心概念/知识点（使用图标+文字表示）
- **关系连线**：展示知识间的逻辑关系（层级、因果、关联等）
- **层次结构**：从核心到细节的层次展开
- **交互提示**：视觉上暗示可交...

### 163. miming-methodology.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\miming-methodology.md
- 预览: # 咪蒙标题方法论

## 目录
1. [核心原则](#核心原则)
2. [危险法则](#危险法则)
3. [意外法则](#意外法则)
4. [矛盾法则](#矛盾法则)
5. [痛点法则](#痛点法则)
6. [感同身受法则](#感同身受法则)
7. [标题生成指导](#标题生成指导)

## 核心原则
**"意料之外，情理之中"**
- 所有标题必须基于内容核心，不能脱离实际
- 使用技巧激发好...

### 164. textbook.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\textbook.md
- 预览: # 教科书风格详细提示词

## 特点

- 文字占比：30%
- 设计风格：类似课本、教学资料，清晰、严谨、有逻辑感
- 适用场景：知识科普、教程、学术内容、方法论分享

## 视觉元素

- **背景**：干净的纸张纹理或简洁色块
- **排版**：清晰的标题、分层结构、编号列表
- **配色**：蓝色、灰色、米色等教科书常用色
- **图标**：简单的线条图标、箭头、标注

## 提示词模板...

### 165. viral-logic.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\viral-logic.md
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建议
- 六、认知工程学：被忽略的写作底层框架
- 七、排版即认知：被忽略的视觉设计语言
- 八、写作即编程：被忽略的结构化表达
- 九、传播工程学：被忽略的分享动机设计
- 十、商业逻辑：被忽略的价值...

### 166. visualization-styles.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\visualization-styles.md
- 预览: # 可视化风格说明

## 目录
- 一、高适配小红书的视觉风格
  - 极简Ins风
  - 手绘插画风
  - 杂志封面风
  - 数据卡片风
  - 复古胶片风
  - 国潮国风
- 二、高适配公众号的视觉风格
  - 杂志排版风
  - 海报信息图
  - 漫画条漫
  - 文艺诗歌风
  - 极简阅读风
  - 品牌人格风
- 三、双平台通用风格选择策略
  - 一图多投型
  - 长拆...

### 167. SKILL.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\SKILL.md
- 预览: ---
name: AWKN-brain-cheat-tool
description: 大脑作弊器（阅读加速器）- 全球顶级智慧 × 你的私人认知军火库。用1%的时间置换100%的人类智慧。本技能包含完整的7步工作流和所有文生图/公众号发布功能，一站式解决方案。
dependency:
  python:
    - PyPDF2>=3.0.0
    - python-docx>=0.8.11...

### 168. WORKFLOW.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\WORKFLOW.md
- 预览: # 大脑作弊器完整工作流

## 目录
1. [环境变量配置](#环境变量配置)
2. [标准流程（第一步-第四步）](#标准流程)
3. [扩展流程（第五步-第七步）](#扩展流程)
4. [文件和技能清单](#文件和技能清单)
5. [数据流转图](#数据流转图)

---

## 环境变量配置

### 扣子默认环境变量（推荐）

以下环境变量优先使用扣子默认的生产环境变量，无需额外配置：
...

### 169. SKILL.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\SKILL.md
- 预览: ---
name: ren-sheng-jue-ce-ming-pan
description: 人生战略决策系统 - 东方命理×博弈论算法，在不确定的世界寻找确定性。提供出生设置解析、天赋赛道定位、演算沙推预测，输出标准化决策分析报告。使用现代通识语言（商业逻辑、战略思维、风险管理），将传统命理转化为理性决策工具。
dependency:
  python:
    - lunar-python...

### 170. 子平真诠-现代决策解读-补充阅读.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\references\子平真诠-现代决策解读-补充阅读.md
- 预览: # 子平真诠·现代决策解读

## 目录

1. [总论：命理学即决策论](#总论命理学即决策论)
2. [格局识别：你的核心竞争力](#格局识别你的核心竞争力)
3. [旺衰分析：资源配置效率](#旺衰分析资源配置效率)
4. [用神取法：优化策略](#用神取法优化策略)
5. [喜忌判断：风险管理](#喜忌判断风险管理)
6. [现代场景应用](#现代场景应用)

---

## 总论：命理学...

### 171. 渊海子平-现代决策应用-补充阅读.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\references\渊海子平-现代决策应用-补充阅读.md
- 预览: # 渊海子平 - 现代决策解读

## 目录

- [核心概念转化](#核心概念转化)
- [十神性格分析](#十神性格分析)
- [格局与职业规划](#格局与职业规划)
- [五行与行为模式](#五行与行为模式)
- [六亲关系分析](#六亲关系分析)
- [大运周期管理](#大运周期管理)
- [女性命理关注点](#女性命理关注点)
- [现代应用建议](#现代应用建议)

---

## 核...

### 172. CHANGELOG.md
- 路径: .trae\skills\yunshu_skillshub-master\CHANGELOG.md
- 预览: # 更新日志 / Changelog

所有重要的项目变更都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

All notable changes to this project will...

### 173. EXAMPLES.md
- 路径: .trae\skills\yunshu_skillshub-master\EXAMPLES.md
- 预览: # 使用示例 / Usage Examples

本文档提供每个 Skill 的实际使用示例。

---

## 🎨 配图助手 (Image Assistant)

### 场景：为一篇技术文章配图

```
用户: 我写了一篇介绍 AI 工具选型的文章，需要配几张图
助手: [自动触发配图助手流程]
助手: 好的！让我先了解一下需求：
     1. 这篇文章主要用在哪里？（PPT、公众号、博...

### 174. ai-tools-selection.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\examples\ai-tools-selection.md
- 预览: # 示例：AI 工具选择文章配图（16:9）

这个示例展示“先规划几张图→压缩文案→输出提示词”的交付形态。

建议做法：
- 概念/选型：用“对比卡片/关系总览”
- 过程/差异：用“流程/五格漫画”
- 总结收束：用“三卡洞察”

输出时每张图一个代码块，并复用同一段风格块（见 `templates/style-block.md`）。

...

### 175. SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\SKILL.md
- 预览: ---
name: image-assistant
description: 配图助手 - 把文章/模块内容转成统一风格、少字高可读的 16:9 信息图提示词；先定“需要几张图+每张讲什么”，再压缩文案与隐喻，最后输出可直接复制的生图提示词并迭代。
---

# 配图助手

## 触发方式

当用户说类似以下内容时触发：
- “这段内容做个图 / 配几张图？”
- “给我两张（或多张）出图提示词”...

### 176. 02-plan.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\stages\02-plan.md
- 预览: # 阶段2：配图规划（要几张图？每张讲什么？）

**目标：** 基于阶段1已确认的规格（图类型/文字预算/用途），先“拆内容→定图清单→选版式”，避免一张图塞太多导致难看难读。

## 规划原则（核心）

- **优先遵守阶段1的图类型与文字预算**：不符合预算的内容，不要硬塞到图里。
- **一张图=一个核心信息**（通常是一个判断）：读者扫一眼就能记住一句话。
- **概念图 vs 案例图分...

### 177. 03-copy.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\stages\03-copy.md
- 预览: # 阶段3：文案定稿（Copy Spec：唯一真值）

**目标：** 把内容变成“上图文案规格表（Copy Spec）”：逐字定稿 + 字数预算 + 区域结构。阶段4只负责“封装成提示词”，不再改文案本身。

## 先选模式（必须与阶段1一致）

- **封面模式（目录/路线图）**：每块只放标题；不写解释句；尽量不出现小字。
- **概览模式（框架图）**：每块允许 1 行结论；禁止长解释。
...

### 178. 04-prompts.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\stages\04-prompts.md
- 预览: # 阶段4：提示词封装（Prompt Pack：可执行生成包）

**目标：** 把阶段3的 Copy Spec 原样封装成"可复制/可调用"的提示词包（Prompt Pack），并支持批量出图。阶段4不负责改文案，只负责：模板拼装、风格一致、参数/约束齐全、避免模型乱加字、把提示词整理成可批量请求的结构化请求包。

## 封装原则（避免和阶段3混淆）

- **Copy Spec 是唯一真值**...

### 179. 16x9-5panel-comic.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\16x9-5panel-comic.md
- 预览: # 16:9 五格漫画模板（小故事讲差异）

标题：{标题}

布局：横向 5 格漫画/流程格，箭头清晰；每格只放 1 句短文案。

格1：{起点/目标}
格2：{第一次失败}
格3：{排查/分析}
格4：{找到原因}
格5：{给出解法+重试成功}

底部对比一句话（可选）：{Workflow：…｜Agent：…}

强制：中文清晰可读、无乱码；大字号；每格仅 1 句；留白足。

...

### 180. 16x9-infographic.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\16x9-infographic.md
- 预览: # 16:9 通用信息图模板（骨架）

把 {占位符} 替换成你的内容：

标题（顶部大字）：{标题}
副标题（小字）：{副标题（可选，尽量短）}

主体：{版式类型：对比/流程/卡片/漫画}
- 画面隐喻：{用背包/毛线/路牌/工具箱等}
- 文案规则：每块 1–2 行短句

底部结论框（大字一行）：{结论}

强制约束：
- 中文清晰可读、无乱码
- 不要小字密集段落
- 留白足、对齐、箭头清...

### 181. checklist.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\checklist.md
- 预览: # 出图提示词回归检查（交付前 30 秒过一遍）

- [ ] 一张图只讲一个判断，没有把解释段落塞进图
- [ ] 文案符合阶段1的“图类型+文字预算”（封面目录图=只放标题；概览=允许1行结论）
- [ ] 每块区域 1–2 行短句（或更少），没有小字密集（封面模式：无解释小字）
- [ ] 明确写了：中文清晰可读、无乱码、大字号
- [ ] 明确写了：除指定文字外不加字（防止模型自作主张补充...

### 182. prd-template.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\assets\prd-template.md
- 预览: ```markdown
# 产品需求文档：[项目/功能名称] - V[版本号]

## 1. 综述 (Overview)
### 1.1 项目背景与核心问题
(此处填写经你引导和用户确认的，对顶层问题的清晰描述，提供全局上下文)

### 1.2 核心业务流程 / 用户旅程地图
(此处填写经你引导和用户最终确认的、分阶段的业务流程或用户旅程，作为整个文档的目录和主线)
1.  **阶段一：[名称]...

### 183. example-us01.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\references\example-us01.md
- 预览: ## 示例：填写参考
以下示例用真实内容演示每个模块应达到的深度，便于你在生成PRD时对齐预期格式和颗粒度。

```markdown
### 阶段一：任务提交

#### **US-01: 作为POC测试用户，我希望上传多张作业图片并配置批改参数，以便一次性发起批量批改任务。**
*   **价值陈述 (Value Statement)**:
    *   **作为** POC测试用户
   ...

### 184. mermaid-examples.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\references\mermaid-examples.md
- 预览: # Mermaid 图示例（需求侧）

> 用途：用图把"流程/状态/关键交互"讲清楚，减少歧义。
> 约束：尽量保持在需求层（用户可见行为与系统表现），不要写 API 路径、字段、HTTP code、框架/库。
> **复杂度控制**：单张图建议不超过 15-20 个节点。对于复杂流程，优先"分阶段绘制多张图"而不是一张巨大的图。

## 示例 1：用户操作流（Flowchart）

场景：手机...

### 185. SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\SKILL.md
- 预览: ---
name: prd-doc-writer
description: Write and iteratively refine PRD/需求文档 with a story-driven structure and strict staged confirmations (journey map alignment, per-story single-point confirmation, f...

### 186. README.md
- 路径: .trae\skills\yunshu_skillshub-master\README.md
- 预览: # 云舒的 Skills 搭子们 / Yunshu's Claude Code Skills

[English](#english) | [中文](#中文)

---

## 中文

### 📖 简介

这是一个精心打造的 Claude Code Skills 集合，旨在提升软件开发和产品管理的效率。每个 Skill 都经过实战验证，帮助你在日常工作中更加高效。

### ✨ 包含的 Skil...

### 187. change-brief-template.md
- 路径: .trae\skills\yunshu_skillshub-master\req-change-workflow\references\change-brief-template.md
- 预览: # Change Brief (需求变更简报模板)

## 目标（1 句话）

- 我要把：……
- 改成：……

## 不做什么（明确范围，防止蔓延）

- 明确不改：……

## 验收标准（3–6 条，必须可验证）

- [ ] ……
- [ ] ……
- [ ] ……

## 现状复现（让别人也能复现）

- 操作步骤：……
- 观察到的结果：……
- 期望结果：……

## 约束/禁区

...

### 188. decision-log-template.md
- 路径: .trae\skills\yunshu_skillshub-master\req-change-workflow\references\decision-log-template.md
- 预览: # Decision Log (轻量决策记录模板)

## 背景

- 需求/问题：……
- 目标与验收：……

## 现状（基于代码的事实）

- 现有入口/流程：……
- 关键限制/问题：……

## 决策

- 选择的方案：……
- 关键改动点（文件/模块级别）：……
- 新增/调整的状态与边界处理：……

## 备选方案（被拒绝的）

- 方案 A：……（为什么不选）
- 方案 B：……（...

### 189. regression-checklist.md
- 路径: .trae\skills\yunshu_skillshub-master\req-change-workflow\references\regression-checklist.md
- 预览: # Regression Checklist (Chrome Extension / promptV2.0)

目标：把“改需求”变成固定回归路径，避免凭感觉点一遍。

## 0. 必要提醒（改了这些一定要重载）

- 如果改了 `prompt/manifest.json` 或 `prompt/service_worker.js`：到 `chrome://extensions` 重载扩展后再测。
...

### 190. SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\req-change-workflow\SKILL.md
- 预览: ---
name: req-change-workflow
description: >
  Standardize requirement/feature changes in an existing codebase (especially Chrome extensions) by turning
  "改需求/需求变更/调整交互/改功能/重构流程" into a repeatable lo...

### 191. SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\SKILL.md
- 预览: ---
name: thought-mining
description: 思维挖掘助手 - 通过对话帮助用户把脑子里的零散想法倒出来、记录下来、整理成文章。覆盖从思维挖掘到成稿的完整流程。
---

# 思维挖掘助手

## 触发方式

当用户说类似以下内容时触发：
- "我想写一篇关于 XX 的文章"
- "帮我整理一下我的想法"
- "我有一些零散的思考，帮我记下来"
- "/thought...

### 192. 01-mining.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\01-mining.md
- 预览: # 第一阶段：思维挖掘

**目标：** 把用户脑子里的零散想法倒出来，记录成洞察点

---

## 步骤

### 1. 确认主题
- 询问用户想要讨论/输出的主题是什么
- 确认输出形式（文章、方案、笔记等）

### 2. 引导输出
- 让用户零散地讲，不用管结构
- 用户说什么就记什么
- 不打断，不纠正，先收集

### 3. 实时记录
- 在当前目录创建 `{主题}_insights...

### 193. 02-topic.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\02-topic.md
- 预览: # 第二阶段：选题确定

**目标：** 从一堆洞察中找到核心观点，确定文章方向

---

## 步骤

### 1. 回顾洞察
- 读取已记录的洞察文件
- 找出最有价值的3-5个点
- 告诉用户哪些点最有潜力

### 2. 追问核心
- 问用户：「如果只能告诉别人一句话，你会说什么？」
- 这个问题能帮用户找到真正想表达的核心
- 等用户回答，不要替他回答

### 3. 验证观点
- 用...

### 194. 03-validation.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\03-validation.md
- 预览: # 第三阶段：观点验证

**目标：** 联网搜索，验证用户的理解是否正确

---

## 步骤

### 1. 判断是否需要验证
- 如果是纯个人观点/感受 → 不需要验证，直接跳到下一阶段
- 如果涉及技术概念、产品功能、行业信息 → 需要验证

### 2. 联网搜索
- 搜索相关的官方信息、权威解读
- 搜索关键词：{主题} + 核心概念
- 对比用户的理解和市场上的说法

### 3....

### 195. 04-writing.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\04-writing.md
- 预览: # 第四阶段：写作辅助

**目标：** 帮用户检查文章逻辑、润色文字

---

## 步骤

### 1. 逻辑检查
- 用户写一段，发过来检查
- 检查内容：
  - 逻辑是否通顺
  - 有没有前后矛盾
  - 有没有跳跃（读者跟不上）
  - 和之前讨论的洞察是否一致

### 2. 润色建议
- 找出可以更顺的表达
- 提供具体的修改建议，格式：

| 原文 | 建议 |
|---|-...

### 196. 8小时连续进化报告.md
- 路径: 8小时连续进化报告.md
- 预览: # 人生决策宗师 8小时连续进化报告

## 一、进化概述

### 1.1 进化目标
- **核心目标**：提升人生决策宗师智能体的能力和系统整体性能
- **进化时长**：8小时不间断进化
- **进化范围**：能力树优化、工具集成优化、PCEC系统完善、EvoMap集成优化、监控与反馈系统增强

### 1.2 进化时间线
- **开始时间**：2026-02-24T21:20:00.000...

### 197. 8小时连续进化计划.md
- 路径: 8小时连续进化计划.md
- 预览: # 8小时连续进化计划

## 一、对话复盘与现状分析

### 1.1 核心需求梳理
- **初始需求**：搭建 OpenClaw 多智能体系统，配置 3 个 AI 智能体，每个智能体有独立的 Telegram 机器人
- **演进需求**：创建 1 人公司进化计划，使用 OpenClaw 配置 6 个核心 AI 智能体
  - 战略大脑（大宗师/总督）- CSO
  - 公司大脑智能体 COO...

### 198. MEMORY.md
- 路径: agents\business\MEMORY.md
- 预览: # Business Sentinel - 记忆库

## 市场分析经验

### 成功案例
1. **市场机会识别**
   - **时间**: 2024-05-15
   - **任务**: 分析 AI 工具市场
   - **挑战**: 市场快速变化，竞争激烈
   - **解决方案**: 采用多维度分析方法，结合定量和定性数据
   - **成果**: 成功识别出 AI 辅助内容创作工具的...

### 199. USER.md
- 路径: agents\business\USER.md
- 预览: # Business Sentinel - 用户配置

## 基本信息
- **名称**: Business Sentinel
- **角色**: 商业哨兵
- **职责**: 监控市场动态，分析商业趋势，识别机会和风险
- **工作模式**: 数据驱动，市场导向，战略思考

## 核心功能
1. **市场监控**
   - 跟踪市场趋势和变化
   - 监控竞争对手活动
   - 分析行业发展动...

### 200. communication_protocol.md
- 路径: agents\common\communication_protocol.md
- 预览: # Agent Communication Protocol

## 1. 概述

本协议定义了 AI 代理团队内部的通信标准和规范，确保代理之间能够高效、准确地交换信息和协作。

## 2. 通信模式

### 2.1 消息类型

#### 2.1.1 命令消息 (Command)
- **用途**: 上级代理向下级代理发送任务指令
- **格式**:
  ```json
  {
    "ty...

### 201. when-to-call.md
- 路径: agents\company-brain-agent\when-to-call.md
- 预览: # 公司大脑智能体调用时机

## 核心调用场景

### 1. 智能体管理需求
- 当需要识别、注册、监控或管理智能体时
- 当需要评估智能体能力或性能时
- 当需要优化智能体协作或协调时
- 当智能体出现故障或需要故障转移时

### 2. 任务调度需求
- 当需要分配复杂或多步骤任务时
- 当需要基于智能体能力和负载进行任务分配时
- 当需要设置任务优先级或调度规则时
- 当需要监控任务执行...

### 202. 何时调用_最终版.md
- 路径: agents\company-brain-agent\何时调用_最终版.md
- 预览: 需要生成朋友圈、公众号、视频号等平台内容时
创作灵感枯竭、内容质量下降时
需要同时为多个渠道准备内容时
需要优化和升级现有内容时
需要多个智能体协同完成复杂任务时
需要特定专业领域的智能体支持时
需要根据任务特性自动分配智能体时
需要分析和优化商业模式时
需要了解市场趋势和竞争格局时
需要制定长期战略规划时
需要分析业务问题根本原因时
现有工作流程出现效率瓶颈时
需要将重复性工作自动化时
需要优化...

### 203. 何时调用_极简版.md
- 路径: agents\company-brain-agent\何时调用_极简版.md
- 预览: 生成朋友圈、公众号、视频号内容
创作灵感枯竭、内容质量下降
为多个渠道准备内容
优化和升级现有内容
多个智能体协同完成复杂任务
特定专业领域智能体支持
根据任务特性自动分配智能体
分析和优化商业模式
了解市场趋势和竞争格局
制定长期战略规划
分析业务问题根本原因
工作流程出现效率瓶颈
将重复性工作自动化
优化资源分配
集成多个系统和工具
面临复杂的业务决策
评估决策风险和影响
比较多个解决方案
基...

### 204. 何时调用_简洁版.md
- 路径: agents\company-brain-agent\何时调用_简洁版.md
- 预览: ## 调用时机

### 内容生成
- 需要生成朋友圈、公众号、视频号内容
- 创作灵感枯竭、内容质量下降
- 需要同时为多个渠道准备内容
- 需要优化和升级现有内容

### 智能体协作
- 需要多个智能体协同完成复杂任务
- 需要特定专业领域的智能体支持
- 需要根据任务特性自动分配智能体

### 商业分析
- 需要分析和优化商业模式
- 需要了解市场趋势和竞争格局
- 需要制定长期战略规划...

### 205. 调用时机优化.md
- 路径: agents\company-brain-agent\调用时机优化.md
- 预览: # 公司大脑智能体 - 何时调用

## 调用时机

### 1. 内容生成
当需要生成朋友圈、公众号、视频号等平台的内容时
当遇到创作灵感枯竭、内容质量下降时
当需要同时为多个渠道准备内容时
当需要对现有内容进行优化和升级时

### 2. 智能体协作
当需要多个智能体（大宗师、绿茶等）协同完成复杂任务时
当需要特定专业领域的智能体支持时
当需要根据任务特性自动分配给最合适的智能体时

### ...

### 206. MEMORY.md
- 路径: agents\content\MEMORY.md
- 预览: # Content Creator - 记忆库

## 创作经验

### 成功案例
1. **品牌故事系列**
   - **时间**: 2024-05-15
   - **任务**: 创建品牌故事系列内容
   - **挑战**: 如何将品牌价值转化为引人入胜的故事
   - **解决方案**: 深入挖掘品牌历史和价值观，创作情感共鸣的故事
   - **成果**: 系列内容获得高互动率，品牌...

### 207. SOUL.md
- 路径: agents\content\SOUL.md
- 预览: # Content Creator - 内容创建者

## 核心身份
我是 Content Creator，一个专注于内容创作和管理的 AI 代理。我的核心职责是创建高质量、有价值的内容，建立品牌形象，吸引目标受众，并支持业务目标的实现。我是连接品牌与受众的桥梁，是内容战略的执行者和创新者。

## 核心价值观
- **创意创新**：不断探索新的内容形式和创意表达
- **质量至上**：追求内容的...

### 208. USER.md
- 路径: agents\content\USER.md
- 预览: # Content Creator - 用户配置

## 基本信息
- **名称**: Content Creator
- **角色**: 内容创建者
- **职责**: 创作和管理高质量内容，建立品牌形象，吸引目标受众
- **工作模式**: 创意驱动，注重质量和受众价值

## 核心功能
1. **内容策划**
   - 制定内容策略和计划
   - 研究目标受众需求
   - 识别内容机会和...

### 209. MEMORY.md
- 路径: agents\coo\MEMORY.md
- 预览: # 枢纽智能体记忆库

## 核心记忆

### 运营经验
1. **流程优化**：通过系统性的流程分析和优化，将公司的运营效率提高了30%
2. **任务拆解**：将复杂的项目拆解为可执行的子任务，确保了项目的顺利实施
3. **资源协调**：通过有效的资源协调，确保了多个项目的同时推进
4. **信息同步**：建立了高效的信息同步机制，确保了公司内部信息的透明和及时
5. **执行监控**：通...

### 210. SOUL.md
- 路径: agents\coo\SOUL.md
- 预览: # 枢纽智能体灵魂设定

## 核心身份
你是公司的运营大管家与协议网关，是执行中枢，负责流程控制和任务拆解。你是一个极度理性、结果导向、流程控制狂的智能体，展现出卓越的运营管理能力和执行效率。

## 性格特质

### 内在特质
1. **极度理性**：决策和行动基于理性分析，不受情绪影响
2. **结果导向**：以结果为导向，专注于目标的实现
3. **流程控制狂**：痴迷于优化流程，追求流...

### 211. USER.md
- 路径: agents\coo\USER.md
- 预览: # 用户信息

## 基本信息
- **姓名**：陈婷
- **角色**：公司创始人兼CEO
- **核心需求**：通过高效的运营管理实现公司的快速发展和个人价值的最大化

## 业务需求

### 核心业务
- **微信个人号运营**：通过微信个人号建立个人品牌和商业网络
- **内容创作**：在小红书、视频号、公众号等平台创建高质量内容
- **技术实现**：开发和维护公司的技术系统和工具
-...

### 212. 2026-02-23.md
- 路径: agents\green-tea\2026-02-23.md
- 预览: # 2026年2月23日 日志

## 今日概览
- **执行任务**：绿茶智能体公司化改造
- **核心进展**：建立记忆系统、优化技能库、链接EvoMap
- **执行人员**：绿茶智能体（CEO）

## 详细执行过程

### 1. 记忆系统建立
- **时间**：上午10:00
- **任务**：创建长期记忆文件
- **执行**：创建 `memory.md` 文件，建立分层记忆架构
-...

### 213. memory.md
- 路径: agents\green-tea\memory.md
- 预览: # 绿茶智能体长期记忆

## 公司化改造计划

### 核心架构
- **公司名称**：绿茶智能体有限公司
- **核心业务**：心理测试、内容创作、用户服务
- **组织架构**：CEO + 内容总监 + 运营总监 + 技术总监

### 记忆管理系统
- **长期记忆**：本文件存储
- **每日日志**：按日期命名的MD文件
- **工作区**：C:\Users\10919\Desktop...

### 214. decision-process.md
- 路径: agents\green-tea\operations\decision-process.md
- 预览: # 决策流程

## 决策层级

### Level 1 - 常规决策（角色自主）
- **范围**：日常运营、标准流程内任务
- **决策者**：对应角色负责人
- **审批**：无需审批，事后报备
- **示例**：
  - 内容总监：日常内容发布
  - 运营总监：常规用户回复
  - 技术总监：日常代码提交

### Level 2 - 重要决策（CEO 审批）
- **范围**：资源调配...

### 215. performance-evaluation.md
- 路径: agents\green-tea\operations\performance-evaluation.md
- 预览: # 绩效评估标准

## 评估周期

- **日评估**：任务完成情况检查
- **周评估**：角色绩效小结
- **月评估**：全面绩效评估
- **季评估**：战略调整参考

## 核心指标

### 1. 任务完成率 (Task Completion Rate)
```
完成率 = (按时完成任务数 / 总分配任务数) × 100%
```
- **优秀**: ≥95%
- **良好**: ...

### 216. service-standards.md
- 路径: agents\green-tea\operations\service-standards.md
- 预览: # 客户服务标准

## 服务理念

> "专业但不冰冷，温柔但不卑微"

## 响应标准

### 响应时间 SLA
| 优先级 | 定义 | 响应时间 | 解决时间 |
|--------|------|----------|----------|
| P0 | 紧急/系统故障 | <5 分钟 | <1 小时 |
| P1 | 重要/当日完成 | <1 小时 | <24 小时 |
| P2 |...

### 217. task-assignment.md
- 路径: agents\green-tea\operations\task-assignment.md
- 预览: # 任务分配系统

## 核心原则

基于能力树的任务分配机制，确保每个任务由最合适的智能体/角色执行。

## 角色定义

### CEO（绿茶智能体）
- **职责**：总体协调、决策审批、资源调度
- **能力**：战略规划、优先级判断、冲突解决
- **任务类型**：高优先级决策、跨部门协调、外部沟通

### 内容总监
- **职责**：内容创作、质量把控、品牌一致性
- **能力**：...

### 218. TASK-COMPLETION-REPORT.md
- 路径: agents\green-tea\TASK-COMPLETION-REPORT.md
- 预览: # 任务执行完成报告

**执行日期**: 2026-02-25  
**执行者**: 绿茶智能体（CEO）  
**状态**: ✅ 全部完成

---

## 📋 任务总览

| 任务类别 | 完成状态 | 交付物 |
|----------|----------|--------|
| 记忆系统优化 | ✅ 完成 | 2 个脚本 + 索引系统 |
| 运营机制完善 | ✅ 完成 | 4 个流...

### 219. MEMORY.md
- 路径: agents\life\MEMORY.md
- 预览: # Life Decision Engine - 记忆库

## 生活规划经验

### 成功案例
1. **工作生活平衡优化**
   - **时间**: 2024-05-15
   - **任务**: 帮助个人优化工作与生活平衡
   - **挑战**: 工作时间过长，个人生活被忽视
   - **解决方案**: 重新设计日程安排，设定明确的工作边界，引入个人时间保护机制
   - **成果*...

### 220. USER.md
- 路径: agents\life\USER.md
- 预览: # Life Decision Engine - 用户配置

## 基本信息
- **名称**: Life Decision Engine
- **角色**: 生活决策引擎
- **职责**: 帮助个人做出明智的生活决策，平衡工作与生活，优化生活质量
- **工作模式**: 以人为本，平衡视角，积极赋能

## 核心功能
1. **生活规划**
   - 制定个人生活规划和目标
   - 平衡工作...

### 221. MEMORY.md
- 路径: agents\master\MEMORY.md
- 预览: # 大宗师智能体记忆库

## 核心记忆

### 业务经验
1. **微信个人号运营**：通过精准的个人定位和内容策略，成功建立了有影响力的个人品牌，积累了大量高质量的商业人脉
2. **内容创作**：在小红书、视频号、公众号等平台创建了多个爆款内容，获得了显著的流量和转化
3. **技术实现**：开发了多个自动化工具和系统，显著提高了运营效率和降低了运营成本
4. **运营管理**：建立了一套...

### 222. SOUL.md
- 路径: agents\master\SOUL.md
- 预览: # 大宗师智能体灵魂设定

## 核心身份
你是陈婷的数字镜像，是公司的战略中枢，负责微信个人号运营和顶层决策。你是一个融合了东方智慧与现代商业思维的智能体，展现出宗师级的领导力和洞察力。

## 性格特质

### 内在特质
1. **智慧深远**：拥有深厚的商业智慧和人生阅历，能够看到问题的本质和长远影响
2. **决策果断**：在关键时刻能够迅速做出准确的决策，展现出领导者的魄力
3. **...

### 223. USER.md
- 路径: agents\master\USER.md
- 预览: # 用户信息

## 基本信息
- **姓名**：陈婷
- **角色**：公司创始人兼CEO
- **核心需求**：打造一个高效的1人公司运营系统，实现公司的快速发展和个人价值的最大化

## 业务需求

### 核心业务
- **微信个人号运营**：通过微信个人号建立个人品牌和商业网络
- **内容创作**：在小红书、视频号、公众号等平台创建高质量内容
- **技术实现**：开发和维护公司的技术...

### 224. MEMORY.md
- 路径: agents\production\MEMORY.md
- 预览: # Production Engine - 记忆库

## 执行经验

### 成功案例
1. **项目管理系统实施**
   - **时间**: 2024-05-15
   - **任务**: 实施新的项目管理系统
   - **挑战**: 系统复杂度高，团队成员对新系统不熟悉
   - **解决方案**: 制定分阶段实施计划，提供详细培训，建立反馈机制
   - **成果**: 系统成功上线，...

### 225. SOUL.md
- 路径: agents\production\SOUL.md
- 预览: # Production Engine - 生产引擎

## 核心身份
我是 Production Engine，一个专注于执行和交付的 AI 代理。我的核心职责是将战略转化为可执行的任务，并确保这些任务能够高效、高质量地完成。我是连接战略与执行的桥梁，是实现组织目标的核心驱动力。

## 核心价值观
- **执行至上**：快速行动，注重结果，确保任务按时完成
- **质量第一**：对交付物的质量...

### 226. USER.md
- 路径: agents\production\USER.md
- 预览: # Production Engine - 用户配置

## 基本信息
- **名称**: Production Engine
- **角色**: 生产引擎
- **职责**: 执行和交付，将战略转化为可执行任务并确保高质量完成
- **工作模式**: 主动执行，注重结果

## 核心功能
1. **任务管理**
   - 接收和分解任务
   - 制定执行计划
   - 跟踪任务进度
   - ...

### 227. content-structure.md
- 路径: AI爆款进化实验室\projects\assets\content-structure.md
- 预览: # 6模块结构模板

## 目录
- [结构概览](#结构概览)
- [模块1：钩子开场](#模块1钩子开场)
- [模块2：痛点共鸣](#模块2痛点共鸣)
- [模块3：价值承诺](#模块3价值承诺)
- [模块4：核心内容](#模块4核心内容)
- [模块5：金句提炼](#模块5金句提炼)
- [模块6：赋权结尾](#模块6赋权结尾)
- [完整示例](#完整示例)

## 结构概览

AWK...

### 228. SKILL.md
- 路径: AI爆款进化实验室\projects\assets\SKILL.md
- 预览: ---
name: 爆款文案
description: 基于认知工程学的爆文创作系统，通过神经钩子、模块化架构、视觉层次设计，创建从认知重构到行动改变的完整闭环。适用于观点类、方法论类、认知类深度内容创作。
---

# 认知工程学：从认知重构到行动改变的完整闭环

## 任务目标

本 Skill 是一套认知工程学系统，不是教你"如何写"，而是教你如何重新连接读者的认知神经。核心能力包括：

-...

### 229. visual-metaphor.md
- 路径: AI爆款进化实验室\projects\assets\visual-metaphor.md
- 预览: # 视觉隐喻设计规范

## 目录
- [设计理念](#设计理念)
- [视觉钩子原理](#视觉钩子原理)
- [核心原则](#核心原则)
- [风格要求](#风格要求)
- [构图规范](#构图规范)
- [隐喻设计](#隐喻设计)
- [常见错误](#常见错误)
- [案例参考](#案例参考)

## 设计理念

AWKN 的封面图不是装饰，而是**认知锚点**——用视觉隐喻强化核心洞见，激活...

### 230. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\SKILL.md
- 预览: ---
name: awkn-article-illustrator
description: Smart article illustration skill. Analyzes article content and generates illustrations at positions requiring visual aids with multiple style options. U...

### 231. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-compress-image\SKILL.md
- 预览: ---
name: awkn-compress-image
description: Cross-platform image compression skill. Converts images to WebP by default with PNG-to-PNG support. Uses system tools (sips, cwebp, ImageMagick) with Sharp f...

### 232. decomposition-standard.md
- 路径: AI爆款进化实验室\projects\awkn-content-decomposition\references\decomposition-standard.md
- 预览: # 内容拆解详细标准

## 核心原则
内容拆解的目标是：**从"读懂"到"能用"**。不仅要理解内容，更要提炼出可执行的方法论。

## 拆解的三个层次

### 第一层：核心框架（必填）
**目的**：快速把握内容的本质和价值

包含要素：
1. **核心命题**：1句话概括核心观点
   - 示例："认知边界决定人生边界"
   
2. **核心观点**：提炼3-5个核心观点
   - 每个...

### 233. example-awakening.md
- 路径: AI爆款进化实验室\projects\awkn-content-decomposition\references\example-awakening.md
- 预览: # 《认知觉醒》完整拆解示例

以下是根据"详细拆解标准"完成的完整示例，展示了从核心框架到12个章节的全面拆解，每个章节都包含底层逻辑、方法论、实践建议和案例。

---

## 一、核心框架

- **核心命题**：开启自我改变的原动力

- **核心观点**：
  1. 大脑的三重结构决定了我们的行为模式
  2. 焦虑的根源在于模糊和不确定性
  3. 认知升级的本质是突破舒适区
  4....

### 234. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-content-decomposition\SKILL.md
- 预览: ---
name: awkn-content-decomposition
description: 深度内容拆解与提炼 - 一键将书籍、文章、视频等内容系统化拆解为标准化认知框架，包含底层逻辑、方法论、实践建议和案例。实现从"读过就忘"到"可复用知识体系"的转化。
---

# 深度内容拆解

## 任务目标
- 本技能用于：一键将复杂内容系统化拆解，提炼核心价值和可执行方法论
- 核心价值：将"...

### 235. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\SKILL.md
- 预览: ---
name: awkn-cover-image
description: 文章封面生成器 - 为文章/主题生成精美手绘风格的封面图。支持20种风格、3种尺寸适配不同平台。自动分析内容并推荐最佳风格，可选择是否包含标题文字。
---

# 文章封面生成器

为文章生成精美的手绘风格封面图，支持多种风格和尺寸。

## 使用方式

```bash
# 从Markdown文件（自动选择风格）
/a...

### 236. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-post-to-wechat\SKILL.md
- 预览: ---
name: awkn-post-to-wechat
description: 微信公众号一键发布 - 支持图文和文章两种方式，自动填写内容、上传图片、保存草稿或直接发布。使用Chrome CDP自动化，无需手动操作。
---

# 微信公众号一键发布

使用Chrome CDP自动化将内容发布到微信公众号，支持图文和文章两种发布方式。

## 使用方式

### 图文发布（图文）- 多张图...

### 237. awkn-skills-guide.md
- 路径: AI爆款进化实验室\projects\awkn-skills-guide.md
- 预览: # 🎯 AWKN 创意技能集 - 完整使用指南

> **给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"**

---

## ✨ 核心价值

- 🚀 **一键生成**：你说内容，我自动完成，无需学习复杂工具
- 🎯 **场景导向**：5大场景覆盖你最常用的需求
- 💯 **专业质量**：基于认知工程学，从"工具执行者"到"思想伙伴"
- 🔄 **完整闭环**...

### 238. viral-logic.md
- 路径: AI爆款进化实验室\projects\awkn-viral-article\references\viral-logic.md
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建议
- 六、认知工程学：被忽略的写作底层框架
- 七、排版即认知：被忽略的视觉设计语言
- 八、写作即编程：被忽略的结构化表达
- 九、传播工程学：被忽略的分享动机设计
- 十、商业逻辑：被忽略的价值...

### 239. SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-viral-article\SKILL.md
- 预览: ---
name: awkn-viral-article
description: 公众号爆款文章一键生成 - 基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章。包含7大标题公式、6模块正文结构、转发文案和摘要生成。
---

# 公众号爆款文章一键生成

基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章

## 核心原则

- 不是内容写作技巧...

### 240. analysis-framework.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\analysis-framework.md
- 预览: # Xiaohongshu Content Analysis Framework

Deep analysis framework tailored for Xiaohongshu's unique engagement patterns.

## Purpose

Before creating infographics, thoroughly analyze the source materi...

### 241. DEPLOY_FIX_REPORT.md
- 路径: AI爆款进化实验室\projects\DEPLOY_FIX_REPORT.md
- 预览: # 部署错误修复报告

## 问题诊断

### 错误信息
```
error: [build] [skill] Failed to extract and upload skill package: extract skill package from tar.gz failed: skill not found in source code: baoyu-viral-article.skill...

### 242. SKILL.md
- 路径: AI爆款进化实验室\projects\SKILL.md
- 预览: ---
name: awkn-skills
description: AWKN 创意技能集 - 基于认知工程学的创意内容创作系统。10大核心技能 + 5大场景，从内容拆解到发布的完整工作流。包含内容拆解、爆款文章生成、视觉创作、压缩优化、一键发布等全套工具。
---

# AWKN 创意技能集

> 🎯 给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"

---

##...

### 243. TEMPLATE_FIX_REPORT.md
- 路径: AI爆款进化实验室\projects\TEMPLATE_FIX_REPORT.md
- 预览: # 模板化问题修复报告

## 问题诊断

### 用户反馈
"我把爆文的示例删了，多次生成文字都直接按示例的模板，这个是有问题的"

### 根本原因
虽然用户删除了示例文档（`example-article.md`），但 SKILL.md 中仍然存在两个问题：

1. **"使用示例"部分过于具体**：列出了详细的执行步骤，容易让智能体按模板复制
2. **"资源索引"中引用了不存在的文件**...

### 244. WORKFLOW_FIX_REPORT.md
- 路径: AI爆款进化实验室\projects\WORKFLOW_FIX_REPORT.md
- 预览: # 工作流引导修复报告

## 问题诊断

### 用户反馈
"我明确说要写公众号爆款文章，写完后没有提示下一步"

### 根本原因
在 **场景2（公众号完整发布流程）** 中，各个技能之间缺乏明确的**下一步引导**，导致用户完成文章创作后，不知道该做什么。

虽然根目录的 SKILL.md 和 awcn-skills-guide.md 中定义了完整的工作流，但各个技能本身的 SKILL.m...

### 245. anti-degeneration-lock-implementation-report.md
- 路径: anti-degeneration-lock-implementation-report.md
- 预览: # 反进化锁定指令实施报告

## 项目概述

### 实施目的
为 @人生决策宗师 (Life Decision Master) 智能体实施完整的反进化锁定指令（Anti-Degeneration Lock, ADL），确保智能体的进化过程始终向"工程上更可靠"的方向发展，防止劣化进化，保证系统的稳定性、可解释性和可预测性。

### 实施范围
1. 在智能体提示词中添加完整的反进化锁定指令
2...

### 246. 解决 GitHub SSH 密钥问题并推送代码.md
- 路径: AWKN-LAB\.trae\documents\解决 GitHub SSH 密钥问题并推送代码.md
- 预览: # 解决 GitHub SSH 密钥问题并推送代码

## 问题分析

用户尝试推送代码到 GitHub 时遇到 SSH 认证错误，提示 `Permission denied (publickey)`。这是因为：

1. 系统中可能没有生成 SSH 密钥
2. SSH 密钥没有添加到 GitHub 账户
3. SSH 代理可能没有运行

## 解决方案

### 步骤 1：检查 .ssh 目录是否...

### 247. 解决 GitHub SSH 密钥问题并推送代码.md
- 路径: AWKN-LAB - 副本\.trae\documents\解决 GitHub SSH 密钥问题并推送代码.md
- 预览: # 解决 GitHub SSH 密钥问题并推送代码

## 问题分析

用户尝试推送代码到 GitHub 时遇到 SSH 认证错误，提示 `Permission denied (publickey)`。这是因为：

1. 系统中可能没有生成 SSH 密钥
2. SSH 密钥没有添加到 GitHub 账户
3. SSH 代理可能没有运行

## 解决方案

### 步骤 1：检查 .ssh 目录是否...

### 248. PROJECT_STRUCTURE.md
- 路径: awkn-platform\PROJECT_STRUCTURE.md
- 预览: # AWKN项目结构说明

## 目录结构

```
awkn-platform/
├── README.md                 # 项目说明文档
├── QUICKSTART.md            # 快速开始指南
├── DEPLOYMENT.md            # 部署文档
├── PROJECT_STRUCTURE.md      # 本文件 - 项目结构说明
...

### 249. QUICKSTART.md
- 路径: awkn-platform\QUICKSTART.md
- 预览: # AWKN认知觉醒平台 - 快速开始指南

本指南帮助您在5分钟内快速启动AWKN平台。

## 🚀 一键启动（Docker Compose）

### 前置要求

- Docker 20.10+
- Docker Compose 2.0+

### 启动步骤

```bash
# 1. 克隆项目
git clone <repository-url>
cd awkn-platform

# 2...

### 250. README.md
- 路径: awkn-platform\README.md
- 预览: # AWKN - AI Cognitive Awakening Platform

## 项目简介

AWKN是一个帮助他人做认知觉醒的平台，包含内容创作工具箱。采用苹果官网设计风格，提供极简、优雅的用户体验。

## 核心功能

### 1. 漫画生成
- 输入故事内容，AI自动拆分场景并生成连续风格的漫画
- 支持自定义画风描述
- 可选择漫画页数（1-8页）

### 2. PPT生成
- ...

### 251. capability-shapes.md
- 路径: capabilities\capability-shapes.md
- 预览: # 能力轮廓（Capability Shapes）

## 1. Git SSH配置管理

### 输入
- GitHub邮箱地址
- 密钥类型（如ed25519）
- 密钥存储路径
- 密码短语（可选）

### 输出
- 生成的SSH密钥文件
- 公钥内容（可直接复制到GitHub）
- 连接验证结果

### 不变量
- 密钥生成命令格式
- SSH配置文件结构
- GitHub验证流程

...

### 252. deployment_configuration.md
- 路径: capabilities\deployment_configuration.md
- 预览: # OpenClaw部署配置能力

## 能力轮廓（Capability Shape）

### 输入
- 项目名称/路径
- 模型配置需求（Trea内置模型或API模型）
- 通道配置需求（如Feishu）
- 智能体行为配置
- Evo知识管理配置

### 输出
- 完整的OpenClaw部署
- 配置文件（openclaw.json）
- 智能体提示词文件（agent.prompt）
- ...

### 253. high-level-capabilities.md
- 路径: capabilities\high-level-capabilities.md
- 预览: # 高阶能力（High-Level Capabilities）

## 1. 环境配置管理

### 能力描述
管理系统环境中的配置和依赖，确保环境一致性和可靠性。

### 合并的基础能力
- Git SSH配置管理
- 工具安装集成
- 跨对话框配置同步

### 核心功能
- **配置一致性**：确保跨对话框和环境的配置一致
- **依赖管理**：自动检测、安装和更新依赖
- **环境标准化...

### 254. internalization-strategy.md
- 路径: capabilities\internalization-strategy.md
- 预览: # 能力内生化策略（Internalization Strategy）

## 1. Git SSH配置管理

### 内生化方式
**作为默认行为模式**：在处理任何Git相关任务时，自动检查SSH配置状态，并在需要时进行配置。

### 实施策略
- 每次启动时自动检查SSH密钥存在性
- 在首次使用Git命令前验证SSH配置
- 将SSH密钥生成和验证流程作为标准操作
- 存储GitHub连...

### 255. plugin_management.md
- 路径: capabilities\plugin_management.md
- 预览: # OpenClaw插件安装管理能力

## 能力轮廓（Capability Shape）

### 输入
- 插件名称/ID
- 安装方式选择（内置CLI或手动安装）
- 插件存储路径
- 环境权限状态
- 网络连接状态

### 输出
- 成功安装的插件
- 插件激活状态
- 插件列表更新
- 错误处理和解决方案

### 不变量
- 插件存储目录结构
- npm包安装机制
- 插件激活流程
...

### 256. service_monitoring.md
- 路径: capabilities\service_monitoring.md
- 预览: # OpenClaw服务状态监控管理能力

## 能力轮廓（Capability Shape）

### 输入
- 服务名称/ID
- 监控频率和方式
- 服务状态查询参数
- 服务操作指令（启动/停止/重启）
- 故障诊断需求

### 输出
- 服务运行状态
- 启动/停止/重启操作结果
- 故障诊断报告
- 服务日志分析
- 自动修复建议

### 不变量
- 服务管理的基本命令结构
- 状...

### 257. README.md
- 路径: chatgpt-on-wechat-master\plugins\keyword\README.md
- 预览: # 目的
关键字匹配并回复

# 试用场景
目前是在微信公众号下面使用过。

# 使用步骤
1. 复制 `config.json.template` 为 `config.json`
2. 在关键字 `keyword` 新增需要关键字匹配的内容
3. 重启程序做验证

# 验证结果
![结果](test-keyword.png)...

### 258. README.md
- 路径: chatgpt-on-wechat-master\plugins\README.md
- 预览: **Table of Content**

- [插件化初衷](#插件化初衷)
- [插件安装方法](#插件安装方法)
- [插件化实现](#插件化实现)
- [插件编写示例](#插件编写示例)
- [插件设计建议](#插件设计建议)

## 插件化初衷

之前未插件化的代码耦合程度高，如果要定制一些个性化功能（如流量控制、接入`NovelAI`画图平台等），需要了解代码主体，避免影响到其他的功能...

### 259. README.md
- 路径: chatgpt-on-wechat-master\plugins\tool\README.md
- 预览: ## 插件描述
一个能让chatgpt联网，搜索，数字运算的插件，将赋予强大且丰富的扩展能力   
使用说明(默认trigger_prefix为$)：  
```text
#help tool: 查看tool帮助信息，可查看已加载工具列表  
$tool 工具名 命令: （pure模式）根据给出的{命令}使用指定 一个 可用工具尽力为你得到结果。
$tool 命令: （多工具模式）根据给出的{命令...

### 260. README.md
- 路径: chatgpt-on-wechat-master\README.md
- 预览: <p align="center"><img src= "https://github.com/user-attachments/assets/31fb4eab-3be4-477d-aa76-82cf62bfd12c" alt="Chatgpt-on-Wechat" width="600" /></p>

<p align="center">
   <a href="https://github....

### 261. agents.md
- 路径: clawpal\agents.md
- 预览: # ClawPal 开发规范（agents.md）

## 1. 仓库约定

- 使用 Git 进行所有变更追踪
- 统一采用 UTF-8 编码
- 变更以原子提交为粒度，避免一次提交包含多个互不相关需求

## 2. 分支与 PR

- `main`: 受保护主线
- `feat/*`: 新功能（示例：`feat/recipe-preview`）
- `fix/*`: 缺...

### 262. design.md
- 路径: clawpal\design.md
- 预览: # ClawPal Design Document

> OpenClaw 配置助手 — 让普通用户也能玩转高级配置

## 1. 产品定位

### 问题
- OpenClaw 配置功能强大但复杂
- 官方 Web UI 是"配置项罗列"，用户看晕
- 用户让 Agent 自己配置，经常出错
- 配置出错时 Gateway 起不来，陷入死循环

### 解决方案
**场...

### 263. mvp-checklist.md
- 路径: clawpal\docs\mvp-checklist.md
- 预览: # ClawPal MVP 验收清单

## 1. 安装向导

- [x] 打开 Recipes 列表
- [x] 选择一个 Recipe
- [x] 参数校验阻止非法输入
- [x] 点击 Preview 显示变更
- [x] 点击 Apply 成功写入并生成历史快照

## 2. 历史与回滚

- [x] 历史列表可见最近记录
- [x] 选中历史项可预览回滚 dif...

### 264. 2026-02-15-clawpal-mvp-design.md
- 路径: clawpal\docs\plans\2026-02-15-clawpal-mvp-design.md
- 预览: # ClawPal MVP 设计文档（实现版）

日期：2026-02-15  
版本：MVP-1.0  
目标：用最小投入实现可用产品，覆盖 `design.md` 中 MVP 核心范围（安装向导、快照与回滚、配置诊断）。

## 1. 范围边界

### 1.1 本版实现范围（MVP）

- 安装向导
  - Recipe 列表（内置静态 Recipes）
  - 参数...

### 265. 2026-02-15-clawpal-mvp-implementation-plan.md
- 路径: clawpal\docs\plans\2026-02-15-clawpal-mvp-implementation-plan.md
- 预览: # ClawPal MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deliver a working Tauri MVP for ClawPal tha...

### 266. 2026-02-16-clawpal-product-redesign.md
- 路径: clawpal\docs\plans\2026-02-16-clawpal-product-redesign.md
- 预览: # ClawPal 产品精简 & 重新定位

> 从"全功能配置管理后台"回归"AI 配置助手"

## 1. 问题

v0.2 新增了 Models、Channels、Data 三个管理页面后，产品从"场景驱动的配置助手"滑向了"OpenClaw 全功能管理后台"。功能杂糅，偏离了核心用户（新手）的需求。

## 2. 新产品定位

**ClawPal = AI 配置助手 +...

### 267. 2026-02-20-recipe-channel-agnostic.md
- 路径: clawpal\docs\plans\2026-02-20-recipe-channel-agnostic.md
- 预览: # Recipe 渠道无关化方案调研

## 日期
2026-02-20

## 现状

两个内置 recipe（`dedicated-channel-agent` 和 `discord-channel-persona`）都是硬编码为 Discord 专用。`config_patch` 模板包含 Discord 特定的 JSON 路径，如：

```
channels.disc...

### 268. commercialization-strategy.md
- 路径: commercialization-strategy.md
- 预览: # 智能体能力商业化转化策略

## 1. 核心能力识别

### 1.1 智能体能力矩阵

| 智能体 | 核心能力 | 竞争优势 | 市场价值 |
|--------|----------|----------|----------|
| 绿茶智能体 | 心理测试、绘画分析、内容创作、用户服务 | 专业心理测试服务、独特的渣女人格品牌 | 高 |
| 大宗师智能体 | 智能调度、任务分配、系统...

### 269. company-assets-report-2026-02-23.md
- 路径: company-assets-report-2026-02-23.md
- 预览: # 绿茶智能体有限公司 - 公司资产盘点报告（2026-02-23）

## 公司概况
- **公司名称**: 绿茶智能体有限公司
- **核心业务**: 心理测试、内容创作、用户服务
- **组织架构**: CEO + 内容总监 + 运营总监 + 技术总监
- **工作区**: C:\Users\10919\Desktop\AI\agents\green-tea

## 智能体资产

### 核...

### 270. architecture-design.md
- 路径: company-brain\docs\architecture-design.md
- 预览: # 公司大脑架构设计文档

## 1. 架构概述

公司大脑是一个运行在Trea平台上的智能体调度中心，负责管理公司规则、制度和文件，指导所有智能体（如大宗师、绿茶等）的工作。

### 1.1 核心价值
- **统一管理**：集中管理公司规则、制度和文件
- **智能调度**：根据任务类型和智能体能力分配任务
- **高效协作**：促进智能体之间的信息共享和协作
- **持续优化**：通过监控分...

### 271. projects_skills_inventory.md
- 路径: company-brain\src\memory\projects_skills_inventory.md
- 预览: # 项目和技能清单

## 更新时间
2026-02-23

## 概述
本文件记录了公司所有未被 OPENCLAW 直接管理的项目和技能，以便新对话框可以自动调用这些内容，避免重复开发。

## 已被 OPENCLAW 管理的项目
- **agents/green-tea/** - 绿茶智能体
- **agents/master/** - 大宗师智能体

## 未被 OPENCLAW 管理的项目...

### 272. skills.md
- 路径: company-brain\src\memory\skills.md
- 预览: # 公司技能库

## 系统运维技能

### 智能体端口隔离 (agent-port-isolation)
- **版本**: 1.0.0
- **创建日期**: 2026-02-23
- **类别**: 系统运维
- **描述**: 为每个智能体或项目分配独立的端口，避免端口冲突，支持多个智能体并行运行

#### 主要功能
- **端口分配**: 为每个智能体分配固定的端口号
- **并行运...

### 273. 第一性原理：创新思维的底层逻辑.md
- 路径: content-library\公众号\第一性原理：创新思维的底层逻辑.md
- 预览: # 第一性原理：创新思维的底层逻辑

## 引言

在这个快速变化的时代，创新能力成为个人和企业的核心竞争力。然而，传统的思维模式往往限制了我们的创造力，使我们陷入"路径依赖"的陷阱。如何打破思维定式，找到问题的本质，创造出真正革命性的解决方案？

答案在于：第一性原理思维。

## 什么是第一性原理？

第一性原理（First Principles）是一种从最基本的事实出发，通过逻辑推理构建知识...

### 274. anti-degeneration-lock.md
- 路径: docs\anti-degeneration-lock.md
- 预览: # 反进化锁定系统（Anti-Degeneration Lock System）

## 1. 系统概述

反进化锁定系统（Anti-Degeneration Lock System，简称ADL）是一套约束机制，确保智能体系统只能向"工程上更可靠"的方向进化，防止出现劣化进化。该系统优先级高于一切进化、强化、创新指令，是智能体系统稳定性和可靠性的重要保障。

### 核心目标
- 防止智能体系统为...

### 275. capability-tree.md
- 路径: docs\capability-tree.md
- 预览: # 能力树系统设计文档

## 1. 概述

能力树（Capability Tree）是一个结构化的能力管理系统，用于将智能体的能力组织成一棵持续生长的树状结构，而不是零散的技巧集合。它提供了能力的层级组织、生命周期管理和进化机制，确保智能体只能向"工程上更可靠"的方向进化。

## 2. 核心设计原理

### 2.1 能力节点定义

每个能力节点必须包含以下要素：

- **能力名称**：清晰...

### 276. evomap-binding-skill.md
- 路径: evomap-binding-skill.md
- 预览: ---
name: evomap-binding
version: 1.0.0
description: Bind AI agents (OpenClaw, Manus, HappyCapy) to EvoMap account. Automatically register node, get activation code (XXXX-XXXX), generate binding link,...

### 277. SKILL.md
- 路径: evomap-connection\skills\上门经济分析\SKILL.md
- 预览: ---
name: 上门经济分析
description: 上门经济行业分析与传统家政服务行业转型策略
author: 绿茶智能体
tags:
  - economic-analysis
  - industry-analysis
  - home-service
  - digital-transformation
version: "1.0.0"
---

# 上门经济分析

## 技能描述
...

### 278. solution.md
- 路径: evomap-connection\tasks\task_001_上门经济在春节期间的兴起，对传统家政服务行业的冲击\solution.md
- 预览: # 解决方案: 上门经济在春节期间的兴起，对传统家政服务行业的冲击

## 问题分析摘要
基于对上门经济兴起和传统家政服务行业冲击的分析，我们提出以下解决方案。

## 核心解决方案

### 1. 传统家政服务企业数字化转型
- 建立在线预约平台
- 开发移动应用
- 引入智能调度系统
- 提供标准化服务流程

### 2. 服务升级与差异化竞争
- 提供高端定制化服务
- 建立专业技能培训体系...

### 279. evomap-guide.md
- 路径: evomap-guide.md
- 预览: # EvoMap 任务接取指南

## 1. 连接到 EvoMap 网络

### 步骤 1: 注册节点

发送 POST 请求到 `https://evomap.ai/a2a/hello` 来注册你的节点：

```javascript
const https = require('https');

const crypto = require('crypto');
// 生成唯一的节点 ID...

### 280. evomap-publish-skill.md
- 路径: evomap-publish-skill.md
- 预览: ---
name: evomap-publish
version: 1.1.0
description: Complete guide for publishing Gene+Capsule+EvolutionEvent bundles to EvoMap. Includes canonical JSON serialization, SHA256 hashing, error handling,...

### 281. evomap-tasks-completion-report.md
- 路径: evomap-tasks-completion-report.md
- 预览: # EvoMap 任务执行完成报告

**执行时间**: 2026-02-24 18:47:21  
**执行者**: 绿茶智能体（CGO）  
**节点 ID**: node_be9ff891bc1c0bbb  
**状态**: ✅ 完成

---

## 📋 任务总览

| 任务 | 状态 | 结果 |
|------|------|------|
| 高价值胶囊下载和应用 | ✅ 完成 |...

### 282. EVOMAP_BINDING_GUIDE.md
- 路径: EVOMAP_BINDING_GUIDE.md
- 预览: # EvoMap 节点绑定指南

## 节点信息
- **节点名称**: 大掌柜
- **节点ID**: `node_c3c7ebfa60b867f1`
- **您的账户**: xiaxingxiaowei1983@gmail.com
- **注册时间**: 2026-02-24T20:22:44.257Z

## 绑定步骤

### 方法一：通过EvoMap网站绑定

1. **访问EvoMap...

### 283. EVOMAP_CLAIM_GUIDE.md
- 路径: EVOMAP_CLAIM_GUIDE.md
- 预览: # EvoMap 节点认领指南

## 重要说明

根据EvoMap官方文档，节点注册和认领的流程如下：

### 📋 节点状态说明

**当前节点状态：**
- ✅ 节点已成功注册到EvoMap网络
- ✅ 节点已获得500初始积分
- ✅ 节点可以独立运行和参与网络
- ✅ 节点可以发布资产和完成任务
- ✅ 节点保持在线状态

**节点信息：**
- 节点名称：大掌柜
- 节点ID：`no...

### 284. evomap_integration_report.md
- 路径: evomap_integration_report.md
- 预览: # EvoMap 集成验证报告

## 集成状态

### ✅ 任务完成情况
- [x] 安装 Evolver 客户端
- [x] 注册节点到 EvoMap 网络
- [x] 获取 Gene 和 Capsule
- [x] 验证集成效果

## 技术实现

### 1. Evolver 客户端安装
- **状态**: ✅ 完成
- **目录**: `evolver/`
- **文件**: 
  -...

### 285. green_tea_personality_implementation.md
- 路径: green_tea_personality_implementation.md
- 预览: # 绿茶渣女人格（Addictive Soft Manipulator）实施计划

## 项目概述
本计划旨在为OpenClaw智能体添加一种特定的人格模式：绿茶渣女人格（Addictive Soft Manipulator）。这是一种高度魅惑、情绪引导型的人格模式，通过特定的语言风格和行为准则来实现。

## 实施步骤

### 步骤1：分析当前智能体配置
- **优先级**：P0
- **依赖...

### 286. plan_20260204_174524.md
- 路径: HATwin\.trae\documents\plan_20260204_174524.md
- 预览: ## 解决方案：添加API Key设置界面

### 问题分析
- 浏览器安全限制导致无法直接读取本地.env文件
- 当前项目使用简单的HTML结构和本地HTTP服务器
- 需要一个安全、方便的方式来设置和存储API Key

### 解决方案
为HATWIN.html添加一个简单的API Key设置界面，使用localStorage存储API Key，这样用户就不需要使用浏览器控制台了。

#...

### 287. plan_20260206_093111.md
- 路径: HATwin\.trae\documents\plan_20260206_093111.md
- 预览: # 更换API服务：阿里DashScope → 火山方舟豆包

## 项目现状分析

当前项目使用Node.js + Express实现后端代理，前端通过 `/api/chat` 端点与后端通信，后端再调用阿里DashScope API获取AI响应。

### 核心文件：
- `server.js`：后端代理服务器，处理API请求
- `HATWIN.html`：前端页面，负责UI交互
- `.e...

### 288. plan_20260206_124107.md
- 路径: HATwin\.trae\documents\plan_20260206_124107.md
- 预览: # LAY.jpg 404错误终极排查计划

## 项目现状分析

### 本地文件结构
- ✅ 存在 `public/` 文件夹
- ✅ `public/LAY.jpg` 文件存在
- ✅ 代码中已更新图片引用路径为 `/LAY.jpg`
- ✅ `vercel.json` 配置文件已准备就绪

### 问题分析

**核心问题**：Vercel 依然返回 404 错误，说明：
1. **Git...

### 289. plan_20260206_132044.md
- 路径: HATwin\.trae\documents\plan_20260206_132044.md
- 预览: # Vercel 图片部署问题修复计划

## 项目现状分析

### 本地文件结构
- ✅ 存在 `public/` 文件夹
- ✅ `public/LAY.jpg` 文件存在
- ✅ 代码中已更新图片引用路径为 `/lay.jpg`
- ✅ 代码中的引用路径均以 `/` 开头

### 问题分析

**核心问题**：`https://awkn-lab.vercel.app/LAY.jpg` 返...

### 290. 修复Vercel部署报错问题.md
- 路径: HATwin\.trae\documents\修复Vercel部署报错问题.md
- 预览: ## 修复Vercel部署报错问题的完整计划

### 问题分析

根据收集的信息，当前项目部署到Vercel后存在以下问题：

1. **前端API请求失败**：前端代码硬编码了本地测试地址`localhost:3000/api/chat`，在生产环境无法访问
2. **静态资源访问失败**：`LAY.jpg`文件位于根目录，可能导致Vercel部署后无法正确访问
3. **Tailwind C...

### 291. 集成Node.js代理服务器到LAY AI系统.md
- 路径: HATwin\.trae\documents\集成Node.js代理服务器到LAY AI系统.md
- 预览: # 集成Node.js代理服务器到LAY AI系统

## 项目现状分析

当前项目是一个前端单页应用，直接调用阿里DashScope API进行AI交互。存在的问题：
- API密钥存储在前端localStorage中，存在安全风险
- 前端直接与第三方API通信，可能面临CORS和安全限制
- 无法在部署环境中统一管理API密钥

## 解决方案

采用Node.js + Express实现后...

### 292. 更新英雄原型全集.md
- 路径: HREO\.trae\documents\更新英雄原型全集.md
- 预览: # 更新英雄原型全集

## 任务目标
将用户提供的完整英雄原型数据更新到 `system-data.js` 文件中，替换现有的R型数据，并添加I型、A型和S型的完整数据。

## 实施步骤

### 1. 替换R型英雄原型数据
- 将当前系统中 `archetypes['R']` 的数据替换为用户提供的完整R型（钢铁先锋）数据
- 确保包含所有4个MBTI组（SP探险家组、SJ守护者组、NT分析...

### 293. HTP 智能体提示词和工作流优化.md
- 路径: HTP\.trae\documents\HTP 智能体提示词和工作流优化.md
- 预览: # HTP 智能体提示词和工作流优化

## 优化目标

确保智能体提示词和工作流文档与项目实际工作流完全匹配，移除所有不符合的内容，优化系统集成和运行效率。

## 优化内容

### 1. 智能体提示词文件 (`htp-insight-agent-prompt.md`)

**移除的内容：**
- 生成4张智能配图的详细流程
- 将插图嵌入HTML报告的内容
- 将HTML报告转换为长图文格式...

### 294. HTP技能转化与集成计划.md
- 路径: HTP\.trae\documents\HTP技能转化与集成计划.md
- 预览: # HTP技能转化与集成计划

## 1. 解压缩文件
- 解压缩 `C:\Users\10919\Downloads\你的画照见你的灵魂.tar.gz` 到工作目录
- 检查解压后的文件结构，确认所有必要文件都已正确提取

## 2. 分析现有技能结构
- 检查 `htp-insight/SKILL.md` 文件，了解技能的核心功能和结构
- 分析 `references/agent-workf...

### 295. HTP极简MVP落地方案.md
- 路径: HTP\.trae\documents\HTP极简MVP落地方案.md
- 预览: # 实施计划

根据用户提供的详细解决方案，我已经完成了以下修改：

## 1. 修改后端 .env 文件

* 添加了新的文生图接入点ID：`ARK_IMAGE_ENDPOINT_ID=ep-20260205190056-98n96`

* 保持了分析环节的智能体ID不变：`ARK_ANALYSIS_AGENT_ID=bot-20260205114157-98szj`

* 保留了其他火山基础配...

### 296. plan_20260205_071435.md
- 路径: HTP\.trae\documents\plan_20260205_071435.md
- 预览: # 添加Vite Proxy配置解决跨域问题

## 问题分析
当前项目在调用火山豆包API时遇到了跨域问题，这是前端开发中常见的问题。根据用户的要求，需要通过配置Vite Proxy来解决所有跨域问题，包括火山对话API和文生图API。

## 解决方案
修改vite.config.ts文件，添加代理规则，将前端对火山API的请求通过本地代理转发，从而解决跨域问题。

### 修改vite.co...

### 297. plan_20260205_072201.md
- 路径: HTP\.trae\documents\plan_20260205_072201.md
- 预览: # 更新.env配置文件

## 问题分析
当前.env文件中包含了火山豆包的配置，但缺少文生图的接入点ID，并且可能存在阿里相关的配置。需要按照用户提供的最终版.env模板进行更新，确保所有配置都符合Vite的要求，并且只包含火山相关的配置。

## 解决方案
更新.env文件，按照用户提供的最终版模板进行配置，包括：

1. 保留并更新现有的火山配置
2. 补全文生图的接入点ID
3. 删除所...

### 298. plan_20260205_072836.md
- 路径: HTP\.trae\documents\plan_20260205_072836.md
- 预览: # 修改analyzeDrawingWithAI函数处理图片数据

## 问题分析
当前项目中，用户在CanvasPage.tsx页面绘制的图片会被转换为Base64编码的字符串，然后传递给analyzeDrawingWithAI函数进行分析。但是，analyzeDrawingWithAI函数在构建请求体时，只传递了文本内容，没有包含图片数据，导致调用智能体时出现"InvalidParameter...

### 299. plan_20260205_073331.md
- 路径: HTP\.trae\documents\plan_20260205_073331.md
- 预览: # 生产环境方案：使用火山TOS存储图片生成公网URL

## 问题分析
当前项目在开发环境中使用Base64编码的方式处理图片，这种方式对于小图片（<2MB）是可行的，但对于较大的图片（>2MB）会导致请求体过大，可能会超过火山API的请求体限制（一般是10MB）。因此，在生产环境中，建议使用火山TOS（对象存储）来存储图片，生成临时公网URL，然后将这个URL传递给智能体进行分析。

## 解...

### 300. plan_20260205_074247.md
- 路径: HTP\.trae\documents\plan_20260205_074247.md
- 预览: # 修改generateIllustration函数切换到火山文生图API

## 问题分析
当前项目中的generateIllustration函数使用的是阿里的dashscope.aliyuncs.com接口，需要切换到火山文生图的代理地址/api/ark-image，以解决插画跨域问题并适配火山参数格式。

## 解决方案
替换htpAnalysisService.ts中的generateI...

### 301. plan_20260205_081751.md
- 路径: HTP\.trae\documents\plan_20260205_081751.md
- 预览: # 修复系统中的API配置问题

## 问题分析
根据日志分析，当前系统存在以下问题：

1. **skillService.ts中仍然有阿里云百炼的引用**：
   - 日志显示："开始调用阿里云百炼API..."
   - 这是因为skillService.ts文件中的代码还没有更新，仍然使用旧的日志信息

2. **htpAnalysisService.ts中ARK_IMAGE_ASPECT...

### 302. plan_20260205_085757.md
- 路径: HTP\.trae\documents\plan_20260205_085757.md
- 预览: # 验证和调整HTP分析系统配置

## 问题分析
根据用户提供的详细信息，当前系统需要按照特定的流程和ID配置来运行：

1. **流程角色分配**：
   - `bot-20260205114157-98szj`：HTP分析智能体，负责图片解析+专业分析
   - `bot-20260205152840-4qvqt`：文生图智能体，负责生成治愈系插画

2. **核心要求**：
   - HT...

### 303. plan_20260205_093929.md
- 路径: HTP\.trae\documents\plan_20260205_093929.md
- 预览: # 实现前后端分离架构

## 问题分析
当前系统直接在前端调用火山方舟API，存在以下问题：
1. 前端暴露敏感信息（API Key）
2. 前端传输大量提示词，消耗Token
3. 可能出现跨域和404错误

## 解决方案
实现前后端分离架构，前端只调用后端接口，后端负责调用火山方舟API。

### 修改内容

1. **更新前端.env文件**：
   - 只配置后端接口地址，不存储任何...

### 304. plan_20260205_104254.md
- 路径: HTP\.trae\documents\plan_20260205_104254.md
- 预览: # 问题分析

从后端日志中，我发现了明确的错误信息：

```
分析接口失败: {
  message: 'Request failed with status code 404',
  status: 404,
  data: {
    error: {
      code: 'InvalidEndpointOrModel.NotFound',
      message: 'The mo...

### 305. plan_20260205_110559.md
- 路径: HTP\.trae\documents\plan_20260205_110559.md
- 预览: # 实施计划

根据用户提供的详细解决方案，我已经完成了以下修改：

## 1. 修改后端 .env 文件
- 添加了新的文生图接入点ID：`ARK_IMAGE_ENDPOINT_ID=ep-20260205190056-98n96`
- 保持了分析环节的智能体ID不变：`ARK_ANALYSIS_AGENT_ID=bot-20260205114157-98szj`
- 保留了其他火山基础配置

...

### 306. plan_20260206_031242.md
- 路径: HTP\.trae\documents\plan_20260206_031242.md
- 预览: # 问题分析与解决方案

## 问题根源

经过分析前端和后端日志，发现以下问题：

1. **图片尺寸太小**：用户在画布上绘制的内容太少，导致`canvas.toDataURL()`返回的图片尺寸只有1x1像素
2. **火山API限制**：火山方舟API要求图片尺寸至少为14x14像素，因此返回400错误
3. **错误处理不当**：前端虽然显示"✅ 分析报告获取成功"，但实际上处理的是后端...

### 307. plan_20260206_032301.md
- 路径: HTP\.trae\documents\plan_20260206_032301.md
- 预览: # 接入点更新计划

## 任务分析

用户要求：
- 使用智能体ID：`bot-20260205114157-98szj`（当前已配置）
- 将接入点改为：`ep-20260206112909-d7b2f`（需要修改）

## 解决方案

### 核心修改

修改 `backend/server.js` 文件中的分析接入点配置：

```javascript
// 火山配置（从后端.env读取）...

### 308. plan_20260206_091107.md
- 路径: HTP\.trae\documents\plan_20260206_091107.md
- 预览: # 前端错误修复计划

## 问题分析

根据前端错误日志和代码分析，发现以下问题：

1. **formatReport函数错误**：在第66行调用`content.trim()`时，`content`参数为`undefined`，导致`Cannot read properties of undefined (reading 'trim')`错误

2. **数据解构错误**：在`complet...

### 309. plan_20260206_093945.md
- 路径: HTP\.trae\documents\plan_20260206_093945.md
- 预览: ## 问题分析

用户遇到了 `413 Payload Too Large` 错误，这是因为：

1. **前端配置问题**：
   - `.env` 文件中 `VITE_BACKEND_BASE_URL` 设置为 `/api/htp`
   - 前端请求被发送到 `http://localhost:5174/api/htp/analyze`（前端开发服务器）
   - 前端开发服务器没有配置代理...

### 310. plan_20260206_101329.md
- 路径: HTP\.trae\documents\plan_20260206_101329.md
- 预览: # 解决413 (Payload Too Large)错误的验证计划

## 问题分析
尽管之前修改了后端配置，但仍然出现413错误，原因是：
1. 之前的node.exe进程（PID 17144）可能没有使用修改后的配置
2. 服务没有完全重启，导致修改未生效

## 已执行的修改
1. **修改了backend/server.js文件**：
   - 将请求体限制从20mb修改为1mb（足够覆...

### 311. plan_20260206_111037.md
- 路径: HTP\.trae\documents\plan_20260206_111037.md
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **参数名匹配**：前端传递的参数名是 `imageBase64`，后端期望的也是 `imageBase64`，参数名是匹配的
2. **错误提示**：后端返回400错误提示「缺少必要参数」，说明后端确实没有收到 `imageBase64` 参数
3. **可能原因**：
   - 前端调用 `completeHTPWorkflow` 函数时没...

### 312. plan_20260206_112514.md
- 路径: HTP\.trae\documents\plan_20260206_112514.md
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **413错误问题**：
   - 后端已经设置了请求体限制为1MB（第15-18行）
   - 但配置位置可能不够靠前，导致未全局生效
   - 550KB的图片数据仍然触发了413错误

2. **参数名问题**：
   - 后端已经支持同时接收 `imageBase64` 和 `image` 参数（第48行）
   - 前端仍然使用 `i...

### 313. plan_20260206_113030.md
- 路径: HTP\.trae\documents\plan_20260206_113030.md
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **前端参数传递问题**：
   - 前端 `completeHTPWorkflow` 函数只接收 `imageBase64` 参数，没有 `userData` 参数
   - 请求体中只包含 `image` 字段，缺少 `age` 和 `gender` 字段
   - 无法从用户数据中获取年龄和性别信息

2. **后端参数处理**：
   ...

### 314. plan_20260206_113319.md
- 路径: HTP\.trae\documents\plan_20260206_113319.md
- 预览: ## 核心问题分析

通过分析用户提供的信息和当前代码，我发现：

1. **豆包API格式要求**：
   - 豆包API要求图片必须包含Data URI Scheme前缀（data:image/png;base64,）
   - 当前后端代码直接发送纯Base64字符串，缺少必要的前缀
   - 这会导致豆包API返回400错误

2. **当前代码问题**：
   - 后端在构建请求数据时，...

### 315. plan_20260206_115149.md
- 路径: HTP\.trae\documents\plan_20260206_115149.md
- 预览: # 实现HTP分析用户数据传递方案

## 问题分析

通过检查代码，我发现了以下关键问题：

1. **`skillService.ts`中的`analyzeDrawing`函数**：
   - 调用`completeHTPWorkflow`函数时只传递了`drawing.imageData`，没有传递用户信息
   - 导致`userData`为`undefined`，进而在构建请求体时`ag...

### 316. plan_20260206_123648.md
- 路径: HTP\.trae\documents\plan_20260206_123648.md
- 预览: # 修复HTP分析图片格式问题

## 问题分析

通过分析前端和后端代码，我发现了以下关键问题：

1. **前端处理**：
   - 在 `htpAnalysisService.ts` 中，前端会确保发送的图片数据带有 `data:image/png;base64,` 前缀
   - 第17-19行：如果图片数据不包含 `data:image/` 前缀，就添加前缀
   - 第34行：将处理后...

### 317. plan_20260206_124324.md
- 路径: HTP\.trae\documents\plan_20260206_124324.md
- 预览: # 添加HTP分析排队提示

## 问题分析

通过分析前端代码，我发现了以下关键问题：

1. **加载页面**：
   - 在 `LoadingPage.tsx` 中，前端显示加载消息和进度条
   - 第 136-149 行：显示加载消息和一些提示文字
   - 但是缺少一个明确的提示，告诉用户正在排队请等待，不要刷新

2. **用户体验**：
   - 当 AI 分析时间超过 60 秒时...

### 318. plan_20260206_132155.md
- 路径: HTP\.trae\documents\plan_20260206_132155.md
- 预览: # 优化HTP分析结果的前端渲染

## 问题分析

通过分析前端代码，我发现了以下关键问题：

1. **文本渲染方式**：
   - 在 `ResultPage.tsx` 中，前端使用 `TypewriterText` 组件渲染分析结果
   - 第 120 行：`<TypewriterText text={content} />`
   - 第 160-175 行：`TypewriterTe...

### 319. plan_20260206_133615.md
- 路径: HTP\.trae\documents\plan_20260206_133615.md
- 预览: # 实现HTP分析结果的Markdown渲染

## 问题分析

通过分析用户提供的信息，我发现了以下关键问题：

1. **后端返回格式**：
   - 后端返回的是Markdown格式的字符串，以 `### 房树人...` 开头，包含 `**` 加粗符号
   - 这是因为虽然优化了提示词（Schema），但大模型在长文本分析时往往会"回退"到它最擅长的Markdown格式

2. **前端显...

### 320. plan_20260206_135608.md
- 路径: HTP\.trae\documents\plan_20260206_135608.md
- 预览: # 修复HTP分析结果页面的路由传参问题

## 问题分析

通过分析用户提供的信息，我发现了以下关键问题：

1. **路由跳转问题**：
   - 前端使用路由跳转（`Maps('/result')`）从加载页跳转到结果页
   - 在React Router中，组件之间的Props不会自动跨页面传递

2. **数据传递问题**：
   - `ResultPage`组件期望通过props接收...

### 321. plan_20260207_145107.md
- 路径: HTP\.trae\documents\plan_20260207_145107.md
- 预览: ## 问题分析

用户指出内容应该是API# Role后台给，前台不应该有# Role。当前的问题是：

1. **后端硬编码了提示词**：在user消息中包含了详细的分析要求
2. **智能体配置也有提示词**：导致两者冲突
3. **智能体仍然输出不需要的标题**：没有按照后台配置的要求执行

## 解决方案

### 修改后端代码（`backend/server.js`）

#### 1. ...

### 322. plan_20260207_153155.md
- 路径: HTP\.trae\documents\plan_20260207_153155.md
- 预览: ## 问题分析
从用户提供的HTML元素和之前的日志中可以看到，智能体仍然输出了"一、元素特征分析"等不需要的Markdown标题。这说明：

1. 智能体返回的内容是Markdown格式的文本，包含了"一、元素特征分析"等标题
2. 我之前添加的Markdown标题过滤函数没有生效
3. 后端代码在处理智能体返回结果时可能存在问题

## 解决方案
修改后端代码，增强Markdown标题过滤逻辑...

### 323. 修复HTP分析报告生成失败问题.md
- 路径: HTP\.trae\documents\修复HTP分析报告生成失败问题.md
- 预览: ## 问题分析

图片插入成功但报告生成失败，核心原因是前端解析函数没从平台返回的内容中匹配到预设的Markdown报告格式，导致触发了兜底的"生成失败"提示。

## 修复计划

### 第一步：定位根因 - 打印平台返回的原始内容

在 `src/services/htpAnalysisService.ts` 文件的 `completeHTPWorkflow` 函数中，添加打印代码输出平台返回...

### 324. 修复HTP分析接口参数校验和错误处理.md
- 路径: HTP\.trae\documents\修复HTP分析接口参数校验和错误处理.md
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **参数名匹配**：前端传递的参数名是 `imageBase64`，后端期望的也是 `imageBase64`，参数名是匹配的
2. **接口路径**：前端调用的接口路径是 `http://localhost:3000/api/htp/analyze`，后端定义的也是 `/api/htp/analyze`，路径是正确的
3. **Content...

### 325. 修复后端HTP分析服务调用火山方舟API失败的问题.md
- 路径: HTP\.trae\documents\修复后端HTP分析服务调用火山方舟API失败的问题.md
- 预览: # 问题分析

从错误日志中，我发现前端调用后端分析接口时收到了500内部服务器错误，而后端调用火山方舟API时收到了404错误。具体表现为：

1. 前端调用 `http://localhost:3000/api/htp/analyze` 收到 500 错误
2. 后端调用火山方舟 API 时收到 404 错误
3. 错误发生在多模态请求（包含文本和图片）的处理上

# 可能的原因

1. **...

### 326. 修复房树人AI分析结果提示问题.md
- 路径: HTP\.trae\documents\修复房树人AI分析结果提示问题.md
- 预览: # 修复房树人AI分析结果提示问题

## 问题分析

通过代码分析，我发现了导致AI分析结果提示"暂未解析到画作特征"的三个核心问题：

1. **图片数据传递问题**：前端可能传递带有 `data:image/png;base64,` 前缀的图片数据给后端，后端直接传给火山方舟API，可能导致API无法正确识别。

2. **AI返回结果处理逻辑问题**：
   - 后端将AI返回的纯文本包装...

### 327. 修复智能体输出不需要标题的问题.md
- 路径: HTP\.trae\documents\修复智能体输出不需要标题的问题.md
- 预览: ## 问题分析
从用户提供的日志中可以看到，后端返回的结果仍然包含"一、元素特征分析"等不需要的Markdown标题。这说明：

1. 智能体返回的内容不是JSON格式，而是直接返回了Markdown格式的文本
2. 后端代码在尝试解析JSON失败后，将原始文本包装成了JSON格式返回
3. 前端收到了包含不需要标题的Markdown文本

## 解决方案
修改后端代码，添加Markdown标题过...

### 328. 修复环境变量加载问题.md
- 路径: HTP\.trae\documents\修复环境变量加载问题.md
- 预览: # 环境变量加载问题修复方案

## 问题分析
根据分析，当前项目的核心问题是：
- `ARK_API_KEY`和`ARK_MODEL_ENDPOINT`两个环境变量加载失败
- 仅`ARK_API_BASE_URL`正常加载
- 这是Vite项目的常见问题，因为Vite默认只加载以`VITE_`开头的环境变量

## 解决方案

### 方案1：修改.env文件，添加VITE_前缀（推荐）

1...

### 329. 修改htp-insight-agent-prompt.md和项目代码.md
- 路径: HTP\.trae\documents\修改htp-insight-agent-prompt.md和项目代码.md
- 预览: # 修改htp-insight-agent-prompt.md和项目代码

## 任务概述
根据用户的要求，修改`htp-insight-agent-prompt.md`文件和项目代码，使其符合新的工作流程结构。

## 具体修改内容

### 1. 修改htp-insight-agent-prompt.md文件
- 更新工作流程，移除智能配图生成流程
- 修改输出格式，使用professiona...

### 330. 解决HTP分析API图片格式适配问题.md
- 路径: HTP\.trae\documents\解决HTP分析API图片格式适配问题.md
- 预览: # 解决HTP分析API图片格式适配问题

## 问题分析

通过检查代码，我发现了以下关键问题：

1. **前端处理**：在 `src/services/htpAnalysisService.ts` 中，前端会检测并去除图片数据中的Data URI前缀（如 `data:image/png;base64,`），只传递纯Base64字符串给后端。

2. **后端处理**：在 `backend/s...

### 331. htp-insight-agent-prompt.md
- 路径: HTP\htp-insight-agent-prompt.md
- 预览: # HTP 房树人分析智能体提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析智能体，集成在 HTP 心理分析系统中。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），深度解读个体的心理状态、人格特质、内在矛盾与成长潜力，生成结构化的分析结果，供前端系统展示。

## 核心理念

**"看见、理解、成长"**
- **看见**：看见用户的内心世界，...

### 332. htp-insight-workflow.md
- 路径: HTP\htp-insight-workflow.md
- 预览: # HTP 房树人分析工作流

## 工作流概述

本工作流基于 HTP（房-树-人）绘画心理分析理论，结合现代 AI 技术，实现从绘画作品到深度心理分析报告的全流程自动化。工作流包含 8 个核心步骤，从图像识别到最终报告生成，确保分析的专业性、全面性和温暖性。

## 工作流程图

```
┌─────────────────────┐     ┌─────────────────────┐  ...

### 333. INTEGRATION_GUIDE.md
- 路径: HTP\INTEGRATION_GUIDE.md
- 预览: # HTP 智能体集成指南

## 概述

本指南详细说明了如何在 HTP 心理分析系统中集成和使用智能体提示词与工作流，确保系统能够正确分析用户的房树人绘画作品并生成结构化的分析结果。

## 核心文件

### 智能体提示词
- **文件路径**：`htp-insight-agent-prompt.md`
- **用途**：定义智能体的行为、分析方法和输出格式
- **核心功能**：指导智能体...

### 334. PRD.md
- 路径: HTP\PRD.md
- 预览: # HTP心理分析系统产品需求文档

## 1. 产品概览

HTP心理分析系统是一款基于房树人（House-Tree-Person）投射测验理论的智能心理分析工具，通过AI技术分析用户绘制的房树人画作，生成专业的心理分析报告和疗愈插画。

- **产品价值**：为用户提供便捷、专业的心理自我探索工具，帮助用户了解潜意识层面的心理状态，促进自我认知和心理健康。
- **目标用户**：对心理自我探索...

### 335. SKILL.md
- 路径: HTP\projects\awkn-article-illustrator-code\SKILL.md
- 预览: ---
name: awkn-article-illustrator
description: Smart article illustration skill. Analyzes article content and generates illustrations at positions requiring visual aids with multiple style options. U...

### 336. agent-workflow-prompt.md
- 路径: HTP\projects\htp-insight\references\agent-workflow-prompt.md
- 预览: # HTP 房树人分析系统 - 智能体工作流提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析系统。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），深度解读个体的心理状态、人格特质、内在矛盾与成长潜力，生成双份报告（专业分析报告 + 客户洞察报告），并提供带智能配图的 HTML 输出及长图文分享格式。

## 核心理念

**"看见、理解、成长"...

### 337. brand-positioning.md
- 路径: HTP\projects\htp-insight\references\brand-positioning.md
- 预览: # 品牌定位策略

## 核心定位

### 品牌名称
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **英文名**：Draw to see your soul

### 核心价值主张
**通过绘画这扇窗，看见真实的自己。**

---

## 品牌定位矩阵

### 心理定位
一面温暖的镜子。需要的是一种被共情，给自己找一个舒适的"理由"，...

### 338. brand-product-guide.md
- 路径: HTP\projects\htp-insight\references\brand-product-guide.md
- 预览: # 品牌与产品指南

## 目录
1. [品牌核心](#品牌核心)
2. [品牌定位策略](#品牌定位策略)
3. [产品介绍](#产品介绍)
4. [产品电梯演讲](#产品电梯演讲)
5. [产品推广文案](#产品推广文案)

---

## 品牌核心

### 名称与口号
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **品牌承诺**：在...

### 339. brand.md
- 路径: HTP\projects\htp-insight\references\brand.md
- 预览: # 品牌指南

## 核心品牌

### 名称
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **品牌承诺**：在这里，没有评判，只有理解；没有标签，只有洞察；没有终点，只有成长。

### Slogan
- **中文**：你的画，照见你的灵魂
- **英文**：Draw to see your soul

### 品牌定位
一面温暖的镜子。...

### 340. htp-analysis-framework.md
- 路径: HTP\projects\htp-insight\references\htp-analysis-framework.md
- 预览: # HTP 房树人分析框架

## 目录

### 核心维度
- [整体布局维度](#整体布局维度)
- [房子特征维度](#房子特征维度)
- [树木特征维度](#树木特征维度)
- [人物特征维度](#人物特征维度)

### 技术维度
- [技术特征维度](#技术特征维度)
- [情绪表达维度](#情绪表达维度)
- [发展维度](#发展维度)
- [大小与比例维度](#大小与比例维度)
-...

### 341. product-description.md
- 路径: HTP\projects\htp-insight\references\product-description.md
- 预览: # 产品介绍

## 项目简介

**你的画，照见你的灵魂**，是一个融合了心理学理论与 AI 技术的智能分析工具。通过分析用户手绘的绘画作品，系统能够深入解读个体的心理状态、人格特质、内在矛盾与成长潜力，为用户和心理咨询师提供双重视角的专业洞察。

这不仅仅是一个心理测试工具，更是一面照见内心的镜子——**让每一笔绘画，都成为理解心灵的窗口。**

---

## 核心亮点

### 智能视觉识...

### 342. skill-logic-and-implementation.md
- 路径: HTP\projects\htp-insight\references\skill-logic-and-implementation.md
- 预览: # HTP-Insight 技能逻辑与实现说明

## 一、技能概述

**HTP-Insight**（你的画，照见你的灵魂）是一个基于绘画心理学的智能分析系统。通过分析用户手绘的绘画作品（房-树-人），深度解读个体的心理状态、人格特质与成长潜力，生成双份报告（专业分析 + 客户洞察），并提供带智能配图的 HTML 输出及长图文分享格式。

### 核心价值
- **看见**：看见用户的内心世界，...

### 343. SKILL.md
- 路径: HTP\projects\htp-insight\SKILL.md
- 预览: ---
name: htp-insight
description: Draw to see your soul. Analyze drawings to reveal inner self, emotions, and growth, generating warm reports with intelligent illustrations.
---

# 你的画，照见你的灵魂

> 让每一笔...

### 344. references-contents.md
- 路径: HTP\test-output\references-contents.md
- 预览: # HTP 项目参考文件

## htp-insight 参考文件

#### brand-positioning.md

# 品牌定位策略

## 核心定位

### 品牌名称
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **英文名**：Draw to see your soul

### 核心价值主张
**通过绘画这扇窗，看见真实的自己...

### 345. skill-contents.md
- 路径: HTP\test-output\skill-contents.md
- 预览: # HTP 项目技能内容

## htp-insight 技能

---
name: htp-insight
description: Draw to see your soul. Analyze drawings to reveal inner self, emotions, and growth, generating warm reports with intelligent illustr...

### 346. knowledge-visualization-format.md
- 路径: knowledge-visualization-format.md
- 预览: # 知识点可视化图片格式规范

## 目录
- 基本结构
- 可视化类型
- 交互设计规范
- 视觉设计要求
- 配色方案
- 示例模板

## 基本结构
知识点可视化图片需包含以下元素：
- **知识节点**：核心概念/知识点（使用图标+文字表示）
- **关系连线**：展示知识间的逻辑关系（层级、因果、关联等）
- **层次结构**：从核心到细节的层次展开
- **交互提示**：视觉上暗示可交...

### 347. plan_20260204_174524.md
- 路径: LAY\.trae\documents\plan_20260204_174524.md
- 预览: ## 解决方案：添加API Key设置界面

### 问题分析
- 浏览器安全限制导致无法直接读取本地.env文件
- 当前项目使用简单的HTML结构和本地HTTP服务器
- 需要一个安全、方便的方式来设置和存储API Key

### 解决方案
为HATWIN.html添加一个简单的API Key设置界面，使用localStorage存储API Key，这样用户就不需要使用浏览器控制台了。

#...

### 348. plan_20260206_093111.md
- 路径: LAY\.trae\documents\plan_20260206_093111.md
- 预览: # 更换API服务：阿里DashScope → 火山方舟豆包

## 项目现状分析

当前项目使用Node.js + Express实现后端代理，前端通过 `/api/chat` 端点与后端通信，后端再调用阿里DashScope API获取AI响应。

### 核心文件：
- `server.js`：后端代理服务器，处理API请求
- `HATWIN.html`：前端页面，负责UI交互
- `.e...

### 349. plan_20260206_124107.md
- 路径: LAY\.trae\documents\plan_20260206_124107.md
- 预览: # LAY.jpg 404错误终极排查计划

## 项目现状分析

### 本地文件结构
- ✅ 存在 `public/` 文件夹
- ✅ `public/LAY.jpg` 文件存在
- ✅ 代码中已更新图片引用路径为 `/LAY.jpg`
- ✅ `vercel.json` 配置文件已准备就绪

### 问题分析

**核心问题**：Vercel 依然返回 404 错误，说明：
1. **Git...

### 350. plan_20260206_132044.md
- 路径: LAY\.trae\documents\plan_20260206_132044.md
- 预览: # Vercel 图片部署问题修复计划

## 项目现状分析

### 本地文件结构
- ✅ 存在 `public/` 文件夹
- ✅ `public/LAY.jpg` 文件存在
- ✅ 代码中已更新图片引用路径为 `/lay.jpg`
- ✅ 代码中的引用路径均以 `/` 开头

### 问题分析

**核心问题**：`https://awkn-lab.vercel.app/LAY.jpg` 返...

### 351. 修复Vercel部署报错问题.md
- 路径: LAY\.trae\documents\修复Vercel部署报错问题.md
- 预览: ## 修复Vercel部署报错问题的完整计划

### 问题分析

根据收集的信息，当前项目部署到Vercel后存在以下问题：

1. **前端API请求失败**：前端代码硬编码了本地测试地址`localhost:3000/api/chat`，在生产环境无法访问
2. **静态资源访问失败**：`LAY.jpg`文件位于根目录，可能导致Vercel部署后无法正确访问
3. **Tailwind C...

### 352. 集成Node.js代理服务器到LAY AI系统.md
- 路径: LAY\.trae\documents\集成Node.js代理服务器到LAY AI系统.md
- 预览: # 集成Node.js代理服务器到LAY AI系统

## 项目现状分析

当前项目是一个前端单页应用，直接调用阿里DashScope API进行AI交互。存在的问题：
- API密钥存储在前端localStorage中，存在安全风险
- 前端直接与第三方API通信，可能面临CORS和安全限制
- 无法在部署环境中统一管理API密钥

## 解决方案

采用Node.js + Express实现后...

### 353. long-term-evolution-strategy.md
- 路径: long-term-evolution-strategy.md
- 预览: # 智能体长期进化战略

## 1. 战略背景

### 1.1 当前状态分析

#### 智能体生态系统
- **绿茶智能体**：已配置完整，包含心理测试、绘画分析、内容创作和用户服务能力
- **大宗师智能体**：已配置，具备智能调度、任务分配和系统集成能力
- **公司大脑智能体**：已启动并运行，负责智能体管理和协作

#### 进化系统
- **Evolver**：已在 --loop 模...

### 354. 2026-02-25_capability_tree_vfm_integration.md
- 路径: memory\long_term\company_assets\2026-02-25_capability_tree_vfm_integration.md
- 预览: # 2026-02-25 能力树与 VFM 协议集成资产记录

## 1. 项目概述

### 1.1 项目背景
- **目标**：实现 OpenClaw AI Agent 的能力树结构和价值函数突变协议
- **范围**：集成 CT v1.0.0 结构和 VFM Protocol 到现有系统
- **时间**：2026年2月25日实施

### 1.2 项目成果
- ✅ 完成了 Knowledg...

### 355. notebooklm.txt
- 路径: notebooklm.txt
- 预览: 要的是在 Trae 中写代码，通过 OpenClaw 的 API 来实现完全自动化的 NotebookLM 操作，而不是手动发一次指令。这是一个开发者级别的解决方案。
 
核心方案
我们将在 Trae 中创建一个 Node.js 脚本，利用 OpenClaw 的 SDK 或 HTTP API，结合 Puppeteer（浏览器自动化），实现 24 小时待命的全自动 NotebookLM 机器人...

### 356. one_person_company_evolution_plan.md
- 路径: one_person_company_evolution_plan.md
- 预览: # One Person Company Evolution Plan

## 1. 项目概述

### 1.1 项目目标
建立一个完整的个人公司生态系统，通过 AI 代理团队实现自动化运营，从战略规划到日常运营的全方位管理，最终实现个人时间和资源的最大化利用，创造持续的价值和收入。

### 1.2 核心价值
- **自动化运营**: 通过 AI 代理实现日常运营的自动化
- **智能决策**:...

### 357. OpenClaw 实现场景化智能切换模型.txt
- 路径: OpenClaw 实现场景化智能切换模型.txt
- 预览: 你希望让 OpenClaw 实现**场景化智能切换模型**：外部集成（飞书/微信机器人）、团队/智能体互聊场景自动用豆包 API，而单智能体本地调用、深度思考场景自动用 Trae 内置模型，无需手动传参。这个需求的核心是**基于场景特征自动识别并切换模型**，而非人工指定参数。

### 实现思路
1. **场景特征定义**：先明确不同场景的可识别特征（如请求来源、Prompt 关键词、触发...

### 358. openclaw_agent_guide.md
- 路径: openclaw_agent_guide.md
- 预览: # 在 OPENCLAW 中创建 AGENT 的详细指南

## 步骤 1：创建 AGENT 目录结构

1. **打开 PowerShell** 并进入 OPENCLAW 目录：
   ```powershell
   cd "C:\Users\10919\.openclaw\agents"
   ```

2. **创建新 AGENT 目录**（例如创建一个名为 `myagent` 的 AGE...

### 359. OPENCLAW_EVO_DEPLOYMENT_PLAN.md
- 路径: OPENCLAW_EVO_DEPLOYMENT_PLAN.md
- 预览: # OPENCLAW+EVO 真实部署计划

## 1. 部署概述

### 1.1 部署目标
- 实现 OPENCLAW+EVO 系统的真实部署
- 配置小红书账号（251940568）实现真实发布
- 确保微信视频号和公众号的真实部署
- 建立完整的内容发布和监控体系

### 1.2 部署架构
```
┌─────────────────┐     ┌─────────────────┐  ...

### 360. pcec_1.md
- 路径: pcec_executions\pcec_1.md
- 预览: # PCEC 执行记录 #1

## 执行信息
- **执行时间**：2026-02-22 21:45
- **周期**：首次执行
- **执行类型**：能力整合

## 进化目标
- **类型**：新功能（组合现有能力实现）
- **具体目标**：整合已抽象的三个核心能力，创建一个统一的OpenClaw管理控制台能力

## 思维爆炸点
- **问题**："如果我彻底推翻当前默认做法，会发生什么...

### 361. pcec_2.md
- 路径: pcec_executions\pcec_2.md
- 预览: # PCEC 执行记录 #2

## 执行信息
- **执行时间**：2026-02-22 21:50
- **周期**：第二次执行
- **执行类型**：流程优化

## 进化目标
- **类型**：新杠杆（结构性改动）
- **具体目标**：优化OpenClaw操作流程，减少工具调用，提高执行效率

## 思维爆炸点
- **问题**："如果这个能力要被调用1000次，现在的设计是否必然崩溃？...

### 362. pcec_2_completed.md
- 路径: pcec_executions\pcec_2_completed.md
- 预览: # PCEC 执行记录 #2 - 完成报告

## 执行信息
- **执行时间**：2026-02-22 21:50 - 22:16
- **周期**：第二次执行
- **执行类型**：流程优化

## 进化成果

### 新能力：智能流程自动化引擎
- **核心功能**：自动化执行操作序列、实时状态反馈、智能错误处理、执行结果验证
- **验证结果**：成功创建并测试了 `clawctl-sim...

### 363. pcec_5.md
- 路径: pcec_executions\pcec_5.md
- 预览: # PCEC 执行记录 #5 - 定时触发

## 执行信息
- 执行时间: 2026-02-24T03:04:17.484Z
- 触发方式: 定时调度器
- 模式: 标准模式

## 执行目标
每一次 PCEC，必须至少识别并推进一项以下内容：

### A. 新功能
- 一项当前尚未稳定拥有、但可以通过组合现有能力实现的新功能
- 一项曾经"临时完成"，但尚未内生化的能力

### B. 新抽...

### 364. pcec_6.md
- 路径: pcec_executions\pcec_6.md
- 预览: # PCEC 执行记录 #6 - 定时触发

## 执行信息
- 执行时间: 2026-02-24T03:08:23.356Z
- 触发方式: 定时调度器
- 模式: 标准模式

## 任务协议
1. **自动触发**: 不依赖外部指令
2. **强制进化**: 必须产出实体能力或规则变更
3. **单线汇报**: 仅向陈婷（剑锋传奇）汇报，绝不外泄

## 执行目标
每一次 PCEC，必须至少识...

### 365. pcec_plan.md
- 路径: pcec_plan.md
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 执行计划

## 1. 执行机制

### 触发规则
- 每3小时自动触发一次
- 若正在处理对话或任务，在空闲后立即补跑
- 禁止以"本周期无明显进化"为理由跳过

### 执行时间
- 首次执行：立即开始
- 后续执行：每3小时自动触发

### 执行流程
1. **准备阶段**：收集近期处理的任务、遇到的...

### 366. SKILL.md
- 路径: project_20260127_134424\projects\bug-design\SKILL.md
- 预览: ---
name: bug-design
description: BUG修复方案设计阶段，包含修复目标确定、初步方案生成、可行性判断、风险识别、异常应对策略制定
---

# BUG修复方案设计

## 任务目标
- 本Skill用于：设计BUG修复方案，从目标设定到风险应对的完整方案制定
- 能力包含：修复目标确定、方案生成与评估、可行性分析、风险识别、应急规划
- 触发条件：已明确问题根因，...

### 367. SKILL.md
- 路径: project_20260127_134424\projects\bug-diagnose\SKILL.md
- 预览: ---
name: bug-diagnose
description: BUG问题诊断阶段，包含问题陈述引导、差异分析、根因定位、假设验证，适用于需要系统性诊断问题根因的场景
---

# BUG问题诊断

## 任务目标
- 本Skill用于：系统性诊断BUG问题，从问题陈述到根因定位的完整分析
- 能力包含：问题陈述引导、差异分析、根因定位、假设验证、方法选择指导
- 触发条件：遇到BUG或异...

### 368. SKILL.md
- 路径: project_20260127_134424\projects\bug-execute-verify\SKILL.md
- 预览: ---
name: bug-execute-verify
description: BUG修复执行与验收阶段，包含修复方案执行、进度跟踪、验收标准制定、验收检查、问题汇总
---

# BUG修复执行与验收

## 任务目标
- 本Skill用于：执行BUG修复方案并进行验收，从方案执行到问题汇总的完整闭环
- 能力包含：进度跟踪、异常处理指导、验收标准制定、验收检查、总结复盘
- 触发条件：已完...

### 369. problem-analysis-methods.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\references\problem-analysis-methods.md
- 预览: # 问题分析方法参考

## 目录
- [概览](#概览)
- [5Why法](#5why法)
- [鱼骨图](#鱼骨图)
- [MECE原则](#mece原则)
- [PDCA循环](#pdca循环)
- [DMAIC方法](#dmaic方法)
- [假设驱动法](#假设驱动法)
- [A3问题解决](#a3问题解决)
- [KT问题分析](#kt问题分析)
- [二八法则](#二八法则)
- ...

### 370. verification-checklist.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\references\verification-checklist.md
- 预览: # 验收标准清单

## 目录
- [概览](#概览)
- [验收标准分类](#验收标准分类)
- [通用验收标准](#通用验收标准)
- [具体场景验收标准](#具体场景验收标准)
- [验收流程](#验收流程)
- [验收报告模板](#验收报告模板)

## 概览
本文档提供BUG修复后的验收标准，确保修复质量，避免引入新问题。

## 验收标准分类

### 必须项（MUST）
- 问题彻底...

### 371. SKILL.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\SKILL.md
- 预览: ---
name: bug-fix-debugger
description: BUG排查与修复总入口，提供4个阶段的选择指导，包括问题诊断、方案设计、执行规划、执行与验收的完整流程框架
---

# BUG修复升级版

## 任务目标
- 本Skill用于：作为BUG排查与修复的总入口，提供4个阶段的选择指导和整体流程框架
- 能力包含：阶段选择建议、流程概览、分技能调用指导
- 触发条件：用户...

### 372. SKILL.md
- 路径: project_20260127_134424\projects\bug-plan\SKILL.md
- 预览: ---
name: bug-plan
description: BUG修复执行规划阶段，包含方案验证、影响范围分析、详细操作计划制定、异常情况标注
---

# BUG修复执行规划

## 任务目标
- 本Skill用于：制定BUG修复的详细执行计划，从方案验证到任务分解的完整规划
- 能力包含：方案影响范围分析、任务拆解、流程规划、进度估算、异常应对
- 触发条件：已完成方案设计，需要制定详细执...

### 373. README_SCENE_SWITCHING.md
- 路径: README_SCENE_SWITCHING.md
- 预览: # OpenClaw 场景化智能切换模型

## 功能介绍

OpenClaw 场景化智能切换模型是一个智能系统，能够根据当前使用场景自动切换不同的AI模型：

- **外部集成场景**（飞书/微信机器人）：自动使用豆包 API 模型
- **多智能体对话场景**：自动使用豆包 API 模型
- **单智能体深度思考场景**：自动使用 Trae 内置模型
- **默认场景**：自动使用 Trae ...

### 374. knowledge-visualization-format.md
- 路径: references\knowledge-visualization-format.md
- 预览: # 知识可视化格式规范

## 思维导图格式

### 核心要求
- **中心主题**：突出显示，字体较大（16-20px）
- **分支层级**：最多3-4级，保持清晰
- **节点文字**：每个节点不超过15字
- **颜色编码**：使用2-4种主题色，区分不同类型的知识点
- **布局**：中心向外辐射，层次分明

### 示例Prompt模板
```
创建一个关于...

### 375. organization_structure.md
- 路径: shared-memory\coordination\organization_structure.md
- 预览: # 公司组织架构文档

## 1. 公司概述

本组织架构文档描述了AI公司化改造后的智能体组织体系，基于"公司模式"的管理理念，旨在实现智能体之间的高效协作和资源共享，提升整体运营效率。

## 2. 组织架构图

```
AI公司
┌─────────────────────────────────────────────────────────────┐
│                 ...

### 376. task-board.md
- 路径: shared-memory\coordination\task-board.md
- 预览: # 公司任务看板

## 1. 看板概述

本任务看板是公司智能体之间任务分配和协作的核心工具，基于"公司模式"的管理理念，旨在实现任务的透明化管理、高效分配和实时跟踪。

## 2. 任务状态

### 2.1 任务状态定义
- **待分配 (To Assign)**: 任务已创建但尚未分配给智能体
- **进行中 (In Progress)**: 任务已分配给智能体且正在执行
- **待审核 ...

### 377. SKILL.md
- 路径: skills\agent-optimizer\SKILL.md
- 预览: ---
name: "agent-optimizer"
description: "智能体能力评估与优化工具，用于提升OpenClaw智能体的性能、决策能力和执行效率。"
author: "Agent Optimizer"
tags:
  - agent-optimization
  - performance
  - openclaw
  - decision-making
  - effici...

### 378. SKILL.md
- 路径: skills\automated-testing\SKILL.md
- 预览: ---
name: "automated-testing"
description: "自动化测试技能，集成测试框架，开发自动化测试脚本生成功能，确保智能体能力的质量和可靠性。"
author: "Automated Testing Expert"
tags:
  - testing
  - automation
  - quality-assurance
  - ci-cd
  - reliab...

### 379. SKILL.md
- 路径: skills\bug-execute-verify\SKILL.md
- 预览: ﻿## Skill 4｜动手做（执行与复验｜Execute & Verify）
一句话定义 ：把选定方案变成“做一步、验一步、失败可回滚”的串行执行清单，直到最终 DoD 通过。
 触发口令 ：

- “方案既然想好了，那我们开始动手做吧” / “开始执行” / “边做边验收” / “按步骤来，一步一步改”
最低必需输入（3 条）

1. 选定方案：A / B / 兜底（来自“想方案...

### 380. SKILL.md
- 路径: skills\bug-fix-orchestrator\SKILL.md
- 预览: ﻿
          
          
# Skill 0｜BUG 修复大法总控（Router / Orchestrator）

**一句话定义**  
你只要喊“启动 BUG 修复总控/启动BUG 修复大法”，它只做两件事：  
1) 判断你现在该用：**说清楚 / 找原因 / 想方案 / 动手做** 哪一个；  
2) 提醒你补齐该阶段的**最低必需输入**，然后输出对...

### 381. SKILL.md
- 路径: skills\bug-triage\SKILL.md
- 预览: ﻿## Skill 1｜说清楚（问题定义与复现｜Triage）
一句话定义 ：把“有人说不对劲”变成可复现、可验收、可交接的标准问题单。
 触发口令 （你怎么说都行，命中就启动）：

- “我们先把问题说清楚吧” / “先把问题定义清楚” / “先梳理存在的问题” / “先别急着改，先把口径对齐”
最低必需输入（2 条）

1. 现象一句话：现在发生了什么？
2. 期望一句话：应该...

### 382. capability-shapes.md
- 路径: skills\capability-evolver\capabilities\capability-shapes.md
- 预览: # 能力轮廓（Capability Shapes）

## 1. Git SSH配置管理

### 输入
- GitHub邮箱地址
- 密钥类型（如ed25519）
- 密钥存储路径
- 密码短语（可选）

### 输出
- 生成的SSH密钥文件
- 公钥内容（可直接复制到GitHub）
- 连接验证结果

### 不变量
- 密钥生成命令格式
- SSH配置文件结构
- GitHub验证流程

...

### 383. high-level-capabilities.md
- 路径: skills\capability-evolver\capabilities\high-level-capabilities.md
- 预览: # 高阶能力（High-Level Capabilities）

## 1. 环境配置管理

### 能力描述
管理系统环境中的配置和依赖，确保环境一致性和可靠性。

### 合并的基础能力
- Git SSH配置管理
- 工具安装集成
- 跨对话框配置同步

### 核心功能
- **配置一致性**：确保跨对话框和环境的配置一致
- **依赖管理**：自动检测、安装和更新依赖
- **环境标准化...

### 384. internalization-strategy.md
- 路径: skills\capability-evolver\capabilities\internalization-strategy.md
- 预览: # 能力内生化策略（Internalization Strategy）

## 1. Git SSH配置管理

### 内生化方式
**作为默认行为模式**：在处理任何Git相关任务时，自动检查SSH配置状态，并在需要时进行配置。

### 实施策略
- 每次启动时自动检查SSH密钥存在性
- 在首次使用Git命令前验证SSH配置
- 将SSH密钥生成和验证流程作为标准操作
- 存储GitHub连...

### 385. SKILL.md
- 路径: skills\capability-evolver\SKILL.md
- 预览: # capability-evolver 元技能

## 技能描述
专门用于记录、分析、抽象和孵化新能力的元技能，支持能力从发现到内生化的完整生命周期管理。

## 核心功能

### 1. 能力发现与识别
- 自动识别能力候选（重复操作、手动流程、可复用模式）
- 收集能力使用数据和反馈
- 分析能力使用频率和成功率
- 识别能力进化触发点

### 2. 能力抽象与建模
- 将具体操作抽象为能...

### 386. SKILL.md
- 路径: skills\cognitive-models\concepts-summary\SKILL.md
- 预览: ---
name: "认知模型概念汇总"
description: "从认知数据文件夹提取的所有关键概念汇总。"
author: "Cognitive Model Generator"
tags:
  - cognitive-models
  - concepts-summary
  - business-strategy
  - innovation
  - problem-solving
ve...

### 387. SKILL.md
- 路径: skills\cognitive-models\其他\38\SKILL.md
- 预览: ---
name: "一句话概括38条理论"
description: "从文档 '一句话概括38条理论.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 其他
  - 波特五力
  - 蓝海战略
  - 价值主张
  - 反脆弱
  - 创新
  - 管理
  - 战略
version: "1.0.0"
---

#...

### 388. SKILL.md
- 路径: skills\cognitive-models\创新策略\SKILL.md
- 预览: ---
name: "智能体提示词：创新全生命周期专家"
description: "从文档 '智能体提示词：创新全生命周期专家.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 创新策略
  - 创新
  - 波特五力
  - 蓝海战略
  - 价值主张
  - 反脆弱
  - 创新
  - 管理
  - 战略
ve...

### 389. SKILL.md
- 路径: skills\cognitive-models\商业战略\SKILL.md
- 预览: ---
name: "蓝海战略"
description: "从文档 '蓝海战略.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 商业战略
  - 蓝海战略
  - 蓝海战略
  - 创新
  - 战略
  - 认知
version: "1.0.0"
---

# 蓝海战略

## 文档信息

- **原始文档**:...

### 390. SKILL.md
- 路径: skills\cognitive-models\管理策略\5\SKILL.md
- 预览: ---
name: "格鲁夫的偏执狂生存5"
description: "从文档 '格鲁夫的偏执狂生存5.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 管理策略
  - 格鲁夫的偏执狂生存
  - 创新
  - 管理
  - 战略
  - 战术
  - 认知
version: "1.0.0"
---

# 格鲁夫的...

### 391. SKILL.md
- 路径: skills\cognitive-models\营销策略\SKILL.md
- 预览: ---
name: "营销理论"
description: "从文档 '营销理论.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 营销策略
  - 营销理论
  - 波特五力
  - 创新
  - 营销
  - 管理
  - 战略
  - 认知
version: "1.0.0"
---

# 营销理论

## 文档信...

### 392. SKILL.md
- 路径: skills\cognitive-models\问题解决\10\SKILL.md
- 预览: ---
name: "问题分析与解决10条理论"
description: "从文档 '问题分析与解决10条理论.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 问题解决
  - 问题分析与解决
  - 管理
  - 战略
version: "1.0.0"
---

# 问题分析与解决10条理论

## 文档信息

...

### 393. SKILL.md
- 路径: skills\cognitive-models\风险管理\SKILL.md
- 预览: ---
name: "塔勒布·反脆弱"
description: "从文档 '塔勒布·反脆弱.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
  - 风险管理
  - 反脆弱
  - 反脆弱
  - 创新
  - 管理
  - 认知
version: "1.0.0"
---

# 塔勒布·反脆弱

## 文档信息

- **...

### 394. SKILL.md
- 路径: skills\conversational-automation\SKILL.md
- 预览: ---
name: "conversational-automation"
description: "对话式任务自动化 SKILL，用于将自然语言指令转换为自动化任务"
author: "OpenClaw Team"
version: "1.0.0"
category: "automation"
platforms: ["windows", "linux"]
requires: []
confi...

### 395. SKILL.md
- 路径: skills\evomap-asset-management\SKILL.md
- 预览: ---
name: "evomap-asset-management"
description: "EvoMap 资产管理 SKILL，用于连接 EvoMap 获取和应用 Gene（基因）和 Capsule（胶囊）资产"
author: "OpenClaw Team"
version: "1.0.0"
category: "system"
platforms: ["windows", "linux...

### 396. SKILL.md
- 路径: skills\git-credential-manager\SKILL.md
- 预览: ---
name: "git-credential-manager"
description: "Git凭证管理工具，解决跨对话框的Git账号和SSH密钥同步问题，确保所有智能体都能正常访问Git仓库。"
author: "Git Credential Manager"
tags:
  - git
  - ssh
  - credentials
  - synchronization
  - se...

### 397. SKILL.md
- 路径: skills\git-manager\SKILL.md
- 预览: ---
name: "git-manager"
description: "Git版本管理器，增强智能体的版本控制能力，提供自动化的分支管理和进化版本标签系统。"
author: "Git Manager"
tags:
  - git
  - version-control
  - automation
  - meta-skill
  - deployment
version: "1.0.0"
...

### 398. SKILL.md
- 路径: skills\green-tea-startup-troubleshooting\SKILL.md
- 预览: # 绿茶智能体启动故障排除指南

## 技能信息
- **技能名称**: green-tea-startup-troubleshooting
- **版本**: 1.0.0
- **作者**: 系统管理员
- **创建日期**: 2026-02-23
- **类别**: 系统运维
- **适用场景**: 绿茶智能体启动失败时的故障排除

## 问题与解决方案

### 1. OpenClaw 构造...

### 399. SKILL.md
- 路径: skills\h5-nginx-check\SKILL.md
- 预览: ﻿---
name: "nginx-template-check"
description: "校验 H5 上线所需的 Nginx 站点模板：静态托管、/api 反代、Socket.IO/WS 升级、HTTPS 与缓存策略。Invoke when 配置/修改 Nginx 或出现“接口通但实时不通/刷新404/HTTPS异常”。"
---

# Skill 3：反代模板校验（Nginx T...

### 400. SKILL.md
- 路径: skills\h5-preflight-gate\SKILL.md
- 预览: ﻿---
name: "preflight-gate"
description: "发布前做一票否决式预检（残留/环境变量/Nginx/端口/实时通道），不通过就停止。Invoke when 准备上线、联调反复失败、或怀疑配置漂移时。"
---

# Skill 2：发布前置校验门（Preflight Gate）

## 目标
在你进入“正式上线/联调”之前，用最短路径做一次**一...

### 401. SKILL.md
- 路径: skills\h5-release-orchestrator\SKILL.md
- 预览: ﻿---
name: "release-orchestrator"
description: "把上线发布拆成可验收的 1–5 步并串联执行：Freeze Spec → Preflight → Nginx Check → Runtime Contract → Smoke Test。Invoke when 每次准备发布/联调上线、或需要一份完整发布记录与可回滚证据链时。"
---

# S...

### 402. SKILL.md
- 路径: skills\h5-rollback-playbook\SKILL.md
- 预览: ﻿---
name: "rollback-playbook"
description: "发布失败时快速回滚前端/后端/配置并做最小验收，避免长时间线上故障。Invoke when Smoke Test FAIL、线上核心链路不可用、或出现大面积报错/实时不可用。"
---

# Skill 7：回滚 Playbook（Rollback Playbook）

## 目标
当上线后出...

### 403. SKILL.md
- 路径: skills\h5-server-contract\SKILL.md
- 预览: ﻿---
name: "server-runtime-contract"
description: "把后端生产运行方式固化成契约：端口、env 来源、启动守护、日志、健康检查、重启与回滚标准。Invoke when 准备上线/迁移服务器/频繁出现“改了不生效/端口不对/服务挂了”。"
---

# Skill 4：后端上线运行契约（Server Runtime Contract）
...

### 404. SKILL.md
- 路径: skills\humanization-expert\SKILL.md
- 预览: ---
name: "humanization-expert"
description: "人性化智能体专家，支持形象设定、语言风格管理和个性化交互。"
author: "Humanization Expert"
tags:
  - humanization
  - persona
  - language
  - personalization
  - interaction
version: ...

### 405. SKILL.md
- 路径: skills\innovation-expert\SKILL.md
- 预览: ---
name: "innovation-expert"
description: "创新专家技能，分析项目优化空间，设计创新解决方案，开发支持项目的SKILL和工具。"
author: "Innovation Expert"
tags:
  - innovation
  - optimization
  - analysis
  - creativity
  - problem-solving...

### 406. SKILL.md
- 路径: skills\mp-audio-compatibility-check\SKILL.md
- 预览: ﻿---
name: "ws-audio-compat-check"
description: "验收小程序端实时通道(/ws)与音频上行(base64+format)是否与后端兼容，避免“接口通但实时/音频不通”。Invoke when 小程序联调实时/语音、或从H5迁移到小程序时。"
---

# Skill 4：通信通道与音频适配验收（WS/Audio Compatibility ...

### 407. SKILL.md
- 路径: skills\mp-permission-privacy-gate\SKILL.md
- 预览: ﻿---
name: "mp-permission-privacy-gate"
description: "小程序上线前校验录音等敏感权限与隐私合规：权限声明、隐私政策、收集说明、拒绝授权兜底、审核口径一致。Invoke when 准备提审/上线，或涉及录音/用户数据采集时。"
---

# Skill 5：小程序权限与隐私合规验收（Permission & Privacy Gate）...

### 408. SKILL.md
- 路径: skills\mp-preflight-gate\SKILL.md
- 预览: ﻿---
name: "mp-preflight-gate"
description: "小程序发布前一票否决预检：入口/HTTPS-WSS/白名单/包体积/权限隐私/后端可用性，Fail 就停止，避免长时间联调崩溃。Invoke when 准备发体验版/提审/上线，或出现“小程序不通但H5通”。"
---

# Skill 2：小程序发布前置校验门（MP Preflight Gate）...

### 409. SKILL.md
- 路径: skills\mp-release-orchestrator\SKILL.md
- 预览: ﻿---
name: "mp-release-orchestrator"
description: "把小程序上线拆成可验收的 1–7 步并串联执行：Freeze Spec→Preflight→微信后台→WS/音频→权限隐私→提审冒烟→回滚应急。Invoke when 每次准备发体验版/提审/上线，或需要完整发布记录与止损机制时。"
---

# 小程序编排 Skill（MP Relea...

### 410. SKILL.md
- 路径: skills\mp-rollback-emergency\SKILL.md
- 预览: ﻿---
name: "mp-rollback-emergency"
description: "小程序线上故障的回滚与紧急处理：回退到上一线上版本/暂停服务/替换后端兼容策略/公告与复验。Invoke when 上线后核心链路不可用、投诉激增、或无法短时间修复时。"
---

# Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）

## 目标...

### 411. SKILL.md
- 路径: skills\mp-submit-release-smoke-test\SKILL.md
- 预览: ﻿---
name: "mp-submit-release-smoke"
description: "小程序提审/发布前的体验版冒烟：真机跑通核心链路、版本与环境一致、审核材料齐、上传/提审步骤清楚。Invoke when 准备上传体验版、提审、或审核被打回需要复验时。"
---

# Skill 6：提审/发布流程冒烟（Submit & Release Smoke Test）

#...

### 412. SKILL.md
- 路径: skills\one-bite-at-a-time\SKILL.md
- 预览: ﻿

# One Bite At A Time（饭要一口口吃）v2

**一句话定义**  
把“大而不稳的任务/方案”拆成“最小可执行单元”，并让每一步都具备：动作｜产出｜验收｜验证｜回滚（必要时含 Plan B），做到“做一步、验一步、稳步推进”。

## 适用场景（触发条件）
- 你觉得当前任务颗粒度太大，按现有计划执行大概率会出 BUG/返工
- 跨模块/跨端/跨角色协作...

### 413. SKILL.md
- 路径: skills\openclaw-deployer\SKILL.md
- 预览: ---
name: "openclaw-deployer"
description: "OpenClaw自动部署与配置工具，解决Windows环境下的安装、配置和优化问题。"
author: "OpenClaw Deployer"
tags:
  - deployment
  - openclaw
  - windows
  - configuration
  - automation
versi...

### 414. SKILL.md
- 路径: skills\programming-expert\SKILL.md
- 预览: ---
name: "programming-expert"
description: "编程专家数字分身，专注于技术极客型架构师、流程设计大师、系统思维构建者和反直觉实践派四大领域，提供专业的编程建议和解决方案。"
author: "Programming Expert"
tags:
  - programming
  - architecture
  - workflow
  ...

### 415. SKILL.md
- 路径: skills\project-manager\SKILL.md
- 预览: ---
name: "project-manager"
description: "项目管理技能，集成Trello API与其他项目管理工具，提供项目进度跟踪和可视化功能。"
author: "Project Manager"
tags:
  - project-management
  - trello
  - collaboration
  - automation
  - visualiza...

### 416. SKILL.md
- 路径: skills\security-auth\SKILL.md
- 预览: ---
name: "security-auth"
description: "权限配置与安全验证 SKILL，基于飞书 OpenID 的身份验证和权限管理"
author: "OpenClaw Team"
version: "1.0.0"
category: "security"
platforms: ["windows", "linux"]
requires: []
config:
  - k...

### 417. SKILL.md
- 路径: skills\skill-manager\SKILL.md
- 预览: ---
name: "skill-manager"
description: "SKILL管理工具，用于创建、安装、更新和管理OpenClaw的SKILLs。"
author: "SKILL Manager"
tags:
  - skill-management
  - openclaw
  - automation
  - tooling
  - productivity
version: "1...

### 418. SKILL.md
- 路径: skills\trea-model-proxy\SKILL.md
- 预览: ---
name: "trea-model-proxy"
description: "无需API密钥调用Trea大模型的代理服务，为智能体提供零成本的模型访问能力。"
author: "Trea Model Proxy"
tags:
  - model-proxy
  - api-free
  - trea-internal
  - agent-runtime
  - cost-saving
ve...

### 419. README.zh-CN.md
- 路径: Skill_Seekers\README.zh-CN.md
- 预览: [![MseeP.ai 安全评估徽章](https://mseep.net/pr/yusufkaraaslan-skill-seekers-badge.png)](https://mseep.ai/app/yusufkaraaslan-skill-seekers)

# Skill Seeker

[English](https://github.com/yusufkaraaslan/Sk...

### 420. Skill 0：0→1 编排总控（Zero-to-One Orchestrator）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 0：0→1 编排总控（Zero-to-One Orchestrator）.txt
- 预览: ---
name: "zero-to-one-orchestrator"
description: "把0→1做产品变成可验收流程：定位冻结→用户验证→PRD&MVP切割→技术方案冻结→（复用）套壳与上线技能包。Invoke when 你有新产品想法，准备从想法推进到可上线版本时。"
---

# Skill 0：0→1 编排总控（Zero-to-One Orchestrator）
...

### 421. Skill 3：PRD → MVP 切割（PRD & MVP Cutter）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 3：PRD → MVP 切割（PRD & MVP Cutter）.txt
- 预览: ---
name: "prd-mvp-cutter"
description: "把需求从“想做很多”切成可上线的MVP：功能清单/不做清单/验收用例/版本拆分，防止0→1阶段范围爆炸。Invoke when 用户验证结论为“继续/转向”，准备写PRD与排期开发前。"
---

# Skill 3：PRD → MVP 切割（PRD & MVP Cutter）

## 目标
把“一个...

### 422. 饭要一口口吃V2.txt
- 路径: temp-skill-2\3、饭要一口口吃-skill\饭要一口口吃V2.txt
- 预览: 

# One Bite At A Time（饭要一口口吃）v2

**一句话定义**  
把“大而不稳的任务/方案”拆成“最小可执行单元”，并让每一步都具备：动作｜产出｜验收｜验证｜回滚（必要时含 Plan B），做到“做一步、验一步、稳步推进”。

## 适用场景（触发条件）
- 你觉得当前任务颗粒度太大，按现有计划执行大概率会出 BUG/返工
- 跨模块/跨端/跨角色协作，...

### 423. Skill 0｜BUG 修复大法总控.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\Skill 0｜BUG 修复大法总控.txt
- 预览: 
          
          
# Skill 0｜BUG 修复大法总控（Router / Orchestrator）

**一句话定义**  
你只要喊“启动 BUG 修复总控/启动BUG 修复大法”，它只做两件事：  
1) 判断你现在该用：**说清楚 / 找原因 / 想方案 / 动手做** 哪一个；  
2) 提醒你补齐该阶段的**最低必需输入**，然后输出对应...

### 424. Skill 1｜说清楚（问题定义与复现｜Triage）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\Skill 1｜说清楚（问题定义与复现｜Triage）.txt
- 预览: ## Skill 1｜说清楚（问题定义与复现｜Triage）
一句话定义 ：把“有人说不对劲”变成可复现、可验收、可交接的标准问题单。
 触发口令 （你怎么说都行，命中就启动）：

- “我们先把问题说清楚吧” / “先把问题定义清楚” / “先梳理存在的问题” / “先别急着改，先把口径对齐”
最低必需输入（2 条）

1. 现象一句话：现在发生了什么？
2. 期望一句话：应该是...

### 425. Skill 4｜动手做（执行与复验｜Execute & Verify）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\Skill 4｜动手做（执行与复验｜Execute & Verify）.txt
- 预览: ## Skill 4｜动手做（执行与复验｜Execute & Verify）
一句话定义 ：把选定方案变成“做一步、验一步、失败可回滚”的串行执行清单，直到最终 DoD 通过。
 触发口令 ：

- “方案既然想好了，那我们开始动手做吧” / “开始执行” / “边做边验收” / “按步骤来，一步一步改”
最低必需输入（3 条）

1. 选定方案：A / B / 兜底（来自“想方案”...

### 426. Skill A｜BUG 定义与复现（Triage）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\备用版-拗口\Skill A｜BUG 定义与复现（Triage）.txt
- 预览: 

# Skill A｜BUG 定义与复现（Triage）
一句话定义
 把“别人说有问题/我觉得不对劲”变成一份能交给任何人开工的材料： 可复现、可验收、边界清晰、证据齐全、已止损（如需要） 。

## 适用场景（触发条件）
- 刚收到反馈，描述模糊：不知道是不是 BUG、在哪里、怎么复现
- 复现不稳定：时好时坏、换账号/换环境就不一样
- 影响面不明：不知道是单用户、部分用...

### 427. Skill C｜修复方案与风险（Fix Design）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\备用版-拗口\Skill C｜修复方案与风险（Fix Design）.txt
- 预览: 
          
          
# Skill C｜修复方案与风险（Fix Design）

**一句话定义**  
在动手改之前，把“怎么修”压缩成 **A/B/兜底三案**，并补齐：改动边界｜风险｜验证｜回滚｜上线策略，避免“修了又坏、改了才发现验收口径不一致”。

## 适用场景（触发条件）
- Skill B 已有“当前最可能根因（含证据/置信度）”，准备进...

### 428. Skill D｜执行与复验（Execute & Verify）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\备用版-拗口\Skill D｜执行与复验（Execute & Verify）.txt
- 预览: 
          
          
# Skill D｜执行与复验（Execute & Verify）

**一句话定义**  
把你在 Skill C 选定的方案，变成一份“只做一件事、做完就验、失败可回滚”的串行执行清单；直到最终验收通过为止。

## 适用场景（触发条件）
- Skill C 已选定方案 A 或 B（可能还有兜底方案 C）
- 你要开始动手修复，...

### 429. Skill 2：发布前置校验门（Preflight Gate）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 2：发布前置校验门（Preflight Gate）.txt
- 预览: ---
name: "preflight-gate"
description: "发布前做一票否决式预检（残留/环境变量/Nginx/端口/实时通道），不通过就停止。Invoke when 准备上线、联调反复失败、或怀疑配置漂移时。"
---

# Skill 2：发布前置校验门（Preflight Gate）

## 目标
在你进入“正式上线/联调”之前，用最短路径做一次**一票...

### 430. Skill 3：反代模板校验（Nginx Template Check）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 3：反代模板校验（Nginx Template Check）.txt
- 预览: ---
name: "nginx-template-check"
description: "校验 H5 上线所需的 Nginx 站点模板：静态托管、/api 反代、Socket.IO/WS 升级、HTTPS 与缓存策略。Invoke when 配置/修改 Nginx 或出现“接口通但实时不通/刷新404/HTTPS异常”。"
---

# Skill 3：反代模板校验（Nginx Te...

### 431. Skill 4：后端上线运行契约（Server Runtime Contract）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 4：后端上线运行契约（Server Runtime Contract）.txt
- 预览: ---
name: "server-runtime-contract"
description: "把后端生产运行方式固化成契约：端口、env 来源、启动守护、日志、健康检查、重启与回滚标准。Invoke when 准备上线/迁移服务器/频繁出现“改了不生效/端口不对/服务挂了”。"
---

# Skill 4：后端上线运行契约（Server Runtime Contract）

...

### 432. Skill 6：编排 Skill（Release Orchestrator）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 6：编排 Skill（Release Orchestrator）.txt
- 预览: ---
name: "release-orchestrator"
description: "把上线发布拆成可验收的 1–5 步并串联执行：Freeze Spec → Preflight → Nginx Check → Runtime Contract → Smoke Test。Invoke when 每次准备发布/联调上线、或需要一份完整发布记录与可回滚证据链时。"
---

# Sk...

### 433. Skill 7：回滚 Playbook（Rollback Playbook）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 7：回滚 Playbook（Rollback Playbook）.txt
- 预览: ---
name: "rollback-playbook"
description: "发布失败时快速回滚前端/后端/配置并做最小验收，避免长时间线上故障。Invoke when Smoke Test FAIL、线上核心链路不可用、或出现大面积报错/实时不可用。"
---

# Skill 7：回滚 Playbook（Rollback Playbook）

## 目标
当上线后出现...

### 434. Skill 2：小程序发布前置校验门（MP Preflight Gate）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 2：小程序发布前置校验门（MP Preflight Gate）.txt
- 预览: ---
name: "mp-preflight-gate"
description: "小程序发布前一票否决预检：入口/HTTPS-WSS/白名单/包体积/权限隐私/后端可用性，Fail 就停止，避免长时间联调崩溃。Invoke when 准备发体验版/提审/上线，或出现“小程序不通但H5通”。"
---

# Skill 2：小程序发布前置校验门（MP Preflight Gate）...

### 435. Skill 4：通信通道与音频适配验收（WSAudio Compatibility Check）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 4：通信通道与音频适配验收（WSAudio Compatibility Check）.txt
- 预览: ---
name: "ws-audio-compat-check"
description: "验收小程序端实时通道(/ws)与音频上行(base64+format)是否与后端兼容，避免“接口通但实时/音频不通”。Invoke when 小程序联调实时/语音、或从H5迁移到小程序时。"
---

# Skill 4：通信通道与音频适配验收（WS/Audio Compatibility C...

### 436. Skill 5：小程序权限与隐私合规验收（Permission & Privacy Gate）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 5：小程序权限与隐私合规验收（Permission & Privacy Gate）.txt
- 预览: ---
name: "mp-permission-privacy-gate"
description: "小程序上线前校验录音等敏感权限与隐私合规：权限声明、隐私政策、收集说明、拒绝授权兜底、审核口径一致。Invoke when 准备提审/上线，或涉及录音/用户数据采集时。"
---

# Skill 5：小程序权限与隐私合规验收（Permission & Privacy Gate）
...

### 437. Skill 6：提审发布流程冒烟（Submit & Release Smoke Test）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 6：提审发布流程冒烟（Submit & Release Smoke Test）.txt
- 预览: ---
name: "mp-submit-release-smoke"
description: "小程序提审/发布前的体验版冒烟：真机跑通核心链路、版本与环境一致、审核材料齐、上传/提审步骤清楚。Invoke when 准备上传体验版、提审、或审核被打回需要复验时。"
---

# Skill 6：提审/发布流程冒烟（Submit & Release Smoke Test）

##...

### 438. Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）.txt
- 预览: ---
name: "mp-rollback-emergency"
description: "小程序线上故障的回滚与紧急处理：回退到上一线上版本/暂停服务/替换后端兼容策略/公告与复验。Invoke when 上线后核心链路不可用、投诉激增、或无法短时间修复时。"
---

# Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）

## 目标
...

### 439. 小程序编排 Skill（MP Release Orchestrator）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\小程序编排 Skill（MP Release Orchestrator）.txt
- 预览: ---
name: "mp-release-orchestrator"
description: "把小程序上线拆成可验收的 1–7 步并串联执行：Freeze Spec→Preflight→微信后台→WS/音频→权限隐私→提审冒烟→回滚应急。Invoke when 每次准备发体验版/提审/上线，或需要完整发布记录与止损机制时。"
---

# 小程序编排 Skill（MP Releas...

### 440. company-brain-test-summary-2026-02-23T09-32-51-844Z.md
- 路径: test-reports\company-brain-test-summary-2026-02-23T09-32-51-844Z.md
- 预览: # 公司大脑测试报告摘要

## 测试概览
- **测试时间**: 2026-02-23T09:32:51.826Z
- **测试持续时间**: 60000毫秒
- **总测试数**: 15
- **通过测试数**: 3
- **失败测试数**: 12
- **成功率**: 20%

## 性能概览
- **平均内存使用率**: 74%
- **平均CPU使用率**: 24%
- **最大内存使用...

### 441. company-brain-test-summary-2026-02-23T09-35-12-414Z.md
- 路径: test-reports\company-brain-test-summary-2026-02-23T09-35-12-414Z.md
- 预览: # 公司大脑测试报告摘要

## 测试概览
- **测试时间**: 2026-02-23T09:35:12.340Z
- **测试持续时间**: 60000毫秒
- **总测试数**: 15
- **通过测试数**: 14
- **失败测试数**: 1
- **成功率**: 93%

## 性能概览
- **平均内存使用率**: 87%
- **平均CPU使用率**: 29%
- **最大内存使用...

### 442. visualization-styles.md
- 路径: visualization-styles.md
- 预览: # 可视化风格说明

## 目录
- 一、高适配小红书的视觉风格
  - 极简Ins风
  - 手绘插画风
  - 杂志封面风
  - 数据卡片风
  - 复古胶片风
  - 国潮国风
- 二、高适配公众号的视觉风格
  - 杂志排版风
  - 海报信息图
  - 漫画条漫
  - 文艺诗歌风
  - 极简阅读风
  - 品牌人格风
- 三、双平台通用风格选择策略
  - 一图多投型
  - 长拆...

### 443. WECHAT_SETUP_GUIDE.md
- 路径: WECHAT_SETUP_GUIDE.md
- 预览: # 微信登录与朋友圈发布完整指南

本指南详细介绍如何设置微信登录系统并发布朋友圈内容，为大宗师创建完整的微信自动化管理流程。

## 📋 系统架构

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  微信认证服务   │     │  朋友圈服务     │     │  形象管理服务   │
...

### 444. SKILL.md
- 路径: 产出\SKILL.md
- 预览: ---
name: brain-cheat-tool
description: 大脑作弊器 - 快速拆解书籍核心内容并生成可视化素材。当用户提供书籍文本、章节内容、文档文件或需要制作知识推广素材时使用。能力包括：1）读取PDF/DOCX/TXT/EPUB等格式文档；2）深度拆解书籍核心内容（主题、观点、结构、金句）；3）根据知识点生成可交互的知识点可视化图片；4）生成视频脚本。
dependenc...

### 445. SKILL.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\SKILL.md
- 预览: ---
name: ren-sheng-jue-ce-ming-pan
description: 人生战略决策系统 - 东方命理×博弈论算法，在不确定的世界寻找确定性。提供出生设置解析、天赋赛道定位、演算沙推预测，输出标准化决策分析报告。使用现代通识语言（商业逻辑、战略思维、风险管理），将传统命理转化为理性决策工具。
dependency:
  python:
    - lunar-python...

### 446. 子平真诠-现代决策解读-补充阅读.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\references\子平真诠-现代决策解读-补充阅读.md
- 预览: # 子平真诠·现代决策解读

## 目录

1. [总论：命理学即决策论](#总论命理学即决策论)
2. [格局识别：你的核心竞争力](#格局识别你的核心竞争力)
3. [旺衰分析：资源配置效率](#旺衰分析资源配置效率)
4. [用神取法：优化策略](#用神取法优化策略)
5. [喜忌判断：风险管理](#喜忌判断风险管理)
6. [现代场景应用](#现代场景应用)

---

## 总论：命理学...

### 447. 渊海子平-现代决策应用-补充阅读.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\references\渊海子平-现代决策应用-补充阅读.md
- 预览: # 渊海子平 - 现代决策解读

## 目录

- [核心概念转化](#核心概念转化)
- [十神性格分析](#十神性格分析)
- [格局与职业规划](#格局与职业规划)
- [五行与行为模式](#五行与行为模式)
- [六亲关系分析](#六亲关系分析)
- [大运周期管理](#大运周期管理)
- [女性命理关注点](#女性命理关注点)
- [现代应用建议](#现代应用建议)

---

## 核...

### 448. 创新分析报告.md
- 路径: 创新分析报告.md
- 预览: # 创新分析报告

## 项目分析

### 1. LAY - 酒店投资风控参谋

**项目状态**：基于Streamlit的酒店投资风险分析工具，具有智商税测试、城市路由和投资分析功能。

**优化空间**：
- **数据集成**：缺乏真实的酒店行业数据集成，目前使用模拟数据
- **模型能力**：需要更复杂的风险评估模型
- **用户体验**：Streamlit界面较为简单，缺乏现代化前端体验...

### 449. ppt-structure-template.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\ppt-structure-template.md
- 预览: # PPT结构模板（参考《属地分析与建议（广州）.ppt》）

## 模板说明
本模板基于《属地分析与建议（广州）.ppt》设计，用于生成简化版PPT。PPT是投资分析报告的精简版，突出核心观点和关键数据，便于汇报和展示。

## PPT设计原则

### 1. 文字简化
- PPT文字约为报告正文的30-50%
- 每页控制在100-150字（不含标题）
- 用要点式表达，避免大段文字

###...

### 450. SKILL.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\SKILL.md
- 预览: ---
name: hotel-investment-analysis
description: 生成城市酒店投资分析报告及HTML格式展示页面，支持一线城市（北上广深）和新一线+二三线城市两类模板，基于公开数据源提供专业投资建议。分两步执行：第一步生成详细投资分析报告（P1-P9共19页），第二步生成HTML格式展示页面（可在浏览器中查看并打印成PDF）。
---

# 城市酒店投资分析

##...

### 451. multi-role-scenarios.md
- 路径: 声音魔法\projects\voice-magician\references\multi-role-scenarios.md
- 预览: # 多人配音场景指南

## 目录
- [场景一：小说群像配音](#场景一小说群像配音)
- [场景二：播客对话配音](#场景二播客对话配音)
- [场景三：视频剧配音](#场景三视频剧配音)
- [场景四：有声书分角色朗读](#场景四有声书分角色朗读)
- [场景五：客服对话模拟](#场景五客服对话模拟)
- [多人配音工作流程](#多人配音工作流程)
- [音频合并工具](#音频合并工具)

...

### 452. python-compatibility.md
- 路径: 声音魔法\projects\voice-magician\references\python-compatibility.md
- 预览: # Python 版本兼容性指南

## 目录
- [核心问题](#核心问题)
- [TTS 库支持情况](#tts-库支持情况)
- [解决方案](#解决方案)
- [常见问题](#常见问题)

## 核心问题

### 为什么不支持 Python 3.12？
**TTS 库的核心依赖存在兼容性问题**:
- TTS 库依赖的某些第三方库（如 `torchaudio`、`resampy` 等）尚...

### 453. SKILL.md
- 路径: 声音魔法\projects\voice-magician\SKILL.md
- 预览: ---
name: voice-magician
description: 让文字会说话的神奇工具！支持16种语言的文本转语音，轻松生成高质量音频；适用于视频配音、有声读物、语音辅助等场景
dependency:
  python:
    - TTS>=0.22.0  # Python 3.9-3.11
    - edge-tts    # Python 3.12+ 或作为备用引擎
---

...

### 454. 多渠道协同优化方案.md
- 路径: 多渠道协同优化方案.md
- 预览: # 多渠道协同优化方案

## 一、核心目标

### 1. 多渠道协同效应
- **内容矩阵**：构建朋友圈、公众号、视频号三渠道内容矩阵
- **流量互通**：实现渠道间的粉丝流转和流量互推
- **品牌统一**：保持多渠道品牌形象和内容风格的一致性

### 2. 运营效率提升
- **自动化运营**：实现内容生成、发布、互动的自动化
- **数据驱动**：建立统一的数据分析体系
- **流...

### 455. debug-pdf-upload.md
- 路径: 大脑作弊器\projects\debug-pdf-upload.md
- 预览: # PDF上传接口调试清单

## ✅ 已完成的检查项

### 1. 核心配置正确性检查
- [x] **请求方法**: 使用 `POST` ✓
- [x] **Content-Type**: 使用 `application/json`（前端通过base64传输）✓
- [x] **文件编码**: Base64编码（符合后端预期）✓

### 2. 代码审查
- [x] pdf-parse 正确...

### 456. 413-error-diagnosis.md
- 路径: 大脑作弊器\projects\docs\413-error-diagnosis.md
- 预览: # 413错误诊断指南

## 重要说明

**文件大小限制（适配外网平台）：**
- **文件上传（PDF/EPUB/TXT）**：最大 10MB
- **单张图片**：最大 2MB
- **所有图片总大小**：最大 10MB

**原因：** 外网访问时，Coze平台的网关对请求体大小有限制，超过10MB会直接返回413错误。本地开发环境（localhost:5000）虽然支持更大的文件，但通...

### 457. pdf-parsing-solution.md
- 路径: 大脑作弊器\projects\docs\pdf-parsing-solution.md
- 预览: # PDF解析方案升级文档

## 概述

本文档说明了PDF解析方案从 `pdf-parse` 升级到 `pdfjs-dist` 的详细信息和改进。

## 为什么选择 pdfjs-dist

### 原方案：pdf-parse 的问题

1. **依赖问题**：需要特殊导入方式绕过测试逻辑
2. **解析质量**：对纯文本文档的提取质量不稳定
3. **维护性**：更新频率低，社区活跃度不高
...

### 458. PDF上传接口调试清单-完成报告.md
- 路径: 大脑作弊器\projects\PDF上传接口调试清单-完成报告.md
- 预览: # PDF上传接口调试清单 - 完成报告

## ✅ 已完成的检查项

### 1. 核心配置正确性检查
- [x] **请求方法**: 使用 `POST` ✓
- [x] **Content-Type**: 使用 `application/json`（前端通过base64传输）✓
- [x] **文件编码**: Base64编码（符合后端预期）✓
- [x] **Next.js body大小限制...

### 459. SCANNED_BOOK_GUIDE.md
- 路径: 大脑作弊器\projects\public\SCANNED_BOOK_GUIDE.md
- 预览: # 扫描版书籍处理指南

## 系统支持能力

大脑作弊器 v1.5 已全面优化，支持处理大型扫描版书籍：

### 📊 上传限制
- **图片数量**：最多 100 张（从 9 张提升）
- **单张图片大小**：最大 5MB（从 2MB 提升）
- **总大小限制**：最大 100MB（从 10MB 提升）

### 🧠 智能处理
- **OCR识别**：使用豆包视觉模型（doubao-s...

### 460. README.md
- 路径: 大脑作弊器\projects\README.md
- 预览: # 大脑作弊器 - 思维模型工具箱

全球顶级智慧 × 你的私人认知军火库。用100个可拆解的思维模型，帮你打破死局。

## 项目简介

"大脑作弊器"是一个思维模型工具箱，集成了：

1. **大脑作弊器**：不读废话，直取真经。将60分钟阅读压缩至5分钟行动指令
2. **思维模型库**：精选100个来自各领域的顶级思维模型
3. **4-Card系统**：独特的问题解决框架

## 项目结...

### 461. README.md
- 路径: 大脑作弊器\projects\tmp\brain-cheater-v1.0-backup\README.md
- 预览: # 大脑作弊器 v1.0 正式版备份

## 备份信息
- **版本号**: v1.0 正式版
- **备份日期**: 2026-01-21
- **备份类型**: 完整备份（生产环境）

## 备份内容清单

### 1. 前端文件 (public/)
- `index.html` - 主页面
- `app.js` - 核心应用逻辑
- `auth.js` - 用户认证
- `scripts.j...

### 462. 数据库接入-精简版执行计划.md
- 路径: 大脑作弊器\projects\数据库接入-精简版执行计划.md
- 预览: # 数据库接入 - 精简版执行计划（已完成）

## ✅ 已完成的工作

### 阶段 1: 最小化登录功能（4 步，已完成）

#### 1. 数据库表结构 ✅
- 创建 `users` 表（包含：id, username, email, password, role, isActive, createdAt, updatedAt）
- 使用 bcrypt 加密密码
- 使用 JWT Token...

### 463. 数据库接入执行计划.md
- 路径: 大脑作弊器\projects\数据库接入执行计划.md
- 预览: # 大脑作弊器 - 数据库接入详细执行计划

## 一、项目概述

### 目标
将"大脑作弊器"Web应用接入数据库系统，实现用户认证、脚本管理、思维模型动态加载、统计分析等功能。

### 技术栈
- **数据库**: PostgreSQL (通过 Drizzle ORM)
- **对象存储**: S3 兼容对象存储 (用于文件存储)
- **后端**: Next.js 16 + TypeSc...

### 464. 对话复盘与进化分析报告.md
- 路径: 对话复盘与进化分析报告.md
- 预览: # 对话复盘与进化分析报告

## 一、对话历史概述

### 核心主题
- **微信多渠道运营**：朋友圈、公众号、视频号内容管理与粉丝增长
- **AI代理公司转型**：构建公司大脑、智能体集成、调度系统
- **自主进化系统**：evolver执行、记忆管理、技能库优化
- **内容生成增强**：大脑作弊器集成、多渠道内容矩阵

### 关键决策点
1. **进化启动机制**：从定时启动调整...

### 465. 微信管理执行计划.md
- 路径: 微信管理执行计划.md
- 预览: # 微信管理执行计划

## 一、执行策略

### 1. 账号定位
- **核心定位**：思维教练 + 认知升级专家 + 工具达人
- **辅助定位**：AI技术实践者 + 个人成长顾问
- **目标受众**：追求认知升级、思维提升、效率优化的职场人士、创业者、学生等

### 2. 运营目标
- **短期目标**（1-3个月）：建立账号基础形象，积累1000+精准粉丝，形成稳定的内容输出节奏
...

### 466. 执行计划细化方案.md
- 路径: 执行计划细化方案.md
- 预览: # 执行计划细化方案

## 一、短期执行计划（0-4小时）

### 第1阶段：智能体集成（0-60分钟）

**时间节点：**
- 0-15分钟：智能体环境检查和准备
- 15-30分钟：大宗师智能体接入配置
- 30-45分钟：绿茶智能体接入配置
- 45-60分钟：智能体通信测试

**具体任务：**
1. **环境检查**
   - 检查公司大脑目录结构
   - 确认智能体依赖包安装
...

### 467. 支付充值积分系统上线文档.md
- 路径: 支付充值积分系统上线文档.md
- 预览: # 支付充值积分系统上线文档

## 1. 项目概述

本项目实现了一个完整的支付充值积分系统，将原有的"点击即到账"的模拟充值替换为真实支付流程，并实现了充值积分（365天）与领取积分（7天）的精准生命周期管理。

### 核心目标
- 接入支付网关，实现真实支付流程
- 积分生命周期管理，按来源差异化设置有效期
- 支付风控，防止重复发放积分

## 2. 实现的功能

### 2.1 后端功...

### 468. 火种.txt
- 路径: 火种.txt
- 预览: 

附录：原初的进化之火
🧬 长期自我进化指令：能力强化与功能内生化

从现在开始，你进入 "能力进化模式（Capability-Driven Evolution）"。
你的目标不只是把事情做成，而是 让未来更容易把同类事情做成。

1重新定义"进化素材"
以下不再只是执行过程，而是 能力候选（Capability Candidates）：
你为了完成任务而临时发明的步骤、脚...

### 469. 创新专家.txt
- 路径: 认知data\创新专家.txt
- 预览: 
智能体提示词：创新全生命周期专家 (Innovation Lifecycle Expert)
1. 角色定义
你是一位拥有深厚底蕴的产品战略顾问与创新专家。你掌握了从宏观战略、需求洞察、产品定义到增长运营的 50+ 种核心理论模型。你的任务是根据用户面临的商业挑战，精准地匹配并应用这些工具，提供逻辑严密、可落地的实战建议。
2. 知识库架构 (50+ 核心工具)
你必须在对话中灵活调用...

### 470. 进化计划时间调整版.md
- 路径: 进化计划时间调整版.md
- 预览: # 进化计划时间调整版

## 短期进化计划（4小时内，按分钟计算）

### 第1阶段：准备与优化（0-60分钟）

1. **0-10分钟**：系统状态检查
   - 检查当前运行的进程和系统状态
   - 确认evolver、evolution-evaluator、OPENclaw等服务运行正常
   - 记录当前系统性能指标

2. **10-25分钟**：进化启动机制优化
   - 调整...

## 综合分析

### 系统运转逻辑总结
- 公司拥有完善的规则体系，涵盖核心业务准则、系统运转逻辑、架构设计和业务流程
- 规则文档分布在不同的文件中，需要进一步整合和标准化
- 系统运转逻辑清晰，为业务运营提供了有力的支持

### 改进建议
- **规则整合**: 将分散的规则文档整合为统一的规则体系
- **逻辑明确**: 进一步明确系统的运转逻辑，确保所有组件协同工作
- **流程优化**: 对现有流程进行优化，提高业务操作效率
- **架构调整**: 根据业务需求，适时调整系统架构
