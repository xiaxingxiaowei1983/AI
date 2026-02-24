// 本地大脑作弊器调用模块
// 直接集成大脑作弊器核心功能，无需API调用

const fs = require('fs');
const path = require('path');

class LocalBrainCheater {
  constructor() {
    this.tempDir = path.join(__dirname, 'temp');
    this.initialize();
  }

  // 初始化
  initialize() {
    // 创建临时目录
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  // 提取文本从文件
  async extractTextFromFile(filePath) {
    console.log('🔄 开始解析文件:', filePath);

    try {
      // 读取文件
      const buffer = fs.readFileSync(filePath);
      console.log('📥 读取文件成功，大小:', buffer.length, '字节');

      // 获取文件扩展名
      const ext = path.extname(filePath).toLowerCase();
      console.log('🔍 文件扩展名:', ext);

      // 根据文件类型解析
      if (ext === '.pdf') {
        return await this.extractFromPDF(buffer);
      } else if (ext === '.epub') {
        return await this.extractFromEPUB(buffer);
      } else {
        // 默认为文本文件
        return this.extractFromText(buffer);
      }
    } catch (error) {
      console.error('❌ 文件解析失败:', error.message);
      throw error;
    }
  }

  // 从PDF提取文本
  async extractFromPDF(buffer) {
    console.log('🔄 解析 PDF 文件...');

    try {
      // 尝试用 pdf-parse 提取文本
      const pdfParse = require('pdf-parse');
      const result = await pdfParse(buffer, {
        normalizeWhitespace: false,
        disableCombineTextItems: false,
        max: 0
      });

      console.log('✅ PDF 解析成功，文本长度:', result.text?.length || 0);
      console.log('📄 PDF 页数:', result.numpages);

      // 检查提取的文本是否足够
      if (!result.text || result.text.length < 100) {
        console.warn('⚠️ 提取的文本太少（< 100字符），可能是图片型PDF');
        return `PDF已加载（${result.numpages}页），但文本提取结果有限。这可能是因为：\n1. 图片型PDF\n2. PDF加密\n3. 格式特殊\n\n已提取的内容：\n${result.text || ''}`;
      }

      return result.text.substring(0, 50000);
    } catch (pdfError) {
      console.error('❌ PDF 解析失败:', pdfError.message);
      return `PDF解析失败：${pdfError.message}\n\n这可能是因为：\n1. PDF加密\n2. 图片型PDF\n3. 格式特殊\n4. 缺少依赖包`;
    }
  }

  // 从EPUB提取文本
  async extractFromEPUB(buffer) {
    console.log('🔄 解析 EPUB 文件...');

    try {
      // 保存临时文件
      const tempPath = path.join(this.tempDir, `temp-${Date.now()}.epub`);
      fs.writeFileSync(tempPath, buffer);

      const EPub = require('epub-parser');
      const epub = await EPub.open(tempPath);

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
        console.warn('清理临时文件失败:', e);
      }

      if (fullText.length === 0) {
        console.warn('EPUB 文件没有可读内容');
        return 'EPUB文件没有可读内容';
      }

      console.log('EPUB 解析成功，总长度:', fullText.length);
      return fullText.substring(0, 50000);
    } catch (epubError) {
      console.error('EPUB 解析失败:', epubError.message);
      return `EPUB解析失败：${epubError.message}`;
    }
  }

  // 从文本文件提取文本
  extractFromText(buffer) {
    console.log('解析为纯文本文件...');
    const text = buffer.toString('utf-8');
    console.log('文本解析成功，长度:', text.length);

    if (text.length === 0) {
      console.warn('文本文件内容为空');
      return '文本文件内容为空';
    }

    return text.substring(0, 50000);
  }

