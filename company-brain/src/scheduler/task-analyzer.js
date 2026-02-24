// 任务分析器模块

class TaskAnalyzer {
  constructor(config) {
    this.config = config;
  }
  
  async init() {
    console.log('🔧 初始化任务分析器...');
    
    // 初始化完成
    console.log('✅ 任务分析器初始化完成');
  }
  
  async analyze(task) {
    try {
      console.log(`🔍 分析任务: ${task.id || task.title || '未命名任务'}`);
      
      // 提取任务信息
      const title = task.title || '';
      const description = task.description || '';
      const content = task.content || '';
      const context = task.context || {};
      
      // 分析任务类型
      const taskType = this.analyzeTaskType(title, description, content);
      
      // 分析任务复杂度
      const complexity = this.analyzeComplexity(title, description, content);
      
      // 分析任务优先级
      const priority = this.analyzePriority(task.priority, title, description);
      
      // 分析所需技能
      const requiredSkills = this.analyzeRequiredSkills(title, description, content, context);
      
      // 分析任务时间估计
      const timeEstimate = this.estimateTime(complexity, requiredSkills);
      
      // 生成分析结果
      const analysisResult = {
        type: taskType,
        complexity: complexity,
        priority: priority,
        requiredSkills: requiredSkills,
        timeEstimate: timeEstimate,
        keywords: this.extractKeywords(title, description, content),
        createdAt: new Date().toISOString()
      };
      
      console.log(`✅ 任务分析完成: ${JSON.stringify(analysisResult)}`);
      return analysisResult;
    } catch (error) {
      console.error('❌ 分析任务失败:', error.message);
      // 返回默认分析结果
      return {
        type: 'general',
        complexity: 'low',
        priority: 'medium',
        requiredSkills: [],
        timeEstimate: 'short',
        keywords: [],
        createdAt: new Date().toISOString()
      };
    }
  }
  
  analyzeTaskType(title, description, content) {
    const text = `${title} ${description} ${content}`.toLowerCase();
    
    // 任务类型识别
    if (text.includes('分析') || text.includes('研究') || text.includes('调研')) {
      return 'analysis';
    } else if (text.includes('创建') || text.includes('生成') || text.includes('编写')) {
      return 'creation';
    } else if (text.includes('修改') || text.includes('更新') || text.includes('优化')) {
      return 'modification';
    } else if (text.includes('测试') || text.includes('验证') || text.includes('检查')) {
      return 'testing';
    } else if (text.includes('管理') || text.includes('组织') || text.includes('协调')) {
      return 'management';
    } else if (text.includes('客服') || text.includes('支持') || text.includes('回答')) {
      return 'support';
    } else {
      return 'general';
    }
  }
  
  analyzeComplexity(title, description, content) {
    const text = `${title} ${description} ${content}`;
    
    // 基于文本长度和复杂度词汇分析
    const length = text.length;
    const complexWords = [
      '复杂', '困难', '挑战', '多步骤', '综合', '系统', '架构', '优化'
    ];
    
    let complexityScore = 0;
    
    // 基于长度的评分
    if (length > 1000) complexityScore += 3;
    else if (length > 500) complexityScore += 2;
    else if (length > 200) complexityScore += 1;
    
    // 基于复杂度词汇的评分
    for (const word of complexWords) {
      if (text.includes(word)) complexityScore += 1;
    }
    
    // 确定复杂度级别
    if (complexityScore >= 4) return 'high';
    else if (complexityScore >= 2) return 'medium';
    else return 'low';
  }
  
  analyzePriority(taskPriority, title, description) {
    // 如果任务已有优先级，直接使用
    if (taskPriority) {
      return taskPriority;
    }
    
    const text = `${title} ${description}`.toLowerCase();
    
    // 基于紧急词汇分析
    const urgentWords = [
      '紧急', '立刻', '马上', '现在', '急需', '重要', '关键', '必须'
    ];
    
    let urgentCount = 0;
    for (const word of urgentWords) {
      if (text.includes(word)) urgentCount += 1;
    }
    
    if (urgentCount >= 2) return 'high';
    else if (urgentCount >= 1) return 'medium';
    else return 'low';
  }
  
  analyzeRequiredSkills(title, description, content, context) {
    const text = `${title} ${description} ${content}`.toLowerCase();
    const skills = [];
    
    // 技能识别
    if (text.includes('心理') || text.includes('测试')) {
      skills.push('psychological_test');
    }
    
    if (text.includes('商业') || text.includes('商业模式')) {
      skills.push('business_model_analysis');
    }
    
    if (text.includes('市场') || text.includes('营销')) {
      skills.push('market_analysis');
    }
    
    if (text.includes('创作') || text.includes('写作') || text.includes('内容')) {
      skills.push('content_creation');
    }
    
    if (text.includes('设计') || text.includes('界面') || text.includes('UI')) {
      skills.push('drawing_analysis');
    }
    
    if (text.includes('发布') || text.includes('管理')) {
      skills.push('publishing_management');
    }
    
    if (text.includes('财务') || text.includes('金融')) {
      skills.push('financial_analysis');
    }
    
    if (text.includes('战略') || text.includes('规划')) {
      skills.push('strategic_planning');
    }
    
    if (text.includes('问题') || text.includes('诊断')) {
      skills.push('problem_diagnosis');
    }
    
    return skills;
  }
  
  estimateTime(complexity, requiredSkills) {
    // 基于复杂度和所需技能估计时间
    let timeScore = 0;
    
    // 基于复杂度的时间估计
    if (complexity === 'high') timeScore += 3;
    else if (complexity === 'medium') timeScore += 2;
    else timeScore += 1;
    
    // 基于技能数量的时间估计
    timeScore += Math.min(requiredSkills.length, 3);
    
    // 确定时间估计
    if (timeScore >= 5) return 'long';
    else if (timeScore >= 3) return 'medium';
    else return 'short';
  }
  
  extractKeywords(title, description, content) {
    const text = `${title} ${description} ${content}`;
    
    // 简单的关键词提取
    const stopWords = new Set([
      '的', '了', '和', '与', '或', '是', '在', '有', '为', '以', '我们', '你', '他', '她', '它',
      'this', 'that', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with'
    ]);
    
    // 提取单词
    const matches = text
      .toLowerCase()
      .match(/\b\w+\b/g);
    
    if (!matches) {
      return [];
    }
    
    const words = matches.filter(word => word.length > 2 && !stopWords.has(word));
    
    // 计算词频
    const wordFreq = {};
    for (const word of words) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
    
    // 排序并返回前10个关键词
    return Object.keys(wordFreq)
      .sort((a, b) => wordFreq[b] - wordFreq[a])
      .slice(0, 10);
  }
  
  async getTaskAnalysisStats() {
    try {
      // 这里可以实现统计分析功能
      // 例如：分析任务类型分布、复杂度分布等
      return {
        taskTypeDistribution: {
          general: 0,
          analysis: 0,
          creation: 0,
          modification: 0,
          testing: 0,
          management: 0,
          support: 0
        },
        complexityDistribution: {
          low: 0,
          medium: 0,
          high: 0
        },
        priorityDistribution: {
          low: 0,
          medium: 0,
          high: 0
        }
      };
    } catch (error) {
      console.error('❌ 获取任务分析统计失败:', error.message);
      return {
        taskTypeDistribution: {},
        complexityDistribution: {},
        priorityDistribution: {}
      };
    }
  }
}

module.exports = TaskAnalyzer;
