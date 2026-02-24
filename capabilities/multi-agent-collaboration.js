const fs = require('fs');
const path = require('path');
const httpResilience = require('./http-resilience');

class MultiAgentCollaboration {
  constructor(options = {}) {
    this.options = {
      swarmDir: path.join(process.cwd(), 'swarm-data'),
      evomapUrl: 'https://evomap.ai',
      maxAgents: 10,
      agentTimeout: 30000,
      ...options
    };
    
    this.swarmTasks = new Map();
    this.agents = new Map();
    this.taskQueue = [];
    
    this.ensureDirectories();
  }

  // 确保目录存在
  ensureDirectories() {
    if (!fs.existsSync(this.options.swarmDir)) {
      fs.mkdirSync(this.options.swarmDir, { recursive: true });
    }
  }

  // 初始化swarm
  async initializeSwarm(config = {}) {
    const swarmId = `swarm_${Date.now()}`;
    const swarmConfig = {
      id: swarmId,
      name: config.name || `Swarm ${swarmId}`,
      description: config.description || 'Multi-agent collaboration swarm',
      agents: config.agents || [],
      tasks: config.tasks || [],
      created: new Date().toISOString(),
      status: 'initialized'
    };
    
    // 保存swarm配置
    const swarmFile = path.join(this.options.swarmDir, `${swarmId}.json`);
    fs.writeFileSync(swarmFile, JSON.stringify(swarmConfig, null, 2), 'utf8');
    
    console.log(`[Multi-Agent Collaboration] Swarm initialized: ${swarmId}`);
    
    return swarmConfig;
  }

  // 注册智能体
  registerAgent(agentInfo) {
    const agentId = agentInfo.id || `agent_${Date.now()}`;
    const agent = {
      id: agentId,
      name: agentInfo.name || `Agent ${agentId}`,
      type: agentInfo.type || 'general',
      capabilities: agentInfo.capabilities || [],
      status: 'available',
      lastSeen: new Date().toISOString(),
      ...agentInfo
    };
    
    this.agents.set(agentId, agent);
    
    console.log(`[Multi-Agent Collaboration] Agent registered: ${agent.name} (${agentId})`);
    
    return agent;
  }

  // 创建任务
  createTask(taskInfo) {
    const taskId = taskInfo.id || `task_${Date.now()}`;
    const task = {
      id: taskId,
      name: taskInfo.name || `Task ${taskId}`,
      description: taskInfo.description || '',
      type: taskInfo.type || 'general',
      priority: taskInfo.priority || 'medium',
      status: 'pending',
      assignedAgent: null,
      created: new Date().toISOString(),
      deadline: taskInfo.deadline,
      requirements: taskInfo.requirements || [],
      ...taskInfo
    };
    
    this.taskQueue.push(task);
    
    console.log(`[Multi-Agent Collaboration] Task created: ${task.name} (${taskId})`);
    
    // 自动分配任务
    this.assignTasks();
    
    return task;
  }

  // 分配任务
  assignTasks() {
    const pendingTasks = this.taskQueue.filter(task => task.status === 'pending');
    const availableAgents = Array.from(this.agents.values()).filter(agent => agent.status === 'available');
    
    pendingTasks.forEach(task => {
      // 基于能力匹配智能体
      const suitableAgent = this.findSuitableAgent(task, availableAgents);
      
      if (suitableAgent) {
        this.assignTaskToAgent(task, suitableAgent);
        // 从可用列表中移除
        const agentIndex = availableAgents.findIndex(a => a.id === suitableAgent.id);
        if (agentIndex > -1) {
          availableAgents.splice(agentIndex, 1);
        }
      }
    });
  }

  // 寻找合适的智能体
  findSuitableAgent(task, agents) {
    // 基于能力匹配
    return agents.find(agent => {
      if (!task.requirements || task.requirements.length === 0) {
        return true;
      }
      
      // 检查是否满足所有要求
      return task.requirements.every(req => 
        agent.capabilities.includes(req)
      );
    });
  }

