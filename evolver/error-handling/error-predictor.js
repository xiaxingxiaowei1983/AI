const fs = require('fs');
const path = require('path');

const PREDICTOR_LOG_FILE = path.join(__dirname, '../predictor-logs.json');

class ErrorPredictor {
  constructor() {
    this.errorPatterns = this.loadErrorPatterns();
    this.predictionModel = this.initPredictionModel();
    this.predictionHistory = this.loadPredictionHistory();
  }

  loadErrorPatterns() {
    return {
      NETWORK: {
        patterns: [
          {
            id: 'connection_instability',
            indicators: ['frequent_timeouts', 'connection_resets'],
            threshold: 3,
            timeWindow: 300000,
            prediction: 'NETWORK_FAILURE',
            probability: 0.8
          },
          {
            id: 'dns_issues',
            indicators: ['dns_lookup_failures', 'slow_resolution'],
            threshold: 2,
            timeWindow: 600000,
            prediction: 'DNS_FAILURE',
            probability: 0.7
          }
        ]
      },
      FILE_SYSTEM: {
        patterns: [
          {
            id: 'disk_space_depletion',
            indicators: ['increasing_file_size', 'decreasing_disk_space'],
            threshold: 0.9,
            timeWindow: 3600000,
            prediction: 'DISK_FULL',
            probability: 0.85
          },
          {
            id: 'permission_issues',
            indicators: ['permission_denied_warnings', 'access_errors'],
            threshold: 2,
            timeWindow: 1800000,
            prediction: 'PERMISSION_DENIED',
            probability: 0.75
          }
        ]
      },
      DATA: {
        patterns: [
          {
            id: 'data_quality_degradation',
            indicators: ['parse_errors', 'validation_failures'],
            threshold: 5,
            timeWindow: 600000,
            prediction: 'DATA_CORRUPTION',
            probability: 0.7
          },
          {
            id: 'encoding_issues',
            indicators: ['character_errors', 'encoding_mismatches'],
            threshold: 3,
            timeWindow: 900000,
            prediction: 'ENCODING_ERROR',
            probability: 0.65
          }
        ]
      },
      SYSTEM: {
        patterns: [
          {
            id: 'memory_exhaustion',
            indicators: ['increasing_memory_usage', 'gc_frequency'],
            threshold: 0.85,
            timeWindow: 1800000,
            prediction: 'OUT_OF_MEMORY',
            probability: 0.9
          },
          {
            id: 'resource_contention',
            indicators: ['high_cpu_usage', 'slow_response_times'],
            threshold: 0.8,
            timeWindow: 1200000,
            prediction: 'RESOURCE_EXHAUSTED',
            probability: 0.8
          }
        ]
      }
    };
  }

  initPredictionModel() {
    return {
      version: '1.0',
      accuracy: 0.75,
      lastTrained: new Date().toISOString(),
      features: [
        'error_frequency',
        'error_severity',
        'time_since_last_error',
        'system_load',
        'memory_usage',
        'network_latency'
      ],
      weights: {
        error_frequency: 0.25,
        error_severity: 0.20,
        time_since_last_error: 0.15,
        system_load: 0.15,
        memory_usage: 0.15,
        network_latency: 0.10
      }
    };
  }

