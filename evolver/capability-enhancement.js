const fs = require('fs');
const path = require('path');

const ENHANCEMENT_LOGS_FILE = path.join(__dirname, 'enhancement-logs.json');
const USER_TASKS_FILE = path.join(__dirname, 'user-tasks.json');

class CapabilityEnhancement {
  constructor() {
    this.enhancementLogs = this.loadEnhancementLogs();
    this.userTasks = this.loadUserTasks();
  }

  loadEnhancementLogs() {
    if (fs.existsSync(ENHANCEMENT_LOGS_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(ENHANCEMENT_LOGS_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading enhancement logs:', error.message);
        return [];
      }
    }
    return [];
  }

  loadUserTasks() {
    if (fs.existsSync(USER_TASKS_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(USER_TASKS_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading user tasks:', error.message);
        return [];
      }
    }
    return [];
  }

  saveEnhancementLogs() {
    fs.writeFileSync(ENHANCEMENT_LOGS_FILE, JSON.stringify(this.enhancementLogs, null, 2));
    console.log('Enhancement logs saved to', ENHANCEMENT_LOGS_FILE);
  }

  saveUserTasks() {
    fs.writeFileSync(USER_TASKS_FILE, JSON.stringify(this.userTasks, null, 2));
    console.log('User tasks saved to', USER_TASKS_FILE);
  }

  trackUserTask(task) {
    const trackedTask = {
      id: `task_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      ...task,
      timestamp: new Date().toISOString(),
      isAutomated: false
    };

    this.userTasks.push(trackedTask);
    this.saveUserTasks();
    return trackedTask;
  }

  identifyAutomationOpportunities() {
    const opportunities = [];
    const taskPatterns = this.identifyTaskPatterns();

    taskPatterns.forEach(pattern => {
      if (pattern.frequency >= 2) { // 至少出现2次的任务模式
        const automationPotential = this.assessAutomationPotential(pattern);
        if (automationPotential >= 0.6) { // 自动化潜力较高
          opportunities.push({
            pattern: pattern,
            automationPotential: automationPotential,
            suggestedCapability: this.generateSuggestedCapability(pattern)
          });
        }
      }
    });

    return opportunities.sort((a, b) => b.automationPotential - a.automationPotential);
  }

  identifyTaskPatterns() {
    const patterns = [];
    const taskGroups = this.groupSimilarTasks();

    taskGroups.forEach(group => {
      patterns.push({
        id: `pattern_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        description: this.describeTaskPattern(group.tasks),
        tasks: group.tasks,
        frequency: group.tasks.length,
        lastOccurrence: this.getLastOccurrence(group.tasks),
        averageExecutionTime: this.getAverageExecutionTime(group.tasks)
      });
    });

