const fs = require('fs');
const path = require('path');

const CAPABILITY_CANDIDATES_FILE = path.join(__dirname, 'capability-candidates.json');
const EXECUTION_LOGS_DIR = path.join(__dirname, 'execution-logs');

class CapabilityCandidateParser {
  constructor() {
    this.candidates = this.loadCandidates();
    this.setupDirectories();
  }

  setupDirectories() {
    if (!fs.existsSync(EXECUTION_LOGS_DIR)) {
      fs.mkdirSync(EXECUTION_LOGS_DIR, { recursive: true });
    }
  }

  loadCandidates() {
    if (fs.existsSync(CAPABILITY_CANDIDATES_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(CAPABILITY_CANDIDATES_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading capability candidates:', error.message);
        return [];
      }
    }
    return [];
  }

  saveCandidates() {
    fs.writeFileSync(CAPABILITY_CANDIDATES_FILE, JSON.stringify(this.candidates, null, 2));
    console.log('Capability candidates saved to', CAPABILITY_CANDIDATES_FILE);
  }

  logExecution(execution) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logFile = path.join(EXECUTION_LOGS_DIR, `execution_${timestamp}.json`);
    fs.writeFileSync(logFile, JSON.stringify(execution, null, 2));
    return logFile;
  }

  identifyCandidates(execution) {
    const candidates = [];

    // 1. 识别临时步骤、脚本和套路
    if (execution.steps && execution.steps.length > 0) {
      const stepPatterns = this.identifyStepPatterns(execution.steps);
      stepPatterns.forEach(pattern => {
        candidates.push({
          type: 'step_pattern',
          name: `Step Pattern: ${pattern.description}`,
          pattern: pattern,
          source: 'execution_steps',
          timestamp: new Date().toISOString(),
          confidence: pattern.confidence
        });
      });
    }

    // 2. 识别重复的工具调用序列
    if (execution.toolCalls && execution.toolCalls.length > 0) {
      const toolSequences = this.identifyToolSequences(execution.toolCalls);
      toolSequences.forEach(sequence => {
        candidates.push({
          type: 'tool_sequence',
          name: `Tool Sequence: ${sequence.tools.map(t => t.name).join(' -> ')}`,
          sequence: sequence,
          source: 'tool_calls',
          timestamp: new Date().toISOString(),
          confidence: sequence.confidence
        });
      });
    }

    // 3. 识别可复用的解决方式
    if (execution.solutions && execution.solutions.length > 0) {
      execution.solutions.forEach(solution => {
        candidates.push({
          type: 'reusable_solution',
          name: `Solution: ${solution.name || 'Unnamed Solution'}`,
          solution: solution,
          source: 'solutions',
          timestamp: new Date().toISOString(),
          confidence: solution.confidence || 0.7
        });
      });
    }

    return candidates;
  }

  identifyStepPatterns(steps) {
    const patterns = [];
    const stepGroups = this.groupSimilarSteps(steps);

    stepGroups.forEach(group => {
      if (group.steps.length >= 2) {
        patterns.push({
          description: this.describeStepPattern(group.steps),
          steps: group.steps,
          confidence: Math.min(1.0, group.steps.length / steps.length * 2)
        });
      }
    });

    return patterns;
  }

  groupSimilarSteps(steps) {
    const groups = [];
    const seen = new Set();

    for (let i = 0; i < steps.length; i++) {
      if (seen.has(i)) continue;

      const currentStep = steps[i];
      const group = { steps: [currentStep] };
      seen.add(i);

      for (let j = i + 1; j < steps.length; j++) {
        if (seen.has(j)) continue;
        const nextStep = steps[j];
        if (this.areStepsSimilar(currentStep, nextStep)) {
          group.steps.push(nextStep);
          seen.add(j);
        }
      }

      if (group.steps.length > 1) {
        groups.push(group);
      }
    }

    return groups;
  }

  areStepsSimilar(step1, step2) {
    // 简单的相似度检查，基于步骤类型和操作
    if (!step1.type || !step2.type) return false;
    if (step1.type !== step2.type) return false;

    // 检查操作相似度
    const op1 = step1.operation || step1.action || '';
    const op2 = step2.operation || step2.action || '';
    return op1.toLowerCase() === op2.toLowerCase();
  }

  describeStepPattern(steps) {
    if (steps.length === 0) return 'Empty pattern';
    const firstStep = steps[0];
    return `${firstStep.type || 'Unknown'}: ${firstStep.operation || firstStep.action || 'Unknown operation'}`;
  }

  identifyToolSequences(toolCalls) {
    const sequences = [];
    const minSequenceLength = 2;

    for (let i = 0; i <= toolCalls.length - minSequenceLength; i++) {
      const sequence = toolCalls.slice(i, i + minSequenceLength);
      const sequenceKey = sequence.map(t => t.name).join('->');
      
      // 检查是否已经存在类似序列
      const existingSequence = sequences.find(s => s.key === sequenceKey);
      if (existingSequence) {
        existingSequence.count++;
        existingSequence.confidence = Math.min(1.0, existingSequence.count / toolCalls.length * 3);
      } else {
        sequences.push({
          key: sequenceKey,
          tools: sequence,
          count: 1,
          confidence: 0.5
        });
      }
    }

    // 只返回出现多次的序列
    return sequences.filter(s => s.count >= 2);
  }

  addCandidate(candidate) {
    // 检查是否已经存在类似的候选
    const existingIndex = this.candidates.findIndex(c => 
      c.type === candidate.type && 
      c.name === candidate.name
    );

    if (existingIndex >= 0) {
      // 更新现有候选
      this.candidates[existingIndex].lastSeen = new Date().toISOString();
      this.candidates[existingIndex].occurrences = (this.candidates[existingIndex].occurrences || 1) + 1;
      this.candidates[existingIndex].confidence = Math.min(1.0, this.candidates[existingIndex].confidence + 0.1);
    } else {
      // 添加新候选
      const newCandidate = {
        ...candidate,
        id: `candidate_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        occurrences: 1,
        firstSeen: new Date().toISOString(),
        lastSeen: new Date().toISOString()
      };
      this.candidates.push(newCandidate);
    }

    this.saveCandidates();
  }

  getTopCandidates(limit = 10) {
    return this.candidates
      .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
      .slice(0, limit);
  }

  analyzeExecution(execution) {
    const logFile = this.logExecution(execution);
    const candidates = this.identifyCandidates(execution);
    
    candidates.forEach(candidate => {
      this.addCandidate(candidate);
    });

    return {
      logFile,
      identifiedCandidates: candidates.length,
      topCandidates: this.getTopCandidates(5)
    };
  }

  getCandidateStats() {
    const stats = {
      total: this.candidates.length,
      byType: {},
      topConfidence: this.getTopCandidates(5)
    };

    this.candidates.forEach(candidate => {
      stats.byType[candidate.type] = (stats.byType[candidate.type] || 0) + 1;
    });

    return stats;
  }
}

module.exports = CapabilityCandidateParser;