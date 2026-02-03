// 文件处理和脚本生成工具函数
import { LLMClient, Config, SearchClient, Message } from 'coze-coding-dev-sdk';
import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';

// 🔥 关键修复：在加载任何PDF库之前，禁用debug模式
process.env.PDF_PARSE_DEBUG = 'false';

// 初始化Coze SDK客户端
const config = new Config({
  baseUrl: process.env.NEXT_PUBLIC_COZE_API_BASE_URL || 'https://api.coze.com/open_api/v2',
});

const client = new LLMClient(config);

// 动态导入pptx-parser，避免webpack打包时访问window对象
let PPTXParser: any = null;
async function getPPTXParser() {
  if (PPTXParser) {
    return PPTXParser;
  }

  // 在导入前模拟window对象
  if (typeof window === 'undefined') {
    global.window = {
      document: {
        createElement: () => ({
          getContext: () => ({}),
          style: {}
        }),
        createElementNS: () => ({})
      },
      navigator: { userAgent: 'Node.js' },
      location: { href: '' },
    } as any;

    global.document = global.window.document;
  }

  // 动态导入
  const pptxModule = await import('pptx-parser');
  PPTXParser = pptxModule;
  return pptxModule;
}

// 辅助函数：提取文件文本（支持Buffer、base64字符串或文件路径）
export async function extractTextFromFile(
  fileData: Buffer | string,
  mimeType?: string,
  filePath?: string
): Promise<string> {
  console.log('🔄 开始解析文件...');

  let buffer: Buffer;
  let base64Data: string | null = null;
  let useFilePath = false;

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

    buffer = Buffer.from(base64Content, 'base64');
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
      // ZIP 容器（可能是 Office 文档或 EPUB）
      // 进一步检查 ZIP 内部结构
      const content = buffer.toString('utf-8', 0, Math.min(buffer.length, 1000));

      if (content.includes('word/') || content.includes('xl/')) {
        // DOCX 或 XLSX
        if (content.includes('word/')) {
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          console.log('✅ 通过文件头识别为DOCX');
        } else if (content.includes('xl/')) {
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          console.log('✅ 通过文件头识别为XLSX');
        } else if (content.includes('ppt/')) {
          mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
          console.log('✅ 通过文件头识别为PPTX');
        }
      } else {
        mimeType = 'application/epub+zip';
        console.log('✅ 通过文件头识别为ZIP/EPUB');
      }
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
    } else if (header.startsWith('d0cf11e0')) {
      // Office 二进制格式（DOC/XLS/PPT）
      console.warn('⚠️ 检测到旧版Office二进制格式，仅支持新版本（DOCX/XLSX/PPTX）');
      throw new Error('不支持旧版Office格式（DOC/XLS/PPT），请转换为新版本（DOCX/XLSX/PPTX）后重试');
    } else {
      console.warn('⚠️ 无法识别文件类型，默认为PDF');
      mimeType = 'application/pdf';
    }
  }

  console.log('📄 最终确定的MIME类型:', mimeType);

  // 根据文件类型进行解析
  if (mimeType === 'application/pdf') {
    return await parsePDF(buffer, filePath);
  } else if (mimeType === 'image/jpeg' || mimeType === 'image/png' || mimeType === 'image/gif' || mimeType === 'image/webp') {
    return await parseImage(buffer);
  } else if (mimeType === 'application/epub+zip') {
    return await parseEPUB(buffer);
  } else if (mimeType === 'text/plain') {
    return buffer.toString('utf-8');
  } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return await parseDOCX(buffer);
  } else if (mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    return await parseXLSX(buffer);
  } else if (mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
    return await parsePPTX(buffer);
  } else if (mimeType === 'application/msword' || mimeType === 'application/vnd.ms-excel' || mimeType === 'application/vnd.ms-powerpoint') {
    throw new Error('不支持旧版Office格式（DOC/XLS/PPT），请转换为新版本（DOCX/XLSX/PPTX）后重试。提示：\n• Word文件：另存为 .docx 格式\n• Excel文件：另存为 .xlsx 格式\n• PowerPoint文件：另存为 .pptx 格式');
  } else {
    throw new Error(`不支持的文件类型: ${mimeType}`);
  }
}

