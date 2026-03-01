const fs = require('fs');
const path = require('path');

const ADAPTER_LOG_FILE = path.join(__dirname, '../adapter-logs.json');

class InterfaceAdapter {
  constructor(unifiedInterface) {
    this.unifiedInterface = unifiedInterface;
    this.adapters = new Map();
    this.adapterLogs = this.loadAdapterLogs();
    this.compatibilityMatrix = this.initCompatibilityMatrix();
  }

  initCompatibilityMatrix() {
    return {
      filesystem: {
        compatibleWith: ['data_transform', 'network'],
        conflicts: [],
        requires: []
      },
      data_transform: {
        compatibleWith: ['filesystem', 'network'],
        conflicts: [],
        requires: []
      },
      network: {
        compatibleWith: ['filesystem', 'data_transform'],
        conflicts: [],
        requires: []
      },
      error_handling: {
        compatibleWith: ['filesystem', 'data_transform', 'network'],
        conflicts: [],
        requires: []
      }
    };
  }

  loadAdapterLogs() {
    if (fs.existsSync(ADAPTER_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(ADAPTER_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading adapter logs:', error.message);
        return [];
      }
    }
    return [];
  }

  saveAdapterLogs() {
    fs.writeFileSync(ADAPTER_LOG_FILE, JSON.stringify(this.adapterLogs, null, 2));
  }

  registerAdapter(capabilityType, adapterConfig) {
    console.log(`Registering adapter for capability type: ${capabilityType}`);

    const adapter = {
      type: capabilityType,
      config: adapterConfig,
      registeredAt: new Date().toISOString(),
      transformInput: adapterConfig.transformInput || this.defaultTransformInput,
      transformOutput: adapterConfig.transformOutput || this.defaultTransformOutput,
      validateCompatibility: adapterConfig.validateCompatibility || this.defaultValidateCompatibility
    };

    this.adapters.set(capabilityType, adapter);
    console.log(`✅ Adapter registered for: ${capabilityType}`);
    return true;
  }

  async adaptCapability(capabilityInstance, capabilityType) {
    console.log(`Adapting capability of type: ${capabilityType}`);

    const adapter = this.adapters.get(capabilityType);
    if (!adapter) {
      console.log(`No specific adapter found for ${capabilityType}, using default`);
      return this.defaultAdapt(capabilityInstance, capabilityType);
    }

    try {
      const adaptedCapability = {
        id: capabilityInstance.constructor.name || capabilityType,
        executeCapability: async (capabilityId, params) => {
          const transformedParams = adapter.transformInput(params, adapter.config);
          
          const result = await capabilityInstance.executeCapability(capabilityId, transformedParams);
          
          return adapter.transformOutput(result, adapter.config);
        },
        getCapabilityById: (id) => capabilityInstance.getCapabilityById?.(id) || null,
        getCapabilities: () => capabilityInstance.getCapabilities?.() || {},
        getUsageStats: () => capabilityInstance.getUsageStats?.() || {}
      };

      this.logAdaptation(capabilityType, true);
      console.log(`✅ Capability adapted: ${capabilityType}`);
      return adaptedCapability;

    } catch (error) {
      console.error(`❌ Adaptation failed for ${capabilityType}:`, error.message);
      this.logAdaptation(capabilityType, false, error.message);
      throw error;
    }
  }

  defaultAdapt(capabilityInstance, capabilityType) {
    return {
      id: capabilityInstance.constructor.name || capabilityType,
      executeCapability: async (capabilityId, params) => {
        return await capabilityInstance.executeCapability(capabilityId, params);
      },
      getCapabilityById: (id) => capabilityInstance.getCapabilityById?.(id) || null,
      getCapabilities: () => capabilityInstance.getCapabilities?.() || {},
      getUsageStats: () => capabilityInstance.getUsageStats?.() || {}
    };
  }

  defaultTransformInput(params, config) {
    return params;
  }

  defaultTransformOutput(result, config) {
    return result;
  }

  defaultValidateCompatibility(capabilityType, context) {
    const matrix = this.compatibilityMatrix[capabilityType];
    if (!matrix) return { compatible: true };

    const conflicts = matrix.conflicts.filter(c => context.activeCapabilities?.includes(c));
    if (conflicts.length > 0) {
      return { compatible: false, reason: `Conflicts with: ${conflicts.join(', ')}` };
    }

    const missing = matrix.requires.filter(r => !context.activeCapabilities?.includes(r));
    if (missing.length > 0) {
      return { compatible: false, reason: `Missing required: ${missing.join(', ')}` };
    }

    return { compatible: true };
  }

  checkCompatibility(capabilityType, context = {}) {
    const adapter = this.adapters.get(capabilityType);
    if (adapter && adapter.validateCompatibility) {
      return adapter.validateCompatibility(capabilityType, context);
    }
    return this.defaultValidateCompatibility(capabilityType, context);
  }

  async batchAdapt(capabilities) {
    console.log(`Batch adapting ${capabilities.length} capabilities`);

    const results = {
      successful: [],
      failed: []
    };

    for (const { instance, type, metadata } of capabilities) {
      try {
        const adapted = await this.adaptCapability(instance, type);
        
        this.unifiedInterface.registerCapability(
          metadata.id || `${type}_${Date.now()}`,
          adapted,
          {
            category: type,
            ...metadata
          }
        );

        results.successful.push({
          type: type,
          id: metadata.id
        });

      } catch (error) {
        results.failed.push({
          type: type,
          id: metadata.id,
          error: error.message
        });
      }
    }

    console.log(`✅ Batch adaptation complete: ${results.successful.length} successful, ${results.failed.length} failed`);
    return results;
  }

  createCompatibilityWrapper(capabilityInstance, wrapperConfig) {
    return {
      executeCapability: async (capabilityId, params) => {
        const compatibility = this.checkCompatibility(wrapperConfig.type, wrapperConfig.context);
        
        if (!compatibility.compatible) {
          throw new Error(`Compatibility check failed: ${compatibility.reason}`);
        }

        return await capabilityInstance.executeCapability(capabilityId, params);
      },
      getCapabilityById: (id) => capabilityInstance.getCapabilityById?.(id),
      getCapabilities: () => capabilityInstance.getCapabilities?.(),
      getUsageStats: () => capabilityInstance.getUsageStats?.()
    };
  }

  logAdaptation(capabilityType, success, errorMessage = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      capabilityType: capabilityType,
      success: success,
      errorMessage: errorMessage
    };

    this.adapterLogs.push(logEntry);
    this.saveAdapterLogs();
  }

  getAdapterStatistics() {
    const stats = {
      totalAdaptations: this.adapterLogs.length,
      successfulAdaptations: this.adapterLogs.filter(l => l.success).length,
      failedAdaptations: this.adapterLogs.filter(l => !l.success).length,
      byType: {},
      recentAdaptations: this.adapterLogs.slice(-10)
    };

    for (const log of this.adapterLogs) {
      stats.byType[log.capabilityType] = (stats.byType[log.capabilityType] || 0) + 1;
    }

    return stats;
  }

  clearLogs() {
    this.adapterLogs = [];
    this.saveAdapterLogs();
    console.log('Adapter logs cleared');
  }
}

module.exports = InterfaceAdapter;