    return patterns;
  }

  groupSimilarTasks() {
    const groups = [];
    const seen = new Set();

    for (let i = 0; i < this.userTasks.length; i++) {
      if (seen.has(i)) continue;

      const currentTask = this.userTasks[i];
      const group = { tasks: [currentTask] };
      seen.add(i);

      for (let j = i + 1; j < this.userTasks.length; j++) {
        if (seen.has(j)) continue;
        const nextTask = this.userTasks[j];
        if (this.areTasksSimilar(currentTask, nextTask)) {
          group.tasks.push(nextTask);
          seen.add(j);
        }
      }

      if (group.tasks.length > 1) {
        groups.push(group);
      }
    }

    return groups;
  }

  areTasksSimilar(task1, task2) {
    // 基于任务类型和描述的相似度检查
    if (!task1.type || !task2.type) return false;
    if (task1.type !== task2.type) return false;

    // 检查描述相似度
    const desc1 = task1.description || '';
    const desc2 = task2.description || '';
    const similarity = this.calculateStringSimilarity(desc1, desc2);
    return similarity >= 0.7;
  }

  calculateStringSimilarity(str1, str2) {
    // 简单的字符串相似度计算
    if (str1 === str2) return 1.0;
    if (str1.length === 0 || str2.length === 0) return 0.0;

    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    const longerLength = longer.length;

    let matchCount = 0;
    for (let i = 0; i < longerLength; i++) {
      if (i < shorter.length && longer[i] === shorter[i]) {
        matchCount++;
      }
    }

    return matchCount / longerLength;
  }

  describeTaskPattern(tasks) {
    if (tasks.length === 0) return 'Empty pattern';
    const firstTask = tasks[0];
    return `${firstTask.type}: ${firstTask.description || 'Unknown task'}`;
  }

  getLastOccurrence(tasks) {
    return tasks
      .map(task => new Date(task.timestamp))
      .sort((a, b) => b - a)[0]
      .toISOString();
  }

  getAverageExecutionTime(tasks) {
    const times = tasks.map(task => task.executionTime || 0);
    if (times.length === 0) return 0;
    const sum = times.reduce((a, b) => a + b, 0);
    return sum / times.length;
  }

  assessAutomationPotential(pattern) {
    let potential = 0;

    // 基于频率的潜力
    potential += Math.min(1.0, pattern.frequency / 5) * 0.3;

    // 基于执行时间的潜力（执行时间越长，自动化潜力越高）
    potential += Math.min(1.0, pattern.averageExecutionTime / 10000) * 0.2;

    // 基于任务类型的潜力
    const typePotential = this.getTaskTypeAutomationPotential(pattern.tasks[0].type);
    potential += typePotential * 0.3;

    // 基于任务复杂度的潜力
    const complexityPotential = this.assessTaskComplexity(pattern.tasks[0]);
    potential += complexityPotential * 0.2;

    return Math.min(1.0, potential);
  }

  getTaskTypeAutomationPotential(taskType) {
    const typePotentials = {
      'data_entry': 0.9,
      'file_management': 0.8,
      'report_generation': 0.9,
      'email_handling': 0.7,
      'research': 0.6,
      'analysis': 0.5,
      'decision_making': 0.3
    };

    return typePotentials[taskType] || 0.4;
  }

  assessTaskComplexity(task) {
    // 基于任务参数和步骤评估复杂度
    const paramCount = Object.keys(task.parameters || {}).length;
    const stepCount = task.steps?.length || 0;

    const complexity = (paramCount * 0.3) + (stepCount * 0.7);
    // 复杂度越高，自动化潜力越高
    return Math.min(1.0, complexity / 10);
  }

  generateSuggestedCapability(pattern) {
    const task = pattern.tasks[0];
    return {
      name: `Automated ${task.type}: ${task.description || 'Task'}`,
      type: 'reusable_solution',
      inputs: this.extractInputsFromTask(task),
      outputs: this.extractOutputsFromTask(task),
      steps: task.steps || [],
      parameters: task.parameters || {},
      estimatedSavings: {
        time: pattern.averageExecutionTime * pattern.frequency,
        effort: pattern.frequency
      }
    };
  }

  extractInputsFromTask(task) {
    const inputs = [];
    if (task.parameters) {
      Object.keys(task.parameters).forEach(key => {
        inputs.push({
          name: key,
          type: typeof task.parameters[key],
          description: `Input parameter for ${task.type} task`
        });
      });
    }
    return inputs;
  }

  extractOutputsFromTask(task) {
    const outputs = [];
    if (task.result) {
      outputs.push({
        name: 'result',
        type: typeof task.result,
        description: `Result from ${task.type} task`
      });
    }
    return outputs;
  }

  enhanceCapability(capabilityId, improvements) {
    const enhancement = {
      id: `enhancement_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      capabilityId: capabilityId,
      timestamp: new Date().toISOString(),
      improvements: improvements,
      impact: this.assessEnhancementImpact(improvements)
    };

    this.enhancementLogs.push(enhancement);
    this.saveEnhancementLogs();
    return enhancement;
  }

  assessEnhancementImpact(improvements) {
    let impact = 0;

    if (improvements.inputs) impact += 0.2;
    if (improvements.outputs) impact += 0.2;
    if (improvements.steps) impact += 0.3;
    if (improvements.errorHandling) impact += 0.2;
    if (improvements.performance) impact += 0.1;

    return Math.min(1.0, impact);
  }

  suggestCapabilityEnhancements(capability) {
    const enhancements = [];

    // 基于使用数据的增强建议
    const usageBasedEnhancements = this.getUsageBasedEnhancements(capability);
    enhancements.push(...usageBasedEnhancements);

    // 基于相似能力的增强建议
    const similarityBasedEnhancements = this.getSimilarityBasedEnhancements(capability);
    enhancements.push(...similarityBasedEnhancements);

    // 基于行业最佳实践的增强建议
    const bestPracticeEnhancements = this.getBestPracticeEnhancements(capability.type);
    enhancements.push(...bestPracticeEnhancements);

    return enhancements.sort((a, b) => b.priority - a.priority);
  }

  getUsageBasedEnhancements(capability) {
    const enhancements = [];

    // 假设我们有能力的使用数据
    const usageData = this.getCapabilityUsageData(capability.id);
    if (usageData) {
      if (usageData.averageExecutionTime > 5000) {
        enhancements.push({
          type: 'performance',
          description: 'Optimize execution time',
          priority: 0.8,
          implementation: 'Identify bottlenecks and optimize critical paths'
        });
      }

      if (usageData.errorRate > 0.1) {
        enhancements.push({
          type: 'reliability',
          description: 'Improve error handling',
          priority: 0.9,
          implementation: 'Add more robust error handling and retry mechanisms'
        });
      }

      if (usageData.missingInputs > 0) {
        enhancements.push({
          type: 'usability',
          description: 'Improve input validation',
          priority: 0.7,
          implementation: 'Add better input validation and default values'
        });
      }
    }

    return enhancements;
  }

  getSimilarityBasedEnhancements(capability) {
    const enhancements = [];
    // 这里可以实现基于相似能力的增强建议
    // 例如，查找相似能力的最佳实践并应用到当前能力
    return enhancements;
  }

  getBestPracticeEnhancements(capabilityType) {
    const bestPractices = {
      'data_entry': [
        {
          type: 'automation',
          description: 'Add batch processing capability',
          priority: 0.7,
          implementation: 'Allow processing multiple entries at once'
        }
      ],
      'report_generation': [
        {
          type: 'formatting',
          description: 'Add export to multiple formats',
          priority: 0.6,
          implementation: 'Support PDF, Excel, and CSV formats'
        }
      ],
      'file_management': [
        {
          type: 'organization',
          description: 'Add file organization features',
          priority: 0.5,
          implementation: 'Support automatic file sorting and naming'
        }
      ]
    };

    return bestPractices[capabilityType] || [];
  }

  getCapabilityUsageData(capabilityId) {
    // 模拟能力使用数据
    return {
      averageExecutionTime: 3000,
      errorRate: 0.05,
      missingInputs: 0,
      usageCount: 10
    };
  }

  implementEnhancement(capabilityId, enhancement) {
    // 实现能力增强
    const implementation = {
      id: `implementation_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      capabilityId: capabilityId,
      enhancementId: enhancement.id,
      timestamp: new Date().toISOString(),
      status: 'in_progress',
      enhancement: enhancement
    };

    // 模拟实现过程
    setTimeout(() => {
      implementation.status = 'completed';
      implementation.completedAt = new Date().toISOString();
      console.log(`Enhancement implemented for capability ${capabilityId}`);
    }, 1000);

    return implementation;
  }

  getEnhancementHistory(capabilityId) {
    return this.enhancementLogs.filter(log => log.capabilityId === capabilityId);
  }

  generateEnhancementReport() {
    const report = {
      generatedAt: new Date().toISOString(),
      automationOpportunities: this.identifyAutomationOpportunities(),
      recentEnhancements: this.enhancementLogs.slice(-10),
      systemWideEnhancements: this.getSystemWideEnhancements(),
      recommendations: this.generateSystemRecommendations()
    };

    return report;
  }

  getSystemWideEnhancements() {
    const enhancements = [];
    // 识别系统级别的增强机会
    const taskTypes = [...new Set(this.userTasks.map(task => task.type))];
    
    taskTypes.forEach(type => {
      const typeTasks = this.userTasks.filter(task => task.type === type);
      if (typeTasks.length >= 3) {
        enhancements.push({
          type: type,
          taskCount: typeTasks.length,
          potentialSavings: this.calculatePotentialSavings(typeTasks)
        });
      }
    });

    return enhancements;
  }

  calculatePotentialSavings(tasks) {
    const totalTime = tasks.reduce((sum, task) => sum + (task.executionTime || 0), 0);
    const automationRate = 0.8; // 假设80%的任务可以自动化
    return totalTime * automationRate;
  }

  generateSystemRecommendations() {
    const recommendations = [];
    const opportunities = this.identifyAutomationOpportunities();

    if (opportunities.length > 0) {
      recommendations.push({
        type: 'automation',
        description: `Implement automation for ${opportunities.length} task patterns`,
        priority: 'high',
        impact: 'Significant time savings'
      });
    }

    // 基于系统使用数据的其他建议
    const systemUsage = this.analyzeSystemUsage();
    if (systemUsage.highErrorRateCapabilities.length > 0) {
      recommendations.push({
        type: 'reliability',
        description: `Improve reliability for ${systemUsage.highErrorRateCapabilities.length} capabilities`,
        priority: 'medium',
        impact: 'Reduced errors and improved user experience'
      });
    }

    return recommendations;
  }

  analyzeSystemUsage() {
    // 模拟系统使用分析
    return {
      highErrorRateCapabilities: [],
      mostUsedCapabilities: [],
      averageExecutionTime: 2500
    };
  }

  detectPatternChanges() {
    // 检测任务模式的变化
    const recentTasks = this.userTasks.filter(task => {
      const taskDate = new Date(task.timestamp);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 7);
      return taskDate >= cutoffDate;
    });

    const recentPatterns = this.identifyTaskPatterns().filter(pattern => {
      const lastOccurrence = new Date(pattern.lastOccurrence);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 7);
      return lastOccurrence >= cutoffDate;
    });

    return {
      recentTasks: recentTasks.length,
      recentPatterns: recentPatterns.length,
      emergingPatterns: recentPatterns.filter(pattern => pattern.frequency >= 2)
    };
  }
}

module.exports = CapabilityEnhancement;