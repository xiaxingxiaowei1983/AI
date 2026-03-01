// 能力评估和任务分配系统
const fs = require('fs');
const path = require('path');

class CapabilityEvaluator {
  constructor() {
    this.registryPath = path.join(__dirname, 'agent_registry.json');
    this.loadRegistry();
  }

  // 加载智能体注册表
  loadRegistry() {
    try {
      const data = fs.readFileSync(this.registryPath, 'utf8');
      this.registry = JSON.parse(data);
    } catch (error) {
      console.error('Error loading registry:', error);
      this.registry = {
        registry: {
          agents: [],
          version: '1.0.0',
          last_updated: new Date().toISOString(),
          total_agents: 0
        },
        task_allocation: {
          strategy: 'value_based',
          prioritization: ['value_score', 'agent_capability_match', 'current_load', 'response_time'],
          load_balancing: true,
          failover: true
        },
        performance_metrics: {
          metrics: ['response_time', 'success_rate', 'token_usage', 'user_satisfaction', 'error_rate'],
          reporting: {
            frequency: 'daily',
            format: 'json'
          }
        }
      };
    }
  }

  // 保存注册表
  saveRegistry() {
    this.registry.registry.last_updated = new Date().toISOString();
    fs.writeFileSync(this.registryPath, JSON.stringify(this.registry, null, 2));
  }

  // VFM价值评估
  evaluateValue(task) {
    const dimensions = {
      highFrequency: this.calculateHighFrequencyScore(task),
      failureReduction: this.calculateFailureReductionScore(task),
      userBurden: this.calculateUserBurdenScore(task),
      selfCost: this.calculateSelfCostScore(task)
    };

    const weightedScore = (
      dimensions.highFrequency * 3 +
      dimensions.failureReduction * 3 +
      dimensions.userBurden * 2 +
      dimensions.selfCost * 2
    );

    return {
      dimensions,
      totalScore: weightedScore,
      viable: weightedScore >= 50
    };
  }

  // 计算高频复用得分
  calculateHighFrequencyScore(task) {
    // 基于任务类型和历史执行频率
    const frequencyMap = {
      '日常运营': 8,
      '紧急任务': 6,
      '项目管理': 7,
      '资源协调': 9,
      '流程优化': 7
    };

    return frequencyMap[task.type] || 5;
  }

  // 计算降低失败得分
  calculateFailureReductionScore(task) {
    // 基于任务复杂度和风险
    if (task.complexity === 'high') return 8;
    if (task.complexity === 'medium') return 6;
    return 4;
  }

  // 计算减轻心智负担得分
  calculateUserBurdenScore(task) {
    // 基于任务自动化程度
    if (task.automation === 'high') return 9;
    if (task.automation === 'medium') return 6;
    return 3;
  }

  // 计算降低自身成本得分
  calculateSelfCostScore(task) {
    // 基于任务执行时间和资源需求
    if (task.resourceIntensive === 'low') return 8;
    if (task.resourceIntensive === 'medium') return 5;
    return 2;
  }

  // 任务分配
  allocateTask(task) {
    const valueEvaluation = this.evaluateValue(task);
    
    if (!valueEvaluation.viable) {
      return {
        status: 'rejected',
        reason: 'Task value score below threshold',
        score: valueEvaluation.totalScore
      };
    }

    // 筛选具备相应能力的智能体
    const eligibleAgents = this.registry.registry.agents.filter(agent => {
      return agent.status === 'active' && 
             agent.capabilities.some(capability => task.requiredCapabilities.includes(capability));
    });

    if (eligibleAgents.length === 0) {
      return {
        status: 'rejected',
        reason: 'No eligible agents found'
      };
    }

    // 基于优先级排序
    const prioritizedAgents = eligibleAgents.sort((a, b) => {
      // 1. 能力匹配度
      const aMatchScore = task.requiredCapabilities.filter(cap => a.capabilities.includes(cap)).length;
      const bMatchScore = task.requiredCapabilities.filter(cap => b.capabilities.includes(cap)).length;
      
      if (aMatchScore !== bMatchScore) return bMatchScore - aMatchScore;

      // 2. 响应时间
      const responseTimeMap = { fast: 3, medium: 2, slow: 1 };
      if (responseTimeMap[a.performance.response_time] !== responseTimeMap[b.performance.response_time]) {
        return responseTimeMap[b.performance.response_time] - responseTimeMap[a.performance.response_time];
      }

      // 3. 成功率
      const successRateMap = { high: 3, medium: 2, low: 1 };
      if (successRateMap[a.performance.success_rate] !== successRateMap[b.performance.success_rate]) {
        return successRateMap[b.performance.success_rate] - successRateMap[a.performance.success_rate];
      }

      // 4. Token使用
      const tokenUsageMap = { low: 3, medium: 2, high: 1 };
      return tokenUsageMap[a.performance.token_usage] - tokenUsageMap[b.performance.token_usage];
    });

    return {
      status: 'allocated',
      agent: prioritizedAgents[0],
      valueScore: valueEvaluation.totalScore,
      allocationReason: `Best match based on capability match (${task.requiredCapabilities.filter(cap => prioritizedAgents[0].capabilities.includes(cap)).length}/${task.requiredCapabilities.length}) and performance metrics`
    };
  }

