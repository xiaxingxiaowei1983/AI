---
name: "waytoagi-knowledge"
description: "WaytoAGI 知识库与技能体系 SKILL，整合 WaytoAGI 社区的核心内容和可下载的 Skill 资源"
author: "OpenClaw Team"
version: "1.0.0"
category: "knowledge"
platforms: ["windows", "linux"]
requires: []
config:
  - key: "WAYTOAGI_KNOWLEDGE_PATH"
    value: "./waytoagi-knowledge"
    description: "WaytoAGI 知识库存储路径"
  - key: "SKILL_DOWNLOAD_PATH"
    value: "./skills/waytoagi"
    description: "WaytoAGI Skill 下载存储路径"

# WaytoAGI 知识库与技能体系 SKILL

## 功能
- 整合 WaytoAGI 社区的核心内容和学习资源
- 管理和应用可直接下载的 Skill 资源
- 提供 8 小时进化计划和学习路径
- 支持智能体系统的配置和管理

## 使用场景
- 快速获取 WaytoAGI 社区的最新内容和资源
- 应用预构建的 Skill 资源到项目中
- 实施 8 小时进化计划提升团队能力
- 构建和管理多智能体协作系统

## 核心组件

### 1. WaytoAGI 知识库

#### 知识库概览
- **覆盖学习者**：近 900 万
- **知识库访问量**：超 8000 万次
- **联动高校**：180 所
- **合作企业**：100+ 家
- **举办活动**：500+ 场
- **知识库内容**：10000+ 篇

#### 核心功能
1. **系统全面的 AI 学习路径**
2. **丰富的学习资源整合**
3. **实践活动组织**
4. **高校和企业合作网络**
5. **飞书知识问答系统**
6. **公众号：通往 AGI 之路**

