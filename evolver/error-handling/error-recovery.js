const fs = require('fs');
const path = require('path');
const ErrorClassifier = require('./error-classifier');

const RECOVERY_LOG_FILE = path.join(__dirname, '../recovery-logs.json');

class ErrorRecovery {
  constructor() {
    this.classifier = new ErrorClassifier();
    this.strategies = this.loadStrategies();
    this.recoveryHistory = this.loadRecoveryHistory();
    this.circuitBreaker = this.initCircuitBreaker();
  }

  loadStrategies() {
    return {
      retry: {
        name: 'Retry Strategy',
        description: 'Retry the operation with configurable backoff',
        applicableErrors: ['NETWORK', 'TIMEOUT', 'FILE_LOCKED'],
        params: {
          maxRetries: { type: 'number', default: 3 },
          backoffMs: { type: 'number', default: 1000 },
          backoffMultiplier: { type: 'number', default: 2 }
        },
        execute: async (operation, params) => {
          let currentBackoff = params.backoffMs;
          for (let i = 0; i < params.maxRetries; i++) {
            try {
              return await operation();
            } catch (error) {
              if (i === params.maxRetries - 1) throw error;
              await new Promise(r => setTimeout(r, currentBackoff));
              currentBackoff *= params.backoffMultiplier;
            }
          }
        }
      },
      fallback: {
        name: 'Fallback Strategy',
        description: 'Use fallback operation when primary fails',
        applicableErrors: ['CAPABILITY_NOT_FOUND', 'FILE_NOT_FOUND'],
        params: {
          fallbackOperation: { type: 'function', required: true }
        },
        execute: async (operation, params) => {
          try {
            return await operation();
          } catch (error) {
            return await params.fallbackOperation();
          }
        }
      },
      degrade: {
        name: 'Graceful Degradation',
        description: 'Provide reduced functionality when full operation fails',
        applicableErrors: ['RESOURCE_EXHAUSTED', 'OUT_OF_MEMORY'],
        params: {
          degradedOperation: { type: 'function', required: true },
          fallbackValue: { type: 'any' }
        },
        execute: async (operation, params) => {
          try {
            return await operation();
          } catch (error) {
            if (params.degradedOperation) {
              return await params.degradedOperation();
            }
            return params.fallbackValue;
          }
        }
      },
      cache: {
        name: 'Cache Strategy',
        description: 'Return cached result when operation fails',
        applicableErrors: ['NETWORK', 'TIMEOUT'],
        params: {
          cachedValue: { type: 'any' },
          maxAge: { type: 'number', default: 300000 }
        },
        execute: async (operation, params) => {
          try {
            const result = await operation();
            return result;
          } catch (error) {
            if (params.cachedValue !== undefined) {
              return params.cachedValue;
            }
            throw error;
          }
        }
      },
      circuit_breaker: {
        name: 'Circuit Breaker',
        description: 'Prevent cascading failures by failing fast',
        applicableErrors: ['NETWORK', 'CONNECTION_FAILED'],
        params: {
          threshold: { type: 'number', default: 5 },
          timeout: { type: 'number', default: 60000 }
        },
        execute: async (operation, params, context) => {
          const circuitState = context.circuitBreaker;
          if (circuitState.state === 'open') {
            if (Date.now() - circuitState.lastFailure > params.timeout) {
              circuitState.state = 'half-open';
            } else {
              throw new Error('Circuit breaker is open');
            }
          }

          try {
            const result = await operation();
            circuitState.failures = 0;
            circuitState.state = 'closed';
            return result;
          } catch (error) {
            circuitState.failures++;
            circuitState.lastFailure = Date.now();
            if (circuitState.failures >= params.threshold) {
              circuitState.state = 'open';
            }
            throw error;
          }
        }
      },
      compensate: {
        name: 'Compensation Strategy',
        description: 'Execute compensating action on failure',
        applicableErrors: ['DATA', 'PARSE_ERROR'],
        params: {
          compensateOperation: { type: 'function', required: true }
        },
        execute: async (operation, params) => {
          try {
            return await operation();
          } catch (error) {
            await params.compensateOperation(error);
            throw error;
          }
        }
      }
    };
  }

  initCircuitBreaker() {
    return {
      state: 'closed',
      failures: 0,
      lastFailure: null,
      successCount: 0
    };
  }

