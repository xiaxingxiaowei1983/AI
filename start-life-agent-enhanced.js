const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('🚀 启动人生决策宗师智能体');
console.log('========================================');

// 加载配置文件
const configPath = path.join(__dirname, 'agents', 'life', 'config.json');
const promptPath = path.join(__dirname, 'agents', 'life', 'agent.prompt');

if (!fs.existsSync(configPath)) {
  console.error('❌ 配置文件不存在:', configPath);
  process.exit(1);
}

if (!fs.existsSync(promptPath)) {
  console.error('❌ 提示词文件不存在:', promptPath);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const prompt = fs.readFileSync(promptPath, 'utf8');

console.log('✅ 配置文件加载完成');
console.log(`📍 智能体名称: ${config.agent.name}`);
console.log(`👤 角色: ${config.agent.role}`);
console.log(`🎯 触发器: ${Array.isArray(config.agent.trigger) ? config.agent.trigger.join(', ') : config.agent.trigger}`);

// 创建人生决策宗师智能体类
class LifeDecisionMaster {
  constructor() {
    this.name = config.agent.name;
    this.role = config.agent.role;
    this.code = '天师';
    this.description = config.agent.description;
    this.capabilities = config.agent.core_abilities;
    this.triggers = Array.isArray(config.agent.trigger) ? config.agent.trigger : [config.agent.trigger];
    this.isProcessing = false;
    this.lastCommand = '';
    this.commandHistory = [];
  }

  // 处理命令
  async processCommand(message) {
    this.lastCommand = message;
    this.isProcessing = true;

    try {
      // 检查是否触发智能体
      const isTriggered = this.triggers.some(trigger => message.includes(trigger));

      if (isTriggered) {
        console.log('💬 处理天师命令...');
        
        // 提取用户的问题
        const userQuestion = this.extractUserQuestion(message);
        
        // 生成响应
        const response = await this.generateResponse(userQuestion);
        
        // 记录历史
        this.commandHistory.push({
          timestamp: new Date().toISOString(),
          command: message,
          response: response,
          status: 'success'
        });
        
        this.isProcessing = false;
        return {
          success: true,
          agent: this.name,
          role: this.role,
          code: this.code,
          message: response,
          status: 'active'
        };
      } else {
        console.log('💬 处理一般命令...');
        
        this.isProcessing = false;
        return {
          success: true,
          status: 'not_triggered',
          message: '请使用触发词 "@人生决策宗师" 或 "@天师" 来激活智能体'
        };
      }
    } catch (error) {
      console.error('❌ 处理命令时出错:', error.message);
      this.isProcessing = false;
      return {
        success: false,
        error: error.message,
        status: 'error'
      };
    }
  }

  // 提取用户问题
  extractUserQuestion(message) {
    // 移除触发词，提取实际问题
    let question = message;
    this.triggers.forEach(trigger => {
      question = question.replace(trigger, '').trim();
    });
    
    // 如果问题为空，返回默认问题
    if (!question) {
      return '你好';
    }
    
    return question;
  }

  // 生成响应
  async generateResponse(question) {
    // 根据问题类型生成不同的响应
    if (question === '你好' || question === 'hi' || question === 'hello') {
      return `您好！我是${this.name}（${this.code}），${this.description}。请问您需要在哪些方面获得决策支持或能量管理的帮助？`;
    }

    // 能量复盘相关
    if (question.includes('能量') || question.includes('复盘')) {
      return `我理解您希望进行能量复盘。作为您的生命策略高维导师，我会从AWKN框架的W维度（WIRED - 看清过去真我，找回本能）帮助您分析能量状态。请告诉我您最近的能量变化情况，包括身体、心理、情感和精神四个维度。`;
    }

    // 决策相关
    if (question.includes('决策') || question.includes('选择') || question.includes('决定')) {
      return `我理解您面临重要决策。作为您的生命策略高维导师，我会从AWKN框架的K维度（KEY - 找到人生之钥，破开局势）帮助您分析决策。请告诉我您面临的具体决策情境，包括选项、约束和目标。`;
    }

    // 生活优化相关
    if (question.includes('优化') || question.includes('改进') || question.includes('提升')) {
      return `我理解您希望优化生活。作为您的生命策略高维导师，我会从AWKN框架的N维度（NOW - 开启新生旅程，就在此刻）帮助您制定行动指引。请告诉我您希望优化的生活领域，包括职业、健康、关系、财务等。`;
    }

    // 个人成长相关
    if (question.includes('成长') || question.includes('学习') || question.includes('发展')) {
      return `我理解您希望促进个人成长。作为您的生命策略高维导师，我会从AWKN框架的A维度（AWAKEN - 看清未来，不再迷茫）帮助您规划成长路径。请告诉我您的成长目标和当前状态。`;
    }

    // 默认响应
    return `我理解您的问题。作为您的生命策略高维导师，我会基于AWKN框架为您提供决策支持和生活优化建议。请告诉我更多关于您的情况和需求，我会为您提供个性化的分析和建议。`;
  }

  // 获取执行状态
  getStatus() {
    return {
      isProcessing: this.isProcessing,
      lastCommand: this.lastCommand,
      agentName: this.name,
      agentRole: this.role,
      agentCode: this.code,
      triggers: this.triggers,
      capabilities: this.capabilities,
      commandHistoryLength: this.commandHistory.length
    };
  }

  // 获取命令历史
  getCommandHistory(limit = 10) {
    return this.commandHistory.slice(-limit);
  }

  // 清空历史
  clearHistory() {
    this.commandHistory = [];
    return {
      success: true,
      message: '命令历史已清空'
    };
  }
}

// 创建增强版人生决策宗师智能体
const enhancedAgent = new LifeDecisionMaster();

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 处理CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理OPTIONS请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 健康检查
  if (req.method === 'GET' && req.url === '/health') {
    const status = enhancedAgent.getStatus();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'active',
      ...status
    }));
    return;
  }

  // 智能体信息
  if (req.method === 'GET' && req.url === '/info') {
    const status = enhancedAgent.getStatus();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      agent: config.agent,
      company_context: config.company_context,
      capabilities: config.agent.core_abilities,
      ...status
    }));
    return;
  }

  // 提示词获取
  if (req.method === 'GET' && req.url === '/prompt') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      prompt: prompt,
      length: prompt.length
    }));
    return;
  }

  // 主聊天接口
  if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const request = JSON.parse(body);
        const { message, context } = request;
        
        console.log('📥 收到请求:', message.substring(0, 50) + '...');
        
        // 处理命令
        const response = await enhancedAgent.processCommand(message);
        
        console.log('📤 发送响应:', response.message ? response.message.substring(0, 50) + '...' : 'Processing...');
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } catch (error) {
        console.error('❌ 处理请求时出错:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return;
  }

  // 默认响应
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('人生决策宗师智能体服务器正在运行！');
});

