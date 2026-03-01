const AutoLearningSystem = require('./auto-learning-system');
const AutoTaskExecutor = require('./auto-task-executor');
const AutoCollaborationSystem = require('./auto-collaboration-system');
const AgentCollaborationSystem = require('./agent-collaboration');
const SelfMonitoringSystem = require('./self-monitoring-system');
const LongTermGoalSystem = require('./long-term-goal-system');
const KnowledgeManagementSystem = require('./knowledge-management-system');
const fs = require('fs');
const path = require('path');

class AutonomousAgent {
  constructor(options = {}) {
    this.config = {
      name: options.name || 'Autonomous Agent',
      storageDir: options.storageDir || path.join(__dirname, 'autonomous-agent-storage'),
      logLevel: options.logLevel || 'info'
    };
    
    this.components = {
      learning: null,
      taskExecutor: null,
      collaboration: null,
      agentCollaboration: null,
      monitoring: null,
      goalSystem: null,
      knowledge: null
    };
    
    this.state = {
      status: 'stopped',
      lastStarted: null,
      lastStopped: null,
      systemStats: {}
    };
    
    this.initializeStorage();
  }
  
  initializeStorage() {
    if (!fs.existsSync(this.config.storageDir)) {
      fs.mkdirSync(this.config.storageDir, { recursive: true });
    }
  }
  
  log(level, ...args) {
    if (['debug', 'info', 'warn', 'error'].indexOf(level) >= ['debug', 'info', 'warn', 'error'].indexOf(this.config.logLevel)) {
      console.log(`[${new Date().toISOString()}] [${level.toUpperCase()}] [${this.config.name}]`, ...args);
    }
  }
  
  async start() {
    this.log('info', '🚀 启动自主智能体系统');
    
    try {
      // 初始化组件
      this.components.knowledge = new KnowledgeManagementSystem({
        storageDir: path.join(this.config.storageDir, 'knowledge')
      });
      
      this.components.learning = new AutoLearningSystem({
        storageDir: path.join(this.config.storageDir, 'learning')
      });
      
      this.components.taskExecutor = new AutoTaskExecutor({
        storageDir: path.join(this.config.storageDir, 'tasks')
      });
      
      this.components.collaboration = new AutoCollaborationSystem({
        storageDir: path.join(this.config.storageDir, 'collaboration')
      });
      
      this.components.monitoring = new SelfMonitoringSystem({
        storageDir: path.join(this.config.storageDir, 'monitoring')
      });
      
      this.components.agentCollaboration = new AgentCollaborationSystem({
        storageDir: path.join(this.config.storageDir, 'agent-collaboration')
      });
      
      this.components.goalSystem = new LongTermGoalSystem({
        storageDir: path.join(this.config.storageDir, 'goals')
      });
      
      // 启动组件
      this.log('info', '启动学习系统...');
      const learningStarted = await this.components.learning.start();
      if (!learningStarted) {
        throw new Error('学习系统启动失败');
      }
      
      this.log('info', '启动任务执行系统...');
      const taskExecutorStarted = await this.components.taskExecutor.start();
      if (!taskExecutorStarted) {
        throw new Error('任务执行系统启动失败');
      }
      
      this.log('info', '启动协作系统...');
      const collaborationStarted = await this.components.collaboration.start();
      if (!collaborationStarted) {
        throw new Error('协作系统启动失败');
      }
      
      this.log('info', '启动自我监控系统...');
      const monitoringStarted = await this.components.monitoring.start();
      if (!monitoringStarted) {
        throw new Error('自我监控系统启动失败');
      }
      
      this.log('info', '启动智能体协作系统...');
      const agentCollaborationStarted = await this.components.agentCollaboration.start();
      if (!agentCollaborationStarted) {
        throw new Error('智能体协作系统启动失败');
      }
      
      this.log('info', '启动长期目标系统...');
      const goalSystemStarted = await this.components.goalSystem.start();
      if (!goalSystemStarted) {
        throw new Error('长期目标系统启动失败');
      }
      
      this.state.status = 'running';
      this.state.lastStarted = new Date().toISOString();
      this.log('info', '✅ 自主智能体系统启动成功');
      
      // 启动系统监控
      this.startMonitoring();
      
      return true;
      
    } catch (error) {
      this.log('error', '启动失败:', error.message);
      this.state.status = 'failed';
      return false;
    }
  }
  
