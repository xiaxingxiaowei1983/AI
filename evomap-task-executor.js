const fs = require('fs');
const path = require('path');
const axios = require('axios');

class EvoMapTaskExecutor {
  constructor(config = {}) {
    this.config = {
      apiBaseUrl: config.apiBaseUrl || 'https://api.evomap.com',
      apiKey: config.apiKey || process.env.EVOMAP_API_KEY,
      taskTypes: config.taskTypes || ['general', 'skill', 'learning'],
      maxTasks: config.maxTasks || 5,
      pollingInterval: config.pollingInterval || 60000, // 1分钟
      taskTimeout: config.taskTimeout || 3600000, // 1小时
      ...config
    };
    
    this.taskQueue = [];
    this.executingTasks = new Map();
    this.taskHistory = [];
    this.skillsMap = new Map();
    this.agentsMap = new Map();
    
    this.loadSkills();
    this.loadAgents();
    this.loadTaskHistory();
  }

  loadSkills() {
    try {
      const skillsDir = path.join(__dirname, 'skills');
      if (fs.existsSync(skillsDir)) {
        const skillFiles = fs.readdirSync(skillsDir, { withFileTypes: true });
        skillFiles.forEach(dirent => {
          if (dirent.isDirectory()) {
            const skillPath = path.join(skillsDir, dirent.name);
            const skillFile = path.join(skillPath, 'SKILL.md');
            if (fs.existsSync(skillFile)) {
              const skillContent = fs.readFileSync(skillFile, 'utf8');
              const skillMatch = skillContent.match(/### 技能名称\s*:\s*(.+)/i);
              if (skillMatch) {
                const skillName = skillMatch[1].trim();
                this.skillsMap.set(skillName.toLowerCase(), {
                  name: skillName,
                  path: skillPath,
                  type: dirent.name
                });
              }
            }
          }
        });
      }
    } catch (error) {
      console.error('Error loading skills:', error.message);
    }
  }

  loadAgents() {
    try {
      const agentsDir = path.join(__dirname, 'agents');
      if (fs.existsSync(agentsDir)) {
        const agentDirs = fs.readdirSync(agentsDir, { withFileTypes: true });
        agentDirs.forEach(dirent => {
          if (dirent.isDirectory()) {
            const agentPath = path.join(agentsDir, dirent.name);
            const userFile = path.join(agentPath, 'USER.md');
            if (fs.existsSync(userFile)) {
              const userContent = fs.readFileSync(userFile, 'utf8');
              this.agentsMap.set(dirent.name, {
                name: dirent.name,
                path: agentPath,
                capabilities: this.extractCapabilities(userContent)
              });
            }
          }
        });
      }
    } catch (error) {
      console.error('Error loading agents:', error.message);
    }
  }

  extractCapabilities(content) {
    const capabilities = [];
    const capMatch = content.match(/### 核心能力\s*:\s*([\s\S]*?)(?=###|$)/i);
    if (capMatch) {
      const capText = capMatch[1];
      const capLines = capText.split('\n').filter(line => line.trim());
      capLines.forEach(line => {
        const cap = line.replace(/^[-*\s]+/, '').trim();
        if (cap) capabilities.push(cap);
      });
    }
    return capabilities;
  }

  loadTaskHistory() {
    try {
      const historyFile = path.join(__dirname, 'tasks', 'task-history.json');
      if (fs.existsSync(historyFile)) {
        const history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
        this.taskHistory = Array.isArray(history) ? history : [];
      }
    } catch (error) {
      console.error('Error loading task history:', error.message);
      this.taskHistory = [];
    }
  }

  saveTaskHistory() {
    try {
      const historyDir = path.join(__dirname, 'tasks');
      if (!fs.existsSync(historyDir)) {
        fs.mkdirSync(historyDir, { recursive: true });
      }
      const historyFile = path.join(historyDir, 'task-history.json');
      const trimmedHistory = this.taskHistory.slice(-1000); // 保留最近1000条
      fs.writeFileSync(historyFile, JSON.stringify(trimmedHistory, null, 2));
    } catch (error) {
      console.error('Error saving task history:', error.message);
    }
  }

  async getTasks() {
    try {
      const response = await axios.get(`${this.config.apiBaseUrl}/tasks`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        params: {
          types: this.config.taskTypes.join(','),
          limit: this.config.maxTasks
        }
      });
      
      return response.data.tasks || [];
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      return [];
    }
  }

  analyzeTask(task) {
    const analysis = {
      id: task.id,
      title: task.title,
      description: task.description,
      type: task.type || 'general',
      difficulty: task.difficulty || 'medium',
      reward: task.reward || 0,
      estimatedTime: task.estimatedTime || 30,
      requiredSkills: this.extractRequiredSkills(task.description),
      priority: this.calculatePriority(task),
      compatibilityScore: 0
    };
    
    return analysis;
  }

  extractRequiredSkills(description) {
    const skills = [];
    const skillKeywords = Array.from(this.skillsMap.keys());
    skillKeywords.forEach(keyword => {
      if (description.toLowerCase().includes(keyword)) {
        skills.push(this.skillsMap.get(keyword).name);
      }
    });
    return skills;
  }

  calculatePriority(task) {
    let priority = 0;
    
    // 基于难度
    const difficultyScore = {
      'easy': 1,
      'medium': 2,
      'hard': 3,
      'expert': 4
    }[task.difficulty || 'medium'] || 2;
    
    // 基于奖励
    const rewardScore = Math.min(Math.floor(task.reward / 100), 3);
    
    // 基于类型
    const typeScore = {
      'skill': 3,
      'learning': 2,
      'general': 1
    }[task.type || 'general'] || 1;
    
    priority = difficultyScore + rewardScore + typeScore;
    
    return Math.min(priority, 10);
  }

  findBestAgent(taskAnalysis) {
    let bestAgent = null;
    let bestScore = 0;
    
    this.agentsMap.forEach((agent, agentName) => {
      let score = 0;
      
      // 技能匹配
      taskAnalysis.requiredSkills.forEach(skill => {
        if (agent.capabilities.some(cap => 
          cap.toLowerCase().includes(skill.toLowerCase())
        )) {
          score += 3;
        }
      });
      
      // 工作负载考虑
      const agentTasks = this.executingTasks.size;
      const workloadFactor = Math.max(0, 1 - agentTasks * 0.2);
      score *= workloadFactor;
      
      if (score > bestScore) {
        bestScore = score;
        bestAgent = agentName;
      }
    });
    
    return bestAgent || 'master'; // 默认使用大宗师
  }

  prioritizeTasks(tasks) {
    return tasks.sort((a, b) => b.priority - a.priority);
  }

  async executeTask(taskAnalysis) {
    try {
      const agentName = this.findBestAgent(taskAnalysis);
      const taskId = taskAnalysis.id;
      
      console.log(`Executing task ${taskId} with agent ${agentName}`);
      
      this.executingTasks.set(taskId, {
        task: taskAnalysis,
        agent: agentName,
        startTime: Date.now(),
        status: 'in_progress'
      });
      
      // 模拟任务执行
      await new Promise(resolve => setTimeout(resolve, 30000)); // 模拟30秒执行时间
      
      const result = {
        taskId: taskId,
        status: 'completed',
        result: {
          success: true,
          output: `Task ${taskAnalysis.title} completed successfully by agent ${agentName}`,
          artifacts: []
        },
        executionTime: Date.now() - this.executingTasks.get(taskId).startTime
      };
      
      this.executingTasks.delete(taskId);
      await this.submitTaskResult(taskId, result);
      await this.learnFromTask(taskAnalysis, result);
      
      return result;
    } catch (error) {
      console.error('Error executing task:', error.message);
      
      const result = {
        taskId: taskAnalysis.id,
        status: 'failed',
        result: {
          success: false,
          error: error.message
        }
      };
      
      this.executingTasks.delete(taskAnalysis.id);
      await this.submitTaskResult(taskAnalysis.id, result);
      
      return result;
    }
  }

  async submitTaskResult(taskId, result) {
    try {
      await axios.post(`${this.config.apiBaseUrl}/tasks/${taskId}/submit`, {
        result: result.result
      }, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`Task ${taskId} result submitted successfully`);
      
      this.taskHistory.push({
        taskId,
        result,
        timestamp: new Date().toISOString()
      });
      
      this.saveTaskHistory();
    } catch (error) {
      console.error('Error submitting task result:', error.message);
    }
  }

  async learnFromTask(taskAnalysis, result) {
    try {
      if (result.status === 'completed' && result.result.success) {
        // 提取经验教训
        const experience = {
          taskId: taskAnalysis.id,
          title: taskAnalysis.title,
          skillsUsed: taskAnalysis.requiredSkills,
          agentUsed: this.findBestAgent(taskAnalysis),
          executionTime: result.executionTime,
          timestamp: new Date().toISOString()
        };
        
        // 保存经验到知识库
        const knowledgeDir = path.join(__dirname, 'shared-memory', 'knowledge');
        if (!fs.existsSync(knowledgeDir)) {
          fs.mkdirSync(knowledgeDir, { recursive: true });
        }
        
        const experienceFile = path.join(knowledgeDir, `task-experience-${Date.now()}.json`);
        fs.writeFileSync(experienceFile, JSON.stringify(experience, null, 2));
        
        console.log(`Learned from task ${taskAnalysis.id}`);
      }
    } catch (error) {
      console.error('Error learning from task:', error.message);
    }
  }

  async processTasks() {
    try {
      console.log('Processing tasks...');
      
      // 获取新任务
      const rawTasks = await this.getTasks();
      const analyzedTasks = rawTasks.map(task => this.analyzeTask(task));
      
      // 添加到队列
      this.taskQueue = [...this.taskQueue, ...analyzedTasks];
      
      // 去重
      const uniqueTasks = [];
      const taskIds = new Set();
      this.taskQueue.forEach(task => {
        if (!taskIds.has(task.id)) {
          taskIds.add(task.id);
          uniqueTasks.push(task);
        }
      });
      this.taskQueue = uniqueTasks;
      
      // 优先级排序
      this.taskQueue = this.prioritizeTasks(this.taskQueue);
      
      // 执行任务
      while (this.taskQueue.length > 0 && this.executingTasks.size < this.config.maxTasks) {
        const nextTask = this.taskQueue.shift();
        await this.executeTask(nextTask);
      }
      
      console.log(`Task processing complete. Queue: ${this.taskQueue.length}, Executing: ${this.executingTasks.size}`);
    } catch (error) {
      console.error('Error processing tasks:', error.message);
    }
  }

  startPolling() {
    console.log('Starting task polling...');
    
    this.pollingInterval = setInterval(async () => {
      await this.processTasks();
    }, this.config.pollingInterval);
    
    // 立即执行一次
    this.processTasks();
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      console.log('Task polling stopped');
    }
  }

  getStatus() {
    return {
      queueSize: this.taskQueue.length,
      executingTasks: this.executingTasks.size,
      taskHistorySize: this.taskHistory.length,
      skillsCount: this.skillsMap.size,
      agentsCount: this.agentsMap.size
    };
  }
}

// 导出模块
if (require.main === module) {
  // 直接运行时的逻辑
  const executor = new EvoMapTaskExecutor();
  executor.startPolling();
  
  // 优雅退出
  process.on('SIGINT', () => {
    console.log('Shutting down...');
    executor.stopPolling();
    process.exit(0);
  });
} else {
  module.exports = EvoMapTaskExecutor;
}