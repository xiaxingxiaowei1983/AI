// 调度规则配置模块

const schedulingRules = {
  // 智能体选择规则
  agentSelection: {
    // 基于能力匹配的规则
    capabilityBased: {
      priority: 1,
      description: '根据任务所需能力选择最匹配的智能体',
      evaluate: (task, agents) => {
        const requiredCapabilities = task.requirements?.capabilities || [];
        
        return agents.map(agent => {
          const agentCapabilities = agent.capabilities || [];
          const matchingCapabilities = requiredCapabilities.filter(cap => 
            agentCapabilities.includes(cap)
          );
          
          return {
            agent,
            score: matchingCapabilities.length / requiredCapabilities.length || 0,
            reason: `匹配 ${matchingCapabilities.length}/${requiredCapabilities.length} 个能力`
          };
        }).sort((a, b) => b.score - a.score);
      }
    },
    
    // 基于工作量的规则
    workloadBased: {
      priority: 2,
      description: '选择当前工作量最低的智能体',
      evaluate: (task, agents) => {
        return agents.map(agent => {
          const workload = agent.workload || 0;
          return {
            agent,
            score: 1 / (workload + 1),
            reason: `当前工作量: ${workload}`
          };
        }).sort((a, b) => b.score - a.score);
      }
    },
    
    // 基于性能的规则
    performanceBased: {
      priority: 3,
      description: '选择历史表现最好的智能体',
      evaluate: (task, agents) => {
        return agents.map(agent => {
          const successRate = agent.performance?.successRate || 0;
          return {
            agent,
            score: successRate,
            reason: `成功率: ${(successRate * 100).toFixed(1)}%`
          };
        }).sort((a, b) => b.score - a.score);
      }
    }
  },
  
  // 任务优先级规则
  taskPriority: {
    // 基于任务类型的优先级
    typeBased: {
      priority: 1,
      description: '根据任务类型设置优先级',
      evaluate: (task) => {
        const typePriorities = {
          'emergency': 10,
          'high': 8,
          'medium': 5,
          'low': 3,
          'routine': 1
        };
        
        return typePriorities[task.priority || 'medium'] || 5;
      }
    },
    
    // 基于截止时间的优先级
    deadlineBased: {
      priority: 2,
      description: '根据截止时间设置优先级',
      evaluate: (task) => {
        if (!task.deadline) return 5;
        
        const now = Date.now();
        const deadline = new Date(task.deadline).getTime();
        const timeUntilDeadline = deadline - now;
        
        if (timeUntilDeadline <= 0) return 10; // 已过期
        if (timeUntilDeadline < 24 * 60 * 60 * 1000) return 9; // 24小时内
        if (timeUntilDeadline < 7 * 24 * 60 * 60 * 1000) return 7; // 7天内
        return 5; // 7天以上
      }
    }
  },
  
  // 任务分配规则
  taskAssignment: {
    // 能力阈值规则
    capabilityThreshold: {
      priority: 1,
      description: '智能体必须满足最低能力要求',
      validate: (task, agent) => {
        const requiredCapabilities = task.requirements?.capabilities || [];
        const agentCapabilities = agent.capabilities || [];
        
        const requiredCapabilitiesMet = requiredCapabilities.every(cap => 
          agentCapabilities.includes(cap)
        );
        
        return {
          valid: requiredCapabilities.length === 0 || requiredCapabilitiesMet,
          reason: requiredCapabilitiesMet 
            ? '满足所有能力要求' 
            : '缺少必要能力'
        };
      }
    },
    
    // 工作量限制规则
    workloadLimit: {
      priority: 2,
      description: '智能体工作量不能超过限制',
      validate: (task, agent) => {
        const currentWorkload = agent.workload || 0;
        const taskWorkload = task.workload || 1;
        const maxWorkload = agent.maxWorkload || 5;
        
        const newWorkload = currentWorkload + taskWorkload;
        const workloadValid = newWorkload <= maxWorkload;
        
        return {
          valid: workloadValid,
          reason: workloadValid 
            ? `工作量在限制范围内: ${newWorkload}/${maxWorkload}` 
            : `工作量超出限制: ${newWorkload}/${maxWorkload}`
        };
      }
    }
  },
  
  // 特殊任务处理规则
  specialTaskHandling: {
    // 内容生成任务
    contentCreation: {
      taskType: 'content_creation',
      description: '内容生成任务处理规则',
      agentFilter: (agents) => {
        return agents.filter(agent => 
          agent.capabilities?.includes('content_creation')
        );
      },
      defaultAgent: 'green-tea',
      timeout: 60000
    },
    
    // 商业分析任务
    businessAnalysis: {
      taskType: 'business_analysis',
      description: '商业分析任务处理规则',
      agentFilter: (agents) => {
        return agents.filter(agent => 
          agent.capabilities?.includes('business_model_analysis')
        );
      },
      defaultAgent: 'master',
      timeout: 120000
    },
    
    // 心理测试任务
    psychologicalTest: {
      taskType: 'psychological_test',
      description: '心理测试任务处理规则',
      agentFilter: (agents) => {
        return agents.filter(agent => 
          agent.capabilities?.includes('psychological_test')
        );
      },
      defaultAgent: 'green-tea',
      timeout: 30000
    }
  }
};

module.exports = schedulingRules;