  // 更新智能体性能数据
  updateAgentPerformance(agentId, performanceData) {
    const agent = this.registry.registry.agents.find(a => a.id === agentId);
    if (agent) {
      Object.assign(agent.performance, performanceData);
      agent.last_active = new Date().toISOString();
      this.saveRegistry();
      return true;
    }
    return false;
  }

  // 获取性能报告
  generatePerformanceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      agents: this.registry.registry.agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        status: agent.status,
        performance: agent.performance,
        last_active: agent.last_active
      })),
      summary: {
        total_agents: this.registry.registry.total_agents,
        active_agents: this.registry.registry.agents.filter(a => a.status === 'active').length
      }
    };

    return report;
  }

  // 能力抽象 - 从任务执行中提取可复用能力
  abstractCapability(task, executionResult) {
    // 分析任务执行过程，提取可复用模式
    const capability = {
      id: `cap_${Date.now()}`,
      name: task.name,
      description: `从任务执行中抽象的能力: ${task.description}`,
      input: task.input || {},
      output: executionResult.output || {},
      successCriteria: executionResult.success ? '成功执行' : '失败执行',
      failurePoints: executionResult.errors || [],
      abstractionDate: new Date().toISOString()
    };

    return capability;
  }

  // 智能体发现和注册
  discoverAgents() {
    // 扫描agents目录，发现新智能体
    const agentsDir = path.join(__dirname, '..');
    const agentDirs = fs.readdirSync(agentsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    agentDirs.forEach(agentId => {
      const agentPromptPath = path.join(agentsDir, agentId, 'agent.prompt');
      if (fs.existsSync(agentPromptPath)) {
        const existingAgent = this.registry.registry.agents.find(a => a.id === agentId);
        if (!existingAgent) {
          // 读取agent.prompt文件，提取基本信息
          const promptContent = fs.readFileSync(agentPromptPath, 'utf8');
          const nameMatch = promptContent.match(/# (.*?)智能体/);
          const roleMatch = promptContent.match(/role.*?: (.*?)$/im);

          const newAgent = {
            id: agentId,
            name: nameMatch ? nameMatch[1] : agentId,
            type: 'unknown',
            role: roleMatch ? roleMatch[1] : '未知角色',
            capabilities: [],
            status: 'active',
            performance: {
              response_time: 'medium',
              success_rate: 'medium',
              token_usage: 'medium'
            },
            last_active: new Date().toISOString()
          };

          this.registry.registry.agents.push(newAgent);
          this.registry.registry.total_agents++;
        }
      }
    });

    this.saveRegistry();
  }
}

// 导出模块
module.exports = CapabilityEvaluator;

// 测试代码
if (require.main === module) {
  const evaluator = new CapabilityEvaluator();
  
  // 测试任务分配
  const testTask = {
    id: 'task_1',
    name: '优化运营流程',
    description: '分析并优化公司的运营流程，提高效率',
    type: '流程优化',
    complexity: 'high',
    automation: 'medium',
    resourceIntensive: 'low',
    requiredCapabilities: ['流程控制', '资源协调', '信息同步']
  };

  console.log('Testing task allocation...');
  const allocationResult = evaluator.allocateTask(testTask);
  console.log('Allocation result:', allocationResult);

  // 测试能力抽象
  console.log('\nTesting capability abstraction...');
  const executionResult = {
    success: true,
    output: { optimizedProcess: '新的优化流程' },
    errors: []
  };
  const abstractedCapability = evaluator.abstractCapability(testTask, executionResult);
  console.log('Abstracted capability:', abstractedCapability);

  // 测试智能体发现
  console.log('\nTesting agent discovery...');
  evaluator.discoverAgents();
  console.log('Agents discovered:', evaluator.registry.registry.agents.length);

  // 测试性能报告
  console.log('\nTesting performance report...');
  const report = evaluator.generatePerformanceReport();
  console.log('Performance report generated:', report.summary);
}
