# 大脑作弊器技能架构说明

## 架构总览

大脑作弊器采用**两层架构设计**：

```
┌─────────────────────────────────────────────────────────────┐
│                     大脑作弊器整体架构                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  【7步流程层（核心工作流）】                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ AWKN-brain-cheat-tool（总入口协调器）                        │ │
│  │   ↓ 调用 ↓                                              │ │
│  │ brain-cheat-step1-7（7个步骤技能）                        │ │
│  └─────────────────────────────────────────────────────────┘ │
│           ↓ 部分步骤调用 ↓                                    │
│                                                              │
│  【外部技能层（通用工具）】                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ AWKN-miming-title   - 咪蒙标题大师                       │ │
│  │ AWKN-cover-image    - 文章封面生成器                     │ │
│  │ AWKN-comic          - 创作知识漫画                       │ │
│  │ AWKN-text-card      - 生成文字卡片                       │ │
│  │ AWKN-post-to-wechat - 发布到微信公众号                   │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 第一层：7步流程层（大脑作弊器核心）

这是大脑作弊器的**完整工作流**，从拆书到发文，提供一站式解决方案。

### 目录结构

```
AWKN-brain-cheat-tool/                  # 总入口协调器
brain-cheat-step1-book-analysis/   # 第一步：书籍内容拆解
brain-cheat-step2-viral-article/   # 第二步：生成公众号爆款文章
brain-cheat-step3-visualization/   # 第三步：生成知识可视化图片
brain-cheat-step4-video-script/    # 第四步：生成视频脚本
brain-cheat-step5-comic-creation/  # 第五步：创作知识漫画
brain-cheat-step6-text-card/       # 第六步：生成文字卡片
brain-cheat-step7-wechat-publish/  # 第七步：发布到微信公众号
```

### 7步流程说明

| 步骤 | 技能名称 | 职责 |
|------|---------|------|
| 第一步 | brain-cheat-step1-book-analysis | 书籍内容拆解，输出拆解报告和风格推荐 |
| 第二步 | brain-cheat-step2-viral-article | 生成公众号爆款文章，包含标题优化、转发文案、摘要 |
| 第三步 | brain-cheat-step3-visualization | 生成知识可视化图片（5张系列+3张公众号插图+封面），支持图文正文 |
| 第四步 | brain-cheat-step4-video-script | 生成90秒视频脚本（分镜头表） |
| 第五步 | brain-cheat-step5-comic-creation | 创作知识漫画（8-16页） |
| 第六步 | brain-cheat-step6-text-card | 生成文字卡片（3-10张） |
| 第七步 | brain-cheat-step7-wechat-publish | 发布到微信公众号（文章/图文/漫画） |

### 总入口协调器

**AWKN-brain-cheat-tool/SKILL.md** 作为总入口协调器：
- 提供统一的用户引导和交互体验
- 协调调用7大子技能
- 传递数据在各步骤之间流转
- 管理完整工作流的执行顺序

## 第二层：外部技能层（通用工具）

这些是**独立的技能**，可以被7步流程调用，也可以单独使用。

### 目录结构

```
AWKN-miming-title/      - 咪蒙标题大师
AWKN-cover-image/       - 文章封面生成器
AWKN-comic/             - 创作知识漫画
AWKN-text-card/         - 生成文字卡片
AWKN-post-to-wechat/    - 发布到微信公众号
```

### 外部技能说明

| 技能名称 | 职责 | 独立使用 | 被调用 |
|---------|------|---------|--------|
| AWKN-miming-title | 咪蒙标题大师（生成爆款标题和图文正文） | ✅ 是 | ✅ 第二步、第三步（可选） |
| AWKN-cover-image | 文章封面生成器（2.35:1 电影感） | ✅ 是 | ✅ 第三步（自动） |
| AWKN-comic | 创作知识漫画（8-16页） | ✅ 是 | ✅ 第五步 |
| AWKN-text-card | 生成文字卡片（3-10张） | ✅ 是 | ✅ 第六步 |
| AWKN-post-to-wechat | 发布到微信公众号（文章/图文/漫画） | ✅ 是 | ✅ 第七步 |

## 调用关系图

```
AWKN-brain-cheat-tool（总入口协调器）
    ↓
    ├─→ brain-cheat-step1-book-analysis
    │      ↓
    ├─→ brain-cheat-step2-viral-article
    │      ↓
    │      └─→ AWKN-miming-title（可选）
    │
    ├─→ brain-cheat-step3-visualization
    │      ↓
    │      ├─→ AWKN-cover-image（自动）
    │      └─→ AWKN-miming-title（可选）
    │
    ├─→ brain-cheat-step4-video-script
    │
    ├─→ brain-cheat-step5-comic-creation
    │      ↓
    │      └─→ AWKN-comic
    │
    ├─→ brain-cheat-step6-text-card
    │      ↓
    │      └─→ AWKN-text-card
    │
    └─→ brain-cheat-step7-wechat-publish
           ↓
           └─→ AWKN-post-to-wechat
