const fs = require('fs');
const path = require('path');

const INTERFACE_LOG_FILE = path.join(__dirname, '../interface-logs.json');

class UnifiedInterface {
  constructor() {
    this.version = '1.0';
    this.capabilityRegistry = new Map();
    this.interfaceSpec = this.defineInterfaceSpec();
    this.callHistory = this.loadCallHistory();
    this.validators = this.initValidators();
  }

  defineInterfaceSpec() {
    return {
      version: '1.0',
      protocol: 'capability-interface',
      requestFormat: {
        capabilityId: { type: 'string', required: true, description: 'Unique identifier of the capability' },
        params: { type: 'object', required: false, description: 'Parameters for the capability' },
        options: { type: 'object', required: false, description: 'Execution options' },
        context: { type: 'object', required: false, description: 'Execution context' }
      },
      responseFormat: {
        success: { type: 'boolean', required: true, description: 'Whether the call succeeded' },
        data: { type: 'any', required: false, description: 'Result data' },
        error: { type: 'object', required: false, description: 'Error information if failed' },
        metadata: { type: 'object', required: false, description: 'Additional metadata' }
      },
      optionsFormat: {
        timeout: { type: 'number', default: 30000, description: 'Execution timeout in ms' },
        retryCount: { type: 'number', default: 0, description: 'Number of retries on failure' },
        retryDelay: { type: 'number', default: 1000, description: 'Delay between retries in ms' },
        validateInput: { type: 'boolean', default: true, description: 'Validate input parameters' },
        validateOutput: { type: 'boolean', default: true, description: 'Validate output data' },
        logCall: { type: 'boolean', default: true, description: 'Log the call for analytics' }
      }
    };
  }

