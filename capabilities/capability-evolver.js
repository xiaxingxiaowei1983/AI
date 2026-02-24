/**
 * capability-evolver 元技能
 * 专门用来记录和孵化新能力，实现能力的持续进化
 */

const { capabilityTree } = require('./capability-tree');

// 能力候选类
class CapabilityCandidate {
  constructor(id, source, description) {
    this.id = id;
    this.source = source;           // 来源：临时步骤、工具调用序列、可复用解决方案、重复用户需求
    this.description = description; // 描述
    this.status = 'PENDING';        // 状态：PENDING, ANALYZED, ABSTRACTED, INTERNALIZED
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.analysis = null;           // 分析结果
    this.capabilityShape = null;    // 能力轮廓
    this.internalization = null;    // 内生化策略
  }

  // 更新状态
  updateStatus(status) {
    this.status = status;
    this.updatedAt = Date.now();
  }

  // 设置分析结果
  setAnalysis(analysis) {
    this.analysis = analysis;
    this.updateStatus('ANALYZED');
  }

  // 设置能力轮廓
  setCapabilityShape(shape) {
    this.capabilityShape = shape;
    this.updateStatus('ABSTRACTED');
  }

  // 设置内生化策略
  setInternalization(strategy) {
    this.internalization = strategy;
    this.updateStatus('INTERNALIZED');
  }
}

// 能力进化者类
class CapabilityEvolver {
  constructor() {
    this.candidates = new Map();      // 能力候选
    this.evolutionHistory = [];       // 进化历史
    this.evolutionCounter = 0;        // 进化计数器
    this.constraints = this._initializeConstraints();
    this._initialize();
  }

  // 初始化
  _initialize() {
    console.log('Capability-Evolver initialized');
  }

  // 初始化进化约束
  _initializeConstraints() {
    return {
      minimumScore: 50,              // 最低进化分数
      maxCandidates: 100,            // 最大候选数量
      cooldownPeriod: 3600000,        // 冷却期（1小时）
      maxEvolutionPerCycle: 5         // 每周期最大进化数
    };
  }

  // 识别能力候选
  identifyCandidate(source, description) {
    const id = `candidate_${Date.now()}_${++this.evolutionCounter}`;
    const candidate = new CapabilityCandidate(id, source, description);
    this.candidates.set(id, candidate);
    
    console.log(`Capability candidate identified: ${id} - ${source}`);
    return candidate;
  }

  // 分析能力候选
  analyzeCandidate(candidateId) {
    const candidate = this.candidates.get(candidateId);
    if (!candidate) {
      throw new Error('Candidate not found');
    }

    // 分析输入输出
    const analysis = {
      inputs: this._identifyInputs(candidate),
      outputs: this._identifyOutputs(candidate),
      invariants: this._identifyInvariants(candidate),
      variables: this._identifyVariables(candidate),
      failurePoints: this._identifyFailurePoints(candidate),
      score: this._calculateScore(candidate)
    };

    candidate.setAnalysis(analysis);
    console.log(`Candidate analyzed: ${candidateId} - Score: ${analysis.score}`);
    return analysis;
  }

  // 识别输入
  _identifyInputs(candidate) {
    // 根据来源和描述识别输入
    const inputs = [];
    
    switch (candidate.source) {
      case '临时步骤':
        inputs.push('操作指令', '必要参数');
        break;
      case '工具调用序列':
        inputs.push('工具ID', '调用参数', '执行上下文');
        break;
      case '可复用解决方案':
        inputs.push('问题描述', '约束条件', '目标要求');
        break;
      case '重复用户需求':
        inputs.push('用户输入', '交互上下文', '期望结果');
        break;
      default:
        inputs.push('输入参数');
    }

    return inputs;
  }

  // 识别输出
  _identifyOutputs(candidate) {
    // 根据来源和描述识别输出
    const outputs = [];
    
    switch (candidate.source) {
      case '临时步骤':
        outputs.push('执行结果', '状态信息');
        break;
      case '工具调用序列':
        outputs.push('工具响应', '执行状态', '错误信息');
        break;
      case '可复用解决方案':
        outputs.push('解决方案', '实施步骤', '预期效果');
        break;
      case '重复用户需求':
        outputs.push('响应内容', '用户满意度', '后续行动');
        break;
      default:
        outputs.push('输出结果');
    }

    return outputs;
  }

  // 识别不变量
  _identifyInvariants(candidate) {
    // 识别不变的核心逻辑
    return [
      '执行流程',
      '错误处理',
      '质量标准',
      '性能要求'
    ];
  }

