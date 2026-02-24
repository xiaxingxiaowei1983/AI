/**
 * Agent Coordinator
 * 代理协调器，负责管理代理间的通信和协作
 */

class AgentCoordinator {
  constructor() {
    this.agents = new Map();
    this.messages = new Map();
    this.messageBus = [];
    this.knowledgeBase = {};
    // 新增：消息优先级队列
    this.priorityQueues = {
      high: [],
      medium: [],
      low: []
    };
    // 新增：智能体状态监控
    this.agentStatus = new Map();
    // 新增：协作会话管理
    this.collaborationSessions = new Map();
    // 新增：消息处理统计
    this.stats = {
      messagesProcessed: 0,
      messagesFailed: 0,
      collaborationSessions: 0,
      lastUpdated: Date.now()
    };
  }

  /**
   * 注册代理
   * @param {string} name - 代理名称
   * @param {Object} agent - 代理实例
   */
  registerAgent(name, agent) {
    this.agents.set(name, agent);
    console.log(`Agent ${name} registered successfully`);
  }

  /**
   * 发送消息
   * @param {Object} message - 消息对象
   */
  sendMessage(message) {
    const messageId = message.id || this.generateMessageId();
    const timestamp = message.timestamp || new Date().toISOString();
    const priority = message.priority || 'medium'; // 新增：消息优先级

    const fullMessage = {
      ...message,
      id: messageId,
      timestamp,
      priority
    };

    // 存储消息
    this.messages.set(messageId, fullMessage);
    this.messageBus.push(fullMessage);

    // 根据优先级添加到队列
    if (this.priorityQueues[priority]) {
      this.priorityQueues[priority].push(fullMessage);
    } else {
      this.priorityQueues.medium.push(fullMessage);
    }

    // 处理消息
    this.processMessage(fullMessage);

    // 更新统计
    this.stats.messagesProcessed++;
    this.stats.lastUpdated = Date.now();

    return messageId;
  }

  /**
   * 处理优先级消息队列
   */
  processPriorityQueues() {
    // 按优先级顺序处理消息
    const priorities = ['high', 'medium', 'low'];
    
    for (const priority of priorities) {
      const queue = this.priorityQueues[priority];
      while (queue.length > 0) {
        const message = queue.shift();
        this.processMessage(message);
      }
    }
  }

  /**
   * 启动消息队列处理器
   */
  startQueueProcessor() {
    setInterval(() => {
      this.processPriorityQueues();
    }, 500); // 每500ms处理一次队列
  }

  /**
   * 创建协作会话
   * @param {string} sessionId - 会话ID
   * @param {Array} agentNames - 参与智能体列表
   * @param {string} task - 任务描述
   */
  createCollaborationSession(sessionId, agentNames, task) {
    const session = {
      id: sessionId,
      agents: agentNames,
      task,
      startTime: new Date().toISOString(),
      status: 'active',
      messages: [],
      results: []
    };
    
    this.collaborationSessions.set(sessionId, session);
    this.stats.collaborationSessions++;
    
    console.log(`Collaboration session ${sessionId} created with agents: ${agentNames.join(', ')}`);
    return session;
  }

  /**
   * 更新智能体状态
   * @param {string} agentName - 智能体名称
   * @param {Object} status - 状态信息
   */
  updateAgentStatus(agentName, status) {
    this.agentStatus.set(agentName, {
      ...status,
      lastUpdated: new Date().toISOString()
    });
  }

  /**
   * 获取智能体健康状态
   * @returns {Object} 健康状态报告
   */
  getAgentHealthStatus() {
    const healthStatus = {};
    
    this.agents.forEach((agent, name) => {
      const status = this.agentStatus.get(name) || { status: 'unknown' };
      healthStatus[name] = {
        status: status.status,
        lastUpdated: status.lastUpdated,
        responseTime: status.responseTime || 'N/A'
      };
    });
    
    return healthStatus;
  }