// 解析PDF文件
async function parsePDF(buffer: Buffer, filePath?: string): Promise<string> {
  console.log('📖 开始解析PDF...');

  // 方法1: 尝试使用 pdf-parse
  try {
    // pdf-parse 已在文件开头加载，这里直接使用
    const pdfParse = require('pdf-parse');
    console.log('✅ pdf-parse 加载成功');

    // 配置选项
    const data = await pdfParse(buffer, {
      normalizeWhitespace: false,
      disableCombineTextItems: false
    });

    if (data.text && data.text.trim().length > 0) {
      console.log('✅ PDF文本提取成功，文本长度:', data.text.length);
      console.log('📄 PDF页数:', data.numpages);
      return data.text;
    }

    console.warn('⚠️ pdf-parse提取文本为空，尝试备用方案');
  } catch (error: any) {
    console.error('❌ pdf-parse解析失败:', error.message);
    console.error('错误详情:', error.stack);

    // 如果是debug模式错误，尝试备用方案
    if (error.message.includes('ENOENT') && error.message.includes('test/data')) {
      console.log('🔄 检测到debug模式问题，使用备用解析方案');
    } else {
      console.log('🔄 pdf-parse失败，尝试备用解析方案');
    }
  }

  // 方法2: 尝试使用 pdfjs-dist
  try {
    console.log('🔄 尝试使用 pdfjs-dist 解析...');

    // 动态导入 pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist');

    // 配置 Worker（使用 Node.js 兼容模式）
    const workerSrc = '/node_modules/.pnpm/pdfjs-dist@4.0.379/node_modules/pdfjs-dist/build/pdf.worker.min.mjs';
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
    pdfjsLib.GlobalWorkerOptions.workerPort = null;

    // 转换 buffer 为 Uint8Array
    const uint8Array = new Uint8Array(buffer);

    // 加载 PDF 文档
    const loadingTask = pdfjsLib.getDocument({
      data: uint8Array,
      useWorkerFetch: false,
      isEvalSupported: false,
      disableFontFace: true,
      useSystemFonts: true
    });

    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
    console.log(`📄 PDF总页数: ${numPages}`);

    let fullText = '';

    // 逐页提取文本
    for (let i = 1; i <= numPages; i++) {
      try {
        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
      } catch (pageError) {
        console.warn(`⚠️ 第${i}页提取失败:`, pageError);
      }
    }

    if (fullText.trim().length > 0) {
      console.log('✅ pdfjs-dist 文本提取成功，文本长度:', fullText.length);
      return fullText.trim();
    }

    console.warn('⚠️ pdfjs-dist提取文本也为空');
  } catch (pdfjsError: any) {
    console.error('❌ pdfjs-dist解析失败:', pdfjsError.message);
  }

  // 方法3: 简单的文本提取（最后备用方案）
  console.log('🔄 使用备用文本提取方案...');

  try {
    // 尝试从buffer中提取可读文本
    let text = buffer.toString('utf-8', 0, Math.min(buffer.length, 1000000));

    // 移除不可打印字符，保留中文、英文、数字和基本标点
    text = text.replace(/[^\x20-\x7E\u4e00-\u9fa5\u3000-\u303F\uFF00-\uFFEF\n\r\t]/g, ' ');
    text = text.replace(/\s+/g, ' ').trim();

    if (text.length > 100) {
      console.log('✅ 备用提取成功，文本长度:', text.length);
      return text;
    }

    // 所有解析方法都失败，抛出清晰的错误
    console.error('❌ 所有PDF解析方法都失败，检测到扫描型PDF');
    throw new Error(
      'PDF文本提取失败：该PDF可能是扫描图片型PDF或加密PDF，无法提取文字内容。\n\n' +
      '详细说明：\n' +
      '• 扫描型PDF：将纸质书扫描成PDF，每页都是图片，无法直接提取文字\n' +
      '• 加密PDF：文件有密码保护，需要先解密才能读取\n' +
      '• 损坏PDF：文件损坏或不完整\n\n' +
      '解决方法：\n' +
      '1. 转换PDF类型：使用OCR工具（如Adobe Acrobat、天若OCR、在线OCR）将扫描版PDF转换为可编辑的文字版PDF\n' +
      '2. 检查文件：尝试用PDF阅读器打开文件，确认是否正常显示文字\n' +
      '3. 解除加密：如果是加密PDF，使用PDF工具移除密码\n' +
      '4. 重新上传：转换后的文字版PDF可直接上传，无需OCR识别'
    );
  } catch (backupError: any) {
    console.error('❌ 备用提取也失败:', backupError);
    throw new Error(
      `PDF解析失败：${backupError.message || '未知错误'}\n\n` +
      '该PDF可能是扫描图片型PDF或加密PDF，无法提取文本。建议：\n' +
      '• 使用文字型PDF（非扫描图片）\n' +
      '• 将PDF转换为可编辑文档后重试'
    );
  }
}

