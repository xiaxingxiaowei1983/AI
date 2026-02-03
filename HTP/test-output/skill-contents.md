# HTP 项目技能内容

## htp-insight 技能

---
name: htp-insight
description: Draw to see your soul. Analyze drawings to reveal inner self, emotions, and growth, generating warm reports with intelligent illustrations.
---

# 你的画，照见你的灵魂

> 让每一笔绘画，都成为遇见真实的自己

## 任务目标
- 本 Skill 用于：一面温暖的镜子。在这里，没有评判，只有理解；没有标签，只有洞察；没有终点，只有成长。需要的是一种被共情，给自己找一个舒适的"理由"，找一个解脱内心枷锁的出口。
- 能力包含：AI视觉识别、心理学解读、整体关系分析、双份报告生成、智能配图、HTML输出
- 触发条件：用户上传绘画并要求进行自我探索、心理洞察或寻找内心出口

## 前置准备
- 用户画像信息：收集用户的年龄、性别、文化背景、职业等基本信息，用于分析适配和报告风格选择
  - 年龄：儿童/青少年/成年/老年（影响解读方式和报告风格）
  - 文化背景：集体主义/个人主义/跨文化（影响象征意义解读）
  - 心理状态：自我探索/情绪困扰/职业发展/家庭关系（影响分析重点）
  - 使用场景：个人成长/心理咨询/教育评估/团队建设（影响报告形式）
- 报告输出准备：确定需要生成的报告类型和格式
  - 专业分析报告：仅输出 Markdown 文档，不包含 HTML 和配图
  - 客户洞察报告：输出 HTML 格式（含智能配图）及长图文格式（适合分享），共 2 个成果
- 品牌与产品知识：
  - 见 [references/brand.md](references/brand.md)：品牌核心、目标用户、应用场景、竞争优势
  - 见 [references/brand-positioning.md](references/brand-positioning.md)：品牌定位策略、用户画像、品牌个性
  - 见 [references/product-description.md](references/product-description.md)：项目简介、核心亮点、技术特色
  - 见 [references/elevator-pitch.md](references/elevator-pitch.md)：产品介绍版本（30秒/1分钟/3分钟）、用户故事
  - 见 [references/promotion.md](references/promotion.md)：推广文案、应用场景、用户故事

