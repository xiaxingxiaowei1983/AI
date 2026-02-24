// 大脑作弊器适配器
// 支持无缝切换API调用和本地调用

const ApiAdapter = require('./api-adapter');
const LocalBrainCheater = require('./local-brain-cheater');

class BrainCheaterAdapter {
  constructor(config = {}) {
    this.mode = config.mode || 'local'; // 'api' 或 'local'
    this.apiConfig = config.apiConfig || {};
    this.localConfig = config.localConfig || {};
    this.adapter = null;
    this.initialize();
  }

  // 初始化适配器
  initialize() {
    if (this.mode === 'api') {
      console.log('🔗 初始化API模式适配器');
      this.adapter = new ApiAdapter(this.apiConfig);
    } else {
      console.log('💻 初始化本地模式适配器');
      this.adapter = new LocalBrainCheater(this.localConfig);
    }
  }

  // 切换模式
  switchMode(mode) {
    if (mode !== this.mode) {
      this.mode = mode;
      this.initialize();
      console.log(`🔄 已切换到${mode === 'api' ? 'API' : '本地'}模式`);
    }
  }

  // 处理文件
  async processFile(filePath) {
    try {
      console.log(`📄 处理文件 [${this.mode}模式]:`, filePath);
      return await this.adapter.processFile(filePath);
    } catch (error) {
      console.error('❌ 文件处理失败:', error.message);
      throw error;
    }
  }

  // 处理URL
  async processUrl(url) {
    try {
      console.log(`🌐 处理URL [${this.mode}模式]:`, url);
      return await this.adapter.processUrl(url);
    } catch (error) {
      console.error('❌ URL处理失败:', error.message);
      throw error;
    }
  }

  // 处理文本
  async processText(text) {
    try {
      console.log(`📝 处理文本 [${this.mode}模式]，长度:`, text.length);
      // 检查适配器是否有processText方法
      if (this.adapter.processText) {
        return await this.adapter.processText(text);
      } else if (this.adapter.generateContentScript) {
        // API模式使用generateContentScript
        return await this.adapter.generateContentScript(text, 'text');
      } else {
        throw new Error('适配器不支持文本处理');
      }
    } catch (error) {
      console.error('❌ 文本处理失败:', error.message);
      throw error;
    }
  }

  // 批量处理
  async batchProcess(items, type = 'text') {
    try {
      console.log(`📦 批量处理 [${this.mode}模式]，数量:`, items.length);
      return await this.adapter.batchProcess(items, type);
    } catch (error) {
      console.error('❌ 批量处理失败:', error.message);
      throw error;
    }
  }

  // 获取状态
  async getStatus() {
    try {
      if (this.mode === 'api' && this.adapter.getApiStatus) {
        return await this.adapter.getApiStatus();
      } else {
        return {
          mode: this.mode,
          healthy: true,
          message: `${this.mode === 'api' ? 'API' : '本地'}模式运行正常`
        };
      }
    } catch (error) {
      console.error('❌ 获取状态失败:', error.message);
      return {
        mode: this.mode,
        healthy: false,
        error: error.message
      };
    }
  }

  // 获取优化建议
  getOptimizationSuggestions() {
    if (this.mode === 'api' && this.adapter.getOptimizationSuggestions) {
      return this.adapter.getOptimizationSuggestions();
    } else {
      return [
        `${this.mode === 'api' ? 'API' : '本地'}模式运行正常`,
        '建议定期检查依赖包更新',
        '确保系统资源充足以支持文件处理'
      ];
    }
  }

  // 关闭适配器
  close() {
    if (this.adapter.close) {
      this.adapter.close();
    } else if (this.adapter.cleanup) {
      this.adapter.cleanup();
    }
    console.log('✅ 适配器已关闭');
  }
}

// 测试代码
if (require.main === module) {
  async function main() {
    console.log('=== 大脑作弊器适配器测试 ===');

    // 测试本地模式
    console.log('\n1. 测试本地模式:');
    const localAdapter = new BrainCheaterAdapter({ mode: 'local' });
    
    try {
      // 测试文本处理
      const textResult = await localAdapter.processText('这是一段测试文本，用于测试本地大脑作弊器的功能。');
      console.log('✅ 本地模式文本处理成功:', textResult.title);
      
      // 测试URL处理
      const urlResult = await localAdapter.processUrl('https://example.com');
      console.log('✅ 本地模式URL处理成功:', urlResult.title);
      
      // 获取状态
      const localStatus = await localAdapter.getStatus();
      console.log('📊 本地模式状态:', localStatus);
      
    } catch (error) {
      console.error('❌ 本地模式测试失败:', error.message);
    } finally {
      localAdapter.close();
    }

    // 测试API模式
    console.log('\n2. 测试API模式:');
    const apiAdapter = new BrainCheaterAdapter({ mode: 'api' });
    
    try {
      // 获取状态
      const apiStatus = await apiAdapter.getStatus();
      console.log('📊 API模式状态:', apiStatus);
      
      // 获取优化建议
      const suggestions = apiAdapter.getOptimizationSuggestions();
      console.log('💡 API模式优化建议:');
      suggestions.forEach(suggestion => {
        console.log(`- ${suggestion}`);
      });
      
    } catch (error) {
      console.error('❌ API模式测试失败:', error.message);
      console.log('⚠️ API模式可能需要大脑作弊器服务运行');
    } finally {
      apiAdapter.close();
    }

    console.log('\n✅ 适配器测试完成');
  }

  main();
}

module.exports = BrainCheaterAdapter;