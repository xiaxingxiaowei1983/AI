import { NextRequest, NextResponse } from 'next/server';
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { LLMClient, Config } from 'coze-coding-dev-sdk';
import { splitPDF, extractTextWithOCR, extractCoreContent, generateOCRScript } from '@/lib/ocr-utils';

// 设置最大请求处理时间为 5 分钟（300秒），以支持大文件OCR识别
export const maxDuration = 300;

// 主处理接口
export async function POST(request: NextRequest) {
  console.log('🚀 收到扫描版PDF处理请求');

  try {
    // 检查请求体大小（限制为160MB，包含FormData额外开销）
    const contentLength = request.headers.get('content-length');
    if (contentLength) {
      const sizeInBytes = parseInt(contentLength, 10);
      const sizeInMB = sizeInBytes / 1024 / 1024;
      console.log('📦 请求体大小:', sizeInMB.toFixed(2), 'MB');

      if (sizeInBytes > 160 * 1024 * 1024) {
        return NextResponse.json(
          { error: `文件太大（${sizeInMB.toFixed(2)}MB），请使用小于150MB的文件` },
          { status: 413, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
        );
      }
    }

    // 解析FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: '未找到文件' },
        { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    const fileName = file.name;
    const fileSize = file.size;

    console.log('📄 文件信息:', {
      name: fileName,
      size: fileSize,
      sizeMB: (fileSize / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type
    });

    // 验证文件类型
    if (!file.type.includes('pdf') && !fileName.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { error: '仅支持PDF文件' },
        { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    // 读取文件内容
    console.log('📥 读取文件内容...');
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log('✅ 文件读取完成，大小:', buffer.length, '字节');

    // 步骤1：将PDF分片（每片约6MB）
    console.log('📦 步骤1：开始分片PDF...');
    const pdfChunks = await splitPDF(buffer, 6);
    console.log(`✅ PDF分片完成，共 ${pdfChunks.length} 个分片`);

    // 步骤2：对每个分片进行OCR识别
    console.log('🔍 步骤2：开始OCR识别所有分片...');
    const ocrResults: string[] = [];

    for (let i = 0; i < pdfChunks.length; i++) {
      const chunk = pdfChunks[i];
      const chunkName = `分片 ${i + 1}/${pdfChunks.length}`;
      console.log(`\n${'='.repeat(50)}`);
      console.log(`🔍 处理 ${chunkName}...`);
      console.log(`${'='.repeat(50)}`);

      try {
        const ocrText = await extractTextWithOCR(chunk, chunkName);
        ocrResults.push(`\n\n========== ${chunkName} ==========\n\n${ocrText}`);
        console.log(`✅ ${chunkName} OCR识别完成，文字长度: ${ocrText.length}`);
      } catch (ocrError: any) {
        console.error(`❌ ${chunkName} OCR识别失败:`, ocrError.message);
        ocrResults.push(`\n\n========== ${chunkName} ==========\n\n识别失败: ${ocrError.message}`);
      }
    }

    // 合并所有OCR结果
    const fullText = ocrResults.join('\n\n');
    console.log(`\n${'='.repeat(50)}`);
    console.log(`✅ 所有分片OCR识别完成`);
    console.log(`📊 总文字长度: ${fullText.length}`);
    console.log(`📊 分片数量: ${pdfChunks.length}`);
    console.log(`${'='.repeat(50)}\n`);

    // 步骤3：智能提取核心内容
    let contentForScript = fullText;
    if (fullText.length > 40000) {
      console.log('📊 步骤3：文字内容过长，开始智能提取核心内容...');
      contentForScript = await extractCoreContent(fullText, 30000);
      console.log(`✅ 核心内容提取完成，长度: ${contentForScript.length}`);
    } else {
      console.log('📊 步骤3：文字长度适中，直接使用全文');
    }

    // 步骤4：生成最终脚本
    console.log('🎯 步骤4：开始生成认知脚本...');
    const script = await generateOCRScript(contentForScript);
    console.log('✅ 脚本生成成功');

    // 返回结果
    return NextResponse.json(
      {
        success: true,
        script: script,
        stats: {
          originalSize: fileSize,
          originalSizeMB: (fileSize / 1024 / 1024).toFixed(2),
          chunks: pdfChunks.length,
          ocrTotalLength: fullText.length,
          coreContentLength: contentForScript.length
        }
      },
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );

  } catch (error: any) {
    console.error('❌ 扫描版PDF处理失败:', error.message);
    console.error('❌ 错误堆栈:', error.stack);

    return NextResponse.json(
      {
        success: false,
        error: error.message || '处理失败',
        details: error.stack
      },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      }
    );
  }
}