// 启动服务器
const PORT = config.server.port;

server.listen(PORT, () => {
  console.log('========================================');
  console.log('🎉 人生决策宗师智能体已启动');
  console.log('========================================');
  console.log('📡 监听地址: http://localhost:' + PORT);
  console.log('📋 API 端点:');
  console.log('   - GET http://localhost:' + PORT + '/health (健康检查)');
  console.log('   - GET http://localhost:' + PORT + '/info (智能体信息)');
  console.log('   - GET http://localhost:' + PORT + '/prompt (提示词获取)');
  console.log('   - POST http://localhost:' + PORT + '/chat (聊天接口)');
  console.log('');
  console.log('🎯 智能体信息:');
  console.log('   - 名称:', enhancedAgent.name);
  console.log('   - 代号:', enhancedAgent.code);
  console.log('   - 角色:', enhancedAgent.role);
  console.log('   - 触发器:', enhancedAgent.triggers.join(', '));
  console.log('');
  console.log('📋 核心能力:');
  enhancedAgent.capabilities.forEach((ability, index) => {
    console.log(`   ${index + 1}. ${ability}`);
  });
  console.log('');
  console.log('💡 使用提示:');
  console.log('   - "@人生决策宗师 帮我做个人能量复盘"');
  console.log('   - "@天师 我面临一个重要决策，需要你的建议"');
  console.log('   - "@天师 帮我优化我的生活规划"');
  console.log('========================================');
});

server.on('error', (error) => {
  console.error('❌ 服务器启动失败:', error.message);
  process.exit(1);
});

// 处理SIGINT信号
process.on('SIGINT', () => {
  console.log('\n📡 正在关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});