  /**
   * 处理消息
   * @param {Object} message - 消息对象
   */
  processMessage(message) {
    const { to, type } = message;

    // 广播消息
    if (to === 'broadcast') {
      this.agents.forEach((agent, name) => {
        this.deliverMessage(name, message);
      });
    } 
    // 定向消息
    else if (this.agents.has(to)) {
      this.deliverMessage(to, message);
    } else {
      console.warn(`Agent ${to} not found, message discarded`);
    }
  }

  /**
   * 传递消息给代理
   * @param {string} agentName - 代理名称
   * @param {Object} message - 消息对象
   */
  deliverMessage(agentName, message) {
    const agent = this.agents.get(agentName);
    if (agent && agent.receiveMessage) {
      try {
        agent.receiveMessage(message);
        console.log(`Message ${message.id} delivered to ${agentName}`);
      } catch (error) {
        console.error(`Error delivering message to ${agentName}:`, error);
      }
    }
  }

  /**
   * 生成消息 ID
   * @returns {string} 唯一消息 ID
   */
  generateMessageId() {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 查询消息
   * @param {string} messageId - 消息 ID
   * @returns {Object|null} 消息对象
   */
  getMessage(messageId) {
    return this.messages.get(messageId) || null;
  }

  /**
   * 获取代理状态
   * @returns {Object} 所有代理状态
   */
  getAgentStatus() {
    const status = {};
    this.agents.forEach((agent, name) => {
      status[name] = agent.getStatus ? agent.getStatus() : 'unknown';
    });
    return status;
  }

  /**
   * 协调多个代理完成任务
   * @param {string} task - 任务描述
   * @param {Array} agentNames - 参与代理名称列表
   * @returns {Promise} 协调结果
   */
  async coordinateTask(task, agentNames) {
    const agents = agentNames.map(name => this.agents.get(name)).filter(Boolean);
    
    if (agents.length === 0) {
      return { success: false, message: 'No agents found' };
    }

    // 分配子任务
    const subtasks = this.splitTask(task, agents.length);
    const results = [];

    // 并行执行子任务
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      const subtask = subtasks[i];
      
      try {
        const result = await agent.executeTask(subtask);
        results.push(result);
      } catch (error) {
        results.push({ error: error.message });
      }
    }

    // 整合结果
    const finalResult = this.mergeResults(results);
    return { success: true, result: finalResult };
  }

  /**
   * 拆分任务
   * @param {string} task - 任务描述
   * @param {number} count - 拆分数量
   * @returns {Array} 子任务列表
   */
  splitTask(task, count) {
    const subtasks = [];
    for (let i = 0; i < count; i++) {
      subtasks.push(`${task} (Part ${i + 1}/${count})`);
    }
    return subtasks;
  }

  /**
   * 合并结果
   * @param {Array} results - 结果列表
   * @returns {Object} 合并后的结果
   */
  mergeResults(results) {
    return results.reduce((merged, result) => {
      if (result.error) {
        merged.errors = [...(merged.errors || []), result.error];
      } else {
        merged.data = [...(merged.data || []), result];
      }
      return merged;
    }, {});
  }

  /**
   * 存储知识到知识库
   * @param {string} key - 知识键
   * @param {any} value - 知识值
   */
  storeKnowledge(key, value) {
    this.knowledgeBase[key] = {
      value,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * 从知识库获取知识
   * @param {string} key - 知识键
   * @returns {any} 知识值
   */
  getKnowledge(key) {
    return this.knowledgeBase[key]?.value;
  }

  /**
   * 搜索知识库
   * @param {string} query - 搜索查询
   * @returns {Array} 搜索结果
   */
  searchKnowledge(query) {
    const results = [];
    for (const [key, { value }] of Object.entries(this.knowledgeBase)) {
      if (key.includes(query) || JSON.stringify(value).includes(query)) {
        results.push({ key, value });
      }
    }
    return results;
  }

  /**
   * 获取系统状态
   * @returns {Object} 系统状态
   */
  getSystemStatus() {
    return {
      agents: Array.from(this.agents.keys()),
      messages: this.messages.size,
      messageBus: this.messageBus.length,
      knowledgeBase: Object.keys(this.knowledgeBase).length
    };
  }
}

// 导出单例
module.exports = new AgentCoordinator();