  // 识别可变参数
  _identifyVariables(candidate) {
    // 识别可变的配置和参数
    return [
      '具体参数值',
      '执行环境',
      '用户偏好',
      '时间约束'
    ];
  }

  // 识别失败点
  _identifyFailurePoints(candidate) {
    // 识别可能的失败点
    return [
      '参数错误',
      '资源不足',
      '超时',
      '依赖失败'
    ];
  }

  // 计算进化分数
  _calculateScore(candidate) {
    // 基于多个因素计算分数
    let score = 50; // 基础分数

    // 来源权重
    const sourceWeights = {
      '临时步骤': 10,
      '工具调用序列': 20,
      '可复用解决方案': 30,
      '重复用户需求': 40
    };

    score += sourceWeights[candidate.source] || 10;

    // 描述长度权重
    if (candidate.description.length > 100) score += 10;

    return Math.min(100, score);
  }

  // 抽象能力候选
  abstractCapability(candidateId) {
    const candidate = this.candidates.get(candidateId);
    if (!candidate || !candidate.analysis) {
      throw new Error('Candidate not analyzed');
    }

    // 创建能力轮廓
    const capabilityShape = {
      name: this._generateCapabilityName(candidate),
      description: candidate.description,
      inputs: candidate.analysis.inputs,
      outputs: candidate.analysis.outputs,
      prerequisites: candidate.analysis.invariants,
      failureBoundaries: candidate.analysis.failurePoints,
      variables: candidate.analysis.variables,
      score: candidate.analysis.score
    };

    candidate.setCapabilityShape(capabilityShape);
    console.log(`Capability abstracted: ${capabilityShape.name}`);
    return capabilityShape;
  }

  // 生成能力名称
  _generateCapabilityName(candidate) {
    const sourcePrefixes = {
      '临时步骤': '操作',
      '工具调用序列': '流程',
      '可复用解决方案': '方案',
      '重复用户需求': '服务'
    };

    const prefix = sourcePrefixes[candidate.source] || '能力';
    const suffix = candidate.description.substring(0, 20).replace(/\s+/g, '_');
    return `${prefix}_${suffix}`;
  }

  // 内生化能力
  internalizeCapability(candidateId, strategyType) {
    const candidate = this.candidates.get(candidateId);
    if (!candidate || !candidate.capabilityShape) {
      throw new Error('Capability not abstracted');
    }

    // 选择内生化策略
    const strategies = {
      'behavior': {
        type: '行为模式',
        description: '作为默认会使用的行为模式',
        implementation: '在决策过程中自动应用'
      },
      'highLevel': {
        type: '高阶操作',
        description: '作为规划阶段自动考虑的高阶操作',
        implementation: '在能力树中作为高层节点'
      },
      'priority': {
        type: '优先解法',
        description: '作为类似问题中自动尝试的优先解法',
        implementation: '在路径定位中优先推荐'
      }
    };

    const strategy = strategies[strategyType] || strategies['behavior'];
    candidate.setInternalization(strategy);

    // 实际内生化
    this._actualInternalization(candidate, strategy);
    
    console.log(`Capability internalized with strategy: ${strategy.type}`);
    return strategy;
  }

  // 实际内生化
  _actualInternalization(candidate, strategy) {
    const shape = candidate.capabilityShape;
    
    // 基于策略添加到能力树
    let level = 2; // 默认中层
    if (strategy.type === '高阶操作') level = 3;
    if (strategy.type === '行为模式') level = 1;

    // 添加到能力树
    const newCapability = capabilityTree.addNode(
      shape.name,
      level,
      null,
      {
        description: shape.description,
        inputs: shape.inputs,
        outputs: shape.outputs,
        prerequisites: shape.prerequisites,
        failureBoundaries: shape.failureBoundaries
      }
    );

    // 记录进化历史
    this._recordEvolution(candidate, newCapability, strategy);
  }

  // 记录进化历史
  _recordEvolution(candidate, capability, strategy) {
    const evolution = {
      id: `evolution_${Date.now()}`,
      timestamp: Date.now(),
      candidateId: candidate.id,
      capabilityId: capability.id,
      capabilityName: capability.name,
      strategy: strategy.type,
      score: candidate.analysis.score
    };

    this.evolutionHistory.push(evolution);
    console.log(`Evolution recorded: ${evolution.id} - ${capability.name}`);
  }

