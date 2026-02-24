// 安全网关模块

class SecurityGateway {
  constructor(config = {}) {
    this.config = {
      ...config,
      allowedAgents: config.allowedAgents || [],
      allowedMessageTypes: config.allowedMessageTypes || [
        'task_assignment',
        'task_confirmation',
        'status_update',
        'task_result',
        'agent_registration',
        'agent_status',
        'system_message'
      ],
      maxMessageSize: config.maxMessageSize || 1024 * 1024 // 1MB
    };
    
    this.blockedAgents = new Set();
    this.messageCounter = new Map();
    this.rateLimits = new Map();
  }
  
  async init() {
    console.log('🔧 初始化安全网关...');
    // 这里可以添加初始化逻辑，比如加载安全规则等
    console.log('✅ 安全网关初始化完成');
  }
  
  // 检查消息
  async checkMessage(message) {
    try {
      // 检查消息大小
      const sizeCheck = this.checkMessageSize(message);
      if (!sizeCheck.allowed) {
        return sizeCheck;
      }
      
      // 检查消息类型
      const typeCheck = this.checkMessageType(message);
      if (!typeCheck.allowed) {
        return typeCheck;
      }
      
      // 检查发送者
      const senderCheck = this.checkSender(message);
      if (!senderCheck.allowed) {
        return senderCheck;
      }
      
      // 检查消息内容
      const contentCheck = this.checkMessageContent(message);
      if (!contentCheck.allowed) {
        return contentCheck;
      }
      
      // 检查速率限制
      const rateCheck = this.checkRateLimit(message);
      if (!rateCheck.allowed) {
        return rateCheck;
      }
      
      // 检查消息格式
      const formatCheck = this.checkMessageFormat(message);
      if (!formatCheck.allowed) {
        return formatCheck;
      }
      
      return {
        allowed: true,
        message: '消息检查通过'
      };
    } catch (error) {
      console.error('❌ 检查消息失败:', error.message);
      return {
        allowed: false,
        reason: '消息检查过程中发生错误'
      };
    }
  }
  
  // 检查消息大小
  checkMessageSize(message) {
    try {
      const messageString = JSON.stringify(message);
      const messageSize = messageString.length;
      
      if (messageSize > this.config.maxMessageSize) {
        return {
          allowed: false,
          reason: `消息大小超过限制 ${this.config.maxMessageSize} 字节`
        };
      }
      
      return {
        allowed: true
      };
    } catch (error) {
      console.error('❌ 检查消息大小失败:', error.message);
      return {
        allowed: false,
        reason: '消息大小检查失败'
      };
    }
  }
  
  // 检查消息类型
  checkMessageType(message) {
    try {
      const messageType = message.type;
      
      if (!messageType) {
        return {
          allowed: false,
          reason: '消息类型不能为空'
        };
      }
      
      if (!this.config.allowedMessageTypes.includes(messageType)) {
        return {
          allowed: false,
          reason: `不允许的消息类型: ${messageType}`
        };
      }
      
      return {
        allowed: true
      };
    } catch (error) {
      console.error('❌ 检查消息类型失败:', error.message);
      return {
        allowed: false,
        reason: '消息类型检查失败'
      };
    }
  }
  
  // 检查发送者
  checkSender(message) {
    try {
      const sender = message.sender || message.from;
      
      if (!sender) {
        return {
          allowed: false,
          reason: '消息发送者不能为空'
        };
      }
      
      if (this.blockedAgents.has(sender)) {
        return {
          allowed: false,
          reason: `发送者已被阻止: ${sender}`
        };
      }
      
      // 如果配置了允许的智能体列表，则检查发送者是否在列表中
      if (this.config.allowedAgents.length > 0 && !this.config.allowedAgents.includes(sender)) {
        return {
          allowed: false,
          reason: `发送者不在允许列表中: ${sender}`
        };
      }
      
      return {
        allowed: true
      };
    } catch (error) {
      console.error('❌ 检查发送者失败:', error.message);
      return {
        allowed: false,
        reason: '发送者检查失败'
      };
    }
  }
  
  // 检查消息内容
  checkMessageContent(message) {
    try {
      // 这里可以添加消息内容检查逻辑，比如检查是否包含恶意代码等
      
      // 检查消息是否包含敏感信息
      const sensitivePatterns = [
        /password/i,
        /secret/i,
        /token/i,
        /key/i,
        /credential/i
      ];
      
      const messageString = JSON.stringify(message);
      
      for (const pattern of sensitivePatterns) {
        if (pattern.test(messageString)) {
          return {
            allowed: false,
            reason: '消息可能包含敏感信息'
          };
        }
      }
      
      return {
        allowed: true
      };
    } catch (error) {
      console.error('❌ 检查消息内容失败:', error.message);
      return {
        allowed: false,
        reason: '消息内容检查失败'
      };
    }
  }
  