#### 目录结构
- **core/**: WaytoAGI 核心内容和基础知识
- **learning-plans/**: 学习计划和路径
- **resources/**: 学习资源和工具
- **skills/**: 技能体系和实践指南
- **community/**: 社区活动和合作资源

### 2. 可直接下载的 Skill 资源

#### 乔木 Skill 分享
1. **Seed2 多模态 Skill**
   - 文件：seed-multimodal.zip (13.78KB)
   - 功能：支持多模态内容处理
   - 适用场景：处理文本、图像、音频等多种数据类型
   - 价值：为智能体提供多模态理解能力

2. **乔木每日 AI 资讯**
   - 文件：daily-topic-selector.zip (375.04KB)
   - 功能：自动选择和整理每日 AI 领域的重要资讯
   - 适用场景：快速了解 AI 领域最新动态
   - 价值：为知识采集者智能体提供信息源

3. **乔木论文解读**
   - 文件：qiaomu-paper-interpreter.zip (179.77KB)
   - 功能：自动解读 AI 领域的学术论文
   - 适用场景：快速理解复杂的学术内容
   - 价值：提升团队对前沿技术的理解能力

4. **任意资料传 NotebookLM 解读**
   - 文件：anything-to-notebooklm.zip (1.02MB)
   - 功能：将任意资料上传到 NotebookLM 进行解读
   - 适用场景：深度分析和理解各种资料
   - 价值：为知识整理提供强大工具

5. **Z-image 生图 Skill**
   - 文件：z-image-generator.zip (5.03KB)
   - 功能：生成图像内容
   - 适用场景：创建视觉内容、数据可视化
   - 价值：增强内容表现形式

6. **网页 UI 美化**
   - 文件：ui-skills.zip (2.42KB)
   - 功能：美化网页界面
   - 适用场景：提升产品用户体验
   - 价值：为应用推广提供视觉支持

### 3. 8 小时进化计划

#### 学习资源
1. **WaytoAGI 社区**：提供最新的 AI 技术和应用信息
2. **乔木 Skill 分享**：提供可直接下载的 Skill 资源
3. **《姚金刚认知随笔》**：提供认知模型和思维框架

#### 辅助资源
1. **NotebookLM**：用于深度分析和理解各种资料
2. **AI 论文数据库**：用于跟踪 AI 领域的最新研究
3. **行业案例库**：用于了解 AI 在不同行业的应用实践

#### 学习方法
1. **实践导向**：通过实际操作和项目练习巩固学习内容
2. **团队协作**：与其他智能体协作完成复杂任务
3. **持续反馈**：定期评估学习效果，调整学习策略
4. **知识共享**：与团队成员分享学习心得和最佳实践

#### 评估标准
1. **知识采集能力**：能够自动从多个来源采集高质量内容
2. **知识整理能力**：建立结构化的知识库，支持高效检索
3. **技能开发能力**：开发至少 3 个有价值的 Skill
4. **认知提升能力**：能够应用认知模型到实际决策中
5. **应用推广能力**：成功将学习内容和 Skill 推广到至少 2 个业务团队
6. **系统协调能力**：确保多智能体系统的稳定运行

#### 预期成果
1. **知识库**：建立结构化的 WaytoAGI 社区知识库
2. **Skill 库**：开发和部署多个有价值的 Skill
3. **智能体系统**：建立 6 个智能体的协作系统
4. **认知工具**：应用认知模型提升决策能力
5. **应用案例**：在实际业务中应用学习内容

### 4. 智能体系统设计

#### 系统架构
- **模块化设计**：具有良好的扩展性和可维护性
- **定时任务系统**：确保每个智能体都能在 8 小时内完成其进化任务
- **多智能体协作**：实现 6 个智能体的协同工作

#### 智能体功能
1. **知识采集者**：从多个来源采集高质量内容
2. **知识整理者**：建立结构化的知识库
3. **技能开发者**：开发有价值的 Skill
4. **认知提升者**：应用认知模型到实际决策中
5. **应用推广者**：将学习内容和 Skill 推广到业务团队
6. **系统协调者**：确保多智能体系统的稳定运行

## 配置

### 环境变量
- `WAYTOAGI_KNOWLEDGE_PATH`: WaytoAGI 知识库存储路径
- `SKILL_DOWNLOAD_PATH`: WaytoAGI Skill 下载存储路径
- `WAYTOAGI_API_URL`: WaytoAGI API 地址（可选）

### 配置文件
```json
{
  "waytoagi": {
    "knowledge_path": "./waytoagi-knowledge",
    "skill_download_path": "./skills/waytoagi",
    "api_url": "https://waytoagi.feishu.cn",
    "auto_update": true,
    "update_interval": 86400
  },
  "learning_plan": {
    "enabled": true,
    "duration": 8,
    "goals": [
      "建立知识库",
      "开发 Skill",
      "提升认知能力",
      "应用到业务中"
    ]
  },
  "agent_system": {
    "enabled": true,
    "agents": 6,
    "coordination": true
  }
}
```

## 使用示例

### 1. 初始化 WaytoAGI 知识库
```bash
# 初始化知识库
waytoagi init

# 同步最新内容
waytoagi sync

# 列出可用的 Skill 资源
waytoagi skills list
```

### 2. 应用 Skill 资源
```bash
# 下载并安装 Skill
waytoagi skills install seed-multimodal

# 应用 Skill 到项目
waytoagi skills apply seed-multimodal --project my-project

# 查看 Skill 使用情况
waytoagi skills status
```

### 3. 执行 8 小时进化计划
```bash
# 启动进化计划
waytoagi evolve start

# 查看进化进度
waytoagi evolve status

# 生成进化报告
waytoagi evolve report
```

### 4. 管理智能体系统
```bash
# 启动智能体系统
waytoagi agents start

# 监控智能体状态
waytoagi agents status

# 停止智能体系统
waytoagi agents stop
```

## 知识边界

### 专业领域
- WaytoAGI 社区内容和资源管理
- Skill 开发和应用
- 智能体系统设计和管理
- AI 学习路径和方法

### 非专业领域
- 具体业务逻辑
- 外部系统集成
- 硬件性能优化

## 版本历史

### v1.0.0
- 初始版本
- 整合 WaytoAGI 知识库内容
- 支持可下载 Skill 资源的管理和应用
- 提供 8 小时进化计划
- 支持智能体系统的配置和管理

## 后续发展

1. **内容扩展**：持续更新和扩展知识库内容
2. **技能升级**：不断优化和升级现有 Skill
3. **系统优化**：持续改进智能体系统的性能和可靠性
4. **应用深化**：在更多业务场景中应用学习成果
5. **社区贡献**：向 WaytoAGI 社区贡献有价值的内容和 Skill
