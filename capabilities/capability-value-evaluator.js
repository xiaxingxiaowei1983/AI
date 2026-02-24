/**
 * 能力价值评估系统
 * 为人生决策宗师智能体提供能力价值评估和管理功能
 */

const { valueFunction } = require('./value-function');
const { lifeDecisionMasterCapabilityTree } = require('./life-decision-master-capability-tree');

class CapabilityValueEvaluator {
  constructor() {
    this.evaluationHistory = [];
    this.evolutionQueue = [];
    this.evaluationCache = new Map();
    this.cacheTTL = 3600000; // 缓存有效期1小时
  }

  // 评估单个能力
  evaluateCapability(capability) {
    // 检查缓存
    const cacheKey = this._generateCacheKey(capability);
    const cachedEvaluation = this._getFromCache(cacheKey);
    if (cachedEvaluation) {
      return cachedEvaluation;
    }

    // 使用价值函数评估能力
    const evaluation = valueFunction.evaluateCapability(capability);
    const report = valueFunction.generateEvaluationReport(capability);

    // 生成完整评估结果
    const result = {
      ...evaluation,
      report,
      timestamp: Date.now(),
      capabilityId: capability.id || this._generateCapabilityId(capability)
    };

    // 缓存评估结果
    this._addToCache(cacheKey, result);

    // 记录评估历史
    this.evaluationHistory.push(result);

    return result;
  }

  // 批量评估能力
  batchEvaluateCapabilities(capabilities) {
    const startTime = Date.now();
    const results = capabilities.map(capability => ({
      capability,
      evaluation: this.evaluateCapability(capability)
    })).sort((a, b) => b.evaluation.score - a.evaluation.score);
    
    const endTime = Date.now();
    const duration = endTime - startTime;

    return {
      results,
      duration,
      count: capabilities.length,
      timestamp: endTime
    };
  }

  // 评估能力树中的所有能力
  evaluateCapabilityTree() {
    try {
      // 获取能力树的所有节点
      const capabilityTree = lifeDecisionMasterCapabilityTree;
      const allNodes = this._getAllCapabilityNodes(capabilityTree);
      
      // 批量评估所有能力
      const evaluationResult = this.batchEvaluateCapabilities(allNodes);
      
      return {
        ...evaluationResult,
        treeStatus: capabilityTree.getStatus()
      };
    } catch (error) {
      console.error('评估能力树失败:', error);
      return {
        results: [],
        duration: 0,
        count: 0,
        error: error.message,
        timestamp: Date.now()
      };
    }
  }

  // 生成能力价值排行榜
  generateValueRanking() {
    const treeEvaluation = this.evaluateCapabilityTree();
    const rankedCapabilities = treeEvaluation.results.map(item => ({
      name: item.capability.name,
      level: item.capability.level,
      score: item.evaluation.score,
      recommendation: item.evaluation.report.recommendation,
      isLowValue: item.evaluation.isLowValue,
      path: item.capability.path || this._generateCapabilityPath(item.capability)
    }));

    return {
      rankedCapabilities,
      totalCapabilities: rankedCapabilities.length,
      highValueCount: rankedCapabilities.filter(cap => cap.score >= 0.6).length,
      mediumValueCount: rankedCapabilities.filter(cap => cap.score >= 0.3 && cap.score < 0.6).length,
      lowValueCount: rankedCapabilities.filter(cap => cap.score < 0.3).length,
      timestamp: Date.now()
    };
  }

  // 管理能力进化队列
  manageEvolutionQueue() {
    const treeEvaluation = this.evaluateCapabilityTree();
    
    // 筛选出建议进化的能力
    const recommendedCapabilities = treeEvaluation.results
      .filter(item => item.evaluation.report.recommendation === '建议进化')
      .map(item => ({
        capability: item.capability,
        score: item.evaluation.score,
        evaluation: item.evaluation
      }))
      .sort((a, b) => b.score - a.score);

    // 更新进化队列
    this.evolutionQueue = recommendedCapabilities;

    return {
      queue: this.evolutionQueue,
      queueLength: this.evolutionQueue.length,
      timestamp: Date.now()
    };
  }

  // 获取下一个进化候选
  getNextEvolutionCandidate() {
    if (this.evolutionQueue.length === 0) {
      this.manageEvolutionQueue();
    }

    return this.evolutionQueue[0] || null;
  }

