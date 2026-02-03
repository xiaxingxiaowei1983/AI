#!/usr/bin/env bun
/**
 * 文章封面生成器
 * 
 * 功能：
 * 1. 参数解析
 * 2. 内容分析
 * 3. 自动风格推荐
 * 4. 生成封面概念
 * 5. 输出总结（图像由智能体生成）
 */

import { readFileSync } from 'fs';

interface Options {
  style?: string;      // 指定风格
  aspect?: string;     // 尺寸比例
  lang?: string;       // 语言
  noTitle?: boolean;   // 不包含标题
  input?: string;      // 直接输入内容
  file?: string;       // Markdown 文件
}

interface ContentAnalysis {
  mainTopic: string;      // 主主题
  coreMessage: string;     // 核心信息
  tone: string;           // 语气
  keywords: string[];      // 风格关键词
  sourceLanguage: string;   // 源语言
  userLanguage: string;     // 用户语言
  title?: string;          // 提取的标题
}

interface StyleRecommendation {
  style: string;
  confidence: number;
  reason: string;
}

// 20种风格
const STYLES = [
  'elegant', 'flat-doodle', 'blueprint', 'bold-editorial', 'chalkboard',
  'dark-atmospheric', 'editorial-infographic', 'fantasy-animation',
  'intuition-machine', 'minimal', 'nature', 'notion', 'pixel-art',
  'playful', 'retro', 'sketch-notes', 'vector-illustration',
  'vintage', 'warm', 'watercolor'
];

// 关键词到风格的映射
const KEYWORD_TO_STYLE: Record<string, string[]> = {
  // 技术/科技
  'API': ['blueprint', 'intuition-machine', 'minimal'],
  '代码': ['blueprint', 'intuition-machine'],
  '系统': ['blueprint', 'intuition-machine'],
  '算法': ['blueprint', 'intuition-machine', 'minimal'],
  '技术': ['blueprint', 'intuition-machine', 'minimal'],
  '科技': ['intuition-machine', 'blueprint', 'dark-atmospheric'],
  'AI': ['intuition-machine', 'blueprint'],
  '人工智能': ['intuition-machine', 'blueprint'],
  
  // 教育/培训
  '学习': ['chalkboard', 'sketch-notes', 'flat-doodle'],
  '课程': ['chalkboard', 'notion', 'sketch-notes'],
  '教学': ['chalkboard', 'flat-doodle'],
  '培训': ['chalkboard', 'sketch-notes'],
  '教育': ['chalkboard', 'sketch-notes', 'flat-doodle'],
  '知识': ['notion', 'sketch-notes', 'minimal'],
  
  // 商业/职场
  '商业': ['elegant', 'bold-editorial', 'vector-illustration'],
  '销售': ['bold-editorial', 'elegant'],
  '营销': ['bold-editorial', 'vector-illustration'],
  '管理': ['elegant', 'minimal', 'bold-editorial'],
  '职场': ['elegant', 'minimal', 'vector-illustration'],
  '创业': ['bold-editorial', 'elegant'],
  
  // 创意/艺术
  '创意': ['fantasy-animation', 'playful', 'watercolor'],
  '设计': ['vector-illustration', 'minimal', 'fantasy-animation'],
  '艺术': ['watercolor', 'fantasy-animation', 'vintage'],
  '美学': ['watercolor', 'elegant', 'minimal'],
  
  // 生活方式
  '生活': ['warm', 'nature', 'retro'],
  '健康': ['nature', 'warm'],
  '旅行': ['nature', 'warm', 'retro'],
  '美食': ['warm', 'playful'],
  
  // 数据/分析
  '数据': ['editorial-infographic', 'minimal', 'elegant'],
  '分析': ['editorial-infographic', 'minimal'],
  '报告': ['editorial-infographic', 'elegant', 'minimal'],
  '统计': ['editorial-infographic', 'minimal'],
  
  // 笔记/文档
  '笔记': ['notion', 'sketch-notes', 'minimal'],
  '文档': ['notion', 'minimal', 'blueprint'],
  '总结': ['sketch-notes', 'notion'],
  
  // 游戏/娱乐
  '游戏': ['pixel-art', 'playful', 'fantasy-animation'],
  '娱乐': ['playful', 'pixel-art'],
  '有趣': ['playful', 'flat-doodle'],
  '玩耍': ['playful', 'flat-doodle'],
  
  // 情感/文艺
  '情感': ['watercolor', 'warm', 'vintage'],
  '文艺': ['watercolor', 'vintage', 'elegant'],
  '诗歌': ['watercolor', 'vintage'],
  '故事': ['watercolor', 'playful', 'vintage']
};

