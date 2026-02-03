#!/usr/bin/env bun
/**
 * Markdown 转 微信 HTML
 * 优化公众号图文排版样式
 */

import { marked } from 'marked';

/**
 * 转换 Markdown 为微信 HTML
 */
export function markdownToWechatHtml(markdown: string, theme: 'default' | 'grace' | 'simple' = 'default'): string {
  const renderer = new marked.Renderer();

  // 自定义渲染器 - 标题
  renderer.heading = (text: string, level: number) => {
    const sizes = ['32px', '28px', '24px', '20px', '18px', '16px'];
    const size = sizes[Math.min(level - 1, 5)];
    const margin = level === 1 ? 'margin-top: 40px; margin-bottom: 20px;' : 'margin-top: 30px; margin-bottom: 15px;';
    return `<h${level} style="font-size: ${size}; font-weight: bold; color: #333333; ${margin} line-height: 1.4;">${text}</h${level}>`;
  };

  // 自定义渲染器 - 段落
  renderer.paragraph = (text: string) => {
    return `<p style="font-size: 16px; line-height: 1.75; color: #333333; margin: 20px 0; text-align: justify; letter-spacing: 0.5px;">${text}</p>`;
  };

  // 自定义渲染器 - 图片
  renderer.image = (href: string, title: string | null, text: string) => {
    return `<img src="${href}" alt="${text || ''}" style="max-width: 100%; margin: 20px 0; border-radius: 4px;" />`;
  };

  // 自定义渲染器 - 列表
  renderer.list = (body: string, ordered: boolean) => {
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag} style="padding-left: 20px; margin: 20px 0; color: #333333;">${body}</${tag}>`;
  };

  // 自定义渲染器 - 列表项
  renderer.listitem = (text: string) => {
    return `<li style="font-size: 16px; line-height: 1.75; color: #333333; margin: 10px 0; padding-left: 5px;">${text}</li>`;
  };

  // 自定义渲染器 - 粗体
  renderer.strong = (text: string) => {
    return `<strong style="font-weight: bold; color: #333333;">${text}</strong>`;
  };

  // 自定义渲染器 - 斜体
  renderer.em = (text: string) => {
    return `<em style="font-style: italic; color: #666666;">${text}</em>`;
  };

  // 自定义渲染器 - 引用
  renderer.blockquote = (quote: string) => {
    return `<blockquote style="border-left: 4px solid #FF6B6B; padding: 15px 20px; margin: 20px 0; background-color: #F8F8F8; color: #666666; font-size: 15px; line-height: 1.75;">${quote}</blockquote>`;
  };

  // 自定义渲染器 - 代码块
  renderer.code = (code: string, language: string | undefined) => {
    return `<pre style="background-color: #F8F8F8; padding: 15px; border-radius: 4px; margin: 20px 0; overflow-x: auto;"><code style="font-size: 14px; line-height: 1.6; color: #333333; font-family: 'Courier New', monospace;">${code}</code></pre>`;
  };

  // 自定义渲染器 - 行内代码
  renderer.codespan = (code: string) => {
    return `<code style="background-color: #F8F8F8; padding: 2px 6px; border-radius: 3px; font-size: 14px; color: #FF6B6B; font-family: 'Courier New', monospace;">${code}</code>`;
  };

  // 自定义渲染器 - 链接
  renderer.link = (href: string, title: string | null, text: string) => {
    return `<a href="${href}" style="color: #576B95; text-decoration: underline;">${text}</a>`;
  };

  // 自定义渲染器 - 水平线
  renderer.hr = () => {
    return `<hr style="border: none; border-top: 1px solid #E0E0E0; margin: 30px 0;" />`;
  };

  // 处理图片占位符
  const processedMarkdown = markdown.replace(
    /\[\[IMAGE_PLACEHOLDER_(\d+)\]\]/g,
    '<span style="background: #F0F0F0; padding: 10px 20px; border-radius: 4px; color: #999999; font-size: 14px;">图片占位符 $1</span>'
  );

  return marked(processedMarkdown, { renderer }) as string;
}

/**
 * 提取标题
 */
export function extractTitle(markdown: string): string | null {
  // 提取 frontmatter
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const titleMatch = frontmatterMatch[1].match(/title:\s*(.+)/);
    if (titleMatch) {
      return titleMatch[1].trim();
    }
  }

  // 回退到 H1
  const h1Match = markdown.match(/^#\s+(.+)/m);
  if (h1Match) {
    return h1Match[1].trim();
  }

  return null;
}

/**
 * 压缩文本
 */
export function compressText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}