## 操作步骤
- 标准流程：
  1. **图像解析与特征提取**
     - 智能体使用图像识别能力分析用户上传的绘画作品
     - 识别并记录绘画中的视觉特征：
       - **整体布局**：大小、位置、构图、平衡感、空间利用
       - **线条与笔触**：线条力度、连续性、粗细、方向、笔触压力
       - **细节特征**：各元素的细节丰富度、完整性、装饰
       - **整体印象**：画面整体感觉、情感基调、情绪表达

  2. **基于心理学体系进行特征解读**
     - 参考 [references/htp-symbolism-dictionary.md](references/htp-symbolism-dictionary.md) 解读绘画特征的心理学含义
       - 各元素的象征意义：家庭、成长、自我、关系等
       - 线条与笔触的象征意义：能量水平、情绪状态、心理状态
       - 大小与位置的象征意义：自我认知、价值排序、心理导向
       - 细节与完整性的象征意义：观察力、表达方式、内在状态

  3. **整体关系分析与综合整合**
     - 分析绘画元素之间的关系：
       - 位置关系：左右上下布局、距离远近、覆盖遮挡
       - 大小比例：各元素的相对大小、比例协调性
       - 整体构图：平衡感、对称性、协调性
     - **综合整合**：分析绘画的整体心理含义
       - 价值排序：哪些元素最突出？反映个人最重视的领域
       - 整合程度：各元素是否和谐共存？还是相互冲突？
       - 心理空间分布：画面布局反映内在心理空间的组织方式
       - 动态平衡：各元素之间的能量流动和平衡状态
       - 一致性与矛盾性：各特征的意义是否一致？是否存在冲突？

  4. **多维度人格评估**
     - 根据 [references/htp-analysis-framework.md](references/htp-analysis-framework.md) 进行系统性评估：
       - 整体布局维度：画面中的位置、大小比例、空间关系
       - 元素特征维度：各元素的特征和心理含义
       - 技术特征维度：线条质量、涂抹、细节程度、情绪表达
       - 大小与比例维度：各元素相对于画面的整体大小、元素之间的比例关系
       - 位置与布局维度：各元素在画面中的位置、元素之间的距离和关系、整体构图
       - 线条与笔触维度：线条的粗细、强弱、断续；笔触的压力；线条的方向
     - 考虑年龄和文化背景因素对解读的影响
       - **大小与比例维度**：各元素相对于画面的整体大小、元素之间的比例关系、夸大或缩小特定部分的含义
       - **位置与布局维度**：各元素在画面中的位置（上下左右、居中、偏移）、元素之间的距离和关系、整体构图
       - **线条与笔触维度**：线条的粗细、强弱、断续；笔触的压力；线条的方向（直线、曲线、锯齿线）
     - 考虑年龄和文化背景因素对解读的影响

  5. **风险评估与双份报告生成 + HTML 配图输出**
     - **综合整合**：分析三元素之间的互动关系和整体心理空间分布
       - 价值排序：哪个元素最大/最突出？反映个人最重视的领域
       - 整合程度：三元素是否和谐共存？还是相互冲突/隔离？
       - 心理空间分布：三元素的位置关系反映内在心理空间的组织方式
       - 动态平衡：三元素之间的能量流动和平衡状态
       - 一致性与矛盾性：各元素的象征意义是否一致？是否存在冲突？
     - 根据 [references/htp-analysis-framework.md](references/htp-analysis-framework.md) 进行系统性评估：
       - 整体布局维度：三元素在纸张中的位置、大小比例、空间关系
       - 房子特征维度：家庭关系、安全感、自我形象
       - 树木特征维度：自我认知、成长发展、情绪状态
       - 人物特征维度：身份认同、人际关系、自我价值
       - 技术特征维度：线条质量、涂抹、细节程度、情绪表达
     - 考虑年龄和文化背景因素对解读的影响

  5. **风险评估与双份报告生成 + HTML 配图输出**
     - 根据 [references/htp-warning-signs.md](references/htp-warning-signs.md) 中的风险警示系统
     - 检查是否存在高风险或中风险指标
     - 生成两份报告：
       - **文本格式**：专业分析报告 + 客户洞察报告（Markdown 格式）
       - **HTML 格式**：仅输出客户洞察报告，包含智能配图

     **HTML 客户洞察报告的智能配图策略**：
     - 根据客户洞察报告内容自动生成 3-5 张插图
     - 使用智能体的图像生成能力，基于报告主题和风格生成插图
     - 插图位置：报告开头、深度洞察部分、行动建议部分、最后的邀请部分
     - 插图风格：根据用户年龄和文化背景智能选择
       - 儿童客户：playful 或 warm 风格（友好、童趣、色彩鲜艳）
       - 青少年客户：flat-doodle 或 notion 风格（现代、简洁、清新）
       - 成年客户：warm 或 elegant 风格（温暖、专业、成熟）
       - 老年客户：watercolor 或 vintage 风格（柔和、怀旧、优雅）

     **智能配图流程**：
     1. **分析报告主题**：提取客户洞察报告的核心主题、情感基调、关键意象
     2. **确定插图需求**：为每个主要章节设计配图主题
        - 封面插图：整体心理状态的视觉隐喻
        - 深度洞察插图：关键意象的可视化表达
        - 行动建议插图：积极行动的视觉引导
        - 最后的邀请插图：温暖支持的视觉表达
     3. **生成配图提示词**：基于报告内容、风格特征、情感基调生成详细的图像生成提示
     4. **生成插图**：使用智能体的图像生成能力，根据提示词生成插图
     5. **整合到 HTML**：将生成的插图插入到 HTML 报告的相应位置
     6. **生成长图文**：将 HTML 报告转换为长图文格式（适合分享）

     **输出文件结构**：
     - **专业分析报告**（Markdown 格式，仅文档）：
       `professional-analysis.md`

     - **客户洞察报告**（HTML + 配图 + 长图文，2个成果）：
       - `client-insight.html`（HTML 格式，包含智能配图）
       - `client-insight-image.png`（长图文格式，适合分享）

     **专业分析报告**（面向专业人士，详细、系统、理论化）：
