// 调度系统主模块

class SchedulerSystem {
  constructor(config = {}) {
    this.config = {
      ...config
    };
    
    this.taskAnalyzer = null;
    this.agentManager = null;
    this.schedulingEngine = null;
    this.taskTracker = null;
    
    this.init();
  }
  
  async init() {
    console.log('🔧 初始化调度系统...');
    
    // 加载各个子模块
    const TaskAnalyzer = require('./task-analyzer');
    const AgentManager = require('./agent-manager');
    const SchedulingEngine = require('./scheduling-engine');
    const TaskTracker = require('./task-tracker');
    const BrainCheaterAdapter = require('./brain-cheater-adapter');
    
    this.taskAnalyzer = new TaskAnalyzer(this.config);
    this.agentManager = new AgentManager(this.config);
    this.schedulingEngine = new SchedulingEngine(this.config);
    this.taskTracker = new TaskTracker(this.config);
    this.brainCheaterAdapter = new BrainCheaterAdapter(this.config);
    
    // 初始化各个模块
    await this.taskAnalyzer.init();
    await this.agentManager.init();
    await this.schedulingEngine.init();
    await this.taskTracker.init();
    await this.brainCheaterAdapter.init();
    
    // 设置模块间的引用
    this.schedulingEngine.setDependencies(this.taskAnalyzer, this.agentManager, this.taskTracker);
    
    console.log('✅ 调度系统初始化完成');
  }
  
  // 大脑作弊器相关操作
  async generateContentWithBrainCheater(content, options = {}) {
    try {
      if (!this.brainCheaterAdapter) {
        throw new Error('大脑作弊器适配器未初始化');
      }
      
      return await this.brainCheaterAdapter.generateContent(content, options);
    } catch (error) {
      console.error('❌ 使用大脑作弊器生成内容失败:', error.message);
      throw error;
    }
  }
  
  async processFileWithBrainCheater(fileData, options = {}) {
    try {
      if (!this.brainCheaterAdapter) {
        throw new Error('大脑作弊器适配器未初始化');
      }
      
      return await this.brainCheaterAdapter.processFile(fileData, options);
    } catch (error) {
      console.error('❌ 使用大脑作弊器处理文件失败:', error.message);
      throw error;
    }
  }
  
  async processUrlWithBrainCheater(url, options = {}) {
    try {
      if (!this.brainCheaterAdapter) {
        throw new Error('大脑作弊器适配器未初始化');
      }
      
      return await this.brainCheaterAdapter.processUrl(url, options);
    } catch (error) {
      console.error('❌ 使用大脑作弊器处理URL失败:', error.message);
      throw error;
    }
  }
  
  async getBrainCheaterStatus() {
    try {
      if (!this.brainCheaterAdapter) {
        throw new Error('大脑作弊器适配器未初始化');
      }
      
      return await this.brainCheaterAdapter.getStatus();
    } catch (error) {
      console.error('❌ 获取大脑作弊器状态失败:', error.message);
      throw error;
    }
  }
  
  // 设置外部依赖
  setDependencies(memorySystem, communicationSystem, monitoringSystem) {
    this.memorySystem = memorySystem;
    this.communicationSystem = communicationSystem;
    this.monitoringSystem = monitoringSystem;
  }
  
  // 系统生命周期方法
  async start() {
    console.log('🚀 启动调度系统...');
    // 调度系统启动不需要特殊操作
    console.log('✅ 调度系统启动完成');
  }
  
  async stop() {
    console.log('⏹️  停止调度系统...');
    // 调度系统停止不需要特殊操作
    console.log('✅ 调度系统停止完成');
  }
  
  // 任务相关操作
  async createTask(taskData) {
    try {
      console.log(`📋 创建任务: ${taskData.title || '未命名任务'}`);
      
      // 分析任务
      const analysisResult = await this.taskAnalyzer.analyze(taskData);
      
      // 创建任务
      const task = await this.taskTracker.createTask({
        ...taskData,
        analysis: analysisResult,
        status: 'created',
        createdAt: new Date().toISOString()
      });
      
      console.log(`✅ 任务创建成功: ${task.id}`);
      return task;
    } catch (error) {
      console.error('❌ 创建任务失败:', error.message);
      throw error;
    }
  }
  
  async getTask(id) {
    try {
      return await this.taskTracker.getTask(id);
    } catch (error) {
      console.error('❌ 获取任务失败:', error.message);
      throw error;
    }
  }
  
