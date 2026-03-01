const fs = require('fs');
const path = require('path');
const ErrorClassifier = require('./error-classifier');

const HANDLER_LOG_FILE = path.join(__dirname, '../handler-logs.json');

class ErrorHandler {
  constructor() {
    this.classifier = new ErrorClassifier();
    this.handlers = this.defineHandlers();
    this.handlerLogs = this.loadHandlerLogs();
  }

  defineHandlers() {
    return {
      NETWORK: {
        CONNECTION_FAILED: async (error, context) => {
          console.log('Handling CONNECTION_FAILED error');
          return {
            action: 'retry_with_backoff',
            params: {
              maxRetries: 3,
              backoffMs: 1000
            }
          };
        },
        TIMEOUT: async (error, context) => {
          console.log('Handling TIMEOUT error');
          return {
            action: 'increase_timeout',
            params: {
              timeoutMultiplier: 2
            }
          };
        },
        DNS_FAILURE: async (error, context) => {
          console.log('Handling DNS_FAILURE error');
          return {
            action: 'use_cached_ip',
            params: {
              fallbackIp: context?.fallbackIp || null
            }
          };
        }
      },
      FILE_SYSTEM: {
        FILE_NOT_FOUND: async (error, context) => {
          console.log('Handling FILE_NOT_FOUND error');
          return {
            action: 'create_default_file',
            params: {
              defaultContent: context?.defaultContent || ''
            }
          };
        },
        PERMISSION_DENIED: async (error, context) => {
          console.log('Handling PERMISSION_DENIED error');
          return {
            action: 'request_elevation',
            params: {
              reason: 'File permission denied'
            }
          };
        },
        FILE_LOCKED: async (error, context) => {
          console.log('Handling FILE_LOCKED error');
          return {
            action: 'wait_and_retry',
            params: {
              waitMs: 5000,
              maxAttempts: 3
            }
          };
        }
      },
      DATA: {
        PARSE_ERROR: async (error, context) => {
          console.log('Handling PARSE_ERROR error');
          return {
            action: 'use_fallback_parser',
            params: {
              strict: false
            }
          };
        },
        VALIDATION_ERROR: async (error, context) => {
          console.log('Handling VALIDATION_ERROR error');
          return {
            action: 'sanitize_and_retry',
            params: {
              sanitizeRules: context?.sanitizeRules || []
            }
          };
        },
        TYPE_ERROR: async (error, context) => {
          console.log('Handling TYPE_ERROR error');
          return {
            action: 'convert_type',
            params: {
              targetType: context?.targetType || 'string'
            }
          };
        }
      },
      SYSTEM: {
        OUT_OF_MEMORY: async (error, context) => {
          console.log('Handling OUT_OF_MEMORY error');
          return {
            action: 'garbage_collect',
            params: {
              force: true
            }
          };
        },
        RESOURCE_EXHAUSTED: async (error, context) => {
          console.log('Handling RESOURCE_EXHAUSTED error');
          return {
            action: 'release_resources',
            params: {
              resourceTypes: context?.resourceTypes || ['memory', 'handles']
            }
          };
        }
      },
      CAPABILITY: {
        CAPABILITY_NOT_FOUND: async (error, context) => {
          console.log('Handling CAPABILITY_NOT_FOUND error');
          return {
            action: 'use_fallback_capability',
            params: {
              fallbackCapabilityId: context?.fallbackCapabilityId || null
            }
          };
        },
        CONSTRAINT_VIOLATION: async (error, context) => {
          console.log('Handling CONSTRAINT_VIOLATION error');
          return {
            action: 'adjust_parameters',
            params: {
              constraints: context?.constraints || []
            }
          };
        }
      },
      EVOLUTION: {
        EVOLUTION_FAILED: async (error, context) => {
          console.log('Handling EVOLUTION_FAILED error');
          return {
            action: 'rollback_evolution',
            params: {
              targetVersion: context?.previousVersion || null
            }
          };
        },
        DEGENERATION_DETECTED: async (error, context) => {
          console.log('Handling DEGENERATION_DETECTED error');
          return {
            action: 'apply_anti_degeneration_lock',
            params: {
              lockDuration: 3600000
            }
          };
        }
      }
    };
  }