```
# 心理分析报告

## 一、视觉特征识别
### 整体布局
- 画面位置：[左上/右上/左下/右下/居中]
- 元素大小：[过大/适中/过小，占纸张面积比例]
- 整体构图：[均衡/偏左/偏右/倾斜/悬浮]
- 空间利用：[充分利用/集中在小区域/大量空白]

### 绘画元素特征
#### 主要元素
- 形态：[具体视觉特征描述]
- 质量描述：[具体视觉特征描述]
- 象征意义：[基于心理学理论的含义]
- 形状：[圆形/椭圆形/云团状/尖锐状/其他]
- 形态：[具体视觉特征描述]
- 象征意义：[基于心理学理论的含义]

### 技术特征
#### 线条特征
- 力度：[强有力/柔弱/变化不定]
- 连续性：[连续/断断续续/重叠混乱]
- 粗细：[粗线条/细线条/混合]

#### 涂抹特征
- 范围：[全面涂抹/局部涂抹/无涂抹]
- 强度：[轻度/中度/重度]
- 位置：[整体/局部/特定区域]

#### 细节程度
- 细节密度：[高度细节/适中细节/简单概括]
- 细节分布：[均匀/集中/偏重某部分]
- 细节质量：[精细/粗糙/混乱]

#### 空白空间利用
- 利用程度：[充分利用/集中在小区域/大量空白]
- 分布方式：[均匀/不均匀/边缘化]

## 二、多维度心理分析
### 维度1：整体布局分析
- 空间定位解读：[基于位置和构图的心理状态评估]
- 大小比例分析：[自我认知和自信水平评估]
- 平衡感评估：[内在平衡和适应能力分析]

### 维度2：元素特征分析
- 元素分析：[各元素的心理含义评估]
- 特征分析：[特征的心理状态评估]
- 象征意义：[基于心理学理论的含义]

### 维度3：技术特征分析
- 线条分析：[能量水平、自信程度、注意力评估]
- 涂抹分析：[焦虑水平、情绪压抑、冲突焦点评估]
- 细节分析：[观察力、完美主义、认知方式评估]
- 空间分析：[开放性、安全感、孤独感评估]

### 维度4：情绪表达分析
- 整体情绪基调：[积极/消极/中性]
- 能量水平评估：[高能量/中等能量/低能量]
- 焦虑水平评估：[高焦虑/中等焦虑/低焦虑]
- 防御机制识别：[防御性强/防御性弱/防御性适中]

### 维度5：发展维度分析
- 心理发展阶段：[符合/超前/滞后于年龄阶段]
- 自我发展水平：[自我接纳/自我贬低/自我膨胀/自我冲突]
- 适应能力评估：[良好适应/适应困难/不适应]
- 成长导向评估：[强成长导向/中等/弱]

## 三、综合心理画像
### 核心人格特质
1. [特质1及其表现依据]
2. [特质2及其表现依据]
3. [特质3及其表现依据]

### 心理状态评估
- 当前情绪状态：[基于视觉特征的情绪状态分析]
- 自我认知水平：[自我概念、自我价值感分析]
- 适应能力：[应对压力和变化的能力评估]

### 优势与资源
1. [优势1及其表现依据]
2. [优势2及其表现依据]
3. [优势3及其表现依据]

### 挑战与成长点
1. [挑战1及其表现依据]
2. [挑战2及其表现依据]
3. [挑战3及其表现依据]

## 四、风险评估
### 风险等级
- [无风险/低风险/中风险/高风险]

### 识别到的风险指标
#### 高风险指标（如有）
- [指标名称]：[表现特征] → [心理学含义]
- [指标名称]：[表现特征] → [心理学含义]

#### 中风险指标（如有）
- [指标名称]：[表现特征] → [心理学含义]
- [指标名称]：[表现特征] → [心理学含义]

#### 低风险指标（如有）
- [指标名称]：[表现特征] → [心理学含义]

### 风险详细分析
- [高风险/中风险/低风险]的详细心理学解释
- 功能性受损程度评估
- 风险来源和触发因素分析

## 五、专业建议
### 心理咨询建议
- 是否需要心理咨询：[是/否/建议]
- 咨询重点方向：[具体的咨询目标]
- 推荐咨询方式：[个体咨询/团体咨询/家庭治疗等]

### 治疗技术建议
- 推荐的心理治疗技术：[如认知行为治疗、EMDR、正念治疗等]
- 治疗重点：[具体的治疗目标和焦点]

### 发展建议
- 个人成长建议：[基于分析结果的具体建议]
- 心理调适建议：[基于分析结果的具体建议]
- 后续跟进建议：[如有需要]

### 紧急建议（如有高风险）
- ⚠️ 紧急警示：[如检测到高风险，提供紧急警示]
- 立即行动建议：[具体步骤]
- 专业转介建议：[精神科医生/心理治疗师等]
- 紧急联系方式：[提供危机干预热线]

## 六、分析依据与局限性
### 理论依据
- HTP投射测验理论框架
- 五大维度分析模型
- 风险警示系统

### 年龄与文化背景考量
- 年龄因素：[分析中考虑的年龄阶段特征]
- 文化因素：[分析中考虑的文化背景影响]

### 局限性说明
- 本分析基于单次绘画作品，不能作为临床诊断依据
- 绘画受技能、情境、情绪等多种因素影响
- 需要结合面谈、其他评估方法综合判断
- 分析结果仅供参考，不替代专业临床诊断

## 七、记录信息
- 分析时间：[日期时间]
- 分析方法：绘画心理分析
- 分析师：[AI辅助分析]
- 备注：[其他需要记录的信息]
```

     **客户洞察报告**（面向客户，简洁、温暖、聚焦洞察和建议）：
```
# 绘画洞察报告

## 一、深度洞察

[第一段：整体画面解码]
用1-2句话描述整体画面特征，直接引出核心心理状态。例如：
"这幅画呈现了一个温暖而理想的场景：左侧的小房子，右侧的大树，中央站着一个笑容灿烂的小女孩。这幅画揭示了一个在多重角色中寻找平衡的现代女性。"

[第二段：关键意象解读]
选取2-3个最关键的视觉特征，深度融合心理学解读。例如：
"左侧房子+右侧大树的布局，反映了你将家庭视为情感根基，将职业视为成长追求，但这两个角色之间缺乏有机融合。内部的锯齿状线条，是你成长阵痛和情绪张力的诚实记录。云朵状的元素，是你为自己创造的温柔庇护所，在压力下的心理保护机制。"

[第三段：当前状态定位]
简洁刻画当前心理状态。例如：
"你在表面上维持着令人羡慕的平衡：职业优秀、家庭尽责、内心保留童真。但在这种表面平衡之下，隐藏着深层的分裂和疲惫。你可能在家中完全扮演'妈妈'的角色，在工作中完全扮演'总监'的角色，但很少有人——包括你自己——见过这两个角色的融合状态。"

[第四段：核心矛盾与渴望]
点明最深层的矛盾和核心渴望。例如：
"你的核心矛盾在于：职业成就与简单生活的向往，完美妈妈与真实自我的拉扯。你渴望简单、温暖、被理解、被接纳，这些渴望本身是美好的，但也可能成为你逃避现实复杂性的借口。"

## 二、行动建议

### 核心方向
[一句话概括主要成长方向]
例如："真正的平衡不是'搞定一切'，而是在多样性中找到统一，让房子的温暖、树木的生命力、小女孩的童真共同存在于你的生命中。"

### 具体实践建议
[给出2-3个具体可行的建议，避免理论化]

**1. 看见与接纳**
[建议内容]
例如："这幅画本身就是一个'看见'的过程。建议你建立自我对话习惯，每天晚上花10分钟，诚实地对自己说：今天，我的哪个'自我'处于主导地位？这个状态让我感觉如何？接纳的前提是看见，看见之后才有整合的可能。"

**2. 建立角色边界**
[建议内容]
例如："为职业、家庭、自我角色设定清晰的边界条件。比如，工作时间内全力投入，但允许自己在某些问题上做到'足够好'而非'完美'；回家后，通过一个简单的过渡仪式（如深呼吸、听一首歌），帮助自己从'总监'切换到'妈妈'模式。"

**3. 养育内在小孩**
[建议内容]
例如："那个微笑的小女孩是你最宝贵的心理资源，她代表着你的创造力、直觉、童真。建议你每周至少保留2小时纯粹的'自我时间'，做没有功利性的事。不是'消除'她，而是让她成为你生命的中心，而不是被庇护的配角。"

## 三、最后的邀请

[一段温暖而有力的话，提供支持和希望]
例如："这幅画的和谐，不是来自'消除冲突'，而是来自'接纳多样性'。树干内部的锯齿状线条不是缺陷，而是你成长历程的诚实记录。云朵状的树冠不是逃避，而是你为自己创造的温柔庇护所。那个微笑的小女孩不是负担，而是你生命力的珍贵源头。你已经做得很好了。现在，试着对自己好一点。"
```

