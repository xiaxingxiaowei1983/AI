const fs = require('fs');
const path = require('path');

const OPTIMIZER_LOG_FILE = path.join(__dirname, '../optimizer-logs.json');

class CapabilityOptimizer {
  constructor(unifiedInterface, assessment) {
    this.unifiedInterface = unifiedInterface;
    this.assessment = assessment;
    this.optimizationStrategies = this.defineOptimizationStrategies();
    this.optimizerLogs = this.loadOptimizerLogs();
    this.optimizationQueue = [];
    this.isOptimizing = false;
  }

  defineOptimizationStrategies() {
    return {
      parameter_optimization: {
        name: 'Parameter Optimization',
        description: 'Optimize capability parameters for better performance',
        applicableMetrics: ['executionTime', 'memoryUsage'],
        autoApply: true,
        riskLevel: 'low'
      },
      caching_optimization: {
        name: 'Caching Optimization',
        description: 'Add or improve caching mechanisms',
        applicableMetrics: ['executionTime', 'usageFrequency'],
        autoApply: true,
        riskLevel: 'low'
      },
      error_handling_optimization: {
        name: 'Error Handling Optimization',
        description: 'Improve error handling and recovery',
        applicableMetrics: ['successRate', 'errorRate'],
        autoApply: true,
        riskLevel: 'medium'
      },
      resource_optimization: {
        name: 'Resource Optimization',
        description: 'Optimize resource usage and cleanup',
        applicableMetrics: ['memoryUsage', 'cpuUsage'],
        autoApply: false,
        riskLevel: 'medium'
      },
      algorithm_optimization: {
        name: 'Algorithm Optimization',
        description: 'Improve algorithm efficiency',
        applicableMetrics: ['executionTime', 'memoryUsage'],
        autoApply: false,
        riskLevel: 'high'
      }
    };
  }

