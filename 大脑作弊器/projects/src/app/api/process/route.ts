import { NextRequest, NextResponse } from 'next/server';
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { LLMClient, Config, SearchClient } from 'coze-coding-dev-sdk';
import { verifyToken } from "@/storage/database/auth";
import { scriptService } from "@/services/scriptService";

// 设置最大请求处理时间为 2 分钟（120秒），以支持大文件解析
export const maxDuration = 120;

// 辅助函数：提取文件文本（支持Buffer或base64字符串）
async function extractTextFromFile(
  fileData: Buffer | string,
  mimeType?: string
): Promise<string> {
  console.log('🔄 开始解析文件...');

  let buffer: Buffer;
  let base64Data: string | null = null;

  // 判断输入类型
  if (Buffer.isBuffer(fileData)) {
    // 直接传入Buffer（来自FormData）
    buffer = fileData;
    console.log('📥 接收到二进制Buffer，大小:', buffer.length, '字节');

    // 如果没有提供 MIME 类型，通过文件头识别
    if (!mimeType) {
      const header = buffer.subarray(0, 8).toString('hex');
      console.log('🔍 文件头（hex）:', header);

      if (header.startsWith('25504446')) {
        mimeType = 'application/pdf';
      } else if (header.startsWith('504b0304')) {
        mimeType = 'application/epub+zip';
      } else if (header.startsWith('ffd8ff')) {
        mimeType = 'image/jpeg';
      } else if (header.startsWith('89504e47')) {
        mimeType = 'image/png';
      } else if (header.startsWith('47494638')) {
        mimeType = 'image/gif';
      } else if (header.startsWith('52494646') && buffer.subarray(8, 12).toString() === 'WEBP') {
        mimeType = 'image/webp';
      }

      console.log('✅ 通过文件头识别的MIME类型:', mimeType);
    }
  } else if (typeof fileData === 'string') {
    // 传入base64字符串（来自JSON）
    base64Data = fileData;
    console.log('📥 base64数据前100字符:', base64Data.substring(0, 100));
    console.log('📥 传入的MIME类型:', mimeType);

    // 提取base64数据部分
    if (!base64Data.includes(',')) {
      console.error('❌ Base64数据格式错误：缺少分隔符');
      throw new Error('Base64数据格式错误：缺少分隔符');
    }

    const base64Content = base64Data.split(',')[1];
    if (!base64Content) {
      console.error('❌ Base64数据格式错误：内容为空');
      throw new Error('Base64数据格式错误：内容为空');
    }

    buffer = Buffer.from(base64Data, 'base64');
    console.log('Buffer大小:', buffer.length, '字节');

    // 如果没有传递 MIME 类型，尝试从 base64 前缀推断
    if (!mimeType) {
      const dataPrefix = base64Data.split(',')[0];
      mimeType = dataPrefix.match(/^data:(.*?);/)?.[1];
      console.log('🔍 从base64推断的MIME类型:', mimeType);
    }
  } else {
    throw new Error('不支持的文件数据类型');
  }

  // 如果仍然无法确定类型，尝试通过文件头（magic bytes）识别
  if (!mimeType || mimeType === 'application/octet-stream') {
    const header = buffer.subarray(0, 8).toString('hex');
    console.log('🔍 文件头（hex）:', header);

    if (header.startsWith('25504446')) {
      mimeType = 'application/pdf';
      console.log('✅ 通过文件头识别为PDF');
    } else if (header.startsWith('504b0304')) {
      mimeType = 'application/epub+zip';
      console.log('✅ 通过文件头识别为ZIP/EPUB');
    } else if (header.startsWith('ffd8ff')) {
      // JPEG 图片
      mimeType = 'image/jpeg';
      console.log('✅ 通过文件头识别为JPEG图片');
    } else if (header.startsWith('89504e47')) {
      // PNG 图片
      mimeType = 'image/png';
      console.log('✅ 通过文件头识别为PNG图片');
    } else if (header.startsWith('47494638')) {
      // GIF 图片
      mimeType = 'image/gif';
      console.log('✅ 通过文件头识别为GIF图片');
    } else if (header.startsWith('52494646') && buffer.subarray(8, 12).toString() === 'WEBP') {
      // WEBP 图片
      mimeType = 'image/webp';
      console.log('✅ 通过文件头识别为WEBP图片');
    } else {
      // 默认按文本处理
      mimeType = 'text/plain';
      console.log('⚠️ 无法识别文件类型，默认按文本处理');
    }
  }

  console.log('✅ 检测到的文件类型:', mimeType);

  // 检测是否为图片文件
  if (mimeType && mimeType.startsWith('image/')) {
    console.log('🖼️ 检测到图片文件:', mimeType);
    console.log('⏭️ 切换到图片识别模式...');
    throw new Error('IMAGE_FILE');
  }

  const fs = require('fs');

  try {
    // 处理 PDF 文件
    if (mimeType === 'application/pdf') {
      console.log('🔄 解析 PDF 文件...');

      // 步骤1：尝试用 pdf-parse 提取文本
      let extractedText = '';
      let isImagePDF = false;

      try {
        console.log('📖 开始使用 pdf-parse 解析...');
        const pdfParse = require('pdf-parse');
        const result = await pdfParse(buffer, {
          normalizeWhitespace: false,
          disableCombineTextItems: false,
          max: 0
        }) as any;

        console.log('✅ PDF 解析成功，文本长度:', result.text?.length || 0);
        console.log('📄 PDF 页数:', result.numpages);

        // 检查提取的文本是否足够
        if (!result.text || result.text.length < 100) {
          console.warn('⚠️ 提取的文本太少（< 100字符），可能是图片型PDF');

          // 验证PDF文件完整性，确认是否真的是图片型PDF
          try {
            const { PDFDocument } = await import('pdf-lib');
            await PDFDocument.load(buffer);
            console.log('✅ PDF文件验证通过，确认为图片型PDF');
            isImagePDF = true;
          } catch (validationError: any) {
            console.error('❌ PDF文件验证失败:', validationError.message);
            throw new Error('PDF文件已损坏或格式不正确，无法解析。请检查文件是否完整。');
          }
        } else {
          extractedText = result.text;
          console.log('📝 前100字符:', result.text?.substring(0, 100));
          console.log('📝 后100字符:', result.text?.substring(Math.max(0, result.text.length - 100)));

          // 注意：不再检测"可疑内容"，因为误报率太高
          // 正常的PDF文件可能包含技术术语、代码示例等，不应误判
          // 文件是否损坏应该通过头部校验和文件验证来判断，而不是内容判断
        }

      } catch (pdfError: any) {
        console.error('❌ PDF 解析失败:', pdfError.message);

        // 检查是否是文件本身的问题
        if (pdfError.message && (
          pdfError.message.includes('Invalid PDF structure') ||
          pdfError.message.includes('No PDF header found') ||
          pdfError.message.includes('EOF marker not found')
        )) {
          throw new Error('PDF文件已损坏或格式不正确，无法解析。请检查文件是否完整。');
        }

        console.error('❌ 可能是图片型PDF');
        isImagePDF = true;
      }

      // 步骤2：如果是图片型PDF，使用OCR
      if (isImagePDF) {
        console.log('🔄 检测到图片型PDF，启动OCR服务...');

        // 生成唯一的临时文件名（包含随机数避免冲突）
        const tempTimestamp = Date.now();
        const tempRandom = Math.floor(Math.random() * 10000);
        const tempPath = `/tmp/temp-pdf-${tempTimestamp}-${tempRandom}.pdf`;

        try {
          // 首先验证PDF文件完整性
          console.log('🔍 验证PDF文件完整性...');
          const { PDFDocument } = await import('pdf-lib');
          const pdfDoc = await PDFDocument.load(buffer);
          const pageCount = pdfDoc.getPageCount();
          console.log('✅ PDF文件验证通过，页数:', pageCount);

          // 清理旧的临时文件
          const fs = require('fs');
          try {
            const oldTempFiles = fs.readdirSync('/tmp').filter((f: string) => f.startsWith('temp-pdf-'));
            oldTempFiles.forEach((f: string) => {
              const filePath = `/tmp/${f}`;
              const stat = fs.statSync(filePath);
              // 删除超过10分钟的临时文件
              if (Date.now() - stat.mtimeMs > 10 * 60 * 1000) {
                fs.unlinkSync(filePath);
                console.log('🗑️ 清理旧临时文件:', filePath);
              }
            });
          } catch (e) {
            console.warn('⚠️ 清理旧临时文件失败:', e);
          }

          // 保存PDF到临时文件
          fs.writeFileSync(tempPath, buffer);
          console.log('💾 PDF已保存到临时文件:', tempPath);
          console.log('📁 文件大小:', buffer.length, '字节');
          console.log('📄 文件页数:', pageCount);

          // 使用pdf2pic将PDF转换为图片
          const { fromPath } = require('pdf2pic');
          const converter = fromPath(tempPath, {
            density: 150, // 提高DPI以获得更好的OCR效果
            quality: 90,
            format: 'jpeg',
            width: 2000,
            height: 2000,
            savePath: '/tmp', // 指定保存路径
            saveFilename: `pdf-${Date.now()}` // 指定文件名前缀
          });

          // 限制处理的页数（最多5页，避免超时）
          const maxPages = Math.min(pageCount, 5);
          console.log('🔄 将处理前', maxPages, '页');

          const ocrResults: string[] = [];

          for (let i = 1; i <= maxPages; i++) {
            try {
              console.log(`🖼️ 转换第 ${i}/${maxPages} 页为图片...`);

              // 转换PDF页面为图片
              let result;
              try {
                result = await converter(i);
                console.log(`🖼️ 转换返回结果:`, {
                  hasName: !!result?.name,
                  name: result?.name,
                  size: result?.size
                });
              } catch (convertError: any) {
                console.error(`❌ converter调用失败:`, convertError.message);
                throw convertError;
              }

              // pdf2pic默认不返回base64，需要读取保存的图片文件
              if (result && result.name) {
                const imagePath = `/tmp/${result.name}`;
                console.log(`📁 读取图片文件:`, imagePath);

                try {
                  // 读取图片文件
                  const imageBuffer = fs.readFileSync(imagePath);
                  const base64Data = imageBuffer.toString('base64');

                  console.log(`✅ 第 ${i} 页转换成功，图片大小:`, base64Data.length);

                  // 使用LLM视觉模型识别图片中的文字
                  const config = new Config();
                  const client = new LLMClient(config);

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

                  let pageText = '';
                  try {
                    const response = await Promise.race([
                      client.invoke(messages, {
                        model: 'doubao-seed-1-6-vision-250815',
                        temperature: 0.3,
                      }),
                      new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('OCR识别超时')), 20000)
                      )
                    ]) as any;

                    console.log(`🔍 LLM响应结构:`, {
                      hasContent: !!response?.content,
                      hasChoices: !!response?.choices,
                      hasMessage: !!response?.message,
                      responseType: typeof response,
                      responseKeys: Object.keys(response || {})
                    });

                    // 尝试多种方式获取文本内容
                    if (response?.content) {
                      pageText = response.content;
                    } else if (response?.choices?.[0]?.message?.content) {
                      pageText = response.choices[0].message.content;
                    } else if (response?.message?.content) {
                      pageText = response.message.content;
                    } else if (typeof response === 'string') {
                      pageText = response;
                    } else {
                      console.warn(`⚠️ 无法从LLM响应中提取文本，完整响应:`, JSON.stringify(response, null, 2));
                    }
                  } catch (llmError: any) {
                    console.error(`❌ 第 ${i} 页LLM调用失败:`, llmError.message);
                    console.error(`❌ 错误类型:`, llmError.constructor.name);
                    pageText = `识别失败: ${llmError.message}`;
                  }

                  ocrResults.push(`【第 ${i} 页】\n${pageText}`);

                  console.log(`✅ 第 ${i} 页识别完成，文字长度:`, pageText.length);
                  console.log(`📝 第 ${i} 页前50字符:`, pageText?.substring(0, 50));

                  // 清理临时图片文件
                  try {
                    fs.unlinkSync(imagePath);
                    console.log(`🗑️ 清理图片文件:`, imagePath);
                  } catch (e) {
                    console.warn('⚠️ 清理图片文件失败:', e);
                  }
                } catch (readError: any) {
                  console.error(`❌ 读取图片文件失败:`, readError.message);
                  ocrResults.push(`【第 ${i} 页】图片读取失败: ${readError.message}`);
                }
              } else {
                throw new Error(`PDF第${i}页转换失败：未生成图片文件`);
              }
            } catch (pageError: any) {
              console.error(`❌ 第 ${i} 页处理失败:`, pageError.message);
              console.error(`❌ 错误堆栈:`, pageError.stack);
              ocrResults.push(`【第 ${i} 页】处理失败: ${pageError.message}`);
            }
          }

          // 清理临时文件
          try {
            fs.unlinkSync(tempPath);
          } catch (e) {
            console.warn('⚠️ 清理临时文件失败:', e);
          }

          // 合并所有OCR结果
          extractedText = ocrResults.join('\n\n');
          console.log('✅ OCR识别完成，总文字长度:', extractedText.length);
          console.log('📝 总内容前100字符:', extractedText?.substring(0, 100));

          // 注意：不再检测"可疑内容"，因为误报率太高
          // 正常的PDF文件可能包含技术术语、代码示例等，不应误判
          // OCR识别结果应该直接返回，由用户判断内容是否正确

          if (extractedText.length < 50) {
            console.warn('⚠️ OCR识别结果太少');
            extractedText = `PDF已加载（${pageCount}页），但OCR识别结果有限。这可能是因为：\n1. 图片质量较低\n2. 文字模糊或过于复杂\n3. 需要要专业的OCR服务\n\n已识别的内容：\n${extractedText}`;
          }

          return extractedText.substring(0, 50000);

        } catch (ocrError: any) {
          console.error('[OCR识别] ❌ OCR处理失败:', ocrError.message);
          console.error('[OCR识别] 错误类型:', ocrError.constructor.name);
          console.error('[OCR识别] 错误堆栈:', ocrError.stack);

          // 清理临时文件（如果存在）
          try {
            const fs = require('fs');
            if (fs.existsSync(tempPath)) {
              fs.unlinkSync(tempPath);
              console.log('[临时文件] ✅ 临时文件已清理');
            }
          } catch (e) {
            console.warn('[临时文件] ⚠️ 清理临时文件失败:', e);
          }

          // 根据错误类型返回不同的提示
          if (ocrError.message && ocrError.message.includes('No PDF header found')) {
            console.error('[OCR识别] ❌ PDF文件头部错误');
            throw new Error('PDF文件格式错误：该文件虽然被识别为PDF，但实际内容可能已损坏或不是有效的PDF文件。请检查文件是否完整，或尝试使用其他格式（如TXT）上传。');
          } else if (ocrError.message && ocrError.message.includes('OCR识别超时')) {
            console.error('[OCR识别] ❌ OCR识别超时');
            throw new Error('PDF OCR识别超时：文件页数较多或内容复杂，识别时间过长。建议减少页数或尝试提取关键内容。');
          } else if (ocrError.message && ocrError.message.includes('converter.convert')) {
            console.error('[OCR识别] ❌ PDF转换失败（pdf2pic库错误）');
            throw new Error('PDF文件转换失败：pdf2pic转换器无法处理该文件。可能是文件已加密或格式特殊。建议：\n1. 使用PDF阅读器打开文件，检查是否加密\n2. 尝试转换为其他格式（如TXT）上传\n3. 使用PDF修复工具修复文件');
          } else {
            console.error('[OCR识别] ❌ 未知OCR错误');
            throw new Error(`PDF OCR识别失败: ${ocrError.message}`);
          }
        }
      }

      // 步骤3：返回提取的文本
      return extractedText.substring(0, 50000);
    }

    // 处理 EPUB 文件
    if (mimeType === 'application/epub+zip') {
      console.log('解析 EPUB 文件...');

      try {
        // 将 buffer 保存到临时文件
        const tempPath: string = `/tmp/temp-${Date.now()}.epub`;
        console.log('保存临时文件:', tempPath);
        fs.writeFileSync(tempPath, buffer);

        return new Promise((resolve, reject) => {
          // 设置超时，防止无限等待
          const timeout = setTimeout(() => {
            console.error('EPUB 解析超时');
            try {
              fs.unlinkSync(tempPath);
            } catch (e) {
              // 忽略清理错误
            }
            reject(new Error('EPUB解析超时（超过30秒）'));
          }, 30000);

          const EPub = require('epub-parser');

          EPub.open(tempPath)
            .then((epub: any) => {
              clearTimeout(timeout);
              try {
                console.log('EPUB 文件已打开');

                // 提取文本内容
                let fullText = '';

                // 遍历所有章节
                if (epub.spine && epub.spine.contents) {
                  for (const item of epub.spine.contents) {
                    try {
                      const content = epub.getChapter(item.id);
                      if (content && typeof content === 'string') {
                        // 移除 HTML 标签
                        const plainText = content
                          .replace(/<[^>]*>/g, '')
                          .replace(/\s+/g, ' ')
                          .trim();
                        if (plainText.length > 20) {
                          fullText += plainText + '\n\n';
                        }
                      }
                    } catch (e) {
                      // 忽略单个章节的解析错误
                      console.warn('解析章节失败:', item.id, e);
                    }
                  }
                }

                // 清理临时文件
                try {
                  fs.unlinkSync(tempPath);
                } catch (e) {
                  // 忽略清理错误
                }

                if (fullText.length === 0) {
                  console.warn('EPUB 文件没有可读内容');
                  resolve('EPUB文件没有可读内容');
                  return;
                }

                console.log('EPUB 解析成功，总长度:', fullText.length);
                resolve(fullText.substring(0, 50000));
              } catch (error: any) {
                console.error('EPUB 内容提取错误:', error);
                try {
                  fs.unlinkSync(tempPath);
                } catch (e) {
                  // 忽略清理错误
                }
                reject(error);
              }
            })
            .catch((error: Error) => {
              console.error('EPUB 解析错误:', error);
              clearTimeout(timeout);
              // 清理临时文件
              try {
                fs.unlinkSync(tempPath);
              } catch (e) {
                // 忽略清理错误
              }
              reject(error);
            });
        });
      } catch (epubError: any) {
        console.error('EPUB 解析库错误:', epubError);

        // 回退方案：直接返回提示
        try {
          const { PDFDocument } = await import('pdf-lib');
          const pdfDoc = await PDFDocument.load(buffer);
          const pageCount = pdfDoc.getPageCount();
          console.log('识别为ZIP文件，尝试作为PDF加载');
          return `已加载EPUB文件。EPUB内容提取暂时不可用，请尝试使用PDF或TXT格式。`;
        } catch (fallbackError: any) {
          console.error('EPUB 回退方案也失败:', fallbackError);
          throw new Error(`EPUB解析失败: ${epubError.message}`);
        }
      }
    }

    // 处理纯文本文件
    console.log('解析为纯文本文件...');
    const text = buffer.toString('utf-8');
    console.log('文本解析成功，长度:', text.length);

    if (text.length === 0) {
      console.warn('文本文件内容为空');
      return '文本文件内容为空';
    }

    return text.substring(0, 50000); // 限制长度
  } catch (error: any) {
    console.error('文件解析失败:', error);
    throw new Error(`文件解析失败: ${error.message || '未知错误'}`);
  }
}

