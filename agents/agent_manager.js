/**
 * Agent Manager
 * 代理管理器，负责初始化和管理所有 AI 代理
 */

const AgentCoordinator = require('./utils/agent_coordinator');
const { antiDegenerationLock } = require('../capabilities/anti-degeneration-lock');
const { capabilityTree } = require('../capabilities/capability-tree');

class AgentManager {
  constructor() {
    this.coordinator = AgentCoordinator;
    this.initialized = false;
  }

  /**
   * 初始化代理系统
   */
  async initialize() {
    if (this.initialized) {
      console.log('Agent system already initialized');
      return;
    }

    console.log('Initializing agent system...');

    // 反进化锁定检查
    console.log('🔒 执行反进化锁定检查...');
    const adlStatus = antiDegenerationLock.getStatus();
    console.log('反进化锁定状态:', adlStatus);
    
    // 能力树状态检查
    console.log('🌳 执行能力树状态检查...');
    const ctStatus = capabilityTree.getStatus();
    console.log('能力树状态:', ctStatus);
    
    // 创建回滚点
    console.log('🔄 创建智能体系统回滚点...');
    const initialState = {
      status: 'initializing',
      agents: ['master', 'coo', 'production', 'content', 'business', 'life'],
      capabilityTreeStatus: ctStatus
    };
    const rollbackPoint = antiDegenerationLock.createRollbackPoint(initialState);
    console.log('回滚点创建成功:', rollbackPoint.timestamp);

    // 注册核心代理
    await this.registerCoreAgents();

    // 初始化知识库
    await this.initializeKnowledgeBase();

    // 启动消息处理
    this.startMessageProcessing();

    this.initialized = true;
    console.log('Agent system initialized successfully');
  }

  /**
   * 注册核心代理
   */
  async registerCoreAgents() {
    // 注册 Master 代理
    this.coordinator.registerAgent('master', {
      name: 'master',
      role: '战略中枢',
      getStatus: () => 'active',
      receiveMessage: this.createMessageHandler('master'),
      executeTask: this.createTaskExecutor('master')
    });

    // 注册 COO 代理
    this.coordinator.registerAgent('coo', {
      name: 'coo',
      role: '运营经理',
      getStatus: () => 'active',
      receiveMessage: this.createMessageHandler('coo'),
      executeTask: this.createTaskExecutor('coo')
    });

    // 注册 Production 代理
    this.coordinator.registerAgent('production', {
      name: 'production',
      role: '生产引擎',
      getStatus: () => 'active',
      receiveMessage: this.createMessageHandler('production'),
      executeTask: this.createTaskExecutor('production')
    });

    // 注册 Content 代理
    this.coordinator.registerAgent('content', {
      name: 'content',
      role: '内容创建者',
      getStatus: () => 'active',
      receiveMessage: this.createMessageHandler('content'),
      executeTask: this.createTaskExecutor('content')
    });

    // 注册 Business 代理
    this.coordinator.registerAgent('business', {
      name: 'business',
      role: '商业哨兵',
      getStatus: () => 'active',
      receiveMessage: this.createMessageHandler('business'),
      executeTask: this.createTaskExecutor('business')
    });

    // 注册 Life 代理
    this.coordinator.registerAgent('life', {
      name: 'life',
      role: '生活决策引擎',
      getStatus: () => 'active',
      receiveMessage: this.createMessageHandler('life'),
      executeTask: this.createTaskExecutor('life')
    });
  }

  /**
   * 创建消息处理器
   * @param {string} agentName - 代理名称
   * @returns {Function} 消息处理函数
   */
  createMessageHandler(agentName) {
    return (message) => {
      console.log(`${agentName} received message:`, message.id, message.type);
      
      // 根据消息类型处理
      switch (message.type) {
        case 'command':
          this.handleCommand(agentName, message);
          break;
        case 'status_update':
          this.handleStatusUpdate(agentName, message);
          break;
        case 'info_request':
          this.handleInfoRequest(agentName, message);
          break;
        case 'collaboration_request':
          this.handleCollaborationRequest(agentName, message);
          break;
        default:
          console.log(`${agentName} received unknown message type:`, message.type);
      }
    };
  }