  initValidators() {
    return {
      string: (value) => typeof value === 'string',
      number: (value) => typeof value === 'number' && !isNaN(value),
      boolean: (value) => typeof value === 'boolean',
      object: (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
      array: (value) => Array.isArray(value),
      function: (value) => typeof value === 'function',
      any: () => true
    };
  }

  loadCallHistory() {
    if (fs.existsSync(INTERFACE_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(INTERFACE_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading call history:', error.message);
        return [];
      }
    }
    return [];
  }

  saveCallHistory() {
    fs.writeFileSync(INTERFACE_LOG_FILE, JSON.stringify(this.callHistory, null, 2));
  }

  registerCapability(capabilityId, capabilityInstance, metadata = {}) {
    console.log(`Registering capability: ${capabilityId}`);

    const registration = {
      id: capabilityId,
      instance: capabilityInstance,
      metadata: {
        ...metadata,
        registeredAt: new Date().toISOString(),
        version: metadata.version || '1.0',
        category: metadata.category || 'general',
        description: metadata.description || '',
        inputs: metadata.inputs || [],
        outputs: metadata.outputs || []
      }
    };

    this.capabilityRegistry.set(capabilityId, registration);
    console.log(`✅ Capability registered: ${capabilityId}`);
    return true;
  }

  unregisterCapability(capabilityId) {
    if (this.capabilityRegistry.has(capabilityId)) {
      this.capabilityRegistry.delete(capabilityId);
      console.log(`Capability unregistered: ${capabilityId}`);
      return true;
    }
    return false;
  }

  async call(request) {
    console.log(`=== Unified Interface Call: ${request.capabilityId} ===`);

    const startTime = Date.now();
    const callId = `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      this.validateRequest(request);

      const { capabilityId, params = {}, options = {}, context = {} } = request;
      const mergedOptions = this.mergeOptions(options);

      const capability = this.getCapability(capabilityId);
      if (!capability) {
        throw new Error(`Capability not found: ${capabilityId}`);
      }

      if (mergedOptions.validateInput) {
        this.validateParams(capability, params);
      }

      let result;
      let attempts = 0;
      let lastError;

      while (attempts <= mergedOptions.retryCount) {
        try {
          attempts++;
          result = await this.executeWithTimeout(
            capability.instance,
            params,
            mergedOptions.timeout,
            context
          );
          break;
        } catch (error) {
          lastError = error;
          if (attempts <= mergedOptions.retryCount) {
            console.log(`Retry attempt ${attempts} after ${mergedOptions.retryDelay}ms`);
            await this.sleep(mergedOptions.retryDelay);
          }
        }
      }

      if (!result && lastError) {
        throw lastError;
      }

      if (mergedOptions.validateOutput) {
        this.validateOutput(capability, result);
      }

      const response = this.formatResponse(result, callId, startTime);

      if (mergedOptions.logCall) {
        this.logCall(callId, request, response, startTime);
      }

      console.log(`✅ Call succeeded: ${capabilityId}`);
      return response;

    } catch (error) {
      console.error(`❌ Call failed: ${error.message}`);
      
      const response = this.formatErrorResponse(error, callId, startTime);
      
      if (request.options?.logCall !== false) {
        this.logCall(callId, request, response, startTime, true);
      }
      
      return response;
    }
  }

  validateRequest(request) {
    if (!request || typeof request !== 'object') {
      throw new Error('Request must be an object');
    }

    if (!request.capabilityId || typeof request.capabilityId !== 'string') {
      throw new Error('capabilityId is required and must be a string');
    }

    if (request.params && typeof request.params !== 'object') {
      throw new Error('params must be an object');
    }

    if (request.options && typeof request.options !== 'object') {
      throw new Error('options must be an object');
    }
  }

  mergeOptions(options) {
    const defaults = {
      timeout: 30000,
      retryCount: 0,
      retryDelay: 1000,
      validateInput: true,
      validateOutput: true,
      logCall: true
    };

    return { ...defaults, ...options };
  }

  getCapability(capabilityId) {
    return this.capabilityRegistry.get(capabilityId);
  }

  validateParams(capability, params) {
    const inputs = capability.metadata.inputs || [];
    
    for (const input of inputs) {
      if (input.required && (params[input.name] === undefined || params[input.name] === null)) {
        throw new Error(`Missing required parameter: ${input.name}`);
      }

      if (params[input.name] !== undefined && input.type) {
        const validator = this.validators[input.type];
        if (validator && !validator(params[input.name])) {
          throw new Error(`Invalid type for parameter ${input.name}: expected ${input.type}`);
        }
      }
    }
  }

  validateOutput(capability, result) {
    if (!result || typeof result !== 'object') {
      return;
    }

    const outputs = capability.metadata.outputs || [];
    
    for (const output of outputs) {
      if (output.required && result[output.name] === undefined) {
        console.warn(`Missing expected output: ${output.name}`);
      }
    }
  }

  async executeWithTimeout(capabilityInstance, params, timeout, context) {
    return new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Capability execution timed out after ${timeout}ms`));
      }, timeout);

      try {
        const result = await capabilityInstance.executeCapability(
          capabilityInstance.getCapabilityById ? capabilityInstance.getCapabilityById(params.capabilityId) : params.capabilityId,
          params
        );
        clearTimeout(timeoutId);
        resolve(result);
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  formatResponse(result, callId, startTime) {
    return {
      success: true,
      callId: callId,
      data: result,
      metadata: {
        duration: Date.now() - startTime,
        timestamp: new Date().toISOString(),
        interfaceVersion: this.version
      }
    };
  }

  formatErrorResponse(error, callId, startTime) {
    return {
      success: false,
      callId: callId,
      error: {
        message: error.message,
        code: error.code || 'UNKNOWN_ERROR',
        stack: error.stack
      },
      metadata: {
        duration: Date.now() - startTime,
        timestamp: new Date().toISOString(),
        interfaceVersion: this.version
      }
    };
  }

  logCall(callId, request, response, startTime, isError = false) {
    const logEntry = {
      callId,
      capabilityId: request.capabilityId,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime,
      success: !isError,
      params: request.params,
      response: isError ? response.error : response.data
    };

    this.callHistory.push(logEntry);
    this.saveCallHistory();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getCapabilityInfo(capabilityId) {
    const capability = this.capabilityRegistry.get(capabilityId);
    if (!capability) return null;

    return {
      id: capability.id,
      metadata: capability.metadata
    };
  }

  listCapabilities() {
    const capabilities = [];
    for (const [id, capability] of this.capabilityRegistry) {
      capabilities.push({
        id: id,
        category: capability.metadata.category,
        description: capability.metadata.description
      });
    }
    return capabilities;
  }

  getStatistics() {
    const stats = {
      totalCalls: this.callHistory.length,
      successfulCalls: this.callHistory.filter(c => c.success).length,
      failedCalls: this.callHistory.filter(c => !c.success).length,
      averageDuration: 0,
      byCapability: {},
      recentCalls: this.callHistory.slice(-10)
    };

    if (stats.totalCalls > 0) {
      stats.averageDuration = this.callHistory.reduce((sum, c) => sum + c.duration, 0) / stats.totalCalls;
    }

    for (const call of this.callHistory) {
      stats.byCapability[call.capabilityId] = (stats.byCapability[call.capabilityId] || 0) + 1;
    }

    return stats;
  }

  clearHistory() {
    this.callHistory = [];
    this.saveCallHistory();
    console.log('Call history cleared');
  }
}

module.exports = UnifiedInterface;
