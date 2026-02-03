import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromFile, cleanupTempFiles } from '@/lib/fileProcessor';
import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5分钟，chunked处理需要更多时间

const logToStderr = (message: string) => {
  process.stderr.write(`[process-chunked] ${message}\n`);
};

// 配置PDF.js Worker
const workerSrc = '/node_modules/.pnpm/pdfjs-dist@4.0.379/node_modules/pdfjs-dist/build/pdf.worker.min.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
pdfjsLib.GlobalWorkerOptions.workerPort = null;

// 智能摘要：提炼核心内容
async function summarizeChunk(content: string, chunkIndex: number, totalChunks: number): Promise<string> {
  const { LLMClient, Config } = await import('coze-coding-dev-sdk');
  const config = new Config({
    baseUrl: process.env.NEXT_PUBLIC_COZE_API_BASE_URL || 'https://api.coze.com/open_api/v2',
  });
  const client = new LLMClient(config);

  const prompt = `请对以下内容进行智能摘要，提炼核心要点：

要求：
1. 提取3-5个核心观点或关键论据
2. 保留重要概念、术语、数据
3. 省略冗余的例子和解释
4. 输出简洁明了，控制在500-800字
5. 保持原文的逻辑结构

【第${chunkIndex}/${totalChunks}部分内容】
${content}

【请输出摘要】`;

  const messages = [
    {
      role: 'user' as const,
      content: prompt,
    },
  ];

  try {
    const response = await Promise.race([
      client.invoke(messages, {
        model: 'doubao-seed-1-8-251228',
        temperature: 0.3,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('摘要超时')), 30000)
      )
    ]) as any;

    logToStderr(`✅ 第${chunkIndex}部分摘要成功，长度: ${response.content?.length || 0}`);
    return response.content || '';
  } catch (error: any) {
    logToStderr(`⚠️ 第${chunkIndex}部分摘要失败: ${error.message}，使用原始内容`);
    // 摘要失败，返回截断的原始内容
    return content.substring(0, 3000);
  }
}

// 按页拆分PDF并提取文字
async function extractPDFByPages(buffer: Buffer): Promise<Array<{ pageNumber: number; content: string }>> {
  const uint8Array = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data: uint8Array, useWorkerFetch: false, isEvalSupported: false });
  const pdfDocument = await loadingTask.promise;
  const numPages = pdfDocument.numPages;

  logToStderr(`📄 PDF总页数: ${numPages}`);

  const results: Array<{ pageNumber: number; content: string }> = [];

  // 每N页合并为一个chunk（避免chunk太多）
  const PAGES_PER_CHUNK = 5;

  for (let i = 1; i <= numPages; i++) {
    try {
      const page = await pdfDocument.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ').trim();

      if (pageText.length > 0) {
        results.push({
          pageNumber: i,
          content: pageText,
        });
      }

      // 进度日志
      if (i % 10 === 0) {
        logToStderr(`📖 已提取 ${i}/${numPages} 页，累计有效页数: ${results.length}`);
      }
    } catch (pageError) {
      logToStderr(`⚠️ 第${i}页提取失败: ${pageError}`);
    }
  }

  logToStderr(`✅ PDF提取完成，有效页数: ${results.length}/${numPages}`);

  // 按页数合并chunks
  const chunks: Array<{ pageNumber: number; content: string }> = [];
  for (let i = 0; i < results.length; i += PAGES_PER_CHUNK) {
    const chunkPages = results.slice(i, i + PAGES_PER_CHUNK);
    const combinedContent = chunkPages.map(p => p.content).join('\n\n---\n\n');
    chunks.push({
      pageNumber: chunkPages[0].pageNumber,
      content: combinedContent,
    });
  }

  logToStderr(`📦 合并为 ${chunks.length} 个chunks，每chunk约 ${PAGES_PER_CHUNK} 页`);
  return chunks;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileId, fileName, mimeType } = body;

    if (!fileId) {
      return NextResponse.json(
        { success: false, error: '缺少fileId参数' },
        { status: 400 }
      );
    }

    logToStderr(`🚀 开始chunked处理: ${fileId}, 文件名: ${fileName || '未知'}`);

    // 读取合并后的文件
    const filePath = path.join(process.cwd(), 'temp', 'uploads', `${fileId}${fileName ? path.extname(fileName) : ''}`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, error: '文件不存在，请先上传并合并' },
        { status: 404 }
      );
    }

    const buffer = fs.readFileSync(filePath);
    logToStderr(`📁 文件大小: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);

    // 提取文字
    let chunks: Array<{ pageNumber: number; content: string }>;

    if (mimeType === 'application/pdf') {
      chunks = await extractPDFByPages(buffer);
    } else {
      // 非PDF文件，直接整体提取
      const content = await extractTextFromFile(buffer, mimeType, filePath);
      chunks = [{ pageNumber: 1, content }];
    }

    if (chunks.length === 0) {
      throw new Error('未提取到任何文字内容，可能是扫描型PDF或空文件');
    }

    logToStderr(`📊 准备处理 ${chunks.length} 个chunks`);

    // 并行摘要（控制并发数，避免API限流）
    const MAX_CONCURRENT = 3;
    const summaries: string[] = [];

    for (let i = 0; i < chunks.length; i += MAX_CONCURRENT) {
      const batch = chunks.slice(i, i + MAX_CONCURRENT);
      logToStderr(`🔄 处理批次 ${Math.floor(i / MAX_CONCURRENT) + 1}/${Math.ceil(chunks.length / MAX_CONCURRENT)}`);

      const batchResults = await Promise.all(
        batch.map((chunk, index) =>
          summarizeChunk(chunk.content, i + index + 1, chunks.length)
        )
      );

      summaries.push(...batchResults);
    }

    // 组合所有摘要
    const combinedSummary = summaries.join('\n\n---\n\n');
    logToStderr(`📝 组合摘要完成，总长度: ${combinedSummary.length} 字符`);

    // 清理文件
    try {
      fs.unlinkSync(filePath);
      logToStderr(`🗑️ 已删除文件: ${filePath}`);
    } catch (e) {
      logToStderr(`⚠️ 删除文件失败: ${filePath}`);
    }

    cleanupTempFiles();

    return NextResponse.json(
      {
        success: true,
        message: 'chunked处理成功',
        data: {
          chunkCount: chunks.length,
          summaryLength: combinedSummary.length,
          summary: combinedSummary,
        },
      },
      { status: 200 }
    );

  } catch (error: any) {
    logToStderr(`❌ 全局错误: ${error.message}`);
    logToStderr(`错误堆栈: ${error.stack || '无堆栈信息'}`);

    return NextResponse.json(
      {
        success: false,
        error: `处理失败：${error.message || '未知错误'}`,
      },
      { status: 500 }
    );
  }
}
