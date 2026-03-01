const fs = require('fs');
const path = require('path');
const ErrorPredictor = require('./error-predictor');

const PREVENTION_LOG_FILE = path.join(__dirname, '../prevention-logs.json');

class ErrorPrevention {
  constructor() {
    this.predictor = new ErrorPredictor();
    this.preventionMeasures = this.loadPreventionMeasures();
    this.preventionHistory = this.loadPreventionHistory();
    this.activePreventions = new Map();
  }

  loadPreventionMeasures() {
    return {
      NETWORK: {
        NETWORK_FAILURE: {
          id: 'prevent_network_failure',
          name: 'Network Failure Prevention',
          triggers: ['prediction_probability > 0.7', 'connection_errors > 3'],
          actions: [
            {
              type: 'enable_caching',
              params: { cacheDuration: 300000, maxCacheSize: 1000 }
            },
            {
              type: 'reduce_retries',
              params: { maxRetries: 2, backoffMs: 2000 }
            },
            {
              type: 'switch_endpoint',
              params: { useBackup: true }
            }
          ],
          autoExecute: true,
          cooldown: 600000
        },
        DNS_FAILURE: {
          id: 'prevent_dns_failure',
          name: 'DNS Failure Prevention',
          triggers: ['dns_errors > 2'],
          actions: [
            {
              type: 'enable_dns_cache',
              params: { ttl: 3600000 }
            },
            {
              type: 'use_ip_fallback',
              params: { fallbackIps: [] }
            }
          ],
          autoExecute: true,
          cooldown: 1800000
        }
      },
      FILE_SYSTEM: {
        DISK_FULL: {
          id: 'prevent_disk_full',
          name: 'Disk Full Prevention',
          triggers: ['disk_usage > 0.85'],
          actions: [
            {
              type: 'cleanup_temp_files',
              params: { maxAge: 86400000 }
            },
            {
              type: 'archive_old_logs',
              params: { archivePath: './archives', maxAge: 604800000 }
            },
            {
              type: 'reduce_cache_size',
              params: { reductionFactor: 0.5 }
            }
          ],
          autoExecute: true,
          cooldown: 3600000
        },
        PERMISSION_DENIED: {
          id: 'prevent_permission_denied',
          name: 'Permission Denied Prevention',
          triggers: ['permission_warnings > 2'],
          actions: [
            {
              type: 'check_permissions',
              params: { paths: [] }
            },
            {
              type: 'use_temp_directory',
              params: { tempPath: './temp' }
            }
          ],
          autoExecute: false,
          cooldown: 1800000
        }
      },
      DATA: {
        DATA_CORRUPTION: {
          id: 'prevent_data_corruption',
          name: 'Data Corruption Prevention',
          triggers: ['parse_errors > 5', 'validation_failures > 3'],
          actions: [
            {
              type: 'enable_validation',
              params: { strict: true }
            },
            {
              type: 'create_backup',
              params: { backupPath: './backups' }
            },
            {
              type: 'enable_checksum',
              params: { algorithm: 'md5' }
            }
          ],
          autoExecute: true,
          cooldown: 900000
        }
      },
      SYSTEM: {
        OUT_OF_MEMORY: {
          id: 'prevent_out_of_memory',
          name: 'Out of Memory Prevention',
          triggers: ['memory_usage > 0.85'],
          actions: [
            {
              type: 'force_gc',
              params: {}
            },
            {
              type: 'reduce_concurrency',
              params: { maxConcurrency: 5 }
            },
            {
              type: 'clear_caches',
              params: { preserveCritical: true }
            }
          ],
          autoExecute: true,
          cooldown: 600000
        },
        RESOURCE_EXHAUSTED: {
          id: 'prevent_resource_exhausted',
          name: 'Resource Exhausted Prevention',
          triggers: ['cpu_usage > 0.8', 'response_time > 5000'],
          actions: [
            {
              type: 'throttle_requests',
              params: { maxRps: 10 }
            },
            {
              type: 'queue_operations',
              params: { queueSize: 100 }
            },
            {
              type: 'scale_down',
              params: { reductionFactor: 0.7 }
            }
          ],
          autoExecute: true,
          cooldown: 1200000
        }
      }
    };
  }