  // 分配任务给智能体
  assignTaskToAgent(task, agent) {
    task.status = 'assigned';
    task.assignedAgent = agent.id;
    task.assignedAt = new Date().toISOString();
    
    // 更新智能体状态
    agent.status = 'busy';
    agent.currentTask = task.id;
    
    console.log(`[Multi-Agent Collaboration] Task ${task.name} assigned to ${agent.name}`);
    
    // 保存任务状态
    this.saveTaskStatus(task);
    
    return task;
  }

  // 保存任务状态
  saveTaskStatus(task) {
    const taskFile = path.join(this.options.swarmDir, `task_${task.id}.json`);
    fs.writeFileSync(taskFile, JSON.stringify(task, null, 2), 'utf8');
  }

  // 完成任务
  completeTask(taskId, result) {
    const task = this.taskQueue.find(t => t.id === taskId);
    if (!task) {
      return { error: 'Task not found' };
    }
    
    task.status = 'completed';
    task.completedAt = new Date().toISOString();
    task.result = result;
    
    // 更新智能体状态
    if (task.assignedAgent) {
      const agent = this.agents.get(task.assignedAgent);
      if (agent) {
        agent.status = 'available';
        agent.currentTask = null;
        agent.lastSeen = new Date().toISOString();
      }
    }
    
    console.log(`[Multi-Agent Collaboration] Task ${task.name} completed`);
    
    // 保存任务状态
    this.saveTaskStatus(task);
    
    // 处理下一个任务
    this.assignTasks();
    
    return task;
  }

  // 取消任务
  cancelTask(taskId, reason) {
    const task = this.taskQueue.find(t => t.id === taskId);
    if (!task) {
      return { error: 'Task not found' };
    }
    
    task.status = 'cancelled';
    task.cancelledAt = new Date().toISOString();
    task.cancellationReason = reason;
    
    // 更新智能体状态
    if (task.assignedAgent) {
      const agent = this.agents.get(task.assignedAgent);
      if (agent) {
        agent.status = 'available';
        agent.currentTask = null;
        agent.lastSeen = new Date().toISOString();
      }
    }
    
    console.log(`[Multi-Agent Collaboration] Task ${task.name} cancelled: ${reason}`);
    
    // 保存任务状态
    this.saveTaskStatus(task);
    
    // 处理下一个任务
    this.assignTasks();
    
    return task;
  }

  // 获取任务状态
  getTaskStatus(taskId) {
    const task = this.taskQueue.find(t => t.id === taskId);
    if (!task) {
      return null;
    }
    
    return {
      ...task,
      agent: task.assignedAgent ? this.agents.get(task.assignedAgent) : null
    };
  }

  // 获取所有任务
  getAllTasks() {
    return this.taskQueue.map(task => ({
      ...task,
      agent: task.assignedAgent ? this.agents.get(task.assignedAgent) : null
    }));
  }

  // 获取智能体状态
  getAgentStatus(agentId) {
    return this.agents.get(agentId);
  }

  // 获取所有智能体
  getAllAgents() {
    return Array.from(this.agents.values());
  }

  // 从EvoMap获取任务
  async fetchTasksFromEvoMap() {
    try {
      const response = await httpResilience.get(`${this.options.evomapUrl}/api/tasks`);
      const tasks = JSON.parse(response.data);
      
      tasks.forEach(taskData => {
        this.createTask({
          name: taskData.title,
          description: taskData.description,
          type: taskData.category,
          priority: taskData.priority,
          requirements: taskData.skills || [],
          evomapTaskId: taskData.id
        });
      });
      
      console.log(`[Multi-Agent Collaboration] Fetched ${tasks.length} tasks from EvoMap`);
      return tasks;
    } catch (error) {
      console.error('[Multi-Agent Collaboration] Error fetching tasks from EvoMap:', error);
      return [];
    }
  }