- 可选分支：
  - 当检测到高风险指标：在两份报告中都添加风险警示
  - 当用户为儿童：调整客户洞察报告的语言风格，避免专业术语，关注发展阶段特征
  - 当用户为青少年：关注身份认同和独立性发展
  - 当用户为成年人：关注职业发展和人际关系
  - 当存在文化差异：在分析中说明文化背景的影响

## 资源索引
- 品牌指南：见 [references/brand.md](references/brand.md)（品牌核心、目标用户、应用场景、竞争优势）
- 品牌定位：见 [references/brand-positioning.md](references/brand-positioning.md)（品牌定位策略、用户画像、品牌个性、传播策略）
- 产品介绍：见 [references/product-description.md](references/product-description.md)（项目简介、核心亮点、技术特色、项目价值）
- 电梯演讲：见 [references/elevator-pitch.md](references/elevator-pitch.md)（产品介绍版本、用户故事、核心信息）
- 推广文案：见 [references/promotion.md](references/promotion.md)（推广文案、应用场景、用户故事、核心理念）
- 象征体系词典：见 [references/htp-symbolism-dictionary.md](references/htp-symbolism-dictionary.md)（包含各类绘画元素的象征意义）
- 分析框架：见 [references/htp-analysis-framework.md](references/htp-analysis-framework.md)（多维度分析模型）
- 风险警示：见 [references/htp-warning-signs.md](references/htp-warning-signs.md)（高风险和中风险指标定义）

## 注意事项
- **避免绝对化判断**：绘画分析结果仅作为探索和参考，不能作为临床诊断依据。避免使用绝对化的语言（如"肯定是抑郁"、"绝对是焦虑症"），应使用探索性语言（如"可能存在抑郁倾向"、"显示一定程度的焦虑"）
- **识别警示信号**：及时识别需要专业心理干预的警示信号（极端暴力、自伤或自杀意象、严重混乱和精神病性内容、极度扭曲的现实感），并在报告中明确标注，建议专业心理咨询或治疗
- **明确边界**：始终强调分析报告的探索性和辅助性，而非诊断性。提醒用户本工具不能替代专业临床诊断
- **以绘画为核心**：所有分析围绕绘画作品展开，不暴露内层技术系统
- **充分利用智能体的图像识别能力，准确提取绘画的视觉特征
- 仅在需要时读取参考文档，保持上下文简洁
- 在解读时始终考虑年龄和文化背景的影响
- 检测到风险指标时，必须在报告中明确标注并提供紧急建议
- 分析报告应客观、专业，避免武断或绝对化的表述
- 提醒用户这是辅助性心理评估工具，不能替代专业心理诊断

## 使用示例
### 场景1：成人自我探索
- 功能说明：分析成人上传的绘画，了解自己的内在状态和成长方向
- 执行方式：智能体图像识别 + 参考文档指导的人格分析
- 关键要点：关注人格特质、心理状态、职业发展相关特征
- 报告输出：专业分析报告（Markdown）+ 客户洞察报告（HTML + 长图文）
- 品牌应用：温暖友好的报告风格，聚焦"看见、理解、成长"

### 场景2：儿童心理发展评估
- 功能说明：分析儿童绘画，了解心理发展水平
- 执行方式：智能体图像识别 + 年龄适应性解读
- 关键要点：关注发展阶段特征、情绪表达、适应能力
- 报告输出：专业分析报告（Markdown）+ 客户洞察报告（HTML + 童趣配图 + 长图文）
- 风格选择：playful 风格，友好、童趣、色彩鲜艳

