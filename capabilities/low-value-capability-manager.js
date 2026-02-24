/**
 * 低价值能力识别与管理系统
 * 为人生决策宗师智能体提供低价值能力识别、标记和管理功能
 */

const { valueFunction } = require('./value-function');
const { lifeDecisionMasterCapabilityTree } = require('./life-decision-master-capability-tree');

class LowValueCapabilityManager {
  constructor() {
    // 低价值能力类型定义
    this.lowValueTypes = {
      extremeScenario: {
        name: '极端场景使用',
        description: '只在极端场景使用的能力',
        keywords: ['极端', '特殊', '罕见', '应急', '紧急']
      },
      performanceOnly: {
        name: '只提升表现不提升成功率',
        description: '只提升表现但不提升成功率的能力',
        keywords: ['优化', '提升', '增强', '加速', '改进']
      },
      nonTransferable: {
        name: '无法跨任务迁移',
        description: '无法跨任务迁移的能力',
        keywords: ['专用', '特定', '专属', '唯一', '定制']
      },
      complexityIncrease: {
        name: '增加系统复杂度',
        description: '会增加系统复杂度的能力',
        keywords: ['复杂', '高级', '高级功能', '高级特性', '复杂逻辑']
      }
    };

    // 低价值能力标记
    this.markedCapabilities = new Map();
    // 修剪建议
    this.trimSuggestions = [];
    // 分析历史
    this.analysisHistory = [];
  }

  // 识别低价值能力
  identifyLowValueCapabilities(capabilities) {
    const lowValueCapabilities = [];
    const analysisResults = [];

    capabilities.forEach(capability => {
      const analysis = this.analyzeCapability(capability);
      analysisResults.push(analysis);

      if (analysis.isLowValue) {
        lowValueCapabilities.push({
          capability,
          analysis
        });
      }
    });

    // 记录分析历史
    this.analysisHistory.push({
      timestamp: Date.now(),
      totalCapabilities: capabilities.length,
      lowValueCount: lowValueCapabilities.length,
      results: analysisResults
    });

    return {
      lowValueCapabilities,
      analysisResults,
      count: lowValueCapabilities.length,
      timestamp: Date.now()
    };
  }

  // 分析单个能力
  analyzeCapability(capability) {
    // 使用价值函数评估
    const evaluation = valueFunction.evaluateCapability(capability);
    
    // 基于价值分数判断
    const scoreBasedLowValue = evaluation.score < 0.3;
    
    // 基于能力类型判断
    const typeBasedLowValue = this._detectLowValueType(capability);
    
    // 综合判断
    const isLowValue = scoreBasedLowValue || (typeBasedLowValue.types.length > 0);

    return {
      capabilityId: capability.id || this._generateCapabilityId(capability),
      name: capability.name,
      score: evaluation.score,
      isLowValue,
      scoreBasedLowValue,
      typeBasedLowValue,
      reasons: [
        ...(scoreBasedLowValue ? ['价值分数低于阈值'] : []),
        ...typeBasedLowValue.types.map(type => `属于低价值类型: ${type}`)
      ],
      timestamp: Date.now()
    };
  }

  // 检测低价值能力类型
  _detectLowValueType(capability) {
    const detectedTypes = [];
    const evidence = [];

    // 分析能力名称和描述
    const textToAnalyze = `${capability.name || ''} ${capability.description || ''}`.toLowerCase();

    // 检查每种低价值类型
    Object.entries(this.lowValueTypes).forEach(([typeKey, typeConfig]) => {
      const matchedKeywords = typeConfig.keywords.filter(keyword => 
        textToAnalyze.includes(keyword.toLowerCase())
      );

      if (matchedKeywords.length > 0) {
        detectedTypes.push(typeConfig.name);
        evidence.push({
          type: typeConfig.name,
          matchedKeywords
        });
      }
    });

    return {
      types: detectedTypes,
      evidence,
      count: detectedTypes.length
    };
  }

  // 标记低价值能力
  markLowValueCapability(capabilityId, reason, type) {
    this.markedCapabilities.set(capabilityId, {
      timestamp: Date.now(),
      reason,
      type,
      status: 'MARKED'
    });

    return {
      success: true,
      capabilityId,
      timestamp: Date.now()
    };
  }

  // 取消标记低价值能力
  unmarkLowValueCapability(capabilityId) {
    const result = this.markedCapabilities.delete(capabilityId);

    return {
      success: result,
      capabilityId,
      timestamp: Date.now()
    };
  }

  // 获取标记的低价值能力
  getMarkedCapabilities() {
    const marked = [];
    for (const [capabilityId, info] of this.markedCapabilities.entries()) {
      marked.push({
        capabilityId,
        ...info
      });
    }
    return marked;
  }

