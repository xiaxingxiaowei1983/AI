const CapabilityCandidateParser = require('./capability-candidate-parser');
const CapabilityAbstraction = require('./capability-abstraction');
const CapabilityInternalization = require('./capability-internalization');
const CapabilityMerging = require('./capability-merging');
const CapabilityEvaluation = require('./capability-evaluation');
const CapabilityEnhancement = require('./capability-enhancement');
const CapabilityConstraints = require('./capability-constraints');
const ValueFunction = require('./value-function');

class CapabilityEvolutionSystem {
  constructor() {
    this.candidateParser = new CapabilityCandidateParser();
    this.abstraction = new CapabilityAbstraction();
    this.internalization = new CapabilityInternalization();
    this.merging = new CapabilityMerging();
    this.evaluation = new CapabilityEvaluation();
    this.enhancement = new CapabilityEnhancement();
    this.constraints = new CapabilityConstraints();
    this.valueFunction = new ValueFunction();
  }

  async processExecution(execution) {
    console.log('=== Processing execution for capability evolution ===');
    
    // 1. 识别能力候选
    const candidateAnalysis = this.candidateParser.analyzeExecution(execution);
    console.log(`Identified ${candidateAnalysis.identifiedCandidates} capability candidates`);
    
    // 2. 抽象能力轮廓
    const capabilityShapes = [];
    candidateAnalysis.topCandidates.forEach(candidate => {
      const shapeAnalysis = this.abstraction.analyzeCapabilityCandidate(candidate);
      capabilityShapes.push(shapeAnalysis.capabilityShape);
      console.log(`Abstracted capability shape: ${shapeAnalysis.capabilityShape.name}`);
    });
    
    // 3. 使用价值函数评估能力
    const highValueCapabilityShapes = [];
    capabilityShapes.forEach(shape => {
      const evaluation = this.valueFunction.evaluateCapability(shape);
      if (!evaluation.isLowValue) {
        highValueCapabilityShapes.push(shape);
        console.log(`High value capability: ${shape.name} (Value: ${evaluation.totalValue.toFixed(2)})`);
      } else {
        console.log(`Low value capability skipped: ${shape.name} (Value: ${evaluation.totalValue.toFixed(2)})`);
      }
    });
    
    // 4. 内生化高价值能力
    const internalizedCapabilities = [];
    highValueCapabilityShapes.forEach(shape => {
      // 尝试不同的内生化策略
      const behavioralPattern = this.internalization.internalizeCapability(shape, 'behavioral_pattern');
      const highLevelOperation = this.internalization.internalizeCapability(shape, 'high_level_operation');
      const prioritySolution = this.internalization.internalizeCapability(shape, 'priority_solution');
      
      internalizedCapabilities.push(behavioralPattern, highLevelOperation, prioritySolution);
      console.log(`Internalized capability: ${shape.name}`);
    });
    
    // 5. 合并相似能力
    if (highValueCapabilityShapes.length >= 2) {
      const mergedCapabilities = this.merging.performMerges(highValueCapabilityShapes);
      console.log(`Merged ${mergedCapabilities.length} high value capability groups`);
    }
    
    // 5. 评估能力使用
    internalizedCapabilities.forEach(capability => {
      const usageData = this.generateMockUsageData(capability);
      const evaluation = this.evaluation.evaluateCapabilityUsage(capability.id, usageData);
      console.log(`Evaluated capability usage: ${capability.name} - Performance: ${(evaluation.metrics.overallPerformance * 100).toFixed(2)}%`);
    });
    
    // 6. 检查高价值能力的约束
    highValueCapabilityShapes.forEach(shape => {
      const constraintCheck = this.constraints.checkCapabilityConstraints(shape);
      if (!constraintCheck.compliance) {
        console.log(`Capability ${shape.name} has constraint violations:`);
        constraintCheck.violations.forEach(violation => {
          console.log(`  - ${violation.constraint}: ${violation.reason}`);
        });
      }
    });
    
    // 7. 识别自动化机会
    const automationOpportunities = this.enhancement.identifyAutomationOpportunities();
    console.log(`Identified ${automationOpportunities.length} automation opportunities`);
    
    return {
      candidateAnalysis: candidateAnalysis,
      capabilityShapes: highValueCapabilityShapes,
      internalizedCapabilities: internalizedCapabilities,
      automationOpportunities: automationOpportunities
    };
  }

  generateMockUsageData(capability) {
    // 生成模拟使用数据
    return {
      executionTime: Math.random() * 5000 + 1000, // 1-6秒
      success: Math.random() > 0.1, // 90%成功率
      errors: Math.random() > 0.9 ? [{ type: 'timeout', message: 'Operation timed out' }] : [],
      inputs: capability.abstraction?.inputs?.length || 0,
      outputs: capability.abstraction?.outputs?.length || 0,
      retries: Math.random() > 0.8 ? 1 : 0,
      resourceUsage: {
        memory: Math.random() * 50 + 10, // 10-60%
        cpu: Math.random() * 30 + 5 // 5-35%
      }
    };
  }