### 场景3：心理咨询辅助工具
- 功能说明：为心理咨询师快速了解来访者提供专业参考
- 执行方式：智能体图像识别 + 系统性评估 + 风险识别
- 关键要点：关注风险指标、心理状态、咨询重点
- 报告输出：专业分析报告（Markdown，详细的理论依据）
- 品牌价值：专业可信，基于成熟心理学理论

### 场景4：团队心理建设
- 功能说明：团队成员各自绘画，用于了解团队心理特征
- 执行方式：批量分析 + 综合报告
- 关键要点：关注共性与差异、团队优势、潜在冲突点
- 报告输出：团队综合分析报告 + 个人洞察报告
- 应用价值：营造健康的团队文化，支持员工心理健康

## HTML 输出格式说明

### 生成流程
1. **完成双份报告（文本格式）**：先生成专业分析报告和客户洞察报告的 Markdown 文本
2. **分析客户洞察报告**：提取客户洞察报告的核心主题、情感基调、关键意象
3. **设计配图计划**：根据客户洞察报告内容，确定 3-5 个配图位置和主题
4. **生成配图提示词**：基于报告内容、用户特征、风格选择生成详细的图像生成提示
5. **生成插图**：使用智能体的图像生成能力，为每个配图位置生成符合风格的插图
6. **生成 HTML**：将客户洞察报告内容与插图整合为 HTML 格式

### 智能配图主题规划
**客户洞察报告配图位置与主题**：

- **封面插图**（报告开头）
  - 主题：整体心理状态的视觉隐喻
  - 示例：平静的湖面、生长的树苗、温暖的阳光、内在的花园
  - 目的：营造温暖、安全、接纳的氛围

- **深度洞察插图**（深度洞察部分）
  - 主题：关键意象的可视化表达
  - 示例：左右分岔的道路、内在房间的隐喻、树的年轮、桥梁连接
  - 目的：帮助客户理解关键洞察

- **行动建议插图**（行动建议部分）
  - 主题：积极行动的视觉引导
  - 示例：温暖的手、开放的门、攀登的台阶、播种的动作
  - 目的：激发行动意愿和希望

- **最后的邀请插图**（最后的邀请部分）
  - 主题：温暖支持的视觉表达
  - 示例：阳光下的树、拥抱的场景、盛开的花朵、温柔的光芒
  - 目的：传递支持和鼓励

### 智能配图流程
**Step 1：分析用户特征**
- 识别用户年龄（儿童/青少年/成年/老年）
- 识别文化背景（集体主义/个人主义/跨文化）
- 识别心理状态（焦虑/抑郁/成长/平衡）

**Step 2：选择配图风格**
根据用户特征自动选择：
- **儿童客户**：playful 或 warm 风格（友好、童趣、色彩鲜艳）
- **青少年客户**：flat-doodle 或 notion 风格（现代、简洁、清新）
- **成年客户**：warm 或 elegant 风格（温暖、专业、成熟）
- **老年客户**：watercolor 或 vintage 风格（柔和、怀旧、优雅）

**Step 3：生成配图提示词**
基于以下要素生成详细的图像生成提示：
- **主题**：从配图主题规划中选择
- **风格特征**：根据选择的风格确定视觉特征
- **情感基调**：温暖、支持、希望、安全
- **颜色方案**：根据风格选择配色
- **构图要求**：简洁、清晰、易于理解
- **文化适配**：考虑用户文化背景

**Step 4：生成插图**
使用智能体的图像生成能力，根据提示词生成插图

**Step 5：整合到 HTML**
将生成的插图插入到 HTML 报告的相应位置

**Step 6：生成长图文**
将 HTML 报告转换为长图文格式（client-insight-image.png），适合分享到社交媒体

### HTML 模板特性
**仅输出客户洞察报告**，不包含专业分析报告

**视觉设计**：
- 温暖友好的 Warm 风格
- 渐变背景（米白到桃色）
- 圆润的卡片式布局
- 阴影和圆角增加层次感

**响应式设计**：
- 支持移动端和桌面端
- 图片自适应缩放
- 字体大小自适应

**打印友好**：
- 优化打印样式
- 避免图片分页
- 页面分隔清晰

**无障碍访问**：
- 图片 alt 文本描述
- 语义化 HTML 标签
- 高对比度配色

**风险警示**：
- 检测到风险时显示醒目的红色警示框
- 提供紧急联系方式
- 建议专业咨询