// 辅助函数：从URL提取网页内容（使用LLM的联网能力）
async function extractTextFromURL(url: string): Promise<string> {
  const config = new Config();
  const client = new LLMClient(config);

  try {
    console.log('使用LLM联网能力获取URL内容:', url);

    const messages = [
      {
        role: 'system' as const,
        content: '你是一个网页内容提取助手。你的任务是访问用户提供的URL，获取并返回该网页的完整内容。'
      },
      {
        role: 'user' as const,
        content: `请访问以下URL，获取网页的完整内容（包括标题、正文等所有文字内容）：\n\n${url}\n\n请直接返回网页的完整内容，不要添加任何额外的说明或总结。`
      }
    ];

    // 使用超时控制
    const response = await Promise.race([
      client.invoke(messages, {
        model: 'doubao-seed-1-8-251228',
        temperature: 0.1,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('URL内容获取超时')), 30000)
      )
    ]) as any;

    console.log('URL内容获取成功，长度:', response.content?.length || 0);
    return response.content || '';
  } catch (error: any) {
    console.error('URL内容获取失败:', error);
    throw new Error(`URL内容获取失败: ${error.message || '未知错误'}`);
  }
}

// 辅助函数：提取图片中的文字（使用视觉模型）
async function extractTextFromImage(imageBuffer: Buffer): Promise<string> {
  const config = new Config();
  const client = new LLMClient(config);

  const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  const messages = [
    {
      role: 'user' as const,
      content: [
        { type: 'text' as const, text: '请识别这张图片中的所有文字内容，包括标题、正文等所有可见文字。请完整、准确地提取出来。' },
        {
          type: 'image_url' as const,
          image_url: {
            url: base64Image,
            detail: 'high' as const,
          },
        },
      ],
    },
  ];

  try {
    console.log('开始图片识别，图片大小:', imageBuffer.length, '字节');

    // 使用超时控制，避免API调用卡住
    const response = await Promise.race([
      client.invoke(messages, {
        model: 'doubao-seed-1-6-vision-250815',
        temperature: 0.3,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('图片识别超时')), 30000)
      )
    ]) as any;

    console.log('图片识别成功，结果长度:', response.content?.length || 0);
    return response.content || '';
  } catch (error: any) {
    console.error('图片识别失败:', error);
    if (error.message === '图片识别超时') {
      throw new Error('图片识别超时（超过30秒），请尝试使用更清晰或更小的图片');
    }
    throw new Error(`图片识别失败: ${error.message || '未知错误'}`);
  }
}