  generateEvolutionReport() {
    console.log('=== Generating capability evolution report ===');
    
    // 评估所有能力形状的价值
    const allCapabilityShapes = this.abstraction.getTopCapabilityShapes(20);
    const valueEvaluations = allCapabilityShapes.map(shape => {
      const evaluation = this.valueFunction.evaluateCapability(shape);
      return {
        capability: shape,
        evaluation: evaluation
      };
    });
    
    // 按价值排序
    valueEvaluations.sort((a, b) => b.evaluation.totalValue - a.evaluation.totalValue);
    
    const report = {
      generatedAt: new Date().toISOString(),
      systemEvaluation: this.evaluation.getOverallSystemEvaluation(),
      constraintReport: this.constraints.generateConstraintReport(),
      enhancementReport: this.enhancement.generateEnhancementReport(),
      candidateStats: this.candidateParser.getCandidateStats(),
      capabilityShapes: this.abstraction.getTopCapabilityShapes(10),
      internalizedCapabilities: this.internalization.getTopUsedCapabilities(10),
      mergedCapabilities: this.merging.getMergedCapabilities(),
      valueEvaluations: valueEvaluations.slice(0, 10), // 只包含前10个高价值能力
      valueFunctionStatus: this.valueFunction.getStatus()
    };
    
    console.log('Evolution report generated successfully');
    return report;
  }

  async runEvolutionCycle() {
    console.log('=== Starting capability evolution cycle ===');
    
    // 读取真实执行数据
    const execution = this.loadRealExecutionData();
    
    // 处理执行数据
    const result = await this.processExecution(execution);
    
    // 生成进化报告
    const report = this.generateEvolutionReport();
    
    console.log('=== Evolution cycle completed ===');
    return {
      result: result,
      report: report
    };
  }

  loadRealExecutionData() {
    const fs = require('fs');
    const path = require('path');
    const executionLogsDir = path.join(__dirname, 'execution-logs');
    
    // 读取执行日志目录中的所有文件
    try {
      const files = fs.readdirSync(executionLogsDir);
      if (files.length === 0) {
        console.log('No execution logs found, using mock data');
        return this.generateMockExecution();
      }
      
      // 按时间戳排序，取最新的日志文件
      files.sort((a, b) => {
        return new Date(b.replace(/execution_|\.json/g, '').replace(/-/g, 'T').replace(/T([^Z]+)/, 'T$1Z')) - 
               new Date(a.replace(/execution_|\.json/g, '').replace(/-/g, 'T').replace(/T([^Z]+)/, 'T$1Z'));
      });
      
      const latestLogFile = files[0];
      const logPath = path.join(executionLogsDir, latestLogFile);
      console.log(`Loading execution data from: ${latestLogFile}`);
      
      const executionData = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      return executionData;
    } catch (error) {
      console.error('Error loading execution data:', error.message);
      console.log('Falling back to mock data');
      return this.generateMockExecution();
    }
  }

  generateMockExecution() {
    // 生成模拟执行数据
    return {
      steps: [
        {
          type: 'data_processing',
          operation: 'parse_json',
          parameters: { filePath: 'data.json' },
          result: { success: true, data: {} }
        },
        {
          type: 'data_processing',
          operation: 'validate_data',
          parameters: { schema: 'user_schema' },
          result: { success: true, validated: true }
        },
        {
          type: 'data_processing',
          operation: 'parse_json',
          parameters: { filePath: 'config.json' },
          result: { success: true, data: {} }
        }
      ],
      toolCalls: [
        {
          name: 'read_file',
          parameters: { path: 'data.json' },
          result: 'file content'
        },
        {
          name: 'validate_json',
          parameters: { content: 'file content' },
          result: { valid: true }
        },
        {
          name: 'read_file',
          parameters: { path: 'config.json' },
          result: 'config content'
        },
        {
          name: 'validate_json',
          parameters: { content: 'config content' },
          result: { valid: true }
        }
      ],
      solutions: [
        {
          name: 'JSON Processing',
          description: 'Process and validate JSON files',
          inputs: ['file_path'],
          outputs: ['processed_data'],
          steps: ['read', 'parse', 'validate'],
          risks: ['file_not_found', 'invalid_json']
        }
      ]
    };
  }

  getSystemStatus() {
    return {
      candidateCount: this.candidateParser.candidates.length,
      shapeCount: this.abstraction.capabilityShapes.length,
      internalizedCount: this.internalization.internalizedCapabilities.length,
      mergedCount: this.merging.mergedCapabilities.length,
      evaluationCount: this.evaluation.evaluationLogs.length,
      enhancementCount: this.enhancement.enhancementLogs.length,
      constraintViolationCount: this.constraints.constraintViolations.length,
      valueFunctionStatus: this.valueFunction.getStatus()
    };
  }
}

module.exports = CapabilityEvolutionSystem;