  // 合并相似能力
  mergeSimilarCapabilities() {
    const candidates = Array.from(this.candidates.values())
      .filter(c => c.status === 'INTERNALIZED');

    const similarGroups = this._findSimilarCapabilities(candidates);

    for (const group of similarGroups) {
      if (group.length > 1) {
        this._mergeCapabilityGroup(group);
      }
    }
  }

  // 查找相似能力
  _findSimilarCapabilities(candidates) {
    const groups = [];
    const processed = new Set();

    for (let i = 0; i < candidates.length; i++) {
      if (processed.has(candidates[i].id)) continue;

      const group = [candidates[i]];
      processed.add(candidates[i].id);

      for (let j = i + 1; j < candidates.length; j++) {
        if (!processed.has(candidates[j].id) && this._isSimilar(candidates[i], candidates[j])) {
          group.push(candidates[j]);
          processed.add(candidates[j].id);
        }
      }

      if (group.length > 1) {
        groups.push(group);
      }
    }

    return groups;
  }

  // 检查能力是否相似
  _isSimilar(candidate1, candidate2) {
    if (!candidate1.capabilityShape || !candidate2.capabilityShape) return false;

    const shape1 = candidate1.capabilityShape;
    const shape2 = candidate2.capabilityShape;

    // 基于输入输出相似度判断
    const inputSimilarity = this._calculateSimilarity(shape1.inputs, shape2.inputs);
    const outputSimilarity = this._calculateSimilarity(shape1.outputs, shape2.outputs);

    return (inputSimilarity + outputSimilarity) / 2 > 0.5;
  }

  // 计算相似度
  _calculateSimilarity(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    return union.size > 0 ? intersection.size / union.size : 0;
  }

  // 合并能力组
  _mergeCapabilityGroup(group) {
    // 选择分数最高的作为基础
    group.sort((a, b) => b.analysis.score - a.analysis.score);
    const baseCandidate = group[0];

    // 合并其他能力
    const mergedShape = {
      ...baseCandidate.capabilityShape,
      name: `${baseCandidate.capabilityShape.name}_merged`,
      description: group.map(c => c.description).join('; '),
      inputs: [...new Set(group.flatMap(c => c.capabilityShape.inputs))],
      outputs: [...new Set(group.flatMap(c => c.capabilityShape.outputs))],
      prerequisites: [...new Set(group.flatMap(c => c.capabilityShape.prerequisites))],
      failureBoundaries: [...new Set(group.flatMap(c => c.capabilityShape.failureBoundaries))],
      score: Math.max(...group.map(c => c.analysis.score))
    };

    // 添加合并后的能力
    const mergedCapability = capabilityTree.addNode(
      mergedShape.name,
      2,
      null,
      {
        description: mergedShape.description,
        inputs: mergedShape.inputs,
        outputs: mergedShape.outputs,
        prerequisites: mergedShape.prerequisites,
        failureBoundaries: mergedShape.failureBoundaries
      }
    );

    console.log(`Capabilities merged into: ${mergedShape.name}`);
  }

  // 主动增强能力
  proactivelyEnhance() {
    console.log('Proactively enhancing capabilities...');

    // 分析使用模式
    const usagePatterns = this._analyzeUsagePatterns();

    // 识别机会
    const enhancementOpportunities = this._identifyEnhancementOpportunities(usagePatterns);

    // 实施增强
    for (const opportunity of enhancementOpportunities) {
      this._implementEnhancement(opportunity);
    }

    console.log(`Proactive enhancement completed: ${enhancementOpportunities.length} opportunities`);
  }

