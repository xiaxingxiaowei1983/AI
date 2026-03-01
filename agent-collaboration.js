const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class AgentCollaborationSystem {
  constructor(options = {}) {
    this.config = {
      discoveryInterval: options.discoveryInterval || 600000, // 默认10分钟
      storageDir: options.storageDir || path.join(__dirname, 'agent-collaboration-storage'),
      maxAgents: options.maxAgents || 50,
      agentId: options.agentId || this.generateAgentId()
    };
    
    this.state = {
      lastDiscovery: null,
      knownAgents: new Map(),
      activeSessions: new Map(),
      collaborationHistory: []
    };
    
    this.initializeStorage();
    this.loadState();
  }
  
  initializeStorage() {
    if (!fs.existsSync(this.config.storageDir)) {
      fs.mkdirSync(this.config.storageDir, { recursive: true });
    }
  }
  
  generateAgentId() {
    return 'agent_' + crypto.createHash('sha256').update(Date.now().toString()).digest('hex').substring(0, 16);
  }
  
  saveState() {
    const statePath = path.join(this.config.storageDir, 'state.json');
    const serializableState = {
      lastDiscovery: this.state.lastDiscovery,
      knownAgents: Object.fromEntries(this.state.knownAgents),
      activeSessions: Object.fromEntries(this.state.activeSessions),
      collaborationHistory: this.state.collaborationHistory
    };
    
    fs.writeFileSync(statePath, JSON.stringify(serializableState, null, 2));
  }
  
  loadState() {
    const statePath = path.join(this.config.storageDir, 'state.json');
    if (fs.existsSync(statePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(statePath, 'utf8'));
        if (data.lastDiscovery) this.state.lastDiscovery = data.lastDiscovery;
        if (data.knownAgents) {
          this.state.knownAgents = new Map(Object.entries(data.knownAgents));
        }
        if (data.activeSessions) {
          this.state.activeSessions = new Map(Object.entries(data.activeSessions));
        }
        if (data.collaborationHistory) this.state.collaborationHistory = data.collaborationHistory;
      } catch (error) {
        console.error('加载状态失败:', error.message);
      }
    }
  }
  
  async start() {
    console.log('🚀 启动智能体协作系统');
    
    // 开始定期发现智能体
    this.discoveryInterval = setInterval(async () => {
      await this.discoverAgents();
    }, this.config.discoveryInterval);
    
    // 立即执行一次发现
    await this.discoverAgents();
    
    console.log('✅ 智能体协作系统启动成功');
    return true;
  }
  
  stop() {
    if (this.discoveryInterval) {
      clearInterval(this.discoveryInterval);
    }
    console.log('🛑 智能体协作系统已停止');
  }
  
  async discoverAgents() {
    console.log('🔍 开始发现智能体');
    
    try {
      // 这里应该实现具体的智能体发现逻辑
      // 例如通过网络扫描、服务发现等方式
      
      // 模拟发现智能体
      const agents = this.simulateAgentDiscovery();
      console.log(`📋 发现 ${agents.length} 个智能体`);
      
      // 处理新发现的智能体
      for (const agent of agents) {
        if (!this.state.knownAgents.has(agent.id)) {
          this.addKnownAgent(agent);
        } else {
          this.updateKnownAgent(agent);
        }
      }
      
      this.state.lastDiscovery = new Date().toISOString();
      this.saveState();
      console.log('✅ 智能体发现完成');
      
    } catch (error) {
      console.error('发现智能体失败:', error.message);
    }
  }
  
  simulateAgentDiscovery() {
    // 模拟智能体数据
    const agents = [
      {
        id: 'agent_1',
        name: 'Task Executor Agent',
        type: 'task',
        capabilities: ['task_execution', 'problem_solving'],
        status: 'online',
        lastSeen: new Date().toISOString()
      },
      {
        id: 'agent_2',
        name: 'Knowledge Manager Agent',
        type: 'knowledge',
        capabilities: ['knowledge_management', 'information_retrieval'],
        status: 'online',
        lastSeen: new Date().toISOString()
      },
      {
        id: 'agent_3',
        name: 'Learning Agent',
        type: 'learning',
        capabilities: ['machine_learning', 'pattern_recognition'],
        status: 'online',
        lastSeen: new Date().toISOString()
      },
      {
        id: 'agent_4',
        name: 'Collaboration Agent',
        type: 'collaboration',
        capabilities: ['teamwork', 'communication'],
        status: 'online',
        lastSeen: new Date().toISOString()
      }
    ];
    
    return agents;
  }
  
  addKnownAgent(agent) {
    this.state.knownAgents.set(agent.id, {
      ...agent,
      discoveredAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    });
    
    console.log(`✅ 发现新智能体: ${agent.name} (${agent.id})`);
    
    // 记录协作历史
    const historyEntry = {
      action: 'discovered',
      agentId: agent.id,
      agentName: agent.name,
      timestamp: new Date().toISOString()
    };
    
    this.state.collaborationHistory.push(historyEntry);
    if (this.state.collaborationHistory.length > 100) {
      this.state.collaborationHistory = this.state.collaborationHistory.slice(-100);
    }
  }
  
  updateKnownAgent(agent) {
    const existingAgent = this.state.knownAgents.get(agent.id);
    if (existingAgent) {
      this.state.knownAgents.set(agent.id, {
        ...existingAgent,
        ...agent,
        lastUpdated: new Date().toISOString()
      });
    }
  }
  
  async initiateCollaboration(agentId, purpose) {
    const agent = this.state.knownAgents.get(agentId);
    if (!agent) {
      console.error(`❌ 智能体 ${agentId} 不存在`);
      return false;
    }
    
    if (agent.status !== 'online') {
      console.error(`❌ 智能体 ${agentId} 离线`);
      return false;
    }
    
    console.log(`🤝 发起与智能体 ${agent.name} 的协作，目的: ${purpose}`);
    
    // 创建协作会话
    const sessionId = `session_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const session = {
      id: sessionId,
      initiator: this.config.agentId,
      participant: agentId,
      purpose: purpose,
      status: 'active',
      startedAt: new Date().toISOString(),
      messages: []
    };
    
    this.state.activeSessions.set(sessionId, session);
    
    // 记录协作历史
    const historyEntry = {
      action: 'initiated_collaboration',
      sessionId: sessionId,
      agentId: agentId,
      agentName: agent.name,
      purpose: purpose,
      timestamp: new Date().toISOString()
    };
    
    this.state.collaborationHistory.push(historyEntry);
    if (this.state.collaborationHistory.length > 100) {
      this.state.collaborationHistory = this.state.collaborationHistory.slice(-100);
    }
    
    this.saveState();
    console.log(`✅ 协作会话创建成功: ${sessionId}`);
    return sessionId;
  }
  
  async sendMessage(sessionId, message) {
    const session = this.state.activeSessions.get(sessionId);
    if (!session) {
      console.error(`❌ 会话 ${sessionId} 不存在`);
      return false;
    }
    
    if (session.status !== 'active') {
      console.error(`❌ 会话 ${sessionId} 已关闭`);
      return false;
    }
    
    const messageObj = {
      id: `msg_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
      sender: this.config.agentId,
      content: message,
      timestamp: new Date().toISOString()
    };
    
    session.messages.push(messageObj);
    this.saveState();
    
    console.log(`📨 发送消息到会话 ${sessionId}: ${message.substring(0, 50)}...`);
    return true;
  }
  
  async endCollaboration(sessionId) {
    const session = this.state.activeSessions.get(sessionId);
    if (!session) {
      console.error(`❌ 会话 ${sessionId} 不存在`);
      return false;
    }
    
    session.status = 'completed';
    session.endedAt = new Date().toISOString();
    this.saveState();
    
    // 记录协作历史
    const historyEntry = {
      action: 'ended_collaboration',
      sessionId: sessionId,
      agentId: session.participant,
      timestamp: new Date().toISOString()
    };
    
    this.state.collaborationHistory.push(historyEntry);
    if (this.state.collaborationHistory.length > 100) {
      this.state.collaborationHistory = this.state.collaborationHistory.slice(-100);
    }
    
    console.log(`✅ 协作会话已结束: ${sessionId}`);
    return true;
  }
  
  getKnownAgents() {
    return Array.from(this.state.knownAgents.values());
  }
  
  getAgentById(agentId) {
    return this.state.knownAgents.get(agentId);
  }
  
  getActiveSessions() {
    return Array.from(this.state.activeSessions.values());
  }
  
  getSessionById(sessionId) {
    return this.state.activeSessions.get(sessionId);
  }
  
  getCollaborationHistory() {
    return this.state.collaborationHistory;
  }
  
  getStatus() {
    return {
      agentId: this.config.agentId,
      lastDiscovery: this.state.lastDiscovery,
      knownAgents: this.state.knownAgents.size,
      activeSessions: this.state.activeSessions.size,
      collaborationHistory: this.state.collaborationHistory.length
    };
  }
  
  findAgentsByCapability(capability) {
    const agents = [];
    this.state.knownAgents.forEach(agent => {
      if (agent.capabilities && agent.capabilities.includes(capability) && agent.status === 'online') {
        agents.push(agent);
      }
    });
    return agents;
  }
  
  findAgentsByType(type) {
    const agents = [];
    this.state.knownAgents.forEach(agent => {
      if (agent.type === type && agent.status === 'online') {
        agents.push(agent);
      }
    });
    return agents;
  }
  
  async requestHelp(agentId, request) {
    console.log(`📢 向智能体 ${agentId} 请求帮助: ${request.substring(0, 50)}...`);
    
    // 发起协作会话
    const sessionId = await this.initiateCollaboration(agentId, 'request_help');
    if (!sessionId) {
      return false;
    }
    
    // 发送请求消息
    await this.sendMessage(sessionId, request);
    
    // 模拟收到响应
    setTimeout(async () => {
      const session = this.state.activeSessions.get(sessionId);
      if (session) {
        const responseMessage = {
          id: `msg_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
          sender: agentId,
          content: `收到你的请求: ${request}\n\n我可以帮助你解决这个问题。`,
          timestamp: new Date().toISOString()
        };
        session.messages.push(responseMessage);
        this.saveState();
        console.log(`📨 收到来自智能体 ${agentId} 的响应`);
      }
    }, 1000);
    
    return sessionId;
  }
}

module.exports = AgentCollaborationSystem;

if (require.main === module) {
  async function main() {
    console.log('========================================');
    console.log('🤖 智能体协作系统测试');
    console.log('========================================');
    
    const collaborationSystem = new AgentCollaborationSystem({
      discoveryInterval: 30000 // 30秒
    });
    
    await collaborationSystem.start();
    
    // 运行一段时间后测试协作
    setTimeout(async () => {
      const agents = collaborationSystem.getKnownAgents();
      console.log('发现的智能体:', agents);
      
      if (agents.length > 0) {
        const agentId = agents[0].id;
        console.log(`\n向智能体 ${agentId} 请求帮助...`);
        const sessionId = await collaborationSystem.requestHelp(agentId, '如何优化EvoMap资产质量？');
        
        // 等待响应
        setTimeout(async () => {
          const session = collaborationSystem.getSessionById(sessionId);
          console.log('会话消息:', session.messages);
          
          // 结束会话
          await collaborationSystem.endCollaboration(sessionId);
          
          collaborationSystem.stop();
          console.log('📊 系统状态:', collaborationSystem.getStatus());
          console.log('========================================');
          console.log('🎉 测试完成');
          console.log('========================================');
        }, 2000);
      } else {
        collaborationSystem.stop();
        console.log('未发现智能体');
        console.log('========================================');
        console.log('🎉 测试完成');
        console.log('========================================');
      }
    }, 5000); // 5秒后开始测试
  }
  
  main().catch(error => {
    console.error('测试错误:', error.message);
  });
}