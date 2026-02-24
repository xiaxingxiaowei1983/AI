/**
 * 人生决策宗师用户反馈机制
 * 用于收集和分析用户反馈，支持基于反馈的系统优化
 */

const fs = require('fs');
const path = require('path');
const { lifeDecisionMasterDataCollection } = require('./data-collection-system');

class LifeDecisionMasterFeedbackMechanism {
  constructor() {
    this.feedbackDir = path.join(__dirname, 'feedback');
    this.ensureFeedbackDirExists();
    this.initializeFeedbackStructures();
    console.log('📝 Life Decision Master Feedback Mechanism initialized');
  }

  // 确保反馈目录存在
  ensureFeedbackDirExists() {
    if (!fs.existsSync(this.feedbackDir)) {
      fs.mkdirSync(this.feedbackDir, { recursive: true });
    }
  }

  // 初始化反馈结构
  initializeFeedbackStructures() {
    this.feedbackData = [];
    this.feedbackCategories = {
      decisionQuality: '决策质量',
      responseTime: '响应时间',
      clarity: '清晰易懂',
      helpfulness: '建议有用性',
      overallSatisfaction: '整体满意度',
      featureRequests: '功能请求',
      bugReports: '问题报告'
    };
  }

  // 收集用户反馈
  collectFeedback(userId, feedbackType, content, rating = null, context = {}) {
    const feedback = {
      id: 'feedback-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      userId,
      feedbackType,
      content,
      rating,
      context,
      processed: false,
      date: new Date().toISOString().split('T')[0]
    };

    this.feedbackData.push(feedback);
    this.saveFeedback(feedback);
    this.processFeedback(feedback);
    
    console.log(`📝 收集用户反馈: ${feedbackType}, 评分: ${rating}, 用户: ${userId}`);
    return feedback;
  }

  // 保存反馈
  saveFeedback(feedback) {
    const feedbackPath = path.join(this.feedbackDir, 'feedback.json');
    this.appendToJsonFile(feedbackPath, feedback);
  }

