// 核心价值维度评估模块

/**
 * 评估能力的复用频率潜力
 * @param {Object} capability - 能力对象
 * @returns {number} 复用频率潜力评分 (0-1)
 */
function evaluateReusePotential(capability) {
  let score = 0;
  
  // 检查能力是否有明确的适用场景
  if (capability.scenarios && Array.isArray(capability.scenarios) && capability.scenarios.length > 0) {
    // 场景数量越多，复用潜力越高
    score += Math.min(capability.scenarios.length * 0.2, 0.6);
  }
  
  // 检查能力是否可跨任务迁移
  if (capability.isCrossTaskTransferable) {
    score += 0.2;
  }
  
  // 检查能力是否有通用接口
  if (capability.hasGenericInterface) {
    score += 0.1;
  }
  
  // 检查能力是否被标记为可复用
  if (capability.isReusable) {
    score += 0.1;
  }
  
  // 确保分数在0-1范围内
  return Math.max(0, Math.min(1, score));
}

/**
 * 评估能力对失败率的影响
 * @param {Object} capability - 能力对象
 * @returns {number} 失败率影响评分 (0-1)
 */
function evaluateFailureImpact(capability) {
  let score = 0;
  
  // 检查能力是否有错误处理机制
  if (capability.hasErrorHandling) {
    score += 0.3;
  }
  
  // 检查能力是否有回滚机制
  if (capability.hasRollback) {
    score += 0.2;
  }
  
  // 检查能力的成功率
  if (capability.successRate !== undefined) {
    score += Math.min(capability.successRate * 0.3, 0.3);
  }
  
  // 检查能力是否能降低系统失败率
  if (capability.reducesSystemFailure) {
    score += 0.2;
  }
  
  // 确保分数在0-1范围内
  return Math.max(0, Math.min(1, score));
}

/**
 * 评估能力减少用户认知负担的程度
 * @param {Object} capability - 能力对象
 * @returns {number} 认知负担减少评分 (0-1)
 */
function evaluateCognitiveBurdenReduction(capability) {
  let score = 0;
  
  // 检查能力是否简化用户操作
  if (capability.simplifiesUserInteraction) {
    score += 0.3;
  }
  
  // 检查能力是否有清晰的文档
  if (capability.hasClearDocumentation) {
    score += 0.2;
  }
  
  // 检查能力的使用复杂度
  if (capability.complexityLevel) {
    // 复杂度越低，分数越高
    switch (capability.complexityLevel.toLowerCase()) {
      case 'low':
        score += 0.3;
        break;
      case 'medium':
        score += 0.15;
        break;
      case 'high':
        score += 0;
        break;
    }
  }
  
  // 检查能力是否提供直观的用户界面
  if (capability.hasIntuitiveInterface) {
    score += 0.2;
  }
  
  // 确保分数在0-1范围内
  return Math.max(0, Math.min(1, score));
}

/**
 * 评估能力减少推理/工具成本的程度
 * @param {Object} capability - 能力对象
 * @returns {number} 推理/工具成本减少评分 (0-1)
 */
function evaluateReasoningCostReduction(capability) {
  let score = 0;
  
  // 检查能力是否减少计算复杂度
  if (capability.reducesComputationalComplexity) {
    score += 0.3;
  }
  
  // 检查能力是否减少API调用
  if (capability.reducesAPICalls) {
    score += 0.2;
  }
  
  // 检查能力是否减少内存使用
  if (capability.reducesMemoryUsage) {
    score += 0.2;
  }
  
  // 检查能力是否提高执行速度
  if (capability.improvesExecutionSpeed) {
    score += 0.3;
  }
  
  // 确保分数在0-1范围内
  return Math.max(0, Math.min(1, score));
}

/**
 * 评估能力提升系统级确定性的程度
 * @param {Object} capability - 能力对象
 * @returns {number} 系统级确定性提升评分 (0-1)
 */
function evaluateCertaintyImprovement(capability) {
  let score = 0;
  
  // 检查能力是否有明确的输入输出规范
  if (capability.hasClearIOspecification) {
    score += 0.3;
  }
  
  // 检查能力是否有可预测的行为
  if (capability.hasPredictableBehavior) {
    score += 0.3;
  }
  
  // 检查能力是否有验证机制
  if (capability.hasValidationMechanism) {
    score += 0.2;
  }
  
  // 检查能力是否提供确定性结果
  if (capability.providesDeterministicResults) {
    score += 0.2;
  }
  
  // 确保分数在0-1范围内
  return Math.max(0, Math.min(1, score));
}

/**
 * 批量评估能力的所有核心价值维度
 * @param {Object} capability - 能力对象
 * @returns {Object} 各维度评估结果
 */
function evaluateAllDimensions(capability) {
  return {
    reusePotential: evaluateReusePotential(capability),
    failureImpact: evaluateFailureImpact(capability),
    cognitiveBurdenReduction: evaluateCognitiveBurdenReduction(capability),
    reasoningCostReduction: evaluateReasoningCostReduction(capability),
    certaintyImprovement: evaluateCertaintyImprovement(capability)
  };
}

module.exports = {
  evaluateReusePotential,
  evaluateFailureImpact,
  evaluateCognitiveBurdenReduction,
  evaluateReasoningCostReduction,
  evaluateCertaintyImprovement,
  evaluateAllDimensions
};