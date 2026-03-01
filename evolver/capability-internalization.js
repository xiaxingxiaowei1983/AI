const fs = require('fs');
const path = require('path');

const INTERNALIZED_CAPABILITIES_FILE = path.join(__dirname, 'internalized-capabilities.json');

class CapabilityInternalization {
  constructor() {
    this.internalizedCapabilities = this.loadInternalizedCapabilities();
  }

  loadInternalizedCapabilities() {
    if (fs.existsSync(INTERNALIZED_CAPABILITIES_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(INTERNALIZED_CAPABILITIES_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading internalized capabilities:', error.message);
        return [];
      }
    }
    return [];
  }

  saveInternalizedCapabilities() {
    fs.writeFileSync(INTERNALIZED_CAPABILITIES_FILE, JSON.stringify(this.internalizedCapabilities, null, 2));
    console.log('Internalized capabilities saved to', INTERNALIZED_CAPABILITIES_FILE);
  }

  internalizeCapability(shape, strategy = 'behavioral_pattern') {
    let internalizedCapability = null;

    switch (strategy) {
      case 'behavioral_pattern':
        internalizedCapability = this.internalizeAsBehavioralPattern(shape);
        break;
      case 'high_level_operation':
        internalizedCapability = this.internalizeAsHighLevelOperation(shape);
        break;
      case 'priority_solution':
        internalizedCapability = this.internalizeAsPrioritySolution(shape);
        break;
      default:
        internalizedCapability = this.internalizeAsBehavioralPattern(shape);
    }

    if (internalizedCapability) {
      this.addInternalizedCapability(internalizedCapability);
    }

    return internalizedCapability;
  }

  internalizeAsBehavioralPattern(shape) {
    return {
      id: `internalized_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: shape.name,
      type: 'behavioral_pattern',
      sourceShape: shape.id,
      internalization: {
        activationPattern: this.generateActivationPattern(shape),
        executionFlow: this.generateExecutionFlow(shape),
        defaultParameters: this.extractDefaultParameters(shape),
        successCriteria: this.defineSuccessCriteria(shape)
      },
      confidence: shape.confidence || 0.7,
      created: new Date().toISOString(),
      metadata: {
        internalizationStrategy: 'behavioral_pattern',
        originalType: shape.type
      }
    };
  }

  internalizeAsHighLevelOperation(shape) {
    return {
      id: `internalized_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: shape.name,
      type: 'high_level_operation',
      sourceShape: shape.id,
      internalization: {
        operationName: this.generateOperationName(shape),
        parameters: this.extractParameters(shape),
        returnType: this.inferReturnType(shape),
        errorHandling: this.defineErrorHandling(shape)
      },
      confidence: shape.confidence || 0.7,
      created: new Date().toISOString(),
      metadata: {
        internalizationStrategy: 'high_level_operation',
        originalType: shape.type
      }
    };
  }

  internalizeAsPrioritySolution(shape) {
    return {
      id: `internalized_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: shape.name,
      type: 'priority_solution',
      sourceShape: shape.id,
      internalization: {
        applicabilityConditions: this.defineApplicabilityConditions(shape),
        priorityLevel: this.calculatePriorityLevel(shape),
        executionSteps: this.generateExecutionSteps(shape),
        alternativeSolutions: this.identifyAlternativeSolutions(shape)
      },
      confidence: shape.confidence || 0.7,
      created: new Date().toISOString(),
      metadata: {
        internalizationStrategy: 'priority_solution',
        originalType: shape.type
      }
    };
  }

  generateActivationPattern(shape) {
    const inputs = shape.abstraction?.inputs || [];
    const invariants = shape.abstraction?.invariants || [];

    return {
      triggers: inputs.map(input => ({
        type: 'input_available',
        inputName: input.name,
        condition: 'present'
      })),
      contextRequirements: invariants.map(invariant => ({
        type: invariant.type,
        value: invariant.value,
        required: true
      }))
    };
  }

  generateExecutionFlow(shape) {
    const inputs = shape.abstraction?.inputs || [];
    const outputs = shape.abstraction?.outputs || [];

    return {
      steps: [
        {
          name: 'validate_inputs',
          description: 'Validate all required inputs',
          inputs: inputs.map(input => input.name),
          outputs: ['validation_result']
        },
        {
          name: 'execute_core_logic',
          description: 'Execute the core capability logic',
          inputs: inputs.map(input => input.name),
          outputs: outputs.map(output => output.name)
        },
        {
          name: 'validate_outputs',
          description: 'Validate the generated outputs',
          inputs: outputs.map(output => output.name),
          outputs: ['final_result']
        }
      ],
      dependencies: []
    };
  }

  extractDefaultParameters(shape) {
    const variables = shape.abstraction?.variables || [];
    const defaults = {};

    variables.forEach(variable => {
      if (variable.examples && variable.examples.length > 0) {
        defaults[variable.name] = variable.examples[0];
      }
    });

    return defaults;
  }

  defineSuccessCriteria(shape) {
    const outputs = shape.abstraction?.outputs || [];

    return {
      requiredOutputs: outputs.map(output => output.name),
      qualityMetrics: [
        {
          name: 'completeness',
          description: 'All required outputs are generated',
          threshold: 1.0
        },
        {
          name: 'accuracy',
          description: 'Outputs match expected format and content',
          threshold: 0.8
        }
      ]
    };
  }

  generateOperationName(shape) {
    const nameParts = shape.name.split(':').map(part => part.trim());
    return nameParts
      .map(part => part.charAt(0).toLowerCase() + part.slice(1))
      .join('_')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');
  }

  extractParameters(shape) {
    return (shape.abstraction?.inputs || []).map(input => ({
      name: input.name,
      type: input.type || 'string',
      required: true,
      description: input.description || `Input parameter ${input.name}`
    }));
  }

  inferReturnType(shape) {
    const outputs = shape.abstraction?.outputs || [];
    if (outputs.length === 0) return 'void';
    if (outputs.length === 1) return outputs[0].type || 'object';
    return 'object'; // Multiple outputs return an object
  }

  defineErrorHandling(shape) {
    const failurePoints = shape.abstraction?.failurePoints || [];

    return {
      errorTypes: failurePoints.map(point => ({
        type: point.type || 'unknown',
        message: point.description || 'Operation failed',
        recoveryStrategy: this.inferRecoveryStrategy(point)
      })),
      fallbackStrategy: 'graceful_degradation'
    };
  }

  inferRecoveryStrategy(failurePoint) {
    switch (failurePoint.impact) {
      case 'single_step':
      case 'single_tool':
        return 'retry';
      case 'chain_reaction':
        return 'rollback';
      case 'solution_failure':
        return 'alternative';
      default:
        return 'retry';
    }
  }

  defineApplicabilityConditions(shape) {
    const inputs = shape.abstraction?.inputs || [];
    const invariants = shape.abstraction?.invariants || [];

    return {
      requiredInputs: inputs.map(input => input.name),
      invariantConditions: invariants.map(invariant => ({
        type: invariant.type,
        value: invariant.value,
        operator: 'equals'
      })),
      contextualConditions: []
    };
  }

  calculatePriorityLevel(shape) {
    // 基于信心度和复杂度计算优先级
    const confidence = shape.confidence || 0.5;
    const inputCount = (shape.abstraction?.inputs || []).length;
    const complexity = Math.min(1.0, inputCount / 10);
    
    // 优先级 = 信心度 * (1 - 复杂度)
    const priority = confidence * (1 - complexity);
    
    if (priority >= 0.8) return 'high';
    if (priority >= 0.5) return 'medium';
    return 'low';
  }

  generateExecutionSteps(shape) {
    const steps = [];
    const inputs = shape.abstraction?.inputs || [];
    const outputs = shape.abstraction?.outputs || [];

    if (inputs.length > 0) {
      steps.push({
        id: 'prepare_inputs',
        name: 'Prepare Inputs',
        description: 'Gather and validate all required inputs',
        required: true
      });
    }

    steps.push({
      id: 'execute_capability',
      name: 'Execute Capability',
      description: 'Run the core capability logic',
      required: true
    });

    if (outputs.length > 0) {
      steps.push({
        id: 'process_outputs',
        name: 'Process Outputs',
        description: 'Validate and format the generated outputs',
        required: true
      });
    }

    return steps;
  }

  identifyAlternativeSolutions(shape) {
    // 基于能力类型识别可能的替代方案
    const alternatives = [];

    switch (shape.type) {
      case 'step_pattern':
        alternatives.push({
          name: 'Simplified Step Pattern',
          description: 'Reduce number of steps for faster execution',
          tradeoff: 'May reduce accuracy'
        });
        break;
      case 'tool_sequence':
        alternatives.push({
          name: 'Parallel Tool Execution',
          description: 'Execute independent tools in parallel',
          tradeoff: 'Requires more resources'
        });
        break;
      case 'reusable_solution':
        alternatives.push({
          name: 'Custom Solution',
          description: 'Tailor solution to specific context',
          tradeoff: 'Less reusable'
        });
        break;
    }

    return alternatives;
  }

  addInternalizedCapability(capability) {
    // 检查是否已经存在类似的内生化能力
    const existingIndex = this.internalizedCapabilities.findIndex(c => 
      c.name === capability.name && 
      c.type === capability.type
    );

    if (existingIndex >= 0) {
      // 更新现有内生化能力
      this.internalizedCapabilities[existingIndex].lastUpdated = new Date().toISOString();
      this.internalizedCapabilities[existingIndex].confidence = Math.min(1.0, this.internalizedCapabilities[existingIndex].confidence + 0.1);
      this.internalizedCapabilities[existingIndex].internalization = capability.internalization;
    } else {
      // 添加新内生化能力
      const newCapability = {
        ...capability,
        lastUpdated: new Date().toISOString(),
        usageCount: 0
      };
      this.internalizedCapabilities.push(newCapability);
    }

    this.saveInternalizedCapabilities();
  }

  getInternalizedCapabilities() {
    return this.internalizedCapabilities;
  }

  getInternalizedCapabilityById(id) {
    return this.internalizedCapabilities.find(capability => capability.id === id);
  }

  getInternalizedCapabilitiesByType(type) {
    return this.internalizedCapabilities.filter(capability => capability.type === type);
  }

  markCapabilityUsed(capabilityId) {
    const capability = this.internalizedCapabilities.find(c => c.id === capabilityId);
    if (capability) {
      capability.usageCount = (capability.usageCount || 0) + 1;
      capability.lastUsed = new Date().toISOString();
      this.saveInternalizedCapabilities();
      return true;
    }
    return false;
  }

  getTopUsedCapabilities(limit = 10) {
    return this.internalizedCapabilities
      .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
      .slice(0, limit);
  }

  analyzeCapabilityInternalization(shape, strategy) {
    const internalizedCapability = this.internalizeCapability(shape, strategy);
    return {
      shapeId: shape.id,
      internalizedCapability: internalizedCapability,
      analysis: {
        internalizationStrategy: strategy,
        activationComplexity: this.calculateActivationComplexity(internalizedCapability),
        executionComplexity: this.calculateExecutionComplexity(internalizedCapability),
        expectedUsage: this.predictUsageFrequency(internalizedCapability)
      }
    };
  }

  calculateActivationComplexity(capability) {
    const activationPattern = capability.internalization?.activationPattern;
    if (!activationPattern) return 0;

    const triggerCount = activationPattern.triggers?.length || 0;
    const contextCount = activationPattern.contextRequirements?.length || 0;
    
    return Math.min(1.0, (triggerCount + contextCount) / 10);
  }

  calculateExecutionComplexity(capability) {
    let complexity = 0;

    switch (capability.type) {
      case 'behavioral_pattern':
        const steps = capability.internalization?.executionFlow?.steps || [];
        complexity = steps.length / 10;
        break;
      case 'high_level_operation':
        const parameters = capability.internalization?.parameters || [];
        complexity = parameters.length / 10;
        break;
      case 'priority_solution':
        const execSteps = capability.internalization?.executionSteps || [];
        complexity = execSteps.length / 10;
        break;
    }

    return Math.min(1.0, complexity);
  }

  predictUsageFrequency(capability) {
    const confidence = capability.confidence || 0.5;
    const complexity = this.calculateExecutionComplexity(capability);
    
    // 预期使用频率 = 信心度 * (1 - 复杂度)
    return confidence * (1 - complexity);
  }
}

module.exports = CapabilityInternalization;