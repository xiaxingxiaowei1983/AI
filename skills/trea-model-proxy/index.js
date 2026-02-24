const { OpenClaw } = require('openclaw');

class TreaModelProxy {
  constructor() {
    this.name = 'trea-model-proxy';
    this.version = '1.0.0';
    this.description = '无需API密钥调用Trea大模型的代理服务';
  }

  /**
   * 初始化代理服务
   */
  async initialize() {
    console.log('🧠 Trea Model Proxy 初始化中...');
    
    // 检测Trea环境
    if (!this.detectTreaEnvironment()) {
      console.error('❌ 无法检测到Trea环境');
      return false;
    }

    console.log('✅ Trea环境检测成功');
    console.log('✅ Trea Model Proxy 初始化完成');
    return true;
  }

  /**
   * 检测Trea环境
   */
  detectTreaEnvironment() {
    // 检查是否在Trea环境中运行
    return typeof process.env.TREA_RUNTIME !== 'undefined' || 
           typeof window !== 'undefined' && window.Trea !== undefined;
  }

  /**
   * 生成免密钥配置
   * @param {string} agentType - 智能体类型
   * @returns {Object} 配置对象
   */
  generateApiFreeConfig(agentType = 'general') {
    return {
      model: {
        provider: 'trea',
        useInternalModel: true,
        optimization: {
          enableCache: true,
          cacheSize: 100,
          enableStreaming: true
        },
        session: {
          maxHistory: 50,
          enableSummary: true,
          summaryThreshold: 20
        }
      },
      agent: {
        type: agentType,
        autoRun: true
      },
      evo: {
        enable: true,
        review: true,
        autoImprove: false
      }
    };
  }

  /**
   * 启动免密钥智能体
   * @param {string} agentName - 智能体名称
   * @param {Object} config - 智能体配置
   * @returns {Promise<Object>} 启动结果
   */
  async startApiFreeAgent(agentName, config = {}) {
    try {
      console.log(`🚀 启动免密钥智能体: ${agentName}`);
      
      // 生成默认配置
      const defaultConfig = this.generateApiFreeConfig();
      // 合并用户配置
      const finalConfig = { ...defaultConfig, ...config };
      
      // 创建OpenClaw实例
      const claw = new OpenClaw({
        configPath: `./agents/${agentName}/config.json`,
        promptPath: `./agents/${agentName}/agent.prompt`,
        useTreaInternalModel: true
      });
      
      // 启动Evo和Agent
      await claw.startEvo();
      await claw.startAgent();
      
      console.log(`✅ 智能体 ${agentName} 启动成功`);
      
      return {
        success: true,
        agent: claw,
        message: `智能体 ${agentName} 启动成功，使用Trea内置模型`
      };
    } catch (error) {
      console.error(`❌ 智能体启动失败: ${error.message}`);
      return {
        success: false,
        error: error.message,
        message: `智能体 ${agentName} 启动失败`
      };
    }
  }

  /**
   * 调用Trea内置模型
   * @param {string} prompt - 提示词
   * @param {Array} history - 会话历史
   * @param {Object} params - 模型参数
   * @returns {Promise<string>} 模型响应
   */
  async callTreaModel(prompt, history = [], params = {}) {
    try {
      console.log('🤖 调用Trea内置模型...');
      
      // 这里是调用Trea内置模型的核心逻辑
      // 实际实现会根据Trea的API进行调整
      
      // 模拟模型响应（实际实现会替换为真实调用）
      const response = `[Trea模型响应] 针对您的问题: ${prompt.substring(0, 50)}...`;
      
      console.log('✅ 模型调用成功');
      return response;
    } catch (error) {
      console.error(`❌ 模型调用失败: ${error.message}`);
      return `模型调用失败: ${error.message}`;
    }
  }

  /**
   * 验证配置有效性
   * @param {Object} config - 配置对象
   * @returns {Object} 验证结果
   */
  validateConfig(config) {
    const errors = [];
    
    // 检查必需的配置项
    if (!config.model) {
      errors.push('缺少model配置');
    } else {
      if (config.model.provider !== 'trea') {
        errors.push('provider必须设置为trea');
      }
      if (!config.model.useInternalModel) {
        errors.push('useInternalModel必须设置为true');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      message: errors.length === 0 ? '配置验证成功' : `配置验证失败: ${errors.join(', ')}`
    };
  }

  /**
   * 获取代理服务状态
   * @returns {Object} 状态对象
   */
  getStatus() {
    return {
      name: this.name,
      version: this.version,
      status: 'running',
      treaEnvironment: this.detectTreaEnvironment(),
      timestamp: new Date().toISOString()
    };
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TreaModelProxy;
}

// 全局注册（如果在浏览器环境中）
if (typeof window !== 'undefined') {
  window.TreaModelProxy = TreaModelProxy;
}

// 命令行使用
if (typeof process !== 'undefined' && process.argv && process.argv[2]) {
  const proxy = new TreaModelProxy();
  const command = process.argv[2];
  
  switch (command) {
    case 'init':
      proxy.initialize().then(success => {
        process.exit(success ? 0 : 1);
      });
      break;
    
    case 'start':
      const agentName = process.argv[3] || 'master';
      proxy.startApiFreeAgent(agentName).then(result => {
        console.log(result.message);
        process.exit(result.success ? 0 : 1);
      });
      break;
    
    case 'config':
      const agentType = process.argv[3] || 'general';
      const config = proxy.generateApiFreeConfig(agentType);
      console.log(JSON.stringify(config, null, 2));
      process.exit(0);
      break;
    
    case 'status':
      const status = proxy.getStatus();
      console.log(JSON.stringify(status, null, 2));
      process.exit(0);
      break;
    
    default:
      console.log('📖 Trea Model Proxy 命令帮助:');
      console.log('  init     - 初始化代理服务');
      console.log('  start    - 启动免密钥智能体');
      console.log('  config   - 生成免密钥配置');
      console.log('  status   - 获取服务状态');
      process.exit(0);
  }
}