  // 标记能力为已进化
  markCapabilityEvolved(capabilityId) {
    // 从进化队列中移除
    this.evolutionQueue = this.evolutionQueue.filter(item => 
      item.capability.id !== capabilityId
    );

    // 清除缓存
    this._clearCapabilityCache(capabilityId);

    return {
      success: true,
      timestamp: Date.now()
    };
  }

  // 生成价值评估报告
  generateValueReport() {
    const ranking = this.generateValueRanking();
    const evolutionQueue = this.manageEvolutionQueue();
    const treeEvaluation = this.evaluateCapabilityTree();

    // 计算统计信息
    const averageScore = ranking.rankedCapabilities.reduce((sum, cap) => sum + cap.score, 0) / ranking.totalCapabilities;
    const highValuePercentage = (ranking.highValueCount / ranking.totalCapabilities) * 100;
    const lowValuePercentage = (ranking.lowValueCount / ranking.totalCapabilities) * 100;

    return {
      summary: {
        totalCapabilities: ranking.totalCapabilities,
        averageScore: averageScore.toFixed(2),
        highValuePercentage: highValuePercentage.toFixed(1),
        lowValuePercentage: lowValuePercentage.toFixed(1),
        evolutionCandidates: evolutionQueue.queueLength
      },
      ranking: ranking.rankedCapabilities,
      evolutionQueue: evolutionQueue.queue.map(item => ({
        name: item.capability.name,
        score: item.score,
        level: item.capability.level,
        recommendation: item.evaluation.report.recommendation
      })),
      timestamp: Date.now(),
      evaluationDuration: treeEvaluation.duration
    };
  }

  // 分析能力价值趋势
  analyzeValueTrends() {
    // 按能力级别分析
    const ranking = this.generateValueRanking();
    const levelAnalysis = {};

    ranking.rankedCapabilities.forEach(cap => {
      const level = cap.level || 0;
      if (!levelAnalysis[level]) {
        levelAnalysis[level] = {
          count: 0,
          totalScore: 0,
          highValueCount: 0,
          mediumValueCount: 0,
          lowValueCount: 0
        };
      }

      levelAnalysis[level].count++;
      levelAnalysis[level].totalScore += cap.score;

      if (cap.score >= 0.6) {
        levelAnalysis[level].highValueCount++;
      } else if (cap.score >= 0.3) {
        levelAnalysis[level].mediumValueCount++;
      } else {
        levelAnalysis[level].lowValueCount++;
      }
    });

    // 计算每个级别的平均值
    Object.keys(levelAnalysis).forEach(level => {
      const analysis = levelAnalysis[level];
      analysis.averageScore = (analysis.totalScore / analysis.count).toFixed(2);
      analysis.highValuePercentage = ((analysis.highValueCount / analysis.count) * 100).toFixed(1);
    });

    return {
      levelAnalysis,
      timestamp: Date.now()
    };
  }

  // 清理过期缓存
  cleanupCache() {
    const now = Date.now();
    const keysToDelete = [];

    for (const [key, value] of this.evaluationCache.entries()) {
      if (now - value.timestamp > this.cacheTTL) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.evaluationCache.delete(key));

    return {
      deletedKeys: keysToDelete.length,
      remainingKeys: this.evaluationCache.size,
      timestamp: now
    };
  }

  // 获取系统状态
  getStatus() {
    const ranking = this.generateValueRanking();
    const evolutionQueue = this.manageEvolutionQueue();
    const cacheStatus = {
      size: this.evaluationCache.size,
      historyLength: this.evaluationHistory.length
    };

    return {
      rankingSummary: {
        totalCapabilities: ranking.totalCapabilities,
        highValueCount: ranking.highValueCount,
        mediumValueCount: ranking.mediumValueCount,
        lowValueCount: ranking.lowValueCount
      },
      evolutionQueue: {
        length: evolutionQueue.queueLength
      },
      cacheStatus,
      timestamp: Date.now()
    };
  }

  // 辅助方法：生成缓存键
  _generateCacheKey(capability) {
    if (capability.id) {
      return `capability_${capability.id}`;
    }
    return `capability_${capability.name}_${capability.level || 0}`;
  }