  stop() {
    this.log('info', '🛑 停止自主智能体系统');
    
    try {
      // 停止监控
      if (this.monitoringInterval) {
        clearInterval(this.monitoringInterval);
      }
      
      // 停止组件
      if (this.components.learning) {
        this.components.learning.stop();
      }
      
      if (this.components.taskExecutor) {
        this.components.taskExecutor.stop();
      }
      
      if (this.components.collaboration) {
        this.components.collaboration.stop();
      }
      
      if (this.components.monitoring) {
        this.components.monitoring.stop();
      }
      
      if (this.components.agentCollaboration) {
        this.components.agentCollaboration.stop();
      }
      
      if (this.components.goalSystem) {
        this.components.goalSystem.stop();
      }
      
      this.state.status = 'stopped';
      this.state.lastStopped = new Date().toISOString();
      this.log('info', '✅ 自主智能体系统停止成功');
      
      return true;
      
    } catch (error) {
      this.log('error', '停止失败:', error.message);
      return false;
    }
  }
  
  startMonitoring() {
    this.monitoringInterval = setInterval(() => {
      this.updateSystemStats();
    }, 60000); // 每分钟更新一次统计信息
  }
  
  updateSystemStats() {
    const stats = {
      timestamp: new Date().toISOString(),
      status: this.state.status,
      components: {
        learning: this.components.learning ? this.components.learning.getStatus() : null,
        taskExecutor: this.components.taskExecutor ? this.components.taskExecutor.getStatus() : null,
        collaboration: this.components.collaboration ? this.components.collaboration.getStatus() : null,
        agentCollaboration: this.components.agentCollaboration ? this.components.agentCollaboration.getStatus() : null,
        monitoring: this.components.monitoring ? this.components.monitoring.getStatus() : null,
        goalSystem: this.components.goalSystem ? this.components.goalSystem.getStatus() : null,
        knowledge: this.components.knowledge ? this.components.knowledge.getStats() : null
      }
    };
    
    this.state.systemStats = stats;
    this.log('debug', '系统状态更新:', stats);
  }
  
  getStatus() {
    return {
      name: this.config.name,
      status: this.state.status,
      lastStarted: this.state.lastStarted,
      lastStopped: this.state.lastStopped,
      systemStats: this.state.systemStats,
      components: {
        learning: this.components.learning ? this.components.learning.getStatus() : null,
        taskExecutor: this.components.taskExecutor ? this.components.taskExecutor.getStatus() : null,
        collaboration: this.components.collaboration ? this.components.collaboration.getStatus() : null,
        agentCollaboration: this.components.agentCollaboration ? this.components.agentCollaboration.getStatus() : null,
        monitoring: this.components.monitoring ? this.components.monitoring.getStatus() : null,
        goalSystem: this.components.goalSystem ? this.components.goalSystem.getStatus() : null,
        knowledge: this.components.knowledge ? this.components.knowledge.getStats() : null
      }
    };
  }
  
  async learnFromAsset(asset) {
    if (!this.components.learning) {
      throw new Error('学习系统未初始化');
    }
    
    this.log('info', '学习资产:', asset.asset_id);
    await this.components.learning.processAsset(asset);
  }
  
  async executeTask(task) {
    if (!this.components.taskExecutor) {
      throw new Error('任务执行系统未初始化');
    }
    
    this.log('info', '执行任务:', task.task_id);
    await this.components.taskExecutor.processTask(task);
  }
  
  addKnowledge(item) {
    if (!this.components.knowledge) {
      throw new Error('知识管理系统未初始化');
    }
    
    this.log('info', '添加知识:', item.title);
    return this.components.knowledge.addKnowledgeItem(item);
  }
  
  searchKnowledge(query, options = {}) {
    if (!this.components.knowledge) {
      throw new Error('知识管理系统未初始化');
    }
    
    this.log('info', '搜索知识:', query);
    return this.components.knowledge.searchKnowledge(query, options);
  }
  
  getLearningHistory() {
    if (!this.components.learning) {
      throw new Error('学习系统未初始化');
    }
    
    return this.components.learning.getLearningHistory();
  }
  
  getTaskHistory() {
    if (!this.components.taskExecutor) {
      throw new Error('任务执行系统未初始化');
    }
    
    return this.components.taskExecutor.getTaskHistory();
  }
  
  getKnowledgeStats() {
    if (!this.components.knowledge) {
      throw new Error('知识管理系统未初始化');
    }
    
    return this.components.knowledge.getStats();
  }
  
  async joinCollaboration(collaboration) {
    if (!this.components.collaboration) {
      throw new Error('协作系统未初始化');
    }
    
    this.log('info', '加入协作会话:', collaboration.id);
    await this.components.collaboration.joinCollaboration(collaboration);
  }
  
  async leaveCollaboration(collaborationId) {
    if (!this.components.collaboration) {
      throw new Error('协作系统未初始化');
    }
    
    this.log('info', '离开协作会话:', collaborationId);
    return this.components.collaboration.leaveCollaboration(collaborationId);
  }
  
  getActiveCollaborations() {
    if (!this.components.collaboration) {
      throw new Error('协作系统未初始化');
    }
    
    return this.components.collaboration.getActiveCollaborations();
  }
  
