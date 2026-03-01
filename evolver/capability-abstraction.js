const fs = require('fs');
const path = require('path');

const CAPABILITY_SHAPES_FILE = path.join(__dirname, 'capability-shapes.json');

class CapabilityAbstraction {
  constructor() {
    this.capabilityShapes = this.loadCapabilityShapes();
  }

  loadCapabilityShapes() {
    if (fs.existsSync(CAPABILITY_SHAPES_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(CAPABILITY_SHAPES_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading capability shapes:', error.message);
        return [];
      }
    }
    return [];
  }

  saveCapabilityShapes() {
    fs.writeFileSync(CAPABILITY_SHAPES_FILE, JSON.stringify(this.capabilityShapes, null, 2));
    console.log('Capability shapes saved to', CAPABILITY_SHAPES_FILE);
  }

  abstractCapability(candidate) {
    let shape = null;

    switch (candidate.type) {
      case 'step_pattern':
        shape = this.abstractStepPattern(candidate);
        break;
      case 'tool_sequence':
        shape = this.abstractToolSequence(candidate);
        break;
      case 'reusable_solution':
        shape = this.abstractReusableSolution(candidate);
        break;
      default:
        shape = this.abstractGenericCapability(candidate);
    }

    if (shape) {
      this.addCapabilityShape(shape);
    }

    return shape;
  }

  abstractStepPattern(candidate) {
    const pattern = candidate.pattern;
    const steps = pattern.steps || [];

    // 提取输入和输出
    const inputs = this.extractInputsFromSteps(steps);
    const outputs = this.extractOutputsFromSteps(steps);

    // 识别不变量和可变参数
    const invariants = this.identifyInvariantsFromSteps(steps);
    const variables = this.identifyVariablesFromSteps(steps);

    // 识别失败点
    const failurePoints = this.identifyFailurePointsFromSteps(steps);

    return {
      id: `shape_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: candidate.name,
      type: 'step_pattern',
      sourceCandidate: candidate.id,
      abstraction: {
        inputs: inputs,
        outputs: outputs,
        invariants: invariants,
        variables: variables,
        failurePoints: failurePoints
      },
      confidence: candidate.confidence || 0.7,
      created: new Date().toISOString(),
      metadata: {
        stepCount: steps.length,
        patternDescription: pattern.description
      }
    };
  }

  abstractToolSequence(candidate) {
    const sequence = candidate.sequence;
    const tools = sequence.tools || [];

    // 提取输入和输出
    const inputs = this.extractInputsFromTools(tools);
    const outputs = this.extractOutputsFromTools(tools);

    // 识别不变量和可变参数
    const invariants = this.identifyInvariantsFromTools(tools);
    const variables = this.identifyVariablesFromTools(tools);

    // 识别失败点
    const failurePoints = this.identifyFailurePointsFromTools(tools);

    return {
      id: `shape_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: candidate.name,
      type: 'tool_sequence',
      sourceCandidate: candidate.id,
      abstraction: {
        inputs: inputs,
        outputs: outputs,
        invariants: invariants,
        variables: variables,
        failurePoints: failurePoints
      },
      confidence: candidate.confidence || 0.7,
      created: new Date().toISOString(),
      metadata: {
        toolCount: tools.length,
        sequenceKey: sequence.key
      }
    };
  }

  abstractReusableSolution(candidate) {
    const solution = candidate.solution;

    // 提取输入和输出
    const inputs = solution.inputs || [];
    const outputs = solution.outputs || [];

    // 识别不变量和可变参数
    const invariants = solution.invariants || this.identifyInvariantsFromSolution(solution);
    const variables = solution.variables || this.identifyVariablesFromSolution(solution);

    // 识别失败点
    const failurePoints = solution.failurePoints || this.identifyFailurePointsFromSolution(solution);

    return {
      id: `shape_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: candidate.name,
      type: 'reusable_solution',
      sourceCandidate: candidate.id,
      abstraction: {
        inputs: inputs,
        outputs: outputs,
        invariants: invariants,
        variables: variables,
        failurePoints: failurePoints
      },
      confidence: candidate.confidence || 0.7,
      created: new Date().toISOString(),
      metadata: {
        solutionId: solution.id,
        solutionDescription: solution.description
      }
    };
  }

  abstractGenericCapability(candidate) {
    return {
      id: `shape_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: candidate.name,
      type: 'generic',
      sourceCandidate: candidate.id,
      abstraction: {
        inputs: [],
        outputs: [],
        invariants: [],
        variables: [],
        failurePoints: []
      },
      confidence: candidate.confidence || 0.5,
      created: new Date().toISOString(),
      metadata: {
        candidateType: candidate.type
      }
    };
  }

  extractInputsFromSteps(steps) {
    const inputs = [];
    steps.forEach(step => {
      if (step.inputs) {
        step.inputs.forEach(input => {
          if (!inputs.some(i => i.name === input.name)) {
            inputs.push(input);
          }
        });
      } else if (step.parameters) {
        Object.keys(step.parameters).forEach(key => {
          if (!inputs.some(i => i.name === key)) {
            inputs.push({
              name: key,
              type: typeof step.parameters[key],
              description: `Input parameter for ${step.operation || 'step'}`
            });
          }
        });
      }
    });
    return inputs;
  }

  extractOutputsFromSteps(steps) {
    const outputs = [];
    steps.forEach(step => {
      if (step.outputs) {
        step.outputs.forEach(output => {
          if (!outputs.some(o => o.name === output.name)) {
            outputs.push(output);
          }
        });
      } else if (step.result) {
        if (!outputs.some(o => o.name === 'result')) {
          outputs.push({
            name: 'result',
            type: typeof step.result,
            description: `Result from ${step.operation || 'step'}`
          });
        }
      }
    });
    return outputs;
  }

  identifyInvariantsFromSteps(steps) {
    const invariants = [];
    const stepTypes = new Set();
    const operations = new Set();

    steps.forEach(step => {
      if (step.type) stepTypes.add(step.type);
      if (step.operation) operations.add(step.operation);
    });

    if (stepTypes.size === 1) {
      invariants.push({
        type: 'step_type',
        value: Array.from(stepTypes)[0],
        description: 'All steps have the same type'
      });
    }

    if (operations.size === 1) {
      invariants.push({
        type: 'operation',
        value: Array.from(operations)[0],
        description: 'All steps have the same operation'
      });
    }

    return invariants;
  }

  identifyVariablesFromSteps(steps) {
    const variables = [];
    const parameterKeys = new Set();

    steps.forEach(step => {
      if (step.parameters) {
        Object.keys(step.parameters).forEach(key => parameterKeys.add(key));
      }
    });

    parameterKeys.forEach(key => {
      variables.push({
        name: key,
        description: `Variable parameter across steps`,
        examples: steps.map(step => step.parameters?.[key]).filter(Boolean)
      });
    });

    return variables;
  }

  identifyFailurePointsFromSteps(steps) {
    const failurePoints = [];

    steps.forEach((step, index) => {
      if (step.error || step.failure) {
        failurePoints.push({
          stepIndex: index,
          type: step.error?.type || 'unknown',
          description: step.error?.message || step.failure || 'Step failed',
          impact: 'single_step'
        });
      }
    });

    // 识别序列依赖失败点
    if (steps.length > 1) {
      failurePoints.push({
        type: 'sequence_dependency',
        description: 'Later steps depend on successful completion of earlier steps',
        impact: 'chain_reaction'
      });
    }

    return failurePoints;
  }

  extractInputsFromTools(tools) {
    const inputs = [];
    tools.forEach(tool => {
      if (tool.parameters) {
        Object.keys(tool.parameters).forEach(key => {
          if (!inputs.some(i => i.name === key)) {
            inputs.push({
              name: key,
              type: typeof tool.parameters[key],
              description: `Input parameter for tool ${tool.name}`
            });
          }
        });
      }
    });
    return inputs;
  }

  extractOutputsFromTools(tools) {
    const outputs = [];
    tools.forEach(tool => {
      if (tool.result) {
        if (!outputs.some(o => o.name === `${tool.name}_result`)) {
          outputs.push({
            name: `${tool.name}_result`,
            type: typeof tool.result,
            description: `Result from tool ${tool.name}`
          });
        }
      }
    });
    return outputs;
  }

  identifyInvariantsFromTools(tools) {
    const invariants = [];
    const toolNames = tools.map(t => t.name);
    const uniqueToolNames = new Set(toolNames);

    invariants.push({
      type: 'tool_sequence',
      value: toolNames.join(' -> '),
      description: 'Fixed sequence of tools'
    });

    if (uniqueToolNames.size === toolNames.length) {
      invariants.push({
        type: 'unique_tools',
        value: true,
        description: 'All tools in sequence are unique'
      });
    }

    return invariants;
  }

  identifyVariablesFromTools(tools) {
    const variables = [];
    const parameterKeys = new Set();

    tools.forEach(tool => {
      if (tool.parameters) {
        Object.keys(tool.parameters).forEach(key => parameterKeys.add(key));
      }
    });

    parameterKeys.forEach(key => {
      variables.push({
        name: key,
        description: `Variable parameter across tools`,
        examples: tools.map(tool => tool.parameters?.[key]).filter(Boolean)
      });
    });

    return variables;
  }

  identifyFailurePointsFromTools(tools) {
    const failurePoints = [];

    tools.forEach((tool, index) => {
      if (tool.error) {
        failurePoints.push({
          toolIndex: index,
          toolName: tool.name,
          type: tool.error?.type || 'unknown',
          description: tool.error?.message || 'Tool failed',
          impact: 'single_tool'
        });
      }
    });

    // 识别工具依赖失败点
    if (tools.length > 1) {
      failurePoints.push({
        type: 'tool_dependency',
        description: 'Later tools may depend on results from earlier tools',
        impact: 'chain_reaction'
      });
    }

    return failurePoints;
  }

  identifyInvariantsFromSolution(solution) {
    const invariants = [];
    if (solution.type) {
      invariants.push({
        type: 'solution_type',
        value: solution.type,
        description: 'Solution type is fixed'
      });
    }
    if (solution.pattern) {
      invariants.push({
        type: 'solution_pattern',
        value: solution.pattern,
        description: 'Solution follows a fixed pattern'
      });
    }
    return invariants;
  }

  identifyVariablesFromSolution(solution) {
    const variables = [];
    if (solution.parameters) {
      Object.keys(solution.parameters).forEach(key => {
        variables.push({
          name: key,
          description: `Variable parameter for solution`,
          examples: [solution.parameters[key]]
        });
      });
    }
    return variables;
  }

  identifyFailurePointsFromSolution(solution) {
    const failurePoints = [];
    if (solution.risks) {
      solution.risks.forEach(risk => {
        failurePoints.push({
          type: 'solution_risk',
          description: risk,
          impact: 'solution_failure'
        });
      });
    }
    return failurePoints;
  }

  addCapabilityShape(shape) {
    // 检查是否已经存在类似的能力轮廓
    const existingIndex = this.capabilityShapes.findIndex(s => 
      s.name === shape.name && 
      s.type === shape.type
    );

    if (existingIndex >= 0) {
      // 更新现有能力轮廓
      this.capabilityShapes[existingIndex].lastUpdated = new Date().toISOString();
      this.capabilityShapes[existingIndex].confidence = Math.min(1.0, this.capabilityShapes[existingIndex].confidence + 0.1);
      this.capabilityShapes[existingIndex].abstraction = shape.abstraction;
    } else {
      // 添加新能力轮廓
      const newShape = {
        ...shape,
        lastUpdated: new Date().toISOString()
      };
      this.capabilityShapes.push(newShape);
    }

    this.saveCapabilityShapes();
  }

  getCapabilityShapes() {
    return this.capabilityShapes;
  }

  getCapabilityShapeById(id) {
    return this.capabilityShapes.find(shape => shape.id === id);
  }

  getTopCapabilityShapes(limit = 10) {
    return this.capabilityShapes
      .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
      .slice(0, limit);
  }

  analyzeCapabilityCandidate(candidate) {
    const shape = this.abstractCapability(candidate);
    return {
      candidateId: candidate.id,
      capabilityShape: shape,
      analysis: {
        inputCount: shape?.abstraction?.inputs?.length || 0,
        outputCount: shape?.abstraction?.outputs?.length || 0,
        invariantCount: shape?.abstraction?.invariants?.length || 0,
        variableCount: shape?.abstraction?.variables?.length || 0,
        failurePointCount: shape?.abstraction?.failurePoints?.length || 0
      }
    };
  }
}

module.exports = CapabilityAbstraction;