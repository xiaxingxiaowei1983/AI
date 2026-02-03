import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { extractTextFromFile, generateScript, cleanupTempFiles, smartSummary } from '@/lib/fileProcessor';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5分钟，支持chunked处理

// 禁用可能污染响应的日志输出，改为输出到 stderr
const logToStderr = (message: string) => {
  process.stderr.write(`[merge-file] ${message}\n`);
};

// 确保临时目录存在
const TEMP_BASE_DIR = path.join(process.cwd(), 'temp');
const CHUNKS_DIR = path.join(TEMP_BASE_DIR, 'chunks');
const UPLOADS_DIR = path.join(TEMP_BASE_DIR, 'uploads');

// 初始化目录（确保存在且有正确权限）
function ensureDirectories() {
  [TEMP_BASE_DIR, CHUNKS_DIR, UPLOADS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true, mode: 0o777 });
      logToStderr(`创建目录: ${dir}`);
    }
  });
}

// 合并文件API
export async function POST(request: NextRequest) {
  try {
    // 确保目录存在
    ensureDirectories();

    const body = await request.json();
    const { fileId, fileName, mimeType, saveToHistory } = body;

    if (!fileId) {
      return NextResponse.json(
        { success: false, error: '缺少fileId参数' },
        { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    logToStderr(`开始合并文件: ${fileId}, 文件名: ${fileName || '未知'}, 类型: ${mimeType || '自动检测'}`);

    const tempDir = path.join(CHUNKS_DIR, fileId);
    const outputPath = path.join(UPLOADS_DIR, `${fileId}${fileName ? path.extname(fileName) : ''}`);

    // 检查临时目录是否存在
    if (!fs.existsSync(tempDir)) {
      return NextResponse.json(
        { success: false, error: '文件分片不存在' },
        { status: 404, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    // 获取所有分片
    const chunkFiles = fs.readdirSync(tempDir)
      .filter(f => f.startsWith('chunk-') && f.endsWith('.part'))
      .sort((a, b) => {
        const indexA = parseInt(a.match(/\d+/)?.[0] || '0');
        const indexB = parseInt(b.match(/\d+/)?.[0] || '0');
        return indexA - indexB;
      });

    if (chunkFiles.length === 0) {
      return NextResponse.json(
        { success: false, error: '没有找到任何分片' },
        { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    logToStderr(`找到 ${chunkFiles.length} 个分片，开始合并...`);

    // 确保输出目录存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 合并分片
    const writeStream = fs.createWriteStream(outputPath);

    for (const chunkFile of chunkFiles) {
      const chunkPath = path.join(tempDir, chunkFile);
      const chunkBuffer = fs.readFileSync(chunkPath);
      writeStream.write(chunkBuffer);
      logToStderr(`已合并分片: ${chunkFile}, 大小: ${chunkBuffer.length} 字节`);
    }

    writeStream.end();

    // 等待文件写入完成
    await new Promise<void>((resolve) => {
      writeStream.on('finish', () => resolve());
      writeStream.on('error', () => resolve());
    });

    logToStderr(`合并完成，文件路径: ${outputPath}`);

    // 验证合并后的文件大小
    const stats = fs.statSync(outputPath);
    logToStderr(`合并后文件大小: ${stats.size} 字节 (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

    // 读取合并后的文件
    const mergedFileBuffer = fs.readFileSync(outputPath);

    // 解析文件内容（使用try-catch隔离解析错误）
    logToStderr('开始解析合并后的文件...');
    let extractedContent = '';
    try {
      extractedContent = await extractTextFromFile(mergedFileBuffer, mimeType, outputPath);
      logToStderr(`解析完成，内容长度: ${extractedContent.length}`);
    } catch (parseError: any) {
      logToStderr(`解析失败但继续流程: ${parseError.message}`);

      // 检测是否是window is not defined错误
      if (parseError.message.includes('window is not defined')) {
        logToStderr('❌ 检测到window未定义错误：pptx-parser库依赖浏览器环境');
        // 返回友好的错误响应，但确保返回JSON
        return NextResponse.json(
          {
            success: false,
            error: '文件合并成功，但解析失败',
            rootCause: 'pptx-parser库依赖浏览器window对象，后端Node.js不完全支持',
            details: parseError.message,
            fileInfo: {
              fileId,
              fileName,
              size: stats.size,
              path: outputPath
            }
          },
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'X-Error-Cause': 'window-undefined'
            }
          }
        );
      }

      // 其他解析错误，继续流程但记录
      logToStderr(`⚠️ 解析错误（非window相关）: ${parseError.message}`);
      // 尝试使用备用解析方法或返回空内容
      extractedContent = `[解析失败: ${parseError.message}]\n\n[文件信息]\n文件名: ${fileName || '未知'}\n大小: ${(stats.size / 1024 / 1024).toFixed(2)} MB\n类型: ${mimeType || '自动检测'}`;
    }

    // 智能摘要：如果内容过长，进行分块摘要
    let contentForScript = extractedContent;
    if (extractedContent.length > 50000) {
      logToStderr(`📊 内容过长（${extractedContent.length}字符），启用智能摘要处理`);
      try {
        contentForScript = await smartSummary(extractedContent);
        logToStderr(`✅ 智能摘要完成，摘要长度: ${contentForScript.length} 字符`);
      } catch (summaryError: any) {
        logToStderr(`⚠️ 智能摘要失败: ${summaryError.message}，使用截断方式`);
        // 摘要失败，使用简单截断
        const MAX_LENGTH = 40000;
        const head = extractedContent.substring(0, 20000);
        const tail = extractedContent.substring(extractedContent.length - 20000);
        contentForScript = `${head}\n\n... [内容已截断，原文共 ${extractedContent.length} 字符] ...\n\n${tail}`;
      }
    }

    // 生成脚本（如果解析失败，使用备用内容）
    logToStderr('开始生成脚本...');
    let script;
    let scriptErrorMsg = null;
    try {
      script = await generateScript(contentForScript);
      logToStderr('脚本生成成功');
    } catch (generateError: any) {
      logToStderr(`脚本生成失败: ${generateError.message}`);
      scriptErrorMsg = generateError.message;

      // 检测是否是扫描型PDF或文本质量问题
      const isScannedPDF =
        scriptErrorMsg.includes('扫描型PDF') ||
        scriptErrorMsg.includes('中文占比过低') ||
        scriptErrorMsg.includes('英文/数字占比过高');

      // 检测是否是内容过长问题
      const isTooLong = scriptErrorMsg.includes('内容过长') || scriptErrorMsg.includes('tokens');

      // 构建针对性的错误提示
      let errorSolution = '';
      if (isScannedPDF) {
          errorSolution = `🔍 问题诊断：您上传的是扫描型PDF（纯图片），无法直接提取文字。

✅ 解决方案（推荐）：使用截图上传 + OCR识别
• 点击页面的"📸 截图上传"按钮
• 截取PDF的内容（一次可以上传最多9张截图）
• 系统会自动使用OCR识别文字并生成脚本

📝 其他方案：
1. 使用Adobe Acrobat、天若OCR、在线OCR等工具将扫描版PDF转换为文字版PDF
2. 将PDF转为图片后，使用截图上传功能
3. 检查文件是否加密，如果是加密PDF需要先解密`;
        } else if (isTooLong) {
          errorSolution = `🔍 问题诊断：文件内容过长，超过了AI处理能力。

✅ 解决方案：
• 已自动启用智能分块摘要，保留核心内容
• 如果摘要质量不理想，建议将文件拆分为多个小文件（每份不超过50MB）
• 优先提取关键章节和重点内容进行上传`;
        } else {
          errorSolution = `🔍 问题诊断：文件解析失败

可能原因：
1. 文件格式不支持（仅支持PDF、DOCX、XLSX、PPTX、图片）
2. 文件已加密或损坏
3. 网络或API服务异常

建议：
• 检查文件是否正常打开
• 尝试使用其他文件格式
• 如果是扫描型PDF，使用截图上传功能`;
        }

      // 提供一个空脚本结构，确保前端能正常渲染
      script = {
        "名": {
          "核心命题": "脚本生成失败",
          "核心观点": [
            "文件已成功合并",
            "但无法生成认知脚本",
            "请查看下方的解决建议"
          ],
          "核心价值": "文件已上传并合并，但内容分析失败",
          "适用场景": "无法确定适用场景，因为脚本生成失败"
        },
        "道": `⚠️ 脚本生成失败\n\n${scriptErrorMsg}\n\n${errorSolution}`,
        "法": "由于脚本生成失败，无法提供具体方法论",
        "术": "由于脚本生成失败，无法提供具体技巧",
        "器": "由于脚本生成失败，无法推荐工具资源",
        "例": "由于脚本生成失败，无法提供实战案例"
      };
    }

    // 清理分片目录
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
      logToStderr(`已删除分片目录: ${tempDir}`);
    } catch (e) {
      logToStderr(`删除分片目录失败: ${tempDir}`);
    }

    // 清理合并后的文件（已解析完成，不再需要）
    try {
      fs.unlinkSync(outputPath);
      logToStderr(`已删除合并文件: ${outputPath}`);
    } catch (e) {
      logToStderr(`删除合并文件失败: ${outputPath}`);
    }

    // 清理过期临时文件
    cleanupTempFiles();

    // 构建成功响应
    const responseData: any = {
      success: true,
      message: '文件处理成功',
      script: script
    };

    // 如果脚本生成失败，添加错误信息
    if (scriptErrorMsg) {
      responseData.message = '文件合并成功，但脚本生成失败';
      responseData.error = scriptErrorMsg;
      responseData.fileInfo = {
        fileId,
        fileName,
        size: stats.size,
        path: outputPath
      };

      // 检测是否是扫描型PDF，添加标记让前端自动调用OCR识别
      const isScannedPDF =
        scriptErrorMsg.includes('扫描型PDF') ||
        scriptErrorMsg.includes('中文占比过低') ||
        scriptErrorMsg.includes('英文/数字占比过高') ||
        scriptErrorMsg.includes('文件内容质量不达标');

      if (isScannedPDF && mimeType && mimeType.includes('pdf')) {
        responseData.isScannedPDF = true;
        responseData.ocrSuggestion = '检测到扫描型PDF，系统将自动切换到OCR识别模式';
        logToStderr('✅ 检测到扫描型PDF，已标记isScannedPDF=true');
      }
    }

    return NextResponse.json(
      responseData,
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          ...(scriptErrorMsg ? { 'X-Script-Error': 'true' } : {})
        }
      }
    );
  } catch (error: any) {
    // 兜底捕获所有异常，强制返回JSON
    logToStderr(`全局异常: ${error.message}`);
    logToStderr(`错误堆栈: ${error.stack || '无堆栈信息'}`);

    // 检测是否是window is not defined错误
    const isWindowError = error.message && error.message.includes('window is not defined');

    return NextResponse.json(
      {
        success: false,
        error: `合并失败：${error.message || '未知错误'}`,
        rootCause: isWindowError
          ? 'pptx-parser库依赖浏览器window对象，后端Node.js不完全支持'
          : '未知错误',
        stack: error.stack || '无堆栈信息',
        timestamp: new Date().toISOString()
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Error-Cause': isWindowError ? 'window-undefined' : 'other',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );
  }
}
