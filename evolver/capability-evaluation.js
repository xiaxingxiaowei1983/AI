const fs = require('fs');
const path = require('path');

const EVALUATION_LOGS_FILE = path.join(__dirname, 'evaluation-logs.json');
const CAPABILITY_METRICS_FILE = path.join(__dirname, 'capability-metrics.json');

class CapabilityEvaluation {
  constructor() {
    this.evaluationLogs = this.loadEvaluationLogs();
    this.capabilityMetrics = this.loadCapabilityMetrics();
  }

  loadEvaluationLogs() {
    if (fs.existsSync(EVALUATION_LOGS_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(EVALUATION_LOGS_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading evaluation logs:', error.message);
        return [];
      }
    }
    return [];
  }

  loadCapabilityMetrics() {
    if (fs.existsSync(CAPABILITY_METRICS_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(CAPABILITY_METRICS_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading capability metrics:', error.message);
        return {};
      }
    }
    return {};
  }

  saveEvaluationLogs() {
    fs.writeFileSync(EVALUATION_LOGS_FILE, JSON.stringify(this.evaluationLogs, null, 2));
    console.log('Evaluation logs saved to', EVALUATION_LOGS_FILE);
  }

  saveCapabilityMetrics() {
    fs.writeFileSync(CAPABILITY_METRICS_FILE, JSON.stringify(this.capabilityMetrics, null, 2));
    console.log('Capability metrics saved to', CAPABILITY_METRICS_FILE);
  }

  evaluateCapabilityUsage(capabilityId, usageData) {
    const evaluation = {
      id: `eval_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      capabilityId: capabilityId,
      timestamp: new Date().toISOString(),
      usageData: usageData,
      metrics: this.calculateUsageMetrics(usageData),
      assessment: this.assessCapabilityPerformance(usageData)
    };

    this.evaluationLogs.push(evaluation);
    this.updateCapabilityMetrics(capabilityId, evaluation.metrics);
    this.saveEvaluationLogs();
    this.saveCapabilityMetrics();

    return evaluation;
  }

  calculateUsageMetrics(usageData) {
    const metrics = {
      executionTime: usageData.executionTime || 0,
      success: usageData.success || false,
      errorCount: usageData.errors?.length || 0,
      inputCount: usageData.inputs?.length || 0,
      outputCount: usageData.outputs?.length || 0,
      retryCount: usageData.retries || 0,
      resourceUsage: usageData.resourceUsage || {
        memory: 0,
        cpu: 0
      }
    };

    // 计算效率指标
    metrics.efficiency = this.calculateEfficiency(metrics);
    // 计算可靠性指标
    metrics.reliability = this.calculateReliability(metrics);
    // 计算整体性能指标
    metrics.overallPerformance = this.calculateOverallPerformance(metrics);

    return metrics;
  }

  calculateEfficiency(metrics) {
    // 效率 = 成功 && (执行时间 < 阈值) && (重试次数 < 阈值)
    const executionTimeThreshold = 5000; // 5秒
    const retryThreshold = 1;

    let efficiencyScore = 0;
    if (metrics.success) {
      efficiencyScore += 0.5;
      if (metrics.executionTime < executionTimeThreshold) {
        efficiencyScore += 0.3;
      }
      if (metrics.retryCount <= retryThreshold) {
        efficiencyScore += 0.2;
      }
    }

    return Math.min(1.0, efficiencyScore);
  }

  calculateReliability(metrics) {
    // 可靠性 = 成功 && (错误数 == 0)
    let reliabilityScore = 0;
    if (metrics.success) {
      reliabilityScore += 0.8;
      if (metrics.errorCount === 0) {
        reliabilityScore += 0.2;
      }
    }

    return Math.min(1.0, reliabilityScore);
  }

  calculateOverallPerformance(metrics) {
    // 整体性能 = 0.6 * 效率 + 0.4 * 可靠性
    return 0.6 * metrics.efficiency + 0.4 * metrics.reliability;
  }

  assessCapabilityPerformance(usageData) {
    const metrics = this.calculateUsageMetrics(usageData);
    const performance = metrics.overallPerformance;

    let assessment = {
      performanceLevel: this.getPerformanceLevel(performance),
      strengths: this.identifyStrengths(metrics),
      weaknesses: this.identifyWeaknesses(metrics),
      recommendations: this.generateRecommendations(metrics)
    };

    return assessment;
  }

  getPerformanceLevel(performance) {
    if (performance >= 0.9) return 'excellent';
    if (performance >= 0.7) return 'good';
    if (performance >= 0.5) return 'average';
    if (performance >= 0.3) return 'poor';
    return 'very_poor';
  }

  identifyStrengths(metrics) {
    const strengths = [];

    if (metrics.efficiency >= 0.8) {
      strengths.push('High efficiency');
    }

    if (metrics.reliability >= 0.8) {
      strengths.push('High reliability');
    }

    if (metrics.errorCount === 0) {
      strengths.push('No errors');
    }

    if (metrics.executionTime < 1000) {
      strengths.push('Fast execution');
    }

    if (metrics.retryCount === 0) {
      strengths.push('No retries needed');
    }

    return strengths;
  }

  identifyWeaknesses(metrics) {
    const weaknesses = [];

    if (metrics.efficiency < 0.5) {
      weaknesses.push('Low efficiency');
    }

    if (metrics.reliability < 0.5) {
      weaknesses.push('Low reliability');
    }

    if (metrics.errorCount > 0) {
      weaknesses.push('Errors occurred');
    }

    if (metrics.executionTime > 10000) {
      weaknesses.push('Slow execution');
    }

    if (metrics.retryCount > 1) {
      weaknesses.push('Multiple retries needed');
    }

    return weaknesses;
  }

  generateRecommendations(metrics) {
    const recommendations = [];

    if (metrics.executionTime > 5000) {
      recommendations.push('Optimize execution time');
    }

    if (metrics.errorCount > 0) {
      recommendations.push('Improve error handling');
    }

    if (metrics.retryCount > 1) {
      recommendations.push('Enhance reliability to reduce retries');
    }

    if (metrics.efficiency < 0.7) {
      recommendations.push('Improve overall efficiency');
    }

    if (metrics.reliability < 0.7) {
      recommendations.push('Enhance reliability');
    }

    return recommendations;
  }

  updateCapabilityMetrics(capabilityId, metrics) {
    if (!this.capabilityMetrics[capabilityId]) {
      this.capabilityMetrics[capabilityId] = {
        totalUsages: 0,
        totalSuccesses: 0,
        totalFailures: 0,
        averageExecutionTime: 0,
        averageEfficiency: 0,
        averageReliability: 0,
        averagePerformance: 0,
        usageHistory: []
      };
    }

    const capMetrics = this.capabilityMetrics[capabilityId];
    capMetrics.totalUsages++;
    
    if (metrics.success) {
      capMetrics.totalSuccesses++;
    } else {
      capMetrics.totalFailures++;
    }

    // 更新平均值
    const count = capMetrics.totalUsages;
    capMetrics.averageExecutionTime = (capMetrics.averageExecutionTime * (count - 1) + metrics.executionTime) / count;
    capMetrics.averageEfficiency = (capMetrics.averageEfficiency * (count - 1) + metrics.efficiency) / count;
    capMetrics.averageReliability = (capMetrics.averageReliability * (count - 1) + metrics.reliability) / count;
    capMetrics.averagePerformance = (capMetrics.averagePerformance * (count - 1) + metrics.overallPerformance) / count;

    // 添加到使用历史
    capMetrics.usageHistory.push({
      timestamp: new Date().toISOString(),
      metrics: metrics
    });

    // 保持历史记录不超过100条
    if (capMetrics.usageHistory.length > 100) {
      capMetrics.usageHistory = capMetrics.usageHistory.slice(-100);
    }
  }

  getCapabilityMetrics(capabilityId) {
    return this.capabilityMetrics[capabilityId] || null;
  }

  getCapabilityPerformanceTrend(capabilityId, days = 7) {
    const metrics = this.capabilityMetrics[capabilityId];
    if (!metrics || metrics.usageHistory.length === 0) {
      return [];
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return metrics.usageHistory
      .filter(entry => new Date(entry.timestamp) >= cutoffDate)
      .map(entry => ({
        timestamp: entry.timestamp,
        performance: entry.metrics.overallPerformance
      }));
  }

  evaluateCapabilityEvolution(capabilityId, evolutionData) {
    const evaluation = {
      id: `evolution_eval_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      capabilityId: capabilityId,
      timestamp: new Date().toISOString(),
      evolutionData: evolutionData,
      metrics: this.calculateEvolutionMetrics(evolutionData),
      assessment: this.assessEvolutionEffectiveness(evolutionData)
    };

    this.evaluationLogs.push(evaluation);
    this.saveEvaluationLogs();

    return evaluation;
  }

  calculateEvolutionMetrics(evolutionData) {
    const metrics = {
      beforePerformance: evolutionData.before?.overallPerformance || 0,
      afterPerformance: evolutionData.after?.overallPerformance || 0,
      performanceChange: 0,
      featureAdditions: evolutionData.addedFeatures?.length || 0,
      bugFixes: evolutionData.bugFixes?.length || 0,
      complexityChange: this.calculateComplexityChange(evolutionData)
    };

    metrics.performanceChange = metrics.afterPerformance - metrics.beforePerformance;
    metrics.improvementPercentage = metrics.beforePerformance > 0 
      ? (metrics.performanceChange / metrics.beforePerformance) * 100 
      : 0;

    return metrics;
  }

  calculateComplexityChange(evolutionData) {
    const beforeComplexity = this.estimateComplexity(evolutionData.before);
    const afterComplexity = this.estimateComplexity(evolutionData.after);
    return afterComplexity - beforeComplexity;
  }

  estimateComplexity(capabilityData) {
    if (!capabilityData) return 0;
    
    let complexity = 0;
    complexity += (capabilityData.inputs?.length || 0) * 0.2;
    complexity += (capabilityData.outputs?.length || 0) * 0.2;
    complexity += (capabilityData.steps?.length || 0) * 0.3;
    complexity += (capabilityData.failurePoints?.length || 0) * 0.3;
    
    return complexity;
  }

  assessEvolutionEffectiveness(evolutionData) {
    const metrics = this.calculateEvolutionMetrics(evolutionData);
    const improvementThreshold = 0.1; // 10% improvement

    let assessment = {
      effectiveness: this.getEvolutionEffectiveness(metrics),
      strengths: this.identifyEvolutionStrengths(metrics),
      weaknesses: this.identifyEvolutionWeaknesses(metrics),
      recommendations: this.generateEvolutionRecommendations(metrics)
    };

    return assessment;
  }

  getEvolutionEffectiveness(metrics) {
    if (metrics.improvementPercentage >= 20) return 'excellent';
    if (metrics.improvementPercentage >= 10) return 'good';
    if (metrics.improvementPercentage >= 0) return 'neutral';
    if (metrics.improvementPercentage >= -10) return 'poor';
    return 'very_poor';
  }

  identifyEvolutionStrengths(metrics) {
    const strengths = [];

    if (metrics.improvementPercentage > 0) {
      strengths.push('Performance improved');
    }

    if (metrics.featureAdditions > 0) {
      strengths.push('New features added');
    }

    if (metrics.bugFixes > 0) {
      strengths.push('Bugs fixed');
    }

    if (metrics.complexityChange <= 0) {
      strengths.push('Complexity maintained or reduced');
    }

    return strengths;
  }

  identifyEvolutionWeaknesses(metrics) {
    const weaknesses = [];

    if (metrics.improvementPercentage < 0) {
      weaknesses.push('Performance decreased');
    }

    if (metrics.complexityChange > 0.5) {
      weaknesses.push('Complexity increased significantly');
    }

    if (metrics.featureAdditions === 0 && metrics.bugFixes === 0) {
      weaknesses.push('No new features or bug fixes');
    }

    return weaknesses;
  }

  generateEvolutionRecommendations(metrics) {
    const recommendations = [];

    if (metrics.improvementPercentage < 0) {
      recommendations.push('Investigate performance regression');
    }

    if (metrics.complexityChange > 0.5) {
      recommendations.push('Simplify implementation to reduce complexity');
    }

    if (metrics.featureAdditions === 0) {
      recommendations.push('Consider adding new features');
    }

    if (metrics.bugFixes === 0) {
      recommendations.push('Review for potential bugs');
    }

    return recommendations;
  }

  getOverallSystemEvaluation() {
    const metrics = {
      totalCapabilities: Object.keys(this.capabilityMetrics).length,
      totalEvaluations: this.evaluationLogs.length,
      averagePerformance: 0,
      bestPerformingCapabilities: [],
      worstPerformingCapabilities: [],
      performanceTrend: this.calculateSystemPerformanceTrend()
    };

    // 计算平均性能
    let totalPerformance = 0;
    let capabilityCount = 0;

    Object.values(this.capabilityMetrics).forEach(capMetrics => {
      if (capMetrics.averagePerformance > 0) {
        totalPerformance += capMetrics.averagePerformance;
        capabilityCount++;
      }
    });

    if (capabilityCount > 0) {
      metrics.averagePerformance = totalPerformance / capabilityCount;
    }

    // 找出表现最好和最差的能力
    const capabilityPerformances = Object.entries(this.capabilityMetrics)
      .map(([id, metrics]) => ({
        id: id,
        performance: metrics.averagePerformance
      }))
      .sort((a, b) => b.performance - a.performance);

    metrics.bestPerformingCapabilities = capabilityPerformances.slice(0, 5);
    metrics.worstPerformingCapabilities = capabilityPerformances.slice(-5).reverse();

    return metrics;
  }

  calculateSystemPerformanceTrend(days = 30) {
    const trend = [];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // 按日期分组评估
    const dailyEvaluations = {};

    this.evaluationLogs.forEach(log => {
      const date = log.timestamp.split('T')[0];
      const logDate = new Date(log.timestamp);
      
      if (logDate >= cutoffDate) {
        if (!dailyEvaluations[date]) {
          dailyEvaluations[date] = {
            count: 0,
            totalPerformance: 0
          };
        }
        
        dailyEvaluations[date].count++;
        dailyEvaluations[date].totalPerformance += log.metrics.overallPerformance;
      }
    });

    // 计算每天的平均性能
    Object.entries(dailyEvaluations).forEach(([date, data]) => {
      trend.push({
        date: date,
        averagePerformance: data.totalPerformance / data.count
      });
    });

    return trend.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  generateEvaluationReport(capabilityId = null) {
    if (capabilityId) {
      return this.generateCapabilityReport(capabilityId);
    } else {
      return this.generateSystemReport();
    }
  }

  generateCapabilityReport(capabilityId) {
    const metrics = this.getCapabilityMetrics(capabilityId);
    const evaluations = this.evaluationLogs.filter(log => log.capabilityId === capabilityId);
    const trend = this.getCapabilityPerformanceTrend(capabilityId);

    return {
      capabilityId: capabilityId,
      reportDate: new Date().toISOString(),
      metrics: metrics,
      recentEvaluations: evaluations.slice(-5),
      performanceTrend: trend,
      summary: this.generateCapabilitySummary(metrics, evaluations)
    };
  }

  generateSystemReport() {
    const systemMetrics = this.getOverallSystemEvaluation();

    return {
      reportDate: new Date().toISOString(),
      systemMetrics: systemMetrics,
      summary: this.generateSystemSummary(systemMetrics)
    };
  }

  generateCapabilitySummary(metrics, evaluations) {
    if (!metrics) {
      return 'No data available for this capability';
    }

    const performanceLevel = this.getPerformanceLevel(metrics.averagePerformance);
    const successRate = (metrics.totalSuccesses / metrics.totalUsages) * 100;

    return `Capability has been used ${metrics.totalUsages} times with a success rate of ${successRate.toFixed(2)}%. Average performance is ${(metrics.averagePerformance * 100).toFixed(2)}% (${performanceLevel}).`;
  }

  generateSystemSummary(systemMetrics) {
    return `System has ${systemMetrics.totalCapabilities} capabilities with an average performance of ${(systemMetrics.averagePerformance * 100).toFixed(2)}%. ${systemMetrics.totalEvaluations} evaluations have been recorded.`;
  }
}

module.exports = CapabilityEvaluation;