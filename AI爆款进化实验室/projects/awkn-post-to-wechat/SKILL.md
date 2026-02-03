---
name: awkn-post-to-wechat
description: 微信公众号一键发布 - 支持图文和文章两种方式，自动填写内容、上传图片、保存草稿或直接发布。使用Chrome CDP自动化，无需手动操作。
---

# 微信公众号一键发布

使用Chrome CDP自动化将内容发布到微信公众号，支持图文和文章两种发布方式。

## 使用方式

### 图文发布（图文）- 多张图片+标题+内容

```bash
# 从Markdown文件和图片目录
npx -y bun ${SKILL_DIR}/scripts/wechat-browser.ts --markdown article.md --images ./images/

# 使用显式参数
npx -y bun ${SKILL_DIR}/scripts/wechat-browser.ts --title "标题" --content "内容" --image img1.png --image img2.png --submit
```

### 文章发布（文章）- 完整Markdown支持排版

```bash
# 发布Markdown文章
npx -y bun ${SKILL_DIR}/scripts/wechat-article.ts --markdown article.md --theme grace
```

> **注意**：`${SKILL_DIR}` 代表此技能的安装目录，执行时会被替换为实际路径

## 参数说明

### 图文发布参数

| 参数 | 说明 |
|------|------|
| `--markdown <path>` | Markdown文件（自动提取标题和内容） |
| `--images <dir>` | 图片目录（按文件名排序） |
| `--title <text>` | 标题（最多20字，自动压缩） |
| `--content <text>` | 内容（最多1000字，自动压缩） |
| `--image <path>` | 单张图片（可重复） |
| `--submit` | 保存为草稿（默认只预览） |

### 文章发布参数

| 参数 | 说明 |
|------|------|
| `--markdown <path>` | Markdown文件 |
| `--theme <name>` | 主题：default（默认）、grace、simple |
| `--title <text>` | 覆盖标题 |
| `--author <name>` | 作者名（默认：宝玉） |
| `--summary <text>` | 文章摘要 |
| `--html <path>` | 预渲染HTML文件 |

## 功能对比

| 功能 | 图文 | 文章 |
|------|------|------|
| 多图片 | ✓（最多9张）| ✓（内联图片） |
| Markdown支持 | 标题/内容提取 | 完整排版 |
| 自动标题压缩 | ✓（到20字符） | ✗ |
| 内容压缩 | ✓（到1000字符） | ✗ |
| 主题 | ✗ | ✓（default/grace/simple） |
| 复制到编辑器 | ✗ | ✓（支持富文本粘贴） |

## 图片处理

**图文发布**：
- 支持最多9张图片
- 按文件名排序上传
- 自动压缩标题（20字）和内容（1000字）

**文章发布**：
- 内联图片自动上传
- 图片占位符自动替换
- 支持富文本复制粘贴，保持格式
- 自动处理图片替换流程

## 核心功能

### 文章发布的"复制到编辑器"功能

该功能自动完成以下流程：

1. **内容提取**：从Markdown或HTML文件中提取内容
2. **临时预览**：在浏览器中打开HTML文件预览内容
3. **内容复制**：自动选择并复制格式化内容到系统剪贴板
4. **切换标签**：自动切换回公众号编辑器标签页
5. **内容粘贴**：使用系统快捷键粘贴到编辑器
6. **图片插入**：自动替换占位符并插入图片
7. **保存草稿**：自动保存为草稿

### 改进要点

- **兼容性增强**：支持macOS、Linux、Windows三种平台
- **容错机制**：多种粘贴方式回退，确保功能可靠性
- **时序优化**：增加等待时间，确保操作完成后再执行下一步
- **日志完善**：详细的执行日志，便于问题排查
- **图片处理**：更可靠的图片复制和插入流程

## 使用示例

### 示例1：发布图文
```bash
# 从Markdown和图片目录
npx -y bun ${SKILL_DIR}/scripts/wechat-browser.ts --markdown article.md --images ./images/

# 手动指定内容
npx -y bun ${SKILL_DIR}/scripts/wechat-browser.ts --title "标题" --content "内容" --image img1.png --submit
```

### 示例2：发布文章
```bash
# 基础发布
npx -y bun ${SKILL_DIR}/scripts/wechat-article.ts --markdown article.md

# 指定主题和作者
npx -y bun ${SKILL_DIR}/scripts/wechat-article.ts --markdown article.md --theme grace --author "作者名"
```

## 前置要求

- Google Chrome已安装
- `bun`运行时（通过`npx -y bun`）
- 首次运行：在打开的浏览器窗口中登录微信公众号
- 平台工具：
  - macOS：系统自带osascript
  - Linux：需要xdotool或ydotool
  - Windows：PowerShell

## 故障排除

### 复制到编辑器失败
- **macOS**：检查是否有权限执行osascript命令
- **Linux**：确保安装了xdotool或ydotool
  ```bash
  sudo apt-get install xdotool
  ```
- **Windows**：确保PowerShell可用
- **时序问题**：如果粘贴不完整，可能需要调整网络速度或增加等待时间

### 其他问题
- **未登录**：首次运行打开浏览器 - 扫码登录，会话会保存
- **找不到Chrome**：设置`WECHAT_BROWSER_CHROME_PATH`环境变量
- **发布失败**：检查网络连接和公众号权限
- **图片插入失败**：检查图片文件路径是否正确，确保占位符格式匹配

## 核心亮点

✨ **一键发布**：自动填写内容、上传图片、保存草稿或直接发布

✨ **两种方式**：支持图文（多图）和文章（完整Markdown）两种发布方式

✨ **自动压缩**：图文模式下自动压缩标题（20字）和内容（1000字）

✨ **图片上传**：支持多图上传和内联图片处理

✨ **主题支持**：文章发布支持default/grace/simple三种主题

✨ **会话保持**：首次登录后会话自动保存，无需重复扫码

✨ **富文本粘贴**：文章发布支持复制到编辑器功能，自动保持格式

✨ **跨平台支持**：兼容macOS、Linux、Windows三种操作系统

## 注意事项

- 首次使用需要扫码登录微信公众号
- 会话会自动保存，后续可直接使用
- 图文模式最多支持9张图片
- 文章模式支持完整的Markdown格式和排版
- "复制到编辑器"功能依赖于系统剪贴板，确保系统快捷键正常工作
- 在Linux上需要预先安装xdotool或ydotool
