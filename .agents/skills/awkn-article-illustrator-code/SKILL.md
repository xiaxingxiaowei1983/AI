---
name: awkn-article-illustrator
description: Smart article illustration skill. Analyzes article content and generates illustrations at positions requiring visual aids with multiple style options. Use when user asks to "add illustrations to article", "generate images for article", or "illustrate article".
---

# Smart Article Illustration Skill

Analyze article structure and content, identify positions requiring visual aids, and generate illustrations with warm style.

## Usage

```bash
# Auto-generate illustrations with warm style
/awkn-article-illustrator path/to/article.md
```

## Style: Warm

Warm style is the default and only style for this skill. It features:

- **Characteristics**: Friendly, approachable, human-centered
- **Color Palette**: Warm orange (#ED8936), cream background (#FFFAF0), golden yellow (#F6AD55)
- **Visual Elements**: Rounded shapes, friendly characters, soft lighting, gentle gradients
- **Best For**: Personal growth, lifestyle, education, human interest stories, wellness topics

Full style specifications in `references/styles/warm.md`

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
2. Use **warm** style (default and only style)
3. **Language detection**:
   - Detect **source language** from article content
   - Detect **user language** from conversation context
   - Note if source_language ≠ user_language (will ask in Step 4)
4. Extract key information:
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
**Style**: warm
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

**Purpose**: Let user confirm illustration plan before image generation.

**IMPORTANT**: No style selection needed - warm style is used by default.

1. **Language handling**:
   - If source language = user language: Just inform user (e.g., "Prompts will be in Chinese")
   - If different: Ask which language to use for prompts

2. **Present confirmation**:
   - Show illustration plan
   - Confirm language preference (if different)
   - Proceed only after explicit user confirmation

### Step 5: Create Prompt Files

Save prompts to `prompts/` directory with style-specific details.

**All prompts are written in the user's confirmed language preference.**

**Prompt Format**:

```markdown
Illustration theme: [concept in 2-3 words]
Style: warm

Visual composition:
- Main visual: [description matching warm style - friendly, approachable, human-centered]
- Layout: [element positioning]
- Decorative elements: [soft lighting, rounded shapes, gentle gradients]

Color scheme:
- Primary: Warm Orange (#ED8936)
- Background: Cream (#FFFAF0)
- Secondary: Golden Yellow (#F6AD55)
- Accent: Deep Brown (#744210)

Text content (if any):
- [Any labels or captions in content language]

Style notes: Soft, friendly, inviting colors; rounded shapes; human-centered elements; evoke comfort and connection
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
| `references/styles/warm.md` | Warm style specifications with colors, elements, rules |

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

风格说明：
- 所有插图使用 **warm 风格**（温暖、友好、人性化）
- 色彩：暖橙色 (#ED8936)、奶油色背景 (#FFFAF0)、金黄色 (#F6AD55)
- 特点：柔和的形状、友好的角色、温暖的光线、柔和的渐变

下一步建议：
1. 查看生成的插图
2. 如需调整，可以修改提示词重新生成
3. 完成！
```已生成：插图（已插入到文章中）

如需其他服务：
- "发布到公众号" → 调用 awkn-post-to-wechat
```

**引导原则**：
- 完成当前任务后，主动提示下一步选项
- 根据使用场景灵活引导（完整流程或单一服务）
- 保持友好的语气，不强迫用户继续
