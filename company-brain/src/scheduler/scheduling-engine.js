// 调度引擎模块

const schedulingRules = require('./scheduling-rules');

class SchedulingEngine {
  constructor(config) {
    this.config = config;
    this.taskAnalyzer = null;
    this.agentManager = null;
    this.taskTracker = null;
  }
  
  async init() {
    console.log('🔧 初始化调度引擎...');
    
    // 调度引擎初始化完成
    console.log('✅ 调度引擎初始化完成');
  }
  
  // 设置依赖
  setDependencies(taskAnalyzer, agentManager, taskTracker) {
    this.taskAnalyzer = taskAnalyzer;
    this.agentManager = agentManager;
    this.taskTracker = taskTracker;
  }
  
  async selectAgent(analysisResult) {
    try {
      console.log('🎯 选择智能体...');
      
      // 获取所有可用智能体
      const availableAgents = await this.agentManager.getAvailableAgents();
      
      if (availableAgents.length === 0) {
        console.error('❌ 没有可用的智能体');
        return null;
      }
      
      // 根据任务分析结果选择智能体
      const suitableAgents = this.filterSuitableAgents(availableAgents, analysisResult);
      
      if (suitableAgents.length === 0) {
        console.error('❌ 没有合适的智能体');
        return null;
      }
      
      // 对智能体进行排序
      const sortedAgents = this.rankAgents(suitableAgents, analysisResult);
      
      // 选择最佳智能体
      const bestAgent = sortedAgents[0];
      
      console.log(`✅ 选择智能体成功: ${bestAgent.name}`);
      return bestAgent;
    } catch (error) {
      console.error('❌ 选择智能体失败:', error.message);
      return null;
    }
  }
  
  filterSuitableAgents(agents, analysisResult) {
    try {
      const { requiredSkills, type: taskType } = analysisResult;
      
      console.log('🔍 过滤智能体:', {
        availableAgents: agents.length,
        requiredSkills,
        taskType
      });
      
      const filteredAgents = agents.filter(agent => {
        // 检查智能体是否具有所需技能
        const hasRequiredSkills = requiredSkills.every(skill => {
          return agent.capabilities && agent.capabilities.includes(skill);
        });
        
        // 检查智能体类型是否匹配任务类型
        const typeMatch = this.isTypeMatch(agent.type, taskType);
        
        // 检查智能体工作量是否在可接受范围内
        const workloadAcceptable = agent.workload < 5; // 假设最大工作量为5
        
        console.log('🔍 智能体检查:', {
          agent: agent.name,
          hasRequiredSkills,
          typeMatch,
          workloadAcceptable,
          agentType: agent.type,
          agentCapabilities: agent.capabilities
        });
        
        return hasRequiredSkills && typeMatch && workloadAcceptable;
      });
      
      console.log('✅ 过滤后智能体数量:', filteredAgents.length);
      return filteredAgents;
    } catch (error) {
      console.error('❌ 过滤智能体失败:', error.message);
      return agents;
    }
  }
  
  isTypeMatch(agentType, taskType) {
    // 智能体类型与任务类型匹配规则
    const typeMap = {
      'psychological': ['analysis', 'support', 'testing'],
      'business': ['analysis', 'management'],
      'content': ['creation', 'modification'],
      'design': ['creation', 'modification'],
      'programming': ['creation', 'modification', 'testing'],
      'data': ['analysis', 'testing'],
      'research': ['analysis', 'research']
    };
    
    const matchingTaskTypes = typeMap[agentType] || [];
    return matchingTaskTypes.includes(taskType) || taskType === 'general';
  }
  
  rankAgents(agents, analysisResult) {
    try {
      const { complexity, priority, requiredSkills } = analysisResult;
      
      // 对智能体进行评分和排序
      return agents.sort((a, b) => {
        const scoreA = this.calculateAgentScore(a, complexity, priority, requiredSkills);
        const scoreB = this.calculateAgentScore(b, complexity, priority, requiredSkills);
        return scoreB - scoreA;
      });
    } catch (error) {
      console.error('❌ 排序智能体失败:', error.message);
      return agents;
    }
  }
  
  calculateAgentScore(agent, complexity, priority, requiredSkills) {
    let score = 0;
    
    // 基于技能匹配度的评分
    const skillMatchScore = this.calculateSkillMatchScore(agent, requiredSkills);
    score += skillMatchScore * 0.4;
    
    // 基于工作量的评分（工作量越低得分越高）
    const workloadScore = Math.max(0, 5 - agent.workload) / 5;
    score += workloadScore * 0.2;
    
    // 基于性能的评分
    const performanceScore = agent.performance?.successRate || 1.0;
    score += performanceScore * 0.3;
    
    // 基于优先级的评分调整
    if (priority === 'high') {
      score += 0.1;
    }
    
    // 基于复杂度的评分调整
    if (complexity === 'high' && agent.performance?.completedTasks > 10) {
      score += 0.1;
    }
    
    return score;
  }
  
  calculateSkillMatchScore(agent, requiredSkills) {
    if (!requiredSkills || requiredSkills.length === 0) {
      return 1.0;
    }
    
    if (!agent.capabilities) {
      return 0.0;
    }
    
    const matchingSkills = requiredSkills.filter(skill => 
      agent.capabilities.includes(skill)
    );
    
    return matchingSkills.length / requiredSkills.length;
  }
  
