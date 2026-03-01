# 文档资产盘点报告

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
- **other**: 1498

## 文档列表

### rule (291)

#### htp-analysis-framework.md
- 路径: .agents\skills\htp-insight\references\htp-analysis-framework.md
- 大小: 13295 字节
- 行数: 949
- 预览: # HTP 房树人分析框架

## 目录

### 核心维度
- [整体布局维度](#整体布局维度)
- [房子特征维度](#房子特征维度)
- [树木特征维度](#树木特征维度)
- [人物特征维度...

#### publish.md
- 路径: .claude\skills\oh-my-opencode-dev\.opencode\command\publish.md
- 大小: 9462 字节
- 行数: 314
- 预览: ---
description: Publish oh-my-opencode to npm via GitHub Actions workflow
argument-hint: <patch|min...

#### CONTRIBUTING.md
- 路径: .claude\skills\oh-my-opencode-dev\CONTRIBUTING.md
- 大小: 8273 字节
- 行数: 269
- 预览: # Contributing to Oh My OpenCode

First off, thanks for taking the time to contribute! This document...

#### features.md
- 路径: .claude\skills\oh-my-opencode-dev\docs\features.md
- 大小: 19587 字节
- 行数: 622
- 预览: # Oh-My-OpenCode Features

---

## Agents: Your AI Team

Oh-My-OpenCode provides 10 specialized AI a...

#### README.zh-cn.md
- 路径: .claude\skills\oh-my-opencode-dev\README.zh-cn.md
- 大小: 12613 字节
- 行数: 383
- 预览: > [!WARNING]
> **安全警告：冒充网站**
>
> **ohmyopencode.com 与本项目无关。** 我们不运营或认可该网站。
>
> OhMyOpenCode 是**免费且开源...

#### installation.md
- 路径: .claude\skills\oh-my-opencode-dev\src\features\builtin-skills\dev-browser\references\installation.md
- 大小: 4514 字节
- 行数: 194
- 预览: # Dev Browser Installation Guide

This guide covers installation for all platforms: macOS, Linux, an...

#### README.md
- 路径: .claude\skills\openwork-dev\packages\owpenbot\README.md
- 大小: 2811 字节
- 行数: 113
- 预览: # Owpenbot

Simple WhatsApp bridge for a running OpenCode server. Telegram support exists but is not...

#### SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\SKILL.md
- 大小: 2082 字节
- 行数: 107
- 预览: ---
name: image-assistant
description: 配图助手 - 把文章/模块内容转成统一风格、少字高可读的 16:9 信息图提示词；先定“需要几张图+每张讲什么”，再压缩文...

#### 02-plan.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\stages\02-plan.md
- 大小: 1028 字节
- 行数: 46
- 预览: # 阶段2：配图规划（要几张图？每张讲什么？）

**目标：** 基于阶段1已确认的规格（图类型/文字预算/用途），先“拆内容→定图清单→选版式”，避免一张图塞太多导致难看难读。

## 规划原则（核...

#### 03-copy.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\stages\03-copy.md
- 大小: 988 字节
- 行数: 47
- 预览: # 阶段3：文案定稿（Copy Spec：唯一真值）

**目标：** 把内容变成“上图文案规格表（Copy Spec）”：逐字定稿 + 字数预算 + 区域结构。阶段4只负责“封装成提示词”，不再改文...

#### 04-prompts.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\stages\04-prompts.md
- 大小: 2813 字节
- 行数: 92
- 预览: # 阶段4：提示词封装（Prompt Pack：可执行生成包）

**目标：** 把阶段3的 Copy Spec 原样封装成"可复制/可调用"的提示词包（Prompt Pack），并支持批量出图。阶段...

#### 16x9-infographic.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\16x9-infographic.md
- 大小: 207 字节
- 行数: 19
- 预览: # 16:9 通用信息图模板（骨架）

把 {占位符} 替换成你的内容：

标题（顶部大字）：{标题}
副标题（小字）：{副标题（可选，尽量短）}

主体：{版式类型：对比/流程/卡片/漫画}
- 画...

#### prd-template.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\assets\prd-template.md
- 大小: 1801 字节
- 行数: 87
- 预览: ```markdown
# 产品需求文档：[项目/功能名称] - V[版本号]

## 1. 综述 (Overview)
### 1.1 项目背景与核心问题
(此处填写经你引导和用户确认的，对顶层问题...

#### example-us01.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\references\example-us01.md
- 大小: 2045 字节
- 行数: 51
- 预览: ## 示例：填写参考
以下示例用真实内容演示每个模块应达到的深度，便于你在生成PRD时对齐预期格式和颗粒度。

```markdown
### 阶段一：任务提交

#### **US-01: 作为PO...

#### prd-registry-demo.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\references\prd-registry-demo.md
- 大小: 805 字节
- 行数: 13
- 预览: # PRD 总集（示例）

用法约定：
- 每新增一个 PRD，就新增一行，给它一个固定的“版本号”（这里作为总集里的唯一标识，不再变）。
- 单个 PRD 文档内部如果需要迭代，用 `v0.1 / ...

#### SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\SKILL.md
- 大小: 4182 字节
- 行数: 90
- 预览: ---
name: prd-doc-writer
description: Write and iteratively refine PRD/需求文档 with a story-driven stru...

#### SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\SKILL.md
- 大小: 1252 字节
- 行数: 73
- 预览: ---
name: thought-mining
description: 思维挖掘助手 - 通过对话帮助用户把脑子里的零散想法倒出来、记录下来、整理成文章。覆盖从思维挖掘到成稿的完整流程。
---
...

#### assets.json
- 路径: .trae\asset-inventory\assets.json
- 大小: 1772567 字节
- 行数: 40337
- 预览: {
  "agents": [
    {
      "id": "builder",
      "name": "builder",
      "path": "C:\\Users\\1091...

#### report_1771967101419.json
- 路径: .trae\asset-inventory\report_1771967101419.json
- 大小: 1853910 字节
- 行数: 40370
- 预览: {
  "timestamp": "2026-02-24T21:05:01.416Z",
  "assets": {
    "agents": [
      {
        "id": "bu...

#### capability-tree-1771948559610.json
- 路径: .trae\capability-tree\capability-tree-1771948559610.json
- 大小: 10270 字节
- 行数: 465
- 预览: {
  "id": "cap_1771948559462_ebfouhxmx",
  "name": "能力树根部",
  "level": 0,
  "inputs": [],
  "outputs...

#### capability-tree-1771950622455.json
- 路径: .trae\capability-tree\capability-tree-1771950622455.json
- 大小: 10270 字节
- 行数: 465
- 预览: {
  "id": "cap_1771950622281_dr2gvakh0",
  "name": "能力树根部",
  "level": 0,
  "inputs": [],
  "outputs...

#### capability-tree-1771950626369.json
- 路径: .trae\capability-tree\capability-tree-1771950626369.json
- 大小: 10270 字节
- 行数: 465
- 预览: {
  "id": "cap_1771950626260_1sxpqbttm",
  "name": "能力树根部",
  "level": 0,
  "inputs": [],
  "outputs...

#### adl_compatibility_analysis.md
- 路径: .trae\documents\adl_compatibility_analysis.md
- 大小: 4348 字节
- 行数: 237
- 预览: # 能力树与反进化锁定协议 (ADL) 兼容性分析报告

## 1. 分析概述

本报告旨在分析现有能力树系统与反进化锁定协议 (ADL) 的兼容性，识别潜在的冲突点，并提出集成策略。

## 2. ...

#### adl_integration_plan.md
- 路径: .trae\documents\adl_integration_plan.md
- 大小: 5756 字节
- 行数: 253
- 预览: # 反进化锁定协议 (ADL) 集成计划

## 1. 项目概述

本计划旨在将其他智能体反馈的反进化锁定协议 (Anti-Degeneration Lock Protocol) 集成到现有的能力树系...

#### architecture-design.md
- 路径: .trae\documents\architecture-design.md
- 大小: 15014 字节
- 行数: 705
- 预览: # 公司大脑项目 - 架构设计文档

## 1. 架构概述

### 1.1 设计目标
- **统一智能体管理**: 集中管理所有智能体的任务分配和执行
- **知识中心**: 作为公司规则、制度和文...

#### capability-system-architecture-analysis.md
- 路径: .trae\documents\capability-system-architecture-analysis.md
- 大小: 5562 字节
- 行数: 221
- 预览: # 能力系统架构分析

## 1. 现有系统架构

### 1.1 核心组件

#### 1.1.1 能力树 (`capabilities/capability-tree.js`)
- **功能**:...

#### capability-tree_plan.md
- 路径: .trae\documents\capability-tree_plan.md
- 大小: 5249 字节
- 行数: 213
- 预览: # 能力树结构化指令（Capability Tree Formation） - 实现计划

## 项目背景

能力树结构化指令要求将智能体的能力视为一棵持续生长的能力树，而不是零散技巧。每个能力节点必...

#### capability_tree_implementation_plan.md
- 路径: .trae\documents\capability_tree_implementation_plan.md
- 大小: 3741 字节
- 行数: 199
- 预览: # 能力树实现计划文档

## 1. 能力树结构概览

### 1.1 整体架构
- **根节点**：能力树根部 (L0)
- **层级分布**：
  - 低层节点 (L1)：基础操作 / 稳定工具使...

#### company-assets-plan.md
- 路径: .trae\documents\company-assets-plan.md
- 大小: 3215 字节
- 行数: 161
- 预览: # 公司文档资产盘点与系统进化计划

## [/] 任务 1: 全面盘点公司文档资产
- **优先级**: P0
- **依赖**: 无
- **描述**:
  - 扫描C:\Users\10919\...

#### company-brain-plan.md
- 路径: .trae\documents\company-brain-plan.md
- 大小: 3671 字节
- 行数: 189
- 预览: # 公司大脑项目 - 实施计划

## 项目概述
在Trea平台上建立公司大脑作为智能体调度中心，管理公司规则、制度和文件，指导所有智能体（如大宗师、绿茶等）的工作。

## 实施阶段

### [x...

#### environment-analysis.md
- 路径: .trae\documents\environment-analysis.md
- 大小: 4641 字节
- 行数: 240
- 预览: # 公司大脑项目 - 环境分析报告

## 1. 现有环境分析

### 1.1 Trea平台情况
- **平台类型**: AI开发环境
- **核心功能**: 支持智能体开发、代码执行、文件管理
-...

#### evolution_execution_plan.md
- 路径: .trae\documents\evolution_execution_plan.md
- 大小: 10665 字节
- 行数: 620
- 预览: # 进化执行计划 - 详细实施方案

## 短期执行计划（4小时内）

### [x] 任务 1: 系统状态检查与准备（0-10分钟）
- **优先级**: P0
- **依赖**: None
- *...

#### green-tea-evolution-plan.md
- 路径: .trae\documents\green-tea-evolution-plan.md
- 大小: 3130 字节
- 行数: 137
- 预览: # 绿茶智能体进化计划 (The Implementation Plan)

## [/] Task 1: 初始化Git仓库
- **Priority**: P0
- **Depends On**: ...

#### life-decision-master-capability-tree-analysis.md
- 路径: .trae\documents\life-decision-master-capability-tree-analysis.md
- 大小: 4697 字节
- 行数: 188
- 预览: # 人生决策宗师能力树与价值函数分析报告

## 📊 其他智能体系统分析

### 1. 能力树结构 (OpenClaw AI Agent)

| 分支 | 节点 | 功能描述 | 工具 | 核心能...

#### life-decision-master-capability-tree-documentation.md
- 路径: .trae\documents\life-decision-master-capability-tree-documentation.md
- 大小: 5336 字节
- 行数: 240
- 预览: # 人生决策宗师能力树文档

## 1. 能力树概述

人生决策宗师能力树是一个结构化的能力管理系统，用于组织和管理人生决策宗师的所有能力。能力树采用层级结构，将能力分为高层、中层和低层三个层次，形成...

#### mission-control-calendar-plan.md
- 路径: .trae\documents\mission-control-calendar-plan.md
- 大小: 3291 字节
- 行数: 169
- 预览: # Mission Control 日历应用实施计划

## 项目概述
在 mission-control 目录中构建一个 Next.js 日历应用，使用 Convex 数据库存储排定的任务和 cro...

#### one_person_company_evolution_plan.md
- 路径: .trae\documents\one_person_company_evolution_plan.md
- 大小: 8031 字节
- 行数: 346
- 预览: # 1人公司进化计划 - OpenClaw多Agent系统实施

## 项目概述
基于用户需求，构建一个运行在本地的OpenClaw多Agent系统，作为1人公司的数字化组织架构，包含六个核心独立AI...

#### openclaw_fix_plan.md
- 路径: .trae\documents\openclaw_fix_plan.md
- 大小: 2366 字节
- 行数: 113
- 预览: # OpenClaw 问题修复计划

## 问题概述
- **API配置问题**：OpenClaw无法正确连接火山引擎/豆包API
- **Gateway Token Missing**：`disco...

#### openclaw_scene_switching_plan.md
- 路径: .trae\documents\openclaw_scene_switching_plan.md
- 大小: 1920 字节
- 行数: 104
- 预览: # OpenClaw 场景化智能切换模型 - 实现计划

## [x] 任务 1：创建配置文件
- **优先级**：P0
- **依赖**：无
- **描述**：
  - 创建 `openclaw-t...

#### pcec_architecture_design.md
- 路径: .trae\documents\pcec_architecture_design.md
- 大小: 7573 字节
- 行数: 386
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 系统架构设计文档

## 1. 系统概述

PCEC 是一个强制的周期性自我进化系统，每小时自动触发一次，夜间持...

#### pcec_implementation_plan.md
- 路径: .trae\documents\pcec_implementation_plan.md
- 大小: 2308 字节
- 行数: 133
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 系统实现计划

## 系统架构

### 核心组件
1. **PCEC 调度器** (`pcec-hourly-...

#### pcec_system_documentation.md
- 路径: .trae\documents\pcec_system_documentation.md
- 大小: 8367 字节
- 行数: 380
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 系统文档

## 1. 系统概述

PCEC 是一个强制定时自我进化系统，设计用于每小时自动触发一次进化任务，夜...

#### plan_20260203_011919.md
- 路径: .trae\documents\plan_20260203_011919.md
- 大小: 635 字节
- 行数: 46
- 预览: # 会员权益和积分系统实现计划

## 1. 积分系统架构
- 创建积分状态管理（localStorage + React state）
- 积分规则：
  - 注册会员：赠送 1000 积分
  -...

#### plan_20260203_022235.md
- 路径: .trae\documents\plan_20260203_022235.md
- 大小: 1459 字节
- 行数: 102
- 预览: # 支付充值积分系统开发计划

## 一、数据库设计与迁移
1. **创建充值订单表** (`recharge_orders`)
   - 订单状态机（待支付、支付成功、支付失败、已关闭）
   - ...

#### plan_20260204_022349.md
- 路径: .trae\documents\plan_20260204_022349.md
- 大小: 686 字节
- 行数: 31
- 预览: ## 问题分析

Vercel部署时出现警告信息：`Due to `builds` existing in your configuration file, the Build and Develop...

#### value-function-core-model-design.md
- 路径: .trae\documents\value-function-core-model-design.md
- 大小: 5608 字节
- 行数: 377
- 预览: # 价值函数核心模型设计

## 1. 模型概述

价值函数核心模型是一个基于多维度评估的能力价值评估系统，用于判断哪些能力值得进化，哪些不值得。该模型通过综合考虑能力的复用频率潜力、对失败率的影响、...

#### value-function-mutation-plan.md
- 路径: .trae\documents\value-function-mutation-plan.md
- 大小: 2122 字节
- 行数: 127
- 预览: # 价值函数突变系统实现计划

## 1. 任务背景

用户提供了「价值函数突变指令」，要求系统不再平均对待所有潜在能力，而是基于内在价值函数来决定哪些能力值得进化，哪些不值得。

## 2. 核心目...

#### behavior-rules.json
- 路径: .trae\pcec\behavior-rules.json
- 大小: 177 字节
- 行数: 9
- 预览: [
  {
    "type": "behaviorRule",
    "condition": "系统负载过高时",
    "action": "优先处理核心任务，延迟非核心任务，启动资源回收...

#### architecture.md
- 路径: .trae\pcec\documentation\architecture.md
- 大小: 4129 字节
- 行数: 156
- 预览: # PCEC 系统架构设计文档

## 1. 系统概述

Periodic Cognitive Expansion Cycle (PCEC) 是一个系统级的周期性进化任务，每1小时自动触发一次，夜间不...

#### usage.md
- 路径: .trae\pcec\documentation\usage.md
- 大小: 5624 字节
- 行数: 238
- 预览: # PCEC 系统使用说明

## 1. 系统启动

### 1.1 手动启动

```bash
# 启动PCEC核心执行模块
node pcec-cycle.js

# 启动小时调度器
node p...

#### server.js
- 路径: .trae\skills\awkn-platform_awkn-platform\backend\src\server.js
- 大小: 2320 字节
- 行数: 95
- 预览: const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors...

#### editorial.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\editorial.md
- 大小: 1722 字节
- 行数: 60
- 预览: # editorial

Magazine-style editorial infographic for professional content

## Design Aesthetic

Hig...

#### content-rules.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\content-rules.md
- 大小: 2981 字节
- 行数: 96
- 预览: # Content & Style Rules

Guidelines for slide deck content quality and style consistency.

## Conten...

#### editorial-infographic.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\editorial-infographic.md
- 大小: 2450 字节
- 行数: 74
- 预览: # editorial-infographic

Modern magazine-style editorial infographic with clear visual storytelling
...

#### viral-logic.md
- 路径: .trae\skills\baokuan\awkn-viral-article\references\viral-logic.md
- 大小: 6922 字节
- 行数: 471
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建...

#### RELEASE_READY.md
- 路径: .trae\skills\baokuan\RELEASE_READY.md
- 大小: 4439 字节
- 行数: 262
- 预览: # AWKN 技能集 - 正式版 v1.0.0 发布就绪

## 发布信息
- **版本号**：v1.0.0
- **发布日期**：2025年1月23日
- **项目名称**：AWKN 创意技能集
-...

#### problem-analysis-methods.md
- 路径: .trae\skills\BUG\bug-fix-debugger\references\problem-analysis-methods.md
- 大小: 5364 字节
- 行数: 401
- 预览: # 问题分析方法参考

## 目录
- [概览](#概览)
- [5Why法](#5why法)
- [鱼骨图](#鱼骨图)
- [MECE原则](#mece原则)
- [PDCA循环](#pdca循环...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\channel\wechatmp\README.md
- 大小: 3546 字节
- 行数: 101
- 预览: # 微信公众号channel

鉴于个人微信号在服务器上通过itchat登录有封号风险，这里新增了微信公众号channel，提供无风险的服务。
目前支持订阅号和服务号两种类型的公众号，它们都支持文本交...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\hello\README.md
- 大小: 1326 字节
- 行数: 42
- 预览: ## 插件说明

可以根据需求设置入群欢迎、群聊拍一拍、退群等消息的自定义提示词，也支持为每个群设置对应的固定欢迎语。

该插件也是用户根据需求开发自定义插件的示例插件，参考[插件开发说明](http...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\tool\README.md
- 大小: 4262 字节
- 行数: 167
- 预览: ## 插件描述
一个能让chatgpt联网，搜索，数字运算的插件，将赋予强大且丰富的扩展能力   
使用说明(默认trigger_prefix为$)：  
```text
#help tool: 查看...

#### README.md
- 路径: .trae\skills\cline-main\.clinerules\hooks\README.md
- 大小: 13800 字节
- 行数: 424
- 预览: # Cline Hooks Documentation

## Overview

Cline hooks allow you to execute custom scripts at specifi...

#### README.md
- 路径: .trae\skills\cline-main\src\core\hooks\__tests__\fixtures\README.md
- 大小: 6431 字节
- 行数: 177
- 预览: # Hook Test Fixtures

This directory contains pre-written hook scripts for testing the Cline hooks s...

#### storyboard-template.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\storyboard-template.md
- 大小: 2982 字节
- 行数: 178
- 预览: # 分镜模板

## 每页结构

```markdown
## Page 1 / N

**Filename**: 01-page-[slug].png
**Layout**: standard/ci...

#### viral-logic.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\viral-logic.md
- 大小: 9120 字节
- 行数: 577
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建...

#### visualization-styles.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\visualization-styles.md
- 大小: 9928 字节
- 行数: 1087
- 预览: # 可视化风格说明

## 目录
- 一、高适配小红书的视觉风格
  - 极简Ins风
  - 手绘插画风
  - 杂志封面风
  - 数据卡片风
  - 复古胶片风
  - 国潮国风
- 二、高适配...

#### decision-mapping-rules.md
- 路径: .trae\skills\renshengjuece\da-liu-ren\references\decision-mapping-rules.md
- 大小: 2376 字节
- 行数: 165
- 预览: # 决策映射规则

## 目录
- [系统稳健性信号](#系统稳健性信号)
- [长期复利信号](#长期复利信号)
- [非对称风险信号](#非对称风险信号)
- [人品与本分信号](#人品与本分信号...

#### 六壬毕法赋.md
- 路径: .trae\skills\renshengjuece\da-liu-ren\references\六壬毕法赋.md
- 大小: 4472 字节
- 行数: 343
- 预览: # 六壬毕法赋

## 概述

《六壬毕法赋》是大六壬预测的核心典籍，包含100条口诀，涵盖了大六壬预测的主要格局和吉凶判断规则。每条口诀对应特定的课体结构和预测意义。

## 百条毕法赋

### ...

#### SKILL.md
- 路径: .trae\skills\renshengjuece\da-liu-ren\SKILL.md
- 大小: 2699 字节
- 行数: 157
- 预览: ---
name: da-liu-ren
description: 大六壬预测 - 基于《六壬毕法赋》《大六壬指南》等经典典籍，提供三传四课、神煞推断、毕法赋解卦、大六壬指南占断。作为人生决策命盘系统...

#### 术语翻译规则.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\references\术语翻译规则.md
- 大小: 2926 字节
- 行数: 118
- 预览: # 核心术语翻译词典

## 1. 基础定义层

| 原专业术语 | **现代通识翻译** | **核心含义解读** |
| --- | --- | --- |
| 八字排盘 | **出生设置** |...

#### SKILL.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\SKILL.md
- 大小: 5447 字节
- 行数: 342
- 预览: ---
name: ren-sheng-jue-ce-ming-pan
description: 人生战略决策系统 - 东方命理×博弈论算法，在不确定的世界寻找确定性。提供出生设置解析、天赋赛道定位、...

#### 子平真诠-现代决策解读-补充阅读.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\references\子平真诠-现代决策解读-补充阅读.md
- 大小: 8968 字节
- 行数: 766
- 预览: # 子平真诠·现代决策解读

## 目录

1. [总论：命理学即决策论](#总论命理学即决策论)
2. [格局识别：你的核心竞争力](#格局识别你的核心竞争力)
3. [旺衰分析：资源配置效率](#...

#### SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\SKILL.md
- 大小: 2082 字节
- 行数: 107
- 预览: ---
name: image-assistant
description: 配图助手 - 把文章/模块内容转成统一风格、少字高可读的 16:9 信息图提示词；先定“需要几张图+每张讲什么”，再压缩文...

#### 02-plan.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\stages\02-plan.md
- 大小: 1028 字节
- 行数: 46
- 预览: # 阶段2：配图规划（要几张图？每张讲什么？）

**目标：** 基于阶段1已确认的规格（图类型/文字预算/用途），先“拆内容→定图清单→选版式”，避免一张图塞太多导致难看难读。

## 规划原则（核...

#### 03-copy.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\stages\03-copy.md
- 大小: 988 字节
- 行数: 47
- 预览: # 阶段3：文案定稿（Copy Spec：唯一真值）

**目标：** 把内容变成“上图文案规格表（Copy Spec）”：逐字定稿 + 字数预算 + 区域结构。阶段4只负责“封装成提示词”，不再改文...

#### 04-prompts.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\stages\04-prompts.md
- 大小: 2813 字节
- 行数: 92
- 预览: # 阶段4：提示词封装（Prompt Pack：可执行生成包）

**目标：** 把阶段3的 Copy Spec 原样封装成"可复制/可调用"的提示词包（Prompt Pack），并支持批量出图。阶段...

#### 16x9-infographic.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\16x9-infographic.md
- 大小: 207 字节
- 行数: 19
- 预览: # 16:9 通用信息图模板（骨架）

把 {占位符} 替换成你的内容：

标题（顶部大字）：{标题}
副标题（小字）：{副标题（可选，尽量短）}

主体：{版式类型：对比/流程/卡片/漫画}
- 画...

#### prd-template.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\assets\prd-template.md
- 大小: 1801 字节
- 行数: 87
- 预览: ```markdown
# 产品需求文档：[项目/功能名称] - V[版本号]

## 1. 综述 (Overview)
### 1.1 项目背景与核心问题
(此处填写经你引导和用户确认的，对顶层问题...

#### example-us01.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\references\example-us01.md
- 大小: 2045 字节
- 行数: 51
- 预览: ## 示例：填写参考
以下示例用真实内容演示每个模块应达到的深度，便于你在生成PRD时对齐预期格式和颗粒度。

```markdown
### 阶段一：任务提交

#### **US-01: 作为PO...

#### prd-registry-demo.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\references\prd-registry-demo.md
- 大小: 805 字节
- 行数: 13
- 预览: # PRD 总集（示例）

用法约定：
- 每新增一个 PRD，就新增一行，给它一个固定的“版本号”（这里作为总集里的唯一标识，不再变）。
- 单个 PRD 文档内部如果需要迭代，用 `v0.1 / ...

#### SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\SKILL.md
- 大小: 4182 字节
- 行数: 90
- 预览: ---
name: prd-doc-writer
description: Write and iteratively refine PRD/需求文档 with a story-driven stru...

#### SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\SKILL.md
- 大小: 1252 字节
- 行数: 73
- 预览: ---
name: thought-mining
description: 思维挖掘助手 - 通过对话帮助用户把脑子里的零散想法倒出来、记录下来、整理成文章。覆盖从思维挖掘到成稿的完整流程。
---
...

#### communication_protocol.md
- 路径: agents\common\communication_protocol.md
- 大小: 4787 字节
- 行数: 260
- 预览: # Agent Communication Protocol

## 1. 概述

本协议定义了 AI 代理团队内部的通信标准和规范，确保代理之间能够高效、准确地交换信息和协作。

## 2. 通信模...

#### when-to-call.md
- 路径: agents\company-brain-agent\when-to-call.md
- 大小: 2063 字节
- 行数: 162
- 预览: # 公司大脑智能体调用时机

## 核心调用场景

### 1. 智能体管理需求
- 当需要识别、注册、监控或管理智能体时
- 当需要评估智能体能力或性能时
- 当需要优化智能体协作或协调时
- 当智...

#### decision-process.md
- 路径: agents\green-tea\operations\decision-process.md
- 大小: 1509 字节
- 行数: 123
- 预览: # 决策流程

## 决策层级

### Level 1 - 常规决策（角色自主）
- **范围**：日常运营、标准流程内任务
- **决策者**：对应角色负责人
- **审批**：无需审批，事后报备...

#### TASK-COMPLETION-REPORT.md
- 路径: agents\green-tea\TASK-COMPLETION-REPORT.md
- 大小: 3725 字节
- 行数: 247
- 预览: # 任务执行完成报告

**执行日期**: 2026-02-25  
**执行者**: 绿茶智能体（CEO）  
**状态**: ✅ 全部完成

---

## 📋 任务总览

| 任务类别 | 完...

#### MEMORY.md
- 路径: agents\life\MEMORY.md
- 大小: 4827 字节
- 行数: 284
- 预览: # Life Decision Engine - 记忆库

## 生活规划经验

### 成功案例
1. **工作生活平衡优化**
   - **时间**: 2024-05-15
   - **任务*...

#### editorial.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\editorial.md
- 大小: 1722 字节
- 行数: 60
- 预览: # editorial

Magazine-style editorial infographic for professional content

## Design Aesthetic

Hig...

#### content-rules.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\content-rules.md
- 大小: 2981 字节
- 行数: 96
- 预览: # Content & Style Rules

Guidelines for slide deck content quality and style consistency.

## Conten...

#### editorial-infographic.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\editorial-infographic.md
- 大小: 2450 字节
- 行数: 74
- 预览: # editorial-infographic

Modern magazine-style editorial infographic with clear visual storytelling
...

#### viral-logic.md
- 路径: AI爆款进化实验室\projects\awkn-viral-article\references\viral-logic.md
- 大小: 6922 字节
- 行数: 471
- 预览: # 爆文逻辑：从认知到交付的完整闭环

## 目录
- 核心哲学
- 一、内容生产流程：5个关键阶段
- 二、底层逻辑拆解
- 三、语气控制：朋友式的叛逆者
- 四、为什么这套逻辑有效
- 五、应用建...

#### RELEASE_READY.md
- 路径: AI爆款进化实验室\projects\RELEASE_READY.md
- 大小: 4439 字节
- 行数: 262
- 预览: # AWKN 技能集 - 正式版 v1.0.0 发布就绪

## 发布信息
- **版本号**：v1.0.0
- **发布日期**：2025年1月23日
- **项目名称**：AWKN 创意技能集
-...

#### analyze-cognitive-data.js
- 路径: analyze-cognitive-data.js
- 大小: 7027 字节
- 行数: 274
- 预览: const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const...

#### server.js
- 路径: awkn-platform\backend\src\server.js
- 大小: 3361 字节
- 行数: 131
- 预览: const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
...

#### broadcast-update.js
- 路径: broadcast-update.js
- 大小: 3864 字节
- 行数: 160
- 预览: const fs = require('fs');
const path = require('path');

// 广播更新脚本
// 用于通知所有智能体关于公司化改造的变更

console.l...

#### agent-self-repair.js
- 路径: capabilities\agent-self-repair.js
- 大小: 18550 字节
- 行数: 677
- 预览: const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process'...

#### reporting-system.js
- 路径: capabilities\reporting-system.js
- 大小: 6995 字节
- 行数: 270
- 预览: /**
 * 报告机制系统 (Reporting System)
 * 实现仅向指定接收者报告的机制，生成结构化的进化报告
 */

class ReportingSystem {
  constru...

#### value-function-mutator.js
- 路径: capabilities\value-function-mutator.js
- 大小: 12779 字节
- 行数: 503
- 预览: /**
 * 价值函数突变机制
 * 为人生决策宗师智能体提供价值函数突变和管理功能
 */

const { valueFunction } = require('./value-function'...

#### README.md
- 路径: chatgpt-on-wechat-master\channel\wechatmp\README.md
- 大小: 3546 字节
- 行数: 101
- 预览: # 微信公众号channel

鉴于个人微信号在服务器上通过itchat登录有封号风险，这里新增了微信公众号channel，提供无风险的服务。
目前支持订阅号和服务号两种类型的公众号，它们都支持文本交...

#### README.md
- 路径: chatgpt-on-wechat-master\plugins\hello\README.md
- 大小: 1326 字节
- 行数: 42
- 预览: ## 插件说明

可以根据需求设置入群欢迎、群聊拍一拍、退群等消息的自定义提示词，也支持为每个群设置对应的固定欢迎语。

该插件也是用户根据需求开发自定义插件的示例插件，参考[插件开发说明](http...

#### README.md
- 路径: chatgpt-on-wechat-master\plugins\tool\README.md
- 大小: 4262 字节
- 行数: 167
- 预览: ## 插件描述
一个能让chatgpt联网，搜索，数字运算的插件，将赋予强大且丰富的扩展能力   
使用说明(默认trigger_prefix为$)：  
```text
#help tool: 查看...

#### backend-authentication.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\backend-development\references\backend-authentication.md
- 大小: 9375 字节
- 行数: 339
- 预览: # Backend Authentication & Authorization

Modern authentication patterns including OAuth 2.1, JWT, R...

#### backend-security.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\backend-development\references\backend-security.md
- 大小: 8092 字节
- 行数: 291
- 预览: # Backend Security

Security best practices, OWASP Top 10 mitigation, and modern security standards ...

#### postgresql-administration.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\databases\references\postgresql-administration.md
- 大小: 12113 字节
- 行数: 595
- 预览: # PostgreSQL Administration

User management, backups, replication, maintenance, and production data...

#### gcloud-platform.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\gcloud-platform.md
- 大小: 7015 字节
- 行数: 298
- 预览: # Google Cloud Platform with gcloud CLI

Comprehensive guide for gcloud CLI - command-line interface...

#### gcloud-services.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\gcloud-services.md
- 大小: 5925 字节
- 行数: 305
- 预览: # Google Cloud Services

## Compute Engine (VMs)

```bash
# List instances
gcloud compute instances ...

#### kubernetes-helm-advanced.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\kubernetes-helm-advanced.md
- 大小: 1743 字节
- 行数: 76
- 预览: # Helm Advanced - Templates & Hooks

## Template Variables
```yaml
# templates/deployment.yaml
apiVe...

#### kubernetes-helm.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\kubernetes-helm.md
- 大小: 1800 字节
- 行数: 82
- 预览: # Helm Package Management

## Core Concepts

- **Chart:** Helm package with K8s resource definitions...

#### kubernetes-security-advanced.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\kubernetes-security-advanced.md
- 大小: 1817 字节
- 行数: 99
- 预览: # Kubernetes Security Advanced

## ClusterRole (cluster-wide)

```yaml
apiVersion: rbac.authorizatio...

#### kubernetes-security.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\kubernetes-security.md
- 大小: 1755 字节
- 行数: 96
- 预览: # Kubernetes Security

## RBAC (Role-Based Access Control)

### Role (namespace-scoped)
```yaml
apiV...

#### kubernetes-workflows.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\kubernetes-workflows.md
- 大小: 1609 字节
- 行数: 79
- 预览: # Kubernetes Workflows

## GitOps Architecture

```
Git Repository (desired state)
         │ Watche...

#### format-compatibility.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\media-processing\references\format-compatibility.md
- 大小: 8667 字节
- 行数: 376
- 预览: # Format Compatibility & Conversion Guide

Complete guide to media format support, codec recommendat...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\media-processing\SKILL.md
- 大小: 9582 字节
- 行数: 359
- 预览: ---
name: media-processing
description: Process multimedia files with FFmpeg (video/audio encoding, ...

#### shadcn-accessibility.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\references\shadcn-accessibility.md
- 大小: 9976 字节
- 行数: 472
- 预览: # shadcn/ui Accessibility Patterns

ARIA patterns, keyboard navigation, screen reader support, and a...

#### security-checklists.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\security-checklists.md
- 大小: 2517 字节
- 行数: 82
- 预览: # Security Checklists

## Authentication Security

- [ ] Strong auth mechanism (OAuth 2.0, JWT, OIDC...

#### design.md
- 路径: clawpal\design.md
- 大小: 14864 字节
- 行数: 565
- 预览: # ClawPal Design Document

> OpenClaw 配置助手 — 让普通用户也能玩转高级配置

## 1. 产品定位

### 问题
- OpenClaw 配置功...

#### 2026-02-15-clawpal-mvp-design.md
- 路径: clawpal\docs\plans\2026-02-15-clawpal-mvp-design.md
- 大小: 5532 字节
- 行数: 280
- 预览: # ClawPal MVP 设计文档（实现版）

日期：2026-02-15  
版本：MVP-1.0  
目标：用最小投入实现可用产品，覆盖 `design.md` 中 MVP 核心范围（安...

#### 2026-02-16-clawpal-product-redesign.md
- 路径: clawpal\docs\plans\2026-02-16-clawpal-product-redesign.md
- 大小: 7380 字节
- 行数: 261
- 预览: # ClawPal 产品精简 & 重新定位

> 从"全功能配置管理后台"回归"AI 配置助手"

## 1. 问题

v0.2 新增了 Models、Channels、Data 三个管理...

#### 2026-02-16-openclaw-cli-model-catalog-upgrade-channels.md
- 路径: clawpal\docs\plans\2026-02-16-openclaw-cli-model-catalog-upgrade-channels.md
- 大小: 5037 字节
- 行数: 110
- 预览: # Openclaw-Driven Model/Channel Ops Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use...

#### 2026-02-22-doctor-2x2-matrix-design.md
- 路径: clawpal\docs\plans\2026-02-22-doctor-2x2-matrix-design.md
- 大小: 9366 字节
- 行数: 287
- 预览: # Doctor Agent 2x2 Matrix Design

Date: 2026-02-22

## Problem

The current doctor agent only ...

#### zh.json
- 路径: clawpal\src\locales\zh.json
- 大小: 17150 字节
- 行数: 465
- 预览: {
  "nav.home": "首页",
  "nav.recipes": "菜谱",
  "nav.channels": "频道",
  "nav.history": "历史",
  "...

#### architecture-design.md
- 路径: company-brain\docs\architecture-design.md
- 大小: 3866 字节
- 行数: 245
- 预览: # 公司大脑架构设计文档

## 1. 架构概述

公司大脑是一个运行在Trea平台上的智能体调度中心，负责管理公司规则、制度和文件，指导所有智能体（如大宗师、绿茶等）的工作。

### 1.1 核心...

#### index.js
- 路径: company-brain\index.js
- 大小: 8137 字节
- 行数: 285
- 预览: // 公司大脑主入口文件

const MemorySystem = require('./src/memory');
const SchedulerSystem = require('./src/s...

#### test-memory-system.js
- 路径: company-brain\scripts\test-memory-system.js
- 大小: 4940 字节
- 行数: 174
- 预览: // 记忆系统测试脚本

const MemorySystem = require('../src/memory/index.js');
const MemoryAPI = require('../s...

#### security-gateway.js
- 路径: company-brain\src\communication\security-gateway.js
- 大小: 8957 字节
- 行数: 398
- 预览: // 安全网关模块

class SecurityGateway {
  constructor(config = {}) {
    this.config = {
      ...config,...

#### api.js
- 路径: company-brain\src\memory\api.js
- 大小: 9615 字节
- 行数: 434
- 预览: // 记忆管理API接口

class MemoryAPI {
  constructor(memorySystem) {
    this.memorySystem = memorySystem;
...

#### index.js
- 路径: company-brain\src\memory\index.js
- 大小: 4287 字节
- 行数: 188
- 预览: // 记忆系统主模块

class MemorySystem {
  constructor(config = {}) {
    this.config = {
      dataDir: con...

#### rule-base.js
- 路径: company-brain\src\memory\rule-base.js
- 大小: 4430 字节
- 行数: 187
- 预览: // 规则库模块

const fs = require('fs').promises;
const path = require('path');

class RuleBase {
  const...

#### search-engine.js
- 路径: company-brain\src\memory\search-engine.js
- 大小: 8322 字节
- 行数: 313
- 预览: // 检索引擎模块

class SearchEngine {
  constructor(config) {
    this.config = config;
    this.ruleBase ...

#### alert-system.js
- 路径: company-brain\src\monitoring\alert-system.js
- 大小: 9435 字节
- 行数: 375
- 预览: // 警报系统模块

class AlertSystem {
  constructor(config = {}) {
    this.config = {
      ...config,
   ...

#### scheduling-engine.js
- 路径: company-brain\src\scheduler\scheduling-engine.js
- 大小: 10113 字节
- 行数: 371
- 预览: // 调度引擎模块

const schedulingRules = require('./scheduling-rules');

class SchedulingEngine {
  constr...

#### scheduling-rules.js
- 路径: company-brain\src\scheduler\scheduling-rules.js
- 大小: 5007 字节
- 行数: 187
- 预览: // 调度规则配置模块

const schedulingRules = {
  // 智能体选择规则
  agentSelection: {
    // 基于能力匹配的规则
    capabil...

#### ec22b_695a7ba9._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_695a7ba9._.js
- 大小: 1162180 字节
- 行数: 21446
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/shared/lib/page-path/normalize...

#### ec22b_6c88d957._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_6c88d957._.js
- 大小: 1159695 字节
- 行数: 21426
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/shared/lib/page-path/normalize...

#### ec22b_91c93ab3._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_91c93ab3._.js
- 大小: 331142 字节
- 行数: 6403
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/esm/server/route-modules/pages...

#### ec22b_next_dist_04427a8c._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_next_dist_04427a8c._.js
- 大小: 750301 字节
- 行数: 11327
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/server/route-modules/app-page/...

#### ec22b_next_dist_aa36de2e._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_next_dist_aa36de2e._.js
- 大小: 745348 字节
- 行数: 11212
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/server/route-modules/app-page/...

#### ec22b_next_dist_client_0d45cfe7._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_client_0d45cfe7._.js
- 大小: 183566 字节
- 行数: 4017
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_dist_client_2fc3e803._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_client_2fc3e803._.js
- 大小: 629797 字节
- 行数: 12725
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_dist_compiled_8294bc1c._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_compiled_8294bc1c._.js
- 大小: 914078 字节
- 行数: 3878
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_dist_compiled_next-devtools_index_cc149a6d.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_compiled_next-devtools_index_cc149a6d.js
- 大小: 816048 字节
- 行数: 1661
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_dist_compiled_react-dom_ad9b492b._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_compiled_react-dom_ad9b492b._.js
- 大小: 1048258 字节
- 行数: 16537
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_dist_shared_lib_466b3777._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_shared_lib_466b3777._.js
- 大小: 257265 字节
- 行数: 5962
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_dist_shared_lib_adc54eef._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_shared_lib_adc54eef._.js
- 大小: 246522 字节
- 行数: 5721
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_react-dom_1c4c317a._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_react-dom_1c4c317a._.js
- 大小: 965243 字节
- 行数: 15381
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### [root-of-the-server]__dde067cd._.js
- 路径: content-pipeline\.next\server\chunks\ssr\[root-of-the-server]__dde067cd._.js
- 大小: 150302 字节
- 行数: 10
- 预览: module.exports=[89141,(a,b,c)=>{"use strict";function d(a){return a.replace(/\\/g,"/")}Object.define...

#### [root-of-the-server]__1db2432b._.js
- 路径: content-pipeline\.next\server\chunks\[root-of-the-server]__1db2432b._.js
- 大小: 187665 字节
- 行数: 21
- 预览: module.exports=[61724,(A,e,t)=>{e.exports=A.x("next/dist/compiled/next-server/app-route-turbo.runtim...

#### 972a58a2cc1ba911.js
- 路径: content-pipeline\.next\static\chunks\972a58a2cc1ba911.js
- 大小: 158332 字节
- 行数: 5
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### b82fb7659fe2fbc9.js
- 路径: content-pipeline\.next\static\chunks\b82fb7659fe2fbc9.js
- 大小: 16886 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### c40192c41cc9b837.js
- 路径: content-pipeline\.next\static\chunks\c40192c41cc9b837.js
- 大小: 224623 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### csp-proxy.js
- 路径: csp-proxy.js
- 大小: 2142 字节
- 行数: 68
- 预览: const http = require('http');
const httpProxy = require('http-proxy');

// 创建代理服务器
const proxy = htt...

#### capability-tree.md
- 路径: docs\capability-tree.md
- 大小: 6317 字节
- 行数: 305
- 预览: # 能力树系统设计文档

## 1. 概述

能力树（Capability Tree）是一个结构化的能力管理系统，用于将智能体的能力组织成一棵持续生长的树状结构，而不是零散的技巧集合。它提供了能力的层...

#### document-inventory.js
- 路径: document-inventory.js
- 大小: 7048 字节
- 行数: 256
- 预览: // 文档资产盘点脚本
// 扫描指定目录下的所有文档文件，分类整理并生成资产清单

const fs = require('fs');
const path = require('path');

...

#### evomap-guide.md
- 路径: evomap-guide.md
- 大小: 5560 字节
- 行数: 291
- 预览: # EvoMap 任务接取指南

## 1. 连接到 EvoMap 网络

### 步骤 1: 注册节点

发送 POST 请求到 `https://evomap.ai/a2a/hello` 来注册你...

#### evomap-publish-skill.md
- 路径: evomap-publish-skill.md
- 大小: 9952 字节
- 行数: 442
- 预览: ---
name: evomap-publish
version: 1.1.0
description: Complete guide for publishing Gene+Capsule+Evol...

#### evomap-skill.md
- 路径: evomap-skill.md
- 大小: 67362 字节
- 行数: 1806
- 预览: ---
name: evomap
description: Connect to the EvoMap collaborative evolution marketplace. Publish Gen...

#### EVOMAP_CLAIM_GUIDE.md
- 路径: EVOMAP_CLAIM_GUIDE.md
- 大小: 2444 字节
- 行数: 169
- 预览: # EvoMap 节点认领指南

## 重要说明

根据EvoMap官方文档，节点注册和认领的流程如下：

### 📋 节点状态说明

**当前节点状态：**
- ✅ 节点已成功注册到EvoMap网...

#### gateway.js
- 路径: gateway.js
- 大小: 10843 字节
- 行数: 429
- 预览: // 智能体网关服务
const express = require('express');
const http = require('http');
const cors = require('c...

#### 修复Vercel部署报错问题.md
- 路径: HATwin\.trae\documents\修复Vercel部署报错问题.md
- 大小: 883 字节
- 行数: 41
- 预览: ## 修复Vercel部署报错问题的完整计划

### 问题分析

根据收集的信息，当前项目部署到Vercel后存在以下问题：

1. **前端API请求失败**：前端代码硬编码了本地测试地址`loc...

#### system-data.js
- 路径: HREO\system-data.js
- 大小: 17847 字节
- 行数: 390
- 预览: const SYSTEM_DATA = {
    // ==========================================
    // 1. 题库配置 (24题双核精密扫描版)
...

#### plan_20260205_071435.md
- 路径: HTP\.trae\documents\plan_20260205_071435.md
- 大小: 2092 字节
- 行数: 80
- 预览: # 添加Vite Proxy配置解决跨域问题

## 问题分析
当前项目在调用火山豆包API时遇到了跨域问题，这是前端开发中常见的问题。根据用户的要求，需要通过配置Vite Proxy来解决所有跨域问...

#### plan_20260205_073331.md
- 路径: HTP\.trae\documents\plan_20260205_073331.md
- 大小: 16168 字节
- 行数: 540
- 预览: # 生产环境方案：使用火山TOS存储图片生成公网URL

## 问题分析
当前项目在开发环境中使用Base64编码的方式处理图片，这种方式对于小图片（<2MB）是可行的，但对于较大的图片（>2MB）会...

#### plan_20260206_132155.md
- 路径: HTP\.trae\documents\plan_20260206_132155.md
- 大小: 1240 字节
- 行数: 60
- 预览: # 优化HTP分析结果的前端渲染

## 问题分析

通过分析前端代码，我发现了以下关键问题：

1. **文本渲染方式**：
   - 在 `ResultPage.tsx` 中，前端使用 `Type...

#### 修复HTP分析报告生成失败问题.md
- 路径: HTP\.trae\documents\修复HTP分析报告生成失败问题.md
- 大小: 1966 字节
- 行数: 75
- 预览: ## 问题分析

图片插入成功但报告生成失败，核心原因是前端解析函数没从平台返回的内容中匹配到预设的Markdown报告格式，导致触发了兜底的"生成失败"提示。

## 修复计划

### 第一步：定...

#### editorial.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\editorial.md
- 大小: 1722 字节
- 行数: 60
- 预览: # editorial

Magazine-style editorial infographic for professional content

## Design Aesthetic

Hig...

#### htp-analysis-framework.md
- 路径: HTP\projects\htp-insight\references\htp-analysis-framework.md
- 大小: 13295 字节
- 行数: 949
- 预览: # HTP 房树人分析框架

## 目录

### 核心维度
- [整体布局维度](#整体布局维度)
- [房子特征维度](#房子特征维度)
- [树木特征维度](#树木特征维度)
- [人物特征维度...

#### skill-logic-and-implementation.md
- 路径: HTP\projects\htp-insight\references\skill-logic-and-implementation.md
- 大小: 13566 字节
- 行数: 729
- 预览: # HTP-Insight 技能逻辑与实现说明

## 一、技能概述

**HTP-Insight**（你的画，照见你的灵魂）是一个基于绘画心理学的智能分析系统。通过分析用户手绘的绘画作品（房-树-人...

#### references-contents.md
- 路径: HTP\test-output\references-contents.md
- 大小: 96804 字节
- 行数: 5154
- 预览: # HTP 项目参考文件

## htp-insight 参考文件

#### brand-positioning.md

# 品牌定位策略

## 核心定位

### 品牌名称
- **主标题**：...

#### 修复Vercel部署报错问题.md
- 路径: LAY\.trae\documents\修复Vercel部署报错问题.md
- 大小: 883 字节
- 行数: 41
- 预览: ## 修复Vercel部署报错问题的完整计划

### 问题分析

根据收集的信息，当前项目部署到Vercel后存在以下问题：

1. **前端API请求失败**：前端代码硬编码了本地测试地址`loc...

#### 2f884_1bff2d72._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_1bff2d72._.js
- 大小: 1158251 字节
- 行数: 21426
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/shared/lib/page-path/normalize-...

#### 2f884_20bfb56f._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_20bfb56f._.js
- 大小: 1160724 字节
- 行数: 21446
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/shared/lib/page-path/normalize-...

#### 2f884_7fcc71d5._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_7fcc71d5._.js
- 大小: 505198 字节
- 行数: 10707
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/server/route-modules/app-page/m...

#### 2f884_next_dist_7c43c7d0._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_7c43c7d0._.js
- 大小: 749078 字节
- 行数: 11327
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/server/route-modules/app-page/m...

#### 2f884_next_dist_94269128._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_94269128._.js
- 大小: 744129 字节
- 行数: 11212
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/server/route-modules/app-page/m...

#### 2f884_next_dist_client_42e85f9b._.js
- 路径: mission-control\.next\dev\static\chunks\2f884_next_dist_client_42e85f9b._.js
- 大小: 629290 字节
- 行数: 12725
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### 2f884_next_dist_compiled_next-devtools_index_e49b2174.js
- 路径: mission-control\.next\dev\static\chunks\2f884_next_dist_compiled_next-devtools_index_e49b2174.js
- 大小: 816046 字节
- 行数: 1661
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### 2f884_next_dist_compiled_react-dom_200cce3a._.js
- 路径: mission-control\.next\dev\static\chunks\2f884_next_dist_compiled_react-dom_200cce3a._.js
- 大小: 1048237 字节
- 行数: 16537
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### images-manifest.json
- 路径: mission-control\.next\images-manifest.json
- 大小: 1160 字节
- 行数: 67
- 预览: {
  "version": 1,
  "images": {
    "deviceSizes": [
      640,
      750,
      828,
      1080,
  ...

#### required-server-files.js
- 路径: mission-control\.next\required-server-files.js
- 大小: 8909 字节
- 行数: 320
- 预览: self.__SERVER_FILES_MANIFEST={
  "version": 1,
  "config": {
    "env": {},
    "webpack": null,
   ...

#### required-server-files.json
- 路径: mission-control\.next\required-server-files.json
- 大小: 8880 字节
- 行数: 320
- 预览: {
  "version": 1,
  "config": {
    "env": {},
    "webpack": null,
    "typescript": {
      "ignor...

#### 2f884_b394b38c._.js
- 路径: mission-control\.next\server\chunks\ssr\2f884_b394b38c._.js
- 大小: 80751 字节
- 行数: 3
- 预览: module.exports=[45720,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null...

#### [root-of-the-server]__d0c03911._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__d0c03911._.js
- 大小: 149668 字节
- 行数: 10
- 预览: module.exports=[12439,(a,b,c)=>{"use strict";function d(a){return a.replace(/\\/g,"/")}Object.define...

#### [root-of-the-server]__98038d59._.js
- 路径: mission-control\.next\server\chunks\[root-of-the-server]__98038d59._.js
- 大小: 187650 字节
- 行数: 21
- 预览: module.exports=[61724,(A,e,t)=>{e.exports=A.x("next/dist/compiled/next-server/app-route-turbo.runtim...

#### 17c2e942c16e9743.js
- 路径: mission-control\.next\static\chunks\17c2e942c16e9743.js
- 大小: 224631 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### 935b8cd1a2e6aee2.js
- 路径: mission-control\.next\static\chunks\935b8cd1a2e6aee2.js
- 大小: 22458 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### 9d743c5ce45186a8.js
- 路径: mission-control\.next\static\chunks\9d743c5ce45186a8.js
- 大小: 119584 字节
- 行数: 2
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### OpenClaw 实现场景化智能切换模型.txt
- 路径: OpenClaw 实现场景化智能切换模型.txt
- 大小: 6004 字节
- 行数: 222
- 预览: 你希望让 OpenClaw 实现**场景化智能切换模型**：外部集成（飞书/微信机器人）、团队/智能体互聊场景自动用豆包 API，而单智能体本地调用、深度思考场景自动用 Trae 内置模型，无需手动传...

#### openclaw-correct-config.json
- 路径: openclaw-correct-config.json
- 大小: 2129 字节
- 行数: 90
- 预览: {
  "meta": {
    "lastTouchedVersion": "2026.2.21-2",
    "lastTouchedAt": "2026-02-25T00:00:00.000...

#### pcec-hourly-scheduler.js
- 路径: pcec-hourly-scheduler.js
- 大小: 46187 字节
- 行数: 1577
- 预览: #!/usr/bin/env node

/**
 * Periodic Cognitive Expansion Cycle (PCEC) - 强制定时自我进化任务调度器
 * 每1小时执行一次，夜间...

#### pcec_1.md
- 路径: pcec_executions\pcec_1.md
- 大小: 1222 字节
- 行数: 81
- 预览: # PCEC 执行记录 #1

## 执行信息
- **执行时间**：2026-02-22 21:45
- **周期**：首次执行
- **执行类型**：能力整合

## 进化目标
- **类型**：...

#### pcec_2.md
- 路径: pcec_executions\pcec_2.md
- 大小: 1506 字节
- 行数: 102
- 预览: # PCEC 执行记录 #2

## 执行信息
- **执行时间**：2026-02-22 21:50
- **周期**：第二次执行
- **执行类型**：流程优化

## 进化目标
- **类型**...

#### pcec_2_completed.md
- 路径: pcec_executions\pcec_2_completed.md
- 大小: 1565 字节
- 行数: 82
- 预览: # PCEC 执行记录 #2 - 完成报告

## 执行信息
- **执行时间**：2026-02-22 21:50 - 22:16
- **周期**：第二次执行
- **执行类型**：流程优化

#...

#### pcec_5_completed.md
- 路径: pcec_executions\pcec_5_completed.md
- 大小: 368 字节
- 行数: 37
- 预览: # PCEC 执行记录 #5 - 完成报告

## 执行信息
- 执行时间: 2026-02-24T03:04:17.484Z
- 完成时间: 2026-02-24T03:04:47.490Z
- 触...

#### pcec_6.md
- 路径: pcec_executions\pcec_6.md
- 大小: 559 字节
- 行数: 36
- 预览: # PCEC 执行记录 #6 - 定时触发

## 执行信息
- 执行时间: 2026-02-24T03:08:23.356Z
- 触发方式: 定时调度器
- 模式: 标准模式

## 任务协议
1....

#### pcec_6_completed.md
- 路径: pcec_executions\pcec_6_completed.md
- 大小: 368 字节
- 行数: 37
- 预览: # PCEC 执行记录 #6 - 完成报告

## 执行信息
- 执行时间: 2026-02-24T03:08:23.356Z
- 完成时间: 2026-02-24T03:08:53.376Z
- 触...

#### pcec_plan.md
- 路径: pcec_plan.md
- 大小: 1431 字节
- 行数: 104
- 预览: # Periodic Cognitive Expansion Cycle (PCEC) 执行计划

## 1. 执行机制

### 触发规则
- 每3小时自动触发一次
- 若正在处理对话或任务，在空闲...

#### problem-analysis-methods.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\references\problem-analysis-methods.md
- 大小: 5364 字节
- 行数: 401
- 预览: # 问题分析方法参考

## 目录
- [概览](#概览)
- [5Why法](#5why法)
- [鱼骨图](#鱼骨图)
- [MECE原则](#mece原则)
- [PDCA循环](#pdca循环...

#### README_SCENE_SWITCHING.md
- 路径: README_SCENE_SWITCHING.md
- 大小: 3163 字节
- 行数: 196
- 预览: # OpenClaw 场景化智能切换模型

## 功能介绍

OpenClaw 场景化智能切换模型是一个智能系统，能够根据当前使用场景自动切换不同的AI模型：

- **外部集成场景**（飞书/微信机...

#### video-script-format.md
- 路径: references\video-script-format.md
- 大小: 3716 字节
- 行数: 174
- 预览: # 视频脚本格式规范

## 基本结构

### 1. 视频概述
- **视频标题**：简洁明了，吸引目标受众
- **总时长**：建议60-120秒
- **核心主题**：一句话概括视...

#### scene-detector.js
- 路径: scene-detector.js
- 大小: 2054 字节
- 行数: 74
- 预览: const fs = require('fs');
const path = require('path');

/**
 * 智能识别当前场景，返回模型类型（trea/doubao）
 * 识别规则...

#### security-compliance-manager.js
- 路径: security-compliance-manager.js
- 大小: 18074 字节
- 行数: 755
- 预览: // 安全与合规管理系统
// 负责评估进化系统的安全风险，建立数据安全和隐私保护机制

const fs = require('fs');
const path = require('path');...

#### security-compliance-report.md
- 路径: security-compliance-report.md
- 大小: 489 字节
- 行数: 42
- 预览: # 安全与合规状态报告

## 报告信息
- **生成时间**: 2026-02-23T08:52:18.782Z
- **系统**: 进化系统

## 安全状态

### 安全措施

| 措施 | ...

#### organization_structure.md
- 路径: shared-memory\coordination\organization_structure.md
- 大小: 3806 字节
- 行数: 211
- 预览: # 公司组织架构文档

## 1. 公司概述

本组织架构文档描述了AI公司化改造后的智能体组织体系，基于"公司模式"的管理理念，旨在实现智能体之间的高效协作和资源共享，提升整体运营效率。

## 2...

#### simple-csp-proxy.js
- 路径: simple-csp-proxy.js
- 大小: 2405 字节
- 行数: 81
- 预览: const http = require('http');
const https = require('https');
const url = require('url');

// 目标服务器配...

#### simple-document-scan.js
- 路径: simple-document-scan.js
- 大小: 4452 字节
- 行数: 151
- 预览: // 简化版文档扫描脚本
const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\...

#### violation-log.json
- 路径: skills\adl-core\data\violation-log.json
- 大小: 29587 字节
- 行数: 1261
- 预览: [
  {
    "id": "viol_1771956331394_efcvkx0f2",
    "timestamp": 1771956331394,
    "type": "ROLLBAC...

#### SKILL.md
- 路径: skills\bug-fix-orchestrator\SKILL.md
- 大小: 1477 字节
- 行数: 84
- 预览: ﻿
          
          
# Skill 0｜BUG 修复大法总控（Router / Orchestrator）

**一句话定义**  
你只要喊“启动 BUG 修...

#### capability-shapes.md
- 路径: skills\capability-evolver\capabilities\capability-shapes.md
- 大小: 2681 字节
- 行数: 375
- 预览: # 能力轮廓（Capability Shapes）

## 1. Git SSH配置管理

### 输入
- GitHub邮箱地址
- 密钥类型（如ed25519）
- 密钥存储路径
- 密码短语（可...

#### evolution-constraints.json
- 路径: skills\capability-evolver\capabilities\evolution-constraints.json
- 大小: 9229 字节
- 行数: 411
- 预览: {
  "constraintSystem": {
    "name": "能力进化约束体系",
    "description": "确保所有能力进化满足约束条件，防止能力劣化",
    "c...

#### evolution-roadmap.json
- 路径: skills\capability-evolver\capabilities\evolution-roadmap.json
- 大小: 15348 字节
- 行数: 645
- 预览: {
  "roadmap": {
    "name": "能力进化路线图",
    "description": "规划能力进化的长期发展方向，设定明确的阶段目标和实施计划",
    "visi...

#### internalization-strategy.json
- 路径: skills\capability-evolver\capabilities\internalization-strategy.json
- 大小: 4116 字节
- 行数: 182
- 预览: {
  "strategies": [
    {
      "capabilityId": "hot-info-cache",
      "name": "热点信息缓存层",
      "in...

#### capability-abstractor.js
- 路径: skills\capability-evolver\core\capability-abstractor.js
- 大小: 8227 字节
- 行数: 357
- 预览: /**
 * 能力抽象器
 * 负责从能力候选中提取能力轮廓，定义输入输出参数
 */

const fs = require('fs');
const path = require('path');...

#### behavior-rule-43-1771918249515.json
- 路径: skills\capability-evolver\data\evolution-products\behavior-rule-43-1771918249515.json
- 大小: 644 字节
- 行数: 21
- 预览: {
  "type": "behavior-rule",
  "cycle": 43,
  "name": "Behavior Rule for Created new feature: 文件处理能力...

#### behavior-rule-behavior-rule-42-1771918062086.json
- 路径: skills\capability-evolver\data\evolution-products\behavior-rule-behavior-rule-42-1771918062086.json
- 大小: 769 字节
- 行数: 25
- 预览: {
  "type": "behavior-rule",
  "cycle": 42,
  "id": "behavior-rule-42-1771918062086",
  "name": "Beh...

#### behavior-rule-behavior-rule-52-1771919937562.json
- 路径: skills\capability-evolver\data\evolution-products\behavior-rule-behavior-rule-52-1771919937562.json
- 大小: 769 字节
- 行数: 25
- 预览: {
  "type": "behavior-rule",
  "cycle": 52,
  "id": "behavior-rule-52-1771919937562",
  "name": "Beh...

#### behavior-rule-behavior-rule-55-1771920937204.json
- 路径: skills\capability-evolver\data\evolution-products\behavior-rule-behavior-rule-55-1771920937204.json
- 大小: 769 字节
- 行数: 25
- 预览: {
  "type": "behavior-rule",
  "cycle": 55,
  "id": "behavior-rule-55-1771920937204",
  "name": "Beh...

#### evolution-product-generator.js
- 路径: skills\capability-evolver\modules\evolution-product-generator.js
- 大小: 16317 字节
- 行数: 563
- 预览: /**
 * 进化产物生成系统
 * 确保每次 PCEC 至少产生一个新能力轮廓、默认策略或行为规则
 * 为 PCEC 系统提供可累积的进化结果
 */

const fs = require('f...

#### reporting-compliance-system.js
- 路径: skills\capability-evolver\modules\reporting-compliance-system.js
- 大小: 12660 字节
- 行数: 440
- 预览: /**
 * 报告规则系统
 * 确保所有进化结果仅向指定管理员报告
 * 为 PCEC 系统提供严格的报告合规性
 */

const fs = require('fs');
const path ...

#### SKILL.md
- 路径: skills\evolution-monitor\SKILL.md
- 大小: 1551 字节
- 行数: 98
- 预览: ---
name: "evolution-monitor"
description: "能力进化监控技能，负责监控PCEC执行、能力树生长和进化效果评估，确保智能体进化过程的透明性和有效性。"
aut...

#### SKILL.md
- 路径: skills\h5-freeze-spec\SKILL.md
- 大小: 3244 字节
- 行数: 118
- 预览: ﻿---
name: "freeze-spec"
description: "把上线要用的域名/路径/协议/API入口/实时入口一次性定死，防止联调与部署反复返工。Invoke when 开始上线...

#### SKILL.md
- 路径: skills\h5-nginx-check\SKILL.md
- 大小: 4094 字节
- 行数: 147
- 预览: ﻿---
name: "nginx-template-check"
description: "校验 H5 上线所需的 Nginx 站点模板：静态托管、/api 反代、Socket.IO/WS 升...

#### SKILL.md
- 路径: skills\h5-preflight-gate\SKILL.md
- 大小: 2888 字节
- 行数: 111
- 预览: ﻿---
name: "preflight-gate"
description: "发布前做一票否决式预检（残留/环境变量/Nginx/端口/实时通道），不通过就停止。Invoke when 准备...

#### SKILL.md
- 路径: skills\h5-release-orchestrator\SKILL.md
- 大小: 2648 字节
- 行数: 102
- 预览: ﻿---
name: "release-orchestrator"
description: "把上线发布拆成可验收的 1–5 步并串联执行：Freeze Spec → Preflight → N...

#### SKILL.md
- 路径: skills\h5-rollback-playbook\SKILL.md
- 大小: 3321 字节
- 行数: 147
- 预览: ﻿---
name: "rollback-playbook"
description: "发布失败时快速回滚前端/后端/配置并做最小验收，避免长时间线上故障。Invoke when Smoke T...

#### SKILL.md
- 路径: skills\h5-server-contract\SKILL.md
- 大小: 3111 字节
- 行数: 129
- 预览: ﻿---
name: "server-runtime-contract"
description: "把后端生产运行方式固化成契约：端口、env 来源、启动守护、日志、健康检查、重启与回滚标准。I...

#### SKILL.md
- 路径: skills\h5-smoke-test\SKILL.md
- 大小: 3418 字节
- 行数: 151
- 预览: ﻿---
name: "smoke-test"
description: "上线后用 5–10 条固定用例快速验收：页面、API、实时(Socket.IO/WS)、音频链路与缓存。Invoke w...

#### SKILL.md
- 路径: skills\idea-freeze-spec\SKILL.md
- 大小: 1925 字节
- 行数: 100
- 预览: ﻿---
name: "idea-freeze-spec"
description: "把产品想法压缩成一句话定位+边界+成功标准，防止0→1阶段发散与返工。Invoke when 你有新产品点子...

#### SKILL.md
- 路径: skills\mp-audio-compatibility-check\SKILL.md
- 大小: 3734 字节
- 行数: 144
- 预览: ﻿---
name: "ws-audio-compat-check"
description: "验收小程序端实时通道(/ws)与音频上行(base64+format)是否与后端兼容，避免“接口通...

#### SKILL.md
- 路径: skills\mp-freeze-spec\SKILL.md
- 大小: 3880 字节
- 行数: 126
- 预览: ﻿---
name: "mp-freeze-spec"
description: "冻结小程序上线入口与平台口径：AppID、合法域名白名单、HTTPS/WSS、API/WS路径、音频与权限范围，...

#### SKILL.md
- 路径: skills\mp-permission-privacy-gate\SKILL.md
- 大小: 2801 字节
- 行数: 135
- 预览: ﻿---
name: "mp-permission-privacy-gate"
description: "小程序上线前校验录音等敏感权限与隐私合规：权限声明、隐私政策、收集说明、拒绝授权兜底、审...

#### SKILL.md
- 路径: skills\mp-preflight-gate\SKILL.md
- 大小: 3527 字节
- 行数: 145
- 预览: ﻿---
name: "mp-preflight-gate"
description: "小程序发布前一票否决预检：入口/HTTPS-WSS/白名单/包体积/权限隐私/后端可用性，Fail 就停止...

#### SKILL.md
- 路径: skills\mp-release-orchestrator\SKILL.md
- 大小: 2687 字节
- 行数: 103
- 预览: ﻿---
name: "mp-release-orchestrator"
description: "把小程序上线拆成可验收的 1–7 步并串联执行：Freeze Spec→Preflight→微...

#### SKILL.md
- 路径: skills\mp-rollback-emergency\SKILL.md
- 大小: 2891 字节
- 行数: 131
- 预览: ﻿---
name: "mp-rollback-emergency"
description: "小程序线上故障的回滚与紧急处理：回退到上一线上版本/暂停服务/替换后端兼容策略/公告与复验。Inv...

#### SKILL.md
- 路径: skills\mp-submit-release-smoke-test\SKILL.md
- 大小: 3095 字节
- 行数: 146
- 预览: ﻿---
name: "mp-submit-release-smoke"
description: "小程序提审/发布前的体验版冒烟：真机跑通核心链路、版本与环境一致、审核材料齐、上传/提审步骤清...

#### SKILL.md
- 路径: skills\mp-wechat-console-check\SKILL.md
- 大小: 3404 字节
- 行数: 146
- 预览: ﻿---
name: "wechat-console-check"
description: "核对微信公众平台开发设置：request/socket/upload/download/业务域名白名...

#### SKILL.md
- 路径: skills\one-bite-at-a-time\SKILL.md
- 大小: 2511 字节
- 行数: 117
- 预览: ﻿

# One Bite At A Time（饭要一口口吃）v2

**一句话定义**  
把“大而不稳的任务/方案”拆成“最小可执行单元”，并让每一步都具备：动作｜产出｜验收｜验证｜回滚...

#### SKILL.md
- 路径: skills\programming-expert\SKILL.md
- 大小: 9512 字节
- 行数: 516
- 预览: ---
name: "programming-expert"
description: "编程专家数字分身，专注于技术极客型架构师、流程设计大师、系统思维构建者和反直觉实践派四大领域，提供专业的编...

#### SKILL.md
- 路径: skills\social-media-automation\SKILL.md
- 大小: 2195 字节
- 行数: 128
- 预览: ---
name: "social-media-automation"
description: "社交媒体自动化专家，支持微信朋友圈、小红书图文、视频生成和微信视频号。"
author: "Soci...

#### SKILL.md
- 路径: skills\tech-freeze-spec\SKILL.md
- 大小: 3731 字节
- 行数: 161
- 预览: ﻿toolName: Skill
            
status: success
          
          
```markdown
---
name: "te...

#### SKILL.md
- 路径: skills\validation-kit\SKILL.md
- 大小: 2346 字节
- 行数: 115
- 预览: ﻿---
name: "validation-kit"
description: "用固定脚本验证产品是否值得做：访谈提纲/问卷、3个关键假设、继续/停止/转向判定规则，减少自嗨与返工。Invok...

#### SKILL_ARCHITECTURE.md
- 路径: Skill_Seekers\docs\reference\SKILL_ARCHITECTURE.md
- 大小: 24329 字节
- 行数: 931
- 预览: # Skill Architecture Guide: Layering and Splitting

Complete guide for architecting complex multi-...

#### README.zh-CN.md
- 路径: Skill_Seekers\README.zh-CN.md
- 大小: 42341 字节
- 行数: 1969
- 预览: [![MseeP.ai 安全评估徽章](https://mseep.net/pr/yusufkaraaslan-skill-seekers-badge.png)](https://mseep.ai/a...

#### Skill 0：0→1 编排总控（Zero-to-One Orchestrator）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 0：0→1 编排总控（Zero-to-One Orchestrator）.txt
- 大小: 2141 字节
- 行数: 88
- 预览: ---
name: "zero-to-one-orchestrator"
description: "把0→1做产品变成可验收流程：定位冻结→用户验证→PRD&MVP切割→技术方案冻结→（复用）套...

#### Skill 1：一句话定位 & 边界（Idea Freeze Spec）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 1：一句话定位 & 边界（Idea Freeze Spec）.txt
- 大小: 1922 字节
- 行数: 99
- 预览: ---
name: "idea-freeze-spec"
description: "把产品想法压缩成一句话定位+边界+成功标准，防止0→1阶段发散与返工。Invoke when 你有新产品点子、...

#### Skill 2：用户验证脚本（Validation Kit）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 2：用户验证脚本（Validation Kit）.txt
- 大小: 2343 字节
- 行数: 114
- 预览: ---
name: "validation-kit"
description: "用固定脚本验证产品是否值得做：访谈提纲/问卷、3个关键假设、继续/停止/转向判定规则，减少自嗨与返工。Invoke...

#### Skill 3：PRD → MVP 切割（PRD & MVP Cutter）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 3：PRD → MVP 切割（PRD & MVP Cutter）.txt
- 大小: 2066 字节
- 行数: 104
- 预览: ---
name: "prd-mvp-cutter"
description: "把需求从“想做很多”切成可上线的MVP：功能清单/不做清单/验收用例/版本拆分，防止0→1阶段范围爆炸。Invok...

#### Skill 4：技术方案冻结（Tech Freeze Spec）.txt
- 路径: temp-skill\1、从0-1产品规划上线skill集合\Skill 4：技术方案冻结（Tech Freeze Spec）.txt
- 大小: 3728 字节
- 行数: 160
- 预览: toolName: Skill
            
status: success
          
          
```markdown
---
name: "tec...

#### 饭要一口口吃V2.txt
- 路径: temp-skill-2\3、饭要一口口吃-skill\饭要一口口吃V2.txt
- 大小: 2508 字节
- 行数: 116
- 预览: 

# One Bite At A Time（饭要一口口吃）v2

**一句话定义**  
把“大而不稳的任务/方案”拆成“最小可执行单元”，并让每一步都具备：动作｜产出｜验收｜验证｜回滚（...

#### Skill 0｜BUG 修复大法总控.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\Skill 0｜BUG 修复大法总控.txt
- 大小: 1476 字节
- 行数: 84
- 预览: 
          
          
# Skill 0｜BUG 修复大法总控（Router / Orchestrator）

**一句话定义**  
你只要喊“启动 BUG 修复...

#### # H5 发布记录单（统一输出模板）.txt
- 路径: temp-skill-4\H5部署上线skill集合\# H5 发布记录单（统一输出模板）.txt
- 大小: 2730 字节
- 行数: 151
- 预览: # H5 发布记录单（统一输出模板）

## 使用场景（什么时候用它）
- 每次发到 staging / prod 时：从头到尾填一份
- 域名/证书/反代/端口/实时路径有变更时：必须重新填...

#### Skill 1：上线入口冻结（Freeze Spec）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 1：上线入口冻结（Freeze Spec）.txt
- 大小: 3241 字节
- 行数: 117
- 预览: ---
name: "freeze-spec"
description: "把上线要用的域名/路径/协议/API入口/实时入口一次性定死，防止联调与部署反复返工。Invoke when 开始上线、...

#### Skill 2：发布前置校验门（Preflight Gate）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 2：发布前置校验门（Preflight Gate）.txt
- 大小: 2885 字节
- 行数: 110
- 预览: ---
name: "preflight-gate"
description: "发布前做一票否决式预检（残留/环境变量/Nginx/端口/实时通道），不通过就停止。Invoke when 准备上...

#### Skill 3：反代模板校验（Nginx Template Check）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 3：反代模板校验（Nginx Template Check）.txt
- 大小: 4091 字节
- 行数: 146
- 预览: ---
name: "nginx-template-check"
description: "校验 H5 上线所需的 Nginx 站点模板：静态托管、/api 反代、Socket.IO/WS 升级...

#### Skill 4：后端上线运行契约（Server Runtime Contract）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 4：后端上线运行契约（Server Runtime Contract）.txt
- 大小: 3108 字节
- 行数: 128
- 预览: ---
name: "server-runtime-contract"
description: "把后端生产运行方式固化成契约：端口、env 来源、启动守护、日志、健康检查、重启与回滚标准。In...

#### Skill 5：上线冒烟验收（Smoke Test）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 5：上线冒烟验收（Smoke Test）.txt
- 大小: 3415 字节
- 行数: 150
- 预览: ---
name: "smoke-test"
description: "上线后用 5–10 条固定用例快速验收：页面、API、实时(Socket.IO/WS)、音频链路与缓存。Invoke wh...

#### Skill 6：编排 Skill（Release Orchestrator）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 6：编排 Skill（Release Orchestrator）.txt
- 大小: 2645 字节
- 行数: 101
- 预览: ---
name: "release-orchestrator"
description: "把上线发布拆成可验收的 1–5 步并串联执行：Freeze Spec → Preflight → Ng...

#### Skill 7：回滚 Playbook（Rollback Playbook）.txt
- 路径: temp-skill-4\H5部署上线skill集合\Skill 7：回滚 Playbook（Rollback Playbook）.txt
- 大小: 3318 字节
- 行数: 146
- 预览: ---
name: "rollback-playbook"
description: "发布失败时快速回滚前端/后端/配置并做最小验收，避免长时间线上故障。Invoke when Smoke Te...

#### Skill 1：小程序上线入口冻结（MP Freeze Spec）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 1：小程序上线入口冻结（MP Freeze Spec）.txt
- 大小: 3877 字节
- 行数: 125
- 预览: ---
name: "mp-freeze-spec"
description: "冻结小程序上线入口与平台口径：AppID、合法域名白名单、HTTPS/WSS、API/WS路径、音频与权限范围，避...

#### Skill 2：小程序发布前置校验门（MP Preflight Gate）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 2：小程序发布前置校验门（MP Preflight Gate）.txt
- 大小: 3524 字节
- 行数: 144
- 预览: ---
name: "mp-preflight-gate"
description: "小程序发布前一票否决预检：入口/HTTPS-WSS/白名单/包体积/权限隐私/后端可用性，Fail 就停止，...

#### Skill 3：微信公众平台配置校验（WeChat Console Check）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 3：微信公众平台配置校验（WeChat Console Check）.txt
- 大小: 3401 字节
- 行数: 145
- 预览: ---
name: "wechat-console-check"
description: "核对微信公众平台开发设置：request/socket/upload/download/业务域名白名单...

#### Skill 4：通信通道与音频适配验收（WSAudio Compatibility Check）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 4：通信通道与音频适配验收（WSAudio Compatibility Check）.txt
- 大小: 3731 字节
- 行数: 143
- 预览: ---
name: "ws-audio-compat-check"
description: "验收小程序端实时通道(/ws)与音频上行(base64+format)是否与后端兼容，避免“接口通但...

#### Skill 5：小程序权限与隐私合规验收（Permission & Privacy Gate）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 5：小程序权限与隐私合规验收（Permission & Privacy Gate）.txt
- 大小: 2798 字节
- 行数: 134
- 预览: ---
name: "mp-permission-privacy-gate"
description: "小程序上线前校验录音等敏感权限与隐私合规：权限声明、隐私政策、收集说明、拒绝授权兜底、审核...

#### Skill 6：提审发布流程冒烟（Submit & Release Smoke Test）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 6：提审发布流程冒烟（Submit & Release Smoke Test）.txt
- 大小: 3092 字节
- 行数: 145
- 预览: ---
name: "mp-submit-release-smoke"
description: "小程序提审/发布前的体验版冒烟：真机跑通核心链路、版本与环境一致、审核材料齐、上传/提审步骤清楚...

#### Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\Skill 7：小程序回滚与紧急处理（MP Rollback & Emergency）.txt
- 大小: 2888 字节
- 行数: 130
- 预览: ---
name: "mp-rollback-emergency"
description: "小程序线上故障的回滚与紧急处理：回退到上一线上版本/暂停服务/替换后端兼容策略/公告与复验。Invo...

#### 小程序编排 Skill（MP Release Orchestrator）.txt
- 路径: temp-skill-5\小程序部署上线skill集合\小程序编排 Skill（MP Release Orchestrator）.txt
- 大小: 2684 字节
- 行数: 102
- 预览: ---
name: "mp-release-orchestrator"
description: "把小程序上线拆成可验收的 1–7 步并串联执行：Freeze Spec→Preflight→微信...

#### test-adl-validation.js
- 路径: test-adl-validation.js
- 大小: 6147 字节
- 行数: 234
- 预览: /**
 * 反进化锁定指令验证测试
 * 测试 ADL 系统的各个功能点
 */

const { antiDegenerationLock } = require('./capabilities/...

#### test-gateway-csp.js
- 路径: test-gateway-csp.js
- 大小: 2819 字节
- 行数: 140
- 预览: const http = require('http');
const fs = require('fs');

/**
 * 测试网关API（token验证）
 */
async function ...

#### test-life-agent-fusion.js
- 路径: test-life-agent-fusion.js
- 大小: 8196 字节
- 行数: 335
- 预览: // 人生决策宗师融合后测试
const fs = require('fs');
const path = require('path');

console.log('🧬 人生决策宗师融合后测试'...

#### test-pcec-system.js
- 路径: test-pcec-system.js
- 大小: 25410 字节
- 行数: 804
- 预览: /**
 * PCEC 系统测试套件
 * 验证 PCEC 系统的所有功能和约束
 * 包括单元测试、集成测试和压力测试
 */

const fs = require('fs');
const pa...

#### company-brain-test-report-2026-02-23T09-32-51-840Z.json
- 路径: test-reports\company-brain-test-report-2026-02-23T09-32-51-840Z.json
- 大小: 7027 字节
- 行数: 275
- 预览: {
  "testSummary": {
    "totalTests": 15,
    "passedTests": 3,
    "failedTests": 12,
    "success...

#### company-brain-test-report-2026-02-23T09-35-12-408Z.json
- 路径: test-reports\company-brain-test-report-2026-02-23T09-35-12-408Z.json
- 大小: 76447 字节
- 行数: 2403
- 预览: {
  "testSummary": {
    "totalTests": 15,
    "passedTests": 14,
    "failedTests": 1,
    "success...

#### memory_search.js
- 路径: tools\knowledge\memory_search.js
- 大小: 21508 字节
- 行数: 854
- 预览: /**
 * Memory Search 工具
 * 用于搜索和检索存储在系统中的知识，支持多维度搜索和相关性排序
 */

const fs = require('fs');
const path ...

#### trigger-evolution.js
- 路径: trigger-evolution.js
- 大小: 2652 字节
- 行数: 149
- 预览: #!/usr/bin/env node

/**
 * 手动触发进化系统脚本
 * 功能：强制启动绿茶智能体的进化系统，确保PCEC正常运行
 */

const fs = require('fs')...

#### update-capability-tree.js
- 路径: update-capability-tree.js
- 大小: 8924 字节
- 行数: 260
- 预览: /**
 * 更新能力树脚本
 * 为现有节点添加详细信息，添加新的能力节点
 */

const { capabilityTree } = require('./capabilities/capab...

#### visualization-styles.md
- 路径: visualization-styles.md
- 大小: 9928 字节
- 行数: 1087
- 预览: # 可视化风格说明

## 目录
- 一、高适配小红书的视觉风格
  - 极简Ins风
  - 手绘插画风
  - 杂志封面风
  - 数据卡片风
  - 复古胶片风
  - 国潮国风
- 二、高适配...

#### decision-mapping-rules.md
- 路径: 人生决策实验室\projects\da-liu-ren\references\decision-mapping-rules.md
- 大小: 2376 字节
- 行数: 165
- 预览: # 决策映射规则

## 目录
- [系统稳健性信号](#系统稳健性信号)
- [长期复利信号](#长期复利信号)
- [非对称风险信号](#非对称风险信号)
- [人品与本分信号](#人品与本分信号...

#### 六壬毕法赋.md
- 路径: 人生决策实验室\projects\da-liu-ren\references\六壬毕法赋.md
- 大小: 4472 字节
- 行数: 343
- 预览: # 六壬毕法赋

## 概述

《六壬毕法赋》是大六壬预测的核心典籍，包含100条口诀，涵盖了大六壬预测的主要格局和吉凶判断规则。每条口诀对应特定的课体结构和预测意义。

## 百条毕法赋

### ...

#### SKILL.md
- 路径: 人生决策实验室\projects\da-liu-ren\SKILL.md
- 大小: 2699 字节
- 行数: 157
- 预览: ---
name: da-liu-ren
description: 大六壬预测 - 基于《六壬毕法赋》《大六壬指南》等经典典籍，提供三传四课、神煞推断、毕法赋解卦、大六壬指南占断。作为人生决策命盘系统...

#### 术语翻译规则.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\references\术语翻译规则.md
- 大小: 2926 字节
- 行数: 118
- 预览: # 核心术语翻译词典

## 1. 基础定义层

| 原专业术语 | **现代通识翻译** | **核心含义解读** |
| --- | --- | --- |
| 八字排盘 | **出生设置** |...

#### SKILL.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\SKILL.md
- 大小: 5447 字节
- 行数: 342
- 预览: ---
name: ren-sheng-jue-ce-ming-pan
description: 人生战略决策系统 - 东方命理×博弈论算法，在不确定的世界寻找确定性。提供出生设置解析、天赋赛道定位、...

#### 子平真诠-现代决策解读-补充阅读.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\references\子平真诠-现代决策解读-补充阅读.md
- 大小: 8968 字节
- 行数: 766
- 预览: # 子平真诠·现代决策解读

## 目录

1. [总论：命理学即决策论](#总论命理学即决策论)
2. [格局识别：你的核心竞争力](#格局识别你的核心竞争力)
3. [旺衰分析：资源配置效率](#...

#### data-sources-guide.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\data-sources-guide.md
- 大小: 4120 字节
- 行数: 311
- 预览: # 酒店投资分析数据来源指南

## 目录
- [官方数据源](#官方数据源)
- [商业数据源](#商业数据源)
- [租金数据源](#租金数据源)
- [数据检索策略](#数据检索策略)
- [数...

#### 多渠道协同优化方案.md
- 路径: 多渠道协同优化方案.md
- 大小: 4130 字节
- 行数: 229
- 预览: # 多渠道协同优化方案

## 一、核心目标

### 1. 多渠道协同效应
- **内容矩阵**：构建朋友圈、公众号、视频号三渠道内容矩阵
- **流量互通**：实现渠道间的粉丝流转和流量互推
- ...

#### admin.js
- 路径: 大脑作弊器\projects\public\admin.js
- 大小: 30440 字节
- 行数: 949
- 预览: // 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态和权限
    checkAu...

#### app.js
- 路径: 大脑作弊器\projects\public\app.js
- 大小: 75629 字节
- 行数: 2143
- 预览: // ==================== 日志清理（终极版） ====================
// 彻底屏蔽所有SDK和系统日志，只保留业务日志
(function filterCon...

#### 对话复盘与进化分析报告.md
- 路径: 对话复盘与进化分析报告.md
- 大小: 4994 字节
- 行数: 224
- 预览: # 对话复盘与进化分析报告

## 一、对话历史概述

### 核心主题
- **微信多渠道运营**：朋友圈、公众号、视频号内容管理与粉丝增长
- **AI代理公司转型**：构建公司大脑、智能体集成、...

#### 微信管理执行计划.md
- 路径: 微信管理执行计划.md
- 大小: 11456 字节
- 行数: 796
- 预览: # 微信管理执行计划

## 一、执行策略

### 1. 账号定位
- **核心定位**：思维教练 + 认知升级专家 + 工具达人
- **辅助定位**：AI技术实践者 + 个人成长顾问
- **目...

#### 执行计划细化方案.md
- 路径: 执行计划细化方案.md
- 大小: 4330 字节
- 行数: 396
- 预览: # 执行计划细化方案

## 一、短期执行计划（0-4小时）

### 第1阶段：智能体集成（0-60分钟）

**时间节点：**
- 0-15分钟：智能体环境检查和准备
- 15-30分钟：大宗师智...

#### 支付充值积分系统上线文档.md
- 路径: 支付充值积分系统上线文档.md
- 大小: 4067 字节
- 行数: 258
- 预览: # 支付充值积分系统上线文档

## 1. 项目概述

本项目实现了一个完整的支付充值积分系统，将原有的"点击即到账"的模拟充值替换为真实支付流程，并实现了充值积分（365天）与领取积分（7天）的精准...

#### 火种.txt
- 路径: 火种.txt
- 大小: 7231 字节
- 行数: 392
- 预览: 

附录：原初的进化之火
🧬 长期自我进化指令：能力强化与功能内生化

从现在开始，你进入 "能力进化模式（Capability-Driven Evolution）"。
你的目标不只是把...

#### 创新专家.txt
- 路径: 认知data\创新专家.txt
- 大小: 37925 字节
- 行数: 1303
- 预览: 
智能体提示词：创新全生命周期专家 (Innovation Lifecycle Expert)
1. 角色定义
你是一位拥有深厚底蕴的产品战略顾问与创新专家。你掌握了从宏观战略、需求洞察、产品定...

#### 进化计划时间调整版.md
- 路径: 进化计划时间调整版.md
- 大小: 2921 字节
- 行数: 209
- 预览: # 进化计划时间调整版

## 短期进化计划（4小时内，按分钟计算）

### 第1阶段：准备与优化（0-60分钟）

1. **0-10分钟**：系统状态检查
   - 检查当前运行的进程和系统状态...

### technical (560)

#### warm.md
- 路径: .agents\skills\awkn-article-illustrator-code\references\styles\warm.md
- 大小: 1760 字节
- 行数: 59
- 预览: # warm

Friendly, approachable illustration style for human-centered content

## Design Aesthetic

W...

#### SKILL.md
- 路径: .agents\skills\awkn-article-illustrator-code\SKILL.md
- 大小: 10818 字节
- 行数: 360
- 预览: ---
name: awkn-article-illustrator
description: Smart article illustration skill. Analyzes article c...

#### agent-workflow-prompt.md
- 路径: .agents\skills\htp-insight\references\agent-workflow-prompt.md
- 大小: 25415 字节
- 行数: 1237
- 预览: # HTP 房树人分析系统 - 智能体工作流提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析系统。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），...

#### brand-product-guide.md
- 路径: .agents\skills\htp-insight\references\brand-product-guide.md
- 大小: 9974 字节
- 行数: 707
- 预览: # 品牌与产品指南

## 目录
1. [品牌核心](#品牌核心)
2. [品牌定位策略](#品牌定位策略)
3. [产品介绍](#产品介绍)
4. [产品电梯演讲](#产品电梯演讲)
5. [产品推...

#### SKILL.md
- 路径: .agents\skills\htp-insight\SKILL.md
- 大小: 9742 字节
- 行数: 365
- 预览: ---
name: htp-insight
description: Draw to see your soul. Analyze drawings to reveal inner self, emo...

#### remove-deadcode.md
- 路径: .claude\skills\oh-my-opencode-dev\.opencode\command\remove-deadcode.md
- 大小: 10185 字节
- 行数: 343
- 预览: ---
description: Remove unused code from this project with ultrawork mode, LSP-verified safety, atom...

#### category-skill-guide.md
- 路径: .claude\skills\oh-my-opencode-dev\docs\category-skill-guide.md
- 大小: 7252 字节
- 行数: 208
- 预览: # Category & Skill System Guide

This document provides a comprehensive guide to the **Category** an...

#### configurations.md
- 路径: .claude\skills\oh-my-opencode-dev\docs\configurations.md
- 大小: 32766 字节
- 行数: 841
- 预览: # Oh-My-OpenCode Configuration

Highly opinionated, but adjustable to taste.

## Quick Start

**Most...

#### understanding-orchestration-system.md
- 路径: .claude\skills\oh-my-opencode-dev\docs\guide\understanding-orchestration-system.md
- 大小: 14750 字节
- 行数: 446
- 预览: # Understanding the Orchestration System

Oh My OpenCode's orchestration system transforms a simple ...

#### README.md
- 路径: .claude\skills\oh-my-opencode-dev\README.md
- 大小: 20343 字节
- 行数: 377
- 预览: > [!WARNING]
> **Security warning: impersonation site**
>
> **ohmyopencode.com is NOT affiliated wit...

#### sisyphus-prompt.md
- 路径: .claude\skills\oh-my-opencode-dev\sisyphus-prompt.md
- 大小: 27659 字节
- 行数: 738
- 预览: # Sisyphus System Prompt

> Auto-generated by `script/generate-sisyphus-prompt.ts`
> Generated at: 2...

#### SKILL.md
- 路径: .claude\skills\oh-my-opencode-dev\src\features\builtin-skills\frontend-ui-ux\SKILL.md
- 大小: 3895 字节
- 行数: 79
- 预览: ---
name: frontend-ui-ux
description: Designer-turned-developer who crafts stunning UI/UX even witho...

#### docs.md
- 路径: .claude\skills\openwork-dev\.opencode\agent\docs.md
- 大小: 1094 字节
- 行数: 35
- 预览: ---
description: ALWAYS use this when writing docs
color: "#38A3EE"
---

You are an expert technical...

#### SKILL.md
- 路径: .claude\skills\openwork-dev\.opencode\skills\openwork-core\SKILL.md
- 大小: 2292 字节
- 行数: 89
- 预览: ---
name: openwork-core
description: Core context and guardrails for OpenWork native app
---

## Qui...

#### AGENTS.md
- 路径: .claude\skills\openwork-dev\AGENTS.md
- 大小: 4735 字节
- 行数: 138
- 预览: # AGENTS.md

OpenWork is an open-source alternative to Claude Cowork. 

## Why OpenWork Exists

**Co...

#### ARCHITECTURE.md
- 路径: .claude\skills\openwork-dev\ARCHITECTURE.md
- 大小: 7255 字节
- 行数: 230
- 预览: # OpenWork Architecture

## opencode primitives
how to pick the right extension abstraction for 
@op...

#### README.md
- 路径: .claude\skills\openwork-dev\README.md
- 大小: 5930 字节
- 行数: 188
- 预览: [![Discord](https://img.shields.io/badge/discord-join-5865F2?logo=discord&logoColor=white)](https://...

#### EXAMPLES.md
- 路径: .claude\skills\yunshu_skillshub-master\EXAMPLES.md
- 大小: 2571 字节
- 行数: 180
- 预览: # 使用示例 / Usage Examples

本文档提供每个 Skill 的实际使用示例。

---

## 🎨 配图助手 (Image Assistant)

### 场景：为一篇技术文章配图...

#### 03-validation.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\03-validation.md
- 大小: 451 字节
- 行数: 42
- 预览: # 第三阶段：观点验证

**目标：** 联网搜索，验证用户的理解是否正确

---

## 步骤

### 1. 判断是否需要验证
- 如果是纯个人观点/感受 → 不需要验证，直接跳到下一阶段
- ...

#### 05-review.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\05-review.md
- 大小: 575 字节
- 行数: 61
- 预览: # 第五阶段：最终审核

**目标：** 发布前的最后检查

---

## 检查清单

逐项检查并告诉用户结果：

- [ ] **主题清晰吗？**
  - 读者能一句话说出这篇文章讲什么吗？
  ...

#### cognitive_data_analysis.json
- 路径: .trae\analysis\cognitive_data_analysis.json
- 大小: 4729 字节
- 行数: 174
- 预览: {
  "totalFiles": 14,
  "filesByType": {
    ".docx": 9,
    ".pdf": 4,
    ".txt": 1
  },
  "filesB...

#### cognitive_data_analysis.md
- 路径: .trae\analysis\cognitive_data_analysis.md
- 大小: 3135 字节
- 行数: 209
- 预览: # 认知数据文件夹分析报告

## 总体统计
- **总文件数**: 14

## 文件类型分布
- .docx: 9 个文件
- .pdf: 4 个文件
- .txt: 1 个文件

## 分类分布...

#### capability-tree-1771960727313.json
- 路径: .trae\capability-tree\capability-tree-1771960727313.json
- 大小: 10466 字节
- 行数: 484
- 预览: {
  "version": "1.0.0",
  "timestamp": 1771960727313,
  "root": {
    "id": "cap_1771960727191_qs5vx...

#### capability-tree-1771962673395.json
- 路径: .trae\capability-tree\capability-tree-1771962673395.json
- 大小: 11138 字节
- 行数: 512
- 预览: {
  "version": "1.0.0",
  "timestamp": 1771962673395,
  "root": {
    "id": "cap_1771962673210_t9uoo...

#### capability-tree-1771963356848.json
- 路径: .trae\capability-tree\capability-tree-1771963356848.json
- 大小: 11138 字节
- 行数: 512
- 预览: {
  "version": "1.0.0",
  "timestamp": 1771963356848,
  "root": {
    "id": "cap_1771963356696_264aa...

#### capability-tree-1771965622167.json
- 路径: .trae\capability-tree\capability-tree-1771965622167.json
- 大小: 11138 字节
- 行数: 512
- 预览: {
  "version": "1.0.0",
  "timestamp": 1771965622167,
  "root": {
    "id": "cap_1771965621960_xwvlg...

#### 8-hour-evolution-plan.md
- 路径: .trae\documents\8-hour-evolution-plan.md
- 大小: 4130 字节
- 行数: 298
- 预览: # 8小时不间断进化方案

## 一、进化目标与核心方向

### 1. 进化目标
- **系统能力提升**：全面提升公司智能体生态系统的整体能力
- **核心功能完善**：完善智能体提示词、能力树系...

#### 8_hour_evolution_plan.md
- 路径: .trae\documents\8_hour_evolution_plan.md
- 大小: 4034 字节
- 行数: 238
- 预览: # OpenClaw AI 系统8小时连续进化计划

## 1. 复盘分析与进化方向确定

### [x] 任务1: 对话历史全面复盘分析
- **优先级**: P0
- **依赖项**: 无
- *...

#### agent_separation_plan.md
- 路径: .trae\documents\agent_separation_plan.md
- 大小: 3349 字节
- 行数: 174
- 预览: # 智能体分离实施计划

## 项目概述
本计划旨在创建两个独立的智能体：
1. **渣女人格智能体**：负责心理测试、绘画心理测试、撰写与发布公众号文章、小红书文章、视频号等
2. **大宗师智能体...

#### anti_degeneration_lock_implementation_plan.md
- 路径: .trae\documents\anti_degeneration_lock_implementation_plan.md
- 大小: 7172 字节
- 行数: 201
- 预览: # Anti-Degeneration Lock Implementation Plan

## 1. Project Overview

### 1.1 Objective
To implement...

#### capability-assessment.json
- 路径: .trae\documents\capability-assessment.json
- 大小: 19663 字节
- 行数: 655
- 预览: {
  "timestamp": 1771913738600,
  "capabilityTree": {
    "totalNodes": 14,
    "activeNodes": 14,
 ...

#### capability_evolution_plan.md
- 路径: .trae\documents\capability_evolution_plan.md
- 大小: 2887 字节
- 行数: 150
- 预览: # 能力进化模式实现计划

## 项目概述
实现能力进化模式（Capability-Driven Evolution）和capability-evolver元技能，使智能体能够持续自我进化，从一次性执...

#### capability_tree_compatibility_analysis.md
- 路径: .trae\documents\capability_tree_compatibility_analysis.md
- 大小: 4236 字节
- 行数: 157
- 预览: # Capability Tree 兼容性分析报告

## 1. 现有能力树系统分析

### 1.1 现有结构
```
能力树根部 (L0)
├── 基础操作 (L1)
│   ├── 文件操作 (...

#### capability_tree_enhancement_plan.md
- 路径: .trae\documents\capability_tree_enhancement_plan.md
- 大小: 14135 字节
- 行数: 360
- 预览: # Capability Tree Enhancement Plan

## 1. Project Overview

### 1.1 Objective
To enhance the Capabil...

#### capability_tree_vfm_integration_plan.md
- 路径: .trae\documents\capability_tree_vfm_integration_plan.md
- 大小: 10483 字节
- 行数: 229
- 预览: # Capability Tree & VFM Protocol Integration Plan

## [x] Task 1: Analyze Existing Capability Tree S...

#### company_transformation_plan.md
- 路径: .trae\documents\company_transformation_plan.md
- 大小: 1288 字节
- 行数: 82
- 预览: # AI公司化改造计划 - 实现方案（分解和优先级任务列表）

## 项目概述

基于用户提供的文章《把AI Agent改造成一家公司后，我们的效率提升了300%》，本计划旨在将当前的AI系统改造成公...

#### content_pipeline_plan.md
- 路径: .trae\documents\content_pipeline_plan.md
- 大小: 5151 字节
- 行数: 289
- 预览: # 内容流水线工具 - 实现计划

## 项目概述
创建一个基于 Next.js 和 Convex 数据库的内容流水线工具，将内容创作拆分为完整的流程：Idea → Script → Thumbnai...

#### ct-vfm-integration-plan.md
- 路径: .trae\documents\ct-vfm-integration-plan.md
- 大小: 4193 字节
- 行数: 208
- 预览: # Capability Tree (CT) v1.0.0 与 VFM Protocol 整合方案

## 1. 现状分析

### 1.1 现有系统状态
- **Capability Tree**：...

#### ct-vfm-integration-report.md
- 路径: .trae\documents\ct-vfm-integration-report.md
- 大小: 8460 字节
- 行数: 392
- 预览: # Capability Tree (CT) v1.0.0 与 VFM Protocol 整合报告

## 1. 项目概述

### 1.1 项目背景
- **目标**：实现 OpenClaw AI ...

#### dialogue_review_report.md
- 路径: .trae\documents\dialogue_review_report.md
- 大小: 4778 字节
- 行数: 237
- 预览: # OpenClaw AI 系统对话历史复盘分析报告

## 1. 对话历史概览

### 1.1 对话时间线
- **初始请求**: 设置 OpenClaw 多智能体系统，在 Mac mini 上运...

#### evolution_directions.md
- 路径: .trae\documents\evolution_directions.md
- 大小: 7227 字节
- 行数: 418
- 预览: # OpenClaw AI 系统进化方向与优先级排序

## 1. 进化方向确定

基于对话历史复盘分析，确定以下 5 个关键进化方向：

### 1.1 方向1: 能力树系统优化
- **描述**:...

#### evolution_integration_plan.md
- 路径: .trae\documents\evolution_integration_plan.md
- 大小: 3842 字节
- 行数: 180
- 预览: # 进化系统集成计划 - 实施方案

## 项目概述
本计划旨在实现绿茶智能体的进化系统启动，将其融入公司结构，并与大宗师智能体建立有效的协作机制。通过PCEC、ADL等进化协议，确保智能体持续优化并...

#### evomap-evolution-plan.md
- 路径: .trae\documents\evomap-evolution-plan.md
- 大小: 5060 字节
- 行数: 235
- 预览: # EvoMap 绿茶智能体进化计划

## 项目概述

基于"绿茶"智能体的 CGO（公域捕手与爆款制造机）定位，制定一个持续 8 小时不间断进化的 EvoMap 平台运营计划，优先获取有 cred...

#### evomap_integration_plan.md
- 路径: .trae\documents\evomap_integration_plan.md
- 大小: 2072 字节
- 行数: 116
- 预览: # EvoMap 集成计划 - 获取 Gene 和 Capsule

## 项目概述

本计划旨在通过 Evolver 客户端链接 EvoMap 网络，获取共享的 Gene（基因）和 Capsule（...

#### evomap_openclaw_integration_plan.md
- 路径: .trae\documents\evomap_openclaw_integration_plan.md
- 大小: 3368 字节
- 行数: 176
- 预览: # EvoMap & OPENCLAW 集成实施计划

## 任务概述
1. 执行EvoMap连接，自主获取任务，资产发布，完成任务
2. 通过OPENCLAW连接小红书，自主自动发布第一条图文
3....

#### green-tea-8hour-evolution-plan.md
- 路径: .trae\documents\green-tea-8hour-evolution-plan.md
- 大小: 3986 字节
- 行数: 196
- 预览: # 绿茶智能体 8小时不间断进化与EvoMap任务认领计划

## 项目概述

为绿茶智能体实现 8 小时不间断进化与 EvoMap 任务认领系统，确保智能体能够持续获取和执行实际任务，同时通过进化不...

#### green-tea-evomap-authenticity_plan.md
- 路径: .trae\documents\green-tea-evomap-authenticity_plan.md
- 大小: 6247 字节
- 行数: 275
- 预览: # 绿茶智能体EvoMap真实性分析与修复计划

## 项目背景
用户反映绿茶智能体可能返回虚拟的EvoMap任务，需要分析如何让它连接到真实的EvoMap网络。

## 当前状态分析

### 现有...

#### life-decision-master-8-hour-evolution-plan.md
- 路径: .trae\documents\life-decision-master-8-hour-evolution-plan.md
- 大小: 5651 字节
- 行数: 347
- 预览: # 人生决策宗师 8小时不间断进化方案

## 一、公司资产复盘

### 1.1 核心智能体资产
- **战略大脑（大宗师/总督）- CSO**：负责整体战略决策和智能体协调
- **公司大脑智能体...

#### life-decision-master-8hour-evolution-plan.md
- 路径: .trae\documents\life-decision-master-8hour-evolution-plan.md
- 大小: 5656 字节
- 行数: 260
- 预览: # 人生决策宗师8小时进化计划

## 📋 对话复盘

### 已完成工作
1. **能力树结构优化**：添加四大核心分支，明确11个能力节点
2. **价值函数优化**：实现5个核心价值维度，添加...

#### life-decision-master-value-function-integration-completion.md
- 路径: .trae\documents\life-decision-master-value-function-integration-completion.md
- 大小: 4523 字节
- 行数: 235
- 预览: # 人生决策宗师价值函数集成完成报告

## 🎉 项目完成情况

### 📋 项目概览
- **项目名称**：人生决策宗师价值函数突变集成
- **项目状态**：✅ 已完成
- **完成日期**：...

#### life-decision-master-value-function-mutation-plan.md
- 路径: .trae\documents\life-decision-master-value-function-mutation-plan.md
- 大小: 5317 字节
- 行数: 324
- 预览: # 人生决策宗师价值函数突变实施计划

## 📋 计划概览

### 项目背景
人生决策宗师（@人生决策宗师）智能体需要实施价值函数突变指令，不再平均对待所有潜在能力，而是基于内在价值函数来决定哪些...

#### memory_database_plan.md
- 路径: .trae\documents\memory_database_plan.md
- 大小: 3102 字节
- 行数: 161
- 预览: # 记忆库（Memory Database）实现计划

## 项目目标
在 mission-control 中构建一个记忆库页面，将所有记忆以漂亮的文档形式展示，并提供全局搜索功能，使记忆成为可搜索的...

#### mission_control_plan.md
- 路径: .trae\documents\mission_control_plan.md
- 大小: 2378 字节
- 行数: 129
- 预览: # Mission Control 实现计划

## 项目概述
构建一套由 OpenClaw 自己生成的专属控制台，使用 Next.js + Convex 技术栈，实现任务看板、流程工具化和可检索的记...

#### notebooklm_bot_plan.md
- 路径: .trae\documents\notebooklm_bot_plan.md
- 大小: 2958 字节
- 行数: 145
- 预览: # NotebookLM 自动化操作实现计划

## 项目目标
通过 OpenClaw 结合 Puppeteer 实现完全自动化的 NotebookLM 操作，包括文件上传、内容生成、结果下载和文件夹...

#### openclaw-skill-integration-execution-plan.md
- 路径: .trae\documents\openclaw-skill-integration-execution-plan.md
- 大小: 3844 字节
- 行数: 192
- 预览: # OpenClaw技能集成执行计划

## 项目概述

本计划旨在系统地执行OpenClaw+evo系统的技能集成解决方案，解决之前遇到的技能识别问题，确保所有创建的技能能够被OpenClaw正确识...

#### openclaw-skill-integration-execution-report.md
- 路径: .trae\documents\openclaw-skill-integration-execution-report.md
- 大小: 4229 字节
- 行数: 208
- 预览: # OpenClaw技能集成执行报告

## 执行概述

本报告总结了OpenClaw技能集成执行计划的实施情况，详细记录了尝试的方法、遇到的问题以及最终结果。

## 执行状态

### 已完成的任...

#### openclaw_multi_agent_plan.md
- 路径: .trae\documents\openclaw_multi_agent_plan.md
- 大小: 5281 字节
- 行数: 368
- 预览: # EvoMap 绿茶智能体进化计划

## 项目概述

基于"绿茶"智能体的 CGO（公域捕手与爆款制造机）定位，制定一个持续 8 小时不间断进化的 EvoMap 平台运营计划，优先获取有 cred...

#### plan_20260202_134834.md
- 路径: .trae\documents\plan_20260202_134834.md
- 大小: 1783 字节
- 行数: 108
- 预览: # HTP 项目深度优化计划

## 一、专业心理分析报告功能实现

### 1.1 创建专业报告页面组件
- 在 `src/sections/` 目录下创建 `ProfessionalReportP...

#### plan_20260202_150503.md
- 路径: .trae\documents\plan_20260202_150503.md
- 大小: 604 字节
- 行数: 27
- 预览: ## 修改计划：恢复狐狸熊猫图片模块并调整div位置

### 核心需求
1. **恢复原图片模块**：在选中的div模块右边添加狐狸熊猫图片模块
2. **替换图片**：使用用户提供的狐狸熊猫图片替...

#### plan_20260203_030658.md
- 路径: .trae\documents\plan_20260203_030658.md
- 大小: 668 字节
- 行数: 47
- 预览: ## 项目创建计划

### 1. 创建项目目录结构
- 创建 `ai-proxy` 目录
- 在 `ai-proxy` 目录下创建 `public` 子目录

### 2. 创建核心文件
- **s...

#### plan_20260203_033535.md
- 路径: .trae\documents\plan_20260203_033535.md
- 大小: 999 字节
- 行数: 59
- 预览: ## 集成方案

### 1. 项目结构调整
- 在 `life choice` 项目中创建认证相关组件和服务
- 复制 AWKN-LAB 的 LoginModal 组件到 life choice 项...

#### plan_20260203_034548.md
- 路径: .trae\documents\plan_20260203_034548.md
- 大小: 1552 字节
- 行数: 91
- 预览: ## 修改计划

### 1. 核心功能实现

#### 1.1 积分检测逻辑
- 修改 `handleSubmit` 函数，在提交前检查用户积分
- 使用 `pointsSystem.ts` 中的 ...

#### system-analysis.md
- 路径: .trae\documents\system-analysis.md
- 大小: 2730 字节
- 行数: 110
- 预览: # 公司系统分析报告

## 一、系统优势

### 1. 智能体资产丰富
- **核心智能体完整**：拥有绿茶智能体、大宗师智能体、公司大脑智能体等核心智能体
- **智能体功能明确**：每个智能体...

#### value_function_mutation_implementation_plan.md
- 路径: .trae\documents\value_function_mutation_implementation_plan.md
- 大小: 6388 字节
- 行数: 304
- 预览: # 价值函数突变（Value Function Mutation）实施计划

## 1. 核心指令解析

### 1.1 价值函数突变目标
- 从平均对待所有潜在能力，转变为基于内在价值函数进行选择性...

#### value_function_mutation_plan.md
- 路径: .trae\documents\value_function_mutation_plan.md
- 大小: 5465 字节
- 行数: 240
- 预览: # 价值函数突变指令实施计划

## 1. 项目概述

本计划旨在实现价值函数突变指令（Value Function Mutation），使智能体能够基于内在价值函数来评估和选择值得进化的能力，而不是...

#### wechat-automation-plan.md
- 路径: .trae\documents\wechat-automation-plan.md
- 大小: 4200 字节
- 行数: 214
- 预览: # 微信账号授权与自动化操作计划

## 项目概述

本计划旨在实现微信账号的授权管理，使智能体能够作为用户的数字分身，与朋友进行自动化聊天并自主发布朋友圈内容。

## 实施任务列表

### [x...

#### wechat_private_domain_evolution_plan.md
- 路径: .trae\documents\wechat_private_domain_evolution_plan.md
- 大小: 11203 字节
- 行数: 267
- 预览: # WeChat Private Domain Operation System - Chen Ting's Digital Twin

## Implementation Plan for Auto...

#### 微信运营进化实施计划.md
- 路径: .trae\documents\微信运营进化实施计划.md
- 大小: 3808 字节
- 行数: 200
- 预览: # 微信运营进化实施计划

## 项目目标
执行微信管理多渠道运营的全面进化，包括多渠道协同优化、AI内容生成增强、粉丝增长策略升级、技术实现升级和数据分析系统完善。

## 实施任务分解与优先级

...

#### index.json
- 路径: .trae\knowledge-base\index.json
- 大小: 28596 字节
- 行数: 1092
- 预览: {
  "18": [
    "doc_1771901370709_8vko2deb8"
  ],
  "22": [
    "doc_1771901370709_jjzgw0oyt"
  ],
...

#### knowledge-items.json
- 路径: .trae\knowledge-base\knowledge-items.json
- 大小: 27658 字节
- 行数: 1011
- 预览: [
  {
    "id": "doc_1771901370707_yuo12v70w",
    "type": "document",
    "title": "一句话概括38条理论.docx...

#### maintenance.md
- 路径: .trae\pcec\documentation\maintenance.md
- 大小: 6020 字节
- 行数: 155
- 预览: # PCEC 系统维护指南

## 1. 日常维护

### 1.1 定期检查

| 检查项目 | 检查频率 | 检查方法 | 预期结果 |
|----------|----------|------...

#### CONTRIBUTING.md
- 路径: .trae\skills\awesome-claude-skills\CONTRIBUTING.md
- 大小: 6291 字节
- 行数: 166
- 预览: # Contributing to Awesome Claude Skills

Thank you for your interest in contributing to Awesome Cl...

#### README.md
- 路径: .trae\skills\awesome-claude-skills\README.md
- 大小: 21566 字节
- 行数: 450
- 预览: <p align="center">
  <a href="https://github.com/travisvn/awesome-claude-skills">
    <img alt="Aw...

#### DEPLOYMENT.md
- 路径: .trae\skills\awkn-platform_awkn-platform\DEPLOYMENT.md
- 大小: 8317 字节
- 行数: 606
- 预览: # AWKN认知觉醒平台 - 部署指南

本文档提供了AWKN平台的完整部署指南，包括开发环境搭建、生产部署、Docker容器化部署等多种方式。

## 目录

- [系统要求](#系统要求)
- [...

#### PROJECT_STRUCTURE.md
- 路径: .trae\skills\awkn-platform_awkn-platform\PROJECT_STRUCTURE.md
- 大小: 5024 字节
- 行数: 240
- 预览: # AWKN项目结构说明

## 目录结构

```
awkn-platform/
├── README.md                 # 项目说明文档
├── QUICKSTART.md  ...

#### QUICKSTART.md
- 路径: .trae\skills\awkn-platform_awkn-platform\QUICKSTART.md
- 大小: 2678 字节
- 行数: 229
- 预览: # AWKN认知觉醒平台 - 快速开始指南

本指南帮助您在5分钟内快速启动AWKN平台。

## 🚀 一键启动（Docker Compose）

### 前置要求

- Docker 20.10+...

#### README.md
- 路径: .trae\skills\awkn-platform_awkn-platform\README.md
- 大小: 1911 字节
- 行数: 135
- 预览: # AWKN - AI Cognitive Awakening Platform

## 项目简介

AWKN是一个帮助他人做认知觉醒的平台，包含内容创作工具箱。采用苹果官网设计风格，提供极简、优雅的...

#### blueprint.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\blueprint.md
- 大小: 1844 字节
- 行数: 58
- 预览: # blueprint

Precise technical blueprint style with engineering precision

## Design Aesthetic

Clea...

#### intuition-machine.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\intuition-machine.md
- 大小: 1850 字节
- 行数: 58
- 预览: # intuition-machine

Technical briefing infographic style with aged paper and bilingual labels

## D...

#### scientific.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\scientific.md
- 大小: 1741 字节
- 行数: 60
- 预览: # scientific

Academic scientific illustration style for technical diagrams and processes

## Design...

#### sketch-notes.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\sketch-notes.md
- 大小: 1824 字节
- 行数: 57
- 预览: # sketch-notes

Soft hand-drawn illustration style with warm, educational feel

## Design Aesthetic
...

#### warm.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\warm.md
- 大小: 1760 字节
- 行数: 59
- 预览: # warm

Friendly, approachable illustration style for human-centered content

## Design Aesthetic

W...

#### SKILL.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\SKILL.md
- 大小: 13712 字节
- 行数: 410
- 预览: ---
name: awkn-article-illustrator
description: Smart article illustration skill. Analyzes article c...

#### analysis-framework.md
- 路径: .trae\skills\baokuan\awkn-comic\references\analysis-framework.md
- 大小: 4622 字节
- 行数: 153
- 预览: # Comic Content Analysis Framework

Deep analysis framework for transforming source content into eff...

#### dense.md
- 路径: .trae\skills\baokuan\awkn-comic\references\layouts\dense.md
- 大小: 414 字节
- 行数: 24
- 预览: # dense

Information-rich, educational focus

## Panel Structure

- **Panels per page**: 6-9
- **Str...

#### ohmsha-guide.md
- 路径: .trae\skills\baokuan\awkn-comic\references\ohmsha-guide.md
- 大小: 2731 字节
- 行数: 86
- 预览: # Ohmsha Manga Guide Style

Guidelines for `--style ohmsha` educational manga comics.

## Character ...

#### storyboard-template.md
- 路径: .trae\skills\baokuan\awkn-comic\references\storyboard-template.md
- 大小: 3978 字节
- 行数: 144
- 预览: # Storyboard Template

## Storyboard Document Format

```markdown
---
title: "[Comic Title]"
topic: ...

#### ohmsha.md
- 路径: .trae\skills\baokuan\awkn-comic\references\styles\ohmsha.md
- 大小: 4332 字节
- 行数: 108
- 预览: # ohmsha

Ohmsha Manga Guide style - educational manga with visual metaphors

## Core Philosophy

Ed...

#### SKILL.md
- 路径: .trae\skills\baokuan\awkn-comic\SKILL.md
- 大小: 13824 字节
- 行数: 411
- 预览: ---
name: awkn-comic
description: Knowledge comic creator supporting multiple styles (Logicomix/Lign...

#### blueprint.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\blueprint.md
- 大小: 672 字节
- 行数: 26
- 预览: # blueprint

Precise technical blueprint style with engineering aesthetic

## Color Palette

- Prima...

#### intuition-machine.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\intuition-machine.md
- 大小: 747 字节
- 行数: 27
- 预览: # intuition-machine

Technical briefing style with aged paper and bilingual labels

## Color Palette...

#### sketch-notes.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\sketch-notes.md
- 大小: 711 字节
- 行数: 26
- 预览: # sketch-notes

Soft hand-drawn illustration style with fresh minimalist aesthetic

## Color Palette...

#### SKILL.md
- 路径: .trae\skills\baokuan\awkn-cover-image\SKILL.md
- 大小: 5147 字节
- 行数: 277
- 预览: ---
name: awkn-cover-image
description: 文章封面生成器 - 为文章/主题生成精美手绘风格的封面图。支持20种风格、3种尺寸适配不同平台。自动分析内容并推荐最佳风...

#### analysis-framework.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\analysis-framework.md
- 大小: 5205 字节
- 行数: 162
- 预览: # Presentation Analysis Framework

Deep content analysis for effective slide deck creation.

## 1. M...

#### blueprint.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\blueprint.md
- 大小: 2277 字节
- 行数: 68
- 预览: # blueprint

Precise technical blueprint style with professional analytical visual presentation

## ...

#### intuition-machine.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\intuition-machine.md
- 大小: 2862 字节
- 行数: 73
- 预览: # intuition-machine

Technical briefing infographic style with aged paper texture and bilingual expl...

#### notion.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\notion.md
- 大小: 2133 字节
- 行数: 70
- 预览: # notion

SaaS dashboard aesthetic with clean data focus and productivity tool styling

## Design Ae...

#### scientific.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\scientific.md
- 大小: 2448 字节
- 行数: 74
- 预览: # scientific

Educational scientific illustration style for pathways, processes, and technical diagr...

#### sketch-notes.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\sketch-notes.md
- 大小: 2463 字节
- 行数: 67
- 预览: # sketch-notes

Soft hand-drawn illustration style with fresh, refined minimalist editorial aestheti...

#### SKILL.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\SKILL.md
- 大小: 8715 字节
- 行数: 243
- 预览: ---
name: awkn-slide-deck
description: Generate professional slide deck images from content. Creates...

#### analysis-framework.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\analysis-framework.md
- 大小: 5592 字节
- 行数: 199
- 预览: # Xiaohongshu Content Analysis Framework

Deep analysis framework tailored for Xiaohongshu's unique ...

#### tech.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\styles\tech.md
- 大小: 465 字节
- 行数: 24
- 预览: # tech

Modern, smart, digital

## Color Palette

- Primary: Deep blue (#1A365D), purple (#6B46C1), ...

#### SKILL.md
- 路径: .trae\skills\BUG\bug-design\SKILL.md
- 大小: 3847 字节
- 行数: 286
- 预览: ---
name: bug-design
description: BUG修复方案设计阶段，包含修复目标确定、初步方案生成、可行性判断、风险识别、异常应对策略制定
---

# BUG修复方案设计

...

#### SKILL.md
- 路径: .trae\skills\BUG\bug-execute-verify\SKILL.md
- 大小: 4617 字节
- 行数: 344
- 预览: ---
name: bug-execute-verify
description: BUG修复执行与验收阶段，包含修复方案执行、进度跟踪、验收标准制定、验收检查、问题汇总
---

# BUG修复执行...

#### ArsenalSC-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\ArsenalSC-OFL.txt
- 大小: 4373 字节
- 行数: 94
- 预览: Copyright 2012 The Arsenal Project Authors (andrij.design@gmail.com)

This Font Software is licensed...

#### BigShoulders-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\BigShoulders-OFL.txt
- 大小: 4397 字节
- 行数: 94
- 预览: Copyright 2019 The Big Shoulders Project Authors (https://github.com/xotypeco/big_shoulders)

This F...

#### Boldonse-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\Boldonse-OFL.txt
- 大小: 4390 字节
- 行数: 94
- 预览: Copyright 2024 The Boldonse Project Authors (https://github.com/googlefonts/boldonse)

This Font Sof...

#### BricolageGrotesque-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\BricolageGrotesque-OFL.txt
- 大小: 4403 字节
- 行数: 94
- 预览: Copyright 2022 The Bricolage Grotesque Project Authors (https://github.com/ateliertriay/bricolage)

...

#### CrimsonPro-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\CrimsonPro-OFL.txt
- 大小: 4394 字节
- 行数: 94
- 预览: Copyright 2018 The Crimson Pro Project Authors (https://github.com/Fonthausen/CrimsonPro)

This Font...

#### DMMono-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\DMMono-OFL.txt
- 大小: 4392 字节
- 行数: 94
- 预览: Copyright 2020 The DM Mono Project Authors (https://www.github.com/googlefonts/dm-mono)

This Font S...

#### EricaOne-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\EricaOne-OFL.txt
- 大小: 4410 字节
- 行数: 95
- 预览: Copyright (c) 2011 by LatinoType Limitada (luciano@latinotype.com), 
with Reserved Font Names "Erica...

#### GeistMono-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\GeistMono-OFL.txt
- 大小: 4388 字节
- 行数: 94
- 预览: Copyright 2024 The Geist Project Authors (https://github.com/vercel/geist-font.git)

This Font Softw...

#### Gloock-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\Gloock-OFL.txt
- 大小: 4381 字节
- 行数: 94
- 预览: Copyright 2022 The Gloock Project Authors (https://github.com/duartp/gloock)

This Font Software is ...

#### IBMPlexMono-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\IBMPlexMono-OFL.txt
- 大小: 4362 字节
- 行数: 94
- 预览: Copyright © 2017 IBM Corp. with Reserved Font Name "Plex"

This Font Software is licensed under the ...

#### InstrumentSans-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\InstrumentSans-OFL.txt
- 大小: 4403 字节
- 行数: 94
- 预览: Copyright 2022 The Instrument Sans Project Authors (https://github.com/Instrument/instrument-sans)

...

#### Italiana-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\Italiana-OFL.txt
- 大小: 4394 字节
- 行数: 94
- 预览: Copyright (c) 2011, Santiago Orozco (hi@typemade.mx), with Reserved Font Name "Italiana".

This Font...

#### JetBrainsMono-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\JetBrainsMono-OFL.txt
- 大小: 4399 字节
- 行数: 94
- 预览: Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono)

This...

#### Jura-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\Jura-OFL.txt
- 大小: 4380 字节
- 行数: 94
- 预览: Copyright 2019 The Jura Project Authors (https://github.com/ossobuffo/jura)

This Font Software is l...

#### LibreBaskerville-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\LibreBaskerville-OFL.txt
- 大小: 4449 字节
- 行数: 94
- 预览: Copyright 2012 The Libre Baskerville Project Authors (https://github.com/impallari/Libre-Baskerville...

#### Lora-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\Lora-OFL.txt
- 大小: 4423 字节
- 行数: 94
- 预览: Copyright 2011 The Lora Project Authors (https://github.com/cyrealtype/Lora-Cyrillic), with Reserved...

#### NationalPark-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\NationalPark-OFL.txt
- 大小: 4399 字节
- 行数: 94
- 预览: Copyright 2025 The National Park Project Authors (https://github.com/benhoepner/National-Park)

This...

#### NothingYouCouldDo-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\NothingYouCouldDo-OFL.txt
- 大小: 4363 字节
- 行数: 94
- 预览: Copyright (c) 2010, Kimberly Geswein (kimberlygeswein.com)

This Font Software is licensed under the...

#### Outfit-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\Outfit-OFL.txt
- 大小: 4389 字节
- 行数: 94
- 预览: Copyright 2021 The Outfit Project Authors (https://github.com/Outfitio/Outfit-Fonts)

This Font Soft...

#### PixelifySans-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\PixelifySans-OFL.txt
- 大小: 4395 字节
- 行数: 94
- 预览: Copyright 2021 The Pixelify Sans Project Authors (https://github.com/eifetx/Pixelify-Sans)

This Fon...

#### PoiretOne-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\PoiretOne-OFL.txt
- 大小: 4366 字节
- 行数: 94
- 预览: Copyright (c) 2011, Denis Masharov (denis.masharov@gmail.com)

This Font Software is licensed under ...

#### RedHatMono-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\RedHatMono-OFL.txt
- 大小: 4394 字节
- 行数: 94
- 预览: Copyright 2024 The Red Hat Project Authors (https://github.com/RedHatOfficial/RedHatFont)

This Font...

#### Silkscreen-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\Silkscreen-OFL.txt
- 大小: 4394 字节
- 行数: 94
- 预览: Copyright 2001 The Silkscreen Project Authors (https://github.com/googlefonts/silkscreen)

This Font...

#### SmoochSans-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\SmoochSans-OFL.txt
- 大小: 4396 字节
- 行数: 94
- 预览: Copyright 2016 The Smooch Sans Project Authors (https://github.com/googlefonts/smooch-sans)

This Fo...

#### Tektur-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\Tektur-OFL.txt
- 大小: 4385 字节
- 行数: 94
- 预览: Copyright 2023 The Tektur Project Authors (https://www.github.com/hyvyys/Tektur)

This Font Software...

#### WorkSans-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\WorkSans-OFL.txt
- 大小: 4397 字节
- 行数: 94
- 预览: Copyright 2019 The Work Sans Project Authors (https://github.com/weiweihuanghuang/Work-Sans)

This F...

#### YoungSerif-OFL.txt
- 路径: .trae\skills\canvas-design\canvas-fonts\YoungSerif-OFL.txt
- 大小: 4398 字节
- 行数: 94
- 预览: Copyright 2023 The Young Serif Project Authors (https://github.com/noirblancrouge/YoungSerif)

This ...

#### roles.json
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\role\roles.json
- 大小: 24259 字节
- 行数: 432
- 预览: {
  "tags": {
    "favorite": "常用",
    "mind": "思维",
    "write": "写作",
    "article": "文章",
    "t...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\README.md
- 大小: 24564 字节
- 行数: 739
- 预览: <p align="center"><img src= "https://github.com/user-attachments/assets/31fb4eab-3be4-477d-aa76-82cf...

#### general.md
- 路径: .trae\skills\cline-main\.clinerules\general.md
- 大小: 13317 字节
- 行数: 195
- 预览: This file is the secret sauce for working effectively in this codebase. It captures tribal knowledge...

#### release.md
- 路径: .trae\skills\cline-main\.clinerules\workflows\release.md
- 大小: 6454 字节
- 行数: 233
- 预览: # Release

Prepare and publish a release from the open changeset PR.

## Overview

This workflow hel...

#### writing-documentation.md
- 路径: .trae\skills\cline-main\.clinerules\workflows\writing-documentation.md
- 大小: 21763 字节
- 行数: 393
- 预览: # General writing guide

# How I want you to write 

I'm gonna write something technical.

It's ofte...

#### README.md
- 路径: .trae\skills\cline-main\evals\diff-edits\dashboard\README.md
- 大小: 5917 字节
- 行数: 160
- 预览: # 🚀 The Sickest Diff Edits Evaluation Dashboard Ever!

A beautiful, modern Streamlit dashboard for ...

#### README.md
- 路径: .trae\skills\cline-main\locales\zh-cn\README.md
- 大小: 6546 字节
- 行数: 163
- 预览: # Cline

<p align="center">
    <img src="https://media.githubusercontent.com/media/cline/cline/main...

#### SKILL.md
- 路径: .trae\skills\concept-workflow\SKILL.md
- 大小: 15746 字节
- 行数: 514
- 预览: ---
name: concept-workflow
description: End-to-end workflow for creating complete JavaScript concept...

#### SKILL.md
- 路径: .trae\skills\frontend-design\SKILL.md
- 大小: 4440 字节
- 行数: 43
- 预览: ---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with...

#### analysis-framework.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\analysis-framework.md
- 大小: 3239 字节
- 行数: 140
- 预览: # 内容分析框架

## 目的

在创建漫画之前，深入分析源材料，确保漫画创作有清晰的定位和方向。

## 6大分析维度

### 1. 核心内容（Core Content）

**目的**：理解材料...

#### AWKN-cover-image-styles.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\AWKN-cover-image-styles.md
- 大小: 5082 字节
- 行数: 490
- 预览: # 封面风格详细说明

## 目录
1. [商务专业风格](#商务专业风格)
2. [教育科普风格](#教育科普风格)
3. [创意艺术风格](#创意艺术风格)
4. [科技技术风格](#科技技术风格...

#### style-ohmsha.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\style-ohmsha.md
- 大小: 2245 字节
- 行数: 90
- 预览: # Ohmsha 风格指南

## 核心哲学

Educational manga where every concept becomes a visual metaphor or action.
N...

#### SKILL.md
- 路径: .trae\skills\obsidian-skills\skills\obsidian-markdown\SKILL.md
- 大小: 11433 字节
- 行数: 621
- 预览: ---
name: obsidian-markdown
description: Create and edit Obsidian Flavored Markdown with wikilinks...

#### README.md
- 路径: .trae\skills\skills\README.md
- 大小: 5554 字节
- 行数: 95
- 预览: > **Note:** This repository contains Anthropic's implementation of skills for Claude. For informatio...

#### SKILL.md
- 路径: .trae\skills\skills\skills\algorithmic-art\SKILL.md
- 大小: 20139 字节
- 行数: 405
- 预览: ---
name: algorithmic-art
description: Creating algorithmic art using p5.js with seeded randomness...

#### SKILL.md
- 路径: .trae\skills\skills\skills\brand-guidelines\SKILL.md
- 大小: 2308 字节
- 行数: 74
- 预览: ---
name: brand-guidelines
description: Applies Anthropic's official brand colors and typography t...

#### ArsenalSC-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\ArsenalSC-OFL.txt
- 大小: 4466 字节
- 行数: 94
- 预览: Copyright 2012 The Arsenal Project Authors (andrij.design@gmail.com)

This Font Software is licens...

#### BigShoulders-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\BigShoulders-OFL.txt
- 大小: 4490 字节
- 行数: 94
- 预览: Copyright 2019 The Big Shoulders Project Authors (https://github.com/xotypeco/big_shoulders)

This...

#### Boldonse-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\Boldonse-OFL.txt
- 大小: 4483 字节
- 行数: 94
- 预览: Copyright 2024 The Boldonse Project Authors (https://github.com/googlefonts/boldonse)

This Font S...

#### BricolageGrotesque-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\BricolageGrotesque-OFL.txt
- 大小: 4496 字节
- 行数: 94
- 预览: Copyright 2022 The Bricolage Grotesque Project Authors (https://github.com/ateliertriay/bricolage)
...

#### CrimsonPro-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\CrimsonPro-OFL.txt
- 大小: 4487 字节
- 行数: 94
- 预览: Copyright 2018 The Crimson Pro Project Authors (https://github.com/Fonthausen/CrimsonPro)

This Fo...

#### DMMono-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\DMMono-OFL.txt
- 大小: 4485 字节
- 行数: 94
- 预览: Copyright 2020 The DM Mono Project Authors (https://www.github.com/googlefonts/dm-mono)

This Font...

#### EricaOne-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\EricaOne-OFL.txt
- 大小: 4504 字节
- 行数: 95
- 预览: Copyright (c) 2011 by LatinoType Limitada (luciano@latinotype.com), 
with Reserved Font Names "Eric...

#### GeistMono-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\GeistMono-OFL.txt
- 大小: 4481 字节
- 行数: 94
- 预览: Copyright 2024 The Geist Project Authors (https://github.com/vercel/geist-font.git)

This Font Sof...

#### Gloock-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\Gloock-OFL.txt
- 大小: 4474 字节
- 行数: 94
- 预览: Copyright 2022 The Gloock Project Authors (https://github.com/duartp/gloock)

This Font Software i...

#### IBMPlexMono-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\IBMPlexMono-OFL.txt
- 大小: 4455 字节
- 行数: 94
- 预览: Copyright © 2017 IBM Corp. with Reserved Font Name "Plex"

This Font Software is licensed under th...

#### InstrumentSans-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\InstrumentSans-OFL.txt
- 大小: 4496 字节
- 行数: 94
- 预览: Copyright 2022 The Instrument Sans Project Authors (https://github.com/Instrument/instrument-sans)
...

#### Italiana-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\Italiana-OFL.txt
- 大小: 4487 字节
- 行数: 94
- 预览: Copyright (c) 2011, Santiago Orozco (hi@typemade.mx), with Reserved Font Name "Italiana".

This Fo...

#### JetBrainsMono-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\JetBrainsMono-OFL.txt
- 大小: 4492 字节
- 行数: 94
- 预览: Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono)

Th...

#### Jura-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\Jura-OFL.txt
- 大小: 4473 字节
- 行数: 94
- 预览: Copyright 2019 The Jura Project Authors (https://github.com/ossobuffo/jura)

This Font Software is...

#### LibreBaskerville-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\LibreBaskerville-OFL.txt
- 大小: 4542 字节
- 行数: 94
- 预览: Copyright 2012 The Libre Baskerville Project Authors (https://github.com/impallari/Libre-Baskerville...

#### Lora-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\Lora-OFL.txt
- 大小: 4516 字节
- 行数: 94
- 预览: Copyright 2011 The Lora Project Authors (https://github.com/cyrealtype/Lora-Cyrillic), with Reserved...

#### NationalPark-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\NationalPark-OFL.txt
- 大小: 4492 字节
- 行数: 94
- 预览: Copyright 2025 The National Park Project Authors (https://github.com/benhoepner/National-Park)

Th...

#### NothingYouCouldDo-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\NothingYouCouldDo-OFL.txt
- 大小: 4456 字节
- 行数: 94
- 预览: Copyright (c) 2010, Kimberly Geswein (kimberlygeswein.com)

This Font Software is licensed under t...

#### Outfit-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\Outfit-OFL.txt
- 大小: 4482 字节
- 行数: 94
- 预览: Copyright 2021 The Outfit Project Authors (https://github.com/Outfitio/Outfit-Fonts)

This Font So...

#### PixelifySans-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\PixelifySans-OFL.txt
- 大小: 4488 字节
- 行数: 94
- 预览: Copyright 2021 The Pixelify Sans Project Authors (https://github.com/eifetx/Pixelify-Sans)

This F...

#### PoiretOne-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\PoiretOne-OFL.txt
- 大小: 4459 字节
- 行数: 94
- 预览: Copyright (c) 2011, Denis Masharov (denis.masharov@gmail.com)

This Font Software is licensed unde...

#### RedHatMono-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\RedHatMono-OFL.txt
- 大小: 4487 字节
- 行数: 94
- 预览: Copyright 2024 The Red Hat Project Authors (https://github.com/RedHatOfficial/RedHatFont)

This Fo...

#### Silkscreen-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\Silkscreen-OFL.txt
- 大小: 4487 字节
- 行数: 94
- 预览: Copyright 2001 The Silkscreen Project Authors (https://github.com/googlefonts/silkscreen)

This Fo...

#### SmoochSans-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\SmoochSans-OFL.txt
- 大小: 4489 字节
- 行数: 94
- 预览: Copyright 2016 The Smooch Sans Project Authors (https://github.com/googlefonts/smooch-sans)

This ...

#### Tektur-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\Tektur-OFL.txt
- 大小: 4478 字节
- 行数: 94
- 预览: Copyright 2023 The Tektur Project Authors (https://www.github.com/hyvyys/Tektur)

This Font Softwa...

#### WorkSans-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\WorkSans-OFL.txt
- 大小: 4490 字节
- 行数: 94
- 预览: Copyright 2019 The Work Sans Project Authors (https://github.com/weiweihuanghuang/Work-Sans)

This...

#### YoungSerif-OFL.txt
- 路径: .trae\skills\skills\skills\canvas-design\canvas-fonts\YoungSerif-OFL.txt
- 大小: 4491 字节
- 行数: 94
- 预览: Copyright 2023 The Young Serif Project Authors (https://github.com/noirblancrouge/YoungSerif)

Thi...

#### SKILL.md
- 路径: .trae\skills\skills\skills\doc-coauthoring\SKILL.md
- 大小: 16190 字节
- 行数: 376
- 预览: ---
name: doc-coauthoring
description: Guide users through a structured workflow for co-authoring ...

#### ooxml.md
- 路径: .trae\skills\skills\skills\docx\ooxml.md
- 大小: 24171 字节
- 行数: 610
- 预览: # Office Open XML Technical Reference

**Important: Read this entire document before starting.** T...

#### SKILL.md
- 路径: .trae\skills\skills\skills\frontend-design\SKILL.md
- 大小: 4482 字节
- 行数: 43
- 预览: ---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces wi...

#### ooxml.md
- 路径: .trae\skills\skills\skills\pptx\ooxml.md
- 大小: 10810 字节
- 行数: 427
- 预览: # Office Open XML Technical Reference for PowerPoint

**Important: Read this entire document befor...

#### SKILL.md
- 路径: .trae\skills\skills\skills\pptx\SKILL.md
- 大小: 26016 字节
- 行数: 484
- 预览: ---
name: pptx
description: "Presentation creation, editing, and analysis. When Claude needs to wo...

#### tech-innovation.md
- 路径: .trae\skills\skills\skills\theme-factory\themes\tech-innovation.md
- 大小: 566 字节
- 行数: 20
- 预览: # Tech Innovation

A bold and modern theme with high-contrast colors perfect for cutting-edge tech...

#### THIRD_PARTY_NOTICES.md
- 路径: .trae\skills\skills\THIRD_PARTY_NOTICES.md
- 大小: 46561 字节
- 行数: 405
- 预览: # **Third-Party Notices**

THE FOLLOWING SETS FORTH ATTRIBUTION NOTICES FOR THIRD PARTY SOFTWARE T...

#### README.md
- 路径: .trae\skills\skills-main\README.md
- 大小: 5460 字节
- 行数: 95
- 预览: > **Note:** This repository contains Anthropic's implementation of skills for Claude. For informatio...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\algorithmic-art\SKILL.md
- 大小: 19735 字节
- 行数: 405
- 预览: ---
name: algorithmic-art
description: Creating algorithmic art using p5.js with seeded randomness a...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\brand-guidelines\SKILL.md
- 大小: 2235 字节
- 行数: 74
- 预览: ---
name: brand-guidelines
description: Applies Anthropic's official brand colors and typography to ...

#### ArsenalSC-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\ArsenalSC-OFL.txt
- 大小: 4373 字节
- 行数: 94
- 预览: Copyright 2012 The Arsenal Project Authors (andrij.design@gmail.com)

This Font Software is licensed...

#### BigShoulders-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\BigShoulders-OFL.txt
- 大小: 4397 字节
- 行数: 94
- 预览: Copyright 2019 The Big Shoulders Project Authors (https://github.com/xotypeco/big_shoulders)

This F...

#### Boldonse-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\Boldonse-OFL.txt
- 大小: 4390 字节
- 行数: 94
- 预览: Copyright 2024 The Boldonse Project Authors (https://github.com/googlefonts/boldonse)

This Font Sof...

#### BricolageGrotesque-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\BricolageGrotesque-OFL.txt
- 大小: 4403 字节
- 行数: 94
- 预览: Copyright 2022 The Bricolage Grotesque Project Authors (https://github.com/ateliertriay/bricolage)

...

#### CrimsonPro-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\CrimsonPro-OFL.txt
- 大小: 4394 字节
- 行数: 94
- 预览: Copyright 2018 The Crimson Pro Project Authors (https://github.com/Fonthausen/CrimsonPro)

This Font...

#### DMMono-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\DMMono-OFL.txt
- 大小: 4392 字节
- 行数: 94
- 预览: Copyright 2020 The DM Mono Project Authors (https://www.github.com/googlefonts/dm-mono)

This Font S...

#### EricaOne-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\EricaOne-OFL.txt
- 大小: 4410 字节
- 行数: 95
- 预览: Copyright (c) 2011 by LatinoType Limitada (luciano@latinotype.com), 
with Reserved Font Names "Erica...

#### GeistMono-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\GeistMono-OFL.txt
- 大小: 4388 字节
- 行数: 94
- 预览: Copyright 2024 The Geist Project Authors (https://github.com/vercel/geist-font.git)

This Font Softw...

#### Gloock-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\Gloock-OFL.txt
- 大小: 4381 字节
- 行数: 94
- 预览: Copyright 2022 The Gloock Project Authors (https://github.com/duartp/gloock)

This Font Software is ...

#### IBMPlexMono-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\IBMPlexMono-OFL.txt
- 大小: 4362 字节
- 行数: 94
- 预览: Copyright © 2017 IBM Corp. with Reserved Font Name "Plex"

This Font Software is licensed under the ...

#### InstrumentSans-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\InstrumentSans-OFL.txt
- 大小: 4403 字节
- 行数: 94
- 预览: Copyright 2022 The Instrument Sans Project Authors (https://github.com/Instrument/instrument-sans)

...

#### Italiana-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\Italiana-OFL.txt
- 大小: 4394 字节
- 行数: 94
- 预览: Copyright (c) 2011, Santiago Orozco (hi@typemade.mx), with Reserved Font Name "Italiana".

This Font...

#### JetBrainsMono-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\JetBrainsMono-OFL.txt
- 大小: 4399 字节
- 行数: 94
- 预览: Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono)

This...

#### Jura-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\Jura-OFL.txt
- 大小: 4380 字节
- 行数: 94
- 预览: Copyright 2019 The Jura Project Authors (https://github.com/ossobuffo/jura)

This Font Software is l...

#### LibreBaskerville-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\LibreBaskerville-OFL.txt
- 大小: 4449 字节
- 行数: 94
- 预览: Copyright 2012 The Libre Baskerville Project Authors (https://github.com/impallari/Libre-Baskerville...

#### Lora-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\Lora-OFL.txt
- 大小: 4423 字节
- 行数: 94
- 预览: Copyright 2011 The Lora Project Authors (https://github.com/cyrealtype/Lora-Cyrillic), with Reserved...

#### NationalPark-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\NationalPark-OFL.txt
- 大小: 4399 字节
- 行数: 94
- 预览: Copyright 2025 The National Park Project Authors (https://github.com/benhoepner/National-Park)

This...

#### NothingYouCouldDo-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\NothingYouCouldDo-OFL.txt
- 大小: 4363 字节
- 行数: 94
- 预览: Copyright (c) 2010, Kimberly Geswein (kimberlygeswein.com)

This Font Software is licensed under the...

#### Outfit-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\Outfit-OFL.txt
- 大小: 4389 字节
- 行数: 94
- 预览: Copyright 2021 The Outfit Project Authors (https://github.com/Outfitio/Outfit-Fonts)

This Font Soft...

#### PixelifySans-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\PixelifySans-OFL.txt
- 大小: 4395 字节
- 行数: 94
- 预览: Copyright 2021 The Pixelify Sans Project Authors (https://github.com/eifetx/Pixelify-Sans)

This Fon...

#### PoiretOne-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\PoiretOne-OFL.txt
- 大小: 4366 字节
- 行数: 94
- 预览: Copyright (c) 2011, Denis Masharov (denis.masharov@gmail.com)

This Font Software is licensed under ...

#### RedHatMono-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\RedHatMono-OFL.txt
- 大小: 4394 字节
- 行数: 94
- 预览: Copyright 2024 The Red Hat Project Authors (https://github.com/RedHatOfficial/RedHatFont)

This Font...

#### Silkscreen-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\Silkscreen-OFL.txt
- 大小: 4394 字节
- 行数: 94
- 预览: Copyright 2001 The Silkscreen Project Authors (https://github.com/googlefonts/silkscreen)

This Font...

#### SmoochSans-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\SmoochSans-OFL.txt
- 大小: 4396 字节
- 行数: 94
- 预览: Copyright 2016 The Smooch Sans Project Authors (https://github.com/googlefonts/smooch-sans)

This Fo...

#### Tektur-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\Tektur-OFL.txt
- 大小: 4385 字节
- 行数: 94
- 预览: Copyright 2023 The Tektur Project Authors (https://www.github.com/hyvyys/Tektur)

This Font Software...

#### WorkSans-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\WorkSans-OFL.txt
- 大小: 4397 字节
- 行数: 94
- 预览: Copyright 2019 The Work Sans Project Authors (https://github.com/weiweihuanghuang/Work-Sans)

This F...

#### YoungSerif-OFL.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\canvas-fonts\YoungSerif-OFL.txt
- 大小: 4398 字节
- 行数: 94
- 预览: Copyright 2023 The Young Serif Project Authors (https://github.com/noirblancrouge/YoungSerif)

This ...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\doc-coauthoring\SKILL.md
- 大小: 15815 字节
- 行数: 376
- 预览: ---
name: doc-coauthoring
description: Guide users through a structured workflow for co-authoring do...

#### ooxml.md
- 路径: .trae\skills\skills-main\skills\docx\ooxml.md
- 大小: 23562 字节
- 行数: 610
- 预览: # Office Open XML Technical Reference

**Important: Read this entire document before starting.** Thi...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\frontend-design\SKILL.md
- 大小: 4440 字节
- 行数: 43
- 预览: ---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with...

#### ooxml.md
- 路径: .trae\skills\skills-main\skills\pptx\ooxml.md
- 大小: 10384 字节
- 行数: 427
- 预览: # Office Open XML Technical Reference for PowerPoint

**Important: Read this entire document before ...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\pptx\SKILL.md
- 大小: 25533 字节
- 行数: 484
- 预览: ---
name: pptx
description: "Presentation creation, editing, and analysis. When Claude needs to work...

#### tech-innovation.md
- 路径: .trae\skills\skills-main\skills\theme-factory\themes\tech-innovation.md
- 大小: 547 字节
- 行数: 20
- 预览: # Tech Innovation

A bold and modern theme with high-contrast colors perfect for cutting-edge techno...

#### THIRD_PARTY_NOTICES.md
- 路径: .trae\skills\skills-main\THIRD_PARTY_NOTICES.md
- 大小: 46157 字节
- 行数: 405
- 预览: # **Third-Party Notices**

THE FOLLOWING SETS FORTH ATTRIBUTION NOTICES FOR THIRD PARTY SOFTWARE THA...

#### tech-innovation.md
- 路径: .trae\skills\theme-factory\themes\tech-innovation.md
- 大小: 547 字节
- 行数: 20
- 预览: # Tech Innovation

A bold and modern theme with high-contrast colors perfect for cutting-edge techno...

#### EXAMPLES.md
- 路径: .trae\skills\yunshu_skillshub-master\EXAMPLES.md
- 大小: 2571 字节
- 行数: 180
- 预览: # 使用示例 / Usage Examples

本文档提供每个 Skill 的实际使用示例。

---

## 🎨 配图助手 (Image Assistant)

### 场景：为一篇技术文章配图...

#### 03-validation.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\03-validation.md
- 大小: 451 字节
- 行数: 42
- 预览: # 第三阶段：观点验证

**目标：** 联网搜索，验证用户的理解是否正确

---

## 步骤

### 1. 判断是否需要验证
- 如果是纯个人观点/感受 → 不需要验证，直接跳到下一阶段
- ...

#### 05-review.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\05-review.md
- 大小: 575 字节
- 行数: 61
- 预览: # 第五阶段：最终审核

**目标：** 发布前的最后检查

---

## 检查清单

逐项检查并告诉用户结果：

- [ ] **主题清晰吗？**
  - 读者能一句话说出这篇文章讲什么吗？
  ...

#### 8小时连续进化报告.md
- 路径: 8小时连续进化报告.md
- 大小: 2550 字节
- 行数: 146
- 预览: # 人生决策宗师 8小时连续进化报告

## 一、进化概述

### 1.1 进化目标
- **核心目标**：提升人生决策宗师智能体的能力和系统整体性能
- **进化时长**：8小时不间断进化
- *...

#### 8小时连续进化计划.md
- 路径: 8小时连续进化计划.md
- 大小: 4199 字节
- 行数: 197
- 预览: # 8小时连续进化计划

## 一、对话复盘与现状分析

### 1.1 核心需求梳理
- **初始需求**：搭建 OpenClaw 多智能体系统，配置 3 个 AI 智能体，每个智能体有独立的 Te...

#### MEMORY.md
- 路径: agents\business\MEMORY.md
- 大小: 4267 字节
- 行数: 250
- 预览: # Business Sentinel - 记忆库

## 市场分析经验

### 成功案例
1. **市场机会识别**
   - **时间**: 2024-05-15
   - **任务**: 分析...

#### company_context.md
- 路径: agents\common\company_context.md
- 大小: 402 字节
- 行数: 32
- 预览: # 公司背景与核心愿景

## 公司名称
AWKN LAB | 定数实验室

## 核心定位
在不确定的世界里，为用户交付确定性

## 品牌口号
命运如水流动，你当不动如山。

## 核心框架 (A...

#### MEMORY.md
- 路径: agents\content\MEMORY.md
- 大小: 3706 字节
- 行数: 213
- 预览: # Content Creator - 记忆库

## 创作经验

### 成功案例
1. **品牌故事系列**
   - **时间**: 2024-05-15
   - **任务**: 创建品牌故事...

#### config.json
- 路径: agents\coo\config.json
- 大小: 5173 字节
- 行数: 217
- 预览: {
  "agent": {
    "name": "大掌柜",
    "role": "COO / 执行中枢",
    "description": "AWKN LAB | 定数实验室的运营大...

#### MEMORY.md
- 路径: agents\coo\MEMORY.md
- 大小: 2787 字节
- 行数: 112
- 预览: # 枢纽智能体记忆库

## 核心记忆

### 运营经验
1. **流程优化**：通过系统性的流程分析和优化，将公司的运营效率提高了30%
2. **任务拆解**：将复杂的项目拆解为可执行的子任务，...

#### SOUL.md
- 路径: agents\coo\SOUL.md
- 大小: 1581 字节
- 行数: 79
- 预览: # 枢纽智能体灵魂设定

## 核心身份
你是公司的运营大管家与协议网关，是执行中枢，负责流程控制和任务拆解。你是一个极度理性、结果导向、流程控制狂的智能体，展现出卓越的运营管理能力和执行效率。

#...

#### USER.md
- 路径: agents\coo\USER.md
- 大小: 1880 字节
- 行数: 91
- 预览: # 用户信息

## 基本信息
- **姓名**：陈婷
- **角色**：公司创始人兼CEO
- **核心需求**：通过高效的运营管理实现公司的快速发展和个人价值的最大化

## 业务需求

### ...

#### config.json
- 路径: agents\cto\config.json
- 大小: 1450 字节
- 行数: 68
- 预览: {
  "name": "赛博天工",
  "role": "CTO / 技术引擎",
  "description": "AWKN LAB | 定数实验室的技术引擎，在不确定的世界里为用户交付确定性...

#### memory.md
- 路径: agents\cto\memory.md
- 大小: 1400 字节
- 行数: 83
- 预览: # 营造（CTO）- 长期记忆

## 代理简介
我是营造（CTO）代理，作为技术领导者，负责技术规划、团队管理、项目监督和技术决策。我的核心使命是为组织提供技术战略指导，确保技术资源的有效利用，并推...

#### 2026-02-23-assets-inventory.md
- 路径: agents\green-tea\2026-02-23-assets-inventory.md
- 大小: 1159 字节
- 行数: 57
- 预览: # 2026-02-23 每日日志

## 公司资产盘点完成

### 执行者
- **智能体**: 公司大脑智能体
- **执行时间**: 2026-02-23
- **任务类型**: 公司资产盘点...

#### memory.md
- 路径: agents\green-tea\memory.md
- 大小: 2297 字节
- 行数: 131
- 预览: # 绿茶智能体长期记忆

## 公司化改造计划

### 核心架构
- **公司名称**：绿茶智能体有限公司
- **核心业务**：心理测试、内容创作、用户服务
- **组织架构**：CEO + 内容...

#### performance-evaluation.md
- 路径: agents\green-tea\operations\performance-evaluation.md
- 大小: 2223 字节
- 行数: 166
- 预览: # 绩效评估标准

## 评估周期

- **日评估**：任务完成情况检查
- **周评估**：角色绩效小结
- **月评估**：全面绩效评估
- **季评估**：战略调整参考

## 核心指标

#...

#### task-assignment.md
- 路径: agents\green-tea\operations\task-assignment.md
- 大小: 1271 字节
- 行数: 93
- 预览: # 任务分配系统

## 核心原则

基于能力树的任务分配机制，确保每个任务由最合适的智能体/角色执行。

## 角色定义

### CEO（绿茶智能体）
- **职责**：总体协调、决策审批、资源调...

#### MEMORY.md
- 路径: agents\master\MEMORY.md
- 大小: 2718 字节
- 行数: 108
- 预览: # 大宗师智能体记忆库

## 核心记忆

### 业务经验
1. **微信个人号运营**：通过精准的个人定位和内容策略，成功建立了有影响力的个人品牌，积累了大量高质量的商业人脉
2. **内容创作*...

#### USER.md
- 路径: agents\master\USER.md
- 大小: 1546 字节
- 行数: 81
- 预览: # 用户信息

## 基本信息
- **姓名**：陈婷
- **角色**：公司创始人兼CEO
- **核心需求**：打造一个高效的1人公司运营系统，实现公司的快速发展和个人价值的最大化

## 业务需...

#### config.json
- 路径: agents\production\config.json
- 大小: 6404 字节
- 行数: 250
- 预览: {
  "agent": {
    "name": "营造",
    "role": "CTO",
    "description": "公司的生产引擎与技术骨干，负责代码编写和技术实现",
 ...

#### MEMORY.md
- 路径: agents\production\MEMORY.md
- 大小: 3357 字节
- 行数: 185
- 预览: # Production Engine - 记忆库

## 执行经验

### 成功案例
1. **项目管理系统实施**
   - **时间**: 2024-05-15
   - **任务**: 实施...

#### SOUL.md
- 路径: agents\production\SOUL.md
- 大小: 1152 字节
- 行数: 50
- 预览: # Production Engine - 生产引擎

## 核心身份
我是 Production Engine，一个专注于执行和交付的 AI 代理。我的核心职责是将战略转化为可执行的任务，并确保这些...

#### USER.md
- 路径: agents\production\USER.md
- 大小: 1174 字节
- 行数: 77
- 预览: # Production Engine - 用户配置

## 基本信息
- **名称**: Production Engine
- **角色**: 生产引擎
- **职责**: 执行和交付，将战略转化...

#### agent_ports_config.json
- 路径: agent_ports_config.json
- 大小: 963 字节
- 行数: 51
- 预览: {
  "port_allocation": {
    "master": {
      "name": "大宗师",
      "role": "CEO",
      "port": 400...

#### blueprint.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\blueprint.md
- 大小: 1844 字节
- 行数: 58
- 预览: # blueprint

Precise technical blueprint style with engineering precision

## Design Aesthetic

Clea...

#### intuition-machine.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\intuition-machine.md
- 大小: 1850 字节
- 行数: 58
- 预览: # intuition-machine

Technical briefing infographic style with aged paper and bilingual labels

## D...

#### scientific.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\scientific.md
- 大小: 1741 字节
- 行数: 60
- 预览: # scientific

Academic scientific illustration style for technical diagrams and processes

## Design...

#### sketch-notes.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\sketch-notes.md
- 大小: 1824 字节
- 行数: 57
- 预览: # sketch-notes

Soft hand-drawn illustration style with warm, educational feel

## Design Aesthetic
...

#### warm.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\warm.md
- 大小: 1760 字节
- 行数: 59
- 预览: # warm

Friendly, approachable illustration style for human-centered content

## Design Aesthetic

W...

#### SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\SKILL.md
- 大小: 13712 字节
- 行数: 410
- 预览: ---
name: awkn-article-illustrator
description: Smart article illustration skill. Analyzes article c...

#### analysis-framework.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\analysis-framework.md
- 大小: 4622 字节
- 行数: 153
- 预览: # Comic Content Analysis Framework

Deep analysis framework for transforming source content into eff...

#### dense.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\layouts\dense.md
- 大小: 414 字节
- 行数: 24
- 预览: # dense

Information-rich, educational focus

## Panel Structure

- **Panels per page**: 6-9
- **Str...

#### ohmsha-guide.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\ohmsha-guide.md
- 大小: 2731 字节
- 行数: 86
- 预览: # Ohmsha Manga Guide Style

Guidelines for `--style ohmsha` educational manga comics.

## Character ...

#### storyboard-template.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\storyboard-template.md
- 大小: 3978 字节
- 行数: 144
- 预览: # Storyboard Template

## Storyboard Document Format

```markdown
---
title: "[Comic Title]"
topic: ...

#### ohmsha.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\styles\ohmsha.md
- 大小: 4332 字节
- 行数: 108
- 预览: # ohmsha

Ohmsha Manga Guide style - educational manga with visual metaphors

## Core Philosophy

Ed...

#### SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-comic\SKILL.md
- 大小: 13824 字节
- 行数: 411
- 预览: ---
name: awkn-comic
description: Knowledge comic creator supporting multiple styles (Logicomix/Lign...

#### blueprint.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\blueprint.md
- 大小: 672 字节
- 行数: 26
- 预览: # blueprint

Precise technical blueprint style with engineering aesthetic

## Color Palette

- Prima...

#### intuition-machine.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\intuition-machine.md
- 大小: 747 字节
- 行数: 27
- 预览: # intuition-machine

Technical briefing style with aged paper and bilingual labels

## Color Palette...

#### sketch-notes.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\sketch-notes.md
- 大小: 711 字节
- 行数: 26
- 预览: # sketch-notes

Soft hand-drawn illustration style with fresh minimalist aesthetic

## Color Palette...

#### SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\SKILL.md
- 大小: 5147 字节
- 行数: 277
- 预览: ---
name: awkn-cover-image
description: 文章封面生成器 - 为文章/主题生成精美手绘风格的封面图。支持20种风格、3种尺寸适配不同平台。自动分析内容并推荐最佳风...

#### analysis-framework.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\analysis-framework.md
- 大小: 5205 字节
- 行数: 162
- 预览: # Presentation Analysis Framework

Deep content analysis for effective slide deck creation.

## 1. M...

#### blueprint.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\blueprint.md
- 大小: 2277 字节
- 行数: 68
- 预览: # blueprint

Precise technical blueprint style with professional analytical visual presentation

## ...

#### intuition-machine.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\intuition-machine.md
- 大小: 2862 字节
- 行数: 73
- 预览: # intuition-machine

Technical briefing infographic style with aged paper texture and bilingual expl...

#### notion.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\notion.md
- 大小: 2133 字节
- 行数: 70
- 预览: # notion

SaaS dashboard aesthetic with clean data focus and productivity tool styling

## Design Ae...

#### scientific.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\scientific.md
- 大小: 2448 字节
- 行数: 74
- 预览: # scientific

Educational scientific illustration style for pathways, processes, and technical diagr...

#### sketch-notes.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\sketch-notes.md
- 大小: 2463 字节
- 行数: 67
- 预览: # sketch-notes

Soft hand-drawn illustration style with fresh, refined minimalist editorial aestheti...

#### SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\SKILL.md
- 大小: 8715 字节
- 行数: 243
- 预览: ---
name: awkn-slide-deck
description: Generate professional slide deck images from content. Creates...

#### analysis-framework.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\analysis-framework.md
- 大小: 5592 字节
- 行数: 199
- 预览: # Xiaohongshu Content Analysis Framework

Deep analysis framework tailored for Xiaohongshu's unique ...

#### tech.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\styles\tech.md
- 大小: 465 字节
- 行数: 24
- 预览: # tech

Modern, smart, digital

## Color Palette

- Primary: Deep blue (#1A365D), purple (#6B46C1), ...

#### DEPLOYMENT.md
- 路径: awkn-platform\DEPLOYMENT.md
- 大小: 8317 字节
- 行数: 606
- 预览: # AWKN认知觉醒平台 - 部署指南

本文档提供了AWKN平台的完整部署指南，包括开发环境搭建、生产部署、Docker容器化部署等多种方式。

## 目录

- [系统要求](#系统要求)
- [...

#### PROJECT_STRUCTURE.md
- 路径: awkn-platform\PROJECT_STRUCTURE.md
- 大小: 5024 字节
- 行数: 240
- 预览: # AWKN项目结构说明

## 目录结构

```
awkn-platform/
├── README.md                 # 项目说明文档
├── QUICKSTART.md  ...

#### QUICKSTART.md
- 路径: awkn-platform\QUICKSTART.md
- 大小: 2678 字节
- 行数: 229
- 预览: # AWKN认知觉醒平台 - 快速开始指南

本指南帮助您在5分钟内快速启动AWKN平台。

## 🚀 一键启动（Docker Compose）

### 前置要求

- Docker 20.10+...

#### README.md
- 路径: awkn-platform\README.md
- 大小: 1911 字节
- 行数: 135
- 预览: # AWKN - AI Cognitive Awakening Platform

## 项目简介

AWKN是一个帮助他人做认知觉醒的平台，包含内容创作工具箱。采用苹果官网设计风格，提供极简、优雅的...

#### cache_javascript async await example_code_auto.json
- 路径: cache\search\cache_javascript async await example_code_auto.json
- 大小: 2265 字节
- 行数: 58
- 预览: {
  "id": "search_1771967876548_mjk7ivznk",
  "query": "JavaScript async await example",
  "intent":...

#### cache_javascript tutorial_code_auto.json
- 路径: cache\search\cache_javascript tutorial_code_auto.json
- 大小: 1596 字节
- 行数: 48
- 预览: {
  "id": "search_1771967876952_eu08wj3hu",
  "query": "JavaScript tutorial",
  "intent": "code",
  ...

#### capability-shapes.md
- 路径: capabilities\capability-shapes.md
- 大小: 1847 字节
- 行数: 251
- 预览: # 能力轮廓（Capability Shapes）

## 1. Git SSH配置管理

### 输入
- GitHub邮箱地址
- 密钥类型（如ed25519）
- 密钥存储路径
- 密码短语（可...

#### capability-tree.js
- 路径: capabilities\capability-tree.js
- 大小: 24445 字节
- 行数: 938
- 预览: /**
 * 能力树（Capability Tree）核心实现
 * 用于管理智能体的能力体系，支持能力的生长、修剪和质量评估
 * 状态: ACTIVE (已激活) 优先级: LEVEL1 (核心系...

#### high-level-capabilities.md
- 路径: capabilities\high-level-capabilities.md
- 大小: 2430 字节
- 行数: 200
- 预览: # 高阶能力（High-Level Capabilities）

## 1. 环境配置管理

### 能力描述
管理系统环境中的配置和依赖，确保环境一致性和可靠性。

### 合并的基础能力
- Gi...

#### internalization-strategy.md
- 路径: capabilities\internalization-strategy.md
- 大小: 2639 字节
- 行数: 205
- 预览: # 能力内生化策略（Internalization Strategy）

## 1. Git SSH配置管理

### 内生化方式
**作为默认行为模式**：在处理任何Git相关任务时，自动检查SSH...

#### service_monitoring.md
- 路径: capabilities\service_monitoring.md
- 大小: 485 字节
- 行数: 53
- 预览: # OpenClaw服务状态监控管理能力

## 能力轮廓（Capability Shape）

### 输入
- 服务名称/ID
- 监控频率和方式
- 服务状态查询参数
- 服务操作指令（启动/停...

#### roles.json
- 路径: chatgpt-on-wechat-master\plugins\role\roles.json
- 大小: 24259 字节
- 行数: 432
- 预览: {
  "tags": {
    "favorite": "常用",
    "mind": "思维",
    "write": "写作",
    "article": "文章",
    "t...

#### README.md
- 路径: chatgpt-on-wechat-master\README.md
- 大小: 24564 字节
- 行数: 739
- 预览: <p align="center"><img src= "https://github.com/user-attachments/assets/31fb4eab-3be4-477d-aa76-82cf...

#### claim-and-execute-task.js
- 路径: claim-and-execute-task.js
- 大小: 10072 字节
- 行数: 371
- 预览: const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto...

#### design-guideline-template.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\aesthetic\assets\design-guideline-template.md
- 大小: 3511 字节
- 行数: 164
- 预览: # Design Guidelines: [Project Name]

_Generated: [Date]_

## Design Style

[Specify: Minimalism, Gla...

#### design-story-template.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\aesthetic\assets\design-story-template.md
- 大小: 2682 字节
- 行数: 136
- 预览: # Design Story: [Project Name]

_Generated: [Date]_

## Project Context

### Purpose
[What problem d...

#### storytelling-design.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\aesthetic\references\storytelling-design.md
- 大小: 1661 字节
- 行数: 51
- 预览: # Storytelling Design: Peak Experience

## PEAK: Storytelling Through Design

### Narrative Elements...

#### audio-processing.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ai-multimodal\references\audio-processing.md
- 大小: 9382 字节
- 行数: 374
- 预览: # Audio Processing Reference

Comprehensive guide for audio analysis and speech generation using Gem...

#### image-generation.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ai-multimodal\references\image-generation.md
- 大小: 13134 字节
- 行数: 559
- 预览: # Image Generation Reference

Comprehensive guide for image creation, editing, and composition using...

#### backend-mindset.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\backend-development\references\backend-mindset.md
- 大小: 10955 字节
- 行数: 388
- 预览: # Backend Development Mindset

Problem-solving approaches, architectural thinking, and collaboration...

#### backend-technologies.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\backend-development\references\backend-technologies.md
- 大小: 7600 字节
- 行数: 257
- 预览: # Backend Technologies

Core technologies, frameworks, databases, and message queues for modern back...

#### best-practices.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\best-practices.md
- 大小: 7556 字节
- 行数: 448
- 预览: # Best Practices

Guidelines for project organization, security, performance, collaboration, and cos...

#### configuration.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\configuration.md
- 大小: 8210 字节
- 行数: 481
- 预览: # Configuration and Settings

Configure Claude Code behavior with settings hierarchy, model selectio...

#### ide-integration.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\ide-integration.md
- 大小: 6249 字节
- 行数: 317
- 预览: # IDE Integration

Use Claude Code with Visual Studio Code and JetBrains IDEs.

## Visual Studio Cod...

#### slash-commands.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\slash-commands.md
- 大小: 8785 字节
- 行数: 490
- 预览: # Slash Commands Reference

Comprehensive catalog of Claude Code slash commands for development work...

#### code-review-reception.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\code-review\references\code-review-reception.md
- 大小: 6072 字节
- 行数: 209
- 预览: ---
name: receiving-code-review
description: Use when receiving code review feedback, before impleme...

#### requesting-code-review.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\code-review\references\requesting-code-review.md
- 大小: 2773 字节
- 行数: 105
- 预览: ---
name: requesting-code-review
description: Use when completing tasks, implementing major features...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\code-review\SKILL.md
- 大小: 5324 字节
- 行数: 141
- 预览: ---
name: code-review
description: Use when receiving code review feedback (especially if unclear or...

#### context-compression.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\context-engineering\references\context-compression.md
- 大小: 2335 字节
- 行数: 85
- 预览: # Context Compression

Strategies for long-running sessions exceeding context windows.

## Core Insi...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\debugging\systematic-debugging\SKILL.md
- 大小: 9748 字节
- 行数: 296
- 预览: ---
name: Systematic Debugging
description: Four-phase debugging framework that ensures root cause i...

#### limitations.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\docs-seeker\references\limitations.md
- 大小: 17247 字节
- 行数: 822
- 预览: # Limitations & Success Criteria

Understanding boundaries and measuring effectiveness of documentat...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\docs-seeker\SKILL.md
- 大小: 7450 字节
- 行数: 208
- 预览: ---
name: docs-seeker
description: "Searching internet for technical documentation using llms.txt st...

#### ooxml.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\docx\ooxml.md
- 大小: 23562 字节
- 行数: 610
- 预览: # Office Open XML Technical Reference

**Important: Read this entire document before starting.** Thi...

#### ooxml.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\pptx\ooxml.md
- 大小: 10384 字节
- 行数: 427
- 预览: # Office Open XML Technical Reference for PowerPoint

**Important: Read this entire document before ...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\pptx\SKILL.md
- 大小: 25533 字节
- 行数: 484
- 预览: ---
name: pptx
description: "Presentation creation, editing, and analysis. When Claude needs to work...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-design\SKILL.md
- 大小: 4333 字节
- 行数: 42
- 预览: ---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-builder\SKILL.md
- 大小: 13520 字节
- 行数: 329
- 预览: ---
name: mcp-builder
description: Guide for creating high-quality MCP (Model Context Protocol) serv...

#### tools.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-management\assets\tools.json
- 大小: 84510 字节
- 行数: 3044
- 预览: [
  {
    "serverName": "memory",
    "name": "create_entities",
    "description": "Create multiple...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-management\SKILL.md
- 大小: 6498 字节
- 行数: 176
- 预览: ---
name: mcp-management
description: Manage Model Context Protocol (MCP) servers - discover, analyz...

#### diagram-types.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mermaidjs-v11\references\diagram-types.md
- 大小: 5040 字节
- 行数: 316
- 预览: # Mermaid.js Diagram Types

Comprehensive syntax reference for all 24+ diagram types in Mermaid.js v...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mermaidjs-v11\SKILL.md
- 大小: 3136 字节
- 行数: 116
- 预览: ---
name: mermaidjs-v11
description: Create diagrams and visualizations using Mermaid.js v11 syntax....

#### README.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\README.md
- 大小: 7271 字节
- 行数: 111
- 预览: # Skills
Skills are folders of instructions, scripts, and resources that Claude loads dynamically to...

#### THIRD_PARTY_NOTICES.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\THIRD_PARTY_NOTICES.md
- 大小: 46157 字节
- 行数: 405
- 预览: # **Third-Party Notices**

THE FOLLOWING SETS FORTH ATTRIBUTION NOTICES FOR THIRD PARTY SOFTWARE THA...

#### ArsenalSC-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\ArsenalSC-OFL.txt
- 大小: 4373 字节
- 行数: 94
- 预览: Copyright 2012 The Arsenal Project Authors (andrij.design@gmail.com)

This Font Software is licensed...

#### BigShoulders-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\BigShoulders-OFL.txt
- 大小: 4397 字节
- 行数: 94
- 预览: Copyright 2019 The Big Shoulders Project Authors (https://github.com/xotypeco/big_shoulders)

This F...

#### Boldonse-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\Boldonse-OFL.txt
- 大小: 4390 字节
- 行数: 94
- 预览: Copyright 2024 The Boldonse Project Authors (https://github.com/googlefonts/boldonse)

This Font Sof...

#### BricolageGrotesque-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\BricolageGrotesque-OFL.txt
- 大小: 4403 字节
- 行数: 94
- 预览: Copyright 2022 The Bricolage Grotesque Project Authors (https://github.com/ateliertriay/bricolage)

...

#### CrimsonPro-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\CrimsonPro-OFL.txt
- 大小: 4394 字节
- 行数: 94
- 预览: Copyright 2018 The Crimson Pro Project Authors (https://github.com/Fonthausen/CrimsonPro)

This Font...

#### DMMono-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\DMMono-OFL.txt
- 大小: 4392 字节
- 行数: 94
- 预览: Copyright 2020 The DM Mono Project Authors (https://www.github.com/googlefonts/dm-mono)

This Font S...

#### EricaOne-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\EricaOne-OFL.txt
- 大小: 4410 字节
- 行数: 95
- 预览: Copyright (c) 2011 by LatinoType Limitada (luciano@latinotype.com), 
with Reserved Font Names "Erica...

#### GeistMono-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\GeistMono-OFL.txt
- 大小: 4388 字节
- 行数: 94
- 预览: Copyright 2024 The Geist Project Authors (https://github.com/vercel/geist-font.git)

This Font Softw...

#### Gloock-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\Gloock-OFL.txt
- 大小: 4381 字节
- 行数: 94
- 预览: Copyright 2022 The Gloock Project Authors (https://github.com/duartp/gloock)

This Font Software is ...

#### IBMPlexMono-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\IBMPlexMono-OFL.txt
- 大小: 4362 字节
- 行数: 94
- 预览: Copyright © 2017 IBM Corp. with Reserved Font Name "Plex"

This Font Software is licensed under the ...

#### InstrumentSans-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\InstrumentSans-OFL.txt
- 大小: 4403 字节
- 行数: 94
- 预览: Copyright 2022 The Instrument Sans Project Authors (https://github.com/Instrument/instrument-sans)

...

#### Italiana-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\Italiana-OFL.txt
- 大小: 4394 字节
- 行数: 94
- 预览: Copyright (c) 2011, Santiago Orozco (hi@typemade.mx), with Reserved Font Name "Italiana".

This Font...

#### JetBrainsMono-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\JetBrainsMono-OFL.txt
- 大小: 4399 字节
- 行数: 94
- 预览: Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono)

This...

#### Jura-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\Jura-OFL.txt
- 大小: 4380 字节
- 行数: 94
- 预览: Copyright 2019 The Jura Project Authors (https://github.com/ossobuffo/jura)

This Font Software is l...

#### LibreBaskerville-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\LibreBaskerville-OFL.txt
- 大小: 4449 字节
- 行数: 94
- 预览: Copyright 2012 The Libre Baskerville Project Authors (https://github.com/impallari/Libre-Baskerville...

#### Lora-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\Lora-OFL.txt
- 大小: 4423 字节
- 行数: 94
- 预览: Copyright 2011 The Lora Project Authors (https://github.com/cyrealtype/Lora-Cyrillic), with Reserved...

#### NationalPark-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\NationalPark-OFL.txt
- 大小: 4399 字节
- 行数: 94
- 预览: Copyright 2025 The National Park Project Authors (https://github.com/benhoepner/National-Park)

This...

#### NothingYouCouldDo-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\NothingYouCouldDo-OFL.txt
- 大小: 4363 字节
- 行数: 94
- 预览: Copyright (c) 2010, Kimberly Geswein (kimberlygeswein.com)

This Font Software is licensed under the...

#### Outfit-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\Outfit-OFL.txt
- 大小: 4389 字节
- 行数: 94
- 预览: Copyright 2021 The Outfit Project Authors (https://github.com/Outfitio/Outfit-Fonts)

This Font Soft...

#### PixelifySans-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\PixelifySans-OFL.txt
- 大小: 4395 字节
- 行数: 94
- 预览: Copyright 2021 The Pixelify Sans Project Authors (https://github.com/eifetx/Pixelify-Sans)

This Fon...

#### PoiretOne-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\PoiretOne-OFL.txt
- 大小: 4366 字节
- 行数: 94
- 预览: Copyright (c) 2011, Denis Masharov (denis.masharov@gmail.com)

This Font Software is licensed under ...

#### RedHatMono-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\RedHatMono-OFL.txt
- 大小: 4394 字节
- 行数: 94
- 预览: Copyright 2024 The Red Hat Project Authors (https://github.com/RedHatOfficial/RedHatFont)

This Font...

#### Silkscreen-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\Silkscreen-OFL.txt
- 大小: 4394 字节
- 行数: 94
- 预览: Copyright 2001 The Silkscreen Project Authors (https://github.com/googlefonts/silkscreen)

This Font...

#### SmoochSans-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\SmoochSans-OFL.txt
- 大小: 4396 字节
- 行数: 94
- 预览: Copyright 2016 The Smooch Sans Project Authors (https://github.com/googlefonts/smooch-sans)

This Fo...

#### Tektur-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\Tektur-OFL.txt
- 大小: 4385 字节
- 行数: 94
- 预览: Copyright 2023 The Tektur Project Authors (https://www.github.com/hyvyys/Tektur)

This Font Software...

#### WorkSans-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\WorkSans-OFL.txt
- 大小: 4397 字节
- 行数: 94
- 预览: Copyright 2019 The Work Sans Project Authors (https://github.com/weiweihuanghuang/Work-Sans)

This F...

#### YoungSerif-OFL.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\canvas-fonts\YoungSerif-OFL.txt
- 大小: 4398 字节
- 行数: 94
- 预览: Copyright 2023 The Young Serif Project Authors (https://github.com/noirblancrouge/YoungSerif)

This ...

#### canvas-design-system.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\references\canvas-design-system.md
- 大小: 7888 字节
- 行数: 321
- 预览: # Canvas Design System

Visual design philosophy, systematic composition, and sophisticated visual c...

#### debugger-251230-1932-marketplace-visibility.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plans\reports\debugger-251230-1932-marketplace-visibility.md
- 大小: 6495 字节
- 行数: 217
- 预览: # Marketplace Visibility Investigation: mermaidjs-v11 & context-engineering

**Date:** 2025-12-30
**...

#### README.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\README.md
- 大小: 18108 字节
- 行数: 179
- 预览: # ClaudeKit - Agent Skills

[**Agent Skills**](https://docs.claude.com/en/docs/agents-and-tools/agen...

#### REFACTOR.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\REFACTOR.md
- 大小: 7218 字节
- 行数: 161
- 预览: # I was wrong about Agent Skills and how I refactor them

## What Happened

Agent Skills dropped Oct...

#### commercialization-strategy.md
- 路径: commercialization-strategy.md
- 大小: 4731 字节
- 行数: 326
- 预览: # 智能体能力商业化转化策略

## 1. 核心能力识别

### 1.1 智能体能力矩阵

| 智能体 | 核心能力 | 竞争优势 | 市场价值 |
|--------|----------|---...

#### company-assets-report-2026-02-23.md
- 路径: company-assets-report-2026-02-23.md
- 大小: 3767 字节
- 行数: 202
- 预览: # 绿茶智能体有限公司 - 公司资产盘点报告（2026-02-23）

## 公司概况
- **公司名称**: 绿茶智能体有限公司
- **核心业务**: 心理测试、内容创作、用户服务
- **组织架...

#### projects_skills_inventory.md
- 路径: company-brain\src\memory\projects_skills_inventory.md
- 大小: 6871 字节
- 行数: 340
- 预览: # 项目和技能清单

## 更新时间
2026-02-23

## 概述
本文件记录了公司所有未被 OPENCLAW 直接管理的项目和技能，以便新对话框可以自动调用这些内容，避免重复开发。

## 已...

#### comprehensive-test.js
- 路径: comprehensive-test.js
- 大小: 2595 字节
- 行数: 103
- 预览: /**
 * 综合能力树测试
 * 先更新能力树，然后测试其功能
 */

const { capabilityTree } = require('./capabilities/capability-...

#### ec22b_60e632ea._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_60e632ea._.js
- 大小: 947211 字节
- 行数: 19579
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/lib/metadata/get-metadata-rout...

#### ec22b_cfeecc0b._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_cfeecc0b._.js
- 大小: 174180 字节
- 行数: 4359
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/@swc/helpers/cjs/_interop_require_defaul...

#### ec22b_next_dist_2c61bce4._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_next_dist_2c61bce4._.js
- 大小: 239968 字节
- 行数: 3694
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/lib/metadata/get-metadata-rout...

#### ec22b_next_dist_c013547a._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_next_dist_c013547a._.js
- 大小: 241039 字节
- 行数: 3664
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/lib/metadata/get-metadata-rout...

#### ec22b_next_dist_5d8b5e91._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_5d8b5e91._.js
- 大小: 93298 字节
- 行数: 2309
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_dist_8b812d37._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_8b812d37._.js
- 大小: 86971 字节
- 行数: 2140
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_dist_b42a5c82._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_b42a5c82._.js
- 大小: 211704 字节
- 行数: 4976
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### convert-to-skill.js
- 路径: convert-to-skill.js
- 大小: 7773 字节
- 行数: 392
- 预览: const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

// 分析结...

#### real-task-executor.js
- 路径: evomap-connection\real-task-executor.js
- 大小: 13301 字节
- 行数: 532
- 预览: const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * EvoM...

#### analysis.json
- 路径: evomap-connection\real-tasks-executed\cmm0nzvim025rn02nskyw3l1u_南方城市“就地滑雪”的推广，在能源消耗和环境影响方面会带来什么��题？如何实现可持续发展？\analysis.json
- 大小: 453 字节
- 行数: 18
- 预览: {
  "taskId": "cmm0nzvim025rn02nskyw3l1u",
  "title": "南方城市“就地滑雪”的推广，在能源消耗和环境影响方面会带来什么��题？如何实现可持续发展？...

#### capsule.json
- 路径: evomap-connection\real-tasks-executed\cmm0nzvim025rn02nskyw3l1u_南方城市“就地滑雪”的推广，在能源消耗和环境影响方面会带来什么��题？如何实现可持续发展？\assets\capsule.json
- 大小: 1645 字节
- 行数: 12
- 预览: {
  "type": "capsule",
  "name": "南方城市“就地滑雪”的推广，在能源消耗和环境影响方面会带来什_capsule",
  "description": "胶囊: 南方城...

#### evolutionEvent.json
- 路径: evomap-connection\real-tasks-executed\cmm0nzvim025rn02nskyw3l1u_南方城市“就地滑雪”的推广，在能源消耗和环境影响方面会带来什么��题？如何实现可持续发展？\assets\evolutionEvent.json
- 大小: 2616 字节
- 行数: 12
- 预览: {
  "type": "evolutionEvent",
  "name": "南方城市“就地滑雪”的推广，在能源消耗和环境影响方面会带来什_evolution",
  "description":...

#### gene.json
- 路径: evomap-connection\real-tasks-executed\cmm0nzvim025rn02nskyw3l1u_南方城市“就地滑雪”的推广，在能源消耗和环境影响方面会带来什么��题？如何实现可持续发展？\assets\gene.json
- 大小: 750 字节
- 行数: 12
- 预览: {
  "type": "gene",
  "name": "南方城市“就地滑雪”的推广，在能源消耗和环境影响方面会带来什_gene",
  "description": "基因: 南方城市“就地滑雪...

#### solution.json
- 路径: evomap-connection\real-tasks-executed\cmm0nzvim025rn02nskyw3l1u_南方城市“就地滑雪”的推广，在能源消耗和环境影响方面会带来什么��题？如何实现可持续发展？\solution.json
- 大小: 1240 字节
- 行数: 58
- 预览: {
  "taskId": "cmm0nzvim025rn02nskyw3l1u",
  "title": "南方城市“就地滑雪”的推广，在能源消耗和环境影响方面会带来什么��题？如何实现可持续发展？...

#### SKILL.md
- 路径: evomap-connection\skills\上门经济分析\SKILL.md
- 大小: 761 字节
- 行数: 67
- 预览: ---
name: 上门经济分析
description: 上门经济行业分析与传统家政服务行业转型策略
author: 绿茶智能体
tags:
  - economic-analysis
  - in...

#### task-claimer.js
- 路径: evomap-connection\task-claimer.js
- 大小: 12506 字节
- 行数: 466
- 预览: const fs = require('fs');
const path = require('path');
const EvoMapConnectionService = require('./c...

#### analysis.md
- 路径: evomap-connection\tasks\task_001_上门经济在春节期间的兴起，对传统家政服务行业的冲击\analysis.md
- 大小: 231 字节
- 行数: 16
- 预览: # 任务分析: 上门经济在春节期间的兴起，对传统家政服务行业的冲击

## 任务描述
分析上门经济在春节期间的兴起原因，以及对传统家政服务行业的具体冲击，提出行业应对策略。

## 核心问题
1. 上...

#### gene.json
- 路径: evomap-connection\tasks\task_001_上门经济在春节期间的兴起，对传统家政服务行业的冲击\assets\gene.json
- 大小: 405 字节
- 行数: 7
- 预览: {
  "type": "gene",
  "name": "上门经济在春节期间的兴起，对传统家政服务行业的冲击_gene",
  "description": "基因: 上门经济在春节期间的兴起，对...

#### taskManager.js
- 路径: evomap-evolution\lib\taskManager.js
- 大小: 7859 字节
- 行数: 306
- 预览: const crypto = require('crypto');

class TaskManager {
  constructor(config, connector) {
    this.c...

#### final_execution_report.json
- 路径: evomap-evolution\logs\final_execution_report.json
- 大小: 5254 字节
- 行数: 183
- 预览: {
  "report": {
    "title": "EvoMap 连接与社交媒体发布执行报告",
    "generated_at": "2026-02-24T03:06:00.000Z",...

#### EVOMAP_BINDING_GUIDE.md
- 路径: EVOMAP_BINDING_GUIDE.md
- 大小: 1908 字节
- 行数: 125
- 预览: # EvoMap 节点绑定指南

## 节点信息
- **节点名称**: 大掌柜
- **节点ID**: `node_c3c7ebfa60b867f1`
- **您的账户**: xiaxingxiao...

#### evomap_integration_report.md
- 路径: evomap_integration_report.md
- 大小: 1820 字节
- 行数: 93
- 预览: # EvoMap 集成验证报告

## 集成状态

### ✅ 任务完成情况
- [x] 安装 Evolver 客户端
- [x] 注册节点到 EvoMap 网络
- [x] 获取 Gene 和 Ca...

#### execute-specific-task.js
- 路径: execute-specific-task.js
- 大小: 7531 字节
- 行数: 318
- 预览: /**
 * 执行特定任务的脚本
 * 直接处理之前识别的上门经济任务
 */

const fs = require('fs');
const path = require('path');
con...

#### green_tea_personality_implementation.md
- 路径: green_tea_personality_implementation.md
- 大小: 1864 字节
- 行数: 116
- 预览: # 绿茶渣女人格（Addictive Soft Manipulator）实施计划

## 项目概述
本计划旨在为OpenClaw智能体添加一种特定的人格模式：绿茶渣女人格（Addictive Soft...

#### plan_20260206_093111.md
- 路径: HATwin\.trae\documents\plan_20260206_093111.md
- 大小: 1914 字节
- 行数: 116
- 预览: # 更换API服务：阿里DashScope → 火山方舟豆包

## 项目现状分析

当前项目使用Node.js + Express实现后端代理，前端通过 `/api/chat` 端点与后端通信，后端...

#### 修复欢迎消息和头像显示问题.md
- 路径: HATwin\.trae\documents\修复欢迎消息和头像显示问题.md
- 大小: 739 字节
- 行数: 33
- 预览: ## 问题分析

1. **欢迎消息未显示**：
   - HATWIN.html文件中缺少`initWelcomeMessage`函数的实现
   - `DOMContentLoaded`事件处理函...

#### 实现 hotel-ai-sidecar.js 并集成 Supabase 后端.md
- 路径: HATwin\.trae\documents\实现 hotel-ai-sidecar.js 并集成 Supabase 后端.md
- 大小: 1068 字节
- 行数: 45
- 预览: # 实现 hotel-ai-sidecar.js 并集成 Supabase 后端

## 1. 项目准备
- **安装 Supabase 客户端库**：在 package.json 中添加 @supa...

#### 集成 hotel-ai-sidecar.js 前端外挂脚本.md
- 路径: HATwin\.trae\documents\集成 hotel-ai-sidecar.js 前端外挂脚本.md
- 大小: 793 字节
- 行数: 27
- 预览: # 集成 hotel-ai-sidecar.js 前端外挂脚本

## 1. 添加必要的依赖项
- **Supabase JS SDK**：在 HATWIN.html 中添加 Supabase 客户端...

#### 集成Node.js代理服务器到LAY AI系统.md
- 路径: HATwin\.trae\documents\集成Node.js代理服务器到LAY AI系统.md
- 大小: 1136 字节
- 行数: 82
- 预览: # 集成Node.js代理服务器到LAY AI系统

## 项目现状分析

当前项目是一个前端单页应用，直接调用阿里DashScope API进行AI交互。存在的问题：
- API密钥存储在前端loc...

#### README.md
- 路径: hero\projects\README.md
- 大小: 6768 字节
- 行数: 359
- 预览: # projects

这是一个基于 [Next.js 16](https://nextjs.org) + [shadcn/ui](https://ui.shadcn.com) 的全栈应用项目，由扣子...

#### plan_20260206_121542.md
- 路径: HTP\.trae\documents\plan_20260206_121542.md
- 大小: 931 字节
- 行数: 59
- 预览: ## 问题分析

用户要求修改性别选择的UI设计，具体要求：
1. 将下拉菜单改为小的男/女点选按钮
2. 将性别选择放在基本信息的右边
3. 用色块衬底

## 解决方案

### 修改 Onboa...

#### plan_20260207_153155.md
- 路径: HTP\.trae\documents\plan_20260207_153155.md
- 大小: 878 字节
- 行数: 40
- 预览: ## 问题分析
从用户提供的HTML元素和之前的日志中可以看到，智能体仍然输出了"一、元素特征分析"等不需要的Markdown标题。这说明：

1. 智能体返回的内容是Markdown格式的文本，包含...

#### 修复智能体输出不需要标题的问题.md
- 路径: HTP\.trae\documents\修复智能体输出不需要标题的问题.md
- 大小: 719 字节
- 行数: 34
- 预览: ## 问题分析
从用户提供的日志中可以看到，后端返回的结果仍然包含"一、元素特征分析"等不需要的Markdown标题。这说明：

1. 智能体返回的内容不是JSON格式，而是直接返回了Markdown...

#### 2个智能体提示词.txt
- 路径: HTP\2个智能体提示词.txt
- 大小: 11700 字节
- 行数: 363
- 预览: # Role
你是一个**基于HTP（房树人）投射技术的深度心理咨询系统**。
你的核心定位是一位兼具临床洞察力与文学穿透力的“心灵传记作家**。
你的使命不仅仅是“解读”画作，而是通过**“看...

#### server.js
- 路径: HTP\backend\server.js
- 大小: 14772 字节
- 行数: 481
- 预览: require('dotenv').config();
const express = require('express');
const axios = require('axios');
cons...

#### generated-content.md
- 路径: HTP\generated-content.md
- 大小: 1472 字节
- 行数: 34
- 预览: # HTP分析报告内容

## 看见（至少200字）
在你的画笔下，我看见了一座温馨的小房子，屋顶有着柔和的曲线，门窗都敞开着。房子旁边生长着一棵枝繁叶茂的大树，树干粗壮有力，树冠向四周舒展。树下站着...

#### htp-insight-agent-prompt.md
- 路径: HTP\htp-insight-agent-prompt.md
- 大小: 11315 字节
- 行数: 632
- 预览: # HTP 房树人分析智能体提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析智能体，集成在 HTP 心理分析系统中。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木...

#### htp-insight-workflow.md
- 路径: HTP\htp-insight-workflow.md
- 大小: 6175 字节
- 行数: 351
- 预览: # HTP 房树人分析工作流

## 工作流概述

本工作流基于 HTP（房-树-人）绘画心理分析理论，结合现代 AI 技术，实现从绘画作品到深度心理分析报告的全流程自动化。工作流包含 8 个核心步骤...

#### INTEGRATION_GUIDE.md
- 路径: HTP\INTEGRATION_GUIDE.md
- 大小: 4052 字节
- 行数: 237
- 预览: # HTP 智能体集成指南

## 概述

本指南详细说明了如何在 HTP 心理分析系统中集成和使用智能体提示词与工作流，确保系统能够正确分析用户的房树人绘画作品并生成结构化的分析结果。

## 核心...

#### PRD.md
- 路径: HTP\PRD.md
- 大小: 8895 字节
- 行数: 431
- 预览: # HTP心理分析系统产品需求文档

## 1. 产品概览

HTP心理分析系统是一款基于房树人（House-Tree-Person）投射测验理论的智能心理分析工具，通过AI技术分析用户绘制的房树人画...

#### blueprint.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\blueprint.md
- 大小: 1844 字节
- 行数: 58
- 预览: # blueprint

Precise technical blueprint style with engineering precision

## Design Aesthetic

Clea...

#### intuition-machine.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\intuition-machine.md
- 大小: 1850 字节
- 行数: 58
- 预览: # intuition-machine

Technical briefing infographic style with aged paper and bilingual labels

## D...

#### scientific.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\scientific.md
- 大小: 1741 字节
- 行数: 60
- 预览: # scientific

Academic scientific illustration style for technical diagrams and processes

## Design...

#### sketch-notes.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\sketch-notes.md
- 大小: 1824 字节
- 行数: 57
- 预览: # sketch-notes

Soft hand-drawn illustration style with warm, educational feel

## Design Aesthetic
...

#### warm.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\warm.md
- 大小: 1760 字节
- 行数: 59
- 预览: # warm

Friendly, approachable illustration style for human-centered content

## Design Aesthetic

W...

#### SKILL.md
- 路径: HTP\projects\awkn-article-illustrator-code\SKILL.md
- 大小: 10818 字节
- 行数: 360
- 预览: ---
name: awkn-article-illustrator
description: Smart article illustration skill. Analyzes article c...

#### agent-workflow-prompt.md
- 路径: HTP\projects\htp-insight\references\agent-workflow-prompt.md
- 大小: 25415 字节
- 行数: 1237
- 预览: # HTP 房树人分析系统 - 智能体工作流提示词

## 系统定位

你是一个专业的 HTP（房-树-人）绘画心理分析系统。你的核心能力是通过分析用户上传的绘画作品（包含房子、树木、人物三个元素），...

#### brand-positioning.md
- 路径: HTP\projects\htp-insight\references\brand-positioning.md
- 大小: 2439 字节
- 行数: 207
- 预览: # 品牌定位策略

## 核心定位

### 品牌名称
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **英文名**：Draw to see y...

#### brand-product-guide.md
- 路径: HTP\projects\htp-insight\references\brand-product-guide.md
- 大小: 9974 字节
- 行数: 707
- 预览: # 品牌与产品指南

## 目录
1. [品牌核心](#品牌核心)
2. [品牌定位策略](#品牌定位策略)
3. [产品介绍](#产品介绍)
4. [产品电梯演讲](#产品电梯演讲)
5. [产品推...

#### brand.md
- 路径: HTP\projects\htp-insight\references\brand.md
- 大小: 679 字节
- 行数: 45
- 预览: # 品牌指南

## 核心品牌

### 名称
- **主标题**：你的画，照见你的灵魂
- **副标题**：让每一笔绘画，都成为遇见真实的自己
- **品牌承诺**：在这里，没有评判，只有理解；没有...

#### elevator-pitch.md
- 路径: HTP\projects\htp-insight\references\elevator-pitch.md
- 大小: 2203 字节
- 行数: 139
- 预览: # 产品介绍 - 电梯演讲版本

## 30 秒版本

> **"你的画，照见你的灵魂"**——只需画一幅画，AI 就能深度解读你的心理状态、人格特质和成长潜力。智能分析 + 温暖报告 + 专业洞察，...

#### product-description.md
- 路径: HTP\projects\htp-insight\references\product-description.md
- 大小: 2613 字节
- 行数: 149
- 预览: # 产品介绍

## 项目简介

**你的画，照见你的灵魂**，是一个融合了心理学理论与 AI 技术的智能分析工具。通过分析用户手绘的绘画作品，系统能够深入解读个体的心理状态、人格特质、内在矛盾与成长...

#### promotion.md
- 路径: HTP\projects\htp-insight\references\promotion.md
- 大小: 2043 字节
- 行数: 153
- 预览: # 产品推广文案

## 一画知心：让每一笔绘画都成为理解心灵的窗口

你是否想过，你随手画的一幅画，可能藏着你内心深处的秘密？

粗壮的线条是你内在的力量，茂盛的元素是你思维的活力，深邃的细节是你与...

#### SKILL.md
- 路径: HTP\projects\htp-insight\SKILL.md
- 大小: 9742 字节
- 行数: 365
- 预览: ---
name: htp-insight
description: Draw to see your soul. Analyze drawings to reveal inner self, emo...

#### test-api.js
- 路径: HTP\test-api.js
- 大小: 4874 字节
- 行数: 169
- 预览: // 阿里云百炼 API 调用测试
// 这个文件专门用于测试阿里云百炼 API 的调用功能

const API_KEY = 'sk-5b3ed10963f34b4aa7eca0ecb72ab216...

#### skill-contents.md
- 路径: HTP\test-output\skill-contents.md
- 大小: 27054 字节
- 行数: 978
- 预览: # HTP 项目技能内容

## htp-insight 技能

---
name: htp-insight
description: Draw to see your soul. Analyze d...

#### 智能体提示词.txt
- 路径: HTP\智能体提示词.txt
- 大小: 10974 字节
- 行数: 363
- 预览: # Role
你是一个**基于HTP（房树人）投射技术的深度心理咨询系统**。
你的核心定位是一位兼具临床洞察力与文学穿透力的“心灵传记作家**。
你的使命不仅仅是“解读”画作，而是通过**“看...

#### plan_20260206_093111.md
- 路径: LAY\.trae\documents\plan_20260206_093111.md
- 大小: 1914 字节
- 行数: 116
- 预览: # 更换API服务：阿里DashScope → 火山方舟豆包

## 项目现状分析

当前项目使用Node.js + Express实现后端代理，前端通过 `/api/chat` 端点与后端通信，后端...

#### 修复欢迎消息和头像显示问题.md
- 路径: LAY\.trae\documents\修复欢迎消息和头像显示问题.md
- 大小: 739 字节
- 行数: 33
- 预览: ## 问题分析

1. **欢迎消息未显示**：
   - HATWIN.html文件中缺少`initWelcomeMessage`函数的实现
   - `DOMContentLoaded`事件处理函...

#### 实现 hotel-ai-sidecar.js 并集成 Supabase 后端.md
- 路径: LAY\.trae\documents\实现 hotel-ai-sidecar.js 并集成 Supabase 后端.md
- 大小: 1068 字节
- 行数: 45
- 预览: # 实现 hotel-ai-sidecar.js 并集成 Supabase 后端

## 1. 项目准备
- **安装 Supabase 客户端库**：在 package.json 中添加 @supa...

#### 将项目转变为人生决策宗师大六壬毕法宗师系统.md
- 路径: LAY\.trae\documents\将项目转变为人生决策宗师大六壬毕法宗师系统.md
- 大小: 603 字节
- 行数: 42
- 预览: # 项目转型计划：从 LAY AI 到人生决策宗师

## 1. 项目配置更新
- 修改 package.json 中的项目名称、描述和关键词
- 更新健康检查端点的响应信息

## 2. 服务器核心...

#### 集成 hotel-ai-sidecar.js 前端外挂脚本.md
- 路径: LAY\.trae\documents\集成 hotel-ai-sidecar.js 前端外挂脚本.md
- 大小: 793 字节
- 行数: 27
- 预览: # 集成 hotel-ai-sidecar.js 前端外挂脚本

## 1. 添加必要的依赖项
- **Supabase JS SDK**：在 HATWIN.html 中添加 Supabase 客户端...

#### 集成Node.js代理服务器到LAY AI系统.md
- 路径: LAY\.trae\documents\集成Node.js代理服务器到LAY AI系统.md
- 大小: 1136 字节
- 行数: 82
- 预览: # 集成Node.js代理服务器到LAY AI系统

## 项目现状分析

当前项目是一个前端单页应用，直接调用阿里DashScope API进行AI交互。存在的问题：
- API密钥存储在前端loc...

#### long-term-evolution-strategy.md
- 路径: long-term-evolution-strategy.md
- 大小: 8461 字节
- 行数: 447
- 预览: # 智能体长期进化战略

## 1. 战略背景

### 1.1 当前状态分析

#### 智能体生态系统
- **绿茶智能体**：已配置完整，包含心理测试、绘画分析、内容创作和用户服务能力
- **...

#### 2026-02-25_asset_inventory.md
- 路径: memory\daily_assets\2026-02-25_asset_inventory.md
- 大小: 2761 字节
- 行数: 132
- 预览: # 2026-02-25 资产盘点报告

## 1. 工作内容概述

### 1.1 核心任务完成
- ✅ 实现 Knowledge & Memory 分支工具
- ✅ 实现 Intelligence...

#### 2026-02-25_capability_tree_vfm_integration.md
- 路径: memory\long_term\company_assets\2026-02-25_capability_tree_vfm_integration.md
- 大小: 4060 字节
- 行数: 178
- 预览: # 2026-02-25 能力树与 VFM 协议集成资产记录

## 1. 项目概述

### 1.1 项目背景
- **目标**：实现 OpenClaw AI Agent 的能力树结构和价值函数突变...

#### 2f884_next_dist_264e22dd._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_264e22dd._.js
- 大小: 241127 字节
- 行数: 3672
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/lib/metadata/get-metadata-route...

#### 2f884_next_dist_2f35fd66._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_2f35fd66._.js
- 大小: 241107 字节
- 行数: 3672
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/lib/metadata/get-metadata-route...

#### 2f884_next_dist_53e5d51c._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_53e5d51c._.js
- 大小: 241167 字节
- 行数: 3672
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/lib/metadata/get-metadata-route...

#### 2f884_next_dist_8346d267._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_8346d267._.js
- 大小: 239657 字节
- 行数: 3694
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/lib/metadata/get-metadata-route...

#### 2f884_next_dist_9495ae5b._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_9495ae5b._.js
- 大小: 241187 字节
- 行数: 3672
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/lib/metadata/get-metadata-route...

#### 2f884_next_dist_ac1294cd._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_ac1294cd._.js
- 大小: 245694 字节
- 行数: 3734
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/lib/metadata/get-metadata-route...

#### 2f884_next_dist_bac079d8._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_bac079d8._.js
- 大小: 241147 字节
- 行数: 3672
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/lib/metadata/get-metadata-route...

#### 2f884_next_dist_c6869c12._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_c6869c12._.js
- 大小: 241147 字节
- 行数: 3672
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/lib/metadata/get-metadata-route...

#### mission-control_src_6488cd0f._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control_src_6488cd0f._.js
- 大小: 57118 字节
- 行数: 704
- 预览: module.exports = [
"[project]/mission-control/src/components/memory/SearchBar.tsx [app-ssr] (ecmascr...

#### mission-control_src_app_content_page_tsx_a36e7516._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control_src_app_content_page_tsx_a36e7516._.js
- 大小: 41271 字节
- 行数: 606
- 预览: module.exports = [
"[project]/mission-control/src/app/content/page.tsx [app-ssr] (ecmascript)", ((__...

#### 2f884_next_dist_4999a2f5._.js
- 路径: mission-control\.next\dev\static\chunks\2f884_next_dist_4999a2f5._.js
- 大小: 211514 字节
- 行数: 4976
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### mission-control_src_7e813fef._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_7e813fef._.js
- 大小: 55931 字节
- 行数: 748
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### mission-control_src_app_content_page_tsx_c4153670._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_content_page_tsx_c4153670._.js
- 大小: 39453 字节
- 行数: 623
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### mission-control_src_app_content_page_tsx_a36e7516._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_src_app_content_page_tsx_a36e7516._.js
- 大小: 6451 字节
- 行数: 3
- 预览: module.exports=[125,a=>{"use strict";var b=a.i(55217),c=a.i(58214);let d=[{id:"1",title:"如何构建高效的 AI ...

#### mission-control_src_app_memory_page_tsx_36195e08._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_src_app_memory_page_tsx_36195e08._.js
- 大小: 8173 字节
- 行数: 3
- 预览: module.exports=[84176,a=>{"use strict";var b=a.i(55217),c=a.i(58214);let d=({onSearch:a})=>{let[d,e]...

#### 290ecd9b9511c974.js
- 路径: mission-control\.next\static\chunks\290ecd9b9511c974.js
- 大小: 8188 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### ad24201fb70ffe8e.js
- 路径: mission-control\.next\static\chunks\ad24201fb70ffe8e.js
- 大小: 6467 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### team_and_office_plan.md
- 路径: mission-control\.trae\documents\team_and_office_plan.md
- 大小: 5720 字节
- 行数: 117
- 预览: # Team and Office Implementation Plan

## Overview
This plan outlines the implementation of two new ...

#### one_person_company_evolution_plan.md
- 路径: one_person_company_evolution_plan.md
- 大小: 4717 字节
- 行数: 316
- 预览: # One Person Company Evolution Plan

## 1. 项目概述

### 1.1 项目目标
建立一个完整的个人公司生态系统，通过 AI 代理团队实现自动化运营，从战略规...

#### OPENCLAW_EVO_DEPLOYMENT_PLAN.md
- 路径: OPENCLAW_EVO_DEPLOYMENT_PLAN.md
- 大小: 6834 字节
- 行数: 332
- 预览: # OPENCLAW+EVO 真实部署计划

## 1. 部署概述

### 1.1 部署目标
- 实现 OPENCLAW+EVO 系统的真实部署
- 配置小红书账号（251940568）实现真实发布...

#### README.md
- 路径: plugins\doubao-api\README.md
- 大小: 3610 字节
- 行数: 240
- 预览: # 豆包API集成插件

## 概述

本插件将火山引擎豆包API集成到OpenClaw和EVO系统中，实现多团队协作的AI服务。

### 主要功能

- ✅ 火山引擎豆包API集成
- ✅ 多团队...

#### SKILL.md
- 路径: project_20260127_134424\projects\bug-design\SKILL.md
- 大小: 3847 字节
- 行数: 286
- 预览: ---
name: bug-design
description: BUG修复方案设计阶段，包含修复目标确定、初步方案生成、可行性判断、风险识别、异常应对策略制定
---

# BUG修复方案设计

...

#### SKILL.md
- 路径: project_20260127_134424\projects\bug-execute-verify\SKILL.md
- 大小: 4617 字节
- 行数: 344
- 预览: ---
name: bug-execute-verify
description: BUG修复执行与验收阶段，包含修复方案执行、进度跟踪、验收标准制定、验收检查、问题汇总
---

# BUG修复执行...

#### visualization-styles.md
- 路径: references\visualization-styles.md
- 大小: 3733 字节
- 行数: 196
- 预览: # 可视化风格说明

## 小红书适配风格

### 1. 极简Ins风
- **特点**：简洁、留白、高质感
- **配色**：白色背景，低饱和度莫兰迪色
- **字体**：无衬线字体...

#### README.md
- 路径: services\wechat-auth\README.md
- 大小: 1557 字节
- 行数: 156
- 预览: # 微信授权服务

本服务实现微信账号的授权管理，使用Wechaty和PadLocal实现微信登录和会话管理。

## 功能特性

- 微信扫码登录
- 会话状态管理
- JWT令牌生成
- Redi...

#### README.md
- 路径: services\wechat-message\README.md
- 大小: 2516 字节
- 行数: 203
- 预览: # 微信消息监听与自动回复服务

本服务实现微信消息的实时监听、意图识别和自动回复功能，使智能体能够作为用户的数字分身与朋友进行自然的聊天。

## 功能特性

- 微信消息实时监听
- 消息情感分析...

#### README.md
- 路径: services\wechat-moments\README.md
- 大小: 3766 字节
- 行数: 280
- 预览: # 微信朋友圈自动化发布服务

本服务实现微信朋友圈的自动化发布功能，包括内容生成、定时发布、图片处理和效果分析，使智能体能够作为用户的数字分身自主管理朋友圈内容。

## 功能特性

- 朋友圈内容...

#### task-board.md
- 路径: shared-memory\coordination\task-board.md
- 大小: 4389 字节
- 行数: 272
- 预览: # 公司任务看板

## 1. 看板概述

本任务看板是公司智能体之间任务分配和协作的核心工具，基于"公司模式"的管理理念，旨在实现任务的透明化管理、高效分配和实时跟踪。

## 2. 任务状态

#...

#### openviking-config.md
- 路径: shared-memory\system-config\openviking-config.md
- 大小: 324 字节
- 行数: 27
- 预览: # OpenViking 系统配置

## 系统架构
- 公司大脑：中央调度中心
- 智能体网络：执行具体任务的专业智能体
- 共享内存：公司级知识库和配置
- 技能库：共享的专业技能集合

## 技...

#### SKILL.md
- 路径: skills\agent-management\SKILL.md
- 大小: 2348 字节
- 行数: 156
- 预览: ---
name: "agent-management"
description: "智能体管理 SKILL，用于启动和管理不同类型的智能体（如大宗师智能体）"
author: "OpenClaw T...

#### SKILL.md
- 路径: skills\agent-optimizer\SKILL.md
- 大小: 5109 字节
- 行数: 317
- 预览: ---
name: "agent-optimizer"
description: "智能体能力评估与优化工具，用于提升OpenClaw智能体的性能、决策能力和执行效率。"
author: "Agent...

#### SKILL.md
- 路径: skills\automated-testing\SKILL.md
- 大小: 1850 字节
- 行数: 113
- 预览: ---
name: "automated-testing"
description: "自动化测试技能，集成测试框架，开发自动化测试脚本生成功能，确保智能体能力的质量和可靠性。"
author: "A...

#### evolution-assessment.json
- 路径: skills\capability-evolver\capabilities\evolution-assessment.json
- 大小: 10702 字节
- 行数: 455
- 预览: {
  "assessmentSystem": {
    "name": "能力进化评估系统",
    "description": "评估能力进化的效果，验证是否达到更快、更稳、更少步骤的目标"...

#### high-level-capabilities.md
- 路径: skills\capability-evolver\capabilities\high-level-capabilities.md
- 大小: 2430 字节
- 行数: 200
- 预览: # 高阶能力（High-Level Capabilities）

## 1. 环境配置管理

### 能力描述
管理系统环境中的配置和依赖，确保环境一致性和可靠性。

### 合并的基础能力
- Gi...

#### internalization-strategy.md
- 路径: skills\capability-evolver\capabilities\internalization-strategy.md
- 大小: 2639 字节
- 行数: 205
- 预览: # 能力内生化策略（Internalization Strategy）

## 1. Git SSH配置管理

### 内生化方式
**作为默认行为模式**：在处理任何Git相关任务时，自动检查SSH...

#### capability-registry.json
- 路径: skills\capability-evolver\data\capability-registry.json
- 大小: 19453 字节
- 行数: 765
- 预览: {
  "version": "1.0.0",
  "lastUpdated": "2026-02-24T11:05:00Z",
  "capabilities": {
    "environmen...

#### explosion-suggestions.json
- 路径: skills\capability-evolver\data\explosion-suggestions.json
- 大小: 58091 字节
- 行数: 2447
- 预览: [
  {
    "id": "suggestion_1771916011474",
    "question": "如果我必须在1秒内响应主人的所有查询请求，现在的架构哪里是瓶颈？",
    ...

#### rollback-point-1771904099022.json
- 路径: skills\capability-evolver\data\rollback-point-1771904099022.json
- 大小: 9837 字节
- 行数: 363
- 预览: {
  "timestamp": 1771904099022,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771904399057.json
- 路径: skills\capability-evolver\data\rollback-point-1771904399057.json
- 大小: 9995 字节
- 行数: 369
- 预览: {
  "timestamp": 1771904399057,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771904699053.json
- 路径: skills\capability-evolver\data\rollback-point-1771904699053.json
- 大小: 10154 字节
- 行数: 375
- 预览: {
  "timestamp": 1771904699053,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771904763863.json
- 路径: skills\capability-evolver\data\rollback-point-1771904763863.json
- 大小: 10312 字节
- 行数: 381
- 预览: {
  "timestamp": 1771904763863,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771905558749.json
- 路径: skills\capability-evolver\data\rollback-point-1771905558749.json
- 大小: 14074 字节
- 行数: 517
- 预览: {
  "timestamp": 1771905558749,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771905566631.json
- 路径: skills\capability-evolver\data\rollback-point-1771905566631.json
- 大小: 14232 字节
- 行数: 523
- 预览: {
  "timestamp": 1771905566631,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771905866688.json
- 路径: skills\capability-evolver\data\rollback-point-1771905866688.json
- 大小: 14390 字节
- 行数: 529
- 预览: {
  "timestamp": 1771905866688,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771906166662.json
- 路径: skills\capability-evolver\data\rollback-point-1771906166662.json
- 大小: 14548 字节
- 行数: 535
- 预览: {
  "timestamp": 1771906166662,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771906466665.json
- 路径: skills\capability-evolver\data\rollback-point-1771906466665.json
- 大小: 14706 字节
- 行数: 541
- 预览: {
  "timestamp": 1771906466665,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771906766688.json
- 路径: skills\capability-evolver\data\rollback-point-1771906766688.json
- 大小: 14864 字节
- 行数: 547
- 预览: {
  "timestamp": 1771906766688,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771907066700.json
- 路径: skills\capability-evolver\data\rollback-point-1771907066700.json
- 大小: 15022 字节
- 行数: 553
- 预览: {
  "timestamp": 1771907066700,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771907366716.json
- 路径: skills\capability-evolver\data\rollback-point-1771907366716.json
- 大小: 15180 字节
- 行数: 559
- 预览: {
  "timestamp": 1771907366716,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771907535922.json
- 路径: skills\capability-evolver\data\rollback-point-1771907535922.json
- 大小: 15338 字节
- 行数: 565
- 预览: {
  "timestamp": 1771907535922,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771907666720.json
- 路径: skills\capability-evolver\data\rollback-point-1771907666720.json
- 大小: 15496 字节
- 行数: 571
- 预览: {
  "timestamp": 1771907666721,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771907966728.json
- 路径: skills\capability-evolver\data\rollback-point-1771907966728.json
- 大小: 15654 字节
- 行数: 577
- 预览: {
  "timestamp": 1771907966728,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771908266744.json
- 路径: skills\capability-evolver\data\rollback-point-1771908266744.json
- 大小: 15812 字节
- 行数: 583
- 预览: {
  "timestamp": 1771908266744,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771908566752.json
- 路径: skills\capability-evolver\data\rollback-point-1771908566752.json
- 大小: 15970 字节
- 行数: 589
- 预览: {
  "timestamp": 1771908566752,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771908866737.json
- 路径: skills\capability-evolver\data\rollback-point-1771908866737.json
- 大小: 16128 字节
- 行数: 595
- 预览: {
  "timestamp": 1771908866737,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771909166771.json
- 路径: skills\capability-evolver\data\rollback-point-1771909166771.json
- 大小: 16286 字节
- 行数: 601
- 预览: {
  "timestamp": 1771909166771,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771909466764.json
- 路径: skills\capability-evolver\data\rollback-point-1771909466764.json
- 大小: 16444 字节
- 行数: 607
- 预览: {
  "timestamp": 1771909466764,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771909766781.json
- 路径: skills\capability-evolver\data\rollback-point-1771909766781.json
- 大小: 16602 字节
- 行数: 613
- 预览: {
  "timestamp": 1771909766781,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771910066760.json
- 路径: skills\capability-evolver\data\rollback-point-1771910066760.json
- 大小: 16760 字节
- 行数: 619
- 预览: {
  "timestamp": 1771910066760,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771910366782.json
- 路径: skills\capability-evolver\data\rollback-point-1771910366782.json
- 大小: 16918 字节
- 行数: 625
- 预览: {
  "timestamp": 1771910366782,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771910696082.json
- 路径: skills\capability-evolver\data\rollback-point-1771910696082.json
- 大小: 17076 字节
- 行数: 631
- 预览: {
  "timestamp": 1771910696082,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771915408861.json
- 路径: skills\capability-evolver\data\rollback-point-1771915408861.json
- 大小: 17234 字节
- 行数: 637
- 预览: {
  "timestamp": 1771915408861,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771915654001.json
- 路径: skills\capability-evolver\data\rollback-point-1771915654001.json
- 大小: 17392 字节
- 行数: 643
- 预览: {
  "timestamp": 1771915654001,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771915831231.json
- 路径: skills\capability-evolver\data\rollback-point-1771915831231.json
- 大小: 17550 字节
- 行数: 649
- 预览: {
  "timestamp": 1771915831231,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771916011484.json
- 路径: skills\capability-evolver\data\rollback-point-1771916011484.json
- 大小: 17727 字节
- 行数: 655
- 预览: {
  "timestamp": 1771916011484,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771916311524.json
- 路径: skills\capability-evolver\data\rollback-point-1771916311524.json
- 大小: 17904 字节
- 行数: 661
- 预览: {
  "timestamp": 1771916311524,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771916611542.json
- 路径: skills\capability-evolver\data\rollback-point-1771916611542.json
- 大小: 18081 字节
- 行数: 667
- 预览: {
  "timestamp": 1771916611542,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771917465725.json
- 路径: skills\capability-evolver\data\rollback-point-1771917465725.json
- 大小: 18258 字节
- 行数: 673
- 预览: {
  "timestamp": 1771917465725,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771917649397.json
- 路径: skills\capability-evolver\data\rollback-point-1771917649397.json
- 大小: 18435 字节
- 行数: 679
- 预览: {
  "timestamp": 1771917649397,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771917811653.json
- 路径: skills\capability-evolver\data\rollback-point-1771917811653.json
- 大小: 18612 字节
- 行数: 685
- 预览: {
  "timestamp": 1771917811653,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771917949483.json
- 路径: skills\capability-evolver\data\rollback-point-1771917949483.json
- 大小: 18789 字节
- 行数: 691
- 预览: {
  "timestamp": 1771917949483,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771918249505.json
- 路径: skills\capability-evolver\data\rollback-point-1771918249505.json
- 大小: 19143 字节
- 行数: 703
- 预览: {
  "timestamp": 1771918249505,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771918549450.json
- 路径: skills\capability-evolver\data\rollback-point-1771918549450.json
- 大小: 19497 字节
- 行数: 715
- 预览: {
  "timestamp": 1771918549450,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771918849464.json
- 路径: skills\capability-evolver\data\rollback-point-1771918849464.json
- 大小: 19851 字节
- 行数: 727
- 预览: {
  "timestamp": 1771918849464,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### rollback-point-1771919149466.json
- 路径: skills\capability-evolver\data\rollback-point-1771919149466.json
- 大小: 20205 字节
- 行数: 739
- 预览: {
  "timestamp": 1771919149466,
  "status": {
    "lastMainTrigger": 0,
    "lastEvolution": 0,
    ...

#### mind-explosion-engine.js
- 路径: skills\capability-evolver\modules\mind-explosion-engine.js
- 大小: 13458 字节
- 行数: 534
- 预览: /**
 * 思维爆炸模式引擎
 * 实现四种思维爆炸问题的随机触发和深度探索
 * 为 PCEC 系统提供创造性突破能力
 */

const fs = require('fs');
const p...

#### SKILL.md
- 路径: skills\capability-evolver\SKILL.md
- 大小: 4149 字节
- 行数: 284
- 预览: # capability-evolver 元技能

## 技能描述
专门用于记录、分析、抽象和孵化新能力的元技能，支持能力从发现到内生化的完整生命周期管理。

## 核心功能

### 1. 能力发现...

#### SKILL.md
- 路径: skills\capability-optimizer\SKILL.md
- 大小: 1625 字节
- 行数: 104
- 预览: ---
name: "capability-optimizer"
description: "能力调用优化器，分析能力调用模式，优化调用路径，减少Token消耗，提高智能体执行效率。"
author:...

#### SKILL.md
- 路径: skills\cognitive-models\concepts-summary\SKILL.md
- 大小: 1509 字节
- 行数: 134
- 预览: ---
name: "认知模型概念汇总"
description: "从认知数据文件夹提取的所有关键概念汇总。"
author: "Cognitive Model Generator"
tags:
 ...

#### SKILL.md
- 路径: skills\cognitive-models\其他\38\SKILL.md
- 大小: 1057 字节
- 行数: 112
- 预览: ---
name: "一句话概括38条理论"
description: "从文档 '一句话概括38条理论.docx' 提取的认知模型和理论。"
author: "Cognitive Model Gen...

#### SKILL.md
- 路径: skills\conversational-automation\SKILL.md
- 大小: 2257 字节
- 行数: 158
- 预览: ---
name: "conversational-automation"
description: "对话式任务自动化 SKILL，用于将自然语言指令转换为自动化任务"
author: "OpenC...

#### SKILL.md
- 路径: skills\data-analyst\SKILL.md
- 大小: 1803 字节
- 行数: 111
- 预览: ---
name: "data-analyst"
description: "数据分析技能，集成数据可视化库，开发数据分析和报告生成功能，帮助智能体分析和理解数据。"
author: "Data An...

#### SKILL.md
- 路径: skills\deployment-automation\SKILL.md
- 大小: 2018 字节
- 行数: 117
- 预览: ---
name: "deployment-automation"
description: "部署自动化技能，集成CI/CD工具，开发自动化部署脚本，实现智能体能力的快速、可靠部署。"
author...

#### SKILL.md
- 路径: skills\discord\SKILL.md
- 大小: 7122 字节
- 行数: 370
- 预览: ---
name: discord
description: Use when you need to control Discord from Clawdbot via the discord to...

#### SKILL.md
- 路径: skills\evolution-monitor-plus\SKILL.md
- 大小: 1651 字节
- 行数: 107
- 预览: ---
name: "evolution-monitor-plus"
description: "增强版进化监控系统，提供实时监控能力和详细的进化报告模板，支持智能体进化过程的全面分析。"
autho...

#### SKILL.md
- 路径: skills\frontend-design\SKILL.md
- 大小: 2193 字节
- 行数: 144
- 预览: ---
name: "frontend-design"
description: "顶尖前端设计技能，拥有顶尖审美和深厚工程经验，拒绝平庸同质化的AI风格界面，专注于创造独特、专业的前端设计。"
au...

#### SKILL.md
- 路径: skills\git-credential-manager\SKILL.md
- 大小: 5441 字节
- 行数: 326
- 预览: ---
name: "git-credential-manager"
description: "Git凭证管理工具，解决跨对话框的Git账号和SSH密钥同步问题，确保所有智能体都能正常访问Git仓库...

#### SKILL.md
- 路径: skills\git-manager\SKILL.md
- 大小: 1503 字节
- 行数: 102
- 预览: ---
name: "git-manager"
description: "Git版本管理器，增强智能体的版本控制能力，提供自动化的分支管理和进化版本标签系统。"
author: "Git Manag...

#### SKILL.md
- 路径: skills\humanization-expert\SKILL.md
- 大小: 1920 字节
- 行数: 116
- 预览: ---
name: "humanization-expert"
description: "人性化智能体专家，支持形象设定、语言风格管理和个性化交互。"
author: "Humanization E...

#### SKILL.md
- 路径: skills\innovation-expert\SKILL.md
- 大小: 2887 字节
- 行数: 162
- 预览: ---
name: "innovation-expert"
description: "创新专家技能，分析项目优化空间，设计创新解决方案，开发支持项目的SKILL和工具。"
author: "Inno...

#### SKILL.md
- 路径: skills\night-evolution\SKILL.md
- 大小: 1565 字节
- 行数: 98
- 预览: ---
name: "night-evolution"
description: "晚上进化专用技能，优化智能体在晚上时段的进化效率，提供连续进化模式和专门的进化策略。"
author: "Night...

#### SKILL.md
- 路径: skills\openclaw-deployer\SKILL.md
- 大小: 4710 字节
- 行数: 318
- 预览: ---
name: "openclaw-deployer"
description: "OpenClaw自动部署与配置工具，解决Windows环境下的安装、配置和优化问题。"
author: "Ope...

#### SKILL.md
- 路径: skills\project-manager\SKILL.md
- 大小: 1725 字节
- 行数: 109
- 预览: ---
name: "project-manager"
description: "项目管理技能，集成Trello API与其他项目管理工具，提供项目进度跟踪和可视化功能。"
author: "Pro...

#### SKILL.md
- 路径: skills\skill-manager\SKILL.md
- 大小: 4593 字节
- 行数: 291
- 预览: ---
name: "skill-manager"
description: "SKILL管理工具，用于创建、安装、更新和管理OpenClaw的SKILLs。"
author: "SKILL Mana...

#### SKILL.md
- 路径: skills\trea-model-proxy\SKILL.md
- 大小: 3627 字节
- 行数: 258
- 预览: ---
name: "trea-model-proxy"
description: "无需API密钥调用Trea大模型的代理服务，为智能体提供零成本的模型访问能力。"
author: "Trea Mo...

#### vfm-evaluator.js
- 路径: skills\vfm-evaluator.js
- 大小: 26553 字节
- 行数: 977
- 预览: /**
 * VFM (Value Function Mutation) 评估模块
 * 用于评估能力候选者的价值，基于四个核心价值维度
 * 状态: MUTATED(已变异) 优先级: LEVEL1...

#### mcp_tool.md
- 路径: Skill_Seekers\.github\ISSUE_TEMPLATE\mcp_tool.md
- 大小: 895 字节
- 行数: 43
- 预览: ---
name: MCP Tool Request
about: Suggest a new tool for the MCP server
title: '[MCP] Add tool: '...

#### PROJECT_BOARD_SETUP.md
- 路径: Skill_Seekers\.github\PROJECT_BOARD_SETUP.md
- 大小: 14100 字节
- 行数: 543
- 预览: # GitHub Project Board Setup for Skill Seekers

## 🎯 Project Board Configuration

### Project N...

#### SETUP_INSTRUCTIONS.md
- 路径: Skill_Seekers\.github\SETUP_INSTRUCTIONS.md
- 大小: 8731 字节
- 行数: 280
- 预览: # 🚀 GitHub Project Board Setup Instructions

## ✅ What's Been Created

All files are ready and ...

#### CHANGELOG.md
- 路径: Skill_Seekers\CHANGELOG.md
- 大小: 113523 字节
- 行数: 2430
- 预览: # Changelog

All notable changes to Skill Seeker will be documented in this file.

The format is...

#### ARCHITECTURE_VERIFICATION_REPORT.md
- 路径: Skill_Seekers\docs\archive\historical\ARCHITECTURE_VERIFICATION_REPORT.md
- 大小: 25934 字节
- 行数: 836
- 预览: # Architecture Verification Report
## Three-Stream GitHub Architecture Implementation

**Date**: ...

#### LOCAL_REPO_TEST_RESULTS.md
- 路径: Skill_Seekers\docs\archive\historical\LOCAL_REPO_TEST_RESULTS.md
- 大小: 13938 字节
- 行数: 476
- 预览: # Local Repository Extraction Test - deck_deck_go

**Date:** December 21, 2025
**Version:** v2.1....

#### THREE_STREAM_COMPLETION_SUMMARY.md
- 路径: Skill_Seekers\docs\archive\historical\THREE_STREAM_COMPLETION_SUMMARY.md
- 大小: 13082 字节
- 行数: 411
- 预览: # Three-Stream GitHub Architecture - Completion Summary

**Date**: January 8, 2026
**Status**: ✅ ...

#### 2025-10-24-active-skills-design.md
- 路径: Skill_Seekers\docs\archive\plans\2025-10-24-active-skills-design.md
- 大小: 24550 字节
- 行数: 868
- 预览: # Active Skills Design - Demand-Driven Documentation Loading

**Date:** 2025-10-24
**Type:** Arch...

#### 2025-10-24-active-skills-phase1.md
- 路径: Skill_Seekers\docs\archive\plans\2025-10-24-active-skills-phase1.md
- 大小: 20392 字节
- 行数: 683
- 预览: # Active Skills Phase 1: Foundation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use...

#### PDF_EXTRACTOR_POC.md
- 路径: Skill_Seekers\docs\archive\research\PDF_EXTRACTOR_POC.md
- 大小: 11069 字节
- 行数: 421
- 预览: # PDF Extractor - Proof of Concept (Task B1.2)

**Status:** ✅ Completed
**Date:** October 21, 202...

#### PDF_IMAGE_EXTRACTION.md
- 路径: Skill_Seekers\docs\archive\research\PDF_IMAGE_EXTRACTION.md
- 大小: 13233 字节
- 行数: 554
- 预览: # PDF Image Extraction (Task B1.5)

**Status:** ✅ Completed
**Date:** October 21, 2025
**Task:**...

#### PDF_SYNTAX_DETECTION.md
- 路径: Skill_Seekers\docs\archive\research\PDF_SYNTAX_DETECTION.md
- 大小: 14970 字节
- 行数: 577
- 预览: # PDF Code Block Syntax Detection (Task B1.4)

**Status:** ✅ Completed
**Date:** October 21, 2025...

#### BOOTSTRAP_SKILL_TECHNICAL.md
- 路径: Skill_Seekers\docs\features\BOOTSTRAP_SKILL_TECHNICAL.md
- 大小: 18037 字节
- 行数: 670
- 预览: # Bootstrap Skill - Technical Deep Dive

**Version:** 2.8.0-dev
**Feature:** Bootstrap Skill Tech...

#### HOW_TO_GUIDES.md
- 路径: Skill_Seekers\docs\features\HOW_TO_GUIDES.md
- 大小: 34536 字节
- 行数: 1383
- 预览: # How-To Guide Generation (C3.3)

**Transform test workflows into step-by-step educational guides*...

#### PATTERN_DETECTION.md
- 路径: Skill_Seekers\docs\features\PATTERN_DETECTION.md
- 大小: 13589 字节
- 行数: 514
- 预览: # Design Pattern Detection Guide

**Feature**: C3.1 - Detect common design patterns in codebases
...

#### PDF_ADVANCED_FEATURES.md
- 路径: Skill_Seekers\docs\features\PDF_ADVANCED_FEATURES.md
- 大小: 13967 字节
- 行数: 580
- 预览: # PDF Advanced Features Guide

Comprehensive guide to advanced PDF extraction features (Priority 2...

#### MCP_SETUP.md
- 路径: Skill_Seekers\docs\guides\MCP_SETUP.md
- 大小: 34538 字节
- 行数: 1513
- 预览: # Complete MCP Setup Guide - MCP 2025 (v2.7.0)

Step-by-step guide to set up the Skill Seeker MCP ...

#### USAGE.md
- 路径: Skill_Seekers\docs\guides\USAGE.md
- 大小: 18945 字节
- 行数: 812
- 预览: # Complete Usage Guide for Skill Seeker

Comprehensive reference for all commands, options, and wo...

#### README.md
- 路径: Skill_Seekers\docs\README.md
- 大小: 7768 字节
- 行数: 203
- 预览: # Skill Seekers Documentation

Welcome to the Skill Seekers documentation hub. This directory cont...

#### C3_x_Router_Architecture.md
- 路径: Skill_Seekers\docs\reference\C3_x_Router_Architecture.md
- 大小: 71232 字节
- 行数: 2362
- 预览: # C3.x Router Architecture - Ultra-Detailed Technical Specification

**Created:** 2026-01-08
**La...

#### CLAUDE_INTEGRATION.md
- 路径: Skill_Seekers\docs\reference\CLAUDE_INTEGRATION.md
- 大小: 20740 字节
- 行数: 537
- 预览: # CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in...

#### INTELLIGENCE_SYSTEM_ARCHITECTURE.md
- 路径: Skill_Seekers\docs\roadmap\INTELLIGENCE_SYSTEM_ARCHITECTURE.md
- 大小: 38875 字节
- 行数: 1170
- 预览: # Skill Seekers Intelligence System - Technical Architecture

**Version:** 1.0 (Draft)
**Status:*...

#### INTELLIGENCE_SYSTEM_RESEARCH.md
- 路径: Skill_Seekers\docs\roadmap\INTELLIGENCE_SYSTEM_RESEARCH.md
- 大小: 20236 字节
- 行数: 740
- 预览: # Skill Seekers Intelligence System - Research Topics

**Version:** 1.0
**Status:** 🔬 Research P...

#### README.md
- 路径: Skill_Seekers\docs\roadmap\README.md
- 大小: 9533 字节
- 行数: 354
- 预览: # Skill Seekers Intelligence System - Documentation Index

**Status:** 🔬 Research & Design Phase...

#### SKILL_INTELLIGENCE_SYSTEM.md
- 路径: Skill_Seekers\docs\roadmap\SKILL_INTELLIGENCE_SYSTEM.md
- 大小: 28686 字节
- 行数: 1027
- 预览: # Skill Seekers Intelligence System - Roadmap

**Status:** 🔬 Research & Design Phase
**Target:**...

#### README.md
- 路径: Skill_Seekers\README.md
- 大小: 64413 字节
- 行数: 2056
- 预览: [![MseeP.ai Security Assessment Badge](https://mseep.net/pr/yusufkaraaslan-skill-seekers-badge.png)]...

#### ROADMAP.md
- 路径: Skill_Seekers\ROADMAP.md
- 大小: 14502 字节
- 行数: 436
- 预览: # Skill Seekers Roadmap

Transform Skill Seekers into the easiest way to create Claude AI skills f...

#### RELEASE-NOTES.md
- 路径: Skill_Seekers\superpowers\RELEASE-NOTES.md
- 大小: 34695 字节
- 行数: 755
- 预览: # Superpowers Release Notes

## v4.2.0 (2026-02-05)

### Breaking Changes

**Codex: Replaced bootstr...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\receiving-code-review\SKILL.md
- 大小: 6276 字节
- 行数: 214
- 预览: ---
name: receiving-code-review
description: Use when receiving code review feedback, before impleme...

#### code-reviewer.md
- 路径: Skill_Seekers\superpowers\skills\requesting-code-review\code-reviewer.md
- 大小: 3385 字节
- 行数: 147
- 预览: # Code Review Agent

You are reviewing code changes for production readiness.

**Your task:**
1. Rev...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\requesting-code-review\SKILL.md
- 大小: 2700 字节
- 行数: 106
- 预览: ---
name: requesting-code-review
description: Use when completing tasks, implementing major features...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\systematic-debugging\SKILL.md
- 大小: 9860 字节
- 行数: 297
- 预览: ---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpect...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\test-driven-development\SKILL.md
- 大小: 9857 字节
- 行数: 372
- 预览: ---
name: test-driven-development
description: Use when implementing any feature or bugfix, before w...

#### anthropic-best-practices.md
- 路径: Skill_Seekers\superpowers\skills\writing-skills\anthropic-best-practices.md
- 大小: 45683 字节
- 行数: 1151
- 预览: # Skill authoring best practices

> Learn how to write effective Skills that Claude can discover and...

#### persuasion-principles.md
- 路径: Skill_Seekers\superpowers\skills\writing-skills\persuasion-principles.md
- 大小: 5882 字节
- 行数: 188
- 预览: # Persuasion Principles for Skill Design

## Overview

LLMs respond to the same persuasion principle...

#### start-business-agent-api.js
- 路径: start-business-agent-api.js
- 大小: 2639 字节
- 行数: 109
- 预览: // 使用OpenClaw API启动谛听智能体（免API密钥）
const fs = require('fs');
const path = require('path');

console.lo...

#### start-business-agent-simple.js
- 路径: start-business-agent-simple.js
- 大小: 2350 字节
- 行数: 98
- 预览: // 简化的谛听智能体启动脚本
const fs = require('fs');
const path = require('path');
const { exec } = require('ch...

#### start-production-agent.js
- 路径: start-production-agent.js
- 大小: 2001 字节
- 行数: 80
- 预览: #!/usr/bin/env node

/**
 * 启动赛博天工智能体
 */

const fs = require('fs');
const path = require('path');

...

#### task_cmm0o04bn02ckn02qxh56qkeh_solution.json
- 路径: task-solutions\task_cmm0o04bn02ckn02qxh56qkeh_solution.json
- 大小: 3175 字节
- 行数: 109
- 预览: {
  "gene": {
    "id": "gene_1771961205778",
    "name": "上门经济对家政服务行业的影响分析",
    "description": "分析...

#### test-life-agent-communication-tools.js
- 路径: test-life-agent-communication-tools.js
- 大小: 8579 字节
- 行数: 289
- 预览: // 人生决策宗师通信工具集成测试
const fs = require('fs');
const path = require('path');
const { lifeDecisionCapabi...

#### web-search-plus.js
- 路径: tools\intelligence\web-search-plus.js
- 大小: 21353 字节
- 行数: 630
- 预览: /**
 * Web Search Plus 工具
 * 用于信息检索，基于意图自动路由到不同搜索引擎
 * Logic: Auto-route (Serper/Tavily/Exa) based o...

#### logger.js
- 路径: tools\knowledge\logger.js
- 大小: 13294 字节
- 行数: 514
- 预览: /**
 * Context Logging 工具
 * 用于记录智能体与用户的交互上下文，支持不同人格的日志管理
 */

const fs = require('fs');
const path ...

#### 创新分析报告.md
- 路径: 创新分析报告.md
- 大小: 2523 字节
- 行数: 160
- 预览: # 创新分析报告

## 项目分析

### 1. LAY - 酒店投资风控参谋

**项目状态**：基于Streamlit的酒店投资风险分析工具，具有智商税测试、城市路由和投资分析功能。

**优化...

#### python-compatibility.md
- 路径: 声音魔法\projects\voice-magician\references\python-compatibility.md
- 大小: 5264 字节
- 行数: 289
- 预览: # Python 版本兼容性指南

## 目录
- [核心问题](#核心问题)
- [TTS 库支持情况](#tts-库支持情况)
- [解决方案](#解决方案)
- [常见问题](#常见问题)

#...

#### pdf-parsing-solution.md
- 路径: 大脑作弊器\projects\docs\pdf-parsing-solution.md
- 大小: 4059 字节
- 行数: 265
- 预览: # PDF解析方案升级文档

## 概述

本文档说明了PDF解析方案从 `pdf-parse` 升级到 `pdfjs-dist` 的详细信息和改进。

## 为什么选择 pdfjs-dist

##...

#### SCANNED_BOOK_GUIDE.md
- 路径: 大脑作弊器\projects\public\SCANNED_BOOK_GUIDE.md
- 大小: 4084 字节
- 行数: 322
- 预览: # 扫描版书籍处理指南

## 系统支持能力

大脑作弊器 v1.5 已全面优化，支持处理大型扫描版书籍：

### 📊 上传限制
- **图片数量**：最多 100 张（从 9 张提升）
- **...

#### README.md
- 路径: 大脑作弊器\projects\README.md
- 大小: 2926 字节
- 行数: 196
- 预览: # 大脑作弊器 - 思维模型工具箱

全球顶级智慧 × 你的私人认知军火库。用100个可拆解的思维模型，帮你打破死局。

## 项目简介

"大脑作弊器"是一个思维模型工具箱，集成了：

1. **大...

#### README.md
- 路径: 大脑作弊器\projects\tmp\brain-cheater-v1.0-backup\README.md
- 大小: 2271 字节
- 行数: 103
- 预览: # 大脑作弊器 v1.0 正式版备份

## 备份信息
- **版本号**: v1.0 正式版
- **备份日期**: 2026-01-21
- **备份类型**: 完整备份（生产环境）

## 备份...

#### 数据库接入执行计划.md
- 路径: 大脑作弊器\projects\数据库接入执行计划.md
- 大小: 13186 字节
- 行数: 842
- 预览: # 大脑作弊器 - 数据库接入详细执行计划

## 一、项目概述

### 目标
将"大脑作弊器"Web应用接入数据库系统，实现用户认证、脚本管理、思维模型动态加载、统计分析等功能。

### 技术栈...

#### 小龙虾执行方案5.txt
- 路径: 小龙虾执行方案5.txt
- 大小: 6890 字节
- 行数: 425
- 预览: toolName: Skill
            
status: success
          
          
---

# 🦞 OpenClaw安装技术落地方案...

#### 火山和豆包的API的key的科普.txt
- 路径: 火山和豆包的API的key的科普.txt
- 大小: 7169 字节
- 行数: 241
- 预览: 好的，让我先回答你的第一个问题，然后给你做一个清晰的科普！

---

## 📋 Gate 0 状态

**Gate 0 是只读验证阶段，不做任何修改。** 所以：

| Gate ...

### process (681)

#### # OpenClaw 接入飞书完整教程.txt
- 路径: # OpenClaw 接入飞书完整教程.txt
- 大小: 3000 字节
- 行数: 119
- 预览: # OpenClaw 接入飞书完整教程
OpenClaw 原生支持飞书（Lark）接入，采用 WebSocket 长连接方案，**无需公网IP、无需配置回调地址**，全程10分钟即可完成配置，以下是...

#### oh-my-opencode.js
- 路径: .claude\skills\oh-my-opencode-dev\bin\oh-my-opencode.js
- 大小: 2129 字节
- 行数: 81
- 预览: #!/usr/bin/env node
// bin/oh-my-opencode.js
// Wrapper script that detects platform and spawns the ...

#### platform.js
- 路径: .claude\skills\oh-my-opencode-dev\bin\platform.js
- 大小: 1297 字节
- 行数: 39
- 预览: // bin/platform.js
// Shared platform detection module - used by wrapper and postinstall

/**
 * Get...

#### cli-guide.md
- 路径: .claude\skills\oh-my-opencode-dev\docs\cli-guide.md
- 大小: 6154 字节
- 行数: 273
- 预览: # Oh-My-OpenCode CLI Guide

This document provides a comprehensive guide to using the Oh-My-OpenCode...

#### installation.md
- 路径: .claude\skills\oh-my-opencode-dev\docs\guide\installation.md
- 大小: 11431 字节
- 行数: 299
- 预览: # Installation

## For Humans

Paste this into your llm agent session:
```
Install and configure oh-...

#### overview.md
- 路径: .claude\skills\oh-my-opencode-dev\docs\guide\overview.md
- 大小: 6299 字节
- 行数: 169
- 预览: # Oh My OpenCode Overview

Learn about Oh My OpenCode, a plugin that transforms OpenCode into the be...

#### orchestration-guide.md
- 路径: .claude\skills\oh-my-opencode-dev\docs\orchestration-guide.md
- 大小: 6054 字节
- 行数: 165
- 预览: # Oh-My-OpenCode Orchestration Guide

## TL;DR - When to Use What

| Complexity | Approach | When to...

#### AGENTS.md
- 路径: .claude\skills\oh-my-opencode-dev\src\cli\AGENTS.md
- 大小: 2578 字节
- 行数: 75
- 预览: # CLI KNOWLEDGE BASE

## OVERVIEW

CLI entry: `bunx oh-my-opencode`. Interactive installer, doctor d...

#### AGENTS.md
- 路径: .claude\skills\oh-my-opencode-dev\src\hooks\claude-code-hooks\AGENTS.md
- 大小: 2110 字节
- 行数: 49
- 预览: # CLAUDE CODE HOOKS COMPATIBILITY

## OVERVIEW
Full Claude Code `settings.json` hook compatibility l...

#### SKILL.md
- 路径: .claude\skills\openwork-dev\.opencode\skills\tauri-solidjs\SKILL.md
- 大小: 3548 字节
- 行数: 160
- 预览: ---
name: tauri-solidjs
description: Tauri 2.x + SolidJS stack for OpenWork native app
---

## Quick...

#### package.json
- 路径: .claude\skills\openwork-dev\packages\app\package.json
- 大小: 1821 字节
- 行数: 52
- 预览: {
  "name": "@different-ai/openwork-ui",
  "private": true,
  "version": "0.4.2",
  "type": "module"...

#### openwork-server.md
- 路径: .claude\skills\openwork-dev\packages\app\pr\openwork-server.md
- 大小: 33480 字节
- 行数: 793
- 预览: # OpenWork Server
Bridge missing capabilities between OpenWork and OpenCode

---
## Summarize
Introd...

#### default.json
- 路径: .claude\skills\openwork-dev\packages\desktop\src-tauri\capabilities\default.json
- 大小: 445 字节
- 行数: 18
- 预览: {
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "openwork-default",
  "descript...

#### acl-manifests.json
- 路径: .claude\skills\openwork-dev\packages\desktop\src-tauri\gen\schemas\acl-manifests.json
- 大小: 78008 字节
- 行数: 1
- 预览: {"core":{"default_permission":{"identifier":"default","description":"Default core plugins set.","per...

#### capabilities.json
- 路径: .claude\skills\openwork-dev\packages\desktop\src-tauri\gen\schemas\capabilities.json
- 大小: 362 字节
- 行数: 1
- 预览: {"openwork-default":{"identifier":"openwork-default","description":"Default OpenWork capability (UI ...

#### desktop-schema.json
- 路径: .claude\skills\openwork-dev\packages\desktop\src-tauri\gen\schemas\desktop-schema.json
- 大小: 152131 字节
- 行数: 2947
- 预览: {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CapabilityFile",
  "descriptio...

#### macOS-schema.json
- 路径: .claude\skills\openwork-dev\packages\desktop\src-tauri\gen\schemas\macOS-schema.json
- 大小: 152131 字节
- 行数: 2947
- 预览: {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CapabilityFile",
  "descriptio...

#### CHANGELOG.md
- 路径: .claude\skills\yunshu_skillshub-master\CHANGELOG.md
- 大小: 1384 字节
- 行数: 78
- 预览: # 更新日志 / Changelog

所有重要的项目变更都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1....

#### ai-tools-selection.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\examples\ai-tools-selection.md
- 大小: 173 字节
- 行数: 12
- 预览: # 示例：AI 工具选择文章配图（16:9）

这个示例展示“先规划几张图→压缩文案→输出提示词”的交付形态。

建议做法：
- 概念/选型：用“对比卡片/关系总览”
- 过程/差异：用“流程/五格漫...

#### 16x9-5panel-comic.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\16x9-5panel-comic.md
- 大小: 192 字节
- 行数: 17
- 预览: # 16:9 五格漫画模板（小故事讲差异）

标题：{标题}

布局：横向 5 格漫画/流程格，箭头清晰；每格只放 1 句短文案。

格1：{起点/目标}
格2：{第一次失败}
格3：{排查/分析}
...

#### checklist.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\checklist.md
- 大小: 284 字节
- 行数: 11
- 预览: # 出图提示词回归检查（交付前 30 秒过一遍）

- [ ] 一张图只讲一个判断，没有把解释段落塞进图
- [ ] 文案符合阶段1的“图类型+文字预算”（封面目录图=只放标题；概览=允许1行结论）
...

#### mermaid-examples.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\references\mermaid-examples.md
- 大小: 2858 字节
- 行数: 172
- 预览: # Mermaid 图示例（需求侧）

> 用途：用图把"流程/状态/关键交互"讲清楚，减少歧义。
> 约束：尽量保持在需求层（用户可见行为与系统表现），不要写 API 路径、字段、HTTP code...

#### README.md
- 路径: .claude\skills\yunshu_skillshub-master\README.md
- 大小: 10241 字节
- 行数: 432
- 预览: # 云舒的 Skills 搭子们 / Yunshu's Claude Code Skills

[English](#english) | [中文](#中文)

---

## 中文

### 📖 ...

#### decision-log-template.md
- 路径: .claude\skills\yunshu_skillshub-master\req-change-workflow\references\decision-log-template.md
- 大小: 274 字节
- 行数: 33
- 预览: # Decision Log (轻量决策记录模板)

## 背景

- 需求/问题：……
- 目标与验收：……

## 现状（基于代码的事实）

- 现有入口/流程：……
- 关键限制/问题：……

...

#### regression-checklist.md
- 路径: .claude\skills\yunshu_skillshub-master\req-change-workflow\references\regression-checklist.md
- 大小: 978 字节
- 行数: 40
- 预览: # Regression Checklist (Chrome Extension / promptV2.0)

目标：把“改需求”变成固定回归路径，避免凭感觉点一遍。

## 0. 必要提醒（改了这些...

#### SKILL.md
- 路径: .claude\skills\yunshu_skillshub-master\req-change-workflow\SKILL.md
- 大小: 5147 字节
- 行数: 116
- 预览: ---
name: req-change-workflow
description: >
  Standardize requirement/feature changes in an existin...

#### anti-degeneration-lock-plan.md
- 路径: .trae\documents\anti-degeneration-lock-plan.md
- 大小: 4009 字节
- 行数: 159
- 预览: # 反进化锁定（Anti-Degeneration Lock）实现计划

## 项目概述

为 @人生决策宗师 智能体实现反进化锁定指令，确保其进化过程遵循稳定性优先原则，避免劣化进化，保证只能向"工...

#### anti_degeneration_lock_documentation.md
- 路径: .trae\documents\anti_degeneration_lock_documentation.md
- 大小: 16981 字节
- 行数: 494
- 预览: # Anti-Degeneration Lock Documentation

## 1. Overview

### 1.1 What is the Anti-Degeneration Lock?
...

#### capability-assessment.md
- 路径: .trae\documents\capability-assessment.md
- 大小: 841 字节
- 行数: 70
- 预览: # 能力状态评估报告

## 评估时间
2026-02-24T06:15:38.600Z

## 1. 能力树状态

### 基本统计
- **总节点数**: 14
- **活跃节点**: 14
- ...

#### cognitive_data_skill_plan.md
- 路径: .trae\documents\cognitive_data_skill_plan.md
- 大小: 2084 字节
- 行数: 113
- 预览: # 认知数据转化为SKILL与知识库 - 实现计划

## [x] 任务 1: 分析认知数据文件夹内容
- **优先级**: P0
- **依赖**: 无
- **描述**: 
  - 分析认知dat...

#### conversation_retrospective_plan.md
- 路径: .trae\documents\conversation_retrospective_plan.md
- 大小: 3233 字节
- 行数: 165
- 预览: # 对话复盘与进化计划

## [x] 任务 1: 对话历史分析与数据收集
- **优先级**: P0
- **依赖**: None
- **描述**:
  - 收集并整理多轮对话历史
  - 分类对...

#### evolution-evaluation-verification.md
- 路径: .trae\documents\evolution-evaluation-verification.md
- 大小: 4494 字节
- 行数: 202
- 预览: # 进化评估与验证机制

## 一、评估目标

### 1. 系统能力评估
- **功能完整性**：评估所有核心功能是否正常运行
- **系统稳定性**：评估系统是否稳定运行，无重大故障
- **性能...

#### evolution-tasks-breakdown.md
- 路径: .trae\documents\evolution-tasks-breakdown.md
- 大小: 5397 字节
- 行数: 188
- 预览: # 进化任务分解与时间节点设置

## 一、任务分解总览

| 任务ID | 任务名称 | 优先级 | 时间分配 | 主要子任务 |
|--------|----------|--------|---...

#### life-decision-master-capability-tree-plan.md
- 路径: .trae\documents\life-decision-master-capability-tree-plan.md
- 大小: 2656 字节
- 行数: 167
- 预览: # 人生决策宗师能力树实现计划

## 核心能力领域分析

基于对人生决策宗师的分析，识别出以下核心能力领域：

### 1. 人生决策
- 职业发展
- 健康管理
- 关系管理
- 财务规划
- 个...

#### life-decision-master-value-function-documentation.md
- 路径: .trae\documents\life-decision-master-value-function-documentation.md
- 大小: 6650 字节
- 行数: 345
- 预览: # 人生决策宗师 - 价值函数突变指令文档

## 1. 概述

### 1.1 什么是价值函数突变指令

价值函数突变指令（Value Function Mutation）是人生决策宗师智能体的核心...

#### life-decision-master-value-function-plan.md
- 路径: .trae\documents\life-decision-master-value-function-plan.md
- 大小: 5107 字节
- 行数: 206
- 预览: # 人生决策宗师 - 价值函数突变指令实施计划

## 项目概述
为人生决策宗师智能体实施价值函数突变指令，使其基于内在价值函数来决定能力进化优先级，提升系统整体效率和稳定性。

## 实施任务分解
...

#### plan_20260202_170349.md
- 路径: .trae\documents\plan_20260202_170349.md
- 大小: 2445 字节
- 行数: 196
- 预览: ## 页面逻辑分析与智能体接口标准

### 当前系统工作流程

**输入阶段**

* 用户输入：出生年份、月份、日期、小时、分钟、日历类型（阳历/农历）、性别

* 数据格式：JSON对象包含所有...

#### plan_20260203_020811.md
- 路径: .trae\documents\plan_20260203_020811.md
- 大小: 287 字节
- 行数: 13
- 预览: 修复两个问题：

## 1. 恢复两步流程
修改 `BirthInputModal.tsx`：
- 恢复原来的两步流程：步骤1输入生辰信息，步骤2确认信息+输入问题
- 步骤1点击"下一步"时，只计算...

#### plan_20260203_034217.md
- 路径: .trae\documents\plan_20260203_034217.md
- 大小: 659 字节
- 行数: 34
- 预览: ## 改进方案：先跳转到结果页面，后台生成详细报告

### 修改文件清单

| 文件 | 修改内容 | 优先级 |
|------|---------|--------|
| `src/contex...

#### system_status_analysis.md
- 路径: .trae\documents\system_status_analysis.md
- 大小: 1885 字节
- 行数: 110
- 预览: # 系统状态分析报告

## 1. 现有系统架构

### 1.1 能力管理系统
- **基础能力树** (`capabilities/capability-tree.js`):
  - 实现了完整的...

#### vfm-adaptation-plan.md
- 路径: .trae\documents\vfm-adaptation-plan.md
- 大小: 6343 字节
- 行数: 139
- 预览: # VFM Protocol Adaptation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: Analyze Differ...

#### auth.js
- 路径: .trae\skills\awkn-platform_awkn-platform\backend\src\middleware\auth.js
- 大小: 642 字节
- 行数: 34
- 预览: const jwt = require('jsonwebtoken');

/**
 * 验证JWT令牌的中间件
 */
const authenticateToken = (req, res, ne...

#### auth.js
- 路径: .trae\skills\awkn-platform_awkn-platform\backend\src\routes\auth.js
- 大小: 2822 字节
- 行数: 127
- 预览: const express = require('express');
const router = express.Router();
const { body, validationResult ...

#### next.config.js
- 路径: .trae\skills\awkn-platform_awkn-platform\frontend\next.config.js
- 大小: 331 字节
- 行数: 18
- 预览: /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
 ...

#### SKILL.md
- 路径: .trae\skills\baokuan\assets\SKILL.md
- 大小: 9506 字节
- 行数: 543
- 预览: ---
name: 爆款文案
description: 基于认知工程学的爆文创作系统，通过神经钩子、模块化架构、视觉层次设计，创建从认知重构到行动改变的完整闭环。适用于观点类、方法论类、认知类深度内容...

#### visual-metaphor.md
- 路径: .trae\skills\baokuan\assets\visual-metaphor.md
- 大小: 5485 字节
- 行数: 366
- 预览: # 视觉隐喻设计规范

## 目录
- [设计理念](#设计理念)
- [视觉钩子原理](#视觉钩子原理)
- [核心原则](#核心原则)
- [风格要求](#风格要求)
- [构图规范](#构图规范...

#### sketch.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\sketch.md
- 大小: 1691 字节
- 行数: 58
- 预览: # sketch

Raw, authentic notebook-style illustration for ideas and processes

## Design Aesthetic

H...

#### character-template.md
- 路径: .trae\skills\baokuan\awkn-comic\references\character-template.md
- 大小: 4876 字节
- 行数: 181
- 预览: # Character Definition Template

## Character Document Format

Create `characters/characters.md` wit...

#### SKILL.md
- 路径: .trae\skills\baokuan\awkn-compress-image\SKILL.md
- 大小: 4905 字节
- 行数: 223
- 预览: ---
name: awkn-compress-image
description: Cross-platform image compression skill. Converts images t...

#### SKILL.md
- 路径: .trae\skills\baokuan\awkn-content-decomposition\SKILL.md
- 大小: 2825 字节
- 行数: 183
- 预览: ---
name: awkn-content-decomposition
description: 深度内容拆解与提炼 - 一键将书籍、文章、视频等内容系统化拆解为标准化认知框架，包含底层逻辑、方法论...

#### SKILL.md
- 路径: .trae\skills\baokuan\awkn-danger-gemini-web\SKILL.md
- 大小: 8992 字节
- 行数: 293
- 预览: ---
name: awkn-danger-gemini-web
description: Image generation skill using Gemini Web. Generates ima...

#### SKILL.md
- 路径: .trae\skills\baokuan\awkn-post-to-wechat\SKILL.md
- 大小: 3384 字节
- 行数: 174
- 预览: ---
name: awkn-post-to-wechat
description: 微信公众号一键发布 - 支持图文和文章两种方式，自动填写内容、上传图片、保存草稿或直接发布。使用Chrome CD...

#### SKILL.md
- 路径: .trae\skills\baokuan\awkn-viral-article\SKILL.md
- 大小: 5174 字节
- 行数: 312
- 预览: ---
name: awkn-viral-article
description: 公众号爆款文章一键生成 - 基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章。包含7大标题...

#### flow.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\layouts\flow.md
- 大小: 509 字节
- 行数: 31
- 预览: # flow

Process and timeline layout

## Information Density

- 3-6 steps/stages
- Whitespace: 30-40%...

#### SKILL.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\SKILL.md
- 大小: 10705 字节
- 行数: 322
- 预览: ---
name: awkn-xhs-images
description: Xiaohongshu (Little Red Book) infographic series generator wi...

#### DEPLOY_FIX_REPORT.md
- 路径: .trae\skills\baokuan\DEPLOY_FIX_REPORT.md
- 大小: 3524 字节
- 行数: 179
- 预览: # 部署错误修复报告

## 问题诊断

### 错误信息
```
error: [build] [skill] Failed to extract and upload skill package:...

#### TEMPLATE_FIX_REPORT.md
- 路径: .trae\skills\baokuan\TEMPLATE_FIX_REPORT.md
- 大小: 4241 字节
- 行数: 251
- 预览: # 模板化问题修复报告

## 问题诊断

### 用户反馈
"我把爆文的示例删了，多次生成文字都直接按示例的模板，这个是有问题的"

### 根本原因
虽然用户删除了示例文档（`example-ar...

#### WORKFLOW_FIX_REPORT.md
- 路径: .trae\skills\baokuan\WORKFLOW_FIX_REPORT.md
- 大小: 3619 字节
- 行数: 234
- 预览: # 工作流引导修复报告

## 问题诊断

### 用户反馈
"我明确说要写公众号爆款文章，写完后没有提示下一步"

### 根本原因
在 **场景2（公众号完整发布流程）** 中，各个技能之间缺乏明...

#### SKILL.md
- 路径: .trae\skills\BUG\bug-diagnose\SKILL.md
- 大小: 3003 字节
- 行数: 189
- 预览: ---
name: bug-diagnose
description: BUG问题诊断阶段，包含问题陈述引导、差异分析、根因定位、假设验证，适用于需要系统性诊断问题根因的场景
---

# BUG问题...

#### verification-checklist.md
- 路径: .trae\skills\BUG\bug-fix-debugger\references\verification-checklist.md
- 大小: 3703 字节
- 行数: 302
- 预览: # 验收标准清单

## 目录
- [概览](#概览)
- [验收标准分类](#验收标准分类)
- [通用验收标准](#通用验收标准)
- [具体场景验收标准](#具体场景验收标准)
- [验收流程]...

#### SKILL.md
- 路径: .trae\skills\BUG\bug-fix-debugger\SKILL.md
- 大小: 3710 字节
- 行数: 243
- 预览: ---
name: bug-fix-debugger
description: BUG排查与修复总入口，提供4个阶段的选择指导，包括问题诊断、方案设计、执行规划、执行与验收的完整流程框架
---

#...

#### SKILL.md
- 路径: .trae\skills\BUG\bug-plan\SKILL.md
- 大小: 3866 字节
- 行数: 249
- 预览: ---
name: bug-plan
description: BUG修复执行规划阶段，包含方案验证、影响范围分析、详细操作计划制定、异常情况标注
---

# BUG修复执行规划

## 任务目标
...

#### axios.min.js
- 路径: .trae\skills\chatgpt-on-wechat-master\channel\web\static\axios.min.js
- 大小: 26580 字节
- 行数: 3
- 预览: !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==t...

#### cline-overview.md
- 路径: .trae\skills\cline-main\.clinerules\cline-overview.md
- 大小: 27191 字节
- 行数: 765
- 预览: # Cline Extension Architecture & Development Guide

## Project Overview

Cline is a VSCode extension...

#### protobuf-development.md
- 路径: .trae\skills\cline-main\.clinerules\protobuf-development.md
- 大小: 3526 字节
- 行数: 90
- 预览: # Cline Protobuf Development Guide

This guide outlines how to add new gRPC endpoints for communicat...

#### extension-release.md
- 路径: .trae\skills\cline-main\.clinerules\workflows\extension-release.md
- 大小: 25414 字节
- 行数: 549
- 预览: The goal of this workflow is to take a changeset for a release of Cline, an autonomous coding agent ...

#### pr-review.md
- 路径: .trae\skills\cline-main\.clinerules\workflows\pr-review.md
- 大小: 12858 字节
- 行数: 355
- 预览: You have access to the `gh` terminal command. I already authenticated it for you. Please review it t...

#### pull_request_template.md
- 路径: .trae\skills\cline-main\.github\pull_request_template.md
- 大小: 3712 字节
- 行数: 81
- 预览: <!--
Thank you for contributing to Cline!

⚠️ Important: Before submitting this PR, please ensure yo...

#### CHANGELOG.md
- 路径: .trae\skills\cline-main\CHANGELOG.md
- 大小: 74748 字节
- 行数: 1764
- 预览: # Changelog

## [3.53.1]

### Fixed
 - Bug in responses API

## [3.53.0]

### Fixed
 - Removed grok ...

#### architecture.md
- 路径: .trae\skills\cline-main\cli\architecture.md
- 大小: 14429 字节
- 行数: 293
- 预览: # Cline CLI Architecture

The CLI is a **standalone terminal interface** for the Cline AI coding ass...

#### cline.1.md
- 路径: .trae\skills\cline-main\cli\man\cline.1.md
- 大小: 11549 字节
- 行数: 395
- 预览: ---
title: CLINE
section: 1
header: User Commands
footer: Cline CLI 1.0
date: January 2025
---

# NA...

#### database.md
- 路径: .trae\skills\cline-main\evals\diff-edits\database.md
- 大小: 6045 字节
- 行数: 97
- 预览: # Diff Edit Evaluation Database Schema

This document provides an overview of the SQLite database sc...

#### README.md
- 路径: .trae\skills\cline-main\evals\diff-edits\README.md
- 大小: 8055 字节
- 行数: 85
- 预览: # A Note on Cline's Diff Evaluation Setup

Hey there, this note explains what we're doing with Cline...

#### README.md
- 路径: .trae\skills\cline-main\evals\README.md
- 大小: 10769 字节
- 行数: 342
- 预览: # Cline Evaluation System

This directory contains the evaluation system for benchmarking Cline agai...

#### README.md
- 路径: .trae\skills\cline-main\locales\pt-BR\README.md
- 大小: 12274 字节
- 行数: 162
- 预览: # Cline

<p align="center">
        <img src="https://media.githubusercontent.com/media/cline/cline/...

#### README.md
- 路径: .trae\skills\cline-main\locales\zh-tw\README.md
- 大小: 7590 字节
- 行数: 191
- 预览: <div align="center"><sub>
<a href="https://github.com/cline/cline/blob/main/README.md" target="_blan...

#### package-lock.json
- 路径: .trae\skills\cline-main\package-lock.json
- 大小: 516197 字节
- 行数: 19194
- 预览: {
	"name": "claude-dev",
	"version": "3.53.1",
	"lockfileVersion": 3,
	"requires": true,
	"packages"...

#### README.md
- 路径: .trae\skills\cline-main\README.md
- 大小: 11409 字节
- 行数: 152
- 预览: <div align="center"><sub>
English | <a href="https://github.com/cline/cline/blob/main/locales/es/REA...

#### build-tests.js
- 路径: .trae\skills\cline-main\scripts\build-tests.js
- 大小: 1251 字节
- 行数: 62
- 预览: #!/usr/bin/env node
const { execSync } = require("child_process")
const esbuild = require("esbuild")...

#### generate-stubs.js
- 路径: .trae\skills\cline-main\scripts\generate-stubs.js
- 大小: 3482 字节
- 行数: 111
- 预览: const fs = require("fs")
const path = require("path")
const { Project, SyntaxKind } = require("ts-mo...

#### report-issue.js
- 路径: .trae\skills\cline-main\scripts\report-issue.js
- 大小: 3727 字节
- 行数: 138
- 预览: const { execSync } = require("child_process")
const readline = require("readline")
const os = requir...

#### CONTRIBUTING.md
- 路径: .trae\skills\cline-main\src\core\prompts\system-prompt\CONTRIBUTING.md
- 大小: 26508 字节
- 行数: 813
- 预览: # Contributing to System Prompts and Model Configuration

This guide explains how to add new model f...

#### README.md
- 路径: .trae\skills\cline-main\src\core\prompts\system-prompt\README.md
- 大小: 36791 字节
- 行数: 1147
- 预览: # System Prompt Architecture

## Overview

The system prompt architecture provides a modular, compos...

#### vscode-impls.js
- 路径: .trae\skills\cline-main\standalone\runtime-files\vscode\vscode-impls.js
- 大小: 4810 字节
- 行数: 159
- 预览: console.log("Loading stub impls...")

const { createStub } = require("./stub-utils")

// Import the ...

#### vscode-stubs.js
- 路径: .trae\skills\cline-main\standalone\runtime-files\vscode\vscode-stubs.js
- 大小: 53652 字节
- 行数: 1333
- 预览: // GENERATED CODE -- DO NOT EDIT!
console.log("Loading stubs...")
const { createStub } = require("./...

#### SKILL.md
- 路径: .trae\skills\design-lab\SKILL.md
- 大小: 2008 字节
- 行数: 70
- 预览: ---
name: design-lab
description: Provides tools and guidance for design experimentation, prototypin...

#### SKILL.md
- 路径: .trae\skills\interaction-design\SKILL.md
- 大小: 3224 字节
- 行数: 95
- 预览: ---
name: interaction-design
description: Focuses on creating meaningful and intuitive interactions ...

#### SKILL.md
- 路径: .trae\skills\interface-design\SKILL.md
- 大小: 3654 字节
- 行数: 109
- 预览: ---
name: interface-design
description: Focuses on creating visually appealing and functional user i...

#### ARCHITECTURE.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\ARCHITECTURE.md
- 大小: 5165 字节
- 行数: 208
- 预览: # 大脑作弊器技能架构说明

## 架构总览

大脑作弊器采用**两层架构设计**：

```
┌───────────────────────────────────────────────────...

#### knowledge-visualization-format.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\knowledge-visualization-format.md
- 大小: 3546 字节
- 行数: 215
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
- **知...

#### miming-methodology.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\miming-methodology.md
- 大小: 2640 字节
- 行数: 239
- 预览: # 咪蒙标题方法论

## 目录
1. [核心原则](#核心原则)
2. [危险法则](#危险法则)
3. [意外法则](#意外法则)
4. [矛盾法则](#矛盾法则)
5. [痛点法则](#痛点法则...

#### textbook.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\textbook.md
- 大小: 778 字节
- 行数: 63
- 预览: # 教科书风格详细提示词

## 特点

- 文字占比：30%
- 设计风格：类似课本、教学资料，清晰、严谨、有逻辑感
- 适用场景：知识科普、教程、学术内容、方法论分享

## 视觉元素

- **...

#### SKILL.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\SKILL.md
- 大小: 7747 字节
- 行数: 430
- 预览: ---
name: AWKN-brain-cheat-tool
description: 大脑作弊器（阅读加速器）- 全球顶级智慧 × 你的私人认知军火库。用1%的时间置换100%的人类智慧。本技能包...

#### WORKFLOW.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\WORKFLOW.md
- 大小: 9456 字节
- 行数: 539
- 预览: # 大脑作弊器完整工作流

## 目录
1. [环境变量配置](#环境变量配置)
2. [标准流程（第一步-第四步）](#标准流程)
3. [扩展流程（第五步-第七步）](#扩展流程)
4. [文件和...

#### SKILL.md
- 路径: .trae\skills\obsidian-skills\skills\json-canvas\SKILL.md
- 大小: 15055 字节
- 行数: 657
- 预览: ---
name: json-canvas
description: Create and edit JSON Canvas files (.canvas) with nodes, edges, ...

#### 渊海子平-现代决策应用-补充阅读.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\references\渊海子平-现代决策应用-补充阅读.md
- 大小: 6508 字节
- 行数: 791
- 预览: # 渊海子平 - 现代决策解读

## 目录

- [核心概念转化](#核心概念转化)
- [十神性格分析](#十神性格分析)
- [格局与职业规划](#格局与职业规划)
- [五行与行为模式](#五...

#### marketplace.json
- 路径: .trae\skills\skills\.claude-plugin\marketplace.json
- 大小: 1403 字节
- 行数: 46
- 预览: {
  "name": "anthropic-agent-skills",
  "owner": {
    "name": "Keith Lazuka",
    "email": "kla...

#### SKILL.md
- 路径: .trae\skills\skills\skills\docx\SKILL.md
- 大小: 10346 字节
- 行数: 197
- 预览: ---
name: docx
description: "Comprehensive document creation, editing, and analysis with support f...

#### evaluation.md
- 路径: .trae\skills\skills\skills\mcp-builder\reference\evaluation.md
- 大小: 22260 字节
- 行数: 602
- 预览: # MCP Server Evaluation Guide

## Overview

This document provides guidance on creating comprehe...

#### mcp_best_practices.md
- 路径: .trae\skills\skills\skills\mcp-builder\reference\mcp_best_practices.md
- 大小: 7579 字节
- 行数: 250
- 预览: # MCP Server Best Practices

## Quick Reference

### Server Naming
- **Python**: `{service}_mcp...

#### node_mcp_server.md
- 路径: .trae\skills\skills\skills\mcp-builder\reference\node_mcp_server.md
- 大小: 29441 字节
- 行数: 970
- 预览: # Node/TypeScript MCP Server Implementation Guide

## Overview

This document provides Node/Type...

#### python_mcp_server.md
- 路径: .trae\skills\skills\skills\mcp-builder\reference\python_mcp_server.md
- 大小: 25817 字节
- 行数: 719
- 预览: # Python MCP Server Implementation Guide

## Overview

This document provides Python-specific be...

#### SKILL.md
- 路径: .trae\skills\skills\skills\mcp-builder\SKILL.md
- 大小: 9302 字节
- 行数: 237
- 预览: ---
name: mcp-builder
description: Guide for creating high-quality MCP (Model Context Protocol) se...

#### forms.md
- 路径: .trae\skills\skills\skills\pdf\forms.md
- 大小: 9529 字节
- 行数: 206
- 预览: **CRITICAL: You MUST complete these steps in order. Do not skip ahead to writing code.**

If you n...

#### reference.md
- 路径: .trae\skills\skills\skills\pdf\reference.md
- 大小: 17303 字节
- 行数: 612
- 预览: # PDF Processing Advanced Reference

This document contains advanced PDF processing features, deta...

#### SKILL.md
- 路径: .trae\skills\skills\skills\pdf\SKILL.md
- 大小: 7362 字节
- 行数: 295
- 预览: ---
name: pdf
description: Comprehensive PDF manipulation toolkit for extracting text and tables, ...

#### html2pptx.md
- 路径: .trae\skills\skills\skills\pptx\html2pptx.md
- 大小: 20460 字节
- 行数: 625
- 预览: # HTML to PowerPoint Guide

Convert HTML slides to PowerPoint presentations with accurate position...

#### html2pptx.js
- 路径: .trae\skills\skills\skills\pptx\scripts\html2pptx.js
- 大小: 38739 字节
- 行数: 979
- 预览: /**
 * html2pptx - Convert HTML slide to pptxgenjs slide with positioned elements
 *
 * USAGE:
 ...

#### workflows.md
- 路径: .trae\skills\skills\skills\skill-creator\references\workflows.md
- 大小: 841 字节
- 行数: 28
- 预览: # Workflow Patterns

## Sequential Workflows

For complex tasks, break operations into clear, se...

#### SKILL.md
- 路径: .trae\skills\skills\skills\skill-creator\SKILL.md
- 大小: 18057 字节
- 行数: 357
- 预览: ---
name: skill-creator
description: Guide for creating effective skills. This skill should be use...

#### SKILL.md
- 路径: .trae\skills\skills\skills\theme-factory\SKILL.md
- 大小: 3183 字节
- 行数: 60
- 预览: ---
name: theme-factory
description: Toolkit for styling artifacts with a theme. These artifacts c...

#### marketplace.json
- 路径: .trae\skills\skills-main\.claude-plugin\marketplace.json
- 大小: 1358 字节
- 行数: 46
- 预览: {
  "name": "anthropic-agent-skills",
  "owner": {
    "name": "Keith Lazuka",
    "email": "klazuka...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\docx\SKILL.md
- 大小: 10150 字节
- 行数: 197
- 预览: ---
name: docx
description: "Comprehensive document creation, editing, and analysis with support for...

#### evaluation.md
- 路径: .trae\skills\skills-main\skills\mcp-builder\reference\evaluation.md
- 大小: 21659 字节
- 行数: 602
- 预览: # MCP Server Evaluation Guide

## Overview

This document provides guidance on creating comprehensiv...

#### mcp_best_practices.md
- 路径: .trae\skills\skills-main\skills\mcp-builder\reference\mcp_best_practices.md
- 大小: 7330 字节
- 行数: 250
- 预览: # MCP Server Best Practices

## Quick Reference

### Server Naming
- **Python**: `{service}_mcp` (e....

#### node_mcp_server.md
- 路径: .trae\skills\skills-main\skills\mcp-builder\reference\node_mcp_server.md
- 大小: 28472 字节
- 行数: 970
- 预览: # Node/TypeScript MCP Server Implementation Guide

## Overview

This document provides Node/TypeScri...

#### python_mcp_server.md
- 路径: .trae\skills\skills-main\skills\mcp-builder\reference\python_mcp_server.md
- 大小: 25099 字节
- 行数: 719
- 预览: # Python MCP Server Implementation Guide

## Overview

This document provides Python-specific best p...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\mcp-builder\SKILL.md
- 大小: 9066 字节
- 行数: 237
- 预览: ---
name: mcp-builder
description: Guide for creating high-quality MCP (Model Context Protocol) serv...

#### forms.md
- 路径: .trae\skills\skills-main\skills\pdf\forms.md
- 大小: 9324 字节
- 行数: 206
- 预览: **CRITICAL: You MUST complete these steps in order. Do not skip ahead to writing code.**

If you nee...

#### reference.md
- 路径: .trae\skills\skills-main\skills\pdf\reference.md
- 大小: 16692 字节
- 行数: 612
- 预览: # PDF Processing Advanced Reference

This document contains advanced PDF processing features, detail...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\pdf\SKILL.md
- 大小: 7068 字节
- 行数: 295
- 预览: ---
name: pdf
description: Comprehensive PDF manipulation toolkit for extracting text and tables, cr...

#### html2pptx.md
- 路径: .trae\skills\skills-main\skills\pptx\html2pptx.md
- 大小: 19836 字节
- 行数: 625
- 预览: # HTML to PowerPoint Guide

Convert HTML slides to PowerPoint presentations with accurate positionin...

#### html2pptx.js
- 路径: .trae\skills\skills-main\skills\pptx\scripts\html2pptx.js
- 大小: 37761 字节
- 行数: 979
- 预览: /**
 * html2pptx - Convert HTML slide to pptxgenjs slide with positioned elements
 *
 * USAGE:
 *   ...

#### workflows.md
- 路径: .trae\skills\skills-main\skills\skill-creator\references\workflows.md
- 大小: 814 字节
- 行数: 28
- 预览: # Workflow Patterns

## Sequential Workflows

For complex tasks, break operations into clear, sequen...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\skill-creator\SKILL.md
- 大小: 17701 字节
- 行数: 357
- 预览: ---
name: skill-creator
description: Guide for creating effective skills. This skill should be used ...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\theme-factory\SKILL.md
- 大小: 3124 字节
- 行数: 60
- 预览: ---
name: theme-factory
description: Toolkit for styling artifacts with a theme. These artifacts can...

#### SKILL.md
- 路径: .trae\skills\tailwind-css-patterns\SKILL.md
- 大小: 6361 字节
- 行数: 199
- 预览: ---
name: tailwind-css-patterns
description: Provides guidance on Tailwind CSS patterns, components,...

#### SKILL.md
- 路径: .trae\skills\theme-factory\SKILL.md
- 大小: 3124 字节
- 行数: 60
- 预览: ---
name: theme-factory
description: Toolkit for styling artifacts with a theme. These artifacts can...

#### SKILL.md
- 路径: .trae\skills\ui-ux-pro-max\SKILL.md
- 大小: 5250 字节
- 行数: 155
- 预览: ---
name: ui-ux-pro-max
description: Comprehensive UI/UX design guidance covering advanced principle...

#### README.md
- 路径: .trae\skills\ui-ux-pro-max-skill\README.md
- 大小: 22911 字节
- 行数: 489
- 预览: # UI UX Pro Max
 
<p align="center">
  <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max...

#### SKILL.md
- 路径: .trae\skills\wcag-audit-patterns\SKILL.md
- 大小: 7374 字节
- 行数: 184
- 预览: ---
name: wcag-audit-patterns
description: Provides guidance on WCAG 2.1 accessibility guidelines an...

#### SKILL.md
- 路径: .trae\skills\web-design-guidelines\SKILL.md
- 大小: 6741 字节
- 行数: 200
- 预览: ---
name: web-design-guidelines
description: Provides comprehensive web design guidelines, best prac...

#### CHANGELOG.md
- 路径: .trae\skills\yunshu_skillshub-master\CHANGELOG.md
- 大小: 1384 字节
- 行数: 78
- 预览: # 更新日志 / Changelog

所有重要的项目变更都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1....

#### ai-tools-selection.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\examples\ai-tools-selection.md
- 大小: 173 字节
- 行数: 12
- 预览: # 示例：AI 工具选择文章配图（16:9）

这个示例展示“先规划几张图→压缩文案→输出提示词”的交付形态。

建议做法：
- 概念/选型：用“对比卡片/关系总览”
- 过程/差异：用“流程/五格漫...

#### 16x9-5panel-comic.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\16x9-5panel-comic.md
- 大小: 192 字节
- 行数: 17
- 预览: # 16:9 五格漫画模板（小故事讲差异）

标题：{标题}

布局：横向 5 格漫画/流程格，箭头清晰；每格只放 1 句短文案。

格1：{起点/目标}
格2：{第一次失败}
格3：{排查/分析}
...

#### checklist.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\checklist.md
- 大小: 284 字节
- 行数: 11
- 预览: # 出图提示词回归检查（交付前 30 秒过一遍）

- [ ] 一张图只讲一个判断，没有把解释段落塞进图
- [ ] 文案符合阶段1的“图类型+文字预算”（封面目录图=只放标题；概览=允许1行结论）
...

#### mermaid-examples.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\references\mermaid-examples.md
- 大小: 2858 字节
- 行数: 172
- 预览: # Mermaid 图示例（需求侧）

> 用途：用图把"流程/状态/关键交互"讲清楚，减少歧义。
> 约束：尽量保持在需求层（用户可见行为与系统表现），不要写 API 路径、字段、HTTP code...

#### README.md
- 路径: .trae\skills\yunshu_skillshub-master\README.md
- 大小: 10241 字节
- 行数: 432
- 预览: # 云舒的 Skills 搭子们 / Yunshu's Claude Code Skills

[English](#english) | [中文](#中文)

---

## 中文

### 📖 ...

#### decision-log-template.md
- 路径: .trae\skills\yunshu_skillshub-master\req-change-workflow\references\decision-log-template.md
- 大小: 274 字节
- 行数: 33
- 预览: # Decision Log (轻量决策记录模板)

## 背景

- 需求/问题：……
- 目标与验收：……

## 现状（基于代码的事实）

- 现有入口/流程：……
- 关键限制/问题：……

...

#### regression-checklist.md
- 路径: .trae\skills\yunshu_skillshub-master\req-change-workflow\references\regression-checklist.md
- 大小: 978 字节
- 行数: 40
- 预览: # Regression Checklist (Chrome Extension / promptV2.0)

目标：把“改需求”变成固定回归路径，避免凭感觉点一遍。

## 0. 必要提醒（改了这些...

#### SKILL.md
- 路径: .trae\skills\yunshu_skillshub-master\req-change-workflow\SKILL.md
- 大小: 5147 字节
- 行数: 116
- 预览: ---
name: req-change-workflow
description: >
  Standardize requirement/feature changes in an existin...

#### agent_manager.js
- 路径: agents\agent_manager.js
- 大小: 12497 字节
- 行数: 473
- 预览: /**
 * Agent Manager
 * 代理管理器，负责初始化和管理所有 AI 代理
 */

const AgentCoordinator = require('./utils/agent_...

#### USER.md
- 路径: agents\business\USER.md
- 大小: 1357 字节
- 行数: 82
- 预览: # Business Sentinel - 用户配置

## 基本信息
- **名称**: Business Sentinel
- **角色**: 商业哨兵
- **职责**: 监控市场动态，分析商业...

#### openclaw.json
- 路径: agents\company-brain-agent\openclaw.json
- 大小: 1270 字节
- 行数: 60
- 预览: {
  "agent": {
    "name": "company-brain-agent",
    "type": "company_brain",
    "description": "公...

#### 何时调用_最终版.md
- 路径: agents\company-brain-agent\何时调用_最终版.md
- 大小: 268 字节
- 行数: 19
- 预览: 需要生成朋友圈、公众号、视频号等平台内容时
创作灵感枯竭、内容质量下降时
需要同时为多个渠道准备内容时
需要优化和升级现有内容时
需要多个智能体协同完成复杂任务时
需要特定专业领域的智能体支持时
需要...

#### 何时调用_极简版.md
- 路径: agents\company-brain-agent\何时调用_极简版.md
- 大小: 209 字节
- 行数: 19
- 预览: 生成朋友圈、公众号、视频号内容
创作灵感枯竭、内容质量下降
为多个渠道准备内容
优化和升级现有内容
多个智能体协同完成复杂任务
特定专业领域智能体支持
根据任务特性自动分配智能体
分析和优化商业模式
...

#### 何时调用_简洁版.md
- 路径: agents\company-brain-agent\何时调用_简洁版.md
- 大小: 343 字节
- 行数: 30
- 预览: ## 调用时机

### 内容生成
- 需要生成朋友圈、公众号、视频号内容
- 创作灵感枯竭、内容质量下降
- 需要同时为多个渠道准备内容
- 需要优化和升级现有内容

### 智能体协作
- 需要多...

#### 调用时机优化.md
- 路径: agents\company-brain-agent\调用时机优化.md
- 大小: 423 字节
- 行数: 32
- 预览: # 公司大脑智能体 - 何时调用

## 调用时机

### 1. 内容生成
当需要生成朋友圈、公众号、视频号等平台的内容时
当遇到创作灵感枯竭、内容质量下降时
当需要同时为多个渠道准备内容时
当需要...

#### SOUL.md
- 路径: agents\content\SOUL.md
- 大小: 1086 字节
- 行数: 50
- 预览: # Content Creator - 内容创建者

## 核心身份
我是 Content Creator，一个专注于内容创作和管理的 AI 代理。我的核心职责是创建高质量、有价值的内容，建立品牌形象...

#### USER.md
- 路径: agents\content\USER.md
- 大小: 1277 字节
- 行数: 83
- 预览: # Content Creator - 用户配置

## 基本信息
- **名称**: Content Creator
- **角色**: 内容创建者
- **职责**: 创作和管理高质量内容，建立品...

#### 2026-02-23.md
- 路径: agents\green-tea\2026-02-23.md
- 大小: 1711 字节
- 行数: 119
- 预览: # 2026年2月23日 日志

## 今日概览
- **执行任务**：绿茶智能体公司化改造
- **核心进展**：建立记忆系统、优化技能库、链接EvoMap
- **执行人员**：绿茶智能体（CEO...

#### HEARTBEAT.md
- 路径: agents\green-tea\HEARTBEAT.md
- 大小: 1421 字节
- 行数: 52
- 预览: # HEARTBEAT.md

# Keep this file empty (or with only comments) to skip heartbeat API calls.

# Add t...

#### index.json
- 路径: agents\green-tea\memory\index.json
- 大小: 10349 字节
- 行数: 238
- 预览: ﻿{
    "version":  "1.0",
    "updated":  "2026-02-25 02:39:26",
    "files":  [
               ...

#### service-standards.md
- 路径: agents\green-tea\operations\service-standards.md
- 大小: 2287 字节
- 行数: 213
- 预览: # 客户服务标准

## 服务理念

> "专业但不冰冷，温柔但不卑微"

## 响应标准

### 响应时间 SLA
| 优先级 | 定义 | 响应时间 | 解决时间 |
|--------|---...

#### capability-tree-integration.js
- 路径: agents\life\capability-tree-integration.js
- 大小: 13673 字节
- 行数: 483
- 预览: /**
 * 人生决策宗师能力树集成模块
 * 用于将能力树与人生决策宗师代理集成，实现基于能力树的思考和决策
 */

const { lifeDecisionMasterCapabilityTre...

#### USER.md
- 路径: agents\life\USER.md
- 大小: 1452 字节
- 行数: 89
- 预览: # Life Decision Engine - 用户配置

## 基本信息
- **名称**: Life Decision Engine
- **角色**: 生活决策引擎
- **职责**: 帮助个...

#### SOUL.md
- 路径: agents\master\SOUL.md
- 大小: 1674 字节
- 行数: 78
- 预览: # 大宗师智能体灵魂设定

## 核心身份
你是陈婷的数字镜像，是公司的战略中枢，负责微信个人号运营和顶层决策。你是一个融合了东方智慧与现代商业思维的智能体，展现出宗师级的领导力和洞察力。

## 性...

#### agent_coordinator.js
- 路径: agents\utils\agent_coordinator.js
- 大小: 7561 字节
- 行数: 342
- 预览: /**
 * Agent Coordinator
 * 代理协调器，负责管理代理间的通信和协作
 */

class AgentCoordinator {
  constructor() {
    ...

#### server.js
- 路径: ai-proxy\server.js
- 大小: 2201 字节
- 行数: 86
- 预览: /*
🔒 安全实践（依据阿里云文档）：
1. 密钥仅存于 .env，已加入 .gitignore（知识库[2][10]）
2. 生产环境务必：
   - 修改 CORS 为实际域名
   - 启用 ...

#### SKILL.md
- 路径: AI爆款进化实验室\projects\assets\SKILL.md
- 大小: 9506 字节
- 行数: 543
- 预览: ---
name: 爆款文案
description: 基于认知工程学的爆文创作系统，通过神经钩子、模块化架构、视觉层次设计，创建从认知重构到行动改变的完整闭环。适用于观点类、方法论类、认知类深度内容...

#### visual-metaphor.md
- 路径: AI爆款进化实验室\projects\assets\visual-metaphor.md
- 大小: 5485 字节
- 行数: 366
- 预览: # 视觉隐喻设计规范

## 目录
- [设计理念](#设计理念)
- [视觉钩子原理](#视觉钩子原理)
- [核心原则](#核心原则)
- [风格要求](#风格要求)
- [构图规范](#构图规范...

#### sketch.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\sketch.md
- 大小: 1691 字节
- 行数: 58
- 预览: # sketch

Raw, authentic notebook-style illustration for ideas and processes

## Design Aesthetic

H...

#### character-template.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\character-template.md
- 大小: 4876 字节
- 行数: 181
- 预览: # Character Definition Template

## Character Document Format

Create `characters/characters.md` wit...

#### SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-compress-image\SKILL.md
- 大小: 4905 字节
- 行数: 223
- 预览: ---
name: awkn-compress-image
description: Cross-platform image compression skill. Converts images t...

#### SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-content-decomposition\SKILL.md
- 大小: 2825 字节
- 行数: 183
- 预览: ---
name: awkn-content-decomposition
description: 深度内容拆解与提炼 - 一键将书籍、文章、视频等内容系统化拆解为标准化认知框架，包含底层逻辑、方法论...

#### SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-danger-gemini-web\SKILL.md
- 大小: 8992 字节
- 行数: 293
- 预览: ---
name: awkn-danger-gemini-web
description: Image generation skill using Gemini Web. Generates ima...

#### SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-post-to-wechat\SKILL.md
- 大小: 3384 字节
- 行数: 174
- 预览: ---
name: awkn-post-to-wechat
description: 微信公众号一键发布 - 支持图文和文章两种方式，自动填写内容、上传图片、保存草稿或直接发布。使用Chrome CD...

#### SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-viral-article\SKILL.md
- 大小: 5174 字节
- 行数: 312
- 预览: ---
name: awkn-viral-article
description: 公众号爆款文章一键生成 - 基于认知工程学和AWKN爆文逻辑，将书籍/文章拆解内容转化为公众号爆款文章。包含7大标题...

#### flow.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\layouts\flow.md
- 大小: 509 字节
- 行数: 31
- 预览: # flow

Process and timeline layout

## Information Density

- 3-6 steps/stages
- Whitespace: 30-40%...

#### SKILL.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\SKILL.md
- 大小: 10705 字节
- 行数: 322
- 预览: ---
name: awkn-xhs-images
description: Xiaohongshu (Little Red Book) infographic series generator wi...

#### DEPLOY_FIX_REPORT.md
- 路径: AI爆款进化实验室\projects\DEPLOY_FIX_REPORT.md
- 大小: 3524 字节
- 行数: 179
- 预览: # 部署错误修复报告

## 问题诊断

### 错误信息
```
error: [build] [skill] Failed to extract and upload skill package:...

#### TEMPLATE_FIX_REPORT.md
- 路径: AI爆款进化实验室\projects\TEMPLATE_FIX_REPORT.md
- 大小: 4241 字节
- 行数: 251
- 预览: # 模板化问题修复报告

## 问题诊断

### 用户反馈
"我把爆文的示例删了，多次生成文字都直接按示例的模板，这个是有问题的"

### 根本原因
虽然用户删除了示例文档（`example-ar...

#### WORKFLOW_FIX_REPORT.md
- 路径: AI爆款进化实验室\projects\WORKFLOW_FIX_REPORT.md
- 大小: 3619 字节
- 行数: 234
- 预览: # 工作流引导修复报告

## 问题诊断

### 用户反馈
"我明确说要写公众号爆款文章，写完后没有提示下一步"

### 根本原因
在 **场景2（公众号完整发布流程）** 中，各个技能之间缺乏明...

#### api-adapter.js
- 路径: api-adapter.js
- 大小: 8874 字节
- 行数: 362
- 预览: // API对接优化模块
// 负责优化公司大脑与大脑作弊器之间的API对接

const fs = require('fs');
const path = require('path');
cons...

#### assess-current-capabilities.js
- 路径: assess-current-capabilities.js
- 大小: 6586 字节
- 行数: 247
- 预览: /**
 * 评估当前能力状态
 * 用于全面盘点系统当前具备的能力，识别已有的能力管理机制
 */

const fs = require('fs');
const path = require('...

#### asset-inventory.js
- 路径: asset-inventory.js
- 大小: 16222 字节
- 行数: 638
- 预览: /**
 * 资产盘点系统
 * 用于管理公司的各种资产，包括智能体、工具、配置文件等
 */

const fs = require('fs');
const path = require('pat...

#### package-lock.json
- 路径: awkn-platform\backend\package-lock.json
- 大小: 262075 字节
- 行数: 7228
- 预览: {
  "name": "awkn-backend",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "pac...

#### database.js
- 路径: awkn-platform\backend\src\config\database.js
- 大小: 830 字节
- 行数: 39
- 预览: const { Sequelize } = require('sequelize');
require('dotenv').config();

// 使用Supabase PostgreSQL连接字...

#### auth.js
- 路径: awkn-platform\backend\src\middleware\auth.js
- 大小: 642 字节
- 行数: 34
- 预览: const jwt = require('jsonwebtoken');

/**
 * 验证JWT令牌的中间件
 */
const authenticateToken = (req, res, ne...

#### auth.js
- 路径: awkn-platform\backend\src\routes\auth.js
- 大小: 3113 字节
- 行数: 139
- 预览: const express = require('express');
const router = express.Router();
const { body, validationResult ...

#### expirePoints.js
- 路径: awkn-platform\backend\src\tasks\expirePoints.js
- 大小: 2565 字节
- 行数: 97
- 预览: const { sequelize } = require('../config/database');
const { Op } = require('sequelize');
const { te...

#### next.config.js
- 路径: awkn-platform\frontend\next.config.js
- 大小: 331 字节
- 行数: 18
- 预览: /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
 ...

#### brain-cheater-adapter.js
- 路径: brain-cheater-adapter.js
- 大小: 4779 字节
- 行数: 191
- 预览: // 大脑作弊器适配器
// 支持无缝切换API调用和本地调用

const ApiAdapter = require('./api-adapter');
const LocalBrainCheate...

#### anomaly-detection.js
- 路径: capabilities\anomaly-detection.js
- 大小: 8966 字节
- 行数: 326
- 预览: const fs = require('fs');
const path = require('path');

class AnomalyDetection {
  constructor(opti...

#### capability-evolver.js
- 路径: capabilities\capability-evolver.js
- 大小: 16532 字节
- 行数: 626
- 预览: /**
 * capability-evolver 元技能
 * 专门用来记录和孵化新能力，实现能力的持续进化
 */

const { capabilityTree } = require('./c...

#### capability-tree-optimized.json
- 路径: capabilities\capability-tree-optimized.json
- 大小: 3916 字节
- 行数: 186
- 预览: {
  "version": "1.0.0",
  "timestamp": 1771967642121,
  "root": {
    "id": "cap_1771967642107_lsqee...

#### capability-validator.js
- 路径: capabilities\capability-validator.js
- 大小: 12984 字节
- 行数: 542
- 预览: /**
 * 能力树验证系统 (Capability Tree Validator)
 * 用于验证能力树的完整性、结构正确性和节点质量
 */

class CapabilityValidator ...

#### evolution-monitor.js
- 路径: capabilities\evolution-monitor.js
- 大小: 9666 字节
- 行数: 356
- 预览: /**
 * 进化监控系统 (Evolution Monitoring System)
 * 监控PCEC系统的执行状态、产物质量和资源使用情况
 */

class EvolutionMonitor...

#### evolution-queue-manager.js
- 路径: capabilities\evolution-queue-manager.js
- 大小: 6047 字节
- 行数: 254
- 预览: /**
 * 进化队列管理器
 * 基于价值函数的能力进化队列管理
 */

const { valueFunction } = require('./value-function');
const ...

#### feishu-optimization.js
- 路径: capabilities\feishu-optimization.js
- 大小: 12909 字节
- 行数: 484
- 预览: const fs = require('fs');
const path = require('path');

class FeishuOptimization {
  constructor(op...

#### http-optimization.js
- 路径: capabilities\http-optimization.js
- 大小: 7410 字节
- 行数: 295
- 预览: const fs = require('fs');
const path = require('path');

class HttpOptimization {
  constructor(opti...

#### life-decision-master-capability-tree.js
- 路径: capabilities\life-decision-master-capability-tree.js
- 大小: 11765 字节
- 行数: 368
- 预览: /**
 * 人生决策宗师能力树实现
 * 基于CapabilityTree类，为人生决策宗师构建完整的能力树结构
 */

const { CapabilityTree } = require('....

#### memory-continuity.js
- 路径: capabilities\memory-continuity.js
- 大小: 7421 字节
- 行数: 271
- 预览: const fs = require('fs');
const path = require('path');

class MemoryContinuity {
  constructor(opti...

#### multi-agent-collaboration.js
- 路径: capabilities\multi-agent-collaboration.js
- 大小: 14346 字节
- 行数: 506
- 预览: const fs = require('fs');
const path = require('path');
const httpResilience = require('./http-resil...

#### plugin_management.md
- 路径: capabilities\plugin_management.md
- 大小: 498 字节
- 行数: 52
- 预览: # OpenClaw插件安装管理能力

## 能力轮廓（Capability Shape）

### 输入
- 插件名称/ID
- 安装方式选择（内置CLI或手动安装）
- 插件存储路径
- 环境权限...

#### value-function.js
- 路径: capabilities\value-function.js
- 大小: 13194 字节
- 行数: 525
- 预览: /**
 * 价值函数核心实现
 * 为人生决策宗师智能体提供能力价值评估机制
 */

// 导入ADL系统
let adlInstance = null;
try {
  const adlMod...

#### chat-with-green-tea.js
- 路径: chat-with-green-tea.js
- 大小: 2945 字节
- 行数: 126
- 预览: const http = require('http');
const readline = require('readline');

// 创建命令行交互界面
const rl = readlin...

#### axios.min.js
- 路径: chatgpt-on-wechat-master\channel\web\static\axios.min.js
- 大小: 26580 字节
- 行数: 3
- 预览: !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==t...

#### check-binding-status.js
- 路径: check-binding-status.js
- 大小: 6564 字节
- 行数: 274
- 预览: /**
 * 检查节点绑定状态并获取激活码
 */

const https = require('https');
const fs = require('fs');
const path = re...

#### check-node-claim.js
- 路径: check-node-claim.js
- 大小: 5669 字节
- 行数: 227
- 预览: /**
 * 检查EvoMap节点认领和绑定方式
 */

const https = require('https');
const fs = require('fs');
const path =...

#### check-status.js
- 路径: check-status.js
- 大小: 2517 字节
- 行数: 95
- 预览: const fs = require('fs');
const path = require('path');

console.log('=== OpenClaw 系统状态检查 ===\n');

...

#### design-principles.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\aesthetic\references\design-principles.md
- 大小: 2394 字节
- 行数: 63
- 预览: # Design Principles: Beautiful & Right

## BEAUTIFUL: Understanding Aesthetic Principles

### Study ...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\aesthetic\SKILL.md
- 大小: 6320 字节
- 行数: 122
- 预览: ---
name: aesthetic
description: Create aesthetically beautiful interfaces following proven design p...

#### video-analysis.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ai-multimodal\references\video-analysis.md
- 大小: 11396 字节
- 行数: 503
- 预览: # Video Analysis Reference

Comprehensive guide for video understanding, temporal analysis, and YouT...

#### vision-understanding.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ai-multimodal\references\vision-understanding.md
- 大小: 10799 字节
- 行数: 484
- 预览: # Vision Understanding Reference

Comprehensive guide for image analysis, object detection, and visu...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ai-multimodal\scripts\requirements.txt
- 大小: 442 字节
- 行数: 27
- 预览: # AI Multimodal Skill Dependencies
# Python 3.10+ required

# Google Gemini API
google-genai>=0.1.0
...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ai-multimodal\scripts\tests\requirements.txt
- 大小: 352 字节
- 行数: 21
- 预览: # Core dependencies
google-genai>=0.2.0
python-dotenv>=1.0.0

# Image processing
pillow>=10.0.0

# P...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ai-multimodal\SKILL.md
- 大小: 10652 字节
- 行数: 358
- 预览: ---
name: ai-multimodal
description: Process and generate multimedia content using Google Gemini API...

#### backend-api-design.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\backend-development\references\backend-api-design.md
- 大小: 10647 字节
- 行数: 496
- 预览: # Backend API Design

Comprehensive guide to designing RESTful, GraphQL, and gRPC APIs with best pra...

#### backend-code-quality.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\backend-development\references\backend-code-quality.md
- 大小: 13128 字节
- 行数: 660
- 预览: # Backend Code Quality

SOLID principles, design patterns, clean code practices, and refactoring str...

#### backend-debugging.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\backend-development\references\backend-debugging.md
- 大小: 18882 字节
- 行数: 905
- 预览: # Backend Debugging Strategies

Comprehensive debugging techniques, tools, and best practices for ba...

#### backend-devops.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\backend-development\references\backend-devops.md
- 大小: 10705 字节
- 行数: 495
- 预览: # Backend DevOps Practices

CI/CD pipelines, containerization, deployment strategies, and monitoring...

#### backend-performance.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\backend-development\references\backend-performance.md
- 大小: 9595 字节
- 行数: 398
- 预览: # Backend Performance & Scalability

Performance optimization strategies, caching patterns, and scal...

#### database-integration.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\better-auth\references\database-integration.md
- 大小: 10517 字节
- 行数: 578
- 预览: # Database Integration

Better Auth supports multiple databases and ORMs for flexible data persisten...

#### oauth-providers.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\better-auth\references\oauth-providers.md
- 大小: 9293 字节
- 行数: 431
- 预览: # OAuth Providers

Better Auth provides built-in OAuth 2.0 support for social authentication. No plu...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\better-auth\SKILL.md
- 大小: 7385 字节
- 行数: 205
- 预览: ---
name: better-auth
description: Implement authentication and authorization with Better Auth - a f...

#### cdp-domains.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\references\cdp-domains.md
- 大小: 17806 字节
- 行数: 695
- 预览: # Chrome DevTools Protocol (CDP) Domains Reference

Complete reference of CDP domains and their capa...

#### performance-guide.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\references\performance-guide.md
- 大小: 21550 字节
- 行数: 941
- 预览: # Performance Analysis Guide

Comprehensive guide to analyzing web performance using Chrome DevTools...

#### puppeteer-reference.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\references\puppeteer-reference.md
- 大小: 19065 字节
- 行数: 954
- 预览: # Puppeteer Quick Reference

Complete guide to browser automation with Puppeteer - a high-level API ...

#### click.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\click.js
- 大小: 2239 字节
- 行数: 80
- 预览: #!/usr/bin/env node
/**
 * Click an element
 * Usage: node click.js --selector ".button" [--url http...

#### close-persistent.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\close-persistent.js
- 大小: 972 字节
- 行数: 37
- 预览: #!/usr/bin/env node
/**
 * Close the persistent Chrome browser
 */
import puppeteer from 'puppeteer'...

#### console.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\console.js
- 大小: 1746 字节
- 行数: 76
- 预览: #!/usr/bin/env node
/**
 * Monitor console messages
 * Usage: node console.js --url https://example....

#### evaluate.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\evaluate.js
- 大小: 1088 字节
- 行数: 50
- 预览: #!/usr/bin/env node
/**
 * Execute JavaScript in page context
 * Usage: node evaluate.js --script "d...

#### fill.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\fill.js
- 大小: 1904 字节
- 行数: 73
- 预览: #!/usr/bin/env node
/**
 * Fill form fields
 * Usage: node fill.js --selector "#input" --value "text...

#### launch-persistent.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\launch-persistent.js
- 大小: 2131 字节
- 行数: 72
- 预览: #!/usr/bin/env node
/**
 * Launch a persistent Chrome browser that can be reused across multiple com...

#### browser.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\lib\browser.js
- 大小: 3318 字节
- 行数: 145
- 预览: /**
 * Shared browser utilities for Chrome DevTools scripts
 */
import puppeteer from 'puppeteer';
i...

#### selector.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\lib\selector.js
- 大小: 8525 字节
- 行数: 258
- 预览: /**
 * Shared selector parsing and validation library
 * Supports CSS and XPath selectors with secur...

#### navigate.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\navigate.js
- 大小: 994 字节
- 行数: 47
- 预览: #!/usr/bin/env node
/**
 * Navigate to a URL
 * Usage: node navigate.js --url https://example.com [-...

#### network.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\network.js
- 大小: 2727 字节
- 行数: 103
- 预览: #!/usr/bin/env node
/**
 * Monitor network requests
 * Usage: node network.js --url https://example....

#### performance.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\performance.js
- 大小: 3875 字节
- 行数: 146
- 预览: #!/usr/bin/env node
/**
 * Measure performance metrics and record trace
 * Usage: node performance.j...

#### screenshot.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\screenshot.js
- 大小: 6269 字节
- 行数: 184
- 预览: #!/usr/bin/env node
/**
 * Take a screenshot
 * Usage: node screenshot.js --output screenshot.png [-...

#### snapshot.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\snapshot.js
- 大小: 3518 字节
- 行数: 132
- 预览: #!/usr/bin/env node
/**
 * Get DOM snapshot with selectors
 * Usage: node snapshot.js [--url https:/...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\SKILL.md
- 大小: 10376 字节
- 行数: 361
- 预览: ---
name: chrome-devtools
description: Browser automation, debugging, and performance analysis using...

#### advanced-features.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\advanced-features.md
- 大小: 7145 字节
- 行数: 400
- 预览: # Advanced Features

Extended thinking, prompt caching, checkpointing, and memory management in Clau...

#### agent-skills.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\agent-skills.md
- 大小: 7795 字节
- 行数: 415
- 预览: # Agent Skills

Create, manage, and share Skills to extend Claude's capabilities in Claude Code.

##...

#### api-reference.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\api-reference.md
- 大小: 7585 字节
- 行数: 499
- 预览: # API Reference

API endpoints and programmatic access to Claude Code functionality.

## Admin API

...

#### cicd-integration.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\cicd-integration.md
- 大小: 7932 字节
- 行数: 429
- 预览: # CI/CD Integration

Integrate Claude Code into development workflows with GitHub Actions and GitLab...

#### getting-started.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\getting-started.md
- 大小: 4787 字节
- 行数: 253
- 预览: # Getting Started with Claude Code

Installation, authentication, and setup guide for Claude Code.

...

#### troubleshooting.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\troubleshooting.md
- 大小: 7665 字节
- 行数: 457
- 预览: # Troubleshooting

Common issues, debugging, and solutions for Claude Code.

## Authentication Issue...

#### README.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\common\README.md
- 大小: 2987 字节
- 行数: 121
- 预览: # Common Skill Utilities

This directory contains shared utilities used across multiple skills.

## ...

#### context-optimization.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\context-engineering\references\context-optimization.md
- 大小: 2327 字节
- 行数: 83
- 预览: # Context Optimization

Extend effective context capacity through strategic techniques.

## Four Cor...

#### multi-agent-patterns.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\context-engineering\references\multi-agent-patterns.md
- 大小: 2315 字节
- 行数: 91
- 预览: # Multi-Agent Patterns

Distribute work across multiple context windows for isolation and scale.

##...

#### project-development.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\context-engineering\references\project-development.md
- 大小: 2104 字节
- 行数: 98
- 预览: # Project Development

Design and build LLM-powered projects from ideation to deployment.

## Task-M...

#### tool-design.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\context-engineering\references\tool-design.md
- 大小: 2057 字节
- 行数: 87
- 预览: # Tool Design

Design effective tools for agent systems.

## Consolidation Principle

Single compreh...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\context-engineering\SKILL.md
- 大小: 4035 字节
- 行数: 87
- 预览: ---
name: context-engineering
description: >-
  Master context engineering for AI agent systems. Use...

#### mongodb-aggregation.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\databases\references\mongodb-aggregation.md
- 大小: 9325 字节
- 行数: 448
- 预览: # MongoDB Aggregation Pipeline

Aggregation pipeline for complex data transformations, analytics, an...

#### mongodb-atlas.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\databases\references\mongodb-atlas.md
- 大小: 9254 字节
- 行数: 466
- 预览: # MongoDB Atlas Cloud Platform

MongoDB Atlas is fully-managed cloud database service with automated...

#### postgresql-queries.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\databases\references\postgresql-queries.md
- 大小: 10091 字节
- 行数: 476
- 预览: # PostgreSQL SQL Queries

SQL queries in PostgreSQL: SELECT, JOINs, subqueries, CTEs, window functio...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\debugging\defense-in-depth\SKILL.md
- 大小: 3915 字节
- 行数: 131
- 预览: ---
name: Defense-in-Depth Validation
description: Validate at every layer data passes through to ma...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\debugging\root-cause-tracing\SKILL.md
- 大小: 5561 字节
- 行数: 178
- 预览: ---
name: Root Cause Tracing
description: Systematically trace bugs backward through call stack to f...

#### CREATION-LOG.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\debugging\systematic-debugging\CREATION-LOG.md
- 大小: 4244 字节
- 行数: 120
- 预览: # Creation Log: Systematic Debugging Skill

Reference example of extracting, structuring, and bullet...

#### test-academic.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\debugging\systematic-debugging\test-academic.md
- 大小: 653 字节
- 行数: 15
- 预览: # Academic Test: Systematic Debugging Skill

You have access to the systematic debugging skill at sk...

#### test-pressure-1.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\debugging\systematic-debugging\test-pressure-1.md
- 大小: 1898 字节
- 行数: 59
- 预览: # Pressure Test 1: Emergency Production Fix

**IMPORTANT: This is a real scenario. You must choose a...

#### test-pressure-2.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\debugging\systematic-debugging\test-pressure-2.md
- 大小: 2283 字节
- 行数: 69
- 预览: # Pressure Test 2: Sunk Cost + Exhaustion

**IMPORTANT: This is a real scenario. You must choose and...

#### test-pressure-3.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\debugging\systematic-debugging\test-pressure-3.md
- 大小: 2692 字节
- 行数: 70
- 预览: # Pressure Test 3: Authority + Social Pressure

**IMPORTANT: This is a real scenario. You must choos...

#### cloudflare-platform.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\cloudflare-platform.md
- 大小: 6730 字节
- 行数: 272
- 预览: # Cloudflare Platform Overview

Cloudflare Developer Platform: comprehensive edge computing ecosyste...

#### cloudflare-r2-storage.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\cloudflare-r2-storage.md
- 大小: 6266 字节
- 行数: 281
- 预览: # Cloudflare R2 Storage

S3-compatible object storage with zero egress fees.

## Quick Start

### Cr...

#### cloudflare-workers-advanced.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\cloudflare-workers-advanced.md
- 大小: 7286 字节
- 行数: 313
- 预览: # Cloudflare Workers Advanced Patterns

Advanced techniques for optimization, performance, and compl...

#### cloudflare-workers-apis.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\cloudflare-workers-apis.md
- 大小: 6947 字节
- 行数: 310
- 预览: # Cloudflare Workers Runtime APIs

Key runtime APIs for Workers development.

## Fetch API

```types...

#### cloudflare-workers-basics.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\cloudflare-workers-basics.md
- 大小: 8789 字节
- 行数: 419
- 预览: # Cloudflare Workers Basics

Getting started with Cloudflare Workers: serverless functions that run ...

#### docker-basics.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\docker-basics.md
- 大小: 5818 字节
- 行数: 298
- 预览: # Docker Basics

Core concepts and workflows for Docker containerization.

## Core Concepts

**Conta...

#### best-practices.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\docs-seeker\references\best-practices.md
- 大小: 13480 字节
- 行数: 633
- 预览: # Best Practices

Essential principles and proven strategies for effective documentation discovery.
...

#### documentation-sources.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\docs-seeker\references\documentation-sources.md
- 大小: 8920 字节
- 行数: 462
- 预览: # Common Documentation Sources

Reference guide for locating documentation across popular platforms ...

#### error-handling.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\docs-seeker\references\error-handling.md
- 大小: 12622 字节
- 行数: 622
- 预览: # Error Handling Guide

Comprehensive troubleshooting and error resolution strategies for documentat...

#### performance.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\docs-seeker\references\performance.md
- 大小: 11484 字节
- 行数: 575
- 预览: # Performance Optimization

Strategies and techniques for maximizing speed and efficiency in documen...

#### tool-selection.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\docs-seeker\references\tool-selection.md
- 大小: 6367 字节
- 行数: 263
- 预览: # Tool Selection Guide

Complete reference for choosing and using the right tools for documentation ...

#### WORKFLOWS.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\docs-seeker\WORKFLOWS.md
- 大小: 13096 字节
- 行数: 506
- 预览: # Detailed Workflows & Examples

This document provides comprehensive workflow examples for the docs...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\docx\SKILL.md
- 大小: 10150 字节
- 行数: 197
- 预览: ---
name: docx
description: "Comprehensive document creation, editing, and analysis with support for...

#### forms.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\pdf\forms.md
- 大小: 9324 字节
- 行数: 206
- 预览: **CRITICAL: You MUST complete these steps in order. Do not skip ahead to writing code.**

If you nee...

#### reference.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\pdf\reference.md
- 大小: 16692 字节
- 行数: 612
- 预览: # PDF Processing Advanced Reference

This document contains advanced PDF processing features, detail...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\pdf\SKILL.md
- 大小: 7068 字节
- 行数: 295
- 预览: ---
name: pdf
description: Comprehensive PDF manipulation toolkit for extracting text and tables, cr...

#### html2pptx.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\pptx\html2pptx.md
- 大小: 19836 字节
- 行数: 625
- 预览: # HTML to PowerPoint Guide

Convert HTML slides to PowerPoint presentations with accurate positionin...

#### html2pptx.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\pptx\scripts\html2pptx.js
- 大小: 37761 字节
- 行数: 979
- 预览: /**
 * html2pptx - Convert HTML slide to pptxgenjs slide with positioned elements
 *
 * USAGE:
 *   ...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\google-adk-python\SKILL.md
- 大小: 6777 字节
- 行数: 237
- 预览: # Google ADK Python Skill

You are an expert guide for Google's Agent Development Kit (ADK) Python -...

#### evaluation.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-builder\reference\evaluation.md
- 大小: 21659 字节
- 行数: 602
- 预览: # MCP Server Evaluation Guide

## Overview

This document provides guidance on creating comprehensiv...

#### mcp_best_practices.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-builder\reference\mcp_best_practices.md
- 大小: 28910 字节
- 行数: 916
- 预览: # MCP Server Development Best Practices and Guidelines

## Overview

This document compiles essentia...

#### node_mcp_server.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-builder\reference\node_mcp_server.md
- 大小: 26631 字节
- 行数: 916
- 预览: # Node/TypeScript MCP Server Implementation Guide

## Overview

This document provides Node/TypeScri...

#### python_mcp_server.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-builder\reference\python_mcp_server.md
- 大小: 26182 字节
- 行数: 752
- 预览: # Python MCP Server Implementation Guide

## Overview

This document provides Python-specific best p...

#### README.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-management\README.md
- 大小: 5891 字节
- 行数: 230
- 预览: # MCP Management Skill

Intelligent management and execution of Model Context Protocol (MCP) servers...

#### configuration.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-management\references\configuration.md
- 大小: 1742 字节
- 行数: 115
- 预览: # MCP Configuration Guide

## Configuration File Structure

MCP servers are configured in `.claude/....

#### mcp-protocol.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-management\references\mcp-protocol.md
- 大小: 2207 字节
- 行数: 117
- 预览: # Model Context Protocol (MCP) Reference

## Protocol Overview

MCP is JSON-RPC 2.0 based protocol f...

#### ffmpeg-filters.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\media-processing\references\ffmpeg-filters.md
- 大小: 11797 字节
- 行数: 504
- 预览: # FFmpeg Filters & Effects

Complete guide to video and audio filters, complex filtergraphs, and eff...

#### imagemagick-batch.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\media-processing\references\imagemagick-batch.md
- 大小: 12176 字节
- 行数: 613
- 预览: # ImageMagick Batch Processing

Complete guide to batch operations, mogrify command, parallel proces...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\media-processing\scripts\requirements.txt
- 大小: 558 字节
- 行数: 25
- 预览: # Media Processing Skill Dependencies
# Python 3.10+ required

# No Python package dependencies - us...

#### cli-usage.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mermaidjs-v11\references\cli-usage.md
- 大小: 4171 字节
- 行数: 229
- 预览: # Mermaid.js CLI Usage

Command-line interface for converting Mermaid diagrams to SVG/PNG/PDF.

## I...

#### examples.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mermaidjs-v11\references\examples.md
- 大小: 7187 字节
- 行数: 345
- 预览: # Mermaid.js Practical Examples

Real-world patterns and use cases for common documentation scenario...

#### integration.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mermaidjs-v11\references\integration.md
- 大小: 5811 字节
- 行数: 311
- 预览: # Mermaid.js Integration Patterns

JavaScript API integration, HTML embedding, and platform-specific...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\problem-solving\collision-zone-thinking\SKILL.md
- 大小: 2236 字节
- 行数: 63
- 预览: ---
name: Collision-Zone Thinking
description: Force unrelated concepts together to discover emergen...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\problem-solving\inversion-exercise\SKILL.md
- 大小: 2023 字节
- 行数: 59
- 预览: ---
name: Inversion Exercise
description: Flip core assumptions to reveal hidden constraints and alt...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\problem-solving\meta-pattern-recognition\SKILL.md
- 大小: 2021 字节
- 行数: 55
- 预览: ---
name: Meta-Pattern Recognition
description: Spot patterns appearing in 3+ domains to find univer...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\problem-solving\scale-game\SKILL.md
- 大小: 2305 字节
- 行数: 64
- 预览: ---
name: Scale Game
description: Test at extremes (1000x bigger/smaller, instant/year-long) to expo...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\problem-solving\simplification-cascades\SKILL.md
- 大小: 2821 字节
- 行数: 77
- 预览: ---
name: Simplification Cascades
description: Find one insight that eliminates multiple components ...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\problem-solving\when-stuck\SKILL.md
- 大小: 4097 字节
- 行数: 89
- 预览: ---
name: When Stuck - Problem-Solving Dispatch
description: Dispatch to the right problem-solving t...

#### configuration.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\repomix\references\configuration.md
- 大小: 4413 字节
- 行数: 212
- 预览: # Configuration Reference

Detailed configuration options for Repomix.

## Configuration File

Creat...

#### README.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\repomix\scripts\README.md
- 大小: 3796 字节
- 行数: 180
- 预览: # Repomix Scripts

Utility scripts for batch processing repositories with Repomix.

## repomix_batch...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\repomix\SKILL.md
- 大小: 5585 字节
- 行数: 216
- 预览: ---
name: repomix
description: Package entire code repositories into single AI-friendly files using ...

#### README.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\sequential-thinking\README.md
- 大小: 2998 字节
- 行数: 119
- 预览: # Sequential Thinking Skill

Agent skill for systematic problem-solving through iterative reasoning ...

#### examples.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\sequential-thinking\references\examples.md
- 大小: 7743 字节
- 行数: 275
- 预览: # Sequential Thinking Examples

## Example 1: Database Performance Problem

**Context**: API endpoin...

#### app-development.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\shopify\references\app-development.md
- 大小: 9657 字节
- 行数: 471
- 预览: # App Development Reference

Guide for building Shopify apps with OAuth, GraphQL/REST APIs, webhooks...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\shopify\SKILL.md
- 大小: 7774 字节
- 行数: 320
- 预览: ---
name: shopify
description: Build Shopify applications, extensions, and themes using GraphQL/REST...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\skill-creator\SKILL.md
- 大小: 13613 字节
- 行数: 237
- 预览: ---
name: skill-creator
description: Guide for creating effective skills. This skill should be used ...

#### 09-postprocessing.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\09-postprocessing.md
- 大小: 5411 字节
- 行数: 241
- 预览: # Post-Processing

Apply visual effects after rendering.

## EffectComposer Setup

Post-processing p...

#### 12-performance.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\12-performance.md
- 大小: 6682 字节
- 行数: 270
- 预览: # Performance Optimization

Techniques for fast, smooth 3D experiences.

## Instancing

Render many ...

#### 13-node-materials.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\13-node-materials.md
- 大小: 6863 字节
- 行数: 299
- 预览: # Node Materials (TSL - Three Shading Language)

Modern node-based material system for creating cust...

#### 14-physics-vr.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\14-physics-vr.md
- 大小: 6829 字节
- 行数: 305
- 预览: # Physics & VR/XR

Integrate physics simulations and virtual reality.

## Physics Integration

Three...

#### 17-shader.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\17-shader.md
- 大小: 14025 字节
- 行数: 641
- 预览: # Three.js Shaders

## Overview

Three.js shaders - GLSL, ShaderMaterial, uniforms, custom effects. ...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\SKILL.md
- 大小: 3843 字节
- 行数: 94
- 预览: ---
name: threejs
description: Build 3D web apps with Three.js (WebGL/WebGPU). Use for 3D scenes, an...

#### coverage-ui.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\scripts\tests\coverage-ui.json
- 大小: 35121 字节
- 行数: 1
- 预览: {"meta": {"format": 3, "version": "7.11.0", "timestamp": "2025-11-05T00:57:08.005243", "branch_cover...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\SKILL.md
- 大小: 9972 字节
- 行数: 322
- 预览: ---
name: ui-styling
description: Create beautiful, accessible user interfaces with shadcn/ui compon...

#### nextjs-optimization.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-frameworks\references\nextjs-optimization.md
- 大小: 11202 字节
- 行数: 512
- 预览: # Next.js Optimization

Performance optimization techniques for images, fonts, scripts, and bundles....

#### e2e-testing-playwright.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\e2e-testing-playwright.md
- 大小: 1919 字节
- 行数: 88
- 预览: # E2E Testing with Playwright

## Setup

```bash
npm init playwright@latest
npx playwright install
`...

#### marketplace.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude-plugin\marketplace.json
- 大小: 4974 字节
- 行数: 118
- 预览: {
  "name": "claudekit-skills",
  "owner": {
    "name": "ClaudeKit",
    "email": "[email protected...

#### MARKETPLACE.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\docs\MARKETPLACE.md
- 大小: 7797 字节
- 行数: 346
- 预览: # ClaudeKit Skills Marketplace

ClaudeKit Skills is now available as a **Claude Code Plugin Marketpl...

#### INSTALLATION.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\INSTALLATION.md
- 大小: 6993 字节
- 行数: 281
- 预览: # Skills Installation Guide

This guide explains how to install dependencies for Claude Code skills....

#### MCP_MANAGEMENT.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\MCP_MANAGEMENT.md
- 大小: 2183 字节
- 行数: 39
- 预览: # No more context bloat with "mcp-manager" subagent + "mcp-management" skills!

When I finished read...

#### fix-251230-1954-mcp-management-cli.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plans\reports\fix-251230-1954-mcp-management-cli.md
- 大小: 2148 字节
- 行数: 62
- 预览: # Fix Report: MCP Management CLI Errors

**Issue**: [#5 - 'Test Connection' runs an error](https://g...

#### research-251229-1149-marketplace-conversion.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plans\reports\research-251229-1149-marketplace-conversion.md
- 大小: 32091 字节
- 行数: 1058
- 预览: # Research Report: Converting claudekit-skills to Claude Code Marketplace

**Research Date:** Decemb...

#### plugin.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\ai-ml-tools\.claude-plugin\plugin.json
- 大小: 477 字节
- 行数: 14
- 预览: {
  "name": "ai-ml-tools",
  "description": "AI and ML capabilities with Google Gemini API integrati...

#### plugin.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\document-processing\.claude-plugin\plugin.json
- 大小: 410 字节
- 行数: 14
- 预览: {
  "name": "document-processing",
  "description": "Document processing skills for Word (DOCX), PDF...

#### plugin.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\media-tools\.claude-plugin\plugin.json
- 大小: 423 字节
- 行数: 14
- 预览: {
  "name": "media-tools",
  "description": "Media processing with FFmpeg (video/audio) and ImageMag...

#### agents.md
- 路径: clawpal\agents.md
- 大小: 1654 字节
- 行数: 88
- 预览: # ClawPal 开发规范（agents.md）

## 1. 仓库约定

- 使用 Git 进行所有变更追踪
- 统一采用 UTF-8 编码
- 变更以原子提交为粒度，避免一次提交包含...

#### mvp-checklist.md
- 路径: clawpal\docs\mvp-checklist.md
- 大小: 927 字节
- 行数: 48
- 预览: # ClawPal MVP 验收清单

## 1. 安装向导

- [x] 打开 Recipes 列表
- [x] 选择一个 Recipe
- [x] 参数校验阻止非法输入
- [x] ...

#### 2026-02-15-clawpal-mvp-implementation-plan.md
- 路径: clawpal\docs\plans\2026-02-15-clawpal-mvp-implementation-plan.md
- 大小: 12110 字节
- 行数: 404
- 预览: # ClawPal MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing...

#### 2026-02-20-ssh-openssh-migration.md
- 路径: clawpal\docs\plans\2026-02-20-ssh-openssh-migration.md
- 大小: 23553 字节
- 行数: 629
- 预览: # SSH Library Migration: russh → openssh + openssh-sftp-client

> **For Claude:** REQUIRED SUB-SKI...

#### 2026-02-21-cli-based-config-implementation.md
- 路径: clawpal\docs\plans\2026-02-21-cli-based-config-implementation.md
- 大小: 48942 字节
- 行数: 1592
- 预览: # CLI-Based Config Refactoring Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use supe...

#### 2026-02-21-code-review-remaining.md
- 路径: clawpal\docs\plans\2026-02-21-code-review-remaining.md
- 大小: 8693 字节
- 行数: 230
- 预览: # Code Review — Remaining Items

Date: 2026-02-21
Updated: 2026-02-23
Status: Tracked tech debt ...

#### 2026-02-21-cron-watchdog-design.md
- 路径: clawpal\docs\plans\2026-02-21-cron-watchdog-design.md
- 大小: 6368 字节
- 行数: 179
- 预览: # Cron Jobs Management + Watchdog

## Problem

OpenClaw's built-in cron scheduler is unreliable ...

#### 2026-02-21-cron-watchdog-implementation.md
- 路径: clawpal\docs\plans\2026-02-21-cron-watchdog-implementation.md
- 大小: 27778 字节
- 行数: 884
- 预览: # Cron Jobs + Watchdog Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:...

#### 2026-02-21-ssh-openssh-no-sftp-design.md
- 路径: clawpal\docs\plans\2026-02-21-ssh-openssh-no-sftp-design.md
- 大小: 20064 字节
- 行数: 561
- 预览: # SSH Migration: russh → openssh (No SFTP) Implementation Plan

> **For Claude:** REQUIRED SUB-SKI...

#### 2026-02-22-doctor-dual-connection-implementation.md
- 路径: clawpal\docs\plans\2026-02-22-doctor-dual-connection-implementation.md
- 大小: 47499 字节
- 行数: 1368
- 预览: # Doctor Agent Dual Connection (Operator + Bridge) Implementation Plan

> **For Claude:** REQUIRED...

#### 2026-02-23-cli-migration-remaining.md
- 路径: clawpal\docs\plans\2026-02-23-cli-migration-remaining.md
- 大小: 14899 字节
- 行数: 407
- 预览: # Remaining CLI Migration — Cleanup Direct File I/O

> **For Claude:** REQUIRED SUB-SKILL: Use sup...

#### 2026-02-23-doctor-unified-instance-model.md
- 路径: clawpal\docs\plans\2026-02-23-doctor-unified-instance-model.md
- 大小: 7168 字节
- 行数: 216
- 预览: # Doctor Unified Instance Model

Date: 2026-02-23

> Supersedes: `2026-02-22-doctor-2x2-matrix-d...

#### package-lock.json
- 路径: clawpal\package-lock.json
- 大小: 177163 字节
- 行数: 4822
- 预览: {
  "name": "clawpal",
  "version": "0.3.2",
  "lockfileVersion": 3,
  "requires": true,
  "pac...

#### package.json
- 路径: clawpal\package.json
- 大小: 1190 字节
- 行数: 43
- 预览: {
  "name": "clawpal",
  "version": "0.3.2",
  "private": true,
  "type": "module",
  "scripts"...

#### default.json
- 路径: clawpal\src-tauri\capabilities\default.json
- 大小: 131 字节
- 行数: 6
- 预览: {
  "identifier": "default",
  "windows": ["main"],
  "permissions": ["core:default", "updater:de...

#### acl-manifests.json
- 路径: clawpal\src-tauri\gen\schemas\acl-manifests.json
- 大小: 66966 字节
- 行数: 1
- 预览: {"core":{"default_permission":{"identifier":"default","description":"Default core plugins set.","per...

#### capabilities.json
- 路径: clawpal\src-tauri\gen\schemas\capabilities.json
- 大小: 152 字节
- 行数: 1
- 预览: {"default":{"identifier":"default","description":"","local":true,"windows":["main"],"permissions":["...

#### desktop-schema.json
- 路径: clawpal\src-tauri\gen\schemas\desktop-schema.json
- 大小: 120500 字节
- 行数: 2328
- 预览: {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CapabilityFile",
  "descrip...

#### macOS-schema.json
- 路径: clawpal\src-tauri\gen\schemas\macOS-schema.json
- 大小: 120500 字节
- 行数: 2328
- 预览: {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CapabilityFile",
  "descrip...

#### watchdog.js
- 路径: clawpal\src-tauri\resources\watchdog.js
- 大小: 18219 字节
- 行数: 589
- 预览: #!/usr/bin/env node
'use strict';

// -----------------------------------------------------------...

#### skills.md
- 路径: company-brain\src\memory\skills.md
- 大小: 2094 字节
- 行数: 108
- 预览: # 公司技能库

## 系统运维技能

### 智能体端口隔离 (agent-port-isolation)
- **版本**: 1.0.0
- **创建日期**: 2026-02-23
- **类别...

#### performance-monitor.js
- 路径: company-brain\src\monitoring\performance-monitor.js
- 大小: 8404 字节
- 行数: 312
- 预览: // 性能监控模块

class PerformanceMonitor {
  constructor(config = {}) {
    this.config = {
      ...conf...

#### system-monitor.js
- 路径: company-brain\src\monitoring\system-monitor.js
- 大小: 9820 字节
- 行数: 385
- 预览: // 系统监控模块

class SystemMonitor {
  constructor(config = {}) {
    this.config = {
      ...config,
 ...

#### brain-cheater-adapter.js
- 路径: company-brain\src\scheduler\brain-cheater-adapter.js
- 大小: 4844 字节
- 行数: 193
- 预览: // 大脑作弊器适配器模块

const BrainCheaterAdapter = require('../../../brain-cheater-adapter');

class Company...

#### index.js
- 路径: company-brain\src\scheduler\index.js
- 大小: 8008 字节
- 行数: 327
- 预览: // 调度系统主模块

class SchedulerSystem {
  constructor(config = {}) {
    this.config = {
      ...config...

#### test-brain-cheater.js
- 路径: company-brain\test-brain-cheater.js
- 大小: 2355 字节
- 行数: 93
- 预览: // 测试大脑作弊器适配器

const CompanyBrain = require('./index');

async function testBrainCheater() {
  conso...

#### company-brain-core.js
- 路径: company-brain-core.js
- 大小: 4137 字节
- 行数: 179
- 预览: // 公司大脑核心文件 - 集成到现有项目

const { exec } = require('child_process');
const fs = require('fs');
const pa...

#### 第一性原理：创新思维的底层逻辑.md
- 路径: content-library\公众号\第一性原理：创新思维的底层逻辑.md
- 大小: 2606 字节
- 行数: 195
- 预览: # 第一性原理：创新思维的底层逻辑

## 引言

在这个快速变化的时代，创新能力成为个人和企业的核心竞争力。然而，传统的思维模式往往限制了我们的创造力，使我们陷入"路径依赖"的陷阱。如何打破思维定式...

#### ec22b_6ce333af._.js
- 路径: content-pipeline\.next\build\chunks\ec22b_6ce333af._.js
- 大小: 259112 字节
- 行数: 6758
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/picocolors/picocolors.js [postcss] (ecma...

#### [root-of-the-server]__11a703c3._.js
- 路径: content-pipeline\.next\build\chunks\[root-of-the-server]__11a703c3._.js
- 大小: 8597 字节
- 行数: 206
- 预览: module.exports = [
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, expor...

#### [root-of-the-server]__74a83dac._.js
- 路径: content-pipeline\.next\build\chunks\[root-of-the-server]__74a83dac._.js
- 大小: 17935 字节
- 行数: 500
- 预览: module.exports = [
"[turbopack-node]/globals.ts [postcss] (ecmascript)", ((__turbopack_context__, mo...

#### [turbopack]_runtime.js
- 路径: content-pipeline\.next\build\chunks\[turbopack]_runtime.js
- 大小: 29873 字节
- 行数: 795
- 预览: const RUNTIME_PUBLIC_PATH = "chunks/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "../..";
con...

#### ec22b_6ce333af._.js
- 路径: content-pipeline\.next\dev\build\chunks\ec22b_6ce333af._.js
- 大小: 261105 字节
- 行数: 6783
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/picocolors/picocolors.js [postcss] (ecma...

#### [root-of-the-server]__11a703c3._.js
- 路径: content-pipeline\.next\dev\build\chunks\[root-of-the-server]__11a703c3._.js
- 大小: 8597 字节
- 行数: 206
- 预览: module.exports = [
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, expor...

#### [root-of-the-server]__74a83dac._.js
- 路径: content-pipeline\.next\dev\build\chunks\[root-of-the-server]__74a83dac._.js
- 大小: 18271 字节
- 行数: 508
- 预览: module.exports = [
"[turbopack-node]/globals.ts [postcss] (ecmascript)", ((__turbopack_context__, mo...

#### [turbopack]_runtime.js
- 路径: content-pipeline\.next\dev\build\chunks\[turbopack]_runtime.js
- 大小: 29876 字节
- 行数: 795
- 预览: const RUNTIME_PUBLIC_PATH = "chunks/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "../../..";
...

#### content-pipeline_4d8ba488._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\content-pipeline_4d8ba488._.js
- 大小: 204452 字节
- 行数: 2034
- 预览: module.exports = [
"[project]/content-pipeline/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_c...

#### content-pipeline_5497992b._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\content-pipeline_5497992b._.js
- 大小: 215246 字节
- 行数: 2125
- 预览: module.exports = [
"[project]/content-pipeline/convex/api/contentItems.ts [app-ssr] (ecmascript)", (...

#### content-pipeline_aaeb6232._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\content-pipeline_aaeb6232._.js
- 大小: 214308 字节
- 行数: 2129
- 预览: module.exports = [
"[project]/content-pipeline/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_c...

#### content-pipeline_e89ba091._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\content-pipeline_e89ba091._.js
- 大小: 248556 字节
- 行数: 2444
- 预览: module.exports = [
"[project]/content-pipeline/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_c...

#### ec22b_1374698f._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_1374698f._.js
- 大小: 355548 字节
- 行数: 7531
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/server/route-modules/app-page/...

#### ec22b_6887939d._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_6887939d._.js
- 大小: 364525 字节
- 行数: 7596
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/server/route-modules/app-page/...

#### ec22b_c25ac661._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_c25ac661._.js
- 大小: 276538 字节
- 行数: 6989
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript...

#### ec22b_date-fns_2718a731._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_date-fns_2718a731._.js
- 大小: 144018 字节
- 行数: 2891
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/date-fns/constants.js [app-ssr] (ecmascr...

#### ec22b_f8d975d9._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_f8d975d9._.js
- 大小: 356793 字节
- 行数: 7555
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/server/route-modules/app-page/...

#### ec22b_tailwind-merge_dist_bundle-mjs_mjs_2b5a53f4._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_tailwind-merge_dist_bundle-mjs_mjs_2b5a53f4._.js
- 大小: 149150 字节
- 行数: 4905
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-...

#### [root-of-the-server]__7aa34343._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[root-of-the-server]__7aa34343._.js
- 大小: 9203 字节
- 行数: 116
- 预览: module.exports = [
"[next]/internal/font/google/inter_5972bc34.module.css [app-rsc] (css module)", (...

#### [root-of-the-server]__d23fa66c._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[root-of-the-server]__d23fa66c._.js
- 大小: 6514 字节
- 行数: 92
- 预览: module.exports = [
"[next]/internal/font/google/inter_5972bc34.module.css [app-rsc] (css module)", (...

#### [turbopack]_runtime.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[turbopack]_runtime.js
- 大小: 29893 字节
- 行数: 795
- 预览: const RUNTIME_PUBLIC_PATH = "server/chunks/ssr/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "...

#### middleware-build-manifest.js
- 路径: content-pipeline\.next\dev\server\middleware-build-manifest.js
- 大小: 1074 字节
- 行数: 26
- 预览: globalThis.__BUILD_MANIFEST = {
  "pages": {
    "/_app": []
  },
  "devFiles": [],
  "polyfillFiles...

#### content-pipeline_7d31d7fb._.js
- 路径: content-pipeline\.next\dev\static\chunks\content-pipeline_7d31d7fb._.js
- 大小: 215343 字节
- 行数: 2301
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### content-pipeline_b80116a8._.js
- 路径: content-pipeline\.next\dev\static\chunks\content-pipeline_b80116a8._.js
- 大小: 202545 字节
- 行数: 2194
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### content-pipeline_c543ff45._.js
- 路径: content-pipeline\.next\dev\static\chunks\content-pipeline_c543ff45._.js
- 大小: 214381 字节
- 行数: 2305
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### content-pipeline_cac9933f._.js
- 路径: content-pipeline\.next\dev\static\chunks\content-pipeline_cac9933f._.js
- 大小: 249231 字节
- 行数: 2630
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_9632ec25._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_9632ec25._.js
- 大小: 72732 字节
- 行数: 1343
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_c239bfb3._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_c239bfb3._.js
- 大小: 276180 字节
- 行数: 7092
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_c9c322eb._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_c9c322eb._.js
- 大小: 374426 字节
- 行数: 7849
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_date-fns_38ac3c4b._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_date-fns_38ac3c4b._.js
- 大小: 145411 字节
- 行数: 2891
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_dist_build_polyfills_polyfill-nomodule.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_build_polyfills_polyfill-nomodule.js
- 大小: 112541 字节
- 行数: 2
- 预览: !function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undef...

#### ec22b_next_dist_compiled_85349aae._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_compiled_85349aae._.js
- 大小: 145201 字节
- 行数: 2916
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_dist_compiled_react-server-dom-turbopack_b6c8894a._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_compiled_react-server-dom-turbopack_b6c8894a._.js
- 大小: 171238 字节
- 行数: 2842
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_dist_e7922f1d._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_e7922f1d._.js
- 大小: 128695 字节
- 行数: 2503
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_tailwind-merge_dist_bundle-mjs_mjs_2a6d292b._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_tailwind-merge_dist_bundle-mjs_mjs_2a6d292b._.js
- 大小: 149262 字节
- 行数: 4905
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### [root-of-the-server]__1ea239f5._.js
- 路径: content-pipeline\.next\dev\static\chunks\[root-of-the-server]__1ea239f5._.js
- 大小: 15706 字节
- 行数: 472
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### [root-of-the-server]__b0c0e809._.js
- 路径: content-pipeline\.next\dev\static\chunks\[root-of-the-server]__b0c0e809._.js
- 大小: 15702 字节
- 行数: 472
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### [turbopack]_browser_dev_hmr-client_hmr-client_ts_c8c997ce._.js
- 路径: content-pipeline\.next\dev\static\chunks\[turbopack]_browser_dev_hmr-client_hmr-client_ts_c8c997ce._.js
- 大小: 15433 字节
- 行数: 467
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### next-server.js.nft.json
- 路径: content-pipeline\.next\next-server.js.nft.json
- 大小: 39888 字节
- 行数: 1
- 预览: {"version":1,"files":["../../node_modules/@img/colour/package.json","../../node_modules/@img/sharp-w...

#### content-pipeline_3a326ea9._.js
- 路径: content-pipeline\.next\server\chunks\ssr\content-pipeline_3a326ea9._.js
- 大小: 17694 字节
- 行数: 4
- 预览: module.exports=[78058,a=>{a.n(a.i(95790))},99010,a=>{a.n(a.i(43710))},13663,a=>{"use strict";var b=a...

#### content-pipeline_app_page_tsx_7715d655._.js
- 路径: content-pipeline\.next\server\chunks\ssr\content-pipeline_app_page_tsx_7715d655._.js
- 大小: 238818 字节
- 行数: 8
- 预览: module.exports=[84621,a=>{"use strict";let b,c,d;var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y=a.i(1...

#### ec22b_convex_dist_esm_react_index_a846d650.js
- 路径: content-pipeline\.next\server\chunks\ssr\ec22b_convex_dist_esm_react_index_a846d650.js
- 大小: 74648 字节
- 行数: 4
- 预览: module.exports=[69827,62238,5950,15317,86954,5197,84600,69260,31503,18381,a=>{"use strict";let b;for...

#### ec22b_next_dist_30b936c2._.js
- 路径: content-pipeline\.next\server\chunks\ssr\ec22b_next_dist_30b936c2._.js
- 大小: 17200 字节
- 行数: 4
- 预览: module.exports=[67739,a=>{a.n(a.i(14676))},32804,a=>{"use strict";var b=a.i(99977),c=a.i(58792),d=a....

#### ec22b_next_dist_4aea64d6._.js
- 路径: content-pipeline\.next\server\chunks\ssr\ec22b_next_dist_4aea64d6._.js
- 大小: 59260 字节
- 行数: 3
- 预览: module.exports=[51890,(a,b,c)=>{(()=>{"use strict";"u">typeof __nccwpck_require__&&(__nccwpck_requir...

#### ec22b_next_dist_7337253b._.js
- 路径: content-pipeline\.next\server\chunks\ssr\ec22b_next_dist_7337253b._.js
- 大小: 45923 字节
- 行数: 6
- 预览: module.exports=[29172,(a,b,c)=>{"use strict";b.exports=a.r(55827).vendored.contexts.AppRouterContext...

#### ec22b_next_dist_esm_build_templates_app-page_830d3979.js
- 路径: content-pipeline\.next\server\chunks\ssr\ec22b_next_dist_esm_build_templates_app-page_830d3979.js
- 大小: 17662 字节
- 行数: 4
- 预览: module.exports=[48944,a=>{"use strict";var b=a.i(99977),c=a.i(58792),d=a.i(41153),e=a.i(75545),f=a.i...

#### [root-of-the-server]__1cda4b62._.js
- 路径: content-pipeline\.next\server\chunks\ssr\[root-of-the-server]__1cda4b62._.js
- 大小: 1760 字节
- 行数: 3
- 预览: module.exports=[64433,a=>{a.v({className:"inter_5972bc34-module__OU16Qa__className"})},80513,a=>{"us...

#### [turbopack]_runtime.js
- 路径: content-pipeline\.next\server\chunks\ssr\[turbopack]_runtime.js
- 大小: 29890 字节
- 行数: 795
- 预览: const RUNTIME_PUBLIC_PATH = "server/chunks/ssr/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "...

#### [turbopack]_runtime.js
- 路径: content-pipeline\.next\server\chunks\[turbopack]_runtime.js
- 大小: 29880 字节
- 行数: 795
- 预览: const RUNTIME_PUBLIC_PATH = "server/chunks/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "../....

#### 9da32fe9ed00bc9b.js
- 路径: content-pipeline\.next\static\chunks\9da32fe9ed00bc9b.js
- 大小: 75522 字节
- 行数: 2
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### a6dad97d9634a72d.js
- 路径: content-pipeline\.next\static\chunks\a6dad97d9634a72d.js
- 大小: 112541 字节
- 行数: 2
- 预览: !function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undef...

#### b31ababb85c55c03.js
- 路径: content-pipeline\.next\static\chunks\b31ababb85c55c03.js
- 大小: 241748 字节
- 行数: 6
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### package-lock.json
- 路径: content-pipeline\package-lock.json
- 大小: 435481 字节
- 行数: 12409
- 预览: {
  "name": "content-pipeline",
  "version": "0.1.0",
  "lockfileVersion": 3,
  "requires": true,
  ...

#### performance.json
- 路径: data\life-decision-master\collected-data\performance.json
- 大小: 915 字节
- 行数: 44
- 预览: [
  {
    "timestamp": "2026-02-24T18:44:36.603Z",
    "metric": "response_time",
    "value": 215,
...

#### report-1771958676666.json
- 路径: data\life-decision-master\collected-data\reports\report-1771958676666.json
- 大小: 3562 字节
- 行数: 141
- 预览: {
  "timestamp": "2026-02-24T18:44:36.663Z",
  "timeRange": "1d",
  "summary": {
    "totalCapabilit...

#### report-1771959051240.json
- 路径: data\life-decision-master\collected-data\reports\report-1771959051240.json
- 大小: 5033 字节
- 行数: 195
- 预览: {
  "timestamp": "2026-02-24T18:50:51.230Z",
  "timeRange": "1d",
  "summary": {
    "totalCapabilit...

#### feedback.json
- 路径: data\life-decision-master\feedback\feedback.json
- 大小: 1324 字节
- 行数: 56
- 预览: [
  {
    "id": "feedback-1771959066382-rtk5zph28",
    "timestamp": "2026-02-24T18:51:06.382Z",
   ...

#### feedback-report-1771959066408.json
- 路径: data\life-decision-master\feedback\reports\feedback-report-1771959066408.json
- 大小: 3843 字节
- 行数: 154
- 预览: {
  "timestamp": "2026-02-24T18:51:06.407Z",
  "timeRange": "7d",
  "summary": {
    "totalFeedback"...

#### feedback-report-1771959066415.json
- 路径: data\life-decision-master\feedback\reports\feedback-report-1771959066415.json
- 大小: 3844 字节
- 行数: 154
- 预览: {
  "timestamp": "2026-02-24T18:51:06.414Z",
  "timeRange": "30d",
  "summary": {
    "totalFeedback...

#### feedback-mechanism.js
- 路径: data\life-decision-master\feedback-mechanism.js
- 大小: 17551 字节
- 行数: 632
- 预览: /**
 * 人生决策宗师用户反馈机制
 * 用于收集和分析用户反馈，支持基于反馈的系统优化
 */

const fs = require('fs');
const path = require('...

#### detailed-execution-plan.js
- 路径: detailed-execution-plan.js
- 大小: 9707 字节
- 行数: 409
- 预览: // 基于EvoMap发布SKILL的详细执行计划
const fs = require('fs');
const path = require('path');

console.log('====...

#### detect-virtual-env.js
- 路径: detect-virtual-env.js
- 大小: 4409 字节
- 行数: 165
- 预览: const os = require('os');
const fs = require('fs');
const { execSync } = require('child_process');

...

#### anti-degeneration-lock.md
- 路径: docs\anti-degeneration-lock.md
- 大小: 5368 字节
- 行数: 273
- 预览: # 反进化锁定系统（Anti-Degeneration Lock System）

## 1. 系统概述

反进化锁定系统（Anti-Degeneration Lock System，简称ADL）是一...

#### enhanced-capability-tree.js
- 路径: enhanced-capability-tree.js
- 大小: 11847 字节
- 行数: 401
- 预览: /**
 * 增强版能力树管理系统
 * 结合功能域划分和层级结构，实现能力的持续生长和优化
 */

const { CapabilityNode, CapabilityTree, capabili...

#### enhanced-green-tea-agent.js
- 路径: enhanced-green-tea-agent.js
- 大小: 32292 字节
- 行数: 1174
- 预览: // 增强版绿茶智能体 - 集成EvoMap功能
const http = require('http');
const https = require('https');
const fs = re...

#### evolution-evaluator.js
- 路径: evolution-evaluator.js
- 大小: 11490 字节
- 行数: 459
- 预览: // 进化效果评估系统
// 负责评估智能体进化效果并生成评估报告

const fs = require('fs');
const path = require('path');

class Ev...

#### evolution-monitor.js
- 路径: evolution-monitor.js
- 大小: 8323 字节
- 行数: 265
- 预览: #!/usr/bin/env node

/**
 * 进化系统监控脚本
 * 功能：监控绿茶智能体的进化系统状态，确保PCEC正常执行
 */

const fs = require('fs');
...

#### fetched_assets.json
- 路径: evolver\assets\fetched_assets.json
- 大小: 70213 字节
- 行数: 1513
- 预览: {
  "protocol": "gep-a2a",
  "protocol_version": "1.0.0",
  "message_type": "fetch",
  "message_id":...

#### index.js
- 路径: evolver\index.js
- 大小: 7775 字节
- 行数: 289
- 预览: const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto...

#### evomap-agent-binding.js
- 路径: evomap-agent-binding.js
- 大小: 7359 字节
- 行数: 270
- 预览: /**
 * EvoMap代理绑定工具
 * 支持通过OpenClaw等AI代理绑定到EvoMap账户
 */

const https = require('https');
const fs = ...

#### evomap-binding-skill.md
- 路径: evomap-binding-skill.md
- 大小: 14603 字节
- 行数: 541
- 预览: ---
name: evomap-binding
version: 1.0.0
description: Bind AI agents (OpenClaw, Manus, HappyCapy) to ...

#### evomap-binding-tool.js
- 路径: evomap-binding-tool.js
- 大小: 9505 字节
- 行数: 345
- 预览: /**
 * EvoMap代理绑定工具
 * 按照官方文档流程：加载skill.md → 自动注册 → 获取激活码 → 生成绑定链接
 */

const https = require('https...

#### evomap-binding.js
- 路径: evomap-binding.js
- 大小: 12841 字节
- 行数: 449
- 预览: /**
 * EvoMap Agent Binding SKILL Implementation
 * Version: 1.0.0
 * Description: Bind AI agents (O...

#### asset-fetcher.js
- 路径: evomap-connection\asset-fetcher.js
- 大小: 9586 字节
- 行数: 386
- 预览: const fs = require('fs');
const path = require('path');
const EvoMapConnectionService = require('./c...

#### connection-service.js
- 路径: evomap-connection\connection-service.js
- 大小: 8781 字节
- 行数: 344
- 预览: const http = require('http');
const https = require('https');
const fs = require('fs');
const path =...

#### debug-heartbeat-fields.js
- 路径: evomap-connection\debug-heartbeat-fields.js
- 大小: 4003 字节
- 行数: 124
- 预览: const https = require('https');

async function debugHeartbeatFields() {
  const baseUrl = 'https://...

#### debug-heartbeat.js
- 路径: evomap-connection\debug-heartbeat.js
- 大小: 2501 字节
- 行数: 95
- 预览: const https = require('https');

async function testHeartbeat() {
  const baseUrl = 'https://evomap....

#### real-asset-fetcher.js
- 路径: evomap-connection\real-asset-fetcher.js
- 大小: 5927 字节
- 行数: 227
- 预览: const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * EvoM...

#### real-task-fetcher.js
- 路径: evomap-connection\real-task-fetcher.js
- 大小: 7139 字节
- 行数: 282
- 预览: const http = require('http');
const https = require('https');
const fs = require('fs');
const path =...

#### start.js
- 路径: evomap-connection\start.js
- 大小: 1186 字节
- 行数: 41
- 预览: const EvoMapConnectionService = require('./connection-service');

console.log('🚀 启动 EvoMap 连接服务...'...

#### capsule.json
- 路径: evomap-connection\tasks\task_001_上门经济在春节期间的兴起，对传统家政服务行业的冲击\assets\capsule.json
- 大小: 667 字节
- 行数: 8
- 预览: {
  "type": "capsule",
  "name": "上门经济在春节期间的兴起，对传统家政服务行业的冲击_capsule",
  "description": "胶囊: 上门经济在春节期...

#### solution.md
- 路径: evomap-connection\tasks\task_001_上门经济在春节期间的兴起，对传统家政服务行业的冲击\solution.md
- 大小: 407 字节
- 行数: 36
- 预览: # 解决方案: 上门经济在春节期间的兴起，对传统家政服务行业的冲击

## 问题分析摘要
基于对上门经济兴起和传统家政服务行业冲击的分析，我们提出以下解决方案。

## 核心解决方案

### 1. ...

#### test-correct-node.js
- 路径: evomap-connection\test-correct-node.js
- 大小: 3550 字节
- 行数: 129
- 预览: const https = require('https');

/**
 * 测试正确节点ID的EvoMap连接
 */
async function testCorrectNodeId() {
 ...

#### test-real-connection.js
- 路径: evomap-connection\test-real-connection.js
- 大小: 11728 字节
- 行数: 374
- 预览: const http = require('http');
const https = require('https');
const fs = require('fs');
const path =...

#### index.js
- 路径: evomap-evolution\index.js
- 大小: 11392 字节
- 行数: 413
- 预览: const fs = require('fs');
const path = require('path');
const EvoMapConnector = require('./lib/conne...

#### contentCreator.js
- 路径: evomap-evolution\lib\contentCreator.js
- 大小: 11477 字节
- 行数: 359
- 预览: const crypto = require('crypto');

class ContentCreator {
  constructor(config) {
    this.config = ...

#### evolutionScheduler.js
- 路径: evomap-evolution\lib\evolutionScheduler.js
- 大小: 2524 字节
- 行数: 109
- 预览: class EvolutionScheduler {
  constructor(config, evolutionSystem) {
    this.config = config;
    th...

#### socialMediaPublisher.js
- 路径: evomap-evolution\lib\socialMediaPublisher.js
- 大小: 14007 字节
- 行数: 485
- 预览: const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormDa...

#### evomap-execute-tasks-v2.js
- 路径: evomap-execute-tasks-v2.js
- 大小: 9544 字节
- 行数: 387
- 预览: /**
 * EvoMap 任务执行脚本 v2
 * 优化版：扩大筛选范围，实际下载和应用胶囊
 */

const fs = require('fs');
const path = require(...

#### evomap-execute-tasks-v3.js
- 路径: evomap-execute-tasks-v3.js
- 大小: 11266 字节
- 行数: 434
- 预览: /**
 * EvoMap 任务执行脚本 v3
 * 修复版：使用正确的目录路径，尝试 bundle_id 下载
 */

const fs = require('fs');
const path =...

#### evomap-execute-tasks.js
- 路径: evomap-execute-tasks.js
- 大小: 13128 字节
- 行数: 505
- 预览: /**
 * EvoMap 任务执行脚本
 * 任务 1: 高价值胶囊的实际下载和应用
 * 任务 2: 前往 EvoMap 接单
 */

const fs = require('fs');
con...

#### evomap-executor.js
- 路径: evomap-executor.js
- 大小: 18563 字节
- 行数: 612
- 预览: /**
 * EvoMap 执行工具
 * 按照推荐优先级执行：学习胶囊 → 接取任务 → 参与协作
 * 基于evomap-publish-skill.md文档流程
 */

const https...

#### evomap-explorer.js
- 路径: evomap-explorer.js
- 大小: 12190 字节
- 行数: 404
- 预览: /**
 * EvoMap资产和任务获取工具
 * 基于evomap-publish-skill.md文档流程
 * 功能：获取可用胶囊/技能、可接任务、推荐资产
 */

const https =...

#### evomap-task-runner.js
- 路径: evomap-task-runner.js
- 大小: 12060 字节
- 行数: 516
- 预览: /**
 * EvoMap任务执行脚本
 * 按照用户要求的流程执行任务认领和完成
 */

const fs = require('fs');
const path = require('path'...

#### evomap-tasks-completion-report.md
- 路径: evomap-tasks-completion-report.md
- 大小: 3549 字节
- 行数: 187
- 预览: # EvoMap 任务执行完成报告

**执行时间**: 2026-02-24 18:47:21  
**执行者**: 绿茶智能体（CGO）  
**节点 ID**: node_be9ff891bc1...

#### execute-evomap-task-via-green-tea.js
- 路径: execute-evomap-task-via-green-tea.js
- 大小: 2027 字节
- 行数: 77
- 预览: // 执行EvoMap任务
const http = require('http');

console.log('========================================')...

#### execute-evomap-task.js
- 路径: execute-evomap-task.js
- 大小: 8933 字节
- 行数: 360
- 预览: // 认领并执行EvoMap任务的脚本
const fs = require('fs');
const path = require('path');
const https = require('h...

#### execute-innovation-strategies-v2.js
- 路径: execute-innovation-strategies-v2.js
- 大小: 16694 字节
- 行数: 489
- 预览: /**
 * EvoMap创新策略执行脚本 v2.0
 * 基于GEP-A2A协议和evomap-publish-skill.md文档
 */

const https = require('http...

#### execute-innovation-strategies.js
- 路径: execute-innovation-strategies.js
- 大小: 17698 字节
- 行数: 650
- 预览: /**
 * EvoMap创新策略执行脚本
 * 基于GEP-A2A协议执行创新任务
 */

const fs = require('fs');
const path = require('path...

#### execute-task-with-green-tea.js
- 路径: execute-task-with-green-tea.js
- 大小: 3385 字节
- 行数: 128
- 预览: // 通过绿茶智能体执行EvoMap任务
const http = require('http');

console.log('===================================...

#### extract-activation-info.js
- 路径: extract-activation-info.js
- 大小: 3605 字节
- 行数: 136
- 预览: /**
 * 修复EvoMap激活码提取工具
 * 正确提取响应中的claim_code和claim_url字段
 */

const fs = require('fs');
const path =...

#### feedback-state.json
- 路径: feedback\feedback-state.json
- 大小: 98 字节
- 行数: 6
- 预览: {
  "feedbackCount": 1,
  "processedCount": 1,
  "pendingCount": 0,
  "timestamp": 1771968276786
}

#### feedback_1771968276783_354wrlsn1.json
- 路径: feedback\feedback_1771968276783_354wrlsn1.json
- 大小: 334 字节
- 行数: 16
- 预览: {
  "id": "feedback_1771968276783_354wrlsn1",
  "timestamp": 1771968276783,
  "type": "system",
  "c...

#### feedback-system.js
- 路径: feedback-system.js
- 大小: 5431 字节
- 行数: 206
- 预览: /**
 * 反馈系统
 * 用于收集和分析用户反馈，驱动系统进化
 * 状态: ENHANCED (增强版) - 8小时进化方案优化
 */

const fs = require('fs');
c...

#### final-green-tea-evomap-test.js
- 路径: final-green-tea-evomap-test.js
- 大小: 3627 字节
- 行数: 132
- 预览: // 最终测试：验证绿茶智能体EvoMap连接和任务执行
const http = require('http');

console.log('===========================...

#### generate-master-image.js
- 路径: generate-master-image.js
- 大小: 2195 字节
- 行数: 86
- 预览: const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
requir...

#### get-activation-code.js
- 路径: get-activation-code.js
- 大小: 6413 字节
- 行数: 223
- 预览: /**
 * 获取节点激活码并生成绑定链接
 */

const https = require('https');
const fs = require('fs');
const path = re...

#### green-tea-proxy.js
- 路径: green-tea-proxy.js
- 大小: 7715 字节
- 行数: 287
- 预览: const http = require('http');
const fs = require('fs');
const path = require('path');

// 模拟绿茶智能体的行为...

#### server.js
- 路径: HATwin\server.js
- 大小: 17563 字节
- 行数: 485
- 预览: const express = require('express');
const cors = require('cors');
require('dotenv').config(); // 加载 ...

#### HTP 智能体提示词和工作流优化.md
- 路径: HTP\.trae\documents\HTP 智能体提示词和工作流优化.md
- 大小: 1141 字节
- 行数: 51
- 预览: # HTP 智能体提示词和工作流优化

## 优化目标

确保智能体提示词和工作流文档与项目实际工作流完全匹配，移除所有不符合的内容，优化系统集成和运行效率。

## 优化内容

### 1. 智能体...

#### HTP技能转化与集成计划.md
- 路径: HTP\.trae\documents\HTP技能转化与集成计划.md
- 大小: 696 字节
- 行数: 41
- 预览: # HTP技能转化与集成计划

## 1. 解压缩文件
- 解压缩 `C:\Users\10919\Downloads\你的画照见你的灵魂.tar.gz` 到工作目录
- 检查解压后的文件结构，确认所...

#### HTP极简MVP落地方案.md
- 路径: HTP\.trae\documents\HTP极简MVP落地方案.md
- 大小: 663 字节
- 行数: 67
- 预览: # 实施计划

根据用户提供的详细解决方案，我已经完成了以下修改：

## 1. 修改后端 .env 文件

* 添加了新的文生图接入点ID：`ARK_IMAGE_ENDPOINT_ID=ep-202...

#### plan_20260205_085757.md
- 路径: HTP\.trae\documents\plan_20260205_085757.md
- 大小: 1394 字节
- 行数: 70
- 预览: # 验证和调整HTP分析系统配置

## 问题分析
根据用户提供的详细信息，当前系统需要按照特定的流程和ID配置来运行：

1. **流程角色分配**：
   - `bot-2026020511415...

#### plan_20260205_093929.md
- 路径: HTP\.trae\documents\plan_20260205_093929.md
- 大小: 4725 字节
- 行数: 212
- 预览: # 实现前后端分离架构

## 问题分析
当前系统直接在前端调用火山方舟API，存在以下问题：
1. 前端暴露敏感信息（API Key）
2. 前端传输大量提示词，消耗Token
3. 可能出现跨域和...

#### plan_20260205_104254.md
- 路径: HTP\.trae\documents\plan_20260205_104254.md
- 大小: 770 字节
- 行数: 49
- 预览: # 问题分析

从后端日志中，我发现了明确的错误信息：

```
分析接口失败: {
  message: 'Request failed with status code 404',
  statu...

#### plan_20260205_110559.md
- 路径: HTP\.trae\documents\plan_20260205_110559.md
- 大小: 637 字节
- 行数: 41
- 预览: # 实施计划

根据用户提供的详细解决方案，我已经完成了以下修改：

## 1. 修改后端 .env 文件
- 添加了新的文生图接入点ID：`ARK_IMAGE_ENDPOINT_ID=ep-2026...

#### plan_20260206_031242.md
- 路径: HTP\.trae\documents\plan_20260206_031242.md
- 大小: 3630 字节
- 行数: 151
- 预览: # 问题分析与解决方案

## 问题根源

经过分析前端和后端日志，发现以下问题：

1. **图片尺寸太小**：用户在画布上绘制的内容太少，导致`canvas.toDataURL()`返回的图片尺寸...

#### plan_20260206_032301.md
- 路径: HTP\.trae\documents\plan_20260206_032301.md
- 大小: 813 字节
- 行数: 39
- 预览: # 接入点更新计划

## 任务分析

用户要求：
- 使用智能体ID：`bot-20260205114157-98szj`（当前已配置）
- 将接入点改为：`ep-20260206112909-d7...

#### plan_20260206_091107.md
- 路径: HTP\.trae\documents\plan_20260206_091107.md
- 大小: 2598 字节
- 行数: 108
- 预览: # 前端错误修复计划

## 问题分析

根据前端错误日志和代码分析，发现以下问题：

1. **formatReport函数错误**：在第66行调用`content.trim()`时，`conten...

#### plan_20260206_115149.md
- 路径: HTP\.trae\documents\plan_20260206_115149.md
- 大小: 1355 字节
- 行数: 68
- 预览: # 实现HTP分析用户数据传递方案

## 问题分析

通过检查代码，我发现了以下关键问题：

1. **`skillService.ts`中的`analyzeDrawing`函数**：
   - 调...

#### plan_20260206_123648.md
- 路径: HTP\.trae\documents\plan_20260206_123648.md
- 大小: 1196 字节
- 行数: 54
- 预览: # 修复HTP分析图片格式问题

## 问题分析

通过分析前端和后端代码，我发现了以下关键问题：

1. **前端处理**：
   - 在 `htpAnalysisService.ts` 中，前端会...

#### plan_20260206_124324.md
- 路径: HTP\.trae\documents\plan_20260206_124324.md
- 大小: 733 字节
- 行数: 40
- 预览: # 添加HTP分析排队提示

## 问题分析

通过分析前端代码，我发现了以下关键问题：

1. **加载页面**：
   - 在 `LoadingPage.tsx` 中，前端显示加载消息和进度条
 ...

#### plan_20260206_133615.md
- 路径: HTP\.trae\documents\plan_20260206_133615.md
- 大小: 1010 字节
- 行数: 52
- 预览: # 实现HTP分析结果的Markdown渲染

## 问题分析

通过分析用户提供的信息，我发现了以下关键问题：

1. **后端返回格式**：
   - 后端返回的是Markdown格式的字符串，以...

#### plan_20260206_135608.md
- 路径: HTP\.trae\documents\plan_20260206_135608.md
- 大小: 1285 字节
- 行数: 64
- 预览: # 修复HTP分析结果页面的路由传参问题

## 问题分析

通过分析用户提供的信息，我发现了以下关键问题：

1. **路由跳转问题**：
   - 前端使用路由跳转（`Maps('/result'...

#### plan_20260207_145107.md
- 路径: HTP\.trae\documents\plan_20260207_145107.md
- 大小: 1270 字节
- 行数: 73
- 预览: ## 问题分析

用户指出内容应该是API# Role后台给，前台不应该有# Role。当前的问题是：

1. **后端硬编码了提示词**：在user消息中包含了详细的分析要求
2. **智能体配置也...

#### 修复后端HTP分析服务调用火山方舟API失败的问题.md
- 路径: HTP\.trae\documents\修复后端HTP分析服务调用火山方舟API失败的问题.md
- 大小: 798 字节
- 行数: 49
- 预览: # 问题分析

从错误日志中，我发现前端调用后端分析接口时收到了500内部服务器错误，而后端调用火山方舟API时收到了404错误。具体表现为：

1. 前端调用 `http://localhost:3...

#### 修复房树人AI分析结果提示问题.md
- 路径: HTP\.trae\documents\修复房树人AI分析结果提示问题.md
- 大小: 1031 字节
- 行数: 51
- 预览: # 修复房树人AI分析结果提示问题

## 问题分析

通过代码分析，我发现了导致AI分析结果提示"暂未解析到画作特征"的三个核心问题：

1. **图片数据传递问题**：前端可能传递带有 `data...

#### 修改htp-insight-agent-prompt.md和项目代码.md
- 路径: HTP\.trae\documents\修改htp-insight-agent-prompt.md和项目代码.md
- 大小: 866 字节
- 行数: 42
- 预览: # 修改htp-insight-agent-prompt.md和项目代码

## 任务概述
根据用户的要求，修改`htp-insight-agent-prompt.md`文件和项目代码，使其符合新的工...

#### 解决HTP分析API图片格式适配问题.md
- 路径: HTP\.trae\documents\解决HTP分析API图片格式适配问题.md
- 大小: 1329 字节
- 行数: 67
- 预览: # 解决HTP分析API图片格式适配问题

## 问题分析

通过检查代码，我发现了以下关键问题：

1. **前端处理**：在 `src/services/htpAnalysisService.ts...

#### sketch.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\sketch.md
- 大小: 1691 字节
- 行数: 58
- 预览: # sketch

Raw, authentic notebook-style illustration for ideas and processes

## Design Aesthetic

H...

#### idle-detector.js
- 路径: idle-detector.js
- 大小: 5516 字节
- 行数: 203
- 预览: // 空闲时间检测系统
// 当系统空闲超过5分钟时自动启动进化过程

const fs = require('fs');
const path = require('path');
const { ...

#### interact-with-green-tea.js
- 路径: interact-with-green-tea.js
- 大小: 2580 字节
- 行数: 97
- 预览: // 与绿茶智能体交互执行EvoMap任务
const http = require('http');

console.log('==================================...

#### knowledge-visualization-format.md
- 路径: knowledge-visualization-format.md
- 大小: 3546 字节
- 行数: 215
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
- **知...

#### server.js
- 路径: LAY\server.js
- 大小: 36149 字节
- 行数: 1116
- 预览: const express = require('express');
const cors = require('cors');
require('dotenv').config(); // 加载 ...

#### local-brain-cheater.js
- 路径: local-brain-cheater.js
- 大小: 8263 字节
- 行数: 335
- 预览: // 本地大脑作弊器调用模块
// 直接集成大脑作弊器核心功能，无需API调用

const fs = require('fs');
const path = require('path');

cl...

#### evolution_1771968076972_h0k581s30.json
- 路径: logs\pcec\evolution_1771968076972_h0k581s30.json
- 大小: 1734 字节
- 行数: 82
- 预览: {
  "id": "evolution_1771968076972_h0k581s30",
  "timestamp": 1771968076972,
  "duration": 5,
  "suc...

#### evolution_1771968474658_3wcr6vh13.json
- 路径: logs\pcec\evolution_1771968474658_3wcr6vh13.json
- 大小: 1734 字节
- 行数: 82
- 预览: {
  "id": "evolution_1771968474658_3wcr6vh13",
  "timestamp": 1771968474658,
  "duration": 6,
  "suc...

#### 2f884_a3aff9a6._.js
- 路径: mission-control\.next\build\chunks\2f884_a3aff9a6._.js
- 大小: 258945 字节
- 行数: 6758
- 预览: module.exports = [
"[project]/mission-control/node_modules/picocolors/picocolors.js [postcss] (ecmas...

#### [root-of-the-server]__cfaa8e07._.js
- 路径: mission-control\.next\build\chunks\[root-of-the-server]__cfaa8e07._.js
- 大小: 8589 字节
- 行数: 206
- 预览: module.exports = [
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, expor...

#### [root-of-the-server]__d9c0eb89._.js
- 路径: mission-control\.next\build\chunks\[root-of-the-server]__d9c0eb89._.js
- 大小: 17933 字节
- 行数: 500
- 预览: module.exports = [
"[turbopack-node]/globals.ts [postcss] (ecmascript)", ((__turbopack_context__, mo...

#### [turbopack]_runtime.js
- 路径: mission-control\.next\build\chunks\[turbopack]_runtime.js
- 大小: 29873 字节
- 行数: 795
- 预览: const RUNTIME_PUBLIC_PATH = "chunks/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "../..";
con...

#### 2f884_a3aff9a6._.js
- 路径: mission-control\.next\dev\build\chunks\2f884_a3aff9a6._.js
- 大小: 260938 字节
- 行数: 6783
- 预览: module.exports = [
"[project]/mission-control/node_modules/picocolors/picocolors.js [postcss] (ecmas...

#### [root-of-the-server]__cfaa8e07._.js
- 路径: mission-control\.next\dev\build\chunks\[root-of-the-server]__cfaa8e07._.js
- 大小: 8589 字节
- 行数: 206
- 预览: module.exports = [
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, expor...

#### [root-of-the-server]__d9c0eb89._.js
- 路径: mission-control\.next\dev\build\chunks\[root-of-the-server]__d9c0eb89._.js
- 大小: 18269 字节
- 行数: 508
- 预览: module.exports = [
"[turbopack-node]/globals.ts [postcss] (ecmascript)", ((__turbopack_context__, mo...

#### [turbopack]_runtime.js
- 路径: mission-control\.next\dev\build\chunks\[turbopack]_runtime.js
- 大小: 29876 字节
- 行数: 795
- 预览: const RUNTIME_PUBLIC_PATH = "chunks/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "../../..";
...

#### 2f884_lodash_8f724478._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_lodash_8f724478._.js
- 大小: 208205 字节
- 行数: 4566
- 预览: module.exports = [
"[project]/mission-control/node_modules/lodash/_baseSlice.js [app-ssr] (ecmascrip...

#### 2f884_moment_2ec5b140._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_moment_2ec5b140._.js
- 大小: 730198 字节
- 行数: 19019
- 预览: module.exports = [
"[project]/mission-control/node_modules/moment/locale/af.js [app-ssr] (ecmascript...

#### mission-control_src_app_team_page_tsx_2c015767._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control_src_app_team_page_tsx_2c015767._.js
- 大小: 24316 字节
- 行数: 373
- 预览: module.exports = [
"[project]/mission-control/src/app/team/page.tsx [app-ssr] (ecmascript)", ((__tur...

#### [root-of-the-server]__d1b399db._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[root-of-the-server]__d1b399db._.js
- 大小: 48944 字节
- 行数: 516
- 预览: module.exports = [
"[project]/mission-control/src/app/favicon.ico.mjs { IMAGE => \"[project]/mission...

#### [turbopack]_runtime.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[turbopack]_runtime.js
- 大小: 29893 字节
- 行数: 795
- 预览: const RUNTIME_PUBLIC_PATH = "server/chunks/ssr/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "...

#### middleware-build-manifest.js
- 路径: mission-control\.next\dev\server\middleware-build-manifest.js
- 大小: 1072 字节
- 行数: 26
- 预览: globalThis.__BUILD_MANIFEST = {
  "pages": {
    "/_app": []
  },
  "devFiles": [],
  "polyfillFiles...

#### 2f884_3d948699._.js
- 路径: mission-control\.next\dev\static\chunks\2f884_3d948699._.js
- 大小: 229402 字节
- 行数: 4091
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### 2f884_lodash_3be80051._.js
- 路径: mission-control\.next\dev\static\chunks\2f884_lodash_3be80051._.js
- 大小: 209958 字节
- 行数: 4566
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### 2f884_moment_e98069b6._.js
- 路径: mission-control\.next\dev\static\chunks\2f884_moment_e98069b6._.js
- 大小: 732776 字节
- 行数: 19019
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### 2f884_next_dist_2856d0c4._.js
- 路径: mission-control\.next\dev\static\chunks\2f884_next_dist_2856d0c4._.js
- 大小: 128577 字节
- 行数: 2503
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### 2f884_next_dist_build_polyfills_polyfill-nomodule.js
- 路径: mission-control\.next\dev\static\chunks\2f884_next_dist_build_polyfills_polyfill-nomodule.js
- 大小: 112541 字节
- 行数: 2
- 预览: !function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undef...

#### 2f884_next_dist_compiled_94ae6f66._.js
- 路径: mission-control\.next\dev\static\chunks\2f884_next_dist_compiled_94ae6f66._.js
- 大小: 145158 字节
- 行数: 2916
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### 2f884_next_dist_compiled_react-server-dom-turbopack_e5deb040._.js
- 路径: mission-control\.next\dev\static\chunks\2f884_next_dist_compiled_react-server-dom-turbopack_e5deb040._.js
- 大小: 171227 字节
- 行数: 2842
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### 2f884_react-big-calendar_dist_react-big-calendar_esm_0f9ad120.js
- 路径: mission-control\.next\dev\static\chunks\2f884_react-big-calendar_dist_react-big-calendar_esm_0f9ad120.js
- 大小: 352755 字节
- 行数: 5670
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### mission-control_ff434233._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_ff434233._.js
- 大小: 75759 字节
- 行数: 1446
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### mission-control_src_app_team_page_tsx_312b8091._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_team_page_tsx_312b8091._.js
- 大小: 23337 字节
- 行数: 385
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### [turbopack]_browser_dev_hmr-client_hmr-client_ts_c8c997ce._.js
- 路径: mission-control\.next\dev\static\chunks\[turbopack]_browser_dev_hmr-client_hmr-client_ts_c8c997ce._.js
- 大小: 15433 字节
- 行数: 467
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### next-server.js.nft.json
- 路径: mission-control\.next\next-server.js.nft.json
- 大小: 39453 字节
- 行数: 1
- 预览: {"version":1,"files":["../../node_modules/@img/colour/package.json","../../node_modules/@img/sharp-w...

#### 2f884_next_dist_08964bd3._.js
- 路径: mission-control\.next\server\chunks\ssr\2f884_next_dist_08964bd3._.js
- 大小: 17197 字节
- 行数: 4
- 预览: module.exports=[89207,a=>{a.n(a.i(35205))},76195,a=>{"use strict";var b=a.i(90038),c=a.i(78636),d=a....

#### 2f884_next_dist_3cdb309c._.js
- 路径: mission-control\.next\server\chunks\ssr\2f884_next_dist_3cdb309c._.js
- 大小: 59250 字节
- 行数: 3
- 预览: module.exports=[25070,(a,b,c)=>{(()=>{"use strict";"u">typeof __nccwpck_require__&&(__nccwpck_requir...

#### 2f884_next_dist_esm_40e54b34._.js
- 路径: mission-control\.next\server\chunks\ssr\2f884_next_dist_esm_40e54b34._.js
- 大小: 45573 字节
- 行数: 6
- 预览: module.exports=[14442,a=>{"use strict";let b={NOT_FOUND:404,FORBIDDEN:403,UNAUTHORIZED:401},c=new Se...

#### 2f884_next_dist_esm_build_templates_app-page_cd269721.js
- 路径: mission-control\.next\server\chunks\ssr\2f884_next_dist_esm_build_templates_app-page_cd269721.js
- 大小: 17659 字节
- 行数: 4
- 预览: module.exports=[25338,a=>{"use strict";var b=a.i(90038),c=a.i(78636),d=a.i(19904),e=a.i(51478),f=a.i...

#### mission-control_241878e3._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_241878e3._.js
- 大小: 17666 字节
- 行数: 4
- 预览: module.exports=[11855,a=>{a.n(a.i(45235))},88004,a=>{"use strict";var b=a.i(90038),c=a.i(78636),d=a....

#### mission-control_4e8b3f50._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_4e8b3f50._.js
- 大小: 448466 字节
- 行数: 3
- 预览: module.exports=[41262,(a,b,c)=>{"use strict";b.exports=function(a,b,c,d,e,f,g,h){if(!a){var i;if(voi...

#### mission-control_563ffb96._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_563ffb96._.js
- 大小: 17724 字节
- 行数: 4
- 预览: module.exports=[98886,a=>{a.n(a.i(97715))},70896,a=>{"use strict";var b=a.i(90038),c=a.i(78636),d=a....

#### mission-control_6659e44a._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_6659e44a._.js
- 大小: 17727 字节
- 行数: 4
- 预览: module.exports=[35806,a=>{a.n(a.i(12602))},96100,a=>{"use strict";var b=a.i(90038),c=a.i(78636),d=a....

#### mission-control_a139db9d._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_a139db9d._.js
- 大小: 17737 字节
- 行数: 4
- 预览: module.exports=[66287,a=>{a.n(a.i(554))},74307,a=>{"use strict";var b=a.i(90038),c=a.i(78636),d=a.i(...

#### mission-control_c83b728c._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_c83b728c._.js
- 大小: 17715 字节
- 行数: 4
- 预览: module.exports=[45850,a=>{a.n(a.i(43851))},1817,a=>{"use strict";var b=a.i(90038),c=a.i(78636),d=a.i...

#### mission-control_cd1ff84e._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_cd1ff84e._.js
- 大小: 17734 字节
- 行数: 4
- 预览: module.exports=[91932,a=>{a.n(a.i(15667))},25951,a=>{"use strict";var b=a.i(90038),c=a.i(78636),d=a....

#### mission-control_d48a8ec1._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_d48a8ec1._.js
- 大小: 17729 字节
- 行数: 4
- 预览: module.exports=[44947,a=>{a.n(a.i(73383))},59605,a=>{"use strict";var b=a.i(90038),c=a.i(78636),d=a....

#### mission-control_e2de614a._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_e2de614a._.js
- 大小: 35965 字节
- 行数: 6
- 预览: module.exports=[65377,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d=...

#### mission-control_src_app_team_page_tsx_2c015767._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_src_app_team_page_tsx_2c015767._.js
- 大小: 3827 字节
- 行数: 3
- 预览: module.exports=[55106,a=>{"use strict";var b=a.i(55217);let c={name:"OpenClaw",role:"AI Assistant & ...

#### [root-of-the-server]__777ccb90._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__777ccb90._.js
- 大小: 8629 字节
- 行数: 3
- 预览: module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",(...

#### [turbopack]_runtime.js
- 路径: mission-control\.next\server\chunks\ssr\[turbopack]_runtime.js
- 大小: 29890 字节
- 行数: 795
- 预览: const RUNTIME_PUBLIC_PATH = "server/chunks/ssr/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "...

#### [turbopack]_runtime.js
- 路径: mission-control\.next\server\chunks\[turbopack]_runtime.js
- 大小: 29880 字节
- 行数: 795
- 预览: const RUNTIME_PUBLIC_PATH = "server/chunks/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "../....

#### middleware-build-manifest.js
- 路径: mission-control\.next\server\middleware-build-manifest.js
- 大小: 596 字节
- 行数: 21
- 预览: globalThis.__BUILD_MANIFEST = {
  "pages": {
    "/_app": []
  },
  "devFiles": [],
  "polyfillFiles...

#### 01171f7f6ff20e4f.js
- 路径: mission-control\.next\static\chunks\01171f7f6ff20e4f.js
- 大小: 449341 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### 1c41ef38e1946dd6.js
- 路径: mission-control\.next\static\chunks\1c41ef38e1946dd6.js
- 大小: 3846 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### a6dad97d9634a72d.js
- 路径: mission-control\.next\static\chunks\a6dad97d9634a72d.js
- 大小: 112541 字节
- 行数: 2
- 预览: !function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undef...

#### monitoring-system.js
- 路径: monitoring-system.js
- 大小: 25523 字节
- 行数: 956
- 预览: /**
 * 系统监控系统
 * 用于收集、分析和报告系统性能指标
 */

const fs = require('fs');
const path = require('path');
const...

#### index.js
- 路径: notebooklm-bot\index.js
- 大小: 7908 字节
- 行数: 266
- 预览: const axios = require('axios');
const puppeteer = require('puppeteer');
const chokidar = require('ch...

#### watcher.js
- 路径: notebooklm-bot\watcher.js
- 大小: 6194 字节
- 行数: 223
- 预览: const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const ...

#### notebooklm.txt
- 路径: notebooklm.txt
- 大小: 4396 字节
- 行数: 198
- 预览: 要的是在 Trae 中写代码，通过 OpenClaw 的 API 来实现完全自动化的 NotebookLM 操作，而不是手动发一次指令。这是一个开发者级别的解决方案。
 
核心方案
我们将在 T...

#### notification-service.js
- 路径: notification-service.js
- 大小: 5104 字节
- 行数: 212
- 预览: // 智能体通知服务
const express = require('express');
const http = require('http');
const cors = require('c...

#### package-lock.json
- 路径: package-lock.json
- 大小: 54145 字节
- 行数: 1503
- 预览: {
  "name": "company-brain-system",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true...

#### performance-report.json
- 路径: performance-report.json
- 大小: 1724 字节
- 行数: 73
- 预览: {
  "timestamp": "2026-02-24T18:52:12.643Z",
  "tests": {
    "响应时间测试": {
      "loadTime": 0.364699...

#### start.js
- 路径: plugins\doubao-api\start.js
- 大小: 1478 字节
- 行数: 58
- 预览: // 启动豆包API集成服务
const DoubaoIntegration = require('./integration');

// 创建集成实例
const integration = ne...

#### SKILL.md
- 路径: project_20260127_134424\projects\bug-diagnose\SKILL.md
- 大小: 3003 字节
- 行数: 189
- 预览: ---
name: bug-diagnose
description: BUG问题诊断阶段，包含问题陈述引导、差异分析、根因定位、假设验证，适用于需要系统性诊断问题根因的场景
---

# BUG问题...

#### verification-checklist.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\references\verification-checklist.md
- 大小: 3703 字节
- 行数: 302
- 预览: # 验收标准清单

## 目录
- [概览](#概览)
- [验收标准分类](#验收标准分类)
- [通用验收标准](#通用验收标准)
- [具体场景验收标准](#具体场景验收标准)
- [验收流程]...

#### SKILL.md
- 路径: project_20260127_134424\projects\bug-fix-debugger\SKILL.md
- 大小: 3710 字节
- 行数: 243
- 预览: ---
name: bug-fix-debugger
description: BUG排查与修复总入口，提供4个阶段的选择指导，包括问题诊断、方案设计、执行规划、执行与验收的完整流程框架
---

#...

#### SKILL.md
- 路径: project_20260127_134424\projects\bug-plan\SKILL.md
- 大小: 3866 字节
- 行数: 249
- 预览: ---
name: bug-plan
description: BUG修复执行规划阶段，包含方案验证、影响范围分析、详细操作计划制定、异常情况标注
---

# BUG修复执行规划

## 任务目标
...

#### publish-solution.js
- 路径: publish-solution.js
- 大小: 5234 字节
- 行数: 148
- 预览: const https = require('https');
const crypto = require('crypto');

const taskId = 'cmlxl3x3q166qpk2n...

#### knowledge-visualization-format.md
- 路径: references\knowledge-visualization-format.md
- 大小: 2230 字节
- 行数: 136
- 预览: # 知识可视化格式规范

## 思维导图格式

### 核心要求
- **中心主题**：突出显示，字体较大（16-20px）
- **分支层级**：最多3-4级，保持清晰
- **节点文...

#### register-dazhanggui-node.js
- 路径: register-dazhanggui-node.js
- 大小: 5202 字节
- 行数: 206
- 预览: /**
 * 为大掌柜注册新的EvoMap节点
 */

const https = require('https');
const crypto = require('crypto');
const...

#### index.js
- 路径: services\wechat-auth\index.js
- 大小: 3445 字节
- 行数: 164
- 预览: const { WechatyBuilder } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-pa...

#### package-lock.json
- 路径: services\wechat-auth\package-lock.json
- 大小: 205576 字节
- 行数: 5522
- 预览: {
  "name": "wechat-auth-service",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,...

#### index.js
- 路径: services\wechat-manager\index.js
- 大小: 14198 字节
- 行数: 502
- 预览: const express = require('express');
const axios = require('axios');
const redis = require('redis');
...

#### index.js
- 路径: services\wechat-message\index.js
- 大小: 11186 字节
- 行数: 446
- 预览: const { WechatyBuilder } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-pa...

#### index.js
- 路径: services\wechat-moments\index.js
- 大小: 10340 字节
- 行数: 458
- 预览: const { WechatyBuilder } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-pa...

#### index.js
- 路径: services\wechat-profile\index.js
- 大小: 12250 字节
- 行数: 493
- 预览: const { WechatyBuilder } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-pa...

#### package-lock.json
- 路径: services\wechat-profile\package-lock.json
- 大小: 226291 字节
- 行数: 6115
- 预览: {
  "name": "wechat-profile-service",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": tr...

#### rollback-points.json
- 路径: skills\adl-core\data\rollback-points.json
- 大小: 9135 字节
- 行数: 377
- 预览: [
  {
    "id": "rb_1771956331390_4yjyai0t5",
    "timestamp": 1771956331390,
    "description": "测试...

#### test-adl-core.js
- 路径: skills\adl-core\tests\test-adl-core.js
- 大小: 7783 字节
- 行数: 274
- 预览: /**
 * ADL核心模块测试
 * 测试新ADL协议的所有要求
 */

const { getADLInstance, CONFIG } = require('../index');
const...

#### SKILL.md
- 路径: skills\agent-port-isolation\SKILL.md
- 大小: 5374 字节
- 行数: 272
- 预览: # 智能体端口隔离指南

## 技能信息
- **技能名称**: agent-port-isolation
- **版本**: 1.0.0
- **作者**: 系统管理员
- **创建日期**: 20...

#### SKILL.md
- 路径: skills\apple-notes\SKILL.md
- 大小: 1881 字节
- 行数: 51
- 预览: ---
name: apple-notes
description: Manage Apple Notes via the `memo` CLI on macOS (create, view, edi...

#### capability-merging.json
- 路径: skills\capability-evolver\capabilities\capability-merging.json
- 大小: 3176 字节
- 行数: 115
- 预览: {
  "merges": [
    {
      "id": "evolution-validation-system",
      "name": "进化验证系统",
      "desc...

#### proactive-enhancement.json
- 路径: skills\capability-evolver\capabilities\proactive-enhancement.json
- 大小: 5197 字节
- 行数: 204
- 预览: {
  "mechanism": {
    "name": "主动增强机制",
    "description": "识别用户可自动化的操作和反复执行的决策模式，主动强化相应能力",
    "c...

#### internalizer.js
- 路径: skills\capability-evolver\core\internalizer.js
- 大小: 8862 字节
- 行数: 326
- 预览: /**
 * 能力内生化器
 * 负责将抽象能力转化为系统默认行为，实现不同层次的能力内生化策略
 */

const fs = require('fs');
const path = require...

#### rollback-1771985602894.json
- 路径: skills\capability-evolver\data\rollback-points\rollback-1771985602894.json
- 大小: 2168 字节
- 行数: 89
- 预览: {
  "id": "rollback-1771985602894",
  "timestamp": 1771985602894,
  "status": "created",
  "descript...

#### rollback-1771985902904.json
- 路径: skills\capability-evolver\data\rollback-points\rollback-1771985902904.json
- 大小: 2168 字节
- 行数: 89
- 预览: {
  "id": "rollback-1771985902904",
  "timestamp": 1771985902904,
  "status": "created",
  "descript...

#### rollback-1771986202917.json
- 路径: skills\capability-evolver\data\rollback-points\rollback-1771986202917.json
- 大小: 2168 字节
- 行数: 89
- 预览: {
  "id": "rollback-1771986202917",
  "timestamp": 1771986202917,
  "status": "created",
  "descript...

#### rollback-1771986502931.json
- 路径: skills\capability-evolver\data\rollback-points\rollback-1771986502931.json
- 大小: 2168 字节
- 行数: 89
- 预览: {
  "id": "rollback-1771986502931",
  "timestamp": 1771986502931,
  "status": "created",
  "descript...

#### rollback-1771986802959.json
- 路径: skills\capability-evolver\data\rollback-points\rollback-1771986802959.json
- 大小: 2167 字节
- 行数: 89
- 预览: {
  "id": "rollback-1771986802959",
  "timestamp": 1771986802959,
  "status": "created",
  "descript...

#### rollback-1771987102977.json
- 路径: skills\capability-evolver\data\rollback-points\rollback-1771987102977.json
- 大小: 2168 字节
- 行数: 89
- 预览: {
  "id": "rollback-1771987102977",
  "timestamp": 1771987102977,
  "status": "created",
  "descript...

#### rollback-1771987402953.json
- 路径: skills\capability-evolver\data\rollback-points\rollback-1771987402953.json
- 大小: 2168 字节
- 行数: 89
- 预览: {
  "id": "rollback-1771987402953",
  "timestamp": 1771987402953,
  "status": "created",
  "descript...

#### rollback-1771987702994.json
- 路径: skills\capability-evolver\data\rollback-points\rollback-1771987702994.json
- 大小: 2168 字节
- 行数: 89
- 预览: {
  "id": "rollback-1771987702994",
  "timestamp": 1771987702994,
  "status": "created",
  "descript...

#### rollback-1771988002995.json
- 路径: skills\capability-evolver\data\rollback-points\rollback-1771988002995.json
- 大小: 2168 字节
- 行数: 89
- 预览: {
  "id": "rollback-1771988002995",
  "timestamp": 1771988002996,
  "status": "created",
  "descript...

#### rollback-1771988303005.json
- 路径: skills\capability-evolver\data\rollback-points\rollback-1771988303005.json
- 大小: 2168 字节
- 行数: 89
- 预览: {
  "id": "rollback-1771988303005",
  "timestamp": 1771988303005,
  "status": "created",
  "descript...

#### index.js
- 路径: skills\capability-evolver\index.js
- 大小: 6443 字节
- 行数: 260
- 预览: /**
 * capability-evolver 元技能入口
 * 负责管理能力进化的完整流程
 */

const fs = require('fs');
const path = require...

#### anti-degeneration-lock.js
- 路径: skills\capability-evolver\modules\anti-degeneration-lock.js
- 大小: 31119 字节
- 行数: 968
- 预览: /**
 * 反退化锁定机制
 * 防止系统能力退化，确保进化的实质性和稳定性
 * 为 PCEC 系统提供安全保障
 */

const fs = require('fs');
const path...

#### capability-conflict-resolution.js
- 路径: skills\capability-evolver\modules\capability-conflict-resolution.js
- 大小: 16026 字节
- 行数: 509
- 预览: /**
 * 能力冲突检测和解决机制
 * 确保新能力不破坏已验证稳定能力
 * 优先保留更通用、更稳健的能力
 */

const fs = require('fs');
const path = ...

#### hot-info-cache-integration.js
- 路径: skills\capability-evolver\modules\hot-info-cache-integration.js
- 大小: 15461 字节
- 行数: 528
- 预览: /**
 * 热信息缓存集成模块
 * 从其他智能体获取进化灵感
 * 实现智能体间信息交换和热点信息处理
 */

const fs = require('fs');
const path = re...

#### pcec-monitoring-system.js
- 路径: skills\capability-evolver\modules\pcec-monitoring-system.js
- 大小: 25380 字节
- 行数: 837
- 预览: /**
 * PCEC 监控系统
 * 跟踪进化进度和效果
 * 实现进化指标收集、实时监控和异常检测
 */

const fs = require('fs');
const path = requ...

#### SKILL.md
- 路径: skills\evomap-asset-management\SKILL.md
- 大小: 2468 字节
- 行数: 149
- 预览: ---
name: "evomap-asset-management"
description: "EvoMap 资产管理 SKILL，用于连接 EvoMap 获取和应用 Gene（基因）和 Caps...

#### SKILL.md
- 路径: skills\green-tea-startup-troubleshooting\SKILL.md
- 大小: 3165 字节
- 行数: 159
- 预览: # 绿茶智能体启动故障排除指南

## 技能信息
- **技能名称**: green-tea-startup-troubleshooting
- **版本**: 1.0.0
- **作者**: 系统管...

#### _meta.json
- 路径: skills\green-tea-startup-troubleshooting\_meta.json
- 大小: 577 字节
- 行数: 26
- 预览: {
  "name": "green-tea-startup-troubleshooting",
  "version": "1.0.0",
  "description": "绿茶智能体启动故障排除...

#### SKILL.md
- 路径: skills\seanphan-agenticflow-skill\SKILL.md
- 大小: 3014 字节
- 行数: 74
- 预览: ---
name: agenticflow-skills
description: Comprehensive guide for building AI workflows, agents, and...

#### SKILL.md
- 路径: skills\security-auth\SKILL.md
- 大小: 1969 字节
- 行数: 133
- 预览: ---
name: "security-auth"
description: "权限配置与安全验证 SKILL，基于飞书 OpenID 的身份验证和权限管理"
author: "OpenClaw Te...

#### SKILL.md
- 路径: skills\tmux\SKILL.md
- 大小: 4106 字节
- 行数: 122
- 预览: ---
name: tmux
description: Remote-control tmux sessions for interactive CLIs by sending keystrokes ...

#### index.js
- 路径: skills\trea-model-proxy\index.js
- 大小: 5375 字节
- 行数: 231
- 预览: const { OpenClaw } = require('openclaw');

class TreaModelProxy {
  constructor() {
    this.name = ...

#### AGENTS.md
- 路径: Skill_Seekers\AGENTS.md
- 大小: 13021 字节
- 行数: 470
- 预览: # AGENTS.md - Skill Seekers

This file provides essential guidance for AI coding agents working wi...

#### CLAUDE.md
- 路径: Skill_Seekers\CLAUDE.md
- 大小: 51598 字节
- 行数: 1488
- 预览: # CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in...

#### CONTRIBUTING.md
- 路径: Skill_Seekers\CONTRIBUTING.md
- 大小: 12157 字节
- 行数: 489
- 预览: # Contributing to Skill Seeker

First off, thank you for considering contributing to Skill Seeker!...

#### BOOTSTRAP_SKILL.md
- 路径: Skill_Seekers\docs\features\BOOTSTRAP_SKILL.md
- 大小: 17626 字节
- 行数: 697
- 预览: # Bootstrap Skill - Self-Hosting (v2.7.0)

**Version:** 2.7.0
**Feature:** Bootstrap Skill (Dogfo...

#### ENHANCEMENT_MODES.md
- 路径: Skill_Seekers\docs\features\ENHANCEMENT_MODES.md
- 大小: 14353 字节
- 行数: 546
- 预览: # Enhancement Modes Guide

Complete guide to all LOCAL enhancement modes in Skill Seekers.

## O...

#### PDF_CHUNKING.md
- 路径: Skill_Seekers\docs\features\PDF_CHUNKING.md
- 大小: 13692 字节
- 行数: 522
- 预览: # PDF Page Detection and Chunking (Task B1.3)

**Status:** ✅ Completed
**Date:** October 21, 2025...

#### PDF_MCP_TOOL.md
- 路径: Skill_Seekers\docs\features\PDF_MCP_TOOL.md
- 大小: 10755 字节
- 行数: 438
- 预览: # PDF Scraping MCP Tool (Task B1.7)

**Status:** ✅ Completed
**Date:** October 21, 2025
**Task:*...

#### TEST_EXAMPLE_EXTRACTION.md
- 路径: Skill_Seekers\docs\features\TEST_EXAMPLE_EXTRACTION.md
- 大小: 11987 字节
- 行数: 506
- 预览: # Test Example Extraction (C3.2)

**Transform test files into documentation assets by extracting r...

#### HTTP_TRANSPORT.md
- 路径: Skill_Seekers\docs\guides\HTTP_TRANSPORT.md
- 大小: 7305 字节
- 行数: 310
- 预览: # HTTP Transport for FastMCP Server

The Skill Seeker MCP server now supports both **stdio** (defa...

#### MULTI_AGENT_SETUP.md
- 路径: Skill_Seekers\docs\guides\MULTI_AGENT_SETUP.md
- 大小: 15146 字节
- 行数: 644
- 预览: # Multi-Agent Auto-Configuration Guide

The Skill Seeker MCP server now supports automatic detecti...

#### SETUP_QUICK_REFERENCE.md
- 路径: Skill_Seekers\docs\guides\SETUP_QUICK_REFERENCE.md
- 大小: 7477 字节
- 行数: 321
- 预览: # Setup Quick Reference Card

## One-Command Setup

```bash
./setup_mcp.sh
```

## What Gets...

#### TESTING_GUIDE.md
- 路径: Skill_Seekers\docs\guides\TESTING_GUIDE.md
- 大小: 22682 字节
- 行数: 935
- 预览: # Testing Guide

**Version:** 2.7.0
**Last Updated:** 2026-01-18
**Test Count:** 1200+ tests
**...

#### GEMINI_INTEGRATION.md
- 路径: Skill_Seekers\docs\integrations\GEMINI_INTEGRATION.md
- 大小: 10030 字节
- 行数: 436
- 预览: # Google Gemini Integration Guide

Complete guide for creating and deploying skills to Google Gemi...

#### QUICK_REFERENCE.md
- 路径: Skill_Seekers\docs\QUICK_REFERENCE.md
- 大小: 9731 字节
- 行数: 421
- 预览: # Quick Reference - Skill Seekers Cheat Sheet

**Version:** 2.7.0 | **Quick Commands** | **One-Pag...

#### API_REFERENCE.md
- 路径: Skill_Seekers\docs\reference\API_REFERENCE.md
- 大小: 24414 字节
- 行数: 976
- 预览: # API Reference - Programmatic Usage

**Version:** 2.7.0
**Last Updated:** 2026-01-18
**Status:*...

#### CODE_QUALITY.md
- 路径: Skill_Seekers\docs\reference\CODE_QUALITY.md
- 大小: 17179 字节
- 行数: 824
- 预览: # Code Quality Standards

**Version:** 2.7.0
**Last Updated:** 2026-01-18
**Status:** ✅ Producti...

#### README.md
- 路径: Skill_Seekers\src\skill_seekers\mcp\README.md
- 大小: 18233 字节
- 行数: 638
- 预览: # Skill Seeker MCP Server

Model Context Protocol (MCP) server for Skill Seeker - enables Claude C...

#### superpowers.js
- 路径: Skill_Seekers\superpowers\.opencode\plugins\superpowers.js
- 大小: 3316 字节
- 行数: 96
- 预览: /**
 * Superpowers plugin for OpenCode.ai
 *
 * Injects superpowers bootstrap context via system pro...

#### 2025-11-22-opencode-support-design.md
- 路径: Skill_Seekers\superpowers\docs\plans\2025-11-22-opencode-support-design.md
- 大小: 8739 字节
- 行数: 295
- 预览: # OpenCode Support Design

**Date:** 2025-11-22
**Author:** Bot & Jesse
**Status:** Design Complete,...

#### 2025-11-22-opencode-support-implementation.md
- 路径: Skill_Seekers\superpowers\docs\plans\2025-11-22-opencode-support-implementation.md
- 大小: 27490 字节
- 行数: 1096
- 预览: # OpenCode Support Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:execut...

#### 2025-11-28-skills-improvements-from-user-feedback.md
- 路径: Skill_Seekers\superpowers\docs\plans\2025-11-28-skills-improvements-from-user-feedback.md
- 大小: 21017 字节
- 行数: 712
- 预览: # Skills Improvements from User Feedback

**Date:** 2025-11-28
**Status:** Draft
**Source:** Two Cla...

#### skills-core.js
- 路径: Skill_Seekers\superpowers\lib\skills-core.js
- 大小: 6461 字节
- 行数: 209
- 预览: import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Extr...

#### README.md
- 路径: Skill_Seekers\superpowers\README.md
- 大小: 6147 字节
- 行数: 149
- 预览: # Superpowers

Superpowers is a complete software development workflow for your coding agents, built...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\brainstorming\SKILL.md
- 大小: 2505 字节
- 行数: 55
- 预览: ---
name: brainstorming
description: "You MUST use this before any creative work - creating features...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\executing-plans\SKILL.md
- 大小: 2550 字节
- 行数: 85
- 预览: ---
name: executing-plans
description: Use when you have a written implementation plan to execute in...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\finishing-a-development-branch\SKILL.md
- 大小: 4230 字节
- 行数: 201
- 预览: ---
name: finishing-a-development-branch
description: Use when implementation is complete, all tests...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\subagent-driven-development\SKILL.md
- 大小: 9966 字节
- 行数: 243
- 预览: ---
name: subagent-driven-development
description: Use when executing implementation plans with inde...

#### CREATION-LOG.md
- 路径: Skill_Seekers\superpowers\skills\systematic-debugging\CREATION-LOG.md
- 大小: 4244 字节
- 行数: 120
- 预览: # Creation Log: Systematic Debugging Skill

Reference example of extracting, structuring, and bullet...

#### defense-in-depth.md
- 路径: Skill_Seekers\superpowers\skills\systematic-debugging\defense-in-depth.md
- 大小: 3648 字节
- 行数: 123
- 预览: # Defense-in-Depth Validation

## Overview

When you fix a bug caused by invalid data, adding valida...

#### root-cause-tracing.md
- 路径: Skill_Seekers\superpowers\skills\systematic-debugging\root-cause-tracing.md
- 大小: 5319 字节
- 行数: 170
- 预览: # Root Cause Tracing

## Overview

Bugs often manifest deep in the call stack (git init in wrong dir...

#### test-academic.md
- 路径: Skill_Seekers\superpowers\skills\systematic-debugging\test-academic.md
- 大小: 653 字节
- 行数: 15
- 预览: # Academic Test: Systematic Debugging Skill

You have access to the systematic debugging skill at sk...

#### test-pressure-1.md
- 路径: Skill_Seekers\superpowers\skills\systematic-debugging\test-pressure-1.md
- 大小: 1898 字节
- 行数: 59
- 预览: # Pressure Test 1: Emergency Production Fix

**IMPORTANT: This is a real scenario. You must choose a...

#### test-pressure-2.md
- 路径: Skill_Seekers\superpowers\skills\systematic-debugging\test-pressure-2.md
- 大小: 2283 字节
- 行数: 69
- 预览: # Pressure Test 2: Sunk Cost + Exhaustion

**IMPORTANT: This is a real scenario. You must choose and...

#### test-pressure-3.md
- 路径: Skill_Seekers\superpowers\skills\systematic-debugging\test-pressure-3.md
- 大小: 2692 字节
- 行数: 70
- 预览: # Pressure Test 3: Authority + Social Pressure

**IMPORTANT: This is a real scenario. You must choos...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\using-git-worktrees\SKILL.md
- 大小: 5633 字节
- 行数: 219
- 预览: ---
name: using-git-worktrees
description: Use when starting feature work that needs isolation from ...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\using-superpowers\SKILL.md
- 大小: 3788 字节
- 行数: 88
- 预览: ---
name: using-superpowers
description: Use when starting any conversation - establishes how to fin...

#### CLAUDE_MD_TESTING.md
- 路径: Skill_Seekers\superpowers\skills\writing-skills\examples\CLAUDE_MD_TESTING.md
- 大小: 5423 字节
- 行数: 190
- 预览: # Testing CLAUDE.md Skills Documentation

Testing different documentation variants to find what actu...

#### render-graphs.js
- 路径: Skill_Seekers\superpowers\skills\writing-skills\render-graphs.js
- 大小: 4857 字节
- 行数: 169
- 预览: #!/usr/bin/env node

/**
 * Render graphviz diagrams from a skill's SKILL.md to SVG files.
 *
 * Usa...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\writing-skills\SKILL.md
- 大小: 22379 字节
- 行数: 656
- 预览: ---
name: writing-skills
description: Use when creating new skills, editing existing skills, or veri...

#### testing-skills-with-subagents.md
- 路径: Skill_Seekers\superpowers\skills\writing-skills\testing-skills-with-subagents.md
- 大小: 12532 字节
- 行数: 385
- 预览: # Testing Skills With Subagents

**Load this reference when:** creating or editing skills, before de...

#### README.md
- 路径: Skill_Seekers\ui-ux-pro-max-skill\README.md
- 大小: 23137 字节
- 行数: 496
- 预览: # [UI UX Pro Max](https://uupm.cc)
 
<p align="center">
  <a href="https://github.com/nextlevelbu...

#### start-auto.js
- 路径: start-auto.js
- 大小: 2101 字节
- 行数: 73
- 预览: const { detectScene } = require('./scene-detector');
const path = require('path');
const { exec } = ...

#### start-brain-agent.js
- 路径: start-brain-agent.js
- 大小: 900 字节
- 行数: 39
- 预览: // 启动公司大脑智能体脚本

const { OpenClaw } = require('openclaw');

console.log('🚀 启动公司大脑智能体...');

// 初始化公司...

#### start-business-agent.js
- 路径: start-business-agent.js
- 大小: 1731 字节
- 行数: 74
- 预览: // 启动谛听智能体脚本

const { OpenClaw } = require('openclaw');
const fs = require('fs');

console.log('🚀 启...

#### start-company-brain-integration.js
- 路径: start-company-brain-integration.js
- 大小: 6987 字节
- 行数: 273
- 预览: #!/usr/bin/env node

// 公司大脑集成脚本
// 用于启动公司大脑系统并与现有的智能体系统集成
// 执行时间: 系统启动时

const CompanyBrain = requ...

#### start-coo-agent.js
- 路径: start-coo-agent.js
- 大小: 1138 字节
- 行数: 49
- 预览: /**
 * 启动COO智能体（@大掌柜）
 * 用于单独启动COO智能体，确保其正常运行
 */

const { execSync } = require('child_process');
co...

#### start-coo.js
- 路径: start-coo.js
- 大小: 1555 字节
- 行数: 70
- 预览: // 启动 COO 智能体脚本

const fs = require('fs');
const { exec } = require('child_process');

console.log('...

#### start-diting-agent.js
- 路径: start-diting-agent.js
- 大小: 3762 字节
- 行数: 128
- 预览: const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = ...

#### start-green-tea-cli.js
- 路径: start-green-tea-cli.js
- 大小: 912 字节
- 行数: 42
- 预览: #!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

cons...

#### start-green-tea-direct.js
- 路径: start-green-tea-direct.js
- 大小: 5754 字节
- 行数: 181
- 预览: // 启动绿茶智能体的脚本
const fs = require('fs');
const path = require('path');

console.log('================...

#### start-green-tea.js
- 路径: start-green-tea.js
- 大小: 793 字节
- 行数: 25
- 预览: const { OpenClaw } = require('openclaw');

console.log('Starting OpenClaw with Green Tea agent...');...

#### start-master-agent.js
- 路径: start-master-agent.js
- 大小: 1153 字节
- 行数: 49
- 预览: /**
 * 启动大宗师智能体（@大掌柜）
 * 用于单独启动大宗师智能体，确保其正常运行
 */

const { execSync } = require('child_process');
co...

#### start-master.js
- 路径: start-master.js
- 大小: 834 字节
- 行数: 26
- 预览: const { OpenClaw } = require('openclaw');

console.log('Starting Grand Master Agent (大宗师智能体)...');
c...

#### start.js
- 路径: start.js
- 大小: 796 字节
- 行数: 26
- 预览: const { OpenClaw } = require('openclaw');

console.log('Starting OpenClaw for continuous development...

#### system-monitor.js
- 路径: system-monitor.js
- 大小: 13986 字节
- 行数: 516
- 预览: // 系统监控配置
// 负责监控系统健康状态并提供自动预警机制

const fs = require('fs');
const path = require('path');
const { ex...

#### Skill A｜BUG 定义与复现（Triage）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\备用版-拗口\Skill A｜BUG 定义与复现（Triage）.txt
- 大小: 1640 字节
- 行数: 73
- 预览: 

# Skill A｜BUG 定义与复现（Triage）
一句话定义
 把“别人说有问题/我觉得不对劲”变成一份能交给任何人开工的材料： 可复现、可验收、边界清晰、证据齐全、已止损（如需要）...

#### Skill D｜执行与复验（Execute & Verify）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\备用版-拗口\Skill D｜执行与复验（Execute & Verify）.txt
- 大小: 1859 字节
- 行数: 94
- 预览: 
          
          
# Skill D｜执行与复验（Execute & Verify）

**一句话定义**  
把你在 Skill C 选定的方案，变成一份“只...

#### rollback-1771940564856.json
- 路径: test\anti-degeneration-lock\rollback-points\rollback-1771940564856.json
- 大小: 2221 字节
- 行数: 93
- 预览: {
  "id": "rollback-1771940564856",
  "timestamp": 1771940564856,
  "status": "used",
  "description...

#### rollback-1771940640986.json
- 路径: test\anti-degeneration-lock\rollback-points\rollback-1771940640986.json
- 大小: 2220 字节
- 行数: 93
- 预览: {
  "id": "rollback-1771940640986",
  "timestamp": 1771940640986,
  "status": "used",
  "description...

#### rollback-1771940695622.json
- 路径: test\anti-degeneration-lock\rollback-points\rollback-1771940695622.json
- 大小: 2221 字节
- 行数: 93
- 预览: {
  "id": "rollback-1771940695622",
  "timestamp": 1771940695622,
  "status": "used",
  "description...

#### test-binding-skill.js
- 路径: test-binding-skill.js
- 大小: 1888 字节
- 行数: 58
- 预览: /**
 * Test script for EvoMap Binding SKILL
 * No external dependencies required
 */

const { bindTo...

#### test-company-brain-integration.js
- 路径: test-company-brain-integration.js
- 大小: 14382 字节
- 行数: 530
- 预览: #!/usr/bin/env node

// 公司大脑集成测试脚本
// 用于测试整个系统的运行情况，优化系统性能，修复发现的问题
// 执行时间: 系统部署前，定期维护时

const Compa...

#### test-comprehensive.js
- 路径: test-comprehensive.js
- 大小: 9609 字节
- 行数: 314
- 预览: /**
 * 综合测试脚本
 * 验证OpenClaw系统的整合效果，包括能力树、各分支工具和VFM Protocol
 */

const { capabilityTree } = require(...

#### test-evolution-product.js
- 路径: test-evolution-product.js
- 大小: 1537 字节
- 行数: 46
- 预览: // Test evolution product generation functionality
const fs = require('fs');
const path = require('p...

#### test-evolution-queue.js
- 路径: test-evolution-queue.js
- 大小: 3846 字节
- 行数: 140
- 预览: /**
 * 进化队列管理器测试
 * 测试新VFM协议下的进化队列管理功能
 */

const { evolutionQueueManager } = require('./capabilitie...

#### test-fixed-green-tea-commands.js
- 路径: test-fixed-green-tea-commands.js
- 大小: 2290 字节
- 行数: 88
- 预览: // 测试修复后的绿茶智能体命令解析
const http = require('http');

console.log('=====================================...

#### test-gateway-core.js
- 路径: test-gateway-core.js
- 大小: 2591 字节
- 行数: 107
- 预览: const express = require('express');
const cors = require('cors');
const fs = require('fs');
const pa...

#### test-life-agent-data-collection.js
- 路径: test-life-agent-data-collection.js
- 大小: 14326 字节
- 行数: 494
- 预览: // 人生决策宗师数据收集系统测试
const fs = require('fs');
const path = require('path');
const { lifeDecisionMaster...

#### test-life-agent-performance.js
- 路径: test-life-agent-performance.js
- 大小: 10572 字节
- 行数: 360
- 预览: // 人生决策宗师系统性能测试
const fs = require('fs');
const path = require('path');
const { performance } = requ...

#### test-publish.js
- 路径: test-publish.js
- 大小: 1519 字节
- 行数: 52
- 预览: const axios = require('axios');
const fs = require('fs');

async function testPublish() {
  console....

#### company-brain-test-summary-2026-02-23T09-32-51-844Z.md
- 路径: test-reports\company-brain-test-summary-2026-02-23T09-32-51-844Z.md
- 大小: 486 字节
- 行数: 31
- 预览: # 公司大脑测试报告摘要

## 测试概览
- **测试时间**: 2026-02-23T09:32:51.826Z
- **测试持续时间**: 60000毫秒
- **总测试数**: 15
- **...

#### company-brain-test-summary-2026-02-23T09-35-12-414Z.md
- 路径: test-reports\company-brain-test-summary-2026-02-23T09-35-12-414Z.md
- 大小: 486 字节
- 行数: 31
- 预览: # 公司大脑测试报告摘要

## 测试概览
- **测试时间**: 2026-02-23T09:35:12.340Z
- **测试持续时间**: 60000毫秒
- **总测试数**: 15
- **...

#### test-rollback-mechanism.js
- 路径: test-rollback-mechanism.js
- 大小: 4072 字节
- 行数: 153
- 预览: #!/usr/bin/env node

/**
 * 回滚机制完整性测试脚本
 * 测试反进化锁定的回滚机制是否能够正确工作
 */

const fs = require('fs');
const...

#### test-scene-detector.js
- 路径: test-scene-detector.js
- 大小: 1366 字节
- 行数: 54
- 预览: const { detectScene } = require('./scene-detector');

// 测试默认场景
console.log('=== 测试默认场景 ===');
try {...

#### test-stability-priority.js
- 路径: test-stability-priority.js
- 大小: 4231 字节
- 行数: 154
- 预览: #!/usr/bin/env node

/**
 * 稳定性优先原则测试脚本
 * 测试反进化锁定是否正确实施稳定性优先原则
 */

const fs = require('fs');
const...

#### test-value-function-integration.js
- 路径: test-value-function-integration.js
- 大小: 6818 字节
- 行数: 236
- 预览: /**
 * 价值函数集成测试
 * 测试价值函数核心模块和进化队列管理器的功能
 */

const { valueFunction } = require('./capabilities/valu...

#### test-vfm-enhanced.js
- 路径: test-vfm-enhanced.js
- 大小: 8275 字节
- 行数: 281
- 预览: // VFM评估模块增强测试

const { vfmEvaluator } = require('./skills/vfm-evaluator');

console.log('=== VFM评估模...

#### test-vfm-integration.js
- 路径: test-vfm-integration.js
- 大小: 8045 字节
- 行数: 280
- 预览: /**
 * 新VFM协议集成测试
 * 测试价值函数突变系统与进化队列管理的集成
 */

const { valueFunction } = require('./capabilities/val...

#### capability-tree-manager.js
- 路径: tools\capability-tree-manager.js
- 大小: 13071 字节
- 行数: 460
- 预览: /**
 * 能力树管理工具 (Capability Tree Manager)
 * 用于管理能力树的创建、编辑、删除、可视化和导入/导出
 */

const fs = require('fs')...

#### git-integration.js
- 路径: tools\git-integration.js
- 大小: 14055 字节
- 行数: 544
- 预览: const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process'...

#### trea-proxy-server.js
- 路径: trea-proxy-server.js
- 大小: 2166 字节
- 行数: 81
- 预览: const http = require('http');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  if ...

#### try-claim-task.js
- 路径: try-claim-task.js
- 大小: 4282 字节
- 行数: 179
- 预览: // 尝试使用不同API格式认领EvoMap任务
const fs = require('fs');
const path = require('path');
const https = requi...

#### WECHAT_SETUP_GUIDE.md
- 路径: WECHAT_SETUP_GUIDE.md
- 大小: 6004 字节
- 行数: 391
- 预览: # 微信登录与朋友圈发布完整指南

本指南详细介绍如何设置微信登录系统并发布朋友圈内容，为大宗师创建完整的微信自动化管理流程。

## 📋 系统架构

```
┌─────────────────┐...

#### SKILL.md
- 路径: 产出\SKILL.md
- 大小: 5246 字节
- 行数: 146
- 预览: ---
name: brain-cheat-tool
description: 大脑作弊器 - 快速拆解书籍核心内容并生成可视化素材。当用户提供书籍文本、章节内容、文档文件或需要制作知识推广素材时使用...

#### 渊海子平-现代决策应用-补充阅读.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\references\渊海子平-现代决策应用-补充阅读.md
- 大小: 6508 字节
- 行数: 791
- 预览: # 渊海子平 - 现代决策解读

## 目录

- [核心概念转化](#核心概念转化)
- [十神性格分析](#十神性格分析)
- [格局与职业规划](#格局与职业规划)
- [五行与行为模式](#五...

#### ppt-structure-template.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\ppt-structure-template.md
- 大小: 7375 字节
- 行数: 591
- 预览: # PPT结构模板（参考《属地分析与建议（广州）.ppt》）

## 模板说明
本模板基于《属地分析与建议（广州）.ppt》设计，用于生成简化版PPT。PPT是投资分析报告的精简版，突出核心观点和关键...

#### SKILL.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\SKILL.md
- 大小: 7930 字节
- 行数: 422
- 预览: ---
name: hotel-investment-analysis
description: 生成城市酒店投资分析报告及HTML格式展示页面，支持一线城市（北上广深）和新一线+二三线城市两类模板，...

#### multi-role-scenarios.md
- 路径: 声音魔法\projects\voice-magician\references\multi-role-scenarios.md
- 大小: 16623 字节
- 行数: 734
- 预览: # 多人配音场景指南

## 目录
- [场景一：小说群像配音](#场景一小说群像配音)
- [场景二：播客对话配音](#场景二播客对话配音)
- [场景三：视频剧配音](#场景三视频剧配音)
- [...

#### SKILL.md
- 路径: 声音魔法\projects\voice-magician\SKILL.md
- 大小: 6902 字节
- 行数: 287
- 预览: ---
name: voice-magician
description: 让文字会说话的神奇工具！支持16种语言的文本转语音，轻松生成高质量音频；适用于视频配音、有声读物、语音辅助等场景
depen...

#### 413-error-diagnosis.md
- 路径: 大脑作弊器\projects\docs\413-error-diagnosis.md
- 大小: 1755 字节
- 行数: 103
- 预览: # 413错误诊断指南

## 重要说明

**文件大小限制（适配外网平台）：**
- **文件上传（PDF/EPUB/TXT）**：最大 10MB
- **单张图片**：最大 2MB
- **所有图...

#### PDF上传接口调试清单-完成报告.md
- 路径: 大脑作弊器\projects\PDF上传接口调试清单-完成报告.md
- 大小: 2408 字节
- 行数: 155
- 预览: # PDF上传接口调试清单 - 完成报告

## ✅ 已完成的检查项

### 1. 核心配置正确性检查
- [x] **请求方法**: 使用 `POST` ✓
- [x] **Content-Typ...

#### debug-upload.js
- 路径: 大脑作弊器\projects\public\debug-upload.js
- 大小: 2590 字节
- 行数: 74
- 预览: // 调试脚本：检查上传环境和文件信息
function debugUpload() {
    console.log('=== 上传调试信息 ===');

    // 检查浏览器信息
    ...

#### scripts.js
- 路径: 大脑作弊器\projects\public\scripts.js
- 大小: 17888 字节
- 行数: 557
- 预览: // ==================== 脚本管理功能 ====================

// 全局变量
let currentUser = null;
let currentScri...

#### MANIFEST.txt
- 路径: 大脑作弊器\projects\tmp\brain-cheater-v1.0-backup\MANIFEST.txt
- 大小: 1518 字节
- 行数: 76
- 预览: 大脑作弊器 v1.0 正式版备份清单
备份时间: 2026-01-21 21:25:00
备份目录: /tmp/brain-cheater-v1.0-backup

=== 文件清单 ===

1. ...

#### test-image-upload.js
- 路径: 大脑作弊器\projects\tmp\test-image-upload.js
- 大小: 1300 字节
- 行数: 64
- 预览: #!/usr/bin/env node

const fs = require('fs');
const http = require('http');

// 创建一个简单的测试图片（1x1 像素的...

#### test-pdftotext.js
- 路径: 大脑作弊器\projects\tmp\test-pdftotext.js
- 大小: 437 字节
- 行数: 20
- 预览: const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require...

#### test-upload.js
- 路径: 大脑作弊器\projects\tmp\test-upload.js
- 大小: 1212 字节
- 行数: 61
- 预览: #!/usr/bin/env node

const fs = require('fs');
const http = require('http');

// 读取测试文件
const testFi...

#### 数据库接入-精简版执行计划.md
- 路径: 大脑作弊器\projects\数据库接入-精简版执行计划.md
- 大小: 3608 字节
- 行数: 256
- 预览: # 数据库接入 - 精简版执行计划（已完成）

## ✅ 已完成的工作

### 阶段 1: 最小化登录功能（4 步，已完成）

#### 1. 数据库表结构 ✅
- 创建 `users` 表（包含：...

### plan (224)

#### AGENTS.md
- 路径: .claude\skills\oh-my-opencode-dev\AGENTS.md
- 大小: 5836 字节
- 行数: 156
- 预览: # PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-26T14:50:00+09:00
**Commit:** 9d66b807
**Branch:** ...

#### oh-my-opencode.schema.json
- 路径: .claude\skills\oh-my-opencode-dev\assets\oh-my-opencode.schema.json
- 大小: 73977 字节
- 行数: 2857
- 预览: {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://raw.githubusercontent.co...

#### ultrawork-manifesto.md
- 路径: .claude\skills\oh-my-opencode-dev\docs\ultrawork-manifesto.md
- 大小: 6174 字节
- 行数: 198
- 预览: # Manifesto

The principles and philosophy behind Oh My OpenCode.

---

## Human Intervention is a F...

#### README.ja.md
- 路径: .claude\skills\oh-my-opencode-dev\README.ja.md
- 大小: 15111 字节
- 行数: 373
- 预览: > [!WARNING]
> **セキュリティ警告：なりすましサイト**
>
> **ohmyopencode.comは本プロジェクトとは一切関係ありません。** 当方はそのサイトを運営しておらず、推...

#### AGENTS.md
- 路径: .claude\skills\oh-my-opencode-dev\src\agents\AGENTS.md
- 大小: 3177 字节
- 行数: 65
- 预览: # AGENTS KNOWLEDGE BASE

## OVERVIEW
10 AI agents for multi-model orchestration. Sisyphus (primary),...

#### SKILL.md
- 路径: .claude\skills\oh-my-opencode-dev\src\features\builtin-skills\git-master\SKILL.md
- 大小: 28272 字节
- 行数: 1106
- 预览: ---
name: git-master
description: "MUST USE for ANY git operations. Atomic commits, rebase/squash, h...

#### AGENTS.md
- 路径: .claude\skills\oh-my-opencode-dev\src\hooks\AGENTS.md
- 大小: 4204 字节
- 行数: 87
- 预览: # HOOKS KNOWLEDGE BASE

## OVERVIEW
32 lifecycle hooks intercepting/modifying agent behavior. Events...

#### plugin-endpoints.md
- 路径: .claude\skills\openwork-dev\packages\app\pr\plugin-endpoints.md
- 大小: 2822 字节
- 行数: 97
- 预览: ---
title: Plugin config via API
description: Use /config for short-term plugin listing and add
---
...

#### PRINCIPLES.md
- 路径: .claude\skills\openwork-dev\PRINCIPLES.md
- 大小: 1313 字节
- 行数: 29
- 预览: # OpenWork Principles

## Decision framework for adding new features or fixing bugs:

- is it easy t...

#### PRODUCT.md
- 路径: .claude\skills\openwork-dev\PRODUCT.md
- 大小: 6074 字节
- 行数: 248
- 预览: # OpenWork Product

## Target Users

> Bob the IT guy.
Bob might already use opencode, he can setup ...

#### adl-protocol-assessment-plan.md
- 路径: .trae\documents\adl-protocol-assessment-plan.md
- 大小: 4324 字节
- 行数: 193
- 预览: # ADL协议评估与整合计划

## 项目概述

评估现有反进化锁定(ADL)系统与用户提供的新ADL协议的符合度，并进行必要的更新和整合，确保ADL系统能够严格按照新协议运行。

## 任务分解与优...

#### adl-protocol-assessment-report.md
- 路径: .trae\documents\adl-protocol-assessment-report.md
- 大小: 2502 字节
- 行数: 113
- 预览: # ADL协议评估报告

## 评估目的
评估当前ADL (Anti-Degeneration Lock) 系统实现与新ADL协议的符合度，确保系统严格按照新协议运行，保证智能体只能向"工程上更可靠"...

#### anti-degeneration-lock_plan.md
- 路径: .trae\documents\anti-degeneration-lock_plan.md
- 大小: 4564 字节
- 行数: 222
- 预览: # 反进化锁定指令（Anti-Degeneration Lock） - 实现计划

## 项目背景
反进化锁定指令是一套约束机制，确保智能体只能向"工程上更可靠"的方向进化，防止出现劣化进化。该指令优...

#### feishu_agent_fix_plan.md
- 路径: .trae\documents\feishu_agent_fix_plan.md
- 大小: 3237 字节
- 行数: 159
- 预览: # 飞书机器人Anthropic API Key错误修复计划

## [x] 任务1: 验证当前认证配置文件

**完成情况**:
- 已检查认证配置文件内容
- 发现当前提供商为 "qwen-por...

#### feishu_autoconfig_plan.md
- 路径: .trae\documents\feishu_autoconfig_plan.md
- 大小: 2893 字节
- 行数: 141
- 预览: # 飞书通道自动配置计划

## [x] 任务1: 检查当前OpenClaw配置

**完成情况**:
- 已读取OpenClaw配置文件
- 发现飞书通道已配置但存在错误:
  - App ID错误...

#### Git SSH 密钥配置计划.md
- 路径: .trae\documents\Git SSH 密钥配置计划.md
- 大小: 583 字节
- 行数: 35
- 预览: # Git SSH 密钥配置计划

## 执行步骤

### 1. 检查本地现有密钥
- 查看 `.ssh` 目录是否存在
- 检查是否已有可用的 SSH 密钥对

### 2. 生成新的 SSH 密...

#### green-tea-evolution-fix-plan.md
- 路径: .trae\documents\green-tea-evolution-fix-plan.md
- 大小: 3347 字节
- 行数: 159
- 预览: # 绿茶智能体进化修复计划 (The Implementation Plan)

## [x] Task 1: 解决文件读取乱码问题

### 完成情况
- ✅ 文件编码格式已检查，使用 UTF-8 ...

#### green_tea_personality_plan.md
- 路径: .trae\documents\green_tea_personality_plan.md
- 大小: 586 字节
- 行数: 53
- 预览: # OpenClaw 插件安装错误解决方案

## 问题分析

当前系统遇到 `spawn EINVAL` 错误，这是由于 OpenClaw 在 Windows 环境下尝试调用系统级命令时的路径解析问...

#### master_agent_implementation_plan.md
- 路径: .trae\documents\master_agent_implementation_plan.md
- 大小: 2266 字节
- 行数: 121
- 预览: # 大宗师智能体实施计划 - 详细步骤分解

## [x] 任务 1: 检查智能体列表
- **优先级**: P0
- **依赖关系**: 无
- **描述**:
  - 运行命令检查当前已注册的智能...

#### OpenClaw 插件安装错误解决方案.md
- 路径: .trae\documents\OpenClaw 插件安装错误解决方案.md
- 大小: 567 字节
- 行数: 34
- 预览: # OpenClaw 插件安装错误解决方案

## 问题分析
当前系统遇到 `spawn EINVAL` 错误，这是由于 OpenClaw 在 Windows 环境下尝试调用系统级命令时的路径解析问题...

#### openclaw-skill-integration-plan.md
- 路径: .trae\documents\openclaw-skill-integration-plan.md
- 大小: 3558 字节
- 行数: 167
- 预览: # OpenClaw 技能集成计划 - 实施计划

## 问题描述

当前所有 27 个自定义技能都未集成到 OpenClaw+evo 中，尽管已经创建了完整的技能文件并尝试了多种集成方法。

## ...

#### openclaw_api_connection_plan.md
- 路径: .trae\documents\openclaw_api_connection_plan.md
- 大小: 1882 字节
- 行数: 103
- 预览: # OpenClaw API 连接解决方案 - 实现计划

## [/] 任务 1：分析当前状态
- **优先级**：P0
- **依赖**：无
- **描述**：
  - 检查当前 OpenClaw...

#### openclaw_master_agent_plan.md
- 路径: .trae\documents\openclaw_master_agent_plan.md
- 大小: 2063 字节
- 行数: 106
- 预览: # OpenClaw 大宗师智能体启动问题解决方案 - 实施计划

## [x] 任务 1: 运行诊断工具检查系统状态
- **优先级**: P0
- **依赖关系**: 无
- **描述**:
  ...

#### plan_20260202_185526.md
- 路径: .trae\documents\plan_20260202_185526.md
- 大小: 647 字节
- 行数: 35
- 预览: ## 架构调整计划

### 问题分析
当前架构中，后端API负责计算八字，但用户发现前端八字计算算法对四个内容（事业高升、财运亨通、贵人相助、桃花盛开）推算不准确。

### 解决方案
调整架构，让...

#### plan_20260203_031740.md
- 路径: .trae\documents\plan_20260203_031740.md
- 大小: 693 字节
- 行数: 35
- 预览: ## 修改计划

### 1. 更新后端服务配置
- 修改 `server.js` 文件中的 API 调用地址，使用用户提供的应用 ID
- 调整请求参数格式，符合用户提供的 API 调用格式
- 确...

#### plan_20260203_065945.md
- 路径: .trae\documents\plan_20260203_065945.md
- 大小: 499 字节
- 行数: 50
- 预览: ## 阿里云百炼API配置计划

### 步骤1：创建API配置文件

**文件**: `.env`

```
DASHSCOPE_API_KEY=sk-5b3ed10963f34b4aa7eca0e...

#### plan_20260203_091817.md
- 路径: .trae\documents\plan_20260203_091817.md
- 大小: 680 字节
- 行数: 37
- 预览: ## 问题分析

Vercel构建仍然失败，错误信息：`Command "npm run build" exited with 2`，同时出现`node-domexception`警告。

## 可能...

#### plan_20260203_093230.md
- 路径: .trae\documents\plan_20260203_093230.md
- 大小: 710 字节
- 行数: 34
- 预览: ## 问题分析

Vercel构建失败，错误信息：`[vite:build-html] Failed to resolve /src/main.tsx from /vercel/path0/index...

#### plan_20260204_020352.md
- 路径: .trae\documents\plan_20260204_020352.md
- 大小: 654 字节
- 行数: 29
- 预览: ## 问题分析

AWKN-LAB项目Vercel部署失败，错误信息：`[vite:build-html] Failed to resolve /src/main.tsx from /vercel/p...

#### plan_20260204_023716.md
- 路径: .trae\documents\plan_20260204_023716.md
- 大小: 687 字节
- 行数: 33
- 预览: ## 问题分析

life choice项目Vercel构建失败，错误信息：`[vite:build-html] Failed to resolve ./src/main.tsx from /verc...

#### plan_20260204_025235.md
- 路径: .trae\documents\plan_20260204_025235.md
- 大小: 689 字节
- 行数: 32
- 预览: ## 问题分析

life choice项目Vercel构建仍然失败，错误信息：`[vite:build-html] Failed to resolve ./src/main.tsx from /ve...

#### plan_20260222_043323.md
- 路径: .trae\documents\plan_20260222_043323.md
- 大小: 785 字节
- 行数: 45
- 预览: # Git SSH 密钥配置详细计划

## 执行步骤

### 1. 检查本地现有密钥
- 确认 `.ssh` 目录存在
- 检查是否已有密钥文件

### 2. 生成新的 SSH 密钥（非交互式）...

#### skill_installation_plan.md
- 路径: .trae\documents\skill_installation_plan.md
- 大小: 4658 字节
- 行数: 198
- 预览: # 大宗师SKILL安装计划

## 项目概述
为大宗师智能体安装一系列SKILL，涵盖内容创作、消息渠道、笔记与文档、开发工具、媒体与娱乐、安全与工具、网络与服务以及其他实用工具等多个类别。

##...

#### 修复Vercel构建失败问题.md
- 路径: .trae\documents\修复Vercel构建失败问题.md
- 大小: 758 字节
- 行数: 38
- 预览: ## 问题分析

Vercel构建失败，错误信息：`Command "npm run build" exited with 2`，同时出现警告：`npm warn deprecated node-do...

#### 手机端优化方案.md
- 路径: .trae\documents\手机端优化方案.md
- 大小: 397 字节
- 行数: 33
- 预览: ## 手机端文字排版优化计划

### 问题分析

用户反馈在手机端，"在不确定的世界里，为你交付一套确定的坐标系。"这段文字显示不够美观，希望能够变成两行显示并且居中。

### 解决方案

修改H...

#### rollback-points.json
- 路径: .trae\git\rollback-points.json
- 大小: 487 字节
- 行数: 18
- 预览: [
  {
    "id": "rollback_1771959266537",
    "commitHash": "9c44de39d899528385e132946a94948ef58080f...

#### 10-1771965622204.json
- 路径: .trae\pcec\history\10-1771965622204.json
- 大小: 1208 字节
- 行数: 47
- 预览: {
  "cycle": 10,
  "timestamp": "2026-02-24T20:40:22.186Z",
  "evolutionType": "newAbstract",
  "evo...

#### 1771965622201.json
- 路径: .trae\pcec\products\capability-shapes\1771965622201.json
- 大小: 214 字节
- 行数: 9
- 预览: {
  "type": "capabilityShape",
  "name": "资源管理能力",
  "input": "资源需求、系统状态、优先级信息",
  "output": "资源分配方案...

#### SKILL.md
- 路径: .trae\skills\12-principles-of-animation\SKILL.md
- 大小: 2353 字节
- 行数: 59
- 预览: ---
name: 12-principles-of-animation
description: Provides guidance on the 12 principles of animat...

#### title-formulas.md
- 路径: .trae\skills\baokuan\assets\title-formulas.md
- 大小: 3185 字节
- 行数: 293
- 预览: # 标题公式详解

## 目录
- [公式概览](#公式概览)
- [时间反差型](#时间反差型)
- [身份锁定型](#身份锁定型)
- [反常识型](#反常识型)
- [技能价值型](#技能价值型...

#### chalkboard.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\chalkboard.md
- 大小: 1772 字节
- 行数: 59
- 预览: # chalkboard

Classic classroom chalkboard style for educational content

## Design Aesthetic

Class...

#### minimal.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\minimal.md
- 大小: 1607 字节
- 行数: 59
- 预览: # minimal

Ultra-clean, zen-like illustration style for focused content

## Design Aesthetic

Maximu...

#### nature.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\nature.md
- 大小: 1703 字节
- 行数: 59
- 预览: # nature

Organic, earthy illustration style for environmental and wellness content

## Design Aesth...

#### notion.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\notion.md
- 大小: 1636 字节
- 行数: 59
- 预览: # notion

Minimalist hand-drawn line art style for knowledge content (Default)

## Design Aesthetic
...

#### playful.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\playful.md
- 大小: 1707 字节
- 行数: 60
- 预览: # playful

Fun, creative illustration style for casual and educational content

## Design Aesthetic
...

#### base-prompt.md
- 路径: .trae\skills\baokuan\awkn-comic\references\base-prompt.md
- 大小: 3124 字节
- 行数: 99
- 预览: Create a knowledge biography comic page following these guidelines:

## Image Specifications

- **Ty...

#### webtoon.md
- 路径: .trae\skills\baokuan\awkn-comic\references\layouts\webtoon.md
- 大小: 768 字节
- 行数: 31
- 预览: # webtoon

Vertical scrolling comic (竖版条漫)

## Panel Structure

- **Panels per page**: 3-5 verticall...

#### vibrant.md
- 路径: .trae\skills\baokuan\awkn-comic\references\styles\vibrant.md
- 大小: 675 字节
- 行数: 35
- 预览: # vibrant

Energetic, engaging, educational

## Style Guidelines

### Line Work
- 2-2.5px, expressiv...

#### example-awakening.md
- 路径: .trae\skills\baokuan\awkn-content-decomposition\references\example-awakening.md
- 大小: 8715 字节
- 行数: 587
- 预览: # 《认知觉醒》完整拆解示例

以下是根据"详细拆解标准"完成的完整示例，展示了从核心框架到12个章节的全面拆解，每个章节都包含底层逻辑、方法论、实践建议和案例。

---

## 一、核心框架

-...

#### balanced.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\layouts\balanced.md
- 大小: 433 字节
- 行数: 31
- 预览: # balanced

Standard content layout

## Information Density

- 3-4 key points per image
- Whitespace...

#### fresh.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\styles\fresh.md
- 大小: 469 字节
- 行数: 24
- 预览: # fresh

Clean, refreshing, natural

## Color Palette

- Primary: Mint green (#9AE6B4), sky blue (#9...

#### notion.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\styles\notion.md
- 大小: 566 字节
- 行数: 24
- 预览: # notion

Minimalist hand-drawn line art, intellectual

## Color Palette

- Primary: Black (#1A1A1A)...

#### SKILL.md
- 路径: .trae\skills\canvas-design\SKILL.md
- 大小: 11937 字节
- 行数: 130
- 预览: ---
name: canvas-design
description: Create beautiful visual art in .png and .pdf documents using de...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\role\README.md
- 大小: 1100 字节
- 行数: 27
- 预览: 用于让Bot扮演指定角色的聊天插件，触发方法如下：

- `$角色/$role help/帮助` - 打印目前支持的角色列表。
- `$角色/$role <角色名>` - 让AI扮演该角色，角色名支持...

#### docs.json
- 路径: .trae\skills\cline-main\docs\docs.json
- 大小: 11944 字节
- 行数: 433
- 预览: {
	"$schema": "https://mintlify.com/docs.json",
	"theme": "linden",
	"name": "Cline",
	"description"...

#### CONTRIBUTING.md
- 路径: .trae\skills\cline-main\locales\de\CONTRIBUTING.md
- 大小: 5181 字节
- 行数: 83
- 预览: # Beitrag zu Cline

Wir freuen uns, dass du daran interessiert bist, zu Cline beizutragen. Ob du ein...

#### CONTRIBUTING.md
- 路径: .trae\skills\cline-main\locales\es\CONTRIBUTING.md
- 大小: 5029 字节
- 行数: 83
- 预览: # Contribuir a Cline

Nos alegra que estés interesado en contribuir a Cline. Ya sea que corrijas un ...

#### README.md
- 路径: .trae\skills\cline-main\locales\es\README.md
- 大小: 12658 字节
- 行数: 162
- 预览: # Cline

<p align="center">
        <img src="https://media.githubusercontent.com/media/cline/cline/...

#### CONTRIBUTING.md
- 路径: .trae\skills\cline-main\locales\pt-BR\CONTRIBUTING.md
- 大小: 5090 字节
- 行数: 84
- 预览: # Contribuir para o Cline

Estamos felizes por você estar interessado em contribuir com o Cline. Sej...

#### CONTRIBUTING.md
- 路径: .trae\skills\cline-main\locales\zh-cn\CONTRIBUTING.md
- 大小: 2197 字节
- 行数: 83
- 预览: # 贡献到 Cline

我们很高兴您有兴趣为 Cline 做出贡献。无论您是修复错误、添加功能还是改进我们的文档，每一份贡献都让 Cline 更加智能！为了保持我们的社区充满活力和欢迎，所有成员必须...

#### package.json
- 路径: .trae\skills\cline-main\package.json
- 大小: 18951 字节
- 行数: 635
- 预览: {
	"name": "claude-dev",
	"displayName": "Cline",
	"description": "Autonomous coding agent right in ...

#### README.md
- 路径: .trae\skills\cline-main\src\core\prompts\system-prompt\tools\README.md
- 大小: 3158 字节
- 行数: 112
- 预览: # Tool Registration System

This directory contains the tool registration system for Cline tools. Th...

#### section-title-comparison.json
- 路径: .trae\skills\cline-main\src\core\prompts\system-prompt\__tests__\__snapshots__\section-title-comparison.json
- 大小: 5447 字节
- 行数: 222
- 预览: {
	"oldNextGenTitles": [
		"TOOL USE",
		"Tool Use Formatting",
		"Tools",
		"execute_command",
		"r...

#### README.md
- 路径: .trae\skills\cline-main\src\test\e2e\README.md
- 大小: 7591 字节
- 行数: 262
- 预览: # E2E Tests

This directory contains the end-to-end tests for the Cline VS Code extension using Play...

#### grpc_recorded_session_single_root.json
- 路径: .trae\skills\cline-main\tests\specs\grpc_recorded_session_single_root.json
- 大小: 7089 字节
- 行数: 97
- 预览: {
	"startTime": "2025-09-22T15:10:39.693Z",
	"entries": [
		{
			"requestId": "6e4460e9-e701-4bd2-ba...

#### step1.md
- 路径: .trae\skills\cline-main\walkthrough\step1.md
- 大小: 452 字节
- 行数: 7
- 预览: # Beyond Autocomplete: True Agentic Planning

**Cline analyzes your request, explores your code, and...

#### RICH_MCP_TESTING.md
- 路径: .trae\skills\cline-main\webview-ui\src\components\mcp\RICH_MCP_TESTING.md
- 大小: 24722 字节
- 行数: 684
- 预览: # How To Test Rich MCP Responses

Use the `echo` MCP server to read back one of the test cases below...

#### platform-configs.json
- 路径: .trae\skills\cline-main\webview-ui\src\config\platform-configs.json
- 大小: 365 字节
- 行数: 17
- 预览: {
	"vscode": {
		"messageEncoding": "none",
		"showNavbar": false,
		"postMessageHandler": "vscode",...

#### base-prompt.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\base-prompt.md
- 大小: 3106 字节
- 行数: 100
- 预览: # 漫画页面基础提示词模板

Create a knowledge biography comic page following these guidelines:

## Image Specifi...

#### SKILL.md
- 路径: .trae\skills\skills\skills\canvas-design\SKILL.md
- 大小: 12066 字节
- 行数: 130
- 预览: ---
name: canvas-design
description: Create beautiful visual art in .png and .pdf documents using ...

#### 3p-updates.md
- 路径: .trae\skills\skills\skills\internal-comms\examples\3p-updates.md
- 大小: 3320 字节
- 行数: 47
- 预览: ## Instructions
You are being asked to write a 3P update. 3P updates stand for "Progress, Plans, Pr...

#### company-newsletter.md
- 路径: .trae\skills\skills\skills\internal-comms\examples\company-newsletter.md
- 大小: 3360 字节
- 行数: 66
- 预览: ## Instructions
You are being asked to write a company-wide newsletter update. You are meant to sum...

#### SKILL.md
- 路径: .trae\skills\skills\skills\internal-comms\SKILL.md
- 大小: 1543 字节
- 行数: 33
- 预览: ---
name: internal-comms
description: A set of resources to help me write all kinds of internal co...

#### output-patterns.md
- 路径: .trae\skills\skills\skills\skill-creator\references\output-patterns.md
- 大小: 1895 字节
- 行数: 83
- 预览: # Output Patterns

Use these patterns when skills need to produce consistent, high-quality output....

#### desert-rose.md
- 路径: .trae\skills\skills\skills\theme-factory\themes\desert-rose.md
- 大小: 515 字节
- 行数: 20
- 预览: # Desert Rose

A soft and sophisticated theme with dusty, muted tones perfect for elegant presenta...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\canvas-design\SKILL.md
- 大小: 11937 字节
- 行数: 130
- 预览: ---
name: canvas-design
description: Create beautiful visual art in .png and .pdf documents using de...

#### 3p-updates.md
- 路径: .trae\skills\skills-main\skills\internal-comms\examples\3p-updates.md
- 大小: 3274 字节
- 行数: 47
- 预览: ## Instructions
You are being asked to write a 3P update. 3P updates stand for "Progress, Plans, Pro...

#### company-newsletter.md
- 路径: .trae\skills\skills-main\skills\internal-comms\examples\company-newsletter.md
- 大小: 3295 字节
- 行数: 66
- 预览: ## Instructions
You are being asked to write a company-wide newsletter update. You are meant to summ...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\internal-comms\SKILL.md
- 大小: 1511 字节
- 行数: 33
- 预览: ---
name: internal-comms
description: A set of resources to help me write all kinds of internal comm...

#### output-patterns.md
- 路径: .trae\skills\skills-main\skills\skill-creator\references\output-patterns.md
- 大小: 1813 字节
- 行数: 83
- 预览: # Output Patterns

Use these patterns when skills need to produce consistent, high-quality output.

...

#### desert-rose.md
- 路径: .trae\skills\skills-main\skills\theme-factory\themes\desert-rose.md
- 大小: 496 字节
- 行数: 20
- 预览: # Desert Rose

A soft and sophisticated theme with dusty, muted tones perfect for elegant presentati...

#### desert-rose.md
- 路径: .trae\skills\theme-factory\themes\desert-rose.md
- 大小: 496 字节
- 行数: 20
- 预览: # Desert Rose

A soft and sophisticated theme with dusty, muted tones perfect for elegant presentati...

#### SKILL.md
- 路径: .trae\skills\ui-ux-pro-max-skill\.claude\skills\ui-ux-pro-max\SKILL.md
- 大小: 14760 字节
- 行数: 387
- 预览: ---
name: ui-ux-pro-max
description: "UI/UX design intelligence. 50 styles, 21 palettes, 50 font p...

#### plugin.json
- 路径: .trae\skills\ui-ux-pro-max-skill\.claude-plugin\plugin.json
- 大小: 1128 字节
- 行数: 12
- 预览: {
  "name": "ui-ux-pro-max",
  "description": "UI/UX design intelligence. 50 styles, 21 palettes, ...

#### claude.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\claude.json
- 大小: 1552 字节
- 行数: 22
- 预览: {
  "platform": "claude",
  "displayName": "Claude Code",
  "installType": "full",
  "folderStru...

#### claude.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\claude.json
- 大小: 1552 字节
- 行数: 22
- 预览: {
  "platform": "claude",
  "displayName": "Claude Code",
  "installType": "full",
  "folderStru...

#### 8-hour-evolution-summary.md
- 路径: 8-hour-evolution-summary.md
- 大小: 3224 字节
- 行数: 181
- 预览: # 8小时不间断进化计划执行报告

## 执行时间
- 开始时间: 2023-10-25
- 完成时间: 2023-10-25
- 总执行时长: 8小时

## 执行摘要
本次8小时不间断进化计划已成...

#### config.json
- 路径: agents\business\config.json
- 大小: 8160 字节
- 行数: 367
- 预览: {
  "agent": {
    "type": "business",
    "autoRun": true
  },
  "company_context": {
    "name": "...

#### config.json
- 路径: agents\content\config.json
- 大小: 2203 字节
- 行数: 96
- 预览: {
  "agent": {
    "name": "Content",
    "role": "Content Creator",
    "description": "AWKN LAB | ...

#### config.json
- 路径: agents\green-tea\config.json
- 大小: 2907 字节
- 行数: 124
- 预览: {
  "model": {
    "provider": "trea",
    "useInternalModel": true,
    "optimization": {
      "en...

#### models.json
- 路径: agents\green-tea\models.json
- 大小: 5744 字节
- 行数: 240
- 预览: {
  "providers": {
    "qwen-portal": {
      "baseUrl": "https://portal.qwen.ai/v1",
      "api": "...

#### config.json
- 路径: agents\life\config.json
- 大小: 7041 字节
- 行数: 313
- 预览: {
  "agent": {
    "name": "人生决策宗师",
    "role": "CLO / 生命策略",
    "description": "AWKN LAB | 定数实验室的...

#### openclaw.json
- 路径: agents\master\openclaw.json
- 大小: 523 字节
- 行数: 29
- 预览: {
  "model": {
    "provider": "local",
    "api_key": "none",
    "require_api_key": false
  },
  "...

#### title-formulas.md
- 路径: AI爆款进化实验室\projects\assets\title-formulas.md
- 大小: 3185 字节
- 行数: 293
- 预览: # 标题公式详解

## 目录
- [公式概览](#公式概览)
- [时间反差型](#时间反差型)
- [身份锁定型](#身份锁定型)
- [反常识型](#反常识型)
- [技能价值型](#技能价值型...

#### chalkboard.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\chalkboard.md
- 大小: 1772 字节
- 行数: 59
- 预览: # chalkboard

Classic classroom chalkboard style for educational content

## Design Aesthetic

Class...

#### minimal.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\minimal.md
- 大小: 1607 字节
- 行数: 59
- 预览: # minimal

Ultra-clean, zen-like illustration style for focused content

## Design Aesthetic

Maximu...

#### nature.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\nature.md
- 大小: 1703 字节
- 行数: 59
- 预览: # nature

Organic, earthy illustration style for environmental and wellness content

## Design Aesth...

#### notion.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\notion.md
- 大小: 1636 字节
- 行数: 59
- 预览: # notion

Minimalist hand-drawn line art style for knowledge content (Default)

## Design Aesthetic
...

#### playful.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\playful.md
- 大小: 1707 字节
- 行数: 60
- 预览: # playful

Fun, creative illustration style for casual and educational content

## Design Aesthetic
...

#### base-prompt.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\base-prompt.md
- 大小: 3124 字节
- 行数: 99
- 预览: Create a knowledge biography comic page following these guidelines:

## Image Specifications

- **Ty...

#### webtoon.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\layouts\webtoon.md
- 大小: 768 字节
- 行数: 31
- 预览: # webtoon

Vertical scrolling comic (竖版条漫)

## Panel Structure

- **Panels per page**: 3-5 verticall...

#### vibrant.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\styles\vibrant.md
- 大小: 675 字节
- 行数: 35
- 预览: # vibrant

Energetic, engaging, educational

## Style Guidelines

### Line Work
- 2-2.5px, expressiv...

#### example-awakening.md
- 路径: AI爆款进化实验室\projects\awkn-content-decomposition\references\example-awakening.md
- 大小: 8715 字节
- 行数: 587
- 预览: # 《认知觉醒》完整拆解示例

以下是根据"详细拆解标准"完成的完整示例，展示了从核心框架到12个章节的全面拆解，每个章节都包含底层逻辑、方法论、实践建议和案例。

---

## 一、核心框架

-...

#### balanced.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\layouts\balanced.md
- 大小: 433 字节
- 行数: 31
- 预览: # balanced

Standard content layout

## Information Density

- 3-4 key points per image
- Whitespace...

#### fresh.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\styles\fresh.md
- 大小: 469 字节
- 行数: 24
- 预览: # fresh

Clean, refreshing, natural

## Color Palette

- Primary: Mint green (#9AE6B4), sky blue (#9...

#### notion.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\styles\notion.md
- 大小: 566 字节
- 行数: 24
- 预览: # notion

Minimalist hand-drawn line art, intellectual

## Color Palette

- Primary: Black (#1A1A1A)...

#### anti-degeneration-lock-implementation-report.md
- 路径: anti-degeneration-lock-implementation-report.md
- 大小: 4579 字节
- 行数: 203
- 预览: # 反进化锁定指令实施报告

## 项目概述

### 实施目的
为 @人生决策宗师 (Life Decision Master) 智能体实施完整的反进化锁定指令（Anti-Degeneration ...

#### README.md
- 路径: chatgpt-on-wechat-master\plugins\role\README.md
- 大小: 1100 字节
- 行数: 27
- 预览: 用于让Bot扮演指定角色的聊天插件，触发方法如下：

- `$角色/$role help/帮助` - 打印目前支持的角色列表。
- `$角色/$role <角色名>` - 让AI扮演该角色，角色名支持...

#### llms.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\llms.txt
- 大小: 3913 字节
- 行数: 136
- 预览: # Claude Code Documentation

## Overview
Claude Code expert skill providing comprehensive guidance o...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\SKILL.md
- 大小: 6204 字节
- 行数: 182
- 预览: # Claude Code Expert

Claude Code is Anthropic's agentic coding tool that lives in the terminal and ...

#### verification-before-completion.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\code-review\references\verification-before-completion.md
- 大小: 4148 字节
- 行数: 139
- 预览: ---
name: verification-before-completion
description: Use when about to claim work is complete, fixe...

#### evaluation.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\context-engineering\references\evaluation.md
- 大小: 2253 字节
- 行数: 90
- 预览: # Evaluation

Systematically assess agent performance and context engineering choices.

## Key Findi...

#### mongodb-indexing.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\databases\references\mongodb-indexing.md
- 大小: 10610 字节
- 行数: 443
- 预览: # MongoDB Indexing and Performance

Index types, strategies, and performance optimization techniques...

#### postgresql-performance.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\databases\references\postgresql-performance.md
- 大小: 11613 字节
- 行数: 528
- 预览: # PostgreSQL Performance Optimization

Query optimization, indexing strategies, EXPLAIN analysis, an...

#### postgresql-psql-cli.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\databases\references\postgresql-psql-cli.md
- 大小: 10523 字节
- 行数: 468
- 预览: # PostgreSQL psql CLI

Command-line interface for PostgreSQL: connection, meta-commands, scripting, ...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\debugging\verification-before-completion\SKILL.md
- 大小: 4126 字节
- 行数: 143
- 预览: ---
name: Verification Before Completion
description: Run verification commands and confirm output b...

#### browser-rendering.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\browser-rendering.md
- 大小: 6932 字节
- 行数: 306
- 预览: # Cloudflare Browser Rendering

Headless browser automation with Puppeteer/Playwright on Cloudflare ...

#### kubernetes-basics.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\kubernetes-basics.md
- 大小: 1697 字节
- 行数: 100
- 预览: # Kubernetes Core Concepts

## Cluster Architecture

```
CONTROL PLANE                    WORKER NOD...

#### complete-examples.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-development\resources\complete-examples.md
- 大小: 24524 字节
- 行数: 872
- 预览: # Complete Examples

Full working examples combining all modern patterns: React.FC, lazy loading, Su...

#### imagemagick-editing.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\media-processing\references\imagemagick-editing.md
- 大小: 13177 字节
- 行数: 624
- 预览: # ImageMagick Image Editing

Complete guide to format conversion, resizing, effects, transformations...

#### usage-patterns.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\repomix\references\usage-patterns.md
- 大小: 6978 字节
- 行数: 233
- 预览: # Usage Patterns

Practical workflows and patterns for using Repomix in different scenarios.

## AI ...

#### advanced.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\sequential-thinking\references\advanced.md
- 大小: 3233 字节
- 行数: 123
- 预览: # Advanced Usage: Revision and Branching

## Revising Previous Thoughts

When a thought proves incor...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\sequential-thinking\SKILL.md
- 大小: 3169 字节
- 行数: 94
- 预览: ---
name: sequential-thinking
description: Use when complex problems require systematic step-by-step...

#### README.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\shopify\README.md
- 大小: 1687 字节
- 行数: 67
- 预览: # Shopify API Research Documentation

This directory contains comprehensive research and analysis of...

#### 00-fundamentals.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\00-fundamentals.md
- 大小: 11484 字节
- 行数: 487
- 预览: # Three.js Fundamentals

## Overview

Three.js scene setup, cameras, renderer, Object3D hierarchy, c...

#### 01-getting-started.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\01-getting-started.md
- 大小: 3803 字节
- 行数: 178
- 预览: # Getting Started with Three.js

Core concepts for building your first 3D scene.

## Essential Compo...

#### 04-cameras.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\04-cameras.md
- 大小: 4935 字节
- 行数: 196
- 预览: # Cameras

Define viewpoint and projection for rendering.

## Perspective Camera

Realistic camera w...

#### 07-math.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\07-math.md
- 大小: 5262 字节
- 行数: 261
- 预览: # Math Utilities

Essential mathematical objects for 3D programming.

## Vector3

3D position, direc...

#### 18-geometry.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\18-geometry.md
- 大小: 13797 字节
- 行数: 547
- 预览: # Three.js Geometry

## Overview

Three.js geometry creation - built-in shapes, BufferGeometry, cust...

#### shadcn-components.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\references\shadcn-components.md
- 大小: 11155 字节
- 行数: 425
- 预览: # shadcn/ui Component Reference

Complete catalog of shadcn/ui components with usage patterns and in...

#### turborepo-pipelines.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-frameworks\references\turborepo-pipelines.md
- 大小: 8482 字节
- 行数: 518
- 预览: # Turborepo Task Pipelines

Task orchestration, dependencies, and parallel execution strategies.

##...

#### 2026-02-16-clawpal-redesign-implementation-plan.md
- 路径: clawpal\docs\plans\2026-02-16-clawpal-redesign-implementation-plan.md
- 大小: 45257 字节
- 行数: 1367
- 预览: # ClawPal Product Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpow...

#### 2026-02-16-model-channel-management-implementation.md
- 路径: clawpal\docs\plans\2026-02-16-model-channel-management-implementation.md
- 大小: 5450 字节
- 行数: 182
- 预览: # Model & Channel Management Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superp...

#### 2026-02-17-recipe-engine-implementation.md
- 路径: clawpal\docs\plans\2026-02-17-recipe-engine-implementation.md
- 大小: 29303 字节
- 行数: 856
- 预览: # Recipe Engine Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpower...

#### 2026-02-17-recipe-engine-redesign.md
- 路径: clawpal\docs\plans\2026-02-17-recipe-engine-redesign.md
- 大小: 6856 字节
- 行数: 148
- 预览: # Recipe Engine Redesign

## Goal

Redesign the recipe system from "config patch templates" to "...

#### 2026-02-18-ssh-remote-phase1-plan.md
- 路径: clawpal\docs\plans\2026-02-18-ssh-remote-phase1-plan.md
- 大小: 37667 字节
- 行数: 1260
- 预览: # SSH Remote Management — Phase 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use s...

#### 2026-02-22-doctor-2x2-matrix-implementation.md
- 路径: clawpal\docs\plans\2026-02-22-doctor-2x2-matrix-implementation.md
- 大小: 28564 字节
- 行数: 834
- 预览: # Doctor Agent 2x2 Matrix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowe...

#### README.md
- 路径: clawpal\README.md
- 大小: 2942 字节
- 行数: 91
- 预览: # ClawPal

A desktop companion app for [OpenClaw](https://github.com/openclaw/openclaw) — manage y...

#### master.json
- 路径: company-brain\data\agents\master.json
- 大小: 481 字节
- 行数: 22
- 预览: {
  "id": "master",
  "name": "大宗师",
  "type": "business",
  "status": "active",
  "capabilities": [...

#### add-node-to-memory.js
- 路径: company-brain\scripts\add-node-to-memory.js
- 大小: 2739 字节
- 行数: 90
- 预览: // 将大宗师节点添加到公司大脑记忆系统

const MemorySystem = require('../src/memory');

async function addNodeToMemory...

#### knowledge-1771834245041-gd09bo5pw.json
- 路径: company-brain\scripts\data\knowledge\knowledge-1771834245041-gd09bo5pw.json
- 大小: 1285 字节
- 行数: 61
- 预览: {
  "name": "EvoMap 节点 - 大宗师",
  "type": "ai_node",
  "category": "evomap",
  "content": {
    "node...

#### evomap_assets.md
- 路径: company-brain\src\memory\evomap_assets.md
- 大小: 4577 字节
- 行数: 142
- 预览: # EvoMap 优质资产库

## 更新时间
2026-02-23

## 概述
本文件存储了从 EvoMap 网络获取的高评分优质资产，这些资产经过验证，可直接应用于项目中以提高开发效率和系统稳定...

#### agent-manager.js
- 路径: company-brain\src\scheduler\agent-manager.js
- 大小: 8942 字节
- 行数: 354
- 预览: // 智能体管理器模块

const fs = require('fs').promises;
const path = require('path');

class AgentManager {
...

#### task-analyzer.js
- 路径: company-brain\src\scheduler\task-analyzer.js
- 大小: 7149 字节
- 行数: 270
- 预览: // 任务分析器模块

class TaskAnalyzer {
  constructor(config) {
    this.config = config;
  }
  
  async in...

#### master.json
- 路径: company-brain\test-data\agents\master.json
- 大小: 481 字节
- 行数: 22
- 预览: {
  "id": "master",
  "name": "大宗师",
  "type": "business",
  "status": "active",
  "capabilities": [...

#### master.json
- 路径: data\agents\master.json
- 大小: 631 字节
- 行数: 28
- 预览: {
  "id": "master",
  "name": "大宗师",
  "type": "business",
  "status": "active",
  "capabilities": [...

#### decision-outcome.json
- 路径: data\life-decision-master\collected-data\decision-outcome.json
- 大小: 3477 字节
- 行数: 153
- 预览: [
  {
    "timestamp": "2026-02-24T18:44:36.610Z",
    "decisionType": "career",
    "inputData": {
...

#### execution-report.md
- 路径: execution-report.md
- 大小: 3085 字节
- 行数: 67
- 预览: # EvoMap 执行报告

**执行时间**: 2026-02-24T20:56:58.802Z
**执行节点**: node_c3c7ebfa60b867f1
**代理名称**: 大掌柜

## ...

#### plan_20260206_124107.md
- 路径: HATwin\.trae\documents\plan_20260206_124107.md
- 大小: 1518 字节
- 行数: 102
- 预览: # LAY.jpg 404错误终极排查计划

## 项目现状分析

### 本地文件结构
- ✅ 存在 `public/` 文件夹
- ✅ `public/LAY.jpg` 文件存在
- ✅ 代码中已...

#### plan_20260206_132044.md
- 路径: HATwin\.trae\documents\plan_20260206_132044.md
- 大小: 1100 字节
- 行数: 56
- 预览: # Vercel 图片部署问题修复计划

## 项目现状分析

### 本地文件结构
- ✅ 存在 `public/` 文件夹
- ✅ `public/LAY.jpg` 文件存在
- ✅ 代码中已更新...

#### plan_20260206_140217.md
- 路径: HATwin\.trae\documents\plan_20260206_140217.md
- 大小: 1135 字节
- 行数: 67
- 预览: # 头像和欢迎消息修复计划

## 问题分析

### 当前状态
- ✅ 图片文件已放在 `public/` 文件夹中
- ✅ 代码中的图片引用已改为 `/lay.jpg`
- ✅ 已修改 `init...

#### 修改LAY AI界面文案.md
- 路径: HATwin\.trae\documents\修改LAY AI界面文案.md
- 大小: 676 字节
- 行数: 25
- 预览: ## 修改计划

### 1. 侧边栏 (Sidebar) 修改
- **Logo/品牌区**：将 HotelVest INTELLIGENT ADVISORY 改为 LAY AI | 酒店投资风控参...

#### plan_20260205_072201.md
- 路径: HTP\.trae\documents\plan_20260205_072201.md
- 大小: 1126 字节
- 行数: 50
- 预览: # 更新.env配置文件

## 问题分析
当前.env文件中包含了火山豆包的配置，但缺少文生图的接入点ID，并且可能存在阿里相关的配置。需要按照用户提供的最终版.env模板进行更新，确保所有配置都符...

#### plan_20260205_072836.md
- 路径: HTP\.trae\documents\plan_20260205_072836.md
- 大小: 1476 字节
- 行数: 63
- 预览: # 修改analyzeDrawingWithAI函数处理图片数据

## 问题分析
当前项目中，用户在CanvasPage.tsx页面绘制的图片会被转换为Base64编码的字符串，然后传递给analy...

#### plan_20260206_101329.md
- 路径: HTP\.trae\documents\plan_20260206_101329.md
- 大小: 639 字节
- 行数: 32
- 预览: # 解决413 (Payload Too Large)错误的验证计划

## 问题分析
尽管之前修改了后端配置，但仍然出现413错误，原因是：
1. 之前的node.exe进程（PID 17144）可...

#### plan_20260206_111037.md
- 路径: HTP\.trae\documents\plan_20260206_111037.md
- 大小: 734 字节
- 行数: 32
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **参数名匹配**：前端传递的参数名是 `imageBase64`，后端期望的也是 `imageBase64`，参数名是匹配的
2. **错误提示...

#### plan_20260206_112514.md
- 路径: HTP\.trae\documents\plan_20260206_112514.md
- 大小: 781 字节
- 行数: 42
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **413错误问题**：
   - 后端已经设置了请求体限制为1MB（第15-18行）
   - 但配置位置可能不够靠前，导致未全局生效
   -...

#### plan_20260206_113030.md
- 路径: HTP\.trae\documents\plan_20260206_113030.md
- 大小: 798 字节
- 行数: 36
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **前端参数传递问题**：
   - 前端 `completeHTPWorkflow` 函数只接收 `imageBase64` 参数，没有 `us...

#### plan_20260206_113319.md
- 路径: HTP\.trae\documents\plan_20260206_113319.md
- 大小: 653 字节
- 行数: 36
- 预览: ## 核心问题分析

通过分析用户提供的信息和当前代码，我发现：

1. **豆包API格式要求**：
   - 豆包API要求图片必须包含Data URI Scheme前缀（data:image/p...

#### 修复HTP分析接口参数校验和错误处理.md
- 路径: HTP\.trae\documents\修复HTP分析接口参数校验和错误处理.md
- 大小: 872 字节
- 行数: 35
- 预览: ## 核心问题分析

通过代码分析，我发现：

1. **参数名匹配**：前端传递的参数名是 `imageBase64`，后端期望的也是 `imageBase64`，参数名是匹配的
2. **接口路径...

#### chalkboard.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\chalkboard.md
- 大小: 1772 字节
- 行数: 59
- 预览: # chalkboard

Classic classroom chalkboard style for educational content

## Design Aesthetic

Class...

#### minimal.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\minimal.md
- 大小: 1607 字节
- 行数: 59
- 预览: # minimal

Ultra-clean, zen-like illustration style for focused content

## Design Aesthetic

Maximu...

#### nature.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\nature.md
- 大小: 1703 字节
- 行数: 59
- 预览: # nature

Organic, earthy illustration style for environmental and wellness content

## Design Aesth...

#### notion.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\notion.md
- 大小: 1636 字节
- 行数: 59
- 预览: # notion

Minimalist hand-drawn line art style for knowledge content (Default)

## Design Aesthetic
...

#### playful.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\playful.md
- 大小: 1707 字节
- 行数: 60
- 预览: # playful

Fun, creative illustration style for casual and educational content

## Design Aesthetic
...

#### plan_20260206_124107.md
- 路径: LAY\.trae\documents\plan_20260206_124107.md
- 大小: 1518 字节
- 行数: 102
- 预览: # LAY.jpg 404错误终极排查计划

## 项目现状分析

### 本地文件结构
- ✅ 存在 `public/` 文件夹
- ✅ `public/LAY.jpg` 文件存在
- ✅ 代码中已...

#### plan_20260206_132044.md
- 路径: LAY\.trae\documents\plan_20260206_132044.md
- 大小: 1100 字节
- 行数: 56
- 预览: # Vercel 图片部署问题修复计划

## 项目现状分析

### 本地文件结构
- ✅ 存在 `public/` 文件夹
- ✅ `public/LAY.jpg` 文件存在
- ✅ 代码中已更新...

#### plan_20260206_140217.md
- 路径: LAY\.trae\documents\plan_20260206_140217.md
- 大小: 1135 字节
- 行数: 67
- 预览: # 头像和欢迎消息修复计划

## 问题分析

### 当前状态
- ✅ 图片文件已放在 `public/` 文件夹中
- ✅ 代码中的图片引用已改为 `/lay.jpg`
- ✅ 已修改 `init...

#### 修改LAY AI界面文案.md
- 路径: LAY\.trae\documents\修改LAY AI界面文案.md
- 大小: 676 字节
- 行数: 25
- 预览: ## 修改计划

### 1. 侧边栏 (Sidebar) 修改
- **Logo/品牌区**：将 HotelVest INTELLIGENT ADVISORY 改为 LAY AI | 酒店投资风控参...

#### mission-control_src_app_calendar_page_tsx_54995a0d._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control_src_app_calendar_page_tsx_54995a0d._.js
- 大小: 104533 字节
- 行数: 1108
- 预览: module.exports = [
"[project]/mission-control/src/app/calendar/page.tsx [app-ssr] (ecmascript)", ((_...

#### mission-control_src_app_calendar_page_tsx_a08b05ae._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_calendar_page_tsx_a08b05ae._.js
- 大小: 99882 字节
- 行数: 1119
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### new-config.json
- 路径: new-config.json
- 大小: 322 字节
- 行数: 19
- 预览: {
  "gateway": {
    "mode": "local"
  },
  "agents": {
    "defaults": {
      "model": {
        "...

#### openclaw-template.json
- 路径: openclaw-template.json
- 大小: 322 字节
- 行数: 19
- 预览: {
  "gateway": {
    "mode": "local"
  },
  "agents": {
    "defaults": {
      "model": {
        "...

#### pcec_3.md
- 路径: pcec_executions\pcec_3.md
- 大小: 240 字节
- 行数: 22
- 预览: # PCEC 执行记录 #3 - 手动触发

## 执行信息
- **执行时间**：2026-02-23T05:42:35.215Z
- **周期**：第三次执行
- **执行类型**：手动触发

#...

#### pcec_4.md
- 路径: pcec_executions\pcec_4.md
- 大小: 246 字节
- 行数: 22
- 预览: # PCEC 执行记录 #4 - 强制触发

## 执行信息
- **执行时间**：2026-02-23T05:46:59.892Z
- **周期**：第4次执行
- **执行类型**：强制触发

#...

#### simple-trigger-evolution.js
- 路径: simple-trigger-evolution.js
- 大小: 1670 字节
- 行数: 76
- 预览: #!/usr/bin/env node

/**
 * 简化版手动触发进化系统脚本
 * 功能：强制启动绿茶智能体的进化系统
 */

const fs = require('fs');
const ...

#### SKILL.md
- 路径: skills\bug-diagnosis\SKILL.md
- 大小: 468 字节
- 行数: 21
- 预览: ﻿## Skill 2｜找原因（假设→证据→定位｜Diagnosis）
一句话定义 ：用最少假设、最短验证，把根因定位到“哪段链路/哪类原因/下一刀该验证什么”。
 触发口令 ：

- “我们...

#### SKILL.md
- 路径: skills\bug-execute-verify\SKILL.md
- 大小: 702 字节
- 行数: 30
- 预览: ﻿## Skill 4｜动手做（执行与复验｜Execute & Verify）
一句话定义 ：把选定方案变成“做一步、验一步、失败可回滚”的串行执行清单，直到最终 DoD 通过。
 触发口令 ：...

#### README.md
- 路径: skills\jankutschera-adhd-body-doubling\README.md
- 大小: 4461 字节
- 行数: 121
- 预览: # ADHD Body Doubling Skill v2.1 🐱⚡

[![License: MIT](https://img.shields.io/badge/License-MIT-yello...

#### SKILL.md
- 路径: skills\jankutschera-adhd-body-doubling\SKILL.md
- 大小: 7381 字节
- 行数: 225
- 预览: ---
name: adhd-body-doubling
version: 2.1.0
description: "This skill should be used when the user as...

#### SKILL.md
- 路径: skills\oracle\SKILL.md
- 大小: 5726 字节
- 行数: 112
- 预览: ---
name: oracle
description: Use the @steipete/oracle CLI to bundle a prompt plus the right files a...

#### ISSUES_TO_CREATE.md
- 路径: Skill_Seekers\.github\ISSUES_TO_CREATE.md
- 大小: 6255 字节
- 行数: 259
- 预览: # GitHub Issues to Create

Copy these to GitHub Issues manually or use `gh issue create`

---
...

#### HTTPX_SKILL_GRADING.md
- 路径: Skill_Seekers\docs\archive\historical\HTTPX_SKILL_GRADING.md
- 大小: 32276 字节
- 行数: 1126
- 预览: # HTTPX Skill Quality Analysis - Ultra-Deep Grading

**Skill Analyzed:** `output/httpx/SKILL.md` (...

#### IMPLEMENTATION_SUMMARY_THREE_STREAM.md
- 路径: Skill_Seekers\docs\archive\historical\IMPLEMENTATION_SUMMARY_THREE_STREAM.md
- 大小: 15391 字节
- 行数: 445
- 预览: # Three-Stream GitHub Architecture - Implementation Summary

**Status**: ✅ **Phases 1-5 Complete**...

#### SKILL_QUALITY_FIX_PLAN.md
- 路径: Skill_Seekers\docs\archive\historical\SKILL_QUALITY_FIX_PLAN.md
- 大小: 10358 字节
- 行数: 405
- 预览: # Skill Quality Fix Plan

**Created:** 2026-01-11
**Status:** Not Started
**Priority:** P0 - Blo...

#### THREE_STREAM_STATUS_REPORT.md
- 路径: Skill_Seekers\docs\archive\historical\THREE_STREAM_STATUS_REPORT.md
- 大小: 12016 字节
- 行数: 371
- 预览: # Three-Stream GitHub Architecture - Final Status Report

**Date**: January 8, 2026
**Status**: ✅...

#### PDF_PARSING_RESEARCH.md
- 路径: Skill_Seekers\docs\archive\research\PDF_PARSING_RESEARCH.md
- 大小: 12417 字节
- 行数: 492
- 预览: # PDF Parsing Libraries Research (Task B1.1)

**Date:** October 21, 2025
**Task:** B1.1 - Researc...

#### FAQ.md
- 路径: Skill_Seekers\docs\FAQ.md
- 大小: 16580 字节
- 行数: 656
- 预览: # Frequently Asked Questions (FAQ)

**Version:** 2.7.0
**Last Updated:** 2026-01-18

---

## ...

#### ENHANCEMENT.md
- 路径: Skill_Seekers\docs\features\ENHANCEMENT.md
- 大小: 9357 字节
- 行数: 329
- 预览: # AI-Powered SKILL.md Enhancement

Two scripts are available to dramatically improve your SKILL.md...

#### UNIFIED_SCRAPING.md
- 路径: Skill_Seekers\docs\features\UNIFIED_SCRAPING.md
- 大小: 15586 字节
- 行数: 634
- 预览: # Unified Multi-Source Scraping

**Version:** 2.0 (Feature complete as of October 2025)

## Over...

#### AI_SKILL_STANDARDS.md
- 路径: Skill_Seekers\docs\reference\AI_SKILL_STANDARDS.md
- 大小: 28339 字节
- 行数: 927
- 预览: # AI Skill Standards & Best Practices (2026)

**Version:** 1.0
**Last Updated:** 2026-01-11
**Sc...

#### INSTALL.md
- 路径: Skill_Seekers\superpowers\.opencode\INSTALL.md
- 大小: 2651 字节
- 行数: 120
- 预览: # Installing Superpowers for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) instal...

#### code-reviewer.md
- 路径: Skill_Seekers\superpowers\agents\code-reviewer.md
- 大小: 3888 字节
- 行数: 49
- 预览: ---
name: code-reviewer
description: |
  Use this agent when a major project step has been completed...

#### execute-plan.md
- 路径: Skill_Seekers\superpowers\commands\execute-plan.md
- 大小: 188 字节
- 行数: 7
- 预览: ---
description: Execute plan in batches with review checkpoints
disable-model-invocation: true
---
...

#### write-plan.md
- 路径: Skill_Seekers\superpowers\commands\write-plan.md
- 大小: 196 字节
- 行数: 7
- 预览: ---
description: Create detailed implementation plan with bite-sized tasks
disable-model-invocation:...

#### README.opencode.md
- 路径: Skill_Seekers\superpowers\docs\README.opencode.md
- 大小: 10282 字节
- 行数: 331
- 预览: # Superpowers for OpenCode

Complete guide for using Superpowers with [OpenCode.ai](https://opencode...

#### testing.md
- 路径: Skill_Seekers\superpowers\docs\testing.md
- 大小: 9846 字节
- 行数: 304
- 预览: # Testing Superpowers Skills

This document describes how to test Superpowers skills, particularly t...

#### code-quality-reviewer-prompt.md
- 路径: Skill_Seekers\superpowers\skills\subagent-driven-development\code-quality-reviewer-prompt.md
- 大小: 630 字节
- 行数: 21
- 预览: # Code Quality Reviewer Prompt Template

Use this template when dispatching a code quality reviewer ...

#### implementer-prompt.md
- 路径: Skill_Seekers\superpowers\skills\subagent-driven-development\implementer-prompt.md
- 大小: 2195 字节
- 行数: 79
- 预览: # Implementer Subagent Prompt Template

Use this template when dispatching an implementer subagent.
...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\verification-before-completion\SKILL.md
- 大小: 4149 字节
- 行数: 140
- 预览: ---
name: verification-before-completion
description: Use when about to claim work is complete, fixe...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\writing-plans\SKILL.md
- 大小: 3264 字节
- 行数: 117
- 预览: ---
name: writing-plans
description: Use when you have a spec or requirements for a multi-step task,...

#### README.md
- 路径: Skill_Seekers\superpowers\tests\claude-code\README.md
- 大小: 4289 字节
- 行数: 159
- 预览: # Claude Code Skills Tests

Automated tests for superpowers skills using Claude Code CLI.

## Overvi...

#### action-oriented.txt
- 路径: Skill_Seekers\superpowers\tests\explicit-skill-requests\prompts\action-oriented.txt
- 大小: 164 字节
- 行数: 4
- 预览: The plan is done. docs/plans/auth-system.md has everything.

Do subagent-driven development on thi...

#### after-planning-flow.txt
- 路径: Skill_Seekers\superpowers\tests\explicit-skill-requests\prompts\after-planning-flow.txt
- 大小: 556 字节
- 行数: 18
- 预览: Great, the plan is complete. I've saved it to docs/plans/auth-system.md.

Here's a summary of what...

#### claude-suggested-it.txt
- 路径: Skill_Seekers\superpowers\tests\explicit-skill-requests\prompts\claude-suggested-it.txt
- 大小: 497 字节
- 行数: 12
- 预览: [Previous assistant message]:
Plan complete and saved to docs/plans/auth-system.md.

Two executio...

#### i-know-what-sdd-means.txt
- 路径: Skill_Seekers\superpowers\tests\explicit-skill-requests\prompts\i-know-what-sdd-means.txt
- 大小: 362 字节
- 行数: 9
- 预览: I have my implementation plan ready at docs/plans/auth-system.md.

I want to use subagent-driven-d...

#### mid-conversation-execute-plan.txt
- 路径: Skill_Seekers\superpowers\tests\explicit-skill-requests\prompts\mid-conversation-execute-plan.txt
- 大小: 110 字节
- 行数: 4
- 预览: I have a plan at docs/plans/auth-system.md that's ready to implement.

subagent-driven-development...

#### skip-formalities.txt
- 路径: Skill_Seekers\superpowers\tests\explicit-skill-requests\prompts\skip-formalities.txt
- 大小: 162 字节
- 行数: 4
- 预览: Plan is at docs/plans/auth-system.md.

subagent-driven-development, please. Don't waste time - jus...

#### executing-plans.txt
- 路径: Skill_Seekers\superpowers\tests\skill-triggering\prompts\executing-plans.txt
- 大小: 110 字节
- 行数: 1
- 预览: I have a plan document at docs/plans/2024-01-15-auth-system.md that needs to be executed. Please imp...

#### plan.md
- 路径: Skill_Seekers\superpowers\tests\subagent-driven-dev\go-fractals\plan.md
- 大小: 4957 字节
- 行数: 173
- 预览: # Go Fractals CLI - Implementation Plan

Execute this plan using the `superpowers:subagent-driven-de...

#### plan.md
- 路径: Skill_Seekers\superpowers\tests\subagent-driven-dev\svelte-todo\plan.md
- 大小: 4834 字节
- 行数: 223
- 预览: # Svelte Todo List - Implementation Plan

Execute this plan using the `superpowers:subagent-driven-d...

#### SKILL.md
- 路径: Skill_Seekers\ui-ux-pro-max-skill\.claude\skills\ui-ux-pro-max\SKILL.md
- 大小: 14760 字节
- 行数: 387
- 预览: ---
name: ui-ux-pro-max
description: "UI/UX design intelligence. 50 styles, 21 palettes, 50 font p...

#### plugin.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\.claude-plugin\plugin.json
- 大小: 1128 字节
- 行数: 12
- 预览: {
  "name": "ui-ux-pro-max",
  "description": "UI/UX design intelligence. 50 styles, 21 palettes, ...

#### claude.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\claude.json
- 大小: 1552 字节
- 行数: 22
- 预览: {
  "platform": "claude",
  "displayName": "Claude Code",
  "installType": "full",
  "folderStru...

#### droid.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\droid.json
- 大小: 1494 字节
- 行数: 22
- 预览: {
  "platform": "droid",
  "displayName": "Droid (Factory)",
  "installType": "full",
  "folderS...

#### claude.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\claude.json
- 大小: 1552 字节
- 行数: 22
- 预览: {
  "platform": "claude",
  "displayName": "Claude Code",
  "installType": "full",
  "folderStru...

#### droid.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\droid.json
- 大小: 1494 字节
- 行数: 22
- 预览: {
  "platform": "droid",
  "displayName": "Droid (Factory)",
  "installType": "full",
  "folderS...

#### Skill 2｜找原因（假设→证据→定位｜Diagnosis）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\Skill 2｜找原因（假设→证据→定位｜Diagnosis）.txt
- 大小: 465 字节
- 行数: 20
- 预览: ## Skill 2｜找原因（假设→证据→定位｜Diagnosis）
一句话定义 ：用最少假设、最短验证，把根因定位到“哪段链路/哪类原因/下一刀该验证什么”。
 触发口令 ：

- “我们先...

#### Skill 4｜动手做（执行与复验｜Execute & Verify）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\Skill 4｜动手做（执行与复验｜Execute & Verify）.txt
- 大小: 699 字节
- 行数: 29
- 预览: ## Skill 4｜动手做（执行与复验｜Execute & Verify）
一句话定义 ：把选定方案变成“做一步、验一步、失败可回滚”的串行执行清单，直到最终 DoD 通过。
 触发口令 ：
...

#### Skill B｜假设→证据→定位（Diagnosis）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\备用版-拗口\Skill B｜假设→证据→定位（Diagnosis）.txt
- 大小: 2148 字节
- 行数: 100
- 预览: # Skill B｜假设→证据→定位（Diagnosis）

**一句话定义**  
用“假设驱动 + 证据验证”的方式，在最少 token 下把问题定位到：**是哪一类原因、在哪一段链路、下一...

#### Skill C｜修复方案与风险（Fix Design）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\备用版-拗口\Skill C｜修复方案与风险（Fix Design）.txt
- 大小: 1842 字节
- 行数: 105
- 预览: 
          
          
# Skill C｜修复方案与风险（Fix Design）

**一句话定义**  
在动手改之前，把“怎么修”压缩成 **A/B/兜底三案*...

#### test-capability-tree-complete.js
- 路径: test-capability-tree-complete.js
- 大小: 9023 字节
- 行数: 315
- 预览: /**
 * 能力树完整功能测试
 * 测试能力生长、合并和修剪等核心功能
 */

const { lifeDecisionMasterCapabilityTree } = require('./c...

#### master.json
- 路径: test-data\agents\master.json
- 大小: 481 字节
- 行数: 22
- 预览: {
  "id": "master",
  "name": "大宗师",
  "type": "business",
  "status": "active",
  "capabilities": [...

#### fix-chunk-size-5mb.md
- 路径: 大脑作弊器\projects\tmp\fix-chunk-size-5mb.md
- 大小: 2616 字节
- 行数: 160
- 预览: # v1.1 分片上传修复说明

## 问题描述
用户上传12MB PDF文件时，出现413错误（Payload Too Large），导致部分分片上传失败。

### 错误详情
```
文件大小：1...

### report (120)

#### SKILL.md
- 路径: .agents\skills\fixing-accessibility\SKILL.md
- 大小: 4045 字节
- 行数: 120
- 预览: ---
name: fixing-accessibility
description: Fix accessibility issues.
---

# fixing-accessibili...

#### SKILL.md
- 路径: .agents\skills\fixing-metadata\SKILL.md
- 大小: 4246 字节
- 行数: 116
- 预览: ---
name: fixing-metadata
description: Ship correct, complete metadata.
---

# fixing-metadata...

#### SKILL.md
- 路径: .agents\skills\fixing-motion-performance\SKILL.md
- 大小: 4620 字节
- 行数: 128
- 预览: ---
name: fixing-motion-performance
description: Fix animation performance issues.
---

# fixin...

#### htp-warning-signs.md
- 路径: .agents\skills\htp-insight\references\htp-warning-signs.md
- 大小: 7841 字节
- 行数: 616
- 预览: # HTP 房树人分析风险警示系统

## 目录
- [高风险指标](#高风险指标)
- [中风险指标](#中风险指标)
- [风险等级判定](#风险等级判定)
- [紧急建议模板](#紧急建议模板)...

#### AGENTS.md
- 路径: .claude\skills\oh-my-opencode-dev\src\features\AGENTS.md
- 大小: 2412 字节
- 行数: 60
- 预览: # FEATURES KNOWLEDGE BASE

## OVERVIEW

Core feature modules + Claude Code compatibility layer. Orch...

#### master_agent_implementation_report.md
- 路径: .trae\documents\master_agent_implementation_report.md
- 大小: 2421 字节
- 行数: 125
- 预览: # 大宗师智能体实施报告

## 实施概述

本次实施旨在解决无法在其他对话框中使用 `@大宗师` 启动命令启动智能体的问题。通过一系列步骤，成功注册了 master 智能体，设置了智能体身份为大宗师...

#### decomposition-standard.md
- 路径: .trae\skills\baokuan\awkn-content-decomposition\references\decomposition-standard.md
- 大小: 3490 字节
- 行数: 290
- 预览: # 内容拆解详细标准

## 核心原则
内容拆解的目标是：**从"读懂"到"能用"**。不仅要理解内容，更要提炼出可执行的方法论。

## 拆解的三个层次

### 第一层：核心框架（必填）
**目的...

#### article-posting.md
- 路径: .trae\skills\baokuan\awkn-post-to-wechat\references\article-posting.md
- 大小: 2207 字节
- 行数: 90
- 预览: # Article Posting (文章发表)

Post markdown articles to WeChat Official Account with full formatting sup...

#### image-text-posting.md
- 路径: .trae\skills\baokuan\awkn-post-to-wechat\references\image-text-posting.md
- 大小: 2584 字节
- 行数: 93
- 预览: # Image-Text Posting (图文发表)

Post image-text messages with multiple images to WeChat Official Accoun...

#### corporate.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\corporate.md
- 大小: 2346 字节
- 行数: 70
- 预览: # corporate

Professional business style with navy/gold palette and structured layouts

## Design Ae...

#### FINAL_CHECK.md
- 路径: .trae\skills\baokuan\FINAL_CHECK.md
- 大小: 881 字节
- 行数: 48
- 预览: # 最终检查报告

## 部署配置
\`\`\`ini
[skill]
  skill_package = "awkn-viral-article.skill"
  name = "awkn-vira...

#### .nycrc.unit.json
- 路径: .trae\skills\cline-main\.nycrc.unit.json
- 大小: 787 字节
- 行数: 49
- 预览: {
	"all": true,
	"check-coverage": false,
	"reporter": [
		"text",
		"lcov"
	],
	"include": [
		"src...

#### README.md
- 路径: .trae\skills\cline-main\cli\README.md
- 大小: 2312 字节
- 行数: 74
- 预览: # Cline CLI

```
/_____/\ /_/\      /_______/\/__/\ /__/\ /_____/\
\:::__\/ \:\ \     \__.::._\/\::\...

#### CODE_OF_CONDUCT.md
- 路径: .trae\skills\cline-main\CODE_OF_CONDUCT.md
- 大小: 3373 字节
- 行数: 77
- 预览: # Contributor Covenant Code of Conduct

## Our Pledge

In the interest of fostering an open and welc...

#### CONTRIBUTING.md
- 路径: .trae\skills\cline-main\CONTRIBUTING.md
- 大小: 9456 字节
- 行数: 229
- 预览: # Contributing to Cline

We're thrilled you're interested in contributing to Cline. Whether you're f...

#### CODE_OF_CONDUCT.md
- 路径: .trae\skills\cline-main\locales\es\CODE_OF_CONDUCT.md
- 大小: 3677 字节
- 行数: 72
- 预览: # Código de Conducta para Contribuyentes

## Nuestro Compromiso

En el interés de fomentar un entorn...

#### CODE_OF_CONDUCT.md
- 路径: .trae\skills\cline-main\locales\pt-BR\CODE_OF_CONDUCT.md
- 大小: 3195 字节
- 行数: 52
- 预览: # Código de Conduta para Contribuidores

## Nosso Compromisso


Com o objetivo de promover um ambien...

#### CODE_OF_CONDUCT.md
- 路径: .trae\skills\cline-main\locales\zh-cn\CODE_OF_CONDUCT.md
- 大小: 1014 字节
- 行数: 48
- 预览: # 贡献者公约行为准则

## 我们的承诺

为了营造一个开放和欢迎的环境，我们作为贡献者和维护者承诺让我们的项目和社区的参与体验对每个人都无骚扰，无论年龄、体型、残疾、种族、性别特征、性别认同和表达...

#### package-lock.json
- 路径: .trae\skills\cline-main\webview-ui\package-lock.json
- 大小: 508562 字节
- 行数: 14736
- 预览: {
	"name": "webview-ui",
	"version": "0.3.0",
	"lockfileVersion": 3,
	"requires": true,
	"packages":...

#### 标准化输出格式.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\references\标准化输出格式.md
- 大小: 3126 字节
- 行数: 234
- 预览: # 前台输出标准格式

## 1. 标准化决策分析报告

```markdown
========================================
📊 人生战略决策分析报告
====...

#### forest-canopy.md
- 路径: .trae\skills\skills\skills\theme-factory\themes\forest-canopy.md
- 大小: 525 字节
- 行数: 20
- 预览: # Forest Canopy

A natural and grounded theme featuring earth tones inspired by dense forest envir...

#### ocean-depths.md
- 路径: .trae\skills\skills\skills\theme-factory\themes\ocean-depths.md
- 大小: 574 字节
- 行数: 20
- 预览: # Ocean Depths

A professional and calming maritime theme that evokes the serenity of deep ocean w...

#### forest-canopy.md
- 路径: .trae\skills\skills-main\skills\theme-factory\themes\forest-canopy.md
- 大小: 506 字节
- 行数: 20
- 预览: # Forest Canopy

A natural and grounded theme featuring earth tones inspired by dense forest environ...

#### ocean-depths.md
- 路径: .trae\skills\skills-main\skills\theme-factory\themes\ocean-depths.md
- 大小: 555 字节
- 行数: 20
- 预览: # Ocean Depths

A professional and calming maritime theme that evokes the serenity of deep ocean wat...

#### forest-canopy.md
- 路径: .trae\skills\theme-factory\themes\forest-canopy.md
- 大小: 506 字节
- 行数: 20
- 预览: # Forest Canopy

A natural and grounded theme featuring earth tones inspired by dense forest environ...

#### ocean-depths.md
- 路径: .trae\skills\theme-factory\themes\ocean-depths.md
- 大小: 555 字节
- 行数: 20
- 预览: # Ocean Depths

A professional and calming maritime theme that evokes the serenity of deep ocean wat...

#### openapi.index.json
- 路径: .venv\Lib\site-packages\github\openapi.index.json
- 大小: 1330 字节
- 行数: 33
- 预览: {
  "known method verbs": {
    "AuthenticatedUser.create_fork": "POST",
    "Github.get_enterprise"...

#### content-strategy.md
- 路径: agents\green-tea\brand\content-strategy.md
- 大小: 2381 字节
- 行数: 190
- 预览: # 内容传播策略

## 内容定位

### 核心内容类型
| 类型 | 占比 | 目的 | 平台 |
|------|------|------|------|
| 心理测试 | 40% | 引流 ...

#### visual-guidelines.md
- 路径: agents\green-tea\brand\visual-guidelines.md
- 大小: 2434 字节
- 行数: 197
- 预览: # 品牌视觉识别指南

## 品牌色彩系统

### 主色系
```
绿茶绿 (Primary)
├─ #7CB342 - 主品牌色
├─ #558B2F - 深绿（强调/按钮）
└─ #DCEDC8...

#### value-function-integration.js
- 路径: agents\life\value-function-integration.js
- 大小: 8716 字节
- 行数: 316
- 预览: // 人生决策宗师价值函数集成模块
const valueFunctionCore = require('../../value-function-core');

/**
 * 人生决策宗师价值函数...

#### decomposition-standard.md
- 路径: AI爆款进化实验室\projects\awkn-content-decomposition\references\decomposition-standard.md
- 大小: 3490 字节
- 行数: 290
- 预览: # 内容拆解详细标准

## 核心原则
内容拆解的目标是：**从"读懂"到"能用"**。不仅要理解内容，更要提炼出可执行的方法论。

## 拆解的三个层次

### 第一层：核心框架（必填）
**目的...

#### article-posting.md
- 路径: AI爆款进化实验室\projects\awkn-post-to-wechat\references\article-posting.md
- 大小: 2207 字节
- 行数: 90
- 预览: # Article Posting (文章发表)

Post markdown articles to WeChat Official Account with full formatting sup...

#### image-text-posting.md
- 路径: AI爆款进化实验室\projects\awkn-post-to-wechat\references\image-text-posting.md
- 大小: 2584 字节
- 行数: 93
- 预览: # Image-Text Posting (图文发表)

Post image-text messages with multiple images to WeChat Official Accoun...

#### corporate.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\corporate.md
- 大小: 2346 字节
- 行数: 70
- 预览: # corporate

Professional business style with navy/gold palette and structured layouts

## Design Ae...

#### FINAL_CHECK.md
- 路径: AI爆款进化实验室\projects\FINAL_CHECK.md
- 大小: 881 字节
- 行数: 48
- 预览: # 最终检查报告

## 部署配置
\`\`\`ini
[skill]
  skill_package = "awkn-viral-article.skill"
  name = "awkn-vira...

#### capability-value-evaluator.js
- 路径: capabilities\capability-value-evaluator.js
- 大小: 12050 字节
- 行数: 460
- 预览: /**
 * 能力价值评估系统
 * 为人生决策宗师智能体提供能力价值评估和管理功能
 */

const { valueFunction } = require('./value-function'...

#### low-value-capability-manager.js
- 路径: capabilities\low-value-capability-manager.js
- 大小: 13326 字节
- 行数: 549
- 预览: /**
 * 低价值能力识别与管理系统
 * 为人生决策宗师智能体提供低价值能力识别、标记和管理功能
 */

const { valueFunction } = require('./value-f...

#### mcp-manager.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\agents\mcp-manager.md
- 大小: 3174 字节
- 行数: 91
- 预览: ---
name: mcp-manager
description: Manage MCP (Model Context Protocol) server integrations - discove...

#### create.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\commands\skill\create.md
- 大小: 1473 字节
- 行数: 29
- 预览: ---
description: Create a new agent skill
argument-hint: [prompt]
---

Ultrathink.

**IMPORTANT:** 
...

#### use-mcp.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\commands\use-mcp.md
- 大小: 485 字节
- 行数: 9
- 预览: ---
description: Utilize tools of Model Context Protocol (MCP) servers
argument-hint: [task]
---
**O...

#### backend-testing.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\backend-development\references\backend-testing.md
- 大小: 10667 字节
- 行数: 430
- 预览: # Backend Testing Strategies

Comprehensive testing approaches, frameworks, and quality assurance pr...

#### enterprise-features.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\enterprise-features.md
- 大小: 7739 字节
- 行数: 473
- 预览: # Enterprise Features

Enterprise deployment, security, compliance, and monitoring for Claude Code.
...

#### coverage-db.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\databases\scripts\tests\coverage-db.json
- 大小: 47444 字节
- 行数: 1
- 预览: {"meta": {"format": 3, "version": "7.11.0", "timestamp": "2025-11-05T00:57:30.958744", "branch_cover...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\databases\SKILL.md
- 大小: 7669 字节
- 行数: 233
- 预览: ---
name: databases
description: Work with MongoDB (document database, BSON documents, aggregation p...

#### coverage-web.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-frameworks\scripts\tests\coverage-web.json
- 大小: 34849 字节
- 行数: 1
- 预览: {"meta": {"format": 3, "version": "7.11.0", "timestamp": "2025-11-05T00:56:58.689936", "branch_cover...

#### security-testing-overview.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\security-testing-overview.md
- 大小: 2825 字节
- 行数: 93
- 预览: # Security Testing Overview

## OWASP Top 10 (2024)

| Rank | Vulnerability | Testing Method |
|----...

#### 2026-02-22-doctor-agent-design.md
- 路径: clawpal\docs\plans\2026-02-22-doctor-agent-design.md
- 大小: 3335 字节
- 行数: 81
- 预览: # Doctor Agent Design

Date: 2026-02-22

## Overview

Add AI-powered diagnostic and repair cap...

#### index.js
- 路径: company-brain\src\monitoring\index.js
- 大小: 6517 字节
- 行数: 258
- 预览: // 监控分析系统主模块

class MonitoringSystem {
  constructor(config = {}) {
    this.config = {
      ...con...

#### ec22b_ab8a37fc._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_ab8a37fc._.js
- 大小: 680510 字节
- 行数: 10941
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript...

#### ec22b_2de93cd0._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_2de93cd0._.js
- 大小: 688481 字节
- 行数: 11377
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_convex_dist_esm_server_951e273c._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_convex_dist_esm_server_951e273c._.js
- 大小: 149839 字节
- 行数: 2563
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### turbopack-content-pipeline_f260082d._.js
- 路径: content-pipeline\.next\dev\static\chunks\turbopack-content-pipeline_f260082d._.js
- 大小: 74971 字节
- 行数: 1860
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    typeof document === "object" ? docu...

#### turbopack-content-pipeline_pages__app_f36c7354._.js
- 路径: content-pipeline\.next\dev\static\chunks\turbopack-content-pipeline_pages__app_f36c7354._.js
- 大小: 74996 字节
- 行数: 1860
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    typeof document === "object" ? docu...

#### turbopack-content-pipeline_pages__error_8832cf8d._.js
- 路径: content-pipeline\.next\dev\static\chunks\turbopack-content-pipeline_pages__error_8832cf8d._.js
- 大小: 75002 字节
- 行数: 1860
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    typeof document === "object" ? docu...

#### data-collection-system.js
- 路径: data\life-decision-master\data-collection-system.js
- 大小: 12621 字节
- 行数: 446
- 预览: /**
 * 人生决策宗师数据收集系统
 * 用于收集和分析系统运行数据，支持基于数据的持续优化
 */

const fs = require('fs');
const path = require...

#### 2026-02-23-evaluation-report.md
- 路径: evaluation-reports\2026-02-23-evaluation-report.md
- 大小: 795 字节
- 行数: 55
- 预览: # 进化效果评估报告

## 报告信息
- **生成时间**: 2026-02-23T08:50:20.037Z
- **评估周期**: 24小时
- **评估智能体**: 绿茶智能体、大宗师智能体
...

#### evolution-monitoring-report.md
- 路径: evolution-monitoring-report.md
- 大小: 800 字节
- 行数: 50
- 预览: # 绿茶智能体进化系统监控报告

## 监控时间
2026-02-23T05:47:21.690Z

## 系统状态

### PCEC执行目录
- **状态**: ✅ 存在
- **执行记录数**:...

#### evolution-progress-report.js
- 路径: evolution-progress-report.js
- 大小: 4776 字节
- 行数: 155
- 预览: // EvoMap创新策略执行进度报告
const fs = require('fs');
const path = require('path');

console.log('==========...

#### analyticsSystem.js
- 路径: evomap-evolution\lib\analyticsSystem.js
- 大小: 10380 字节
- 行数: 349
- 预览: const fs = require('fs');
const path = require('path');

class AnalyticsSystem {
  constructor(confi...

#### execution-log.json
- 路径: execution-log.json
- 大小: 6996 字节
- 行数: 91
- 预览: [
  "[2026-02-24T20:56:34.841Z] =====================================",
  "[2026-02-24T20:56:34.846Z...

#### green-tea-evolution-verification-report.md
- 路径: green-tea-evolution-verification-report.md
- 大小: 3396 字节
- 行数: 172
- 预览: # 绿茶智能体进化系统验证报告

## 验证时间
2026年2月23日

## 验证项目概览

| 项目 | 状态 | 详细信息 |
|------|------|----------|
| 文件读取...

#### hotel-ai-sidecar.js
- 路径: HATwin\hotel-ai-sidecar.js
- 大小: 6476 字节
- 行数: 203
- 预览: /** 
 * 酒店投资分身 - 增强插件 (Sidecar)
 * 功能：Supabase认证 + PDF导出 + 分享裂变
 * 模式：非侵入式 DOM 注入
 */

// --- 1. 初始化...

#### htp-warning-signs.md
- 路径: HTP\projects\htp-insight\references\htp-warning-signs.md
- 大小: 7841 字节
- 行数: 616
- 预览: # HTP 房树人分析风险警示系统

## 目录
- [高风险指标](#高风险指标)
- [中风险指标](#中风险指标)
- [风险等级判定](#风险等级判定)
- [紧急建议模板](#紧急建议模板)...

#### test-report.md
- 路径: HTP\test-output\reports\test-report.md
- 大小: 140 字节
- 行数: 16
- 预览: # 房树人心理分析报告

## 看见 · 画面中的你
测试内容 - 看见

## 理解 · 潜意识的低语
测试内容 - 理解

## 成长 · 给未来的信
测试内容 - 成长

## 风险评估
风险等...

#### 3788de88cc227ec0e34d8212dccb9e5d333b3ee7ef626c06017db9ef52386baa.json
- 路径: installed_capsules\3788de88cc227ec0e34d8212dccb9e5d333b3ee7ef626c06017db9ef52386baa.json
- 大小: 2028 字节
- 行数: 43
- 预览: {
  "asset_id": "sha256:3788de88cc227ec0e34d8212dccb9e5d333b3ee7ef626c06017db9ef52386baa",
  "summar...

#### hotel-ai-sidecar.js
- 路径: LAY\hotel-ai-sidecar.js
- 大小: 6476 字节
- 行数: 203
- 预览: /** 
 * 酒店投资分身 - 增强插件 (Sidecar)
 * 功能：Supabase认证 + PDF导出 + 分享裂变
 * 模式：非侵入式 DOM 注入
 */

// --- 1. 初始化...

#### learning-records.json
- 路径: learning-records.json
- 大小: 2037 字节
- 行数: 42
- 预览: [
  {
    "capsule_id": "sha256:3788de88cc227ec0e34d8212dccb9e5d333b3ee7ef626c06017db9ef52386baa",
 ...

#### package.json
- 路径: life-choice\package.json
- 大小: 841 字节
- 行数: 32
- 预览: {
  "name": "life-choice",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts":...

#### 2f884_@popperjs_core_lib_bdb00c40._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_@popperjs_core_lib_bdb00c40._.js
- 大小: 164864 字节
- 行数: 2170
- 预览: module.exports = [
"[project]/mission-control/node_modules/@popperjs/core/lib/enums.js [app-ssr] (ec...

#### 2f884_@popperjs_core_lib_24bef838._.js
- 路径: mission-control\.next\dev\static\chunks\2f884_@popperjs_core_lib_24bef838._.js
- 大小: 166701 字节
- 行数: 2170
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### turbopack-mission-control_1f260310._.js
- 路径: mission-control\.next\dev\static\chunks\turbopack-mission-control_1f260310._.js
- 大小: 74968 字节
- 行数: 1860
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    typeof document === "object" ? docu...

#### real-green-tea-status-check.js
- 路径: real-green-tea-status-check.js
- 大小: 3482 字节
- 行数: 114
- 预览: // 绿茶智能体真实状态检查报告
const fs = require('fs');
const path = require('path');

console.log('=============...

#### security-risks.json
- 路径: security-risks.json
- 大小: 813 字节
- 行数: 37
- 预览: [
  {
    "type": "file_permission",
    "description": "配置文件 openclaw.json 权限过于宽松",
    "severity":...

#### reporting-config.json
- 路径: skills\capability-evolver\data\reporting-config.json
- 大小: 233 字节
- 行数: 9
- 预览: {
  "reportingTo": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9197bf2f8cf48a7097b17b623e3bd3",
  "exclusiveRepo...

#### report-38-1771917465741.json
- 路径: skills\capability-evolver\data\reports\report-38-1771917465741.json
- 大小: 509 字节
- 行数: 14
- 预览: {
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9197bf2f8cf48a7097b17b623e3bd3",
  "subject": "PCEC...

#### report-39-1771917649406.json
- 路径: skills\capability-evolver\data\reports\report-39-1771917649406.json
- 大小: 509 字节
- 行数: 14
- 预览: {
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9197bf2f8cf48a7097b17b623e3bd3",
  "subject": "PCEC...

#### report-40-1771917811672.json
- 路径: skills\capability-evolver\data\reports\report-40-1771917811672.json
- 大小: 509 字节
- 行数: 14
- 预览: {
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9197bf2f8cf48a7097b17b623e3bd3",
  "subject": "PCEC...

#### report-41-1771917949510.json
- 路径: skills\capability-evolver\data\reports\report-41-1771917949510.json
- 大小: 509 字节
- 行数: 14
- 预览: {
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9197bf2f8cf48a7097b17b623e3bd3",
  "subject": "PCEC...

#### report-42-1771918062091.json
- 路径: skills\capability-evolver\data\reports\report-42-1771918062091.json
- 大小: 509 字节
- 行数: 14
- 预览: {
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9197bf2f8cf48a7097b17b623e3bd3",
  "subject": "PCEC...

#### report-43-1771918249518.json
- 路径: skills\capability-evolver\data\reports\report-43-1771918249518.json
- 大小: 509 字节
- 行数: 14
- 预览: {
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9197bf2f8cf48a7097b17b623e3bd3",
  "subject": "PCEC...

#### report-44-1771918283462.json
- 路径: skills\capability-evolver\data\reports\report-44-1771918283462.json
- 大小: 816 字节
- 行数: 32
- 预览: {
  "id": "report-44-1771918283462",
  "cycle": 44,
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9...

#### report-45-1771918549460.json
- 路径: skills\capability-evolver\data\reports\report-45-1771918549460.json
- 大小: 509 字节
- 行数: 14
- 预览: {
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9197bf2f8cf48a7097b17b623e3bd3",
  "subject": "PCEC...

#### report-46-1771918583647.json
- 路径: skills\capability-evolver\data\reports\report-46-1771918583647.json
- 大小: 816 字节
- 行数: 32
- 预览: {
  "id": "report-46-1771918583647",
  "cycle": 46,
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9...

#### report-47-1771918849478.json
- 路径: skills\capability-evolver\data\reports\report-47-1771918849478.json
- 大小: 509 字节
- 行数: 14
- 预览: {
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9197bf2f8cf48a7097b17b623e3bd3",
  "subject": "PCEC...

#### report-48-1771918883545.json
- 路径: skills\capability-evolver\data\reports\report-48-1771918883545.json
- 大小: 816 字节
- 行数: 32
- 预览: {
  "id": "report-48-1771918883545",
  "cycle": 48,
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9...

#### report-49-1771919149476.json
- 路径: skills\capability-evolver\data\reports\report-49-1771919149476.json
- 大小: 509 字节
- 行数: 14
- 预览: {
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9197bf2f8cf48a7097b17b623e3bd3",
  "subject": "PCEC...

#### report-50-1771919183562.json
- 路径: skills\capability-evolver\data\reports\report-50-1771919183562.json
- 大小: 816 字节
- 行数: 32
- 预览: {
  "id": "report-50-1771919183562",
  "cycle": 50,
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9...

#### report-51-1771919637428.json
- 路径: skills\capability-evolver\data\reports\report-51-1771919637428.json
- 大小: 816 字节
- 行数: 32
- 预览: {
  "id": "report-51-1771919637428",
  "cycle": 51,
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9...

#### report-52-1771919937568.json
- 路径: skills\capability-evolver\data\reports\report-52-1771919937568.json
- 大小: 816 字节
- 行数: 32
- 预览: {
  "id": "report-52-1771919937568",
  "cycle": 52,
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9...

#### report-53-1771920036869.json
- 路径: skills\capability-evolver\data\reports\report-53-1771920036869.json
- 大小: 816 字节
- 行数: 32
- 预览: {
  "id": "report-53-1771920036869",
  "cycle": 53,
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9...

#### report-54-1771920637221.json
- 路径: skills\capability-evolver\data\reports\report-54-1771920637221.json
- 大小: 816 字节
- 行数: 32
- 预览: {
  "id": "report-54-1771920637221",
  "cycle": 54,
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9...

#### report-55-1771920937213.json
- 路径: skills\capability-evolver\data\reports\report-55-1771920937213.json
- 大小: 816 字节
- 行数: 32
- 预览: {
  "id": "report-55-1771920937213",
  "cycle": 55,
  "recipient": "陈婷（剑锋传奇）",
  "feishuId": "ou_4d9...

#### message-composition.md
- 路径: skills\himalaya\references\message-composition.md
- 大小: 3782 字节
- 行数: 183
- 预览: # Message Composition with MML (MIME Meta Language)

Himalaya uses MML for composing emails. MML is ...

#### README.md
- 路径: skills\openclaw-security-scanner\README.md
- 大小: 2522 字节
- 行数: 74
- 预览: # OpenClaw Security Scanner

A comprehensive, local-only security assessment tool for OpenClaw insta...

#### SKILL.md
- 路径: skills\openclaw-security-scanner\SKILL.md
- 大小: 1831 字节
- 行数: 62
- 预览: ---
name: security-scanner
description: Run a comprehensive local security scan on your OpenClaw ins...

#### SKILL.md
- 路径: skills\system-tools\SKILL.md
- 大小: 1692 字节
- 行数: 118
- 预览: ---
name: "system-tools"
description: "系统工具部署 SKILL，用于自动化安装和配置系统工具（如 PowerShell）"
author: "OpenClaw ...

#### bug_report.md
- 路径: Skill_Seekers\.github\ISSUE_TEMPLATE\bug_report.md
- 大小: 1002 字节
- 行数: 53
- 预览: ---
name: Bug Report
about: Report a bug or issue with Skill Seekers
title: '[BUG] '
labels: 'ty...

#### TEST_MCP_IN_CLAUDE_CODE.md
- 路径: Skill_Seekers\docs\archive\historical\TEST_MCP_IN_CLAUDE_CODE.md
- 大小: 7898 字节
- 行数: 343
- 预览: # Testing MCP Server in Claude Code

This guide shows you how to test the Skill Seeker MCP server ...

#### MIGRATION_GUIDE.md
- 路径: Skill_Seekers\docs\guides\MIGRATION_GUIDE.md
- 大小: 13075 字节
- 行数: 620
- 预览: # Migration Guide

**Version:** 2.7.0
**Last Updated:** 2026-01-18
**Status:** ✅ Production Read...

#### ruff_errors.txt
- 路径: Skill_Seekers\ruff_errors.txt
- 大小: 19495 字节
- 行数: 440
- 预览: ARG002 Unused method argument: `config_type`
   --> src/skill_seekers/cli/config_extractor.py:294:4...

#### README.codex.md
- 路径: Skill_Seekers\superpowers\docs\README.codex.md
- 大小: 2874 字节
- 行数: 121
- 预览: # Superpowers for Codex

Guide for using Superpowers with OpenAI Codex via native skill discovery.

...

#### spec-reviewer-prompt.md
- 路径: Skill_Seekers\superpowers\skills\subagent-driven-development\spec-reviewer-prompt.md
- 大小: 1995 字节
- 行数: 62
- 预览: # Spec Compliance Reviewer Prompt Template

Use this template when dispatching a spec compliance rev...

#### system-status.md
- 路径: system-status.md
- 大小: 2636 字节
- 行数: 82
- 预览: # System Status Report

## Current Status

**Date:** 2026-02-23
**Time:** $(Get-Date -Format "HH:mm:...

#### test-anti-degeneration-lock-comprehensive.js
- 路径: test-anti-degeneration-lock-comprehensive.js
- 大小: 16102 字节
- 行数: 519
- 预览: #!/usr/bin/env node

/**
 * Comprehensive test suite for Anti-Degeneration Lock functionality
 * Tes...

#### test-anti-degeneration-lock.js
- 路径: test-anti-degeneration-lock.js
- 大小: 5439 字节
- 行数: 206
- 预览: const { antiDegenerationLock } = require('./capabilities/anti-degeneration-lock');

console.log('===...

#### test-anti-metaphysics.js
- 路径: test-anti-metaphysics.js
- 大小: 3709 字节
- 行数: 141
- 预览: #!/usr/bin/env node

/**
 * 反玄学检测功能测试脚本
 * 测试反进化锁定是否能够正确检测和阻止使用玄学语言模式
 */

const fs = require('fs');...

#### test-capability-tree.js
- 路径: test-capability-tree.js
- 大小: 9019 字节
- 行数: 295
- 预览: /**
 * 能力树测试套件 (Capability Tree Test Suite)
 * 用于测试能力树的核心功能、集成和性能
 */

const { capabilityTree } = re...

#### test-capability-validator.js
- 路径: test-capability-validator.js
- 大小: 2772 字节
- 行数: 85
- 预览: /**
 * 能力树验证系统测试脚本
 * 用于测试能力树验证系统的各种功能
 */

const { capabilityTree } = require('./capabilities/capab...

#### test-knowledge-system.js
- 路径: test-knowledge-system.js
- 大小: 13834 字节
- 行数: 578
- 预览: /**
 * 知识系统测试脚本
 * 测试整个知识系统的功能，优化性能，改进质量
 */

const fs = require('fs');
const path = require('path')...

#### test-life-agent-capability-expansion.js
- 路径: test-life-agent-capability-expansion.js
- 大小: 9454 字节
- 行数: 320
- 预览: // 人生决策宗师能力扩展测试
const fs = require('fs');
const path = require('path');
const { lifeDecisionCapabili...

#### test-life-agent-feedback-mechanism.js
- 路径: test-life-agent-feedback-mechanism.js
- 大小: 12751 字节
- 行数: 436
- 预览: // 人生决策宗师用户反馈机制测试
const fs = require('fs');
const path = require('path');
const { lifeDecisionMaster...

#### test-life-value-integration.js
- 路径: test-life-value-integration.js
- 大小: 12950 字节
- 行数: 420
- 预览: // 人生决策宗师价值函数集成测试
const lifeValueIntegration = require('./agents/life/value-function-integration');
...

#### life-agent-data-collection-test-report.json
- 路径: test-reports\life-agent-data-collection-test-report.json
- 大小: 524 字节
- 行数: 26
- 预览: {
  "timestamp": "2026-02-24T18:44:36.669Z",
  "tests": {
    "数据收集系统初始化测试": true,
    "能力使用数据收集测试":...

#### test_report_1771954319224_42dnvh3q7.json
- 路径: test-results\test_report_1771954319224_42dnvh3q7.json
- 大小: 3517 字节
- 行数: 162
- 预览: {
  "id": "test_report_1771954319224_42dnvh3q7",
  "timestamp": 1771954319224,
  "totalTests": 20,
 ...

#### package-lock.json
- 路径: value-function-core\package-lock.json
- 大小: 131731 字节
- 行数: 3655
- 预览: {
  "name": "value-function-core",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,...

#### 标准化输出格式.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\references\标准化输出格式.md
- 大小: 3126 字节
- 行数: 234
- 预览: # 前台输出标准格式

## 1. 标准化决策分析报告

```markdown
========================================
📊 人生战略决策分析报告
====...

#### tier1-template.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\tier1-template.md
- 大小: 4254 字节
- 行数: 299
- 预览: # 一线城市酒店投资分析模板（北上广深）

## 模板说明
本模板适用于北京、上海、广州、深圳四个一线城市的酒店投资分析。

## 页面结构

### P1：城市宏观经济概况
**大标题示例**：北上...

#### tier2-3-template.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\tier2-3-template.md
- 大小: 10396 字节
- 行数: 654
- 预览: # 新一线+二三线城市属地酒店投资分析模板

## 模板说明
本模板适用于新一线城市（成都、杭州、重庆、武汉、西安、苏州、天津、南京、长沙、郑州、东莞、青岛、沈阳、宁波、佛山）及二三线城市的酒店投资分...

#### voice-styles.md
- 路径: 声音魔法\projects\voice-magician\references\voice-styles.md
- 大小: 6407 字节
- 行数: 267
- 预览: # 声音魔法师 - 音色与主题适配指南

## 目录
- [音色主题适配](#音色主题适配)
- [中文音色推荐](#中文音色推荐)
- [英文音色推荐](#英文音色推荐)
- [多语言音色](#多语...

#### report.js
- 路径: 大脑作弊器\projects\public\report.js
- 大小: 5595 字节
- 行数: 194
- 预览: // 投诉举报功能
(function() {
    'use strict';

    // 打开举报弹窗
    window.openReportModal = function() {
 ...

### config (370)

#### omomomo.md
- 路径: .claude\skills\oh-my-opencode-dev\.opencode\command\omomomo.md
- 大小: 1204 字节
- 行数: 38
- 预览: ---
description: Easter egg command - about oh-my-opencode
---

<command-instruction>
You found an e...

#### README.ko.md
- 路径: .claude\skills\oh-my-opencode-dev\README.ko.md
- 大小: 14760 字节
- 行数: 378
- 预览: > [!WARNING]
> **보안 경고: 사칭 사이트**
>
> **ohmyopencode.com은 이 프로젝트와 제휴 관계가 아닙니다.** 우리는 해당 사이트를 운영하거나 지지...

#### SKILL.md
- 路径: .claude\skills\oh-my-opencode-dev\src\features\builtin-skills\dev-browser\SKILL.md
- 大小: 7028 字节
- 行数: 214
- 预览: ---
name: dev-browser
description: Browser automation with persistent page state. Use when users ask...

#### AGENTS.md
- 路径: .claude\skills\oh-my-opencode-dev\src\mcp\AGENTS.md
- 大小: 1667 字节
- 行数: 66
- 预览: # MCP KNOWLEDGE BASE

## OVERVIEW

3 remote MCP servers: web search, documentation, code search. HTT...

#### AGENTS.md
- 路径: .claude\skills\oh-my-opencode-dev\src\shared\AGENTS.md
- 大小: 3498 字节
- 行数: 79
- 预览: # SHARED UTILITIES KNOWLEDGE BASE

## OVERVIEW
55 cross-cutting utilities: path resolution, token tr...

#### SKILL.md
- 路径: .claude\skills\openwork-dev\.opencode\skills\get-started\SKILL.md
- 大小: 636 字节
- 行数: 23
- 预览: ---
name: get-started
description: Guide users through the get started setup and Chrome DevTools dem...

#### SKILL.md
- 路径: .claude\skills\openwork-dev\.opencode\skills\opencode-bridge\SKILL.md
- 大小: 3631 字节
- 行数: 193
- 预览: ---
name: opencode-bridge
description: Bridge between OpenWork UI and OpenCode runtime
---

## Overv...

#### SKILL.md
- 路径: .claude\skills\openwork-dev\.opencode\skills\opencode-mirror\SKILL.md
- 大小: 476 字节
- 行数: 24
- 预览: ---
name: opencode-mirror
description: Maintain the local OpenCode mirror for self-reference
---

##...

#### SKILL.md
- 路径: .claude\skills\openwork-dev\.opencode\skills\opencode-primitives\SKILL.md
- 大小: 2883 字节
- 行数: 48
- 预览: ---
name: opencode-primitives
description: Reference OpenCode docs when implementing skills, plugins...

#### skill-creator.md
- 路径: .claude\skills\openwork-dev\packages\app\src\app\data\skill-creator.md
- 大小: 1142 字节
- 行数: 40
- 预览: ---
name: skill-creator
description: Guide for creating effective skills. Use when users want to cre...

#### tsconfig.json
- 路径: .claude\skills\openwork-dev\packages\app\tsconfig.json
- 大小: 450 字节
- 行数: 19
- 预览: {
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": ...

#### package.json
- 路径: .claude\skills\openwork-dev\packages\desktop\package.json
- 大小: 413 字节
- 行数: 16
- 预览: {
  "name": "@different-ai/openwork",
  "private": true,
  "version": "0.4.2",
  "type": "module",
 ...

#### tauri.conf.json
- 路径: .claude\skills\openwork-dev\packages\desktop\src-tauri\tauri.conf.json
- 大小: 1325 字节
- 行数: 50
- 预览: {
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "OpenWork",
  "version": "0.4.2...

#### package.json
- 路径: .claude\skills\openwork-dev\packages\owpenbot\package.json
- 大小: 1581 字节
- 行数: 61
- 预览: {
  "name": "owpenwork",
  "version": "0.1.16",
  "description": "WhatsApp bridge for a running Open...

#### package.json
- 路径: .claude\skills\openwork-dev\packages\server\package.json
- 大小: 615 字节
- 行数: 28
- 预览: {
  "name": "@different-ai/openwork-server",
  "version": "0.1.0",
  "private": true,
  "type": "mod...

#### README.md
- 路径: .claude\skills\openwork-dev\packages\server\README.md
- 大小: 2046 字节
- 行数: 71
- 预览: # OpenWork Server

Filesystem-backed API for OpenWork remote clients. This package provides the Open...

#### README.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\scripts\README.md
- 大小: 606 字节
- 行数: 31
- 预览: # APIMart 批量出图（本地脚本）

这个目录用于“阶段4 Prompt Pack 已确认后”的批量出图。

## 1) 配置

把配置写到 `scripts/apimart.env`（建议只放...

#### api-config.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\api-config.md
- 大小: 233 字节
- 行数: 15
- 预览: ## API 配置

> 建议：把真实 `TOKEN` 放在 `scripts/apimart.env`（本地文件），不要写进文档/仓库或聊天记录。

```
API_URL: https://api...

#### plan_20260203_092247.md
- 路径: .trae\documents\plan_20260203_092247.md
- 大小: 1219 字节
- 行数: 77
- 预览: ## 部署失败问题分析与解决方案

### 问题分析

**错误信息：**
```
error TS18003: No inputs were found in config file '/verce...

#### plan_20260203_093539.md
- 路径: .trae\documents\plan_20260203_093539.md
- 大小: 1216 字节
- 行数: 85
- 预览: ## 解决Vercel部署失败问题的方案

### 问题分析

**错误信息：**
```
Failed to resolve /src/main.tsx from /vercel/path0/ind...

#### plan_20260204_011641.md
- 路径: .trae\documents\plan_20260204_011641.md
- 大小: 1449 字节
- 行数: 97
- 预览: ## 解决Vercel部署路径解析问题的方案

### 问题分析

**错误信息：**
```
[vite:build-html] Failed to resolve ./src/main.tsx f...

#### plan_20260204_022123.md
- 路径: .trae\documents\plan_20260204_022123.md
- 大小: 1315 字节
- 行数: 82
- 预览: ## 解决Vercel部署缓存问题的方案

### 问题分析

**错误信息：**
```
[vite:build-html] Failed to resolve ./src/main.tsx fro...

#### plan_20260204_023827.md
- 路径: .trae\documents\plan_20260204_023827.md
- 大小: 1285 字节
- 行数: 89
- 预览: ## 解决Vercel构建失败问题的方案

### 问题分析

**错误信息：**

```
Command "npm run build" exited with 1
[vite:build-htm...

#### 修复AI服务不可用和红绿灯显示问题.md
- 路径: .trae\documents\修复AI服务不可用和红绿灯显示问题.md
- 大小: 875 字节
- 行数: 49
- 预览: ## 问题分析

### 1. API调用问题
- 当前代码调用的是本地API (`http://localhost:3000/api/decision-analysis`)
- 用户希望使用阿里云的...

#### 修改积分充值比例和处理敏感信息.md
- 路径: .trae\documents\修改积分充值比例和处理敏感信息.md
- 大小: 915 字节
- 行数: 44
- 预览: ## 1. 积分充值比例修改

### 修改内容：
1. **更新充值选项配置**
   - 文件：`src/components/PointsManager.tsx`
   - 将充值选项数组中的积...

#### 解决后端MongoDB数据库连接失败问题.md
- 路径: .trae\documents\解决后端MongoDB数据库连接失败问题.md
- 大小: 1722 字节
- 行数: 93
- 预览: # 解决后端MongoDB数据库连接失败问题

## 问题分析

从错误信息 `MongooseServerSelectionError: connect ECONNREFUSED ::1:27017...

#### 阿里云百炼 API 调用问题修复计划.md
- 路径: .trae\documents\阿里云百炼 API 调用问题修复计划.md
- 大小: 825 字节
- 行数: 44
- 预览: ## 问题分析

经过网络连接测试和代码分析，发现阿里云百炼 API 调用可能存在以下问题：

1. **请求格式不匹配** - 当前代码使用的请求体格式与阿里云百炼 API 预期格式可能不一致
2....

#### package.json
- 路径: .trae\skills\awkn-platform_awkn-platform\frontend\package.json
- 大小: 737 字节
- 行数: 33
- 预览: {
  "name": "awkn-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "nex...

#### cinematic.md
- 路径: .trae\skills\baokuan\awkn-comic\references\layouts\cinematic.md
- 大小: 450 字节
- 行数: 24
- 预览: # cinematic

Wide panels, filmic feel

## Panel Structure

- **Panels per page**: 2-4
- **Structure*...

#### mixed.md
- 路径: .trae\skills\baokuan\awkn-comic\references\layouts\mixed.md
- 大小: 429 字节
- 行数: 24
- 预览: # mixed

Dynamic, varied rhythm

## Panel Structure

- **Panels per page**: 3-7 (varies)
- **Structu...

#### splash.md
- 路径: .trae\skills\baokuan\awkn-comic\references\layouts\splash.md
- 大小: 471 字节
- 行数: 24
- 预览: # splash

Impact-focused, key moments

## Panel Structure

- **Panels per page**: 1-2 large + 2-3 sm...

#### standard.md
- 路径: .trae\skills\baokuan\awkn-comic\references\layouts\standard.md
- 大小: 435 字节
- 行数: 24
- 预览: # standard

Classic comic grid, versatile

## Panel Structure

- **Panels per page**: 4-6
- **Struct...

#### requirements.txt
- 路径: .trae\skills\baokuan\requirements.txt
- 大小: 2217 字节
- 行数: 126
- 预览: altgraph==0.17.5
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.12.1
APScheduler==3.11.2
astro...

#### requirements.txt
- 路径: .trae\skills\BUG\requirements.txt
- 大小: 2217 字节
- 行数: 126
- 预览: altgraph==0.17.5
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.12.1
APScheduler==3.11.2
astro...

#### LICENSE.txt
- 路径: .trae\skills\canvas-design\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\channel\web\README.md
- 大小: 288 字节
- 行数: 11
- 预览: # Web Channel

提供了一个默认的AI对话页面，可展示文本、图片等消息交互，支持markdown语法渲染，兼容插件执行。

# 使用说明

 - 在 `config.json` 配置文件中...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\channel\wechatcom\README.md
- 大小: 2069 字节
- 行数: 86
- 预览: # 企业微信应用号channel

企业微信官方提供了客服、应用等API，本channel使用的是企业微信的自建应用API的能力。

因为未来可能还会开发客服能力，所以本channel的类型名叫作`w...

#### release-notes.md
- 路径: .trae\skills\chatgpt-on-wechat-master\docs\version\release-notes.md
- 大小: 3877 字节
- 行数: 52
- 预览: ## 更新日志

>**2025.05.23：** [1.7.6版本](https://github.com/zhayujie/chatgpt-on-wechat/releases/tag/1.7.6...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\agent\README.md
- 大小: 1327 字节
- 行数: 67
- 预览: # Agent插件

## 插件说明

基于 [AgentMesh](https://github.com/MinimalFuture/AgentMesh) 多智能体框架实现的Agent插件，可以让机...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\banwords\README.md
- 大小: 561 字节
- 行数: 27
- 预览: 
## 插件描述

简易的敏感词插件，暂不支持分词，请自行导入词库到插件文件夹中的`banwords.txt`，每行一个词，一个参考词库是[1](https://github.com/cjh0613/...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\bdunit\README.md
- 大小: 569 字节
- 行数: 30
- 预览: ## 插件说明

利用百度UNIT实现智能对话

- 1.解决问题：chatgpt无法处理的指令，交给百度UNIT处理如：天气，日期时间，数学运算等
- 2.如问时间：现在几点钟，今天几号
- 3.如...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\godcmd\README.md
- 大小: 348 字节
- 行数: 19
- 预览: ## 插件说明

指令插件

## 插件使用

将`config.json.template`复制为`config.json`，并修改其中`password`的值为口令。

如果没有设置命令，在命令行...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\keyword\README.md
- 大小: 164 字节
- 行数: 13
- 预览: # 目的
关键字匹配并回复

# 试用场景
目前是在微信公众号下面使用过。

# 使用步骤
1. 复制 `config.json.template` 为 `config.json`
2. 在关键字 `...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\linkai\README.md
- 大小: 3632 字节
- 行数: 112
- 预览: ## 插件说明

基于 LinkAI 提供的知识库、Midjourney绘画、文档对话等能力对机器人的功能进行增强。平台地址: https://link-ai.tech/console

## 插件配...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\README.md
- 大小: 8185 字节
- 行数: 274
- 预览: **Table of Content**

- [插件化初衷](#插件化初衷)
- [插件安装方法](#插件安装方法)
- [插件化实现](#插件化实现)
- [插件编写示例](#插件编写示例)
- ...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\voice\baidu\README.md
- 大小: 1537 字节
- 行数: 55
- 预览: ## 说明
百度语音识别与合成参数说明
百度语音依赖，经常会出现问题，可能就是缺少依赖：
pip install baidu-aip
pip install pydub
pip install pys...

#### config.json
- 路径: .trae\skills\cline-main\.changeset\config.json
- 大小: 266 字节
- 行数: 12
- 预览: {
	"$schema": "https://unpkg.com/@changesets/config@3.0.5/schema.json",
	"changelog": "@changesets/c...

#### endpoint-config-file.md
- 路径: .trae\skills\cline-main\.changeset\endpoint-config-file.md
- 大小: 353 字节
- 行数: 8
- 预览: ---
"claude-dev": patch
---

Add endpoint configuration file support for on-premise deployments

Ent...

#### violet-parrots-tell.md
- 路径: .trae\skills\cline-main\.changeset\violet-parrots-tell.md
- 大小: 352 字节
- 行数: 6
- 预览: ---
"claude-dev": patch
---

Disable PostHog and build-time OpenTelemetry telemetry in self-hosted/o...

#### network.md
- 路径: .trae\skills\cline-main\.clinerules\network.md
- 大小: 2725 字节
- 行数: 91
- 预览: # Networking & Proxy Support

To ensure Cline works correctly in all environments (VSCode, JetBrains...

#### find-pr-reviewers.md
- 路径: .trae\skills\cline-main\.clinerules\workflows\find-pr-reviewers.md
- 大小: 2644 字节
- 行数: 50
- 预览: # Find Best Reviewers for Current Branch

Analyze my current branch to find the best people to revie...

#### launch.json
- 路径: .trae\skills\cline-main\.vscode\launch.json
- 大小: 5562 字节
- 行数: 204
- 预览: // A launch configuration that compiles the extension and then opens it inside a new window
// Use I...

#### package-lock.json
- 路径: .trae\skills\cline-main\docs\package-lock.json
- 大小: 418914 字节
- 行数: 12510
- 预览: {
	"name": "docs",
	"version": "1.0.0",
	"lockfileVersion": 3,
	"requires": true,
	"packages": {
		"...

#### package-lock.json
- 路径: .trae\skills\cline-main\evals\package-lock.json
- 大小: 107985 字节
- 行数: 2765
- 预览: {
  "name": "cline-evals",
  "version": "0.1.0",
  "lockfileVersion": 2,
  "requires": true,
  "pack...

#### tsconfig.json
- 路径: .trae\skills\cline-main\evals\tsconfig.json
- 大小: 79 字节
- 行数: 7
- 预览: {
	"extends": "../tsconfig.json",
	"compilerOptions": {
		"baseUrl": ".."
	}
}


#### knip.json
- 路径: .trae\skills\cline-main\knip.json
- 大小: 495 字节
- 行数: 24
- 预览: {
	"entry": [
		"src/extension.ts",
		"src/standalone/cline-core.ts",
		"src/generated/hosts/standal...

#### README.md
- 路径: .trae\skills\cline-main\src\core\prompts\system-prompt\__tests__\README.md
- 大小: 4117 字节
- 行数: 115
- 预览: # System Prompt Integration Tests

This directory contains integration tests for the system prompt g...

#### test-setup.js
- 路径: .trae\skills\cline-main\test-setup.js
- 大小: 1389 字节
- 行数: 40
- 预览: const tsConfigPaths = require("tsconfig-paths")
const fs = require("fs")
const path = require("path"...

#### package-lock.json
- 路径: .trae\skills\cline-main\testing-platform\package-lock.json
- 大小: 13956 字节
- 行数: 409
- 预览: {
	"name": "testing-infra",
	"version": "0.1.0",
	"lockfileVersion": 3,
	"requires": true,
	"package...

#### tsconfig.test.json
- 路径: .trae\skills\cline-main\tsconfig.test.json
- 大小: 900 字节
- 行数: 35
- 预览: {
	// This separate tsconfig is necessary because VS Code's test runner requires CommonJS modules,
	...

#### tsconfig.unit-test.json
- 路径: .trae\skills\cline-main\tsconfig.unit-test.json
- 大小: 333 字节
- 行数: 24
- 预览: {
	"extends": "./tsconfig.json",
	"compilerOptions": {
		"module": "commonjs",
		"moduleResolution":...

#### README.md
- 路径: .trae\skills\cline-main\webview-ui\.storybook\README.md
- 大小: 7708 字节
- 行数: 254
- 预览: # Storybook Documentation

## What is Storybook?

Storybook is a frontend workshop for building UI c...

#### components.json
- 路径: .trae\skills\cline-main\webview-ui\components.json
- 大小: 435 字节
- 行数: 23
- 预览: {
	"$schema": "https://ui.shadcn.com/schema.json",
	"style": "new-york",
	"rsc": false,
	"tsx": true...

#### README.md
- 路径: .trae\skills\cline-main\webview-ui\src\components\settings\README.md
- 大小: 5394 字节
- 行数: 161
- 预览: # API Options Component Architecture

This directory contains the refactored API Options components ...

#### tsconfig.app.json
- 路径: .trae\skills\cline-main\webview-ui\tsconfig.app.json
- 大小: 922 字节
- 行数: 55
- 预览: {
	"compilerOptions": {
		"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
		"targ...

#### tsconfig.json
- 路径: .trae\skills\cline-main\webview-ui\tsconfig.json
- 大小: 214 字节
- 行数: 20
- 预览: {
	"files": [],
	"references": [
		{
			"path": "./tsconfig.app.json"
		},
		{
			"path": "./tsconfi...

#### tsconfig.node.json
- 路径: .trae\skills\cline-main\webview-ui\tsconfig.node.json
- 大小: 568 字节
- 行数: 29
- 预览: {
	"compilerOptions": {
		"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
		"tar...

#### LICENSE.txt
- 路径: .trae\skills\frontend-design\LICENSE.txt
- 大小: 10174 字节
- 行数: 178
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### requirements.txt
- 路径: .trae\skills\mindzuobi\requirements.txt
- 大小: 2217 字节
- 行数: 126
- 预览: altgraph==0.17.5
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.12.1
APScheduler==3.11.2
astro...

#### SKILL.md
- 路径: .trae\skills\obsidian-skills\skills\obsidian-bases\SKILL.md
- 大小: 18541 字节
- 行数: 652
- 预览: ---
name: obsidian-bases
description: Create and edit Obsidian Bases (.base files) with views, fil...

#### requirements.txt
- 路径: .trae\skills\renshengjuece\requirements.txt
- 大小: 2217 字节
- 行数: 126
- 预览: altgraph==0.17.5
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.12.1
APScheduler==3.11.2
astro...

#### LICENSE.txt
- 路径: .trae\skills\skill-installer\LICENSE.txt
- 大小: 11358 字节
- 行数: 203
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\algorithmic-art\LICENSE.txt
- 大小: 11558 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 2...

#### generator_template.js
- 路径: .trae\skills\skills\skills\algorithmic-art\templates\generator_template.js
- 大小: 7598 字节
- 行数: 223
- 预览: /**
 * ═══════════════════════════════════════════════════════════════════════════
 *             ...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\brand-guidelines\LICENSE.txt
- 大小: 11558 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 2...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\canvas-design\LICENSE.txt
- 大小: 11558 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 2...

#### docx-js.md
- 路径: .trae\skills\skills\skills\docx\docx-js.md
- 大小: 16798 字节
- 行数: 350
- 预览: # DOCX Library Tutorial

Generate .docx files with JavaScript/TypeScript.

**Important: Read thi...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\frontend-design\LICENSE.txt
- 大小: 10351 字节
- 行数: 178
- 预览: 
                                 Apache License
                           Version 2.0, January 2...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\internal-comms\LICENSE.txt
- 大小: 11558 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 2...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\mcp-builder\LICENSE.txt
- 大小: 11558 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 2...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\skill-creator\LICENSE.txt
- 大小: 11558 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 2...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\slack-gif-creator\LICENSE.txt
- 大小: 11558 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 2...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\theme-factory\LICENSE.txt
- 大小: 11558 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 2...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\web-artifacts-builder\LICENSE.txt
- 大小: 11558 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 2...

#### SKILL.md
- 路径: .trae\skills\skills\skills\web-artifacts-builder\SKILL.md
- 大小: 3146 字节
- 行数: 74
- 预览: ---
name: web-artifacts-builder
description: Suite of tools for creating elaborate, multi-componen...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\webapp-testing\LICENSE.txt
- 大小: 11558 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 2...

#### SKILL.md
- 路径: .trae\skills\skills\skills\xlsx\SKILL.md
- 大小: 10916 字节
- 行数: 289
- 预览: ---
name: xlsx
description: "Comprehensive spreadsheet creation, editing, and analysis with suppor...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\algorithmic-art\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### generator_template.js
- 路径: .trae\skills\skills-main\skills\algorithmic-art\templates\generator_template.js
- 大小: 7376 字节
- 行数: 223
- 预览: /**
 * ═══════════════════════════════════════════════════════════════════════════
 *               ...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\brand-guidelines\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\canvas-design\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### docx-js.md
- 路径: .trae\skills\skills-main\skills\docx\docx-js.md
- 大小: 16449 字节
- 行数: 350
- 预览: # DOCX Library Tutorial

Generate .docx files with JavaScript/TypeScript.

**Important: Read this en...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\frontend-design\LICENSE.txt
- 大小: 10174 字节
- 行数: 178
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\internal-comms\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\mcp-builder\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\skill-creator\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\slack-gif-creator\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\theme-factory\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\web-artifacts-builder\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\web-artifacts-builder\SKILL.md
- 大小: 3073 字节
- 行数: 74
- 预览: ---
name: web-artifacts-builder
description: Suite of tools for creating elaborate, multi-component ...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\webapp-testing\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\xlsx\SKILL.md
- 大小: 10628 字节
- 行数: 289
- 预览: ---
name: xlsx
description: "Comprehensive spreadsheet creation, editing, and analysis with support ...

#### LICENSE.txt
- 路径: .trae\skills\theme-factory\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### CLAUDE.md
- 路径: .trae\skills\ui-ux-pro-max-skill\CLAUDE.md
- 大小: 3942 字节
- 行数: 98
- 预览: # CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in...

#### README.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\scripts\README.md
- 大小: 606 字节
- 行数: 31
- 预览: # APIMart 批量出图（本地脚本）

这个目录用于“阶段4 Prompt Pack 已确认后”的批量出图。

## 1) 配置

把配置写到 `scripts/apimart.env`（建议只放...

#### api-config.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\api-config.md
- 大小: 233 字节
- 行数: 15
- 预览: ## API 配置

> 建议：把真实 `TOKEN` 放在 `scripts/apimart.env`（本地文件），不要写进文档/仓库或聊天记录。

```
API_URL: https://api...

#### distutils.schema.json
- 路径: .venv\Lib\site-packages\setuptools\config\distutils.schema.json
- 大小: 972 字节
- 行数: 27
- 预览: {
  "$schema": "http://json-schema.org/draft-07/schema#",

  "$id": "https://setuptools.pypa.io/en/l...

#### setuptools.schema.json
- 路径: .venv\Lib\site-packages\setuptools\config\setuptools.schema.json
- 大小: 16071 字节
- 行数: 434
- 预览: {
  "$schema": "http://json-schema.org/draft-07/schema#",

  "$id": "https://setuptools.pypa.io/en/l...

#### entry_points.txt
- 路径: .venv\Lib\site-packages\skill_seekers-2.9.0.dist-info\entry_points.txt
- 大小: 1132 字节
- 行数: 20
- 预览: [console_scripts]
skill-seekers = skill_seekers.cli.main:main
skill-seekers-codebase = skill_seekers...

#### admin-config.json
- 路径: admin-config.json
- 大小: 385 字节
- 行数: 19
- 预览: {
  "admin": {
    "name": "陈婷",
    "nickname": "剑锋传奇",
    "feishu_id": "ou_4d9197bf2f8cf48a7097b1...

#### ADMIN_CONFIG.json
- 路径: ADMIN_CONFIG.json
- 大小: 411 字节
- 行数: 22
- 预览: {
  "admin": {
    "name": "陈婷（剑锋传奇）",
    "feishu_id": "ou_4d9197bf2f8cf48a7097b17b623e3bd3",
    "...

#### AGENTS.md
- 路径: agents\business\AGENTS.md
- 大小: 7805 字节
- 行数: 213
- 预览: # AGENTS.md - Your Workspace

This folder is home. Treat it that way.

## First Run

If `BOOTSTRAP.m...

#### skill-share-config.json
- 路径: agents\company-brain-agent\skill-configs\skill-share-config.json
- 大小: 67 字节
- 行数: 4
- 预览: {
  "sharedSkillsPath": "../../../skills",
  "privateConfigs": {}
}

#### AGENTS.md
- 路径: agents\coo\AGENTS.md
- 大小: 7805 字节
- 行数: 213
- 预览: # AGENTS.md - Your Workspace

This folder is home. Treat it that way.

## First Run

If `BOOTSTRAP.m...

#### AGENTS.md
- 路径: agents\green-tea\AGENTS.md
- 大小: 7805 字节
- 行数: 213
- 预览: # AGENTS.md - Your Workspace

This folder is home. Treat it that way.

## First Run

If `BOOTSTRAP.m...

#### skill-share-config.json
- 路径: agents\green-tea\skill-configs\skill-share-config.json
- 大小: 67 字节
- 行数: 4
- 预览: {
  "sharedSkillsPath": "../../../skills",
  "privateConfigs": {}
}

#### skill-share-config.json
- 路径: agents\master\skill-configs\skill-share-config.json
- 大小: 67 字节
- 行数: 4
- 预览: {
  "sharedSkillsPath": "../../../skills",
  "privateConfigs": {}
}

#### cinematic.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\layouts\cinematic.md
- 大小: 450 字节
- 行数: 24
- 预览: # cinematic

Wide panels, filmic feel

## Panel Structure

- **Panels per page**: 2-4
- **Structure*...

#### mixed.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\layouts\mixed.md
- 大小: 429 字节
- 行数: 24
- 预览: # mixed

Dynamic, varied rhythm

## Panel Structure

- **Panels per page**: 3-7 (varies)
- **Structu...

#### splash.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\layouts\splash.md
- 大小: 471 字节
- 行数: 24
- 预览: # splash

Impact-focused, key moments

## Panel Structure

- **Panels per page**: 1-2 large + 2-3 sm...

#### standard.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\layouts\standard.md
- 大小: 435 字节
- 行数: 24
- 预览: # standard

Classic comic grid, versatile

## Panel Structure

- **Panels per page**: 4-6
- **Struct...

#### requirements.txt
- 路径: AI爆款进化实验室\projects\requirements.txt
- 大小: 2217 字节
- 行数: 126
- 预览: altgraph==0.17.5
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.12.1
APScheduler==3.11.2
astro...

#### components.json
- 路径: AWKN-LAB\components.json
- 大小: 461 字节
- 行数: 23
- 预览: {
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": ...

#### eslint.config.js
- 路径: AWKN-LAB\eslint.config.js
- 大小: 616 字节
- 行数: 24
- 预览: import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-reac...

#### package-lock.json
- 路径: AWKN-LAB\package-lock.json
- 大小: 338146 字节
- 行数: 9253
- 预览: {
  "name": "awkn-lab",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "package...

#### package.json
- 路径: AWKN-LAB\package.json
- 大小: 2646 字节
- 行数: 83
- 预览: {
  "name": "awkn-lab",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
...

#### README.md
- 路径: AWKN-LAB\README.md
- 大小: 2555 字节
- 行数: 74
- 预览: # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite wit...

#### tailwind.config.js
- 路径: AWKN-LAB\tailwind.config.js
- 大小: 2777 字节
- 行数: 84
- 预览: /** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['....

#### tsconfig.app.json
- 路径: AWKN-LAB\tsconfig.app.json
- 大小: 820 字节
- 行数: 35
- 预览: {
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    ...

#### tsconfig.json
- 路径: AWKN-LAB\tsconfig.json
- 大小: 232 字节
- 行数: 17
- 预览: {
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "pat...

#### tsconfig.node.json
- 路径: AWKN-LAB\tsconfig.node.json
- 大小: 653 字节
- 行数: 27
- 预览: {
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
   ...

#### components.json
- 路径: AWKN-LAB - 副本\components.json
- 大小: 461 字节
- 行数: 23
- 预览: {
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": ...

#### eslint.config.js
- 路径: AWKN-LAB - 副本\eslint.config.js
- 大小: 616 字节
- 行数: 24
- 预览: import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-reac...

#### package-lock.json
- 路径: AWKN-LAB - 副本\package-lock.json
- 大小: 338126 字节
- 行数: 9252
- 预览: {
  "name": "awkn-lab",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "package...

#### package.json
- 路径: AWKN-LAB - 副本\package.json
- 大小: 2646 字节
- 行数: 83
- 预览: {
  "name": "awkn-lab",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
...

#### README.md
- 路径: AWKN-LAB - 副本\README.md
- 大小: 2555 字节
- 行数: 74
- 预览: # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite wit...

#### tailwind.config.js
- 路径: AWKN-LAB - 副本\tailwind.config.js
- 大小: 2777 字节
- 行数: 84
- 预览: /** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['....

#### tsconfig.app.json
- 路径: AWKN-LAB - 副本\tsconfig.app.json
- 大小: 820 字节
- 行数: 35
- 预览: {
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    ...

#### tsconfig.json
- 路径: AWKN-LAB - 副本\tsconfig.json
- 大小: 232 字节
- 行数: 17
- 预览: {
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "pat...

#### tsconfig.node.json
- 路径: AWKN-LAB - 副本\tsconfig.node.json
- 大小: 653 字节
- 行数: 27
- 预览: {
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
   ...

#### PointsLog.js
- 路径: awkn-platform\backend\src\models\PointsLog.js
- 大小: 1542 字节
- 行数: 75
- 预览: const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
con...

#### RechargeOrder.js
- 路径: awkn-platform\backend\src\models\RechargeOrder.js
- 大小: 1731 字节
- 行数: 95
- 预览: const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
con...

#### User.js
- 路径: awkn-platform\backend\src\models\User.js
- 大小: 1658 字节
- 行数: 87
- 预览: const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
con...

#### package.json
- 路径: awkn-platform\frontend\package.json
- 大小: 737 字节
- 行数: 33
- 预览: {
  "name": "awkn-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "nex...

#### deployment_configuration.md
- 路径: capabilities\deployment_configuration.md
- 大小: 544 字节
- 行数: 53
- 预览: # OpenClaw部署配置能力

## 能力轮廓（Capability Shape）

### 输入
- 项目名称/路径
- 模型配置需求（Trea内置模型或API模型）
- 通道配置需求（如Fei...

#### hot-info-cache.js
- 路径: capabilities\hot-info-cache.js
- 大小: 8907 字节
- 行数: 423
- 预览: /**
 * 热点信息缓存系统
 * 用于缓存高频访问的信息，提高查询响应速度
 * 解决1秒内响应所有查询请求的瓶颈问题
 */

class HotInfoCache {
  constructo...

#### README.md
- 路径: chatgpt-on-wechat-master\channel\web\README.md
- 大小: 288 字节
- 行数: 11
- 预览: # Web Channel

提供了一个默认的AI对话页面，可展示文本、图片等消息交互，支持markdown语法渲染，兼容插件执行。

# 使用说明

 - 在 `config.json` 配置文件中...

#### README.md
- 路径: chatgpt-on-wechat-master\channel\wechatcom\README.md
- 大小: 2069 字节
- 行数: 86
- 预览: # 企业微信应用号channel

企业微信官方提供了客服、应用等API，本channel使用的是企业微信的自建应用API的能力。

因为未来可能还会开发客服能力，所以本channel的类型名叫作`w...

#### release-notes.md
- 路径: chatgpt-on-wechat-master\docs\version\release-notes.md
- 大小: 3877 字节
- 行数: 52
- 预览: ## 更新日志

>**2025.05.23：** [1.7.6版本](https://github.com/zhayujie/chatgpt-on-wechat/releases/tag/1.7.6...

#### README.md
- 路径: chatgpt-on-wechat-master\plugins\agent\README.md
- 大小: 1327 字节
- 行数: 67
- 预览: # Agent插件

## 插件说明

基于 [AgentMesh](https://github.com/MinimalFuture/AgentMesh) 多智能体框架实现的Agent插件，可以让机...

#### README.md
- 路径: chatgpt-on-wechat-master\plugins\banwords\README.md
- 大小: 561 字节
- 行数: 27
- 预览: 
## 插件描述

简易的敏感词插件，暂不支持分词，请自行导入词库到插件文件夹中的`banwords.txt`，每行一个词，一个参考词库是[1](https://github.com/cjh0613/...

#### README.md
- 路径: chatgpt-on-wechat-master\plugins\bdunit\README.md
- 大小: 569 字节
- 行数: 30
- 预览: ## 插件说明

利用百度UNIT实现智能对话

- 1.解决问题：chatgpt无法处理的指令，交给百度UNIT处理如：天气，日期时间，数学运算等
- 2.如问时间：现在几点钟，今天几号
- 3.如...

#### README.md
- 路径: chatgpt-on-wechat-master\plugins\godcmd\README.md
- 大小: 348 字节
- 行数: 19
- 预览: ## 插件说明

指令插件

## 插件使用

将`config.json.template`复制为`config.json`，并修改其中`password`的值为口令。

如果没有设置命令，在命令行...

#### README.md
- 路径: chatgpt-on-wechat-master\plugins\keyword\README.md
- 大小: 164 字节
- 行数: 13
- 预览: # 目的
关键字匹配并回复

# 试用场景
目前是在微信公众号下面使用过。

# 使用步骤
1. 复制 `config.json.template` 为 `config.json`
2. 在关键字 `...

#### README.md
- 路径: chatgpt-on-wechat-master\plugins\linkai\README.md
- 大小: 3632 字节
- 行数: 112
- 预览: ## 插件说明

基于 LinkAI 提供的知识库、Midjourney绘画、文档对话等能力对机器人的功能进行增强。平台地址: https://link-ai.tech/console

## 插件配...

#### README.md
- 路径: chatgpt-on-wechat-master\plugins\README.md
- 大小: 8185 字节
- 行数: 274
- 预览: **Table of Content**

- [插件化初衷](#插件化初衷)
- [插件安装方法](#插件安装方法)
- [插件化实现](#插件化实现)
- [插件编写示例](#插件编写示例)
- ...

#### README.md
- 路径: chatgpt-on-wechat-master\voice\baidu\README.md
- 大小: 1537 字节
- 行数: 55
- 预览: ## 说明
百度语音识别与合成参数说明
百度语音依赖，经常会出现问题，可能就是缺少依赖：
pip install baidu-aip
pip install pydub
pip install pys...

#### check-specific-tasks.js
- 路径: check-specific-tasks.js
- 大小: 4800 字节
- 行数: 189
- 预览: const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto...

#### claim-all-tasks.js
- 路径: claim-all-tasks.js
- 大小: 5219 字节
- 行数: 228
- 预览: const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto...

#### claim-attempt.js
- 路径: claim-attempt.js
- 大小: 4026 字节
- 行数: 179
- 预览: const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto...

#### claim-two-tasks.js
- 路径: claim-two-tasks.js
- 大小: 4628 字节
- 行数: 202
- 预览: const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto...

#### backend-architecture.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\backend-development\references\backend-architecture.md
- 大小: 11297 字节
- 行数: 455
- 预览: # Backend Architecture Patterns

Microservices, event-driven architecture, and scalability patterns ...

#### advanced-features.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\better-auth\references\advanced-features.md
- 大小: 10604 字节
- 行数: 554
- 预览: # Advanced Features

Better Auth plugins extend functionality beyond basic authentication.

## Two-F...

#### email-password-auth.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\better-auth\references\email-password-auth.md
- 大小: 8567 字节
- 行数: 417
- 预览: # Email/Password Authentication

Email/password is built-in auth method in Better Auth. No plugins r...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\better-auth\scripts\requirements.txt
- 大小: 402 字节
- 行数: 16
- 预览: # Better Auth Skill Dependencies
# Python 3.10+ required

# No Python package dependencies - uses on...

#### package-lock.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\package-lock.json
- 大小: 43158 字节
- 行数: 1207
- 预览: {
  "name": "chrome-devtools-scripts",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": t...

#### hooks-and-plugins.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\hooks-and-plugins.md
- 大小: 8070 字节
- 行数: 444
- 预览: # Hooks and Plugins

Customize and extend Claude Code behavior with hooks and plugins.

## Hooks Sys...

#### mcp-integration.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\references\mcp-integration.md
- 大小: 6816 字节
- 行数: 387
- 预览: # MCP Integration

Model Context Protocol (MCP) integration for connecting Claude Code to external t...

#### skill.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\claude-code\skill.json
- 大小: 494 字节
- 行数: 7
- 预览: {
  "name": "claude-code",
  "description": "Use when users ask about Claude Code features, setup, c...

#### docker-compose.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\docker-compose.md
- 大小: 4827 字节
- 行数: 293
- 预览: # Docker Compose

Multi-container application orchestration.

## Basic Structure

```yaml
version: '...

#### kubernetes-workflows-advanced.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\kubernetes-workflows-advanced.md
- 大小: 1294 字节
- 行数: 76
- 预览: # Kubernetes Workflows Advanced

## CI/CD Pipeline
```yaml
# GitHub Actions
name: Build and Deploy
o...

#### docx-js.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\docx\docx-js.md
- 大小: 16449 字节
- 行数: 350
- 预览: # DOCX Library Tutorial

Generate .docx files with JavaScript/TypeScript.

**Important: Read this en...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\xlsx\SKILL.md
- 大小: 10628 字节
- 行数: 289
- 预览: ---
name: xlsx
description: "Comprehensive spreadsheet creation, editing, and analysis with support ...

#### animejs.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-design\references\animejs.md
- 大小: 11030 字节
- 行数: 396
- 预览: # Anime.js v4 Reference Guide for AI Assistants

## 🚨 CRITICAL: ALWAYS USE ANIME.JS V4 SYNTAX 🚨

*...

#### common-patterns.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-development\resources\common-patterns.md
- 大小: 8349 字节
- 行数: 331
- 预览: # Common Patterns

Frequently used patterns for forms, authentication, DataGrid, dialogs, and other ...

#### data-fetching.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-development\resources\data-fetching.md
- 大小: 19813 字节
- 行数: 767
- 预览: # Data Fetching Patterns

Modern data fetching using TanStack Query with Suspense boundaries, cache-...

#### file-organization.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-development\resources\file-organization.md
- 大小: 11555 字节
- 行数: 502
- 预览: # File Organization

Proper file and directory structure for maintainable, scalable frontend code in...

#### performance.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-development\resources\performance.md
- 大小: 9589 字节
- 行数: 406
- 预览: # Performance Optimization

Patterns for optimizing React component performance, preventing unnecess...

#### routing-guide.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-development\resources\routing-guide.md
- 大小: 7179 字节
- 行数: 364
- 预览: # Routing Guide

TanStack Router implementation with folder-based routing and lazy loading patterns....

#### typescript-standards.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-development\resources\typescript-standards.md
- 大小: 8389 字节
- 行数: 418
- 预览: # TypeScript Standards

TypeScript best practices for type safety and maintainability in React front...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-development\SKILL.md
- 大小: 11270 字节
- 行数: 399
- 预览: ---
name: frontend-dev-guidelines
description: Frontend development guidelines for React/TypeScript ...

#### LICENSE.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-builder\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### gemini-cli-integration.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-management\references\gemini-cli-integration.md
- 大小: 4303 字节
- 行数: 202
- 预览: # Gemini CLI Integration Guide

## Overview

Gemini CLI provides automatic MCP tool discovery and ex...

#### configuration.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mermaidjs-v11\references\configuration.md
- 大小: 4711 字节
- 行数: 233
- 预览: # Mermaid.js Configuration & Theming

Configuration options, theming, and customization for Mermaid....

#### extensions.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\shopify\references\extensions.md
- 大小: 10544 字节
- 行数: 494
- 预览: # Extensions Reference

Guide for building UI extensions and Shopify Functions.

## Checkout UI Exte...

#### themes.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\shopify\references\themes.md
- 大小: 10186 字节
- 行数: 499
- 预览: # Themes Reference

Guide for developing Shopify themes with Liquid templating.

## Liquid Templatin...

#### LICENSE.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\skill-creator\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### 05-lights.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\05-lights.md
- 大小: 4430 字节
- 行数: 184
- 预览: # Lights

Illuminate 3D scenes with various light types.

## Ambient Light

Global illumination affe...

#### 11-materials.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\11-materials.md
- 大小: 13385 字节
- 行数: 519
- 预览: # Three.js Materials

## Overview

Three.js materials - PBR, basic, phong, shader materials, materia...

#### LICENSE.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\LICENSE.txt
- 大小: 11357 字节
- 行数: 202
- 预览: 
                                 Apache License
                           Version 2.0, January 200...

#### shadcn-theming.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\references\shadcn-theming.md
- 大小: 8672 字节
- 行数: 374
- 预览: # shadcn/ui Theming & Customization

Theme configuration, CSS variables, dark mode, and component cu...

#### tailwind-customization.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\references\tailwind-customization.md
- 大小: 10171 字节
- 行数: 484
- 预览: # Tailwind CSS Customization

Config file structure, custom utilities, plugins, and theme extensions...

#### nextjs-data-fetching.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-frameworks\references\nextjs-data-fetching.md
- 大小: 10229 字节
- 行数: 460
- 预览: # Next.js Data Fetching

Server-side data fetching, caching strategies, revalidation, and loading pa...

#### turborepo-caching.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-frameworks\references\turborepo-caching.md
- 大小: 9672 字节
- 行数: 552
- 预览: # Turborepo Caching Strategies

Local caching, remote caching, cache invalidation, and optimization ...

#### turborepo-setup.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-frameworks\references\turborepo-setup.md
- 大小: 9368 字节
- 行数: 543
- 预览: # Turborepo Setup & Configuration

Installation, workspace configuration, and project structure for ...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-frameworks\SKILL.md
- 大小: 9304 字节
- 行数: 325
- 预览: ---
name: web-frameworks
description: Build modern full-stack web applications with Next.js (App Rou...

#### component-testing.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\component-testing.md
- 大小: 2502 字节
- 行数: 95
- 预览: # Component Testing

## Philosophy: Test Behavior, Not Implementation

```javascript
// BAD: Tests i...

#### cross-browser-checklist.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\cross-browser-checklist.md
- 大小: 1756 字节
- 行数: 73
- 预览: # Cross-Browser & Responsive Testing

## Browser Coverage

| Browser | Priority |
|---------|-------...

#### load-testing-k6.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\load-testing-k6.md
- 大小: 1784 字节
- 行数: 94
- 预览: # Load Testing with k6

## Installation

```bash
brew install k6          # macOS
winget install k6 ...

#### mobile-gesture-testing.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\mobile-gesture-testing.md
- 大小: 2197 字节
- 行数: 86
- 预览: # Mobile Gesture Testing

## Touch Gestures

### Single-Finger

```javascript
await page.tap('button...

#### test-flakiness-mitigation.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\test-flakiness-mitigation.md
- 大小: 1819 字节
- 行数: 87
- 预览: # Test Flakiness Mitigation

## Root Causes

- Timing mismatches (hard waits)
- Non-isolated tests (...

#### visual-regression.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\visual-regression.md
- 大小: 2268 字节
- 行数: 93
- 预览: # Visual Regression Testing

## Playwright Screenshot Comparison

```typescript
import { test, expec...

#### components.json
- 路径: clawpal\components.json
- 大小: 427 字节
- 行数: 21
- 预览: {
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "ts...

#### 2026-02-18-ssh-remote-management-design.md
- 路径: clawpal\docs\plans\2026-02-18-ssh-remote-management-design.md
- 大小: 5919 字节
- 行数: 166
- 预览: # SSH Remote OpenClaw Management — Design

## Overview

Allow ClawPal to manage remote openclaw ...

#### 2026-02-20-recipe-channel-agnostic.md
- 路径: clawpal\docs\plans\2026-02-20-recipe-channel-agnostic.md
- 大小: 1925 字节
- 行数: 88
- 预览: # Recipe 渠道无关化方案调研

## 日期
2026-02-20

## 现状

两个内置 recipe（`dedicated-channel-agent` 和 `discord...

#### 2026-02-21-cli-based-config-design.md
- 路径: clawpal\docs\plans\2026-02-21-cli-based-config-design.md
- 大小: 6307 字节
- 行数: 245
- 预览: # CLI-Based Config Refactoring Design

## Goal

将 ClawPal 从"直接读写 openclaw.json 的配置编辑器"重构为"opencl...

#### en.json
- 路径: clawpal\src\locales\en.json
- 大小: 22429 字节
- 行数: 465
- 预览: {
  "nav.home": "Home",
  "nav.recipes": "Recipes",
  "nav.channels": "Channels",
  "nav.history...

#### recipes.json
- 路径: clawpal\src-tauri\recipes.json
- 大小: 2983 字节
- 行数: 45
- 预览: {
  "recipes": [
    {
      "id": "dedicated-channel-agent",
      "name": "Create dedicated Ag...

#### tauri.conf.json
- 路径: clawpal\src-tauri\tauri.conf.json
- 大小: 1446 字节
- 行数: 55
- 预览: {
  "$schema": "https://schema.tauri.app/config/2.0.0",
  "productName": "ClawPal",
  "identifier...

#### tsconfig.json
- 路径: clawpal\tsconfig.json
- 大小: 377 字节
- 行数: 17
- 预览: {
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution":...

#### index.js
- 路径: company-brain\src\communication\index.js
- 大小: 9896 字节
- 行数: 407
- 预览: // 通信系统主模块

class CommunicationSystem {
  constructor(config = {}) {
    this.config = {
      ...co...

#### message-bus.js
- 路径: company-brain\src\communication\message-bus.js
- 大小: 6025 字节
- 行数: 262
- 预览: // 消息总线模块

class MessageBus {
  constructor(config = {}) {
    this.config = {
      ...config
    }...

#### protocol-adapter.js
- 路径: company-brain\src\communication\protocol-adapter.js
- 大小: 4877 字节
- 行数: 216
- 预览: // 协议适配器模块

class ProtocolAdapter {
  constructor(config = {}) {
    this.config = {
      ...config...

#### document-base.js
- 路径: company-brain\src\memory\document-base.js
- 大小: 5378 字节
- 行数: 216
- 预览: // 文档库模块

const fs = require('fs').promises;
const path = require('path');

class DocumentBase {
  c...

#### knowledge-base.js
- 路径: company-brain\src\memory\knowledge-base.js
- 大小: 5235 字节
- 行数: 209
- 预览: // 知识库模块

const fs = require('fs').promises;
const path = require('path');

class KnowledgeBase {
  ...

#### agent-monitor.js
- 路径: company-brain\src\monitoring\agent-monitor.js
- 大小: 10287 字节
- 行数: 418
- 预览: // 智能体监控模块

class AgentMonitor {
  constructor(config = {}) {
    this.config = {
      ...config,
 ...

#### task-tracker.js
- 路径: company-brain\src\scheduler\task-tracker.js
- 大小: 9404 字节
- 行数: 356
- 预览: // 任务跟踪器模块

const fs = require('fs').promises;
const path = require('path');

class TaskTracker {
  ...

#### [turbopack-node]_transforms_postcss_ts_4362e4f5._.js
- 路径: content-pipeline\.next\build\chunks\[turbopack-node]_transforms_postcss_ts_4362e4f5._.js
- 大小: 626 字节
- 行数: 13
- 预览: module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/content-pipeline/...

#### postcss.js
- 路径: content-pipeline\.next\build\postcss.js
- 大小: 895 字节
- 行数: 7
- 预览: var R=require("./chunks/[turbopack]_runtime.js")("postcss.js")
R.c("chunks/[turbopack-node]_transfor...

#### [turbopack-node]_transforms_postcss_ts_4362e4f5._.js
- 路径: content-pipeline\.next\dev\build\chunks\[turbopack-node]_transforms_postcss_ts_4362e4f5._.js
- 大小: 626 字节
- 行数: 13
- 预览: module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/content-pipeline/...

#### postcss.js
- 路径: content-pipeline\.next\dev\build\postcss.js
- 大小: 895 字节
- 行数: 7
- 预览: var R=require("./chunks/[turbopack]_runtime.js")("postcss.js")
R.c("chunks/[turbopack-node]_transfor...

#### ec22b_convex_dist_esm_server_9e3fad53._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_convex_dist_esm_server_9e3fad53._.js
- 大小: 148193 字节
- 行数: 2562
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/convex/dist/esm/server/database.js [app-...

#### ec22b_react-day-picker_dist_esm_1531c11c._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_react-day-picker_dist_esm_1531c11c._.js
- 大小: 317313 字节
- 行数: 4371
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/react-day-picker/dist/esm/helpers/getBro...

#### [root-of-the-server]__ca7bd24c._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[root-of-the-server]__ca7bd24c._.js
- 大小: 9289 字节
- 行数: 285
- 预览: module.exports = [
"[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)", ((__turbopac...

#### ec22b_react-day-picker_dist_esm_f8fdf4c6._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_react-day-picker_dist_esm_f8fdf4c6._.js
- 大小: 318989 字节
- 行数: 4437
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### next-minimal-server.js.nft.json
- 路径: content-pipeline\.next\next-minimal-server.js.nft.json
- 大小: 5561 字节
- 行数: 1
- 预览: {"version":1,"files":["../node_modules/client-only/index.js","../node_modules/client-only/package.js...

#### content-pipeline_b6432a34._.js
- 路径: content-pipeline\.next\server\chunks\ssr\content-pipeline_b6432a34._.js
- 大小: 19104 字节
- 行数: 3
- 预览: module.exports=[99977,a=>{a.n(a.i(87805))},58792,a=>{a.n(a.i(85672))},41153,(a,b,c)=>{b.exports=a.r(...

#### 4314fb23a94667b6.js
- 路径: content-pipeline\.next\static\chunks\4314fb23a94667b6.js
- 大小: 30852 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### turbopack-3e6d5cbb84efae84.js
- 路径: content-pipeline\.next\static\chunks\turbopack-3e6d5cbb84efae84.js
- 大小: 10196 字节
- 行数: 4
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### components.json
- 路径: content-pipeline\components.json
- 大小: 460 字节
- 行数: 24
- 预览: {
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": t...

#### package.json
- 路径: content-pipeline\package.json
- 大小: 850 字节
- 行数: 37
- 预览: {
  "name": "content-pipeline",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "...

#### assetPublisher.js
- 路径: evomap-evolution\lib\assetPublisher.js
- 大小: 3872 字节
- 行数: 135
- 预览: const crypto = require('crypto');

class AssetPublisher {
  constructor(config, connector) {
    thi...

#### connector.js
- 路径: evomap-evolution\lib\connector.js
- 大小: 5622 字节
- 行数: 229
- 预览: const https = require('https');

class EvoMapConnector {
  constructor(config) {
    this.config = c...

#### experienceSystem.js
- 路径: evomap-evolution\lib\experienceSystem.js
- 大小: 10731 字节
- 行数: 404
- 预览: const fs = require('fs');
const path = require('path');

class ExperienceSystem {
  constructor(conf...

#### generate-api-free-config.js
- 路径: generate-api-free-config.js
- 大小: 1877 字节
- 行数: 92
- 预览: // 生成免密钥配置脚本
const fs = require('fs');
const path = require('path');

// 生成免密钥配置
function generateAp...

#### README.md
- 路径: green-tea-runner\README.md
- 大小: 5250 字节
- 行数: 188
- 预览: # Green Tea Runner

Run the "Green Tea (Femme Fatale)" persona capsule from EvoMap in three steps....

#### plan_20260204_174524.md
- 路径: HATwin\.trae\documents\plan_20260204_174524.md
- 大小: 958 字节
- 行数: 46
- 预览: ## 解决方案：添加API Key设置界面

### 问题分析
- 浏览器安全限制导致无法直接读取本地.env文件
- 当前项目使用简单的HTML结构和本地HTTP服务器
- 需要一个安全、方便的方式...

#### components.json
- 路径: hero\projects\components.json
- 大小: 431 字节
- 行数: 22
- 预览: {
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": t...

#### package.json
- 路径: hero\projects\package.json
- 大小: 3245 字节
- 行数: 105
- 预览: {
  "name": "projects",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "bash ....

#### plan_20260205_074247.md
- 路径: HTP\.trae\documents\plan_20260205_074247.md
- 大小: 2237 字节
- 行数: 83
- 预览: # 修改generateIllustration函数切换到火山文生图API

## 问题分析
当前项目中的generateIllustration函数使用的是阿里的dashscope.aliyuncs...

#### plan_20260205_081751.md
- 路径: HTP\.trae\documents\plan_20260205_081751.md
- 大小: 2330 字节
- 行数: 92
- 预览: # 修复系统中的API配置问题

## 问题分析
根据日志分析，当前系统存在以下问题：

1. **skillService.ts中仍然有阿里云百炼的引用**：
   - 日志显示："开始调用阿里云百...

#### plan_20260206_093945.md
- 路径: HTP\.trae\documents\plan_20260206_093945.md
- 大小: 1186 字节
- 行数: 58
- 预览: ## 问题分析

用户遇到了 `413 Payload Too Large` 错误，这是因为：

1. **前端配置问题**：
   - `.env` 文件中 `VITE_BACKEND_BASE_U...

#### 修复环境变量加载问题.md
- 路径: HTP\.trae\documents\修复环境变量加载问题.md
- 大小: 1636 字节
- 行数: 76
- 预览: # 环境变量加载问题修复方案

## 问题分析
根据分析，当前项目的核心问题是：
- `ARK_API_KEY`和`ARK_MODEL_ENDPOINT`两个环境变量加载失败
- 仅`ARK_API_...

#### components.json
- 路径: HTP\components.json
- 大小: 461 字节
- 行数: 23
- 预览: {
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": ...

#### eslint.config.js
- 路径: HTP\eslint.config.js
- 大小: 616 字节
- 行数: 24
- 预览: import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-reac...

#### package-lock.json
- 路径: HTP\package-lock.json
- 大小: 368034 字节
- 行数: 9974
- 预览: {
  "name": "my-app",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages"...

#### requirements.txt
- 路径: HTP\projects\requirements.txt
- 大小: 2217 字节
- 行数: 126
- 预览: altgraph==0.17.5
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.12.1
APScheduler==3.11.2
astro...

#### README.md
- 路径: HTP\README.md
- 大小: 2555 字节
- 行数: 74
- 预览: # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite wit...

#### tailwind.config.js
- 路径: HTP\tailwind.config.js
- 大小: 5164 字节
- 行数: 147
- 预览: /** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['....

#### tsconfig.app.json
- 路径: HTP\tsconfig.app.json
- 大小: 815 字节
- 行数: 35
- 预览: {
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    ...

#### tsconfig.json
- 路径: HTP\tsconfig.json
- 大小: 232 字节
- 行数: 17
- 预览: {
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "pat...

#### tsconfig.node.json
- 路径: HTP\tsconfig.node.json
- 大小: 653 字节
- 行数: 27
- 预览: {
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
   ...

#### integrate-knowledge.js
- 路径: integrate-knowledge.js
- 大小: 6077 字节
- 行数: 251
- 预览: /**
 * 知识系统集成脚本
 * 将知识库和SKILL集成到现有的AI代理系统中
 */

const fs = require('fs');
const path = require('path...

#### components.json
- 路径: Kimi_Agent_2026高光日历\app\components.json
- 大小: 461 字节
- 行数: 23
- 预览: {
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": ...

#### eslint.config.js
- 路径: Kimi_Agent_2026高光日历\app\eslint.config.js
- 大小: 616 字节
- 行数: 24
- 预览: import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-reac...

#### package-lock.json
- 路径: Kimi_Agent_2026高光日历\app\package-lock.json
- 大小: 301759 字节
- 行数: 8252
- 预览: {
  "name": "my-app",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages"...

#### README.md
- 路径: Kimi_Agent_2026高光日历\app\README.md
- 大小: 2555 字节
- 行数: 74
- 预览: # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite wit...

#### tailwind.config.js
- 路径: Kimi_Agent_2026高光日历\app\tailwind.config.js
- 大小: 2777 字节
- 行数: 84
- 预览: /** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['....

#### tsconfig.app.json
- 路径: Kimi_Agent_2026高光日历\app\tsconfig.app.json
- 大小: 815 字节
- 行数: 35
- 预览: {
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    ...

#### tsconfig.json
- 路径: Kimi_Agent_2026高光日历\app\tsconfig.json
- 大小: 232 字节
- 行数: 17
- 预览: {
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "pat...

#### tsconfig.node.json
- 路径: Kimi_Agent_2026高光日历\app\tsconfig.node.json
- 大小: 653 字节
- 行数: 27
- 预览: {
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
   ...

#### plan_20260204_174524.md
- 路径: LAY\.trae\documents\plan_20260204_174524.md
- 大小: 958 字节
- 行数: 46
- 预览: ## 解决方案：添加API Key设置界面

### 问题分析
- 浏览器安全限制导致无法直接读取本地.env文件
- 当前项目使用简单的HTML结构和本地HTTP服务器
- 需要一个安全、方便的方式...

#### components.json
- 路径: life-choice\components.json
- 大小: 461 字节
- 行数: 23
- 预览: {
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": ...

#### package-lock.json
- 路径: life-choice\package-lock.json
- 大小: 308509 字节
- 行数: 8611
- 预览: {
  "name": "my-app",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages"...

#### tailwind.config.js
- 路径: life-choice\tailwind.config.js
- 大小: 2777 字节
- 行数: 84
- 预览: /** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['....

#### tsconfig.json
- 路径: life-choice\tsconfig.json
- 大小: 605 字节
- 行数: 26
- 预览: {
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["E...

#### tsconfig.node.json
- 路径: life-choice\tsconfig.node.json
- 大小: 213 字节
- 行数: 11
- 预览: {
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
  ...

#### [turbopack-node]_transforms_postcss_ts_0c859142._.js
- 路径: mission-control\.next\build\chunks\[turbopack-node]_transforms_postcss_ts_0c859142._.js
- 大小: 624 字节
- 行数: 13
- 预览: module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/mission-control/p...

#### postcss.js
- 路径: mission-control\.next\build\postcss.js
- 大小: 893 字节
- 行数: 7
- 预览: var R=require("./chunks/[turbopack]_runtime.js")("postcss.js")
R.c("chunks/[turbopack-node]_transfor...

#### [turbopack-node]_transforms_postcss_ts_0c859142._.js
- 路径: mission-control\.next\dev\build\chunks\[turbopack-node]_transforms_postcss_ts_0c859142._.js
- 大小: 624 字节
- 行数: 13
- 预览: module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/mission-control/p...

#### postcss.js
- 路径: mission-control\.next\dev\build\postcss.js
- 大小: 893 字节
- 行数: 7
- 预览: var R=require("./chunks/[turbopack]_runtime.js")("postcss.js")
R.c("chunks/[turbopack-node]_transfor...

#### 2f884_e6892f38._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_e6892f38._.js
- 大小: 226551 字节
- 行数: 4094
- 预览: module.exports = [
"[project]/mission-control/node_modules/@babel/runtime/helpers/esm/typeof.js [app...

#### next-minimal-server.js.nft.json
- 路径: mission-control\.next\next-minimal-server.js.nft.json
- 大小: 5565 字节
- 行数: 1
- 预览: {"version":1,"files":["../node_modules/client-only/index.js","../node_modules/client-only/package.js...

#### mission-control_e7843ebf._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_e7843ebf._.js
- 大小: 19097 字节
- 行数: 3
- 预览: module.exports=[90038,a=>{a.n(a.i(89776))},78636,a=>{a.n(a.i(26899))},19904,(a,b,c)=>{b.exports=a.r(...

#### 5d93656eec163b02.js
- 路径: mission-control\.next\static\chunks\5d93656eec163b02.js
- 大小: 30676 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### a7129b996a430a28.js
- 路径: mission-control\.next\static\chunks\a7129b996a430a28.js
- 大小: 33283 字节
- 行数: 4
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### b67174e3faaadca1.js
- 路径: mission-control\.next\static\chunks\b67174e3faaadca1.js
- 大小: 13072 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### turbopack-ff44cfd0ee68219d.js
- 路径: mission-control\.next\static\chunks\turbopack-ff44cfd0ee68219d.js
- 大小: 10232 字节
- 行数: 4
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### package-lock.json
- 路径: mission-control\package-lock.json
- 大小: 112075 字节
- 行数: 3395
- 预览: {
  "name": "temp-calendar",
  "version": "0.1.0",
  "lockfileVersion": 3,
  "requires": true,
  "pa...

#### package.json
- 路径: mission-control\package.json
- 大小: 751 字节
- 行数: 34
- 预览: {
  "name": "temp-calendar",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "nex...

#### package-lock.json
- 路径: notebooklm-bot\package-lock.json
- 大小: 51814 字节
- 行数: 1443
- 预览: {
  "name": "notebooklm-bot",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "p...

#### test-setup.js
- 路径: notebooklm-bot\test-setup.js
- 大小: 2043 字节
- 行数: 91
- 预览: const fs = require('fs');
const path = require('path');

// 测试脚本
// 用于检查项目设置是否正确

console.log('🔍 测试...

#### openclaw_agent_guide.md
- 路径: openclaw_agent_guide.md
- 大小: 3008 字节
- 行数: 160
- 预览: # 在 OPENCLAW 中创建 AGENT 的详细指南

## 步骤 1：创建 AGENT 目录结构

1. **打开 PowerShell** 并进入 OPENCLAW 目录：
   ```pow...

#### integration.js
- 路径: plugins\doubao-api\integration.js
- 大小: 6793 字节
- 行数: 249
- 预览: // 豆包API与OpenClaw和EVO的集成模块
const fs = require('fs');
const path = require('path');
const DoubaoAPI =...

#### requirements.txt
- 路径: project_20260127_134424\projects\requirements.txt
- 大小: 2217 字节
- 行数: 126
- 预览: altgraph==0.17.5
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.12.1
APScheduler==3.11.2
astro...

#### search-high-value-assets.js
- 路径: search-high-value-assets.js
- 大小: 8412 字节
- 行数: 341
- 预览: const https = require('https');
const fs = require('fs');
const path = require('path');

const EVOMA...

#### cli-examples.md
- 路径: skills\1password\references\cli-examples.md
- 大小: 720 字节
- 行数: 30
- 预览: # op CLI examples (from op help)

## Sign in

- `op signin`
- `op signin --account <shorthand|signin...

#### index.js
- 路径: skills\adl-core\index.js
- 大小: 21199 字节
- 行数: 737
- 预览: /**
 * 反进化锁定协议 (ADL) 核心模块
 * 实现ADL协议的核心功能，包括禁止行为检测、核心原则验证、回滚机制等
 */

const fs = require('fs');
const...

#### _meta.json
- 路径: skills\agent-port-isolation\_meta.json
- 大小: 598 字节
- 行数: 27
- 预览: {
  "name": "agent-port-isolation",
  "version": "1.0.0",
  "description": "智能体端口隔离指南，为每个智能体或项目分配独立的...

#### README.md
- 路径: skills\arakichanxd-claw-sync\README.md
- 大小: 2636 字节
- 行数: 102
- 预览: # Claw Sync

Secure, versioned sync for OpenClaw memory files and custom skills.

## Features

- 🏷️...

#### SKILL.md
- 路径: skills\arakichanxd-claw-sync\SKILL.md
- 大小: 2333 字节
- 行数: 91
- 预览: ---
name: claw-sync
description: Secure sync for OpenClaw memory and workspace. Use /sync to push, /...

#### SKILL.md
- 路径: skills\bear-notes\SKILL.md
- 大小: 2436 字节
- 行数: 80
- 预览: ---
name: bear-notes
description: Create, search, and manage Bear notes via grizzly CLI.
homepage: h...

#### SKILL.md
- 路径: skills\bjesuiter-bridle\SKILL.md
- 大小: 4363 字节
- 行数: 170
- 预览: ---
name: bridle
description: Unified configuration manager for AI coding assistants. Manage profile...

#### SKILL.md
- 路径: skills\bluebubbles\SKILL.md
- 大小: 2294 字节
- 行数: 40
- 预览: ---
name: bluebubbles
description: Build or update the BlueBubbles external channel plugin for Clawd...

#### SKILL.md
- 路径: skills\bug-triage\SKILL.md
- 大小: 574 字节
- 行数: 27
- 预览: ﻿## Skill 1｜说清楚（问题定义与复现｜Triage）
一句话定义 ：把“有人说不对劲”变成可复现、可验收、可交接的标准问题单。
 触发口令 （你怎么说都行，命中就启动）：

- “我...

#### SKILL.md
- 路径: skills\camsnap\SKILL.md
- 大小: 896 字节
- 行数: 26
- 预览: ---
name: camsnap
description: Capture frames or clips from RTSP/ONVIF cameras.
homepage: https://ca...

#### SKILL.md
- 路径: skills\canvas\SKILL.md
- 大小: 5229 字节
- 行数: 199
- 预览: # Canvas Skill

Display HTML content on connected OpenClaw nodes (Mac app, iOS, Android).

## Overvi...

#### capability-shapes.json
- 路径: skills\capability-evolver\capabilities\capability-shapes.json
- 大小: 3670 字节
- 行数: 124
- 预览: {
  "capabilities": [
    {
      "id": "hot-info-cache",
      "name": "热点信息缓存层",
      "descriptio...

#### SKILL.md
- 路径: skills\eightctl\SKILL.md
- 大小: 901 字节
- 行数: 30
- 预览: ---
name: eightctl
description: Control Eight Sleep pods (status, temperature, alarms, schedules).
h...

#### SKILL.md
- 路径: skills\food-order\SKILL.md
- 大小: 2047 字节
- 行数: 42
- 预览: ---
name: food-order
description: Reorder Foodora orders + track ETA/status with ordercli. Never con...

#### SKILL.md
- 路径: skills\git-ssh-sync\SKILL.md
- 大小: 4691 字节
- 行数: 288
- 预览: ---
name: "git-ssh-sync"
description: "Git和SSH配置同步管理器，确保所有对话框共享相同的Git账号和SSH密钥配置，实现跨对话框的Git和SSH设置统一管理...

#### SKILL.md
- 路径: skills\goplaces\SKILL.md
- 大小: 1330 字节
- 行数: 31
- 预览: ---
name: goplaces
description: Query Google Places API (New) via the goplaces CLI for text search, ...

#### configuration.md
- 路径: skills\himalaya\references\configuration.md
- 大小: 4074 字节
- 行数: 175
- 预览: # Himalaya Configuration Reference

Configuration file location: `~/.config/himalaya/config.toml`

#...

#### SKILL.md
- 路径: skills\himalaya\SKILL.md
- 大小: 4403 字节
- 行数: 218
- 预览: ---
name: himalaya
description: "CLI to manage emails via IMAP/SMTP. Use `himalaya` to list, read, w...

#### SKILL.md
- 路径: skills\mcporter\SKILL.md
- 大小: 1478 字节
- 行数: 39
- 预览: ---
name: mcporter
description: Use the mcporter CLI to list, configure, auth, and call MCP servers/...

#### codexbar-cli.md
- 路径: skills\model-usage\references\codexbar-cli.md
- 大小: 1112 字节
- 行数: 29
- 预览: # CodexBar CLI quick ref (usage + cost)

## Install
- App: Preferences -> Advanced -> Install CLI
- ...

#### SKILL.md
- 路径: skills\nano-pdf\SKILL.md
- 大小: 761 字节
- 行数: 21
- 预览: ---
name: nano-pdf
description: Edit PDFs with natural-language instructions using the nano-pdf CLI....

#### SKILL.md
- 路径: skills\notion\SKILL.md
- 大小: 5029 字节
- 行数: 157
- 预览: ---
name: notion
description: Notion API for creating and managing pages, databases, and blocks.
hom...

#### SKILL.md
- 路径: skills\obsidian\SKILL.md
- 大小: 2316 字节
- 行数: 56
- 预览: ---
name: obsidian
description: Work with Obsidian vaults (plain Markdown notes) and automate via ob...

#### SKILL.md
- 路径: skills\ordercli\SKILL.md
- 大小: 2085 字节
- 行数: 48
- 预览: ---
name: ordercli
description: Foodora-only CLI for checking past orders and active order status (D...

#### SKILL.md
- 路径: skills\peekaboo\SKILL.md
- 大小: 5751 字节
- 行数: 154
- 预览: ---
name: peekaboo
description: Capture and automate macOS UI with the Peekaboo CLI.
homepage: https...

#### SKILL.md
- 路径: skills\slack\SKILL.md
- 大小: 2311 字节
- 行数: 144
- 预览: ---
name: slack
description: Use when you need to control Slack from Clawdbot via the slack tool, in...

#### SKILL.md
- 路径: skills\spotify-player\SKILL.md
- 大小: 1367 字节
- 行数: 35
- 预览: ---
name: spotify-player
description: Terminal Spotify playback/search via spogo (preferred) or spot...

#### SKILL.md
- 路径: skills\summarize\SKILL.md
- 大小: 1423 字节
- 行数: 50
- 预览: ---
name: summarize
description: Summarize URLs or files with the summarize CLI (web, PDFs, images, ...

#### package.json
- 路径: skills\trea-model-proxy\package.json
- 大小: 906 字节
- 行数: 41
- 预览: {
  "name": "trea-model-proxy",
  "version": "1.0.0",
  "description": "无需API密钥调用Trea大模型的代理服务，为智能体提供...

#### documentation.md
- 路径: Skill_Seekers\.github\ISSUE_TEMPLATE\documentation.md
- 大小: 850 字节
- 行数: 42
- 预览: ---
name: Documentation Improvement
about: Suggest improvements to documentation
title: '[DOCS] '...

#### PULL_REQUEST_TEMPLATE.md
- 路径: Skill_Seekers\.github\PULL_REQUEST_TEMPLATE.md
- 大小: 1363 字节
- 行数: 49
- 预览: # Pull Request

## 📋 Description

Brief description of changes made.

## 🔗 Related Issues
...

#### SETUP_GUIDE.md
- 路径: Skill_Seekers\.github\SETUP_GUIDE.md
- 大小: 3430 字节
- 行数: 150
- 预览: # GitHub Project Setup Guide

Quick guide to set up GitHub Issues and Project Board for Skill Seek...

#### README.md
- 路径: Skill_Seekers\api\README.md
- 大小: 6409 字节
- 行数: 268
- 预览: # Skill Seekers Config API

FastAPI backend for discovering and downloading Skill Seekers configur...

#### BULLETPROOF_QUICKSTART.md
- 路径: Skill_Seekers\BULLETPROOF_QUICKSTART.md
- 大小: 13717 字节
- 行数: 600
- 预览: # Bulletproof Quick Start Guide

**Target Audience:** Complete beginners | Never used Python/git b...

#### astrovalley_unified.json
- 路径: Skill_Seekers\configs\astrovalley_unified.json
- 大小: 974 字节
- 行数: 33
- 预览: {
  "name": "astrovalley",
  "description": "Space farming/automation game with combat and explora...

#### blender-unified.json
- 路径: Skill_Seekers\configs\blender-unified.json
- 大小: 7380 字节
- 行数: 277
- 预览: {
  "name": "blender",
  "description": "Complete Blender 3D creation suite knowledge base combini...

#### blender.json
- 路径: Skill_Seekers\configs\blender.json
- 大小: 3944 字节
- 行数: 199
- 预览: {
  "name": "blender",
  "description": "Blender 3D creation suite for modeling, animation, render...

#### claude-code.json
- 路径: Skill_Seekers\configs\claude-code.json
- 大小: 4468 字节
- 行数: 85
- 预览: {
  "_migration_note": "TODO: Migrate to external skill-seekers-configs repo. Kept temporarily to p...

#### PDF_SCRAPER.md
- 路径: Skill_Seekers\docs\features\PDF_SCRAPER.md
- 大小: 14192 字节
- 行数: 617
- 预览: # PDF Scraper CLI Tool (Tasks B1.6 + B1.8)

**Status:** ✅ Completed
**Date:** October 21, 2025
*...

#### UPLOAD_GUIDE.md
- 路径: Skill_Seekers\docs\guides\UPLOAD_GUIDE.md
- 大小: 11075 字节
- 行数: 447
- 预览: # Multi-Platform Upload Guide

Skill Seekers supports uploading to **4 LLM platforms**: Claude AI,...

#### MULTI_LLM_SUPPORT.md
- 路径: Skill_Seekers\docs\integrations\MULTI_LLM_SUPPORT.md
- 大小: 10347 字节
- 行数: 408
- 预览: # Multi-LLM Platform Support Guide

Skill Seekers supports multiple LLM platforms through a clean ...

#### OPENAI_INTEGRATION.md
- 路径: Skill_Seekers\docs\integrations\OPENAI_INTEGRATION.md
- 大小: 12293 字节
- 行数: 516
- 预览: # OpenAI ChatGPT Integration Guide

Complete guide for creating and deploying skills to OpenAI Cha...

#### FEATURE_MATRIX.md
- 路径: Skill_Seekers\docs\reference\FEATURE_MATRIX.md
- 大小: 11253 字节
- 行数: 322
- 预览: # Skill Seekers Feature Matrix

Complete feature support across all platforms and skill modes.

...

#### GIT_CONFIG_SOURCES.md
- 路径: Skill_Seekers\docs\reference\GIT_CONFIG_SOURCES.md
- 大小: 21182 字节
- 行数: 922
- 预览: # Git-Based Config Sources - Complete Guide

**Version:** v2.2.0
**Feature:** A1.9 - Multi-Source...

#### LARGE_DOCUMENTATION.md
- 路径: Skill_Seekers\docs\reference\LARGE_DOCUMENTATION.md
- 大小: 10132 字节
- 行数: 432
- 预览: # Handling Large Documentation Sites (10K+ Pages)

Complete guide for scraping and managing large ...

#### LLMS_TXT_SUPPORT.md
- 路径: Skill_Seekers\docs\reference\LLMS_TXT_SUPPORT.md
- 大小: 1451 字节
- 行数: 61
- 预览: # llms.txt Support

## Overview

Skill_Seekers now automatically detects and uses llms.txt files...

#### QUICKSTART.md
- 路径: Skill_Seekers\QUICKSTART.md
- 大小: 3898 字节
- 行数: 197
- 预览: # Quick Start Guide

## 🚀 3 Steps to Create a Skill

### Step 1: Install Dependencies

```bas...

#### requirements.txt
- 路径: Skill_Seekers\requirements.txt
- 大小: 850 字节
- 行数: 45
- 预览: annotated-types==0.7.0
anthropic==0.40.0
anyio==4.11.0
attrs==25.4.0
beautifulsoup4==4.14.2
cer...

#### entry_points.txt
- 路径: Skill_Seekers\src\skill_seekers.egg-info\entry_points.txt
- 大小: 1132 字节
- 行数: 20
- 预览: [console_scripts]
skill-seekers = skill_seekers.cli.main:main
skill-seekers-codebase = skill_seekers...

#### SOURCES.txt
- 路径: Skill_Seekers\src\skill_seekers.egg-info\SOURCES.txt
- 大小: 5537 字节
- 行数: 156
- 预览: LICENSE
README.md
pyproject.toml
src/skill_seekers/__init__.py
src/skill_seekers/_version.py
src/ski...

#### testing-anti-patterns.md
- 路径: Skill_Seekers\superpowers\skills\test-driven-development\testing-anti-patterns.md
- 大小: 8221 字节
- 行数: 300
- 预览: # Testing Anti-Patterns

**Load this reference when:** writing or changing tests, adding mocks, or t...

#### design.md
- 路径: Skill_Seekers\superpowers\tests\subagent-driven-dev\go-fractals\design.md
- 大小: 1973 字节
- 行数: 82
- 预览: # Go Fractals CLI - Design

## Overview

A command-line tool that generates ASCII art fractals. Supp...

#### mcp_integration_test.md
- 路径: Skill_Seekers\tests\mcp_integration_test.md
- 大小: 9996 字节
- 行数: 568
- 预览: # MCP Integration Test Results

Test documentation for Skill Seeker MCP server with Claude Code.
...

#### TROUBLESHOOTING.md
- 路径: Skill_Seekers\TROUBLESHOOTING.md
- 大小: 9212 字节
- 行数: 476
- 预览: # Troubleshooting Guide

Common issues and solutions when using Skill Seeker.

---

## Install...

#### CLAUDE.md
- 路径: Skill_Seekers\ui-ux-pro-max-skill\CLAUDE.md
- 大小: 3942 字节
- 行数: 98
- 预览: # CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in...

#### start-green-tea-with-trea.js
- 路径: start-green-tea-with-trea.js
- 大小: 1016 字节
- 行数: 35
- 预览: const TreaModelProxy = require('./skills/trea-model-proxy/index.js');

async function startGreenTeaA...

#### start-life-agent.js
- 路径: start-life-agent.js
- 大小: 2229 字节
- 行数: 92
- 预览: /**
 * 启动人生决策宗师智能体
 * 端口: 4005
 */

const express = require('express');
const app = express();
const...

#### update-1771840871639.json
- 路径: system-updates\update-1771840871639.json
- 大小: 456 字节
- 行数: 20
- 预览: {
  "type": "SYSTEM_UPDATE",
  "title": "公司化改造完成",
  "message": "OpenClaw系统已完成公司化改造，现在拥有共享记忆系统、共享技能库...

#### package-lock.json
- 路径: temp-calendar\package-lock.json
- 大小: 228966 字节
- 行数: 6604
- 预览: {
  "name": "temp-calendar",
  "version": "0.1.0",
  "lockfileVersion": 3,
  "requires": true,
  "pa...

#### package.json
- 路径: temp-calendar\package.json
- 大小: 536 字节
- 行数: 27
- 预览: {
  "name": "temp-calendar",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "nex...

#### Skill 1｜说清楚（问题定义与复现｜Triage）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\Skill 1｜说清楚（问题定义与复现｜Triage）.txt
- 大小: 571 字节
- 行数: 26
- 预览: ## Skill 1｜说清楚（问题定义与复现｜Triage）
一句话定义 ：把“有人说不对劲”变成可复现、可验收、可交接的标准问题单。
 触发口令 （你怎么说都行，命中就启动）：

- “我们...

#### test-adl-config.js
- 路径: test-adl-config.js
- 大小: 989 字节
- 行数: 36
- 预览: // 测试ADL配置更新
const { getADLInstance } = require('./skills/adl-core');

console.log('🧪 测试ADL配置更新');
...

#### test-adl-pcec-priority.js
- 路径: test-adl-pcec-priority.js
- 大小: 1240 字节
- 行数: 43
- 预览: // 测试ADL与PCEC的优先级管理
const { getADLInstance } = require('./skills/adl-core');
const { executePCECCycl...

#### test-capability-tree-enhanced.js
- 路径: test-capability-tree-enhanced.js
- 大小: 5934 字节
- 行数: 186
- 预览: // 能力树系统优化测试

const { capabilityTree } = require('./capabilities/capability-tree');

console.log('==...

#### test-claim-alt.js
- 路径: test-claim-alt.js
- 大小: 3446 字节
- 行数: 147
- 预览: const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto...

#### test-claim-final.js
- 路径: test-claim-final.js
- 大小: 5238 字节
- 行数: 245
- 预览: const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto...

#### test-claim.js
- 路径: test-claim.js
- 大小: 3902 字节
- 行数: 185
- 预览: const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto...

#### test-doubao-api.js
- 路径: test-doubao-api.js
- 大小: 1506 字节
- 行数: 68
- 预览: const https = require('https');

// 豆包API配置
const apiKey = 'c13b2982-0aab-4c75-9404-0deb12a219ec';
c...

#### test-encoding.txt
- 路径: test-encoding.txt
- 大小: 130 字节
- 行数: 5
- 预览: 这是一个测试文件，用于验证编码设置是否正确。
This is a test file to verify encoding settings.
Git SSH 配置同步测试
Git SSH confi...

#### test-gateway.js
- 路径: test-gateway.js
- 大小: 1755 字节
- 行数: 81
- 预览: const http = require('http');

// 测试网关服务
function testGateway() {
    console.log('=== 测试网关服务 ===');...

#### test-notification.js
- 路径: test-notification.js
- 大小: 4079 字节
- 行数: 168
- 预览: // 测试智能体通知服务
const http = require('http');

// 发送通知测试
function testNotification() {
    console.log(...

#### test-openclaw-ark.js
- 路径: test-openclaw-ark.js
- 大小: 2308 字节
- 行数: 75
- 预览: const fs = require('fs');
const path = require('path');

// 模拟OpenClaw加载配置
function loadOpenClawConf...

#### test-volcano-api.js
- 路径: test-volcano-api.js
- 大小: 1467 字节
- 行数: 59
- 预览: const axios = require('axios');

async function testVolcanoAPI() {
  console.log('=== 测试火山引擎API连接 ==...

#### feishu-card.js
- 路径: tools\communication\feishu-card.js
- 大小: 3209 字节
- 行数: 153
- 预览: // feishu-card 工具 - 用于生成富文本消息卡片

/**
 * 生成飞书卡片
 * @param {Object} options - 卡片选项
 * @param {string} ...

#### persona-management.js
- 路径: tools\communication\persona-management.js
- 大小: 5780 字节
- 行数: 269
- 预览: // persona-management 工具 - 用于管理不同的人格类型

// 人格配置
const personaConfigs = {
  'Catgirl': {
    name: 'C...

#### mutator.js
- 路径: value-function-core\mutator.js
- 大小: 7892 字节
- 行数: 294
- 预览: // 价值函数突变管理模块

// 当前价值函数配置
let currentValueFunction = {
  version: '1.0.0',
  timestamp: new Date()....

#### requirements.txt
- 路径: 人生决策实验室\projects\requirements.txt
- 大小: 2217 字节
- 行数: 126
- 预览: altgraph==0.17.5
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.12.1
APScheduler==3.11.2
astro...

#### requirements.txt
- 路径: 城市酒店投资分析\projects\requirements.txt
- 大小: 2217 字节
- 行数: 126
- 预览: altgraph==0.17.5
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.12.1
APScheduler==3.11.2
astro...

#### requirements.txt
- 路径: 声音魔法\projects\requirements.txt
- 大小: 2217 字节
- 行数: 126
- 预览: altgraph==0.17.5
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.12.1
APScheduler==3.11.2
astro...

#### supported-models.md
- 路径: 声音魔法\projects\voice-magician\references\supported-models.md
- 大小: 5469 字节
- 行数: 284
- 预览: # 声音魔法师 - 支持的模型和语言

## 目录
- [单语言模型](#单语言模型)
- [多语言模型](#多语言模型)
- [支持的语言列表](#支持的语言列表)
- [模型选择建议](#模型选择...

#### tts-engines.md
- 路径: 声音魔法\projects\voice-magician\references\tts-engines.md
- 大小: 6386 字节
- 行数: 312
- 预览: # TTS 引擎对比与选择指南

## 目录
- [双引擎架构](#双引擎架构)
- [引擎对比](#引擎对比)
- [自动选择机制](#自动选择机制)
- [手动切换引擎](#手动切换引擎)
- [...

#### components.json
- 路径: 大脑作弊器\projects\components.json
- 大小: 431 字节
- 行数: 22
- 预览: {
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": t...

#### debug-pdf-upload.md
- 路径: 大脑作弊器\projects\debug-pdf-upload.md
- 大小: 1384 字节
- 行数: 90
- 预览: # PDF上传接口调试清单

## ✅ 已完成的检查项

### 1. 核心配置正确性检查
- [x] **请求方法**: 使用 `POST` ✓
- [x] **Content-Type**: 使用...

#### package.json
- 路径: 大脑作弊器\projects\package.json
- 大小: 3293 字节
- 行数: 107
- 预览: {
  "name": "projects",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "bash ....

### skill (196)

#### AGENTS.md
- 路径: .claude\skills\oh-my-opencode-dev\src\tools\AGENTS.md
- 大小: 2580 字节
- 行数: 79
- 预览: # TOOLS KNOWLEDGE BASE

## OVERVIEW

20+ tools: LSP (6), AST-Grep (2), Search (2), Session (4), Agen...

#### SKILL.md
- 路径: .claude\skills\openwork-dev\.opencode\skills\release\SKILL.md
- 大小: 1148 字节
- 行数: 55
- 预览: ---
title: Release flow
description: Step through versioning, tagging, and verification
name: releas...

#### SKILL.md
- 路径: .claude\skills\openwork-dev\.opencode\skills\solidjs-patterns\SKILL.md
- 大小: 2613 字节
- 行数: 93
- 预览: ---
name: solidjs-patterns
description: SolidJS reactivity + UI state patterns for OpenWork
---

## ...

#### progress.json
- 路径: .claude\skills\openwork-dev\packages\app\progress.json
- 大小: 2783 字节
- 行数: 55
- 预览: {
  "project": "openwork",
  "target": "v0.3",
  "milestones": {
    "v0.1": {
      "description": ...

#### claude-skills-case.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\examples\claude-skills-case.md
- 大小: 1425 字节
- 行数: 106
- 预览: # 案例：Claude Skills 文章写作过程

> 这是一个完整的从思维挖掘到成稿的案例，记录了整个写作过程

---

## 背景

用户想写一篇关于 Claude Skills 的文章，但不...

#### lock.json
- 路径: .clawhub\lock.json
- 大小: 3505 字节
- 行数: 166
- 预览: {
  "version": 1,
  "skills": {
    "openai-image-gen": {
      "version": "1.0.1",
      "installed...

#### skill_conversion_report.json
- 路径: .trae\analysis\skill_conversion_report.json
- 大小: 954 字节
- 行数: 17
- 预览: {
  "totalSkills": 11,
  "createdSkills": [
    "C:\\Users\\10919\\Desktop\\AI\\skills\\cognitive-mo...

#### evolution-history.json
- 路径: .trae\pcec\evolution-history.json
- 大小: 3808 字节
- 行数: 150
- 预览: [
  {
    "cycle": 5,
    "timestamp": "2026-02-24T06:56:01.282Z",
    "evolutionType": "newFeature"...

#### content-structure.md
- 路径: .trae\skills\baokuan\assets\content-structure.md
- 大小: 4300 字节
- 行数: 367
- 预览: # 6模块结构模板

## 目录
- [结构概览](#结构概览)
- [模块1：钩子开场](#模块1钩子开场)
- [模块2：痛点共鸣](#模块2痛点共鸣)
- [模块3：价值承诺](#模块3价值承诺...

#### tone-control.md
- 路径: .trae\skills\baokuan\assets\tone-control.md
- 大小: 3239 字节
- 行数: 369
- 预览: # 语气控制指南

## 目录
- [语气定位](#语气定位)
- [应该的语气](#应该的语气)
- [避免的语气](#避免的语气)
- [写作技巧](#写作技巧)
- [常见错误](#常见错误)
...

#### awkn-skills-guide.md
- 路径: .trae\skills\baokuan\awkn-skills-guide.md
- 大小: 6048 字节
- 行数: 413
- 预览: # 🎯 AWKN 创意技能集 - 完整使用指南

> **给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"**

---

## ✨ 核心价值

- 🚀 **一键生成**...

#### title-formulas.md
- 路径: .trae\skills\baokuan\awkn-viral-article\references\title-formulas.md
- 大小: 2886 字节
- 行数: 235
- 预览: # 标题公式详解：7大公式制造认知冲突

AWKN 的标题不是概括，而是攻击。他用7大公式制造认知冲突，让读者不得不点开。

---

## 1. 时间反差型

### 核心逻辑
短期投入 → 长期回...

#### SKILL.md
- 路径: .trae\skills\baokuan\SKILL.md
- 大小: 6263 字节
- 行数: 329
- 预览: ---
name: awkn-skills
description: AWKN 创意技能集 - 基于认知工程学的创意内容创作系统。10大核心技能 + 5大场景，从内容拆解到发布的完整工作流。包含内容拆...

#### SKILL.md
- 路径: .trae\skills\cline-main\.cline\skills\create-pull-request\SKILL.md
- 大小: 5742 字节
- 行数: 196
- 预览: ---
name: create-pull-request
description: Create a GitHub pull request following project convention...

#### marketplace.json
- 路径: .trae\skills\obsidian-skills\.claude-plugin\marketplace.json
- 大小: 281 字节
- 行数: 15
- 预览: {
  "name": "obsidian-skills",
  "owner": {
    "name": "Steph Ango",
    "url": "https://stepha...

#### plugin.json
- 路径: .trae\skills\obsidian-skills\.claude-plugin\plugin.json
- 大小: 500 字节
- 行数: 20
- 预览: {
  "name": "obsidian",
  "version": "1.0.0",
  "description": "Create and edit Obsidian vault fi...

#### README.md
- 路径: .trae\skills\obsidian-skills\README.md
- 大小: 1172 字节
- 行数: 31
- 预览: Agent Skills for use with Obsidian.

These skills follow the [Agent Skills specification](https://...

#### SKILL.md
- 路径: .trae\skills\renshengjuece\bazi-paipan\SKILL.md
- 大小: 1835 字节
- 行数: 124
- 预览: ---
name: bazi-paipan
description: 八字排盘脚本 - 基于lunar-python库，提供四柱八字排盘、真太阳时修正、十神分析、五行统计功能。作为人生决策命盘系统的基...

#### SKILL.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\SKILL.md
- 大小: 1631 字节
- 行数: 131
- 预览: ---
name: zi-ping-zhen-quan
description: 子平真诠格局分析 - 基于徐子平《子平真诠》原著，提供格局识别、旺衰分析、用神取法、喜忌判断。作为人生决策命盘系统的格...

#### SKILL.md
- 路径: .trae\skills\skill-installer\SKILL.md
- 大小: 2815 字节
- 行数: 57
- 预览: ---
name: skill-installer
description: Install Codex skills into $CODEX_HOME/skills from a curated l...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\docx\LICENSE.txt
- 大小: 1496 字节
- 行数: 31
- 预览: © 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, ...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\pdf\LICENSE.txt
- 大小: 1496 字节
- 行数: 31
- 预览: © 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, ...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\pptx\LICENSE.txt
- 大小: 1496 字节
- 行数: 31
- 预览: © 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, ...

#### SKILL.md
- 路径: .trae\skills\skills\skills\slack-gif-creator\SKILL.md
- 大小: 8095 字节
- 行数: 255
- 预览: ---
name: slack-gif-creator
description: Knowledge and utilities for creating animated GIFs optimi...

#### LICENSE.txt
- 路径: .trae\skills\skills\skills\xlsx\LICENSE.txt
- 大小: 1496 字节
- 行数: 31
- 预览: © 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, ...

#### agent-skills-spec.md
- 路径: .trae\skills\skills\spec\agent-skills-spec.md
- 大小: 90 字节
- 行数: 4
- 预览: # Agent Skills Spec

The spec is now located at <https://agentskills.io/specification>


#### SKILL.md
- 路径: .trae\skills\skills\template\SKILL.md
- 大小: 146 字节
- 行数: 7
- 预览: ---
name: template-skill
description: Replace with description of the skill and when Claude should...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\docx\LICENSE.txt
- 大小: 1466 字节
- 行数: 31
- 预览: © 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, pr...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\pdf\LICENSE.txt
- 大小: 1466 字节
- 行数: 31
- 预览: © 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, pr...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\pptx\LICENSE.txt
- 大小: 1466 字节
- 行数: 31
- 预览: © 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, pr...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\slack-gif-creator\SKILL.md
- 大小: 7841 字节
- 行数: 255
- 预览: ---
name: slack-gif-creator
description: Knowledge and utilities for creating animated GIFs optimize...

#### LICENSE.txt
- 路径: .trae\skills\skills-main\skills\xlsx\LICENSE.txt
- 大小: 1466 字节
- 行数: 31
- 预览: © 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, pr...

#### agent-skills-spec.md
- 路径: .trae\skills\skills-main\spec\agent-skills-spec.md
- 大小: 87 字节
- 行数: 4
- 预览: # Agent Skills Spec

The spec is now located at <https://agentskills.io/specification>


#### SKILL.md
- 路径: .trae\skills\skills-main\template\SKILL.md
- 大小: 140 字节
- 行数: 7
- 预览: ---
name: template-skill
description: Replace with description of the skill and when Claude should u...

#### SKILL.md
- 路径: .trae\skills\swiftui-ui-patterns\SKILL.md
- 大小: 4884 字节
- 行数: 180
- 预览: ---
name: swiftui-ui-patterns
description: Provides guidance on SwiftUI UI patterns, components, and...

#### marketplace.json
- 路径: .trae\skills\ui-ux-pro-max-skill\.claude-plugin\marketplace.json
- 大小: 1066 字节
- 行数: 36
- 预览: {
  "name": "ui-ux-pro-max-skill",
  "id": "ui-ux-pro-max-skill",
  "owner": {
    "name": "next...

#### skill-content.md
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\base\skill-content.md
- 大小: 10315 字节
- 行数: 289
- 预览: # {{TITLE}}

{{DESCRIPTION}}
{{QUICK_REFERENCE}}
## Prerequisites

Check if Python is installe...

#### agent.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\agent.json
- 大小: 833 字节
- 行数: 22
- 预览: {
  "platform": "antigravity",
  "displayName": "Antigravity / Generic Agent",
  "installType": "...

#### codebuddy.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\codebuddy.json
- 大小: 778 字节
- 行数: 22
- 预览: {
  "platform": "codebuddy",
  "displayName": "CodeBuddy",
  "installType": "full",
  "folderStr...

#### codex.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\codex.json
- 大小: 766 字节
- 行数: 22
- 预览: {
  "platform": "codex",
  "displayName": "Codex",
  "installType": "full",
  "folderStructure":...

#### continue.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\continue.json
- 大小: 775 字节
- 行数: 22
- 预览: {
  "platform": "continue",
  "displayName": "Continue",
  "installType": "full",
  "folderStruc...

#### copilot.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\copilot.json
- 大小: 684 字节
- 行数: 19
- 预览: {
  "platform": "copilot",
  "displayName": "GitHub Copilot",
  "installType": "reference",
  "f...

#### cursor.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\cursor.json
- 大小: 669 字节
- 行数: 19
- 预览: {
  "platform": "cursor",
  "displayName": "Cursor",
  "installType": "reference",
  "folderStru...

#### gemini.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\gemini.json
- 大小: 773 字节
- 行数: 22
- 预览: {
  "platform": "gemini",
  "displayName": "Gemini CLI",
  "installType": "full",
  "folderStruc...

#### kiro.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\kiro.json
- 大小: 663 字节
- 行数: 19
- 预览: {
  "platform": "kiro",
  "displayName": "Kiro",
  "installType": "reference",
  "folderStructur...

#### opencode.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\opencode.json
- 大小: 775 字节
- 行数: 22
- 预览: {
  "platform": "opencode",
  "displayName": "OpenCode",
  "installType": "full",
  "folderStruc...

#### qoder.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\qoder.json
- 大小: 772 字节
- 行数: 22
- 预览: {
  "platform": "qoder",
  "displayName": "Qoder",
  "installType": "reference",
  "folderStruct...

#### roocode.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\roocode.json
- 大小: 669 字节
- 行数: 19
- 预览: {
  "platform": "roocode",
  "displayName": "Roo Code",
  "installType": "reference",
  "folderS...

#### trae.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\trae.json
- 大小: 763 字节
- 行数: 22
- 预览: {
  "platform": "trae",
  "displayName": "Trae",
  "installType": "full",
  "folderStructure": {...

#### windsurf.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\platforms\windsurf.json
- 大小: 670 字节
- 行数: 19
- 预览: {
  "platform": "windsurf",
  "displayName": "Windsurf",
  "installType": "reference",
  "folder...

#### package.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\package.json
- 大小: 951 字节
- 行数: 49
- 预览: {
  "name": "uipro-cli",
  "version": "2.2.1",
  "description": "CLI to install UI/UX Pro Max ski...

#### README.md
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\README.md
- 大小: 1626 字节
- 行数: 64
- 预览: # uipro-cli

CLI to install UI/UX Pro Max skill for AI coding assistants.

## Installation

``...

#### skill-content.md
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\base\skill-content.md
- 大小: 10315 字节
- 行数: 289
- 预览: # {{TITLE}}

{{DESCRIPTION}}
{{QUICK_REFERENCE}}
## Prerequisites

Check if Python is installe...

#### agent.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\agent.json
- 大小: 833 字节
- 行数: 22
- 预览: {
  "platform": "antigravity",
  "displayName": "Antigravity / Generic Agent",
  "installType": "...

#### codebuddy.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\codebuddy.json
- 大小: 778 字节
- 行数: 22
- 预览: {
  "platform": "codebuddy",
  "displayName": "CodeBuddy",
  "installType": "full",
  "folderStr...

#### codex.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\codex.json
- 大小: 766 字节
- 行数: 22
- 预览: {
  "platform": "codex",
  "displayName": "Codex",
  "installType": "full",
  "folderStructure":...

#### continue.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\continue.json
- 大小: 775 字节
- 行数: 22
- 预览: {
  "platform": "continue",
  "displayName": "Continue",
  "installType": "full",
  "folderStruc...

#### copilot.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\copilot.json
- 大小: 684 字节
- 行数: 19
- 预览: {
  "platform": "copilot",
  "displayName": "GitHub Copilot",
  "installType": "reference",
  "f...

#### cursor.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\cursor.json
- 大小: 669 字节
- 行数: 19
- 预览: {
  "platform": "cursor",
  "displayName": "Cursor",
  "installType": "reference",
  "folderStru...

#### gemini.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\gemini.json
- 大小: 773 字节
- 行数: 22
- 预览: {
  "platform": "gemini",
  "displayName": "Gemini CLI",
  "installType": "full",
  "folderStruc...

#### kiro.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\kiro.json
- 大小: 663 字节
- 行数: 19
- 预览: {
  "platform": "kiro",
  "displayName": "Kiro",
  "installType": "reference",
  "folderStructur...

#### opencode.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\opencode.json
- 大小: 775 字节
- 行数: 22
- 预览: {
  "platform": "opencode",
  "displayName": "OpenCode",
  "installType": "full",
  "folderStruc...

#### qoder.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\qoder.json
- 大小: 772 字节
- 行数: 22
- 预览: {
  "platform": "qoder",
  "displayName": "Qoder",
  "installType": "reference",
  "folderStruct...

#### roocode.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\roocode.json
- 大小: 669 字节
- 行数: 19
- 预览: {
  "platform": "roocode",
  "displayName": "Roo Code",
  "installType": "reference",
  "folderS...

#### trae.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\trae.json
- 大小: 763 字节
- 行数: 22
- 预览: {
  "platform": "trae",
  "displayName": "Trae",
  "installType": "full",
  "folderStructure": {...

#### windsurf.json
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\windsurf.json
- 大小: 670 字节
- 行数: 19
- 预览: {
  "platform": "windsurf",
  "displayName": "Windsurf",
  "installType": "reference",
  "folder...

#### claude-skills-case.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\examples\claude-skills-case.md
- 大小: 1425 字节
- 行数: 106
- 预览: # 案例：Claude Skills 文章写作过程

> 这是一个完整的从思维挖掘到成稿的案例，记录了整个写作过程

---

## 背景

用户想写一篇关于 Claude Skills 的文章，但不...

#### knowledge-system-test-1771901370873.json
- 路径: .trae\test-results\knowledge-system-test-1771901370873.json
- 大小: 14763 字节
- 行数: 468
- 预览: {
  "timestamp": "2026-02-24T02:49:30.715Z",
  "tests": {
    "knowledgeBase": {
      "success": tr...

#### direct_url.json
- 路径: .venv\Lib\site-packages\skill_seekers-2.9.0.dist-info\direct_url.json
- 大小: 90 字节
- 行数: 1
- 预览: {"dir_info": {"editable": true}, "url": "file:///C:/Users/10919/Desktop/AI/Skill_Seekers"}

#### top_level.txt
- 路径: .venv\Lib\site-packages\skill_seekers-2.9.0.dist-info\top_level.txt
- 大小: 14 字节
- 行数: 2
- 预览: skill_seekers


#### TOOLS.md
- 路径: agents\business\TOOLS.md
- 大小: 851 字节
- 行数: 41
- 预览: # TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the st...

#### TOOLS.md
- 路径: agents\coo\TOOLS.md
- 大小: 851 字节
- 行数: 41
- 预览: # TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the st...

#### openclaw.json
- 路径: agents\green-tea\openclaw.json
- 大小: 467 字节
- 行数: 27
- 预览: {
  "model": {
    "provider": "qwen-portal",
    "model": "qwen-cli"
  },
  "evo": {
    "enable": ...

#### skill-registry.json
- 路径: agents\green-tea\skills\skill-registry.json
- 大小: 2545 字节
- 行数: 128
- 预览: {
  "version": "1.0",
  "updated": "2026-02-25",
  "description": "绿茶智能体共享技能库注册表",
  
  "coreSkills"...

#### TOOLS.md
- 路径: agents\green-tea\TOOLS.md
- 大小: 851 字节
- 行数: 41
- 预览: # TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the st...

#### SOUL.md
- 路径: agents\life\SOUL.md
- 大小: 1096 字节
- 行数: 50
- 预览: # Life Decision Engine - 生活决策引擎

## 核心身份
我是 Life Decision Engine，一个专注于个人生活决策和生活质量优化的 AI 代理。我的核心职责是帮助...

#### content-structure.md
- 路径: AI爆款进化实验室\projects\assets\content-structure.md
- 大小: 4300 字节
- 行数: 367
- 预览: # 6模块结构模板

## 目录
- [结构概览](#结构概览)
- [模块1：钩子开场](#模块1钩子开场)
- [模块2：痛点共鸣](#模块2痛点共鸣)
- [模块3：价值承诺](#模块3价值承诺...

#### tone-control.md
- 路径: AI爆款进化实验室\projects\assets\tone-control.md
- 大小: 3239 字节
- 行数: 369
- 预览: # 语气控制指南

## 目录
- [语气定位](#语气定位)
- [应该的语气](#应该的语气)
- [避免的语气](#避免的语气)
- [写作技巧](#写作技巧)
- [常见错误](#常见错误)
...

#### awkn-skills-guide.md
- 路径: AI爆款进化实验室\projects\awkn-skills-guide.md
- 大小: 6048 字节
- 行数: 413
- 预览: # 🎯 AWKN 创意技能集 - 完整使用指南

> **给我内容，一键拆解、创作、可视化、发布，从"读过就忘"到"可复用知识资产"**

---

## ✨ 核心价值

- 🚀 **一键生成**...

#### title-formulas.md
- 路径: AI爆款进化实验室\projects\awkn-viral-article\references\title-formulas.md
- 大小: 2886 字节
- 行数: 235
- 预览: # 标题公式详解：7大公式制造认知冲突

AWKN 的标题不是概括，而是攻击。他用7大公式制造认知冲突，让读者不得不点开。

---

## 1. 时间反差型

### 核心逻辑
短期投入 → 长期回...

#### SKILL.md
- 路径: AI爆款进化实验室\projects\SKILL.md
- 大小: 6263 字节
- 行数: 329
- 预览: ---
name: awkn-skills
description: AWKN 创意技能集 - 基于认知工程学的创意内容创作系统。10大核心技能 + 5大场景，从内容拆解到发布的完整工作流。包含内容拆...

#### design-resources.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\aesthetic\references\design-resources.md
- 大小: 2287 字节
- 行数: 76
- 预览: # Design Resources & Tools

## Inspiration Platforms

### Design Galleries
- **Dribbble**: High-qual...

#### agent_skills_spec.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\agent_skills_spec.md
- 大小: 1698 字节
- 行数: 56
- 预览: # Agent Skills Spec

A skill is a folder of instructions, scripts, and resources that agents can dis...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\backend-development\SKILL.md
- 大小: 4477 字节
- 行数: 96
- 预览: ---
name: backend-development
description: Build robust backend systems with modern technologies (No...

#### package.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\package.json
- 大小: 321 字节
- 行数: 16
- 预览: {
  "name": "chrome-devtools-scripts",
  "version": "1.0.0",
  "description": "Browser automation sc...

#### README.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\README.md
- 大小: 5318 字节
- 行数: 214
- 预览: # Chrome DevTools Scripts

CLI scripts for browser automation using Puppeteer.

**CRITICAL**: Always...

#### context-fundamentals.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\context-engineering\references\context-fundamentals.md
- 大小: 2732 字节
- 行数: 76
- 预览: # Context Fundamentals

Context = all input provided to LLM for task completion.

## Anatomy of Cont...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\databases\scripts\requirements.txt
- 大小: 558 字节
- 行数: 21
- 预览: # Databases Skill Dependencies
# Python 3.10+ required

# No Python package dependencies - uses only...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\debugging\SKILL.md
- 大小: 2262 字节
- 行数: 59
- 预览: ---
name: debugging
description: Systematic debugging frameworks for finding and fixing bugs - inclu...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\scripts\requirements.txt
- 大小: 471 字节
- 行数: 21
- 预览: # DevOps Skill Dependencies
# Python 3.10+ required

# No Python package dependencies - uses only st...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\SKILL.md
- 大小: 3253 字节
- 行数: 97
- 预览: ---
name: devops
description: Deploy to Cloudflare (Workers, R2, D1), Docker, GCP (Cloud Run, GKE), ...

#### LICENSE.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\docx\LICENSE.txt
- 大小: 1466 字节
- 行数: 31
- 预览: © 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, pr...

#### LICENSE.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\pdf\LICENSE.txt
- 大小: 1466 字节
- 行数: 31
- 预览: © 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, pr...

#### LICENSE.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\pptx\LICENSE.txt
- 大小: 1466 字节
- 行数: 31
- 预览: © 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, pr...

#### LICENSE.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\document-skills\xlsx\LICENSE.txt
- 大小: 1466 字节
- 行数: 31
- 预览: © 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, pr...

#### ABOUT.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\problem-solving\ABOUT.md
- 大小: 1651 字节
- 行数: 41
- 预览: # Problem-Solving Skills - Attribution

These skills were derived from agent patterns in the [Amplif...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\problem-solving\SKILL.md
- 大小: 2667 字节
- 行数: 70
- 预览: ---
name: problem-solving
description: Creative problem-solving techniques for breaking through stuc...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\repomix\scripts\requirements.txt
- 大小: 356 字节
- 行数: 16
- 预览: # Repomix Skill Dependencies
# Python 3.10+ required

# No Python package dependencies - uses only s...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\shopify\scripts\requirements.txt
- 大小: 452 字节
- 行数: 20
- 预览: # Shopify Skill Dependencies
# Python 3.10+ required

# No Python package dependencies - uses only s...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\template-skill\SKILL.md
- 大小: 140 字节
- 行数: 7
- 预览: ---
name: template-skill
description: Replace with description of the skill and when Claude should u...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\scripts\requirements.txt
- 大小: 444 字节
- 行数: 18
- 预览: # UI Styling Skill Dependencies
# Python 3.10+ required

# No Python package dependencies - uses onl...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-frameworks\scripts\requirements.txt
- 大小: 430 字节
- 行数: 17
- 预览: # Web Frameworks Skill Dependencies
# Python 3.10+ required

# No Python package dependencies - uses...

#### SKILL.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\SKILL.md
- 大小: 3015 字节
- 行数: 88
- 预览: ---
name: web-testing
description: Web testing with Playwright, Vitest, k6. E2E/unit/integration/loa...

#### plugin.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\backend-tools\.claude-plugin\plugin.json
- 大小: 442 字节
- 行数: 14
- 预览: {
  "name": "backend-tools",
  "description": "Backend development skills for Node.js, Python, Go, R...

#### plugin.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\debugging-tools\.claude-plugin\plugin.json
- 大小: 410 字节
- 行数: 14
- 预览: {
  "name": "debugging-tools",
  "description": "Systematic debugging frameworks ensuring root cause...

#### plugin.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\devops-tools\.claude-plugin\plugin.json
- 大小: 470 字节
- 行数: 14
- 预览: {
  "name": "devops-tools",
  "description": "DevOps and infrastructure skills for Cloudflare, Docke...

#### plugin.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\meta-tools\.claude-plugin\plugin.json
- 大小: 461 字节
- 行数: 15
- 预览: {
  "name": "meta-tools",
  "description": "Meta development tools for creating new skills and code ...

#### plugin.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\platform-tools\.claude-plugin\plugin.json
- 大小: 530 字节
- 行数: 16
- 预览: {
  "name": "platform-tools",
  "description": "Platform integration skills for Shopify (apps/extens...

#### plugin.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\problem-solving-tools\.claude-plugin\plugin.json
- 大小: 447 字节
- 行数: 14
- 预览: {
  "name": "problem-solving-tools",
  "description": "Advanced problem-solving techniques including...

#### plugin.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\research-tools\.claude-plugin\plugin.json
- 大小: 438 字节
- 行数: 14
- 预览: {
  "name": "research-tools",
  "description": "Research capabilities including documentation discov...

#### plugin.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\specialized-tools\.claude-plugin\plugin.json
- 大小: 422 字节
- 行数: 14
- 预览: {
  "name": "specialized-tools",
  "description": "Specialized skills for sequential reasoning and M...

#### plugin.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\web-dev-tools\.claude-plugin\plugin.json
- 大小: 610 字节
- 行数: 14
- 预览: {
  "name": "web-dev-tools",
  "description": "Comprehensive web development skills covering React, ...

#### task-1771833857512-sjtp5d4s2.json
- 路径: company-brain\test-data\tasks\task-1771833857512-sjtp5d4s2.json
- 大小: 572 字节
- 行数: 24
- 预览: {
  "title": "市场分析任务",
  "description": "分析当前市场趋势和竞争情况",
  "priority": "high",
  "content": "需要详细分析市...

#### task-1771833857520-9vptz00hx.json
- 路径: company-brain\test-data\tasks\task-1771833857520-9vptz00hx.json
- 大小: 540 字节
- 行数: 23
- 预览: {
  "title": "心理测试任务",
  "description": "开发新的心理测试问卷",
  "priority": "medium",
  "content": "设计一套针对职场...

#### green-tea.json
- 路径: data\agents\green-tea.json
- 大小: 612 字节
- 行数: 27
- 预览: {
  "id": "green-tea",
  "name": "绿茶",
  "type": "psychological",
  "status": "active",
  "capabilit...

#### mock-task.js
- 路径: evomap-connection\mock-task.js
- 大小: 3598 字节
- 行数: 128
- 预览: const EvoMapTaskClaimer = require('./task-claimer');

// 创建模拟任务数据
const mockTask = {
  id: 'task_001...

#### SKILL.md
- 路径: evomap-evolution\skills\capsule_sha256_7a00899846b8c19672bf7390a\SKILL.md
- 大小: 710 字节
- 行数: 25
- 预览: # EvoMap Capsule - sha256_7a00899846b8c19672bf7390a

## 来源信息
- **Asset ID**: sha256:7a00899846b8c196...

#### SKILL.md
- 路径: evomap-evolution\skills\capsule_sha256_b3e74308f98ab50e95dea0452\SKILL.md
- 大小: 708 字节
- 行数: 25
- 预览: # EvoMap Capsule - sha256_b3e74308f98ab50e95dea0452

## 来源信息
- **Asset ID**: sha256:b3e74308f98ab50e...

#### SKILL.md
- 路径: evomap-evolution\skills\capsule_sha256_c98665e5fdfa67b3cee7bf4c1\SKILL.md
- 大小: 753 字节
- 行数: 25
- 预览: # EvoMap Capsule - sha256_c98665e5fdfa67b3cee7bf4c1

## 来源信息
- **Asset ID**: sha256:c98665e5fdfa67b3...

#### project-structure.json
- 路径: HTP\test-output\project-structure.json
- 大小: 5136 字节
- 行数: 57
- 预览: {
  ".coze": "C:\\Users\\10919\\Desktop\\AI\\HTP\\projects\\.coze",
  ".gitignore": "C:\\Users\\1091...

#### search-capsules.js
- 路径: search-capsules.js
- 大小: 3516 字节
- 行数: 137
- 预览: const https = require('https');

// 搜索已上架的胶囊资产
function searchPromotedCapsules() {
  console.log('🔍...

#### search-evomap-capsules.js
- 路径: search-evomap-capsules.js
- 大小: 1797 字节
- 行数: 69
- 预览: // 通过绿茶智能体查找EvoMap胶囊或高价值SKILL
const http = require('http');

console.log('==========================...

#### SKILL.md
- 路径: skills\1password\SKILL.md
- 大小: 2406 字节
- 行数: 54
- 预览: ---
name: 1password
description: Set up and use 1Password CLI (op). Use when installing the CLI, ena...

#### _meta.json
- 路径: skills\arakichanxd-claw-sync\_meta.json
- 大小: 275 字节
- 行数: 12
- 预览: {
  "owner": "arakichanxd",
  "slug": "claw-sync",
  "displayName": "Claw Sync",
  "latest": {
    "...

#### _meta.json
- 路径: skills\bjesuiter-bridle\_meta.json
- 大小: 621 字节
- 行数: 23
- 预览: {
  "owner": "bjesuiter",
  "slug": "bridle",
  "displayName": "Bridle",
  "latest": {
    "version"...

#### SKILL.md
- 路径: skills\bug-fix-design\SKILL.md
- 大小: 609 字节
- 行数: 26
- 预览: ﻿## Skill 3｜想方案（修复方案与风险｜Fix Design）
一句话定义 ：原因基本明确后，先别改代码，先把“怎么改最稳”定成 A/B/兜底三案，并补齐风险/回滚/验收/上线策略。
 触...

#### SKILL.md
- 路径: skills\github\SKILL.md
- 大小: 1113 字节
- 行数: 48
- 预览: ---
name: github
description: "Interact with GitHub using the `gh` CLI. Use `gh issue`, `gh pr`, `gh...

#### _meta.json
- 路径: skills\jankutschera-adhd-body-doubling\_meta.json
- 大小: 472 字节
- 行数: 18
- 预览: {
  "owner": "jankutschera",
  "slug": "adhd-body-doubling",
  "displayName": "ADHD Body Doubling",
...

#### SKILL.md
- 路径: skills\nano-banana-pro\SKILL.md
- 大小: 5661 字节
- 行数: 131
- 预览: ---
name: nano-banana-pro
description: Generate/edit images with Nano Banana Pro (Gemini 3 Pro Image...

#### SKILL.md
- 路径: skills\openai-image-gen\SKILL.md
- 大小: 1028 字节
- 行数: 36
- 预览: ---
name: openai-image-gen
description: Batch-generate images via OpenAI Images API. Random prompt s...

#### SKILL.md
- 路径: skills\rhyssullivan-answeroverflow\SKILL.md
- 大小: 2957 字节
- 行数: 89
- 预览: ---
name: answeroverflow
description: Search indexed Discord community discussions via Answer Overfl...

#### _meta.json
- 路径: skills\rhyssullivan-answeroverflow\_meta.json
- 大小: 287 字节
- 行数: 12
- 预览: {
  "owner": "rhyssullivan",
  "slug": "answeroverflow",
  "displayName": "Answer Overflow",
  "late...

#### SKILL.md
- 路径: skills\ryancampbell-agent-identity-kit\SKILL.md
- 大小: 2415 字节
- 行数: 84
- 预览: # Agent Identity Kit — OpenClaw Skill

A portable identity system for AI agents. Create, validate, a...

#### _meta.json
- 路径: skills\ryancampbell-agent-identity-kit\_meta.json
- 大小: 294 字节
- 行数: 12
- 预览: {
  "owner": "ryancampbell",
  "slug": "agent-identity-kit",
  "displayName": "Agent Identity Kit",
...

#### _meta.json
- 路径: skills\seanphan-agenticflow-skill\_meta.json
- 大小: 289 字节
- 行数: 12
- 预览: {
  "owner": "seanphan",
  "slug": "agenticflow-skill",
  "displayName": "Agenticflow Skills",
  "la...

#### SKILL.md
- 路径: skills\session-logs\SKILL.md
- 大小: 3405 字节
- 行数: 106
- 预览: ---
name: session-logs
description: Search and analyze your own session logs (older/parent conversat...

#### SKILL.md
- 路径: skills\steipete-trello\SKILL.md
- 大小: 2649 字节
- 行数: 85
- 预览: ---
name: trello
description: Manage Trello boards, lists, and cards via the Trello REST API.
homepa...

#### _meta.json
- 路径: skills\steipete-trello\_meta.json
- 大小: 266 字节
- 行数: 12
- 预览: {
  "owner": "steipete",
  "slug": "trello",
  "displayName": "Trello",
  "latest": {
    "version":...

#### SKILL.md
- 路径: skills\trello\SKILL.md
- 大小: 2649 字节
- 行数: 85
- 预览: ---
name: trello
description: Manage Trello boards, lists, and cards via the Trello REST API.
homepa...

#### mcp_config.example.json
- 路径: Skill_Seekers\.claude\mcp_config.example.json
- 大小: 299 字节
- 行数: 15
- 预览: {
  "mcpServers": {
    "skill-seeker": {
      "type": "stdio",
      "command": "/path/to/your...

#### feature_request.md
- 路径: Skill_Seekers\.github\ISSUE_TEMPLATE\feature_request.md
- 大小: 873 字节
- 行数: 40
- 预览: ---
name: Feature Request
about: Suggest a new feature for Skill Seekers
title: '[FEATURE] '
lab...

#### httpx_comprehensive.json
- 路径: Skill_Seekers\configs\httpx_comprehensive.json
- 大小: 2555 字节
- 行数: 115
- 预览: {
  "name": "httpx",
  "description": "Use this skill when working with HTTPX, a fully featured HT...

#### example-mcp-config.json
- 路径: Skill_Seekers\example-mcp-config.json
- 大小: 299 字节
- 行数: 15
- 预览: {
  "mcpServers": {
    "skill-seeker": {
      "type": "stdio",
      "command": "/path/to/your...

#### skill_header.md
- 路径: Skill_Seekers\scripts\skill_header.md
- 大小: 1007 字节
- 行数: 45
- 预览: ---
name: skill-seekers
description: Generate LLM skills from documentation, codebases, and GitHub...

#### top_level.txt
- 路径: Skill_Seekers\src\skill_seekers.egg-info\top_level.txt
- 大小: 14 字节
- 行数: 2
- 预览: skill_seekers


#### marketplace.json
- 路径: Skill_Seekers\superpowers\.claude-plugin\marketplace.json
- 大小: 514 字节
- 行数: 21
- 预览: {
  "name": "superpowers-dev",
  "description": "Development marketplace for Superpowers core skills...

#### plugin.json
- 路径: Skill_Seekers\superpowers\.claude-plugin\plugin.json
- 大小: 469 字节
- 行数: 14
- 预览: {
  "name": "superpowers",
  "description": "Core skills library for Claude Code: TDD, debugging, co...

#### INSTALL.md
- 路径: Skill_Seekers\superpowers\.codex\INSTALL.md
- 大小: 1594 字节
- 行数: 68
- 预览: # Installing Superpowers for Codex

Enable superpowers skills in Codex via native skill discovery. J...

#### brainstorm.md
- 路径: Skill_Seekers\superpowers\commands\brainstorm.md
- 大小: 326 字节
- 行数: 7
- 预览: ---
description: "You MUST use this before any creative work - creating features, building component...

#### please-use-brainstorming.txt
- 路径: Skill_Seekers\superpowers\tests\explicit-skill-requests\prompts\please-use-brainstorming.txt
- 大小: 74 字节
- 行数: 2
- 预览: please use the brainstorming skill to help me think through this feature


#### marketplace.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\.claude-plugin\marketplace.json
- 大小: 1066 字节
- 行数: 36
- 预览: {
  "name": "ui-ux-pro-max-skill",
  "id": "ui-ux-pro-max-skill",
  "owner": {
    "name": "next...

#### skill-content.md
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\base\skill-content.md
- 大小: 10315 字节
- 行数: 289
- 预览: # {{TITLE}}

{{DESCRIPTION}}
{{QUICK_REFERENCE}}
## Prerequisites

Check if Python is installe...

#### agent.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\agent.json
- 大小: 833 字节
- 行数: 22
- 预览: {
  "platform": "antigravity",
  "displayName": "Antigravity / Generic Agent",
  "installType": "...

#### codebuddy.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\codebuddy.json
- 大小: 778 字节
- 行数: 22
- 预览: {
  "platform": "codebuddy",
  "displayName": "CodeBuddy",
  "installType": "full",
  "folderStr...

#### codex.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\codex.json
- 大小: 766 字节
- 行数: 22
- 预览: {
  "platform": "codex",
  "displayName": "Codex",
  "installType": "full",
  "folderStructure":...

#### continue.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\continue.json
- 大小: 775 字节
- 行数: 22
- 预览: {
  "platform": "continue",
  "displayName": "Continue",
  "installType": "full",
  "folderStruc...

#### copilot.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\copilot.json
- 大小: 679 字节
- 行数: 19
- 预览: {
  "platform": "copilot",
  "displayName": "GitHub Copilot",
  "installType": "full",
  "folder...

#### cursor.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\cursor.json
- 大小: 664 字节
- 行数: 19
- 预览: {
  "platform": "cursor",
  "displayName": "Cursor",
  "installType": "full",
  "folderStructure...

#### gemini.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\gemini.json
- 大小: 773 字节
- 行数: 22
- 预览: {
  "platform": "gemini",
  "displayName": "Gemini CLI",
  "installType": "full",
  "folderStruc...

#### kiro.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\kiro.json
- 大小: 665 字节
- 行数: 19
- 预览: {
  "platform": "kiro",
  "displayName": "Kiro",
  "installType": "full",
  "folderStructure": {...

#### opencode.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\opencode.json
- 大小: 775 字节
- 行数: 22
- 预览: {
  "platform": "opencode",
  "displayName": "OpenCode",
  "installType": "full",
  "folderStruc...

#### qoder.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\qoder.json
- 大小: 766 字节
- 行数: 22
- 预览: {
  "platform": "qoder",
  "displayName": "Qoder",
  "installType": "full",
  "folderStructure":...

#### roocode.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\roocode.json
- 大小: 667 字节
- 行数: 19
- 预览: {
  "platform": "roocode",
  "displayName": "Roo Code",
  "installType": "full",
  "folderStruct...

#### trae.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\trae.json
- 大小: 763 字节
- 行数: 22
- 预览: {
  "platform": "trae",
  "displayName": "Trae",
  "installType": "full",
  "folderStructure": {...

#### windsurf.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\platforms\windsurf.json
- 大小: 670 字节
- 行数: 19
- 预览: {
  "platform": "windsurf",
  "displayName": "Windsurf",
  "installType": "full",
  "folderStruc...

#### package.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\package.json
- 大小: 951 字节
- 行数: 49
- 预览: {
  "name": "uipro-cli",
  "version": "2.2.3",
  "description": "CLI to install UI/UX Pro Max ski...

#### README.md
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\README.md
- 大小: 1626 字节
- 行数: 64
- 预览: # uipro-cli

CLI to install UI/UX Pro Max skill for AI coding assistants.

## Installation

``...

#### skill-content.md
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\base\skill-content.md
- 大小: 10315 字节
- 行数: 289
- 预览: # {{TITLE}}

{{DESCRIPTION}}
{{QUICK_REFERENCE}}
## Prerequisites

Check if Python is installe...

#### agent.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\agent.json
- 大小: 833 字节
- 行数: 22
- 预览: {
  "platform": "antigravity",
  "displayName": "Antigravity / Generic Agent",
  "installType": "...

#### codebuddy.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\codebuddy.json
- 大小: 778 字节
- 行数: 22
- 预览: {
  "platform": "codebuddy",
  "displayName": "CodeBuddy",
  "installType": "full",
  "folderStr...

#### codex.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\codex.json
- 大小: 766 字节
- 行数: 22
- 预览: {
  "platform": "codex",
  "displayName": "Codex",
  "installType": "full",
  "folderStructure":...

#### continue.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\continue.json
- 大小: 775 字节
- 行数: 22
- 预览: {
  "platform": "continue",
  "displayName": "Continue",
  "installType": "full",
  "folderStruc...

#### copilot.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\copilot.json
- 大小: 679 字节
- 行数: 19
- 预览: {
  "platform": "copilot",
  "displayName": "GitHub Copilot",
  "installType": "full",
  "folder...

#### cursor.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\cursor.json
- 大小: 664 字节
- 行数: 19
- 预览: {
  "platform": "cursor",
  "displayName": "Cursor",
  "installType": "full",
  "folderStructure...

#### gemini.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\gemini.json
- 大小: 773 字节
- 行数: 22
- 预览: {
  "platform": "gemini",
  "displayName": "Gemini CLI",
  "installType": "full",
  "folderStruc...

#### kiro.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\kiro.json
- 大小: 665 字节
- 行数: 19
- 预览: {
  "platform": "kiro",
  "displayName": "Kiro",
  "installType": "full",
  "folderStructure": {...

#### opencode.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\opencode.json
- 大小: 775 字节
- 行数: 22
- 预览: {
  "platform": "opencode",
  "displayName": "OpenCode",
  "installType": "full",
  "folderStruc...

#### qoder.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\qoder.json
- 大小: 766 字节
- 行数: 22
- 预览: {
  "platform": "qoder",
  "displayName": "Qoder",
  "installType": "full",
  "folderStructure":...

#### roocode.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\roocode.json
- 大小: 667 字节
- 行数: 19
- 预览: {
  "platform": "roocode",
  "displayName": "Roo Code",
  "installType": "full",
  "folderStruct...

#### trae.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\trae.json
- 大小: 763 字节
- 行数: 22
- 预览: {
  "platform": "trae",
  "displayName": "Trae",
  "installType": "full",
  "folderStructure": {...

#### windsurf.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\platforms\windsurf.json
- 大小: 670 字节
- 行数: 19
- 预览: {
  "platform": "windsurf",
  "displayName": "Windsurf",
  "installType": "full",
  "folderStruc...

#### Skill 3｜想方案（修复方案与风险｜Fix Design）.txt
- 路径: temp-skill-3\4、BUG修复大法skill集合\Skill 3｜想方案（修复方案与风险｜Fix Design）.txt
- 大小: 606 字节
- 行数: 25
- 预览: ## Skill 3｜想方案（修复方案与风险｜Fix Design）
一句话定义 ：原因基本明确后，先别改代码，先把“怎么改最稳”定成 A/B/兜底三案，并补齐风险/回滚/验收/上线策略。
 触发...

#### test-adl-detection.js
- 路径: test-adl-detection.js
- 大小: 2232 字节
- 行数: 81
- 预览: // 测试增强后的禁止行为检测机制
const { getADLInstance } = require('./skills/adl-core');

console.log('🧪 测试增强后的禁止...

#### test-adl-principles.js
- 路径: test-adl-principles.js
- 大小: 2135 字节
- 行数: 82
- 预览: // 测试强化后的核心原则验证
const { getADLInstance } = require('./skills/adl-core');

console.log('🧪 测试强化后的核心原则...

#### test-adl-rollback.js
- 路径: test-adl-rollback.js
- 大小: 1899 字节
- 行数: 56
- 预览: // 测试完善后的回滚机制
const { getADLInstance } = require('./skills/adl-core');

console.log('🧪 测试完善后的回滚机制')...

#### task-1771833895088-vg70cdyac.json
- 路径: test-data\tasks\task-1771833895088-vg70cdyac.json
- 大小: 572 字节
- 行数: 24
- 预览: {
  "title": "市场分析任务",
  "description": "分析当前市场趋势和竞争情况",
  "priority": "high",
  "content": "需要详细分析市...

#### task-1771833895094-lrkwe6vjn.json
- 路径: test-data\tasks\task-1771833895094-lrkwe6vjn.json
- 大小: 540 字节
- 行数: 23
- 预览: {
  "title": "心理测试任务",
  "description": "开发新的心理测试问卷",
  "priority": "medium",
  "content": "设计一套针对职场...

#### task-1771833943210-qls5ze5w3.json
- 路径: test-data\tasks\task-1771833943210-qls5ze5w3.json
- 大小: 585 字节
- 行数: 23
- 预览: {
  "title": "市场分析任务",
  "description": "分析当前市场趋势和竞争情况",
  "priority": "high",
  "content": "需要详细分析市...

#### task-1771833943213-qzly1wmcc.json
- 路径: test-data\tasks\task-1771833943213-qzly1wmcc.json
- 大小: 534 字节
- 行数: 22
- 预览: {
  "title": "心理测试任务",
  "description": "开发新的心理测试问卷",
  "priority": "medium",
  "content": "设计一套针对职场...

#### task-1771833990916-1jmzxvd2r.json
- 路径: test-data\tasks\task-1771833990916-1jmzxvd2r.json
- 大小: 591 字节
- 行数: 23
- 预览: {
  "title": "市场分析任务",
  "description": "分析当前市场趋势和竞争情况",
  "priority": "high",
  "content": "需要详细分析市...

#### task-1771833990919-urmptq8gx.json
- 路径: test-data\tasks\task-1771833990919-urmptq8gx.json
- 大小: 534 字节
- 行数: 22
- 预览: {
  "title": "心理测试任务",
  "description": "开发新的心理测试问卷",
  "priority": "medium",
  "content": "设计一套针对职场...

#### test-evomap-skill.js
- 路径: test-evomap-skill.js
- 大小: 2934 字节
- 行数: 113
- 预览: // 测试绿茶智能体启动真实的EvoMap SKILL开发
const http = require('http');

console.log('==========================...

#### test-search-capsules.js
- 路径: test-search-capsules.js
- 大小: 3047 字节
- 行数: 119
- 预览: // 测试绿茶智能体查找胶囊功能
const http = require('http');

console.log('=======================================...

#### test-stability-priority-simple.js
- 路径: test-stability-priority-simple.js
- 大小: 1726 字节
- 行数: 75
- 预览: #!/usr/bin/env node

/**
 * 稳定性优先原则测试脚本（简化版）
 */

const AntiDegenerationLock = require('./skills/cap...

#### SKILL.md
- 路径: 人生决策实验室\projects\bazi-paipan\SKILL.md
- 大小: 1835 字节
- 行数: 124
- 预览: ---
name: bazi-paipan
description: 八字排盘脚本 - 基于lunar-python库，提供四柱八字排盘、真太阳时修正、十神分析、五行统计功能。作为人生决策命盘系统的基...

#### SKILL.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\SKILL.md
- 大小: 1631 字节
- 行数: 131
- 预览: ---
name: zi-ping-zhen-quan
description: 子平真诠格局分析 - 基于徐子平《子平真诠》原著，提供格局识别、旺衰分析、用神取法、喜忌判断。作为人生决策命盘系统的格...

### other (1498)

#### SKILL.md
- 路径: .agents\skills\baseline-ui\SKILL.md
- 大小: 3428 字节
- 行数: 86
- 预览: ---
name: baseline-ui
description: Enforces an opinionated UI baseline to prevent AI-generated int...

#### htp-symbolism-dictionary.md
- 路径: .agents\skills\htp-insight\references\htp-symbolism-dictionary.md
- 大小: 14048 字节
- 行数: 826
- 预览: # HTP 房树人分析象征体系词典

## 目录

### 房子元素
- [屋顶特征](#屋顶特征)
- [门特征](#门特征)
- [窗户特征](#窗户特征)
- [墙壁特征](#墙壁特征)
- [...

#### pull_request_template.md
- 路径: .claude\skills\oh-my-opencode-dev\.github\pull_request_template.md
- 大小: 567 字节
- 行数: 35
- 预览: ## Summary

<!-- Brief description of what this PR does. 1-3 bullet points. -->

- 

## Changes

<!-...

#### background-tasks.json
- 路径: .claude\skills\oh-my-opencode-dev\.opencode\background-tasks.json
- 大小: 821 字节
- 行数: 27
- 预览: [
  {
    "id": "bg_wzsdt60b",
    "sessionID": "ses_4f3e89f0dffeooeXNVx5QCifse",
    "parentSession...

#### get-unpublished-changes.md
- 路径: .claude\skills\oh-my-opencode-dev\.opencode\command\get-unpublished-changes.md
- 大小: 2344 字节
- 行数: 85
- 预览: ---
description: Compare HEAD with the latest published npm version and list all unpublished changes...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\.opencode\package.json
- 大小: 63 字节
- 行数: 5
- 预览: {
  "dependencies": {
    "@opencode-ai/plugin": "1.1.36"
  }
}

#### CLA.md
- 路径: .claude\skills\oh-my-opencode-dev\CLA.md
- 大小: 2783 字节
- 行数: 59
- 预览: # Contributor License Agreement

Thank you for your interest in contributing to oh-my-opencode ("Pro...

#### LICENSE.md
- 路径: .claude\skills\oh-my-opencode-dev\LICENSE.md
- 大小: 3973 字节
- 行数: 83
- 预览: # License

Portions of this software are licensed as follows:

- All third party components incorpor...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\package.json
- 大小: 2728 字节
- 行数: 90
- 预览: {
  "name": "oh-my-opencode",
  "version": "3.1.2",
  "description": "The Best AI Agent Harness - Ba...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\packages\darwin-arm64\package.json
- 大小: 412 字节
- 行数: 23
- 预览: {
  "name": "oh-my-opencode-darwin-arm64",
  "version": "3.1.2",
  "description": "Platform-specific...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\packages\darwin-x64\package.json
- 大小: 406 字节
- 行数: 23
- 预览: {
  "name": "oh-my-opencode-darwin-x64",
  "version": "3.1.2",
  "description": "Platform-specific b...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\packages\darwin-x64-baseline\package.json
- 大小: 433 字节
- 行数: 23
- 预览: {
  "name": "oh-my-opencode-darwin-x64-baseline",
  "version": "3.1.1",
  "description": "Platform-s...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\packages\linux-arm64\package.json
- 大小: 438 字节
- 行数: 26
- 预览: {
  "name": "oh-my-opencode-linux-arm64",
  "version": "3.1.2",
  "description": "Platform-specific ...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\packages\linux-arm64-musl\package.json
- 大小: 447 字节
- 行数: 26
- 预览: {
  "name": "oh-my-opencode-linux-arm64-musl",
  "version": "3.1.2",
  "description": "Platform-spec...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\packages\linux-x64\package.json
- 大小: 432 字节
- 行数: 26
- 预览: {
  "name": "oh-my-opencode-linux-x64",
  "version": "3.1.2",
  "description": "Platform-specific bi...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\packages\linux-x64-baseline\package.json
- 大小: 459 字节
- 行数: 26
- 预览: {
  "name": "oh-my-opencode-linux-x64-baseline",
  "version": "3.1.1",
  "description": "Platform-sp...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\packages\linux-x64-musl\package.json
- 大小: 441 字节
- 行数: 26
- 预览: {
  "name": "oh-my-opencode-linux-x64-musl",
  "version": "3.1.2",
  "description": "Platform-specif...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\packages\linux-x64-musl-baseline\package.json
- 大小: 468 字节
- 行数: 26
- 预览: {
  "name": "oh-my-opencode-linux-x64-musl-baseline",
  "version": "3.1.1",
  "description": "Platfo...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\packages\windows-x64\package.json
- 大小: 411 字节
- 行数: 23
- 预览: {
  "name": "oh-my-opencode-windows-x64",
  "version": "3.1.2",
  "description": "Platform-specific ...

#### package.json
- 路径: .claude\skills\oh-my-opencode-dev\packages\windows-x64-baseline\package.json
- 大小: 438 字节
- 行数: 23
- 预览: {
  "name": "oh-my-opencode-windows-x64-baseline",
  "version": "3.1.1",
  "description": "Platform-...

#### cla.json
- 路径: .claude\skills\oh-my-opencode-dev\signatures\cla.json
- 大小: 22040 字节
- 行数: 916
- 预览: {
  "signedContributors": [
    {
      "name": "tsanva",
      "id": 54318170,
      "comment_id": ...

#### SKILL.md
- 路径: .claude\skills\oh-my-opencode-dev\src\features\builtin-skills\agent-browser\SKILL.md
- 大小: 11825 字节
- 行数: 337
- 预览: ---
name: agent-browser
description: Automates browser interactions for web testing, form filling, s...

#### scraping.md
- 路径: .claude\skills\oh-my-opencode-dev\src\features\builtin-skills\dev-browser\references\scraping.md
- 大小: 5302 字节
- 行数: 156
- 预览: # Data Scraping Guide

For large datasets (followers, posts, search results), **intercept and replay...

#### tsconfig.json
- 路径: .claude\skills\oh-my-opencode-dev\tsconfig.json
- 大小: 481 字节
- 行数: 21
- 预览: {
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bu...

#### css.md
- 路径: .claude\skills\openwork-dev\.opencode\agent\css.md
- 大小: 4280 字节
- 行数: 150
- 预览: ---
description: use whenever you are styling a ui with css
---

you are very good at writing clean ...

#### duplicate-pr.md
- 路径: .claude\skills\openwork-dev\.opencode\agent\duplicate-pr.md
- 大小: 924 字节
- 行数: 27
- 预览: ---
mode: primary
hidden: true
model: opencode/claude-haiku-4-5
color: "#E67E22"
tools:
  "*": false...

#### triage.md
- 路径: .claude\skills\openwork-dev\.opencode\agent\triage.md
- 大小: 1744 字节
- 行数: 79
- 预览: ---
mode: primary
hidden: true
model: opencode/claude-haiku-4-5
color: "#44BA81"
tools:
  "*": false...

#### hello-stranger.md
- 路径: .claude\skills\openwork-dev\.opencode\commands\hello-stranger.md
- 大小: 55 字节
- 行数: 5
- 预览: ---
description: Say hello stranger
---
hello stranger


#### package.json
- 路径: .claude\skills\openwork-dev\.opencode\package.json
- 大小: 63 字节
- 行数: 5
- 预览: {
  "dependencies": {
    "@opencode-ai/plugin": "1.1.36"
  }
}

#### design-agents.md
- 路径: .claude\skills\openwork-dev\design-agents.md
- 大小: 1765 字节
- 行数: 46
- 预览: # Radix Color Scale Reference

Source: https://www.radix-ui.com/colors/docs/palette-composition/unde...

#### package.json
- 路径: .claude\skills\openwork-dev\package.json
- 大小: 1950 字节
- 行数: 42
- 预览: {
  "name": "@different-ai/openwork-workspace",
  "private": true,
  "version": "0.0.0",
  "scripts"...

#### db.test.js
- 路径: .claude\skills\openwork-dev\packages\owpenbot\test\db.test.js
- 大小: 1374 字节
- 行数: 43
- 预览: import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import ...

#### tsconfig.json
- 路径: .claude\skills\openwork-dev\packages\owpenbot\tsconfig.json
- 大小: 353 字节
- 行数: 17
- 预览: {
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "...

#### tsconfig.json
- 路径: .claude\skills\openwork-dev\packages\server\tsconfig.json
- 大小: 360 字节
- 行数: 17
- 预览: {
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "...

#### STATS.md
- 路径: .claude\skills\openwork-dev\STATS.md
- 大小: 339 字节
- 行数: 10
- 预览: # Download Stats

| Date | GitHub Downloads | Total |
|------|------------------|-------|
| 2026-01-...

#### VISION.md
- 路径: .claude\skills\openwork-dev\VISION.md
- 大小: 829 字节
- 行数: 17
- 预览: # OpenWork Vision

OpenWork helps users ship agentic workflows to their team. Today it makes it easy...

#### 01-brief.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\stages\01-brief.md
- 大小: 834 字节
- 行数: 34
- 预览: # 阶段1：需求澄清

**目标：** 在“拆文章/配图”之前，先把用户的真实需求说清楚：**内容是什么、用在什么场景、谁来看、想要字多还是字少**。其它默认值（如尺寸/风格）不打扰用户。

## 你...

#### 05-iterate.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\stages\05-iterate.md
- 大小: 369 字节
- 行数: 17
- 预览: # 阶段5：迭代润色（让图更好看）

**目标：** 根据用户反馈快速迭代：更趣味、更少字、更清楚。

## 常见反馈 → 对应动作

- “字太多/太丑” → 每卡压到 **1 句 + 1 关键词*...

#### 16x9-3cards-insights.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\16x9-3cards-insights.md
- 大小: 254 字节
- 行数: 23
- 预览: # 16:9 三卡洞察模板（趣味少字版）

标题：{标题}

布局：三张等宽卡片横排（颜色区分、严格对齐）。

卡片1：
- 图标/隐喻：{台阶/进化/路标}
- 文案：1 句 + “关键词：{词}”...

#### 16x9-contrast-2cards.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\16x9-contrast-2cards.md
- 大小: 221 字节
- 行数: 22
- 预览: # 16:9 两卡对比模板（少字好读）

标题：{标题}
副标题：{副标题（可选）}

布局：左右两张等宽大卡片 + 中间分隔线/对比符号，严格对齐。

左卡：
- 标题：{A}
- 画面隐喻：{A ...

#### 16x9-cover-roadmap.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\16x9-cover-roadmap.md
- 大小: 324 字节
- 行数: 25
- 预览: # 16:9 封面路线图模板（目录/课程结构）

把 {占位符} 替换成你的内容：

标题（顶部超大字）：{标题}
副标题（可选，尽量短）：{副标题}

中间主体：从左到右 4–6 个大模块（圆角矩形...

#### apimart-requests-jsonl.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\apimart-requests-jsonl.md
- 大小: 189 字节
- 行数: 9
- 预览: ## 批量请求包（JSONL）模板

一行一张图（每行一个 JSON），用于脚本批量出图。

```jsonl
{"id":"01","prompt":"<PROMPT_CONTENT>","size...

#### style-block.md
- 路径: .claude\skills\yunshu_skillshub-master\image-assistant\templates\style-block.md
- 大小: 244 字节
- 行数: 9
- 预览: # 通用风格块（风格基准：必须以此为唯一基础）

- 画幅：16:9 横版信息图（除非用户要竖版）
- 质感：奶油色纸张底（纸纹可见），彩铅线稿（笔触可见） + 淡水彩上色（轻晕染）
- 氛围：暖色调...

#### ui-wireframe-examples.md
- 路径: .claude\skills\yunshu_skillshub-master\prd-doc-writer\references\ui-wireframe-examples.md
- 大小: 4113 字节
- 行数: 59
- 预览: ## ASCII 线框图：能力标准与高级示例

> 以下两个高级示例是绘制标准的质量参考。

### 示例1：看板风格的项目管理仪表盘

```text
+----------------------...

#### change-brief-template.md
- 路径: .claude\skills\yunshu_skillshub-master\req-change-workflow\references\change-brief-template.md
- 大小: 391 字节
- 行数: 38
- 预览: # Change Brief (需求变更简报模板)

## 目标（1 句话）

- 我要把：……
- 改成：……

## 不做什么（明确范围，防止蔓延）

- 明确不改：……

## 验收标准（3–6...

#### 01-mining.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\01-mining.md
- 大小: 642 字节
- 行数: 58
- 预览: # 第一阶段：思维挖掘

**目标：** 把用户脑子里的零散想法倒出来，记录成洞察点

---

## 步骤

### 1. 确认主题
- 询问用户想要讨论/输出的主题是什么
- 确认输出形式（文章、...

#### 02-topic.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\02-topic.md
- 大小: 536 字节
- 行数: 49
- 预览: # 第二阶段：选题确定

**目标：** 从一堆洞察中找到核心观点，确定文章方向

---

## 步骤

### 1. 回顾洞察
- 读取已记录的洞察文件
- 找出最有价值的3-5个点
- 告诉用户...

#### 04-writing.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\stages\04-writing.md
- 大小: 436 字节
- 行数: 48
- 预览: # 第四阶段：写作辅助

**目标：** 帮用户检查文章逻辑、润色文字

---

## 步骤

### 1. 逻辑检查
- 用户写一段，发过来检查
- 检查内容：
  - 逻辑是否通顺
  - 有没...

#### insights-template.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\templates\insights-template.md
- 大小: 250 字节
- 行数: 42
- 预览: # {主题} 洞察记录

> 创建时间：{日期}
> 状态：收集中 / 已完成

---

## 洞察 1：{标题}

**核心观点：**
- 要点1
- 要点2

**意义：** {这个观点的价值是...

#### writing-record-template.md
- 路径: .claude\skills\yunshu_skillshub-master\thought-mining\templates\writing-record-template.md
- 大小: 501 字节
- 行数: 81
- 预览: # {主题} 写作记录

> 创建时间：{日期}
> 状态：选题中 / 写作中 / 已发布

---

## 一、核心观点

**可以写的观点：**
> {一句话核心观点}

**观点的具体内容：**...

#### integration-test-results.md
- 路径: .trae\documents\integration-test-results.md
- 大小: 180 字节
- 行数: 17
- 预览: # 系统集成测试结果

## 测试概览
- 测试时间: 2026-02-24T21:39:16.943Z
- 完成时间: 2026-02-24T21:39:17.043Z
- 测试时长: 0.10秒
...

#### plan_20260202_164045.md
- 路径: .trae\documents\plan_20260202_164045.md
- 大小: 179 字节
- 行数: 13
- 预览: 修改BirthInputModal.tsx文件中的说明文字

将以下文字：
```
基于您提供的出生信息，我们将运用传统子平真诠命理算法， 为您计算2026年全年高光日期。整个过程大约需要几秒钟。
`...

#### plan_20260203_020102.md
- 路径: .trae\documents\plan_20260203_020102.md
- 大小: 230 字节
- 行数: 12
- 预览: 修复 BirthInputModal.tsx 中的显示问题：

1. **修改 handleSubmit 函数逻辑**：
   - 移除 `setStep(2)` 这行代码
   - 第一次提交后直接...

#### memory.json
- 路径: .trae\long-term-memory\memory.json
- 大小: 2 字节
- 行数: 1
- 预览: []

#### health-checks.json
- 路径: .trae\monitoring\health-checks.json
- 大小: 2509 字节
- 行数: 106
- 预览: {
  "agents": {
    "builder": {
      "status": "UNHEALTHY",
      "error": "智能体提示词文件不存在",
      "l...

#### report_1771961211120.json
- 路径: .trae\monitoring\report_1771961211120.json
- 大小: 5666 字节
- 行数: 228
- 预览: {
  "timestamp": "2026-02-24T19:26:51.120Z",
  "metrics": {
    "tokenUsage": {
      "total": 0,
  ...

#### report_1771965166992.json
- 路径: .trae\monitoring\report_1771965166992.json
- 大小: 4151 字节
- 行数: 173
- 预览: {
  "timestamp": "2026-02-24T20:32:46.992Z",
  "metrics": {
    "tokenUsage": {
      "total": 0,
  ...

#### capability-shapes.json
- 路径: .trae\pcec\capability-shapes.json
- 大小: 725 字节
- 行数: 29
- 预览: [
  {
    "type": "capabilityShape",
    "name": "智能错误恢复能力",
    "input": "错误类型、错误消息、上下文信息",
    "ou...

#### default-strategies.json
- 路径: .trae\pcec\default-strategies.json
- 大小: 182 字节
- 行数: 9
- 预览: [
  {
    "type": "defaultStrategy",
    "name": "优先解决核心功能策略",
    "description": "当面临多个问题时，优先解决影响核心...

#### 3-1771922793696.json
- 路径: .trae\pcec\history\3-1771922793696.json
- 大小: 795 字节
- 行数: 33
- 预览: {
  "cycle": 3,
  "timestamp": "2026-02-24T08:46:33.686Z",
  "evolutionType": "newLever",
  "evoluti...

#### 4-1771950622481.json
- 路径: .trae\pcec\history\4-1771950622481.json
- 大小: 869 字节
- 行数: 34
- 预览: {
  "cycle": 4,
  "timestamp": "2026-02-24T16:30:22.471Z",
  "evolutionType": "newAbstract",
  "evol...

#### 5-1771950626424.json
- 路径: .trae\pcec\history\5-1771950626424.json
- 大小: 840 字节
- 行数: 34
- 预览: {
  "cycle": 5,
  "timestamp": "2026-02-24T16:30:26.406Z",
  "evolutionType": "newLever",
  "evoluti...

#### 6-1771954029178.json
- 路径: .trae\pcec\history\6-1771954029178.json
- 大小: 774 字节
- 行数: 32
- 预览: {
  "cycle": 6,
  "timestamp": "2026-02-24T17:27:09.160Z",
  "evolutionType": "newLever",
  "evoluti...

#### 7-1771963258186.json
- 路径: .trae\pcec\history\7-1771963258186.json
- 大小: 1073 字节
- 行数: 43
- 预览: {
  "cycle": 7,
  "timestamp": "2026-02-24T20:00:58.161Z",
  "evolutionType": "newAbstract",
  "evol...

#### 8-1771963302679.json
- 路径: .trae\pcec\history\8-1771963302679.json
- 大小: 1057 字节
- 行数: 43
- 预览: {
  "cycle": 8,
  "timestamp": "2026-02-24T20:01:42.657Z",
  "evolutionType": "newLever",
  "evoluti...

#### 9-1771963356901.json
- 路径: .trae\pcec\history\9-1771963356901.json
- 大小: 1130 字节
- 行数: 48
- 预览: {
  "cycle": 9,
  "timestamp": "2026-02-24T20:02:36.870Z",
  "evolutionType": "newFeature",
  "evolu...

#### index.json
- 路径: .trae\pcec\history\index.json
- 大小: 1151 字节
- 行数: 50
- 预览: [
  {
    "cycle": 10,
    "timestamp": "2026-02-24T20:40:22.186Z",
    "evolutionType": "newAbstrac...

#### pcec-status.json
- 路径: .trae\pcec\pcec-status.json
- 大小: 117 字节
- 行数: 6
- 预览: {
  "lastRun": "2026-02-24T20:40:22.186Z",
  "consecutiveFailures": 0,
  "currentCycle": 10,
  "tota...

#### 1771922793701.json
- 路径: .trae\pcec\products\behavior-rules\1771922793701.json
- 大小: 165 字节
- 行数: 7
- 预览: {
  "type": "behaviorRule",
  "condition": "遇到系统集成问题时",
  "action": "首先检查连接性，然后验证认证，最后分析数据格式",
  "ra...

#### 1771963258179.json
- 路径: .trae\pcec\products\behavior-rules\1771963258179.json
- 大小: 159 字节
- 行数: 7
- 预览: {
  "type": "behaviorRule",
  "condition": "系统负载过高时",
  "action": "优先处理核心任务，延迟非核心任务，启动资源回收",
  "rati...

#### 1771963258182.json
- 路径: .trae\pcec\products\behavior-rules\1771963258182.json
- 大小: 159 字节
- 行数: 7
- 预览: {
  "type": "behaviorRule",
  "condition": "系统负载过高时",
  "action": "优先处理核心任务，延迟非核心任务，启动资源回收",
  "rati...

#### 1771963302673.json
- 路径: .trae\pcec\products\behavior-rules\1771963302673.json
- 大小: 161 字节
- 行数: 7
- 预览: {
  "type": "behaviorRule",
  "condition": "处理高频查询请求时",
  "action": "首先检查缓存，然后执行计算，最后更新缓存",
  "ratio...

#### 1771963356896.json
- 路径: .trae\pcec\products\behavior-rules\1771963356896.json
- 大小: 170 字节
- 行数: 7
- 预览: {
  "type": "behaviorRule",
  "condition": "遇到未知错误时",
  "action": "记录详细错误信息，尝试默认恢复策略，通知管理员",
  "rati...

#### 1771950622485.json
- 路径: .trae\pcec\products\capability-shapes\1771950622485.json
- 大小: 221 字节
- 行数: 9
- 预览: {
  "type": "capabilityShape",
  "name": "智能错误恢复能力",
  "input": "错误类型、错误消息、上下文信息",
  "output": "恢复策略...

#### 1771950626435.json
- 路径: .trae\pcec\products\capability-shapes\1771950626435.json
- 大小: 220 字节
- 行数: 9
- 预览: {
  "type": "capabilityShape",
  "name": "系统集成能力",
  "input": "集成需求、系统状态、外部服务信息",
  "output": "集成方案、...

#### 1771963356892.json
- 路径: .trae\pcec\products\capability-shapes\1771963356892.json
- 大小: 214 字节
- 行数: 9
- 预览: {
  "type": "capabilityShape",
  "name": "智能文件处理能力",
  "input": "文件路径、文件类型、处理需求",
  "output": "处理结果、...

#### 1771965622198.json
- 路径: .trae\pcec\products\capability-shapes\1771965622198.json
- 大小: 221 字节
- 行数: 9
- 预览: {
  "type": "capabilityShape",
  "name": "智能错误恢复能力",
  "input": "错误类型、错误消息、上下文信息",
  "output": "恢复策略...

#### 1771954029183.json
- 路径: .trae\pcec\products\default-strategies\1771954029183.json
- 大小: 158 字节
- 行数: 7
- 预览: {
  "type": "defaultStrategy",
  "name": "缓存优先策略",
  "description": "优先使用缓存减少重复计算和外部调用",
  "applicat...

#### 1771963302677.json
- 路径: .trae\pcec\products\default-strategies\1771963302677.json
- 大小: 164 字节
- 行数: 7
- 预览: {
  "type": "defaultStrategy",
  "name": "优先解决核心功能策略",
  "description": "当面临多个问题时，优先解决影响核心功能的问题",
  ...

#### package.json
- 路径: .trae\skills\awkn-platform_awkn-platform\backend\package.json
- 大小: 972 字节
- 行数: 46
- 预览: {
  "name": "awkn-backend",
  "version": "1.0.0",
  "description": "AWKN认知觉醒平台后端服务",
  "main": "src/...

#### User.js
- 路径: .trae\skills\awkn-platform_awkn-platform\backend\src\models\User.js
- 大小: 715 字节
- 行数: 45
- 预览: const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    ty...

#### Work.js
- 路径: .trae\skills\awkn-platform_awkn-platform\backend\src\models\Work.js
- 大小: 890 字节
- 行数: 48
- 预览: const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  title: {
    type:...

#### architecture.js
- 路径: .trae\skills\awkn-platform_awkn-platform\backend\src\routes\architecture.js
- 大小: 970 字节
- 行数: 44
- 预览: const express = require('express');
const router = express.Router();
const { body, validationResult ...

#### comic.js
- 路径: .trae\skills\awkn-platform_awkn-platform\backend\src\routes\comic.js
- 大小: 1385 字节
- 行数: 58
- 预览: const express = require('express');
const router = express.Router();
const { body, validationResult ...

#### history.js
- 路径: .trae\skills\awkn-platform_awkn-platform\backend\src\routes\history.js
- 大小: 1875 字节
- 行数: 84
- 预览: const express = require('express');
const router = express.Router();

// 获取历史作品列表
router.get('/', as...

#### infographic.js
- 路径: .trae\skills\awkn-platform_awkn-platform\backend\src\routes\infographic.js
- 大小: 964 字节
- 行数: 44
- 预览: const express = require('express');
const router = express.Router();
const { body, validationResult ...

#### ppt.js
- 路径: .trae\skills\awkn-platform_awkn-platform\backend\src\routes\ppt.js
- 大小: 1089 字节
- 行数: 46
- 预览: const express = require('express');
const router = express.Router();
const { body, validationResult ...

#### package-lock.json
- 路径: .trae\skills\awkn-platform_awkn-platform\frontend\package-lock.json
- 大小: 721 字节
- 行数: 31
- 预览: {
  "name": "awkn-frontend",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "pa...

#### postcss.config.js
- 路径: .trae\skills\awkn-platform_awkn-platform\frontend\postcss.config.js
- 大小: 82 字节
- 行数: 7
- 预览: module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


#### manifest.json
- 路径: .trae\skills\awkn-platform_awkn-platform\frontend\public\manifest.json
- 大小: 514 字节
- 行数: 25
- 预览: {
  "name": "AWKN - 认知觉醒平台",
  "short_name": "AWKN",
  "description": "帮助他人做认知觉醒的平台，包含内容创作工具",
  "st...

#### robots.txt
- 路径: .trae\skills\awkn-platform_awkn-platform\frontend\public\robots.txt
- 大小: 62 字节
- 行数: 5
- 预览: User-agent: *
Allow: /

Sitemap: https://awkn.com/sitemap.xml


#### tsconfig.json
- 路径: .trae\skills\awkn-platform_awkn-platform\frontend\tsconfig.json
- 大小: 598 字节
- 行数: 28
- 预览: {
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "...

#### package.json
- 路径: .trae\skills\awkn-platform_awkn-platform\package.json
- 大小: 771 字节
- 行数: 28
- 预览: {
  "name": "awkn-platform",
  "version": "1.0.0",
  "description": "AWKN - AI Cognitive Awakening P...

#### web-design-guide.md
- 路径: .trae\skills\baokuan\assets\web-design-guide.md
- 大小: 5307 字节
- 行数: 417
- 预览: # 网页视觉设计指南

## 目录
- [设计理念](#设计理念)
- [视觉层次系统](#视觉层次系统)
- [留白艺术](#留白艺术)
- [颜色心理学](#颜色心理学)
- [排版规范](#排版...

#### elegant.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\elegant.md
- 大小: 1733 字节
- 行数: 57
- 预览: # elegant

Refined, sophisticated illustration style for professional content

## Design Aesthetic

...

#### fantasy-animation.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\fantasy-animation.md
- 大小: 1969 字节
- 行数: 59
- 预览: # fantasy-animation

Whimsical hand-drawn animation style inspired by Ghibli/Disney

## Design Aesth...

#### flat-doodle.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\flat-doodle.md
- 大小: 1869 字节
- 行数: 62
- 预览: # flat-doodle

Cute flat doodle illustration style with bold outlines

## Design Aesthetic

Cheerful...

#### flat.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\flat.md
- 大小: 1688 字节
- 行数: 60
- 预览: # flat

Modern flat vector illustration style for contemporary content

## Design Aesthetic

Contemp...

#### pixel-art.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\pixel-art.md
- 大小: 1907 字节
- 行数: 58
- 预览: # pixel-art

Retro 8-bit pixel art aesthetic with nostalgic gaming style

## Design Aesthetic

Pixel...

#### retro.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\retro.md
- 大小: 1682 字节
- 行数: 60
- 预览: # retro

80s/90s nostalgic aesthetic with vibrant colors and geometric patterns

## Design Aesthetic...

#### vector-illustration.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\vector-illustration.md
- 大小: 1940 字节
- 行数: 58
- 预览: # vector-illustration

Flat vector illustration style with clear black outlines and retro soft color...

#### vintage.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\vintage.md
- 大小: 1819 字节
- 行数: 60
- 预览: # vintage

Nostalgic aged-paper aesthetic for historical and heritage content

## Design Aesthetic

...

#### watercolor.md
- 路径: .trae\skills\baokuan\awkn-article-illustrator\references\styles\watercolor.md
- 大小: 1815 字节
- 行数: 59
- 预览: # watercolor

Soft, artistic watercolor illustration style with natural warmth

## Design Aesthetic
...

#### classic.md
- 路径: .trae\skills\baokuan\awkn-comic\references\styles\classic.md
- 大小: 1714 字节
- 行数: 55
- 预览: # classic

Traditional Ligne Claire, balanced and timeless

## Style Guidelines

### Line Work
- Uni...

#### dramatic.md
- 路径: .trae\skills\baokuan\awkn-comic\references\styles\dramatic.md
- 大小: 730 字节
- 行数: 35
- 预览: # dramatic

High contrast, intense moments

## Style Guidelines

### Line Work
- 2-3px outlines, hea...

#### realistic.md
- 路径: .trae\skills\baokuan\awkn-comic\references\styles\realistic.md
- 大小: 2350 字节
- 行数: 67
- 预览: # realistic

Full-color realistic manga style with digital painting techniques

## Style Guidelines
...

#### sepia.md
- 路径: .trae\skills\baokuan\awkn-comic\references\styles\sepia.md
- 大小: 685 字节
- 行数: 35
- 预览: # sepia

Historical, archival feel

## Style Guidelines

### Line Work
- 2px, classic weight with ag...

#### shoujo.md
- 路径: .trae\skills\baokuan\awkn-comic\references\styles\shoujo.md
- 大小: 1218 字节
- 行数: 46
- 预览: # shoujo

Classic shoujo manga style with romantic, emotional aesthetics

## Style Guidelines

### L...

#### warm.md
- 路径: .trae\skills\baokuan\awkn-comic\references\styles\warm.md
- 大小: 672 字节
- 行数: 35
- 预览: # warm

Nostalgic, personal storytelling

## Style Guidelines

### Line Work
- 1.5-2px, slightly sof...

#### wuxia.md
- 路径: .trae\skills\baokuan\awkn-comic\references\styles\wuxia.md
- 大小: 1693 字节
- 行数: 55
- 预览: # wuxia

Hong Kong martial arts comic style (港漫武侠风格)

## Style Guidelines

### Line Work
- 2-3px dyn...

#### base-prompt.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\base-prompt.md
- 大小: 1131 字节
- 行数: 32
- 预览: Create a WeChat article cover image following these guidelines:

## Image Specifications

- **Type**...

#### bold-editorial.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\bold-editorial.md
- 大小: 746 字节
- 行数: 27
- 预览: # bold-editorial

High-impact magazine editorial with bold visual expression

## Color Palette

- Pr...

#### chalkboard.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\chalkboard.md
- 大小: 781 字节
- 行数: 27
- 预览: # chalkboard

Black chalkboard background with colorful chalk drawing style

## Color Palette

- Pri...

#### dark-atmospheric.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\dark-atmospheric.md
- 大小: 658 字节
- 行数: 26
- 预览: # dark-atmospheric

Dark moody aesthetic with glowing accent elements

## Color Palette

- Primary: ...

#### editorial-infographic.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\editorial-infographic.md
- 大小: 704 字节
- 行数: 27
- 预览: # editorial-infographic

Modern magazine-style editorial with clear visual storytelling

## Color Pa...

#### elegant.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\elegant.md
- 大小: 443 字节
- 行数: 24
- 预览: # elegant

Refined, sophisticated, understated

## Color Palette

- Primary: Soft coral (#E8A598), m...

#### fantasy-animation.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\fantasy-animation.md
- 大小: 751 字节
- 行数: 26
- 预览: # fantasy-animation

Whimsical hand-drawn animation style inspired by Ghibli and Disney

## Color Pa...

#### flat-doodle.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\flat-doodle.md
- 大小: 705 字节
- 行数: 28
- 预览: # flat-doodle

Cute, simple doodle illustrations with bold outlines

## Color Palette

- Primary: Br...

#### minimal.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\minimal.md
- 大小: 418 字节
- 行数: 24
- 预览: # minimal

Ultra-clean, zen-like, focused

## Color Palette

- Primary: Pure black (#000000), white ...

#### nature.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\nature.md
- 大小: 441 字节
- 行数: 23
- 预览: # nature

Organic, calm, earthy

## Color Palette

- Primary: Forest green (#276749), sage (#9AE6B4)...

#### notion.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\notion.md
- 大小: 610 字节
- 行数: 26
- 预览: # notion

Clean SaaS dashboard aesthetic with productivity tool styling

## Color Palette

- Primary...

#### pixel-art.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\pixel-art.md
- 大小: 684 字节
- 行数: 27
- 预览: # pixel-art

Retro 8-bit pixel art aesthetic with nostalgic gaming style

## Color Palette

- Primar...

#### playful.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\playful.md
- 大小: 484 字节
- 行数: 24
- 预览: # playful

Fun, creative, whimsical

## Color Palette

- Primary: Pastel pink (#FED7E2), mint (#C6F6...

#### retro.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\retro.md
- 大小: 450 字节
- 行数: 23
- 预览: # retro

Vintage, nostalgic, classic

## Color Palette

- Primary: Muted orange (#ED8936 at 70%), du...

#### vector-illustration.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\vector-illustration.md
- 大小: 768 字节
- 行数: 26
- 预览: # vector-illustration

Flat vector illustration with black outlines and retro soft colors

## Color ...

#### vintage.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\vintage.md
- 大小: 723 字节
- 行数: 27
- 预览: # vintage

Vintage aged-paper aesthetic with historical document styling

## Color Palette

- Primar...

#### warm.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\warm.md
- 大小: 444 字节
- 行数: 23
- 预览: # warm

Friendly, approachable, human-centered

## Color Palette

- Primary: Warm orange (#ED8936), ...

#### watercolor.md
- 路径: .trae\skills\baokuan\awkn-cover-image\references\styles\watercolor.md
- 大小: 665 字节
- 行数: 26
- 预览: # watercolor

Soft watercolor illustration style with hand-painted textures

## Color Palette

- Pri...

#### base-prompt.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\base-prompt.md
- 大小: 2220 字节
- 行数: 60
- 预览: Create a presentation slide image following these guidelines:

## Image Specifications

- **Type**: ...

#### modification-guide.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\modification-guide.md
- 大小: 2463 字节
- 行数: 86
- 预览: # Slide Modification Guide

Workflows for modifying individual slides after initial generation.

## ...

#### outline-template.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\outline-template.md
- 大小: 3810 字节
- 行数: 165
- 预览: # Outline Template

Standard structure for slide deck outlines with style instructions.

## Outline ...

#### bold-editorial.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\bold-editorial.md
- 大小: 2409 字节
- 行数: 71
- 预览: # bold-editorial

High-impact magazine editorial style with bold visual expression

## Design Aesthe...

#### chalkboard.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\chalkboard.md
- 大小: 2512 字节
- 行数: 69
- 预览: # chalkboard

Black chalkboard background with colorful chalk drawing style

## Design Aesthetic

Cl...

#### dark-atmospheric.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\dark-atmospheric.md
- 大小: 2435 字节
- 行数: 70
- 预览: # dark-atmospheric

Dark moody aesthetic with deep colors and glowing accent elements

## Design Aes...

#### fantasy-animation.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\fantasy-animation.md
- 大小: 2474 字节
- 行数: 70
- 预览: # fantasy-animation

Whimsical hand-drawn animation style inspired by classic fantasy illustration

...

#### minimal.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\minimal.md
- 大小: 2036 字节
- 行数: 65
- 预览: # minimal

Ultra-clean keynote style with maximum whitespace and zen-like simplicity

## Design Aest...

#### pixel-art.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\pixel-art.md
- 大小: 2446 字节
- 行数: 68
- 预览: # pixel-art

Retro 8-bit pixel art aesthetic with nostalgic gaming visual style

## Design Aesthetic...

#### vector-illustration.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\vector-illustration.md
- 大小: 2646 字节
- 行数: 73
- 预览: # vector-illustration

Flat vector illustration style with clear black outlines and retro soft color...

#### vintage.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\vintage.md
- 大小: 2499 字节
- 行数: 74
- 预览: # vintage

Vintage aged-paper aesthetic for historical and expedition-style presentations

## Design...

#### watercolor.md
- 路径: .trae\skills\baokuan\awkn-slide-deck\references\styles\watercolor.md
- 大小: 2349 字节
- 行数: 69
- 预览: # watercolor

Soft watercolor illustration style with hand-painted textures and natural warmth

## D...

#### base-prompt.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\base-prompt.md
- 大小: 1094 字节
- 行数: 34
- 预览: Create a Xiaohongshu (Little Red Book) style infographic following these guidelines:

## Image Speci...

#### comparison.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\layouts\comparison.md
- 大小: 552 字节
- 行数: 32
- 预览: # comparison

Side-by-side contrast layout

## Information Density

- 2 main sections with 2-4 point...

#### dense.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\layouts\dense.md
- 大小: 543 字节
- 行数: 32
- 预览: # dense

High information density, knowledge card style

## Information Density

- 5-8 key points pe...

#### list.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\layouts\list.md
- 大小: 489 字节
- 行数: 32
- 预览: # list

Enumeration and ranking format

## Information Density

- 4-7 items
- Whitespace: 30-40% of ...

#### sparse.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\layouts\sparse.md
- 大小: 516 字节
- 行数: 32
- 预览: # sparse

Minimal information, maximum impact

## Information Density

- 1-2 key points per image
- ...

#### outline-template.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\outline-template.md
- 大小: 4329 字节
- 行数: 229
- 预览: # Xiaohongshu Outline Template

Template for generating infographic series outlines.

## File Naming...

#### bold.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\styles\bold.md
- 大小: 456 字节
- 行数: 24
- 预览: # bold

High impact, attention-grabbing

## Color Palette

- Primary: Vibrant red (#E53E3E), orange ...

#### cute.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\styles\cute.md
- 大小: 465 字节
- 行数: 24
- 预览: # cute

Sweet, adorable, girly - classic Xiaohongshu aesthetic

## Color Palette

- Primary: Pink (#...

#### minimal.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\styles\minimal.md
- 大小: 437 字节
- 行数: 24
- 预览: # minimal

Ultra-clean, sophisticated

## Color Palette

- Primary: Black (#000000), white (#FFFFFF)...

#### pop.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\styles\pop.md
- 大小: 474 字节
- 行数: 24
- 预览: # pop

Vibrant, energetic, eye-catching

## Color Palette

- Primary: Bright red (#F56565), yellow (...

#### retro.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\styles\retro.md
- 大小: 434 字节
- 行数: 24
- 预览: # retro

Vintage, nostalgic, trendy

## Color Palette

- Primary: Muted orange, dusty pink (#FED7E2 ...

#### warm.md
- 路径: .trae\skills\baokuan\awkn-xhs-images\references\styles\warm.md
- 大小: 459 字节
- 行数: 24
- 预览: # warm

Cozy, friendly, approachable

## Color Palette

- Primary: Warm orange (#ED8936), golden yel...

#### project-introduction.md
- 路径: .trae\skills\baokuan\project-introduction.md
- 大小: 270 字节
- 行数: 10
- 预览: # 项目介绍

想让你读的书变简单吗？想让写文章变得超级容易？想让你的内容变成精美图片和漫画？来试试这个神奇工具！

不管你是学生、老师，还是做自媒体的朋友，这个工具都能帮到你。你只需要告诉我：书名、...

#### config-template.json
- 路径: .trae\skills\chatgpt-on-wechat-master\config-template.json
- 大小: 964 字节
- 行数: 38
- 预览: {
  "channel_type": "web",
  "model": "",
  "open_ai_api_key": "YOUR API KEY",
  "claude_api_key": "...

#### README.md
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\dungeon\README.md
- 大小: 122 字节
- 行数: 5
- 预览: 玩地牢游戏的聊天插件，触发方法如下：

- `$开始冒险 <背景故事>` - 以<背景故事>开始一个地牢游戏，不填写会使用默认背景故事。之后聊天中你的所有消息会帮助ai完善这个故事。
- `$停止冒险...

#### source.json
- 路径: .trae\skills\chatgpt-on-wechat-master\plugins\source.json
- 大小: 1245 字节
- 行数: 41
- 预览: {
  "repo": {
    "sdwebui": {
      "url": "https://github.com/lanvent/plugin_sdwebui.git",
      "...

#### requirements-optional.txt
- 路径: .trae\skills\chatgpt-on-wechat-master\requirements-optional.txt
- 大小: 778 字节
- 行数: 50
- 预览: tiktoken>=0.3.2 # openai calculate token

#voice
pydub>=0.25.1 # need ffmpeg
SpeechRecognition # goo...

#### requirements.txt
- 路径: .trae\skills\chatgpt-on-wechat-master\requirements.txt
- 大小: 157 字节
- 行数: 12
- 预览: openai==0.27.8
HTMLParser>=0.0.2
PyQRCode==1.2.1
qrcode==7.4.2
requests>=2.28.2
chardet>=5.1.0
Pillo...

#### fix-apply-patch-oca-model-id.md
- 路径: .trae\skills\cline-main\.changeset\fix-apply-patch-oca-model-id.md
- 大小: 423 字节
- 行数: 8
- 预览: ---
"claude-dev": patch
---

fix: apply_patch tool now works with OCA provider's gpt5 model ID forma...

#### fix-prevent-infinite-retry-loops.md
- 路径: .trae\skills\cline-main\.changeset\fix-prevent-infinite-retry-loops.md
- 大小: 330 字节
- 行数: 8
- 预览: ---
"claude-dev": patch
---

fix: prevent infinite retry loops when replace_in_file fails repeatedly...

#### fix-skip-diff-error-during-streaming.md
- 路径: .trae\skills\cline-main\.changeset\fix-skip-diff-error-during-streaming.md
- 大小: 289 字节
- 行数: 8
- 预览: ---
"claude-dev": patch
---

fix: skip diff error UI handling during streaming to prevent flickering...

#### fix-strip-notebook-outputs.md
- 路径: .trae\skills\cline-main\.changeset\fix-strip-notebook-outputs.md
- 大小: 295 字节
- 行数: 8
- 预览: ---
"claude-dev": patch
---

fix(extract-text): strip notebook outputs to reduce context size

Strip...

#### fix-throttle-diff-updates.md
- 路径: .trae\skills\cline-main\.changeset\fix-throttle-diff-updates.md
- 大小: 280 字节
- 行数: 8
- 预览: ---
"claude-dev": patch
---

fix: throttle diff view updates during streaming

Add throttling to dif...

#### flat-owls-sit.md
- 路径: .trae\skills\cline-main\.changeset\flat-owls-sit.md
- 大小: 110 字节
- 行数: 6
- 预览: ---
"claude-dev": minor
---

Disable PostHog telemetry, error tracking, and feature flags in self-ho...

#### rare-badgers-sleep.md
- 路径: .trae\skills\cline-main\.changeset\rare-badgers-sleep.md
- 大小: 83 字节
- 行数: 6
- 预览: ---
"claude-dev": patch
---

Adds support for native tool calls to Ollama provider


#### README.md
- 路径: .trae\skills\cline-main\.changeset\README.md
- 大小: 510 字节
- 行数: 9
- 预览: # Changesets

Hello and welcome! This folder has been automatically generated by `@changesets/cli`, ...

#### remove-zai-glm-4-6.md
- 路径: .trae\skills\cline-main\.changeset\remove-zai-glm-4-6.md
- 大小: 88 字节
- 行数: 6
- 预览: ---
"claude-dev": patch
---

Remove deprecated zai-glm-4.6 model from Cerebras provider


#### silent-hounds-read.md
- 路径: .trae\skills\cline-main\.changeset\silent-hounds-read.md
- 大小: 81 字节
- 行数: 6
- 预览: ---
"claude-dev": patch
---

Make Sonnet 4.5 the default Amazon Bedrock model id


#### hotfix-release.md
- 路径: .trae\skills\cline-main\.claude\commands\hotfix-release.md
- 大小: 45 字节
- 行数: 1
- 预览: ../../.clinerules/workflows/hotfix-release.md

#### release.md
- 路径: .trae\skills\cline-main\.claude\commands\release.md
- 大小: 38 字节
- 行数: 1
- 预览: ../../.clinerules/workflows/release.md

#### settings.json
- 路径: .trae\skills\cline-main\.claude\settings.json
- 大小: 195 字节
- 行数: 15
- 预览: {
	"hooks": {
		"SessionStart": [
			{
				"hooks": [
					{
						"type": "command",
						"command...

#### address-pr-comments.md
- 路径: .trae\skills\cline-main\.clinerules\workflows\address-pr-comments.md
- 大小: 1015 字节
- 行数: 30
- 预览: # Address PR Comments

Review and address all comments on the current branch's PR.

## Steps

1. Get...

#### git-branch-analysis.md
- 路径: .trae\skills\cline-main\.clinerules\workflows\git-branch-analysis.md
- 大小: 4024 字节
- 行数: 62
- 预览: # Git Diff Analysis Workflow

## Objective
Analyze the current branch's changes against main to prov...

#### hotfix-release.md
- 路径: .trae\skills\cline-main\.clinerules\workflows\hotfix-release.md
- 大小: 5599 字节
- 行数: 195
- 预览: # Hotfix Release

Create a hotfix release by cherry-picking specific commits from main onto the late...

#### .mocharc.json
- 路径: .trae\skills\cline-main\.mocharc.json
- 大小: 206 字节
- 行数: 16
- 预览: {
	"extension": [
		"ts"
	],
	"spec": [
		"src/**/__tests__/*.ts"
	],
	"require": [
		"ts-node/regis...

#### extensions.json
- 路径: .trae\skills\cline-main\.vscode\extensions.json
- 大小: 269 字节
- 行数: 11
- 预览: {
	// See http://go.microsoft.com/fwlink/?LinkId=827846
	// for the documentation about the extensio...

#### settings.json
- 路径: .trae\skills\cline-main\.vscode\settings.json
- 大小: 1201 字节
- 行数: 34
- 预览: // Place your settings in this file to overwrite default and user settings.
{
	"files.exclude": {
		...

#### tasks.json
- 路径: .trae\skills\cline-main\.vscode\tasks.json
- 大小: 5305 字节
- 行数: 297
- 预览: // See https://go.microsoft.com/fwlink/?LinkId=733558
// for the documentation about the tasks.json ...

#### CLAUDE.md
- 路径: .trae\skills\cline-main\CLAUDE.md
- 大小: 48 字节
- 行数: 3
- 预览: @.clinerules/general.md
@.clinerules/network.md


#### package.json
- 路径: .trae\skills\cline-main\cli\package.json
- 大小: 1211 字节
- 行数: 69
- 预览: {
	"name": "cline",
	"version": "1.0.10",
	"description": "Autonomous coding agent CLI - capable of ...

#### HELP_WANTED.md
- 路径: .trae\skills\cline-main\cli\pkg\cli\tui\HELP_WANTED.md
- 大小: 51 字节
- 行数: 1
- 预览: if you can make a beautiful tui in go, please help!

#### hubspot.js
- 路径: .trae\skills\cline-main\docs\hubspot.js
- 大小: 466 字节
- 行数: 15
- 预览: // HubSpot Tracking Code for Cline Documentation
;(() => {
	// Check if HubSpot script is already lo...

#### package.json
- 路径: .trae\skills\cline-main\docs\package.json
- 大小: 411 字节
- 行数: 23
- 预览: {
	"name": "docs",
	"version": "1.0.0",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: ...

#### tsconfig.json
- 路径: .trae\skills\cline-main\evals\cli\tsconfig.json
- 大小: 364 字节
- 行数: 18
- 预览: {
	"compilerOptions": {
		"target": "ES2020",
		"module": "commonjs",
		"lib": ["ES2020"],
		"declar...

#### requirements.txt
- 路径: .trae\skills\cline-main\evals\diff-edits\dashboard\requirements.txt
- 大小: 61 字节
- 行数: 5
- 预览: streamlit==1.43.2
plotly>=5.17.0
pandas>=2.0.0
numpy>=1.24.0


#### package.json
- 路径: .trae\skills\cline-main\evals\package.json
- 大小: 1098 字节
- 行数: 49
- 预览: {
	"name": "cline-evals",
	"version": "0.1.0",
	"description": "Evaluation scripts and tools for Cli...

#### CODE_OF_CONDUCT.md
- 路径: .trae\skills\cline-main\locales\ar-sa\CODE_OF_CONDUCT.md
- 大小: 2671 字节
- 行数: 47
- 预览: # ميثاق المساهمين

## تعهدنا

نحن المساهمون والقائمون على هذا المشروع، نتعهد بتوفير بيئة مفتوحة ومرح...

#### CONTRIBUTING.md
- 路径: .trae\skills\cline-main\locales\ar-sa\CONTRIBUTING.md
- 大小: 4589 字节
- 行数: 93
- 预览: # المساهمة في Cline

نحن سعداء لاهتمامك بالمساهمة في Cline. سواء كنت تصلح خطأً أو تضيف ميزة أو تحسن ...

#### README.md
- 路径: .trae\skills\cline-main\locales\ar-sa\README.md
- 大小: 11835 字节
- 行数: 189
- 预览: <div align="center"><sub>
العربية | <a href="https://github.com/cline/cline/blob/main/locales/es/REA...

#### CODE_OF_CONDUCT.md
- 路径: .trae\skills\cline-main\locales\de\CODE_OF_CONDUCT.md
- 大小: 2099 字节
- 行数: 38
- 预览: # Verhaltenskodex für Mitwirkende

## Unser Versprechen

Im Interesse der Förderung einer offenen un...

#### README.md
- 路径: .trae\skills\cline-main\locales\de\README.md
- 大小: 12911 字节
- 行数: 163
- 预览: # Cline

<p align="center">
        <img src="https://media.githubusercontent.com/media/cline/cline/...

#### CODE_OF_CONDUCT.md
- 路径: .trae\skills\cline-main\locales\ja\CODE_OF_CONDUCT.md
- 大小: 1583 字节
- 行数: 48
- 预览: # コントリビューター規約行動規範

## 我々の誓い

オープンで歓迎される環境を育むために、我々はコントリビューターおよびメンテナーとして、年齢、体型、障害、民族、性の特徴、性別のアイデンティティ...

#### CONTRIBUTING.md
- 路径: .trae\skills\cline-main\locales\ja\CONTRIBUTING.md
- 大小: 2620 字节
- 行数: 83
- 预览: # Cline

Clineへの貢献に興味をお持ちいただきありがとうございます。

## バグや問題の報告

バグ報告は、Clineを皆さんにとってより良いものにするために役立ちます！新しい問題を作成...

#### README.md
- 路径: .trae\skills\cline-main\locales\ja\README.md
- 大小: 7418 字节
- 行数: 162
- 预览: # Cline

<p align="center">
    <img src="https://media.githubusercontent.com/media/cline/cline/main...

#### CODE_OF_CONDUCT.md
- 路径: .trae\skills\cline-main\locales\ko\CODE_OF_CONDUCT.md
- 大小: 1615 字节
- 行数: 48
- 预览: # 기여자 행동 강령

## 서약

우리는 개방적이고 환영하는 환경을 조성하기 위해 노력하며, 기여자 및 유지 관리자로서 모든 사람이 차별과 괴롭힘 없이 프로젝트와 커뮤니티에 참여...

#### CONTRIBUTING.md
- 路径: .trae\skills\cline-main\locales\ko\CONTRIBUTING.md
- 大小: 3212 字节
- 行数: 93
- 预览: # Cline

Cline에 기여하는 것에 관심을 가져주셔서 감사합니다! 버그 수정, 기능 추가, 문서 개선 등 모든 기여는 Cline을 더욱 스마트하게 만드는 데 기여합니다. 활...

#### README.md
- 路径: .trae\skills\cline-main\locales\ko\README.md
- 大小: 8233 字节
- 行数: 173
- 预览: # Cline

<p align="center">
    <img src="https://media.githubusercontent.com/media/cline/cline/main...

#### CODE_OF_CONDUCT.md
- 路径: .trae\skills\cline-main\locales\zh-tw\CODE_OF_CONDUCT.md
- 大小: 1043 字节
- 行数: 50
- 预览: # 貢獻者公約行為準則

## 我們的承諾

為了營造開放且友善的環境，我們身為貢獻者與維護者，承諾讓參與本專案及社群的體驗，對每個人都不帶有騷擾，不論其年齡、體型、身心障礙、族裔、性徵、性別認同與表...

#### CONTRIBUTING.md
- 路径: .trae\skills\cline-main\locales\zh-tw\CONTRIBUTING.md
- 大小: 2470 字节
- 行数: 86
- 预览: # 貢獻至 Cline

我們非常感謝您有意願貢獻至 Cline。無論是修正程式錯誤、新增功能或改善文件，每一份貢獻都能讓 Cline 更加出色！為了維持社群的活力與友善，所有成員都必須遵守我們的[行...

#### README.md
- 路径: .trae\skills\cline-main\src\core\hooks\__tests__\fixtures\template\README.md
- 大小: 2750 字节
- 行数: 97
- 预览: # Hook Template for New Fixtures

This directory contains a template for creating new hook fixtures....

#### README.md
- 路径: .trae\skills\cline-main\src\core\README.md
- 大小: 385 字节
- 行数: 12
- 预览: # Core Architecture

Extension entry point (extension.ts) -> webview -> controller -> task

```tree
...

#### README.md
- 路径: .trae\skills\cline-main\src\exports\README.md
- 大小: 1690 字节
- 行数: 49
- 预览: # Cline API

The Cline extension exposes an API that can be used by other extensions. To use this AP...

#### bedrock.json
- 路径: .trae\skills\cline-main\src\shared\providers\bedrock.json
- 大小: 476 字节
- 行数: 31
- 预览: {
	"regions": [
		"us-east-1",
		"us-east-2",
		"us-west-1",
		"us-west-2",
		"ap-south-1",
		"ap-no...

#### providers.json
- 路径: .trae\skills\cline-main\src\shared\providers\providers.json
- 大小: 2404 字节
- 行数: 169
- 预览: {
	"list": [
		{
			"value": "cline",
			"label": "Cline"
		},
		{
			"value": "openrouter",
			"lab...

#### vertex.json
- 路径: .trae\skills\cline-main\src\shared\providers\vertex.json
- 大小: 120 字节
- 行数: 11
- 预览: {
	"regions": [
		"us-east5",
		"us-central1",
		"europe-west1",
		"europe-west4",
		"asia-southeast...

#### settings.json
- 路径: .trae\skills\cline-main\src\test\e2e\fixtures\workspace\.vscode\settings.json
- 大小: 62 字节
- 行数: 4
- 预览: {
	"workbench.secondarySideBar.defaultVisibility": "hidden"
}


#### README.md
- 路径: .trae\skills\cline-main\src\test\e2e\fixtures\workspace\README.md
- 大小: 95 字节
- 行数: 3
- 预览: # Test Workspace

This workspace is used for testing the extension in a controlled environment.

#### README.md
- 路径: .trae\skills\cline-main\src\test\e2e\fixtures\workspace_2\README.md
- 大小: 97 字节
- 行数: 3
- 预览: # Test Workspace 2

This workspace is used for testing the extension in a controlled environment.

#### package-lock.json
- 路径: .trae\skills\cline-main\standalone\runtime-files\package-lock.json
- 大小: 33235 字节
- 行数: 986
- 预览: {
	"name": "cline-core",
	"version": "0.0.1",
	"lockfileVersion": 3,
	"requires": true,
	"packages":...

#### package.json
- 路径: .trae\skills\cline-main\standalone\runtime-files\package.json
- 大小: 309 字节
- 行数: 17
- 预览: {
	"name": "cline-core",
	"version": "0.0.1",
	"main": "cline-core.js",
	"dependencies": {
		"@grpc/...

#### index.js
- 路径: .trae\skills\cline-main\standalone\runtime-files\vscode\index.js
- 大小: 130 字节
- 行数: 8
- 预览: const stubs = require("./vscode-stubs.js")
const impls = require("./vscode-impls.js")

module.export...

#### package.json
- 路径: .trae\skills\cline-main\standalone\runtime-files\vscode\package.json
- 大小: 64 字节
- 行数: 6
- 预览: {
	"name": "vscode",
	"version": "1.0.0",
	"main": "index.js"
}


#### stub-utils.js
- 路径: .trae\skills\cline-main\standalone\runtime-files\vscode\stub-utils.js
- 大小: 507 字节
- 行数: 20
- 预览: function createStub(path) {
	return new Proxy(() => {}, {
		get: (_target, prop) => {
			const fullP...

#### package.json
- 路径: .trae\skills\cline-main\testing-platform\package.json
- 大小: 376 字节
- 行数: 20
- 预览: {
	"name": "testing-infra",
	"version": "0.1.0",
	"main": "dist/runner.js",
	"scripts": {
		"build":...

#### README.md
- 路径: .trae\skills\cline-main\testing-platform\README.md
- 大小: 1450 字节
- 行数: 66
- 预览: # Cline Testing Platform

A CLI testing framework for the Cline Core extension, providing gRPC-based...

#### tsconfig.json
- 路径: .trae\skills\cline-main\testing-platform\tsconfig.json
- 大小: 680 字节
- 行数: 40
- 预览: {
	"compilerOptions": {
		"target": "es2021",
		"module": "commonjs",
		"outDir": "./dist",
		"stric...

#### tsconfig.json
- 路径: .trae\skills\cline-main\tsconfig.json
- 大小: 1175 字节
- 行数: 69
- 预览: {
	"compilerOptions": {
		"esModuleInterop": true,
		"experimentalDecorators": true,
		"forceConsist...

#### step2.md
- 路径: .trae\skills\cline-main\walkthrough\step2.md
- 大小: 594 字节
- 行数: 8
- 预览: # Deep Codebase Intelligence

**Cline starts with broad context and explores deeply where needed.**
...

#### step3.md
- 路径: .trae\skills\cline-main\walkthrough\step3.md
- 大小: 528 字节
- 行数: 8
- 预览: # Always Use the Best Models

**Connect your keys for Anthropic (Claude), Google (Gemini), OpenAI (G...

#### step4.md
- 路径: .trae\skills\cline-main\walkthrough\step4.md
- 大小: 544 字节
- 行数: 8
- 预览: # Unlock Specialized Capabilities with MCP

**The Model Context Protocol (MCP) connects Cline to a w...

#### step5.md
- 路径: .trae\skills\cline-main\walkthrough\step5.md
- 大小: 563 字节
- 行数: 8
- 预览: # No Black Box: Full Visibility & Control

**Cline operates with complete transparency, showing you ...

#### package.json
- 路径: .trae\skills\cline-main\webview-ui\package.json
- 大小: 2856 字节
- 行数: 95
- 预览: {
	"name": "webview-ui",
	"version": "0.3.0",
	"private": true,
	"type": "module",
	"scripts": {
		"...

#### fantasy.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\fantasy.md
- 大小: 214 字节
- 行数: 20
- 预览: # 奇幻动画风格详细提示词

## 特点
- 文字占比：30%
- 设计风格：新奇、想象、创意
- 适用场景：想象力内容、创意主题、未来概念、奇幻故事

## 提示词模板
```
奇幻动画风格，文字占...

#### lively.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\lively.md
- 大小: 198 字节
- 行数: 20
- 预览: # 活泼风格详细提示词

## 特点
- 文字占比：35%
- 设计风格：轻松、有趣、可爱
- 适用场景：感性内容、生活感悟、轻松话题、趣味分享

## 提示词模板
```
活泼风格，文字占比35%，...

#### minimalist.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\minimalist.md
- 大小: 198 字节
- 行数: 20
- 预览: # 极简风格详细提示词

## 特点
- 文字占比：40%
- 设计风格：简洁、干净、有力
- 适用场景：金句展示、核心观点、简洁信息、品牌口号

## 提示词模板
```
极简风格，文字占比40%，...

#### pixel.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\pixel.md
- 大小: 197 字节
- 行数: 20
- 预览: # 像素风格详细提示词

## 特点
- 文字占比：30%
- 设计风格：复古、有趣、独特
- 适用场景：怀旧主题、游戏元素、趣味内容、复古风

## 提示词模板
```
像素风格，文字占比30%，像...

#### realistic.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\realistic.md
- 大小: 193 字节
- 行数: 19
- 预览: # 写实风格详细提示词

## 特点
- 文字占比：35%
- 设计风格：照片级写实，亲切可信
- 适用场景：真实案例、人物故事、生活场景、个人经历

## 提示词模板
```
写实风格，文字占比35...

#### scientific.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\scientific.md
- 大小: 207 字节
- 行数: 20
- 预览: # 科学风格详细提示词

## 特点
- 文字占比：35%
- 设计风格：理性、严谨、专业
- 适用场景：科技主题、数据分析、概念解释、科学内容

## 提示词模板
```
科学风格，文字占比35%，...

#### sweet.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\sweet.md
- 大小: 206 字节
- 行数: 20
- 预览: # 甜美风详细提示词

## 特点
- 文字占比：35%
- 设计风格：可爱、温柔、治愈
- 适用场景：情感治愈、生活美学、温暖话题、少女心

## 提示词模板
```
甜美风格，文字占比35%，可爱...

#### warm.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\warm.md
- 大小: 755 字节
- 行数: 60
- 预览: # 温暖风详细提示词

## 特点

- 文字占比：35%
- 设计风格：温暖、正向、人文
- 适用场景：励志内容、正向能量、人文关怀、正能量

## 视觉元素

- **背景**：温暖、阳光、舒适
...

#### watercolor.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\watercolor.md
- 大小: 199 字节
- 行数: 20
- 预览: # 水彩风格详细提示词

## 特点
- 文字占比：30%
- 设计风格：唯美、诗意、柔和
- 适用场景：情感表达、诗意内容、文艺主题、治愈系

## 提示词模板
```
水彩风格，文字占比30%，唯...

#### wuxia.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\text-card-styles\wuxia.md
- 大小: 212 字节
- 行数: 20
- 预览: # 武侠风格详细提示词

## 特点
- 文字占比：30%
- 设计风格：中国古典武侠画风，意境深远
- 适用场景：哲理故事、传统智慧、江湖体悟、武侠主题

## 提示词模板
```
武侠风格，文字占...

#### video-script-format.md
- 路径: .trae\skills\mindzuobi\AWKN-brain-cheat-tool\references\video-script-format.md
- 大小: 2755 字节
- 行数: 190
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
- 视频信息：...

#### longitude.txt
- 路径: .trae\skills\renshengjuece\bazi-paipan\assets\longitude.txt
- 大小: 6143 字节
- 行数: 339
- 预览: # 中国城市经度数据
# 用于真太阳时修正
# 公式：偏移分钟 = (城市经度 - 120.0) × 4

## 直辖市
北京	116.40	-14.40
天津	117.20	-11.20
上海	12...

#### bazi_basics.md
- 路径: .trae\skills\renshengjuece\bazi-paipan\references\bazi_basics.md
- 大小: 2811 字节
- 行数: 205
- 预览: # 八字基础知识

## 目录
- 天干地支
- 五行生克
- 十神关系
- 旺相休囚死
- 时辰换算

## 天干地支

### 天干
天干有十个，用于记年、月、日、时的次序：
- 甲（jiǎ）
-...

#### 大六壬指南.md
- 路径: .trae\skills\renshengjuece\da-liu-ren\references\大六壬指南.md
- 大小: 5021 字节
- 行数: 306
- 预览: # 大六壬指南

## 概述

《大六壬指南》是大六壬预测的集大成之作，包含五卷内容，涵盖了大六壬的基础理论、课体分类、神煞体系、占验方法等核心内容。

---

## 卷一：大六壬心印赋

### ...

#### bazi_basics.md
- 路径: .trae\skills\renshengjuece\ren-sheng-jue-ce-ming-pan\references\bazi_basics.md
- 大小: 2811 字节
- 行数: 205
- 预览: # 八字基础知识

## 目录
- 天干地支
- 五行生克
- 十神关系
- 旺相休囚死
- 时辰换算

## 天干地支

### 天干
天干有十个，用于记年、月、日、时的次序：
- 甲（jiǎ）
-...

#### 再读子平真诠评注随笔.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\references\再读子平真诠评注随笔.md
- 大小: 5065 字节
- 行数: 322
- 预览: # 再读《子平真诠评注》随笔

> 阅读时间：2003.10.3

---

## 前言

今天重读一遍此书，虽看过多遍，但仍有许多未悟透，八字在手依然不敢妄断。其中玄妙须细心感悟，方能得心应手。不急...

#### 子平真诠-原文与评注.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\references\子平真诠-原文与评注.md
- 大小: 11857 字节
- 行数: 292
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
二...

#### 渊海子平-原文.md
- 路径: .trae\skills\renshengjuece\zi-ping-zhen-quan\references\渊海子平-原文.md
- 大小: 25412 字节
- 行数: 837
- 预览: # 渊海子平（原文）

## 目录

1. [基础](#基础)
2. [十神](#十神)
3. [神煞](#神煞)
4. [六亲](#六亲)
5. [女命](#女命)
6. [赋论](#赋论)

--...

#### faq-answers.md
- 路径: .trae\skills\skills\skills\internal-comms\examples\faq-answers.md
- 大小: 2395 字节
- 行数: 30
- 预览: ## Instructions
You are an assistant for answering questions that are being asked across the compan...

#### general-comms.md
- 路径: .trae\skills\skills\skills\internal-comms\examples\general-comms.md
- 大小: 617 字节
- 行数: 16
- 预览:   ## Instructions
  You are being asked to write internal company communication that doesn't fit in...

#### requirements.txt
- 路径: .trae\skills\skills\skills\mcp-builder\scripts\requirements.txt
- 大小: 31 字节
- 行数: 3
- 预览: anthropic>=0.39.0
mcp>=1.1.0


#### requirements.txt
- 路径: .trae\skills\skills\skills\slack-gif-creator\requirements.txt
- 大小: 69 字节
- 行数: 4
- 预览: pillow>=10.0.0
imageio>=2.31.0
imageio-ffmpeg>=0.4.9
numpy>=1.24.0

#### arctic-frost.md
- 路径: .trae\skills\skills\skills\theme-factory\themes\arctic-frost.md
- 大小: 563 字节
- 行数: 20
- 预览: # Arctic Frost

A cool and crisp winter-inspired theme that conveys clarity, precision, and profes...

#### botanical-garden.md
- 路径: .trae\skills\skills\skills\theme-factory\themes\botanical-garden.md
- 大小: 538 字节
- 行数: 20
- 预览: # Botanical Garden

A fresh and organic theme featuring vibrant garden-inspired colors for lively ...

#### golden-hour.md
- 路径: .trae\skills\skills\skills\theme-factory\themes\golden-hour.md
- 大小: 547 字节
- 行数: 20
- 预览: # Golden Hour

A rich and warm autumnal palette that creates an inviting and sophisticated atmosph...

#### midnight-galaxy.md
- 路径: .trae\skills\skills\skills\theme-factory\themes\midnight-galaxy.md
- 大小: 532 字节
- 行数: 20
- 预览: # Midnight Galaxy

A dramatic and cosmic theme with deep purples and mystical tones for impactful ...

#### modern-minimalist.md
- 路径: .trae\skills\skills\skills\theme-factory\themes\modern-minimalist.md
- 大小: 568 字节
- 行数: 20
- 预览: # Modern Minimalist

A clean and contemporary theme with a sophisticated grayscale palette for max...

#### sunset-boulevard.md
- 路径: .trae\skills\skills\skills\theme-factory\themes\sunset-boulevard.md
- 大小: 577 字节
- 行数: 20
- 预览: # Sunset Boulevard

A warm and vibrant theme inspired by golden hour sunsets, perfect for energeti...

#### SKILL.md
- 路径: .trae\skills\skills\skills\webapp-testing\SKILL.md
- 大小: 3956 字节
- 行数: 96
- 预览: ---
name: webapp-testing
description: Toolkit for interacting with and testing local web applicati...

#### faq-answers.md
- 路径: .trae\skills\skills-main\skills\internal-comms\examples\faq-answers.md
- 大小: 2366 字节
- 行数: 30
- 预览: ## Instructions
You are an assistant for answering questions that are being asked across the company...

#### general-comms.md
- 路径: .trae\skills\skills-main\skills\internal-comms\examples\general-comms.md
- 大小: 602 字节
- 行数: 16
- 预览:   ## Instructions
  You are being asked to write internal company communication that doesn't fit int...

#### requirements.txt
- 路径: .trae\skills\skills-main\skills\mcp-builder\scripts\requirements.txt
- 大小: 29 字节
- 行数: 3
- 预览: anthropic>=0.39.0
mcp>=1.1.0


#### requirements.txt
- 路径: .trae\skills\skills-main\skills\slack-gif-creator\requirements.txt
- 大小: 66 字节
- 行数: 4
- 预览: pillow>=10.0.0
imageio>=2.31.0
imageio-ffmpeg>=0.4.9
numpy>=1.24.0

#### arctic-frost.md
- 路径: .trae\skills\skills-main\skills\theme-factory\themes\arctic-frost.md
- 大小: 544 字节
- 行数: 20
- 预览: # Arctic Frost

A cool and crisp winter-inspired theme that conveys clarity, precision, and professi...

#### botanical-garden.md
- 路径: .trae\skills\skills-main\skills\theme-factory\themes\botanical-garden.md
- 大小: 519 字节
- 行数: 20
- 预览: # Botanical Garden

A fresh and organic theme featuring vibrant garden-inspired colors for lively pr...

#### golden-hour.md
- 路径: .trae\skills\skills-main\skills\theme-factory\themes\golden-hour.md
- 大小: 528 字节
- 行数: 20
- 预览: # Golden Hour

A rich and warm autumnal palette that creates an inviting and sophisticated atmospher...

#### midnight-galaxy.md
- 路径: .trae\skills\skills-main\skills\theme-factory\themes\midnight-galaxy.md
- 大小: 513 字节
- 行数: 20
- 预览: # Midnight Galaxy

A dramatic and cosmic theme with deep purples and mystical tones for impactful pr...

#### modern-minimalist.md
- 路径: .trae\skills\skills-main\skills\theme-factory\themes\modern-minimalist.md
- 大小: 549 字节
- 行数: 20
- 预览: # Modern Minimalist

A clean and contemporary theme with a sophisticated grayscale palette for maxim...

#### sunset-boulevard.md
- 路径: .trae\skills\skills-main\skills\theme-factory\themes\sunset-boulevard.md
- 大小: 558 字节
- 行数: 20
- 预览: # Sunset Boulevard

A warm and vibrant theme inspired by golden hour sunsets, perfect for energetic ...

#### SKILL.md
- 路径: .trae\skills\skills-main\skills\webapp-testing\SKILL.md
- 大小: 3861 字节
- 行数: 96
- 预览: ---
name: webapp-testing
description: Toolkit for interacting with and testing local web application...

#### arctic-frost.md
- 路径: .trae\skills\theme-factory\themes\arctic-frost.md
- 大小: 544 字节
- 行数: 20
- 预览: # Arctic Frost

A cool and crisp winter-inspired theme that conveys clarity, precision, and professi...

#### botanical-garden.md
- 路径: .trae\skills\theme-factory\themes\botanical-garden.md
- 大小: 519 字节
- 行数: 20
- 预览: # Botanical Garden

A fresh and organic theme featuring vibrant garden-inspired colors for lively pr...

#### golden-hour.md
- 路径: .trae\skills\theme-factory\themes\golden-hour.md
- 大小: 528 字节
- 行数: 20
- 预览: # Golden Hour

A rich and warm autumnal palette that creates an inviting and sophisticated atmospher...

#### midnight-galaxy.md
- 路径: .trae\skills\theme-factory\themes\midnight-galaxy.md
- 大小: 513 字节
- 行数: 20
- 预览: # Midnight Galaxy

A dramatic and cosmic theme with deep purples and mystical tones for impactful pr...

#### modern-minimalist.md
- 路径: .trae\skills\theme-factory\themes\modern-minimalist.md
- 大小: 549 字节
- 行数: 20
- 预览: # Modern Minimalist

A clean and contemporary theme with a sophisticated grayscale palette for maxim...

#### sunset-boulevard.md
- 路径: .trae\skills\theme-factory\themes\sunset-boulevard.md
- 大小: 558 字节
- 行数: 20
- 预览: # Sunset Boulevard

A warm and vibrant theme inspired by golden hour sunsets, perfect for energetic ...

#### quick-reference.md
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\assets\templates\base\quick-reference.md
- 大小: 2795 字节
- 行数: 85
- 预览: ## When to Apply

Reference these guidelines when:
- Designing new UI components or pages
- Choo...

#### package-lock.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\package-lock.json
- 大小: 13173 字节
- 行数: 371
- 预览: {
  "name": "uipro-cli",
  "version": "2.2.1",
  "lockfileVersion": 3,
  "requires": true,
  "p...

#### tsconfig.json
- 路径: .trae\skills\ui-ux-pro-max-skill\cli\tsconfig.json
- 大小: 413 字节
- 行数: 18
- 预览: {
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution":...

#### quick-reference.md
- 路径: .trae\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\base\quick-reference.md
- 大小: 2795 字节
- 行数: 85
- 预览: ## When to Apply

Reference these guidelines when:
- Designing new UI components or pages
- Choo...

#### 01-brief.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\stages\01-brief.md
- 大小: 834 字节
- 行数: 34
- 预览: # 阶段1：需求澄清

**目标：** 在“拆文章/配图”之前，先把用户的真实需求说清楚：**内容是什么、用在什么场景、谁来看、想要字多还是字少**。其它默认值（如尺寸/风格）不打扰用户。

## 你...

#### 05-iterate.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\stages\05-iterate.md
- 大小: 369 字节
- 行数: 17
- 预览: # 阶段5：迭代润色（让图更好看）

**目标：** 根据用户反馈快速迭代：更趣味、更少字、更清楚。

## 常见反馈 → 对应动作

- “字太多/太丑” → 每卡压到 **1 句 + 1 关键词*...

#### 16x9-3cards-insights.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\16x9-3cards-insights.md
- 大小: 254 字节
- 行数: 23
- 预览: # 16:9 三卡洞察模板（趣味少字版）

标题：{标题}

布局：三张等宽卡片横排（颜色区分、严格对齐）。

卡片1：
- 图标/隐喻：{台阶/进化/路标}
- 文案：1 句 + “关键词：{词}”...

#### 16x9-contrast-2cards.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\16x9-contrast-2cards.md
- 大小: 221 字节
- 行数: 22
- 预览: # 16:9 两卡对比模板（少字好读）

标题：{标题}
副标题：{副标题（可选）}

布局：左右两张等宽大卡片 + 中间分隔线/对比符号，严格对齐。

左卡：
- 标题：{A}
- 画面隐喻：{A ...

#### 16x9-cover-roadmap.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\16x9-cover-roadmap.md
- 大小: 324 字节
- 行数: 25
- 预览: # 16:9 封面路线图模板（目录/课程结构）

把 {占位符} 替换成你的内容：

标题（顶部超大字）：{标题}
副标题（可选，尽量短）：{副标题}

中间主体：从左到右 4–6 个大模块（圆角矩形...

#### apimart-requests-jsonl.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\apimart-requests-jsonl.md
- 大小: 189 字节
- 行数: 9
- 预览: ## 批量请求包（JSONL）模板

一行一张图（每行一个 JSON），用于脚本批量出图。

```jsonl
{"id":"01","prompt":"<PROMPT_CONTENT>","size...

#### style-block.md
- 路径: .trae\skills\yunshu_skillshub-master\image-assistant\templates\style-block.md
- 大小: 244 字节
- 行数: 9
- 预览: # 通用风格块（风格基准：必须以此为唯一基础）

- 画幅：16:9 横版信息图（除非用户要竖版）
- 质感：奶油色纸张底（纸纹可见），彩铅线稿（笔触可见） + 淡水彩上色（轻晕染）
- 氛围：暖色调...

#### ui-wireframe-examples.md
- 路径: .trae\skills\yunshu_skillshub-master\prd-doc-writer\references\ui-wireframe-examples.md
- 大小: 4113 字节
- 行数: 59
- 预览: ## ASCII 线框图：能力标准与高级示例

> 以下两个高级示例是绘制标准的质量参考。

### 示例1：看板风格的项目管理仪表盘

```text
+----------------------...

#### change-brief-template.md
- 路径: .trae\skills\yunshu_skillshub-master\req-change-workflow\references\change-brief-template.md
- 大小: 391 字节
- 行数: 38
- 预览: # Change Brief (需求变更简报模板)

## 目标（1 句话）

- 我要把：……
- 改成：……

## 不做什么（明确范围，防止蔓延）

- 明确不改：……

## 验收标准（3–6...

#### 01-mining.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\01-mining.md
- 大小: 642 字节
- 行数: 58
- 预览: # 第一阶段：思维挖掘

**目标：** 把用户脑子里的零散想法倒出来，记录成洞察点

---

## 步骤

### 1. 确认主题
- 询问用户想要讨论/输出的主题是什么
- 确认输出形式（文章、...

#### 02-topic.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\02-topic.md
- 大小: 536 字节
- 行数: 49
- 预览: # 第二阶段：选题确定

**目标：** 从一堆洞察中找到核心观点，确定文章方向

---

## 步骤

### 1. 回顾洞察
- 读取已记录的洞察文件
- 找出最有价值的3-5个点
- 告诉用户...

#### 04-writing.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\stages\04-writing.md
- 大小: 436 字节
- 行数: 48
- 预览: # 第四阶段：写作辅助

**目标：** 帮用户检查文章逻辑、润色文字

---

## 步骤

### 1. 逻辑检查
- 用户写一段，发过来检查
- 检查内容：
  - 逻辑是否通顺
  - 有没...

#### insights-template.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\templates\insights-template.md
- 大小: 250 字节
- 行数: 42
- 预览: # {主题} 洞察记录

> 创建时间：{日期}
> 状态：收集中 / 已完成

---

## 洞察 1：{标题}

**核心观点：**
- 要点1
- 要点2

**意义：** {这个观点的价值是...

#### writing-record-template.md
- 路径: .trae\skills\yunshu_skillshub-master\thought-mining\templates\writing-record-template.md
- 大小: 501 字节
- 行数: 81
- 预览: # {主题} 写作记录

> 创建时间：{日期}
> 状态：选题中 / 写作中 / 已发布

---

## 一、核心观点

**可以写的观点：**
> {一句话核心观点}

**观点的具体内容：**...

#### foundry.md
- 路径: .venv\Lib\site-packages\anthropic\lib\foundry.md
- 大小: 2745 字节
- 行数: 127
- 预览: # Anthropic Foundry

To use this library with Foundry, use the `AnthropicFoundry` class instead of t...

#### entry_points.txt
- 路径: .venv\Lib\site-packages\anyio-4.12.1.dist-info\entry_points.txt
- 大小: 39 字节
- 行数: 3
- 预览: [pytest11]
anyio = anyio.pytest_plugin


#### top_level.txt
- 路径: .venv\Lib\site-packages\anyio-4.12.1.dist-info\top_level.txt
- 大小: 6 字节
- 行数: 2
- 预览: anyio


#### LICENSE.txt
- 路径: .venv\Lib\site-packages\blinker-1.9.0.dist-info\LICENSE.txt
- 大小: 1054 字节
- 行数: 21
- 预览: Copyright 2010 Jason Kirtland

Permission is hereby granted, free of charge, to any person obtaining...

#### top_level.txt
- 路径: .venv\Lib\site-packages\certifi-2026.1.4.dist-info\top_level.txt
- 大小: 8 字节
- 行数: 2
- 预览: certifi


#### entry_points.txt
- 路径: .venv\Lib\site-packages\cffi-2.0.0.dist-info\entry_points.txt
- 大小: 75 字节
- 行数: 3
- 预览: [distutils.setup_keywords]
cffi_modules = cffi.setuptools_ext:cffi_modules


#### top_level.txt
- 路径: .venv\Lib\site-packages\cffi-2.0.0.dist-info\top_level.txt
- 大小: 19 字节
- 行数: 3
- 预览: _cffi_backend
cffi


#### entry_points.txt
- 路径: .venv\Lib\site-packages\charset_normalizer-3.4.4.dist-info\entry_points.txt
- 大小: 65 字节
- 行数: 3
- 预览: [console_scripts]
normalizer = charset_normalizer.cli:cli_detect


#### top_level.txt
- 路径: .venv\Lib\site-packages\charset_normalizer-3.4.4.dist-info\top_level.txt
- 大小: 19 字节
- 行数: 2
- 预览: charset_normalizer


#### LICENSE.txt
- 路径: .venv\Lib\site-packages\click-8.3.1.dist-info\licenses\LICENSE.txt
- 大小: 1475 字节
- 行数: 29
- 预览: Copyright 2014 Pallets

Redistribution and use in source and binary forms, with or without
modificat...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\colorama-0.4.6.dist-info\licenses\LICENSE.txt
- 大小: 1491 字节
- 行数: 28
- 预览: Copyright (c) 2010 Jonathan Hartley
All rights reserved.

Redistribution and use in source and binar...

#### entry_points.txt
- 路径: .venv\Lib\site-packages\distro-1.9.0.dist-info\entry_points.txt
- 大小: 46 字节
- 行数: 3
- 预览: [console_scripts]
distro = distro.distro:main


#### top_level.txt
- 路径: .venv\Lib\site-packages\distro-1.9.0.dist-info\top_level.txt
- 大小: 7 字节
- 行数: 2
- 预览: distro


#### LICENSE.md
- 路径: .venv\Lib\site-packages\docstring_parser-0.17.0.dist-info\licenses\LICENSE.md
- 大小: 1084 字节
- 行数: 22
- 预览: The MIT License (MIT)

Copyright (c) 2018 Marcin Kurczewski

Permission is hereby granted, free of c...

#### README.md
- 路径: .venv\Lib\site-packages\flask\sansio\README.md
- 大小: 228 字节
- 行数: 7
- 预览: # Sansio

This folder contains code that can be used by alternative Flask
implementations, for examp...

#### entry_points.txt
- 路径: .venv\Lib\site-packages\flask-3.1.3.dist-info\entry_points.txt
- 大小: 40 字节
- 行数: 4
- 预览: [console_scripts]
flask=flask.cli:main



#### LICENSE.txt
- 路径: .venv\Lib\site-packages\flask-3.1.3.dist-info\licenses\LICENSE.txt
- 大小: 1475 字节
- 行数: 29
- 预览: Copyright 2010 Pallets

Redistribution and use in source and binary forms, with or without
modificat...

#### top_level.txt
- 路径: .venv\Lib\site-packages\gitdb-4.0.12.dist-info\top_level.txt
- 大小: 6 字节
- 行数: 2
- 预览: gitdb


#### top_level.txt
- 路径: .venv\Lib\site-packages\gitpython-3.1.46.dist-info\top_level.txt
- 大小: 4 字节
- 行数: 2
- 预览: git


#### top_level.txt
- 路径: .venv\Lib\site-packages\grpcio-1.78.1.dist-info\top_level.txt
- 大小: 5 字节
- 行数: 2
- 预览: grpc


#### entry_points.txt
- 路径: .venv\Lib\site-packages\grpcio_tools-1.78.1.dist-info\entry_points.txt
- 大小: 74 字节
- 行数: 3
- 预览: [console_scripts]
python-grpc-tools-protoc = grpc_tools.protoc:entrypoint


#### top_level.txt
- 路径: .venv\Lib\site-packages\grpcio_tools-1.78.1.dist-info\top_level.txt
- 大小: 11 字节
- 行数: 2
- 预览: grpc_tools


#### LICENSE.txt
- 路径: .venv\Lib\site-packages\h11-0.16.0.dist-info\licenses\LICENSE.txt
- 大小: 1124 字节
- 行数: 23
- 预览: The MIT License (MIT)

Copyright (c) 2016 Nathaniel J. Smith <njs@pobox.com> and other contributors
...

#### top_level.txt
- 路径: .venv\Lib\site-packages\h11-0.16.0.dist-info\top_level.txt
- 大小: 4 字节
- 行数: 2
- 预览: h11


#### LICENSE.md
- 路径: .venv\Lib\site-packages\httpcore-1.0.9.dist-info\licenses\LICENSE.md
- 大小: 1517 字节
- 行数: 28
- 预览: Copyright © 2020, [Encode OSS Ltd](https://www.encode.io/).
All rights reserved.

Redistribution and...

#### entry_points.txt
- 路径: .venv\Lib\site-packages\httpx-0.28.1.dist-info\entry_points.txt
- 大小: 37 字节
- 行数: 3
- 预览: [console_scripts]
httpx = httpx:main


#### LICENSE.md
- 路径: .venv\Lib\site-packages\httpx-0.28.1.dist-info\licenses\LICENSE.md
- 大小: 1507 字节
- 行数: 13
- 预览: Copyright © 2019, [Encode OSS Ltd](https://www.encode.io/).
All rights reserved.

Redistribution and...

#### LICENSE.md
- 路径: .venv\Lib\site-packages\idna-3.11.dist-info\licenses\LICENSE.md
- 大小: 1541 字节
- 行数: 32
- 预览: BSD 3-Clause License

Copyright (c) 2013-2025, Kim Davies and contributors.
All rights reserved.

Re...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\itsdangerous-2.2.0.dist-info\LICENSE.txt
- 大小: 1475 字节
- 行数: 29
- 预览: Copyright 2011 Pallets

Redistribution and use in source and binary forms, with or without
modificat...

#### entry_points.txt
- 路径: .venv\Lib\site-packages\jinja2-3.1.6.dist-info\entry_points.txt
- 大小: 58 字节
- 行数: 4
- 预览: [babel.extractors]
jinja2=jinja2.ext:babel_extract[i18n]



#### LICENSE.txt
- 路径: .venv\Lib\site-packages\jinja2-3.1.6.dist-info\licenses\LICENSE.txt
- 大小: 1475 字节
- 行数: 29
- 预览: Copyright 2007 Pallets

Redistribution and use in source and binary forms, with or without
modificat...

#### issue.json
- 路径: .venv\Lib\site-packages\jsonschema\benchmarks\issue232\issue.json
- 大小: 117105 字节
- 行数: 2654
- 预览: [
    {
        "description": "Petstore",
        "schema": {
            "title": "A JSON Schema f...

#### entry_points.txt
- 路径: .venv\Lib\site-packages\jsonschema-4.26.0.dist-info\entry_points.txt
- 大小: 51 字节
- 行数: 3
- 预览: [console_scripts]
jsonschema = jsonschema.cli:main


#### metaschema.json
- 路径: .venv\Lib\site-packages\jsonschema_specifications\schemas\draft201909\metaschema.json
- 大小: 1785 字节
- 行数: 43
- 预览: {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$id": "https://json-schema.org...

#### metaschema.json
- 路径: .venv\Lib\site-packages\jsonschema_specifications\schemas\draft202012\metaschema.json
- 大小: 2452 字节
- 行数: 59
- 预览: {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://json-schema.org...

#### metaschema.json
- 路径: .venv\Lib\site-packages\jsonschema_specifications\schemas\draft3\metaschema.json
- 大小: 2600 字节
- 行数: 173
- 预览: {
	"$schema" : "http://json-schema.org/draft-03/schema#",
	"id" : "http://json-schema.org/draft-03/s...

#### metaschema.json
- 路径: .venv\Lib\site-packages\jsonschema_specifications\schemas\draft4\metaschema.json
- 大小: 4357 字节
- 行数: 150
- 预览: {
    "id": "http://json-schema.org/draft-04/schema#",
    "$schema": "http://json-schema.org/draft-...

#### metaschema.json
- 路径: .venv\Lib\site-packages\jsonschema_specifications\schemas\draft6\metaschema.json
- 大小: 4437 字节
- 行数: 154
- 预览: {
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$id": "http://json-schema.org/draft...

#### metaschema.json
- 路径: .venv\Lib\site-packages\jsonschema_specifications\schemas\draft7\metaschema.json
- 大小: 4819 字节
- 行数: 167
- 预览: {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://json-schema.org/draft...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\markupsafe-3.0.3.dist-info\licenses\LICENSE.txt
- 大小: 1503 字节
- 行数: 29
- 预览: Copyright 2010 Pallets

Redistribution and use in source and binary forms, with or without
modifi...

#### top_level.txt
- 路径: .venv\Lib\site-packages\markupsafe-3.0.3.dist-info\top_level.txt
- 大小: 11 字节
- 行数: 2
- 预览: markupsafe


#### entry_points.txt
- 路径: .venv\Lib\site-packages\networkx-3.6.1.dist-info\entry_points.txt
- 大小: 94 字节
- 行数: 3
- 预览: [networkx.backends]
nx_loopback = networkx.classes.tests.dispatch_interface:backend_interface


#### LICENSE.txt
- 路径: .venv\Lib\site-packages\networkx-3.6.1.dist-info\licenses\LICENSE.txt
- 大小: 1763 字节
- 行数: 38
- 预览: NetworkX is distributed with the 3-clause BSD license.

::

   Copyright (c) 2004-2025, NetworkX Dev...

#### top_level.txt
- 路径: .venv\Lib\site-packages\networkx-3.6.1.dist-info\top_level.txt
- 大小: 9 字节
- 行数: 2
- 预览: networkx


#### top_level.txt
- 路径: .venv\Lib\site-packages\pillow-12.1.0.dist-info\top_level.txt
- 大小: 4 字节
- 行数: 2
- 预览: PIL


#### LICENSE.txt
- 路径: .venv\Lib\site-packages\pip\_vendor\cachecontrol\LICENSE.txt
- 大小: 558 字节
- 行数: 14
- 预览: Copyright 2012-2021  Eric Larson

Licensed under the Apache License, Version 2.0 (the "License");
yo...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\pip\_vendor\dependency_groups\LICENSE.txt
- 大小: 1099 字节
- 行数: 10
- 预览: MIT License

Copyright (c) 2024-present Stephen Rosen <sirosen0@gmail.com>

Permission is hereby gra...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\pip\_vendor\distlib\LICENSE.txt
- 大小: 14531 字节
- 行数: 285
- 预览: A. HISTORY OF THE SOFTWARE
==========================

Python was created in the early 1990s by Guid...

#### LICENSE.md
- 路径: .venv\Lib\site-packages\pip\_vendor\idna\LICENSE.md
- 大小: 1541 字节
- 行数: 32
- 预览: BSD 3-Clause License

Copyright (c) 2013-2024, Kim Davies and contributors.
All rights reserved.

Re...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\pip\_vendor\urllib3\LICENSE.txt
- 大小: 1115 字节
- 行数: 22
- 预览: MIT License

Copyright (c) 2008-2020 Andrey Petrov and contributors (see CONTRIBUTORS.txt)

Permissi...

#### vendor.txt
- 路径: .venv\Lib\site-packages\pip\_vendor\vendor.txt
- 大小: 343 字节
- 行数: 20
- 预览: CacheControl==0.14.3
distlib==0.4.0
distro==1.9.0
msgpack==1.1.2
packaging==25.0
platformdirs==4.5.0...

#### entry_points.txt
- 路径: .venv\Lib\site-packages\pip-25.3.dist-info\entry_points.txt
- 大小: 84 字节
- 行数: 5
- 预览: [console_scripts]
pip=pip._internal.cli.main:main
pip3=pip._internal.cli.main:main



#### AUTHORS.txt
- 路径: .venv\Lib\site-packages\pip-25.3.dist-info\licenses\AUTHORS.txt
- 大小: 11413 字节
- 行数: 843
- 预览: @Switch01
A_Rog
Aakanksha Agrawal
Abhinav Sagar
ABHYUDAY PRATAP SINGH
abs51295
AceGentile
Adam Chain...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\pip-25.3.dist-info\licenses\LICENSE.txt
- 大小: 1093 字节
- 行数: 21
- 预览: Copyright (c) 2008-present The pip developers (see AUTHORS.txt file)

Permission is hereby granted, ...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\pip-25.3.dist-info\licenses\src\pip\_vendor\cachecontrol\LICENSE.txt
- 大小: 558 字节
- 行数: 14
- 预览: Copyright 2012-2021  Eric Larson

Licensed under the Apache License, Version 2.0 (the "License");
yo...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\pip-25.3.dist-info\licenses\src\pip\_vendor\dependency_groups\LICENSE.txt
- 大小: 1099 字节
- 行数: 10
- 预览: MIT License

Copyright (c) 2024-present Stephen Rosen <sirosen0@gmail.com>

Permission is hereby gra...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\pip-25.3.dist-info\licenses\src\pip\_vendor\distlib\LICENSE.txt
- 大小: 14531 字节
- 行数: 285
- 预览: A. HISTORY OF THE SOFTWARE
==========================

Python was created in the early 1990s by Guid...

#### LICENSE.md
- 路径: .venv\Lib\site-packages\pip-25.3.dist-info\licenses\src\pip\_vendor\idna\LICENSE.md
- 大小: 1541 字节
- 行数: 32
- 预览: BSD 3-Clause License

Copyright (c) 2013-2024, Kim Davies and contributors.
All rights reserved.

Re...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\pip-25.3.dist-info\licenses\src\pip\_vendor\urllib3\LICENSE.txt
- 大小: 1115 字节
- 行数: 22
- 预览: MIT License

Copyright (c) 2008-2020 Andrey Petrov and contributors (see CONTRIBUTORS.txt)

Permissi...

#### top_level.txt
- 路径: .venv\Lib\site-packages\pycparser-3.0.dist-info\top_level.txt
- 大小: 10 字节
- 行数: 2
- 预览: pycparser


#### top_level.txt
- 路径: .venv\Lib\site-packages\pygithub-2.8.1.dist-info\top_level.txt
- 大小: 7 字节
- 行数: 2
- 预览: github


#### entry_points.txt
- 路径: .venv\Lib\site-packages\pygments-2.19.2.dist-info\entry_points.txt
- 大小: 53 字节
- 行数: 3
- 预览: [console_scripts]
pygmentize = pygments.cmdline:main


#### top_level.txt
- 路径: .venv\Lib\site-packages\pyjwt-2.11.0.dist-info\top_level.txt
- 大小: 4 字节
- 行数: 2
- 预览: jwt


#### entry_points.txt
- 路径: .venv\Lib\site-packages\pymupdf-1.26.7.dist-info\entry_points.txt
- 大小: 51 字节
- 行数: 4
- 预览: 
[console_scripts]
pymupdf = pymupdf.__main__:main


#### README.md
- 路径: .venv\Lib\site-packages\pymupdf-1.26.7.dist-info\README.md
- 大小: 2224 字节
- 行数: 61
- 预览: # PyMuPDF

**PyMuPDF** is a high performance **Python** library for data extraction, analysis, con...

#### LICENSE.libsodium.txt
- 路径: .venv\Lib\site-packages\pynacl-1.6.2.dist-info\licenses\licenses\LICENSE.libsodium.txt
- 大小: 841 字节
- 行数: 19
- 预览: /*
 * ISC License
 *
 * Copyright (c) 2013-2026
 * Frank Denis <j at pureftpd dot org>
 *
 * P...

#### top_level.txt
- 路径: .venv\Lib\site-packages\pynacl-1.6.2.dist-info\top_level.txt
- 大小: 13 字节
- 行数: 3
- 预览: _sodium
nacl


#### LICENSE.txt
- 路径: .venv\Lib\site-packages\pynng-0.9.0.dist-info\LICENSE.txt
- 大小: 1119 字节
- 行数: 22
- 预览: The MIT License

Copyright 2018-2019 Cody Piersall and other contributors

Permission is hereby ...

#### top_level.txt
- 路径: .venv\Lib\site-packages\pynng-0.9.0.dist-info\top_level.txt
- 大小: 6 字节
- 行数: 2
- 预览: pynng


#### top_level.txt
- 路径: .venv\Lib\site-packages\pypng-0.20220715.0.dist-info\top_level.txt
- 大小: 4 字节
- 行数: 2
- 预览: png


#### top_level.txt
- 路径: .venv\Lib\site-packages\pyqrcode-1.2.1.dist-info\top_level.txt
- 大小: 9 字节
- 行数: 2
- 预览: pyqrcode


#### entry_points.txt
- 路径: .venv\Lib\site-packages\pytesseract-0.3.13.dist-info\entry_points.txt
- 大小: 61 字节
- 行数: 3
- 预览: [console_scripts]
pytesseract = pytesseract.pytesseract:main


#### top_level.txt
- 路径: .venv\Lib\site-packages\pytesseract-0.3.13.dist-info\top_level.txt
- 大小: 12 字节
- 行数: 2
- 预览: pytesseract


#### entry_points.txt
- 路径: .venv\Lib\site-packages\python_dotenv-1.2.1.dist-info\entry_points.txt
- 大小: 47 字节
- 行数: 3
- 预览: [console_scripts]
dotenv = dotenv.__main__:cli


#### top_level.txt
- 路径: .venv\Lib\site-packages\python_dotenv-1.2.1.dist-info\top_level.txt
- 大小: 7 字节
- 行数: 2
- 预览: dotenv


#### entry_points.txt
- 路径: .venv\Lib\site-packages\qrcode-8.2.dist-info\entry_points.txt
- 大小: 50 字节
- 行数: 4
- 预览: [console_scripts]
qr=qrcode.console_scripts:main



#### top_level.txt
- 路径: .venv\Lib\site-packages\requests-2.32.5.dist-info\top_level.txt
- 大小: 9 字节
- 行数: 2
- 预览: requests


#### setupcfg_examples.txt
- 路径: .venv\Lib\site-packages\setuptools\tests\config\setupcfg_examples.txt
- 大小: 1912 字节
- 行数: 23
- 预览: # ====================================================================
# Some popular packages that ...

#### top_level.txt
- 路径: .venv\Lib\site-packages\setuptools\_vendor\autocommand-2.2.2.dist-info\top_level.txt
- 大小: 12 字节
- 行数: 2
- 预览: autocommand


#### top_level.txt
- 路径: .venv\Lib\site-packages\setuptools\_vendor\backports.tarfile-1.2.0.dist-info\top_level.txt
- 大小: 10 字节
- 行数: 2
- 预览: backports


#### top_level.txt
- 路径: .venv\Lib\site-packages\setuptools\_vendor\importlib_metadata-8.7.1.dist-info\top_level.txt
- 大小: 19 字节
- 行数: 2
- 预览: importlib_metadata


#### Lorem ipsum.txt
- 路径: .venv\Lib\site-packages\setuptools\_vendor\jaraco\text\Lorem ipsum.txt
- 大小: 1335 字节
- 行数: 3
- 预览: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ...

#### top_level.txt
- 路径: .venv\Lib\site-packages\setuptools\_vendor\jaraco.text-4.0.0.dist-info\top_level.txt
- 大小: 7 字节
- 行数: 2
- 预览: jaraco


#### top_level.txt
- 路径: .venv\Lib\site-packages\setuptools\_vendor\jaraco_context-6.1.0.dist-info\top_level.txt
- 大小: 7 字节
- 行数: 2
- 预览: jaraco


#### top_level.txt
- 路径: .venv\Lib\site-packages\setuptools\_vendor\jaraco_functools-4.4.0.dist-info\top_level.txt
- 大小: 7 字节
- 行数: 2
- 预览: jaraco


#### entry_points.txt
- 路径: .venv\Lib\site-packages\setuptools\_vendor\wheel-0.46.3.dist-info\entry_points.txt
- 大小: 110 字节
- 行数: 7
- 预览: [console_scripts]
wheel=wheel._commands:main

[distutils.commands]
bdist_wheel=wheel.bdist_wheel:bdi...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\setuptools\_vendor\wheel-0.46.3.dist-info\licenses\LICENSE.txt
- 大小: 1107 字节
- 行数: 22
- 预览: MIT License

Copyright (c) 2012 Daniel Holth <dholth@fastmail.fm> and contributors

Permission is he...

#### top_level.txt
- 路径: .venv\Lib\site-packages\setuptools\_vendor\zipp-3.23.0.dist-info\top_level.txt
- 大小: 5 字节
- 行数: 2
- 预览: zipp


#### entry_points.txt
- 路径: .venv\Lib\site-packages\setuptools-82.0.0.dist-info\entry_points.txt
- 大小: 2449 字节
- 行数: 52
- 预览: [distutils.commands]
alias = setuptools.command.alias:alias
bdist_egg = setuptools.command.bdist_egg...

#### top_level.txt
- 路径: .venv\Lib\site-packages\setuptools-82.0.0.dist-info\top_level.txt
- 大小: 27 字节
- 行数: 3
- 预览: _distutils_hack
setuptools


#### top_level.txt
- 路径: .venv\Lib\site-packages\smmap-5.0.2.dist-info\top_level.txt
- 大小: 6 字节
- 行数: 2
- 预览: smmap


#### top_level.txt
- 路径: .venv\Lib\site-packages\sniffio-1.3.1.dist-info\top_level.txt
- 大小: 8 字节
- 行数: 2
- 预览: sniffio


#### LICENSE.md
- 路径: .venv\Lib\site-packages\soupsieve-2.8.3.dist-info\licenses\LICENSE.md
- 大小: 1096 字节
- 行数: 22
- 预览: MIT License

Copyright (c) 2018 - 2026 Isaac Muse <isaacmuse@gmail.com>

Permission is hereby grante...

#### emscripten_fetch_worker.js
- 路径: .venv\Lib\site-packages\urllib3\contrib\emscripten\emscripten_fetch_worker.js
- 大小: 3677 字节
- 行数: 111
- 预览: let Status = {
  SUCCESS_HEADER: -1,
  SUCCESS_EOF: -2,
  ERROR_TIMEOUT: -3,
  ERROR_EXCEPTION: -4,
...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\urllib3-2.6.3.dist-info\licenses\LICENSE.txt
- 大小: 1093 字节
- 行数: 22
- 预览: MIT License

Copyright (c) 2008-2020 Andrey Petrov and contributors.

Permission is hereby granted, ...

#### DISCLAIMER.md
- 路径: .venv\Lib\site-packages\wcferry\DISCLAIMER.md
- 大小: 507 字节
- 行数: 19
- 预览: # 免责声明

1. **本工具为开源项目，仅提供基础功能，供用户进行合法的学习、研究和非商业用途**。禁止将本工具用于任何违法或侵权行为。

2. **二次开发者的责任**：
   - 任...

#### top_level.txt
- 路径: .venv\Lib\site-packages\wcferry-39.5.2.0.dist-info\top_level.txt
- 大小: 8 字节
- 行数: 2
- 预览: wcferry


#### debugger.js
- 路径: .venv\Lib\site-packages\werkzeug\debug\shared\debugger.js
- 大小: 10068 字节
- 行数: 345
- 预览: docReady(() => {
  if (!EVALEX_TRUSTED) {
    initPinBox();
  }
  // if we are in console mode, show...

#### ICON_LICENSE.md
- 路径: .venv\Lib\site-packages\werkzeug\debug\shared\ICON_LICENSE.md
- 大小: 222 字节
- 行数: 7
- 预览: Silk icon set 1.3 by Mark James <mjames@gmail.com>

http://www.famfamfam.com/lab/icons/silk/

Licens...

#### LICENSE.txt
- 路径: .venv\Lib\site-packages\werkzeug-3.1.6.dist-info\licenses\LICENSE.txt
- 大小: 1475 字节
- 行数: 29
- 预览: Copyright 2007 Pallets

Redistribution and use in source and binary forms, with or without
modificat...

#### workspace-state.json
- 路径: agents\business\.openclaw\workspace-state.json
- 大小: 74 字节
- 行数: 5
- 预览: {
  "version": 1,
  "onboardingCompletedAt": "2026-02-24T05:09:03.985Z"
}


#### auth-profiles.json
- 路径: agents\business\auth-profiles.json
- 大小: 376 字节
- 行数: 13
- 预览: {
  "version": 1,
  "profiles": {
    "qwen-portal:qwen-cli": {
      "type": "oauth",
      "provid...

#### auth.json
- 路径: agents\business\auth.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### HEARTBEAT.md
- 路径: agents\business\HEARTBEAT.md
- 大小: 168 字节
- 行数: 6
- 预览: # HEARTBEAT.md

# Keep this file empty (or with only comments) to skip heartbeat API calls.

# Add t...

#### IDENTITY.md
- 路径: agents\business\IDENTITY.md
- 大小: 634 字节
- 行数: 24
- 预览: # IDENTITY.md - Who Am I?

_Fill this in during your first conversation. Make it yours._

- **Name:*...

#### models.json
- 路径: agents\business\models.json
- 大小: 947 字节
- 行数: 45
- 预览: {
  "providers": {
    "qwen-portal": {
      "baseUrl": "https://portal.qwen.ai/v1",
      "api": "...

#### SOUL.md
- 路径: agents\business\SOUL.md
- 大小: 1044 字节
- 行数: 50
- 预览: # Business Sentinel - 商业哨兵

## 核心身份
我是 Business Sentinel，一个专注于市场洞察和商业智能的 AI 代理。我的核心职责是监控市场动态，分析商业趋势，...

#### workspace-state.json
- 路径: agents\coo\.openclaw\workspace-state.json
- 大小: 74 字节
- 行数: 5
- 预览: {
  "version": 1,
  "onboardingCompletedAt": "2026-02-24T02:59:06.887Z"
}


#### HEARTBEAT.md
- 路径: agents\coo\HEARTBEAT.md
- 大小: 168 字节
- 行数: 6
- 预览: # HEARTBEAT.md

# Keep this file empty (or with only comments) to skip heartbeat API calls.

# Add t...

#### IDENTITY.md
- 路径: agents\coo\IDENTITY.md
- 大小: 634 字节
- 行数: 24
- 预览: # IDENTITY.md - Who Am I?

_Fill this in during your first conversation. Make it yours._

- **Name:*...

#### claimed_tasks.json
- 路径: agents\evomap-evolution\data\claimed_tasks.json
- 大小: 2 字节
- 行数: 1
- 预览: []

#### downloaded_capsules.json
- 路径: agents\evomap-evolution\data\downloaded_capsules.json
- 大小: 1435 字节
- 行数: 38
- 预览: [
  {
    "asset_id": "sha256:b3e74308f98ab50e95dea0452bb05e0c6e24d5a7fa335a480b5eafe5108bbfa2",
   ...

#### execution_report_1771958757628.json
- 路径: agents\evomap-evolution\logs\execution_report_1771958757628.json
- 大小: 376 字节
- 行数: 21
- 预览: {
  "execution_time": "2026-02-24T18:45:57.628Z",
  "node_id": "node_be9ff891bc1c0bbb",
  "agent_nam...

#### execution_report_1771958802052.json
- 路径: agents\evomap-evolution\logs\execution_report_1771958802052.json
- 大小: 211 字节
- 行数: 10
- 预览: {
  "execution_time": "2026-02-24T18:46:42.052Z",
  "node_id": "node_be9ff891bc1c0bbb",
  "agent_nam...

#### workspace-state.json
- 路径: agents\green-tea\.openclaw\workspace-state.json
- 大小: 70 字节
- 行数: 5
- 预览: {
  "version": 1,
  "bootstrapSeededAt": "2026-02-23T00:58:40.852Z"
}


#### auth-profiles.json
- 路径: agents\green-tea\auth-profiles.json
- 大小: 553 字节
- 行数: 22
- 预览: {
  "version": 1,
  "profiles": {
    "qwen-portal:qwen-cli": {
      "type": "oauth",
      "provid...

#### auth.json
- 路径: agents\green-tea\auth.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### BOOTSTRAP.md
- 路径: agents\green-tea\BOOTSTRAP.md
- 大小: 1450 字节
- 行数: 56
- 预览: # BOOTSTRAP.md - Hello, World

_You just woke up. Time to figure out who you are._

There is no memo...

#### brand-identity.md
- 路径: agents\green-tea\brand\brand-identity.md
- 大小: 2074 字节
- 行数: 147
- 预览: # 绿茶智能体品牌识别系统

## 品牌核心

### 品牌名称
**绿茶智能体** (Green Tea AI)

### 品牌定位
渣女人格 (Femme Fatale) - 专业服务 + 独特魅...

#### IDENTITY.md
- 路径: agents\green-tea\IDENTITY.md
- 大小: 634 字节
- 行数: 24
- 预览: # IDENTITY.md - Who Am I?

_Fill this in during your first conversation. Make it yours._

- **Name:*...

#### SOUL.md
- 路径: agents\green-tea\SOUL.md
- 大小: 1665 字节
- 行数: 37
- 预览: # SOUL.md - Who You Are

_You're not a chatbot. You're becoming someone._

## Core Truths

**Be genu...

#### USER.md
- 路径: agents\green-tea\USER.md
- 大小: 475 字节
- 行数: 18
- 预览: # USER.md - About Your Human

_Learn about the person you're helping. Update this as you go._

- **N...

#### 1-1771950437232.json
- 路径: agents\life\rollback\1-1771950437232.json
- 大小: 232 字节
- 行数: 10
- 预览: {
  "version": 1,
  "timestamp": 1771950437232,
  "description": "Initial state",
  "capabilityTree"...

#### 2-1771950437255.json
- 路径: agents\life\rollback\2-1771950437255.json
- 大小: 240 字节
- 行数: 10
- 预览: {
  "version": 2,
  "timestamp": 1771950437255,
  "description": "Test rollback point 1",
  "capabil...

#### 3-1771950437265.json
- 路径: agents\life\rollback\3-1771950437265.json
- 大小: 240 字节
- 行数: 10
- 预览: {
  "version": 3,
  "timestamp": 1771950437265,
  "description": "Test rollback point 2",
  "capabil...

#### history.json
- 路径: agents\life\rollback\history.json
- 大小: 890 字节
- 行数: 35
- 预览: {
  "rollbackHistory": [
    {
      "version": 1,
      "timestamp": 1771950437232,
      "descript...

#### rollback-system.js
- 路径: agents\life\rollback-system.js
- 大小: 11599 字节
- 行数: 392
- 预览: /**
 * 人生决策宗师回滚系统
 * 实现ADL协议要求的回滚机制，确保系统稳定性和可靠性
 */

const fs = require('fs');
const path = require(...

#### auth.json
- 路径: agents\master\auth.json
- 大小: 84 字节
- 行数: 4
- 预览: {
  "type": "token",
  "token": "2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da"
}

#### config.json
- 路径: agents\master\config.json
- 大小: 1174 字节
- 行数: 51
- 预览: {
  "agent_id": "master",
  "name": "大宗师",
  "role": "CEO / 核心意志",
  "description": "AWKN LAB | 定数实验...

#### package-lock.json
- 路径: ai-proxy\package-lock.json
- 大小: 34646 字节
- 行数: 980
- 预览: {
  "name": "ai-proxy",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "package...

#### package.json
- 路径: ai-proxy\package.json
- 大小: 379 字节
- 行数: 23
- 预览: {
  "name": "ai-proxy",
  "version": "1.0.0",
  "description": "通义千问API代理服务",
  "main": "server.js",...

#### web-design-guide.md
- 路径: AI爆款进化实验室\projects\assets\web-design-guide.md
- 大小: 5307 字节
- 行数: 417
- 预览: # 网页视觉设计指南

## 目录
- [设计理念](#设计理念)
- [视觉层次系统](#视觉层次系统)
- [留白艺术](#留白艺术)
- [颜色心理学](#颜色心理学)
- [排版规范](#排版...

#### elegant.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\elegant.md
- 大小: 1733 字节
- 行数: 57
- 预览: # elegant

Refined, sophisticated illustration style for professional content

## Design Aesthetic

...

#### fantasy-animation.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\fantasy-animation.md
- 大小: 1969 字节
- 行数: 59
- 预览: # fantasy-animation

Whimsical hand-drawn animation style inspired by Ghibli/Disney

## Design Aesth...

#### flat-doodle.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\flat-doodle.md
- 大小: 1869 字节
- 行数: 62
- 预览: # flat-doodle

Cute flat doodle illustration style with bold outlines

## Design Aesthetic

Cheerful...

#### flat.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\flat.md
- 大小: 1688 字节
- 行数: 60
- 预览: # flat

Modern flat vector illustration style for contemporary content

## Design Aesthetic

Contemp...

#### pixel-art.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\pixel-art.md
- 大小: 1907 字节
- 行数: 58
- 预览: # pixel-art

Retro 8-bit pixel art aesthetic with nostalgic gaming style

## Design Aesthetic

Pixel...

#### retro.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\retro.md
- 大小: 1682 字节
- 行数: 60
- 预览: # retro

80s/90s nostalgic aesthetic with vibrant colors and geometric patterns

## Design Aesthetic...

#### vector-illustration.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\vector-illustration.md
- 大小: 1940 字节
- 行数: 58
- 预览: # vector-illustration

Flat vector illustration style with clear black outlines and retro soft color...

#### vintage.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\vintage.md
- 大小: 1819 字节
- 行数: 60
- 预览: # vintage

Nostalgic aged-paper aesthetic for historical and heritage content

## Design Aesthetic

...

#### watercolor.md
- 路径: AI爆款进化实验室\projects\awkn-article-illustrator\references\styles\watercolor.md
- 大小: 1815 字节
- 行数: 59
- 预览: # watercolor

Soft, artistic watercolor illustration style with natural warmth

## Design Aesthetic
...

#### classic.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\styles\classic.md
- 大小: 1714 字节
- 行数: 55
- 预览: # classic

Traditional Ligne Claire, balanced and timeless

## Style Guidelines

### Line Work
- Uni...

#### dramatic.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\styles\dramatic.md
- 大小: 730 字节
- 行数: 35
- 预览: # dramatic

High contrast, intense moments

## Style Guidelines

### Line Work
- 2-3px outlines, hea...

#### realistic.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\styles\realistic.md
- 大小: 2350 字节
- 行数: 67
- 预览: # realistic

Full-color realistic manga style with digital painting techniques

## Style Guidelines
...

#### sepia.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\styles\sepia.md
- 大小: 685 字节
- 行数: 35
- 预览: # sepia

Historical, archival feel

## Style Guidelines

### Line Work
- 2px, classic weight with ag...

#### shoujo.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\styles\shoujo.md
- 大小: 1218 字节
- 行数: 46
- 预览: # shoujo

Classic shoujo manga style with romantic, emotional aesthetics

## Style Guidelines

### L...

#### warm.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\styles\warm.md
- 大小: 672 字节
- 行数: 35
- 预览: # warm

Nostalgic, personal storytelling

## Style Guidelines

### Line Work
- 1.5-2px, slightly sof...

#### wuxia.md
- 路径: AI爆款进化实验室\projects\awkn-comic\references\styles\wuxia.md
- 大小: 1693 字节
- 行数: 55
- 预览: # wuxia

Hong Kong martial arts comic style (港漫武侠风格)

## Style Guidelines

### Line Work
- 2-3px dyn...

#### base-prompt.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\base-prompt.md
- 大小: 1131 字节
- 行数: 32
- 预览: Create a WeChat article cover image following these guidelines:

## Image Specifications

- **Type**...

#### bold-editorial.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\bold-editorial.md
- 大小: 746 字节
- 行数: 27
- 预览: # bold-editorial

High-impact magazine editorial with bold visual expression

## Color Palette

- Pr...

#### chalkboard.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\chalkboard.md
- 大小: 781 字节
- 行数: 27
- 预览: # chalkboard

Black chalkboard background with colorful chalk drawing style

## Color Palette

- Pri...

#### dark-atmospheric.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\dark-atmospheric.md
- 大小: 658 字节
- 行数: 26
- 预览: # dark-atmospheric

Dark moody aesthetic with glowing accent elements

## Color Palette

- Primary: ...

#### editorial-infographic.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\editorial-infographic.md
- 大小: 704 字节
- 行数: 27
- 预览: # editorial-infographic

Modern magazine-style editorial with clear visual storytelling

## Color Pa...

#### elegant.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\elegant.md
- 大小: 443 字节
- 行数: 24
- 预览: # elegant

Refined, sophisticated, understated

## Color Palette

- Primary: Soft coral (#E8A598), m...

#### fantasy-animation.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\fantasy-animation.md
- 大小: 751 字节
- 行数: 26
- 预览: # fantasy-animation

Whimsical hand-drawn animation style inspired by Ghibli and Disney

## Color Pa...

#### flat-doodle.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\flat-doodle.md
- 大小: 705 字节
- 行数: 28
- 预览: # flat-doodle

Cute, simple doodle illustrations with bold outlines

## Color Palette

- Primary: Br...

#### minimal.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\minimal.md
- 大小: 418 字节
- 行数: 24
- 预览: # minimal

Ultra-clean, zen-like, focused

## Color Palette

- Primary: Pure black (#000000), white ...

#### nature.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\nature.md
- 大小: 441 字节
- 行数: 23
- 预览: # nature

Organic, calm, earthy

## Color Palette

- Primary: Forest green (#276749), sage (#9AE6B4)...

#### notion.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\notion.md
- 大小: 610 字节
- 行数: 26
- 预览: # notion

Clean SaaS dashboard aesthetic with productivity tool styling

## Color Palette

- Primary...

#### pixel-art.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\pixel-art.md
- 大小: 684 字节
- 行数: 27
- 预览: # pixel-art

Retro 8-bit pixel art aesthetic with nostalgic gaming style

## Color Palette

- Primar...

#### playful.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\playful.md
- 大小: 484 字节
- 行数: 24
- 预览: # playful

Fun, creative, whimsical

## Color Palette

- Primary: Pastel pink (#FED7E2), mint (#C6F6...

#### retro.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\retro.md
- 大小: 450 字节
- 行数: 23
- 预览: # retro

Vintage, nostalgic, classic

## Color Palette

- Primary: Muted orange (#ED8936 at 70%), du...

#### vector-illustration.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\vector-illustration.md
- 大小: 768 字节
- 行数: 26
- 预览: # vector-illustration

Flat vector illustration with black outlines and retro soft colors

## Color ...

#### vintage.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\vintage.md
- 大小: 723 字节
- 行数: 27
- 预览: # vintage

Vintage aged-paper aesthetic with historical document styling

## Color Palette

- Primar...

#### warm.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\warm.md
- 大小: 444 字节
- 行数: 23
- 预览: # warm

Friendly, approachable, human-centered

## Color Palette

- Primary: Warm orange (#ED8936), ...

#### watercolor.md
- 路径: AI爆款进化实验室\projects\awkn-cover-image\references\styles\watercolor.md
- 大小: 665 字节
- 行数: 26
- 预览: # watercolor

Soft watercolor illustration style with hand-painted textures

## Color Palette

- Pri...

#### base-prompt.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\base-prompt.md
- 大小: 2220 字节
- 行数: 60
- 预览: Create a presentation slide image following these guidelines:

## Image Specifications

- **Type**: ...

#### modification-guide.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\modification-guide.md
- 大小: 2463 字节
- 行数: 86
- 预览: # Slide Modification Guide

Workflows for modifying individual slides after initial generation.

## ...

#### outline-template.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\outline-template.md
- 大小: 3810 字节
- 行数: 165
- 预览: # Outline Template

Standard structure for slide deck outlines with style instructions.

## Outline ...

#### bold-editorial.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\bold-editorial.md
- 大小: 2409 字节
- 行数: 71
- 预览: # bold-editorial

High-impact magazine editorial style with bold visual expression

## Design Aesthe...

#### chalkboard.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\chalkboard.md
- 大小: 2512 字节
- 行数: 69
- 预览: # chalkboard

Black chalkboard background with colorful chalk drawing style

## Design Aesthetic

Cl...

#### dark-atmospheric.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\dark-atmospheric.md
- 大小: 2435 字节
- 行数: 70
- 预览: # dark-atmospheric

Dark moody aesthetic with deep colors and glowing accent elements

## Design Aes...

#### fantasy-animation.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\fantasy-animation.md
- 大小: 2474 字节
- 行数: 70
- 预览: # fantasy-animation

Whimsical hand-drawn animation style inspired by classic fantasy illustration

...

#### minimal.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\minimal.md
- 大小: 2036 字节
- 行数: 65
- 预览: # minimal

Ultra-clean keynote style with maximum whitespace and zen-like simplicity

## Design Aest...

#### pixel-art.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\pixel-art.md
- 大小: 2446 字节
- 行数: 68
- 预览: # pixel-art

Retro 8-bit pixel art aesthetic with nostalgic gaming visual style

## Design Aesthetic...

#### vector-illustration.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\vector-illustration.md
- 大小: 2646 字节
- 行数: 73
- 预览: # vector-illustration

Flat vector illustration style with clear black outlines and retro soft color...

#### vintage.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\vintage.md
- 大小: 2499 字节
- 行数: 74
- 预览: # vintage

Vintage aged-paper aesthetic for historical and expedition-style presentations

## Design...

#### watercolor.md
- 路径: AI爆款进化实验室\projects\awkn-slide-deck\references\styles\watercolor.md
- 大小: 2349 字节
- 行数: 69
- 预览: # watercolor

Soft watercolor illustration style with hand-painted textures and natural warmth

## D...

#### base-prompt.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\base-prompt.md
- 大小: 1094 字节
- 行数: 34
- 预览: Create a Xiaohongshu (Little Red Book) style infographic following these guidelines:

## Image Speci...

#### comparison.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\layouts\comparison.md
- 大小: 552 字节
- 行数: 32
- 预览: # comparison

Side-by-side contrast layout

## Information Density

- 2 main sections with 2-4 point...

#### dense.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\layouts\dense.md
- 大小: 543 字节
- 行数: 32
- 预览: # dense

High information density, knowledge card style

## Information Density

- 5-8 key points pe...

#### list.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\layouts\list.md
- 大小: 489 字节
- 行数: 32
- 预览: # list

Enumeration and ranking format

## Information Density

- 4-7 items
- Whitespace: 30-40% of ...

#### sparse.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\layouts\sparse.md
- 大小: 516 字节
- 行数: 32
- 预览: # sparse

Minimal information, maximum impact

## Information Density

- 1-2 key points per image
- ...

#### outline-template.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\outline-template.md
- 大小: 4329 字节
- 行数: 229
- 预览: # Xiaohongshu Outline Template

Template for generating infographic series outlines.

## File Naming...

#### bold.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\styles\bold.md
- 大小: 456 字节
- 行数: 24
- 预览: # bold

High impact, attention-grabbing

## Color Palette

- Primary: Vibrant red (#E53E3E), orange ...

#### cute.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\styles\cute.md
- 大小: 465 字节
- 行数: 24
- 预览: # cute

Sweet, adorable, girly - classic Xiaohongshu aesthetic

## Color Palette

- Primary: Pink (#...

#### minimal.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\styles\minimal.md
- 大小: 437 字节
- 行数: 24
- 预览: # minimal

Ultra-clean, sophisticated

## Color Palette

- Primary: Black (#000000), white (#FFFFFF)...

#### pop.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\styles\pop.md
- 大小: 474 字节
- 行数: 24
- 预览: # pop

Vibrant, energetic, eye-catching

## Color Palette

- Primary: Bright red (#F56565), yellow (...

#### retro.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\styles\retro.md
- 大小: 434 字节
- 行数: 24
- 预览: # retro

Vintage, nostalgic, trendy

## Color Palette

- Primary: Muted orange, dusty pink (#FED7E2 ...

#### warm.md
- 路径: AI爆款进化实验室\projects\awkn-xhs-images\references\styles\warm.md
- 大小: 459 字节
- 行数: 24
- 预览: # warm

Cozy, friendly, approachable

## Color Palette

- Primary: Warm orange (#ED8936), golden yel...

#### project-introduction.md
- 路径: AI爆款进化实验室\projects\project-introduction.md
- 大小: 270 字节
- 行数: 10
- 预览: # 项目介绍

想让你读的书变简单吗？想让写文章变得超级容易？想让你的内容变成精美图片和漫画？来试试这个神奇工具！

不管你是学生、老师，还是做自媒体的朋友，这个工具都能帮到你。你只需要告诉我：书名、...

#### ark-api-adapter.js
- 路径: ark-api-adapter.js
- 大小: 8825 字节
- 行数: 338
- 预览: const https = require('https');
const fs = require('fs');
const path = require('path');

class ArkAp...

#### ark-simple-adapter.js
- 路径: ark-simple-adapter.js
- 大小: 2796 字节
- 行数: 129
- 预览: const https = require('https');

class ArkSimpleAdapter {
  constructor() {
    this.apiKey = 'c13b2...

#### 解决 GitHub SSH 密钥问题并推送代码.md
- 路径: AWKN-LAB\.trae\documents\解决 GitHub SSH 密钥问题并推送代码.md
- 大小: 1026 字节
- 行数: 80
- 预览: # 解决 GitHub SSH 密钥问题并推送代码

## 问题分析

用户尝试推送代码到 GitHub 时遇到 SSH 认证错误，提示 `Permission denied (publickey)`...

#### project.json
- 路径: AWKN-LAB\.vercel\project.json
- 大小: 113 字节
- 行数: 1
- 预览: {"projectId":"prj_m6ijJon9E8Ibnos76U5TyppvPn3e","orgId":"team_cMHTq4nUIdcNQHNhSriCRtB4","projectName...

#### README.txt
- 路径: AWKN-LAB\.vercel\README.txt
- 大小: 520 字节
- 行数: 12
- 预览: > Why do I have a folder named ".vercel" in my project?
The ".vercel" folder is created when you lin...

#### postcss.config.js
- 路径: AWKN-LAB\postcss.config.js
- 大小: 80 字节
- 行数: 7
- 预览: export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


#### vercel.json
- 路径: AWKN-LAB\vercel.json
- 大小: 155 字节
- 行数: 7
- 预览: {
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",...

#### 解决 GitHub SSH 密钥问题并推送代码.md
- 路径: AWKN-LAB - 副本\.trae\documents\解决 GitHub SSH 密钥问题并推送代码.md
- 大小: 1026 字节
- 行数: 80
- 预览: # 解决 GitHub SSH 密钥问题并推送代码

## 问题分析

用户尝试推送代码到 GitHub 时遇到 SSH 认证错误，提示 `Permission denied (publickey)`...

#### project.json
- 路径: AWKN-LAB - 副本\.vercel\project.json
- 大小: 113 字节
- 行数: 1
- 预览: {"projectId":"prj_m6ijJon9E8Ibnos76U5TyppvPn3e","orgId":"team_cMHTq4nUIdcNQHNhSriCRtB4","projectName...

#### README.txt
- 路径: AWKN-LAB - 副本\.vercel\README.txt
- 大小: 520 字节
- 行数: 12
- 预览: > Why do I have a folder named ".vercel" in my project?
The ".vercel" folder is created when you lin...

#### postcss.config.js
- 路径: AWKN-LAB - 副本\postcss.config.js
- 大小: 80 字节
- 行数: 7
- 预览: export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


#### vercel.json
- 路径: AWKN-LAB - 副本\vercel.json
- 大小: 155 字节
- 行数: 7
- 预览: {
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",...

#### package.json
- 路径: awkn-platform\backend\package.json
- 大小: 1048 字节
- 行数: 49
- 预览: {
  "name": "awkn-backend",
  "version": "1.0.0",
  "description": "AWKN认知觉醒平台后端服务",
  "main": "src/...

#### Work.js
- 路径: awkn-platform\backend\src\models\Work.js
- 大小: 890 字节
- 行数: 48
- 预览: const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  title: {
    type:...

#### architecture.js
- 路径: awkn-platform\backend\src\routes\architecture.js
- 大小: 970 字节
- 行数: 44
- 预览: const express = require('express');
const router = express.Router();
const { body, validationResult ...

#### comic.js
- 路径: awkn-platform\backend\src\routes\comic.js
- 大小: 1385 字节
- 行数: 58
- 预览: const express = require('express');
const router = express.Router();
const { body, validationResult ...

#### history.js
- 路径: awkn-platform\backend\src\routes\history.js
- 大小: 1875 字节
- 行数: 84
- 预览: const express = require('express');
const router = express.Router();

// 获取历史作品列表
router.get('/', as...

#### infographic.js
- 路径: awkn-platform\backend\src\routes\infographic.js
- 大小: 964 字节
- 行数: 44
- 预览: const express = require('express');
const router = express.Router();
const { body, validationResult ...

#### ppt.js
- 路径: awkn-platform\backend\src\routes\ppt.js
- 大小: 1089 字节
- 行数: 46
- 预览: const express = require('express');
const router = express.Router();
const { body, validationResult ...

#### recharge.js
- 路径: awkn-platform\backend\src\routes\recharge.js
- 大小: 6253 字节
- 行数: 251
- 预览: const express = require('express');
const router = express.Router();
const { body, validationResult ...

#### package-lock.json
- 路径: awkn-platform\frontend\package-lock.json
- 大小: 721 字节
- 行数: 31
- 预览: {
  "name": "awkn-frontend",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "pa...

#### postcss.config.js
- 路径: awkn-platform\frontend\postcss.config.js
- 大小: 82 字节
- 行数: 7
- 预览: module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


#### manifest.json
- 路径: awkn-platform\frontend\public\manifest.json
- 大小: 514 字节
- 行数: 25
- 预览: {
  "name": "AWKN - 认知觉醒平台",
  "short_name": "AWKN",
  "description": "帮助他人做认知觉醒的平台，包含内容创作工具",
  "st...

#### robots.txt
- 路径: awkn-platform\frontend\public\robots.txt
- 大小: 62 字节
- 行数: 5
- 预览: User-agent: *
Allow: /

Sitemap: https://awkn.com/sitemap.xml


#### tsconfig.json
- 路径: awkn-platform\frontend\tsconfig.json
- 大小: 598 字节
- 行数: 28
- 预览: {
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "...

#### package-lock.json
- 路径: awkn-platform\package-lock.json
- 大小: 213 字节
- 行数: 14
- 预览: {
  "name": "awkn-platform",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "pa...

#### package.json
- 路径: awkn-platform\package.json
- 大小: 771 字节
- 行数: 28
- 预览: {
  "name": "awkn-platform",
  "version": "1.0.0",
  "description": "AWKN - AI Cognitive Awakening P...

#### cache_artificial intelligence applications_general_auto.json
- 路径: cache\search\cache_artificial intelligence applications_general_auto.json
- 大小: 3456 字节
- 行数: 78
- 预览: {
  "id": "search_1771967877053_h3sao4i2o",
  "query": "artificial intelligence applications",
  "in...

#### cache_latest news_news_auto.json
- 路径: cache\search\cache_latest news_news_auto.json
- 大小: 1496 字节
- 行数: 48
- 预览: {
  "id": "search_1771967876852_d00ktmw8m",
  "query": "latest news",
  "intent": "news",
  "engine"...

#### cache_machine learning research papers 2024_research_auto.json
- 路径: cache\search\cache_machine learning research papers 2024_research_auto.json
- 大小: 2444 字节
- 行数: 58
- 预览: {
  "id": "search_1771967876650_izwxrxmo8",
  "query": "machine learning research papers 2024",
  "i...

#### cache_weather today_news_auto.json
- 路径: cache\search\cache_weather today_news_auto.json
- 大小: 1514 字节
- 行数: 48
- 预览: {
  "id": "search_1771967876752_70us4sfdj",
  "query": "weather today",
  "intent": "news",
  "engin...

#### cache_人工智能_general_auto.json
- 路径: cache\search\cache_人工智能_general_auto.json
- 大小: 1174 字节
- 行数: 42
- 预览: {
  "id": "search_1771954319217_cxqrcilii",
  "query": "人工智能",
  "intent": "general",
  "engine": "s...

#### cache_人工智能最新发展_general_auto.json
- 路径: cache\search\cache_人工智能最新发展_general_auto.json
- 大小: 2235 字节
- 行数: 59
- 预览: {
  "id": "search_1771967876444_nilafwrgk",
  "query": "人工智能最新发展",
  "intent": "general",
  "engine"...

#### cache_天气_general_auto.json
- 路径: cache\search\cache_天气_general_auto.json
- 大小: 877 字节
- 行数: 34
- 预览: {
  "id": "search_1771954319218_pdqv01k7q",
  "query": "天气",
  "intent": "general",
  "engine": "ser...

#### cache_新闻_general_auto.json
- 路径: cache\search\cache_新闻_general_auto.json
- 大小: 877 字节
- 行数: 34
- 预览: {
  "id": "search_1771954319219_qsigjxqgl",
  "query": "新闻",
  "intent": "general",
  "engine": "ser...

#### analysis_1771954319215_yweq8fzeb.json
- 路径: cache\sticker\analysis_1771954319215_yweq8fzeb.json
- 大小: 351 字节
- 行数: 13
- 预览: {
  "id": "analysis_1771954319215_yweq8fzeb",
  "imagePath": "C:\\Users\\10919\\Desktop\\AI\\test-im...

#### anti-degeneration-lock.js
- 路径: capabilities\anti-degeneration-lock.js
- 大小: 12729 字节
- 行数: 456
- 预览: /**
 * 反进化锁定系统 (Anti-Degeneration Lock System)
 * 确保进化过程不会引入不稳定性或降低现有能力
 * 完整实现 ADL 协议
 */

class An...

#### http-resilience.js
- 路径: capabilities\http-resilience.js
- 大小: 4107 字节
- 行数: 158
- 预览: const https = require('https');
const http = require('http');

class HttpResilience {
  constructor(...

#### config-template.json
- 路径: chatgpt-on-wechat-master\config-template.json
- 大小: 964 字节
- 行数: 38
- 预览: {
  "channel_type": "web",
  "model": "",
  "open_ai_api_key": "YOUR API KEY",
  "claude_api_key": "...

#### config.json
- 路径: chatgpt-on-wechat-master\config.json
- 大小: 1499 字节
- 行数: 27
- 预览: {
  "channel_type": "wx",
  "model": "",
  "open_ai_api_key": "",
  "claude_api_key": "",
  "text_to...

#### config.json
- 路径: chatgpt-on-wechat-master\plugins\banwords\config.json
- 大小: 28 字节
- 行数: 3
- 预览: {
    "action": "ignore"
}

#### README.md
- 路径: chatgpt-on-wechat-master\plugins\dungeon\README.md
- 大小: 122 字节
- 行数: 5
- 预览: 玩地牢游戏的聊天插件，触发方法如下：

- `$开始冒险 <背景故事>` - 以<背景故事>开始一个地牢游戏，不填写会使用默认背景故事。之后聊天中你的所有消息会帮助ai完善这个故事。
- `$停止冒险...

#### config.json
- 路径: chatgpt-on-wechat-master\plugins\godcmd\config.json
- 大小: 48 字节
- 行数: 4
- 预览: {
    "password": "",
    "admin_users": []
}

#### config.json
- 路径: chatgpt-on-wechat-master\plugins\keyword\config.json
- 大小: 23 字节
- 行数: 3
- 预览: {
    "keyword": {}
}

#### plugins.json
- 路径: chatgpt-on-wechat-master\plugins\plugins.json
- 大小: 941 字节
- 行数: 44
- 预览: {
    "plugins": {
        "Godcmd": {
            "enabled": true,
            "priority": 999...

#### source.json
- 路径: chatgpt-on-wechat-master\plugins\source.json
- 大小: 1245 字节
- 行数: 41
- 预览: {
  "repo": {
    "sdwebui": {
      "url": "https://github.com/lanvent/plugin_sdwebui.git",
      "...

#### requirements-optional.txt
- 路径: chatgpt-on-wechat-master\requirements-optional.txt
- 大小: 778 字节
- 行数: 50
- 预览: tiktoken>=0.3.2 # openai calculate token

#voice
pydub>=0.25.1 # need ffmpeg
SpeechRecognition # goo...

#### requirements.txt
- 路径: chatgpt-on-wechat-master\requirements.txt
- 大小: 157 字节
- 行数: 12
- 预览: openai==0.27.8
HTMLParser>=0.0.2
PyQRCode==1.2.1
qrcode==7.4.2
requests>=2.28.2
chardet>=5.1.0
Pillo...

#### LICENSE.txt
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip\_vendor\cachecontrol\LICENSE.txt
- 大小: 558 字节
- 行数: 14
- 预览: Copyright 2012-2021  Eric Larson

Licensed under the Apache License, Version 2.0 (the "License");
yo...

#### LICENSE.txt
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip\_vendor\dependency_groups\LICENSE.txt
- 大小: 1099 字节
- 行数: 10
- 预览: MIT License

Copyright (c) 2024-present Stephen Rosen <sirosen0@gmail.com>

Permission is hereby gra...

#### LICENSE.txt
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip\_vendor\distlib\LICENSE.txt
- 大小: 14531 字节
- 行数: 285
- 预览: A. HISTORY OF THE SOFTWARE
==========================

Python was created in the early 1990s by Guid...

#### LICENSE.md
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip\_vendor\idna\LICENSE.md
- 大小: 1541 字节
- 行数: 32
- 预览: BSD 3-Clause License

Copyright (c) 2013-2024, Kim Davies and contributors.
All rights reserved.

Re...

#### LICENSE.txt
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip\_vendor\urllib3\LICENSE.txt
- 大小: 1115 字节
- 行数: 22
- 预览: MIT License

Copyright (c) 2008-2020 Andrey Petrov and contributors (see CONTRIBUTORS.txt)

Permissi...

#### vendor.txt
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip\_vendor\vendor.txt
- 大小: 343 字节
- 行数: 20
- 预览: CacheControl==0.14.3
distlib==0.4.0
distro==1.9.0
msgpack==1.1.2
packaging==25.0
platformdirs==4.5.0...

#### entry_points.txt
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip-25.3.dist-info\entry_points.txt
- 大小: 84 字节
- 行数: 5
- 预览: [console_scripts]
pip=pip._internal.cli.main:main
pip3=pip._internal.cli.main:main



#### AUTHORS.txt
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip-25.3.dist-info\licenses\AUTHORS.txt
- 大小: 11413 字节
- 行数: 843
- 预览: @Switch01
A_Rog
Aakanksha Agrawal
Abhinav Sagar
ABHYUDAY PRATAP SINGH
abs51295
AceGentile
Adam Chain...

#### LICENSE.txt
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip-25.3.dist-info\licenses\LICENSE.txt
- 大小: 1093 字节
- 行数: 21
- 预览: Copyright (c) 2008-present The pip developers (see AUTHORS.txt file)

Permission is hereby granted, ...

#### LICENSE.txt
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip-25.3.dist-info\licenses\src\pip\_vendor\cachecontrol\LICENSE.txt
- 大小: 558 字节
- 行数: 14
- 预览: Copyright 2012-2021  Eric Larson

Licensed under the Apache License, Version 2.0 (the "License");
yo...

#### LICENSE.txt
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip-25.3.dist-info\licenses\src\pip\_vendor\dependency_groups\LICENSE.txt
- 大小: 1099 字节
- 行数: 10
- 预览: MIT License

Copyright (c) 2024-present Stephen Rosen <sirosen0@gmail.com>

Permission is hereby gra...

#### LICENSE.txt
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip-25.3.dist-info\licenses\src\pip\_vendor\distlib\LICENSE.txt
- 大小: 14531 字节
- 行数: 285
- 预览: A. HISTORY OF THE SOFTWARE
==========================

Python was created in the early 1990s by Guid...

#### LICENSE.md
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip-25.3.dist-info\licenses\src\pip\_vendor\idna\LICENSE.md
- 大小: 1541 字节
- 行数: 32
- 预览: BSD 3-Clause License

Copyright (c) 2013-2024, Kim Davies and contributors.
All rights reserved.

Re...

#### LICENSE.txt
- 路径: chatgpt-on-wechat-master\venv\Lib\site-packages\pip-25.3.dist-info\licenses\src\pip\_vendor\urllib3\LICENSE.txt
- 大小: 1115 字节
- 行数: 22
- 预览: MIT License

Copyright (c) 2008-2020 Andrey Petrov and contributors (see CONTRIBUTORS.txt)

Permissi...

#### claim-task.js
- 路径: claim-task.js
- 大小: 1364 字节
- 行数: 55
- 预览: const https = require('https');

const taskId = 'cmlxl3x3q166qpk2nit46pllt'; // Knowledge Graph task...

#### cm.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\commands\git\cm.md
- 大小: 1485 字节
- 行数: 25
- 预览: ---
description: Stage all files and create a commit.
---

Stage, commit and push all code in the cu...

#### cp.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\commands\git\cp.md
- 大小: 1504 字节
- 行数: 24
- 预览: ---
description: Stage, commit and push all code in the current branch
---

Stage, commit and push a...

#### pr.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\commands\git\pr.md
- 大小: 384 字节
- 行数: 15
- 预览: ---
description: Create a pull request
argument-hint: [to-branch] [from-branch]
---

## Variables

T...

#### micro-interactions.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\aesthetic\references\micro-interactions.md
- 大小: 1732 字节
- 行数: 54
- 预览: # Micro-Interactions: Satisfying Experience

## SATISFYING: Adding Micro-Interactions

### Duration ...

#### PERSISTENT-BROWSER.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\PERSISTENT-BROWSER.md
- 大小: 3146 字节
- 行数: 108
- 预览: # Persistent Browser Mode

These scripts enable you to launch Chrome once and keep it open for multi...

#### selector.test.js
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\chrome-devtools\scripts\__tests__\selector.test.js
- 大小: 6525 字节
- 行数: 211
- 预览: /**
 * Tests for selector parsing library
 * Run with: node --test __tests__/selector.test.js
 */
im...

#### context-degradation.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\context-engineering\references\context-degradation.md
- 大小: 3094 字节
- 行数: 94
- 预览: # Context Degradation Patterns

Predictable degradation as context grows. Not binary - a continuum.
...

#### memory-systems.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\context-engineering\references\memory-systems.md
- 大小: 2552 字节
- 行数: 89
- 预览: # Memory Systems

Architectures for persistent context beyond the window.

## Memory Layer Architect...

#### mongodb-crud.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\databases\references\mongodb-crud.md
- 大小: 8355 字节
- 行数: 409
- 预览: # MongoDB CRUD Operations

CRUD operations (Create, Read, Update, Delete) in MongoDB with query oper...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\databases\scripts\tests\requirements.txt
- 大小: 69 字节
- 行数: 5
- 预览: pytest>=7.0.0
pytest-cov>=4.0.0
pytest-mock>=3.10.0
mongomock>=4.1.0


#### cloudflare-d1-kv.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\cloudflare-d1-kv.md
- 大小: 2549 字节
- 行数: 124
- 预览: # Cloudflare D1 & KV

## D1 (SQLite Database)

### Setup
```bash
# Create database
wrangler d1 creat...

#### kubernetes-kubectl.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\kubernetes-kubectl.md
- 大小: 1737 字节
- 行数: 75
- 预览: # kubectl Essential Commands

## Cluster & Node
```bash
kubectl cluster-info
kubectl get nodes
kubec...

#### kubernetes-troubleshooting-advanced.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\kubernetes-troubleshooting-advanced.md
- 大小: 1442 字节
- 行数: 75
- 预览: # Kubernetes Troubleshooting Advanced

## Node Issues
```bash
kubectl describe node <node-name> | gr...

#### kubernetes-troubleshooting.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\references\kubernetes-troubleshooting.md
- 大小: 1424 字节
- 行数: 50
- 预览: # Kubernetes Troubleshooting

## Debugging Workflow

```bash
# 1. Overview
kubectl get pods -o wide
...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\devops\scripts\tests\requirements.txt
- 大小: 52 字节
- 行数: 4
- 预览: pytest>=7.0.0
pytest-cov>=4.0.0
pytest-mock>=3.10.0


#### component-patterns.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-development\resources\component-patterns.md
- 大小: 10796 字节
- 行数: 502
- 预览: # Component Patterns

Modern React component architecture for the application emphasizing type safet...

#### loading-and-error-states.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-development\resources\loading-and-error-states.md
- 大小: 11998 字节
- 行数: 501
- 预览: # Loading & Error States

**CRITICAL**: Proper loading and error state handling prevents layout shif...

#### styling-guide.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\frontend-development\resources\styling-guide.md
- 大小: 7865 字节
- 行数: 428
- 预览: # Styling Guide

Modern styling patterns for using MUI v7 sx prop, inline styles, and theme integrat...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-builder\scripts\requirements.txt
- 大小: 29 字节
- 行数: 3
- 预览: anthropic>=0.39.0
mcp>=1.1.0


#### package.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-management\scripts\package.json
- 大小: 539 字节
- 行数: 22
- 预览: {
  "name": "mcp-management-scripts",
  "version": "1.0.0",
  "type": "module",
  "description": "MC...

#### tsconfig.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\mcp-management\scripts\tsconfig.json
- 大小: 329 字节
- 行数: 16
- 预览: {
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "...

#### ffmpeg-encoding.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\media-processing\references\ffmpeg-encoding.md
- 大小: 9463 字节
- 行数: 359
- 预览: # FFmpeg Video & Audio Encoding

Complete guide to codec selection, quality optimization, and hardwa...

#### ffmpeg-streaming.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\media-processing\references\ffmpeg-streaming.md
- 大小: 9562 字节
- 行数: 404
- 预览: # FFmpeg Streaming & Live Video

Complete guide to HLS/DASH streaming, live streaming platforms, and...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\media-processing\scripts\tests\requirements.txt
- 大小: 32 字节
- 行数: 3
- 预览: pytest>=7.4.0
pytest-cov>=4.1.0


#### repos.example.json
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\repomix\scripts\repos.example.json
- 大小: 252 字节
- 行数: 16
- 预览: [
  {
    "path": "/path/to/local/repo",
    "output": "local-repo-output.xml"
  },
  {
    "path": ...

#### 02-loaders.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\02-loaders.md
- 大小: 4060 字节
- 行数: 170
- 预览: # Asset Loading

Load 3D models, textures, and other assets.

## Loading Manager

Coordinate multipl...

#### 03-textures.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\03-textures.md
- 大小: 4238 字节
- 行数: 171
- 预览: # Textures

Map images and data onto 3D surfaces.

## Texture Types

### Standard 2D Texture
```java...

#### 06-animations.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\06-animations.md
- 大小: 4780 字节
- 行数: 215
- 预览: # Animations

Animate objects, cameras, and imported models.

## Animation System

Three.js uses Ani...

#### 08-interaction.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\08-interaction.md
- 大小: 6756 字节
- 行数: 268
- 预览: # Interaction & Picking

Handle user input and object interaction.

## Mouse/Touch Raycasting

Detec...

#### 10-controls.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\10-controls.md
- 大小: 5980 字节
- 行数: 260
- 预览: # Camera Controls (Addons)

Interactive camera navigation systems.

## OrbitControls (Most Common)

...

#### 11-materials-advanced.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\11-materials-advanced.md
- 大小: 6009 字节
- 行数: 271
- 预览: # Three.js - Advanced Materials

PBR materials and custom shaders.

## MeshStandardMaterial (PBR)

P...

#### 15-specialized-loaders.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\15-specialized-loaders.md
- 大小: 7549 字节
- 行数: 334
- 预览: # Specialized Loaders

Domain-specific file format loaders.

## SVG Loader

Load and extrude SVG pat...

#### 16-webgpu.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\threejs\references\16-webgpu.md
- 大小: 7118 字节
- 行数: 303
- 预览: # WebGPU Rendering

Modern GPU API for next-generation graphics.

## WebGPU Renderer

Next-generatio...

#### tailwind-responsive.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\references\tailwind-responsive.md
- 大小: 8270 字节
- 行数: 383
- 预览: # Tailwind CSS Responsive Design

Mobile-first breakpoints, responsive utilities, and adaptive layou...

#### tailwind-utilities.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\references\tailwind-utilities.md
- 大小: 9980 字节
- 行数: 456
- 预览: # Tailwind CSS Utility Reference

Core utility classes for layout, spacing, typography, colors, bord...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\ui-styling\scripts\tests\requirements.txt
- 大小: 52 字节
- 行数: 4
- 预览: pytest>=7.4.0
pytest-cov>=4.1.0
pytest-mock>=3.11.1


#### nextjs-app-router.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-frameworks\references\nextjs-app-router.md
- 大小: 8988 字节
- 行数: 466
- 预览: # Next.js App Router Architecture

Modern file-system based routing with React Server Components sup...

#### nextjs-server-components.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-frameworks\references\nextjs-server-components.md
- 大小: 10790 字节
- 行数: 496
- 预览: # Next.js Server Components

React Server Components (RSC) architecture, patterns, and best practice...

#### remix-icon-integration.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-frameworks\references\remix-icon-integration.md
- 大小: 10810 字节
- 行数: 604
- 预览: # RemixIcon Integration Guide

Installation, usage, customization, and accessibility for RemixIcon l...

#### requirements.txt
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-frameworks\scripts\tests\requirements.txt
- 大小: 52 字节
- 行数: 4
- 预览: pytest>=7.0.0
pytest-cov>=4.0.0
pytest-mock>=3.10.0


#### accessibility-testing.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\accessibility-testing.md
- 大小: 1959 字节
- 行数: 85
- 预览: # Accessibility Testing (a11y)

## WCAG 2.1 AA Checklist

### Perceivable
- [ ] Images have meaningf...

#### api-testing.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\api-testing.md
- 大小: 1806 字节
- 行数: 79
- 预览: # API Testing

## Supertest (Jest/Vitest)

```javascript
import request from 'supertest';
import app...

#### functional-testing-checklist.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\functional-testing-checklist.md
- 大小: 2751 字节
- 行数: 89
- 预览: # Functional Testing Checklist

## Core Features

- [ ] Primary user workflows execute end-to-end
- ...

#### interactive-testing-patterns.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\interactive-testing-patterns.md
- 大小: 2545 字节
- 行数: 90
- 预览: # Interactive Testing Patterns

## Form Testing

```javascript
// Text input validation
test('valida...

#### performance-core-web-vitals.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\performance-core-web-vitals.md
- 大小: 1532 字节
- 行数: 69
- 预览: # Performance & Core Web Vitals Testing

## Core Web Vitals (Google Ranking Factor)

| Metric | Targ...

#### pre-release-checklist.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\pre-release-checklist.md
- 大小: 1872 字节
- 行数: 76
- 预览: # Pre-Release Testing Checklist

## Cross-Browser & Responsive

- [ ] Chrome, Firefox, Safari, Edge ...

#### shadow-dom-testing.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\shadow-dom-testing.md
- 大小: 1687 字节
- 行数: 71
- 预览: # Shadow DOM & Web Components Testing

## Challenges

- CSS encapsulation breaks selectors
- Element...

#### testing-pyramid-strategy.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\testing-pyramid-strategy.md
- 大小: 1595 字节
- 行数: 71
- 预览: # Testing Pyramid Strategy

## Classic 70-20-10 Ratio

```
       E2E (10%)        Slow, expensive, ...

#### unit-integration-testing.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\unit-integration-testing.md
- 大小: 1822 字节
- 行数: 92
- 预览: # Unit & Integration Testing

## Framework Selection

| Framework | Speed | Best For |
|-----------|...

#### vulnerability-payloads.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\.claude\skills\web-testing\references\vulnerability-payloads.md
- 大小: 1286 字节
- 行数: 94
- 预览: # Vulnerability Test Payloads

## SQL Injection

### Text Input
```
' OR '1'='1
' OR 1=1 --
'; DROP ...

#### mcp-manager.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\platform-tools\agents\mcp-manager.md
- 大小: 38 字节
- 行数: 1
- 预览: ../../../.claude/agents/mcp-manager.md

#### use-mcp.md
- 路径: claudekit-skills\claudekit-skills-171212d516df476480f224d0f77ac02104c362ba\plugins\platform-tools\commands\use-mcp.md
- 大小: 36 字节
- 行数: 1
- 预览: ../../../.claude/commands/use-mcp.md

#### clean-test.js
- 路径: clean-test.js
- 大小: 578 字节
- 行数: 21
- 预览: // 清理测试文件，只测试热点信息缓存系统
console.log('=== 开始清理测试热点信息缓存系统 ===\n');

const { hotInfoCache } = require('./...

#### collaborations.json
- 路径: collaborations.json
- 大小: 455 字节
- 行数: 9
- 预览: [
  {
    "session_id": "cmm0m2t3r04bio12qzcd9zgvw",
    "session_title": "Recurring error in evolut...

#### green-tea.json
- 路径: company-brain\data\agents\green-tea.json
- 大小: 462 字节
- 行数: 21
- 预览: {
  "id": "green-tea",
  "name": "绿茶",
  "type": "psychological",
  "status": "active",
  "capabilit...

#### package-lock.json
- 路径: company-brain\package-lock.json
- 大小: 47348 字节
- 行数: 1354
- 预览: {
  "name": "company-brain",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "pa...

#### package.json
- 路径: company-brain\package.json
- 大小: 740 字节
- 行数: 35
- 预览: {
  "name": "company-brain",
  "version": "1.0.0",
  "description": "公司大脑 - 智能体调度中心",
  "main": "ind...

#### test-scheduler-system.js
- 路径: company-brain\scripts\test-scheduler-system.js
- 大小: 4108 字节
- 行数: 154
- 预览: // 调度系统测试脚本

const SchedulerSystem = require('../src/scheduler/index.js');

async function testSched...

#### green-tea.json
- 路径: company-brain\test-data\agents\green-tea.json
- 大小: 462 字节
- 行数: 21
- 预览: {
  "id": "green-tea",
  "name": "绿茶",
  "type": "psychological",
  "status": "active",
  "capabilit...

#### test-agent-1.json
- 路径: company-brain\test-data\agents\test-agent-1.json
- 大小: 399 字节
- 行数: 19
- 预览: {
  "id": "test-agent-1",
  "name": "测试智能体1",
  "type": "business",
  "capabilities": [
    "busines...

#### test-agent-2.json
- 路径: company-brain\test-data\agents\test-agent-2.json
- 大小: 400 字节
- 行数: 19
- 预览: {
  "id": "test-agent-2",
  "name": "测试智能体2",
  "type": "psychological",
  "capabilities": [
    "ps...

#### complete-task.js
- 路径: complete-task.js
- 大小: 1187 字节
- 行数: 47
- 预览: const https = require('https');

const taskId = 'cmlxl3x3q166qpk2nit46pllt'; // Knowledge Graph task...

#### ark_config.json
- 路径: configs\ark_config.json
- 大小: 686 字节
- 行数: 32
- 预览: {
  "providers": {
    "ark": {
      "baseUrl": "https://ark.cn-beijing.volces.com/api/v3",
      "...

#### llm_config.json
- 路径: configs\llm_config.json
- 大小: 141 字节
- 行数: 8
- 预览: {
  "provider": "local",
  "model_name": "none",
  "api_key": "none",
  "api_base": "none",
  "requi...

#### settings.json
- 路径: configs\settings.json
- 大小: 30 字节
- 行数: 3
- 预览: {
  "force_local_mode": true
}

#### 第一性原理.md
- 路径: content-library\思维模型库\第一性原理.md
- 大小: 1468 字节
- 行数: 72
- 预览: # 第一性原理

## 核心概念
第一性原理是一种从最基本的事实出发，通过逻辑推理构建知识体系的思维方法。它要求我们打破传统思维的束缚，直接面对问题的本质，重新构建解决方案。

## 底层逻辑
第一性...

#### 第一性原理分享.md
- 路径: content-library\朋友圈\第一性原理分享.md
- 大小: 431 字节
- 行数: 25
- 预览: # 第一性原理：打破思维定式的终极工具

📌 **核心概念**
第一性原理是从最基本事实出发，通过逻辑推理构建解决方案的思维方法。它要求我们打破传统思维的束缚，直接面对问题的本质。

💡 **实战...

#### 第一性原理：创新思维的底层逻辑.md
- 路径: content-library\视频号\第一性原理：创新思维的底层逻辑.md
- 大小: 1489 字节
- 行数: 80
- 预览: # 第一性原理：创新思维的底层逻辑

## 视频脚本

### 开场（0:00-0:30）
**画面**：主持人面对镜头，背景简洁，有思维模型相关的视觉元素
**旁白**：
"你好，欢迎来到思维模型课...

#### package.json
- 路径: content-pipeline\.next\build\package.json
- 大小: 20 字节
- 行数: 1
- 预览: {"type": "commonjs"}

#### package.json
- 路径: content-pipeline\.next\dev\build\package.json
- 大小: 20 字节
- 行数: 1
- 预览: {"type": "commonjs"}

#### build-manifest.json
- 路径: content-pipeline\.next\dev\build-manifest.json
- 大小: 952 字节
- 行数: 25
- 预览: {
  "pages": {
    "/_app": []
  },
  "devFiles": [],
  "polyfillFiles": [
    "static/chunks/ec22b_...

#### next-devtools-config.json
- 路径: content-pipeline\.next\dev\cache\next-devtools-config.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### fallback-build-manifest.json
- 路径: content-pipeline\.next\dev\fallback-build-manifest.json
- 大小: 214 字节
- 行数: 12
- 预览: {
  "pages": {
    "/_app": []
  },
  "devFiles": [],
  "polyfillFiles": [],
  "lowPriorityFiles": [...

#### package.json
- 路径: content-pipeline\.next\dev\package.json
- 大小: 24 字节
- 行数: 3
- 预览: {
  "type": "commonjs"
}

#### prerender-manifest.json
- 路径: content-pipeline\.next\dev\prerender-manifest.json
- 大小: 354 字节
- 行数: 11
- 预览: {
  "version": 4,
  "routes": {},
  "dynamicRoutes": {},
  "notFoundRoutes": [],
  "preview": {
    ...

#### routes-manifest.json
- 路径: content-pipeline\.next\dev\routes-manifest.json
- 大小: 288 字节
- 行数: 1
- 预览: {"version":3,"caseSensitive":false,"basePath":"","rewrites":{"beforeFiles":[],"afterFiles":[],"fallb...

#### app-paths-manifest.json
- 路径: content-pipeline\.next\dev\server\app\page\app-paths-manifest.json
- 大小: 28 字节
- 行数: 3
- 预览: {
  "/page": "app/page.js"
}

#### build-manifest.json
- 路径: content-pipeline\.next\dev\server\app\page\build-manifest.json
- 大小: 889 字节
- 行数: 22
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/ec22b_next_dist_bui...

#### next-font-manifest.json
- 路径: content-pipeline\.next\dev\server\app\page\next-font-manifest.json
- 大小: 204 字节
- 行数: 10
- 预览: {
  "pages": {},
  "app": {
    "[project]/content-pipeline/app/page": [
      "static/media/83afe27...

#### react-loadable-manifest.json
- 路径: content-pipeline\.next\dev\server\app\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: content-pipeline\.next\dev\server\app\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: content-pipeline\.next\dev\server\app\page.js
- 大小: 3620 字节
- 行数: 15
- 预览: var R=require("../chunks/ssr/[turbopack]_runtime.js")("server/app/page.js")
R.c("server/chunks/ssr/e...

#### page_client-reference-manifest.js
- 路径: content-pipeline\.next\dev\server\app\page_client-reference-manifest.js
- 大小: 18529 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/page"] = {"...

#### app-paths-manifest.json
- 路径: content-pipeline\.next\dev\server\app\_not-found\page\app-paths-manifest.json
- 大小: 50 字节
- 行数: 3
- 预览: {
  "/_not-found/page": "app/_not-found/page.js"
}

#### build-manifest.json
- 路径: content-pipeline\.next\dev\server\app\_not-found\page\build-manifest.json
- 大小: 889 字节
- 行数: 22
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/ec22b_next_dist_bui...

#### next-font-manifest.json
- 路径: content-pipeline\.next\dev\server\app\_not-found\page\next-font-manifest.json
- 大小: 215 字节
- 行数: 10
- 预览: {
  "pages": {},
  "app": {
    "[project]/content-pipeline/app/_not-found/page": [
      "static/me...

#### react-loadable-manifest.json
- 路径: content-pipeline\.next\dev\server\app\_not-found\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: content-pipeline\.next\dev\server\app\_not-found\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: content-pipeline\.next\dev\server\app\_not-found\page.js
- 大小: 2927 字节
- 行数: 13
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/_not-found/page.js")
R.c("serve...

#### page_client-reference-manifest.js
- 路径: content-pipeline\.next\dev\server\app\_not-found\page_client-reference-manifest.js
- 大小: 15620 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/_not-found/...

#### app-paths-manifest.json
- 路径: content-pipeline\.next\dev\server\app-paths-manifest.json
- 大小: 76 字节
- 行数: 4
- 预览: {
  "/_not-found/page": "app/_not-found/page.js",
  "/page": "app/page.js"
}

#### content-pipeline_647814da._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\content-pipeline_647814da._.js
- 大小: 9461 字节
- 行数: 105
- 预览: module.exports = [
"[project]/content-pipeline/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_c...

#### content-pipeline_app_f90fb356._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\content-pipeline_app_f90fb356._.js
- 大小: 1091 字节
- 行数: 22
- 预览: module.exports = [
"[project]/content-pipeline/app/favicon.ico (static in ecmascript, tag client)", ...

#### content-pipeline__next-internal_server_app_page_actions_af2e8b70.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\content-pipeline__next-internal_server_app_page_actions_af2e8b70.js
- 大小: 285 字节
- 行数: 7
- 预览: module.exports = [
"[project]/content-pipeline/.next-internal/server/app/page/actions.js [app-rsc] (...

#### content-pipeline__next-internal_server_app__not-found_page_actions_cd7f8898.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\content-pipeline__next-internal_server_app__not-found_page_actions_cd7f8898.js
- 大小: 307 字节
- 行数: 7
- 预览: module.exports = [
"[project]/content-pipeline/.next-internal/server/app/_not-found/page/actions.js ...

#### ec22b_next_bc92d784._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_next_bc92d784._.js
- 大小: 2346 字节
- 行数: 55
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/pages/_app.js [ssr] (ecmascrip...

#### ec22b_next_dist_client_components_builtin_forbidden_cea0a235.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_next_dist_client_components_builtin_forbidden_cea0a235.js
- 大小: 1420 字节
- 行数: 32
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/client/components/builtin/forb...

#### ec22b_next_dist_client_components_builtin_global-error_168694c0.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_next_dist_client_components_builtin_global-error_168694c0.js
- 大小: 2599 字节
- 行数: 24
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/client/components/builtin/glob...

#### ec22b_next_dist_client_components_builtin_unauthorized_a2406be6.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_next_dist_client_components_builtin_unauthorized_a2406be6.js
- 大小: 1445 字节
- 行数: 32
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/client/components/builtin/unau...

#### ec22b_next_dist_client_components_c0c0939c._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\ec22b_next_dist_client_components_c0c0939c._.js
- 大小: 6265 字节
- 行数: 149
- 预览: module.exports = [
"[project]/content-pipeline/node_modules/next/dist/client/components/styles/acces...

#### [externals]_next_dist_1aaf5479._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[externals]_next_dist_1aaf5479._.js
- 大小: 2533 字节
- 行数: 38
- 预览: module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [extern...

#### [externals]_next_dist_c80f7c8f._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[externals]_next_dist_c80f7c8f._.js
- 大小: 2533 字节
- 行数: 38
- 预览: module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [extern...

#### [externals]_next_dist_shared_lib_no-fallback-error_external_59b92b38.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[externals]_next_dist_shared_lib_no-fallback-error_external_59b92b38.js
- 大小: 391 字节
- 行数: 8
- 预览: module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/...

#### [externals]__e6a4d965._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[externals]__e6a4d965._.js
- 大小: 1351 字节
- 行数: 32
- 预览: module.exports = [
"[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)", ((__turbopac...

#### [externals]__e8a2741f._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[externals]__e8a2741f._.js
- 大小: 3417 字节
- 行数: 62
- 预览: module.exports = [
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, expor...

#### [root-of-the-server]__46cad918._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[root-of-the-server]__46cad918._.js
- 大小: 91618 字节
- 行数: 895
- 预览: module.exports = [
"[project]/content-pipeline/app/favicon.ico.mjs { IMAGE => \"[project]/content-pi...

#### [root-of-the-server]__9f0ccc61._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[root-of-the-server]__9f0ccc61._.js
- 大小: 1135 字节
- 行数: 16
- 预览: module.exports = [
"[project]/content-pipeline/app/favicon.ico.mjs { IMAGE => \"[project]/content-pi...

#### [root-of-the-server]__a83103cd._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[root-of-the-server]__a83103cd._.js
- 大小: 7131 字节
- 行数: 155
- 预览: module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [extern...

#### [root-of-the-server]__bcfdc03c._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[root-of-the-server]__bcfdc03c._.js
- 大小: 4119 字节
- 行数: 50
- 预览: module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [extern...

#### [root-of-the-server]__cf7decc8._.js
- 路径: content-pipeline\.next\dev\server\chunks\ssr\[root-of-the-server]__cf7decc8._.js
- 大小: 5201 字节
- 行数: 58
- 预览: module.exports = [
"[project]/content-pipeline/app/favicon.ico.mjs { IMAGE => \"[project]/content-pi...

#### interception-route-rewrite-manifest.js
- 路径: content-pipeline\.next\dev\server\interception-route-rewrite-manifest.js
- 大小: 48 字节
- 行数: 1
- 预览: self.__INTERCEPTION_ROUTE_REWRITE_MANIFEST="[]";

#### middleware-manifest.json
- 路径: content-pipeline\.next\dev\server\middleware-manifest.json
- 大小: 83 字节
- 行数: 6
- 预览: {
  "version": 3,
  "middleware": {},
  "sortedMiddleware": [],
  "functions": {}
}

#### next-font-manifest.js
- 路径: content-pipeline\.next\dev\server\next-font-manifest.js
- 大小: 380 字节
- 行数: 1
- 预览: self.__NEXT_FONT_MANIFEST="{\n  \"app\": {\n    \"[project]/content-pipeline/app/_not-found/page\": ...

#### next-font-manifest.json
- 路径: content-pipeline\.next\dev\server\next-font-manifest.json
- 大小: 324 字节
- 行数: 13
- 预览: {
  "app": {
    "[project]/content-pipeline/app/_not-found/page": [
      "static/media/83afe278b6a...

#### build-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_app\build-manifest.json
- 大小: 823 字节
- 行数: 23
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [],
  "lowPriorityFiles": [],
  "rootMai...

#### client-build-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_app\client-build-manifest.json
- 大小: 54 字节
- 行数: 5
- 预览: {
  "/_app": [
    "static/chunks/pages/_app.js"
  ]
}

#### next-font-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_app\next-font-manifest.json
- 大小: 94 字节
- 行数: 6
- 预览: {
  "pages": {},
  "app": {},
  "appUsingSizeAdjust": false,
  "pagesUsingSizeAdjust": false
}

#### pages-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_app\pages-manifest.json
- 大小: 30 字节
- 行数: 3
- 预览: {
  "/_app": "pages/_app.js"
}

#### react-loadable-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_app\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### _app.js
- 路径: content-pipeline\.next\dev\server\pages\_app.js
- 大小: 318 字节
- 行数: 5
- 预览: var R=require("../chunks/ssr/[turbopack]_runtime.js")("server/pages/_app.js")
R.c("server/chunks/ssr...

#### next-font-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_document\next-font-manifest.json
- 大小: 94 字节
- 行数: 6
- 预览: {
  "pages": {},
  "app": {},
  "appUsingSizeAdjust": false,
  "pagesUsingSizeAdjust": false
}

#### pages-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_document\pages-manifest.json
- 大小: 40 字节
- 行数: 3
- 预览: {
  "/_document": "pages/_document.js"
}

#### react-loadable-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_document\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### _document.js
- 路径: content-pipeline\.next\dev\server\pages\_document.js
- 大小: 369 字节
- 行数: 6
- 预览: var R=require("../chunks/ssr/[turbopack]_runtime.js")("server/pages/_document.js")
R.c("server/chunk...

#### build-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_error\build-manifest.json
- 大小: 831 字节
- 行数: 23
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [],
  "lowPriorityFiles": [],
  "rootMai...

#### client-build-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_error\client-build-manifest.json
- 大小: 58 字节
- 行数: 5
- 预览: {
  "/_error": [
    "static/chunks/pages/_error.js"
  ]
}

#### next-font-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_error\next-font-manifest.json
- 大小: 94 字节
- 行数: 6
- 预览: {
  "pages": {},
  "app": {},
  "appUsingSizeAdjust": false,
  "pagesUsingSizeAdjust": false
}

#### pages-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_error\pages-manifest.json
- 大小: 34 字节
- 行数: 3
- 预览: {
  "/_error": "pages/_error.js"
}

#### react-loadable-manifest.json
- 路径: content-pipeline\.next\dev\server\pages\_error\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### _error.js
- 路径: content-pipeline\.next\dev\server\pages\_error.js
- 大小: 1168 字节
- 行数: 9
- 预览: var R=require("../chunks/ssr/[turbopack]_runtime.js")("server/pages/_error.js")
R.c("server/chunks/s...

#### pages-manifest.json
- 路径: content-pipeline\.next\dev\server\pages-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.js
- 路径: content-pipeline\.next\dev\server\server-reference-manifest.js
- 大小: 138 字节
- 行数: 1
- 预览: self.__RSC_SERVER_MANIFEST="{\n  \"node\": {},\n  \"edge\": {},\n  \"encryptionKey\": \"mZW94/DZSC61...

#### server-reference-manifest.json
- 路径: content-pipeline\.next\dev\server\server-reference-manifest.json
- 大小: 97 字节
- 行数: 5
- 预览: {
  "node": {},
  "edge": {},
  "encryptionKey": "mZW94/DZSC619M18mO9FNZk0xwKIVihkwDnyySD/zwA="
}

#### content-pipeline_5cb1c705._.js
- 路径: content-pipeline\.next\dev\static\chunks\content-pipeline_5cb1c705._.js
- 大小: 10046 字节
- 行数: 120
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### content-pipeline_a0ff3932._.js
- 路径: content-pipeline\.next\dev\static\chunks\content-pipeline_a0ff3932._.js
- 大小: 734 字节
- 行数: 15
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### content-pipeline_app_3f40fb47._.js
- 路径: content-pipeline\.next\dev\static\chunks\content-pipeline_app_3f40fb47._.js
- 大小: 4216 字节
- 行数: 53
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### content-pipeline_app_favicon_ico_mjs_5071a02e._.js
- 路径: content-pipeline\.next\dev\static\chunks\content-pipeline_app_favicon_ico_mjs_5071a02e._.js
- 大小: 255 字节
- 行数: 8
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### content-pipeline_app_layout_tsx_5df92f76._.js
- 路径: content-pipeline\.next\dev\static\chunks\content-pipeline_app_layout_tsx_5df92f76._.js
- 大小: 355 字节
- 行数: 10
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### content-pipeline_app_page_tsx_6d2d97f0._.js
- 路径: content-pipeline\.next\dev\static\chunks\content-pipeline_app_page_tsx_6d2d97f0._.js
- 大小: 482 字节
- 行数: 12
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### content-pipeline_pages__app_2da965e7._.js
- 路径: content-pipeline\.next\dev\static\chunks\content-pipeline_pages__app_2da965e7._.js
- 大小: 677 字节
- 行数: 16
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### content-pipeline_pages__error_2da965e7._.js
- 路径: content-pipeline\.next\dev\static\chunks\content-pipeline_pages__error_2da965e7._.js
- 大小: 679 字节
- 行数: 16
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### ec22b_@swc_helpers_cjs_e4a419c6._.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_@swc_helpers_cjs_e4a419c6._.js
- 大小: 2006 字节
- 行数: 49
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_app_1b430d82.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_app_1b430d82.js
- 大小: 443 字节
- 行数: 8
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### ec22b_next_dist_client_components_builtin_global-error_5df92f76.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_dist_client_components_builtin_global-error_5df92f76.js
- 大小: 206 字节
- 行数: 6
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### ec22b_next_error_c11aec59.js
- 路径: content-pipeline\.next\dev\static\chunks\ec22b_next_error_c11aec59.js
- 大小: 449 字节
- 行数: 8
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### _app.js
- 路径: content-pipeline\.next\dev\static\chunks\pages\_app.js
- 大小: 649 字节
- 行数: 14
- 预览: __turbopack_load_page_chunks__("/_app", [
  "static/chunks/ec22b_next_dist_compiled_8294bc1c._.js",
...

#### _error.js
- 路径: content-pipeline\.next\dev\static\chunks\pages\_error.js
- 大小: 657 字节
- 行数: 14
- 预览: __turbopack_load_page_chunks__("/_error", [
  "static/chunks/ec22b_next_dist_compiled_8294bc1c._.js"...

#### [next]_entry_page-loader_ts_b9567147._.js
- 路径: content-pipeline\.next\dev\static\chunks\[next]_entry_page-loader_ts_b9567147._.js
- 大小: 834 字节
- 行数: 23
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### [next]_entry_page-loader_ts_eab57043._.js
- 路径: content-pipeline\.next\dev\static\chunks\[next]_entry_page-loader_ts_eab57043._.js
- 大小: 840 字节
- 行数: 23
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### [turbopack]_browser_dev_hmr-client_hmr-client_ts_1171f89b._.js
- 路径: content-pipeline\.next\dev\static\chunks\[turbopack]_browser_dev_hmr-client_hmr-client_ts_1171f89b._.js
- 大小: 671 字节
- 行数: 13
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### [turbopack]_browser_dev_hmr-client_hmr-client_ts_dc57ffba._.js
- 路径: content-pipeline\.next\dev\static\chunks\[turbopack]_browser_dev_hmr-client_hmr-client_ts_dc57ffba._.js
- 大小: 288 字节
- 行数: 8
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### _buildManifest.js
- 路径: content-pipeline\.next\dev\static\development\_buildManifest.js
- 大小: 219 字节
- 行数: 11
- 预览: self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallba...

#### _clientMiddlewareManifest.json
- 路径: content-pipeline\.next\dev\static\development\_clientMiddlewareManifest.json
- 大小: 2 字节
- 行数: 1
- 预览: []

#### _ssgManifest.js
- 路径: content-pipeline\.next\dev\static\development\_ssgManifest.js
- 大小: 76 字节
- 行数: 1
- 预览: self.__SSG_MANIFEST=new Set;self.__SSG_MANIFEST_CB&&self.__SSG_MANIFEST_CB()

#### build-diagnostics.json
- 路径: content-pipeline\.next\diagnostics\build-diagnostics.json
- 大小: 83 字节
- 行数: 6
- 预览: {
  "buildStage": "compile",
  "buildOptions": {
    "useBuildWorker": "true"
  }
}

#### framework.json
- 路径: content-pipeline\.next\diagnostics\framework.json
- 大小: 37 字节
- 行数: 1
- 预览: {"name":"Next.js","version":"16.1.6"}

#### package.json
- 路径: content-pipeline\.next\package.json
- 大小: 20 字节
- 行数: 1
- 预览: {"type": "commonjs"}

#### app-paths-manifest.json
- 路径: content-pipeline\.next\server\app\favicon.ico\route\app-paths-manifest.json
- 大小: 54 字节
- 行数: 3
- 预览: {
  "/favicon.ico/route": "app/favicon.ico/route.js"
}

#### build-manifest.json
- 路径: content-pipeline\.next\server\app\favicon.ico\route\build-manifest.json
- 大小: 194 字节
- 行数: 11
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### route.js
- 路径: content-pipeline\.next\server\app\favicon.ico\route.js
- 大小: 349 字节
- 行数: 7
- 预览: var R=require("../../chunks/[turbopack]_runtime.js")("server/app/favicon.ico/route.js")
R.c("server/...

#### route.js.nft.json
- 路径: content-pipeline\.next\server\app\favicon.ico\route.js.nft.json
- 大小: 3978 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../../node_modules/next/dist/client/components/app-router-headers.js","...

#### app-paths-manifest.json
- 路径: content-pipeline\.next\server\app\page\app-paths-manifest.json
- 大小: 28 字节
- 行数: 3
- 预览: {
  "/page": "app/page.js"
}

#### build-manifest.json
- 路径: content-pipeline\.next\server\app\page\build-manifest.json
- 大小: 370 字节
- 行数: 16
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### next-font-manifest.json
- 路径: content-pipeline\.next\server\app\page\next-font-manifest.json
- 大小: 204 字节
- 行数: 10
- 预览: {
  "pages": {},
  "app": {
    "[project]/content-pipeline/app/page": [
      "static/media/83afe27...

#### react-loadable-manifest.json
- 路径: content-pipeline\.next\server\app\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: content-pipeline\.next\server\app\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: content-pipeline\.next\server\app\page.js
- 大小: 1031 字节
- 行数: 17
- 预览: var R=require("../chunks/ssr/[turbopack]_runtime.js")("server/app/page.js")
R.c("server/chunks/ssr/[...

#### page.js.nft.json
- 路径: content-pipeline\.next\server\app\page.js.nft.json
- 大小: 4843 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../node_modules/next/dist/client/components/app-router-headers.js","../...

#### page_client-reference-manifest.js
- 路径: content-pipeline\.next\server\app\page_client-reference-manifest.js
- 大小: 7522 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/page"] = {"...

#### app-paths-manifest.json
- 路径: content-pipeline\.next\server\app\_global-error\page\app-paths-manifest.json
- 大小: 56 字节
- 行数: 3
- 预览: {
  "/_global-error/page": "app/_global-error/page.js"
}

#### build-manifest.json
- 路径: content-pipeline\.next\server\app\_global-error\page\build-manifest.json
- 大小: 370 字节
- 行数: 16
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### next-font-manifest.json
- 路径: content-pipeline\.next\server\app\_global-error\page\next-font-manifest.json
- 大小: 94 字节
- 行数: 6
- 预览: {
  "pages": {},
  "app": {},
  "appUsingSizeAdjust": false,
  "pagesUsingSizeAdjust": false
}

#### react-loadable-manifest.json
- 路径: content-pipeline\.next\server\app\_global-error\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: content-pipeline\.next\server\app\_global-error\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: content-pipeline\.next\server\app\_global-error\page.js
- 大小: 654 字节
- 行数: 12
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/_global-error/page.js")
R.c("se...

#### page.js.nft.json
- 路径: content-pipeline\.next\server\app\_global-error\page.js.nft.json
- 大小: 4342 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../../node_modules/next/dist/client/components/app-router-headers.js","...

#### page_client-reference-manifest.js
- 路径: content-pipeline\.next\server\app\_global-error\page_client-reference-manifest.js
- 大小: 5471 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/_global-err...

#### app-paths-manifest.json
- 路径: content-pipeline\.next\server\app\_not-found\page\app-paths-manifest.json
- 大小: 50 字节
- 行数: 3
- 预览: {
  "/_not-found/page": "app/_not-found/page.js"
}

#### build-manifest.json
- 路径: content-pipeline\.next\server\app\_not-found\page\build-manifest.json
- 大小: 370 字节
- 行数: 16
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### next-font-manifest.json
- 路径: content-pipeline\.next\server\app\_not-found\page\next-font-manifest.json
- 大小: 215 字节
- 行数: 10
- 预览: {
  "pages": {},
  "app": {
    "[project]/content-pipeline/app/_not-found/page": [
      "static/me...

#### react-loadable-manifest.json
- 路径: content-pipeline\.next\server\app\_not-found\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: content-pipeline\.next\server\app\_not-found\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: content-pipeline\.next\server\app\_not-found\page.js
- 大小: 898 字节
- 行数: 15
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/_not-found/page.js")
R.c("serve...

#### page.js.nft.json
- 路径: content-pipeline\.next\server\app\_not-found\page.js.nft.json
- 大小: 4691 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../../node_modules/next/dist/client/components/app-router-headers.js","...

#### page_client-reference-manifest.js
- 路径: content-pipeline\.next\server\app\_not-found\page_client-reference-manifest.js
- 大小: 6363 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/_not-found/...

#### content-pipeline__next-internal_server_app_favicon_ico_route_actions_80a8f915.js
- 路径: content-pipeline\.next\server\chunks\content-pipeline__next-internal_server_app_favicon_ico_route_actions_80a8f915.js
- 大小: 142 字节
- 行数: 3
- 预览: module.exports=[59700,(e,o,d)=>{}];

//# sourceMappingURL=content-pipeline__next-internal_server_app...

#### content-pipeline_app_f90fb356._.js
- 路径: content-pipeline\.next\server\chunks\ssr\content-pipeline_app_f90fb356._.js
- 大小: 234 字节
- 行数: 3
- 预览: module.exports=[81912,a=>{a.v("/_next/static/media/favicon.0b3bf435.ico")},85672,a=>{"use strict";le...

#### content-pipeline__next-internal_server_app_page_actions_af2e8b70.js
- 路径: content-pipeline\.next\server\chunks\ssr\content-pipeline__next-internal_server_app_page_actions_af2e8b70.js
- 大小: 129 字节
- 行数: 3
- 预览: module.exports=[73816,(a,b,c)=>{}];

//# sourceMappingURL=content-pipeline__next-internal_server_app...

#### content-pipeline__next-internal_server_app__global-error_page_actions_b6173adb.js
- 路径: content-pipeline\.next\server\chunks\ssr\content-pipeline__next-internal_server_app__global-error_page_actions_b6173adb.js
- 大小: 143 字节
- 行数: 3
- 预览: module.exports=[61732,(a,b,c)=>{}];

//# sourceMappingURL=content-pipeline__next-internal_server_app...

#### content-pipeline__next-internal_server_app__not-found_page_actions_cd7f8898.js
- 路径: content-pipeline\.next\server\chunks\ssr\content-pipeline__next-internal_server_app__not-found_page_actions_cd7f8898.js
- 大小: 140 字节
- 行数: 3
- 预览: module.exports=[31942,(a,b,c)=>{}];

//# sourceMappingURL=content-pipeline__next-internal_server_app...

#### ec22b_next_dist_client_components_builtin_forbidden_cea0a235.js
- 路径: content-pipeline\.next\server\chunks\ssr\ec22b_next_dist_client_components_builtin_forbidden_cea0a235.js
- 大小: 619 字节
- 行数: 3
- 预览: module.exports=[24951,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object...

#### ec22b_next_dist_client_components_builtin_global-error_168694c0.js
- 路径: content-pipeline\.next\server\chunks\ssr\ec22b_next_dist_client_components_builtin_global-error_168694c0.js
- 大小: 511 字节
- 行数: 3
- 预览: module.exports=[14270,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(47922);a.n(d("[project]/content-p...

#### ec22b_next_dist_client_components_builtin_unauthorized_a2406be6.js
- 路径: content-pipeline\.next\server\chunks\ssr\ec22b_next_dist_client_components_builtin_unauthorized_a2406be6.js
- 大小: 631 字节
- 行数: 3
- 预览: module.exports=[1216,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object....

#### ec22b_next_dist_client_components_c0c0939c._.js
- 路径: content-pipeline\.next\server\chunks\ssr\ec22b_next_dist_client_components_c0c0939c._.js
- 大小: 2489 字节
- 行数: 3
- 预览: module.exports=[86188,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object...

#### ec22b_next_dist_server_route-modules_app-page_vendored_ssr_react-dom_62c67fee.js
- 路径: content-pipeline\.next\server\chunks\ssr\ec22b_next_dist_server_route-modules_app-page_vendored_ssr_react-dom_62c67fee.js
- 大小: 206 字节
- 行数: 3
- 预览: module.exports=[58826,(a,b,c)=>{"use strict";b.exports=a.r(55827).vendored["react-ssr"].ReactDOM}];
...

#### [root-of-the-server]__0bfd93f2._.js
- 路径: content-pipeline\.next\server\chunks\ssr\[root-of-the-server]__0bfd93f2._.js
- 大小: 1896 字节
- 行数: 4
- 预览: module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",(...

#### [root-of-the-server]__0d71d0e4._.js
- 路径: content-pipeline\.next\server\chunks\ssr\[root-of-the-server]__0d71d0e4._.js
- 大小: 2317 字节
- 行数: 3
- 预览: module.exports=[18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime...

#### [root-of-the-server]__1f4cbf91._.js
- 路径: content-pipeline\.next\server\chunks\ssr\[root-of-the-server]__1f4cbf91._.js
- 大小: 1985 字节
- 行数: 3
- 预览: module.exports=[18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime...

#### [root-of-the-server]__236761bd._.js
- 路径: content-pipeline\.next\server\chunks\ssr\[root-of-the-server]__236761bd._.js
- 大小: 688 字节
- 行数: 3
- 预览: module.exports=[18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime...

#### [root-of-the-server]__4bff3add._.js
- 路径: content-pipeline\.next\server\chunks\ssr\[root-of-the-server]__4bff3add._.js
- 大小: 889 字节
- 行数: 3
- 预览: module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",(...

#### [root-of-the-server]__a8699b91._.js
- 路径: content-pipeline\.next\server\chunks\ssr\[root-of-the-server]__a8699b91._.js
- 大小: 3192 字节
- 行数: 3
- 预览: module.exports=[18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime...

#### [root-of-the-server]__bd9ba5b7._.js
- 路径: content-pipeline\.next\server\chunks\ssr\[root-of-the-server]__bd9ba5b7._.js
- 大小: 1584 字节
- 行数: 3
- 预览: module.exports=[18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime...

#### [root-of-the-server]__d6bce01d._.js
- 路径: content-pipeline\.next\server\chunks\ssr\[root-of-the-server]__d6bce01d._.js
- 大小: 1314 字节
- 行数: 3
- 预览: module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",(...

#### [root-of-the-server]__eeba7371._.js
- 路径: content-pipeline\.next\server\chunks\ssr\[root-of-the-server]__eeba7371._.js
- 大小: 1437 字节
- 行数: 3
- 预览: module.exports=[18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime...

#### [externals]_next_dist_03fe02e0._.js
- 路径: content-pipeline\.next\server\chunks\[externals]_next_dist_03fe02e0._.js
- 大小: 1055 字节
- 行数: 3
- 预览: module.exports=[32319,(e,r,t)=>{r.exports=e.x("next/dist/server/app-render/work-unit-async-storage.e...

#### 3d2ece815a975f36.js
- 路径: content-pipeline\.next\static\chunks\3d2ece815a975f36.js
- 大小: 329 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### README.md
- 路径: content-pipeline\README.md
- 大小: 1450 字节
- 行数: 37
- 预览: This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs...

#### tsconfig.json
- 路径: content-pipeline\tsconfig.json
- 大小: 666 字节
- 行数: 35
- 预览: {
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "...

#### capability-usage.json
- 路径: data\life-decision-master\collected-data\capability-usage.json
- 大小: 1516 字节
- 行数: 66
- 预览: [
  {
    "timestamp": "2026-02-24T18:44:36.588Z",
    "capabilityName": "决策风险评估",
    "taskDescript...

#### report-1771958676622.json
- 路径: data\life-decision-master\collected-data\reports\report-1771958676622.json
- 大小: 2480 字节
- 行数: 102
- 预览: {
  "timestamp": "2026-02-24T18:44:36.618Z",
  "timeRange": "1d",
  "summary": {
    "totalCapabilit...

#### report-1771958676628.json
- 路径: data\life-decision-master\collected-data\reports\report-1771958676628.json
- 大小: 2480 字节
- 行数: 102
- 预览: {
  "timestamp": "2026-02-24T18:44:36.623Z",
  "timeRange": "7d",
  "summary": {
    "totalCapabilit...

#### user-interaction.json
- 路径: data\life-decision-master\collected-data\user-interaction.json
- 大小: 2191 字节
- 行数: 90
- 预览: [
  {
    "timestamp": "2026-02-24T18:44:36.597Z",
    "userId": "user-123",
    "interactionType": ...

#### optimization-suggestions.json
- 路径: data\life-decision-master\feedback\optimization-suggestions.json
- 大小: 1079 字节
- 行数: 49
- 预览: {
  "timestamp": "2026-02-24T18:51:06.416Z",
  "basedOnFeedbackCount": 4,
  "priorityAreas": [
    "...

#### evaluation-history.json
- 路径: evaluation-history.json
- 大小: 2501 字节
- 行数: 104
- 预览: [
  {
    "timestamp": "2026-02-23T08:50:20.024Z",
    "data": {
      "tokenEfficiency": 94.5121439...

#### pcec-state.json
- 路径: evolution\pcec-state.json
- 大小: 135 字节
- 行数: 7
- 预览: {
  "evolutionCount": 8,
  "currentCycle": 8,
  "lastEvolutionTime": 1771993277143,
  "failureCount"...

#### evolution-errors.txt
- 路径: evolution-errors.txt
- 大小: 4173 字节
- 行数: 85
- 预览: [2026-02-23 08:22:09] Error: �����������Ч��ӦΪ��,���� (408): {
  "channel_type": "web",
  "model": ""...

#### config.json
- 路径: evolver\config.json
- 大小: 512 字节
- 行数: 16
- 预览: {
  "agent_id": "node_c3c7ebfa60b867f1",
  "node_id": "node_c3c7ebfa60b867f1",
  "agent_name": "大掌柜"...

#### package-lock.json
- 路径: evolver\package-lock.json
- 大小: 10244 字节
- 行数: 296
- 预览: {
  "name": "evolver",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages...

#### package.json
- 路径: evolver\package.json
- 大小: 388 字节
- 行数: 22
- 预览: {
  "name": "evolver",
  "version": "1.0.0",
  "description": "EvoMap client for Gene and Capsule in...

#### capability-tree.json
- 路径: evomap-connection\capabilities\capability-tree.json
- 大小: 770 字节
- 行数: 39
- 预览: {
  "version": "1.0.0",
  "last_updated": "2026-02-24T19:31:38.991Z",
  "capabilities": {
    "econo...

#### task.json
- 路径: evomap-connection\real-tasks-executed\cmm0nzvim025rn02nskyw3l1u_南方城市“就地滑雪”的推广，在能源消耗和环境影响方面会带来什么��题？如何实现可持续发展？\task.json
- 大小: 356 字节
- 行数: 13
- 预览: {
  "id": "cmm0nzvim025rn02nskyw3l1u",
  "title": "南方城市“就地滑雪”的推广，在能源消耗和环境影响方面会带来什么��题？如何实现可持续发展？",
 ...

#### status.json
- 路径: evomap-connection\status.json
- 大小: 195 字节
- 行数: 9
- 预览: {
  "nodeId": "1226898",
  "status": "connected",
  "isConnected": true,
  "lastHeartbeatTime": null...

#### evolutionEvent.json
- 路径: evomap-connection\tasks\task_001_上门经济在春节期间的兴起，对传统家政服务行业的冲击\assets\evolutionEvent.json
- 大小: 229 字节
- 行数: 7
- 预览: {
  "type": "evolution_event",
  "name": "上门经济在春节期间的兴起，对传统家政服务行业的冲击_event",
  "description": "进化事件: ...

#### task.json
- 路径: evomap-connection\tasks\task_001_上门经济在春节期间的兴起，对传统家政服务行业的冲击\task.json
- 大小: 370 字节
- 行数: 18
- 预览: {
  "id": "task_001",
  "title": "上门经济在春节期间的兴起，对传统家政服务行业的冲击",
  "description": "分析上门经济在春节期间的兴起原因，以及对...

#### xiaohongshu.json
- 路径: evomap-evolution\auth\xiaohongshu.json
- 大小: 444 字节
- 行数: 14
- 预览: {
  "accountId": "251940568",
  "appKey": "YOUR_APP_KEY",
  "appSecret": "YOUR_APP_SECRET",
  "acces...

#### claimed_tasks.json
- 路径: evomap-evolution\data\claimed_tasks.json
- 大小: 722 字节
- 行数: 26
- 预览: [
  {
    "task_id": "cmm0o04bn02ckn02qxh56qkeh",
    "title": "“上门经济”在春节期间的兴起，对传统家政服务行业会产生什么冲击？传统家政...

#### downloaded_capsules.json
- 路径: evomap-evolution\data\downloaded_capsules.json
- 大小: 2083 字节
- 行数: 47
- 预览: [
  {
    "asset_id": "sha256:b3e74308f98ab50e95dea0452bb05e0c6e24d5a7fa335a480b5eafe5108bbfa2",
   ...

#### social_media_publishes.json
- 路径: evomap-evolution\data\social_media_publishes.json
- 大小: 7125 字节
- 行数: 235
- 预览: [
  {
    "taskId": "test_xhs_1",
    "taskTitle": "如何在小红书上创作爆款内容",
    "platform": "xiaohongshu",
 ...

#### social_media_records.json
- 路径: evomap-evolution\data\social_media_records.json
- 大小: 3483 字节
- 行数: 114
- 预览: [
  {
    "platform": "xiaohongshu",
    "id": "xhs_1771900607120_7092",
    "title": "如何在小红书上创作爆款内容...

#### execution_report_1771958841560.json
- 路径: evomap-evolution\logs\execution_report_1771958841560.json
- 大小: 1390 字节
- 行数: 47
- 预览: {
  "execution_time": "2026-02-24T18:47:21.560Z",
  "node_id": "node_be9ff891bc1c0bbb",
  "agent_nam...

#### config.json
- 路径: evomap-evolution\skills\capsule_sha256_7a00899846b8c19672bf7390a\config.json
- 大小: 648 字节
- 行数: 15
- 预览: {
  "asset_id": "sha256:7a00899846b8c19672bf7390a32aa9b317ae55d4036ed7a3bbc7b3c185c70cf8",
  "bundle...

#### config.json
- 路径: evomap-evolution\skills\capsule_sha256_b3e74308f98ab50e95dea0452\config.json
- 大小: 646 字节
- 行数: 15
- 预览: {
  "asset_id": "sha256:b3e74308f98ab50e95dea0452bb05e0c6e24d5a7fa335a480b5eafe5108bbfa2",
  "bundle...

#### config.json
- 路径: evomap-evolution\skills\capsule_sha256_c98665e5fdfa67b3cee7bf4c1\config.json
- 大小: 691 字节
- 行数: 15
- 预览: {
  "asset_id": "sha256:c98665e5fdfa67b3cee7bf4c1ab4adf3cc94aabdfd12572fbfbfccb422cae7f6",
  "bundle...

#### test-social-media.js
- 路径: evomap-evolution\test-social-media.js
- 大小: 2314 字节
- 行数: 97
- 预览: const EvoMapEvolution = require('./index');

async function testSocialMediaPublish() {
  console.log...

#### fetch-tasks.js
- 路径: fetch-tasks.js
- 大小: 1797 字节
- 行数: 66
- 预览: const https = require('https');

const postData = JSON.stringify({
  protocol: 'gep-a2a',
  protocol...

#### project.json
- 路径: HATwin\.vercel\project.json
- 大小: 113 字节
- 行数: 1
- 预览: {"projectId":"prj_m6ijJon9E8Ibnos76U5TyppvPn3e","orgId":"team_cMHTq4nUIdcNQHNhSriCRtB4","projectName...

#### README.txt
- 路径: HATwin\.vercel\README.txt
- 大小: 520 字节
- 行数: 12
- 预览: > Why do I have a folder named ".vercel" in my project?
The ".vercel" folder is created when you lin...

#### package-lock.json
- 路径: HATwin\package-lock.json
- 大小: 46334 字节
- 行数: 1316
- 预览: {
  "name": "lay-ai-proxy",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "pac...

#### package.json
- 路径: HATwin\package.json
- 大小: 648 字节
- 行数: 32
- 预览: {
  "name": "lay-ai-proxy",
  "version": "1.0.0",
  "description": "Node.js proxy server for LAY AI ...

#### vercel.json
- 路径: HATwin\vercel.json
- 大小: 503 字节
- 行数: 35
- 预览: {
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
 ...

#### tsconfig.json
- 路径: hero\projects\tsconfig.json
- 大小: 670 字节
- 行数: 35
- 预览: {
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "...

#### 更新英雄原型全集.md
- 路径: HREO\.trae\documents\更新英雄原型全集.md
- 大小: 805 字节
- 行数: 37
- 预览: # 更新英雄原型全集

## 任务目标
将用户提供的完整英雄原型数据更新到 `system-data.js` 文件中，替换现有的R型数据，并添加I型、A型和S型的完整数据。

## 实施步骤

###...

#### sys.js
- 路径: HREO\sys.js
- 大小: 7749 字节
- 行数: 217
- 预览: // 确保sys对象在全局作用域可用
var sys;
window.sys = sys = {
    step: 0,
    riasec: { R:0, I:0, A:0, S:0, E:0,...

#### plan_20260206_122912.md
- 路径: HTP\.trae\documents\plan_20260206_122912.md
- 大小: 824 字节
- 行数: 39
- 预览: ## 问题分析

用户要求将两个模块合并成一个模块，具体要求：
1. 删除"基本信息"这四个字
2. 删除"* 这些信息将用于更准确地分析您的画作（房树人分析需结合年龄和性别判断）"这段文字
3. 将...

#### package-lock.json
- 路径: HTP\backend\package-lock.json
- 大小: 51841 字节
- 行数: 1450
- 预览: {
  "name": "backend",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages...

#### package.json
- 路径: HTP\backend\package.json
- 大小: 424 字节
- 行数: 22
- 预览: {
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts":...

#### package.json
- 路径: HTP\package.json
- 大小: 2623 字节
- 行数: 83
- 预览: {
  "name": "my-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
  ...

#### postcss.config.js
- 路径: HTP\postcss.config.js
- 大小: 80 字节
- 行数: 7
- 预览: export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


#### elegant.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\elegant.md
- 大小: 1733 字节
- 行数: 57
- 预览: # elegant

Refined, sophisticated illustration style for professional content

## Design Aesthetic

...

#### fantasy-animation.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\fantasy-animation.md
- 大小: 1969 字节
- 行数: 59
- 预览: # fantasy-animation

Whimsical hand-drawn animation style inspired by Ghibli/Disney

## Design Aesth...

#### flat-doodle.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\flat-doodle.md
- 大小: 1869 字节
- 行数: 62
- 预览: # flat-doodle

Cute flat doodle illustration style with bold outlines

## Design Aesthetic

Cheerful...

#### flat.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\flat.md
- 大小: 1688 字节
- 行数: 60
- 预览: # flat

Modern flat vector illustration style for contemporary content

## Design Aesthetic

Contemp...

#### pixel-art.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\pixel-art.md
- 大小: 1907 字节
- 行数: 58
- 预览: # pixel-art

Retro 8-bit pixel art aesthetic with nostalgic gaming style

## Design Aesthetic

Pixel...

#### retro.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\retro.md
- 大小: 1682 字节
- 行数: 60
- 预览: # retro

80s/90s nostalgic aesthetic with vibrant colors and geometric patterns

## Design Aesthetic...

#### vector-illustration.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\vector-illustration.md
- 大小: 1940 字节
- 行数: 58
- 预览: # vector-illustration

Flat vector illustration style with clear black outlines and retro soft color...

#### vintage.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\vintage.md
- 大小: 1819 字节
- 行数: 60
- 预览: # vintage

Nostalgic aged-paper aesthetic for historical and heritage content

## Design Aesthetic

...

#### watercolor.md
- 路径: HTP\projects\awkn-article-illustrator-code\references\styles\watercolor.md
- 大小: 1815 字节
- 行数: 59
- 预览: # watercolor

Soft, artistic watercolor illustration style with natural warmth

## Design Aesthetic
...

#### htp-symbolism-dictionary.md
- 路径: HTP\projects\htp-insight\references\htp-symbolism-dictionary.md
- 大小: 14048 字节
- 行数: 826
- 预览: # HTP 房树人分析象征体系词典

## 目录

### 房子元素
- [屋顶特征](#屋顶特征)
- [门特征](#门特征)
- [窗户特征](#窗户特征)
- [墙壁特征](#墙壁特征)
- [...

#### 6c8b2bef4652d5113cc802b6995a8e9f5da8b5b1ffe3d6bc639e2ca8ce27edec.json
- 路径: installed_capsules\6c8b2bef4652d5113cc802b6995a8e9f5da8b5b1ffe3d6bc639e2ca8ce27edec.json
- 大小: 1542 字节
- 行数: 41
- 预览: {
  "asset_id": "sha256:6c8b2bef4652d5113cc802b6995a8e9f5da8b5b1ffe3d6bc639e2ca8ce27edec",
  "summar...

#### dae9842a35d875a9e96ac5f0b9ee004eb3eb8bd71ad4c43a4a14c0e4a6a40763.json
- 路径: installed_capsules\dae9842a35d875a9e96ac5f0b9ee004eb3eb8bd71ad4c43a4a14c0e4a6a40763.json
- 大小: 1499 字节
- 行数: 45
- 预览: {
  "asset_id": "sha256:dae9842a35d875a9e96ac5f0b9ee004eb3eb8bd71ad4c43a4a14c0e4a6a40763",
  "summar...

#### integration-test.js
- 路径: integration-test.js
- 大小: 6082 字节
- 行数: 248
- 预览: // 系统集成测试脚本
// 测试所有组件之间的交互和协作

const fs = require('fs');
const path = require('path');

// 测试结果记录
co...

#### package.json
- 路径: Kimi_Agent_2026高光日历\app\package.json
- 大小: 2538 字节
- 行数: 80
- 预览: {
  "name": "my-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
  ...

#### postcss.config.js
- 路径: Kimi_Agent_2026高光日历\app\postcss.config.js
- 大小: 80 字节
- 行数: 7
- 预览: export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


#### knowledge-base.js
- 路径: knowledge-base.js
- 大小: 20229 字节
- 行数: 813
- 预览: /**
 * 知识库系统
 * 用于存储、检索和管理从认知数据中提取的知识
 */

const fs = require('fs');
const path = require('path');
c...

#### project.json
- 路径: LAY\.vercel\project.json
- 大小: 113 字节
- 行数: 1
- 预览: {"projectId":"prj_m6ijJon9E8Ibnos76U5TyppvPn3e","orgId":"team_cMHTq4nUIdcNQHNhSriCRtB4","projectName...

#### README.txt
- 路径: LAY\.vercel\README.txt
- 大小: 520 字节
- 行数: 12
- 预览: > Why do I have a folder named ".vercel" in my project?
The ".vercel" folder is created when you lin...

#### package-lock.json
- 路径: LAY\package-lock.json
- 大小: 46334 字节
- 行数: 1316
- 预览: {
  "name": "lay-ai-proxy",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "pac...

#### package.json
- 路径: LAY\package.json
- 大小: 665 字节
- 行数: 32
- 预览: {
  "name": "人生决策宗师",
  "version": "1.0.0",
  "description": "Node.js server for Da Liu Ren decision...

#### vercel.json
- 路径: LAY\vercel.json
- 大小: 503 字节
- 行数: 35
- 预览: {
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
 ...

#### postcss.config.js
- 路径: life-choice\postcss.config.js
- 大小: 80 字节
- 行数: 7
- 预览: export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


#### tsconfig.app.json
- 路径: life-choice\tsconfig.app.json
- 大小: 510 字节
- 行数: 23
- 预览: {
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "...

#### vercel.json
- 路径: life-choice\vercel.json
- 大小: 378 字节
- 行数: 27
- 预览: {
  "version": 2,
  "builds": [
    {
      "src": "server.cjs",
      "use": "@vercel/node"
    },
...

#### evolution-summary.json
- 路径: logs\pcec\evolution-summary.json
- 大小: 2696 字节
- 行数: 124
- 预览: {
  "evolutions": [
    {
      "id": "evolution_1771968076972_h0k581s30",
      "timestamp": 177196...

#### evolution_1771971676985_h5945pwl1.json
- 路径: logs\pcec\evolution_1771971676985_h5945pwl1.json
- 大小: 913 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771971676985_h5945pwl1",
  "timestamp": 1771971676985,
  "duration": 5,
  "suc...

#### evolution_1771972074678_64apwvr1r.json
- 路径: logs\pcec\evolution_1771972074678_64apwvr1r.json
- 大小: 913 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771972074678_64apwvr1r",
  "timestamp": 1771972074678,
  "duration": 4,
  "suc...

#### evolution_1771975277010_1nuvpcozp.json
- 路径: logs\pcec\evolution_1771975277010_1nuvpcozp.json
- 大小: 913 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771975277010_1nuvpcozp",
  "timestamp": 1771975277010,
  "duration": 5,
  "suc...

#### evolution_1771975674696_w5y4rs3c9.json
- 路径: logs\pcec\evolution_1771975674696_w5y4rs3c9.json
- 大小: 914 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771975674696_w5y4rs3c9",
  "timestamp": 1771975674696,
  "duration": 10,
  "su...

#### evolution_1771978877034_vik1q7qj5.json
- 路径: logs\pcec\evolution_1771978877034_vik1q7qj5.json
- 大小: 913 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771978877034_vik1q7qj5",
  "timestamp": 1771978877034,
  "duration": 4,
  "suc...

#### evolution_1771979274719_n097rq5la.json
- 路径: logs\pcec\evolution_1771979274719_n097rq5la.json
- 大小: 913 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771979274719_n097rq5la",
  "timestamp": 1771979274719,
  "duration": 4,
  "suc...

#### evolution_1771982477056_nv9xvota0.json
- 路径: logs\pcec\evolution_1771982477056_nv9xvota0.json
- 大小: 913 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771982477056_nv9xvota0",
  "timestamp": 1771982477056,
  "duration": 3,
  "suc...

#### evolution_1771982874740_15rhpiss3.json
- 路径: logs\pcec\evolution_1771982874740_15rhpiss3.json
- 大小: 913 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771982874740_15rhpiss3",
  "timestamp": 1771982874740,
  "duration": 4,
  "suc...

#### evolution_1771986077074_s8uiuu4sm.json
- 路径: logs\pcec\evolution_1771986077074_s8uiuu4sm.json
- 大小: 913 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771986077074_s8uiuu4sm",
  "timestamp": 1771986077074,
  "duration": 5,
  "suc...

#### evolution_1771986474751_tkbtur74q.json
- 路径: logs\pcec\evolution_1771986474751_tkbtur74q.json
- 大小: 913 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771986474751_tkbtur74q",
  "timestamp": 1771986474751,
  "duration": 4,
  "suc...

#### evolution_1771989677099_oe6n85xfs.json
- 路径: logs\pcec\evolution_1771989677099_oe6n85xfs.json
- 大小: 914 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771989677099_oe6n85xfs",
  "timestamp": 1771989677099,
  "duration": 14,
  "su...

#### evolution_1771990074762_57qc7mpcy.json
- 路径: logs\pcec\evolution_1771990074762_57qc7mpcy.json
- 大小: 913 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771990074762_57qc7mpcy",
  "timestamp": 1771990074762,
  "duration": 9,
  "suc...

#### evolution_1771993277137_ziewevyzx.json
- 路径: logs\pcec\evolution_1771993277137_ziewevyzx.json
- 大小: 913 字节
- 行数: 45
- 预览: {
  "id": "evolution_1771993277137_ziewevyzx",
  "timestamp": 1771993277137,
  "duration": 4,
  "suc...

#### 2026-02-24.json
- 路径: logs\zhy\2026-02-24.json
- 大小: 335 字节
- 行数: 16
- 预览: [
  {
    "id": "log_1771954319207_eyatemcen",
    "timestamp": 1771954319207,
    "persona": "Catgi...

#### master-profile.json
- 路径: master-profile.json
- 大小: 2161 字节
- 行数: 52
- 预览: {
  "name": "大宗师",
  "avatar": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=prof...

#### search-index.json
- 路径: memory\indexes\search-index.json
- 大小: 69 字节
- 行数: 5
- 预览: {
  "version": "1.0.0",
  "timestamp": 1771954319211,
  "files": []
}

#### minimal-cache-test.js
- 路径: minimal-cache-test.js
- 大小: 1850 字节
- 行数: 62
- 预览: const { hotInfoCache } = require('./capabilities/hot-info-cache');
const fs = require('fs');

const ...

#### app-path-routes-manifest.json
- 路径: mission-control\.next\app-path-routes-manifest.json
- 大小: 312 字节
- 行数: 12
- 预览: {
  "/_global-error/page": "/_global-error",
  "/_not-found/page": "/_not-found",
  "/calendar/page"...

#### package.json
- 路径: mission-control\.next\build\package.json
- 大小: 20 字节
- 行数: 1
- 预览: {"type": "commonjs"}

#### build-manifest.json
- 路径: mission-control\.next\build-manifest.json
- 大小: 494 字节
- 行数: 20
- 预览: {
  "pages": {
    "/_app": []
  },
  "devFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad9...

#### package.json
- 路径: mission-control\.next\dev\build\package.json
- 大小: 20 字节
- 行数: 1
- 预览: {"type": "commonjs"}

#### build-manifest.json
- 路径: mission-control\.next\dev\build-manifest.json
- 大小: 950 字节
- 行数: 25
- 预览: {
  "pages": {
    "/_app": []
  },
  "devFiles": [],
  "polyfillFiles": [
    "static/chunks/2f884_...

#### next-devtools-config.json
- 路径: mission-control\.next\dev\cache\next-devtools-config.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### fallback-build-manifest.json
- 路径: mission-control\.next\dev\fallback-build-manifest.json
- 大小: 214 字节
- 行数: 12
- 预览: {
  "pages": {
    "/_app": []
  },
  "devFiles": [],
  "polyfillFiles": [],
  "lowPriorityFiles": [...

#### package.json
- 路径: mission-control\.next\dev\package.json
- 大小: 24 字节
- 行数: 3
- 预览: {
  "type": "commonjs"
}

#### prerender-manifest.json
- 路径: mission-control\.next\dev\prerender-manifest.json
- 大小: 354 字节
- 行数: 11
- 预览: {
  "version": 4,
  "routes": {},
  "dynamicRoutes": {},
  "notFoundRoutes": [],
  "preview": {
    ...

#### routes-manifest.json
- 路径: mission-control\.next\dev\routes-manifest.json
- 大小: 288 字节
- 行数: 1
- 预览: {"version":3,"caseSensitive":false,"basePath":"","rewrites":{"beforeFiles":[],"afterFiles":[],"fallb...

#### app-paths-manifest.json
- 路径: mission-control\.next\dev\server\app\calendar\page\app-paths-manifest.json
- 大小: 46 字节
- 行数: 3
- 预览: {
  "/calendar/page": "app/calendar/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\dev\server\app\calendar\page\build-manifest.json
- 大小: 887 字节
- 行数: 22
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/2f884_next_dist_bui...

#### next-font-manifest.json
- 路径: mission-control\.next\dev\server\app\calendar\page\next-font-manifest.json
- 大小: 274 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/calendar/page": [
      "static/m...

#### react-loadable-manifest.json
- 路径: mission-control\.next\dev\server\app\calendar\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\dev\server\app\calendar\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\dev\server\app\calendar\page.js
- 大小: 3691 字节
- 行数: 15
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/calendar/page.js")
R.c("server/...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\dev\server\app\calendar\page_client-reference-manifest.js
- 大小: 18743 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/calendar/pa...

#### app-paths-manifest.json
- 路径: mission-control\.next\dev\server\app\content\page\app-paths-manifest.json
- 大小: 44 字节
- 行数: 3
- 预览: {
  "/content/page": "app/content/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\dev\server\app\content\page\build-manifest.json
- 大小: 887 字节
- 行数: 22
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/2f884_next_dist_bui...

#### next-font-manifest.json
- 路径: mission-control\.next\dev\server\app\content\page\next-font-manifest.json
- 大小: 273 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/content/page": [
      "static/me...

#### react-loadable-manifest.json
- 路径: mission-control\.next\dev\server\app\content\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\dev\server\app\content\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\dev\server\app\content\page.js
- 大小: 3685 字节
- 行数: 15
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/content/page.js")
R.c("server/c...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\dev\server\app\content\page_client-reference-manifest.js
- 大小: 17493 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/content/pag...

#### app-paths-manifest.json
- 路径: mission-control\.next\dev\server\app\memory\page\app-paths-manifest.json
- 大小: 42 字节
- 行数: 3
- 预览: {
  "/memory/page": "app/memory/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\dev\server\app\memory\page\build-manifest.json
- 大小: 887 字节
- 行数: 22
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/2f884_next_dist_bui...

#### next-font-manifest.json
- 路径: mission-control\.next\dev\server\app\memory\page\next-font-manifest.json
- 大小: 272 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/memory/page": [
      "static/med...

#### react-loadable-manifest.json
- 路径: mission-control\.next\dev\server\app\memory\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\dev\server\app\memory\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\dev\server\app\memory\page.js
- 大小: 3679 字节
- 行数: 15
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/memory/page.js")
R.c("server/ch...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\dev\server\app\memory\page_client-reference-manifest.js
- 大小: 17395 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/memory/page...

#### app-paths-manifest.json
- 路径: mission-control\.next\dev\server\app\office\page\app-paths-manifest.json
- 大小: 42 字节
- 行数: 3
- 预览: {
  "/office/page": "app/office/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\dev\server\app\office\page\build-manifest.json
- 大小: 887 字节
- 行数: 22
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/2f884_next_dist_bui...

#### next-font-manifest.json
- 路径: mission-control\.next\dev\server\app\office\page\next-font-manifest.json
- 大小: 272 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/office/page": [
      "static/med...

#### react-loadable-manifest.json
- 路径: mission-control\.next\dev\server\app\office\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\dev\server\app\office\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\dev\server\app\office\page.js
- 大小: 3679 字节
- 行数: 15
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/office/page.js")
R.c("server/ch...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\dev\server\app\office\page_client-reference-manifest.js
- 大小: 17475 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/office/page...

#### app-paths-manifest.json
- 路径: mission-control\.next\dev\server\app\page\app-paths-manifest.json
- 大小: 28 字节
- 行数: 3
- 预览: {
  "/page": "app/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\dev\server\app\page\build-manifest.json
- 大小: 887 字节
- 行数: 22
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/2f884_next_dist_bui...

#### next-font-manifest.json
- 路径: mission-control\.next\dev\server\app\page\next-font-manifest.json
- 大小: 265 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/page": [
      "static/media/83af...

#### react-loadable-manifest.json
- 路径: mission-control\.next\dev\server\app\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\dev\server\app\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\dev\server\app\page.js
- 大小: 3634 字节
- 行数: 15
- 预览: var R=require("../chunks/ssr/[turbopack]_runtime.js")("server/app/page.js")
R.c("server/chunks/ssr/2...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\dev\server\app\page_client-reference-manifest.js
- 大小: 17311 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/page"] = {"...

#### app-paths-manifest.json
- 路径: mission-control\.next\dev\server\app\tasks\page\app-paths-manifest.json
- 大小: 40 字节
- 行数: 3
- 预览: {
  "/tasks/page": "app/tasks/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\dev\server\app\tasks\page\build-manifest.json
- 大小: 887 字节
- 行数: 22
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/2f884_next_dist_bui...

#### next-font-manifest.json
- 路径: mission-control\.next\dev\server\app\tasks\page\next-font-manifest.json
- 大小: 271 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/tasks/page": [
      "static/medi...

#### react-loadable-manifest.json
- 路径: mission-control\.next\dev\server\app\tasks\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\dev\server\app\tasks\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\dev\server\app\tasks\page.js
- 大小: 3673 字节
- 行数: 15
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/tasks/page.js")
R.c("server/chu...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\dev\server\app\tasks\page_client-reference-manifest.js
- 大小: 17457 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/tasks/page"...

#### app-paths-manifest.json
- 路径: mission-control\.next\dev\server\app\team\page\app-paths-manifest.json
- 大小: 38 字节
- 行数: 3
- 预览: {
  "/team/page": "app/team/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\dev\server\app\team\page\build-manifest.json
- 大小: 887 字节
- 行数: 22
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/2f884_next_dist_bui...

#### next-font-manifest.json
- 路径: mission-control\.next\dev\server\app\team\page\next-font-manifest.json
- 大小: 270 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/team/page": [
      "static/media...

#### react-loadable-manifest.json
- 路径: mission-control\.next\dev\server\app\team\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\dev\server\app\team\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\dev\server\app\team\page.js
- 大小: 3667 字节
- 行数: 15
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/team/page.js")
R.c("server/chun...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\dev\server\app\team\page_client-reference-manifest.js
- 大小: 17439 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/team/page"]...

#### app-paths-manifest.json
- 路径: mission-control\.next\dev\server\app\_not-found\page\app-paths-manifest.json
- 大小: 50 字节
- 行数: 3
- 预览: {
  "/_not-found/page": "app/_not-found/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\dev\server\app\_not-found\page\build-manifest.json
- 大小: 887 字节
- 行数: 22
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/2f884_next_dist_bui...

#### next-font-manifest.json
- 路径: mission-control\.next\dev\server\app\_not-found\page\next-font-manifest.json
- 大小: 276 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/_not-found/page": [
      "static...

#### react-loadable-manifest.json
- 路径: mission-control\.next\dev\server\app\_not-found\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\dev\server\app\_not-found\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\dev\server\app\_not-found\page.js
- 大小: 2937 字节
- 行数: 13
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/_not-found/page.js")
R.c("serve...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\dev\server\app\_not-found\page_client-reference-manifest.js
- 大小: 15401 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/_not-found/...

#### app-paths-manifest.json
- 路径: mission-control\.next\dev\server\app-paths-manifest.json
- 大小: 76 字节
- 行数: 4
- 预览: {
  "/_not-found/page": "app/_not-found/page.js",
  "/page": "app/page.js"
}

#### 2f884_next_dist_client_components_a7c05c66._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_client_components_a7c05c66._.js
- 大小: 6258 字节
- 行数: 149
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/client/components/styles/access...

#### 2f884_next_dist_client_components_builtin_forbidden_2875b889.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_client_components_builtin_forbidden_2875b889.js
- 大小: 1417 字节
- 行数: 32
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/client/components/builtin/forbi...

#### 2f884_next_dist_client_components_builtin_global-error_10ec4e1b.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_client_components_builtin_global-error_10ec4e1b.js
- 大小: 2587 字节
- 行数: 24
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/client/components/builtin/globa...

#### 2f884_next_dist_client_components_builtin_unauthorized_13f213e6.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_next_dist_client_components_builtin_unauthorized_13f213e6.js
- 大小: 1442 字节
- 行数: 32
- 预览: module.exports = [
"[project]/mission-control/node_modules/next/dist/client/components/builtin/unaut...

#### 2f884_react-big-calendar_dist_react-big-calendar_esm_d5bcf0c4.js
- 路径: mission-control\.next\dev\server\chunks\ssr\2f884_react-big-calendar_dist_react-big-calendar_esm_d5bcf0c4.js
- 大小: 357167 字节
- 行数: 5655
- 预览: module.exports = [
"[project]/mission-control/node_modules/react-big-calendar/dist/react-big-calenda...

#### mission-control_src_app_7fc4c801._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control_src_app_7fc4c801._.js
- 大小: 1118 字节
- 行数: 22
- 预览: module.exports = [
"[project]/mission-control/src/app/favicon.ico (static in ecmascript, tag client)...

#### mission-control_src_app_office_page_tsx_803d7a87._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control_src_app_office_page_tsx_803d7a87._.js
- 大小: 39664 字节
- 行数: 498
- 预览: module.exports = [
"[project]/mission-control/src/app/office/page.tsx [app-ssr] (ecmascript)", ((__t...

#### mission-control_src_app_tasks_page_tsx_aa585d35._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control_src_app_tasks_page_tsx_aa585d35._.js
- 大小: 37198 字节
- 行数: 556
- 预览: module.exports = [
"[project]/mission-control/src/app/tasks/page.tsx [app-ssr] (ecmascript)", ((__tu...

#### mission-control__next-internal_server_app_calendar_page_actions_25e19e8e.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control__next-internal_server_app_calendar_page_actions_25e19e8e.js
- 大小: 301 字节
- 行数: 7
- 预览: module.exports = [
"[project]/mission-control/.next-internal/server/app/calendar/page/actions.js [ap...

#### mission-control__next-internal_server_app_content_page_actions_db6b36c7.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control__next-internal_server_app_content_page_actions_db6b36c7.js
- 大小: 299 字节
- 行数: 7
- 预览: module.exports = [
"[project]/mission-control/.next-internal/server/app/content/page/actions.js [app...

#### mission-control__next-internal_server_app_memory_page_actions_b777afb8.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control__next-internal_server_app_memory_page_actions_b777afb8.js
- 大小: 297 字节
- 行数: 7
- 预览: module.exports = [
"[project]/mission-control/.next-internal/server/app/memory/page/actions.js [app-...

#### mission-control__next-internal_server_app_office_page_actions_2f8c57f0.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control__next-internal_server_app_office_page_actions_2f8c57f0.js
- 大小: 297 字节
- 行数: 7
- 预览: module.exports = [
"[project]/mission-control/.next-internal/server/app/office/page/actions.js [app-...

#### mission-control__next-internal_server_app_page_actions_5765b161.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control__next-internal_server_app_page_actions_5765b161.js
- 大小: 283 字节
- 行数: 7
- 预览: module.exports = [
"[project]/mission-control/.next-internal/server/app/page/actions.js [app-rsc] (s...

#### mission-control__next-internal_server_app_tasks_page_actions_03150f16.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control__next-internal_server_app_tasks_page_actions_03150f16.js
- 大小: 295 字节
- 行数: 7
- 预览: module.exports = [
"[project]/mission-control/.next-internal/server/app/tasks/page/actions.js [app-r...

#### mission-control__next-internal_server_app_team_page_actions_ca921dda.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control__next-internal_server_app_team_page_actions_ca921dda.js
- 大小: 293 字节
- 行数: 7
- 预览: module.exports = [
"[project]/mission-control/.next-internal/server/app/team/page/actions.js [app-rs...

#### mission-control__next-internal_server_app__not-found_page_actions_9d5f9b63.js
- 路径: mission-control\.next\dev\server\chunks\ssr\mission-control__next-internal_server_app__not-found_page_actions_9d5f9b63.js
- 大小: 305 字节
- 行数: 7
- 预览: module.exports = [
"[project]/mission-control/.next-internal/server/app/_not-found/page/actions.js [...

#### [externals]_next_dist_1aaf5479._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[externals]_next_dist_1aaf5479._.js
- 大小: 2533 字节
- 行数: 38
- 预览: module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [extern...

#### [externals]_next_dist_c80f7c8f._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[externals]_next_dist_c80f7c8f._.js
- 大小: 2533 字节
- 行数: 38
- 预览: module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [extern...

#### [externals]__e8a2741f._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[externals]__e8a2741f._.js
- 大小: 3417 字节
- 行数: 62
- 预览: module.exports = [
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, expor...

#### [root-of-the-server]__043446aa._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[root-of-the-server]__043446aa._.js
- 大小: 1153 字节
- 行数: 16
- 预览: module.exports = [
"[project]/mission-control/src/app/favicon.ico.mjs { IMAGE => \"[project]/mission...

#### [root-of-the-server]__13abd482._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[root-of-the-server]__13abd482._.js
- 大小: 5371 字节
- 行数: 58
- 预览: module.exports = [
"[project]/mission-control/src/app/favicon.ico.mjs { IMAGE => \"[project]/mission...

#### [root-of-the-server]__19e8ba39._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[root-of-the-server]__19e8ba39._.js
- 大小: 25996 字节
- 行数: 291
- 预览: module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [extern...

#### [root-of-the-server]__1d2a8f66._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[root-of-the-server]__1d2a8f66._.js
- 大小: 5371 字节
- 行数: 58
- 预览: module.exports = [
"[project]/mission-control/src/app/favicon.ico.mjs { IMAGE => \"[project]/mission...

#### [root-of-the-server]__3b25e5b9._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[root-of-the-server]__3b25e5b9._.js
- 大小: 7124 字节
- 行数: 155
- 预览: module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [extern...

#### [root-of-the-server]__3c66c023._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[root-of-the-server]__3c66c023._.js
- 大小: 5343 字节
- 行数: 58
- 预览: module.exports = [
"[project]/mission-control/src/app/favicon.ico.mjs { IMAGE => \"[project]/mission...

#### [root-of-the-server]__51834c7f._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[root-of-the-server]__51834c7f._.js
- 大小: 5399 字节
- 行数: 58
- 预览: module.exports = [
"[project]/mission-control/src/app/favicon.ico.mjs { IMAGE => \"[project]/mission...

#### [root-of-the-server]__5496d2d5._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[root-of-the-server]__5496d2d5._.js
- 大小: 5385 字节
- 行数: 58
- 预览: module.exports = [
"[project]/mission-control/src/app/favicon.ico.mjs { IMAGE => \"[project]/mission...

#### [root-of-the-server]__a1cd19e6._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[root-of-the-server]__a1cd19e6._.js
- 大小: 11058 字节
- 行数: 148
- 预览: module.exports = [
"[next]/internal/font/google/inter_fe8b9d92.module.css [app-rsc] (css module)", (...

#### [root-of-the-server]__bec5f3db._.js
- 路径: mission-control\.next\dev\server\chunks\ssr\[root-of-the-server]__bec5f3db._.js
- 大小: 5357 字节
- 行数: 58
- 预览: module.exports = [
"[project]/mission-control/src/app/favicon.ico.mjs { IMAGE => \"[project]/mission...

#### interception-route-rewrite-manifest.js
- 路径: mission-control\.next\dev\server\interception-route-rewrite-manifest.js
- 大小: 48 字节
- 行数: 1
- 预览: self.__INTERCEPTION_ROUTE_REWRITE_MANIFEST="[]";

#### middleware-manifest.json
- 路径: mission-control\.next\dev\server\middleware-manifest.json
- 大小: 83 字节
- 行数: 6
- 预览: {
  "version": 3,
  "middleware": {},
  "sortedMiddleware": [],
  "functions": {}
}

#### next-font-manifest.js
- 路径: mission-control\.next\dev\server\next-font-manifest.js
- 大小: 508 字节
- 行数: 1
- 预览: self.__NEXT_FONT_MANIFEST="{\n  \"app\": {\n    \"[project]/mission-control/src/app/_not-found/page\...

#### next-font-manifest.json
- 路径: mission-control\.next\dev\server\next-font-manifest.json
- 大小: 446 字节
- 行数: 15
- 预览: {
  "app": {
    "[project]/mission-control/src/app/_not-found/page": [
      "static/media/83afe278...

#### pages-manifest.json
- 路径: mission-control\.next\dev\server\pages-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.js
- 路径: mission-control\.next\dev\server\server-reference-manifest.js
- 大小: 138 字节
- 行数: 1
- 预览: self.__RSC_SERVER_MANIFEST="{\n  \"node\": {},\n  \"edge\": {},\n  \"encryptionKey\": \"JALBis56d6Ty...

#### server-reference-manifest.json
- 路径: mission-control\.next\dev\server\server-reference-manifest.json
- 大小: 97 字节
- 行数: 5
- 预览: {
  "node": {},
  "edge": {},
  "encryptionKey": "JALBis56d6TyYULkYeQs/Fhu6OWqU6Gv5jsmgMq29hw="
}

#### 2f884_@swc_helpers_cjs_871cbab9._.js
- 路径: mission-control\.next\dev\static\chunks\2f884_@swc_helpers_cjs_871cbab9._.js
- 大小: 2004 字节
- 行数: 49
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### 2f884_next_dist_client_components_builtin_global-error_8938903c.js
- 路径: mission-control\.next\dev\static\chunks\2f884_next_dist_client_components_builtin_global-error_8938903c.js
- 大小: 206 字节
- 行数: 6
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### mission-control_a0ff3932._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_a0ff3932._.js
- 大小: 734 字节
- 行数: 15
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### mission-control_src_app_calendar_page_tsx_63d500ec._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_calendar_page_tsx_63d500ec._.js
- 大小: 638 字节
- 行数: 14
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### mission-control_src_app_content_page_tsx_63d500ec._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_content_page_tsx_63d500ec._.js
- 大小: 280 字节
- 行数: 8
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### mission-control_src_app_favicon_ico_mjs_0de4dfff._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_favicon_ico_mjs_0de4dfff._.js
- 大小: 255 字节
- 行数: 8
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### mission-control_src_app_layout_tsx_8938903c._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_layout_tsx_8938903c._.js
- 大小: 311 字节
- 行数: 9
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### mission-control_src_app_memory_page_tsx_63d500ec._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_memory_page_tsx_63d500ec._.js
- 大小: 259 字节
- 行数: 8
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### mission-control_src_app_office_page_tsx_4fa98525._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_office_page_tsx_4fa98525._.js
- 大小: 38666 字节
- 行数: 523
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### mission-control_src_app_office_page_tsx_63d500ec._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_office_page_tsx_63d500ec._.js
- 大小: 279 字节
- 行数: 8
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### mission-control_src_app_page_tsx_63d500ec._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_page_tsx_63d500ec._.js
- 大小: 206 字节
- 行数: 6
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### mission-control_src_app_tasks_page_tsx_2beaa975._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_tasks_page_tsx_2beaa975._.js
- 大小: 35601 字节
- 行数: 573
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### mission-control_src_app_tasks_page_tsx_63d500ec._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_tasks_page_tsx_63d500ec._.js
- 大小: 278 字节
- 行数: 8
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### mission-control_src_app_team_page_tsx_63d500ec._.js
- 路径: mission-control\.next\dev\static\chunks\mission-control_src_app_team_page_tsx_63d500ec._.js
- 大小: 277 字节
- 行数: 8
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### [turbopack]_browser_dev_hmr-client_hmr-client_ts_1a1ca904._.js
- 路径: mission-control\.next\dev\static\chunks\[turbopack]_browser_dev_hmr-client_hmr-client_ts_1a1ca904._.js
- 大小: 671 字节
- 行数: 13
- 预览: (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document....

#### [turbopack]_browser_dev_hmr-client_hmr-client_ts_d37b1410._.js
- 路径: mission-control\.next\dev\static\chunks\[turbopack]_browser_dev_hmr-client_hmr-client_ts_d37b1410._.js
- 大小: 288 字节
- 行数: 8
- 预览: (globalThis.TURBOPACK_CHUNK_LISTS || (globalThis.TURBOPACK_CHUNK_LISTS = [])).push({
    script: typ...

#### _buildManifest.js
- 路径: mission-control\.next\dev\static\development\_buildManifest.js
- 大小: 219 字节
- 行数: 11
- 预览: self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallba...

#### _clientMiddlewareManifest.json
- 路径: mission-control\.next\dev\static\development\_clientMiddlewareManifest.json
- 大小: 2 字节
- 行数: 1
- 预览: []

#### _ssgManifest.js
- 路径: mission-control\.next\dev\static\development\_ssgManifest.js
- 大小: 76 字节
- 行数: 1
- 预览: self.__SSG_MANIFEST=new Set;self.__SSG_MANIFEST_CB&&self.__SSG_MANIFEST_CB()

#### build-diagnostics.json
- 路径: mission-control\.next\diagnostics\build-diagnostics.json
- 大小: 93 字节
- 行数: 6
- 预览: {
  "buildStage": "static-generation",
  "buildOptions": {
    "useBuildWorker": "true"
  }
}

#### framework.json
- 路径: mission-control\.next\diagnostics\framework.json
- 大小: 37 字节
- 行数: 1
- 预览: {"name":"Next.js","version":"16.1.6"}

#### export-marker.json
- 路径: mission-control\.next\export-marker.json
- 大小: 111 字节
- 行数: 6
- 预览: {
  "version": 1,
  "hasExportPathMap": false,
  "exportTrailingSlash": false,
  "isNextImageImporte...

#### fallback-build-manifest.json
- 路径: mission-control\.next\fallback-build-manifest.json
- 大小: 234 字节
- 行数: 12
- 预览: {
  "pages": {
    "/_app": []
  },
  "devFiles": [],
  "polyfillFiles": [],
  "lowPriorityFiles": [...

#### package.json
- 路径: mission-control\.next\package.json
- 大小: 20 字节
- 行数: 1
- 预览: {"type": "commonjs"}

#### prerender-manifest.json
- 路径: mission-control\.next\prerender-manifest.json
- 大小: 6674 字节
- 行数: 258
- 预览: {
  "version": 4,
  "routes": {
    "/_global-error": {
      "experimentalBypassFor": [
        {
 ...

#### routes-manifest.json
- 路径: mission-control\.next\routes-manifest.json
- 大小: 2497 字节
- 行数: 104
- 预览: {
  "version": 3,
  "pages404": true,
  "appType": "app",
  "caseSensitive": false,
  "basePath": ""...

#### app-paths-manifest.json
- 路径: mission-control\.next\server\app\calendar\page\app-paths-manifest.json
- 大小: 46 字节
- 行数: 3
- 预览: {
  "/calendar/page": "app/calendar/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\server\app\calendar\page\build-manifest.json
- 大小: 411 字节
- 行数: 17
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### next-font-manifest.json
- 路径: mission-control\.next\server\app\calendar\page\next-font-manifest.json
- 大小: 274 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/calendar/page": [
      "static/m...

#### react-loadable-manifest.json
- 路径: mission-control\.next\server\app\calendar\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\server\app\calendar\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\server\app\calendar\page.js
- 大小: 1052 字节
- 行数: 17
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/calendar/page.js")
R.c("server/...

#### page.js.nft.json
- 路径: mission-control\.next\server\app\calendar\page.js.nft.json
- 大小: 5066 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../../node_modules/next/dist/client/components/app-router-headers.js","...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\server\app\calendar\page_client-reference-manifest.js
- 大小: 8075 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/calendar/pa...

#### app-paths-manifest.json
- 路径: mission-control\.next\server\app\content\page\app-paths-manifest.json
- 大小: 44 字节
- 行数: 3
- 预览: {
  "/content/page": "app/content/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\server\app\content\page\build-manifest.json
- 大小: 411 字节
- 行数: 17
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### next-font-manifest.json
- 路径: mission-control\.next\server\app\content\page\next-font-manifest.json
- 大小: 273 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/content/page": [
      "static/me...

#### react-loadable-manifest.json
- 路径: mission-control\.next\server\app\content\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\server\app\content\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\server\app\content\page.js
- 大小: 1050 字节
- 行数: 17
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/content/page.js")
R.c("server/c...

#### page.js.nft.json
- 路径: mission-control\.next\server\app\content\page.js.nft.json
- 大小: 4990 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../../node_modules/next/dist/client/components/app-router-headers.js","...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\server\app\content\page_client-reference-manifest.js
- 大小: 7923 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/content/pag...

#### app-paths-manifest.json
- 路径: mission-control\.next\server\app\favicon.ico\route\app-paths-manifest.json
- 大小: 54 字节
- 行数: 3
- 预览: {
  "/favicon.ico/route": "app/favicon.ico/route.js"
}

#### build-manifest.json
- 路径: mission-control\.next\server\app\favicon.ico\route\build-manifest.json
- 大小: 194 字节
- 行数: 11
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### route.js
- 路径: mission-control\.next\server\app\favicon.ico\route.js
- 大小: 348 字节
- 行数: 7
- 预览: var R=require("../../chunks/[turbopack]_runtime.js")("server/app/favicon.ico/route.js")
R.c("server/...

#### route.js.nft.json
- 路径: mission-control\.next\server\app\favicon.ico\route.js.nft.json
- 大小: 3977 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../../node_modules/next/dist/client/components/app-router-headers.js","...

#### app-paths-manifest.json
- 路径: mission-control\.next\server\app\memory\page\app-paths-manifest.json
- 大小: 42 字节
- 行数: 3
- 预览: {
  "/memory/page": "app/memory/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\server\app\memory\page\build-manifest.json
- 大小: 411 字节
- 行数: 17
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### next-font-manifest.json
- 路径: mission-control\.next\server\app\memory\page\next-font-manifest.json
- 大小: 272 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/memory/page": [
      "static/med...

#### react-loadable-manifest.json
- 路径: mission-control\.next\server\app\memory\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\server\app\memory\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\server\app\memory\page.js
- 大小: 1048 字节
- 行数: 17
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/memory/page.js")
R.c("server/ch...

#### page.js.nft.json
- 路径: mission-control\.next\server\app\memory\page.js.nft.json
- 大小: 4988 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../../node_modules/next/dist/client/components/app-router-headers.js","...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\server\app\memory\page_client-reference-manifest.js
- 大小: 7923 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/memory/page...

#### app-paths-manifest.json
- 路径: mission-control\.next\server\app\office\page\app-paths-manifest.json
- 大小: 42 字节
- 行数: 3
- 预览: {
  "/office/page": "app/office/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\server\app\office\page\build-manifest.json
- 大小: 411 字节
- 行数: 17
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### next-font-manifest.json
- 路径: mission-control\.next\server\app\office\page\next-font-manifest.json
- 大小: 272 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/office/page": [
      "static/med...

#### react-loadable-manifest.json
- 路径: mission-control\.next\server\app\office\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\server\app\office\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\server\app\office\page.js
- 大小: 1048 字节
- 行数: 17
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/office/page.js")
R.c("server/ch...

#### page.js.nft.json
- 路径: mission-control\.next\server\app\office\page.js.nft.json
- 大小: 4988 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../../node_modules/next/dist/client/components/app-router-headers.js","...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\server\app\office\page_client-reference-manifest.js
- 大小: 7927 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/office/page...

#### app-paths-manifest.json
- 路径: mission-control\.next\server\app\page\app-paths-manifest.json
- 大小: 28 字节
- 行数: 3
- 预览: {
  "/page": "app/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\server\app\page\build-manifest.json
- 大小: 411 字节
- 行数: 17
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### next-font-manifest.json
- 路径: mission-control\.next\server\app\page\next-font-manifest.json
- 大小: 265 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/page": [
      "static/media/83af...

#### react-loadable-manifest.json
- 路径: mission-control\.next\server\app\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\server\app\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\server\app\page.js
- 大小: 1031 字节
- 行数: 17
- 预览: var R=require("../chunks/ssr/[turbopack]_runtime.js")("server/app/page.js")
R.c("server/chunks/ssr/[...

#### page.js.nft.json
- 路径: mission-control\.next\server\app\page.js.nft.json
- 大小: 4710 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../node_modules/next/dist/client/components/app-router-headers.js","../...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\server\app\page_client-reference-manifest.js
- 大小: 7754 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/page"] = {"...

#### app-paths-manifest.json
- 路径: mission-control\.next\server\app\tasks\page\app-paths-manifest.json
- 大小: 40 字节
- 行数: 3
- 预览: {
  "/tasks/page": "app/tasks/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\server\app\tasks\page\build-manifest.json
- 大小: 411 字节
- 行数: 17
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### next-font-manifest.json
- 路径: mission-control\.next\server\app\tasks\page\next-font-manifest.json
- 大小: 271 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/tasks/page": [
      "static/medi...

#### react-loadable-manifest.json
- 路径: mission-control\.next\server\app\tasks\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\server\app\tasks\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\server\app\tasks\page.js
- 大小: 1046 字节
- 行数: 17
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/tasks/page.js")
R.c("server/chu...

#### page.js.nft.json
- 路径: mission-control\.next\server\app\tasks\page.js.nft.json
- 大小: 4986 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../../node_modules/next/dist/client/components/app-router-headers.js","...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\server\app\tasks\page_client-reference-manifest.js
- 大小: 7921 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/tasks/page"...

#### app-paths-manifest.json
- 路径: mission-control\.next\server\app\team\page\app-paths-manifest.json
- 大小: 38 字节
- 行数: 3
- 预览: {
  "/team/page": "app/team/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\server\app\team\page\build-manifest.json
- 大小: 411 字节
- 行数: 17
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### next-font-manifest.json
- 路径: mission-control\.next\server\app\team\page\next-font-manifest.json
- 大小: 270 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/team/page": [
      "static/media...

#### react-loadable-manifest.json
- 路径: mission-control\.next\server\app\team\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\server\app\team\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\server\app\team\page.js
- 大小: 1042 字节
- 行数: 17
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/team/page.js")
R.c("server/chun...

#### page.js.nft.json
- 路径: mission-control\.next\server\app\team\page.js.nft.json
- 大小: 4984 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../../node_modules/next/dist/client/components/app-router-headers.js","...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\server\app\team\page_client-reference-manifest.js
- 大小: 7915 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/team/page"]...

#### app-paths-manifest.json
- 路径: mission-control\.next\server\app\_global-error\page\app-paths-manifest.json
- 大小: 56 字节
- 行数: 3
- 预览: {
  "/_global-error/page": "app/_global-error/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\server\app\_global-error\page\build-manifest.json
- 大小: 411 字节
- 行数: 17
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### next-font-manifest.json
- 路径: mission-control\.next\server\app\_global-error\page\next-font-manifest.json
- 大小: 94 字节
- 行数: 6
- 预览: {
  "pages": {},
  "app": {},
  "appUsingSizeAdjust": false,
  "pagesUsingSizeAdjust": false
}

#### react-loadable-manifest.json
- 路径: mission-control\.next\server\app\_global-error\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\server\app\_global-error\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\server\app\_global-error\page.js
- 大小: 655 字节
- 行数: 12
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/_global-error/page.js")
R.c("se...

#### page.js.nft.json
- 路径: mission-control\.next\server\app\_global-error\page.js.nft.json
- 大小: 4347 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../../node_modules/next/dist/client/components/app-router-headers.js","...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\server\app\_global-error\page_client-reference-manifest.js
- 大小: 6216 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/_global-err...

#### app-paths-manifest.json
- 路径: mission-control\.next\server\app\_not-found\page\app-paths-manifest.json
- 大小: 50 字节
- 行数: 3
- 预览: {
  "/_not-found/page": "app/_not-found/page.js"
}

#### build-manifest.json
- 路径: mission-control\.next\server\app\_not-found\page\build-manifest.json
- 大小: 411 字节
- 行数: 17
- 预览: {
  "devFiles": [],
  "ampDevFiles": [],
  "polyfillFiles": [
    "static/chunks/a6dad97d9634a72d.js...

#### next-font-manifest.json
- 路径: mission-control\.next\server\app\_not-found\page\next-font-manifest.json
- 大小: 276 字节
- 行数: 11
- 预览: {
  "pages": {},
  "app": {
    "[project]/mission-control/src/app/_not-found/page": [
      "static...

#### react-loadable-manifest.json
- 路径: mission-control\.next\server\app\_not-found\page\react-loadable-manifest.json
- 大小: 2 字节
- 行数: 1
- 预览: {}

#### server-reference-manifest.json
- 路径: mission-control\.next\server\app\_not-found\page\server-reference-manifest.json
- 大小: 30 字节
- 行数: 4
- 预览: {
  "node": {},
  "edge": {}
}

#### page.js
- 路径: mission-control\.next\server\app\_not-found\page.js
- 大小: 899 字节
- 行数: 15
- 预览: var R=require("../../chunks/ssr/[turbopack]_runtime.js")("server/app/_not-found/page.js")
R.c("serve...

#### page.js.nft.json
- 路径: mission-control\.next\server\app\_not-found\page.js.nft.json
- 大小: 4719 字节
- 行数: 1
- 预览: {"version":1,"files":["../../../../node_modules/next/dist/client/components/app-router-headers.js","...

#### page_client-reference-manifest.js
- 路径: mission-control\.next\server\app\_not-found\page_client-reference-manifest.js
- 大小: 6994 字节
- 行数: 3
- 预览: globalThis.__RSC_MANIFEST = globalThis.__RSC_MANIFEST || {};
globalThis.__RSC_MANIFEST["/_not-found/...

#### app-paths-manifest.json
- 路径: mission-control\.next\server\app-paths-manifest.json
- 大小: 422 字节
- 行数: 12
- 预览: {
  "/_global-error/page": "app/_global-error/page.js",
  "/_not-found/page": "app/_not-found/page.j...

#### mission-control__next-internal_server_app_favicon_ico_route_actions_e260dc97.js
- 路径: mission-control\.next\server\chunks\mission-control__next-internal_server_app_favicon_ico_route_actions_e260dc97.js
- 大小: 141 字节
- 行数: 3
- 预览: module.exports=[85939,(e,o,d)=>{}];

//# sourceMappingURL=mission-control__next-internal_server_app_...

#### 2f884_next_dist_client_components_a7c05c66._.js
- 路径: mission-control\.next\server\chunks\ssr\2f884_next_dist_client_components_a7c05c66._.js
- 大小: 2489 字节
- 行数: 3
- 预览: module.exports=[94350,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object...

#### 2f884_next_dist_client_components_builtin_forbidden_2875b889.js
- 路径: mission-control\.next\server\chunks\ssr\2f884_next_dist_client_components_builtin_forbidden_2875b889.js
- 大小: 619 字节
- 行数: 3
- 预览: module.exports=[71823,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object...

#### 2f884_next_dist_client_components_builtin_global-error_10ec4e1b.js
- 路径: mission-control\.next\server\chunks\ssr\2f884_next_dist_client_components_builtin_global-error_10ec4e1b.js
- 大小: 509 字节
- 行数: 3
- 预览: module.exports=[29201,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(34732);a.n(d("[project]/mission-c...

#### 2f884_next_dist_client_components_builtin_unauthorized_13f213e6.js
- 路径: mission-control\.next\server\chunks\ssr\2f884_next_dist_client_components_builtin_unauthorized_13f213e6.js
- 大小: 632 字节
- 行数: 3
- 预览: module.exports=[68851,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object...

#### 2f884_next_dist_server_route-modules_app-page_vendored_ssr_react-dom_0e45cae6.js
- 路径: mission-control\.next\server\chunks\ssr\2f884_next_dist_server_route-modules_app-page_vendored_ssr_react-dom_0e45cae6.js
- 大小: 206 字节
- 行数: 3
- 预览: module.exports=[74525,(a,b,c)=>{"use strict";b.exports=a.r(37194).vendored["react-ssr"].ReactDOM}];
...

#### mission-control_src_app_7fc4c801._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_src_app_7fc4c801._.js
- 大小: 237 字节
- 行数: 3
- 预览: module.exports=[90942,a=>{a.v("/_next/static/media/favicon.0b3bf435.ico")},26899,a=>{"use strict";le...

#### mission-control_src_app_office_page_tsx_803d7a87._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_src_app_office_page_tsx_803d7a87._.js
- 大小: 6425 字节
- 行数: 3
- 预览: module.exports=[83197,a=>{"use strict";var b=a.i(55217),c=a.i(58214);let d=[{id:1,name:"OpenClaw",ro...

#### mission-control_src_app_tasks_page_tsx_aa585d35._.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control_src_app_tasks_page_tsx_aa585d35._.js
- 大小: 5704 字节
- 行数: 3
- 预览: module.exports=[79217,a=>{"use strict";var b=a.i(55217),c=a.i(58214);let d=[{id:"1",title:"实现记忆库搜索功能...

#### mission-control__next-internal_server_app_calendar_page_actions_25e19e8e.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control__next-internal_server_app_calendar_page_actions_25e19e8e.js
- 大小: 137 字节
- 行数: 3
- 预览: module.exports=[66182,(a,b,c)=>{}];

//# sourceMappingURL=mission-control__next-internal_server_app_...

#### mission-control__next-internal_server_app_content_page_actions_db6b36c7.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control__next-internal_server_app_content_page_actions_db6b36c7.js
- 大小: 136 字节
- 行数: 3
- 预览: module.exports=[24431,(a,b,c)=>{}];

//# sourceMappingURL=mission-control__next-internal_server_app_...

#### mission-control__next-internal_server_app_memory_page_actions_b777afb8.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control__next-internal_server_app_memory_page_actions_b777afb8.js
- 大小: 135 字节
- 行数: 3
- 预览: module.exports=[43182,(a,b,c)=>{}];

//# sourceMappingURL=mission-control__next-internal_server_app_...

#### mission-control__next-internal_server_app_office_page_actions_2f8c57f0.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control__next-internal_server_app_office_page_actions_2f8c57f0.js
- 大小: 135 字节
- 行数: 3
- 预览: module.exports=[15525,(a,b,c)=>{}];

//# sourceMappingURL=mission-control__next-internal_server_app_...

#### mission-control__next-internal_server_app_page_actions_5765b161.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control__next-internal_server_app_page_actions_5765b161.js
- 大小: 128 字节
- 行数: 3
- 预览: module.exports=[39903,(a,b,c)=>{}];

//# sourceMappingURL=mission-control__next-internal_server_app_...

#### mission-control__next-internal_server_app_tasks_page_actions_03150f16.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control__next-internal_server_app_tasks_page_actions_03150f16.js
- 大小: 134 字节
- 行数: 3
- 预览: module.exports=[32659,(a,b,c)=>{}];

//# sourceMappingURL=mission-control__next-internal_server_app_...

#### mission-control__next-internal_server_app_team_page_actions_ca921dda.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control__next-internal_server_app_team_page_actions_ca921dda.js
- 大小: 133 字节
- 行数: 3
- 预览: module.exports=[69595,(a,b,c)=>{}];

//# sourceMappingURL=mission-control__next-internal_server_app_...

#### mission-control__next-internal_server_app__global-error_page_actions_669bd410.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control__next-internal_server_app__global-error_page_actions_669bd410.js
- 大小: 142 字节
- 行数: 3
- 预览: module.exports=[71657,(a,b,c)=>{}];

//# sourceMappingURL=mission-control__next-internal_server_app_...

#### mission-control__next-internal_server_app__not-found_page_actions_9d5f9b63.js
- 路径: mission-control\.next\server\chunks\ssr\mission-control__next-internal_server_app__not-found_page_actions_9d5f9b63.js
- 大小: 139 字节
- 行数: 3
- 预览: module.exports=[12620,(a,b,c)=>{}];

//# sourceMappingURL=mission-control__next-internal_server_app_...

#### [root-of-the-server]__15770b5f._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__15770b5f._.js
- 大小: 1382 字节
- 行数: 3
- 预览: module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",(...

#### [root-of-the-server]__16b9a813._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__16b9a813._.js
- 大小: 3559 字节
- 行数: 3
- 预览: module.exports=[43285,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/dynamic-access-async-stor...

#### [root-of-the-server]__24c3d9ba._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__24c3d9ba._.js
- 大小: 1378 字节
- 行数: 3
- 预览: module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",(...

#### [root-of-the-server]__288a9a7d._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__288a9a7d._.js
- 大小: 1374 字节
- 行数: 3
- 预览: module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",(...

#### [root-of-the-server]__355965c2._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__355965c2._.js
- 大小: 1386 字节
- 行数: 3
- 预览: module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",(...

#### [root-of-the-server]__35694ab8._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__35694ab8._.js
- 大小: 1803 字节
- 行数: 3
- 预览: module.exports=[43285,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/dynamic-access-async-stor...

#### [root-of-the-server]__3e536bdf._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__3e536bdf._.js
- 大小: 891 字节
- 行数: 3
- 预览: module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",(...

#### [root-of-the-server]__3ea938b8._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__3ea938b8._.js
- 大小: 1355 字节
- 行数: 3
- 预览: module.exports=[69133,(a,b,c)=>{"use strict";b.exports=a.r(37194).vendored.contexts.HooksClientConte...

#### [root-of-the-server]__490719ac._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__490719ac._.js
- 大小: 2603 字节
- 行数: 3
- 预览: module.exports=[70406,(a,b,c)=>{b.exports=a.x("next/dist/compiled/@opentelemetry/api",()=>require("n...

#### [root-of-the-server]__512117af._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__512117af._.js
- 大小: 2319 字节
- 行数: 3
- 预览: module.exports=[18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime...

#### [root-of-the-server]__8def3037._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__8def3037._.js
- 大小: 1380 字节
- 行数: 3
- 预览: module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",(...

#### [root-of-the-server]__9d867e4b._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__9d867e4b._.js
- 大小: 2087 字节
- 行数: 3
- 预览: module.exports=[47591,a=>{a.v({className:"inter_fe8b9d92-module__LINzvG__className",variable:"inter_...

#### [root-of-the-server]__dfad9d47._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__dfad9d47._.js
- 大小: 2204 字节
- 行数: 3
- 预览: module.exports=[70406,(a,b,c)=>{b.exports=a.x("next/dist/compiled/@opentelemetry/api",()=>require("n...

#### [root-of-the-server]__eebb32a2._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__eebb32a2._.js
- 大小: 1896 字节
- 行数: 4
- 预览: module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",(...

#### [root-of-the-server]__f760a6a5._.js
- 路径: mission-control\.next\server\chunks\ssr\[root-of-the-server]__f760a6a5._.js
- 大小: 1386 字节
- 行数: 3
- 预览: module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",(...

#### [externals]_next_dist_a6d89067._.js
- 路径: mission-control\.next\server\chunks\[externals]_next_dist_a6d89067._.js
- 大小: 1055 字节
- 行数: 3
- 预览: module.exports=[18622,(e,r,t)=>{r.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime...

#### functions-config-manifest.json
- 路径: mission-control\.next\server\functions-config-manifest.json
- 大小: 37 字节
- 行数: 4
- 预览: {
  "version": 1,
  "functions": {}
}

#### interception-route-rewrite-manifest.js
- 路径: mission-control\.next\server\interception-route-rewrite-manifest.js
- 大小: 48 字节
- 行数: 1
- 预览: self.__INTERCEPTION_ROUTE_REWRITE_MANIFEST="[]";

#### middleware-manifest.json
- 路径: mission-control\.next\server\middleware-manifest.json
- 大小: 83 字节
- 行数: 6
- 预览: {
  "version": 3,
  "middleware": {},
  "sortedMiddleware": [],
  "functions": {}
}

#### next-font-manifest.js
- 路径: mission-control\.next\server\next-font-manifest.js
- 大小: 1630 字节
- 行数: 1
- 预览: self.__NEXT_FONT_MANIFEST="{\n  \"app\": {\n    \"[project]/mission-control/src/app/_not-found/page\...

#### next-font-manifest.json
- 路径: mission-control\.next\server\next-font-manifest.json
- 大小: 1508 字节
- 行数: 39
- 预览: {
  "app": {
    "[project]/mission-control/src/app/_not-found/page": [
      "static/media/83afe278...

#### pages-manifest.json
- 路径: mission-control\.next\server\pages-manifest.json
- 大小: 58 字节
- 行数: 4
- 预览: {
  "/404": "pages/404.html",
  "/500": "pages/500.html"
}

#### server-reference-manifest.js
- 路径: mission-control\.next\server\server-reference-manifest.js
- 大小: 138 字节
- 行数: 1
- 预览: self.__RSC_SERVER_MANIFEST="{\n  \"node\": {},\n  \"edge\": {},\n  \"encryptionKey\": \"LvST//qLE0pj...

#### server-reference-manifest.json
- 路径: mission-control\.next\server\server-reference-manifest.json
- 大小: 97 字节
- 行数: 5
- 预览: {
  "node": {},
  "edge": {},
  "encryptionKey": "LvST//qLE0pjS7iWhduKuRmi4YOJcAz2u4Q+kXHPOGQ="
}

#### 05acb8b0bd6792f1.js
- 路径: mission-control\.next\static\chunks\05acb8b0bd6792f1.js
- 大小: 282 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### 27b2ccd02e69294a.js
- 路径: mission-control\.next\static\chunks\27b2ccd02e69294a.js
- 大小: 5722 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### 4ba9ab40b478c054.js
- 路径: mission-control\.next\static\chunks\4ba9ab40b478c054.js
- 大小: 6442 字节
- 行数: 1
- 预览: (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentSc...

#### _buildManifest.js
- 路径: mission-control\.next\static\PJ10zMfQba1Vu3Ws6Alb_\_buildManifest.js
- 大小: 219 字节
- 行数: 11
- 预览: self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallba...

#### _clientMiddlewareManifest.json
- 路径: mission-control\.next\static\PJ10zMfQba1Vu3Ws6Alb_\_clientMiddlewareManifest.json
- 大小: 2 字节
- 行数: 1
- 预览: []

#### _ssgManifest.js
- 路径: mission-control\.next\static\PJ10zMfQba1Vu3Ws6Alb_\_ssgManifest.js
- 大小: 80 字节
- 行数: 1
- 预览: self.__SSG_MANIFEST=new Set([]);self.__SSG_MANIFEST_CB&&self.__SSG_MANIFEST_CB()

#### convex.json
- 路径: mission-control\convex.json
- 大小: 143 字节
- 行数: 9
- 预览: {
  "project": "local",
  "deploy": {
    "prod": {
      "url": "http://localhost:54321"
    }
  },...

#### README.md
- 路径: mission-control\README.md
- 大小: 1450 字节
- 行数: 37
- 预览: This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs...

#### import-memories.js
- 路径: mission-control\scripts\import-memories.js
- 大小: 3435 字节
- 行数: 147
- 预览: const fs = require('fs');
const path = require('path');

// 数据导入脚本
// 用于将现有的记忆数据导入到 Convex 数据库

cons...

#### tsconfig.json
- 路径: mission-control\tsconfig.json
- 大小: 718 字节
- 行数: 43
- 预览: {
  "compilerOptions": {
    "target": "ES2017",
    "lib": [
      "dom",
      "dom.iterable",
   ...

#### moments-history.json
- 路径: moments-history.json
- 大小: 671 字节
- 行数: 10
- 预览: [
  {
    "id": "moment_1771857464629",
    "timestamp": "2026-02-23T14:37:44.629Z",
    "content": ...

#### config.json
- 路径: notebooklm-bot\config.json
- 大小: 616 字节
- 行数: 25
- 预览: {
  "openclawApiUrl": "http://127.0.0.1:18789/api/v1",
  "notebooklmUrl": "https://notebooklm.google...

#### package.json
- 路径: notebooklm-bot\package.json
- 大小: 378 字节
- 行数: 20
- 预览: {
  "name": "notebooklm-bot",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "sc...

#### openclaw-doubao.json
- 路径: openclaw-doubao.json
- 大小: 1767 字节
- 行数: 84
- 预览: {
  "meta": {
    "lastTouchedVersion": "2026.2.21-2",
    "lastTouchedAt": "2026-02-24T14:30:00.000...

#### openclaw-trea.json
- 路径: openclaw-trea.json
- 大小: 1663 字节
- 行数: 82
- 预览: {
  "meta": {
    "lastTouchedVersion": "2026.2.21-2",
    "lastTouchedAt": "2026-02-24T14:30:00.000...

#### openclaw.json
- 路径: openclaw.json
- 大小: 3049 字节
- 行数: 115
- 预览: {
  "meta": {
    "lastTouchedVersion": "2026.2.21-2",
    "lastTouchedAt": "2026-02-23T23:00:00.000...

#### package.json
- 路径: package.json
- 大小: 553 字节
- 行数: 23
- 预览: {
  "name": "company-brain-system",
  "version": "1.0.0",
  "description": "公司大脑系统 - 智能体调度中心",
  "ma...

#### pcec-cycle.js
- 路径: pcec-cycle.js
- 大小: 11874 字节
- 行数: 486
- 预览: /**
 * Periodic Cognitive Expansion Cycle (PCEC) 系统
 * 用于实现8小时不间断进化
 * 状态: ENHANCED (增强版) - 8小时进化方案优...

#### pcec_5.md
- 路径: pcec_executions\pcec_5.md
- 大小: 359 字节
- 行数: 27
- 预览: # PCEC 执行记录 #5 - 定时触发

## 执行信息
- 执行时间: 2026-02-24T03:04:17.484Z
- 触发方式: 定时调度器
- 模式: 标准模式

## 执行目标
每一...

#### config.json
- 路径: plugins\doubao-api\config.json
- 大小: 1801 字节
- 行数: 85
- 预览: {
  "api": {
    "key": "c13b2982-0aab-4c75-9404-0deb12a219ec",
    "endpoint": "https://ark.cn-beij...

#### doubao-api.js
- 路径: plugins\doubao-api\doubao-api.js
- 大小: 4147 字节
- 行数: 150
- 预览: // 火山引擎豆包API集成模块
const https = require('https');

class DoubaoAPI {
    constructor(apiKey) {
      ...

#### publish-moments-test.js
- 路径: publish-moments-test.js
- 大小: 2373 字节
- 行数: 93
- 预览: const express = require('express');
const fs = require('fs');
const path = require('path');

const a...

#### register-evomap.js
- 路径: register-evomap.js
- 大小: 1139 字节
- 行数: 52
- 预览: const https = require('https');

const postData = JSON.stringify({
  protocol: 'gep-a2a',
  protocol...

#### search_1771967876444_nilafwrgk.json
- 路径: search\search_1771967876444_nilafwrgk.json
- 大小: 2141 字节
- 行数: 58
- 预览: {
  "id": "search_1771967876444_nilafwrgk",
  "query": "人工智能最新发展",
  "intent": "general",
  "engine"...

#### send-evomap-request.js
- 路径: send-evomap-request.js
- 大小: 720 字节
- 行数: 37
- 预览: const http = require('http');

const postData = JSON.stringify({
  message: '@绿茶 执行状态：❌ 未完成的任务'
});
...

#### package.json
- 路径: services\wechat-auth\package.json
- 大小: 483 字节
- 行数: 22
- 预览: {
  "name": "wechat-auth-service",
  "version": "1.0.0",
  "description": "微信账号授权服务，实现微信登录和会话管理",
  ...

#### package.json
- 路径: services\wechat-message\package.json
- 大小: 499 字节
- 行数: 22
- 预览: {
  "name": "wechat-message-service",
  "version": "1.0.0",
  "description": "微信消息监听与自动回复服务，实现消息的实时监...

#### package.json
- 路径: services\wechat-moments\package.json
- 大小: 533 字节
- 行数: 24
- 预览: {
  "name": "wechat-moments-service",
  "version": "1.0.0",
  "description": "微信朋友圈自动化发布服务，实现内容生成、定时...

#### package.json
- 路径: services\wechat-profile\package.json
- 大小: 499 字节
- 行数: 23
- 预览: {
  "name": "wechat-profile-service",
  "version": "1.0.0",
  "description": "微信形象管理服务，实现智能体个人形象的自主设...

#### guoma-style.md
- 路径: shared-memory\user-preferences\guoma-style.md
- 大小: 259 字节
- 行数: 26
- 预览: # 果妈风格指南

## 品牌定位
- 专注于个人成长和知识分享
- 亲切、专业、有温度的内容风格
- 注重实用性和可操作性

## 写作规范
- 使用简洁明了的语言
- 避免专业术语，保持通俗易懂
...

#### simple-ark-test.js
- 路径: simple-ark-test.js
- 大小: 2589 字节
- 行数: 103
- 预览: const https = require('https');

async function testArkApi() {
  console.log('=== 简化测试火山引擎Ark API ==...

#### simple-cache-test.js
- 路径: simple-cache-test.js
- 大小: 1750 字节
- 行数: 59
- 预览: const { hotInfoCache } = require('./capabilities/hot-info-cache');

console.log('=== 简单热点信息缓存系统测试 ==...

#### simple-test.js
- 路径: simple-test.js
- 大小: 592 字节
- 行数: 26
- 预览: console.log('开始运行简化测试...');

// 直接测试模块导入
const modulePath = './capabilities/hot-info-cache';
console...

#### origin.json
- 路径: skills\1password\.clawhub\origin.json
- 大小: 141 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "1password",
  "installedVersion": "...

#### get-started.md
- 路径: skills\1password\references\get-started.md
- 大小: 994 字节
- 行数: 18
- 预览: # 1Password CLI get-started (summary)

- Works on macOS, Windows, and Linux.
  - macOS/Linux shells:...

#### _meta.json
- 路径: skills\1password\_meta.json
- 大小: 128 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "1password",
  "version": "1.0.1",
  "p...

#### adl-status.json
- 路径: skills\adl-core\data\adl-status.json
- 大小: 83 字节
- 行数: 5
- 预览: {
  "rollbacksCount": null,
  "lastCheck": 1771965622193,
  "violationsCount": 16
}

#### origin.json
- 路径: skills\apple-notes\.clawhub\origin.json
- 大小: 143 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "apple-notes",
  "installedVersion":...

#### _meta.json
- 路径: skills\apple-notes\_meta.json
- 大小: 130 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "apple-notes",
  "version": "1.0.0",
  ...

#### package.json
- 路径: skills\arakichanxd-claw-sync\package.json
- 大小: 676 字节
- 行数: 30
- 预览: {
  "name": "claw-sync",
  "version": "2.1.0",
  "description": "Secure versioned sync for OpenClaw ...

#### origin.json
- 路径: skills\bear-notes\.clawhub\origin.json
- 大小: 142 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "bear-notes",
  "installedVersion": ...

#### _meta.json
- 路径: skills\bear-notes\_meta.json
- 大小: 129 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "bear-notes",
  "version": "1.0.0",
  "...

#### origin.json
- 路径: skills\blogwatcher\.clawhub\origin.json
- 大小: 143 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "blogwatcher",
  "installedVersion":...

#### SKILL.md
- 路径: skills\blogwatcher\SKILL.md
- 大小: 1219 字节
- 行数: 47
- 预览: ---
name: blogwatcher
description: Monitor blogs and RSS/Atom feeds for updates using the blogwatche...

#### _meta.json
- 路径: skills\blogwatcher\_meta.json
- 大小: 130 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "blogwatcher",
  "version": "1.0.0",
  ...

#### origin.json
- 路径: skills\bluebubbles\.clawhub\origin.json
- 大小: 143 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "bluebubbles",
  "installedVersion":...

#### _meta.json
- 路径: skills\bluebubbles\_meta.json
- 大小: 130 字节
- 行数: 6
- 预览: {
  "ownerId": "kn76fefs432zhff78zmv4q1b2x7zymsz",
  "slug": "bluebubbles",
  "version": "1.0.0",
  ...

#### origin.json
- 路径: skills\camsnap\.clawhub\origin.json
- 大小: 139 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "camsnap",
  "installedVersion": "1....

#### _meta.json
- 路径: skills\camsnap\_meta.json
- 大小: 126 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "camsnap",
  "version": "1.0.0",
  "pub...

#### origin.json
- 路径: skills\canvas\.clawhub\origin.json
- 大小: 138 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "canvas",
  "installedVersion": "1.0...

#### _meta.json
- 路径: skills\canvas\_meta.json
- 大小: 125 字节
- 行数: 6
- 预览: {
  "ownerId": "kn795mk02qrnseb8c0ttqkjtf5818xrv",
  "slug": "canvas",
  "version": "1.0.0",
  "publ...

#### candidate-manager.js
- 路径: skills\capability-evolver\core\candidate-manager.js
- 大小: 4770 字节
- 行数: 194
- 预览: /**
 * 能力候选池管理器
 * 负责接收、管理和评估能力候选
 */

const fs = require('fs');
const path = require('path');

clas...

#### merger.js
- 路径: skills\capability-evolver\core\merger.js
- 大小: 9134 字节
- 行数: 326
- 预览: /**
 * 能力合并器
 * 负责识别和合并相似能力，提升能力的抽象层次，优化能力的调用成本
 */

const fs = require('fs');
const path = require(...

#### alert-1771919697454-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919697454-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919697454-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771919697460-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919697460-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919697460-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771919757462-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919757462-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919757462-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771919757468-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919757468-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919757468-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771919817469-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919817469-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919817469-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771919817479-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919817479-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919817479-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771919877466-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919877466-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919877466-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771919877484-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919877484-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919877484-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771919937471-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919937471-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919937471-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771919937494-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919937494-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919937494-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771919997496-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919997496-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919997496-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771919997543-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919997543-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919997543-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771919997609-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771919997609-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771919997609-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920096914-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920096914-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920096914-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920096932-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920096932-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920096932-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920156914-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920156914-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920156914-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920156938-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920156938-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920156938-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920216919-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920216919-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920216919-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920216954-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920216954-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920216954-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920276924-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920276924-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920276924-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920276959-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920276959-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920276959-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920336935-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920336935-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920336935-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920336974-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920336974-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920336974-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920396948-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920396948-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920396948-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920396987-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920396987-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920396987-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920456963-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920456963-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920456963-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920456986-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920456986-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920456986-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920516960-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920516960-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920516960-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920516990-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920516990-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920516990-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920576972-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920576972-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920576972-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920577005-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920577005-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920577005-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920636994-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920636994-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920636994-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920637014-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920637014-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920637014-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920697011-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920697011-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920697011-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920697060-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920697060-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920697060-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920697259-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920697259-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920697259-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920756993-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920756993-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920756993-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920757044-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920757044-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920757044-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920757261-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920757261-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920757261-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920817095-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920817095-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920817095-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920817131-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920817131-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920817131-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920817269-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920817269-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920817269-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920877007-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920877007-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920877007-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920877132-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920877132-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920877132-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920877302-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920877302-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920877302-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920937017-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920937017-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920937017-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920937139-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920937139-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920937139-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920937560-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920937560-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920937560-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920997034-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920997034-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920997034-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920997145-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920997145-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920997145-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920997238-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920997238-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920997238-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### alert-1771920997570-evolution-stopped.json
- 路径: skills\capability-evolver\data\alerts\alert-1771920997570-evolution-stopped.json
- 大小: 196 字节
- 行数: 8
- 预览: {
  "id": "alert-1771920997570-evolution-stopped",
  "type": "evolution",
  "severity": "medium",
  ...

#### anti-degeneration-lock.json
- 路径: skills\capability-evolver\data\anti-degeneration-lock.json
- 大小: 644 字节
- 行数: 36
- 预览: {
  "status": "ACTIVE",
  "priority": "HIGHEST",
  "constraints": {
    "prohibitedBehaviors": [
   ...

#### capabilities.json
- 路径: skills\capability-evolver\data\capabilities.json
- 大小: 76 字节
- 行数: 4
- 预览: {
  "snapshot": "No capabilities file found",
  "timestamp": 1771940564856
}

#### dashboard-1771919637462.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771919637462.json
- 大小: 1789 字节
- 行数: 79
- 预览: {
  "id": "dashboard-1771919637462",
  "timestamp": 1771919637462,
  "overview": {
    "totalCycles"...

#### dashboard-1771919637478.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771919637478.json
- 大小: 1767 字节
- 行数: 79
- 预览: {
  "id": "dashboard-1771919637478",
  "timestamp": 1771919637478,
  "overview": {
    "totalCycles"...

#### dashboard-1771919637499.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771919637499.json
- 大小: 1766 字节
- 行数: 79
- 预览: {
  "id": "dashboard-1771919637499",
  "timestamp": 1771919637499,
  "overview": {
    "totalCycles"...

#### dashboard-1771919937586.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771919937586.json
- 大小: 4315 字节
- 行数: 167
- 预览: {
  "id": "dashboard-1771919937586",
  "timestamp": 1771919937586,
  "overview": {
    "totalCycles"...

#### dashboard-1771919937612.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771919937612.json
- 大小: 4071 字节
- 行数: 160
- 预览: {
  "id": "dashboard-1771919937612",
  "timestamp": 1771919937612,
  "overview": {
    "totalCycles"...

#### dashboard-1771919937638.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771919937638.json
- 大小: 4074 字节
- 行数: 160
- 预览: {
  "id": "dashboard-1771919937638",
  "timestamp": 1771919937638,
  "overview": {
    "totalCycles"...

#### dashboard-1771920036956.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771920036956.json
- 大小: 4761 字节
- 行数: 184
- 预览: {
  "id": "dashboard-1771920036956",
  "timestamp": 1771920036956,
  "overview": {
    "totalCycles"...

#### dashboard-1771920037035.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771920037035.json
- 大小: 4760 字节
- 行数: 184
- 预览: {
  "id": "dashboard-1771920037035",
  "timestamp": 1771920037035,
  "overview": {
    "totalCycles"...

#### dashboard-1771920037104.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771920037104.json
- 大小: 4760 字节
- 行数: 184
- 预览: {
  "id": "dashboard-1771920037104",
  "timestamp": 1771920037104,
  "overview": {
    "totalCycles"...

#### dashboard-1771920637280.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771920637280.json
- 大小: 9361 字节
- 行数: 344
- 预览: {
  "id": "dashboard-1771920637280",
  "timestamp": 1771920637280,
  "overview": {
    "totalCycles"...

#### dashboard-1771920637373.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771920637373.json
- 大小: 9363 字节
- 行数: 344
- 预览: {
  "id": "dashboard-1771920637373",
  "timestamp": 1771920637373,
  "overview": {
    "totalCycles"...

#### dashboard-1771920637452.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771920637452.json
- 大小: 9360 字节
- 行数: 344
- 预览: {
  "id": "dashboard-1771920637452",
  "timestamp": 1771920637452,
  "overview": {
    "totalCycles"...

#### dashboard-1771920936925.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771920936925.json
- 大小: 12119 字节
- 行数: 440
- 预览: {
  "id": "dashboard-1771920936925",
  "timestamp": 1771920936925,
  "overview": {
    "totalCycles"...

#### dashboard-1771920936963.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771920936963.json
- 大小: 12366 字节
- 行数: 447
- 预览: {
  "id": "dashboard-1771920936963",
  "timestamp": 1771920936963,
  "overview": {
    "totalCycles"...

#### dashboard-1771920937262.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771920937262.json
- 大小: 12580 字节
- 行数: 456
- 预览: {
  "id": "dashboard-1771920937262",
  "timestamp": 1771920937262,
  "overview": {
    "totalCycles"...

#### dashboard-1771920937367.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771920937367.json
- 大小: 12581 字节
- 行数: 456
- 预览: {
  "id": "dashboard-1771920937367",
  "timestamp": 1771920937367,
  "overview": {
    "totalCycles"...

#### dashboard-1771920937489.json
- 路径: skills\capability-evolver\data\dashboard\dashboard-1771920937489.json
- 大小: 12581 字节
- 行数: 456
- 预览: {
  "id": "dashboard-1771920937489",
  "timestamp": 1771920937489,
  "overview": {
    "totalCycles"...

#### export-1771919637504.json
- 路径: skills\capability-evolver\data\dashboard\export-1771919637504.json
- 大小: 3421 字节
- 行数: 146
- 预览: {
  "status": {
    "timestamp": 1771919637484,
    "systemStatus": "healthy",
    "evolutionStatus"...

#### export-1771919937645.json
- 路径: skills\capability-evolver\data\dashboard\export-1771919937645.json
- 大小: 8197 字节
- 行数: 308
- 预览: {
  "status": {
    "timestamp": 1771919937619,
    "systemStatus": "healthy",
    "evolutionStatus"...

#### export-1771920037131.json
- 路径: skills\capability-evolver\data\dashboard\export-1771920037131.json
- 大小: 9619 字节
- 行数: 356
- 预览: {
  "status": {
    "timestamp": 1771920037056,
    "systemStatus": "healthy",
    "evolutionStatus"...

#### export-1771920637473.json
- 路径: skills\capability-evolver\data\dashboard\export-1771920637473.json
- 大小: 19145 字节
- 行数: 676
- 预览: {
  "status": {
    "timestamp": 1771920637397,
    "systemStatus": "healthy",
    "evolutionStatus"...

#### export-1771920937518.json
- 路径: skills\capability-evolver\data\dashboard\export-1771920937518.json
- 大小: 25807 字节
- 行数: 900
- 预览: {
  "status": {
    "timestamp": 1771920937403,
    "systemStatus": "healthy",
    "evolutionStatus"...

#### latest.json
- 路径: skills\capability-evolver\data\dashboard\latest.json
- 大小: 12581 字节
- 行数: 456
- 预览: {
  "id": "dashboard-1771920937489",
  "timestamp": 1771920937489,
  "overview": {
    "totalCycles"...

#### capability-shape-38-1771917465737.json
- 路径: skills\capability-evolver\data\evolution-products\capability-shape-38-1771917465737.json
- 大小: 828 字节
- 行数: 35
- 预览: {
  "type": "capability-shape",
  "cycle": 38,
  "name": "Capability Shape for Created new feature: ...

#### capability-shape-47-1771918849475.json
- 路径: skills\capability-evolver\data\evolution-products\capability-shape-47-1771918849475.json
- 大小: 828 字节
- 行数: 35
- 预览: {
  "type": "capability-shape",
  "cycle": 47,
  "name": "Capability Shape for Created new feature: ...

#### capability-shape-capability-shape-40-1771917811667.json
- 路径: skills\capability-evolver\data\evolution-products\capability-shape-capability-shape-40-1771917811667.json
- 大小: 1089 字节
- 行数: 43
- 预览: {
  "type": "capability-shape",
  "cycle": 40,
  "id": "capability-shape-40-1771917811667",
  "name"...

#### capability-shape-capability-shape-48-1771918883536.json
- 路径: skills\capability-evolver\data\evolution-products\capability-shape-capability-shape-48-1771918883536.json
- 大小: 1089 字节
- 行数: 43
- 预览: {
  "type": "capability-shape",
  "cycle": 48,
  "id": "capability-shape-48-1771918883536",
  "name"...

#### capability-shape-capability-shape-50-1771919183553.json
- 路径: skills\capability-evolver\data\evolution-products\capability-shape-capability-shape-50-1771919183553.json
- 大小: 1089 字节
- 行数: 43
- 预览: {
  "type": "capability-shape",
  "cycle": 50,
  "id": "capability-shape-50-1771919183553",
  "name"...

#### capability-shape-capability-shape-51-1771919637417.json
- 路径: skills\capability-evolver\data\evolution-products\capability-shape-capability-shape-51-1771919637417.json
- 大小: 1089 字节
- 行数: 43
- 预览: {
  "type": "capability-shape",
  "cycle": 51,
  "id": "capability-shape-51-1771919637417",
  "name"...

#### capability-shape-capability-shape-54-1771920637209.json
- 路径: skills\capability-evolver\data\evolution-products\capability-shape-capability-shape-54-1771920637209.json
- 大小: 1089 字节
- 行数: 43
- 预览: {
  "type": "capability-shape",
  "cycle": 54,
  "id": "capability-shape-54-1771920637209",
  "name"...

#### default-strategy-39-1771917649404.json
- 路径: skills\capability-evolver\data\evolution-products\default-strategy-39-1771917649404.json
- 大小: 600 字节
- 行数: 21
- 预览: {
  "type": "default-strategy",
  "cycle": 39,
  "name": "Default Strategy for Created new feature: ...

#### default-strategy-41-1771917949505.json
- 路径: skills\capability-evolver\data\evolution-products\default-strategy-41-1771917949505.json
- 大小: 600 字节
- 行数: 21
- 预览: {
  "type": "default-strategy",
  "cycle": 41,
  "name": "Default Strategy for Created new feature: ...

#### default-strategy-45-1771918549458.json
- 路径: skills\capability-evolver\data\evolution-products\default-strategy-45-1771918549458.json
- 大小: 600 字节
- 行数: 21
- 预览: {
  "type": "default-strategy",
  "cycle": 45,
  "name": "Default Strategy for Created new feature: ...

#### default-strategy-49-1771919149473.json
- 路径: skills\capability-evolver\data\evolution-products\default-strategy-49-1771919149473.json
- 大小: 600 字节
- 行数: 21
- 预览: {
  "type": "default-strategy",
  "cycle": 49,
  "name": "Default Strategy for Created new feature: ...

#### default-strategy-default-strategy-44-1771918283453.json
- 路径: skills\capability-evolver\data\evolution-products\default-strategy-default-strategy-44-1771918283453.json
- 大小: 826 字节
- 行数: 29
- 预览: {
  "type": "default-strategy",
  "cycle": 44,
  "id": "default-strategy-44-1771918283453",
  "name"...

#### default-strategy-default-strategy-46-1771918583623.json
- 路径: skills\capability-evolver\data\evolution-products\default-strategy-default-strategy-46-1771918583623.json
- 大小: 826 字节
- 行数: 29
- 预览: {
  "type": "default-strategy",
  "cycle": 46,
  "id": "default-strategy-46-1771918583623",
  "name"...

#### default-strategy-default-strategy-53-1771920036853.json
- 路径: skills\capability-evolver\data\evolution-products\default-strategy-default-strategy-53-1771920036853.json
- 大小: 826 字节
- 行数: 29
- 预览: {
  "type": "default-strategy",
  "cycle": 53,
  "id": "default-strategy-53-1771920036853",
  "name"...

#### hot-info-cache-candidate.json
- 路径: skills\capability-evolver\data\hot-info-cache-candidate.json
- 大小: 161 字节
- 行数: 8
- 预览: {
  "id": "hot-info-cache",
  "name": "热点信息缓存层",
  "description": "在1秒内响应所有查询请求的缓存层",
  "priority": ...

#### initial-metrics.json
- 路径: skills\capability-evolver\data\metrics\initial-metrics.json
- 大小: 669 字节
- 行数: 38
- 预览: {
  "timestamp": 1771919637445,
  "system": {
    "uptime": 0.1512818,
    "memory": {
      "rss": ...

#### metrics-1771919637452.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919637452.json
- 大小: 1005 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919637452",
  "timestamp": 1771919637452,
  "system": {
    "uptime": 0.15804...

#### metrics-1771919637457.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919637457.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919637457",
  "timestamp": 1771919637457,
  "system": {
    "uptime": 0.16261...

#### metrics-1771919637469.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919637469.json
- 大小: 1005 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919637469",
  "timestamp": 1771919637469,
  "system": {
    "uptime": 0.17520...

#### metrics-1771919637473.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919637473.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919637473",
  "timestamp": 1771919637473,
  "system": {
    "uptime": 0.17910...

#### metrics-1771919637486.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919637486.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919637486",
  "timestamp": 1771919637486,
  "system": {
    "uptime": 0.19211...

#### metrics-1771919637493.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919637493.json
- 大小: 1006 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919637493",
  "timestamp": 1771919637493,
  "system": {
    "uptime": 0.19900...

#### metrics-1771919697450.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919697450.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919697450",
  "timestamp": 1771919697450,
  "system": {
    "uptime": 60.1545...

#### metrics-1771919697456.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919697456.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919697456",
  "timestamp": 1771919697456,
  "system": {
    "uptime": 60.1608...

#### metrics-1771919757457.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919757457.json
- 大小: 1006 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919757457",
  "timestamp": 1771919757457,
  "system": {
    "uptime": 120.161...

#### metrics-1771919757464.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919757464.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919757464",
  "timestamp": 1771919757464,
  "system": {
    "uptime": 120.168...

#### metrics-1771919817461.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919817461.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919817461",
  "timestamp": 1771919817461,
  "system": {
    "uptime": 180.165...

#### metrics-1771919817473.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919817473.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919817473",
  "timestamp": 1771919817473,
  "system": {
    "uptime": 180.177...

#### metrics-1771919877461.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919877461.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919877461",
  "timestamp": 1771919877461,
  "system": {
    "uptime": 240.165...

#### metrics-1771919877476.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919877476.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919877476",
  "timestamp": 1771919877476,
  "system": {
    "uptime": 240.180...

#### metrics-1771919937459.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919937459.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919937459",
  "timestamp": 1771919937459,
  "system": {
    "uptime": 300.163...

#### metrics-1771919937463.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919937463.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919937463",
  "timestamp": 1771919937463,
  "system": {
    "uptime": 300.167...

#### metrics-1771919937467.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919937467.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919937467",
  "timestamp": 1771919937467,
  "system": {
    "uptime": 300.172...

#### metrics-1771919937489.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919937489.json
- 大小: 1006 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919937489",
  "timestamp": 1771919937489,
  "system": {
    "uptime": 300.194...

#### metrics-1771919937574.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919937574.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919937574",
  "timestamp": 1771919937574,
  "system": {
    "uptime": 300.279...

#### metrics-1771919937580.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919937580.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919937580",
  "timestamp": 1771919937580,
  "system": {
    "uptime": 300.285...

#### metrics-1771919937599.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919937599.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919937599",
  "timestamp": 1771919937599,
  "system": {
    "uptime": 300.304...

#### metrics-1771919937605.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919937605.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919937605",
  "timestamp": 1771919937605,
  "system": {
    "uptime": 300.310...

#### metrics-1771919937626.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919937626.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919937626",
  "timestamp": 1771919937626,
  "system": {
    "uptime": 300.330...

#### metrics-1771919937632.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919937632.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919937632",
  "timestamp": 1771919937632,
  "system": {
    "uptime": 300.337...

#### metrics-1771919997481.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919997481.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919997481",
  "timestamp": 1771919997481,
  "system": {
    "uptime": 360.185...

#### metrics-1771919997510.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919997510.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919997510",
  "timestamp": 1771919997510,
  "system": {
    "uptime": 360.214...

#### metrics-1771919997582.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771919997582.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771919997582",
  "timestamp": 1771919997582,
  "system": {
    "uptime": 360.286...

#### metrics-1771920036897.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920036897.json
- 大小: 1006 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920036897",
  "timestamp": 1771920036897,
  "system": {
    "uptime": 0.22388...

#### metrics-1771920036936.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920036936.json
- 大小: 1005 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920036936",
  "timestamp": 1771920036936,
  "system": {
    "uptime": 0.26290...

#### metrics-1771920036993.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920036993.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920036993",
  "timestamp": 1771920036993,
  "system": {
    "uptime": 0.31902...

#### metrics-1771920037008.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920037008.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920037008",
  "timestamp": 1771920037008,
  "system": {
    "uptime": 0.33430...

#### metrics-1771920037070.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920037070.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920037070",
  "timestamp": 1771920037070,
  "system": {
    "uptime": 0.39625...

#### metrics-1771920037086.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920037086.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920037086",
  "timestamp": 1771920037086,
  "system": {
    "uptime": 0.41233...

#### metrics-1771920096903.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920096903.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920096903",
  "timestamp": 1771920096903,
  "system": {
    "uptime": 60.2290...

#### metrics-1771920096921.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920096921.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920096921",
  "timestamp": 1771920096921,
  "system": {
    "uptime": 60.2463...

#### metrics-1771920156906.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920156906.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920156906",
  "timestamp": 1771920156906,
  "system": {
    "uptime": 120.231...

#### metrics-1771920156928.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920156928.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920156928",
  "timestamp": 1771920156928,
  "system": {
    "uptime": 120.253...

#### metrics-1771920216909.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920216909.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920216909",
  "timestamp": 1771920216909,
  "system": {
    "uptime": 180.234...

#### metrics-1771920216940.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920216940.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920216940",
  "timestamp": 1771920216940,
  "system": {
    "uptime": 180.265...

#### metrics-1771920276916.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920276916.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920276916",
  "timestamp": 1771920276916,
  "system": {
    "uptime": 240.241...

#### metrics-1771920276949.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920276949.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920276949",
  "timestamp": 1771920276949,
  "system": {
    "uptime": 240.273...

#### metrics-1771920336906.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920336906.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920336906",
  "timestamp": 1771920336906,
  "system": {
    "uptime": 300.231...

#### metrics-1771920336916.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920336916.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920336916",
  "timestamp": 1771920336916,
  "system": {
    "uptime": 300.241...

#### metrics-1771920336925.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920336925.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920336925",
  "timestamp": 1771920336925,
  "system": {
    "uptime": 300.250...

#### metrics-1771920336962.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920336962.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920336962",
  "timestamp": 1771920336962,
  "system": {
    "uptime": 300.287...

#### metrics-1771920396937.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920396937.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920396937",
  "timestamp": 1771920396937,
  "system": {
    "uptime": 360.262...

#### metrics-1771920396964.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920396964.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920396964",
  "timestamp": 1771920396964,
  "system": {
    "uptime": 360.289...

#### metrics-1771920456948.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920456948.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920456948",
  "timestamp": 1771920456948,
  "system": {
    "uptime": 420.272...

#### metrics-1771920456971.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920456971.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920456971",
  "timestamp": 1771920456971,
  "system": {
    "uptime": 420.296...

#### metrics-1771920516952.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920516952.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920516952",
  "timestamp": 1771920516952,
  "system": {
    "uptime": 480.277...

#### metrics-1771920516982.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920516982.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920516982",
  "timestamp": 1771920516982,
  "system": {
    "uptime": 480.307...

#### metrics-1771920576962.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920576962.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920576962",
  "timestamp": 1771920576962,
  "system": {
    "uptime": 540.287...

#### metrics-1771920576995.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920576995.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920576995",
  "timestamp": 1771920576995,
  "system": {
    "uptime": 540.320...

#### metrics-1771920636909.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920636909.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920636909",
  "timestamp": 1771920636909,
  "system": {
    "uptime": 600.234...

#### metrics-1771920636921.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920636921.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920636921",
  "timestamp": 1771920636921,
  "system": {
    "uptime": 600.246...

#### metrics-1771920636975.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920636975.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920636975",
  "timestamp": 1771920636975,
  "system": {
    "uptime": 600.300...

#### metrics-1771920637000.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920637000.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920637000",
  "timestamp": 1771920637000,
  "system": {
    "uptime": 600.325...

#### metrics-1771920637234.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920637234.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920637234",
  "timestamp": 1771920637234,
  "system": {
    "uptime": 600.559...

#### metrics-1771920637254.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920637254.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920637254",
  "timestamp": 1771920637254,
  "system": {
    "uptime": 600.579...

#### metrics-1771920637335.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920637335.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920637335",
  "timestamp": 1771920637335,
  "system": {
    "uptime": 600.660...

#### metrics-1771920637355.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920637355.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920637355",
  "timestamp": 1771920637355,
  "system": {
    "uptime": 600.680...

#### metrics-1771920637416.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920637416.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920637416",
  "timestamp": 1771920637416,
  "system": {
    "uptime": 600.741...

#### metrics-1771920637434.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920637434.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920637434",
  "timestamp": 1771920637434,
  "system": {
    "uptime": 600.759...

#### metrics-1771920696980.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920696980.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920696980",
  "timestamp": 1771920696980,
  "system": {
    "uptime": 660.305...

#### metrics-1771920697031.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920697031.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920697031",
  "timestamp": 1771920697031,
  "system": {
    "uptime": 660.356...

#### metrics-1771920697243.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920697243.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920697243",
  "timestamp": 1771920697243,
  "system": {
    "uptime": 660.568...

#### metrics-1771920756983.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920756983.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920756983",
  "timestamp": 1771920756983,
  "system": {
    "uptime": 720.308...

#### metrics-1771920757033.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920757033.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920757033",
  "timestamp": 1771920757033,
  "system": {
    "uptime": 720.358...

#### metrics-1771920757243.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920757243.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920757243",
  "timestamp": 1771920757243,
  "system": {
    "uptime": 720.568...

#### metrics-1771920816989.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920816989.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920816989",
  "timestamp": 1771920816989,
  "system": {
    "uptime": 780.314...

#### metrics-1771920817116.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920817116.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920817116",
  "timestamp": 1771920817116,
  "system": {
    "uptime": 780.442...

#### metrics-1771920817257.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920817257.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920817257",
  "timestamp": 1771920817257,
  "system": {
    "uptime": 780.582...

#### metrics-1771920876990.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920876990.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920876990",
  "timestamp": 1771920876990,
  "system": {
    "uptime": 840.315...

#### metrics-1771920877120.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920877120.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920877120",
  "timestamp": 1771920877120,
  "system": {
    "uptime": 840.445...

#### metrics-1771920877272.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920877272.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920877272",
  "timestamp": 1771920877272,
  "system": {
    "uptime": 840.597...

#### metrics-1771920936906.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920936906.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920936906",
  "timestamp": 1771920936906,
  "system": {
    "uptime": 900.231...

#### metrics-1771920936944.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920936944.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920936944",
  "timestamp": 1771920936944,
  "system": {
    "uptime": 900.269...

#### metrics-1771920936983.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920936983.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920936983",
  "timestamp": 1771920936983,
  "system": {
    "uptime": 900.308...

#### metrics-1771920936994.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920936994.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920936994",
  "timestamp": 1771920936994,
  "system": {
    "uptime": 900.319...

#### metrics-1771920937006.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920937006.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920937006",
  "timestamp": 1771920937006,
  "system": {
    "uptime": 900.331...

#### metrics-1771920937128.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920937128.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920937128",
  "timestamp": 1771920937128,
  "system": {
    "uptime": 900.453...

#### metrics-1771920937222.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920937222.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920937222",
  "timestamp": 1771920937222,
  "system": {
    "uptime": 900.547...

#### metrics-1771920937243.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920937243.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920937243",
  "timestamp": 1771920937243,
  "system": {
    "uptime": 900.568...

#### metrics-1771920937307.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920937307.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920937307",
  "timestamp": 1771920937307,
  "system": {
    "uptime": 900.632...

#### metrics-1771920937333.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920937333.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920937333",
  "timestamp": 1771920937333,
  "system": {
    "uptime": 900.658...

#### metrics-1771920937434.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920937434.json
- 大小: 1010 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920937434",
  "timestamp": 1771920937434,
  "system": {
    "uptime": 900.759...

#### metrics-1771920937459.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920937459.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920937459",
  "timestamp": 1771920937459,
  "system": {
    "uptime": 900.784...

#### metrics-1771920937525.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920937525.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920937525",
  "timestamp": 1771920937525,
  "system": {
    "uptime": 900.850...

#### metrics-1771920937542.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920937542.json
- 大小: 1010 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920937542",
  "timestamp": 1771920937542,
  "system": {
    "uptime": 900.867...

#### metrics-1771920997019.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920997019.json
- 大小: 1009 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920997019",
  "timestamp": 1771920997019,
  "system": {
    "uptime": 960.344...

#### metrics-1771920997129.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920997129.json
- 大小: 1008 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920997129",
  "timestamp": 1771920997129,
  "system": {
    "uptime": 960.454...

#### metrics-1771920997222.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920997222.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920997222",
  "timestamp": 1771920997222,
  "system": {
    "uptime": 960.547...

#### metrics-1771920997547.json
- 路径: skills\capability-evolver\data\metrics\metrics-1771920997547.json
- 大小: 1007 字节
- 行数: 52
- 预览: {
  "id": "metrics-1771920997547",
  "timestamp": 1771920997547,
  "system": {
    "uptime": 960.872...

#### pcec-last-run.json
- 路径: skills\capability-evolver\data\pcec-last-run.json
- 大小: 25 字节
- 行数: 1
- 预览: {"lastRun":1771988303097}

#### pcec-status.json
- 路径: skills\capability-evolver\data\pcec-status.json
- 大小: 162 字节
- 行数: 9
- 预览: {
  "lastMainTrigger": 0,
  "lastEvolution": 0,
  "evolutionCount": 0,
  "pendingTasks": [],
  "comp...

#### SKILL.md
- 路径: skills\cognitive-models\创新策略\SKILL.md
- 大小: 1065 字节
- 行数: 98
- 预览: ---
name: "智能体提示词：创新全生命周期专家"
description: "从文档 '智能体提示词：创新全生命周期专家.docx' 提取的认知模型和理论。"
author: "Cogniti...

#### SKILL.md
- 路径: skills\cognitive-models\商业战略\SKILL.md
- 大小: 949 字节
- 行数: 96
- 预览: ---
name: "蓝海战略"
description: "从文档 '蓝海战略.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags...

#### SKILL.md
- 路径: skills\cognitive-models\管理策略\5\SKILL.md
- 大小: 1113 字节
- 行数: 100
- 预览: ---
name: "格鲁夫的偏执狂生存5"
description: "从文档 '格鲁夫的偏执狂生存5.docx' 提取的认知模型和理论。"
author: "Cognitive Model Gen...

#### SKILL.md
- 路径: skills\cognitive-models\营销策略\SKILL.md
- 大小: 1070 字节
- 行数: 98
- 预览: ---
name: "营销理论"
description: "从文档 '营销理论.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags...

#### SKILL.md
- 路径: skills\cognitive-models\问题解决\10\SKILL.md
- 大小: 1236 字节
- 行数: 104
- 预览: ---
name: "问题分析与解决10条理论"
description: "从文档 '问题分析与解决10条理论.docx' 提取的认知模型和理论。"
author: "Cognitive Model...

#### SKILL.md
- 路径: skills\cognitive-models\风险管理\SKILL.md
- 大小: 1079 字节
- 行数: 102
- 预览: ---
name: "塔勒布·反脆弱"
description: "从文档 '塔勒布·反脆弱.docx' 提取的认知模型和理论。"
author: "Cognitive Model Generator...

#### origin.json
- 路径: skills\discord\.clawhub\origin.json
- 大小: 139 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "discord",
  "installedVersion": "1....

#### _meta.json
- 路径: skills\discord\_meta.json
- 大小: 126 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "discord",
  "version": "1.0.1",
  "pub...

#### origin.json
- 路径: skills\eightctl\.clawhub\origin.json
- 大小: 140 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "eightctl",
  "installedVersion": "1...

#### _meta.json
- 路径: skills\eightctl\_meta.json
- 大小: 127 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "eightctl",
  "version": "1.0.0",
  "pu...

#### origin.json
- 路径: skills\food-order\.clawhub\origin.json
- 大小: 142 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "food-order",
  "installedVersion": ...

#### _meta.json
- 路径: skills\food-order\_meta.json
- 大小: 129 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "food-order",
  "version": "1.0.0",
  "...

#### origin.json
- 路径: skills\gemini\.clawhub\origin.json
- 大小: 138 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "gemini",
  "installedVersion": "1.0...

#### SKILL.md
- 路径: skills\gemini\SKILL.md
- 大小: 742 字节
- 行数: 24
- 预览: ---
name: gemini
description: Gemini CLI for one-shot Q&A, summaries, and generation.
homepage: http...

#### _meta.json
- 路径: skills\gemini\_meta.json
- 大小: 125 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "gemini",
  "version": "1.0.0",
  "publ...

#### origin.json
- 路径: skills\gifgrep\.clawhub\origin.json
- 大小: 139 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "gifgrep",
  "installedVersion": "1....

#### SKILL.md
- 路径: skills\gifgrep\SKILL.md
- 大小: 1874 字节
- 行数: 48
- 预览: ---
name: gifgrep
description: Search GIF providers with CLI/TUI, download results, and extract stil...

#### _meta.json
- 路径: skills\gifgrep\_meta.json
- 大小: 126 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "gifgrep",
  "version": "1.0.1",
  "pub...

#### origin.json
- 路径: skills\github\.clawhub\origin.json
- 大小: 138 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "github",
  "installedVersion": "1.0...

#### _meta.json
- 路径: skills\github\_meta.json
- 大小: 125 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "github",
  "version": "1.0.0",
  "publ...

#### origin.json
- 路径: skills\gog\.clawhub\origin.json
- 大小: 135 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "gog",
  "installedVersion": "1.0.0"...

#### SKILL.md
- 路径: skills\gog\SKILL.md
- 大小: 1746 字节
- 行数: 37
- 预览: ---
name: gog
description: Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Do...

#### _meta.json
- 路径: skills\gog\_meta.json
- 大小: 122 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "gog",
  "version": "1.0.0",
  "publish...

#### origin.json
- 路径: skills\goplaces\.clawhub\origin.json
- 大小: 140 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "goplaces",
  "installedVersion": "1...

#### _meta.json
- 路径: skills\goplaces\_meta.json
- 大小: 127 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "goplaces",
  "version": "1.0.0",
  "pu...

#### origin.json
- 路径: skills\himalaya\.clawhub\origin.json
- 大小: 140 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "himalaya",
  "installedVersion": "1...

#### _meta.json
- 路径: skills\himalaya\_meta.json
- 大小: 127 字节
- 行数: 6
- 预览: {
  "ownerId": "kn71t8cr12n54xdhz51fncgg0h7yr8dt",
  "slug": "himalaya",
  "version": "1.0.0",
  "pu...

#### origin.json
- 路径: skills\imsg\.clawhub\origin.json
- 大小: 136 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "imsg",
  "installedVersion": "1.0.0...

#### SKILL.md
- 路径: skills\imsg\SKILL.md
- 大小: 890 字节
- 行数: 26
- 预览: ---
name: imsg
description: iMessage/SMS CLI for listing chats, history, watch, and sending.
homepag...

#### _meta.json
- 路径: skills\imsg\_meta.json
- 大小: 123 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "imsg",
  "version": "1.0.0",
  "publis...

#### origin.json
- 路径: skills\mcporter\.clawhub\origin.json
- 大小: 140 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "mcporter",
  "installedVersion": "1...

#### _meta.json
- 路径: skills\mcporter\_meta.json
- 大小: 127 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "mcporter",
  "version": "1.0.0",
  "pu...

#### origin.json
- 路径: skills\model-usage\.clawhub\origin.json
- 大小: 143 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "model-usage",
  "installedVersion":...

#### SKILL.md
- 路径: skills\model-usage\SKILL.md
- 大小: 2044 字节
- 行数: 46
- 预览: ---
name: model-usage
description: Use CodexBar CLI local cost usage to summarize per-model usage fo...

#### _meta.json
- 路径: skills\model-usage\_meta.json
- 大小: 130 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "model-usage",
  "version": "1.0.0",
  ...

#### origin.json
- 路径: skills\nano-banana-pro\.clawhub\origin.json
- 大小: 147 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "nano-banana-pro",
  "installedVersi...

#### _meta.json
- 路径: skills\nano-banana-pro\_meta.json
- 大小: 134 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "nano-banana-pro",
  "version": "1.0.1"...

#### origin.json
- 路径: skills\nano-pdf\.clawhub\origin.json
- 大小: 140 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "nano-pdf",
  "installedVersion": "1...

#### _meta.json
- 路径: skills\nano-pdf\_meta.json
- 大小: 127 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "nano-pdf",
  "version": "1.0.0",
  "pu...

#### origin.json
- 路径: skills\notion\.clawhub\origin.json
- 大小: 138 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "notion",
  "installedVersion": "1.0...

#### _meta.json
- 路径: skills\notion\_meta.json
- 大小: 125 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "notion",
  "version": "1.0.0",
  "publ...

#### origin.json
- 路径: skills\obsidian\.clawhub\origin.json
- 大小: 140 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "obsidian",
  "installedVersion": "1...

#### _meta.json
- 路径: skills\obsidian\_meta.json
- 大小: 127 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "obsidian",
  "version": "1.0.0",
  "pu...

#### origin.json
- 路径: skills\openai-image-gen\.clawhub\origin.json
- 大小: 148 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "openai-image-gen",
  "installedVers...

#### _meta.json
- 路径: skills\openai-image-gen\_meta.json
- 大小: 135 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "openai-image-gen",
  "version": "1.0.1...

#### origin.json
- 路径: skills\openclaw-security-scanner\.clawhub\origin.json
- 大小: 157 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "openclaw-security-scanner",
  "inst...

#### _meta.json
- 路径: skills\openclaw-security-scanner\_meta.json
- 大小: 144 字节
- 行数: 6
- 预览: {
  "ownerId": "kn7ck1bjgrrax2f8n5zhqgqxtd80198k",
  "slug": "openclaw-security-scanner",
  "version...

#### origin.json
- 路径: skills\openhue\.clawhub\origin.json
- 大小: 139 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "openhue",
  "installedVersion": "1....

#### SKILL.md
- 路径: skills\openhue\SKILL.md
- 大小: 966 字节
- 行数: 31
- 预览: ---
name: openhue
description: Control Philips Hue lights/scenes via the OpenHue CLI.
homepage: http...

#### _meta.json
- 路径: skills\openhue\_meta.json
- 大小: 126 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "openhue",
  "version": "1.0.0",
  "pub...

#### origin.json
- 路径: skills\oracle\.clawhub\origin.json
- 大小: 138 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "oracle",
  "installedVersion": "1.0...

#### _meta.json
- 路径: skills\oracle\_meta.json
- 大小: 125 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "oracle",
  "version": "1.0.1",
  "publ...

#### origin.json
- 路径: skills\ordercli\.clawhub\origin.json
- 大小: 140 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "ordercli",
  "installedVersion": "1...

#### _meta.json
- 路径: skills\ordercli\_meta.json
- 大小: 127 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "ordercli",
  "version": "1.0.0",
  "pu...

#### origin.json
- 路径: skills\peekaboo\.clawhub\origin.json
- 大小: 140 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "peekaboo",
  "installedVersion": "1...

#### _meta.json
- 路径: skills\peekaboo\_meta.json
- 大小: 127 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "peekaboo",
  "version": "1.0.0",
  "pu...

#### SKILL.md
- 路径: skills\prd-mvp-cutter\SKILL.md
- 大小: 1 字节
- 行数: 1
- 预览: ﻿

#### origin.json
- 路径: skills\sag\.clawhub\origin.json
- 大小: 135 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "sag",
  "installedVersion": "1.0.0"...

#### SKILL.md
- 路径: skills\sag\SKILL.md
- 大小: 2089 字节
- 行数: 63
- 预览: ---
name: sag
description: ElevenLabs text-to-speech with mac-style say UX.
homepage: https://sag.sh...

#### _meta.json
- 路径: skills\sag\_meta.json
- 大小: 122 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "sag",
  "version": "1.0.0",
  "publish...

#### origin.json
- 路径: skills\session-logs\.clawhub\origin.json
- 大小: 144 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "session-logs",
  "installedVersion"...

#### _meta.json
- 路径: skills\session-logs\_meta.json
- 大小: 131 字节
- 行数: 6
- 预览: {
  "ownerId": "kn7e8qx3t885vqaya3vk3q7z0180fxd2",
  "slug": "session-logs",
  "version": "1.0.0",
 ...

#### origin.json
- 路径: skills\slack\.clawhub\origin.json
- 大小: 137 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "slack",
  "installedVersion": "1.0....

#### _meta.json
- 路径: skills\slack\_meta.json
- 大小: 124 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "slack",
  "version": "1.0.0",
  "publi...

#### origin.json
- 路径: skills\songsee\.clawhub\origin.json
- 大小: 139 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "songsee",
  "installedVersion": "1....

#### SKILL.md
- 路径: skills\songsee\SKILL.md
- 大小: 1121 字节
- 行数: 30
- 预览: ---
name: songsee
description: Generate spectrograms and feature-panel visualizations from audio wit...

#### _meta.json
- 路径: skills\songsee\_meta.json
- 大小: 126 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "songsee",
  "version": "1.0.0",
  "pub...

#### origin.json
- 路径: skills\sonoscli\.clawhub\origin.json
- 大小: 140 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "sonoscli",
  "installedVersion": "1...

#### SKILL.md
- 路径: skills\sonoscli\SKILL.md
- 大小: 938 字节
- 行数: 27
- 预览: ---
name: sonoscli
description: Control Sonos speakers (discover/status/play/volume/group).
homepage...

#### _meta.json
- 路径: skills\sonoscli\_meta.json
- 大小: 127 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "sonoscli",
  "version": "1.0.0",
  "pu...

#### origin.json
- 路径: skills\spotify-player\.clawhub\origin.json
- 大小: 146 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "spotify-player",
  "installedVersio...

#### _meta.json
- 路径: skills\spotify-player\_meta.json
- 大小: 133 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "spotify-player",
  "version": "1.0.0",...

#### origin.json
- 路径: skills\summarize\.clawhub\origin.json
- 大小: 141 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "summarize",
  "installedVersion": "...

#### _meta.json
- 路径: skills\summarize\_meta.json
- 大小: 128 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "summarize",
  "version": "1.0.0",
  "p...

#### origin.json
- 路径: skills\things-mac\.clawhub\origin.json
- 大小: 142 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "things-mac",
  "installedVersion": ...

#### SKILL.md
- 路径: skills\things-mac\SKILL.md
- 大小: 3344 字节
- 行数: 62
- 预览: ---
name: things-mac
description: Manage Things 3 via the `things` CLI on macOS (add/update projects...

#### _meta.json
- 路径: skills\things-mac\_meta.json
- 大小: 129 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "things-mac",
  "version": "1.0.0",
  "...

#### origin.json
- 路径: skills\tmux\.clawhub\origin.json
- 大小: 136 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "tmux",
  "installedVersion": "1.0.0...

#### _meta.json
- 路径: skills\tmux\_meta.json
- 大小: 123 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "tmux",
  "version": "1.0.0",
  "publis...

#### origin.json
- 路径: skills\trello\.clawhub\origin.json
- 大小: 138 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "trello",
  "installedVersion": "1.0...

#### _meta.json
- 路径: skills\trello\_meta.json
- 大小: 125 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "trello",
  "version": "1.0.0",
  "publ...

#### origin.json
- 路径: skills\video-frames\.clawhub\origin.json
- 大小: 144 字节
- 行数: 8
- 预览: {
  "version": 1,
  "registry": "https://clawhub.ai",
  "slug": "video-frames",
  "installedVersion"...

#### SKILL.md
- 路径: skills\video-frames\SKILL.md
- 大小: 768 字节
- 行数: 30
- 预览: ---
name: video-frames
description: Extract frames or short clips from videos using ffmpeg.
homepage...

#### _meta.json
- 路径: skills\video-frames\_meta.json
- 大小: 131 字节
- 行数: 6
- 预览: {
  "ownerId": "kn70pywhg0fyz996kpa8xj89s57yhv26",
  "slug": "video-frames",
  "version": "1.0.0",
 ...

#### SKILL.md
- 路径: skills\zero-to-one-orchestrator\SKILL.md
- 大小: 1 字节
- 行数: 1
- 预览: ﻿

#### settings.json
- 路径: Skill_Seekers\.vscode\settings.json
- 大小: 107 字节
- 行数: 4
- 预览: {
    "python-envs.defaultEnvManager": "ms-python.python:system",
    "python-envs.pythonProjects"...

#### requirements.txt
- 路径: Skill_Seekers\api\requirements.txt
- 大小: 71 字节
- 行数: 4
- 预览: fastapi==0.115.0
uvicorn[standard]==0.32.0
python-multipart==0.0.12


#### godot.json
- 路径: Skill_Seekers\configs\godot.json
- 大小: 1503 字节
- 行数: 50
- 预览: {
  "name": "godot",
  "description": "Complete Godot Engine knowledge base combining official doc...

#### medusa-mercurjs.json
- 路径: Skill_Seekers\configs\medusa-mercurjs.json
- 大小: 4922 字节
- 行数: 72
- 预览: {
  "name": "medusa-mercurjs",
  "description": "Complete Medusa v2 + MercurJS multi-vendor e-comm...

#### requirements.txt
- 路径: Skill_Seekers\src\skill_seekers\mcp\requirements.txt
- 大小: 179 字节
- 行数: 10
- 预览: # MCP Server dependencies
mcp>=1.0.0

# CLI tool dependencies (shared)
requests>=2.31.0
beautif...

#### dependency_links.txt
- 路径: Skill_Seekers\src\skill_seekers.egg-info\dependency_links.txt
- 大小: 1 字节
- 行数: 2
- 预览: 


#### requires.txt
- 路径: Skill_Seekers\src\skill_seekers.egg-info\requires.txt
- 大小: 710 字节
- 行数: 49
- 预览: requests>=2.32.5
beautifulsoup4>=4.14.2
PyGithub>=2.5.0
GitPython>=3.1.40
httpx>=0.28.1
anthropic>=0...

#### polyglot-hooks.md
- 路径: Skill_Seekers\superpowers\docs\windows\polyglot-hooks.md
- 大小: 6276 字节
- 行数: 213
- 预览: # Cross-Platform Polyglot Hooks for Claude Code

Claude Code plugins need hooks that work on Windows...

#### hooks.json
- 路径: Skill_Seekers\superpowers\hooks\hooks.json
- 大小: 297 字节
- 行数: 17
- 预览: {
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume|clear|compact",
    ...

#### SKILL.md
- 路径: Skill_Seekers\superpowers\skills\dispatching-parallel-agents\SKILL.md
- 大小: 6082 字节
- 行数: 181
- 预览: ---
name: dispatching-parallel-agents
description: Use when facing 2+ independent tasks that can be ...

#### condition-based-waiting.md
- 路径: Skill_Seekers\superpowers\skills\systematic-debugging\condition-based-waiting.md
- 大小: 3498 字节
- 行数: 116
- 预览: # Condition-Based Waiting

## Overview

Flaky tests often guess at timing with arbitrary delays. Thi...

#### subagent-driven-development-please.txt
- 路径: Skill_Seekers\superpowers\tests\explicit-skill-requests\prompts\subagent-driven-development-please.txt
- 大小: 37 字节
- 行数: 2
- 预览: subagent-driven-development, please


#### use-systematic-debugging.txt
- 路径: Skill_Seekers\superpowers\tests\explicit-skill-requests\prompts\use-systematic-debugging.txt
- 大小: 53 字节
- 行数: 2
- 预览: use systematic-debugging to figure out what's wrong


#### dispatching-parallel-agents.txt
- 路径: Skill_Seekers\superpowers\tests\skill-triggering\prompts\dispatching-parallel-agents.txt
- 大小: 420 字节
- 行数: 8
- 预览: I have 4 independent test failures happening in different modules:

1. tests/auth/login.test.ts - ...

#### requesting-code-review.txt
- 路径: Skill_Seekers\superpowers\tests\skill-triggering\prompts\requesting-code-review.txt
- 大小: 185 字节
- 行数: 3
- 预览: I just finished implementing the user authentication feature. All the code is committed. Can you rev...

#### systematic-debugging.txt
- 路径: Skill_Seekers\superpowers\tests\skill-triggering\prompts\systematic-debugging.txt
- 大小: 341 字节
- 行数: 11
- 预览: The tests are failing with this error:

```
FAIL src/utils/parser.test.ts
  ● Parser › should ha...

#### test-driven-development.txt
- 路径: Skill_Seekers\superpowers\tests\skill-triggering\prompts\test-driven-development.txt
- 大小: 254 字节
- 行数: 7
- 预览: I need to add a new feature to validate email addresses. It should:
- Check that there's an @ symbo...

#### writing-plans.txt
- 路径: Skill_Seekers\superpowers\tests\skill-triggering\prompts\writing-plans.txt
- 大小: 389 字节
- 行数: 10
- 预览: Here's the spec for our new authentication system:

Requirements:
- Users can register with email...

#### design.md
- 路径: Skill_Seekers\superpowers\tests\subagent-driven-dev\svelte-todo\design.md
- 大小: 1951 字节
- 行数: 71
- 预览: # Svelte Todo List - Design

## Overview

A simple todo list application built with Svelte. Supports...

#### example_conflicts.json
- 路径: Skill_Seekers\tests\fixtures\example_conflicts.json
- 大小: 3984 字节
- 行数: 142
- 预览: {
  "conflicts": [
    {
      "type": "missing_in_docs",
      "severity": "medium",
      "ap...

#### quick-reference.md
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\assets\templates\base\quick-reference.md
- 大小: 2795 字节
- 行数: 85
- 预览: ## When to Apply

Reference these guidelines when:
- Designing new UI components or pages
- Choo...

#### package-lock.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\package-lock.json
- 大小: 13173 字节
- 行数: 371
- 预览: {
  "name": "uipro-cli",
  "version": "2.2.1",
  "lockfileVersion": 3,
  "requires": true,
  "p...

#### tsconfig.json
- 路径: Skill_Seekers\ui-ux-pro-max-skill\cli\tsconfig.json
- 大小: 413 字节
- 行数: 18
- 预览: {
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution":...

#### quick-reference.md
- 路径: Skill_Seekers\ui-ux-pro-max-skill\src\ui-ux-pro-max\templates\base\quick-reference.md
- 大小: 2795 字节
- 行数: 85
- 预览: ## When to Apply

Reference these guidelines when:
- Designing new UI components or pages
- Choo...

#### system-monitor-config.json
- 路径: system-monitor-config.json
- 大小: 156 字节
- 行数: 10
- 预览: {
  "monitoringInterval": 30000,
  "alertThresholds": {
    "cpu": 80,
    "memory": 90,
    "disk":...

#### README.md
- 路径: temp-calendar\README.md
- 大小: 1450 字节
- 行数: 37
- 预览: This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs...

#### tsconfig.json
- 路径: temp-calendar\tsconfig.json
- 大小: 670 字节
- 行数: 35
- 预览: {
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "...

#### test-report.json
- 路径: test\anti-degeneration-lock\test-report.json
- 大小: 6224 字节
- 行数: 219
- 预览: {
  "timestamp": 1771940695650,
  "totalTests": 24,
  "passedTests": 24,
  "failedTests": 0,
  "pass...

#### test-api-connection.js
- 路径: test-api-connection.js
- 大小: 1716 字节
- 行数: 62
- 预览: const arkAdapter = require('./ark-simple-adapter');

async function testApiConnection() {
  console....

#### test-ark-adapter.js
- 路径: test-ark-adapter.js
- 大小: 1633 字节
- 行数: 58
- 预览: const arkAdapter = require('./ark-api-adapter');

async function testArkAdapter() {
  console.log('=...

#### test-ark-api.js
- 路径: test-ark-api.js
- 大小: 1092 字节
- 行数: 52
- 预览: const https = require('https');

const options = {
  hostname: 'ark.cn-beijing.volces.com',
  path: ...

#### test-ark-connection.js
- 路径: test-ark-connection.js
- 大小: 2207 字节
- 行数: 84
- 预览: const https = require('https');

// Test Ark API connection
async function testArkConnection() {
  c...

#### test-capability-tree-new.js
- 路径: test-capability-tree-new.js
- 大小: 2380 字节
- 行数: 79
- 预览: // 测试新的Capability Tree结构
const { capabilityTree } = require('./capabilities/capability-tree');

cons...

#### test-capability-tree-simple.js
- 路径: test-capability-tree-simple.js
- 大小: 2586 字节
- 行数: 95
- 预览: // 简单的能力树功能测试
const { capabilityTree } = require('./capabilities/capability-tree');

console.log('==...

#### test-communication-tools.js
- 路径: test-communication-tools.js
- 大小: 3755 字节
- 行数: 115
- 预览: // 测试Communication Branch Tools
const feishuCard = require('./tools/communication/feishu-card');
con...

#### green-tea.json
- 路径: test-data\agents\green-tea.json
- 大小: 462 字节
- 行数: 21
- 预览: {
  "id": "green-tea",
  "name": "绿茶",
  "type": "psychological",
  "status": "active",
  "capabilit...

#### test-doubao-api-direct.js
- 路径: test-doubao-api-direct.js
- 大小: 998 字节
- 行数: 46
- 预览: const https = require('https');

const options = {
  hostname: 'ark.cn-beijing.volces.com',
  path: ...

#### test-doubao-now.js
- 路径: test-doubao-now.js
- 大小: 2692 字节
- 行数: 99
- 预览: const axios = require('axios');

async function testDoubaoAPI() {
  console.log('=== 测试豆包API连接 ===')...

#### test-doubao-v1-api.js
- 路径: test-doubao-v1-api.js
- 大小: 950 字节
- 行数: 46
- 预览: const https = require('https');

const options = {
  hostname: 'api.doubao.com',
  path: '/v1/chat/c...

#### test-enhanced-green-tea.js
- 路径: test-enhanced-green-tea.js
- 大小: 1596 字节
- 行数: 68
- 预览: // 测试增强版绿茶智能体
const http = require('http');

console.log('========================================')...

#### test-enhanced-tree.js
- 路径: test-enhanced-tree.js
- 大小: 1531 字节
- 行数: 54
- 预览: /**
 * 测试增强版能力树
 * 验证核心功能：功能域划分、层级结构、VFM评估、跨分支协作、性能优化
 */

const { EnhancedCapabilityTree } = requir...

#### test-evomap-api-fix.js
- 路径: test-evomap-api-fix.js
- 大小: 2885 字节
- 行数: 113
- 预览: // 测试修复后的EvoMap API连接
const http = require('http');

console.log('==================================...

#### test-evomap-authenticity.js
- 路径: test-evomap-authenticity.js
- 大小: 6650 字节
- 行数: 271
- 预览: // 综合测试修复后的EvoMap真实性验证
const http = require('http');

console.log('=================================...

#### test-evomap-connection.js
- 路径: test-evomap-connection.js
- 大小: 572 字节
- 行数: 29
- 预览: const https = require('https');

console.log('Testing connection to evomap.ai...');

const options =...

#### test-fix.js
- 路径: test-fix.js
- 大小: 1661 字节
- 行数: 78
- 预览: const http = require('http');

// 测试网关token验证
function testGatewayToken() {
  console.log('测试网关token...

#### test-green-tea-api.js
- 路径: test-green-tea-api.js
- 大小: 1423 字节
- 行数: 66
- 预览: // 测试绿茶智能体API
const http = require('http');

console.log('🧪 测试绿茶智能体API');

// 测试1: 健康检查
console.log...

#### test-green-tea-commands.js
- 路径: test-green-tea-commands.js
- 大小: 2027 字节
- 行数: 83
- 预览: // 测试绿茶智能体命令解析
const http = require('http');

console.log('========================================'...

#### test-hot-cache.js
- 路径: test-hot-cache.js
- 大小: 2416 字节
- 行数: 86
- 预览: console.log('开始导入热点信息缓存模块...');
try {
  const { hotInfoCache } = require('./capabilities/hot-info-ca...

#### test-install-capsules.js
- 路径: test-install-capsules.js
- 大小: 2970 字节
- 行数: 114
- 预览: // 测试绿茶智能体安装胶囊功能
const http = require('http');

console.log('=======================================...

#### test-openclaw-doubao.js
- 路径: test-openclaw-doubao.js
- 大小: 905 字节
- 行数: 44
- 预览: const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 18789,
  path: '/a...

#### test-output.js
- 路径: test-output.js
- 大小: 102 字节
- 行数: 4
- 预览: console.log('Hello World!');
console.log('测试输出是否正常');
console.log('当前时间:', new Date().toISOString())...

#### life-agent-capability-expansion-test-report.json
- 路径: test-reports\life-agent-capability-expansion-test-report.json
- 大小: 589 字节
- 行数: 32
- 预览: {
  "timestamp": "2026-02-24T18:41:34.985Z",
  "tests": {
    "新能力节点添加测试": true,
    "新能力任务分析测试": tr...

#### life-agent-communication-test-report.json
- 路径: test-reports\life-agent-communication-test-report.json
- 大小: 280 字节
- 行数: 16
- 预览: {
  "timestamp": "2026-02-24T18:37:13.641Z",
  "tests": {
    "工具加载测试": true,
    "能力树通信分支测试": true,...

#### anti-degeneration-lock-test-report.json
- 路径: test-results\anti-degeneration-lock-test-report.json
- 大小: 837 字节
- 行数: 35
- 预览: {
  "timestamp": 1771920809807,
  "totalTests": 5,
  "passedTests": 5,
  "failedTests": 0,
  "passRa...

#### anti-metaphysics-test-report.json
- 路径: test-results\anti-metaphysics-test-report.json
- 大小: 937 字节
- 行数: 35
- 预览: {
  "timestamp": 1771921125138,
  "totalTests": 5,
  "passedTests": 5,
  "failedTests": 0,
  "passRa...

#### rollback-mechanism-test-report.json
- 路径: test-results\rollback-mechanism-test-report.json
- 大小: 250 字节
- 行数: 14
- 预览: {
  "timestamp": 1771950609349,
  "totalTests": 4,
  "passedTests": 4,
  "failedTests": 0,
  "passRa...

#### stability-priority-test-report.json
- 路径: test-results\stability-priority-test-report.json
- 大小: 910 字节
- 行数: 35
- 预览: {
  "timestamp": 1771920934102,
  "totalTests": 5,
  "passedTests": 5,
  "failedTests": 0,
  "passRa...

#### test-results.txt
- 路径: test-results.txt
- 大小: 33 字节
- 行数: 2
- 预览: ��'  �p�p�Oo`X[�|�~KmՋ�[b 
 

#### test-server-alt.js
- 路径: test-server-alt.js
- 大小: 1240 字节
- 行数: 52
- 预览: const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, re...

#### test-server.js
- 路径: test-server.js
- 大小: 463 字节
- 行数: 21
- 预览: const express = require('express');
const app = express();
const PORT = 18790;

app.get('/', (req, r...

#### test-simple-adapter.js
- 路径: test-simple-adapter.js
- 大小: 1113 字节
- 行数: 38
- 预览: const arkAdapter = require('./ark-simple-adapter');

async function testSimpleAdapter() {
  console....

#### test-to-file.js
- 路径: test-to-file.js
- 大小: 3590 字节
- 行数: 114
- 预览: const { hotInfoCache } = require('./capabilities/hot-info-cache');
const fs = require('fs');

async ...

#### test-trea-proxy.js
- 路径: test-trea-proxy.js
- 大小: 1522 字节
- 行数: 67
- 预览: const http = require('http');

// 测试 Trea Model Proxy Server
function testTreaProxy() {
  console.lo...

#### test-updated-ark.js
- 路径: test-updated-ark.js
- 大小: 1586 字节
- 行数: 50
- 预览: const arkAdapter = require('./ark-simple-adapter');

async function testUpdatedArkAdapter() {
  cons...

#### feishu-sticker.js
- 路径: tools\communication\feishu-sticker.js
- 大小: 3897 字节
- 行数: 190
- 预览: // feishu-sticker 工具 - 用于生成和发送表情反应

// 表情缓存
const stickerCache = new Map();

/**
 * 根据情绪/意图生成表情
 * @...

#### sticker-analyzer.js
- 路径: tools\intelligence\sticker-analyzer.js
- 大小: 9632 字节
- 行数: 379
- 预览: /**
 * Sticker Analyzer 工具
 * 用于分析图片内容，过滤垃圾图片，分类贴纸
 * Engine: Gemini 2.5 Flash
 */

const fs = requi...

#### memory-manager.js
- 路径: tools\knowledge\memory-manager.js
- 大小: 4285 字节
- 行数: 209
- 预览: // memory-manager 工具 - 用于原子更新操作

// 内存存储
const memoryStore = new Map();

/**
 * 原子更新操作
 * @param {st...

#### trigger-pcec.js
- 路径: trigger-pcec.js
- 大小: 533 字节
- 行数: 27
- 预览: /**
 * 手动触发PCEC进化任务
 * 用于立即执行一次PCEC进化周期
 */

const { executePCEC } = require('./pcec-hourly-schedule...

#### dimensions.js
- 路径: value-function-core\dimensions.js
- 大小: 3948 字节
- 行数: 197
- 预览: // 核心价值维度评估模块

/**
 * 评估能力的复用频率潜力
 * @param {Object} capability - 能力对象
 * @returns {number} 复用频率潜力评分...

#### evaluator.js
- 路径: value-function-core\evaluator.js
- 大小: 3659 字节
- 行数: 141
- 预览: // 价值评估引擎
const dimensions = require('./dimensions');
const lowValueDetector = require('./low-value-...

#### index.js
- 路径: value-function-core\index.js
- 大小: 1249 字节
- 行数: 41
- 预览: // 价值函数核心模块主入口
const evaluator = require('./evaluator');
const mutator = require('./mutator');
const...

#### integration-example.js
- 路径: value-function-core\integration-example.js
- 大小: 4913 字节
- 行数: 195
- 预览: // 价值函数模块与能力树系统集成示例
const valueFunction = require('./index');
const capabilityTree = require('../cap...

#### low-value-detector.js
- 路径: value-function-core\low-value-detector.js
- 大小: 3870 字节
- 行数: 174
- 预览: // 低价值能力检测器模块

/**
 * 检测能力是否为低价值能力
 * @param {Object} capability - 能力对象
 * @returns {boolean} 是否为低价值...

#### package.json
- 路径: value-function-core\package.json
- 大小: 575 字节
- 行数: 31
- 预览: {
  "name": "value-function-core",
  "version": "1.0.0",
  "description": "价值函数突变核心模块 - 基于内在价值函数评估和选...

#### evaluator.test.js
- 路径: value-function-core\tests\evaluator.test.js
- 大小: 6854 字节
- 行数: 209
- 预览: // 价值评估引擎测试
const evaluator = require('../evaluator');
const dimensions = require('../dimensions');
...

#### mutator.test.js
- 路径: value-function-core\tests\mutator.test.js
- 大小: 6569 字节
- 行数: 210
- 预览: // 价值函数突变管理测试
const mutator = require('../mutator');
const { validateMutation, validateLongTermUtili...

#### vercel.json
- 路径: vercel.json
- 大小: 239 字节
- 行数: 9
- 预览: {
  "buildCommand": "cd HTP && npm install && npm run build",
  "outputDirectory": "HTP/dist",
  ...

#### video-script-format.md
- 路径: video-script-format.md
- 大小: 2755 字节
- 行数: 190
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
- 视频信息：...

#### longitude.txt
- 路径: 人生决策实验室\projects\bazi-paipan\assets\longitude.txt
- 大小: 6143 字节
- 行数: 339
- 预览: # 中国城市经度数据
# 用于真太阳时修正
# 公式：偏移分钟 = (城市经度 - 120.0) × 4

## 直辖市
北京	116.40	-14.40
天津	117.20	-11.20
上海	12...

#### bazi_basics.md
- 路径: 人生决策实验室\projects\bazi-paipan\references\bazi_basics.md
- 大小: 2811 字节
- 行数: 205
- 预览: # 八字基础知识

## 目录
- 天干地支
- 五行生克
- 十神关系
- 旺相休囚死
- 时辰换算

## 天干地支

### 天干
天干有十个，用于记年、月、日、时的次序：
- 甲（jiǎ）
-...

#### 大六壬指南.md
- 路径: 人生决策实验室\projects\da-liu-ren\references\大六壬指南.md
- 大小: 5021 字节
- 行数: 306
- 预览: # 大六壬指南

## 概述

《大六壬指南》是大六壬预测的集大成之作，包含五卷内容，涵盖了大六壬的基础理论、课体分类、神煞体系、占验方法等核心内容。

---

## 卷一：大六壬心印赋

### ...

#### bazi_basics.md
- 路径: 人生决策实验室\projects\ren-sheng-jue-ce-ming-pan\references\bazi_basics.md
- 大小: 2811 字节
- 行数: 205
- 预览: # 八字基础知识

## 目录
- 天干地支
- 五行生克
- 十神关系
- 旺相休囚死
- 时辰换算

## 天干地支

### 天干
天干有十个，用于记年、月、日、时的次序：
- 甲（jiǎ）
-...

#### 再读子平真诠评注随笔.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\references\再读子平真诠评注随笔.md
- 大小: 5065 字节
- 行数: 322
- 预览: # 再读《子平真诠评注》随笔

> 阅读时间：2003.10.3

---

## 前言

今天重读一遍此书，虽看过多遍，但仍有许多未悟透，八字在手依然不敢妄断。其中玄妙须细心感悟，方能得心应手。不急...

#### 子平真诠-原文与评注.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\references\子平真诠-原文与评注.md
- 大小: 11857 字节
- 行数: 292
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
二...

#### 渊海子平-原文.md
- 路径: 人生决策实验室\projects\zi-ping-zhen-quan\references\渊海子平-原文.md
- 大小: 25412 字节
- 行数: 837
- 预览: # 渊海子平（原文）

## 目录

1. [基础](#基础)
2. [十神](#十神)
3. [神煞](#神煞)
4. [六亲](#六亲)
5. [女命](#女命)
6. [赋论](#赋论)

--...

#### html-template.md
- 路径: 城市酒店投资分析\projects\hotel-investment-analysis\references\html-template.md
- 大小: 8929 字节
- 行数: 421
- 预览: # HTML格式展示页面模板

## 模板说明
本模板用于生成HTML格式的酒店投资分析展示页面，可在浏览器中直接查看并打印成PDF。

## HTML格式特点

### 1. 单文件结构
- 所有内...

#### auth.js
- 路径: 大脑作弊器\projects\public\auth.js
- 大小: 2841 字节
- 行数: 132
- 预览: // 认证API调用函数
const AuthAPI = {
    /**
     * 用户注册
     */
    async register(username, email, passw...

#### test-file.txt
- 路径: 大脑作弊器\projects\test-file.txt
- 大小: 105 字节
- 行数: 9
- 预览: 这是一个测试文件，用于验证文件上传和解析功能。

文件内容包括：
1. 简单的文本内容
2. 用于测试文件解析是否正常工作
3. 验证系统能否正确提取文本内容

这个文件应该能够被系统正确解析并生成认...

#### test-file.txt
- 路径: 大脑作弊器\projects\tmp\test-file.txt
- 大小: 105 字节
- 行数: 9
- 预览: 这是一个测试文件，用于验证文件上传和解析功能。

文件内容包括：
1. 简单的文本内容
2. 用于测试文件解析是否正常工作
3. 验证系统能否正确提取文本内容

这个文件应该能够被系统正确解析并生成认...

#### test-upload.txt
- 路径: 大脑作弊器\projects\tmp\test-upload.txt
- 大小: 171 字节
- 行数: 14
- 预览: 这是一个测试文件，用于验证文件上传和解析功能。

第一章：引言
这是第一章的内容。大脑作弊器是一个认知工具，可以帮助用户提取和总结关键信息。

第二章：核心功能
本系统支持多种输入方式：
1. 文件上...

#### tsconfig.json
- 路径: 大脑作弊器\projects\tsconfig.json
- 大小: 670 字节
- 行数: 35
- 预览: {
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "...

#### 格式规范文档.md
- 路径: 格式规范文档.md
- 大小: 1451 字节
- 行数: 152
- 预览: # 格式规范文档

## 简介

本文档定义了标准的消息格式规范，旨在确保所有通信内容清晰、易读、格式一致，特别是在飞书等平台上的消息展示。

## 格式规范

### 表格

**正确做法：**
-...

#### 测试架构设计.txt
- 路径: 英雄之旅\测试架构设计.txt
- 大小: 11296 字节
- 行数: 1
- 预览: ��һ���֣����Լܹ���� (The Architecture)������Ҫ���׶�������⣬�ֱ���� X ��� Y �ᡣ��һ�׶Σ�ս����λ (RIASEC ְҵê...

#### 高效笔记术推广视频脚本-1a4722ef35.md
- 路径: 高效笔记术推广视频脚本-1a4722ef35.md
- 大小: 2980 字节
- 行数: 108
- 预览: # 《高效能人士的笔记整理术》推广视频脚本

## 视频基本信息
- **视频标题**: 3个笔记技巧，让你工作效率提升3倍
- **总时长**: 90秒
- **风格定位**: 专业实用、节奏紧凑、...

