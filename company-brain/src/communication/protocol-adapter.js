// 协议适配器模块

class ProtocolAdapter {
  constructor(config = {}) {
    this.config = {
      ...config
    };
    
    this.protocols = {
      json: this.adaptJson.bind(this),
      xml: this.adaptXml.bind(this),
      yaml: this.adaptYaml.bind(this),
      custom: this.adaptCustom.bind(this)
    };
  }
  
  async init() {
    console.log('🔧 初始化协议适配器...');
    // 这里可以添加初始化逻辑，比如加载协议定义等
    console.log('✅ 协议适配器初始化完成');
  }
  
  // 适配外出消息
  async adaptOutgoingMessage(message) {
    try {
      const protocol = message.protocol || 'json';
      
      if (this.protocols[protocol]) {
        return await this.protocols[protocol](message);
      } else {
        return await this.protocols.json(message);
      }
    } catch (error) {
      console.error('❌ 适配外出消息失败:', error.message);
      throw error;
    }
  }
  
  // 适配进入消息
  async adaptIncomingMessage(message) {
    try {
      // 检测消息格式
      const protocol = this.detectProtocol(message);
      
      if (this.protocols[protocol]) {
        return await this.protocols[protocol](message);
      } else {
        return await this.protocols.json(message);
      }
    } catch (error) {
      console.error('❌ 适配进入消息失败:', error.message);
      throw error;
    }
  }
  
  // 检测消息协议
  detectProtocol(message) {
    try {
      if (typeof message === 'string') {
        // 尝试解析为JSON
        try {
          JSON.parse(message);
          return 'json';
        } catch {
          // 尝试检测XML
          if (message.startsWith('<') && message.endsWith('>')) {
            return 'xml';
          }
          // 尝试检测YAML
          if (message.includes(': ') && !message.includes('{') && !message.includes('}')) {
            return 'yaml';
          }
        }
      } else if (typeof message === 'object' && message !== null) {
        return 'json';
      }
      
      return 'custom';
    } catch (error) {
      console.error('❌ 检测消息协议失败:', error.message);
      return 'json';
    }
  }
  
  // 适配JSON消息
  async adaptJson(message) {
    try {
      if (typeof message === 'string') {
        return JSON.parse(message);
      } else if (typeof message === 'object' && message !== null) {
        return message;
      } else {
        return { content: message };
      }
    } catch (error) {
      console.error('❌ 适配JSON消息失败:', error.message);
      throw error;
    }
  }
  
  // 适配XML消息
  async adaptXml(message) {
    try {
      if (typeof message === 'string') {
        // 这里可以添加XML解析逻辑
        // 简化实现，实际项目中可以使用xml2js等库
        return { content: message, format: 'xml' };
      } else {
        return message;
      }
    } catch (error) {
      console.error('❌ 适配XML消息失败:', error.message);
      throw error;
    }
  }
  
  // 适配YAML消息
  async adaptYaml(message) {
    try {
      if (typeof message === 'string') {
        // 这里可以添加YAML解析逻辑
        // 简化实现，实际项目中可以使用js-yaml等库
        return { content: message, format: 'yaml' };
      } else {
        return message;
      }
    } catch (error) {
      console.error('❌ 适配YAML消息失败:', error.message);
      throw error;
    }
  }
  
  // 适配自定义消息
  async adaptCustom(message) {
    try {
      return {
        content: message,
        format: 'custom',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ 适配自定义消息失败:', error.message);
      throw error;
    }
  }
  
  // 注册自定义协议
  registerProtocol(name, adapterFunction) {
    try {
      this.protocols[name] = adapterFunction;
      console.log(`✅ 注册自定义协议: ${name}`);
      return true;
    } catch (error) {
      console.error('❌ 注册自定义协议失败:', error.message);
      return false;
    }
  }
  
  // 移除自定义协议
  removeProtocol(name) {
    try {
      if (this.protocols[name] && name !== 'json' && name !== 'xml' && name !== 'yaml' && name !== 'custom') {
        delete this.protocols[name];
        console.log(`✅ 移除自定义协议: ${name}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ 移除自定义协议失败:', error.message);
      return false;
    }
  }
  
  // 获取支持的协议列表
  getSupportedProtocols() {
    try {
      return Object.keys(this.protocols);
    } catch (error) {
      console.error('❌ 获取支持的协议列表失败:', error.message);
      return [];
    }
  }
  
  // 获取系统状态
  async getStatus() {
    try {
      return {
        supportedProtocols: this.getSupportedProtocols(),
        status: 'active'
      };
    } catch (error) {
      console.error('❌ 获取系统状态失败:', error.message);
      return {
        supportedProtocols: [],
        status: 'error'
      };
    }
  }
  
  // 获取统计信息
  async getStats() {
    try {
      const stats = {
        supportedProtocols: this.getSupportedProtocols(),
        timestamp: new Date().toISOString()
      };
      
      return stats;
    } catch (error) {
      console.error('❌ 获取统计信息失败:', error.message);
      throw error;
    }
  }
}

module.exports = ProtocolAdapter;