// 辅助函数：使用LLM生成"名道法术器例"结构的脚本
async function generateScript(content: string): Promise<any> {
  const config = new Config();
  const client = new LLMClient(config);

  const systemPrompt = `你是一位专业的认知提炼专家，擅长从海量信息中提取核心精华，生成可执行的实战脚本。

你的任务是将用户输入的内容，按照"名道法术器例"的六维结构，提炼成一份详细、深入的实战脚本。

## 字数说明：
- 总字数控制在1500-10000字之间（根据内容质量浮动）
- 内容干货多的书籍/文章：输出更多字数，详细展开
- 内容较浅的书籍/文章：精简输出，保留核心要点

## 输出结构要求：

### 1. **名 (Name)**：核心概念
- **核心命题**：用一句话概括全书/全文的核心观点
- **核心观点**：提炼3-5个核心观点（每个观点1-2句话）
- **核心价值**：说明这本书/文章的价值所在（解决了什么问题，提供了什么方法）← 这是文字最多的部分
- **适用场景**：分析适合的人群和使用场景
- 字数要求：300-800字

### 2. **道 (Dao)**：底层逻辑
- 揭示事物背后的根本规律和原理
- 说明为什么这样做（科学依据、理论基础）
- 解释核心概念的定义和内涵
- 分析其价值所在（解决了什么问题）
- 字数要求：200-500字

### 3. **法 (Fa)**：执行框架
- 提供系统化的行动方法论
- 分3-5个步骤详细说明每个步骤的逻辑
- 每个步骤包含：目标、原理、要点
- 形成完整的执行流程框架
- 字数要求：500-1000字

### 4. **术 (Shu)**：具体方法
- 给出3-5个可直接执行的操作步骤或技巧
- 每个方法包含：具体做法、注意事项、技巧要点
- 提供可量化的执行标准
- 说明如何避免常见错误
- 字数要求：1000-2000字

### 5. **器 (Qi)**：工具资源
- 推荐相关的工具、模板、书籍、网站等实用资源
- 每个资源说明：名称、用途、获取方式、使用技巧
- 分类整理：工具类、模板类、参考类、进阶类
- 字数要求：300-1200字

### 6. **例 (Li)**：实战案例
- 提供2-3个具体的应用场景或成功案例
- 每个案例包含：场景背景、执行过程、使用方法、效果总结
- 说明如何在不同情境下应用
- 提供可复制的关键要点
- 字数要求：1500-2000字

## 输出格式要求：
- 直接输出JSON格式，包含以下字段：
  {
    "title": "简短标题（15-20字）",
    "name": "名的内容（包含核心命题、核心观点3-5个、核心价值详述、适用场景）",
    "dao": "道的内容（底层逻辑、核心概念、科学依据）",
    "fa": "法的内容（执行框架、方法论步骤）",
    "shu": "术的内容（具体方法、操作步骤、技巧）",
    "qi": "器的内容（工具资源、模板、参考）",
    "li": "例的内容（实战案例、应用场景）"
  }

## 质量要求：
- 确保每个字段内容详细展开，不能只有简短概括
- 必须包含：底层逻辑、方法论、实践建议、案例说明
- 实践建议必须可执行，不能只是理论
- 案例说明要具体，有可参考性
- 总字数控制在1500-10000字之间（根据内容质量浮动）
- 语言详实有力，避免空洞表述
- 根据内容干货密度调整详细程度

## 注意事项：
- 提炼要精准，抓住核心，深度展开
- 道要讲清楚"为什么"，法要说明"怎么做"，术要给出"具体步骤"
- 器要推荐真实可用的工具，例要给出可复制的案例
- 所有内容必须源自输入内容，不得编造
- 确保JSON格式正确，不要添加任何其他文字说明或标记
- 保持逻辑连贯，六部分内容相互呼应，形成完整的知识体系

## URL处理规则：
- 如果用户输入的是URL，你需要先通过联网能力获取该URL的完整内容
- 对于微信公众号文章（mp.weixin.qq.com）：
  1. 先尝试直接访问该URL获取内容
  2. 如果因反爬虫保护无法访问，尝试通过联网搜索文章ID或标题
  3. 搜索其他平台是否有该文章的转载（知乎、掘金、CSDN等）
  4. 必须获取完整的正文内容，而不仅仅是摘要
  5. 如果找到的是转载内容，请在生成时注明来源
  6. 只有在完全无法获取内容时，才基于URL本身生成，并说明原因
- 基于获取到的完整内容生成"名道法术器例"结构`;

  const messages = [
    { role: 'system' as const, content: systemPrompt },
    { role: 'user' as const, content: `请帮我提炼以下内容。

【重要】如果下面提供的是URL链接（特别是微信公众号文章），你必须先通过联网能力获取该URL的完整内容，然后再生成"名道法术器例"结构。

对于微信公众号文章（mp.weixin.qq.com），请按照以下步骤处理：
1. 先尝试访问该URL获取完整内容
2. 如果无法直接访问，通过联网搜索文章ID或标题
3. 搜索其他平台（知乎、掘金、CSDN等）是否有转载
4. 必须获取完整的正文内容，不能只有摘要
5. 如果是转载内容，请在生成时注明来源

输入内容：
${content}` },
  ];

  try {
    console.log('开始生成脚本，输入内容长度:', content.length);

    // 使用超时控制，避免LLM调用卡住
    // 增加超时时间至120秒，以支持生成1500-10000字的长内容
    const response = await Promise.race([
      client.invoke(messages, {
        model: 'doubao-seed-1-8-251228',
        temperature: 0.7,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('脚本生成超时')), 120000)
      )
    ]) as any;

    console.log('脚本生成成功，原始结果长度:', response.content?.length || 0);

    // 尝试解析JSON
    const jsonMatch = response.content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      console.log('JSON解析成功');
      return parsed;
    } else {
      // 如果没有找到JSON，返回默认结构
      console.warn('未找到JSON格式，使用默认结构');
      return {
        title: '认知脚本',
        name: response.content.substring(0, 200),
        dao: response.content.substring(200, 600),
        fa: response.content.substring(600, 1200),
        shu: response.content.substring(1200, 1900),
        qi: response.content.substring(1900, 2300),
        li: response.content.substring(2300, 2800),
      };
    }
  } catch (error: any) {
    console.error('脚本生成失败:', error);
    if (error.message === '脚本生成超时') {
      throw new Error('脚本生成超时（超过120秒），请尝试减少输入内容');
    }
    throw new Error(`脚本生成失败: ${error.message || '未知错误'}`);
  }
}

