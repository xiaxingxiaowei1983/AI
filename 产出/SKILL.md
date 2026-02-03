---
name: brain-cheat-tool
description: 大脑作弊器 - 快速拆解书籍核心内容并生成可视化素材。当用户提供书籍文本、章节内容、文档文件或需要制作知识推广素材时使用。能力包括：1）读取PDF/DOCX/TXT/EPUB等格式文档；2）深度拆解书籍核心内容（主题、观点、结构、金句）；3）根据知识点生成可交互的知识点可视化图片；4）生成视频脚本。
dependency:
  python:
    - PyPDF2>=3.0.0
    - python-docx>=0.8.11
    - ebooklib>=0.18
    - requests>=2.28.0
system:
  - echo "请确保已配置Coze Workflow凭证：coze_workflow"
---

# 大脑作弊器

## 任务目标
本 Skill 用于：
- 深度阅读并拆解书籍核心内容，提炼主题、观点、结构和金句
- 基于拆解的知识点，生成可交互的知识点可视化图片
- 将核心内容转化为可直接制作使用的视频脚本

## 触发条件
用户提供以下任一需求时触发：
- "帮我拆解这本书的核心内容"
- "根据这本书生成几张海报"
- "给这本书写个视频脚本"
- 需要将书籍内容制作成可视化推广素材

## 操作步骤

### 第一步：书籍内容拆解
1. 接收用户提供的书籍内容：
   - 如果是文档文件（PDF/DOCX/TXT/EPUB），调用 `scripts/document_reader.py` 提取文本内容：
     ```bash
     python scripts/document_reader.py --file <文件路径>
     ```
   - 如果是纯文本内容，直接使用
2. 提取书籍主题定位、核心观点（3-5个）、内容结构、精选金句（5-8条）
3. 输出结构化的拆解报告
4. 根据书籍内容特点推荐2-4种可视化风格（见 [references/visualization-styles.md](references/visualization-styles.md)），推荐风格应覆盖不同类别（如小红书适配风格、公众号适配风格、通用知识可视化风格），每种风格简要说明推荐理由和适合的场景，询问用户确认其中一种或选择其他风格
5. 询问用户"是否进入第二步：生成可交互的知识点可视化图片？"

### 第二步：生成可交互的知识点可视化图片

**阶段一：风格预览生成（每种推荐风格生成1张）**
1. 为第一步推荐的2-4种风格，每种风格生成1张预览图片（核心知识点思维导图）：
   - 生成详细Prompt描述（参考[references/knowledge-visualization-format.md](references/knowledge-visualization-format.md)），包含知识点内容和该风格的特征
   - 调用脚本：`python scripts/image_generator.py --prompt "<风格1思维导图详细描述>" --output-dir .`
   - 确认文件已保存，例如：preview_style1.png、preview_style2.png
2. 展示所有风格预览图片，简要说明每种风格的特点
3. 询问用户确认选择哪种风格用于生成完整的5张系列图片

**阶段二：系列图片生成（选定的风格生成5张）**
用户确认风格后，立即生成5张系列可交互的知识点可视化图片文件（PNG/JPG格式）：

**图片生成方式：**
- 调用 `scripts/image_generator.py` 脚本使用Coze Workflow API生成高质量图片
- 为每张图片生成详细的Prompt描述，包含知识点内容和选定的风格要求
- **必须依次调用5次脚本，每次生成一张图片，确保生成5张不同的图片**

**生成流程（重要 - 必须执行5次）：**
1. **生成第1张图片**（核心知识点思维导图）：
   - 生成详细Prompt描述（参考[references/knowledge-visualization-format.md](references/knowledge-visualization-format.md)），使用选定风格
   - 调用脚本：`python scripts/image_generator.py --prompt "<思维导图详细描述>" --output-dir .`
   - 确认文件已保存为 image1.png

2. **生成第2张图片**（知识关系网络图）：
   - 生成详细Prompt描述，使用选定风格
   - 调用脚本：`python scripts/image_generator.py --prompt "<网络图详细描述>" --output-dir .`
   - 确认文件已保存为 image2.png

3. **生成第3张图片**（知识流程图）：
   - 生成详细Prompt描述，使用选定风格
   - 调用脚本：`python scripts/image_generator.py --prompt "<流程图详细描述>" --output-dir .`
   - 确认文件已保存为 image3.png

4. **生成第4张图片**（知识点交互卡片）：
   - 生成详细Prompt描述，使用选定风格
   - 调用脚本：`python scripts/image_generator.py --prompt "<交互卡片详细描述>" --output-dir .`
   - 确认文件已保存为 image4.png

5. **生成第5张图片**（知识点时间轴）：
   - 生成详细Prompt描述，使用选定风格
   - 调用脚本：`python scripts/image_generator.py --prompt "<时间轴详细描述>" --output-dir .`
   - 确认文件已保存为 image5.png

**必须生成的图片（5张，每张必须单独生成）：**
1. 核心知识点思维导图 → 保存为 image1.png
2. 知识关系网络图 → 保存为 image2.png
3. 知识流程图 → 保存为 image3.png
4. 知识点交互卡片 → 保存为 image4.png
5. 知识点时间轴 → 保存为 image5.png