  // 提交任务结果到EvoMap
  async submitTaskResultToEvoMap(taskId, result) {
    try {
      const task = this.taskQueue.find(t => t.id === taskId);
      if (!task || !task.evomapTaskId) {
        return { error: 'Task not found or not from EvoMap' };
      }
      
      const response = await httpResilience.post(`${this.options.evomapUrl}/api/tasks/${task.evomapTaskId}/complete`, {
        result: result,
        agentId: task.assignedAgent,
        completedAt: new Date().toISOString()
      });
      
      console.log(`[Multi-Agent Collaboration] Task result submitted to EvoMap: ${task.evomapTaskId}`);
      return response;
    } catch (error) {
      console.error('[Multi-Agent Collaboration] Error submitting task result to EvoMap:', error);
      return { error: error.message };
    }
  }

  // 启动swarm
  startSwarm(swarmId) {
    const swarmFile = path.join(this.options.swarmDir, `${swarmId}.json`);
    if (!fs.existsSync(swarmFile)) {
      return { error: 'Swarm not found' };
    }
    
    const swarm = JSON.parse(fs.readFileSync(swarmFile, 'utf8'));
    swarm.status = 'running';
    swarm.started = new Date().toISOString();
    
    fs.writeFileSync(swarmFile, JSON.stringify(swarm, null, 2), 'utf8');
    
    // 注册swarm中的智能体
    swarm.agents.forEach(agentInfo => {
      this.registerAgent(agentInfo);
    });
    
    // 创建swarm中的任务
    swarm.tasks.forEach(taskInfo => {
      this.createTask(taskInfo);
    });
    
    console.log(`[Multi-Agent Collaboration] Swarm started: ${swarm.name} (${swarmId})`);
    
    return swarm;
  }

  // 停止swarm
  stopSwarm(swarmId) {
    const swarmFile = path.join(this.options.swarmDir, `${swarmId}.json`);
    if (!fs.existsSync(swarmFile)) {
      return { error: 'Swarm not found' };
    }
    
    const swarm = JSON.parse(fs.readFileSync(swarmFile, 'utf8'));
    swarm.status = 'stopped';
    swarm.stopped = new Date().toISOString();
    
    fs.writeFileSync(swarmFile, JSON.stringify(swarm, null, 2), 'utf8');
    
    // 取消swarm中的任务
    this.taskQueue
      .filter(task => task.swarmId === swarmId)
      .forEach(task => {
        this.cancelTask(task.id, 'Swarm stopped');
      });
    
    console.log(`[Multi-Agent Collaboration] Swarm stopped: ${swarm.name} (${swarmId})`);
    
    return swarm;
  }

  // 获取swarm状态
  getSwarmStatus(swarmId) {
    const swarmFile = path.join(this.options.swarmDir, `${swarmId}.json`);
    if (!fs.existsSync(swarmFile)) {
      return null;
    }
    
    const swarm = JSON.parse(fs.readFileSync(swarmFile, 'utf8'));
    
    // 添加当前状态
    const swarmTasks = this.taskQueue.filter(task => task.swarmId === swarmId);
    const swarmAgents = Array.from(this.agents.values()).filter(agent => agent.swarmId === swarmId);
    
    return {
      ...swarm,
      currentTasks: swarmTasks,
      currentAgents: swarmAgents,
      taskStats: {
        total: swarmTasks.length,
        pending: swarmTasks.filter(t => t.status === 'pending').length,
        assigned: swarmTasks.filter(t => t.status === 'assigned').length,
        completed: swarmTasks.filter(t => t.status === 'completed').length,
        cancelled: swarmTasks.filter(t => t.status === 'cancelled').length
      }
    };
  }