  loadRecoveryHistory() {
    if (fs.existsSync(RECOVERY_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(RECOVERY_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading recovery history:', error.message);
        return [];
      }
    }
    return [];
  }

  saveRecoveryHistory() {
    fs.writeFileSync(RECOVERY_LOG_FILE, JSON.stringify(this.recoveryHistory, null, 2));
  }

  async recover(error, operation, context = {}) {
    console.log('=== Attempting error recovery ===');

    const errorInfo = this.classifier.classifyError(error);
    const applicableStrategies = this.findApplicableStrategies(errorInfo);

    if (applicableStrategies.length === 0) {
      console.log('No applicable recovery strategies found');
      return { success: false, error: 'No recovery strategy available' };
    }

    for (const strategyName of applicableStrategies) {
      const strategy = this.strategies[strategyName];
      console.log(`Trying recovery strategy: ${strategy.name}`);

      try {
        const params = this.buildStrategyParams(strategy, context);
        const result = await strategy.execute(operation, params, {
          circuitBreaker: this.circuitBreaker
        });

        this.logRecovery(errorInfo, strategyName, true, result);
        console.log(`✅ Recovery successful using: ${strategy.name}`);
        return { success: true, strategy: strategyName, result };
      } catch (recoveryError) {
        console.log(`Recovery strategy ${strategyName} failed: ${recoveryError.message}`);
        this.logRecovery(errorInfo, strategyName, false, null, recoveryError.message);
      }
    }

    console.log('All recovery strategies failed');
    return { success: false, error: 'All recovery strategies failed' };
  }

  findApplicableStrategies(errorInfo) {
    const strategies = [];

    for (const [name, strategy] of Object.entries(this.strategies)) {
      if (strategy.applicableErrors.includes(errorInfo.category) ||
          strategy.applicableErrors.includes(errorInfo.subcategory)) {
        strategies.push(name);
      }
    }

    const successRates = this.getStrategySuccessRates();
    strategies.sort((a, b) => (successRates[b] || 0) - (successRates[a] || 0));

    return strategies;
  }

  buildStrategyParams(strategy, context) {
    const params = {};

    for (const [paramName, paramConfig] of Object.entries(strategy.params)) {
      if (context[paramName] !== undefined) {
        params[paramName] = context[paramName];
      } else if (paramConfig.default !== undefined) {
        params[paramName] = paramConfig.default;
      } else if (paramConfig.required) {
        throw new Error(`Missing required parameter: ${paramName}`);
      }
    }

    return params;
  }

  logRecovery(errorInfo, strategyName, success, result, errorMessage = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      errorInfo: {
        category: errorInfo.category,
        subcategory: errorInfo.subcategory,
        severity: errorInfo.severity
      },
      strategy: strategyName,
      success,
      result: success ? 'recovered' : null,
      errorMessage
    };

    this.recoveryHistory.push(logEntry);
    this.saveRecoveryHistory();
  }

  getStrategySuccessRates() {
    const stats = {};

    for (const log of this.recoveryHistory) {
      if (!stats[log.strategy]) {
        stats[log.strategy] = { total: 0, success: 0 };
      }
      stats[log.strategy].total++;
      if (log.success) {
        stats[log.strategy].success++;
      }
    }

    const rates = {};
    for (const [strategy, data] of Object.entries(stats)) {
      rates[strategy] = data.total > 0 ? data.success / data.total : 0;
    }

    return rates;
  }

  getRecoveryStatistics() {
    const stats = {
      totalAttempts: this.recoveryHistory.length,
      successfulRecoveries: this.recoveryHistory.filter(r => r.success).length,
      failedRecoveries: this.recoveryHistory.filter(r => !r.success).length,
      successRate: 0,
      byStrategy: {},
      byErrorCategory: {},
      circuitBreakerState: this.circuitBreaker.state
    };

    stats.successRate = stats.totalAttempts > 0
      ? (stats.successfulRecoveries / stats.totalAttempts) * 100
      : 0;

    for (const log of this.recoveryHistory) {
      stats.byStrategy[log.strategy] = (stats.byStrategy[log.strategy] || 0) + 1;
      stats.byErrorCategory[log.errorInfo.category] = (stats.byErrorCategory[log.errorInfo.category] || 0) + 1;
    }

    return stats;
  }

  resetCircuitBreaker() {
    this.circuitBreaker = this.initCircuitBreaker();
    console.log('Circuit breaker reset');
  }

  clearHistory() {
    this.recoveryHistory = [];
    this.saveRecoveryHistory();
    console.log('Recovery history cleared');
  }
}

module.exports = ErrorRecovery;
