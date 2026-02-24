/**
 * 价值函数突变机制
 * 为人生决策宗师智能体提供价值函数突变和管理功能
 */

const { valueFunction } = require('./value-function');

class ValueFunctionMutator {
  constructor() {
    // 突变历史
    this.mutationHistory = [];
    // 突变验证规则
    this.validationRules = {
      minWeight: 0.05, // 最小权重
      maxWeight: 0.4,  // 最大权重
      totalWeight: 1.0, // 总权重
      weightTolerance: 0.01 // 权重容差
    };
    // 突变约束
    this.constraints = {
      stabilityPriority: true, // 稳定性优先
      avoidExtremeChanges: true, // 避免极端变化
      maintainBalance: true // 保持平衡
    };
  }

  // 执行价值函数突变
  mutateValueFunction(newWeights, reason) {
    // 验证新权重
    const validation = this._validateWeights(newWeights);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
        timestamp: Date.now()
      };
    }

    // 检查突变约束
    const constraintCheck = this._checkConstraints(newWeights);
    if (!constraintCheck.valid) {
      return {
        success: false,
        error: constraintCheck.error,
        timestamp: Date.now()
      };
    }

    // 执行突变
    const mutationResult = valueFunction.mutateWeights(newWeights, reason);
    if (!mutationResult.success) {
      return {
        success: false,
        error: mutationResult.error,
        timestamp: Date.now()
      };
    }

    // 记录突变历史
    const mutationRecord = {
      id: this._generateMutationId(),
      timestamp: Date.now(),
      oldWeights: mutationResult.mutation.oldWeights,
      newWeights: mutationResult.mutation.newWeights,
      reason: reason || '未指定原因',
      version: mutationResult.mutation.version
    };

    this.mutationHistory.push(mutationRecord);

    return {
      success: true,
      mutation: mutationRecord,
      timestamp: Date.now()
    };
  }

  // 验证权重
  _validateWeights(weights) {
    // 检查所有必要维度是否存在
    const requiredDimensions = ['reuseFrequency', 'failureRateImpact', 'cognitiveLoadReduction', 'reasoningCostReduction', 'systemCertainty'];
    for (const dimension of requiredDimensions) {
      if (!(dimension in weights)) {
        return {
          valid: false,
          error: `缺少必要的权重维度: ${dimension}`
        };
      }
    }

    // 检查权重值是否在有效范围内
    for (const [dimension, weight] of Object.entries(weights)) {
      if (typeof weight !== 'number') {
        return {
          valid: false,
          error: `权重值必须是数字: ${dimension}`
        };
      }
      if (weight < this.validationRules.minWeight) {
        return {
          valid: false,
          error: `权重值过低: ${dimension} = ${weight}，最小权重为 ${this.validationRules.minWeight}`
        };
      }
      if (weight > this.validationRules.maxWeight) {
        return {
          valid: false,
          error: `权重值过高: ${dimension} = ${weight}，最大权重为 ${this.validationRules.maxWeight}`
        };
      }
    }

    // 检查权重总和
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    if (Math.abs(totalWeight - this.validationRules.totalWeight) > this.validationRules.weightTolerance) {
      return {
        valid: false,
        error: `权重总和必须为 ${this.validationRules.totalWeight}，当前为 ${totalWeight}`
      };
    }

    return {
      valid: true
    };
  }

  // 检查突变约束
  _checkConstraints(newWeights) {
    const currentWeights = valueFunction.getCurrentWeights();

    // 检查稳定性优先约束
    if (this.constraints.stabilityPriority) {
      // 确保failureRateImpact权重不低于当前值
      if (newWeights.failureRateImpact < currentWeights.failureRateImpact) {
        return {
          valid: false,
          error: '稳定性优先约束：failureRateImpact权重不能低于当前值'
        };
      }
    }

    // 检查避免极端变化约束
    if (this.constraints.avoidExtremeChanges) {
      for (const [dimension, newWeight] of Object.entries(newWeights)) {
        const currentWeight = currentWeights[dimension];
        const changePercentage = Math.abs((newWeight - currentWeight) / currentWeight);
        if (changePercentage > 0.5) { // 最大变化50%
          return {
            valid: false,
            error: `避免极端变化约束：${dimension}权重变化过大 (${(changePercentage * 100).toFixed(1)}%)`
          };
        }
      }
    }

    // 检查保持平衡约束
    if (this.constraints.maintainBalance) {
      const weights = Object.values(newWeights);
      const maxWeight = Math.max(...weights);
      const minWeight = Math.min(...weights);
      const weightRatio = maxWeight / minWeight;
      if (weightRatio > 5) { // 最大权重比不超过5:1
        return {
          valid: false,
          error: '保持平衡约束：权重分布过于不平衡'
        };
      }
    }

    return {
      valid: true
    };
  }

  // 回滚到之前的版本
  rollbackToVersion(version) {
    const rollbackResult = valueFunction.rollbackToVersion(version);
    if (!rollbackResult.success) {
      return {
        success: false,
        error: rollbackResult.error,
        timestamp: Date.now()
      };
    }

    // 清理突变历史
    this.mutationHistory = this.mutationHistory.filter(mutation => mutation.version <= version);

    return {
      success: true,
      weights: rollbackResult.weights,
      version,
      timestamp: Date.now()
    };
  }

  // 生成推荐的权重调整
  generateRecommendedWeights(scenario) {
    const currentWeights = valueFunction.getCurrentWeights();
    let recommendedWeights = { ...currentWeights };

    switch (scenario) {
      case 'stabilityFocus':
        // 稳定性优先场景
        recommendedWeights = {
          ...currentWeights,
          failureRateImpact: Math.min(0.35, currentWeights.failureRateImpact + 0.05),
          systemCertainty: Math.min(0.25, currentWeights.systemCertainty + 0.05),
          reuseFrequency: Math.max(0.15, currentWeights.reuseFrequency - 0.05)
        };
        break;

      case 'efficiencyFocus':
        // 效率优先场景
        recommendedWeights = {
          ...currentWeights,
          reasoningCostReduction: Math.min(0.3, currentWeights.reasoningCostReduction + 0.05),
          cognitiveLoadReduction: Math.min(0.25, currentWeights.cognitiveLoadReduction + 0.05),
          failureRateImpact: Math.max(0.2, currentWeights.failureRateImpact - 0.05)
        };
        break;

      case 'generalOptimization':
        // 通用优化场景
        recommendedWeights = {
          reuseFrequency: 0.25,
          failureRateImpact: 0.25,
          cognitiveLoadReduction: 0.2,
          reasoningCostReduction: 0.15,
          systemCertainty: 0.15
        };
        break;

      default:
        return {
          success: false,
          error: '未知场景',
          timestamp: Date.now()
        };
    }

    // 调整权重总和
    recommendedWeights = this._adjustWeightsSum(recommendedWeights);

    return {
      success: true,
      recommendedWeights,
      scenario,
      timestamp: Date.now()
    };
  }

  // 调整权重总和
  _adjustWeightsSum(weights) {
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    const adjustmentFactor = this.validationRules.totalWeight / totalWeight;
    
    const adjustedWeights = {};
    for (const [dimension, weight] of Object.entries(weights)) {
      adjustedWeights[dimension] = weight * adjustmentFactor;
    }

    return adjustedWeights;
  }

  // 分析突变影响
  analyzeMutationImpact(newWeights) {
    const currentWeights = valueFunction.getCurrentWeights();
    const impact = {};

    // 计算每个维度的变化
    for (const [dimension, newWeight] of Object.entries(newWeights)) {
      const currentWeight = currentWeights[dimension];
      const change = newWeight - currentWeight;
      const changePercentage = currentWeight > 0 ? (change / currentWeight) * 100 : 0;

      impact[dimension] = {
        currentWeight,
        newWeight,
        change,
        changePercentage: changePercentage.toFixed(1) + '%',
        impactLevel: Math.abs(changePercentage) >= 20 ? '高' : Math.abs(changePercentage) >= 10 ? '中' : '低'
      };
    }

    // 计算整体影响
    const totalChange = Object.values(impact).reduce((sum, item) => sum + Math.abs(item.change), 0);
    const averageChange = totalChange / Object.keys(impact).length;

    return {
      impact,
      totalChange,
      averageChange,
      timestamp: Date.now()
    };
  }

  // 生成突变计划
  generateMutationPlan(scenario, reason) {
    const recommendation = this.generateRecommendedWeights(scenario);
    if (!recommendation.success) {
      return recommendation;
    }

    const impactAnalysis = this.analyzeMutationImpact(recommendation.recommendedWeights);
    const validation = this._validateWeights(recommendation.recommendedWeights);

    return {
      success: validation.valid,
      scenario,
      reason,
      recommendedWeights: recommendation.recommendedWeights,
      impactAnalysis,
      validation: validation.valid ? '通过' : '失败',
      timestamp: Date.now()
    };
  }

  // 批量测试突变
  batchTestMutations(mutationPlans) {
    const results = [];

    mutationPlans.forEach(plan => {
      const testResult = this._testMutation(plan.weights, plan.reason);
      results.push({
        ...testResult,
        plan
      });
    });

    return {
      results,
      count: results.length,
      timestamp: Date.now()
    };
  }

  // 测试突变
  _testMutation(weights, reason) {
    // 验证权重
    const validation = this._validateWeights(weights);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
        weights,
        timestamp: Date.now()
      };
    }

    // 检查约束
    const constraintCheck = this._checkConstraints(weights);
    if (!constraintCheck.valid) {
      return {
        success: false,
        error: constraintCheck.error,
        weights,
        timestamp: Date.now()
      };
    }

    // 分析影响
    const impactAnalysis = this.analyzeMutationImpact(weights);

    return {
      success: true,
      weights,
      impactAnalysis,
      timestamp: Date.now()
    };
  }

  // 获取突变历史
  getMutationHistory() {
    return this.mutationHistory;
  }

  // 获取最近的突变
  getRecentMutations(limit = 5) {
    return this.mutationHistory.slice(-limit).reverse();
  }

  // 获取系统状态
  getStatus() {
    const currentWeights = valueFunction.getCurrentWeights();
    const mutationCount = this.mutationHistory.length;
    const lastMutation = this.mutationHistory[this.mutationHistory.length - 1];

    return {
      currentWeights,
      mutationCount,
      lastMutation,
      constraints: this.constraints,
      validationRules: this.validationRules,
      timestamp: Date.now()
    };
  }

  // 更新突变约束
  updateConstraints(newConstraints) {
    this.constraints = {
      ...this.constraints,
      ...newConstraints
    };

    return {
      success: true,
      updatedConstraints: Object.keys(newConstraints),
      timestamp: Date.now()
    };
  }

  // 更新验证规则
  updateValidationRules(newRules) {
    this.validationRules = {
      ...this.validationRules,
      ...newRules
    };

    return {
      success: true,
      updatedRules: Object.keys(newRules),
      timestamp: Date.now()
    };
  }

  // 生成突变报告
  generateMutationReport() {
    const status = this.getStatus();
    const recentMutations = this.getRecentMutations(3);

    return {
      status,
      recentMutations,
      timestamp: Date.now()
    };
  }

  // 辅助方法：生成突变ID
  _generateMutationId() {
    return `mutation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// 导出单例实例
const valueFunctionMutator = new ValueFunctionMutator();

module.exports = {
  ValueFunctionMutator,
  valueFunctionMutator
};

// 示例用法
if (require.main === module) {
  const mutator = valueFunctionMutator;
  
  console.log('=== 测试价值函数突变机制 ===');
  
  // 测试生成推荐权重
  console.log('\n1. 测试生成推荐权重');
  const scenarios = ['stabilityFocus', 'efficiencyFocus', 'generalOptimization'];
  scenarios.forEach(scenario => {
    const recommendation = mutator.generateRecommendedWeights(scenario);
    console.log(`${scenario} 推荐权重:`, recommendation.recommendedWeights);
  });
  
  // 测试突变计划
  console.log('\n2. 测试生成突变计划');
  const mutationPlan = mutator.generateMutationPlan('stabilityFocus', '测试稳定性优先突变');
  console.log('突变计划:', {
    scenario: mutationPlan.scenario,
    success: mutationPlan.success,
    validation: mutationPlan.validation
  });
  
  // 测试执行突变
  console.log('\n3. 测试执行突变');
  if (mutationPlan.success) {
    const mutationResult = mutator.mutateValueFunction(mutationPlan.recommendedWeights, '测试突变');
    console.log('突变结果:', {
      success: mutationResult.success,
      error: mutationResult.error
    });
  }
  
  // 测试回滚
  console.log('\n4. 测试回滚');
  const rollbackResult = mutator.rollbackToVersion(0);
  console.log('回滚结果:', {
    success: rollbackResult.success,
    error: rollbackResult.error
  });
  
  // 测试系统状态
  console.log('\n5. 测试系统状态');
  const status = mutator.getStatus();
  console.log('系统状态:', {
    mutationCount: status.mutationCount,
    currentWeights: status.currentWeights
  });
  
  console.log('\n=== 价值函数突变机制测试完成 ===');
}