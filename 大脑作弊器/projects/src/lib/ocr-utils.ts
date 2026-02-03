// OCR处理工具函数
import fs from 'fs';
import path from 'path';

// 设置最大请求处理时间为 5 分钟（300秒），以支持大文件OCR识别

// 确保临时目录存在
const TEMP_BASE_DIR = path.join(process.cwd(), 'temp');
const CHUNKS_DIR = path.join(TEMP_BASE_DIR, 'chunks');
const UPLOADS_DIR = path.join(TEMP_BASE_DIR, 'uploads');

function ensureDirectories() {
  [TEMP_BASE_DIR, CHUNKS_DIR, UPLOADS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true, mode: 0o777 });
    }
  });
}

// 辅助函数：将Buffer保存到临时文件
export function saveBufferToTemp(buffer: Buffer, fileId: string, fileName: string): string {
  ensureDirectories();
  const outputPath = path.join(UPLOADS_DIR, `${fileId}${fileName ? path.extname(fileName) : '.pdf'}`);
  fs.writeFileSync(outputPath, buffer);
  console.log(`💾 文件已保存到临时目录: ${outputPath}, 大小: ${buffer.length} 字节`);
  return outputPath;
}

// 辅助函数：清理临时文件
export function cleanupTempFile(filePath: string) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ 清理临时文件: ${filePath}`);
    }
  } catch (e) {
    console.warn('⚠️ 清理临时文件失败:', e);
  }
}

// 辅助函数：使用PDF-lib分割PDF文件
export async function splitPDF(buffer: Buffer, chunkSizeMB: number = 6): Promise<Buffer[]> {
  console.log(`🔄 开始分割PDF，分片大小: ${chunkSizeMB}MB`);

  const { PDFDocument } = await import('pdf-lib');
  const pdfDoc = await PDFDocument.load(buffer);
  const pageCount = pdfDoc.getPageCount();
  const totalSize = buffer.length;
  const chunkSizeBytes = chunkSizeMB * 1024 * 1024;

  console.log(`📄 PDF总页数: ${pageCount}, 总大小: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);

  // 计算每个分片的页数（根据大小估算）
  const avgPageSize = totalSize / pageCount;
  const pagesPerChunk = Math.floor(chunkSizeBytes / avgPageSize);
  const chunks: Buffer[] = [];

  // 分片处理
  let currentPage = 0;
  let chunkIndex = 0;

  while (currentPage < pageCount) {
    const endPage = Math.min(currentPage + pagesPerChunk, pageCount);
    const pagesToInclude = Array.from(
      { length: endPage - currentPage },
      (_, i) => currentPage + i
    );

    console.log(`📦 创建分片 ${chunkIndex + 1}: 页 ${currentPage + 1}-${endPage} (${pagesToInclude.length}页)`);

    try {
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdfDoc, pagesToInclude);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      chunks.push(Buffer.from(pdfBytes));

      console.log(`✅ 分片 ${chunkIndex + 1} 创建成功，大小: ${(pdfBytes.length / 1024 / 1024).toFixed(2)}MB`);

      currentPage = endPage;
      chunkIndex++;
    } catch (error: any) {
      console.error(`❌ 创建分片 ${chunkIndex + 1} 失败:`, error.message);
      throw new Error(`PDF分片失败: ${error.message}`);
    }
  }

  console.log(`✅ PDF分割完成，共生成 ${chunks.length} 个分片`);
  return chunks;
}

