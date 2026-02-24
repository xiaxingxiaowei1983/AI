// 消息总线模块

class MessageBus {
  constructor(config = {}) {
    this.config = {
      ...config
    };
    
    this.messages = [];
    this.subscribers = new Map();
    this.nextMessageId = 1;
    this.nextSubscriptionId = 1;
  }
  
  async init() {
    console.log('🔧 初始化消息总线...');
    // 这里可以添加初始化逻辑，比如连接到消息队列服务等
    console.log('✅ 消息总线初始化完成');
  }
  
  // 发送消息
  async send(target, message, options = {}) {
    try {
      const messageId = `msg_${Date.now()}_${this.nextMessageId++}`;
      const fullMessage = {
        id: messageId,
        target,
        content: message,
        options,
        timestamp: new Date().toISOString()
      };
      
      this.messages.push(fullMessage);
      
      // 通知订阅者
      await this.notifySubscribers(target, fullMessage);
      
      return {
        messageId,
        status: 'sent',
        timestamp: fullMessage.timestamp
      };
    } catch (error) {
      console.error('❌ 发送消息失败:', error.message);
      throw error;
    }
  }
  
  // 广播消息
  async broadcast(message, options = {}) {
    try {
      const messageId = `msg_${Date.now()}_${this.nextMessageId++}`;
      const fullMessage = {
        id: messageId,
        target: 'broadcast',
        content: message,
        options,
        timestamp: new Date().toISOString()
      };
      
      this.messages.push(fullMessage);
      
      // 通知所有订阅者
      await this.notifyAllSubscribers(fullMessage);
      
      return {
        messageId,
        status: 'broadcast',
        timestamp: fullMessage.timestamp
      };
    } catch (error) {
      console.error('❌ 广播消息失败:', error.message);
      throw error;
    }
  }
  
  // 订阅消息
  async subscribe(topic, callback) {
    try {
      const subscriptionId = `sub_${Date.now()}_${this.nextSubscriptionId++}`;
      
      if (!this.subscribers.has(topic)) {
        this.subscribers.set(topic, []);
      }
      
      this.subscribers.get(topic).push({
        id: subscriptionId,
        callback
      });
      
      return {
        id: subscriptionId,
        topic,
        status: 'subscribed'
      };
    } catch (error) {
      console.error('❌ 订阅消息失败:', error.message);
      throw error;
    }
  }
  
  // 取消订阅
  async unsubscribe(subscriptionId) {
    try {
      let found = false;
      
      for (const [topic, subs] of this.subscribers.entries()) {
        const index = subs.findIndex(sub => sub.id === subscriptionId);
        if (index !== -1) {
          subs.splice(index, 1);
          found = true;
          break;
        }
      }
      
      if (!found) {
        throw new Error('订阅不存在');
      }
      
      return {
        status: 'unsubscribed',
        subscriptionId
      };
    } catch (error) {
      console.error('❌ 取消订阅失败:', error.message);
      throw error;
    }
  }
  
  // 通知订阅者
  async notifySubscribers(topic, message) {
    try {
      if (this.subscribers.has(topic)) {
        const subs = this.subscribers.get(topic);
        for (const sub of subs) {
          try {
            await sub.callback(message);
          } catch (error) {
            console.error(`❌ 通知订阅者 ${sub.id} 失败:`, error.message);
          }
        }
      }
    } catch (error) {
      console.error('❌ 通知订阅者失败:', error.message);
    }
  }
  
  // 通知所有订阅者
  async notifyAllSubscribers(message) {
    try {
      for (const [topic, subs] of this.subscribers.entries()) {
        for (const sub of subs) {
          try {
            await sub.callback(message);
          } catch (error) {
            console.error(`❌ 通知订阅者 ${sub.id} 失败:`, error.message);
          }
        }
      }
    } catch (error) {
      console.error('❌ 通知所有订阅者失败:', error.message);
    }
  }
  
  // 获取消息
  async getMessage(messageId) {
    try {
      const message = this.messages.find(msg => msg.id === messageId);
      if (!message) {
        throw new Error('消息不存在');
      }
      return message;
    } catch (error) {
      console.error('❌ 获取消息失败:', error.message);
      throw error;
    }
  }
  
  // 获取消息历史
  async getMessageHistory(options = {}) {
    try {
      let filteredMessages = [...this.messages];
      
      if (options.limit) {
        filteredMessages = filteredMessages.slice(-options.limit);
      }
      
      if (options.target) {
        filteredMessages = filteredMessages.filter(msg => msg.target === options.target);
      }
      
      return filteredMessages;
    } catch (error) {
      console.error('❌ 获取消息历史失败:', error.message);
      throw error;
    }
  }
  
  // 获取系统状态
  async getStatus() {
    try {
      return {
        messageCount: this.messages.length,
        subscriberCount: this.subscribers.size,
        status: 'active'
      };
    } catch (error) {
      console.error('❌ 获取系统状态失败:', error.message);
      return {
        messageCount: 0,
        subscriberCount: 0,
        status: 'error'
      };
    }
  }
  
  // 获取统计信息
  async getStats() {
    try {
      const stats = {
        totalMessages: this.messages.length,
        totalSubscriptions: Array.from(this.subscribers.values()).reduce((sum, subs) => sum + subs.length, 0),
        topics: Array.from(this.subscribers.keys()),
        timestamp: new Date().toISOString()
      };
      
      return stats;
    } catch (error) {
      console.error('❌ 获取统计信息失败:', error.message);
      throw error;
    }
  }
  
  // 清理消息
  async cleanup(options = {}) {
    try {
      const { maxAge = 24 * 60 * 60 * 1000, maxCount = 1000 } = options;
      
      // 清理旧消息
      const now = Date.now();
      this.messages = this.messages.filter(msg => {
        const msgTime = new Date(msg.timestamp).getTime();
        return now - msgTime < maxAge;
      });
      
      // 限制消息数量
      if (this.messages.length > maxCount) {
        this.messages = this.messages.slice(-maxCount);
      }
      
      return {
        status: 'cleaned',
        messageCount: this.messages.length
      };
    } catch (error) {
      console.error('❌ 清理消息失败:', error.message);
      throw error;
    }
  }
}

module.exports = MessageBus;