// 尺寸比例
const ASPECT_RATIOS: Record<string, { width: number; height: number; description: string }> = {
  '2.35:1': { width: 2350, height: 1000, description: '电影感' },
  '16:9': { width: 1920, height: 1080, description: '宽屏' },
  '1:1': { width: 1080, height: 1080, description: '方形' }
};

/**
 * 解析命令行参数
 */
function parseArgs(args: string[]): Options {
  const options: Options = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--style' && i + 1 < args.length) {
      options.style = args[++i];
    } else if (arg === '--aspect' && i + 1 < args.length) {
      options.aspect = args[++i];
    } else if (arg === '--lang' && i + 1 < args.length) {
      options.lang = args[++i];
    } else if (arg === '--no-title') {
      options.noTitle = true;
    } else if (arg === '--input' && i + 1 < args.length) {
      options.input = args[++i];
    } else if (!arg.startsWith('--')) {
      options.file = arg;
    }
  }
  
  return options;
}

/**
 * 分析内容
 */
function analyzeContent(content: string): ContentAnalysis {
  const lines = content.split('\n').filter(line => line.trim());
  
  // 提取标题（第一行或 # 标题）
  let title = '';
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine.startsWith('#')) {
      title = firstLine.replace(/^#+\s*/, '').trim();
    } else {
      title = firstLine.substring(0, 50); // 前50字符
    }
  }
  
  // 提取关键词
  const keywords: string[] = [];
  for (const [keyword, styles] of Object.entries(KEYWORD_TO_STYLE)) {
    if (content.includes(keyword)) {
      keywords.push(keyword);
    }
  }
  
  // 检测语言
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const sourceLanguage = chineseChars > content.length / 2 ? 'zh' : 'en';
  
  return {
    mainTopic: title || '未知主题',
    coreMessage: content.substring(0, 200),
    tone: content.includes('！') ? 'exciting' : 'neutral',
    keywords: keywords.slice(0, 5), // 最多5个关键词
    sourceLanguage,
    userLanguage: sourceLanguage,
    title
  };
}

/**
 * 推荐风格
 */
function recommendStyles(analysis: ContentAnalysis): StyleRecommendation[] {
  const styleScores: Record<string, number> = {};
  
  // 初始化所有风格得分为0
  for (const style of STYLES) {
    styleScores[style] = 0;
  }
  
  // 根据关键词加权
  for (const keyword of analysis.keywords) {
    const styles = KEYWORD_TO_STYLE[keyword] || [];
    for (const style of styles) {
      styleScores[style] += 10;
    }
  }
  
  // 排序并取前3个
  const sorted = Object.entries(styleScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([style, score]) => ({
      style,
      confidence: Math.min(score / 30, 1), // 归一化到0-1
      reason: `基于关键词: ${analysis.keywords.join(', ')}`
    }));
  
  return sorted;
}

/**
 * 生成封面概念
 */
