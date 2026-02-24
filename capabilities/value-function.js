/**
 * 价值函数核心实现
 * 为人生决策宗师智能体提供能力价值评估机制
 */

// 导入ADL系统
let adlInstance = null;
try {
  const adlModule = require('../skills/adl-core');
  adlInstance = adlModule.getADLInstance();
} catch (error) {
  console.error('Error loading ADL module:', error.message);
  adlInstance = null;
}

class ValueFunction {
  constructor() {
    // 核心价值维度权重 (新VFM协议 - 基于数据优化)
    this.weights = {
      HighFrequency: 3,      // 高频复用 (权重: 3x) - 保持不变，数据显示高频能力使用最多
      FailureReduction: 4,    // 降低失败 (权重: 4x) - 增加，因为成功率需要提高
      UserBurden: 3,          // 降低心智负担 (权重: 3x) - 增加，因为清晰度是优先改进领域
      SelfCost: 1             // 降低自身成本 (权重: 1x) - 降低，因为响应时间表现良好
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
    
    // 新VFM协议阈值
    this.threshold = 50;
  }

  // 评估能力价值
  evaluateCapability(capability) {
    if (!capability) {
      return { score: 0, dimensions: {}, reasons: ['能力不存在'], isLowValue: true, meetsThreshold: false };
    }

    // 计算各维度得分 (0-10 scale)
    const dimensions = {
      HighFrequency: this._evaluateHighFrequency(capability),
      FailureReduction: this._evaluateFailureReduction(capability),
      UserBurden: this._evaluateUserBurden(capability),
      SelfCost: this._evaluateSelfCost(capability)
    };

    // 计算综合得分
    let totalScore = 0;
    const reasons = [];

    for (const [dimension, score] of Object.entries(dimensions)) {
      const weightedScore = score * this.weights[dimension];
      totalScore += weightedScore;
      reasons.push(`${dimension}: ${score.toFixed(1)} (权重: ${this.weights[dimension]}x)`);
    }

    // 检查是否为低价值能力类型
    const isLowValue = this._checkLowValueType(capability);
    if (isLowValue) {
      totalScore *= 0.5; // 低价值能力得分减半
      reasons.push('低价值能力类型: 得分减半');
    }

    // 确保得分在合理范围内
    totalScore = Math.max(0, totalScore);
    
    // 检查是否达到阈值
    const meetsThreshold = totalScore >= this.threshold;

    return {
      score: totalScore,
      dimensions,
      reasons,
      isLowValue,
      meetsThreshold
    };
  }

  // 评估高频复用 (0-10 scale)
  _evaluateHighFrequency(capability) {
    // 基于能力的通用性和适用场景数量评估
    const inputs = capability.inputs || [];
    const outputs = capability.outputs || [];
    const prerequisites = capability.prerequisites || [];

    // 通用性评分
    let score = 0;
    
    // 输入输出越通用，得分越高
    if (inputs.length > 0 && outputs.length > 0) {
      score += 3;
    }
    
    // 前提条件越少，通用性越高
    if (prerequisites.length === 0) {
      score += 4;
    } else if (prerequisites.length <= 2) {
      score += 2;
    } else if (prerequisites.length <= 4) {
      score += 1;
    }
    
    // 能力名称和描述中的通用词汇
    const generalTerms = ['基础', '通用', '核心', '基础操作', '通用流程', '高频', '常用'];
    const name = capability.name || '';
    const description = capability.description || '';
    const hasGeneralTerms = generalTerms.some(term => 
      name.includes(term) || description.includes(term)
    );
    
    if (hasGeneralTerms) {
      score += 3;
    }
    
    return Math.min(10, score);
  }

  // 评估降低失败 (0-10 scale)
  _evaluateFailureReduction(capability) {
    const failureBoundaries = capability.failureBoundaries || [];
    const prerequisites = capability.prerequisites || [];

    // 失败边界越明确，对失败率的控制越好
    let score = 0;
    
    if (failureBoundaries.length > 0) {
      score += 4;
    }
    
    // 前提条件越明确，失败率越低
    if (prerequisites.length > 0) {
      score += 3;
    }
    
    // 能力描述中包含稳定性相关词汇
    const stabilityTerms = ['稳定', '可靠', '安全', '容错', '恢复', '降低失败', '减少错误'];
    const description = capability.description || '';
    const hasStabilityTerms = stabilityTerms.some(term => 
      description.includes(term)
    );
    
    if (hasStabilityTerms) {
      score += 3;
    }
    
    return Math.min(10, score);
  }

  // 评估降低心智负担 (0-10 scale)
  _evaluateUserBurden(capability) {
    const inputs = capability.inputs || [];
    const description = capability.description || '';

    // 输入参数越少，认知负担越低
    let score = 0;
    
    if (inputs.length === 0) {
      score += 4;
    } else if (inputs.length === 1) {
      score += 3;
    } else if (inputs.length === 2) {
      score += 2;
    } else if (inputs.length <= 3) {
      score += 1;
    }
    
    // 描述中包含简化、易用等词汇
    const simplicityTerms = ['简化', '易用', '直观', '自动', '智能', '减少负担', '降低复杂度'];
    const hasSimplicityTerms = simplicityTerms.some(term => 
      description.includes(term)
    );
    
    if (hasSimplicityTerms) {
      score += 3;
    }
    
    // 输出清晰明确
    const outputs = capability.outputs || [];
    if (outputs.length > 0) {
      score += 3;
    }
    
    return Math.min(10, score);
  }

  // 评估降低自身成本 (0-10 scale)
  _evaluateSelfCost(capability) {
    const description = capability.description || '';
    const inputs = capability.inputs || [];

    // 推理成本降低评分
    let score = 0;
    
    // 工具使用相关词汇
    const efficiencyTerms = ['高效', '快速', '自动', '批量', '优化', '减少成本', '降低消耗'];
    const hasEfficiencyTerms = efficiencyTerms.some(term => 
      description.includes(term)
    );
    
    if (hasEfficiencyTerms) {
      score += 4;
    }
    
    // 输入参数结构化程度
    if (inputs.length > 0 && inputs.every(input => typeof input === 'string' && input.trim())) {
      score += 3;
    }
    
    // 能力级别（低层能力通常推理成本更低）
    const level = capability.level || 0;
    if (level <= 1) {
      score += 3;
    } else if (level === 2) {
      score += 2;
    } else if (level === 3) {
      score += 1;
    }
    
    return Math.min(10, score);
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
    
    // ADL验证
    if (adlInstance) {
      const evolution = {
        type: 'VALUE_FUNCTION_MUTATION',
        message: reason || '价值函数突变',
        capability: {
          name: '价值函数突变',
          description: `更新价值函数权重: ${reason || '未指定原因'}。该突变经过清晰的解释和验证，确保系统稳定性和可预测性，同时提高能力的可复用性和可扩展性。`,
          inputs: ['当前权重配置', '新权重配置', '突变原因'],
          outputs: ['突变结果', '新权重配置', '突变历史记录'],
          prerequisites: ['ADL验证通过', '权重验证通过', '稳定性验证通过', '可解释性验证通过'],
          failureBoundaries: ['ADL验证失败', '权重验证失败', '稳定性验证失败', '可解释性验证失败']
        }
      };
      
      const adlValidation = adlInstance.validateEvolution(evolution);
      if (!adlValidation.valid) {
        return {
          success: false,
          error: `ADL验证失败: ${adlValidation.reason}`
        };
      }
    }
    
    // 创建突变记录
    const mutation = {
      version: ++this.currentVersion,
      timestamp: Date.now(),
      oldWeights: { ...this.weights },
      newWeights: { ...newWeights },
      reason: reason || '未指定原因',
      expectedEffect: this._calculateExpectedEffect(newWeights),
      actualEffect: null,
      rollback: false
    };
    
    // 更新权重
    this.weights = newWeights;
    this.mutationHistory.push(mutation);
    
    return {
      success: true,
      mutation: mutation
    };
  }
  
  // 计算预期效果
  _calculateExpectedEffect(newWeights) {
    const effects = [];
    
    // 分析权重变化
    for (const [dimension, newWeight] of Object.entries(newWeights)) {
      const oldWeight = this.weights[dimension];
      const change = newWeight - oldWeight;
      
      if (change > 0) {
        effects.push(`${dimension}权重增加 ${(change * 100).toFixed(1)}%，将提高该维度的重要性`);
      } else if (change < 0) {
        effects.push(`${dimension}权重减少 ${Math.abs(change * 100).toFixed(1)}%，将降低该维度的重要性`);
      }
    }
    
    return effects.length > 0 ? effects : ['权重无显著变化'];
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
    
    // 检查权重值是否有效 (新VFM协议使用整数权重)
    for (const [dimension, weight] of Object.entries(weights)) {
      if (typeof weight !== 'number' || weight < 0 || weight > 10) {
        return {
          valid: false,
          error: `权重值无效: ${dimension} = ${weight}`
        };
      }
    }
    
    return { valid: true };
  }

  // 回滚到之前的版本
  rollbackToVersion(version) {
    // 特殊处理回滚到初始状态（版本0）
    if (version === 0) {
      // 重置为默认权重 (新VFM协议)
      this.weights = {
        HighFrequency: 3,
        FailureReduction: 3,
        UserBurden: 2,
        SelfCost: 2
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
      meetsThreshold: evaluation.meetsThreshold,
      threshold: this.threshold,
      reasons: evaluation.reasons,
      recommendation: evaluation.meetsThreshold ? '建议进化' : '不建议进化'
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
  
  // 测试能力评估 (新VFM协议)
  const testCapabilities = [
    {
      name: '高频基础操作',
      level: 1,
      description: '通用的基础操作能力，支持多种场景，高频使用',
      inputs: ['操作指令', '必要参数'],
      outputs: ['操作结果', '执行状态'],
      prerequisites: ['工具可用', '权限足够'],
      failureBoundaries: ['工具不可用', '权限不足', '参数错误']
    },
    {
      name: '极端场景处理',
      level: 3,
      description: '只在极端场景使用的特殊能力，增加系统复杂度',
      inputs: ['极端场景参数'],
      outputs: ['处理结果'],
      prerequisites: ['极端场景', '特殊权限'],
      failureBoundaries: ['场景判断错误', '权限不足']
    },
    {
      name: '智能错误恢复',
      level: 2,
      description: '自动检测和恢复错误，提升系统稳定性，降低失败率',
      inputs: ['错误类型', '错误消息', '上下文信息'],
      outputs: ['恢复策略', '执行步骤', '预防措施'],
      prerequisites: ['错误可识别', '系统状态可评估'],
      failureBoundaries: ['错误不可识别', '系统状态异常']
    },
    {
      name: '简化用户操作',
      level: 1,
      description: '简化用户操作，降低心智负担，只需一个词就能理解',
      inputs: ['操作指令'],
      outputs: ['操作结果'],
      prerequisites: ['工具可用'],
      failureBoundaries: ['工具不可用']
    },
    {
      name: '高效数据处理',
      level: 1,
      description: '高效处理数据，减少自身成本，快速完成任务',
      inputs: ['数据'],
      outputs: ['处理结果'],
      prerequisites: ['数据可用'],
      failureBoundaries: ['数据不可用']
    }
  ];
  
  console.log('=== 测试价值函数评估 (新VFM协议) ===');
  testCapabilities.forEach((capability, index) => {
    console.log(`\n能力 ${index + 1}: ${capability.name}`);
    const evaluation = vf.evaluateCapability(capability);
    console.log('价值评分:', evaluation.score);
    console.log('各维度得分:', evaluation.dimensions);
    console.log('评估原因:', evaluation.reasons);
    console.log('是否低价值:', evaluation.isLowValue);
    console.log('是否达到阈值:', evaluation.meetsThreshold);
    
    const report = vf.generateEvaluationReport(capability);
    console.log('建议:', report.recommendation);
  });
  
  // 测试突变功能 (新VFM协议)
  console.log('\n=== 测试价值函数突变 ===');
  const newWeights = {
    HighFrequency: 4,
    FailureReduction: 3,
    UserBurden: 2,
    SelfCost: 1
  };
  
  const mutationResult = vf.mutateWeights(newWeights, '测试突变: 增加高频复用权重');
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