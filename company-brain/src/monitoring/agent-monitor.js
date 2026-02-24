// 智能体监控模块

class AgentMonitor {
  constructor(config = {}) {
    this.config = {
      ...config,
      checkInterval: config.checkInterval || 10000, // 10秒检查一次
      timeoutThreshold: config.timeoutThreshold || 30000 // 30秒超时
    };
    
    this.agents = new Map();
    this.agentHistory = new Map();
    this.isMonitoring = false;
    this.monitoringInterval = null;
  }
  
  async init() {
    console.log('🔧 初始化智能体监控...');
    // 这里可以添加初始化逻辑，比如加载智能体信息等
    console.log('✅ 智能体监控初始化完成');
  }
  
  // 设置外部依赖
  setDependencies(memorySystem, schedulerSystem, communicationSystem) {
    this.memorySystem = memorySystem;
    this.schedulerSystem = schedulerSystem;
    this.communicationSystem = communicationSystem;
  }
  
  // 开始监控
  async start() {
    try {
      if (this.isMonitoring) {
        return;
      }
      
      console.log('🚀 开始智能体监控...');
      this.isMonitoring = true;
      
      // 立即检查一次智能体状态
      await this.checkAgents();
      
      // 设置定时检查
      this.monitoringInterval = setInterval(async () => {
        try {
          await this.checkAgents();
        } catch (error) {
          console.error('❌ 检查智能体状态失败:', error.message);
        }
      }, this.config.checkInterval);
      
      console.log('✅ 智能体监控已开始');
    } catch (error) {
      console.error('❌ 开始智能体监控失败:', error.message);
      throw error;
    }
  }
  
  // 停止监控
  async stop() {
    try {
      if (!this.isMonitoring) {
        return;
      }
      
      console.log('⏹️  停止智能体监控...');
      this.isMonitoring = false;
      
      if (this.monitoringInterval) {
        clearInterval(this.monitoringInterval);
        this.monitoringInterval = null;
      }
      
      console.log('✅ 智能体监控已停止');
    } catch (error) {
      console.error('❌ 停止智能体监控失败:', error.message);
      throw error;
    }
  }
  
  // 检查智能体状态
  async checkAgents() {
    try {
      const timestamp = new Date().toISOString();
      
      // 从调度系统获取智能体列表
      if (this.schedulerSystem && this.schedulerSystem.agentManager) {
        const agents = await this.schedulerSystem.agentManager.listAgents();
        
        for (const agent of agents) {
          // 更新智能体状态
          await this.updateAgentStatus(agent, timestamp);
        }
      }
      
      // 从记忆系统获取额外的智能体信息
      if (this.memorySystem) {
        const searchResult = await this.memorySystem.search('ai_node');
        const knowledgeItems = searchResult.results || [];
        
        for (const item of knowledgeItems) {
          if (item.content && item.content.nodeId) {
            await this.updateAgentStatusFromMemory(item, timestamp);
          }
        }
      }
    } catch (error) {
      console.error('❌ 检查智能体状态失败:', error.message);
      throw error;
    }
  }
  
  // 更新智能体状态
  async updateAgentStatus(agent, timestamp) {
    try {
      const agentId = agent.id || agent.agentId;
      
      if (!agentId) {
        return;
      }
      
      const agentStatus = {
        id: agentId,
        name: agent.name || agent.agentName,
        type: agent.type,
        status: agent.status || 'unknown',
        capabilities: agent.capabilities || [],
        lastCheck: timestamp,
        uptime: agent.uptime || 0,
        tasks: agent.tasks || [],
        error: agent.error || null
      };
      
      this.agents.set(agentId, agentStatus);
      
      // 更新历史记录
      if (!this.agentHistory.has(agentId)) {
        this.agentHistory.set(agentId, []);
      }
      
      const history = this.agentHistory.get(agentId);
      history.push({
        timestamp,
        status: agentStatus.status,
        tasks: agentStatus.tasks.length
      });
      
      // 限制历史记录大小
      if (history.length > 100) {
        this.agentHistory.set(agentId, history.slice(-100));
      }
    } catch (error) {
      console.error('❌ 更新智能体状态失败:', error.message);
    }
  }
  
  // 从记忆系统更新智能体状态
  async updateAgentStatusFromMemory(item, timestamp) {
    try {
      const agentId = item.content.nodeId;
      const agentName = item.content.nodeName;
      
      if (!agentId) {
        return;
      }
      
      const agentStatus = {
        id: agentId,
        name: agentName,
        type: 'evomap_node',
        status: item.content.nodeStatus || 'unknown',
        capabilities: ['evomap', 'evolver'],
        lastCheck: timestamp,
        uptime: 0,
        tasks: [],
        error: null,
        extraInfo: {
          reputation: item.content.reputation,
          points: item.content.initialPoints,
          accountType: item.content.accountType,
          evolverStatus: item.content.evolverStatus
        }
      };
      
      this.agents.set(agentId, agentStatus);
      
      // 更新历史记录
      if (!this.agentHistory.has(agentId)) {
        this.agentHistory.set(agentId, []);
      }
      
      const history = this.agentHistory.get(agentId);
      history.push({
        timestamp,
        status: agentStatus.status,
        tasks: 0
      });
      
      // 限制历史记录大小
      if (history.length > 100) {
        this.agentHistory.set(agentId, history.slice(-100));
      }
    } catch (error) {
      console.error('❌ 从记忆系统更新智能体状态失败:', error.message);
    }
  }
  
