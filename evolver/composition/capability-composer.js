const fs = require('fs');
const path = require('path');

const COMPOSER_LOG_FILE = path.join(__dirname, '../composer-logs.json');

class CapabilityComposer {
  constructor(unifiedInterface) {
    this.unifiedInterface = unifiedInterface;
    this.compositionRules = this.defineCompositionRules();
    this.composerLogs = this.loadComposerLogs();
    this.activeCompositions = new Map();
  }

  defineCompositionRules() {
    return {
      sequential: {
        name: 'Sequential Execution',
        description: 'Execute capabilities in sequence, passing output to next',
        applicable: 'any',
        maxCapabilities: 10,
        timeout: 60000
      },
      parallel: {
        name: 'Parallel Execution',
        description: 'Execute multiple capabilities simultaneously',
        applicable: 'independent',
        maxCapabilities: 5,
        timeout: 30000
      },
      conditional: {
        name: 'Conditional Execution',
        description: 'Execute capabilities based on conditions',
        applicable: 'any',
        maxCapabilities: 10,
        timeout: 60000
      },
      pipeline: {
        name: 'Pipeline Execution',
        description: 'Create a data processing pipeline',
        applicable: 'data_transform',
        maxCapabilities: 15,
        timeout: 120000
      }
    };
  }

