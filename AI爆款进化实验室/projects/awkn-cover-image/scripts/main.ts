#!/usr/bin/env tsx
/**
 * Cover Image Generator - Main Script
 * Generate hand-drawn style cover images for articles
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types
interface Options {
  style?: string;
  aspect?: string;
  lang?: string;
  noTitle?: boolean;
  input?: string;
}

interface ContentAnalysis {
  mainTopic: string;
  coreMessage: string;
  tone: string;
  keywords: string[];
  sourceLanguage: string;
  userLanguage: string;
}

interface CoverConcept {
  title?: string;
  subtitle?: string;
  visualComposition: string;
  decorativeElements: string;
  colorScheme: {
    primary: string;
    background: string;
    accent: string;
  };
  styleNotes: string;
}

// Style mappings
const STYLES = [
  'elegant', 'flat-doodle', 'blueprint', 'bold-editorial', 'chalkboard',
  'dark-atmospheric', 'editorial-infographic', 'fantasy-animation',
  'intuition-machine', 'minimal', 'nature', 'notion', 'pixel-art',
  'playful', 'retro', 'sketch-notes', 'vector-illustration',
  'vintage', 'warm', 'watercolor'
] as const;

const ASPECT_RATIOS = {
  '2.35:1': { width: 2350, height: 1000, label: 'Cinematic' },
  '16:9': { width: 1920, height: 1080, label: 'Widescreen' },
  '1:1': { width: 1080, height: 1080, label: 'Square' }
} as const;

const DEFAULT_ASPECT = '2.35:1';
const DEFAULT_STYLE = 'elegant';

/**
 * Parse command line arguments
 */
function parseArgs(args: string[]): Options {
  const options: Options = {};
  let input: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--style=')) {
      options.style = arg.split('=')[1];
    } else if (arg.startsWith('--aspect=')) {
      options.aspect = arg.split('=')[1];
    } else if (arg.startsWith('--lang=')) {
      options.lang = arg.split('=')[1];
    } else if (arg === '--no-title') {
      options.noTitle = true;
    } else if (!arg.startsWith('--')) {
      input = arg;
    }
  }

  if (input) {
    options.input = input;
  }

  return options;
}

/**
 * Read and analyze content
 */
function analyzeContent(content: string): ContentAnalysis {
  const lines = content.split('\n');
  const firstLines = lines.slice(0, 20).join('\n');

  // Detect language
  const hasChinese = /[\u4e00-\u9fa5]/.test(content);
  const sourceLanguage = hasChinese ? 'zh' : 'en';
  const userLanguage = sourceLanguage; // Simplified for now

  // Extract topic (from first heading or first paragraph)
  let mainTopic = 'Untitled';
  const headingMatch = firstLines.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    mainTopic = headingMatch[1].trim();
  } else {
    const firstPara = lines.find(l => l.trim().length > 10);
    if (firstPara) {
      mainTopic = firstPara.trim().substring(0, 50);
    }
  }

  // Extract core message
  const coreMessage = firstLines.slice(0, 5).join(' ').substring(0, 200);

  // Detect tone
  const toneKeywords = {
    playful: ['fun', '有趣', '轻松', 'happy', '快乐'],
    professional: ['business', '专业', 'strategy', '策略', 'analysis', '分析'],
    educational: ['tutorial', '教程', 'guide', '指南', 'learn', '学习'],
    creative: ['creative', '创意', 'art', '艺术', 'design', '设计']
  };

  let tone = 'general';
  for (const [t, keywords] of Object.entries(toneKeywords)) {
    if (keywords.some(k => content.toLowerCase().includes(k.toLowerCase()))) {
      tone = t;
      break;
    }
  }

  // Extract keywords for style selection
  const styleKeywords: string[] = [];
  const styleSignals = {
    'blueprint': ['architecture', '架构', 'system', '系统', 'engineering', '工程'],
    'chalkboard': ['education', '教育', 'tutorial', '教程', 'classroom', '课堂'],
    'dark-atmospheric': ['cinema', '电影', 'entertainment', '娱乐'],
    'fantasy-animation': ['fantasy', '奇幻', 'magic', '魔法', 'story', '故事'],
    'minimal': ['simple', '简单', 'minimal', '极简', 'zen', '禅'],
    'nature': ['nature', '自然', 'organic', '有机', 'eco', '生态'],
    'notion': ['productivity', '生产力', 'saas', 'product', '产品'],
    'pixel-art': ['gaming', '游戏', 'retro', '复古', 'pixel', '像素'],
    'retro': ['vintage', '复古', '80s', '90s', 'nostalgia', '怀旧'],
    'warm': ['story', '故事', 'emotion', '情感', 'growth', '成长', 'life', '生活'],
    'watercolor': ['lifestyle', '生活方式', 'travel', '旅行', 'art', '艺术']
  };

  for (const [style, keywords] of Object.entries(styleSignals)) {
    if (keywords.some(k => content.toLowerCase().includes(k.toLowerCase()))) {
      styleKeywords.push(style);
    }
  }

  return {
    mainTopic,
    coreMessage,
    tone,
    keywords: styleKeywords,
    sourceLanguage,
    userLanguage
  };
}

/**
 * Generate slug from topic
 */