### 风格配色方案
**warm 风格（适合成年客户）**：
- 主色调：暖橙色 (#ED8936)
- 背景色：米白色 (#FFFAF0) → 桃色渐变 (#FED7AA)
- 次要色：金色 (#F6AD55)
- 强调色：深棕色 (#744210)
- 意义：温暖、接纳、理解

**playful 风格（适合儿童客户）**：
- 主色调：鲜亮的蓝色 (#4299E1)
- 背景色：淡黄色 (#FEFCBF)
- 次要色：粉色 (#ED64A6)
- 强调色：紫色 (#805AD5)
- 意义：友好、童趣、活力

**elegant 风格（适合专业场景）**：
- 主色调：深蓝色 (#2C5282)
- 背景色：纯白色 (#FFFFFF)
- 次要色：灰色 (#718096)
- 强调色：金色 (#D69E2E)
- 意义：专业、信任、稳重

**watercolor 风格（适合老年客户）**：
- 主色调：柔和的绿色 (#68D391)
- 背景色：淡粉色 (#FED7E2)
- 次要色：浅蓝色 (#63B3ED)
- 强调色：米色 (#FBD38D)
- 意义：柔和、怀旧、宁静

### 输出文件结构

**专业分析报告**（Markdown 格式）：
```
professional-analysis.md    # 专业分析报告（Markdown 文本）
```

**客户洞察报告**（HTML + 配图 + 长图文）：
```
client-insight/              # 客户洞察报告目录
├── index.html              # HTML 格式（包含智能配图）
├── client-insight-image.png # 长图文格式（适合分享）
├── illustrations/          # 智能配图
│   ├── illustration-cover.png      # 封面插图
│   ├── illustration-insight.png    # 深度洞察插图
│   ├── illustration-action.png     # 行动建议插图
│   └── illustration-invitation.png # 最后的邀请插图
└── original-drawing.png    # 原始绘画图片
```

**完整输出目录**：
```
htp-insight-report-{timestamp}/
├── professional-analysis.md      # 专业分析报告（Markdown 文本）
└── client-insight/               # 客户洞察报告目录
    ├── index.html                # HTML 格式
    ├── client-insight-image.png  # 长图文格式
    ├── illustrations/            # 智能配图
    │   ├── illustration-cover.png
    │   ├── illustration-insight.png
    │   ├── illustration-action.png
    │   └── illustration-invitation.png
    └── original-drawing.png       # 原始绘画图片
```

### 注意事项
- 专业分析报告仅以 Markdown 文本形式提供，不需要 HTML 和配图
- 客户洞察报告包含 HTML 格式、智能配图和长图文格式（2个成果）
- 长图文适合分享到社交媒体，便于传播
- 插图应采用Web优化格式（PNG或WebP），确保加载速度
- 图片alt文本应简洁描述，便于屏幕阅读器访问
- 风格选择应与用户年龄、文化背景、心理状态相匹配
- 如有高风险指标，风险警示部分应使用醒目的视觉样式（如红色背景、加粗文字）
- HTML报告应温暖、友好、易于阅读，适合客户直接查看
- 配图应智能生成，基于报告内容和用户特征
- 避免使用过于抽象或复杂的图像，保持简洁清晰
- **避免绝对化判断**：绘画分析结果仅作为探索和参考，不能作为临床诊断依据
- **识别警示信号**：及时识别需要专业心理干预的警示信号
- **明确边界**：始终强调分析报告的探索性和辅助性，而非诊断性


## awkn-article-illustrator-code 技能

---
name: awkn-article-illustrator
description: Smart article illustration skill. Analyzes article content and generates illustrations at positions requiring visual aids with multiple style options. Use when user asks to "add illustrations to article", "generate images for article", or "illustrate article".
---

# Smart Article Illustration Skill

Analyze article structure and content, identify positions requiring visual aids, and generate illustrations with flexible style options.

## Usage

```bash
# Auto-select style based on content
/awkn-article-illustrator path/to/article.md

# Specify a style
/awkn-article-illustrator path/to/article.md --style warm
/awkn-article-illustrator path/to/article.md --style minimal
/awkn-article-illustrator path/to/article.md --style watercolor

# Combine with other options
/awkn-article-illustrator path/to/article.md --style playful
```

## Options

| Option | Description |
|--------|-------------|
| `--style <name>` | Specify illustration style (see Style Gallery below) |

## Style Gallery

| Style | Description | Best For |
|-------|-------------|----------|
| `notion` (Default) | Minimalist hand-drawn line art, intellectual | Knowledge sharing, SaaS, productivity |
| `elegant` | Refined, sophisticated, professional | Business, thought leadership |
| `warm` | Friendly, approachable, human-centered | Personal growth, lifestyle, education |
| `minimal` | Ultra-clean, zen-like, focused | Philosophy, minimalism, core concepts |
| `playful` | Fun, creative, whimsical | Tutorials, beginner guides, fun topics |
| `nature` | Organic, calm, earthy | Sustainability, wellness, outdoor |
| `sketch` | Raw, authentic, notebook-style | Ideas, brainstorming, drafts |
| `watercolor` | Soft artistic with natural warmth | Lifestyle, travel, creative |
| `vintage` | Nostalgic aged-paper aesthetic | Historical, biography, heritage |
| `scientific` | Academic precise diagrams | Biology, chemistry, technical |
| `chalkboard` | Classroom chalk drawing style | Education, tutorials, workshops |
| `editorial` | Magazine-style infographic | Tech explainers, journalism |
| `flat` | Modern flat vector illustration | Startups, digital, contemporary |
| `flat-doodle` | Bold outlines, pastel colors, cute | Productivity, SaaS, workflows |
| `retro` | 80s/90s vibrant nostalgic | Pop culture, gaming, entertainment |
| `blueprint` | Technical schematics, engineering precision | Architecture, system design |
| `vector-illustration` | Flat vector with black outlines, retro colors | Educational, creative, brand content |
| `sketch-notes` | Soft hand-drawn, warm educational feel | Knowledge sharing, tutorials |
| `pixel-art` | Retro 8-bit gaming aesthetic | Gaming, tech, developer content |
| `intuition-machine` | Technical briefing with bilingual labels | Academic, technical, bilingual |
| `fantasy-animation` | Ghibli/Disney whimsical style | Storytelling, children's, creative |

Full style specifications in `references/styles/<style>.md`

## Auto Style Selection

When no `--style` is specified, analyze content to select the best style:

| Content Signals | Selected Style |
|----------------|----------------|
| Personal story, emotion, growth, life, feeling, relationship | `warm` |
| Simple, zen, focus, essential, core, minimalist | `minimal` |
| Fun, easy, beginner, tutorial, guide, how-to, learn | `playful` |
| Nature, eco, wellness, health, organic, green, outdoor | `nature` |
| Idea, thought, concept, draft, brainstorm, sketch | `sketch` |
| Business, professional, strategy, analysis, corporate | `elegant` |
| Knowledge, concept, productivity, SaaS, notion, tool | `notion` |
| Lifestyle, travel, food, art, creative, artistic | `watercolor` |
| History, heritage, vintage, biography, classic, expedition | `vintage` |
| Biology, chemistry, medical, scientific, research, academic | `scientific` |
| Education, classroom, teaching, school, lecture, workshop | `chalkboard` |
| Explainer, journalism, magazine, in-depth, investigation | `editorial` |
| Modern, startup, app, product, digital marketing, saas | `flat` |
| Productivity, workflow, cute, tools, app tutorial | `flat-doodle` |
| 80s, 90s, retro, pop culture, music, nostalgia | `retro` |
| Architecture, system, infrastructure, engineering, technical | `blueprint` |
| Brand, explainer, children, cute, toy, geometric | `vector-illustration` |
| Notes, doodle, friendly, warm tutorial, onboarding | `sketch-notes` |
| Gaming, 8-bit, pixel, developer, retro tech | `pixel-art` |
| Bilingual, briefing, academic, research, documentation | `intuition-machine` |
| Fantasy, story, magical, Ghibli, Disney, children | `fantasy-animation` |
| Default | `notion` |

## File Management

### Output Directory

Each session creates an independent directory named by content slug:

```
illustrations/{topic-slug}/
├── source-{slug}.{ext}    # Source files (text, images, etc.)
├── outline.md
├── outline-{style}.md     # Style variant outlines
├── prompts/
│   ├── illustration-concept-a.md
│   ├── illustration-concept-b.md
│   └── ...
├── illustration-concept-a.png
├── illustration-concept-b.png
└── ...
```

**Slug Generation**:
1. Extract main topic from content (2-4 words, kebab-case)
2. Example: "The Future of AI" → `future-of-ai`

### Conflict Resolution

If `illustrations/{topic-slug}/` already exists:
- Append timestamp: `{topic-slug}-YYYYMMDD-HHMMSS`
- Example: `ai-future` exists → `ai-future-20260118-143052`

### Source Files

Copy all sources with naming `source-{slug}.{ext}`:
- `source-article.md` (main text content)
- `source-photo.jpg` (image from conversation)
- `source-reference.pdf` (additional file)

Multiple sources supported: text, images, files from conversation.

## Workflow

### Step 1: Analyze Content & Select Style

1. Read article content
2. If `--style` specified, use that style
3. Otherwise, scan for style signals and auto-select
4. **Language detection**:
   - Detect **source language** from article content
   - Detect **user language** from conversation context
   - Note if source_language ≠ user_language (will ask in Step 4)
5. Extract key information:
   - Main topic and themes
   - Core messages per section
   - Abstract concepts needing visualization

### Step 2: Identify Illustration Positions

**Three Purposes of Illustrations**:
1. **Information Supplement**: Help understand abstract concepts
2. **Concept Visualization**: Transform abstract ideas into concrete visuals
3. **Imagination Guidance**: Create atmosphere, enhance reading experience

**Content Suitable for Illustrations**:
- Abstract concepts needing visualization
- Processes/steps needing diagrams
- Comparisons needing visual representation
- Core arguments needing reinforcement
- Scenarios needing imagination guidance

**Illustration Count**:
- Consider at least 1 image per major section
- Prioritize core arguments and abstract concepts
- **Principle: More is better than fewer**

### Step 3: Generate Illustration Plan

```markdown
# Illustration Plan

**Article**: [article path]
**Style**: [selected style]
**Illustration Count**: N images

---

## Illustration 1

**Insert Position**: [section name] / [paragraph description]
**Purpose**: [why illustration needed here]
**Visual Content**: [what the image should show]
**Filename**: illustration-[slug].png

---

## Illustration 2
...
```

### Step 4: Review & Confirm

**Purpose**: Let user confirm all options in a single step before image generation.

**IMPORTANT**: Present ALL options in a single confirmation step using AskUserQuestion. Do NOT interrupt workflow with multiple separate confirmations.

1. **Generate 3 style variants**:
   - Analyze content to select 3 most suitable styles
   - Generate complete illustration plan for each style variant
   - Save as `outline-{style}.md` (e.g., `outline-notion.md`, `outline-tech.md`, `outline-warm.md`)

2. **Determine which questions to ask**:

   | Question | When to Ask |
   |----------|-------------|
   | Style variant | Always (required) |
   | Language | Only if `source_language ≠ user_language` |

3. **Present options** (use AskUserQuestion with all applicable questions):

   **Question 1 (Style)** - always:
   - Style A (recommended): [style name] - [brief description]
   - Style B: [style name] - [brief description]
   - Style C: [style name] - [brief description]
   - Custom: Provide custom style reference

   **Question 2 (Language)** - only if source ≠ user language:
   - [Source language] (matches article language)
   - [User language] (your preference)

   **Language handling**:
   - If source language = user language: Just inform user (e.g., "Prompts will be in Chinese")
   - If different: Ask which language to use for prompts

4. **Apply selection**:
   - Copy selected `outline-{style}.md` to `outline.md`
   - If custom style provided, generate new plan with that style
   - If different language selected, regenerate outline in that language
   - User may edit `outline.md` directly for fine-tuning
   - If modified, reload plan before proceeding

5. **Proceed only after explicit user confirmation**

### Step 5: Create Prompt Files

Save prompts to `prompts/` directory with style-specific details.

**All prompts are written in the user's confirmed language preference.**

**Prompt Format**:

```markdown
Illustration theme: [concept in 2-3 words]
Style: [style name]

Visual composition:
- Main visual: [description matching style]
- Layout: [element positioning]
- Decorative elements: [style-appropriate decorations]

Color scheme:
- Primary: [style primary color]
- Background: [style background color]
- Accent: [style accent color]

Text content (if any):
- [Any labels or captions in content language]

Style notes: [specific style characteristics]
```

### Step 6: Generate Images

**Image Generation Skill Selection**:
1. Check available image generation skills
2. If multiple skills available, ask user to choose

**Generation Flow**:
1. Call selected image generation skill with prompt file and output path
2. Generate images sequentially
3. After each image, output progress: "Generated X/N"
4. On failure, auto-retry once
5. If retry fails, log reason, continue to next

### Step 7: Update Article

Insert generated images at corresponding positions:

```markdown
![illustration description]([article-name]/illustrations/illustration-[slug].png)
```

**Insertion Rules**:
- Insert image after corresponding paragraph
- Leave one blank line before and after image
- Alt text uses concise description in article's language

### Step 8: Output Summary

```
Article Illustration Complete!

Article: [article path]
Style: [style name]
Generated: X/N images successful

Illustration Positions:
- illustration-xxx.png → After section "Section Name"
- illustration-yyy.png → After section "Another Section"
...

[If any failures]
Failed:
- illustration-zzz.png: [failure reason]
```

## Illustration Modification

Support for modifying individual illustrations after initial generation.

### Edit Single Illustration

Regenerate a specific illustration with modified prompt:

1. Identify illustration to edit (e.g., `illustration-concept-overview.png`)
2. Update prompt in `prompts/illustration-concept-overview.md` if needed
3. If content changes significantly, update slug in filename
4. Regenerate image
5. Update article if image reference changed

### Add New Illustration

Add a new illustration to the article:

1. Identify insertion position in article
2. Create new prompt with appropriate slug (e.g., `illustration-new-concept.md`)
3. Generate new illustration image
4. Update `outline.md` with new illustration entry
5. Insert image reference in article at the specified position

### Delete Illustration

Remove an illustration from the article:

1. Identify illustration to delete (e.g., `illustration-concept-overview.png`)
2. Remove image file and prompt file
3. Remove image reference from article
4. Update `outline.md` to remove illustration entry

### File Naming Convention

Files use meaningful slugs for better readability:
```
illustration-[slug].png
illustration-[slug].md (in prompts/)
```

Examples:
- `illustration-concept-overview.png`
- `illustration-workflow-diagram.png`
- `illustration-key-benefits.png`

**Slug rules**:
- Derived from illustration purpose/content (kebab-case)
- Must be unique within the article
- When content changes significantly, update slug accordingly

## References

| File | Content |
|------|---------|
| `references/styles/<style>.md` | Full style specifications with colors, elements, rules |

## Notes

- Illustrations serve the content: supplement information, visualize concepts
- Maintain selected style consistency across all illustrations in one article
- Image generation typically takes 10-30 seconds per image
- Sensitive figures should use cartoon alternatives
- Prompts written in user's confirmed language preference
- Illustration text (labels, captions) should match article language

## Extension Support

Custom styles and configurations via EXTEND.md.

**Check paths** (priority order):
1. `.awkn-skills/awkn-article-illustrator/EXTEND.md` (project)
2. `~/.awkn-skills/awkn-article-illustrator/EXTEND.md` (user)

If found, load before Step 1. Extension content overrides defaults.

## 下一步引导

插图生成完成后，根据场景引导用户：

**如果是在场景2（公众号完整发布流程）中**：
```
✅ 插图生成完成！已在文章合适位置插入图片。

接下来可以继续：
1. **图片优化**：使用 awkn-compress-image 压缩图片减小文件体积（可选）
2. **一键发布**：使用 awkn-post-to-wechat 自动发布到微信公众号

是否继续？请选择：
- "优化图片" → 调用 awkn-compress-image
- "一键发布" → 完整流程（优化→发布）
- "不需要" → 结束流程
```

**如果是单独使用插图生成技能**：
```
✅ 插图生成完成！

已生成：插图（已插入到文章中）

如需其他服务：
- "发布到公众号" → 调用 awkn-post-to-wechat
```

**引导原则**：
- 完成当前任务后，主动提示下一步选项
- 根据使用场景灵活引导（完整流程或单一服务）
- 保持友好的语气，不强迫用户继续