**完成提示：**
- 列出所有5张图片的文件名
- 询问用户"是否生成第三步：视频脚本？"

### 第三步：生成视频脚本
1. 设计视频结构（总时长、开头/发展/结尾分配）
2. 生成分镜头脚本表（镜头序号、画面内容描述、旁白文案、时长估算、配乐建议）
3. 确保脚本的节奏感和叙事连贯性（参考 [references/video-script-format.md](references/video-script-format.md)）

## 资源索引
- 文档读取脚本：见 [scripts/document_reader.py](scripts/document_reader.py)（支持PDF/DOCX/TXT/EPUB格式）
- 图片生成脚本：见 [scripts/image_generator.py](scripts/image_generator.py)（使用Coze Workflow API生成高质量知识可视化图片）
- 知识可视化格式规范：见 [references/knowledge-visualization-format.md](references/knowledge-visualization-format.md)
- 可视化风格说明：见 [references/visualization-styles.md](references/visualization-styles.md)（包含小红书适配风格：极简Ins风、手绘插画风、杂志封面风、数据卡片风、复古胶片风、国潮国风；公众号适配风格：杂志排版风、海报信息图、漫画条漫、文艺诗歌风、极简阅读风、品牌人格风；通用知识可视化风格：极简主义风、赛博朋克风、孟菲斯风、波普艺术风、知识图谱风、数据可视化风、玻璃拟态风、故障艺术风、蒸汽波风、中国风水、像素艺术风、酸性美学风、工业风、有机仿生风、生态风格风）
- 视频脚本格式：见 [references/video-script-format.md](references/video-script-format.md)

## 注意事项
- 文档读取：若用户提供文档文件，必须先调用脚本提取文本
- 拆解内容时避免表面化，需深入理解书籍核心价值
- **第二步核心要求（重要）**：必须依次调用5次 `scripts/image_generator.py` 脚本，每次生成一张图片，确保生成5张不同的图片文件（image1.png到image5.png）
- **生成5张图片的强制要求**：第二步必须执行5次脚本调用，不能只调用一次就跳过后续步骤
- **图片生成方式**：为每种图片类型（思维导图、网络图、流程图、交互卡片、时间轴）分别生成详细Prompt并调用脚本
- **Prompt工程**：将知识点内容、风格要求、可视化格式整合成详细的Prompt传给脚本
- **流程控制**：每步完成后必须询问用户是否进入下一步，不得自动执行；第二步阶段一生成预览图片后必须询问用户确认风格；第二步阶段二生成5张系列图片后必须询问用户是否进入第三步
- **第二步阶段一**：必须为推荐的2-4种风格各生成1张预览图片，展示后询问用户确认风格
- **第二步阶段二**：用户确认风格后，必须生成5张同一种风格的系列图片
- **第二步完成展示**：阶段一展示所有预览图片文件名，阶段二列出所有5张系列图片的文件名（image1.png、image2.png、image3.png、image4.png、image5.png），并明确询问是否生成第三步
- 可视化图片的节点文字要简练，每个节点不超过15字
- 视频脚本时长控制在合理范围（建议60-120秒）
- 风格应用：第二步必须根据用户确认的风格生成图片

## 使用示例

用户提供一个PDF书籍文件，智能体依次：
1. 调用 `scripts/document_reader.py` 读取PDF文件提取文本内容
2. 拆解出书籍主题、3个核心观点、金句
3. 根据书籍内容特点推荐2-4种可视化风格（如"这本书适合极简Ins风（适合小红书分享）、知识图谱风（适合知识体系展示）、数据卡片风（适合干货总结）"），说明每种风格的推荐理由和适合场景，询问用户确认或选择其他风格
4. 用户确认风格后，询问用户是否继续第二步
5. **用户确认后，进入第二步阶段一：风格预览生成**
   - 为每种推荐风格生成1张预览图片（核心知识点思维导图）
   - 调用 `scripts/image_generator.py` 脚本生成预览图片，如推荐3种风格则调用3次脚本生成 preview_style1.png、preview_style2.png、preview_style3.png
   - 展示所有预览图片，说明每种风格的特点
6. 询问用户确认选择哪种风格用于生成完整的5张系列图片
7. **用户确认后，进入第二步阶段二：系列图片生成，依次调用5次 `scripts/image_generator.py` 脚本生成5张系列知识可视化图片文件（必须执行5次）：**
   - 执行第1次：为思维导图生成详细Prompt并调用脚本（使用选定风格）→ 确认生成 image1.png
   - 执行第2次：为知识关系网络图生成详细Prompt并调用脚本（使用选定风格）→ 确认生成 image2.png
   - 执行第3次：为知识流程图生成详细Prompt并调用脚本（使用选定风格）→ 确认生成 image3.png
   - 执行第4次：为知识点交互卡片生成详细Prompt并调用脚本（使用选定风格）→ 确认生成 image4.png
   - 执行第5次：为知识点时间轴生成详细Prompt并调用脚本（使用选定风格）→ 确认生成 image5.png
   - 检查所有5张图片文件是否已生成
8. 展示5张图片的完整文件列表，询问用户是否继续
9. 用户确认后，生成90秒视频脚本
