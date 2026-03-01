const fs = require('fs');
const path = require('path');

const VALUE_FUNCTION_FILE = path.join(__dirname, 'value-function.json');

class ValueFunction {
  constructor() {
    this.valueFunction = this.loadValueFunction();
  }

  loadValueFunction() {
    if (fs.existsSync(VALUE_FUNCTION_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(VALUE_FUNCTION_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading value function:', error.message);
        return this.createDefaultValueFunction();
      }
    }
    return this.createDefaultValueFunction();
  }

  createDefaultValueFunction() {
    return {
      version: '1.0',
      lastMutated: new Date().toISOString(),
      weights: {
        reuseFrequency: 0.25,
        failureRateImpact: 0.25,
        userCognitiveLoad: 0.2,
        reasoningCost: 0.15,
        systemDeterminism: 0.15
      },
      lowValueCriteria: [
        'extreme_scenario_only',
        'performance_only',
        'non_transferable',
        'increases_complexity'
      ],
      mutationHistory: []
    };
  }

  saveValueFunction() {
    fs.writeFileSync(VALUE_FUNCTION_FILE, JSON.stringify(this.valueFunction, null, 2));
    console.log('Value function saved to', VALUE_FUNCTION_FILE);
  }

  // 评估能力的价值
  evaluateCapability(capability) {
    console.log(`=== Evaluating capability: ${capability.name} ===`);

    // 评估核心价值维度
    const scores = {
      reuseFrequency: this.evaluateReuseFrequency(capability),
      failureRateImpact: this.evaluateFailureRateImpact(capability),
      userCognitiveLoad: this.evaluateUserCognitiveLoad(capability),
      reasoningCost: this.evaluateReasoningCost(capability),
      systemDeterminism: this.evaluateSystemDeterminism(capability)
    };

    // 计算综合价值
    const totalValue = this.calculateTotalValue(scores);

    // 检查是否为低价值能力
    const isLowValue = this.isLowValueCapability(capability);

    // 生成评估理由
    const reasoning = this.generateEvaluationReasoning(capability, scores, totalValue, isLowValue);

    const evaluation = {
      capabilityId: capability.id || capability.name,
      scores: scores,
      totalValue: totalValue,
      isLowValue: isLowValue,
      reasoning: reasoning
    };

    console.log(`✅ Capability evaluation: ${capability.name} - Value: ${totalValue.toFixed(2)} - Low value: ${isLowValue}`);
    return evaluation;
  }

  // 评估复用频率潜力
  evaluateReuseFrequency(capability) {
    // 基于能力的适用场景数量和通用性评估复用频率潜力
    let score = 0.5; // 默认分数

    // 检查适用场景
    if (capability.适用场景 && capability.适用场景.length > 0) {
      score += capability.适用场景.length * 0.1;
    }

    // 检查能力类型
    if (capability.type === 'behavioral_rule') {
      score += 0.2; // 行为规则通常具有较高的复用性
    } else if (capability.type === 'default_strategy') {
      score += 0.15; // 策略模式也具有较高的复用性
    }

    // 确保分数在0-1之间
    return Math.min(1, Math.max(0, score));
  }

  // 评估对失败率的影响
  evaluateFailureRateImpact(capability) {
    // 基于能力的可靠性和错误处理能力评估对失败率的影响
    let score = 0.5; // 默认分数

    // 检查可靠性
    if (capability.reliability) {
      score = capability.reliability;
    }

    // 检查失败边界和风险
    if (capability.failureBoundaries && capability.failureBoundaries.length > 0) {
      score += 0.1;
    }

    if (capability.risks && capability.risks.length > 0) {
      score += 0.1;
    }

    // 确保分数在0-1之间
    return Math.min(1, Math.max(0, score));
  }

  // 评估是否减少用户认知负担
  evaluateUserCognitiveLoad(capability) {
    // 基于能力的简洁性和易用性评估是否减少用户认知负担
    let score = 0.5; // 默认分数

    // 检查步骤数量
    if (capability.steps && capability.steps.length <= 3) {
      score += 0.2; // 步骤少的能力通常更易于理解
    } else if (capability.steps && capability.steps.length > 5) {
      score -= 0.2; // 步骤多的能力通常增加认知负担
    }

    // 检查输入输出数量
    const inputCount = capability.inputs ? capability.inputs.length : 0;
    const outputCount = capability.outputs ? capability.outputs.length : 0;

    if (inputCount <= 2 && outputCount <= 2) {
      score += 0.2; // 输入输出少的能力通常更易于使用
    } else if (inputCount > 5 || outputCount > 5) {
      score -= 0.2; // 输入输出多的能力通常增加认知负担
    }

    // 确保分数在0-1之间
    return Math.min(1, Math.max(0, score));
  }

  // 评估是否减少自身推理/工具成本
  evaluateReasoningCost(capability) {
    // 基于能力的自动化程度和执行效率评估是否减少推理/工具成本
    let score = 0.5; // 默认分数

    // 检查是否有明确的执行步骤
    if (capability.steps && capability.steps.length > 0) {
      score += 0.2;
    }

    // 检查是否有明确的输入输出定义
    if (capability.inputs && capability.inputs.length > 0 &&
        capability.outputs && capability.outputs.length > 0) {
      score += 0.2;
    }

    // 确保分数在0-1之间
    return Math.min(1, Math.max(0, score));
  }

  // 评估是否提升系统级确定性
  evaluateSystemDeterminism(capability) {
    // 基于能力的可预测性和稳定性评估是否提升系统级确定性
    let score = 0.5; // 默认分数

    // 检查可靠性
    if (capability.reliability && capability.reliability > 0.8) {
      score += 0.2;
    }

    // 检查是否有明确的失败边界
    if (capability.failureBoundaries && capability.failureBoundaries.length > 0) {
      score += 0.2;
    }

    // 检查是否有明确的成功前提
    if (capability.successPrerequisites && capability.successPrerequisites.length > 0) {
      score += 0.2;
    }

    // 确保分数在0-1之间
    return Math.min(1, Math.max(0, score));
  }

  // 计算综合价值
  calculateTotalValue(scores) {
    const weights = this.valueFunction.weights;
    let totalValue = 0;

    totalValue += scores.reuseFrequency * weights.reuseFrequency;
    totalValue += scores.failureRateImpact * weights.failureRateImpact;
    totalValue += scores.userCognitiveLoad * weights.userCognitiveLoad;
    totalValue += scores.reasoningCost * weights.reasoningCost;
    totalValue += scores.systemDeterminism * weights.systemDeterminism;

    return totalValue;
  }

  // 检查是否为低价值能力
  isLowValueCapability(capability) {
    // 检查是否符合低价值能力标准
    if (capability.type === 'capability_shape') {
      // 检查是否仅在极端场景使用
      if (capability.适用场景 && capability.适用场景.some(scene => scene.includes('极端') || scene.includes('紧急'))) {
        return true;
      }

      // 检查是否只提升表现、不提升成功率
      if (capability.优势 && capability.优势.some(adv => adv.includes('表现') || adv.includes('效率')) &&
          !capability.优势.some(adv => adv.includes('成功率') || adv.includes('可靠性'))) {
        return true;
      }

      // 检查是否无法跨任务迁移
      if (capability.适用场景 && capability.适用场景.length === 1) {
        return true;
      }

      // 检查是否会增加系统复杂度
      if (capability.steps && capability.steps.length > 5) {
        return true;
      }
    }

    return false;
  }

  // 生成评估理由
  generateEvaluationReasoning(capability, scores, totalValue, isLowValue) {
    const reasons = [];

    if (scores.reuseFrequency > 0.7) {
      reasons.push('具有较高的复用频率潜力');
    } else if (scores.reuseFrequency < 0.3) {
      reasons.push('复用频率潜力较低');
    }

    if (scores.failureRateImpact > 0.7) {
      reasons.push('对降低失败率有显著影响');
    } else if (scores.failureRateImpact < 0.3) {
      reasons.push('对降低失败率的影响较小');
    }

    if (scores.userCognitiveLoad > 0.7) {
      reasons.push('能够显著减少用户认知负担');
    } else if (scores.userCognitiveLoad < 0.3) {
      reasons.push('可能增加用户认知负担');
    }

    if (scores.reasoningCost > 0.7) {
      reasons.push('能够减少自身推理/工具成本');
    } else if (scores.reasoningCost < 0.3) {
      reasons.push('可能增加自身推理/工具成本');
    }

    if (scores.systemDeterminism > 0.7) {
      reasons.push('能够提升系统级确定性');
    } else if (scores.systemDeterminism < 0.3) {
      reasons.push('对提升系统级确定性的作用较小');
    }

    if (isLowValue) {
      reasons.push('被识别为低价值能力');
    }

    return reasons.join('; ');
  }

  // 突变价值函数
  mutateValueFunction(reason) {
    console.log('=== Mutating value function ===');

    // 生成新的权重
    const newWeights = this.generateNewWeights();

    // 记录变化
    const changes = {
      oldWeights: { ...this.valueFunction.weights },
      newWeights: newWeights
    };

    // 更新价值函数
    this.valueFunction.weights = newWeights;
    this.valueFunction.lastMutated = new Date().toISOString();
    this.valueFunction.version = `1.${parseInt(this.valueFunction.version.split('.')[1]) + 1}`;
    this.valueFunction.mutationHistory.push({
      timestamp: new Date().toISOString(),
      changes: changes,
      reason: reason
    });

    this.saveValueFunction();
    console.log('✅ Value function mutated successfully');
    console.log('New weights:', newWeights);
    return this.valueFunction;
  }

  // 生成新的权重
  generateNewWeights() {
    const oldWeights = this.valueFunction.weights;
    const newWeights = {};

    // 对每个权重进行小幅调整（±10%）
    for (const [key, value] of Object.entries(oldWeights)) {
      const adjustment = (Math.random() - 0.5) * 0.2; // ±10%
      newWeights[key] = Math.max(0.1, Math.min(0.4, value + adjustment));
    }

    // 归一化权重，确保总和为1
    const total = Object.values(newWeights).reduce((sum, weight) => sum + weight, 0);
    for (const [key, value] of Object.entries(newWeights)) {
      newWeights[key] = value / total;
    }

    return newWeights;
  }

  // 评估价值函数的有效性
  evaluateValueFunctionEffectiveness(evaluations) {
    // 基于最近的能力评估结果评估价值函数的有效性
    if (!evaluations || evaluations.length === 0) {
      return 0.5; // 默认有效性
    }

    // 计算平均价值评分
    const averageValue = evaluations.reduce((sum, evaluation) => sum + evaluation.totalValue, 0) / evaluations.length;

    // 计算低价值能力的比例
    const lowValueRatio = evaluations.filter(evaluation => evaluation.isLowValue).length / evaluations.length;

    // 计算有效性评分（越高越好）
    let effectiveness = averageValue * (1 - lowValueRatio);

    return Math.min(1, Math.max(0, effectiveness));
  }

  // 获取价值函数状态
  getStatus() {
    return {
      version: this.valueFunction.version,
      lastMutated: this.valueFunction.lastMutated,
      weights: this.valueFunction.weights,
      mutationCount: this.valueFunction.mutationHistory.length
    };
  }

  // 重置价值函数到默认状态
  resetValueFunction() {
    this.valueFunction = this.createDefaultValueFunction();
    this.saveValueFunction();
    console.log('✅ Value function reset to default');
  }
}

module.exports = ValueFunction;