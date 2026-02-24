/**
 * 价值函数核心实现
 * 为人生决策宗师智能体提供能力价值评估机制
 */

class ValueFunction {
  constructor() {
    // 核心价值维度权重
    this.weights = {
      reuseFrequency: 0.25,      // 复用频率潜力
      failureRateImpact: 0.25,    // 对失败率的影响
      cognitiveLoadReduction: 0.2, // 是否减少用户认知负担
      reasoningCostReduction: 0.15, // 是否减少自身推理/工具成本
      systemCertainty: 0.15      // 是否提升系统级确定性
    };
    
    // 低价值能力类型
    this.lowValueTypes = [
      '极端场景使用',
      '只提升表现不提升成功率',
      '无法跨任务迁移',
      '增加系统复杂度'
    ];
    
    // 突变历史
    this.mutationHistory = [];
    this.currentVersion = 0;
  }

  // 评估能力价值
  evaluateCapability(capability) {
    if (!capability) {
      return { score: 0, reasons: ['能力不存在'] };
    }

    // 计算各维度得分
    const dimensions = {
      reuseFrequency: this._evaluateReuseFrequency(capability),
      failureRateImpact: this._evaluateFailureRateImpact(capability),
      cognitiveLoadReduction: this._evaluateCognitiveLoadReduction(capability),
      reasoningCostReduction: this._evaluateReasoningCostReduction(capability),
      systemCertainty: this._evaluateSystemCertainty(capability)
    };

    // 计算综合得分
    let totalScore = 0;
    const reasons = [];

    for (const [dimension, score] of Object.entries(dimensions)) {
      const weightedScore = score * this.weights[dimension];
      totalScore += weightedScore;
      reasons.push(`${dimension}: ${score.toFixed(2)} (权重: ${this.weights[dimension].toFixed(2)})`);
    }

    // 检查是否为低价值能力类型
    const isLowValue = this._checkLowValueType(capability);
    if (isLowValue) {
      totalScore *= 0.5; // 低价值能力得分减半
      reasons.push('低价值能力类型: 得分减半');
    }

    // 确保得分在0-1之间
    totalScore = Math.max(0, Math.min(1, totalScore));

    return {
      score: totalScore,
      dimensions,
      reasons,
      isLowValue
    };
  }

  // 评估复用频率潜力
  _evaluateReuseFrequency(capability) {
    // 基于能力的通用性和适用场景数量评估
    const inputs = capability.inputs || [];
    const outputs = capability.outputs || [];
    const prerequisites = capability.prerequisites || [];

    // 通用性评分
    let generalityScore = 0;
    
    // 输入输出越通用，得分越高
    if (inputs.length > 0 && outputs.length > 0) {
      generalityScore += 0.3;
    }
    
    // 前提条件越少，通用性越高
    if (prerequisites.length === 0) {
      generalityScore += 0.4;
    } else if (prerequisites.length <= 2) {
      generalityScore += 0.2;
    } else if (prerequisites.length <= 4) {
      generalityScore += 0.1;
    }
    
    // 能力名称和描述中的通用词汇
    const generalTerms = ['基础', '通用', '核心', '基础操作', '通用流程'];
    const name = capability.name || '';
    const description = capability.description || '';
    const hasGeneralTerms = generalTerms.some(term => 
      name.includes(term) || description.includes(term)
    );
    
    if (hasGeneralTerms) {
      generalityScore += 0.3;
    }
    
    return Math.min(1, generalityScore);
  }

  // 评估对失败率的影响
  _evaluateFailureRateImpact(capability) {
    const failureBoundaries = capability.failureBoundaries || [];
    const prerequisites = capability.prerequisites || [];

    // 失败边界越明确，对失败率的控制越好
    let failureRateScore = 0;
    
    if (failureBoundaries.length > 0) {
      failureRateScore += 0.4;
    }
    
    // 前提条件越明确，失败率越低
    if (prerequisites.length > 0) {
      failureRateScore += 0.3;
    }
    
    // 能力描述中包含稳定性相关词汇
    const stabilityTerms = ['稳定', '可靠', '安全', '容错', '恢复'];
    const description = capability.description || '';
    const hasStabilityTerms = stabilityTerms.some(term => 
      description.includes(term)
    );
    
    if (hasStabilityTerms) {
      failureRateScore += 0.3;
    }
    
    return Math.min(1, failureRateScore);
  }