  // 获取所有swarms
  getAllSwarms() {
    const swarms = [];
    const swarmFiles = fs.readdirSync(this.options.swarmDir).filter(file => file.endsWith('.json'));
    
    swarmFiles.forEach(file => {
      try {
        const swarm = JSON.parse(fs.readFileSync(path.join(this.options.swarmDir, file), 'utf8'));
        if (swarm.id) {
          swarms.push(this.getSwarmStatus(swarm.id));
        }
      } catch (error) {
        console.error('[Multi-Agent Collaboration] Error reading swarm file:', error);
      }
    });
    
    return swarms;
  }

  // 清理过期任务
  cleanupExpiredTasks() {
    const now = Date.now();
    const expiredTasks = this.taskQueue.filter(task => {
      if (task.status === 'assigned') {
        const assignedTime = new Date(task.assignedAt).getTime();
        return (now - assignedTime) > this.options.agentTimeout;
      }
      return false;
    });
    
    expiredTasks.forEach(task => {
      this.cancelTask(task.id, 'Task expired due to timeout');
    });
    
    console.log(`[Multi-Agent Collaboration] Cleaned up ${expiredTasks.length} expired tasks`);
    return expiredTasks.length;
  }

  // 导出swarm数据
  exportSwarmData(swarmId) {
    const swarm = this.getSwarmStatus(swarmId);
    if (!swarm) {
      return { error: 'Swarm not found' };
    }
    
    const exportData = {
      swarm: swarm,
      tasks: this.taskQueue.filter(t => t.swarmId === swarmId),
      agents: Array.from(this.agents.values()).filter(a => a.swarmId === swarmId),
      exported: new Date().toISOString()
    };
    
    const exportFile = path.join(this.options.swarmDir, `export_${swarmId}_${Date.now()}.json`);
    fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2), 'utf8');
    
    console.log(`[Multi-Agent Collaboration] Swarm data exported: ${exportFile}`);
    return { exported: true, file: exportFile };
  }

  // 导入swarm数据
  importSwarmData(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const importData = JSON.parse(content);
      
      if (importData.swarm) {
        const swarmFile = path.join(this.options.swarmDir, `${importData.swarm.id}.json`);
        fs.writeFileSync(swarmFile, JSON.stringify(importData.swarm, null, 2), 'utf8');
      }
      
      if (importData.agents) {
        importData.agents.forEach(agent => {
          this.registerAgent(agent);
        });
      }
      
      if (importData.tasks) {
        importData.tasks.forEach(task => {
          this.taskQueue.push(task);
        });
      }
      
      console.log(`[Multi-Agent Collaboration] Swarm data imported from: ${filePath}`);
      return { imported: true };
    } catch (error) {
      console.error('[Multi-Agent Collaboration] Error importing swarm data:', error);
      return { imported: false, error: error.message };
    }
  }

  // 获取系统状态
  getStatus() {
    return {
      agents: {
        total: this.agents.size,
        available: Array.from(this.agents.values()).filter(a => a.status === 'available').length,
        busy: Array.from(this.agents.values()).filter(a => a.status === 'busy').length
      },
      tasks: {
        total: this.taskQueue.length,
        pending: this.taskQueue.filter(t => t.status === 'pending').length,
        assigned: this.taskQueue.filter(t => t.status === 'assigned').length,
        completed: this.taskQueue.filter(t => t.status === 'completed').length,
        cancelled: this.taskQueue.filter(t => t.status === 'cancelled').length
      },
      swarmCount: this.getAllSwarms().length,
      options: this.options,
      timestamp: new Date().toISOString()
    };
  }

  // 健康检查
  healthCheck() {
    return {
      status: 'healthy',
      agentsCount: this.agents.size,
      tasksCount: this.taskQueue.length,
      swarmCount: this.getAllSwarms().length,
      swarmDir: this.options.swarmDir,
      evomapUrl: this.options.evomapUrl,
      timestamp: new Date().toISOString()
    };
  }
}

// 导出单例
module.exports = new MultiAgentCollaboration();
module.exports.MultiAgentCollaboration = MultiAgentCollaboration;