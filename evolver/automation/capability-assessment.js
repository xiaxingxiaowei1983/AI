const fs = require('fs');
const path = require('path');

const ASSESSMENT_LOG_FILE = path.join(__dirname, '../assessment-logs.json');

class CapabilityAssessment {
  constructor(unifiedInterface) {
    this.unifiedInterface = unifiedInterface;
    this.assessmentCriteria = this.defineAssessmentCriteria();
    this.assessmentHistory = this.loadAssessmentHistory();
    this.assessmentSchedule = new Map();
  }

  defineAssessmentCriteria() {
    return {
      performance: {
        name: 'Performance',
        weight: 0.30,
        metrics: {
          executionTime: { target: 5000, unit: 'ms', weight: 0.4 },
          memoryUsage: { target: 100, unit: 'MB', weight: 0.3 },
          cpuUsage: { target: 50, unit: '%', weight: 0.3 }
        }
      },
      quality: {
        name: 'Quality',
        weight: 0.25,
        metrics: {
          successRate: { target: 95, unit: '%', weight: 0.5 },
          errorRate: { target: 5, unit: '%', weight: 0.3 },
          dataIntegrity: { target: 100, unit: '%', weight: 0.2 }
        }
      },
      value: {
        name: 'Value',
        weight: 0.25,
        metrics: {
          usageFrequency: { target: 10, unit: 'calls/day', weight: 0.4 },
          userSatisfaction: { target: 4, unit: 'rating', weight: 0.3 },
          businessImpact: { target: 3, unit: 'score', weight: 0.3 }
        }
      },
      health: {
        name: 'Health',
        weight: 0.20,
        metrics: {
          reliability: { target: 95, unit: '%', weight: 0.4 },
          maintainability: { target: 3, unit: 'score', weight: 0.3 },
          documentation: { target: 80, unit: '%', weight: 0.3 }
        }
      }
    };
  }