function generateCoverConcept(
  analysis: ContentAnalysis,
  style: string,
  aspect: string,
  noTitle: boolean
): string {
  const aspectInfo = ASPECT_RATIOS[aspect] || ASPECT_RATIOS['2.35:1'];
  const title = !noTitle && analysis.title ? analysis.title.substring(0, 8) : '';
  
  return `
# 封面概念

**风格**: ${style}
**尺寸**: ${aspect} (${aspectInfo.width}x${aspectInfo.height})
**标题**: ${title || '无（纯视觉）'}
**语言**: ${analysis.userLanguage === 'zh' ? '中文' : '英文'}

## 视觉描述

使用${style}风格，为"${analysis.mainTopic}"创建一个${aspectInfo.description}封面图。

**核心元素**：
- 主色调：基于${style}风格的配色方案
- 主要图形：反映"${analysis.coreMessage.substring(0, 50)}..."的视觉元素
- 布局：${aspectInfo.description}比例，${noTitle ? '纯视觉，无文字' : '包含标题文字'}

**标题文字**${title ? `（"${title}"）` : '（无）'}：
- 位置：居中或根据风格调整
- 字体：符合${style}风格的字体
- 大小：适中，不遮挡视觉元素

**氛围**：
- ${analysis.tone === 'exciting' ? '充满活力、引人注目' : '专业、简洁'}
- 手绘风格，比AI生成的真实图更有温度
- 适合${analysis.userLanguage === 'zh' ? '中文' : '英文'}内容

## 配色建议

参考${style}风格的配色方案，保持一致性和专业感。
`.trim();
}

/**
 * 输出总结
 */
function outputSummary(
  analysis: ContentAnalysis,
  style: string,
  aspect: string,
  noTitle: boolean,
  concept: string
) {
  const aspectInfo = ASPECT_RATIOS[aspect] || ASPECT_RATIOS['2.35:1'];
  const title = !noTitle && analysis.title ? analysis.title.substring(0, 8) : '';
  
  console.log('\n【封面生成完成】\n');
  console.log(`风格：${style}`);
  console.log(`尺寸：${aspect} (${aspectInfo.width}x${aspectInfo.height})`);
  console.log(`标题：${title || '无（纯视觉）'}`);
  console.log(`语言：${analysis.userLanguage === 'zh' ? '中文' : '英文'}`);
  console.log('\n封面概念已生成，请参考以下描述生成封面图：\n');
  console.log(concept);
  console.log('\n' + '='.repeat(60) + '\n');
}

async function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);
  
  // 读取内容
  let content = '';
  if (options.input) {
    content = options.input;
  } else if (options.file) {
    content = readFileSync(options.file, 'utf-8');
  } else {
    console.error('错误：请提供 --input 参数或 Markdown 文件路径');
    process.exit(1);
  }
  
  // 分析内容
  const analysis = analyzeContent(content);
  
  // 确定风格
  let style = options.style;
  if (!style) {
    const recommendations = recommendStyles(analysis);
    console.log('\n【自动风格推荐】\n');
    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec.style} (置信度: ${(rec.confidence * 100).toFixed(0)}%)`);
      console.log(`   原因: ${rec.reason}`);
    });
    style = recommendations[0]?.style || 'minimal';
    console.log(`\n已选择：${style}\n`);
  } else if (!STYLES.includes(style)) {
    console.error(`错误：不支持的风格 "${style}"`);
    console.error(`支持的风格：${STYLES.join(', ')}`);
    process.exit(1);
  }
  
  // 确定尺寸
  const aspect = options.aspect || '2.35:1';
  if (!ASPECT_RATIOS[aspect]) {
    console.error(`错误：不支持的尺寸比例 "${aspect}"`);
    console.error(`支持的比例：${Object.keys(ASPECT_RATIOS).join(', ')}`);
    process.exit(1);
  }
  
  // 生成封面概念
  const concept = generateCoverConcept(analysis, style, aspect, options.noTitle || false);
  
  // 输出总结
  outputSummary(analysis, style, aspect, options.noTitle || false, concept);
}

main().catch(console.error);