// 辅助函数：使用pdf2pic + LLM视觉模型进行PDF OCR识别
export async function extractTextWithOCR(pdfBuffer: Buffer, chunkName: string): Promise<string> {
  console.log(`🔄 开始OCR识别: ${chunkName}`);

  const tempTimestamp = Date.now();
  const tempRandom = Math.floor(Math.random() * 10000);
  const tempPath = `/tmp/temp-ocr-${tempTimestamp}-${tempRandom}.pdf`;

  try {
    // 验证PDF完整性
    console.log('🔍 验证PDF完整性...');
    const { PDFDocument } = await import('pdf-lib');
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pageCount = pdfDoc.getPageCount();
    console.log(`✅ PDF验证通过，页数: ${pageCount}`);

    // 保存到临时文件
    fs.writeFileSync(tempPath, pdfBuffer);
    console.log(`💾 PDF已保存到临时文件: ${tempPath}`);

    // 使用pdf2pic转换为图片
    const { fromPath } = require('pdf2pic');
    const converter = fromPath(tempPath, {
      density: 150,
      quality: 90,
      format: 'jpeg',
      width: 2000,
      height: 2000,
      savePath: '/tmp',
      saveFilename: `ocr-${tempTimestamp}-${tempRandom}`
    });

    // 限制每分片处理的页数（最多10页，避免超时）
    const maxPages = Math.min(pageCount, 10);
    console.log(`🔄 将处理前 ${maxPages} 页`);

    const { LLMClient, Config } = await import('coze-coding-dev-sdk');
    const config = new Config();
    const client = new LLMClient(config);
    const ocrResults: string[] = [];

    for (let i = 1; i <= maxPages; i++) {
      try {
        console.log(`🖼️ 转换第 ${i}/${maxPages} 页为图片...`);

        const result = await converter(i);
        if (!result?.name) {
          throw new Error(`PDF第${i}页转换失败`);
        }

        const imagePath = `/tmp/${result.name}`;
        console.log(`📁 读取图片文件: ${imagePath}`);

        try {
          const imageBuffer = fs.readFileSync(imagePath);
          const base64Data = imageBuffer.toString('base64');

          console.log(`✅ 第 ${i} 页转换成功，图片大小: ${base64Data.length}`);

          // 使用LLM视觉模型识别文字
          const messages = [
            {
              role: 'user' as const,
              content: [
                {
                  type: 'text' as const,
                  text: '请识别这张图片中的所有文字内容，包括标题、正文、页眉、页脚等所有可见文字。请完整、准确地提取出来，保持原有的格式和结构。'
                },
                {
                  type: 'image_url' as const,
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Data}`,
                    detail: 'high' as const,
                  },
                },
              ],
            },
          ];

          console.log(`🔍 正在识别第 ${i} 页文字...`);

          const response = await Promise.race([
            client.invoke(messages, {
              model: 'doubao-seed-1-6-vision-250815',
              temperature: 0.3,
            }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('OCR识别超时')), 25000)
            )
          ]) as any;

          const pageText = response?.content ||
                          response?.choices?.[0]?.message?.content ||
                          response?.message?.content ||
                          '';

          ocrResults.push(`【第 ${i} 页】\n${pageText}`);

          console.log(`✅ 第 ${i} 页识别完成，文字长度: ${pageText.length}`);

          // 清理临时图片文件
          try {
            fs.unlinkSync(imagePath);
          } catch (e) {
            console.warn('⚠️ 清理临时图片文件失败:', e);
          }
        } catch (readError: any) {
          console.error(`❌ 读取或识别第 ${i} 页失败:`, readError.message);
          ocrResults.push(`【第 ${i} 页】\n识别失败: ${readError.message}`);
        }
      } catch (convertError: any) {
        console.error(`❌ 转换第 ${i} 页失败:`, convertError.message);
        ocrResults.push(`【第 ${i} 页】\n转换失败: ${convertError.message}`);
      }
    }

    // 合并所有页面的识别结果
    const fullText = ocrResults.join('\n\n');
    console.log(`✅ OCR识别完成，总文字长度: ${fullText.length}`);

    return fullText;
  } catch (error: any) {
    console.error('❌ OCR识别失败:', error.message);
    throw new Error(`OCR识别失败: ${error.message}`);
  } finally {
    // 清理临时PDF文件
    try {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    } catch (e) {
      console.warn('⚠️ 清理临时PDF文件失败:', e);
    }
  }
}

// 辅助函数：智能提取核心内容
export async function extractCoreContent(fullText: string, targetLength: number = 30000): Promise<string> {
  console.log('🔄 开始提取核心内容，目标长度:', targetLength);

  const { LLMClient, Config } = await import('coze-coding-dev-sdk');
  const config = new Config();
  const client = new LLMClient(config);

  const messages = [
    {
      role: 'system' as const,
      content: `你是一位专业的文本摘要专家，擅长从大量文本中提取核心精华。

你的任务是将用户提供的文本，提取为精简但完整的核心内容。

要求：
1. 保留原文的核心观点、关键信息、重要细节
2. 保持逻辑连贯，段落清晰
3. 保留原文的结构和层次
4. 目标字数：${targetLength}字左右（可根据内容质量浮动）
5. 语言准确、流畅，不要编造内容
6. 使用原文的表达方式和术语

输出格式：直接输出摘要文本，不要添加任何其他说明或标题。`
    },
    {
      role: 'user' as const,
      content: `请帮我提取以下文本的核心内容，目标字数约${targetLength}字：

${fullText}`
    }
  ];

  try {
    console.log('🔄 开始提取核心内容...');
    const response = await Promise.race([
      client.invoke(messages, {
        model: 'doubao-seed-1-8-251228',
        temperature: 0.5,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('核心内容提取超时')), 60000)
      )
    ]) as any;

    const summary = response?.content || '';
    console.log(`✅ 核心内容提取完成，长度: ${summary.length}`);
    return summary;
  } catch (error: any) {
    console.error('❌ 核心内容提取失败:', error.message);
    // 如果提取失败，返回截断的原文
    console.log('⚠️ 使用截断方式替代');
    const half = Math.floor(targetLength / 2);
    const head = fullText.substring(0, half);
    const tail = fullText.substring(Math.max(0, fullText.length - half));
    return `${head}\n\n... [内容已智能截断，原文共 ${fullText.length} 字] ...\n\n${tail}`;
  }
}

// 辅助函数：生成脚本
export async function generateOCRScript(content: string): Promise<any> {
  console.log('🔄 开始生成脚本，输入内容长度:', content.length);

  const { LLMClient, Config } = await import('coze-coding-dev-sdk');
  const config = new Config();
  const client = new LLMClient(config);

  const systemPrompt = `你是一位专业的认知提炼专家，擅长从海量信息中提取核心精华，生成可执行的实战脚本。

你的任务是将用户输入的内容，按照"名道法术器例"的六维结构，提炼成一份详细、深入的实战脚本。

## 输出结构要求：

### 1. **名**：核心概念
- **核心命题**：用一句话概括全文的核心观点
- **核心观点**：提炼3-5个核心观点（每个观点1-2句话）
- **核心价值**：说明这篇内容的价值所在（解决了什么问题，提供了什么方法）
- **适用场景**：分析适合的人群和使用场景
- 字数要求：300-800字

### 2. **道**：底层逻辑
- 揭示事物背后的根本规律和原理
- 说明为什么这样做（科学依据、理论基础）
- 解释核心概念的定义和内涵
- 分析其价值所在（解决了什么问题）
- 字数要求：200-500字

### 3. **法**：执行框架
- 提供系统化的行动方法论
- 分3-5个步骤详细说明每个步骤的逻辑
- 每个步骤包含：目标、原理、要点
- 形成完整的执行流程框架
- 字数要求：500-1000字

### 4. **术**：具体方法
- 给出3-5个可直接执行的操作步骤或技巧
- 每个方法包含：具体做法、注意事项、技巧要点
- 提供可量化的执行标准
- 说明如何避免常见错误
- 字数要求：1000-2000字

### 5. **器**：工具资源
- 推荐相关的工具、模板、书籍、网站等实用资源
- 每个资源说明：名称、用途、获取方式、使用技巧
- 分类整理：工具类、模板类、参考类、进阶类
- 字数要求：300-1200字

### 6. **例**：实战案例
- 提供2-3个具体的应用场景或成功案例
- 每个案例包含：场景背景、执行过程、使用方法、效果总结
- 说明如何在不同情境下应用
- 提供可复制的关键要点
- 字数要求：1500-2000字

## 输出格式要求：
- 直接输出JSON格式，包含以下字段：
  {
    "title": "简短标题（15-20字）",
    "名": { "核心命题": "", "核心观点": [], "核心价值": "", "适用场景": "" },
    "道": "",
    "法": "",
    "术": "",
    "器": "",
    "例": ""
  }

## 质量要求：
- 确保每个字段内容详细展开，不能只有简短概括
- 必须包含：底层逻辑、方法论、实践建议、案例说明
- 实践建议必须可执行，不能只是理论
- 案例说明要具体，有可参考性
- 语言详实有力，避免空洞表述
- 确保JSON格式正确，不要添加任何其他文字说明或标记
- 保持逻辑连贯，六部分内容相互呼应，形成完整的知识体系
- **特别注意**：所有文本内容必须正确转义，确保JSON格式合法

## 注意事项：
- 提炼要精准，抓住核心，深度展开
- 道要讲清楚"为什么"，法要说明"怎么做"，术要给出"具体步骤"
- 器要推荐真实可用的工具，例要给出可复制的案例
- 所有内容必须源自输入内容，不得编造`;

  const messages = [
    { role: 'system' as const, content: systemPrompt },
    { role: 'user' as const, content: `请帮我提炼以下内容：\n\n${content}` },
  ];

  try {
    const response = await Promise.race([
      client.invoke(messages, {
        model: 'doubao-seed-1-8-251228',
        temperature: 0.7,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('脚本生成超时')), 120000)
      )
    ]) as any;

    const content = response?.content || '';
    console.log('📝 AI返回内容长度:', content.length);

    // 尝试提取JSON（三层容错机制）
    let parsed = null;

    // 策略1：使用非贪婪正则提取第一个完整的JSON对象
    try {
      const jsonMatch = content.match(/\{[\s\S]*?\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
        console.log('✅ 脚本生成成功（策略1）');
        return parsed;
      }
    } catch (e: any) {
      console.warn('⚠️ 策略1失败:', e.message);
    }

    // 策略2：查找以 { 开头和 } 结尾的JSON
    try {
      const firstBrace = content.indexOf('{');
      const lastBrace = content.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const jsonStr = content.substring(firstBrace, lastBrace + 1);
        parsed = JSON.parse(jsonStr);
        console.log('✅ 脚本生成成功（策略2）');
        return parsed;
      }
    } catch (e: any) {
      console.warn('⚠️ 策略2失败:', e.message);
    }

    // 策略3：深度修复JSON格式问题
    try {
      // 步骤1：移除所有注释
      let cleanedContent = content.replace(/\/\*[\s\S]*?\*\//g, '');
      cleanedContent = cleanedContent.replace(/\/\/.*/g, '');

      // 步骤2：修复控制字符（将 \n \r \t 转换为 \\n \\r \\t）
      cleanedContent = cleanedContent.replace(/\\n/g, '\\\\n');
      cleanedContent = cleanedContent.replace(/\\r/g, '\\\\r');
      cleanedContent = cleanedContent.replace(/\\t/g, '\\\\t');

      // 步骤3：移除多余逗号（在 } 或 ] 之前的逗号）
      cleanedContent = cleanedContent.replace(/,(\s*[}\]])/g, '$1');

      // 步骤4：确保字符串内的双引号被转义
      // 这个比较复杂，需要逐个字段处理
      cleanedContent = cleanedContent.replace(/:\s*"([^"]*?)"/g, (match: string, p1: string) => {
        const escaped = p1.replace(/"/g, '\\"');
        return `: "${escaped}"`;
      });

      // 步骤5：提取JSON
      const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
        console.log('✅ 脚本生成成功（策略3）');
        return parsed;
      }
    } catch (e: any) {
      console.warn('⚠️ 策略3失败:', e.message);
      console.warn('⚠️ 失败的JSON内容:', content.substring(0, 500));
    }

    // 所有策略都失败，构建安全返回值（使用AI的原始内容，但确保格式正确）
    console.warn('⚠️ JSON解析失败，使用AI原始内容构建返回值');
    return {
      title: '认知脚本',
      名: {
        核心命题: content.substring(0, 100),
        核心观点: [content.substring(100, 200), content.substring(200, 300)],
        核心价值: content.substring(300, 400),
        适用场景: '学习与思考'
      },
      道: content.substring(400, 800),
      法: content.substring(800, 1200),
      术: content.substring(1200, 1600),
      器: content.substring(1600, 2000),
      例: content.substring(2000, 2400),
    };

  } catch (error: any) {
    console.error('❌ 脚本生成失败:', error.message);
    console.error('❌ 错误堆栈:', error.stack);
    throw new Error(`脚本生成失败: ${error.message}`);
  }
}