// 使用 pdfjs-dist 提取文本
// 注意：此函数已废弃，因为 pdfjs-dist 在 Next.js 16 + Webpack 5 环境中存在兼容性问题
// 会触发 "Object.defineProperty called on non-object" 错误
// 现在使用 pdf-parse 进行文本提取，该库更加稳定可靠
/*
async function extractTextWithPDFjs(buffer: Buffer): Promise<string> {
  console.log('🔍 开始使用 pdfjs-dist 提取文本...');

  try {
    const pdfjsLib = await import('pdfjs-dist');

    // 配置 Worker（使用内置 Worker）
    const workerSrc = `/node_modules/.pnpm/pdfjs-dist@4.0.379/node_modules/pdfjs-dist/build/pdf.worker.min.js`;
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

    const uint8Array = new Uint8Array(buffer);
    const loadingTask = pdfjsLib.getDocument({
      data: uint8Array,
      useWorkerFetch: false,
      isEvalSupported: false,
      disableFontFace: true
    });
    const pdfDocument = await loadingTask.promise;

    const numPages = pdfDocument.numPages;
    console.log(`📄 PDF总页数: ${numPages}`);

    let fullText = '';

    for (let i = 1; i <= numPages; i++) {
      console.log(`📖 读取第 ${i}/${numPages} 页...`);
      const page = await pdfDocument.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    console.log('✅ pdfjs-dist 文本提取成功，文本长度:', fullText.length);
    return fullText.trim();
  } catch (error: any) {
    console.error('❌ pdfjs-dist 提取失败:', error);
    throw new Error(`pdfjs-dist 提取失败: ${error.message}`);
  }
}

// 使用OCR识别PDF
// 注意：此函数已废弃，因为 pdfjs-dist 在 Next.js 16 + Webpack 5 环境中存在兼容性问题
// 会触发 "Object.defineProperty called on non-object" 错误
// 对于图片型PDF，建议用户手动将PDF转换为图片后上传
/*
async function parsePDFWithOCR(buffer: Buffer, filePath?: string): Promise<string> {
  console.log('🔍 开始PDF OCR识别...');

  try {
    // 动态导入 pdfjs-dist（避免模块加载时出错）
    const pdfjsLib = await import('pdfjs-dist');
    const pdf2pic = await import('pdf2pic');

    // 如果提供了文件路径，优先使用文件路径创建转换器
    if (filePath && fs.existsSync(filePath)) {
      console.log('📄 使用文件路径模式:', filePath);

      try {
        // 获取PDF页数（通过 pdfjs-dist）
        const fileBuffer = fs.readFileSync(filePath);
        console.log('📄 读取文件Buffer，大小:', fileBuffer.length);

        const uint8Array = new Uint8Array(fileBuffer);
        console.log('📄 转换为Uint8Array');

        console.log('📄 调用 getDocument...');
        const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
        console.log('📄 等待 promise...');
        const pdfDocument = await loadingTask.promise;
        console.log('✅ PDF文档加载成功');

        const numPages = pdfDocument.numPages;
        console.log(`📄 PDF总页数: ${numPages}`);

        if (numPages === 0) {
          throw new Error('PDF没有页面');
        }

        // 使用文件路径创建转换器
        const converter = new pdf2pic.default({
          density: 200,
          saveFilename: `pdf-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          savePath: '/tmp',
          format: 'jpeg',
          width: 2000,
          height: 2000,
        });

        let fullText = '';

        // 逐页识别
        for (let i = 1; i <= numPages; i++) {
          console.log(`📸 转换第 ${i}/${numPages} 页为图片...`);

          try {
            // 使用文件路径转换
            const result = await converter.convert(filePath, { page: i });

            console.log(`✅ 第 ${i} 页转换成功:`, result);

            // 读取生成的图片文件并转换为base64
            const imagePath = path.join('/tmp', result.name);
            if (!fs.existsSync(imagePath)) {
              console.warn(`⚠️ 图片文件不存在: ${imagePath}`);
              continue;
            }

            const imageBuffer = fs.readFileSync(imagePath);
            const imageBase64 = imageBuffer.toString('base64');
            console.log(`✅ 第 ${i} 页转换成功，图片大小: ${imageBuffer.length}`);

            // 调用LLM视觉模型识别文字
            const pageText = await recognizeTextFromImage(imageBuffer);

            fullText += `\n\n【第 ${i} 页】\n${pageText}`;

            // 清理临时图片文件
            try {
              fs.unlinkSync(imagePath);
              console.log(`🗑️ 清理图片文件: ${imagePath}`);
            } catch (e) {
              console.warn(`⚠️ 清理图片文件失败: ${imagePath}`);
            }
          } catch (error: any) {
            console.error(`❌ 第 ${i} 页识别失败:`, error.message);
            // 继续处理下一页
          }
        }

        if (fullText.trim().length === 0) {
          throw new Error('PDF OCR识别失败，未识别到任何文字');
        }

        console.log('✅ OCR识别完成，总文字长度:', fullText.length);
        return fullText;
      } catch (error: any) {
        console.error('❌ PDF处理失败:', error);
        console.error('错误堆栈:', error.stack);
        throw new Error(`PDF处理失败: ${error.message}`);
      }
    }

    // Buffer 模式（原有逻辑）
    console.log('📄 使用 Buffer 模式');

    // 将 Buffer 转换为标准的 Uint8Array，避免 Object.defineProperty 错误
    const uint8Array = new Uint8Array(buffer);

    // 获取PDF页数
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;

    console.log(`📄 PDF总页数: ${numPages}`);

    if (numPages === 0) {
      throw new Error('PDF没有页面');
    }

    // 创建转换器
    const converter = new pdf2pic.default({
      density: 200,
      saveFilename: `pdf-${Date.now()}`,
      savePath: '/tmp',
      format: 'jpeg',
      width: 2000,
      height: 2000,
    });

    let fullText = '';

    // 逐页识别
    for (let i = 1; i <= numPages; i++) {
      console.log(`📸 转换第 ${i}/${numPages} 页为图片...`);

      try {
        // 使用 converter(i) 方式转换
        const result = await converter(i);

        console.log(`✅ 第 ${i} 页转换成功:`, result);

        // 读取生成的图片文件并转换为base64
        const imagePath = path.join('/tmp', result.name);
        if (!fs.existsSync(imagePath)) {
          console.warn(`⚠️ 图片文件不存在: ${imagePath}`);
          continue;
        }

        const imageBuffer = fs.readFileSync(imagePath);
        const imageBase64 = imageBuffer.toString('base64');
        console.log(`✅ 第 ${i} 页转换成功，图片大小: ${imageBuffer.length}`);

        // 调用LLM视觉模型识别文字
        const pageText = await recognizeTextFromImage(imageBuffer);

        fullText += `\n\n【第 ${i} 页】\n${pageText}`;

        // 清理临时图片文件
        try {
          fs.unlinkSync(imagePath);
          console.log(`🗑️ 清理图片文件: ${imagePath}`);
        } catch (e) {
          console.warn(`⚠️ 清理图片文件失败: ${imagePath}`);
        }
      } catch (error: any) {
        console.error(`❌ 第 ${i} 页识别失败:`, error.message);
        // 继续处理下一页
      }
    }

    if (fullText.trim().length === 0) {
      throw new Error('PDF OCR识别失败，未识别到任何文字');
    }

    console.log('✅ OCR识别完成，总文字长度:', fullText.length);
    return fullText;
  } catch (error: any) {
    console.error('❌ PDF OCR识别失败:', error);
    throw new Error(`PDF解析失败: ${error.message}`);
  }
}
*/

