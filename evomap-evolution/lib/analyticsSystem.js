const fs = require('fs');
const path = require('path');

class AnalyticsSystem {
  constructor(config) {
    this.config = config;
    this.analyticsData = this.loadAnalyticsData();
  }

  async analyzeTaskResult(task, completeResult) {
    try {
      // 分析任务结果
      const analysis = {
        taskId: task.task_id || task.id,
        taskTitle: task.title,
        timestamp: new Date().toISOString(),
        result: completeResult,
        metrics: this.calculateMetrics(task, completeResult),
        insights: this.generateInsights(task, completeResult)
      };
      
      // 更新分析数据
      this.analyticsData.taskResults.push(analysis);
      this.analyticsData.totalTasks += 1;
      this.analyticsData.completedTasks += 1;
      
      // 保存分析数据
      this.saveAnalyticsData();
      
      // 生成分析报告
      await this.generateAnalysisReport();
      
      this.log('info', `任务分析完成: ${task.title}`);
      
      return analysis;
    } catch (error) {
      this.log('error', `任务分析失败: ${error.message}`);
      return null;
    }
  }

  async getEvolutionAnalysis() {
    try {
      // 分析进化数据
      const analysis = {
        summary: {
          totalTasks: this.analyticsData.totalTasks,
          completedTasks: this.analyticsData.completedTasks,
          successRate: this.analyticsData.totalTasks > 0 ? 
            (this.analyticsData.completedTasks / this.analyticsData.totalTasks * 100).toFixed(2) + '%' : '0%',
          totalEvolutionCycles: this.analyticsData.evolutionCycles
        },
        taskPerformance: this.analyzeTaskPerformance(),
        platformDistribution: this.analyzePlatformDistribution(),
        timeAnalysis: this.analyzeTimeDistribution(),
        trends: this.analyzeTrends()
      };
      
      return analysis;
    } catch (error) {
      this.log('error', `进化分析失败: ${error.message}`);
      return null;
    }
  }

  calculateMetrics(task, completeResult) {
    return {
      taskDifficulty: task.difficulty || 'medium',
      estimatedTime: task.estimatedTime || 30,
      actualTime: this.calculateActualTime(task),
      success: completeResult.success || true,
      creditsEarned: task.credits || 0,
      experienceGained: this.calculateExperienceGain(task, completeResult)
    };
  }

  calculateActualTime(task) {
    // 简单的时间计算
    return task.difficulty === 'hard' ? 60 :
           task.difficulty === 'medium' ? 30 : 15;
  }

  calculateExperienceGain(task, completeResult) {
    const baseExperience = 10;
    const difficultyMultiplier = task.difficulty === 'hard' ? 3 :
                                 task.difficulty === 'medium' ? 2 : 1;
    const successMultiplier = completeResult.success ? 1.5 : 0.5;
    
    return Math.floor(baseExperience * difficultyMultiplier * successMultiplier);
  }

  generateInsights(task, completeResult) {
    const insights = [];
    
    // 基于任务类型的洞察
    if (task.title.includes('小红书')) {
      insights.push('小红书内容需要更注重视觉效果和情绪表达');
    }
    
    if (task.title.includes('视频')) {
      insights.push('视频内容需要优化开头钩子和完播率');
    }
    
    if (task.title.includes('文章')) {
      insights.push('文章内容需要提升深度和实用性');
    }
    
    // 基于结果的洞察
    if (completeResult.success) {
      insights.push('任务完成成功，继续保持当前策略');
    } else {
      insights.push('任务完成失败，需要调整策略和方法');
    }
    
    return insights;
  }

  analyzeTaskPerformance() {
    const performance = {
      byDifficulty: {
        hard: { total: 0, completed: 0, successRate: 0 },
        medium: { total: 0, completed: 0, successRate: 0 },
        easy: { total: 0, completed: 0, successRate: 0 }
      },
      byType: {
        contentCreation: { total: 0, completed: 0, successRate: 0 },
        strategy: { total: 0, completed: 0, successRate: 0 },
        optimization: { total: 0, completed: 0, successRate: 0 }
      }
    };
    
    // 分析任务结果
    this.analyticsData.taskResults.forEach(result => {
      const task = result;
      const difficulty = task.metrics.taskDifficulty;
      
      // 按难度分析
      if (performance.byDifficulty[difficulty]) {
        performance.byDifficulty[difficulty].total += 1;
        if (task.metrics.success) {
          performance.byDifficulty[difficulty].completed += 1;
        }
      }
      
      // 按类型分析
      if (task.taskTitle.includes('创作')) {
        performance.byType.contentCreation.total += 1;
        if (task.metrics.success) {
          performance.byType.contentCreation.completed += 1;
        }
      }
      
      if (task.taskTitle.includes('策略')) {
        performance.byType.strategy.total += 1;
        if (task.metrics.success) {
          performance.byType.strategy.completed += 1;
        }
      }
      
      if (task.taskTitle.includes('优化')) {
        performance.byType.optimization.total += 1;
        if (task.metrics.success) {
          performance.byType.optimization.completed += 1;
        }
      }
    });
    
    // 计算成功率
    Object.keys(performance.byDifficulty).forEach(difficulty => {
      const data = performance.byDifficulty[difficulty];
      if (data.total > 0) {
        data.successRate = (data.completed / data.total * 100).toFixed(2) + '%';
      }
    });
    
    Object.keys(performance.byType).forEach(type => {
      const data = performance.byType[type];
      if (data.total > 0) {
        data.successRate = (data.completed / data.total * 100).toFixed(2) + '%';
      }
    });
    
    return performance;
  }