  // 生成能力修剪建议
  generateTrimSuggestions() {
    try {
      // 获取能力树的所有节点
      const allNodes = this._getAllCapabilityNodes();
      
      // 分析所有能力
      const analysis = this.identifyLowValueCapabilities(allNodes);
      
      // 生成修剪建议
      const suggestions = analysis.lowValueCapabilities.map(item => {
        const capability = item.capability;
        const analysisResult = item.analysis;

        return {
          capabilityId: capability.id || this._generateCapabilityId(capability),
          name: capability.name,
          level: capability.level,
          score: analysisResult.score,
          reasons: analysisResult.reasons,
          type: analysisResult.typeBasedLowValue.types,
          impact: this._assessTrimImpact(capability),
          recommendation: this._generateTrimRecommendation(analysisResult),
          timestamp: Date.now()
        };
      }).sort((a, b) => a.score - b.score); // 按分数从低到高排序

      this.trimSuggestions = suggestions;

      return {
        suggestions,
        count: suggestions.length,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('生成修剪建议失败:', error);
      return {
        suggestions: [],
        count: 0,
        error: error.message,
        timestamp: Date.now()
      };
    }
  }

  // 评估修剪影响
  _assessTrimImpact(capability) {
    // 评估修剪该能力的影响
    const impact = {
      childrenCount: capability.children ? capability.children.length : 0,
      usageCount: capability.usageCount || 0,
      dependencyLevel: this._assessDependencyLevel(capability),
      isRoot: capability.level === 0
    };

    // 计算影响分数
    let impactScore = 0;
    if (impact.childrenCount > 0) impactScore += 0.3;
    if (impact.usageCount > 0) impactScore += 0.2;
    if (impact.dependencyLevel > 0) impactScore += 0.3;
    if (impact.isRoot) impactScore += 0.2;

    impact.score = impactScore;
    impact.level = impactScore >= 0.6 ? '高' : impactScore >= 0.3 ? '中' : '低';

    return impact;
  }

  // 评估依赖级别
  _assessDependencyLevel(capability) {
    // 这里简化实现，实际项目中应该分析能力之间的依赖关系
    return 0; // 默认无依赖
  }

  // 生成修剪建议
  _generateTrimRecommendation(analysis) {
    if (analysis.score < 0.2) {
      return '建议立即修剪';
    } else if (analysis.score < 0.3) {
      return '建议在下次维护时修剪';
    } else if (analysis.typeBasedLowValue.types.length > 0) {
      return '建议评估后决定';
    } else {
      return '不建议修剪';
    }
  }

  // 执行能力修剪
  trimCapability(capabilityId) {
    try {
      // 检查能力是否存在
      const capability = this._findCapabilityById(capabilityId);
      if (!capability) {
        return {
          success: false,
          error: '能力不存在',
          timestamp: Date.now()
        };
      }

      // 检查修剪影响
      const impact = this._assessTrimImpact(capability);
      if (impact.level === '高') {
        return {
          success: false,
          error: '修剪影响较高，建议谨慎操作',
          impact,
          timestamp: Date.now()
        };
      }

      // 执行修剪操作
      // 这里简化实现，实际项目中应该调用能力树的修剪方法
      // lifeDecisionMasterCapabilityTree.trimCapabilities([capabilityId]);

      // 从标记中移除
      this.unmarkLowValueCapability(capabilityId);

      // 从修剪建议中移除
      this.trimSuggestions = this.trimSuggestions.filter(suggestion => 
        suggestion.capabilityId !== capabilityId
      );

      return {
        success: true,
        capabilityId,
        capabilityName: capability.name,
        impact,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('修剪能力失败:', error);
      return {
        success: false,
        error: error.message,
        timestamp: Date.now()
      };
    }
  }

  // 批量执行能力修剪
  batchTrimCapabilities(capabilityIds) {
    const results = [];

    capabilityIds.forEach(capabilityId => {
      const result = this.trimCapability(capabilityId);
      results.push(result);
    });

    const successCount = results.filter(result => result.success).length;

    return {
      results,
      successCount,
      totalCount: capabilityIds.length,
      timestamp: Date.now()
    };
  }

  // 生成低价值能力报告
  generateLowValueReport() {
    const suggestions = this.generateTrimSuggestions();
    const markedCapabilities = this.getMarkedCapabilities();
    const analysisHistory = this.analysisHistory.slice(-5); // 最近5次分析

    // 统计信息
    const stats = {
      totalSuggestions: suggestions.count,
      markedCount: markedCapabilities.length,
      byType: this._analyzeByType(suggestions.suggestions),
      byLevel: this._analyzeByLevel(suggestions.suggestions)
    };

    return {
      stats,
      suggestions: suggestions.suggestions,
      markedCapabilities,
      recentAnalysis: analysisHistory,
      timestamp: Date.now()
    };
  }

  // 按类型分析
  _analyzeByType(suggestions) {
    const byType = {};

    suggestions.forEach(suggestion => {
      suggestion.type.forEach(type => {
        if (!byType[type]) {
          byType[type] = 0;
        }
        byType[type]++;
      });
    });

    return byType;
  }

  // 按级别分析
  _analyzeByLevel(suggestions) {
    const byLevel = {};

    suggestions.forEach(suggestion => {
      const level = suggestion.level || 0;
      if (!byLevel[level]) {
        byLevel[level] = 0;
      }
      byLevel[level]++;
    });

    return byLevel;
  }

  // 获取系统状态
  getStatus() {
    const suggestions = this.generateTrimSuggestions();
    const markedCapabilities = this.getMarkedCapabilities();

    return {
      trimSuggestions: {
        count: suggestions.count
      },
      markedCapabilities: {
        count: markedCapabilities.length
      },
      analysisHistory: {
        count: this.analysisHistory.length
      },
      timestamp: Date.now()
    };
  }

  // 辅助方法：生成能力ID
  _generateCapabilityId(capability) {
    return `cap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // 辅助方法：获取所有能力节点
  _getAllCapabilityNodes() {
    const nodes = [];
    
    function traverse(node) {
      nodes.push(node);
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => traverse(child));
      }
    }

    try {
      const treeStructure = lifeDecisionMasterCapabilityTree.export();
      if (treeStructure) {
        traverse(treeStructure);
      }
    } catch (error) {
      console.error('获取能力节点失败:', error);
    }

    return nodes;
  }

  // 辅助方法：根据ID查找能力
  _findCapabilityById(capabilityId) {
    const allNodes = this._getAllCapabilityNodes();
    return allNodes.find(node => node.id === capabilityId);
  }

  // 辅助方法：验证能力是否为低价值
  validateLowValueCapability(capability) {
    const analysis = this.analyzeCapability(capability);
    return {
      isLowValue: analysis.isLowValue,
      score: analysis.score,
      reasons: analysis.reasons,
      type: analysis.typeBasedLowValue.types
    };
  }

  // 辅助方法：更新低价值能力类型定义
  updateLowValueTypes(newTypes) {
    this.lowValueTypes = {
      ...this.lowValueTypes,
      ...newTypes
    };

    return {
      success: true,
      updatedTypes: Object.keys(newTypes),
      timestamp: Date.now()
    };
  }
}

// 导出单例实例
const lowValueCapabilityManager = new LowValueCapabilityManager();

module.exports = {
  LowValueCapabilityManager,
  lowValueCapabilityManager
};

// 示例用法
if (require.main === module) {
  const manager = lowValueCapabilityManager;
  
  console.log('=== 测试低价值能力识别与管理系统 ===');
  
  // 测试低价值能力识别
  console.log('\n1. 测试低价值能力识别');
  const testCapabilities = [
    {
      id: 'test_cap_1',
      name: '极端场景处理',
      level: 3,
      description: '处理极端场景的特殊能力',
      inputs: ['极端场景参数'],
      outputs: ['处理结果'],
      prerequisites: ['极端场景'],
      failureBoundaries: ['场景判断错误']
    },
    {
      id: 'test_cap_2',
      name: '性能优化',
      level: 2,
      description: '提升系统性能的能力',
      inputs: ['性能参数'],
      outputs: ['优化结果'],
      prerequisites: ['系统运行中'],
      failureBoundaries: ['参数错误']
    },
    {
      id: 'test_cap_3',
      name: '专用工具使用',
      level: 1,
      description: '使用专用工具的能力',
      inputs: ['工具参数'],
      outputs: ['工具执行结果'],
      prerequisites: ['工具可用'],
      failureBoundaries: ['工具不可用']
    }
  ];
  
  const identification = manager.identifyLowValueCapabilities(testCapabilities);
  console.log('低价值能力识别结果:', {
    count: identification.count,
    lowValueCapabilities: identification.lowValueCapabilities.map(item => item.capability.name)
  });
  
  // 测试标记低价值能力
  console.log('\n2. 测试标记低价值能力');
  const markResult = manager.markLowValueCapability('test_cap_1', '极端场景使用', 'extremeScenario');
  console.log('标记结果:', markResult.success ? '成功' : '失败');
  
  // 测试生成修剪建议
  console.log('\n3. 测试生成修剪建议');
  const suggestions = manager.generateTrimSuggestions();
  console.log('修剪建议结果:', {
    count: suggestions.count,
    sampleSuggestions: suggestions.suggestions.slice(0, 3).map(s => s.name)
  });
  
  // 测试系统状态
  console.log('\n4. 测试系统状态');
  const status = manager.getStatus();
  console.log('系统状态:', status);
  
  // 测试生成低价值能力报告
  console.log('\n5. 测试生成低价值能力报告');
  const report = manager.generateLowValueReport();
  console.log('低价值能力报告:', {
    stats: report.stats,
    suggestionsCount: report.suggestions.length,
    markedCount: report.markedCapabilities.length
  });
  
  console.log('\n=== 低价值能力识别与管理系统测试完成 ===');
}