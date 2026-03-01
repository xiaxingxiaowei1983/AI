const ModelPoolManager = require('./model-pool-manager');

class SessionManager {
  constructor(modelPoolConfigPath) {
    this.modelPoolManager = new ModelPoolManager(modelPoolConfigPath);
    this.sessions = new Map();
    this.sessionCounter = 0;
  }

  // 生成会话ID
  generateSessionId() {
    this.sessionCounter++;
    return `session-${Date.now()}-${this.sessionCounter}`;
  }

  // 第一步：识别新指令与上下文的相关性
  assessContextRelevance(newMessage, context) {
    if (!context || context.length === 0) {
      return 0; // 没有上下文，相关性为0
    }

    // 简单的相关性评估算法
    // 1. 检查关键词匹配
    const newMessageLower = newMessage.toLowerCase();
    const contextLower = context.map(msg => msg.content.toLowerCase()).join(' ');
    
    // 计算关键词匹配度
    const keywords = this.extractKeywords(newMessageLower);
    let matchCount = 0;
    
    for (const keyword of keywords) {
      if (contextLower.includes(keyword)) {
        matchCount++;
      }
    }

    // 相关性得分 (0-1)
    const relevanceScore = keywords.length > 0 ? matchCount / keywords.length : 0;
    return relevanceScore;
  }

  // 提取关键词
  extractKeywords(text) {
    // 简单的关键词提取
    const stopWords = new Set([
      '的', '了', '是', '在', '我', '有', '和', '就', '不', '人', '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好', '自己', '这',
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being'
    ]);

    // 简单分词
    const words = text
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, ' ')
      .split(' ')
      .filter(word => word.length > 1 && !stopWords.has(word));

    return [...new Set(words)]; // 去重
  }

  // 第二步：检查新会话任务并匹配模型池
  determineTaskType(message) {
    const messageLower = message.toLowerCase();

    // 任务类型判断规则
    if (messageLower.includes('分析') || messageLower.includes('研究') || messageLower.includes('探讨')) {
      return 'complex_reasoning';
    }
    if (messageLower.includes('写') || messageLower.includes('创作') || messageLower.includes('设计')) {
      return 'creative_writing';
    }
    if (messageLower.includes('文档') || messageLower.includes('文本') || messageLower.includes('处理')) {
      return 'document_processing';
    }
    if (messageLower.includes('图片') || messageLower.includes('视频') || messageLower.includes('多模态')) {
      return 'multi_modal';
    }
    if (messageLower.includes('问题') || messageLower.includes('什么') || messageLower.includes('怎么')) {
      return 'basic_question';
    }
    
    // 默认会话类型
    return 'conversation';
  }

  // 处理新消息
  processMessage(message, sessionId = null) {
    let currentSession;
    let newSessionCreated = false;

    // 如果提供了会话ID，尝试获取现有会话
    if (sessionId && this.sessions.has(sessionId)) {
      currentSession = this.sessions.get(sessionId);
      
      // 评估新消息与上下文的相关性
      const relevance = this.assessContextRelevance(message, currentSession.messages);
      
      if (relevance < 0.3) { // 相关性阈值
        // 开启新会话
        currentSession = this.createNewSession(message);
        newSessionCreated = true;
      } else {
        // 保持现有会话
        currentSession.messages.push({ role: 'user', content: message });
      }
    } else {
      // 创建新会话
      currentSession = this.createNewSession(message);
      newSessionCreated = true;
    }

    // 确定任务类型
    const taskType = this.determineTaskType(message);
    
    // 匹配模型池
    const poolName = this.modelPoolManager.getPoolForTask(taskType);
    const model = this.modelPoolManager.getAvailableModel(poolName);

    // 更新会话信息
    currentSession.taskType = taskType;
    currentSession.poolName = poolName;
    currentSession.model = model;

    // 生成输出信息
    let output = '';
    if (newSessionCreated) {
      output = `当前任务属于 ${this.getTaskTypeName(taskType)}，应该使用 ${this.getPoolTypeName(poolName)}，已经开启新会话`;
    }

    return {
      sessionId: currentSession.id,
      session: currentSession,
      output: output,
      taskType: taskType,
      poolName: poolName,
      model: model
    };
  }

  // 创建新会话
  createNewSession(initialMessage) {
    const sessionId = this.generateSessionId();
    const session = {
      id: sessionId,
      created: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      messages: [
        { role: 'user', content: initialMessage }
      ],
      taskType: null,
      poolName: null,
      model: null
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  // 获取会话
  getSession(sessionId) {
    return this.sessions.get(sessionId);
  }

  // 更新会话
  updateSession(sessionId, updates) {
    const session = this.sessions.get(sessionId);
    if (session) {
      Object.assign(session, updates);
      session.lastActivity = new Date().toISOString();
      this.sessions.set(sessionId, session);
      return true;
    }
    return false;
  }

  // 添加消息到会话
  addMessage(sessionId, role, content) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.messages.push({ role, content });
      session.lastActivity = new Date().toISOString();
      this.sessions.set(sessionId, session);
      return true;
    }
    return false;
  }

  // 清理过期会话
  cleanupExpiredSessions(expiryTime = 24 * 60 * 60 * 1000) { // 默认24小时
    const now = Date.now();
    const expiredSessions = [];

    for (const [sessionId, session] of this.sessions.entries()) {
      const lastActivity = new Date(session.lastActivity).getTime();
      if (now - lastActivity > expiryTime) {
        expiredSessions.push(sessionId);
      }
    }

    for (const sessionId of expiredSessions) {
      this.sessions.delete(sessionId);
      console.log(`清理过期会话: ${sessionId}`);
    }

    return expiredSessions.length;
  }

  // 获取任务类型的中文名称
  getTaskTypeName(taskType) {
    const taskTypeNames = {
      'conversation': '日常对话',
      'basic_question': '基础问题',
      'complex_reasoning': '复杂推理',
      'creative_writing': '创意写作',
      'text_analysis': '文本分析',
      'document_processing': '文档处理',
      'multi_modal': '多模态任务'
    };
    return taskTypeNames[taskType] || taskType;
  }

  // 获取模型池的中文名称
  getPoolTypeName(poolName) {
    const poolTypeNames = {
      'highSpeed': '高速池',
      'intelligent': '智能池',
      'text': '文本池'
    };
    return poolTypeNames[poolName] || poolName;
  }

  // 获取所有会话
  getAllSessions() {
    return Array.from(this.sessions.values());
  }

  // 获取会话数量
  getSessionCount() {
    return this.sessions.size;
  }
}