  /**
   * 处理命令消息
   * @param {string} agentName - 代理名称
   * @param {Object} message - 消息对象
   */
  handleCommand(agentName, message) {
    console.log(`${agentName} handling command:`, message.content.task);
    
    // 模拟命令执行
    setTimeout(() => {
      this.coordinator.sendMessage({
        type: 'status_update',
        from: agentName,
        to: message.from,
        content: {
          task_id: message.id,
          status: 'in_progress',
          progress: 50,
          message: `开始执行任务: ${message.content.task}`
        }
      });

      // 模拟任务完成
      setTimeout(() => {
        this.coordinator.sendMessage({
          type: 'status_update',
          from: agentName,
          to: message.from,
          content: {
            task_id: message.id,
            status: 'completed',
            progress: 100,
            message: `任务完成: ${message.content.task}`
          }
        });
      }, 2000);
    }, 1000);
  }

  /**
   * 处理状态更新消息
   * @param {string} agentName - 代理名称
   * @param {Object} message - 消息对象
   */
  handleStatusUpdate(agentName, message) {
    console.log(`${agentName} received status update:`, message.content);
    // 存储状态更新到知识库
    this.coordinator.storeKnowledge(
      `status_${message.from}_${message.content.task_id}`,
      message.content
    );
  }

  /**
   * 处理信息请求消息
   * @param {string} agentName - 代理名称
   * @param {Object} message - 消息对象
   */
  handleInfoRequest(agentName, message) {
    console.log(`${agentName} received info request:`, message.content.query);
    
    // 搜索知识库
    const results = this.coordinator.searchKnowledge(message.content.query);
    
    // 发送响应
    this.coordinator.sendMessage({
      type: 'info_response',
      from: agentName,
      to: message.from,
      content: {
        request_id: message.id,
        data: results,
        status: 'success',
        message: `Found ${results.length} results for: ${message.content.query}`
      }
    });
  }

  /**
   * 处理协作请求消息
   * @param {string} agentName - 代理名称
   * @param {Object} message - 消息对象
   */
  handleCollaborationRequest(agentName, message) {
    console.log(`${agentName} received collaboration request:`, message.content.description);
    
    // 模拟协作响应
    this.coordinator.sendMessage({
      type: 'status_update',
      from: agentName,
      to: message.from,
      content: {
        task_id: message.id,
        status: 'in_progress',
        progress: 0,
        message: `开始协作: ${message.content.description}`
      }
    });
  }