  // 检查速率限制
  checkRateLimit(message) {
    try {
      const sender = message.sender || message.from;
      
      if (!sender) {
        return {
          allowed: true
        };
      }
      
      const now = Date.now();
      const windowMs = 60 * 1000; // 1分钟
      const maxRequests = 60; // 每分钟最多60个请求
      
      if (!this.rateLimits.has(sender)) {
        this.rateLimits.set(sender, []);
      }
      
      const timestamps = this.rateLimits.get(sender);
      
      // 移除过期的时间戳
      const recentTimestamps = timestamps.filter(timestamp => now - timestamp < windowMs);
      this.rateLimits.set(sender, recentTimestamps);
      
      if (recentTimestamps.length >= maxRequests) {
        return {
          allowed: false,
          reason: '发送速率超过限制'
        };
      }
      
      // 添加当前时间戳
      this.rateLimits.set(sender, [...recentTimestamps, now]);
      
      return {
        allowed: true
      };
    } catch (error) {
      console.error('❌ 检查速率限制失败:', error.message);
      return {
        allowed: true
      };
    }
  }
  
  // 检查消息格式
  checkMessageFormat(message) {
    try {
      // 检查消息是否为对象
      if (typeof message !== 'object' || message === null) {
        return {
          allowed: false,
          reason: '消息必须是对象'
        };
      }
      
      // 检查消息是否包含必要字段
      if (message.type && typeof message.type !== 'string') {
        return {
          allowed: false,
          reason: '消息类型必须是字符串'
        };
      }
      
      if (message.sender && typeof message.sender !== 'string') {
        return {
          allowed: false,
          reason: '发送者必须是字符串'
        };
      }
      
      return {
        allowed: true
      };
    } catch (error) {
      console.error('❌ 检查消息格式失败:', error.message);
      return {
        allowed: false,
        reason: '消息格式检查失败'
      };
    }
  }
  
  // 阻止智能体
  blockAgent(agentId) {
    try {
      this.blockedAgents.add(agentId);
      console.log(`⛔ 阻止智能体: ${agentId}`);
      return true;
    } catch (error) {
      console.error('❌ 阻止智能体失败:', error.message);
      return false;
    }
  }
  
  // 解除智能体阻止
  unblockAgent(agentId) {
    try {
      this.blockedAgents.delete(agentId);
      console.log(`✅ 解除智能体阻止: ${agentId}`);
      return true;
    } catch (error) {
      console.error('❌ 解除智能体阻止失败:', error.message);
      return false;
    }
  }
  
  // 添加允许的智能体
  addAllowedAgent(agentId) {
    try {
      if (!this.config.allowedAgents.includes(agentId)) {
        this.config.allowedAgents.push(agentId);
        console.log(`✅ 添加允许的智能体: ${agentId}`);
      }
      return true;
    } catch (error) {
      console.error('❌ 添加允许的智能体失败:', error.message);
      return false;
    }
  }
  
  // 移除允许的智能体
  removeAllowedAgent(agentId) {
    try {
      const index = this.config.allowedAgents.indexOf(agentId);
      if (index !== -1) {
        this.config.allowedAgents.splice(index, 1);
        console.log(`✅ 移除允许的智能体: ${agentId}`);
      }
      return true;
    } catch (error) {
      console.error('❌ 移除允许的智能体失败:', error.message);
      return false;
    }
  }
  
  // 获取系统状态
  async getStatus() {
    try {
      return {
        blockedAgents: Array.from(this.blockedAgents),
        allowedAgents: this.config.allowedAgents,
        allowedMessageTypes: this.config.allowedMessageTypes,
        maxMessageSize: this.config.maxMessageSize,
        rateLimits: Array.from(this.rateLimits.entries()).map(([agent, timestamps]) => ({
          agent,
          messageCount: timestamps.length
        })),
        status: 'active'
      };
    } catch (error) {
      console.error('❌ 获取系统状态失败:', error.message);
      return {
        blockedAgents: [],
        allowedAgents: [],
        allowedMessageTypes: [],
        maxMessageSize: 0,
        rateLimits: [],
        status: 'error'
      };
    }
  }
  
  // 获取统计信息
  async getStats() {
    try {
      const stats = {
        blockedAgents: this.blockedAgents.size,
        allowedAgents: this.config.allowedAgents.length,
        allowedMessageTypes: this.config.allowedMessageTypes.length,
        messageChecks: this.messageCounter.size,
        timestamp: new Date().toISOString()
      };
      
      return stats;
    } catch (error) {
      console.error('❌ 获取统计信息失败:', error.message);
      throw error;
    }
  }
}

module.exports = SecurityGateway;