// 通信系统主模块

class CommunicationSystem {
  constructor(config = {}) {
    this.config = {
      ...config
    };
    
    this.messageBus = null;
    this.protocolAdapter = null;
    this.securityGateway = null;
    
    this.init();
  }
  
  async init() {
    console.log('🔧 初始化通信系统...');
    
    // 加载各个子模块
    const MessageBus = require('./message-bus');
    const ProtocolAdapter = require('./protocol-adapter');
    const SecurityGateway = require('./security-gateway');
    
    this.messageBus = new MessageBus(this.config);
    this.protocolAdapter = new ProtocolAdapter(this.config);
    this.securityGateway = new SecurityGateway(this.config);
    
    // 初始化各个模块
    await this.messageBus.init();
    await this.protocolAdapter.init();
    await this.securityGateway.init();
    
    console.log('✅ 通信系统初始化完成');
  }
  
  // 设置外部依赖
  setDependencies(memorySystem, schedulerSystem, monitoringSystem) {
    this.memorySystem = memorySystem;
    this.schedulerSystem = schedulerSystem;
    this.monitoringSystem = monitoringSystem;
  }
  
  // 系统生命周期方法
  async start() {
    console.log('🚀 启动通信系统...');
    // 通信系统启动不需要特殊操作
    console.log('✅ 通信系统启动完成');
  }
  
  async stop() {
    console.log('⏹️  停止通信系统...');
    // 通信系统停止不需要特殊操作
    console.log('✅ 通信系统停止完成');
  }
  
  // 发送消息
  async sendMessage(target, message, options = {}) {
    try {
      console.log(`📤 发送消息到: ${target}`);
      
      // 安全检查
      const securityCheck = await this.securityGateway.checkMessage(message);
      if (!securityCheck.allowed) {
        throw new Error(`消息被安全网关拒绝: ${securityCheck.reason}`);
      }
      
      // 协议适配
      const adaptedMessage = await this.protocolAdapter.adaptOutgoingMessage(message);
      
      // 发送消息
      const result = await this.messageBus.send(target, adaptedMessage, options);
      
      console.log(`✅ 消息发送成功: ${result.messageId}`);
      return result;
    } catch (error) {
      console.error('❌ 发送消息失败:', error.message);
      throw error;
    }
  }
  
  // 接收消息
  async receiveMessage(message) {
    try {
      console.log(`📥 接收消息: ${message.id || '未命名消息'}`);
      
      // 安全检查
      const securityCheck = await this.securityGateway.checkMessage(message);
      if (!securityCheck.allowed) {
        throw new Error(`消息被安全网关拒绝: ${securityCheck.reason}`);
      }
      
      // 协议适配
      const adaptedMessage = await this.protocolAdapter.adaptIncomingMessage(message);
      
      // 处理消息
      const result = await this.handleMessage(adaptedMessage);
      
      console.log(`✅ 消息接收处理成功: ${message.id || '未命名消息'}`);
      return result;
    } catch (error) {
      console.error('❌ 接收消息失败:', error.message);
      throw error;
    }
  }
  
  // 处理消息
  async handleMessage(message) {
    try {
      const { type, content, sender, context } = message;
      
      console.log(`🔄 处理消息类型: ${type}`);
      
      switch (type) {
        case 'task_assignment':
          return await this.handleTaskAssignment(message);
        case 'task_confirmation':
          return await this.handleTaskConfirmation(message);
        case 'status_update':
          return await this.handleStatusUpdate(message);
        case 'task_result':
          return await this.handleTaskResult(message);
        case 'agent_registration':
          return await this.handleAgentRegistration(message);
        case 'agent_status':
          return await this.handleAgentStatus(message);
        case 'system_message':
          return await this.handleSystemMessage(message);
        default:
          return await this.handleUnknownMessage(message);
      }
    } catch (error) {
      console.error('❌ 处理消息失败:', error.message);
      throw error;
    }
  }
  
  // 处理任务分配消息
  async handleTaskAssignment(message) {
    try {
      const { taskId, agentId, content, context } = message;
      
      // 这里可以添加任务分配的处理逻辑
      // 例如：通知智能体任务分配，更新任务状态等
      
      console.log(`✅ 处理任务分配: ${taskId} → ${agentId}`);
      
      return {
        success: true,
        message: '任务分配处理成功',
        taskId,
        agentId
      };
    } catch (error) {
      console.error('❌ 处理任务分配失败:', error.message);
      throw error;
    }
  }
  
  // 处理任务确认消息
  async handleTaskConfirmation(message) {
    try {
      const { taskId, agentId, status, content, context } = message;
      
      // 这里可以添加任务确认的处理逻辑
      // 例如：更新任务状态，记录确认信息等
      
      console.log(`✅ 处理任务确认: ${taskId} - ${status}`);
      
      return {
        success: true,
        message: '任务确认处理成功',
        taskId,
        status
      };
    } catch (error) {
      console.error('❌ 处理任务确认失败:', error.message);
      throw error;
    }
  }
  
  // 处理状态更新消息
  async handleStatusUpdate(message) {
    try {
      const { agentId, status, workload, content, context } = message;
      
      // 这里可以添加状态更新的处理逻辑
      // 例如：更新智能体状态，调整任务分配等
      
      console.log(`✅ 处理状态更新: ${agentId} - ${status}`);
      
      return {
        success: true,
        message: '状态更新处理成功',
        agentId,
        status
      };
    } catch (error) {
      console.error('❌ 处理状态更新失败:', error.message);
      throw error;
    }
  }
  