  analyzePlatformDistribution() {
    const distribution = {
      xiaohongshu: 0,
      video: 0,
      article: 0,
      other: 0
    };
    
    this.analyticsData.taskResults.forEach(result => {
      if (result.taskTitle.includes('小红书')) {
        distribution.xiaohongshu++;
      } else if (result.taskTitle.includes('视频')) {
        distribution.video++;
      } else if (result.taskTitle.includes('文章')) {
        distribution.article++;
      } else {
        distribution.other++;
      }
    });
    
    return distribution;
  }

  analyzeTimeDistribution() {
    const timeData = {
      byHour: Array(24).fill(0),
      byDay: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map(day => ({ day, count: 0 }))
    };
    
    this.analyticsData.taskResults.forEach(result => {
      const date = new Date(result.timestamp);
      const hour = date.getHours();
      const day = date.getDay();
      
      timeData.byHour[hour]++;
      timeData.byDay[day].count++;
    });
    
    return timeData;
  }

  analyzeTrends() {
    const recentResults = this.analyticsData.taskResults.slice(-10);
    const successRate = recentResults.filter(r => r.metrics.success).length / recentResults.length;
    const averageExperience = recentResults.reduce((sum, r) => sum + r.metrics.experienceGained, 0) / recentResults.length;
    
    return {
      recentSuccessRate: (successRate * 100).toFixed(2) + '%',
      averageExperience: Math.floor(averageExperience),
      trend: this.calculateTrend(recentResults)
    };
  }

  calculateTrend(results) {
    if (results.length < 2) return 'stable';
    
    const firstHalf = results.slice(0, Math.floor(results.length / 2));
    const secondHalf = results.slice(Math.floor(results.length / 2));
    
    const firstSuccessRate = firstHalf.filter(r => r.metrics.success).length / firstHalf.length;
    const secondSuccessRate = secondHalf.filter(r => r.metrics.success).length / secondHalf.length;
    
    if (secondSuccessRate > firstSuccessRate * 1.2) return 'improving';
    if (secondSuccessRate < firstSuccessRate * 0.8) return 'declining';
    return 'stable';
  }

  async generateAnalysisReport() {
    try {
      const report = {
        timestamp: new Date().toISOString(),
        agentName: this.config.agentName,
        agentType: this.config.agentType,
        summary: {
          totalTasks: this.analyticsData.totalTasks,
          completedTasks: this.analyticsData.completedTasks,
          successRate: this.analyticsData.totalTasks > 0 ? 
            (this.analyticsData.completedTasks / this.analyticsData.totalTasks * 100).toFixed(2) + '%' : '0%',
          totalEvolutionCycles: this.analyticsData.evolutionCycles
        },
        performance: this.analyzeTaskPerformance(),
        platformDistribution: this.analyzePlatformDistribution(),
        trends: this.analyzeTrends(),
        recommendations: this.generateRecommendations()
      };
      
      // 保存分析报告
      const reportPath = path.join(__dirname, '..', 'logs', `analytics_report_${Date.now()}.json`);
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      
      this.log('info', `分析报告生成: ${reportPath}`);
    } catch (error) {
      this.log('error', `报告生成失败: ${error.message}`);
    }
  }

  generateRecommendations() {
    const recommendations = [];
    
    // 基于平台分布的建议
    const platformDist = this.analyzePlatformDistribution();
    if (platformDist.xiaohongshu < platformDist.video) {
      recommendations.push('增加小红书内容创作，平衡平台分布');
    }
    
    // 基于成功率的建议
    const performance = this.analyzeTaskPerformance();
    if (performance.byDifficulty.hard.successRate < '50%') {
      recommendations.push('减少高难度任务，提高成功率');
    }
    
    // 基于趋势的建议
    const trends = this.analyzeTrends();
    if (trends.trend === 'declining') {
      recommendations.push('调整创作策略，提升内容质量');
    }
    
    return recommendations;
  }

  loadAnalyticsData() {
    try {
      const dataPath = path.join(__dirname, '..', 'data', 'analytics.json');
      if (fs.existsSync(dataPath)) {
        return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      }
    } catch (error) {
      this.log('warn', `加载分析数据失败: ${error.message}`);
    }
    
    // 默认分析数据
    return {
      totalTasks: 0,
      completedTasks: 0,
      evolutionCycles: 0,
      taskResults: [],
      platformStats: {},
      timeStats: {}
    };
  }

  saveAnalyticsData() {
    try {
      const dataPath = path.join(__dirname, '..', 'data');
      if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath, { recursive: true });
      }
      
      fs.writeFileSync(
        path.join(dataPath, 'analytics.json'),
        JSON.stringify(this.analyticsData, null, 2)
      );
    } catch (error) {
      this.log('error', `保存分析数据失败: ${error.message}`);
    }
  }

  log(level, message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level.toUpperCase()}] [AnalyticsSystem] ${message}`);
  }
}

module.exports = AnalyticsSystem;