  // 评估是否减少用户认知负担
  _evaluateCognitiveLoadReduction(capability) {
    const inputs = capability.inputs || [];
    const description = capability.description || '';

    // 输入参数越少，认知负担越低
    let loadReductionScore = 0;
    
    if (inputs.length === 0) {
      loadReductionScore += 0.4;
    } else if (inputs.length === 1) {
      loadReductionScore += 0.3;
    } else if (inputs.length === 2) {
      loadReductionScore += 0.2;
    } else if (inputs.length <= 3) {
      loadReductionScore += 0.1;
    }
    
    // 描述中包含简化、易用等词汇
    const simplicityTerms = ['简化', '易用', '直观', '自动', '智能'];
    const hasSimplicityTerms = simplicityTerms.some(term => 
      description.includes(term)
    );
    
    if (hasSimplicityTerms) {
      loadReductionScore += 0.3;
    }
    
    // 输出清晰明确
    const outputs = capability.outputs || [];
    if (outputs.length > 0) {
      loadReductionScore += 0.3;
    }
    
    return Math.min(1, loadReductionScore);
  }

  // 评估是否减少自身推理/工具成本
  _evaluateReasoningCostReduction(capability) {
    const description = capability.description || '';
    const inputs = capability.inputs || [];

    // 推理成本降低评分
    let costReductionScore = 0;
    
    // 工具使用相关词汇
    const efficiencyTerms = ['高效', '快速', '自动', '批量', '优化'];
    const hasEfficiencyTerms = efficiencyTerms.some(term => 
      description.includes(term)
    );
    
    if (hasEfficiencyTerms) {
      costReductionScore += 0.4;
    }
    
    // 输入参数结构化程度
    if (inputs.length > 0 && inputs.every(input => typeof input === 'string' && input.trim())) {
      costReductionScore += 0.3;
    }
    
    // 能力级别（低层能力通常推理成本更低）
    const level = capability.level || 0;
    if (level <= 1) {
      costReductionScore += 0.3;
    } else if (level === 2) {
      costReductionScore += 0.2;
    } else if (level === 3) {
      costReductionScore += 0.1;
    }
    
    return Math.min(1, costReductionScore);
  }

  // 评估是否提升系统级确定性
  _evaluateSystemCertainty(capability) {
    const failureBoundaries = capability.failureBoundaries || [];
    const prerequisites = capability.prerequisites || [];
    const description = capability.description || '';

    // 系统确定性评分
    let certaintyScore = 0;
    
    // 失败边界明确
    if (failureBoundaries.length > 0) {
      certaintyScore += 0.4;
    }
    
    // 前提条件明确
    if (prerequisites.length > 0) {
      certaintyScore += 0.3;
    }
    
    // 描述中包含确定性相关词汇
    const certaintyTerms = ['确定', '可预测', '可控', '可验证', '可测量'];
    const hasCertaintyTerms = certaintyTerms.some(term => 
      description.includes(term)
    );
    
    if (hasCertaintyTerms) {
      certaintyScore += 0.3;
    }
    
    return Math.min(1, certaintyScore);
  }

  // 检查是否为低价值能力类型
  _checkLowValueType(capability) {
    const description = capability.description || '';
    const name = capability.name || '';
    const combinedText = `${name} ${description}`;
    
    return this.lowValueTypes.some(type => 
      combinedText.includes(type)
    );
  }