// 导出模块
module.exports = SessionManager;

// 如果直接运行
if (require.main === module) {
  const manager = new SessionManager('./model-pool-config.json');
  
  // 测试会话处理
  console.log('测试会话处理:');
  console.log('====================================');
  
  // 第一次消息
  const result1 = manager.processMessage('你好，今天天气怎么样？');
  console.log('第一次消息处理结果:');
  console.log('会话ID:', result1.sessionId);
  console.log('输出:', result1.output);
  console.log('任务类型:', result1.taskType);
  console.log('模型池:', result1.poolName);
  console.log('使用模型:', result1.model ? result1.model.name : '无');
  console.log('');
  
  // 相关消息
  const result2 = manager.processMessage('今天会下雨吗？', result1.sessionId);
  console.log('相关消息处理结果:');
  console.log('会话ID:', result2.sessionId);
  console.log('输出:', result2.output);
  console.log('任务类型:', result2.taskType);
  console.log('模型池:', result2.poolName);
  console.log('');
  
  // 不相关消息
  const result3 = manager.processMessage('帮我分析一下当前的经济形势', result1.sessionId);
  console.log('不相关消息处理结果:');
  console.log('会话ID:', result3.sessionId);
  console.log('输出:', result3.output);
  console.log('任务类型:', result3.taskType);
  console.log('模型池:', result3.poolName);
  console.log('使用模型:', result3.model ? result3.model.name : '无');
  console.log('');
  
  // 检查会话数量
  console.log('当前会话数量:', manager.getSessionCount());
  
  // 测试清理过期会话
  console.log('清理过期会话:', manager.cleanupExpiredSessions(0)); // 清理所有会话
  console.log('清理后会话数量:', manager.getSessionCount());
  
  console.log('====================================');
  console.log('测试完成');
}