  loadHandlerLogs() {
    if (fs.existsSync(HANDLER_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(HANDLER_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading handler logs:', error.message);
        return [];
      }
    }
    return [];
  }

  saveHandlerLogs() {
    fs.writeFileSync(HANDLER_LOG_FILE, JSON.stringify(this.handlerLogs, null, 2));
  }

  async handleError(error, context = {}) {
    console.log('=== Handling error ===');

    const errorInfo = this.classifier.classifyError(error);
    const severity = this.classifier.assessErrorSeverity(errorInfo);
    const recommendations = this.classifier.getRecoveryRecommendation(errorInfo);

    let handlerResult = null;

    if (errorInfo.category && this.handlers[errorInfo.category]) {
      if (errorInfo.subcategory && this.handlers[errorInfo.category][errorInfo.subcategory]) {
        try {
          handlerResult = await this.handlers[errorInfo.category][errorInfo.subcategory](error, context);
        } catch (handlerError) {
          console.error('Handler execution failed:', handlerError.message);
          handlerResult = {
            action: 'log_and_continue',
            params: { error: handlerError.message }
          };
        }
      } else {
        const defaultHandler = Object.values(this.handlers[errorInfo.category])[0];
        if (defaultHandler) {
          try {
            handlerResult = await defaultHandler(error, context);
          } catch (handlerError) {
            console.error('Default handler execution failed:', handlerError.message);
          }
        }
      }
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      errorInfo,
      severity,
      recommendations,
      handlerResult,
      context
    };

    this.handlerLogs.push(logEntry);
    this.saveHandlerLogs();

    console.log(`✅ Error handled: ${errorInfo.category}/${errorInfo.subcategory || 'general'}`);

    return {
      errorInfo,
      severity,
      recommendations,
      handlerResult,
      needsImmediateAttention: severity.needsImmediateAttention
    };
  }

  async handleWithRetry(operation, options = {}) {
    const {
      maxRetries = 3,
      backoffMs = 1000,
      backoffMultiplier = 2,
      context = {}
    } = options;

    let lastError;
    let currentBackoff = backoffMs;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        const result = await this.handleError(error, { ...context, attempt });

        if (!result.errorInfo.recoverable || attempt === maxRetries) {
          throw error;
        }

        console.log(`Retrying in ${currentBackoff}ms (attempt ${attempt}/${maxRetries})`);
        await this.sleep(currentBackoff);
        currentBackoff *= backoffMultiplier;
      }
    }

    throw lastError;
  }

  async handleWithFallback(operation, fallbackOperation, context = {}) {
    try {
      return await operation();
    } catch (error) {
      console.log('Primary operation failed, executing fallback');
      await this.handleError(error, context);

      try {
        return await fallbackOperation();
      } catch (fallbackError) {
        await this.handleError(fallbackError, { ...context, isFallback: true });
        throw fallbackError;
      }
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getHandlerStatistics() {
    const stats = {
      totalHandled: this.handlerLogs.length,
      byCategory: {},
      byAction: {},
      successRate: 0,
      recentHandlers: []
    };

    let successfulHandlers = 0;

    for (const log of this.handlerLogs) {
      stats.byCategory[log.errorInfo.category] = (stats.byCategory[log.errorInfo.category] || 0) + 1;

      if (log.handlerResult?.action) {
        stats.byAction[log.handlerResult.action] = (stats.byAction[log.handlerResult.action] || 0) + 1;
      }

      if (log.handlerResult && !log.handlerResult.error) {
        successfulHandlers++;
      }
    }

    stats.successRate = this.handlerLogs.length > 0
      ? (successfulHandlers / this.handlerLogs.length) * 100
      : 0;

    stats.recentHandlers = this.handlerLogs.slice(-10);

    return stats;
  }

  clearLogs() {
    this.handlerLogs = [];
    this.saveHandlerLogs();
    console.log('Handler logs cleared');
  }
}

module.exports = ErrorHandler;