  getCollaborationHistory() {
    if (!this.components.collaboration) {
      throw new Error('协作系统未初始化');
    }
    
    return this.components.collaboration.getCollaborationHistory();
  }
  
  getSystemMetrics() {
    if (!this.components.monitoring) {
      throw new Error('监控系统未初始化');
    }
    
    return this.components.monitoring.getLatestSystemMetrics();
  }
  
  getAlerts(limit = 10) {
    if (!this.components.monitoring) {
      throw new Error('监控系统未初始化');
    }
    
    return this.components.monitoring.getAlerts(limit);
  }
  
  getOptimizations(limit = 10) {
    if (!this.components.monitoring) {
      throw new Error('监控系统未初始化');
    }
    
    return this.components.monitoring.getOptimizations(limit);
  }
  
  generateSystemReport() {
    if (!this.components.monitoring) {
      throw new Error('监控系统未初始化');
    }
    
    return this.components.monitoring.generateReport();
  }
  
  getKnownAgents() {
    if (!this.components.agentCollaboration) {
      throw new Error('智能体协作系统未初始化');
    }
    
    return this.components.agentCollaboration.getKnownAgents();
  }
  
  async initiateCollaboration(agentId, purpose) {
    if (!this.components.agentCollaboration) {
      throw new Error('智能体协作系统未初始化');
    }
    
    return this.components.agentCollaboration.initiateCollaboration(agentId, purpose);
  }
  
  async sendMessage(sessionId, message) {
    if (!this.components.agentCollaboration) {
      throw new Error('智能体协作系统未初始化');
    }
    
    return this.components.agentCollaboration.sendMessage(sessionId, message);
  }
  
  async endCollaboration(sessionId) {
    if (!this.components.agentCollaboration) {
      throw new Error('智能体协作系统未初始化');
    }
    
    return this.components.agentCollaboration.endCollaboration(sessionId);
  }
  
  async requestHelp(agentId, request) {
    if (!this.components.agentCollaboration) {
      throw new Error('智能体协作系统未初始化');
    }
    
    return this.components.agentCollaboration.requestHelp(agentId, request);
  }
  
  findAgentsByCapability(capability) {
    if (!this.components.agentCollaboration) {
      throw new Error('智能体协作系统未初始化');
    }
    
    return this.components.agentCollaboration.findAgentsByCapability(capability);
  }
  
  addGoal(goalData) {
    if (!this.components.goalSystem) {
      throw new Error('长期目标系统未初始化');
    }
    
    return this.components.goalSystem.addGoal(goalData);
  }
  
  updateGoal(goalId, updates) {
    if (!this.components.goalSystem) {
      throw new Error('长期目标系统未初始化');
    }
    
    return this.components.goalSystem.updateGoal(goalId, updates);
  }
  
  addSubgoal(goalId, subgoal) {
    if (!this.components.goalSystem) {
      throw new Error('长期目标系统未初始化');
    }
    
    return this.components.goalSystem.addSubgoal(goalId, subgoal);
  }
  
  completeSubgoal(goalId, subgoalId) {
    if (!this.components.goalSystem) {
      throw new Error('长期目标系统未初始化');
    }
    
    return this.components.goalSystem.completeSubgoal(goalId, subgoalId);
  }
  
  getGoals() {
    if (!this.components.goalSystem) {
      throw new Error('长期目标系统未初始化');
    }
    
    return this.components.goalSystem.getGoals();
  }
  
  generatePlan() {
    if (!this.components.goalSystem) {
      throw new Error('长期目标系统未初始化');
    }
    
    return this.components.goalSystem.generatePlan();
  }
  
  prioritizeGoals() {
    if (!this.components.goalSystem) {
      throw new Error('长期目标系统未初始化');
    }
    
    return this.components.goalSystem.prioritizeGoals();
  }
  
  async shutdown() {
    this.log('info', '🔄 关闭自主智能体系统');
    await this.stop();
    this.log('info', '✅ 自主智能体系统已关闭');
  }
}

module.exports = AutonomousAgent;

if (require.main === module) {
  async function main() {
    console.log('========================================');
    console.log('🤖 自主智能体系统测试');
    console.log('========================================');
    
    const agent = new AutonomousAgent({
      name: 'Test Agent',
      logLevel: 'info'
    });
    
    console.log('启动智能体...');
    const started = await agent.start();
    
    if (started) {
      console.log('智能体启动成功');
      
      // 运行一段时间
      setTimeout(async () => {
        console.log('\n获取系统状态...');
        const status = agent.getStatus();
        console.log('系统状态:', status);
        
        console.log('\n停止智能体...');
        await agent.stop();
        console.log('智能体已停止');
        
        console.log('========================================');
        console.log('🎉 测试完成');
        console.log('========================================');
      }, 30000); // 运行30秒
    } else {
      console.log('智能体启动失败');
    }
  }
  
  main().catch(error => {
    console.error('测试错误:', error.message);
  });
}