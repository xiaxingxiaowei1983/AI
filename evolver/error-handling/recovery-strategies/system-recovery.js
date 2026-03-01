const os = require('os');

class SystemRecoveryStrategy {
  constructor() {
    this.name = 'System Recovery Strategy';
    this.description = 'Recovery strategies for system-level errors';
    this.memoryThreshold = 0.9;
    this.cpuThreshold = 0.9;
  }

  async execute(error, context) {
    const errorType = this.identifyErrorType(error);
    const strategy = this.getStrategy(errorType);
    
    console.log(`Executing system recovery strategy for: ${errorType}`);
    return await strategy(error, context);
  }

  identifyErrorType(error) {
    const message = error.message?.toLowerCase() || '';
    const code = error.code?.toLowerCase() || '';

    if (code === 'enomem' || message.includes('memory')) return 'OUT_OF_MEMORY';
    if (message.includes('cpu') || message.includes('resource')) return 'RESOURCE_EXHAUSTED';
    if (message.includes('crash') || message.includes('fatal')) return 'CRITICAL_FAILURE';
    if (message.includes('spawn') || message.includes('child process')) return 'PROCESS_ERROR';
    if (message.includes('signal') || code.includes('sig')) return 'PROCESS_SIGNAL';
    
    return 'UNKNOWN_SYSTEM_ERROR';
  }

  getStrategy(errorType) {
    const strategies = {
      OUT_OF_MEMORY: this.handleOutOfMemory.bind(this),
      RESOURCE_EXHAUSTED: this.handleResourceExhausted.bind(this),
      CRITICAL_FAILURE: this.handleCriticalFailure.bind(this),
      PROCESS_ERROR: this.handleProcessError.bind(this),
      PROCESS_SIGNAL: this.handleProcessSignal.bind(this),
      UNKNOWN_SYSTEM_ERROR: this.handleUnknownError.bind(this)
    };

    return strategies[errorType] || this.handleUnknownError.bind(this);
  }

  async handleOutOfMemory(error, context) {
    console.log('Handling out of memory error');
    
    const memoryUsage = process.memoryUsage();
    const systemMemory = {
      total: os.totalmem(),
      free: os.freemem(),
      usage: 1 - (os.freemem() / os.totalmem())
    };

    return {
      action: 'release_memory',
      params: {
        forceGarbageCollection: true,
        clearCaches: true,
        reduceBufferSize: true
      },
      systemStatus: {
        processMemory: memoryUsage,
        systemMemory: systemMemory
      },
      fallbackAction: 'reduce_workload',
      fallbackParams: {
        reduceFactor: 0.5,
        pauseOperations: true
      }
    };
  }

  async handleResourceExhausted(error, context) {
    console.log('Handling resource exhausted error');
    
    const loadAvg = os.loadavg();
    const cpuCount = os.cpus().length;
    const cpuUsage = loadAvg[0] / cpuCount;

    return {
      action: 'throttle_operations',
      params: {
        maxConcurrency: Math.max(1, Math.floor(cpuCount * 0.5)),
        delayMs: 1000
      },
      systemStatus: {
        loadAverage: loadAvg,
        cpuCount: cpuCount,
        cpuUsage: cpuUsage
      },
      fallbackAction: 'queue_operations',
      fallbackParams: {
        queueSize: 100,
        priority: 'high'
      }
    };
  }

  async handleCriticalFailure(error, context) {
    console.log('Handling critical failure error');
    
    return {
      action: 'emergency_shutdown',
      params: {
        saveState: true,
        notifyAdmin: true,
        createDump: true
      },
      fallbackAction: 'restart_service',
      fallbackParams: {
        delayMs: 5000,
        maxRestarts: 3
      }
    };
  }

  async handleProcessError(error, context) {
    console.log('Handling process error');
    
    return {
      action: 'restart_process',
      params: {
        maxRestarts: 3,
        delayMs: 2000,
        backoffMultiplier: 2
      },
      fallbackAction: 'use_fallback_process',
      fallbackParams: {
        fallbackCommand: context.fallbackCommand
      }
    };
  }

  async handleProcessSignal(error, context) {
    console.log('Handling process signal');
    
    const signal = error.code || 'UNKNOWN';
    
    return {
      action: 'graceful_shutdown',
      params: {
        timeout: 30000,
        saveState: true,
        cleanup: true
      },
      signalInfo: {
        signal: signal,
        handled: true
      },
      fallbackAction: 'force_exit',
      fallbackParams: {
        exitCode: 1
      }
    };
  }

  async handleUnknownError(error, context) {
    console.log('Handling unknown system error');
    
    return {
      action: 'collect_diagnostics',
      params: {
        includeMemory: true,
        includeCpu: true,
        includeProcess: true
      },
      fallbackAction: 'report_error',
      fallbackParams: {
        severity: 'critical'
      }
    };
  }

  getSystemDiagnostics() {
    return {
      memory: {
        process: process.memoryUsage(),
        system: {
          total: os.totalmem(),
          free: os.freemem(),
          usage: 1 - (os.freemem() / os.totalmem())
        }
      },
      cpu: {
        loadAverage: os.loadavg(),
        count: os.cpus().length,
        usage: os.loadavg()[0] / os.cpus().length
      },
      process: {
        pid: process.pid,
        uptime: process.uptime(),
        version: process.version,
        platform: process.platform
      },
      system: {
        hostname: os.hostname(),
        type: os.type(),
        release: os.release(),
        uptime: os.uptime()
      }
    };
  }

  checkSystemHealth() {
    const diagnostics = this.getSystemDiagnostics();
    const issues = [];

    if (diagnostics.memory.system.usage > this.memoryThreshold) {
      issues.push({
        type: 'memory',
        severity: 'high',
        message: `Memory usage is high: ${(diagnostics.memory.system.usage * 100).toFixed(1)}%`
      });
    }

    if (diagnostics.cpu.usage > this.cpuThreshold) {
      issues.push({
        type: 'cpu',
        severity: 'high',
        message: `CPU usage is high: ${(diagnostics.cpu.usage * 100).toFixed(1)}%`
      });
    }

    return {
      healthy: issues.length === 0,
      issues: issues,
      diagnostics: diagnostics
    };
  }

  async forceGarbageCollection() {
    if (global.gc) {
      global.gc();
      console.log('Garbage collection forced');
      return true;
    }
    console.log('Garbage collection not available (run with --expose-gc)');
    return false;
  }
}

module.exports = SystemRecoveryStrategy;