  // 辅助方法：从缓存获取
  _getFromCache(key) {
    const cached = this.evaluationCache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTTL) {
      return cached;
    }
    // 缓存过期，删除
    if (cached) {
      this.evaluationCache.delete(key);
    }
    return null;
  }

  // 辅助方法：添加到缓存
  _addToCache(key, value) {
    this.evaluationCache.set(key, value);
    // 清理过期缓存
    this.cleanupCache();
  }

  // 辅助方法：清除能力缓存
  _clearCapabilityCache(capabilityId) {
    const keysToDelete = [];
    for (const [key, value] of this.evaluationCache.entries()) {
      if (value.capabilityId === capabilityId) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => this.evaluationCache.delete(key));
  }

  // 辅助方法：生成能力ID
  _generateCapabilityId(capability) {
    return `cap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // 辅助方法：生成能力路径
  _generateCapabilityPath(capability) {
    return capability.name || '未知能力';
  }

  // 辅助方法：获取所有能力节点
  _getAllCapabilityNodes(capabilityTree) {
    const nodes = [];
    
    function traverse(node) {
      nodes.push(node);
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => traverse(child));
      }
    }

    // 从能力树根部开始遍历
    try {
      const treeStructure = capabilityTree.export();
      if (treeStructure) {
        traverse(treeStructure);
      }
    } catch (error) {
      console.error('获取能力节点失败:', error);
    }

    return nodes;
  }
}

// 导出单例实例
const capabilityValueEvaluator = new CapabilityValueEvaluator();

module.exports = {
  CapabilityValueEvaluator,
  capabilityValueEvaluator
};

// 示例用法
if (require.main === module) {
  const evaluator = capabilityValueEvaluator;
  
  console.log('=== 测试能力价值评估系统 ===');
  
  // 测试单个能力评估
  console.log('\n1. 测试单个能力评估');
  const testCapability = {
    id: 'test_cap_1',
    name: '测试能力',
    level: 2,
    description: '这是一个测试能力，用于评估系统性能',
    inputs: ['测试输入'],
    outputs: ['测试输出'],
    prerequisites: ['测试前提'],
    failureBoundaries: ['测试边界']
  };
  
  const singleEvaluation = evaluator.evaluateCapability(testCapability);
  console.log('单个能力评估结果:', {
    score: singleEvaluation.score,
    recommendation: singleEvaluation.report.recommendation,
    dimensions: singleEvaluation.dimensions
  });
  
  // 测试批量评估
  console.log('\n2. 测试批量评估');
  const testCapabilities = [
    {
      id: 'test_cap_2',
      name: '基础操作',
      level: 1,
      description: '通用的基础操作能力',
      inputs: ['操作指令'],
      outputs: ['操作结果'],
      prerequisites: ['工具可用'],
      failureBoundaries: ['工具不可用']
    },
    {
      id: 'test_cap_3',
      name: '极端场景处理',
      level: 3,
      description: '只在极端场景使用的能力',
      inputs: ['极端参数'],
      outputs: ['处理结果'],
      prerequisites: ['极端场景'],
      failureBoundaries: ['场景错误']
    },
    {
      id: 'test_cap_4',
      name: '智能错误恢复',
      level: 2,
      description: '自动检测和恢复错误',
      inputs: ['错误信息'],
      outputs: ['恢复策略'],
      prerequisites: ['错误可识别'],
      failureBoundaries: ['错误不可识别']
    }
  ];
  
  const batchResult = evaluator.batchEvaluateCapabilities(testCapabilities);
  console.log('批量评估结果:', {
    count: batchResult.results.length,
    duration: batchResult.duration,
    topCapability: batchResult.results[0] ? batchResult.results[0].capability.name : '无'
  });
  
  // 测试价值排行榜
  console.log('\n3. 测试价值排行榜');
  const ranking = evaluator.generateValueRanking();
  console.log('排行榜摘要:', {
    totalCapabilities: ranking.totalCapabilities,
    highValueCount: ranking.highValueCount,
    mediumValueCount: ranking.mediumValueCount,
    lowValueCount: ranking.lowValueCount
  });
  
  // 测试进化队列管理
  console.log('\n4. 测试进化队列管理');
  const evolutionQueue = evaluator.manageEvolutionQueue();
  console.log('进化队列:', {
    length: evolutionQueue.queueLength,
    candidates: evolutionQueue.queue.map(item => item.capability.name)
  });
  
  // 测试系统状态
  console.log('\n5. 测试系统状态');
  const status = evaluator.getStatus();
  console.log('系统状态:', status);
  
  // 测试价值趋势分析
  console.log('\n6. 测试价值趋势分析');
  const trends = evaluator.analyzeValueTrends();
  console.log('价值趋势分析:', trends.levelAnalysis);
  
  console.log('\n=== 能力价值评估系统测试完成 ===');
}