  loadAssessmentHistory() {
    if (fs.existsSync(ASSESSMENT_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(ASSESSMENT_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading assessment history:', error.message);
        return [];
      }
    }
    return [];
  }

  saveAssessmentHistory() {
    fs.writeFileSync(ASSESSMENT_LOG_FILE, JSON.stringify(this.assessmentHistory, null, 2));
  }

  async assessCapability(capabilityId, options = {}) {
    console.log(`=== Assessing capability: ${capabilityId} ===`);

    const startTime = Date.now();
    const assessmentId = `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      const capabilityInfo = this.unifiedInterface.getCapabilityInfo(capabilityId);
      if (!capabilityInfo) {
        throw new Error(`Capability not found: ${capabilityId}`);
      }

      const metrics = await this.collectMetrics(capabilityId, options);
      const scores = this.calculateScores(metrics);
      const overallScore = this.calculateOverallScore(scores);
      const recommendations = this.generateRecommendations(scores, metrics);
      const healthStatus = this.determineHealthStatus(overallScore);

      const assessment = {
        assessmentId,
        capabilityId,
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        metrics,
        scores,
        overallScore,
        healthStatus,
        recommendations
      };

      this.assessmentHistory.push(assessment);
      this.saveAssessmentHistory();

      console.log(`✅ Assessment complete: ${capabilityId} - Score: ${overallScore.toFixed(2)} - Status: ${healthStatus}`);
      return assessment;

    } catch (error) {
      console.error(`❌ Assessment failed for ${capabilityId}:`, error.message);

      const failedAssessment = {
        assessmentId,
        capabilityId,
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        success: false,
        error: error.message
      };

      this.assessmentHistory.push(failedAssessment);
      this.saveAssessmentHistory();

      return failedAssessment;
    }
  }

  async collectMetrics(capabilityId, options) {
    const stats = this.unifiedInterface.getStatistics();
    const capabilityCalls = stats.byCapability[capabilityId] || 0;

    return {
      performance: {
        executionTime: options.executionTime || this.estimateExecutionTime(capabilityId),
        memoryUsage: options.memoryUsage || process.memoryUsage().heapUsed / 1024 / 1024,
        cpuUsage: options.cpuUsage || 0
      },
      quality: {
        successRate: this.calculateSuccessRate(capabilityId),
        errorRate: this.calculateErrorRate(capabilityId),
        dataIntegrity: 100
      },
      value: {
        usageFrequency: capabilityCalls,
        userSatisfaction: 4,
        businessImpact: 3
      },
      health: {
        reliability: this.calculateReliability(capabilityId),
        maintainability: 3,
        documentation: 80
      }
    };
  }

  estimateExecutionTime(capabilityId) {
    const calls = this.unifiedInterface.callHistory?.filter(c => c.capabilityId === capabilityId) || [];
    if (calls.length === 0) return 1000;
    
    const avgDuration = calls.reduce((sum, c) => sum + (c.duration || 0), 0) / calls.length;
    return avgDuration;
  }

  calculateSuccessRate(capabilityId) {
    const calls = this.unifiedInterface.callHistory?.filter(c => c.capabilityId === capabilityId) || [];
    if (calls.length === 0) return 100;
    
    const successCount = calls.filter(c => c.success).length;
    return (successCount / calls.length) * 100;
  }

  calculateErrorRate(capabilityId) {
    return 100 - this.calculateSuccessRate(capabilityId);
  }

  calculateReliability(capabilityId) {
    const recentAssessments = this.assessmentHistory
      .filter(a => a.capabilityId === capabilityId && a.overallScore !== undefined)
      .slice(-10);

    if (recentAssessments.length === 0) return 95;

    const avgScore = recentAssessments.reduce((sum, a) => sum + a.overallScore, 0) / recentAssessments.length;
    return avgScore;
  }

  calculateScores(metrics) {
    const scores = {};

    for (const [categoryName, category] of Object.entries(this.assessmentCriteria)) {
      const categoryMetrics = metrics[categoryName];
      let categoryScore = 0;

      for (const [metricName, metricConfig] of Object.entries(category.metrics)) {
        const actualValue = categoryMetrics[metricName];
        const targetValue = metricConfig.target;
        const weight = metricConfig.weight;

        let metricScore;
        if (metricName.includes('Rate') || metricName.includes('success') || metricName.includes('Integrity')) {
          metricScore = Math.min(100, (actualValue / targetValue) * 100);
        } else if (metricName.includes('Time') || metricName.includes('Usage') || metricName.includes('Error')) {
          metricScore = Math.max(0, 100 - ((actualValue - targetValue) / targetValue) * 100);
        } else {
          metricScore = Math.min(100, (actualValue / targetValue) * 100);
        }

        categoryScore += metricScore * weight;
      }

      scores[categoryName] = {
        score: categoryScore,
        weight: category.weight
      };
    }

    return scores;
  }

  calculateOverallScore(scores) {
    let totalScore = 0;
    let totalWeight = 0;

    for (const category of Object.values(scores)) {
      totalScore += category.score * category.weight;
      totalWeight += category.weight;
    }

    return totalScore / totalWeight;
  }

  determineHealthStatus(overallScore) {
    if (overallScore >= 90) return 'excellent';
    if (overallScore >= 75) return 'good';
    if (overallScore >= 60) return 'fair';
    if (overallScore >= 40) return 'poor';
    return 'critical';
  }

  generateRecommendations(scores, metrics) {
    const recommendations = [];

    for (const [categoryName, categoryScore] of Object.entries(scores)) {
      if (categoryScore.score < 70) {
        const category = this.assessmentCriteria[categoryName];
        const weakMetrics = [];

        for (const [metricName, metricConfig] of Object.entries(category.metrics)) {
          const actualValue = metrics[categoryName][metricName];
          if (actualValue < metricConfig.target * 0.8) {
            weakMetrics.push({
              metric: metricName,
              current: actualValue,
              target: metricConfig.target,
              suggestion: this.getMetricSuggestion(metricName, actualValue, metricConfig.target)
            });
          }
        }

        recommendations.push({
          category: categoryName,
          priority: categoryScore.score < 50 ? 'high' : 'medium',
          currentScore: categoryScore.score,
          targetScore: 75,
          weakMetrics,
          actions: this.getCategoryActions(categoryName)
        });
      }
    }

    return recommendations;
  }

  getMetricSuggestion(metricName, current, target) {
    const suggestions = {
      executionTime: `Optimize execution to reduce time from ${current.toFixed(0)}ms to ${target}ms`,
      memoryUsage: `Reduce memory usage from ${current.toFixed(1)}MB to ${target}MB`,
      successRate: `Improve success rate from ${current.toFixed(1)}% to ${target}%`,
      errorRate: `Reduce error rate from ${current.toFixed(1)}% to ${target}%`,
      usageFrequency: `Increase usage to demonstrate value`,
      reliability: `Improve reliability from ${current.toFixed(1)}% to ${target}%`
    };

    return suggestions[metricName] || `Improve ${metricName} from ${current} to ${target}`;
  }

  getCategoryActions(categoryName) {
    const actions = {
      performance: ['Optimize algorithms', 'Reduce memory allocations', 'Implement caching'],
      quality: ['Add error handling', 'Improve input validation', 'Add retry logic'],
      value: ['Increase visibility', 'Improve documentation', 'Add more use cases'],
      health: ['Refactor code', 'Add tests', 'Update documentation']
    };

    return actions[categoryName] || ['Review and improve'];
  }

  async assessAllCapabilities() {
    console.log('=== Assessing all capabilities ===');

    const capabilities = this.unifiedInterface.listCapabilities();
    const results = [];

    for (const capability of capabilities) {
      const assessment = await this.assessCapability(capability.id);
      results.push(assessment);
    }

    const summary = {
      timestamp: new Date().toISOString(),
      totalAssessed: results.length,
      byHealthStatus: {},
      averageScore: 0,
      criticalCapabilities: []
    };

    let totalScore = 0;
    for (const result of results) {
      if (result.overallScore) {
        totalScore += result.overallScore;
        summary.byHealthStatus[result.healthStatus] = (summary.byHealthStatus[result.healthStatus] || 0) + 1;

        if (result.healthStatus === 'critical' || result.healthStatus === 'poor') {
          summary.criticalCapabilities.push({
            capabilityId: result.capabilityId,
            score: result.overallScore,
            status: result.healthStatus
          });
        }
      }
    }

    summary.averageScore = results.length > 0 ? totalScore / results.length : 0;

    console.log(`✅ All capabilities assessed: ${results.length} total`);
    return summary;
  }

  scheduleAssessment(capabilityId, interval) {
    console.log(`Scheduling assessment for ${capabilityId} every ${interval}ms`);

    const existingTimer = this.assessmentSchedule.get(capabilityId);
    if (existingTimer) {
      clearInterval(existingTimer);
    }

    const timer = setInterval(async () => {
      await this.assessCapability(capabilityId);
    }, interval);

    this.assessmentSchedule.set(capabilityId, timer);
    return true;
  }

  cancelScheduledAssessment(capabilityId) {
    const timer = this.assessmentSchedule.get(capabilityId);
    if (timer) {
      clearInterval(timer);
      this.assessmentSchedule.delete(capabilityId);
      console.log(`Cancelled scheduled assessment for ${capabilityId}`);
      return true;
    }
    return false;
  }

  getAssessmentStatistics() {
    return {
      totalAssessments: this.assessmentHistory.length,
      successfulAssessments: this.assessmentHistory.filter(a => a.overallScore !== undefined).length,
      failedAssessments: this.assessmentHistory.filter(a => a.success === false).length,
      scheduledAssessments: this.assessmentSchedule.size,
      recentAssessments: this.assessmentHistory.slice(-10)
    };
  }

  clearHistory() {
    this.assessmentHistory = [];
    this.saveAssessmentHistory();
    console.log('Assessment history cleared');
  }
}

module.exports = CapabilityAssessment;