  async assignTask(task, agent) {
    try {
      console.log(`📤 分配任务: ${task.id} 给 ${agent.name}`);
      
      // 更新智能体工作量
      await this.agentManager.updateAgentWorkload(agent.id, 1);
      
      // 创建任务分配记录
      const assignment = {
        taskId: task.id,
        agentId: agent.id,
        agentName: agent.name,
        assignedAt: new Date().toISOString(),
        status: 'assigned'
      };
      
      // 这里可以添加任务分配的额外逻辑，例如：
      // 1. 发送任务通知给智能体
      // 2. 记录任务分配历史
      // 3. 设置任务超时处理
      
      console.log(`✅ 任务分配成功: ${task.id} → ${agent.name}`);
      return assignment;
    } catch (error) {
      console.error('❌ 分配任务失败:', error.message);
      throw error;
    }
  }
  
  async reassignTask(taskId, reason) {
    try {
      console.log(`🔄 重新分配任务: ${taskId}, 原因: ${reason}`);
      
      // 获取任务
      const task = await this.taskTracker.getTask(taskId);
      
      // 如果任务已分配，更新原智能体工作量
      if (task.assignedTo) {
        await this.agentManager.updateAgentWorkload(task.assignedTo, -1);
      }
      
      // 分析任务
      const analysisResult = task.analysis || await this.taskAnalyzer.analyze(task);
      
      // 选择新智能体
      const newAgent = await this.selectAgent(analysisResult);
      
      if (!newAgent) {
        throw new Error('没有合适的智能体可重新分配');
      }
      
      // 分配任务给新智能体
      const assignmentResult = await this.assignTask(task, newAgent);
      
      // 更新任务状态
      await this.taskTracker.updateTask(taskId, {
        status: 'reassigned',
        assignedTo: newAgent.id,
        assignedAt: new Date().toISOString(),
        reassignmentReason: reason
      });
      
      console.log(`✅ 任务重新分配成功: ${taskId} → ${newAgent.name}`);
      return assignmentResult;
    } catch (error) {
      console.error('❌ 重新分配任务失败:', error.message);
      throw error;
    }
  }
  
  async handleTaskCompletion(taskId, success, result) {
    try {
      console.log(`✅ 处理任务完成: ${taskId}, 成功: ${success}`);
      
      // 获取任务
      const task = await this.taskTracker.getTask(taskId);
      
      // 更新智能体工作量
      if (task.assignedTo) {
        await this.agentManager.updateAgentWorkload(task.assignedTo, -1);
        
        // 更新智能体性能
        await this.agentManager.updateAgentPerformance(task.assignedTo, {
          completedTasks: (task.assignedAgent?.performance?.completedTasks || 0) + 1,
          successRate: this.calculateNewSuccessRate(task.assignedTo, success)
        });
      }
      
      // 更新任务状态
      await this.taskTracker.updateTask(taskId, {
        status: success ? 'completed' : 'failed',
        completedAt: new Date().toISOString(),
        result: result
      });
      
      console.log(`✅ 任务完成处理成功: ${taskId}`);
    } catch (error) {
      console.error('❌ 处理任务完成失败:', error.message);
      throw error;
    }
  }
  
  async calculateNewSuccessRate(agentId, success) {
    try {
      const agent = await this.agentManager.getAgent(agentId);
      const currentPerformance = agent.performance || {
        completedTasks: 0,
        successRate: 1.0
      };
      
      const totalTasks = currentPerformance.completedTasks + 1;
      const totalSuccesses = (currentPerformance.completedTasks * currentPerformance.successRate) + (success ? 1 : 0);
      
      return totalSuccesses / totalTasks;
    } catch (error) {
      console.error('❌ 计算成功率失败:', error.message);
      return 1.0;
    }
  }
  
  async getSchedulingStats() {
    try {
      const stats = {
        totalAssignments: 0,
        successfulAssignments: 0,
        averageAssignmentTime: 0,
        agentDistribution: {}
      };
      
      // 这里可以添加统计逻辑，例如：
      // 1. 统计总分配任务数
      // 2. 统计成功分配任务数
      // 3. 统计平均分配时间
      // 4. 统计智能体任务分布
      
      return stats;
    } catch (error) {
      console.error('❌ 获取调度统计失败:', error.message);
      return {
        totalAssignments: 0,
        successfulAssignments: 0,
        averageAssignmentTime: 0,
        agentDistribution: {}
      };
    }
  }
  
  // 获取调度规则信息
  getSchedulingRules() {
    return {
      agentSelection: Object.keys(schedulingRules.agentSelection),
      taskPriority: Object.keys(schedulingRules.taskPriority),
      taskAssignment: Object.keys(schedulingRules.taskAssignment),
      specialTaskHandling: Object.keys(schedulingRules.specialTaskHandling)
    };
  }
  
  // 应用调度规则验证任务分配
  validateTaskAssignment(task, agent) {
    try {
      const validationResults = [];
      
      for (const ruleName in schedulingRules.taskAssignment) {
        const rule = schedulingRules.taskAssignment[ruleName];
        const validation = rule.validate(task, agent);
        validationResults.push({
          rule: ruleName,
          valid: validation.valid,
          reason: validation.reason
        });
      }
      
      const invalidValidations = validationResults.filter(v => !v.valid);
      const isValid = invalidValidations.length === 0;
      
      return {
        valid: isValid,
        results: validationResults,
        invalidReasons: invalidValidations.map(v => v.reason)
      };
    } catch (error) {
      console.error('❌ 验证任务分配失败:', error.message);
      return {
        valid: false,
        results: [],
        invalidReasons: [error.message]
      };
    }
  }
}

module.exports = SchedulingEngine;