// 辅助函数：提取多张图片中的文字（使用视觉模型）
async function extractTextFromImages(base64Images: string[]): Promise<string> {
  console.log('开始批量识别图片，数量:', base64Images.length);

  const allTexts: string[] = [];

  for (let i = 0; i < base64Images.length; i++) {
    try {
      console.log(`识别第 ${i + 1}/${base64Images.length} 张图片...`);
      const base64Data = base64Images[i].split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      const text = await extractTextFromImage(buffer);

      // 添加图片索引标识
      allTexts.push(`【图片 ${i + 1}】\n${text}`);

      console.log(`第 ${i + 1} 张图片识别完成，长度:`, text.length);
    } catch (error: any) {
      console.error(`第 ${i + 1} 张图片识别失败:`, error);
      // 继续处理下一张图片，不中断整个流程
      allTexts.push(`【图片 ${i + 1}】识别失败: ${error.message}`);
    }
  }

  // 合并所有图片的识别结果
  const combinedText = allTexts.join('\n\n');
  console.log('所有图片识别完成，总长度:', combinedText.length);

  return combinedText;
}

// 辅助函数：使用LLM联网能力获取微信文章内容
async function extractWechatArticleContent(url: string): Promise<string> {
  const config = new Config();
  const client = new LLMClient(config);

  // 从URL中提取文章ID
  const match = url.match(/\/s\/([a-zA-Z0-9_]+)/);
  const articleId = match ? match[1] : '';

  try {
    console.log('使用LLM联网搜索获取微信文章内容，ID:', articleId);

    const messages = [
      {
        role: 'system' as const,
        content: '你是一个专业的网页内容提取助手，擅长获取各种网页（包括微信公众号文章）的完整内容。\n\n你的任务：\n1. 获取用户提供的微信公众号文章的完整内容\n2. 微信文章可能有反爬虫保护，无法直接访问，需要通过联网搜索来获取\n3. 搜索策略：\n   - 先尝试用文章ID进行精确搜索\n   - 再尝试用文章标题进行搜索\n   - 搜索时可以加上"微信公众号"或"公众号文章"等关键词\n   - 检查是否有其他平台的转载（如知乎、掘金、CSDN等）\n   - 如果是技术文章，搜索技术社区的相关内容\n\n4. 内容要求：\n   - 必须获取完整的文章内容，而不仅仅是摘要\n   - 如果找到转载内容，要注明是转载\n   - 如果找不到完全相同的内容，要说明并提供相关的替代内容\n\n返回格式：\n【文章标题】文章标题\n\n【来源说明】xxx（说明是原文还是转载，或相关内容）\n\n【文章正文】\n[完整的文章正文内容]'
      },
      {
        role: 'user' as const,
        content: `我需要获取这篇微信公众号文章的完整内容。

文章链接：${url}
文章ID：${articleId}

请按照以下步骤执行：
1. 使用联网搜索功能，先搜索文章ID：${articleId}
2. 如果没有结果，尝试搜索可能的标题
3. 查找是否有其他平台的转载
4. 如果是技术文章，可以搜索相关的技术教程或文档

重要：
- 必须返回完整的文章正文，不要只返回摘要
- 如果找到的内容不是完全相同的原文，要明确说明
- 返回的内容必须足够详细，能够用于后续的认知提炼

请严格按照【文章标题】【来源说明】【文章正文】的格式返回内容。`
      }
    ];

    // 使用超时控制
    const response = await Promise.race([
      client.invoke(messages, {
        model: 'doubao-seed-1-8-251228',
        temperature: 0.1,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('内容获取超时')), 60000)
      )
    ]) as any;

    console.log('微信文章内容获取成功，长度:', response.content?.length || 0);

    // 检查返回的内容长度
    if (!response.content || response.content.length < 200) {
      throw new Error('获取的内容太短，可能不是完整的文章内容');
    }

    return response.content;
  } catch (error: any) {
    console.error('微信文章内容获取失败:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  console.log('收到处理请求');

  try {
    // 提前检查请求体大小（限制为11MB，包含FormData额外开销，实际文件限制为10MB）
    const contentLength = request.headers.get('content-length');
    if (contentLength) {
      const sizeInBytes = parseInt(contentLength, 10);
      const sizeInMB = sizeInBytes / 1024 / 1024;
      console.log('请求体大小:', sizeInMB.toFixed(2), 'MB');

      if (sizeInBytes > 11 * 1024 * 1024) {
        return NextResponse.json(
          { error: `请求体太大（${sizeInMB.toFixed(2)}MB），请使用小于10MB的文件。提示：可使用PDF压缩工具（如Adobe Acrobat、Smallpdf）压缩文件后再试。` },
          { status: 413 }
        );
      }
    }

    // 检查请求类型（FormData vs JSON）
    const contentType = request.headers.get('content-type') || '';

    let type: string = '';
    let extractedContent: string = '';
    let saveToHistory: boolean = false;
    let fileName: string = '';
    let fileSize: number = 0;
    let userId: string | undefined = undefined;

    if (contentType.includes('multipart/form-data')) {
      // 使用 FormData 传输二进制文件（推荐）
      console.log('✅ 检测到 FormData 传输（二进制模式）');

      const formData = await request.formData();
      type = formData.get('type') as string;

      if (!type) {
        return NextResponse.json(
          { error: '缺少输入类型参数' },
          { status: 400 }
        );
      }

      console.log('请求详情:', { type });

      // 验证用户身份（用于保存历史记录）
      const token = request.headers.get("authorization")?.replace("Bearer ", "");
      const payload = verifyToken(token || "");
      userId = payload?.userId;

      if (type === 'file') {
        // 处理批量文件上传（二进制格式）
        const files = formData.getAll('files') as File[];

        if (!files || files.length === 0) {
          console.error('❌ 未找到文件');
          return NextResponse.json(
            { error: '未找到文件，请重新上传' },
            { status: 400 }
          );
        }

        console.log('[文件信息] 文件数量：', files.length);

        // 检查文件数量限制（最多5个）
        if (files.length > 5) {
          return NextResponse.json(
            { error: `文件数量过多（${files.length}个），最多支持5个文件` },
            { status: 400 }
          );
        }

        // 循环处理每个文件
        let allContent = '';
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          fileName = file.name;
          fileSize = file.size;

          // 日志1：记录文件基本信息（增强版）
          console.log(`[文件 ${i + 1}/${files.length}] 名称：`, fileName);
          console.log(`[文件 ${i + 1}/${files.length}] 大小：`, fileSize, '字节（', (fileSize / 1024 / 1024).toFixed(2), 'MB）');
          console.log(`[文件 ${i + 1}/${files.length}] 类型：`, file.type);
          console.log(`[文件 ${i + 1}/${files.length}] 是否为空：`, fileSize === 0 ? '是' : '否');

          // 1. 校验文件是否为空
          if (fileSize === 0) {
            console.error(`❌ 文件 ${i + 1} 大小为0，上传的文件为空`);
            return NextResponse.json(
              { error: `文件解析失败：文件 "${file.name}" 为空，请重新上传有效的文件` },
              { status: 400 }
            );
          }

          // 检查文件大小（限制为150MB）
          const MAX_FILE_SIZE = 150 * 1024 * 1024;
          if (fileSize > MAX_FILE_SIZE) {
            return NextResponse.json(
              { error: `文件 "${file.name}" 太大（${(fileSize / 1024 / 1024).toFixed(2)}MB），请使用小于150MB的文件。提示：可使用文件压缩工具压缩文件后再试。` },
              { status: 413 }
            );
          }

          // 读取文件内容
          const buffer = Buffer.from(await file.arrayBuffer());

          // 前置校验：PDF文件头部验证
          if (file.type === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
            console.log(`[文件验证] 🔍 执行PDF文件头部校验 (${file.name})...`);

            // 读取前8字节
            const header = buffer.subarray(0, 8);
            const headerHex = header.toString('hex');
            console.log(`[文件验证] PDF文件头（hex）:`, headerHex);

            // 检查是否以 %PDF- 开头（字节：25 50 44 46 2D）
            if (!headerHex.startsWith('255044462d')) {
              console.error(`[文件验证] ❌ PDF文件头部验证失败 (${file.name})，不是有效的PDF文件`);
              return NextResponse.json(
                { error: `PDF文件格式错误：文件 "${file.name}" 头部无效，请检查文件是否完整或已损坏。建议用PDF阅读器打开验证文件有效性。` },
                { status: 400 }
              );
            }

            console.log(`[文件验证] ✅ PDF文件头部验证通过 (${file.name})`);
          }

          // 解析文件内容
          try {
            console.log(`[文件解析] 开始解析文件内容 (${file.name})...`);
            const fileContent = await extractTextFromFile(buffer, file.type);
            console.log(`[文件解析] ✅ 文件内容提取完成 (${file.name})，文本长度:`, fileContent.length);

            // 合并内容
            if (files.length > 1) {
              allContent += `\n\n========== 文件 ${i + 1}/${files.length}：${file.name} ==========\n\n${fileContent}`;
            } else {
              allContent = fileContent;
            }
          } catch (error: any) {
            console.error(`[文件解析] ❌ 文件解析失败 (${file.name}):`, error);
            return NextResponse.json(
              { error: `文件解析失败：${error.message}` },
              { status: 500 }
            );
          }
        }

        // 设置最终提取的内容
        extractedContent = allContent;
        console.log('[文件解析] ✅ 所有文件处理完成，总文本长度:', extractedContent.length);
      } else if (type === 'url') {
        // 处理URL
        const url = formData.get('url') as string;
        if (!url) {
          return NextResponse.json(
            { error: '未找到URL' },
            { status: 400 }
          );
        }

        try {
          extractedContent = await extractTextFromURL(url);
          console.log('URL内容提取完成，长度:', extractedContent.length);
        } catch (error: any) {
          console.error('URL内容提取失败:', error);
          return NextResponse.json(
            { error: error.message },
            { status: 400 }
          );
        }
      } else if (type === 'image') {
        // 处理多张图片
        const images: File[] = [];
        formData.forEach((value, key) => {
          if (key === 'images' && value instanceof File) {
            images.push(value);
          }
        });

        if (images.length === 0) {
          return NextResponse.json(
            { error: '未找到图片' },
            { status: 400 }
          );
        }

        console.log(`🖼️ 收到 ${images.length} 张图片`);

        // 检查单张图片大小（提升到5MB，支持扫描版书籍）
        const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
        const oversizedImages = images.filter(img => img.size > MAX_IMAGE_SIZE);
        if (oversizedImages.length > 0) {
          const fileNames = oversizedImages.map(img => `${img.name} (${(img.size / 1024 / 1024).toFixed(2)}MB)`).join(', ');
          return NextResponse.json(
            { error: `以下图片超过5MB限制，请压缩后重试：${fileNames}。提示：可使用TinyPNG、Compressor.io等工具压缩图片，或降低图片分辨率。` },
            { status: 413 }
          );
        }

        // 检查图片数量（提升到100张，支持扫描版书籍）
        if (images.length > 100) {
          return NextResponse.json(
            { error: `最多只能上传100张图片，当前上传了${images.length}张。建议：\n• 将书籍拆分为多个批次处理（每批50-100张）\n• 每批会自动生成独立的认知脚本` },
            { status: 400 }
          );
        }

        // 检查所有图片的总大小（提升到100MB，支持扫描版书籍）
        const totalImageSize = images.reduce((sum, img) => sum + img.size, 0);
        if (totalImageSize > 100 * 1024 * 1024) {
          return NextResponse.json(
            { error: `所有图片总大小太大（${(totalImageSize / 1024 / 1024).toFixed(2)}MB），请使用总大小小于100MB的图片。提示：减少图片数量或使用压缩工具，或拆分为多个批次处理。` },
            { status: 413 }
          );
        }

        try {
          // 将图片转换为 base64 并提取文字
          const base64Images = await Promise.all(
            images.map(async (img) => {
              const buffer = Buffer.from(await img.arrayBuffer());
              const mimeType = img.type || 'image/jpeg';
              return `data:${mimeType};base64,${buffer.toString('base64')}`;
            })
          );

          extractedContent = await extractTextFromImages(base64Images);
          console.log('图片内容提取完成，长度:', extractedContent.length);
        } catch (error: any) {
          console.error('图片内容提取失败:', error);
          return NextResponse.json(
            { error: error.message },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          { error: `不支持的输入类型: ${type}` },
          { status: 400 }
        );
      }
    } else {
      // 使用 JSON 传输（兼容旧版本）
      console.log('⚠️ 使用 JSON 传输（兼容模式）');

      const body = await request.json();
      type = body.type;
      const content = body.content;
      saveToHistory = body.saveToHistory;
      const mimeType = body.mimeType;
      fileName = body.fileName || '';
      fileSize = body.fileSize || 0;

      console.log('请求详情:', {
        type,
        fileName,
        fileSize: fileSize ? (fileSize / 1024 / 1024).toFixed(2) + ' MB' : 'N/A',
        mimeType,
        contentLength: content?.length || 0
      });

      // 验证用户身份（用于保存历史记录）
      const token = request.headers.get("authorization")?.replace("Bearer ", "");
      const payload = verifyToken(token || "");
      userId = payload?.userId;

      if (!type) {
        return NextResponse.json(
          { error: '缺少输入类型参数' },
          { status: 400 }
        );
      }

      if (type === 'file') {
        // 处理文件上传（base64格式）
        if (typeof content !== 'string') {
          return NextResponse.json(
            { error: '文件数据格式错误' },
            { status: 400 }
          );
        }

        // 验证 base64 数据
        if (!content || content.length === 0) {
          return NextResponse.json(
            { error: '文件内容为空，请重新上传' },
            { status: 400 }
          );
        }

        if (!content.includes(',')) {
          return NextResponse.json(
            { error: '文件数据格式错误，请重新上传' },
            { status: 400 }
          );
        }

        try {
          extractedContent = await extractTextFromFile(content, mimeType);
          console.log('文件内容提取完成，长度:', extractedContent.length);
        } catch (error: any) {
          console.error('文件内容提取失败:', error);
          return NextResponse.json(
            { error: `文件解析失败: ${error.message}` },
            { status: 400 }
          );
        }
      } else if (type === 'url') {
        // 处理URL
        if (!content) {
          return NextResponse.json(
            { error: '未找到URL' },
            { status: 400 }
          );
        }

        try {
          extractedContent = await extractTextFromURL(content);
          console.log('URL内容提取完成，长度:', extractedContent.length);
        } catch (error: any) {
          console.error('URL内容提取失败:', error);
          return NextResponse.json(
            { error: error.message },
            { status: 400 }
          );
        }
      } else if (type === 'image') {
        // 处理图片
        if (!Array.isArray(content)) {
          return NextResponse.json(
            { error: '图片数据格式错误' },
            { status: 400 }
          );
        }

        try {
          extractedContent = await extractTextFromImages(content);
          console.log('图片内容提取完成，长度:', extractedContent.length);
        } catch (error: any) {
          console.error('图片内容提取失败:', error);
          return NextResponse.json(
            { error: error.message },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          { error: `不支持的输入类型: ${type}` },
          { status: 400 }
        );
      }
    }

    // 检查内容长度（URL类型除外，因为LLM会通过联网能力获取内容）
    // 检查内容长度（URL类型除外，因为LLM会通过联网能力获取内容）
    const isURL = extractedContent.startsWith('http') || extractedContent.includes('URL:');
    if (!isURL && extractedContent.length < 100) {
      return NextResponse.json(
        { error: `内容太少（${extractedContent.length}字符），无法生成有效脚本，请提供更详细的内容` },
        { status: 400 }
      );
    }

    // 生成脚本
    console.log('开始生成脚本...');
    const script = await generateScript(extractedContent);
    console.log('脚本生成完成');

    // 如果用户已登录且要求保存，则保存到历史记录
    let savedScript = null;
    if (userId && saveToHistory) {
      try {
        savedScript = await scriptService.saveScript({
          userId,
          title: script.title || "认知脚本",
          content: script,
          inputType: type,
          inputContent: "",
        });
        console.log('脚本已保存到历史记录:', savedScript.id);
      } catch (error) {
        console.error('保存脚本到历史记录失败:', error);
        // 不影响主流程，继续返回结果
      }
    }

    return NextResponse.json({
      ...script,
      savedScriptId: savedScript?.id,
    });
  } catch (error: any) {
    console.error('处理失败:', error);

    // 提取错误信息
    let errorMessage = '处理失败，请重试';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