  loadOptimizerLogs() {
    if (fs.existsSync(OPTIMIZER_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(OPTIMIZER_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading optimizer logs:', error.message);
        return [];
      }
    }
    return [];
  }

  saveOptimizerLogs() {
    fs.writeFileSync(OPTIMIZER_LOG_FILE, JSON.stringify(this.optimizerLogs, null, 2));
  }

  async optimize(capabilityId, options = {}) {
    console.log(`=== Optimizing capability: ${capabilityId} ===`);

    const optimizationId = `optimization_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();

    try {
      const assessment = await this.assessment.assessCapability(capabilityId);
      if (!assessment.overallScore) {
        throw new Error('Assessment failed, cannot optimize');
      }

      const applicableStrategies = this.identifyApplicableStrategies(assessment);
      const optimizations = [];

      for (const strategyName of applicableStrategies) {
        const strategy = this.optimizationStrategies[strategyName];
        
        if (strategy.autoApply || options.forceApply) {
          const result = await this.applyOptimization(capabilityId, strategyName, assessment);
          optimizations.push(result);
        } else {
          console.log(`Skipping ${strategyName} - requires manual approval`);
        }
      }

      const postAssessment = await this.assessment.assessCapability(capabilityId);
      const improvement = postAssessment.overallScore - assessment.overallScore;

      const optimizationResult = {
        optimizationId,
        capabilityId,
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        beforeScore: assessment.overallScore,
        afterScore: postAssessment.overallScore,
        improvement,
        optimizations,
        success: improvement > 0
      };

      this.optimizerLogs.push(optimizationResult);
      this.saveOptimizerLogs();

      console.log(`✅ Optimization complete: ${capabilityId} - Improvement: ${improvement.toFixed(2)}`);
      return optimizationResult;

    } catch (error) {
      console.error(`❌ Optimization failed for ${capabilityId}:`, error.message);

      const failedResult = {
        optimizationId,
        capabilityId,
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        success: false,
        error: error.message
      };

      this.optimizerLogs.push(failedResult);
      this.saveOptimizerLogs();

      return failedResult;
    }
  }

  identifyApplicableStrategies(assessment) {
    const strategies = [];

    for (const recommendation of assessment.recommendations || []) {
      for (const weakMetric of recommendation.weakMetrics || []) {
        for (const [strategyName, strategy] of Object.entries(this.optimizationStrategies)) {
          if (strategy.applicableMetrics.includes(weakMetric.metric) && !strategies.includes(strategyName)) {
            strategies.push(strategyName);
          }
        }
      }
    }

    return strategies;
  }

  async applyOptimization(capabilityId, strategyName, assessment) {
    console.log(`Applying optimization strategy: ${strategyName}`);

    const strategy = this.optimizationStrategies[strategyName];
    const startTime = Date.now();

    let result;
    switch (strategyName) {
      case 'parameter_optimization':
        result = await this.applyParameterOptimization(capabilityId, assessment);
        break;
      case 'caching_optimization':
        result = await this.applyCachingOptimization(capabilityId, assessment);
        break;
      case 'error_handling_optimization':
        result = await this.applyErrorHandlingOptimization(capabilityId, assessment);
        break;
      case 'resource_optimization':
        result = await this.applyResourceOptimization(capabilityId, assessment);
        break;
      case 'algorithm_optimization':
        result = await this.applyAlgorithmOptimization(capabilityId, assessment);
        break;
      default:
        result = { applied: false, reason: 'Unknown strategy' };
    }

    return {
      strategy: strategyName,
      applied: result.applied,
      changes: result.changes || [],
      duration: Date.now() - startTime
    };
  }

  async applyParameterOptimization(capabilityId, assessment) {
    console.log('Applying parameter optimization');

    const changes = [];
    
    const performanceMetrics = assessment.metrics?.performance || {};
    
    if (performanceMetrics.executionTime > 3000) {
      changes.push({
        type: 'timeout_adjustment',
        description: 'Reduced timeout for faster failure detection',
        before: 30000,
        after: 15000
      });
    }

    if (performanceMetrics.memoryUsage > 100) {
      changes.push({
        type: 'batch_size_adjustment',
        description: 'Reduced batch size to limit memory usage',
        before: 100,
        after: 50
      });
    }

    return {
      applied: changes.length > 0,
      changes
    };
  }

  async applyCachingOptimization(capabilityId, assessment) {
    console.log('Applying caching optimization');

    const changes = [];
    
    const valueMetrics = assessment.metrics?.value || {};
    
    if (valueMetrics.usageFrequency > 5) {
      changes.push({
        type: 'enable_caching',
        description: 'Enabled caching for frequently used capability',
        cacheDuration: 300000
      });
    }

    return {
      applied: changes.length > 0,
      changes
    };
  }

  async applyErrorHandlingOptimization(capabilityId, assessment) {
    console.log('Applying error handling optimization');

    const changes = [];
    
    const qualityMetrics = assessment.metrics?.quality || {};
    
    if (qualityMetrics.errorRate > 5) {
      changes.push({
        type: 'add_retry_logic',
        description: 'Added automatic retry logic',
        maxRetries: 3,
        backoffMs: 1000
      });
    }

    if (qualityMetrics.successRate < 95) {
      changes.push({
        type: 'add_validation',
        description: 'Added input validation',
        validationRules: ['type_check', 'range_check']
      });
    }

    return {
      applied: changes.length > 0,
      changes
    };
  }

  async applyResourceOptimization(capabilityId, assessment) {
    console.log('Applying resource optimization');

    const changes = [];
    
    const performanceMetrics = assessment.metrics?.performance || {};
    
    if (performanceMetrics.memoryUsage > 80) {
      changes.push({
        type: 'memory_cleanup',
        description: 'Added memory cleanup after execution',
        cleanupInterval: 60000
      });
    }

    if (performanceMetrics.cpuUsage > 70) {
      changes.push({
        type: 'throttling',
        description: 'Added CPU throttling',
        maxConcurrent: 5
      });
    }

    return {
      applied: changes.length > 0,
      changes
    };
  }

  async applyAlgorithmOptimization(capabilityId, assessment) {
    console.log('Applying algorithm optimization');

    const changes = [];
    
    const performanceMetrics = assessment.metrics?.performance || {};
    
    if (performanceMetrics.executionTime > 5000) {
      changes.push({
        type: 'algorithm_suggestion',
        description: 'Suggested algorithm optimization',
        suggestion: 'Consider using memoization or more efficient data structures'
      });
    }

    return {
      applied: changes.length > 0,
      changes
    };
  }

  async optimizeAllCapabilities() {
    console.log('=== Optimizing all capabilities ===');

    const capabilities = this.unifiedInterface.listCapabilities();
    const results = [];

    for (const capability of capabilities) {
      const assessment = await this.assessment.assessCapability(capability.id);
      
      if (assessment.overallScore && assessment.overallScore < 75) {
        const result = await this.optimize(capability.id);
        results.push(result);
      }
    }

    const summary = {
      timestamp: new Date().toISOString(),
      totalOptimized: results.length,
      successfulOptimizations: results.filter(r => r.success).length,
      failedOptimizations: results.filter(r => !r.success).length,
      averageImprovement: 0
    };

    const successfulResults = results.filter(r => r.improvement !== undefined);
    if (successfulResults.length > 0) {
      summary.averageImprovement = successfulResults.reduce((sum, r) => sum + r.improvement, 0) / successfulResults.length;
    }

    console.log(`✅ All capabilities optimized: ${results.length} total`);
    return summary;
  }

  addToOptimizationQueue(capabilityId, priority = 'medium') {
    this.optimizationQueue.push({
      capabilityId,
      priority,
      addedAt: new Date().toISOString()
    });

    this.optimizationQueue.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    console.log(`Added ${capabilityId} to optimization queue with priority: ${priority}`);
  }

  async processOptimizationQueue() {
    if (this.isOptimizing) {
      console.log('Optimization already in progress');
      return;
    }

    this.isOptimizing = true;
    console.log(`Processing optimization queue: ${this.optimizationQueue.length} items`);

    const results = [];

    while (this.optimizationQueue.length > 0) {
      const item = this.optimizationQueue.shift();
      const result = await this.optimize(item.capabilityId);
      results.push(result);
    }

    this.isOptimizing = false;
    console.log('Optimization queue processed');

    return results;
  }

  getOptimizationStatistics() {
    return {
      totalOptimizations: this.optimizerLogs.length,
      successfulOptimizations: this.optimizerLogs.filter(l => l.success).length,
      failedOptimizations: this.optimizerLogs.filter(l => !l.success).length,
      queueLength: this.optimizationQueue.length,
      isOptimizing: this.isOptimizing,
      averageImprovement: this.calculateAverageImprovement(),
      recentOptimizations: this.optimizerLogs.slice(-10)
    };
  }

  calculateAverageImprovement() {
    const successfulLogs = this.optimizerLogs.filter(l => l.improvement !== undefined);
    if (successfulLogs.length === 0) return 0;

    return successfulLogs.reduce((sum, l) => sum + l.improvement, 0) / successfulLogs.length;
  }

  clearLogs() {
    this.optimizerLogs = [];
    this.saveOptimizerLogs();
    console.log('Optimizer logs cleared');
  }
}

module.exports = CapabilityOptimizer;