// 使用LLM识别图片中的文字
async function recognizeTextFromImage(imageBuffer: Buffer): Promise<string> {
  try {
    console.log('🔍 开始图片识别，图片大小:', imageBuffer.length, '字节');

    const imageBase64 = imageBuffer.toString('base64');

    const messages: Message[] = [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`,
            },
          },
          {
            type: 'text',
            text: '请识别图片中的所有文字内容，按原文格式输出，不要添加任何说明或解释。只输出识别到的文字内容。',
          },
        ],
      },
    ];

    // 使用超时控制，避免API调用卡住
    const response = await Promise.race([
      client.invoke(messages, {
        model: 'doubao-seed-1-6-vision-250815',
        temperature: 0.3,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('图片识别超时')), 20000)
      )
    ]) as any;

    console.log('图片识别成功，结果长度:', response.content?.length || 0);
    return response.content || '';
  } catch (error: any) {
    console.error('图片识别失败:', error);
    if (error.message === '图片识别超时') {
      throw new Error('图片识别超时（超过20秒），请尝试使用更清晰或更小的图片');
    }
    throw new Error(`图片识别失败: ${error.message || '未知错误'}`);
  }
}

// 解析图片
async function parseImage(buffer: Buffer): Promise<string> {
  console.log('🖼️ 开始解析图片...');

  return await recognizeTextFromImage(buffer);
}

// 解析EPUB
async function parseEPUB(buffer: Buffer): Promise<string> {
  console.log('📚 开始解析EPUB...');
  throw new Error('EPUB解析功能暂未实现');
}

// 解析 DOCX 文件
async function parseDOCX(buffer: Buffer): Promise<string> {
  console.log('📄 开始解析DOCX...');

  try {
    const result = await mammoth.extractRawText({ buffer });
    console.log('✅ DOCX解析成功，文本长度:', result.value.length);

    if (result.messages && result.messages.length > 0) {
      console.warn('⚠️ DOCX解析警告:', result.messages);
    }

    return result.value;
  } catch (error: any) {
    console.error('❌ DOCX解析失败:', error.message);
    throw new Error(`DOCX解析失败: ${error.message}`);
  }
}

// 解析 XLSX 文件
async function parseXLSX(buffer: Buffer): Promise<string> {
  console.log('📊 开始解析XLSX...');

  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;
    console.log('📊 工作表数量:', sheetNames.length);

    let fullText = '';

    sheetNames.forEach((sheetName, index) => {
      const worksheet = workbook.Sheets[sheetName];
      const sheetText = XLSX.utils.sheet_to_csv(worksheet);
      fullText += `\n\n【工作表 ${index + 1}: ${sheetName}】\n${sheetText}`;
    });

    console.log('✅ XLSX解析成功，文本长度:', fullText.length);
    return fullText;
  } catch (error: any) {
    console.error('❌ XLSX解析失败:', error.message);
    throw new Error(`XLSX解析失败: ${error.message}`);
  }
}

// 解析 PPTX 文件
async function parsePPTX(buffer: Buffer): Promise<string> {
  console.log('📊 开始解析PPTX...');

  try {
    // 将 Buffer 写入临时文件，因为 pptx-parser 需要文件路径
    const tempPath = path.join('/tmp', `pptx-${Date.now()}-${Math.random().toString(36).substring(7)}.pptx`);
    fs.writeFileSync(tempPath, buffer);

    try {
      // 动态导入pptx-parser
      const pptxModule = await getPPTXParser();
      const parser = new pptxModule.Parser();
      const pptx = await parser.parse(tempPath);

      let fullText = '';

      pptx.slides.forEach((slide: any, index: number) => {
        fullText += `\n\n【幻灯片 ${index + 1}】\n`;

        // 提取文本
        if (slide.shapes) {
          slide.shapes.forEach((shape: any) => {
            if (shape.text) {
              fullText += shape.text + '\n';
            }
            if (shape.textBody && shape.textBody.paragraphs) {
              shape.textBody.paragraphs.forEach((para: any) => {
                if (para.text) {
                  fullText += para.text + '\n';
                }
              });
            }
          });
        }
      });

      console.log('✅ PPTX解析成功，文本长度:', fullText.length);

      if (fullText.trim().length === 0) {
        console.warn('⚠️ PPTX提取文本为空，可能是图片型PPT');
      }

      return fullText;
    } finally {
      // 清理临时文件
      try {
        fs.unlinkSync(tempPath);
      } catch (e) {
        console.warn(`⚠️ 清理临时文件失败: ${tempPath}`);
      }
    }
  } catch (error: any) {
    console.error('❌ PPTX解析失败:', error.message);

    // 检测是否是window错误
    if (error.message && error.message.includes('window is not defined')) {
      throw new Error('PPTX解析失败：pptx-parser库依赖浏览器环境，当前运行在Node.js后端环境');
    }

    throw new Error(`PPTX解析失败: ${error.message}`);
  }
}

// 辅助函数：智能截断内容以避免 tokens 超限
function truncateContent(content: string, maxLength: number = 40000): string {
  if (content.length <= maxLength) {
    return content;
  }

  console.log(`⚠️ 内容过长（${content.length} 字符），将截断为 ${maxLength} 字符`);

  // 智能截断：保留开头和结尾
  const headLength = Math.floor(maxLength * 0.4);
  const tailLength = Math.floor(maxLength * 0.4);
  const truncatedHead = content.substring(0, headLength);
  const truncatedTail = content.substring(content.length - tailLength);

  const truncated = `${truncatedHead}\n\n... [内容已自动截断，原文共 ${content.length} 字符，已省略 ${content.length - maxLength} 字符] ...\n\n${truncatedTail}`;

  console.log(`✅ 截断完成，最终长度: ${truncated.length} 字符`);
  return truncated;
}

// 辅助函数：智能摘要（大文件分块处理）
export async function smartSummary(content: string): Promise<string> {
  const MAX_CHUNK_LENGTH = 10000;
  const TARGET_SUMMARY_LENGTH = 20000;

  console.log(`🧠 开始智能摘要，原始内容长度: ${content.length}`);

  // 如果内容不长，直接返回
  if (content.length <= TARGET_SUMMARY_LENGTH) {
    console.log(`✅ 内容长度适中，无需摘要`);
    return content;
  }

  // 按段落分块
  const chunks: string[] = [];
  const paragraphs = content.split(/\n\s*\n/);
  let currentChunk = '';

  for (const para of paragraphs) {
    if ((currentChunk + para).length > MAX_CHUNK_LENGTH) {
      if (currentChunk.trim().length > 0) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = para;
    } else {
      currentChunk += '\n\n' + para;
    }
  }
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }

  console.log(`📦 分为 ${chunks.length} 个chunks，每chunk约 ${MAX_CHUNK_LENGTH} 字符`);

  // 使用LLM对每个chunk进行摘要
  const summaries: string[] = [];
  const BATCH_SIZE = 3; // 并发数

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    console.log(`🔄 处理批次 ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}`);

    const batchSummaries = await Promise.all(
      batch.map(async (chunk, index) => {
        const prompt = `请对以下内容进行智能摘要，提炼核心要点（200-300字）：\n\n${chunk}`;
        try {
          const response = await Promise.race([
            client.invoke([
              { role: 'user', content: prompt }
            ], {
              model: 'doubao-seed-1-8-251228',
              temperature: 0.3,
            }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('摘要超时')), 20000)
            )
          ]) as any;
          return response.content || '';
        } catch (error: any) {
          console.warn(`⚠️ Chunk ${i + index + 1} 摘要失败: ${error.message}`);
          // 摘要失败，返回截断的原始内容
          return chunk.substring(0, 500);
        }
      })
    );

    summaries.push(...batchSummaries);
  }

  // 组合所有摘要
  const combined = summaries.join('\n\n---\n\n');
  console.log(`✅ 摘要完成，总长度: ${combined.length} 字符`);

  return combined;
}

// 辅助函数：检测文本质量，识别扫描型PDF
function detectTextQuality(content: string): { isLowQuality: boolean; reason: string } {
  const trimmedContent = content.trim();
  const length = trimmedContent.length;

  console.log(`🔍 开始文本质量检测，内容长度: ${length}`);

  // 检测1：内容过短
  if (length < 500) {
    console.warn(`⚠️ 检测1失败：内容过短（${length}字符）`);
    return {
      isLowQuality: true,
      reason: `内容过短（${length}字符），有效文字太少`
    };
  }

  // 检测2：中文占比过低（扫描型PDF通常很少有中文字符）
  const chineseChars = trimmedContent.match(/[\u4e00-\u9fa5]/g) || [];
  const chineseRatio = chineseChars.length / length;

  console.log(`📊 检测2：中文=${chineseChars.length}, 占比=${(chineseRatio * 100).toFixed(2)}%`);

  if (chineseRatio < 0.10) {
    // 降低阈值到10%，更严格
    console.warn(`⚠️ 检测2失败：中文占比过低（${(chineseRatio * 100).toFixed(2)}%）`);
    return {
      isLowQuality: true,
      reason: `中文占比过低（${(chineseRatio * 100).toFixed(2)}%），疑似扫描型PDF或纯英文文档`
    };
  }

  // 检测3：英文/数字占比过高（扫描型PDF通常包含大量英文元数据）
  const englishNumChars = trimmedContent.match(/[a-zA-Z0-9]/g) || [];
  const englishNumRatio = englishNumChars.length / length;

  console.log(`📊 检测3：英文/数字=${englishNumChars.length}, 占比=${(englishNumRatio * 100).toFixed(2)}%`);

  if (englishNumRatio > 0.80 && chineseRatio < 0.15) {
    // 英文/数字占比超过80%且中文占比低于15%
    console.warn(`⚠️ 检测3失败：英文/数字占比过高（${(englishNumRatio * 100).toFixed(2)}%）`);
    return {
      isLowQuality: true,
      reason: `英文/数字占比过高（${(englishNumRatio * 100).toFixed(2)}%），疑似扫描型PDF元数据或乱码`
    };
  }

  // 检测4：有效字符密度（去除空格和标点后的比例）
  const validContent = trimmedContent.replace(/[\s\p{P}\p{S}]/gu, '');
  const validRatio = validContent.length / length;

  console.log(`📊 检测4：有效字符密度=${(validRatio * 100).toFixed(2)}%`);

  if (validRatio < 0.40) {
    // 提高阈值到40%，更严格
    console.warn(`⚠️ 检测4失败：有效字符密度过低（${(validRatio * 100).toFixed(2)}%）`);
    return {
      isLowQuality: true,
      reason: `有效字符密度过低（${(validRatio * 100).toFixed(2)}%），疑似损坏文件或乱码`
    };
  }

  console.log(`✅ 文本质量检测通过`);
  return { isLowQuality: false, reason: '文本质量正常' };
}

// 辅助函数：使用LLM生成"名道法术器例"结构的脚本
export async function generateScript(content: string): Promise<any> {
  console.log('开始生成脚本，输入内容长度:', content.length);

  // 提前检测文本质量
  const qualityCheck = detectTextQuality(content);
  console.log(`📊 文本质量检测结果：${qualityCheck.reason}`);

  if (qualityCheck.isLowQuality) {
    console.warn('⚠️ 检测到低质量文本，可能是扫描型PDF或空文件');
    throw new Error(
      `文件内容质量不达标，无法生成认知脚本。\n\n` +
      `检测结果：${qualityCheck.reason}\n\n` +
      `可能原因：\n` +
      `• 上传的是扫描型PDF（纯图片，无法提取文字）\n` +
      `• 上传的是空文档或损坏的文件\n` +
      `• 上传的文件加密或格式不支持\n` +
      `• 文件包含大量图片、表格，文字内容很少\n\n` +
      `解决建议：\n` +
      `• 使用文字型PDF（非扫描图片）\n` +
      `• 将扫描型PDF转换为可编辑文档（使用Adobe Acrobat、天若OCR、在线OCR等工具）\n` +
      `• 检查文件是否正常打开和阅读\n` +
      `• 如果是图片/表格型文档，可以尝试上传为图片格式，使用OCR识别`
    );
  }

  // 智能截断内容，避免 tokens 超限（保守策略：豆包大模型最大约 128K tokens，但考虑复杂字符和prompt，截断为 40000 字符）
  const truncatedContent = truncateContent(content, 40000);

  const systemPrompt = `你是一个专业的认知模型设计师和脚本创作专家。请根据用户提供的材料，按照以下"名道法术器例"六段式结构生成一个高质量的认知脚本。

## 结构要求

### 1. 名（核心概念）
包含以下要素，300-800字：
- **核心命题**：一句话精准定义这个认知模型的核心主张
- **核心观点**：3-5个支撑核心命题的关键观点
- **核心价值**：详述这个模型能解决什么问题，带来什么价值
- **适用场景**：在什么场景下应用最有效

### 2. 道（底层逻辑）
揭示概念背后的底层逻辑和哲学思考。为什么这个概念能成立？它的理论依据是什么？它与本质规律的关系是什么？

### 3. 法（方法论）
基于"道"提炼出的可操作的方法论。将抽象的"道"转化为具体的步骤、原则和路径。提供清晰的执行框架。

### 4. 术（具体技巧）
支撑"法"落地的具体技巧、工具、战术。提供可直接执行的技巧和操作指南。

### 5. 器（工具资源）
支撑"术"执行的工具、模板、资源。推荐实用的工具和资源清单。

### 6. 例（实战案例）
通过具体的案例展示如何应用这个模型。案例要真实、有细节，能体现"名道法术器例"的完整应用过程。

## 质量要求
1. 总字数要求：1500-10000字（根据内容质量智能调整，内容越复杂、价值越高，生成的字数应该越多）
2. 语言简洁有力，避免冗余废话
3. 逻辑严密，层次分明
4. 实用性强，能够落地执行
5. 案例真实可信，有启发性
6. 各部分内容要相互呼应，形成闭环

## 输出格式
请以JSON格式输出，格式如下：
\`\`\`json
{
  "名": {
    "核心命题": "xxx",
    "核心观点": ["观点1", "观点2", "观点3"],
    "核心价值": "xxx",
    "适用场景": "xxx"
  },
  "道": "xxx",
  "法": "xxx",
  "术": "xxx",
  "器": "xxx",
  "例": "xxx"
}
\`\`\`

请开始生成，确保内容深度和可读性。`;

  const messages: Message[] = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: `请基于以下内容生成认知脚本：\n\n${content}`,
    },
  ];

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

  // 改进JSON解析逻辑
  let parsed = null;
  try {
    // 首先尝试直接解析整个响应
    parsed = JSON.parse(response.content);
    console.log('JSON解析成功（直接解析）');
    return parsed;
  } catch (e) {
    console.log('直接JSON解析失败，尝试提取JSON部分');
  }

  // 尝试从响应中提取JSON（处理Markdown代码块等情况）
  const cleanedContent = response.content
    .replace(/```json\s*/g, '')  // 移除 ```json 标记
    .replace(/```\s*$/g, '')      // 移除结尾的 ``` 标记
    .trim();

  try {
    parsed = JSON.parse(cleanedContent);
    console.log('JSON解析成功（清理后）');
    return parsed;
  } catch (e) {
    console.log('清理后JSON解析失败，尝试正则提取');
  }

  // 使用更精确的正则表达式匹配JSON对象
  // 匹配完整的JSON对象（包括嵌套）
  const jsonMatch = cleanedContent.match(/\{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*\}/);
  if (jsonMatch) {
    try {
      parsed = JSON.parse(jsonMatch[0]);
      console.log('JSON解析成功（正则提取）');
      return parsed;
    } catch (parseError: any) {
      console.error('JSON解析失败:', parseError.message);
      console.error('尝试解析的内容（前200字符）:', jsonMatch[0].substring(0, 200));
    }
  }

  console.warn('JSON解析失败，返回原始文本');
  return {
    "名": {
      "核心命题": "解析失败，无法提取核心命题",
      "核心观点": [],
      "核心价值": "",
      "适用场景": ""
    },
    "道": response.content || "",
    "法": "",
    "术": "",
    "器": "",
    "例": ""
  };
}

// 清理过期临时文件（超过10分钟）
export function cleanupTempFiles() {
  const tempBaseDir = path.join(process.cwd(), 'temp');
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

  function cleanDirectory(dir: string) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        cleanDirectory(filePath);
      } else if (stats.mtimeMs < tenMinutesAgo) {
        try {
          fs.unlinkSync(filePath);
          console.log(`🗑️ 清理过期文件: ${filePath}`);
        } catch (e) {
          console.warn(`⚠️ 清理文件失败: ${filePath}`);
        }
      }
    }

    // 清理空目录
    try {
      if (fs.readdirSync(dir).length === 0) {
        fs.rmdirSync(dir);
      }
    } catch (e) {
      // 忽略错误
    }
  }

  cleanDirectory(tempBaseDir);
}