  // 从URL提取内容
  async extractTextFromURL(url) {
    console.log('🔄 从URL提取内容:', url);

    try {
      // 使用 node-fetch 获取URL内容
      const fetch = require('node-fetch');
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP错误 ${response.status}`);
      }

      const text = await response.text();
      console.log('URL内容提取成功，长度:', text.length);

      // 简单的HTML清理
      const plainText = text
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      return plainText.substring(0, 50000);
    } catch (error) {
      console.error('URL内容提取失败:', error.message);
      return `URL内容提取失败：${error.message}`;
    }
  }

  // 生成脚本
  async generateScript(content) {
    console.log('开始生成脚本，输入内容长度:', content.length);

    try {
      // 这里需要根据实际的LLM调用方式进行调整
      // 由于是本地环境，我们可以使用不同的LLM调用方式
      // 这里提供一个简化版本，实际使用时需要替换为真实的LLM调用
      
      // 模拟LLM生成，使用与公司大脑兼容的格式
      const mockScript = {
        title: '本地生成的认知脚本',
        name: `【核心命题】这是核心命题\n【核心观点】\n1. 核心观点1\n2. 核心观点2\n3. 核心观点3\n【核心价值】这是核心价值描述\n【适用场景】适用场景描述`,
        dao: '【底层逻辑】底层逻辑描述',
        fa: '【执行框架】执行框架描述',
        shu: '【具体方法】具体方法描述',
        qi: '【工具资源】工具资源描述',
        li: '【实战案例】实战案例描述'
      };

      console.log('脚本生成完成');
      return mockScript;
    } catch (error) {
      console.error('脚本生成失败:', error.message);
      throw error;
    }
  }

  // 处理文件
  async processFile(filePath) {
    try {
      console.log('🔄 处理文件:', filePath);
      
      // 提取文件内容
      const extractedContent = await this.extractTextFromFile(filePath);
      
      // 生成脚本
      const script = await this.generateScript(extractedContent);
      
      return script;
    } catch (error) {
      console.error('❌ 文件处理失败:', error.message);
      throw error;
    }
  }

  // 处理URL
  async processUrl(url) {
    try {
      console.log('🔄 处理URL:', url);
      
      // 提取URL内容
      const extractedContent = await this.extractTextFromURL(url);
      
      // 生成脚本
      const script = await this.generateScript(extractedContent);
      
      return script;
    } catch (error) {
      console.error('❌ URL处理失败:', error.message);
      throw error;
    }
  }

  // 处理文本内容
  async processText(text) {
    try {
      console.log('🔄 处理文本内容，长度:', text.length);
      
      // 直接生成脚本
      const script = await this.generateScript(text);
      
      return script;
    } catch (error) {
      console.error('❌ 文本处理失败:', error.message);
      throw error;
    }
  }

  // 批量处理
  async batchProcess(items, type = 'text') {
    const results = [];
    const errors = [];

    for (let i = 0; i < items.length; i++) {
      try {
        console.log(`🔄 处理项目 ${i + 1}/${items.length}...`);
        
        let result;
        if (type === 'file') {
          result = await this.processFile(items[i]);
        } else if (type === 'url') {
          result = await this.processUrl(items[i]);
        } else {
          result = await this.processText(items[i]);
        }
        
        results.push({ index: i, success: true, data: result });
      } catch (error) {
        console.error(`❌ 项目 ${i + 1} 处理失败:`, error.message);
        errors.push({ index: i, error: error.message });
      }
    }

    return {
      results,
      errors,
      successRate: (results.length / items.length) * 100
    };
  }

  // 清理临时文件
  cleanup() {
    try {
      if (fs.existsSync(this.tempDir)) {
        const files = fs.readdirSync(this.tempDir);
        files.forEach(file => {
          const filePath = path.join(this.tempDir, file);
          fs.unlinkSync(filePath);
        });
        console.log('✅ 临时文件已清理');
      }
    } catch (error) {
      console.warn('⚠️ 清理临时文件失败:', error.message);
    }
  }
}

// 测试代码
if (require.main === module) {
  async function main() {
    const cheater = new LocalBrainCheater();

    console.log('=== 本地大脑作弊器测试 ===');

    try {
      // 测试文本处理
      console.log('\n1. 测试文本处理:');
      const textResult = await cheater.processText('这是一段测试文本，用于测试本地大脑作弊器的功能。');
      console.log('✅ 文本处理成功:', textResult.title);

      // 测试URL处理
      console.log('\n2. 测试URL处理:');
      const urlResult = await cheater.processUrl('https://example.com');
      console.log('✅ URL处理成功:', urlResult.title);

    } catch (error) {
      console.error('❌ 测试失败:', error.message);
    } finally {
      cheater.cleanup();
      console.log('\n✅ 测试完成');
    }
  }

  main();
}

module.exports = LocalBrainCheater;