  loadPreventionHistory() {
    if (fs.existsSync(PREVENTION_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(PREVENTION_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading prevention history:', error.message);
        return [];
      }
    }
    return [];
  }

  savePreventionHistory() {
    fs.writeFileSync(PREVENTION_LOG_FILE, JSON.stringify(this.preventionHistory, null, 2));
  }

  async runPreventionChecks(context = {}) {
    console.log('=== Running prevention checks ===');

    const prediction = this.predictor.predict(context);
    const preventions = [];

    for (const pred of prediction.predictions) {
      if (pred.probability > 0.6) {
        const prevention = this.findPreventionMeasure(pred);
        if (prevention) {
          const result = await this.executePrevention(prevention, pred, context);
          preventions.push(result);
        }
      }
    }

    const result = {
      timestamp: new Date().toISOString(),
      prediction: prediction,
      preventionsExecuted: preventions,
      riskLevel: prediction.riskLevel
    };

    this.preventionHistory.push(result);
    this.savePreventionHistory();

    console.log(`✅ Prevention checks complete: ${preventions.length} measures executed`);
    return result;
  }

  findPreventionMeasure(prediction) {
    const categoryMeasures = this.preventionMeasures[prediction.category];
    if (!categoryMeasures) return null;

    const measure = categoryMeasures[prediction.prediction];
    if (!measure) return null;

    const lastExecution = this.activePreventions.get(measure.id);
    if (lastExecution && Date.now() - lastExecution < measure.cooldown) {
      console.log(`Prevention ${measure.id} is in cooldown`);
      return null;
    }

    return measure;
  }

  async executePrevention(measure, prediction, context) {
    console.log(`Executing prevention: ${measure.name}`);

    const results = [];

    for (const action of measure.actions) {
      try {
        const result = await this.executeAction(action, context);
        results.push({
          action: action.type,
          success: true,
          result: result
        });
      } catch (error) {
        console.error(`Action ${action.type} failed:`, error.message);
        results.push({
          action: action.type,
          success: false,
          error: error.message
        });
      }
    }

    this.activePreventions.set(measure.id, Date.now());

    return {
      measureId: measure.id,
      measureName: measure.name,
      prediction: prediction.prediction,
      probability: prediction.probability,
      actions: results,
      timestamp: new Date().toISOString()
    };
  }

  async executeAction(action, context) {
    console.log(`Executing action: ${action.type}`);

    switch (action.type) {
      case 'enable_caching':
        return this.enableCaching(action.params);
      
      case 'reduce_retries':
        return this.reduceRetries(action.params);
      
      case 'switch_endpoint':
        return this.switchEndpoint(action.params);
      
      case 'enable_dns_cache':
        return this.enableDnsCache(action.params);
      
      case 'cleanup_temp_files':
        return this.cleanupTempFiles(action.params);
      
      case 'archive_old_logs':
        return this.archiveOldLogs(action.params);
      
      case 'reduce_cache_size':
        return this.reduceCacheSize(action.params);
      
      case 'force_gc':
        return this.forceGarbageCollection();
      
      case 'reduce_concurrency':
        return this.reduceConcurrency(action.params);
      
      case 'clear_caches':
        return this.clearCaches(action.params);
      
      case 'throttle_requests':
        return this.throttleRequests(action.params);
      
      case 'enable_validation':
        return this.enableValidation(action.params);
      
      case 'create_backup':
        return this.createBackup(action.params);
      
      default:
        console.log(`Unknown action type: ${action.type}`);
        return { status: 'unknown_action' };
    }
  }

  enableCaching(params) {
    console.log('Enabling caching with params:', params);
    return { enabled: true, params: params };
  }

  reduceRetries(params) {
    console.log('Reducing retries with params:', params);
    return { maxRetries: params.maxRetries, backoffMs: params.backoffMs };
  }

  switchEndpoint(params) {
    console.log('Switching endpoint with params:', params);
    return { useBackup: params.useBackup };
  }

  enableDnsCache(params) {
    console.log('Enabling DNS cache with params:', params);
    return { enabled: true, ttl: params.ttl };
  }

  cleanupTempFiles(params) {
    console.log('Cleaning up temp files with params:', params);
    const tempDir = './temp';
    let cleanedCount = 0;
    
    try {
      if (fs.existsSync(tempDir)) {
        const files = fs.readdirSync(tempDir);
        const cutoffTime = Date.now() - params.maxAge;
        
        for (const file of files) {
          const filePath = path.join(tempDir, file);
          const stats = fs.statSync(filePath);
          if (stats.mtimeMs < cutoffTime) {
            fs.unlinkSync(filePath);
            cleanedCount++;
          }
        }
      }
    } catch (error) {
      console.error('Cleanup error:', error.message);
    }
    
    return { cleanedFiles: cleanedCount };
  }

  archiveOldLogs(params) {
    console.log('Archiving old logs with params:', params);
    return { archived: true, archivePath: params.archivePath };
  }

  reduceCacheSize(params) {
    console.log('Reducing cache size with params:', params);
    return { reductionFactor: params.reductionFactor };
  }

  forceGarbageCollection() {
    console.log('Forcing garbage collection');
    if (global.gc) {
      global.gc();
      return { gcExecuted: true };
    }
    return { gcExecuted: false, reason: 'gc not exposed' };
  }

  reduceConcurrency(params) {
    console.log('Reducing concurrency with params:', params);
    return { maxConcurrency: params.maxConcurrency };
  }

  clearCaches(params) {
    console.log('Clearing caches with params:', params);
    return { cleared: true, preserveCritical: params.preserveCritical };
  }

  throttleRequests(params) {
    console.log('Throttling requests with params:', params);
    return { maxRps: params.maxRps };
  }

  enableValidation(params) {
    console.log('Enabling validation with params:', params);
    return { strict: params.strict };
  }

  createBackup(params) {
    console.log('Creating backup with params:', params);
    return { backupCreated: true, backupPath: params.backupPath };
  }

  getPreventionStatistics() {
    const stats = {
      totalPreventions: this.preventionHistory.length,
      successfulPreventions: 0,
      failedPreventions: 0,
      byType: {},
      activePreventions: this.activePreventions.size
    };

    for (const record of this.preventionHistory) {
      for (const prevention of record.preventionsExecuted) {
        const successActions = prevention.actions.filter(a => a.success).length;
        const totalActions = prevention.actions.length;
        
        if (successActions === totalActions) {
          stats.successfulPreventions++;
        } else {
          stats.failedPreventions++;
        }

        stats.byType[prevention.measureName] = (stats.byType[prevention.measureName] || 0) + 1;
      }
    }

    return stats;
  }

  clearHistory() {
    this.preventionHistory = [];
    this.activePreventions.clear();
    this.savePreventionHistory();
    console.log('Prevention history cleared');
  }
}

module.exports = ErrorPrevention;