```

## 设计优势

### 1. 模块化设计
- 每个步骤是独立的技能，职责清晰
- 外部技能可独立使用，也可被流程调用
- 便于维护和扩展

### 2. 复用性
- AWKN-* 技能可以在多个场景使用
- 避免重复开发相同功能
- 提高代码复用率

### 3. 灵活性
- 用户可以选择使用完整流程（7步）
- 也可以单独使用某个步骤
- 还可以单独使用 AWKN-* 技能

### 4. 可扩展性
- 新增功能只需创建新步骤技能
- 新增外部技能可供多个步骤调用
- 架构清晰，易于理解

## 使用场景

### 场景1：完整流程（推荐）
```
用户：帮我拆解这本书并生成所有内容
执行：AWKN-brain-cheat-tool → 依次调用7个步骤 → 完成
输出：拆解报告、文章、图片、视频脚本、漫画、卡片、发布
```

### 场景2：单独使用某个步骤
```
用户：只帮我生成公众号文章
执行：直接使用 brain-cheat-step2-viral-article
输出：公众号文章、标题、转发文案、摘要
```

### 场景3：单独使用外部技能
```
用户：帮我生成一张漫画
执行：直接使用 AWKN-comic
输出：8-16页漫画
```

### 场景4：流程中调用外部技能
```
用户：帮我拆解这本书并生成漫画
执行：AWKN-brain-cheat-tool → 第一步 → 第五步（调用 AWKN-comic）
输出：拆解报告、漫画
```

### 场景5：第三步生成公众号插图
```
用户：帮我拆解这本书并生成公众号插图
执行：AWKN-brain-cheat-tool → 第一步 → 第三步（阶段三：生成3张公众号插图）
输出：拆解报告、3张公众号插图（AWKN-illust-01.png、AWKN-illust-02.png、AWKN-illust-03.png）
```

## 文件清单

### 7步流程层（8个技能）
- AWKN-brain-cheat-tool.skill（总入口协调器）
- brain-cheat-step1-book-analysis.skill
- brain-cheat-step2-viral-article.skill
- brain-cheat-step3-visualization.skill
- brain-cheat-step4-video-script.skill
- brain-cheat-step5-comic-creation.skill
- brain-cheat-step6-text-card.skill
- brain-cheat-step7-wechat-publish.skill

### 外部技能层（5个技能）
- AWKN-miming-title.skill
- AWKN-cover-image.skill
- AWKN-comic.skill
- AWKN-text-card.skill
- AWKN-post-to-wechat.skill

### 总结

- **7步流程层**：大脑作弊器的核心工作流，提供完整解决方案
- **外部技能层**：通用工具，可独立使用，也可被流程调用
- **调用关系**：7步流程中的某些步骤会调用外部技能
- **设计优势**：模块化、复用性、灵活性、可扩展性