  // 分析使用模式
  _analyzeUsagePatterns() {
    const nodes = capabilityTree.getAllNodes();
    return nodes
      .filter(node => node.usageCount > 0)
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 10); // 前10个最常用的能力
  }

  // 识别增强机会
  _identifyEnhancementOpportunities(usagePatterns) {
    const opportunities = [];

    for (const node of usagePatterns) {
      opportunities.push({
        type: 'performance',
        target: node.id,
        description: `优化 ${node.name} 的性能`,
        priority: 'high'
      });

      opportunities.push({
        type: 'usability',
        target: node.id,
        description: `提高 ${node.name} 的易用性`,
        priority: 'medium'
      });
    }

    return opportunities;
  }

  // 实施增强
  _implementEnhancement(opportunity) {
    console.log(`Implementing enhancement: ${opportunity.description}`);
    // 这里可以添加具体的增强逻辑
  }

  // 检查进化约束
  checkConstraints(candidateId) {
    const candidate = this.candidates.get(candidateId);
    if (!candidate) return false;

    // 检查分数约束
    if (candidate.analysis.score < this.constraints.minimumScore) {
      return false;
    }

    // 检查冷却期
    const lastEvolution = this.evolutionHistory[this.evolutionHistory.length - 1];
    if (lastEvolution && (Date.now() - lastEvolution.timestamp) < this.constraints.cooldownPeriod) {
      return false;
    }

    return true;
  }

  // 评估进化效果
  evaluateEvolution() {
    const recentEvolutions = this.evolutionHistory.slice(-10); // 最近10次进化
    const evaluation = {
      totalEvolutions: recentEvolutions.length,
      averageScore: recentEvolutions.reduce((sum, e) => sum + e.score, 0) / recentEvolutions.length || 0,
      successRate: recentEvolutions.length > 0 ? 1.0 : 0,
      trends: this._analyzeEvolutionTrends(recentEvolutions)
    };

    console.log('Evolution evaluation:', evaluation);
    return evaluation;
  }

  // 分析进化趋势
  _analyzeEvolutionTrends(evolutions) {
    if (evolutions.length < 2) return { direction: 'stable' };

    const scores = evolutions.map(e => e.score);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
    const secondHalf = scores.slice(Math.floor(scores.length / 2));

    const firstAverage = firstHalf.reduce((sum, score) => sum + score, 0) / firstHalf.length;
    const secondAverage = secondHalf.reduce((sum, score) => sum + score, 0) / secondHalf.length;

    if (secondAverage > firstAverage + 5) return { direction: 'improving' };
    if (secondAverage < firstAverage - 5) return { direction: 'declining' };
    return { direction: 'stable' };
  }

  // 获取状态
  getStatus() {
    return {
      candidates: {
        total: this.candidates.size,
        pending: Array.from(this.candidates.values()).filter(c => c.status === 'PENDING').length,
        analyzed: Array.from(this.candidates.values()).filter(c => c.status === 'ANALYZED').length,
        abstracted: Array.from(this.candidates.values()).filter(c => c.status === 'ABSTRACTED').length,
        internalized: Array.from(this.candidates.values()).filter(c => c.status === 'INTERNALIZED').length
      },
      evolutionHistory: this.evolutionHistory.length,
      lastEvolution: this.evolutionHistory[this.evolutionHistory.length - 1] || null,
      constraints: this.constraints
    };
  }

  // 运行进化周期
  runEvolutionCycle() {
    console.log('Running evolution cycle...');

    // 1. 识别候选
    this._identifyCandidatesFromSystem();

    // 2. 分析候选
    this._analyzePendingCandidates();

    // 3. 抽象能力
    this._abstractAnalyzedCandidates();

    // 4. 内生化能力
    this._internalizeAbstractedCandidates();

    // 5. 合并相似能力
    this.mergeSimilarCapabilities();

    // 6. 主动增强
    this.proactivelyEnhance();

    // 7. 评估进化效果
    const evaluation = this.evaluateEvolution();

    console.log('Evolution cycle completed');
    return evaluation;
  }

  // 从系统中识别候选
  _identifyCandidatesFromSystem() {
    // 模拟从系统中识别候选
    const sources = ['临时步骤', '工具调用序列', '可复用解决方案', '重复用户需求'];
    
    for (let i = 0; i < 3; i++) {
      const source = sources[Math.floor(Math.random() * sources.length)];
      const description = `系统自动识别的 ${source} 能力候选 ${i + 1}`;
      this.identifyCandidate(source, description);
    }
  }

  // 分析待处理候选
  _analyzePendingCandidates() {
    for (const [id, candidate] of this.candidates.entries()) {
      if (candidate.status === 'PENDING') {
        this.analyzeCandidate(id);
      }
    }
  }

  // 抽象已分析候选
  _abstractAnalyzedCandidates() {
    for (const [id, candidate] of this.candidates.entries()) {
      if (candidate.status === 'ANALYZED' && candidate.analysis.score >= this.constraints.minimumScore) {
        this.abstractCapability(id);
      }
    }
  }

  // 内生化已抽象候选
  _internalizeAbstractedCandidates() {
    const strategies = ['behavior', 'highLevel', 'priority'];
    
    for (const [id, candidate] of this.candidates.entries()) {
      if (candidate.status === 'ABSTRACTED') {
        const strategy = strategies[Math.floor(Math.random() * strategies.length)];
        this.internalizeCapability(id, strategy);
      }
    }
  }
}

// 导出单例实例
const capabilityEvolver = new CapabilityEvolver();

module.exports = {
  CapabilityCandidate,
  CapabilityEvolver,
  capabilityEvolver
};