  // 突变价值函数
  mutateWeights(newWeights, reason) {
    // 验证新权重
    const validation = this._validateWeights(newWeights);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      };
    }
    
    // 创建突变记录
    const mutation = {
      version: ++this.currentVersion,
      timestamp: Date.now(),
      oldWeights: { ...this.weights },
      newWeights: { ...newWeights },
      reason: reason || '未指定原因'
    };
    
    // 更新权重
    this.weights = newWeights;
    this.mutationHistory.push(mutation);
    
    return {
      success: true,
      mutation: mutation
    };
  }

  // 验证权重
  _validateWeights(weights) {
    // 检查所有必要维度是否存在
    const requiredDimensions = Object.keys(this.weights);
    for (const dimension of requiredDimensions) {
      if (!(dimension in weights)) {
        return {
          valid: false,
          error: `缺少必要的权重维度: ${dimension}`
        };
      }
    }
    
    // 检查权重值是否有效
    for (const [dimension, weight] of Object.entries(weights)) {
      if (typeof weight !== 'number' || weight < 0 || weight > 1) {
        return {
          valid: false,
          error: `权重值无效: ${dimension} = ${weight}`
        };
      }
    }
    
    // 检查权重总和是否接近1
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    if (Math.abs(totalWeight - 1) > 0.01) {
      return {
        valid: false,
        error: `权重总和必须为1，当前为: ${totalWeight}`
      };
    }
    
    return { valid: true };
  }

  // 回滚到之前的版本
  rollbackToVersion(version) {
    // 特殊处理回滚到初始状态（版本0）
    if (version === 0) {
      // 重置为默认权重
      this.weights = {
        reuseFrequency: 0.25,
        failureRateImpact: 0.25,
        cognitiveLoadReduction: 0.2,
        reasoningCostReduction: 0.15,
        systemCertainty: 0.15
      };
      
      // 清空突变历史
      this.mutationHistory = [];
      this.currentVersion = 0;
      
      return {
        success: true,
        weights: this.weights
      };
    }
    
    const mutation = this.mutationHistory.find(m => m.version === version);
    if (!mutation) {
      return {
        success: false,
        error: `版本不存在: ${version}`
      };
    }
    
    this.weights = { ...mutation.oldWeights };
    
    // 移除该版本之后的所有突变
    this.mutationHistory = this.mutationHistory.filter(m => m.version <= version);
    this.currentVersion = version;
    
    return {
      success: true,
      weights: this.weights
    };
  }

  // 获取突变历史
  getMutationHistory() {
    return this.mutationHistory;
  }

  // 获取当前权重
  getCurrentWeights() {
    return { ...this.weights };
  }

  // 批量评估能力
  batchEvaluateCapabilities(capabilities) {
    return capabilities.map(capability => ({
      capability,
      evaluation: this.evaluateCapability(capability)
    })).sort((a, b) => b.evaluation.score - a.evaluation.score);
  }

  // 生成价值评估报告
  generateEvaluationReport(capability) {
    const evaluation = this.evaluateCapability(capability);
    
    return {
      capability: {
        name: capability.name,
        level: capability.level,
        description: capability.description
      },
      score: evaluation.score,
      dimensions: evaluation.dimensions,
      weights: this.weights,
      isLowValue: evaluation.isLowValue,
      reasons: evaluation.reasons,
      recommendation: evaluation.score >= 0.6 ? '建议进化' : evaluation.score >= 0.3 ? '谨慎考虑' : '不建议进化'
    };
  }
}

// 导出单例实例
const valueFunction = new ValueFunction();

module.exports = {
  ValueFunction,
  valueFunction
};

// 示例用法
if (require.main === module) {
  const vf = valueFunction;
  
  // 测试能力评估
  const testCapabilities = [
    {
      name: '基础操作',
      level: 1,
      description: '通用的基础操作能力，支持多种场景',
      inputs: ['操作指令', '必要参数'],
      outputs: ['操作结果', '执行状态'],
      prerequisites: ['工具可用', '权限足够'],
      failureBoundaries: ['工具不可用', '权限不足', '参数错误']
    },
    {
      name: '极端场景处理',
      level: 3,
      description: '只在极端场景使用的特殊能力',
      inputs: ['极端场景参数'],
      outputs: ['处理结果'],
      prerequisites: ['极端场景', '特殊权限'],
      failureBoundaries: ['场景判断错误', '权限不足']
    },
    {
      name: '智能错误恢复',
      level: 2,
      description: '自动检测和恢复错误，提升系统稳定性',
      inputs: ['错误类型', '错误消息', '上下文信息'],
      outputs: ['恢复策略', '执行步骤', '预防措施'],
      prerequisites: ['错误可识别', '系统状态可评估'],
      failureBoundaries: ['错误不可识别', '系统状态异常']
    }
  ];
  
  console.log('=== 测试价值函数评估 ===');
  testCapabilities.forEach((capability, index) => {
    console.log(`\n能力 ${index + 1}: ${capability.name}`);
    const evaluation = vf.evaluateCapability(capability);
    console.log('价值评分:', evaluation.score);
    console.log('各维度得分:', evaluation.dimensions);
    console.log('评估原因:', evaluation.reasons);
    console.log('是否低价值:', evaluation.isLowValue);
    
    const report = vf.generateEvaluationReport(capability);
    console.log('建议:', report.recommendation);
  });
  
  // 测试突变功能
  console.log('\n=== 测试价值函数突变 ===');
  const newWeights = {
    reuseFrequency: 0.3,
    failureRateImpact: 0.25,
    cognitiveLoadReduction: 0.2,
    reasoningCostReduction: 0.1,
    systemCertainty: 0.15
  };
  
  const mutationResult = vf.mutateWeights(newWeights, '测试突变');
  console.log('突变结果:', mutationResult.success ? '成功' : '失败');
  if (mutationResult.success) {
    console.log('新权重:', mutationResult.mutation.newWeights);
  }
  
  // 测试回滚
  if (mutationResult.success) {
    console.log('\n=== 测试回滚功能 ===');
    const rollbackResult = vf.rollbackToVersion(0);
    console.log('回滚结果:', rollbackResult.success ? '成功' : '失败');
    if (rollbackResult.success) {
      console.log('回滚后权重:', rollbackResult.weights);
    }
  }
}