  async updateTask(id, updates) {
    try {
      return await this.taskTracker.updateTask(id, updates);
    } catch (error) {
      console.error('❌ 更新任务失败:', error.message);
      throw error;
    }
  }
  
  async deleteTask(id) {
    try {
      return await this.taskTracker.deleteTask(id);
    } catch (error) {
      console.error('❌ 删除任务失败:', error.message);
      throw error;
    }
  }
  
  async listTasks(filters = {}) {
    try {
      return await this.taskTracker.listTasks(filters);
    } catch (error) {
      console.error('❌ 列出任务失败:', error.message);
      throw error;
    }
  }
  
  // 任务分配
  async assignTask(taskId) {
    try {
      console.log(`🎯 分配任务: ${taskId}`);
      
      // 获取任务
      const task = await this.taskTracker.getTask(taskId);
      
      // 分析任务
      const analysisResult = task.analysis || await this.taskAnalyzer.analyze(task);
      
      // 选择智能体
      const selectedAgent = await this.schedulingEngine.selectAgent(analysisResult);
      
      if (!selectedAgent) {
        throw new Error('没有合适的智能体可用');
      }
      
      // 分配任务
      const assignmentResult = await this.schedulingEngine.assignTask(task, selectedAgent);
      
      // 更新任务状态
      await this.taskTracker.updateTask(taskId, {
        status: 'assigned',
        assignedTo: selectedAgent.id,
        assignedAt: new Date().toISOString()
      });
      
      console.log(`✅ 任务分配成功: ${taskId} → ${selectedAgent.name}`);
      return assignmentResult;
    } catch (error) {
      console.error('❌ 分配任务失败:', error.message);
      throw error;
    }
  }
  
  // 智能体相关操作
  async registerAgent(agentData) {
    try {
      return await this.agentManager.registerAgent(agentData);
    } catch (error) {
      console.error('❌ 注册智能体失败:', error.message);
      throw error;
    }
  }
  
  async getAgent(id) {
    try {
      return await this.agentManager.getAgent(id);
    } catch (error) {
      console.error('❌ 获取智能体失败:', error.message);
      throw error;
    }
  }
  
  async updateAgent(id, updates) {
    try {
      return await this.agentManager.updateAgent(id, updates);
    } catch (error) {
      console.error('❌ 更新智能体失败:', error.message);
      throw error;
    }
  }
  
  async deleteAgent(id) {
    try {
      return await this.agentManager.deleteAgent(id);
    } catch (error) {
      console.error('❌ 删除智能体失败:', error.message);
      throw error;
    }
  }
  
  async listAgents(filters = {}) {
    try {
      return await this.agentManager.listAgents(filters);
    } catch (error) {
      console.error('❌ 列出智能体失败:', error.message);
      throw error;
    }
  }
  
  // 系统操作
  async getStatus() {
    try {
      const agentStatus = await this.agentManager.getStatus();
      const taskStatus = await this.taskTracker.getStatus();
      
      return {
        ...agentStatus,
        ...taskStatus,
        status: 'active'
      };
    } catch (error) {
      console.error('❌ 获取系统状态失败:', error.message);
      throw error;
    }
  }
  
  async backup() {
    try {
      console.log('💾 备份调度系统...');
      
      const backupData = {
        agents: await this.agentManager.listAgents(),
        tasks: await this.taskTracker.listTasks(),
        timestamp: new Date().toISOString()
      };
      
      console.log('✅ 调度系统备份完成');
      return backupData;
    } catch (error) {
      console.error('❌ 备份调度系统失败:', error.message);
      throw error;
    }
  }
  
  async restore(backupData) {
    try {
      console.log('🔄 恢复调度系统...');
      
      // 清空现有数据
      await this.agentManager.clear();
      await this.taskTracker.clear();
      
      // 恢复智能体
      if (backupData.agents) {
        for (const agent of backupData.agents) {
          await this.agentManager.registerAgent(agent);
        }
      }
      
      // 恢复任务
      if (backupData.tasks) {
        for (const task of backupData.tasks) {
          await this.taskTracker.createTask(task);
        }
      }
      
      console.log('✅ 调度系统恢复完成');
    } catch (error) {
      console.error('❌ 恢复调度系统失败:', error.message);
      throw error;
    }
  }
}

module.exports = SchedulerSystem;