  // 处理任务结果消息
  async handleTaskResult(message) {
    try {
      const { taskId, agentId, success, result, content, context } = message;
      
      // 这里可以添加任务结果的处理逻辑
      // 例如：更新任务状态，处理结果数据等
      
      console.log(`✅ 处理任务结果: ${taskId} - ${success ? '成功' : '失败'}`);
      
      return {
        success: true,
        message: '任务结果处理成功',
        taskId,
        success
      };
    } catch (error) {
      console.error('❌ 处理任务结果失败:', error.message);
      throw error;
    }
  }
  
  // 处理智能体注册消息
  async handleAgentRegistration(message) {
    try {
      const { agentId, agentInfo, content, context } = message;
      
      // 这里可以添加智能体注册的处理逻辑
      // 例如：注册新智能体，更新智能体信息等
      
      console.log(`✅ 处理智能体注册: ${agentId}`);
      
      return {
        success: true,
        message: '智能体注册处理成功',
        agentId
      };
    } catch (error) {
      console.error('❌ 处理智能体注册失败:', error.message);
      throw error;
    }
  }
  
  // 处理智能体状态消息
  async handleAgentStatus(message) {
    try {
      const { agentId, status, capabilities, content, context } = message;
      
      // 这里可以添加智能体状态的处理逻辑
      // 例如：更新智能体状态，调整任务分配等
      
      console.log(`✅ 处理智能体状态: ${agentId} - ${status}`);
      
      return {
        success: true,
        message: '智能体状态处理成功',
        agentId,
        status
      };
    } catch (error) {
      console.error('❌ 处理智能体状态失败:', error.message);
      throw error;
    }
  }
  
  // 处理系统消息
  async handleSystemMessage(message) {
    try {
      const { content, context } = message;
      
      // 这里可以添加系统消息的处理逻辑
      // 例如：处理系统通知，更新系统状态等
      
      console.log(`✅ 处理系统消息`);
      
      return {
        success: true,
        message: '系统消息处理成功'
      };
    } catch (error) {
      console.error('❌ 处理系统消息失败:', error.message);
      throw error;
    }
  }
  
  // 处理未知消息
  async handleUnknownMessage(message) {
    try {
      const { type } = message;
      
      console.log(`⚠️  处理未知消息类型: ${type}`);
      
      return {
        success: true,
        message: '未知消息类型处理成功',
        type
      };
    } catch (error) {
      console.error('❌ 处理未知消息失败:', error.message);
      throw error;
    }
  }
  
  // 订阅消息
  async subscribe(topic, callback) {
    try {
      console.log(`🔔 订阅主题: ${topic}`);
      
      const subscription = await this.messageBus.subscribe(topic, callback);
      
      console.log(`✅ 订阅成功: ${subscription.id}`);
      return subscription;
    } catch (error) {
      console.error('❌ 订阅失败:', error.message);
      throw error;
    }
  }
  
  // 取消订阅
  async unsubscribe(subscriptionId) {
    try {
      console.log(`🔕 取消订阅: ${subscriptionId}`);
      
      const result = await this.messageBus.unsubscribe(subscriptionId);
      
      console.log(`✅ 取消订阅成功`);
      return result;
    } catch (error) {
      console.error('❌ 取消订阅失败:', error.message);
      throw error;
    }
  }
  
  // 广播消息
  async broadcast(message, options = {}) {
    try {
      console.log(`📢 广播消息`);
      
      // 安全检查
      const securityCheck = await this.securityGateway.checkMessage(message);
      if (!securityCheck.allowed) {
        throw new Error(`消息被安全网关拒绝: ${securityCheck.reason}`);
      }
      
      // 协议适配
      const adaptedMessage = await this.protocolAdapter.adaptOutgoingMessage(message);
      
      // 广播消息
      const result = await this.messageBus.broadcast(adaptedMessage, options);
      
      console.log(`✅ 广播成功: ${result.messageId}`);
      return result;
    } catch (error) {
      console.error('❌ 广播失败:', error.message);
      throw error;
    }
  }
  
  // 获取系统状态
  async getStatus() {
    try {
      const messageBusStatus = await this.messageBus.getStatus();
      const protocolAdapterStatus = await this.protocolAdapter.getStatus();
      const securityGatewayStatus = await this.securityGateway.getStatus();
      
      return {
        messageBus: messageBusStatus,
        protocolAdapter: protocolAdapterStatus,
        securityGateway: securityGatewayStatus,
        status: 'active'
      };
    } catch (error) {
      console.error('❌ 获取系统状态失败:', error.message);
      return {
        messageBus: {},
        protocolAdapter: {},
        securityGateway: {},
        status: 'error'
      };
    }
  }
  
  // 备份系统
  async backup() {
    try {
      console.log('💾 备份通信系统...');
      
      const backupData = {
        messageBus: await this.messageBus.getStats(),
        protocolAdapter: await this.protocolAdapter.getStats(),
        securityGateway: await this.securityGateway.getStats(),
        timestamp: new Date().toISOString()
      };
      
      console.log('✅ 通信系统备份完成');
      return backupData;
    } catch (error) {
      console.error('❌ 备份通信系统失败:', error.message);
      throw error;
    }
  }
}

module.exports = CommunicationSystem;