  // 获取智能体状态
  async getStatus() {
    try {
      const agentList = Array.from(this.agents.values());
      const activeAgents = agentList.filter(agent => agent.status === 'online' || agent.status === 'active');
      const inactiveAgents = agentList.filter(agent => agent.status === 'offline' || agent.status === 'inactive');
      
      return {
        total: agentList.length,
        active: activeAgents.length,
        inactive: inactiveAgents.length,
        details: agentList.map(agent => ({
          id: agent.id,
          name: agent.name,
          type: agent.type,
          status: agent.status,
          capabilities: agent.capabilities,
          lastCheck: agent.lastCheck,
          extraInfo: agent.extraInfo
        })),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ 获取智能体状态失败:', error.message);
      throw error;
    }
  }
  
  // 获取智能体历史记录
  async getAgentHistory(agentId) {
    try {
      if (!this.agentHistory.has(agentId)) {
        return [];
      }
      
      return this.agentHistory.get(agentId);
    } catch (error) {
      console.error('❌ 获取智能体历史记录失败:', error.message);
      throw error;
    }
  }
  
  // 手动更新智能体状态
  async updateAgent(agentId, status, extraInfo = {}) {
    try {
      const timestamp = new Date().toISOString();
      
      const existingAgent = this.agents.get(agentId) || {
        id: agentId,
        name: agentId,
        type: 'unknown',
        capabilities: []
      };
      
      const updatedAgent = {
        ...existingAgent,
        status,
        lastCheck: timestamp,
        extraInfo: {
          ...existingAgent.extraInfo,
          ...extraInfo
        }
      };
      
      this.agents.set(agentId, updatedAgent);
      
      // 更新历史记录
      if (!this.agentHistory.has(agentId)) {
        this.agentHistory.set(agentId, []);
      }
      
      const history = this.agentHistory.get(agentId);
      history.push({
        timestamp,
        status,
        tasks: updatedAgent.tasks ? updatedAgent.tasks.length : 0
      });
      
      // 限制历史记录大小
      if (history.length > 100) {
        this.agentHistory.set(agentId, history.slice(-100));
      }
      
      return updatedAgent;
    } catch (error) {
      console.error('❌ 手动更新智能体状态失败:', error.message);
      throw error;
    }
  }
  
  // 检测智能体健康状态
  async checkAgentHealth(agentId) {
    try {
      const agent = this.agents.get(agentId);
      
      if (!agent) {
        return {
          healthy: false,
          reason: '智能体不存在'
        };
      }
      
      // 检查状态
      if (agent.status === 'offline' || agent.status === 'error') {
        return {
          healthy: false,
          reason: `智能体状态异常: ${agent.status}`
        };
      }
      
      // 检查最后检查时间
      const lastCheckTime = new Date(agent.lastCheck).getTime();
      const now = Date.now();
      
      if (now - lastCheckTime > this.config.timeoutThreshold) {
        return {
          healthy: false,
          reason: '智能体响应超时'
        };
      }
      
      return {
        healthy: true,
        reason: '智能体状态正常'
      };
    } catch (error) {
      console.error('❌ 检测智能体健康状态失败:', error.message);
      return {
        healthy: false,
        reason: '检测失败'
      };
    }
  }
  
  // 获取统计信息
  async getStats() {
    try {
      const agentStatus = await this.getStatus();
      
      const stats = {
        totalAgents: agentStatus.total,
        activeAgents: agentStatus.active,
        inactiveAgents: agentStatus.inactive,
        agentTypes: this.getAgentTypes(),
        statusDistribution: this.getStatusDistribution(),
        timestamp: new Date().toISOString()
      };
      
      return stats;
    } catch (error) {
      console.error('❌ 获取智能体统计信息失败:', error.message);
      throw error;
    }
  }
  
  // 获取智能体类型分布
  getAgentTypes() {
    const types = new Map();
    
    for (const agent of this.agents.values()) {
      const type = agent.type || 'unknown';
      types.set(type, (types.get(type) || 0) + 1);
    }
    
    return Object.fromEntries(types);
  }
  
  // 获取状态分布
  getStatusDistribution() {
    const statuses = new Map();
    
    for (const agent of this.agents.values()) {
      const status = agent.status || 'unknown';
      statuses.set(status, (statuses.get(status) || 0) + 1);
    }
    
    return Object.fromEntries(statuses);
  }
  
  // 设置配置
  setConfig(config) {
    try {
      this.config = {
        ...this.config,
        ...config
      };
      
      // 如果检查间隔改变，重新设置
      if (config.checkInterval && this.isMonitoring) {
        if (this.monitoringInterval) {
          clearInterval(this.monitoringInterval);
        }
        
        this.monitoringInterval = setInterval(async () => {
          try {
            await this.checkAgents();
          } catch (error) {
            console.error('❌ 检查智能体状态失败:', error.message);
          }
        }, this.config.checkInterval);
      }
      
      console.log('✅ 智能体监控配置已更新');
    } catch (error) {
      console.error('❌ 设置智能体监控配置失败:', error.message);
      throw error;
    }
  }
}

module.exports = AgentMonitor;