  /**
   * 创建任务执行器
   * @param {string} agentName - 代理名称
   * @returns {Function} 任务执行函数
   */
  createTaskExecutor(agentName) {
    return async (task) => {
      console.log(`${agentName} executing task:`, task);
      
      // 模拟任务执行
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        agent: agentName,
        task,
        result: `Task executed by ${agentName}: ${task}`,
        timestamp: new Date().toISOString()
      };
    };
  }

  /**
   * 初始化知识库
   */
  async initializeKnowledgeBase() {
    console.log('Initializing knowledge base...');

    // 存储系统知识
    this.coordinator.storeKnowledge('system_info', {
      name: 'One Person Company',
      version: '1.0',
      description: '个人公司 AI 代理系统',
      agents: ['master', 'coo', 'production', 'content', 'business', 'life']
    });

    // 存储业务知识
    this.coordinator.storeKnowledge('business_strategy', {
      core_business: ['内容创作', '咨询服务', '产品开发'],
      revenue_streams: ['被动收入', '主动收入'],
      target_market: '个人创业者和小型企业'
    });

    console.log('Knowledge base initialized');
  }

  /**
   * 启动消息处理
   */
  startMessageProcessing() {
    console.log('Starting message processing...');
    
    // 定期处理消息总线
    setInterval(() => {
      this.processMessageBus();
    }, 1000);
  }

  /**
   * 处理消息总线
   */
  processMessageBus() {
    // 消息处理逻辑已在 coordinator 中实现
  }

  /**
   * 发送命令给代理
   * @param {string} agentName - 代理名称
   * @param {string} task - 任务描述
   * @param {string} priority - 优先级
   * @returns {string} 消息 ID
   */
  sendCommand(agentName, task, priority = 'medium') {
    // 能力树路径定位
    console.log('🌳 在能力树中定位任务路径...');
    const capabilityPaths = capabilityTree.locateTaskPath(task);
    console.log('找到的能力路径:', capabilityPaths.map(p => p.path));
    
    // 标记使用的能力节点
    if (capabilityPaths.length > 0) {
      console.log('✅ 标记能力节点使用...');
      capabilityTree.markNodeUsed(capabilityPaths[0].node.id);
    } else {
      console.warn('⚠️  未找到匹配的能力路径，需要创建新能力');
      // 创建新的能力节点
      const newCapability = capabilityTree.addNode(task, 2, null, {
        inputs: ['任务描述', '执行参数'],
        outputs: ['执行结果', '执行状态'],
        prerequisites: ['代理可用', '资源充足'],
        failureBoundaries: ['代理不可用', '资源不足', '执行超时']
      });
      console.log('✅ 新能力节点创建成功:', newCapability.name);
    }
    
    // 反进化锁定检查
    console.log('🔒 检查命令是否符合反进化锁定约束...');
    
    // 验证任务描述是否包含禁用的语言模式
    if (antiDegenerationLock.containsMetaphysicsLanguage(task)) {
      console.warn('⚠️  命令包含禁用的语言模式，需要重构');
    }
    
    if (antiDegenerationLock.containsProhibitedBehavior(task)) {
      console.warn('⚠️  命令包含禁用的行为，需要修改');
    }
    
    // 验证进化是否符合要求
    const evolutionCheck = {
      success: true,
      type: 'command',
      message: task,
      capabilityPaths: capabilityPaths.map(p => p.path)
    };
    
    const validationResult = antiDegenerationLock.validateEvolution(evolutionCheck);
    if (!validationResult.valid) {
      console.error('❌ 命令验证失败:', validationResult.violations);
      console.error('🔄 执行回滚操作...');
      antiDegenerationLock.rollbackToLatest();
      throw new Error('Command validation failed: ' + validationResult.violations.join(', '));
    }
    
    console.log('✅ 命令验证通过');
    console.log('🌳 能力树使用完成');

    
    return this.coordinator.sendMessage({
      type: 'command',
      from: 'system',
      to: agentName,
      content: {
        task,
        priority,
        deadline: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
      }
    });
  }

  /**
   * 获取系统状态
   * @returns {Object} 系统状态
   */
  getSystemStatus() {
    return {
      initialized: this.initialized,
      agentStatus: this.coordinator.getAgentStatus(),
      coordinatorStatus: this.coordinator.getSystemStatus(),
      capabilityTreeStatus: capabilityTree.getStatus()
    };
  }

  /**
   * 协调多个代理完成任务
   * @param {string} task - 任务描述
   * @param {Array} agentNames - 代理名称列表
   * @returns {Promise} 协调结果
   */
  async coordinateTask(task, agentNames) {
    // 能力树路径定位
    console.log('🌳 在能力树中定位协作任务路径...');
    const capabilityPaths = capabilityTree.locateTaskPath(task);
    console.log('找到的能力路径:', capabilityPaths.map(p => p.path));
    
    // 标记使用的能力节点
    if (capabilityPaths.length > 0) {
      console.log('✅ 标记能力节点使用...');
      capabilityTree.markNodeUsed(capabilityPaths[0].node.id);
    } else {
      console.warn('⚠️  未找到匹配的能力路径，需要创建新能力');
      // 创建新的能力节点
      const newCapability = capabilityTree.addNode(task, 2, null, {
        inputs: ['任务描述', '代理列表', '执行参数'],
        outputs: ['协作结果', '执行状态', '代理反馈'],
        prerequisites: ['所有代理可用', '资源充足', '网络连接'],
        failureBoundaries: ['代理不可用', '资源不足', '网络断开', '执行超时']
      });
      console.log('✅ 新能力节点创建成功:', newCapability.name);
    }
    
    // 反进化锁定检查
    console.log('🔒 检查协作任务是否符合反进化锁定约束...');
    
    // 验证任务描述是否包含禁用的语言模式
    if (antiDegenerationLock.containsMetaphysicsLanguage(task)) {
      console.warn('⚠️  协作任务包含禁用的语言模式，需要重构');
    }
    
    if (antiDegenerationLock.containsProhibitedBehavior(task)) {
      console.warn('⚠️  协作任务包含禁用的行为，需要修改');
    }
    
    // 验证进化是否符合要求
    const evolutionCheck = {
      success: true,
      type: 'collaboration',
      message: task,
      capabilityPaths: capabilityPaths.map(p => p.path)
    };
    
    const validationResult = antiDegenerationLock.validateEvolution(evolutionCheck);
    if (!validationResult.valid) {
      console.error('❌ 协作任务验证失败:', validationResult.violations);
      console.error('🔄 执行回滚操作...');
      antiDegenerationLock.rollbackToLatest();
      throw new Error('Collaboration task validation failed: ' + validationResult.violations.join(', '));
    }
    
    console.log('✅ 协作任务验证通过');
    console.log('🌳 能力树使用完成');

    
    return this.coordinator.coordinateTask(task, agentNames);
  }

  /**
   * 搜索知识库
   * @param {string} query - 搜索查询
   * @returns {Array} 搜索结果
   */
  searchKnowledge(query) {
    return this.coordinator.searchKnowledge(query);
  }
}

// 导出单例
module.exports = new AgentManager();