function generateSlug(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

/**
 * Auto-select style based on content analysis
 */
function selectStyles(analysis: ContentAnalysis): string[] {
  const recommended = analysis.keywords.slice(0, 3);

  if (recommended.length >= 3) {
    return recommended;
  }

  // Fallback recommendations
  const fallback = ['elegant', 'warm', 'playful'];
  return [...recommended, ...fallback.slice(0, 3 - recommended.length)];
}

/**
 * Create output directory
 */
function createOutputDir(slug: string): string {
  const baseDir = 'cover-image';
  const outputDir = path.join(baseDir, slug);

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  if (fs.existsSync(outputDir)) {
    const timestamp = new Date().toISOString()
      .replace(/[:.]/g, '')
      .slice(0, 14);
    const newDir = path.join(baseDir, `${slug}-${timestamp}`);
    fs.mkdirSync(newDir, { recursive: true });
    return newDir;
  }

  fs.mkdirSync(outputDir, { recursive: true });
  return outputDir;
}

/**
 * Generate cover concept
 */
function generateCoverConcept(
  analysis: ContentAnalysis,
  style: string,
  aspect: string,
  noTitle: boolean
): CoverConcept {
  // Read style definition
  const stylePath = path.join(__dirname, '../references/styles', `${style}.md`);
  let styleDef = '';

  if (fs.existsSync(stylePath)) {
    styleDef = fs.readFileSync(stylePath, 'utf-8');
  }

  // Extract color scheme from style definition
  const colorMatch = styleDef.match(/Primary:\s*([^#]+#[0-9A-Fa-f]+)/i);
  const bgMatch = styleDef.match(/Background:\s*([^#]+#[0-9A-Fa-f]+)/i);

  const colorScheme: CoverConcept['colorScheme'] = {
    primary: colorMatch ? colorMatch[1].split('#')[1]?.trim() || '#5B8A8A' : '#5B8A8A',
    background: bgMatch ? bgMatch[1].split('#')[1]?.trim() || '#F5F0E6' : '#F5F0E6',
    accent: '#C9A962'
  };

  // Generate title (max 8 chars)
  let title: string | undefined;
  if (!noTitle) {
    title = analysis.mainTopic.substring(0, 8);
  }

  return {
    title,
    visualComposition: `Central or slightly left composition representing ${analysis.mainTopic}`,
    decorativeElements: `Style-appropriate decorative elements matching ${style} style`,
    colorScheme,
    styleNotes: styleDef || `Hand-drawn ${style} style`
  };
}

/**
 * Generate prompt file
 */
function generatePromptFile(
  outputDir: string,
  analysis: ContentAnalysis,
  concept: CoverConcept,
  style: string,
  aspect: string
): void {
  const promptsDir = path.join(outputDir, 'prompts');
  if (!fs.existsSync(promptsDir)) {
    fs.mkdirSync(promptsDir, { recursive: true });
  }

  const promptPath = path.join(promptsDir, 'cover.md');
  const aspectRatio = ASPECT_RATIOS[aspect as keyof typeof ASPECT_RATIOS];

  const prompt = `Cover theme: ${analysis.mainTopic}
Style: ${style}
Aspect ratio: ${aspect}

${concept.title ? `Title text: ${concept.title} (max 8 characters, in ${analysis.userLanguage})` : ''}

Visual composition:
- Main visual: ${concept.visualComposition}
- Layout: ${concept.noTitle ? 'Visual-focused, no text area' : 'Title on right side, visual on left'}
- Decorative elements: ${concept.decorativeElements}

Color scheme:
- Primary: ${concept.colorScheme.primary}
- Background: ${concept.colorScheme.background}
- Accent: ${concept.colorScheme.accent}

Style notes: ${concept.styleNotes}

${!concept.title ? 'Note: No title text, pure visual illustration only.' : ''}
`;

  fs.writeFileSync(promptPath, prompt, 'utf-8');
}

/**
 * Save source content
 */
function saveSourceContent(outputDir: string, content: string, inputPath?: string): void {
  if (inputPath && fs.existsSync(inputPath)) {
    const ext = path.extname(inputPath);
    const filename = `source-${generateSlug(path.basename(inputPath, ext))}${ext}`;
    const destPath = path.join(outputDir, filename);
    fs.copyFileSync(inputPath, destPath);
  } else {
    fs.writeFileSync(path.join(outputDir, 'source.md'), content, 'utf-8');
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  // Read content
  let content: string;
  let inputPath: string | undefined;

  if (options.input && fs.existsSync(options.input)) {
    inputPath = options.input;
    content = fs.readFileSync(inputPath, 'utf-8');
  } else {
    // Read from stdin or use default
    if (process.stdin.isTTY) {
      console.error('Error: Please provide input content or file path');
      process.exit(1);
    }
    content = await new Promise(resolve => {
      let data = '';
      process.stdin.on('data', chunk => data += chunk);
      process.stdin.on('end', () => resolve(data));
    });
  }

  // Analyze content
  const analysis = analyzeContent(content);

  // Select style
  const style = options.style || DEFAULT_STYLE;
  const aspect = options.aspect || DEFAULT_ASPECT;
  const noTitle = options.noTitle || false;

  // Generate slug and output directory
  const slug = generateSlug(analysis.mainTopic);
  const outputDir = createOutputDir(slug);

  // Save source content
  saveSourceContent(outputDir, content, inputPath);

  // Generate cover concept
  const concept = generateCoverConcept(analysis, style, aspect, noTitle);

  // Generate prompt file
  generatePromptFile(outputDir, analysis, concept, style, aspect);

  // Output summary
  console.log('Cover Image Concept Generated!');
  console.log('');
  console.log('Topic:', analysis.mainTopic);
  console.log('Style:', style);
  console.log('Aspect:', aspect);
  console.log('Title:', concept.title || 'No title - visual only');
  console.log('Language:', analysis.userLanguage);
  console.log('');
  console.log('Location:', outputDir);
  console.log('');
  console.log('Prompt file: prompts/cover.md');
  console.log('');
  console.log('Next: Use image generation skill to generate the cover image.');
}

main().catch(console.error);