  loadPredictionHistory() {
    if (fs.existsSync(PREDICTOR_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(PREDICTOR_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading prediction history:', error.message);
        return [];
      }
    }
    return [];
  }

  savePredictionHistory() {
    fs.writeFileSync(PREDICTOR_LOG_FILE, JSON.stringify(this.predictionHistory, null, 2));
  }

  predict(context = {}) {
    console.log('=== Running error prediction ===');

    const predictions = [];
    const systemState = this.collectSystemState(context);

    for (const [category, patterns] of Object.entries(this.errorPatterns)) {
      for (const pattern of patterns) {
        const matchResult = this.matchPattern(pattern, systemState, context);
        
        if (matchResult.matched) {
          predictions.push({
            category: category,
            pattern: pattern.id,
            prediction: pattern.prediction,
            probability: this.calculateProbability(pattern, matchResult, systemState),
            confidence: matchResult.confidence,
            timeToEvent: this.estimateTimeToEvent(pattern, matchResult),
            indicators: matchResult.indicators,
            recommendations: this.generateRecommendations(pattern)
          });
        }
      }
    }

    predictions.sort((a, b) => b.probability - a.probability);

    const predictionResult = {
      timestamp: new Date().toISOString(),
      predictions: predictions,
      systemState: systemState,
      riskLevel: this.calculateRiskLevel(predictions)
    };

    this.predictionHistory.push(predictionResult);
    this.savePredictionHistory();

    console.log(`✅ Prediction complete: ${predictions.length} potential issues identified`);
    return predictionResult;
  }

  collectSystemState(context) {
    return {
      timestamp: Date.now(),
      errorFrequency: context.errorFrequency || this.calculateErrorFrequency(),
      systemLoad: context.systemLoad || process.cpuUsage(),
      memoryUsage: context.memoryUsage || process.memoryUsage(),
      networkLatency: context.networkLatency || null,
      recentErrors: context.recentErrors || []
    };
  }

  matchPattern(pattern, systemState, context) {
    const result = {
      matched: false,
      confidence: 0,
      indicators: []
    };

    const recentErrors = context.recentErrors || [];
    const timeWindow = pattern.timeWindow || 300000;
    const cutoffTime = Date.now() - timeWindow;

    for (const indicator of pattern.indicators) {
      const matchingErrors = recentErrors.filter(e => 
        e.indicator === indicator && 
        new Date(e.timestamp).getTime() > cutoffTime
      );

      if (matchingErrors.length > 0) {
        result.indicators.push({
          indicator: indicator,
          count: matchingErrors.length,
          recent: matchingErrors[matchingErrors.length - 1]
        });
      }
    }

    if (result.indicators.length > 0) {
      const threshold = pattern.threshold;
      const matchedIndicators = result.indicators.filter(i => 
        typeof threshold === 'number' && threshold < 1 
          ? i.count / 10 >= threshold 
          : i.count >= threshold
      );

      if (matchedIndicators.length > 0) {
        result.matched = true;
        result.confidence = Math.min(1, matchedIndicators.length / pattern.indicators.length);
      }
    }

    return result;
  }

  calculateProbability(pattern, matchResult, systemState) {
    let probability = pattern.probability;

    probability *= (0.5 + matchResult.confidence * 0.5);

    if (systemState.memoryUsage) {
      const memUsage = systemState.memoryUsage.heapUsed / systemState.memoryUsage.heapTotal;
      if (memUsage > 0.8) {
        probability *= 1.2;
      }
    }

    return Math.min(1, probability);
  }

  estimateTimeToEvent(pattern, matchResult) {
    const baseTime = pattern.timeWindow || 300000;
    const confidenceFactor = 1 - matchResult.confidence;
    return Math.round(baseTime * confidenceFactor);
  }

  calculateErrorFrequency() {
    const recentPredictions = this.predictionHistory.filter(p => 
      Date.now() - new Date(p.timestamp).getTime() < 3600000
    );

    return {
      hourly: recentPredictions.length,
      daily: this.predictionHistory.filter(p => 
        Date.now() - new Date(p.timestamp).getTime() < 86400000
      ).length
    };
  }

  calculateRiskLevel(predictions) {
    if (predictions.length === 0) return 'low';

    const highRiskCount = predictions.filter(p => p.probability > 0.7).length;
    const mediumRiskCount = predictions.filter(p => p.probability > 0.4 && p.probability <= 0.7).length;

    if (highRiskCount > 0) return 'high';
    if (mediumRiskCount > 2) return 'high';
    if (mediumRiskCount > 0) return 'medium';
    return 'low';
  }

  generateRecommendations(pattern) {
    const recommendations = {
      NETWORK_FAILURE: [
        '检查网络连接状态',
        '准备备用网络路径',
        '启用离线缓存模式'
      ],
      DNS_FAILURE: [
        '验证DNS配置',
        '准备IP地址备用列表',
        '启用DNS缓存'
      ],
      DISK_FULL: [
        '清理临时文件',
        '归档旧日志',
        '扩展存储容量'
      ],
      PERMISSION_DENIED: [
        '检查文件权限',
        '申请必要权限',
        '使用临时目录'
      ],
      DATA_CORRUPTION: [
        '验证数据完整性',
        '启用数据备份',
        '实施数据校验'
      ],
      OUT_OF_MEMORY: [
        '释放未使用资源',
        '减少并发操作',
        '启用内存监控'
      ],
      RESOURCE_EXHAUSTED: [
        '限制资源密集操作',
        '优化资源使用',
        '扩展系统资源'
      ]
    };

    return recommendations[pattern.prediction] || ['监控系统状态', '准备应对措施'];
  }

  getPredictionStatistics() {
    const stats = {
      totalPredictions: this.predictionHistory.length,
      accuratePredictions: 0,
      accuracy: 0,
      byCategory: {},
      byRiskLevel: { low: 0, medium: 0, high: 0 }
    };

    for (const prediction of this.predictionHistory) {
      stats.byRiskLevel[prediction.riskLevel]++;

      for (const p of prediction.predictions) {
        stats.byCategory[p.category] = (stats.byCategory[p.category] || 0) + 1;
      }
    }

    return stats;
  }

  updateModel(feedback) {
    console.log('Updating prediction model with feedback');
    
    this.predictionModel.lastTrained = new Date().toISOString();
    
    if (feedback.accurate !== undefined) {
      const currentAccuracy = this.predictionModel.accuracy;
      this.predictionModel.accuracy = currentAccuracy * 0.9 + (feedback.accurate ? 1 : 0) * 0.1;
    }

    console.log(`Model accuracy: ${(this.predictionModel.accuracy * 100).toFixed(1)}%`);
  }

  clearHistory() {
    this.predictionHistory = [];
    this.savePredictionHistory();
    console.log('Prediction history cleared');
  }
}

module.exports = ErrorPredictor;