  loadComposerLogs() {
    if (fs.existsSync(COMPOSER_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(COMPOSER_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading composer logs:', error.message);
        return [];
      }
    }
    return [];
  }

  saveComposerLogs() {
    fs.writeFileSync(COMPOSER_LOG_FILE, JSON.stringify(this.composerLogs, null, 2));
  }

  async compose(capabilities, rule = 'sequential', options = {}) {
    console.log(`=== Composing capabilities with rule: ${rule} ===`);

    const compositionId = `composition_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();

    try {
      this.validateComposition(capabilities, rule);

      const compositionRule = this.compositionRules[rule];
      if (!compositionRule) {
        throw new Error(`Unknown composition rule: ${rule}`);
      }

      let result;
      switch (rule) {
        case 'sequential':
          result = await this.executeSequential(capabilities, options);
          break;
        case 'parallel':
          result = await this.executeParallel(capabilities, options);
          break;
        case 'conditional':
          result = await this.executeConditional(capabilities, options);
          break;
        case 'pipeline':
          result = await this.executePipeline(capabilities, options);
          break;
        default:
          throw new Error(`Unsupported composition rule: ${rule}`);
      }

      const compositionResult = {
        compositionId,
        success: true,
        rule: rule,
        capabilities: capabilities.map(c => c.capabilityId),
        result: result,
        duration: Date.now() - startTime,
        timestamp: new Date().toISOString()
      };

      this.composerLogs.push(compositionResult);
      this.saveComposerLogs();

      console.log(`✅ Composition complete: ${compositionId}`);
      return compositionResult;

    } catch (error) {
      console.error(`❌ Composition failed: ${error.message}`);

      const errorResult = {
        compositionId,
        success: false,
        rule: rule,
        capabilities: capabilities.map(c => c.capabilityId),
        error: error.message,
        duration: Date.now() - startTime,
        timestamp: new Date().toISOString()
      };

      this.composerLogs.push(errorResult);
      this.saveComposerLogs();

      return errorResult;
    }
  }

  validateComposition(capabilities, rule) {
    if (!Array.isArray(capabilities) || capabilities.length === 0) {
      throw new Error('Capabilities must be a non-empty array');
    }

    const compositionRule = this.compositionRules[rule];
    if (!compositionRule) {
      throw new Error(`Unknown composition rule: ${rule}`);
    }

    if (capabilities.length > compositionRule.maxCapabilities) {
      throw new Error(`Too many capabilities: ${capabilities.length} > ${compositionRule.maxCapabilities}`);
    }

    for (const cap of capabilities) {
      if (!cap.capabilityId) {
        throw new Error('Each capability must have a capabilityId');
      }
    }
  }

  async executeSequential(capabilities, options) {
    console.log('Executing sequential composition');

    const results = [];
    let currentData = options.initialData;

    for (let i = 0; i < capabilities.length; i++) {
      const cap = capabilities[i];
      console.log(`Executing capability ${i + 1}/${capabilities.length}: ${cap.capabilityId}`);

      const params = { ...cap.params };
      if (currentData !== undefined && i > 0) {
        params.inputData = currentData;
      }

      const response = await this.unifiedInterface.call({
        capabilityId: cap.capabilityId,
        params: params,
        options: cap.options || {}
      });

      if (!response.success) {
        throw new Error(`Capability ${cap.capabilityId} failed: ${response.error.message}`);
      }

      results.push(response);
      currentData = response.data;
    }

    return {
      finalResult: currentData,
      intermediateResults: results
    };
  }

  async executeParallel(capabilities, options) {
    console.log('Executing parallel composition');

    const promises = capabilities.map(async (cap, index) => {
      console.log(`Starting parallel capability ${index + 1}/${capabilities.length}: ${cap.capabilityId}`);

      const response = await this.unifiedInterface.call({
        capabilityId: cap.capabilityId,
        params: cap.params || {},
        options: cap.options || {}
      });

      return {
        capabilityId: cap.capabilityId,
        response: response
      };
    });

    const results = await Promise.all(promises);

    const failures = results.filter(r => !r.response.success);
    if (failures.length > 0) {
      throw new Error(`${failures.length} parallel capabilities failed`);
    }

    return {
      results: results.map(r => ({
        capabilityId: r.capabilityId,
        data: r.response.data
      }))
    };
  }

  async executeConditional(capabilities, options) {
    console.log('Executing conditional composition');

    const results = [];

    for (const cap of capabilities) {
      if (cap.condition) {
        const shouldExecute = this.evaluateCondition(cap.condition, results, options);
        if (!shouldExecute) {
          console.log(`Skipping capability ${cap.capabilityId} - condition not met`);
          continue;
        }
      }

      const response = await this.unifiedInterface.call({
        capabilityId: cap.capabilityId,
        params: cap.params || {},
        options: cap.options || {}
      });

      if (!response.success && !cap.optional) {
        throw new Error(`Capability ${cap.capabilityId} failed: ${response.error.message}`);
      }

      results.push({
        capabilityId: cap.capabilityId,
        response: response
      });
    }

    return {
      results: results
    };
  }

  async executePipeline(capabilities, options) {
    console.log('Executing pipeline composition');

    let data = options.initialData;
    const stages = [];

    for (let i = 0; i < capabilities.length; i++) {
      const cap = capabilities[i];
      console.log(`Pipeline stage ${i + 1}/${capabilities.length}: ${cap.capabilityId}`);

      const params = { ...cap.params, data: data };

      const response = await this.unifiedInterface.call({
        capabilityId: cap.capabilityId,
        params: params,
        options: cap.options || {}
      });

      if (!response.success) {
        throw new Error(`Pipeline stage ${cap.capabilityId} failed: ${response.error.message}`);
      }

      data = response.data;
      stages.push({
        stage: i + 1,
        capabilityId: cap.capabilityId,
        output: data
      });
    }

    return {
      finalData: data,
      stages: stages
    };
  }

  evaluateCondition(condition, previousResults, options) {
    if (typeof condition === 'function') {
      return condition(previousResults, options);
    }

    if (typeof condition === 'string') {
      try {
        return eval(condition);
      } catch {
        return false;
      }
    }

    if (typeof condition === 'boolean') {
      return condition;
    }

    return true;
  }

  async chain(capabilityCalls) {
    console.log('=== Executing chain call ===');

    return this.compose(capabilityCalls, 'sequential');
  }

  createChain() {
    const chain = [];
    
    const chainBuilder = {
      then: (capabilityId, params = {}, options = {}) => {
        chain.push({ capabilityId, params, options });
        return chainBuilder;
      },
      execute: async () => {
        return this.compose(chain, 'sequential');
      }
    };

    return chainBuilder;
  }

  getCompositionStatistics() {
    const stats = {
      totalCompositions: this.composerLogs.length,
      successfulCompositions: this.composerLogs.filter(l => l.success).length,
      failedCompositions: this.composerLogs.filter(l => !l.success).length,
      byRule: {},
      averageDuration: 0,
      recentCompositions: this.composerLogs.slice(-10)
    };

    let totalDuration = 0;
    for (const log of this.composerLogs) {
      stats.byRule[log.rule] = (stats.byRule[log.rule] || 0) + 1;
      totalDuration += log.duration || 0;
    }

    stats.averageDuration = stats.totalCompositions > 0 
      ? totalDuration / stats.totalCompositions 
      : 0;

    return stats;
  }

  clearLogs() {
    this.composerLogs = [];
    this.saveComposerLogs();
    console.log('Composer logs cleared');
  }
}

module.exports = CapabilityComposer;