  // 追加数据到JSON文件
  appendToJsonFile(filePath, newData) {
    try {
      let existingData = [];
      
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (fileContent.trim()) {
          existingData = JSON.parse(fileContent);
        }
      }
      
      existingData.push(newData);
      
      // 限制文件大小，保留最近500条记录
      if (existingData.length > 500) {
        existingData = existingData.slice(-500);
      }
      
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    } catch (error) {
      console.error('❌ 保存反馈失败:', error.message);
    }
  }

  // 处理反馈
  processFeedback(feedback) {
    console.log(`🔄 处理反馈: ${feedback.id}`);
    
    // 1. 分析反馈类型
    const analysis = this.analyzeFeedback(feedback);
    
    // 2. 集成到数据收集系统
    this.integrateWithDataCollection(feedback, analysis);
    
    // 3. 更新反馈状态
    feedback.processed = true;
    
    return analysis;
  }

  // 分析反馈
  analyzeFeedback(feedback) {
    const analysis = {
      feedbackId: feedback.id,
      timestamp: new Date().toISOString(),
      feedbackType: feedback.feedbackType,
      sentiment: this.analyzeSentiment(feedback.content),
      keyIssues: this.extractKeyIssues(feedback.content),
      actionable: this.isActionable(feedback),
      severity: this.calculateSeverity(feedback),
      category: this.categorizeFeedback(feedback)
    };

    return analysis;
  }

  // 分析情感倾向
  analyzeSentiment(content) {
    const positiveWords = ['好', '棒', '优秀', '满意', '有用', '清晰', '快速', '专业', '感谢', '喜欢'];
    const negativeWords = ['差', '慢', '模糊', '没用', '不满意', '错误', '复杂', '失望', '问题', '困难'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (content.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (content.includes(word)) negativeCount++;
    });
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  // 提取关键问题
  extractKeyIssues(content) {
    const issueKeywords = {
      performance: ['慢', '延迟', '卡顿', '速度'],
      accuracy: ['错误', '不准确', '偏差', '不对'],
      clarity: ['模糊', '不清楚', '难以理解', '混乱'],
      relevance: ['无关', '不相关', '离题', '不适用'],
      usability: ['复杂', '难用', '不方便', '繁琐'],
      features: ['需要', '希望', '建议', '添加']
    };
    
    const issues = [];
    
    Object.entries(issueKeywords).forEach(([issueType, keywords]) => {
      keywords.forEach(keyword => {
        if (content.includes(keyword)) {
          issues.push(issueType);
        }
      });
    });
    
    return [...new Set(issues)];
  }

  // 判断反馈是否可操作
  isActionable(feedback) {
    return feedback.rating !== null || 
           feedback.content.length > 20 || 
           this.extractKeyIssues(feedback.content).length > 0;
  }

  // 计算反馈严重程度
  calculateSeverity(feedback) {
    if (feedback.rating !== null) {
      if (feedback.rating <= 1) return 'critical';
      if (feedback.rating <= 2) return 'high';
      if (feedback.rating <= 3) return 'medium';
      return 'low';
    }
    
    const sentiment = this.analyzeSentiment(feedback.content);
    if (sentiment === 'negative') return 'medium';
    return 'low';
  }

  // 对反馈进行分类
  categorizeFeedback(feedback) {
    if (feedback.feedbackType === 'decision_quality') return '决策质量';
    if (feedback.feedbackType === 'response_time') return '响应时间';
    if (feedback.feedbackType === 'clarity') return '清晰易懂';
    if (feedback.feedbackType === 'helpfulness') return '建议有用性';
    if (feedback.feedbackType === 'overall') return '整体满意度';
    if (feedback.feedbackType === 'feature_request') return '功能请求';
    if (feedback.feedbackType === 'bug_report') return '问题报告';
    return '其他';
  }

  // 集成到数据收集系统
  integrateWithDataCollection(feedback, analysis) {
    // 收集用户交互数据
    lifeDecisionMasterDataCollection.collectUserInteraction(
      feedback.userId,
      'feedback',
      feedback.content,
      0 // 反馈提交时间不计入响应时间
    );

    // 如果有评分，收集决策结果数据
    if (feedback.rating !== null) {
      lifeDecisionMasterDataCollection.collectDecisionOutcome(
        'feedback',
        { feedbackType: feedback.feedbackType, context: feedback.context },
        { analysis },
        feedback.rating
      );
    }
  }

  // 生成反馈报告
  generateFeedbackReport(timeRange = '7d') {
    console.log(`📋 生成反馈报告 (时间范围: ${timeRange})`);
    
    const feedbackData = this.getAllFeedback();
    const filteredData = this.filterFeedbackByTimeRange(feedbackData, timeRange);
    
    const report = {
      timestamp: new Date().toISOString(),
      timeRange,
      summary: {
        totalFeedback: filteredData.length,
        averageRating: this.calculateAverageRating(filteredData),
        sentimentDistribution: this.getSentimentDistribution(filteredData),
        categoryDistribution: this.getCategoryDistribution(filteredData),
        topIssues: this.getTopIssues(filteredData, 5),
        responseRate: this.calculateResponseRate(filteredData)
      },
      details: {
        feedbackData: filteredData,
        actionableItems: this.getActionableItems(filteredData),
        improvementAreas: this.getImprovementAreas(filteredData)
      }
    };

    // 保存报告
    const reportPath = path.join(this.feedbackDir, 'reports');
    if (!fs.existsSync(reportPath)) {
      fs.mkdirSync(reportPath, { recursive: true });
    }

    const reportFileName = `feedback-report-${Date.now()}.json`;
    const reportFilePath = path.join(reportPath, reportFileName);
    fs.writeFileSync(reportFilePath, JSON.stringify(report, null, 2));

    console.log(`✅ 反馈报告已生成: ${reportFileName}`);
    return report;
  }

  // 获取所有反馈
  getAllFeedback() {
    const feedbackPath = path.join(this.feedbackDir, 'feedback.json');
    try {
      if (fs.existsSync(feedbackPath)) {
        const fileContent = fs.readFileSync(feedbackPath, 'utf8');
        if (fileContent.trim()) {
          return JSON.parse(fileContent);
        }
      }
      return [];
    } catch (error) {
      console.error('❌ 读取反馈文件失败:', error.message);
      return [];
    }
  }

  // 按时间范围筛选反馈
  filterFeedbackByTimeRange(feedbackData, timeRange) {
    const now = new Date();
    let cutoffDate = new Date();
    
    if (timeRange === '1d') {
      cutoffDate.setDate(now.getDate() - 1);
    } else if (timeRange === '7d') {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (timeRange === '30d') {
      cutoffDate.setDate(now.getDate() - 30);
    }
    
    return feedbackData.filter(item => new Date(item.timestamp) >= cutoffDate);
  }

  // 计算平均评分
  calculateAverageRating(feedbackData) {
    const ratedFeedback = feedbackData.filter(item => item.rating !== null);
    if (ratedFeedback.length === 0) return 0;
    
    const totalRating = ratedFeedback.reduce((sum, item) => sum + item.rating, 0);
    return totalRating / ratedFeedback.length;
  }

  // 获取情感分布
  getSentimentDistribution(feedbackData) {
    const distribution = {
      positive: 0,
      negative: 0,
      neutral: 0
    };
    
    feedbackData.forEach(item => {
      const analysis = this.analyzeFeedback(item);
      distribution[analysis.sentiment]++;
    });
    
    return distribution;
  }

  // 获取分类分布
  getCategoryDistribution(feedbackData) {
    const distribution = {};
    
    feedbackData.forEach(item => {
      const analysis = this.analyzeFeedback(item);
      const category = analysis.category;
      distribution[category] = (distribution[category] || 0) + 1;
    });
    
    return distribution;
  }

  // 获取主要问题
  getTopIssues(feedbackData, limit = 5) {
    const issueCounts = {};
    
    feedbackData.forEach(item => {
      const issues = this.extractKeyIssues(item.content);
      issues.forEach(issue => {
        issueCounts[issue] = (issueCounts[issue] || 0) + 1;
      });
    });
    
    return Object.entries(issueCounts)
      .map(([issue, count]) => ({ issue, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  // 计算响应率
  calculateResponseRate(feedbackData) {
    const processedCount = feedbackData.filter(item => item.processed).length;
    if (feedbackData.length === 0) return 0;
    return (processedCount / feedbackData.length) * 100;
  }

  // 获取可操作项
  getActionableItems(feedbackData) {
    return feedbackData.filter(item => this.isActionable(item));
  }

  // 获取改进领域
  getImprovementAreas(feedbackData) {
    const areas = {};
    
    feedbackData.forEach(item => {
      if (item.rating !== null && item.rating <= 3) {
        const analysis = this.analyzeFeedback(item);
        const category = analysis.category;
        areas[category] = (areas[category] || 0) + 1;
      }
    });
    
    return Object.entries(areas)
      .map(([area, count]) => ({ area, count }))
      .sort((a, b) => b.count - a.count);
  }

  // 生成反馈驱动的优化建议
  generateOptimizationSuggestions() {
    console.log('💡 生成反馈驱动的优化建议');
    
    const recentFeedback = this.filterFeedbackByTimeRange(this.getAllFeedback(), '30d');
    const report = this.generateFeedbackReport('30d');
    
    const suggestions = {
      timestamp: new Date().toISOString(),
      basedOnFeedbackCount: recentFeedback.length,
      priorityAreas: this.identifyPriorityAreas(report),
      specificSuggestions: this.generateSpecificSuggestions(report),
      expectedImpact: this.calculateExpectedImpact(report),
      implementationSteps: this.generateImplementationSteps(report)
    };

    // 保存建议
    const suggestionsPath = path.join(this.feedbackDir, 'optimization-suggestions.json');
    fs.writeFileSync(suggestionsPath, JSON.stringify(suggestions, null, 2));

    console.log('✅ 优化建议已生成');
    return suggestions;
  }

  // 识别优先改进领域
  identifyPriorityAreas(report) {
    const improvementAreas = report.details.improvementAreas;
    return improvementAreas.slice(0, 3).map(item => item.area);
  }

  // 生成具体建议
  generateSpecificSuggestions(report) {
    const suggestions = [];
    
    // 基于评分的建议
    if (report.summary.averageRating < 4) {
      suggestions.push('提高决策质量，增强建议的相关性和实用性');
    }
    
    // 基于情感的建议
    const sentiment = report.summary.sentimentDistribution;
    if (sentiment.negative > sentiment.positive) {
      suggestions.push('改善用户体验，减少负面反馈');
    }
    
    // 基于主要问题的建议
    const topIssues = report.summary.topIssues;
    topIssues.forEach(issue => {
      switch (issue.issue) {
        case 'performance':
          suggestions.push('优化系统性能，减少响应时间');
          break;
        case 'accuracy':
          suggestions.push('提高决策准确性，增强数据验证');
          break;
        case 'clarity':
          suggestions.push('改善建议的清晰度和可理解性');
          break;
        case 'relevance':
          suggestions.push('增强建议与用户需求的相关性');
          break;
        case 'usability':
          suggestions.push('简化用户界面，提高易用性');
          break;
      }
    });
    
    return suggestions;
  }

  // 计算预期影响
  calculateExpectedImpact(report) {
    const currentRating = report.summary.averageRating;
    const potentialImprovement = Math.min(5 - currentRating, 1);
    
    return {
      expectedRatingImprovement: potentialImprovement,
      expectedSentimentImprovement: 'positive',
      expectedUserSatisfactionIncrease: (potentialImprovement / 5) * 100,
      expectedRetentionImprovement: (potentialImprovement / 5) * 50
    };
  }

  // 生成实施步骤
  generateImplementationSteps(report) {
    const steps = [
      {
        step: 1,
        title: '分析详细反馈',
        description: '深入分析具体的用户反馈，识别具体问题',
        estimatedTime: '1-2天'
      },
      {
        step: 2,
        title: '优先级排序',
        description: '基于影响范围和严重程度对问题进行排序',
        estimatedTime: '半天'
      },
      {
        step: 3,
        title: '制定解决方案',
        description: '为每个优先级问题制定具体的解决方案',
        estimatedTime: '2-3天'
      },
      {
        step: 4,
        title: '实施改进',
        description: '根据解决方案实施系统改进',
        estimatedTime: '3-5天'
      },
      {
        step: 5,
        title: '验证效果',
        description: '通过用户反馈和系统数据验证改进效果',
        estimatedTime: '1-2周'
      }
    ];

    return steps;
  }

  // 清理旧反馈
  cleanupOldFeedback(daysToKeep = 90) {
    console.log(`🧹 清理 ${daysToKeep} 天前的旧反馈`);
    
    const feedbackData = this.getAllFeedback();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    const filteredFeedback = feedbackData.filter(item => 
      new Date(item.timestamp) >= cutoffDate
    );
    
    const feedbackPath = path.join(this.feedbackDir, 'feedback.json');
    fs.writeFileSync(feedbackPath, JSON.stringify(filteredFeedback, null, 2));
    
    console.log(`✅ 清理反馈: 保留 ${filteredFeedback.length} 条记录`);
  }

  // 获取反馈统计
  getFeedbackStatistics() {
    const feedbackData = this.getAllFeedback();
    const totalFeedback = feedbackData.length;
    const ratedFeedback = feedbackData.filter(item => item.rating !== null).length;
    const averageRating = this.calculateAverageRating(feedbackData);
    const sentiment = this.getSentimentDistribution(feedbackData);
    
    return {
      totalFeedback,
      ratedFeedback,
      averageRating,
      sentiment,
      lastFeedbackDate: totalFeedback > 0 ? 
        new Date(Math.max(...feedbackData.map(item => new Date(item.timestamp)))).toISOString() : 
        null
    };
  }

  // 导出反馈数据
  exportFeedbackData(format = 'json') {
    const feedbackData = this.getAllFeedback();
    
    if (format === 'json') {
      const exportPath = path.join(this.feedbackDir, 'exports', `feedback-export-${Date.now()}.json`);
      fs.mkdirSync(path.dirname(exportPath), { recursive: true });
      fs.writeFileSync(exportPath, JSON.stringify(feedbackData, null, 2));
      return exportPath;
    }
    
    if (format === 'csv') {
      const exportPath = path.join(this.feedbackDir, 'exports', `feedback-export-${Date.now()}.csv`);
      fs.mkdirSync(path.dirname(exportPath), { recursive: true });
      
      const headers = ['ID', 'Timestamp', 'User ID', 'Feedback Type', 'Content', 'Rating', 'Context'];
      const rows = feedbackData.map(item => [
        item.id,
        item.timestamp,
        item.userId,
        item.feedbackType,
        item.content.replace(/,/g, ' '),
        item.rating || '',
        JSON.stringify(item.context).replace(/,/g, ' ')
      ]);
      
      const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
      fs.writeFileSync(exportPath, csvContent);
      return exportPath;
    }
    
    return null;
  }
}

// 导出单例实例
const lifeDecisionMasterFeedbackMechanism = new LifeDecisionMasterFeedbackMechanism();

module.exports = {
  LifeDecisionMasterFeedbackMechanism,
  lifeDecisionMasterFeedbackMechanism
};

// 示例用法
if (require.main === module) {
  const feedbackMechanism = lifeDecisionMasterFeedbackMechanism;
  
  // 测试反馈收集
  console.log('🔄 测试反馈机制...');
  
  // 模拟收集反馈
  feedbackMechanism.collectFeedback(
    'user-123',
    'decision_quality',
    '决策建议非常有用，帮助我理清了职业发展思路',
    5,
    { decisionType: 'career', context: '职业发展决策' }
  );
  
  feedbackMechanism.collectFeedback(
    'user-123',
    'response_time',
    '响应速度很快，几乎没有延迟',
    5,
    { operation: '决策分析' }
  );
  
  feedbackMechanism.collectFeedback(
    'user-456',
    'clarity',
    '建议有些模糊，希望能更具体一些',
    3,
    { decisionType: 'finance', context: '投资决策' }
  );
  
  feedbackMechanism.collectFeedback(
    'user-456',
    'feature_request',
    '希望能添加更多关于健康管理的建议功能',
    null,
    { feature: '健康管理' }
  );
  
  // 生成反馈报告
  const report = feedbackMechanism.generateFeedbackReport('7d');
  console.log('📊 反馈报告摘要:', report.summary);
  
  // 生成优化建议
  const suggestions = feedbackMechanism.generateOptimizationSuggestions();
  console.log('💡 优化建议:', suggestions.priorityAreas);
  
  // 获取反馈统计
  const stats = feedbackMechanism.getFeedbackStatistics();
  console.log('📈 反馈统计:', stats);
}
